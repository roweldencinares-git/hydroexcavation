import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(
  process.env.BEACH_HYDROVAC_WP_USER + ':' + process.env.BEACH_HYDROVAC_WP_PASSWORD
).toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

// Service areas with geo coordinates for enhanced local schema
const serviceAreas = [
  { name: 'Virginia Beach', state: 'VA', lat: 36.8529, lng: -75.9780 },
  { name: 'Norfolk', state: 'VA', lat: 36.8508, lng: -76.2859 },
  { name: 'Chesapeake', state: 'VA', lat: 36.7682, lng: -76.2875 },
  { name: 'Newport News', state: 'VA', lat: 37.0871, lng: -76.4730 },
  { name: 'Hampton', state: 'VA', lat: 37.0299, lng: -76.3452 },
  { name: 'Richmond', state: 'VA', lat: 37.5407, lng: -77.4360 },
  { name: 'Suffolk', state: 'VA', lat: 36.7282, lng: -76.5836 },
  { name: 'Portsmouth', state: 'VA', lat: 36.8354, lng: -76.2983 },
  { name: 'Williamsburg', state: 'VA', lat: 37.2707, lng: -76.7075 },
  { name: 'Henrico', state: 'VA', lat: 37.5554, lng: -77.3936 },
  { name: 'Chesterfield', state: 'VA', lat: 37.3774, lng: -77.5058 },
  { name: 'Alexandria', state: 'VA', lat: 38.8048, lng: -77.0469 },
  { name: 'Arlington', state: 'VA', lat: 38.8816, lng: -77.0910 },
  { name: 'Fairfax', state: 'VA', lat: 38.8462, lng: -77.3064 },
  { name: 'Fredericksburg', state: 'VA', lat: 38.3032, lng: -77.4605 },
  { name: 'Roanoke', state: 'VA', lat: 37.2710, lng: -79.9414 },
  { name: 'Lynchburg', state: 'VA', lat: 37.4138, lng: -79.1422 }
];

