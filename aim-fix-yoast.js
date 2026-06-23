import fetch from 'node-fetch';

const AIM_URL = 'https://aimlocatingva.com';
const auth = 'Basic ' + Buffer.from('Rowelden:VxoJ exxM 6ljY WGSD NbYW 8FP8').toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

async function main() {
  // 1. First check what meta fields are actually available
  console.log('=== DIAGNOSING YOAST META FIELDS ===\n');

  const homeR = await fetch(`${AIM_URL}/wp-json/wp/v2/pages/221`, { headers });
  const home = await homeR.json();

  console.log('Available meta keys:', Object.keys(home.meta || {}).join(', '));
  console.log('\nYoast head JSON keys:', Object.keys(home.yoast_head_json || {}).join(', '));
  console.log('\nCurrent Yoast title:', home.yoast_head_json?.title || 'none');
  console.log('Current Yoast desc:', home.yoast_head_json?.og_description || 'none');

  // 2. Try different meta key patterns
  console.log('\n\n=== TESTING META KEY PATTERNS ===\n');

  // Pattern A: Standard Yoast keys
  const testA = await fetch(`${AIM_URL}/wp-json/wp/v2/pages/221`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      meta: {
        _yoast_wpseo_title: 'TEST TITLE A',
        _yoast_wpseo_metadesc: 'TEST DESC A',
        _yoast_wpseo_focuskw: 'test keyword'
      }
    })
  });
  const dataA = await testA.json();
  console.log('Pattern A (_yoast_wpseo_*):', testA.status);
  console.log('  Meta returned:', JSON.stringify(dataA.meta || {}).substring(0, 200));

  // Pattern B: Try yoast_head directly
  const testB = await fetch(`${AIM_URL}/wp-json/wp/v2/pages/221`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      yoast_head_json: {
        title: 'TEST TITLE B'
      }
    })
  });
  console.log('Pattern B (yoast_head_json):', testB.status);

  // 3. Check if Yoast has its own REST routes
  console.log('\n\n=== CHECKING YOAST REST ROUTES ===\n');
  const routesR = await fetch(`${AIM_URL}/wp-json/`);
  const routes = await routesR.json();
  const yoastRoutes = Object.keys(routes.routes || {}).filter(r =>
    r.includes('yoast') || r.includes('wpseo')
  );
  console.log('Yoast-related routes:');
  for (const route of yoastRoutes) {
    console.log(`  ${route}`);
  }

  // 4. Re-read the page to see if Pattern A actually saved
  console.log('\n\n=== RE-CHECK AFTER UPDATE ===\n');
  const recheck = await fetch(`${AIM_URL}/wp-json/wp/v2/pages/221`, { headers });
  const recheckData = await recheck.json();
  console.log('Yoast title now:', recheckData.yoast_head_json?.title || 'UNCHANGED');
  console.log('Meta fields:', JSON.stringify(recheckData.meta || {}).substring(0, 300));

  // 5. Check the full yoast_head HTML output
  console.log('\n\nYoast head HTML (first 500 chars):');
  console.log((recheckData.yoast_head || '').substring(0, 500));
}

main().catch(console.error);
