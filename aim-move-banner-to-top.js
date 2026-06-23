import fetch from 'node-fetch';

const AIM_URL = 'https://aimlocatingva.com';
const auth = 'Basic ' + Buffer.from('Rowelden:VxoJ exxM 6ljY WGSD NbYW 8FP8').toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

async function main() {
  console.log('='.repeat(60));
  console.log('AIM LOCATING — MOVE BEACH HYDROVAC BANNER TO TOP');
  console.log('='.repeat(60));

  // Step 1: Find the existing snippet
  console.log('\n1. Finding existing snippet...');
  const listR = await fetch(`${AIM_URL}/wp-json/code-snippets/v1/snippets`, { headers });
  if (!listR.ok) {
    console.error(`  ❌ Could not fetch snippets: ${listR.status}`);
    process.exit(1);
  }

  const snippets = await listR.json();
  const target = snippets.find(s => s.name.includes('Beach HydroVac'));
  if (!target) {
    console.error('  ❌ Could not find Beach HydroVac snippet. Check snippet name.');
    process.exit(1);
  }
  console.log(`  ✅ Found: "${target.name}" (ID: ${target.id})`);

  // Step 2: Build updated snippet — banner moves from wp_footer to wp_body_open
  const updatedCode = `
// ============================================================
// 1. LocalBusiness Schema (homepage)
// ============================================================
add_action('wp_head', function() {
  if (!is_front_page() && !is_page('home')) return;
  ?>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://aimlocatingva.com/#organization",
    "name": "AIM Locating - Advanced Infrastructure Mapping",
    "legalName": "Advanced Infrastructure Mapping, LLC",
    "description": "Virginia's premier private utility locating company with 30+ years experience. GPR, electromagnetic locating, subsurface utility engineering (SUE), and utility mapping services.",
    "url": "https://aimlocatingva.com",
    "telephone": "757-785-5177",
    "email": "rfp@aimlocatingva.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Virginia Beach",
      "addressRegion": "VA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 36.8529,
      "longitude": -75.9780
    },
    "areaServed": [
      {"@type": "State", "name": "Virginia"},
      {"@type": "State", "name": "North Carolina"},
      {"@type": "City", "name": "Virginia Beach, VA"},
      {"@type": "City", "name": "Norfolk, VA"},
      {"@type": "City", "name": "Chesapeake, VA"},
      {"@type": "City", "name": "Suffolk, VA"},
      {"@type": "City", "name": "Portsmouth, VA"},
      {"@type": "City", "name": "Hampton, VA"},
      {"@type": "City", "name": "Newport News, VA"},
      {"@type": "City", "name": "Richmond, VA"}
    ],
    "department": {
      "@type": "LocalBusiness",
      "@id": "https://beachhydrovac.com/#organization",
      "name": "Beach HydroVac",
      "description": "Hydro excavation division of AIM Locating. Potholing, daylighting, slot trenching, and vacuum excavation services across Virginia.",
      "url": "https://beachhydrovac.com",
      "telephone": "757-510-5220"
    },
    "knowsAbout": [
      "Private Utility Locating",
      "Ground Penetrating Radar (GPR)",
      "Electromagnetic Utility Locating",
      "Subsurface Utility Engineering (SUE)",
      "ASCE 38 Standards",
      "Utility Mapping",
      "Hydro Excavation",
      "Potholing",
      "Daylighting"
    ],
    "sameAs": [
      "https://www.facebook.com/Aimlocatingva/",
      "https://www.linkedin.com/in/aimlocating/",
      "https://beachhydrovac.com"
    ]
  }
  </script>
  <?php
}, 2);

// ============================================================
// 2. Beach HydroVac banner — TOP OF PAGE (all pages)
// Moved from wp_footer to wp_body_open per client request
// ============================================================
add_action('wp_body_open', function() {
  ?>
  <div style="background:#0f2134;padding:14px 30px;text-align:center;border-bottom:3px solid #e8a020;position:sticky;top:0;z-index:9999;">
    <p style="color:#ccc;margin:0;font-size:14px;line-height:1.5;">
      <strong style="color:#fff;">Need Hydro Excavation?</strong> Our division
      <a href="https://beachhydrovac.com" style="color:#e8a020;text-decoration:none;font-weight:bold;" target="_blank" rel="noopener">Beach HydroVac</a>
      provides potholing, daylighting, slot trenching &amp; vacuum excavation across Virginia.
      <a href="https://beachhydrovac.com/contact/" style="color:#e8a020;text-decoration:none;" target="_blank" rel="noopener">Get a Free Quote &rarr;</a>
    </p>
  </div>
  <?php
}, 1);

// ============================================================
// 3. Service-specific cross-links on location pages (footer)
// ============================================================
add_action('wp_footer', function() {
  $location_pages = array(
    331 => array('city' => 'Virginia Beach', 'slug' => 'virginia-beach-2'),
    384 => array('city' => 'Chesapeake', 'slug' => 'chesapeake-2'),
    389 => array('city' => 'Norfolk', 'slug' => 'norfolk-2'),
    394 => array('city' => 'Suffolk', 'slug' => 'suffolk'),
    398 => array('city' => 'Portsmouth', 'slug' => 'portsmouth'),
  );

  $current_id = get_the_ID();
  if (!isset($location_pages[$current_id])) return;

  $city = $location_pages[$current_id]['city'];
  $slug = $location_pages[$current_id]['slug'];
  ?>
  <div style="background:#f8f9fa;padding:20px 30px;border-left:4px solid #1a73e8;margin:20px auto;max-width:800px;border-radius:4px;">
    <h3 style="margin:0 0 10px 0;font-size:16px;color:#333;">Hydro Excavation in <?php echo esc_html($city); ?></h3>
    <p style="color:#555;margin:0;font-size:14px;line-height:1.6;">
      After we locate your underground utilities, our hydro excavation division
      <a href="https://beachhydrovac.com/locations/<?php echo esc_attr($slug); ?>/" style="color:#1a73e8;font-weight:600;" target="_blank" rel="noopener">Beach HydroVac <?php echo esc_html($city); ?></a>
      can safely expose them through potholing and daylighting — without risk of damage.
      <a href="https://beachhydrovac.com/services/" style="color:#1a73e8;" target="_blank" rel="noopener">View hydro excavation services &rarr;</a>
    </p>
  </div>
  <?php
}, 98);

// ============================================================
// 4. WebSite schema for sitelinks
// ============================================================
add_action('wp_head', function() {
  if (!is_front_page() && !is_page('home')) return;
  ?>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AIM Locating",
    "alternateName": "Advanced Infrastructure Mapping",
    "url": "https://aimlocatingva.com"
  }
  </script>
  <?php
}, 3);
`;

  // Step 3: Push update
  console.log(`\n2. Updating snippet ID ${target.id}...`);
  const updateR = await fetch(`${AIM_URL}/wp-json/code-snippets/v1/snippets/${target.id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      name: target.name,
      code: updatedCode.trim(),
      scope: 'global',
      active: true
    })
  });

  if (updateR.ok) {
    console.log('  ✅ Banner successfully moved to top of page');
    console.log('\n  CHANGES MADE:');
    console.log('  → Hook: wp_footer (priority 99) → wp_body_open (priority 1)');
    console.log('  → Border: border-top → border-bottom');
    console.log('  → Added: position:sticky; top:0; z-index:9999');
    console.log('  → Padding: 20px → 14px (tighter for top bar)');
    console.log('\n  RESULT: Banner now appears at the very top of every page,');
    console.log('  sticky on scroll, above the site navigation.');
  } else {
    const err = await updateR.text();
    console.error(`  ❌ Update failed: ${updateR.status}`);
    console.error(`  ${err.substring(0, 300)}`);
  }
}

main().catch(console.error);
