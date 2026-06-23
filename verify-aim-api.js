import fetch from 'node-fetch';

const AIM_URL = 'https://aimlocatingva.com';
const auth = 'Basic ' + Buffer.from('Rowelden:VxoJ exxM 6ljY WGSD NbYW 8FP8').toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

async function main() {
  console.log('=== VERIFYING DATA VIA REST API (bypasses cache) ===\n');

  // 1. Check Yoast meta on homepage
  console.log('YOAST META SAVED IN DATABASE:\n');
  const pages = [
    { id: 221, name: 'Homepage' },
    { id: 308, name: 'About' },
    { id: 331, name: 'Virginia Beach' },
    { id: 384, name: 'Chesapeake' },
    { id: 389, name: 'Norfolk' },
  ];

  for (const page of pages) {
    const r = await fetch(`${AIM_URL}/wp-json/wp/v2/pages/${page.id}`, { headers });
    const data = await r.json();
    const yoastTitle = data.yoast_head_json?.title || data.meta?._yoast_wpseo_title || 'NOT SET';
    const yoastDesc = data.yoast_head_json?.og_description || data.meta?._yoast_wpseo_metadesc || 'NOT SET';
    const focusKw = data.meta?._yoast_wpseo_focuskw || 'NOT SET';
    console.log(`  ${page.name} (ID:${page.id}):`);
    console.log(`    Title: ${yoastTitle.substring(0, 70)}`);
    console.log(`    Desc: ${yoastDesc.substring(0, 80)}`);
    console.log(`    Focus KW: ${focusKw}`);
    console.log('');
  }

  // 2. Check Code Snippet
  console.log('CODE SNIPPET STATUS:\n');
  const snippetR = await fetch(`${AIM_URL}/wp-json/code-snippets/v1/snippets`, { headers });
  if (snippetR.ok) {
    const snippets = await snippetR.json();
    for (const s of snippets) {
      console.log(`  ID:${s.id} — "${s.name}" — Active: ${s.active} — Scope: ${s.scope}`);
      if (s.code) {
        const hasBHV = s.code.includes('beachhydrovac.com');
        const hasSchema = s.code.includes('application/ld+json');
        const hasFooter = s.code.includes('Need Hydro Excavation');
        const hasLocationLinks = s.code.includes('location_pages');
        console.log(`    → Links to BHV: ${hasBHV ? '✅' : '❌'}`);
        console.log(`    → Schema markup: ${hasSchema ? '✅' : '❌'}`);
        console.log(`    → Footer banner: ${hasFooter ? '✅' : '❌'}`);
        console.log(`    → Location cross-links: ${hasLocationLinks ? '✅' : '❌'}`);
        console.log(`    → Code length: ${s.code.length} chars`);
      }
    }
  } else {
    console.log(`  Cannot fetch snippets: ${snippetR.status}`);
  }

  // 3. Try to purge W3 Total Cache
  console.log('\n\nATTEMPTING CACHE PURGE:\n');

  // Method 1: Try W3TC flush endpoint
  const flushR = await fetch(`${AIM_URL}/wp-json/w3tc/v1/flush`, {
    method: 'POST',
    headers
  });
  console.log(`  W3TC flush API: ${flushR.status} ${flushR.statusText}`);

  // Method 2: Try purging via admin-ajax
  const ajaxR = await fetch(`${AIM_URL}/wp-admin/admin-ajax.php?action=w3tc_flush_all`, {
    method: 'POST',
    headers: {
      'Authorization': auth,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  console.log(`  W3TC admin-ajax flush: ${ajaxR.status}`);

  // Method 3: Request pages with cache-busting
  console.log('\n  Fetching with cache-busting headers...');
  const bustR = await fetch(`${AIM_URL}/?nocache=${Date.now()}`, {
    headers: {
      'Cache-Control': 'no-cache, no-store',
      'Pragma': 'no-cache'
    }
  });
  const bustHtml = await bustR.text();
  const hasBHVNow = bustHtml.includes('beachhydrovac.com');
  const hasFooterNow = bustHtml.includes('Need Hydro Excavation');
  console.log(`  Cache-bust result: BHV links=${hasBHVNow ? '✅' : '❌'} Footer=${hasFooterNow ? '✅' : '❌'}`);

  if (!hasBHVNow) {
    console.log('\n⚠️  W3 Total Cache is still serving stale pages.');
    console.log('   You need to manually purge the cache:');
    console.log('   1. Go to aimlocatingva.com/wp-admin');
    console.log('   2. Click "Performance" in the left menu');
    console.log('   3. Click "Purge All Caches"');
    console.log('   OR hover the W3TC bar at top → "Purge All Caches"');
  }
}

main().catch(console.error);
