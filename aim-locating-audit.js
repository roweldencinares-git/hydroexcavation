import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const AIM_URL = 'https://aimlocatingva.com';
const auth = 'Basic ' + Buffer.from('Rowelden:VxoJ exxM 6ljY WGSD NbYW 8FP8').toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

async function main() {
  // 1. Test credentials
  console.log('=== TESTING AIM LOCATING CREDENTIALS ===\n');
  const userR = await fetch(`${AIM_URL}/wp-json/wp/v2/users/me`, { headers });
  if (userR.ok) {
    const user = await userR.json();
    console.log(`✅ ACCESS GRANTED`);
    console.log(`   User: ${user.name} (${user.slug})`);
    console.log(`   Roles: ${JSON.stringify(user.roles)}`);
    console.log(`   Email: ${user.email || 'hidden'}`);
  } else {
    console.log(`❌ Access denied: ${userR.status}`);
    const text = await userR.text();
    console.log(text.substring(0, 300));
    return;
  }

  // 2. Get all pages with details
  console.log('\n\n=== ALL PAGES ===\n');
  const pagesR = await fetch(`${AIM_URL}/wp-json/wp/v2/pages?per_page=100&status=publish`, { headers });
  const pages = await pagesR.json();

  for (const page of pages) {
    const content = page.content?.rendered || '';
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(w => w.length > 0).length;
    const yoastTitle = page.yoast_head_json?.title || '';
    const yoastDesc = page.yoast_head_json?.og_description || page.yoast_head_json?.description || '';
    const focusKw = page.meta?._yoast_wpseo_focuskw || '';

    console.log(`ID:${page.id} /${page.slug}/`);
    console.log(`  Title: ${page.title.rendered}`);
    console.log(`  Yoast Title: ${yoastTitle.substring(0, 70)}`);
    console.log(`  Meta Desc: ${yoastDesc.substring(0, 80) || 'NONE'}`);
    console.log(`  Focus KW: ${focusKw || 'NONE'}`);
    console.log(`  Words: ${wordCount}`);
    console.log(`  Modified: ${page.modified}`);
    console.log('');
  }

  // 3. Get all posts
  console.log('\n=== ALL POSTS ===\n');
  const postsR = await fetch(`${AIM_URL}/wp-json/wp/v2/posts?per_page=100&status=publish`, { headers });
  const posts = await postsR.json();
  console.log(`Total posts: ${Array.isArray(posts) ? posts.length : 0}`);

  // 4. Full homepage audit
  console.log('\n\n=== HOMEPAGE DEEP AUDIT ===\n');
  const homeR = await fetch(AIM_URL + '/');
  const homeHtml = await homeR.text();
  const $ = cheerio.load(homeHtml);

  // H tags
  console.log('H1 tags:');
  $('h1').each((i, el) => console.log(`  ${i+1}. "${$(el).text().trim().substring(0, 80)}"`));
  console.log(`\nH2 tags:`);
  $('h2').each((i, el) => console.log(`  ${i+1}. "${$(el).text().trim().substring(0, 80)}"`));

  // Schema
  console.log('\n\nSchema blocks:');
  $('script[type="application/ld+json"]').each((i, el) => {
    const raw = $(el).html();
    try {
      const parsed = JSON.parse(raw);
      console.log(`  Block ${i+1}: @type = ${parsed['@type'] || JSON.stringify(Object.keys(parsed)).substring(0, 80)}`);
      if (parsed.name) console.log(`    name: ${parsed.name}`);
      if (parsed.url) console.log(`    url: ${parsed.url}`);
      if (parsed.telephone) console.log(`    phone: ${parsed.telephone}`);
    } catch {
      console.log(`  Block ${i+1}: PARSE ERROR — ${raw.substring(0, 150)}`);
    }
  });

  // Canonical
  const canonical = $('link[rel="canonical"]').attr('href');
  console.log(`\nCanonical: ${canonical || 'MISSING'}`);

  // Meta
  console.log(`Meta Desc: ${$('meta[name="description"]').attr('content') || 'MISSING'}`);
  console.log(`OG Title: ${$('meta[property="og:title"]').attr('content') || 'MISSING'}`);

  // Images
  const images = $('img');
  let imagesNoAlt = 0;
  images.each((i, el) => {
    if (!$(el).attr('alt') || $(el).attr('alt').trim() === '') imagesNoAlt++;
  });
  console.log(`\nImages: ${images.length} total, ${imagesNoAlt} missing alt text`);

  // External links
  console.log('\nExternal links:');
  const extLinks = new Set();
  $('a[href]').each((i, el) => {
    const href = $(el).attr('href') || '';
    if (href.startsWith('http') && !href.includes('aimlocatingva.com')) {
      extLinks.add(href);
    }
  });
  [...extLinks].forEach(l => console.log(`  → ${l}`));

  // 5. Check each location page
  console.log('\n\n=== LOCATION PAGES AUDIT ===\n');
  const locationPages = pages.filter(p =>
    p.slug.includes('locating') || p.slug.includes('portsmouth') ||
    p.slug.includes('suffolk') || p.slug.includes('norfolk') ||
    p.slug.includes('chesapeake') || p.slug.includes('virginia-beach')
  );

  for (const lp of locationPages) {
    const lpR = await fetch(lp.link);
    const lpHtml = await lpR.text();
    const lp$ = cheerio.load(lpHtml);

    const h1s = [];
    lp$('h1').each((i, el) => h1s.push(lp$(el).text().trim()));

    const hasBeachLink = lpHtml.includes('beachhydrovac.com');
    const hasHydro = lpHtml.toLowerCase().includes('hydro excavation');
    const hasPotholing = lpHtml.toLowerCase().includes('potholing');

    console.log(`${lp.title.rendered}`);
    console.log(`  URL: ${lp.link}`);
    console.log(`  H1s: ${h1s.length} — ${h1s[0]?.substring(0, 60) || 'none'}`);
    console.log(`  Links to Beach HydroVac: ${hasBeachLink ? '✅' : '❌'}`);
    console.log(`  Mentions hydro excavation: ${hasHydro ? '✅' : '❌'}`);
    console.log(`  Mentions potholing: ${hasPotholing ? '✅' : '❌'}`);
    console.log('');
  }

  // 6. Overall SEO scorecard
  console.log('\n' + '='.repeat(60));
  console.log('AIM LOCATING — SEO SCORECARD');
  console.log('='.repeat(60));

  const checks = [
    { name: 'Single H1 per page', pass: $('h1').length === 1 },
    { name: 'Meta description', pass: !!$('meta[name="description"]').attr('content') },
    { name: 'Canonical tag', pass: !!canonical },
    { name: 'Schema markup', pass: $('script[type="application/ld+json"]').length > 0 },
    { name: 'OG tags', pass: !!$('meta[property="og:title"]').attr('content') },
    { name: 'Image alt texts', pass: imagesNoAlt === 0 },
    { name: 'Links to Beach HydroVac', pass: homeHtml.includes('beachhydrovac.com') },
    { name: 'Blog content', pass: Array.isArray(posts) && posts.length > 0 },
    { name: 'HTTPS', pass: AIM_URL.startsWith('https') },
    { name: 'Internal linking', pass: $('a[href*="aimlocatingva.com"]').length > 5 },
  ];

  let passed = 0;
  for (const check of checks) {
    console.log(`  ${check.pass ? '✅' : '❌'} ${check.name}`);
    if (check.pass) passed++;
  }
  console.log(`\n  SCORE: ${passed}/${checks.length} (${Math.round(passed/checks.length*100)}%)`);

  console.log('\n\n=== WHAT AIM LOCATING IS DOING WELL ===');
  console.log(`
  ✅ Local city pages (5 cities — same markets as Beach HydroVac)
  ✅ HTTPS secure
  ✅ WordPress + Yoast SEO installed
  ✅ Mentions potholing, vacuum excavation, SUE, GPR
  ✅ 30+ years experience mentioned
  ✅ Local phone number prominent
  ✅ Services page with detailed offerings
  `);

  console.log('=== OPPORTUNITIES TO BOOST BEACH HYDROVAC ===');
  console.log(`
  ❌ ZERO links to beachhydrovac.com (massive missed opportunity)
  ❌ ZERO mention of "Beach HydroVac" or "hydro excavation division"
  ❌ Schema markup broken/incomplete (needs LocalBusiness)
  ❌ 3 H1 tags on homepage (should be 1)
  ❌ No blog posts (0 content marketing)
  ❌ Location pages don't cross-reference hydro excavation services
  ❌ About page doesn't mention Beach HydroVac as subsidiary/division
  ❌ No sameAs/subsidiary schema connecting the two businesses
  `);
}

main().catch(console.error);
