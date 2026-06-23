import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function main() {
  console.log('='.repeat(70));
  console.log('AIM LOCATING VA — CROSS-DOMAIN AUDIT');
  console.log('Goal: Leverage AIM authority to boost Beach HydroVac');
  console.log('='.repeat(70));

  // 1. Fetch homepage
  let html;
  try {
    const r = await fetch('https://aimlocatingva.com/', { timeout: 15000 });
    html = await r.text();
    console.log(`\n✅ Site loaded: ${r.status}`);
  } catch (e) {
    console.log(`\n❌ Could not load aimlocatingva.com: ${e.message}`);
    // Try www
    try {
      const r2 = await fetch('https://www.aimlocatingva.com/', { timeout: 15000 });
      html = await r2.text();
      console.log(`✅ Loaded via www: ${r2.status}`);
    } catch (e2) {
      console.log(`❌ Also failed with www: ${e2.message}`);
      return;
    }
  }

  const $ = cheerio.load(html);

  // 2. Basic info
  console.log('\n\n📋 SITE OVERVIEW');
  console.log('-'.repeat(40));
  console.log(`Title: ${$('title').text()}`);
  console.log(`Meta Desc: ${$('meta[name="description"]').attr('content') || 'NONE'}`);
  console.log(`H1: ${$('h1').first().text().trim().substring(0, 80)}`);
  console.log(`H1 count: ${$('h1').length}`);

  // 3. Check for Beach HydroVac mentions
  console.log('\n\n🔗 BEACH HYDROVAC CONNECTIONS');
  console.log('-'.repeat(40));

  const hasBeachHydrovac = html.toLowerCase().includes('beach hydrovac') || html.toLowerCase().includes('beachhydrovac');
  const hasHydroExcavation = html.toLowerCase().includes('hydro excavation') || html.toLowerCase().includes('hydrovac');
  const linksToBeach = html.includes('beachhydrovac.com');

  console.log(`Mentions "Beach HydroVac": ${hasBeachHydrovac ? '✅ Yes' : '❌ No'}`);
  console.log(`Mentions "hydro excavation": ${hasHydroExcavation ? '✅ Yes' : '❌ No'}`);
  console.log(`Links to beachhydrovac.com: ${linksToBeach ? '✅ Yes' : '❌ No — OPPORTUNITY'}`);

  // 4. Schema check
  console.log('\n\n📊 SCHEMA MARKUP');
  console.log('-'.repeat(40));

  const schemaBlocks = $('script[type="application/ld+json"]');
  console.log(`JSON-LD blocks: ${schemaBlocks.length}`);

  schemaBlocks.each((i, el) => {
    try {
      const parsed = JSON.parse($(el).html());
      const type = parsed['@type'] || 'Unknown';
      console.log(`  → @type: ${type}`);
      if (parsed.name) console.log(`    name: ${parsed.name}`);
      if (parsed.url) console.log(`    url: ${parsed.url}`);
      if (parsed.telephone) console.log(`    phone: ${parsed.telephone}`);
      if (parsed.address) console.log(`    address: ${JSON.stringify(parsed.address).substring(0, 100)}`);
      if (parsed.sameAs) console.log(`    sameAs: ${JSON.stringify(parsed.sameAs)}`);
    } catch {}
  });

  // 5. Navigation / pages
  console.log('\n\n📄 SITE STRUCTURE');
  console.log('-'.repeat(40));

  const links = new Set();
  $('a[href]').each((i, el) => {
    const href = $(el).attr('href') || '';
    if (href.includes('aimlocatingva.com') || (href.startsWith('/') && !href.startsWith('//'))) {
      const clean = href.replace(/^https?:\/\/(www\.)?aimlocatingva\.com/, '').replace(/#.*$/, '');
      if (clean && clean !== '/' && !clean.includes('wp-content') && !clean.includes('wp-includes') && !clean.startsWith('//')) {
        links.add(clean);
      }
    }
  });

  const sortedLinks = [...links].sort();
  console.log(`Internal links found: ${sortedLinks.length}`);
  for (const link of sortedLinks) {
    console.log(`  → ${link}`);
  }

  // 6. Check services mentioned
  console.log('\n\n🔧 SERVICES MENTIONED');
  console.log('-'.repeat(40));

  const services = [
    'utility locating', 'utility location', 'underground utility',
    'private utility', 'GPR', 'ground penetrating radar',
    'electromagnetic', 'EM locating', 'SUE', 'subsurface utility',
    'hydro excavation', 'hydrovac', 'potholing', 'daylighting',
    'slot trenching', 'vacuum excavation', 'fiber optic',
    'concrete scanning', 'CCTV', 'sewer inspection',
    'mapping', 'designating', 'marking',
    '811', 'miss utility', 'one call'
  ];

  const htmlLower = html.toLowerCase();
  for (const svc of services) {
    if (htmlLower.includes(svc.toLowerCase())) {
      console.log(`  ✅ ${svc}`);
    }
  }

  // 7. Contact info
  console.log('\n\n📞 CONTACT INFO');
  console.log('-'.repeat(40));

  const phoneMatch = html.match(/[\(]?\d{3}[\)]?[-.\s]?\d{3}[-.\s]?\d{4}/g);
  if (phoneMatch) {
    const uniquePhones = [...new Set(phoneMatch)];
    uniquePhones.forEach(p => console.log(`  Phone: ${p}`));
  }

  const emailMatch = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g);
  if (emailMatch) {
    const uniqueEmails = [...new Set(emailMatch)];
    uniqueEmails.forEach(e => console.log(`  Email: ${e}`));
  }

  // 8. Check for WordPress
  console.log('\n\n🔧 PLATFORM');
  console.log('-'.repeat(40));

  const isWP = html.includes('wp-content') || html.includes('wp-includes') || html.includes('wordpress');
  const hasYoast = html.includes('Yoast') || html.includes('yoast');
  console.log(`WordPress: ${isWP ? '✅ Yes' : '❌ No'}`);
  console.log(`Yoast SEO: ${hasYoast ? '✅ Yes' : '❌ No'}`);

  // 9. External links (outbound)
  console.log('\n\n🌐 EXTERNAL LINKS');
  console.log('-'.repeat(40));

  const externalLinks = new Set();
  $('a[href]').each((i, el) => {
    const href = $(el).attr('href') || '';
    if (href.startsWith('http') && !href.includes('aimlocatingva.com')) {
      try {
        const domain = new URL(href).hostname;
        externalLinks.add(domain);
      } catch {}
    }
  });

  console.log(`External domains linked: ${externalLinks.size}`);
  for (const domain of [...externalLinks].sort()) {
    console.log(`  → ${domain}`);
  }

  // 10. Check key inner pages
  console.log('\n\n📄 CHECKING KEY INNER PAGES');
  console.log('-'.repeat(40));

  const pagesToCheck = sortedLinks.filter(l =>
    !l.includes('#') && !l.includes('?') && !l.includes('.jpg') &&
    !l.includes('.png') && !l.includes('.css') && !l.includes('.js') &&
    l.length > 1
  ).slice(0, 15);

  for (const pagePath of pagesToCheck) {
    try {
      const fullUrl = `https://aimlocatingva.com${pagePath}`;
      const r = await fetch(fullUrl, { timeout: 10000 });
      if (r.ok) {
        const pageHtml = await r.text();
        const page$ = cheerio.load(pageHtml);
        const pageTitle = page$('title').text().substring(0, 60);
        const linksToBeach = pageHtml.includes('beachhydrovac.com');
        const mentionsHydro = pageHtml.toLowerCase().includes('hydro excavation') || pageHtml.toLowerCase().includes('hydrovac');
        console.log(`  ${r.status} ${pagePath}`);
        console.log(`     Title: ${pageTitle}`);
        console.log(`     Links to Beach: ${linksToBeach ? '✅' : '❌'} | Mentions hydro: ${mentionsHydro ? '✅' : '❌'}`);
      } else {
        console.log(`  ${r.status} ${pagePath} — ${r.statusText}`);
      }
    } catch (e) {
      console.log(`  ❌ ${pagePath} — ${e.message}`);
    }
  }

  // STRATEGY
  console.log('\n\n' + '='.repeat(70));
  console.log('CROSS-DOMAIN STRATEGY');
  console.log('='.repeat(70));
  console.log(`
What we can do on aimlocatingva.com to boost Beach HydroVac:

1. ADD A "HYDRO EXCAVATION" SECTION/PAGE
   → Create a page on AIM Locating about their hydro excavation division
   → Link naturally to beachhydrovac.com as "our hydro excavation division"
   → This is a legitimate, same-owner, contextual backlink

2. ADD "BEACH HYDROVAC" TO FOOTER/ABOUT
   → "AIM Locating's hydro excavation division operates as Beach HydroVac"
   → Link in footer appears on every page = sitewide authority signal

3. ADD sameAs / SUBSIDIARY SCHEMA
   → Add "subsidiary" or "department" schema connecting the two businesses
   → Google's Knowledge Graph will link the entities

4. CROSS-REFERENCE IN SERVICES
   → On AIM's utility locating pages, mention:
   → "Need hydro excavation after utility locate? Our sister company
      Beach HydroVac handles potholing and daylighting."

5. SHARED TESTIMONIALS / CASE STUDIES
   → Joint projects mentioned on both sites build entity co-occurrence
  `);
}

main().catch(console.error);
