import { readFileSync } from 'fs';
import fetch from 'node-fetch';

// Load .env with Windows line-ending support
const env = readFileSync(new URL('.env', import.meta.url), 'utf8');
env.split(/\r?\n/).forEach(line => {
  const idx = line.indexOf('=');
  if (idx > 0) {
    const k = line.slice(0, idx).trim();
    const v = line.slice(idx + 1).trim();
    if (k) process.env[k] = v;
  }
});

const WP_URL = 'https://beachhydrovac.com';
const WP_USER = process.env.BEACH_HYDROVAC_WP_USER;
const WP_PASS = process.env.BEACH_HYDROVAC_WP_PASSWORD;
const AUTH = 'Basic ' + Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64');

console.log('Using credentials:', WP_USER, WP_PASS ? '[PASSWORD SET]' : '[NO PASSWORD]');

async function api(method, path, body = null) {
  const url = `${WP_URL}${path}`;
  const opts = {
    method,
    headers: { 'Authorization': AUTH, 'Content-Type': 'application/json' },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(url, opts);
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = text; }
  return { status: res.status, body: json };
}

const DUPLICATES = [
  { from: '/norfolk-hydrovac/',      to: '/locations/norfolk/' },
  { from: '/chesapeake-hydrovac/',   to: '/locations/chesapeake/' },
  { from: '/newport-news-hydrovac/', to: '/locations/newport-news/' },
  { from: '/suffolk-hydrovac/',      to: '/locations/suffolk/' },
  { from: '/hampton-hydrovac/',      to: '/locations/hampton/' },
  { from: '/portsmouth-hydrovac/',   to: '/locations/portsmouth/' },
];

