import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(
  process.env.BEACH_HYDROVAC_WP_USER + ':' + process.env.BEACH_HYDROVAC_WP_PASSWORD
).toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

// Read existing snippet 7 first, then update it with sameAs + enhanced structure
async function main() {
  console.log('📡 Reading current schema snippet 7...');
  const r = await fetch(`${WP_URL}/wp-json/code-snippets/v1/snippets/7`, { headers });
  const snippet = await r.json();
  console.log('Current snippet:', snippet.name, '| Active:', snippet.active);

  const updatedCode = `<?php
/**
 * Beach HydroVac - Knowledge Graph Schema (v4 - Entity Authority)
 * Adds: sameAs network, @id anchors, parentOrg, full areaServed, hasOfferCatalog
 */
add_action('wp_head', function() {
  if (!is_front_page() && !is_page('contact')) return;
  ?>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": "https://beachhydrovac.com/#organization",
        "name": "Beach HydroVac",
        "legalName": "Advanced Infrastructure Mapping, LLC",
        "description": "Veteran-owned hydro excavation company serving Hampton Roads Virginia. Specializing in potholing, daylighting, slot trenching, vacuum excavation, and SUE Level A verification.",
        "slogan": "Precision Hydro Excavation for Hampton Roads",
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
          "streetAddress": "2216 Mansion Cross Ln",
          "addressLocality": "Virginia Beach",
          "addressRegion": "VA",
          "postalCode": "23456",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 36.8529,
          "longitude": -75.9780
        },
        "areaServed": [
          {"@type": "City", "name": "Virginia Beach", "sameAs": "https://en.wikipedia.org/wiki/Virginia_Beach,_Virginia"},
          {"@type": "City", "name": "Norfolk", "sameAs": "https://en.wikipedia.org/wiki/Norfolk,_Virginia"},
          {"@type": "City", "name": "Chesapeake", "sameAs": "https://en.wikipedia.org/wiki/Chesapeake,_Virginia"},
          {"@type": "City", "name": "Suffolk", "sameAs": "https://en.wikipedia.org/wiki/Suffolk,_Virginia"},
          {"@type": "City", "name": "Portsmouth", "sameAs": "https://en.wikipedia.org/wiki/Portsmouth,_Virginia"},
          {"@type": "City", "name": "Newport News", "sameAs": "https://en.wikipedia.org/wiki/Newport_News,_Virginia"},
          {"@type": "City", "name": "Hampton", "sameAs": "https://en.wikipedia.org/wiki/Hampton,_Virginia"},
          {"@type": "City", "name": "Williamsburg", "sameAs": "https://en.wikipedia.org/wiki/Williamsburg,_Virginia"},
          {"@type": "State", "name": "Virginia", "sameAs": "https://en.wikipedia.org/wiki/Virginia"},
          {"@type": "State", "name": "North Carolina"},
          {"@type": "State", "name": "Maryland"},
          {"@type": "State", "name": "Delaware"}
        ],
        "sameAs": [
          "https://aimlocatingva.com"
        ],
        "parentOrganization": {
          "@type": "Organization",
          "@id": "https://aimlocatingva.com/#organization",
          "name": "Advanced Infrastructure Mapping, LLC",
          "url": "https://aimlocatingva.com"
        },
        "priceRange": "$$",
        "currenciesAccepted": "USD",
        "paymentAccepted": "Cash, Credit Card, Check",
        "knowsAbout": [
          "Hydro Excavation", "Potholing", "Daylighting", "Slot Trenching",
          "Remote Excavation", "SUE Level A Verification", "Utility Locating",
          "Vacuum Excavation", "Non-Destructive Digging", "Vactor Truck Services"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Hydrovac & Vacuum Excavation Services",
          "itemListElement": [
            {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Hydro Excavation", "url": "https://beachhydrovac.com/services/hydro-excavation/"}},
            {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Vacuum Excavation", "url": "https://beachhydrovac.com/vacuum-excavation/"}},
            {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Vactor Truck Services", "url": "https://beachhydrovac.com/vactor-truck-services/"}},
            {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Potholing & Daylighting"}},
            {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Slot Trenching"}},
            {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "SUE Level A Verification"}},
            {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Utility Locating"}},
            {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Remote Excavation"}}
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://beachhydrovac.com/#website",
        "url": "https://beachhydrovac.com",
        "name": "Beach HydroVac",
        "publisher": {"@id": "https://beachhydrovac.com/#organization"}
      }
    ]
  }
  </script>
  <?php
}, 10);
`;

  const updateRes = await fetch(`${WP_URL}/wp-json/code-snippets/v1/snippets/7`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ code: updatedCode, active: true })
  });
  const updated = await updateRes.json();
  console.log('✅ Snippet 7 updated:', updated.name, '| Active:', updated.active);
  console.log('\n📋 sameAs GAPS — create these profiles to strengthen knowledge graph:');
  console.log('  ❌ Google Business Profile  → maps.google.com (create & get URL)');
  console.log('  ❌ Facebook Business Page   → facebook.com/pages/create');
  console.log('  ❌ Yelp Business            → biz.yelp.com/add');
  console.log('  ❌ BBB Listing              → bbb.org (search VA, Hampton Roads)');
  console.log('  ❌ LinkedIn Company Page    → linkedin.com/company/add');
  console.log('  ✅ Parent Org (AIM)         → aimlocatingva.com (already added)');
}

main().catch(console.error);
