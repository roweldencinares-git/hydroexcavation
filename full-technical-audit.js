import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(
  process.env.BEACH_HYDROVAC_WP_USER + ':' + process.env.BEACH_HYDROVAC_WP_PASSWORD
).toString('base64');
const wpHeaders = { 'Authorization': auth, 'Content-Type': 'application/json' };

async function main() {
  console.log('='.repeat(70));
  console.log('BEACH HYDROVAC - FULL TECHNICAL SEO AUDIT');
  console.log('='.repeat(70));

  // ============================================================
  // 1. ROBOTS.TXT
  // ============================================================
  console.log('\n\n📋 1. ROBOTS.TXT\n' + '-'.repeat(40));
  try {
    const r = await fetch('https://beachhydrovac.com/robots.txt');
    const text = await r.text();
    console.log(text);
    // Check for issues
    if (text.includes('Disallow: /')) {
      console.log('⚠️  WARNING: Broad disallow detected');
    }
    if (!text.includes('Sitemap:')) {
      console.log('❌ MISSING: No sitemap declaration in robots.txt');
    } else {
      console.log('✅ Sitemap declared in robots.txt');
    }
  } catch (e) {
    console.log('❌ FAILED to fetch robots.txt:', e.message);
  }

  // ============================================================
  // 2. CANONICAL TAGS AUDIT
  // ============================================================
  console.log('\n\n📋 2. CANONICAL TAGS AUDIT\n' + '-'.repeat(40));

  // Get all published pages and posts
  const pages = [];
  let page = 1;
  while (true) {
    const r = await fetch(`${WP_URL}/wp-json/wp/v2/pages?per_page=100&page=${page}&status=publish`, { headers: wpHeaders });
    const data = await r.json();
    if (!data.length) break;
    pages.push(...data);
    page++;
  }

  const postsR = await fetch(`${WP_URL}/wp-json/wp/v2/posts?per_page=100&status=publish`, { headers: wpHeaders });
  const posts = await postsR.json();
  const allContent = [...pages, ...posts];

  let canonicalIssues = 0;
  let canonicalOk = 0;
  let noindexCount = 0;

  for (const item of allContent) {
    const url = item.link;
    try {
      const r = await fetch(url, { redirect: 'follow' });
      const html = await r.text();

      // Check canonical
      const canonicalMatch = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/);
      const canonical = canonicalMatch ? canonicalMatch[1] : null;

      // Check noindex
      const hasNoindex = html.includes('noindex') && (
        html.includes('<meta name="robots"') || html.includes('name="googlebot"')
      );

      // Check for duplicate canonicals
      const allCanonicals = html.match(/<link[^>]+rel="canonical"/g) || [];

      const title = item.title.rendered.substring(0, 50);

      if (!canonical) {
        console.log(`❌ NO CANONICAL: ${title} → ${url}`);
        canonicalIssues++;
      } else if (allCanonicals.length > 1) {
        console.log(`❌ DUPLICATE CANONICAL (${allCanonicals.length}x): ${title} → ${url}`);
        canonicalIssues++;
      } else if (canonical !== url && canonical !== url.replace(/\/$/, '')) {
        console.log(`⚠️  MISMATCH: ${title}`);
        console.log(`   Page URL:   ${url}`);
        console.log(`   Canonical:  ${canonical}`);
        canonicalIssues++;
      } else {
        canonicalOk++;
      }

      if (hasNoindex) {
        console.log(`🚫 NOINDEX: ${title} → ${url}`);
        noindexCount++;
      }
    } catch (e) {
      console.log(`⚠️  FETCH ERROR: ${item.title.rendered.substring(0, 40)} → ${e.message}`);
    }
  }

  console.log(`\nCanonical Summary: ${canonicalOk} OK, ${canonicalIssues} issues`);
  console.log(`Noindex pages: ${noindexCount}`);

  // ============================================================
  // 3. SITEMAP AUDIT
  // ============================================================
  console.log('\n\n📋 3. SITEMAP AUDIT\n' + '-'.repeat(40));

  const sitemaps = [
    'sitemap_index.xml',
    'page-sitemap.xml',
    'post-sitemap.xml',
  ];

  for (const sm of sitemaps) {
    try {
      const r = await fetch(`https://beachhydrovac.com/${sm}`);
      if (r.ok) {
        const text = await r.text();
        const urlCount = (text.match(/<loc>/g) || []).length;
        console.log(`✅ ${sm}: ${r.status} OK - ${urlCount} URLs`);
      } else {
        console.log(`❌ ${sm}: ${r.status} ${r.statusText}`);
      }
    } catch (e) {
      console.log(`❌ ${sm}: ${e.message}`);
    }
  }

  // ============================================================
  // 4. SCHEMA AUDIT (via Code Snippet #7)
  // ============================================================
  console.log('\n\n📋 4. SCHEMA MARKUP AUDIT\n' + '-'.repeat(40));

  const snippetR = await fetch(`${WP_URL}/wp-json/code-snippets/v1/snippets/7`, { headers: wpHeaders });
  const snippet = await snippetR.json();
  const code = snippet.code || '';

  const schemaTypes = ['LocalBusiness', 'Organization', 'Service', 'FAQPage', 'HowTo', 'BreadcrumbList', 'WebSite', 'WebPage'];
  for (const type of schemaTypes) {
    if (code.includes(`"@type": "${type}"`)) {
      console.log(`✅ ${type} schema: Present`);
    } else {
      console.log(`❌ ${type} schema: MISSING`);
    }
  }

  // Check homepage for all schema types
  console.log('\nChecking live homepage for schema...');
  try {
    const r = await fetch('https://beachhydrovac.com/');
    const html = await r.text();
    const schemaBlocks = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
    console.log(`Found ${schemaBlocks.length} JSON-LD blocks on homepage`);

    for (const block of schemaBlocks) {
      try {
        const json = block.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>/, '');
        const parsed = JSON.parse(json);
        const type = parsed['@type'] || (parsed['@graph'] ? 'Graph' : 'Unknown');
        console.log(`  → @type: ${type}`);
      } catch {
        console.log(`  → (parse error, checking raw...)`);
        const typeMatch = block.match(/"@type"\s*:\s*"([^"]+)"/);
        if (typeMatch) console.log(`  → @type: ${typeMatch[1]}`);
      }
    }
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }

  // ============================================================
  // 5. HEADER DUPLICATE CHECK
  // ============================================================
  console.log('\n\n📋 5. HEADER CLEANLINESS AUDIT\n' + '-'.repeat(40));

  try {
    const r = await fetch('https://beachhydrovac.com/');
    const html = await r.text();
    const head = html.substring(0, html.indexOf('</head>'));

    // Check duplicate meta tags
    const ogTitles = (head.match(/property="og:title"/g) || []).length;
    const ogDescs = (head.match(/property="og:description"/g) || []).length;
    const ogImages = (head.match(/property="og:image"/g) || []).length;
    const metaDescs = (head.match(/name="description"/g) || []).length;
    const twitterCards = (head.match(/name="twitter:card"/g) || []).length;

    console.log(`og:title count: ${ogTitles} ${ogTitles > 1 ? '❌ DUPLICATE' : '✅'}`);
    console.log(`og:description count: ${ogDescs} ${ogDescs > 1 ? '❌ DUPLICATE' : '✅'}`);
    console.log(`og:image count: ${ogImages} ${ogImages > 1 ? '❌ DUPLICATE' : '✅'}`);
    console.log(`meta description count: ${metaDescs} ${metaDescs > 1 ? '❌ DUPLICATE' : '✅'}`);
    console.log(`twitter:card count: ${twitterCards} ${twitterCards > 1 ? '❌ DUPLICATE' : '✅'}`);

    // Check for duplicate scripts
    const scripts = head.match(/<script[^>]*src="([^"]+)"/g) || [];
    const scriptSrcs = scripts.map(s => s.match(/src="([^"]+)"/)[1]);
    const dupeScripts = scriptSrcs.filter((s, i) => scriptSrcs.indexOf(s) !== i);
    if (dupeScripts.length) {
      console.log(`\n❌ DUPLICATE SCRIPTS FOUND:`);
      dupeScripts.forEach(s => console.log(`  → ${s}`));
    } else {
      console.log(`\n✅ No duplicate scripts in <head>`);
    }

    // Check for duplicate stylesheets
    const styles = head.match(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g) || [];
    const styleSrcs = styles.map(s => s.match(/href="([^"]+)"/)[1]);
    const dupeStyles = styleSrcs.filter((s, i) => styleSrcs.indexOf(s) !== i);
    if (dupeStyles.length) {
      console.log(`❌ DUPLICATE STYLESHEETS:`);
      dupeStyles.forEach(s => console.log(`  → ${s}`));
    } else {
      console.log(`✅ No duplicate stylesheets in <head>`);
    }

    // Count total head elements
    const totalMeta = (head.match(/<meta /g) || []).length;
    const totalLink = (head.match(/<link /g) || []).length;
    const totalScript = (head.match(/<script/g) || []).length;
    console.log(`\nHead weight: ${totalMeta} meta tags, ${totalLink} link tags, ${totalScript} scripts`);

  } catch (e) {
    console.log(`Error: ${e.message}`);
  }

  // ============================================================
  // 6. BING WEBMASTER CHECK
  // ============================================================
  console.log('\n\n📋 6. BING WEBMASTER STATUS\n' + '-'.repeat(40));
  console.log('❌ Bing Webmaster Tools: NOT configured');
  console.log('   Action needed: Submit site at bing.com/webmasters');
  console.log('   Can import from Google Search Console for quick setup');

  // ============================================================
  // 7. MISSING ITEMS SUMMARY
  // ============================================================
  console.log('\n\n' + '='.repeat(70));
  console.log('GAP ANALYSIS vs CHECKLIST');
  console.log('='.repeat(70));

  console.log(`
1. SUBDOMAIN CLUSTERS + ENTITY GRAPHS + INTERLINK RULES
   Status: ⚠️ PARTIAL
   ✅ Done: 211+ internal links built, contextual linking across all pages
   ❌ Missing: No subdomain architecture (blog.beachhydrovac.com, etc.)
   ❌ Missing: No formal entity graph (topic clusters mapped)
   ❌ Missing: No documented interlink rules/strategy
   Note: Subdomains may be OVERKILL for a 46-page site. Topic clusters
         on the main domain are more appropriate at this scale.

2. CANONICAL, META-NOINDEX, ROBOTS, SITEMAPS (BING + GOOGLE)
   Status: ⚠️ PARTIAL
   ✅ Done: Google sitemaps submitted (3x)
   ✅ Done: Canonical audit run (results above)
   ❌ Missing: Bing Webmaster Tools not configured
   ❌ Missing: Bing sitemap not submitted
   ❌ Missing: No formal noindex audit documented

3. SCHEMA (Organization, Service, FAQ, HowTo)
   Status: ⚠️ PARTIAL
   ✅ Done: LocalBusiness schema (enhanced with Geo, 24 areas, OfferCatalog)
   ✅ Done: Service schema (5 services)
   ✅ Done: FAQPage schema (15 questions)
   ❌ Missing: HowTo schema (for blog posts like "What is Hydro Excavation")
   ❌ Missing: BreadcrumbList schema
   ❌ Missing: WebSite schema (sitelinks search box)
   ❌ Missing: Formal validation against Google Rich Results Test

4. HEADER CLEANUP + TRUST DESIGN
   Status: ⚠️ PARTIAL
   ✅ Done: Fixed duplicate H1 tags (3 pages)
   ✅ Done: Fixed duplicate OG tags (previous session)
   Results above show current duplicate status
   ❌ Missing: Full header weight optimization
   ❌ Missing: Trust signals audit (SSL, security headers, etc.)

5. LLM ROUTING (provider switching, cost caps, timing logs)
   Status: ❌ NOT APPLICABLE
   This is a dashboard/infrastructure feature, not a site SEO feature.
   Beach HydroVac is a WordPress site, not an LLM-powered app.

6. SOPs, QA CHECKLISTS, WEEKLY INDEXATION KPIs
   Status: ❌ NOT STARTED
   ❌ Missing: SOPs for content updates
   ❌ Missing: QA checklist for new pages
   ❌ Missing: Weekly KPI reporting schedule
   ❌ Missing: GSC indexation monitoring automation
`);
}

main().catch(console.error);