async function main() {
  // Update Code Snippet #7 with enhanced schema that includes:
  // 1. GeoCoordinates for business location
  // 2. ServiceArea with all service cities
  // 3. Enhanced LocalBusiness with more fields
  // 4. AggregateRating placeholder (for when reviews are added)

  const snippetResp = await fetch(`${WP_URL}/wp-json/code-snippets/v1/snippets/7`, { headers });
  const snippet = await snippetResp.json();
  console.log('Current snippet 7:', snippet.name);
  console.log('Active:', snippet.active);

  // Build the service area array for schema
  const serviceAreaJson = serviceAreas.map(sa => `{
          "@type": "City",
          "name": "${sa.name}",
          "containedInPlace": {
            "@type": "State",
            "name": "Virginia"
          }
        }`).join(',\n        ');

  // Enhanced schema PHP code
  const enhancedSchema = `<?php
/**
 * Beach HydroVac - Enhanced Schema Markup (v3 - Local SEO Boost)
 * Zero design changes - only invisible <head> metadata
 * Adds: GeoCoordinates, ServiceArea, enhanced LocalBusiness, Service schemas, FAQ
 */

// LocalBusiness schema on homepage and contact page
add_action('wp_head', function() {
  if (!is_front_page() && !is_page('contact')) return;
  ?>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://beachhydrovac.com/#localbusiness",
    "name": "Beach HydroVac",
    "legalName": "Advanced Infrastructure Mapping, LLC",
    "description": "Veteran-owned hydro excavation company serving Virginia, North Carolina, Maryland & Delaware. Specializing in potholing, daylighting, slot trenching, remote excavation, and SUE Level A verification.",
    "url": "https://beachhydrovac.com",
    "telephone": "+1-757-510-5220",
    "email": "johnw@beachhydrovac.com",
    "image": "https://beachhydrovac.com/wp-content/uploads/2026/01/cropped-Add-a-heading-1.png",
    "logo": {
      "@type": "ImageObject",
      "url": "https://beachhydrovac.com/wp-content/uploads/2026/01/cropped-Add-a-heading-1.png"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2716 Nevada Ave",
      "addressLocality": "Norfolk",
      "addressRegion": "VA",
      "postalCode": "23513",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 36.9211,
      "longitude": -76.2641
    },
    "areaServed": [
      ${serviceAreaJson},
      {
        "@type": "State",
        "name": "Virginia"
      },
      {
        "@type": "State",
        "name": "North Carolina"
      },
      {
        "@type": "State",
        "name": "Maryland"
      },
      {
        "@type": "State",
        "name": "Delaware"
      }
    ],
    "parentOrganization": {
      "@type": "Organization",
      "name": "Advanced Infrastructure Mapping, LLC",
      "url": "https://aimlocatingva.com"
    },
    "sameAs": [],
    "priceRange": "$$",
    "currenciesAccepted": "USD",
    "paymentAccepted": "Cash, Credit Card, Check",
    "knowsAbout": [
      "Hydro Excavation",
      "Potholing",
      "Daylighting",
      "Slot Trenching",
      "Remote Excavation",
      "SUE Level A Verification",
      "Utility Locating",
      "Vacuum Excavation",
      "Non-Destructive Digging"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Hydro Excavation Services",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Hydro Excavation",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Hydro Excavation",
                "url": "https://beachhydrovac.com/services/hydro-excavation/"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Potholing & Daylighting",
                "url": "https://beachhydrovac.com/services/potholing/"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Slot Trenching",
                "url": "https://beachhydrovac.com/services/slot-trenching/"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Remote Excavation",
                "url": "https://beachhydrovac.com/services/remote-excavation/"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "SUE Level A Verification",
                "url": "https://beachhydrovac.com/services/sue-level-a/"
              }
            }
          ]
        }
      ]
    }
  }
  </script>
  <?php
}, 1);

// Service schema on services page and homepage
add_action('wp_head', function() {
  if (!is_front_page() && !is_page('services') && !is_page('hydro-excavation') && !is_page('potholing') && !is_page('daylighting') && !is_page('slot-trenching') && !is_page('remote-excavation') && !is_page('sue-level-a')) return;

  $services = [
    [
      'name' => 'Hydro Excavation',
      'desc' => 'Non-destructive hydro excavation using pressurized water and vacuum technology. Safe for underground utilities, fiber optics, and gas lines. Serving VA, NC, MD & DE.',
      'url'  => 'https://beachhydrovac.com/services/hydro-excavation/',
    ],
    [
      'name' => 'Potholing & Daylighting',
      'desc' => 'Precision potholing to expose underground utilities. SUE Level A compliant. Safe, non-destructive method for utility verification in Virginia Beach and Hampton Roads.',
      'url'  => 'https://beachhydrovac.com/services/potholing/',
    ],
    [
      'name' => 'Slot Trenching',
      'desc' => 'Narrow, precise slot trenching for pipes, cables, and conduit installation. Minimal surface disruption with hydro excavation technology.',
      'url'  => 'https://beachhydrovac.com/services/slot-trenching/',
    ],
    [
      'name' => 'Remote Excavation',
      'desc' => 'Remote hydro excavation with 600ft hose reach for restricted-access areas. Ideal for congested job sites, backyards, and hard-to-reach locations.',
      'url'  => 'https://beachhydrovac.com/services/remote-excavation/',
    ],
    [
      'name' => 'SUE Level A Verification',
      'desc' => 'Highest accuracy utility verification per ASCE 38-22 standards. VDOT compliant SUE Level A services for Virginia DOT and municipal projects.',
      'url'  => 'https://beachhydrovac.com/services/sue-level-a/',
    ],
  ];

  foreach ($services as $svc) {
    echo '<script type="application/ld+json">' . json_encode([
      '@context' => 'https://schema.org',
      '@type' => 'Service',
      'name' => $svc['name'],
      'description' => $svc['desc'],
      'url' => $svc['url'],
      'provider' => [
        '@type' => 'LocalBusiness',
        '@id' => 'https://beachhydrovac.com/#localbusiness',
        'name' => 'Beach HydroVac',
      ],
      'areaServed' => [
        ['@type' => 'State', 'name' => 'Virginia'],
        ['@type' => 'State', 'name' => 'North Carolina'],
        ['@type' => 'State', 'name' => 'Maryland'],
        ['@type' => 'State', 'name' => 'Delaware'],
      ],
      'serviceType' => 'Hydro Excavation',
    ], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>' . "\\n";
  }
}, 2);

// FAQ schema on homepage, services, and FAQ page
add_action('wp_head', function() {
  if (!is_front_page() && !is_page('services') && !is_page('faq')) return;
  ?>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is hydro excavation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hydro excavation uses pressurized water and a powerful vacuum system to safely break up and remove soil. It is the safest, most precise method for exposing underground utilities without risking damage to existing infrastructure."
        }
      },
      {
        "@type": "Question",
        "name": "How much does hydro excavation cost in Virginia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hydro excavation typically costs between $150-$350 per hour in Virginia, depending on the project scope, soil conditions, and location. Contact Beach HydroVac at 757-510-5220 for a free quote."
        }
      },
      {
        "@type": "Question",
        "name": "What areas does Beach HydroVac serve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Beach HydroVac serves Virginia, North Carolina, Maryland, and Delaware. We are based in Virginia Beach and cover Hampton Roads, Norfolk, Chesapeake, Richmond, and the entire Mid-Atlantic region."
        }
      },
      {
        "@type": "Question",
        "name": "Is hydro excavation safer than traditional excavation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, hydro excavation is significantly safer than mechanical excavation. It eliminates the risk of striking underground utilities, reduces job site injuries, and is the preferred method for working near gas lines, fiber optics, and water mains."
        }
      },
      {
        "@type": "Question",
        "name": "What is SUE Level A verification?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SUE Level A (Subsurface Utility Engineering) is the highest accuracy level for utility location per ASCE 38-22 standards. It involves physically exposing utilities through potholing to verify their exact position. Beach HydroVac provides VDOT-compliant SUE Level A services."
        }
      },
      {
        "@type": "Question",
        "name": "Does Beach HydroVac offer emergency services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Beach HydroVac offers emergency hydro excavation services across Virginia and the Mid-Atlantic. Call 757-510-5220 for immediate assistance with utility strikes, broken water mains, or urgent excavation needs."
        }
      }
    ]
  }
  </script>
  <?php
}, 3);
?>`;

  // Update the snippet
  const updateResp = await fetch(`${WP_URL}/wp-json/code-snippets/v1/snippets/7`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      name: 'Beach HydroVac - Enhanced Schema Markup v3 (Local SEO Boost)',
      code: enhancedSchema,
      active: true
    })
  });

  if (updateResp.ok) {
    const data = await updateResp.json();
    console.log('\nSnippet 7 updated successfully!');
    console.log('Active:', data.active);
    console.log('\nEnhancements added:');
    console.log('  - GeoCoordinates (lat/lng) for business location');
    console.log('  - 17 service area cities with schema');
    console.log('  - 4 state-level service areas (VA, NC, MD, DE)');
    console.log('  - OfferCatalog linking all 5 services');
    console.log('  - Enhanced LocalBusiness with knowsAbout, paymentAccepted, priceRange');
    console.log('  - Parent organization (AIM Locating) linked');
    console.log('  - Service schemas with areaServed');
    console.log('  - 6 FAQ questions with rich answers');
  } else {
    console.log('Update failed:', updateResp.status);
    const err = await updateResp.text();
    console.log(err.substring(0, 500));
  }
}

main().catch(console.error);
