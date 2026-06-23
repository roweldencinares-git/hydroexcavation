import fetch from 'node-fetch';

const AIM_URL = 'https://aimlocatingva.com';
const auth = 'Basic ' + Buffer.from('Rowelden:VxoJ exxM 6ljY WGSD NbYW 8FP8').toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

async function main() {
  console.log('=== UPDATING SNIPPET #5 WITH YOAST META VIA PHP ===\n');

  // First get current snippet
  const currentR = await fetch(`${AIM_URL}/wp-json/code-snippets/v1/snippets/5`, { headers });
  const current = await currentR.json();
  console.log(`Current snippet: "${current.name}" — ${current.code.length} chars`);

  // Build the Yoast meta PHP code to prepend
  const yoastMetaCode = `
// ============================================================
// 0. SET YOAST SEO META FOR ALL PAGES (runs once, then skips)
// ============================================================
add_action('init', function() {
  // Only run for admin/cron, not every page load
  if (!is_admin() && !defined('DOING_CRON')) return;

  $yoast_updates = array(
    221 => array(
      'title' => 'Private Utility Locating Virginia | 30+ Years Experience | AIM Locating',
      'desc' => 'Virginia\\'s trusted private utility locating company. 30+ years experience in GPR, electromagnetic locating, SUE, and potholing. Serving Hampton Roads, Richmond & Northern VA. Call 757-785-5177.',
      'kw' => 'private utility locating virginia'
    ),
    308 => array(
      'title' => 'About AIM Locating | 30+ Years Utility Locating Experience Virginia',
      'desc' => 'Advanced Infrastructure Mapping (AIM Locating) provides expert private utility locating across Virginia. Veteran-owned with 30+ years experience. Our hydro excavation division Beach HydroVac handles potholing and daylighting.',
      'kw' => 'aim locating virginia'
    ),
    76 => array(
      'title' => 'Contact AIM Locating | Free Quote for Utility Locating Virginia',
      'desc' => 'Request a free utility locating quote from AIM Locating. Serving Virginia, North Carolina & the Mid-Atlantic. Call 757-785-5177 or submit our online form.',
      'kw' => 'utility locating quote virginia'
    ),
    343 => array(
      'title' => 'Utility Locating Services Virginia | GPR, EM Locating, SUE | AIM',
      'desc' => 'Full-service utility locating: ground penetrating radar (GPR), electromagnetic locating, subsurface utility engineering (SUE), private utility designating. Hydro excavation potholing available through Beach HydroVac.',
      'kw' => 'utility locating services virginia'
    ),
    361 => array(
      'title' => 'Subsurface Utility Engineering Virginia | ASCE 38 SUE Levels | AIM',
      'desc' => 'ASCE 38-compliant subsurface utility engineering (SUE) services in Virginia. All 4 SUE levels from desktop review to pothole verification. VDOT-approved methods.',
      'kw' => 'subsurface utility engineering virginia'
    ),
    331 => array(
      'title' => 'Private Utility Locating Virginia Beach | GPR & EM Locate | AIM',
      'desc' => 'Expert private utility locating in Virginia Beach, VA. Ground penetrating radar, electromagnetic locating, and potholing services. 30+ years experience. Call 757-785-5177.',
      'kw' => 'private utility locating virginia beach'
    ),
    384 => array(
      'title' => 'Private Utility Locating Chesapeake VA | Underground Detection | AIM',
      'desc' => 'Professional private utility locating in Chesapeake, VA. GPR scanning, electromagnetic detection, and SUE services. Need potholing? Our division Beach HydroVac serves Chesapeake.',
      'kw' => 'private utility locating chesapeake va'
    ),
    389 => array(
      'title' => 'Private Utility Locating Norfolk VA | Naval Base & Port Area | AIM',
      'desc' => 'Norfolk\\'s trusted private utility locating service. GPR, electromagnetic locating, and subsurface utility engineering near Naval Station Norfolk, ODU, and downtown. Call 757-785-5177.',
      'kw' => 'private utility locating norfolk va'
    ),
    394 => array(
      'title' => 'Private Utility Locating Suffolk VA | Harbour View & Rural Areas | AIM',
      'desc' => 'Expert private utility locating in Suffolk, VA. Serving Harbour View, downtown Suffolk, and rural areas. GPR scanning, EM locating, and potholing services available.',
      'kw' => 'private utility locating suffolk va'
    ),
    398 => array(
      'title' => 'Private Utility Locating Portsmouth VA | Shipyard & Historic Area | AIM',
      'desc' => 'Professional private utility locating in Portsmouth, VA. Serving the Naval Shipyard, Olde Towne, and surrounding areas. GPR, EM locating, and SUE services.',
      'kw' => 'private utility locating portsmouth va'
    ),
  );

  foreach ($yoast_updates as $page_id => $seo) {
    $current_title = get_post_meta($page_id, '_yoast_wpseo_title', true);
    if ($current_title !== $seo['title']) {
      update_post_meta($page_id, '_yoast_wpseo_title', $seo['title']);
      update_post_meta($page_id, '_yoast_wpseo_metadesc', $seo['desc']);
      update_post_meta($page_id, '_yoast_wpseo_focuskw', $seo['kw']);
    }
  }
}, 1);

`;

  // Combine: Yoast meta code + existing snippet code
  const newCode = yoastMetaCode + current.code;

  // Update snippet
  const updateR = await fetch(`${AIM_URL}/wp-json/code-snippets/v1/snippets/5`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      code: newCode,
      active: true
    })
  });

  if (updateR.ok) {
    const updated = await updateR.json();
    console.log(`\n✅ Snippet #5 updated — ${updated.code.length} chars`);
    console.log('   Added: Yoast meta setter for all 10 pages via update_post_meta()');
    console.log('   Runs on admin/cron requests only (not on every page load)');
    console.log('   Self-checking: only writes if value changed');
  } else {
    console.log(`\n❌ Update failed: ${updateR.status}`);
    const err = await updateR.text();
    console.log(err.substring(0, 300));
  }

  // Trigger the init hook by loading any admin page
  console.log('\n\nTriggering Yoast meta save...');
  const triggerR = await fetch(`${AIM_URL}/wp-admin/`, {
    headers: { 'Authorization': auth },
    redirect: 'manual'
  });
  console.log(`Admin page trigger: ${triggerR.status}`);

  // Wait a moment and verify
  await new Promise(r => setTimeout(r, 2000));

  console.log('\nVerifying Yoast meta was saved...');
  const verifyR = await fetch(`${AIM_URL}/wp-json/yoast/v1/indexables/post/${221}`, { headers });
  if (verifyR.ok) {
    const indexable = await verifyR.json();
    console.log('Yoast indexable for homepage:', JSON.stringify(indexable).substring(0, 300));
  } else {
    console.log(`Indexable endpoint: ${verifyR.status}`);
  }

  // Also try fetching page meta directly
  const metaR = await fetch(`${AIM_URL}/wp-json/wp/v2/pages/221?_fields=meta,yoast_head_json`, { headers });
  const metaData = await metaR.json();
  console.log('\nPage 221 yoast_head_json title:', metaData.yoast_head_json?.title || 'still empty');
  console.log('Page 221 meta:', JSON.stringify(metaData.meta || {}).substring(0, 200));

  console.log('\n\n⚠️  MANUAL STEP NEEDED:');
  console.log('   Go to aimlocatingva.com/wp-admin');
  console.log('   The Yoast meta will be written on the first admin page load.');
  console.log('   Then purge W3 Total Cache for everything to appear on the front end.');
}

main().catch(console.error);
