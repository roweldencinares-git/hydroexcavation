import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(
  process.env.BEACH_HYDROVAC_WP_USER + ':' + process.env.BEACH_HYDROVAC_WP_PASSWORD
).toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

async function main() {
  console.log('=== ADDING MISSING SCHEMA TYPES ===\n');

  // Get current snippet #7
  const r = await fetch(`${WP_URL}/wp-json/code-snippets/v1/snippets/7`, { headers });
  const snippet = await r.json();
  let code = snippet.code;

  console.log(`Current snippet length: ${code.length} chars`);

  // Find insertion point - before the closing ?>
  const lastPhpClose = code.lastIndexOf('?>');

  if (lastPhpClose === -1) {
    console.log('❌ Could not find insertion point');
    return;
  }

  const beforeClose = code.substring(0, lastPhpClose);
  const afterClose = code.substring(lastPhpClose);

  // ============================================================
  // 1. WebSite Schema (for sitelinks search box in SERP)
  // ============================================================
  const websiteSchema = `

// WebSite schema for sitelinks search box
add_action('wp_head', function() {
  if (!is_front_page()) return;
  ?>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Beach HydroVac",
    "alternateName": "Beach Hydro Vac",
    "url": "https://beachhydrovac.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://beachhydrovac.com/?s={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }
  </script>
  <?php
}, 2);

`;

  // ============================================================
  // 2. BreadcrumbList Schema (sitewide)
  // ============================================================
  const breadcrumbSchema = `
// BreadcrumbList schema for all pages
add_action('wp_head', function() {
  if (is_front_page()) return;

  $breadcrumbs = array();
  $breadcrumbs[] = array("name" => "Home", "url" => "https://beachhydrovac.com/");

  if (is_page()) {
    $ancestors = get_post_ancestors(get_the_ID());
    $ancestors = array_reverse($ancestors);
    foreach ($ancestors as $ancestor_id) {
      $breadcrumbs[] = array(
        "name" => get_the_title($ancestor_id),
        "url" => get_permalink($ancestor_id)
      );
    }
    $breadcrumbs[] = array(
      "name" => get_the_title(),
      "url" => get_permalink()
    );
  } elseif (is_single()) {
    $breadcrumbs[] = array("name" => "Blog", "url" => "https://beachhydrovac.com/blog/");
    $breadcrumbs[] = array(
      "name" => get_the_title(),
      "url" => get_permalink()
    );
  }

  if (count($breadcrumbs) < 2) return;

  $items = array();
  foreach ($breadcrumbs as $i => $crumb) {
    $items[] = array(
      "@type" => "ListItem",
      "position" => $i + 1,
      "name" => $crumb["name"],
      "item" => $crumb["url"]
    );
  }

  $schema = array(
    "@context" => "https://schema.org",
    "@type" => "BreadcrumbList",
    "itemListElement" => $items
  );

  echo '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>';
}, 4);

`;

  // ============================================================
  // 3. HowTo Schema (on relevant blog posts)
  // ============================================================
  const howtoSchema = `
// HowTo schema on "What is Hydro Excavation" post (ID 3695)
add_action('wp_head', function() {
  if (!is_single(3695)) return;
  ?>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How Hydro Excavation Works: Step-by-Step Process",
    "description": "Learn the complete hydro excavation process used by professional contractors in Virginia to safely expose underground utilities.",
    "totalTime": "PT1H",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "300-450"
    },
    "tool": [
      {"@type": "HowToTool", "name": "Hydrovac truck with pressurized water system"},
      {"@type": "HowToTool", "name": "Industrial vacuum system"},
      {"@type": "HowToTool", "name": "Debris tank"},
      {"@type": "HowToTool", "name": "Remote hose system (up to 600ft)"}
    ],
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Call Virginia 811 (Miss Utility)",
        "text": "Contact Virginia 811 at least 48 business hours before excavation. They will mark all known underground utilities in the area with color-coded paint and flags. This is required by Virginia law (§56-265.17)."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Position the hydrovac truck",
        "text": "The hydrovac truck is positioned as close to the excavation site as possible. For restricted access areas, the remote hose system can extend up to 600 feet from the vehicle."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Apply pressurized water to break up soil",
        "text": "Pressurized water at 2,000-3,000 PSI is applied to the ground through a handheld wand. The water breaks up soil into a slurry without damaging underground pipes, cables, or conduit."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Vacuum the soil slurry into the debris tank",
        "text": "A powerful industrial vacuum simultaneously removes the water-soil slurry from the hole and deposits it into the truck's debris tank. This creates a clean, precise excavation."
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Expose and verify the utility",
        "text": "Once the underground utility is exposed (daylighted), its exact horizontal and vertical position is measured and documented. For SUE Level A projects, measurements are recorded within ±6 inches per ASCE 38-22 standards."
      },
      {
        "@type": "HowToStep",
        "position": 6,
        "name": "Backfill and restore the site",
        "text": "After documentation is complete, the excavation is backfilled with appropriate material and the surface is restored. The debris tank contents are disposed of at an approved facility."
      }
    ]
  }
  </script>
  <?php
}, 5);

// HowTo schema on Virginia 811 Guide post (ID 3697)
add_action('wp_head', function() {
  if (!is_single(3697)) return;
  ?>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Call Virginia 811 Before Excavation",
    "description": "Step-by-step guide for Virginia contractors on calling 811 Miss Utility before any excavation project.",
    "totalTime": "PT10M",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Call 811 or submit online",
        "text": "Dial 811 or visit va811.com to submit a locate request at least 48 business hours (not calendar hours) before your planned excavation date. Have your project address and details ready."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Provide project details",
        "text": "Tell the 811 operator your exact dig location, type of work, depth of excavation, and project start date. Mark the dig area with white paint or flags before utility locators arrive."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Wait for utility marking",
        "text": "Utility companies will mark their underground lines within 48 business hours using APWA color codes: Red (electric), Yellow (gas), Blue (water), Orange (telecom), Green (sewer)."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Respect the tolerance zone",
        "text": "Virginia law requires careful and prudent excavation within 24 inches on either side of marked utilities (the tolerance zone). Use hydro excavation or hand digging within this zone—never mechanical equipment."
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Begin excavation safely",
        "text": "Once all utilities are marked, begin excavation using the appropriate method. For work within the tolerance zone, hydro excavation is the safest option. Document all exposed utilities for your records."
      }
    ]
  }
  </script>
  <?php
}, 5);
`;

  // Combine all new schema
  const newCode = beforeClose + websiteSchema + breadcrumbSchema + howtoSchema + afterClose;

  console.log(`New snippet length: ${newCode.length} chars`);
  console.log(`Added: WebSite, BreadcrumbList, HowTo (x2)`);

  // Update snippet
  const updateR = await fetch(`${WP_URL}/wp-json/code-snippets/v1/snippets/7`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ code: newCode, active: true })
  });

  if (updateR.ok) {
    console.log('\n✅ Code Snippet #7 updated with all new schema');
    console.log('\nSchema types now in snippet:');
    console.log('  ✅ LocalBusiness (with GeoCoordinates, OfferCatalog)');
    console.log('  ✅ Organization (parentOrganization)');
    console.log('  ✅ Service (5 services)');
    console.log('  ✅ FAQPage (15 questions)');
    console.log('  ✅ WebSite (sitelinks search box) ← NEW');
    console.log('  ✅ BreadcrumbList (sitewide) ← NEW');
    console.log('  ✅ HowTo - "How Hydro Excavation Works" (post 3695) ← NEW');
    console.log('  ✅ HowTo - "How to Call Virginia 811" (post 3697) ← NEW');
  } else {
    const err = await updateR.text();
    console.log(`❌ Update failed: ${updateR.status}`);
    console.log(err.substring(0, 500));
  }
}

main().catch(console.error);