async function main() {
  console.log('\n=== Beach HydroVac SEO Fix Script ===\n');

  // 1. Auth test
  console.log('1. Testing API connection...');
  const me = await api('GET', '/wp-json/wp/v2/users/me');
  if (me.status !== 200) {
    console.error(`   AUTH FAILED (${me.status}):`, JSON.stringify(me.body).substring(0, 300));
    process.exit(1);
  }
  console.log(`   Connected as: ${me.body.name} (${me.body.slug})\n`);

  // 2. Disable author sitemap
  console.log('2. Disabling author sitemap (Yoast SEO)...');
  const yoastGet = await api('GET', '/wp-json/yoast/v1/configuration');
  console.log(`   Yoast config status: ${yoastGet.status}`);
  if (yoastGet.status === 200) {
    const cur = yoastGet.body;
    console.log('   disable_author_sitemap:', cur.disable_author_sitemap);
    if (!cur.disable_author_sitemap) {
      const patch = await api('POST', '/wp-json/yoast/v1/configuration', {
        disable_author_sitemap: true,
      });
      if (patch.status === 200) {
        console.log('   Author sitemap DISABLED successfully.');
      } else {
        console.log(`   POST failed (${patch.status}):`, JSON.stringify(patch.body).substring(0, 300));
      }
    } else {
      console.log('   Already disabled. No change needed.');
    }
  } else {
    // Yoast Free doesn't expose /configuration — use wpseo option via WP REST
    console.log(`   Yoast config endpoint not available (${yoastGet.status}). Trying WP options...`);
    // Fetch current wpseo option via a Yoast-registered settings endpoint
    const yoastSettings = await api('GET', '/wp-json/yoast/v1/get_head?url=' + encodeURIComponent('https://beachhydrovac.com/'));
    console.log(`   Yoast get_head status: ${yoastSettings.status}`);
    // The author sitemap in Yoast Free is controlled by wpseo option 'disable_author_sitemap'
    // We can update it via the WP options REST API if registered, otherwise note it for manual fix
    const optCheck = await api('GET', '/wp-json/wp/v2/settings');
    const hasWpseoOption = optCheck.body && 'wpseo' in optCheck.body;
    if (hasWpseoOption) {
      const cur = optCheck.body.wpseo;
      const upd = await api('POST', '/wp-json/wp/v2/settings', {
        wpseo: { ...cur, disable_author_sitemap: true }
      });
      console.log(`   wpseo settings update: ${upd.status === 200 ? 'OK' : 'FAIL ' + upd.status}`);
    } else {
      console.log('   wpseo option not in WP REST settings.');
      console.log('   ACTION NEEDED: Go to Yoast SEO → Settings → XML Sitemaps → Disable "Author sitemap"');
    }
  }
  console.log();

  // 3. Duplicate pages
  console.log('3. Handling duplicate location pages...');
  const [redirectionRes, yoastRedir] = await Promise.all([
    api('GET', '/wp-json/redirection/v1/redirect'),
    api('GET', '/wp-json/yoast/v1/redirects'),
  ]);
  const hasRedirectionPlugin = redirectionRes.status !== 404;
  const hasYoastRedirects = yoastRedir.status !== 404;
  console.log(`   Redirection plugin: ${hasRedirectionPlugin} (${redirectionRes.status})`);
  console.log(`   Yoast Premium redirects: ${hasYoastRedirects} (${yoastRedir.status})`);

  const pagesRes = await api('GET', '/wp-json/wp/v2/pages?per_page=100&_fields=id,slug,link,status');
  if (pagesRes.status !== 200) {
    console.log('   Could not fetch pages:', pagesRes.status);
  } else {
    for (const dup of DUPLICATES) {
      const slug = dup.from.replace(/\//g, '');
      const page = pagesRes.body.find(p => p.slug === slug);
      if (!page) { console.log(`\n   No page found for slug: ${slug}`); continue; }
      console.log(`\n   ${dup.from} → ID:${page.id} status:${page.status}`);

      if (hasRedirectionPlugin) {
        const r = await api('POST', '/wp-json/redirection/v1/redirect', {
          url: dup.from,
          action_type: 'url',
          action_data: { url: dup.to },
          match_type: 'url',
          status_code: 301,
          enabled: true,
          group_id: 1,
        });
        const ok = r.status === 200 || r.status === 201;
        console.log(`   301 via Redirection plugin: ${ok ? 'CREATED' : 'FAIL ' + r.status}`);
        if (!ok) console.log('   ', JSON.stringify(r.body).substring(0, 200));
      } else if (hasYoastRedirects) {
        const r = await api('POST', '/wp-json/yoast/v1/redirects', {
          origin: dup.from, url: dup.to, type: 301,
        });
        const ok = r.status === 200 || r.status === 201;
        console.log(`   301 via Yoast Premium: ${ok ? 'CREATED' : 'FAIL ' + r.status}`);
      } else {
        // No redirect plugin — noindex these duplicate pages via Yoast meta
        console.log('   No redirect plugin. Setting noindex via Yoast meta...');
        const upd = await api('POST', `/wp-json/wp/v2/pages/${page.id}`, {
          meta: {
            '_yoast_wpseo_meta-robots-noindex': '1',
          }
        });
        if (upd.status === 200) {
          const robots = upd.body.yoast_head_json?.robots;
          console.log(`   Noindex set. Robots: ${JSON.stringify(robots)}`);
        } else {
          console.log(`   Noindex update FAILED: ${upd.status}`);
        }
      }
    }
  }
  console.log();

  // 4. H1 check on homepage
  console.log('4. Checking H1 + SEO meta on homepage...');
  const settings = await api('GET', '/wp-json/wp/v2/settings');
  const homepageId = settings.body?.page_on_front;
  console.log(`   Front page ID: ${homepageId}`);
  if (homepageId) {
    const hp = await api('GET', `/wp-json/wp/v2/pages/${homepageId}?_fields=id,title,content,yoast_head_json`);
    if (hp.status === 200) {
      const content = hp.body.content?.rendered || '';
      const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      if (h1Match) {
        console.log(`   H1: "${h1Match[1].replace(/<[^>]+>/g, '').trim()}"`);
      } else {
        console.log('   No H1 in REST content (likely inside Elementor builder data - check manually).');
      }
      const y = hp.body.yoast_head_json;
      console.log(`   SEO Title: ${y?.title}`);
      console.log(`   Meta Desc: ${y?.description}`);
      console.log(`   Robots: ${JSON.stringify(y?.robots)}`);
    }
  }

  console.log('\n=== Done ===');
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1); });
