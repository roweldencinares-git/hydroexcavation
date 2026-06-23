import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function verify() {
  console.log('=== VERIFYING AIM LOCATING DEPLOYMENT ===\n');

  // 1. Check homepage
  const homeR = await fetch('https://aimlocatingva.com/');
  const html = await homeR.text();
  const $ = cheerio.load(html);

  // Schema check
  console.log('SCHEMA MARKUP:');
  $('script[type="application/ld+json"]').each((i, el) => {
    try {
      const parsed = JSON.parse($(el).html());
      console.log(`  Block ${i+1}: @type = ${parsed['@type']}`);
      if (parsed.department) console.log(`    department: ${parsed.department.name} (${parsed.department.url})`);
      if (parsed.sameAs) console.log(`    sameAs includes BHV: ${parsed.sameAs.includes('beachhydrovac.com')}`);
    } catch {}
  });

  // Footer banner
  const bhvLinks = (html.match(/beachhydrovac\.com/g) || []).length;
  console.log(`\nBEACH HYDROVAC REFERENCES ON HOMEPAGE: ${bhvLinks}`);
  console.log(`  Footer banner present: ${html.includes('Need Hydro Excavation') ? '✅' : '❌'}`);

  // Yoast meta
  const metaDesc = $('meta[name="description"]').attr('content') || '';
  const ogTitle = $('meta[property="og:title"]').attr('content') || '';
  console.log(`\nYOAST META:`);
  console.log(`  OG Title: ${ogTitle.substring(0, 80)}`);
  console.log(`  Meta Desc: ${metaDesc.substring(0, 100)}`);

  // 2. Check location pages for city-specific links
  console.log('\nLOCATION PAGE CROSS-LINKS:');
  const locations = [
    { name: 'Virginia Beach', slug: 'virginia-beach-utility-locating', bhvSlug: 'virginia-beach' },
    { name: 'Chesapeake', slug: 'chesapeake-private-utility-locating', bhvSlug: 'chesapeake' },
    { name: 'Norfolk', slug: 'norfolk-private-utility-locating-service', bhvSlug: 'norfolk' },
    { name: 'Suffolk', slug: 'suffolk-utility-locating', bhvSlug: 'suffolk' },
    { name: 'Portsmouth', slug: 'portsmouth-utility-locating', bhvSlug: 'portsmouth' },
  ];

  for (const loc of locations) {
    const r = await fetch(`https://aimlocatingva.com/${loc.slug}/`);
    const pageHtml = await r.text();
    const hasCityLink = pageHtml.includes(`beachhydrovac.com/locations/${loc.bhvSlug}`);
    const hasFooter = pageHtml.includes('Need Hydro Excavation');
    const hasBHV = pageHtml.includes('Beach HydroVac');
    console.log(`  ${loc.name}: city-link=${hasCityLink ? '✅' : '❌'} footer=${hasFooter ? '✅' : '❌'} BHV-mention=${hasBHV ? '✅' : '❌'}`);
  }

  // 3. Check non-location pages for footer
  console.log('\nFOOTER BANNER ON OTHER PAGES:');
  const otherPages = [
    { name: 'About', slug: 'about' },
    { name: 'Services', slug: 'utility-locating-services' },
    { name: 'Contact', slug: 'contact' },
  ];

  for (const pg of otherPages) {
    const r = await fetch(`https://aimlocatingva.com/${pg.slug}/`);
    const pageHtml = await r.text();
    const hasFooter = pageHtml.includes('Need Hydro Excavation');
    console.log(`  ${pg.name}: footer=${hasFooter ? '✅' : '❌'}`);
  }

  console.log('\n' + '='.repeat(50));
  console.log('DEPLOYMENT VERIFICATION COMPLETE');
  console.log('='.repeat(50));
}

verify().catch(console.error);
