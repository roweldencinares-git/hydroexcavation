import fetch from 'node-fetch';

async function checkPage(url, label) {
  console.log(`\n--- ${label} (${url}) ---`);
  const r = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } });
  const html = await r.text();

  const schemaBlocks = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
  console.log(`JSON-LD blocks: ${schemaBlocks.length}`);

  for (const block of schemaBlocks) {
    const json = block.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>/, '');
    try {
      const parsed = JSON.parse(json);
      const type = parsed['@type'] || 'Unknown';
      console.log(`  ✅ @type: ${type}`);

      // Validate required fields
      if (type === 'LocalBusiness') {
        const checks = ['name', 'address', 'telephone', 'geo', 'areaServed'];
        for (const field of checks) {
          console.log(`     ${parsed[field] ? '✓' : '✗'} ${field}`);
        }
      }
      if (type === 'FAQPage') {
        const qCount = parsed.mainEntity?.length || 0;
        console.log(`     ${qCount} questions`);
      }
      if (type === 'HowTo') {
        const steps = parsed.step?.length || 0;
        console.log(`     ${steps} steps, name: "${parsed.name?.substring(0, 50)}"`);
      }
      if (type === 'WebSite') {
        console.log(`     name: "${parsed.name}", searchAction: ${!!parsed.potentialAction}`);
      }
      if (type === 'BreadcrumbList') {
        const items = parsed.itemListElement?.length || 0;
        console.log(`     ${items} breadcrumb items`);
      }
    } catch {
      // Try to extract type from raw text
      const typeMatch = json.match(/"@type"\s*:\s*"([^"]+)"/);
      console.log(`  ⚠️  Parse error, @type: ${typeMatch ? typeMatch[1] : 'unknown'}`);
    }
  }

  // Check canonical
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/);
  console.log(`Canonical: ${canonical ? canonical[1] : '❌ MISSING'}`);
}

async function main() {
  console.log('=== LIVE SCHEMA VERIFICATION ===');

  await checkPage('https://beachhydrovac.com/', 'Homepage');
  await checkPage('https://beachhydrovac.com/services/', 'Services Hub');
  await checkPage('https://beachhydrovac.com/what-is-hydro-excavation/', 'What is Hydro Excavation (HowTo post)');
  await checkPage('https://beachhydrovac.com/virginia-811-miss-utility-guide/', 'Virginia 811 Guide (HowTo post)');
  await checkPage('https://beachhydrovac.com/locations/virginia-beach-2/', 'Virginia Beach Location (canonical test)');
  await checkPage('https://beachhydrovac.com/about/', 'About Page (BreadcrumbList test)');

  console.log('\n\n=== VALIDATION SUMMARY ===');
  console.log('Test these URLs in Google Rich Results Test:');
  console.log('  https://search.google.com/test/rich-results');
  console.log('  → https://beachhydrovac.com/ (LocalBusiness, WebSite, FAQ)');
  console.log('  → https://beachhydrovac.com/what-is-hydro-excavation/ (HowTo)');
  console.log('  → https://beachhydrovac.com/about/ (BreadcrumbList)');
}

main().catch(console.error);
