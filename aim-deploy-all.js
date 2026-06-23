import fetch from 'node-fetch';

const AIM_URL = 'https://aimlocatingva.com';
const auth = 'Basic ' + Buffer.from('Rowelden:VxoJ exxM 6ljY WGSD NbYW 8FP8').toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

async function main() {
  console.log('='.repeat(70));
  console.log('AIM LOCATING — DEPLOYING SEO + BEACH HYDROVAC BACKLINKS');
  console.log('='.repeat(70));

  let updated = 0;
  let failed = 0;

  // ============================================================
  // 1. YOAST META — All 10 pages
  // ============================================================
  console.log('\n\n📝 1. YOAST META OPTIMIZATION\n');

  const yoastUpdates = [
    {
      id: 221, slug: 'home', name: 'Homepage',
      title: 'Private Utility Locating Virginia | 30+ Years Experience | AIM Locating',
      desc: 'Virginia\'s trusted private utility locating company. 30+ years experience in GPR, electromagnetic locating, SUE, and potholing. Serving Hampton Roads, Richmond & Northern VA. Call 757-785-5177.',
      focuskw: 'private utility locating virginia'
    },
    {
      id: 308, slug: 'about', name: 'About',
      title: 'About AIM Locating | 30+ Years Utility Locating Experience Virginia',
      desc: 'Advanced Infrastructure Mapping (AIM Locating) provides expert private utility locating across Virginia. Veteran-owned with 30+ years experience. Our hydro excavation division Beach HydroVac handles potholing and daylighting.',
      focuskw: 'aim locating virginia'
    },
    {
      id: 76, slug: 'contact', name: 'Contact',
      title: 'Contact AIM Locating | Free Quote for Utility Locating Virginia',
      desc: 'Request a free utility locating quote from AIM Locating. Serving Virginia, North Carolina & the Mid-Atlantic. Call 757-785-5177 or submit our online form.',
      focuskw: 'utility locating quote virginia'
    },
    {
      id: 343, slug: 'utility-locating-services', name: 'Services',
      title: 'Utility Locating Services Virginia | GPR, EM Locating, SUE | AIM',
      desc: 'Full-service utility locating: ground penetrating radar (GPR), electromagnetic locating, subsurface utility engineering (SUE), private utility designating. Hydro excavation potholing available through Beach HydroVac.',
      focuskw: 'utility locating services virginia'
    },
    {
      id: 361, slug: 'subsurface-utility-engineering', name: 'SUE',
      title: 'Subsurface Utility Engineering Virginia | ASCE 38 SUE Levels | AIM',
      desc: 'ASCE 38-compliant subsurface utility engineering (SUE) services in Virginia. All 4 SUE levels from desktop review to pothole verification. VDOT-approved methods.',
      focuskw: 'subsurface utility engineering virginia'
    },
    {
      id: 331, slug: 'virginia-beach-utility-locating', name: 'Virginia Beach',
      title: 'Private Utility Locating Virginia Beach | GPR & EM Locate | AIM',
      desc: 'Expert private utility locating in Virginia Beach, VA. Ground penetrating radar, electromagnetic locating, and potholing services. 30+ years experience. Call 757-785-5177.',
      focuskw: 'private utility locating virginia beach'
    },
    {
      id: 384, slug: 'chesapeake-private-utility-locating', name: 'Chesapeake',
      title: 'Private Utility Locating Chesapeake VA | Underground Detection | AIM',
      desc: 'Professional private utility locating in Chesapeake, VA. GPR scanning, electromagnetic detection, and SUE services. Need potholing? Our division Beach HydroVac serves Chesapeake.',
      focuskw: 'private utility locating chesapeake va'
    },
    {
      id: 389, slug: 'norfolk-private-utility-locating-service', name: 'Norfolk',
      title: 'Private Utility Locating Norfolk VA | Naval Base & Port Area | AIM',
      desc: 'Norfolk\'s trusted private utility locating service. GPR, electromagnetic locating, and subsurface utility engineering near Naval Station Norfolk, ODU, and downtown. Call 757-785-5177.',
      focuskw: 'private utility locating norfolk va'
    },
    {
      id: 394, slug: 'suffolk-utility-locating', name: 'Suffolk',
      title: 'Private Utility Locating Suffolk VA | Harbour View & Rural Areas | AIM',
      desc: 'Expert private utility locating in Suffolk, VA. Serving Harbour View, downtown Suffolk, and rural areas. GPR scanning, EM locating, and potholing services available.',
      focuskw: 'private utility locating suffolk va'
    },
    {
      id: 398, slug: 'portsmouth-utility-locating', name: 'Portsmouth',
      title: 'Private Utility Locating Portsmouth VA | Shipyard & Historic Area | AIM',
      desc: 'Professional private utility locating in Portsmouth, VA. Serving the Naval Shipyard, Olde Towne, and surrounding areas. GPR, EM locating, and SUE services.',
      focuskw: 'private utility locating portsmouth va'
    },
  ];

  for (const page of yoastUpdates) {
    process.stdout.write(`  ${page.name} (ID:${page.id})...`);
    const r = await fetch(`${AIM_URL}/wp-json/wp/v2/pages/${page.id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        meta: {
          _yoast_wpseo_title: page.title,
          _yoast_wpseo_metadesc: page.desc,
          _yoast_wpseo_focuskw: page.focuskw
        }
      })
    });
    if (r.ok) { console.log(' ✅'); updated++; }
    else { console.log(` ❌ ${r.status}`); failed++; }
  }

  // ============================================================
  // 2. CODE SNIPPET — Schema + Beach HydroVac backlinks
  // ============================================================
  console.log('\n\n🔧 2. CODE SNIPPET — SCHEMA + BACKLINKS\n');

  const snippetCode = `<?php
// AIM Locating — Enhanced Schema + Beach HydroVac Cross-Links
// Deployed via Code Snippets REST API

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
// 2. Beach HydroVac cross-link in footer (all pages)
// ============================================================
add_action('wp_footer', function() {
  ?>
  <div style="background:#0f2134;padding:20px 30px;text-align:center;border-top:3px solid #e8a020;">
    <p style="color:#ccc;margin:0 0 8px 0;font-size:14px;">
      <strong style="color:#fff;">Need Hydro Excavation?</strong> Our division
      <a href="https://beachhydrovac.com" style="color:#e8a020;text-decoration:none;font-weight:bold;" target="_blank" rel="noopener">Beach HydroVac</a>
      provides potholing, daylighting, slot trenching & vacuum excavation across Virginia.
      <a href="https://beachhydrovac.com/contact/" style="color:#e8a020;text-decoration:none;" target="_blank" rel="noopener">Get a Free Quote →</a>
    </p>
  </div>
  <?php
}, 99);

// ============================================================
// 3. Service-specific cross-links on location pages
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
      <a href="https://beachhydrovac.com/services/" style="color:#1a73e8;" target="_blank" rel="noopener">View hydro excavation services →</a>
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
?>`;

  // Create the snippet
  const snippetR = await fetch(`${AIM_URL}/wp-json/code-snippets/v1/snippets`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name: 'AIM Locating — Schema + Beach HydroVac Cross-Links',
      code: snippetCode.replace(/^<\?php\n/, '').replace(/\n\?>$/, ''),
      scope: 'global',
      active: true
    })
  });

  if (snippetR.ok) {
    const snippet = await snippetR.json();
    console.log(`  ✅ Snippet created (ID: ${snippet.id})`);
    console.log('  Contains:');
    console.log('    → LocalBusiness schema with Beach HydroVac as "department"');
    console.log('    → Sitewide footer banner linking to Beach HydroVac');
    console.log('    → City-specific Beach HydroVac links on 5 location pages');
    console.log('    → WebSite schema for sitelinks');
    updated++;
  } else {
    const err = await snippetR.text();
    console.log(`  ❌ Snippet creation failed: ${snippetR.status}`);
    console.log(`  ${err.substring(0, 300)}`);
    failed++;
  }

  // ============================================================
  // SUMMARY
  // ============================================================
  console.log('\n\n' + '='.repeat(70));
  console.log('DEPLOYMENT COMPLETE');
  console.log('='.repeat(70));
  console.log(`\n  ✅ Updated: ${updated}`);
  console.log(`  ❌ Failed: ${failed}`);
  console.log(`
  WHAT WAS DEPLOYED:
  ─────────────────
  📝 Yoast SEO meta (all 10 pages):
     → Custom titles with power words + location
     → Meta descriptions with CTAs + phone number
     → Focus keywords set for each page

  🔗 Beach HydroVac Backlinks (7 total):
     → Sitewide footer banner (appears on ALL pages)
     → 5 city-specific links on location pages
     → "department" schema in LocalBusiness

  📊 Schema Markup:
     → LocalBusiness with geo, 10 service areas, department
     → WebSite schema for sitelinks
     → Beach HydroVac connected as subsidiary/department
     → sameAs includes beachhydrovac.com

  BACKLINK COUNT TO BEACHHYDROVAC.COM:
  ─────────────────────────────────────
  → Footer banner: 2 links × 10 pages = 20 link instances
  → Location CTAs: 2 links × 5 pages = 10 link instances
  → Schema: 2 references (department URL + sameAs)
  → Total: 32 link instances from aimlocatingva.com
  `);
}

main().catch(console.error);
