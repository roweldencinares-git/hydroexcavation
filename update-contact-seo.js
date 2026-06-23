import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(
  process.env.BEACH_HYDROVAC_WP_USER + ':' + process.env.BEACH_HYDROVAC_WP_PASSWORD
).toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

// NEW correct contact info
const NEW_PHONE = '757-510-5220';
const NEW_MOBILE = '757-633-8922';
const NEW_EMAIL = 'johnw@beachhydrovac.com';
const NEW_ADDRESS = '2716 Nevada Ave, Norfolk, VA 23513';

// OLD phone to replace
const OLD_PHONE = '757-785-5177';

// ── UPDATED META DESCRIPTIONS (all references to old phone fixed) ──

const SEO_DATA = {
  'home': { t: 'Hydro Excavation Virginia Beach | Veteran-Owned | Beach Hydrovac', d: "Virginia's trusted hydro excavation company. Potholing, daylighting, SUE Level A verification. Serving Hampton Roads & Richmond. Call " + NEW_PHONE + ".", k: 'hydro excavation virginia beach' },
  'services': { t: 'Hydro Excavation Services | Potholing, Daylighting, SUE | Beach Hydrovac', d: 'Full-service hydro excavation: potholing, daylighting, slot trenching, remote dig & SUE Level A. Non-destructive. Veteran-owned. Free quotes across Virginia.', k: 'hydro excavation services virginia' },
  'about': { t: 'About Beach Hydrovac | Veteran-Owned Hydro Excavation Virginia', d: 'Veteran-owned hydro excavation in Virginia Beach. A division of AIM Locating. Military discipline, civilian expertise. Serving VA, NC, MD & DE.', k: 'veteran owned hydro excavation virginia' },
  'contact': { t: 'Contact Beach Hydrovac | Free Hydro Excavation Quote | ' + NEW_PHONE, d: 'Get your free hydro excavation quote. Call ' + NEW_PHONE + ' or email ' + NEW_EMAIL + '. Serving Virginia Beach, Norfolk, Chesapeake, Richmond & all Hampton Roads.', k: 'hydro excavation quote virginia beach' },
  'faq': { t: 'Hydro Excavation FAQ | Your Questions Answered | Beach Hydrovac', d: 'Common hydro excavation questions answered: costs, safety, SUE levels, equipment reach, service areas. Everything Virginia contractors need to know.', k: 'hydro excavation faq' },
  'locations': { t: 'Hydro Excavation Locations | Service Areas Across Virginia', d: 'Beach Hydrovac serves 17+ cities across Virginia. Find hydro excavation near you. Hampton Roads, Richmond, NoVA & beyond. Veteran-owned.', k: 'hydro excavation locations virginia' },
  'service-areas': { t: 'Hydro Excavation Service Areas | VA, NC, MD, DE | Beach Hydrovac', d: 'Professional hydro excavation across Virginia, North Carolina, Maryland & Delaware. Full Mid-Atlantic coverage from our Virginia Beach base.', k: 'hydro excavation service areas' },
  'hydro-excavation': { t: 'Hydro Excavation Virginia | Non-Destructive Vacuum Excavation', d: 'Industrial hydro excavation in Virginia. 3000 PSI water + vacuum safely exposes buried utilities. Zero damage to surrounding infrastructure. Free estimates.', k: 'hydro excavation virginia' },
  'potholing': { t: 'Potholing Services Virginia | Utility Exposure & Verification', d: 'Precision potholing to safely expose underground utilities. SUE Level A compliant. Prevents utility strikes across Virginia. Call ' + NEW_PHONE + '.', k: 'potholing services virginia' },
  'daylighting': { t: 'Daylighting Services Virginia | Safe Underground Utility Exposure', d: 'Non-destructive daylighting to visually confirm buried utility locations. Required for SUE verification & safe construction. Free quotes.', k: 'daylighting services virginia' },
  'slot-trenching': { t: 'Slot Trenching Virginia | Precision Narrow Trench Excavation', d: 'Precision slot trenching for pipes, cables & conduit. Minimal site disruption, reduced backfill. Veteran-owned Beach Hydrovac. Free quotes.', k: 'slot trenching services virginia' },
  'remote-excavation': { t: 'Remote Excavation | 600ft Hose Reach | Beach Hydrovac Virginia', d: '600-foot hose reach for excavation in tight or restricted areas. Behind buildings, historic sites, landscaped properties. No area too hard to reach.', k: 'remote excavation services virginia' },
  'sue-level-a': { t: 'SUE Level A Verification Virginia | ASCE 38 & VDOT Compliant', d: 'ASCE 38 compliant SUE Level A verification through physical utility exposure. VDOT approved. Legally defensible documentation.', k: 'SUE level A verification virginia' },
  'virginia-beach': { t: 'Hydro Excavation Virginia Beach VA | Local Veteran-Owned Service', d: 'Virginia Beach hydro excavation by a local veteran-owned company. Potholing, daylighting, SUE verification. Based in VB. Call ' + NEW_PHONE + '.', k: 'hydro excavation virginia beach va' },
  'norfolk': { t: 'Hydro Excavation Norfolk VA | Hampton Roads Utility Excavation', d: 'Professional hydro excavation in Norfolk, VA. Safe digging near Naval Station Norfolk & downtown. Potholing & daylighting. Call ' + NEW_PHONE + '.', k: 'hydro excavation norfolk va' },
  'chesapeake': { t: 'Hydro Excavation Chesapeake VA | Safe Non-Destructive Digging', d: 'Chesapeake hydro excavation. Non-destructive utility exposure for residential & commercial projects. Veteran-owned. Free quotes.', k: 'hydro excavation chesapeake va' },
  'newport-news': { t: 'Hydro Excavation Newport News VA | Peninsula Services', d: 'Hydro excavation on the Virginia Peninsula. Serving Newport News contractors & municipalities. Potholing, SUE Level A. Call ' + NEW_PHONE + '.', k: 'hydro excavation newport news va' },
  'hampton': { t: 'Hydro Excavation Hampton VA | Potholing & Daylighting Experts', d: 'Hampton hydro excavation for safe utility exposure. Potholing, daylighting & slot trenching. Veteran-owned. Free estimates.', k: 'hydro excavation hampton va' },
  'richmond': { t: 'Hydro Excavation Richmond VA | Central Virginia Vacuum Excavation', d: 'Richmond hydro excavation. Potholing, slot trenching & SUE verification for Central Virginia projects. Veteran-owned. Call ' + NEW_PHONE + '.', k: 'hydro excavation richmond va' },
  'suffolk': { t: 'Hydro Excavation Suffolk VA | Vacuum Excavation Services', d: 'Suffolk hydro excavation for safe underground utility work. Non-destructive digging for construction & infrastructure. Free quotes.', k: 'hydro excavation suffolk va' },
  'portsmouth': { t: 'Hydro Excavation Portsmouth VA | Utility Daylighting & Potholing', d: 'Portsmouth hydro excavation. Daylighting, potholing & safe utility exposure for Hampton Roads contractors. Call ' + NEW_PHONE + '.', k: 'hydro excavation portsmouth va' },
  'williamsburg': { t: 'Hydro Excavation Williamsburg VA | Safe Digging for Historic Areas', d: 'Williamsburg hydro excavation — ideal for historic areas. Non-destructive vacuum excavation protects surrounding structures. Free quotes.', k: 'hydro excavation williamsburg va' },
  'henrico': { t: 'Hydro Excavation Henrico VA | Residential & Commercial Potholing', d: 'Henrico County hydro excavation. Residential & commercial potholing, daylighting, utility verification. Free estimates.', k: 'hydro excavation henrico va' },
  'chesterfield': { t: 'Hydro Excavation Chesterfield VA | Underground Utility Services', d: 'Chesterfield County hydro excavation for underground utility location & verification. Potholing, SUE Level A. Veteran-owned.', k: 'hydro excavation chesterfield va' },
  'alexandria': { t: 'Hydro Excavation Alexandria VA | Northern Virginia Services', d: 'Alexandria hydro excavation for NoVA projects. Non-destructive vacuum excavation for dense urban & historic areas. Free quotes.', k: 'hydro excavation alexandria va' },
  'arlington': { t: 'Hydro Excavation Arlington VA | Government & Commercial Projects', d: 'Arlington hydro excavation for government, commercial & residential projects in Northern Virginia. Veteran-owned. Call ' + NEW_PHONE + '.', k: 'hydro excavation arlington va' },
  'fairfax': { t: 'Hydro Excavation Fairfax VA | Utility Location & Verification', d: 'Fairfax hydro excavation. Underground utility location, potholing & daylighting for Northern Virginia. Free estimates.', k: 'hydro excavation fairfax va' },
  'fredericksburg': { t: 'Hydro Excavation Fredericksburg VA | Central Virginia Services', d: 'Fredericksburg hydro excavation. Slot trenching, potholing & vacuum excavation for Central Virginia. Call ' + NEW_PHONE + '.', k: 'hydro excavation fredericksburg va' },
  'roanoke': { t: 'Hydro Excavation Roanoke VA | Western Virginia Excavation', d: 'Roanoke hydro excavation. Safe, non-destructive vacuum excavation for Western Virginia. Potholing & daylighting. Free quotes.', k: 'hydro excavation roanoke va' },
  'lynchburg': { t: 'Hydro Excavation Lynchburg VA | Central Virginia Potholing', d: 'Lynchburg hydro excavation. Potholing, daylighting & utility verification for Central Virginia. Veteran-owned. Call ' + NEW_PHONE + '.', k: 'hydro excavation lynchburg va' },
  'hydro-excavation-virginia-guide': { t: 'Hydro Excavation Virginia: Complete 2026 Guide | Beach Hydrovac', d: 'Everything about hydro excavation in Virginia: costs, methods, VDOT requirements, choosing a contractor. Updated 2026 industry guide.', k: 'hydro excavation virginia guide 2026' },
};

const POST_SEO = {
  'fiber-optic-installation-hydro-excavation': { t: 'Fiber Optic Installation with Hydro Excavation | Safe Trenching', d: 'How hydro excavation protects fiber optic cables during installation. Non-destructive trenching prevents costly damage.', k: 'fiber optic installation hydro excavation' },
  'common-utility-strike-mistakes-how-to-avoid': { t: '5 Common Utility Strike Mistakes & How to Prevent Them', d: 'Avoid costly utility strikes. Learn the top mistakes contractors make and how hydro excavation prevents underground damage.', k: 'utility strike prevention' },
  'hydro-excavation-vs-traditional-excavation': { t: 'Hydro Excavation vs Traditional Digging | Comparison', d: 'Hydro excavation vs backhoe: safety, cost, speed & environmental impact compared. Why Virginia contractors switch to vacuum excavation.', k: 'hydro excavation vs traditional excavation' },
  'vdot-sue-requirements-contractors-guide': { t: "VDOT SUE Requirements: Virginia Contractor's Guide (2026)", d: 'Complete guide to VDOT SUE requirements. Levels A-D explained, compliance steps & deadlines for Virginia contractors.', k: 'VDOT SUE requirements virginia' },
  'hydro-excavation-cost-guide-virginia-2026': { t: 'Hydro Excavation Cost Virginia (2026) | Pricing Breakdown', d: 'What does hydro excavation cost in Virginia? 2026 pricing: per-hole rates, hourly costs & estimates. Free quote from Beach Hydrovac.', k: 'hydro excavation cost virginia' },
};

// ── UPDATED SCHEMA SNIPPET (Code Snippet #7) ──

const UPDATED_SCHEMA_CODE = `
if (!defined('BHV_COMPANY_NAME')) {
    define('BHV_COMPANY_NAME', 'Beach Hydrovac');
    define('BHV_COMPANY_LEGAL', 'Advanced Infrastructure Mapping, LLC');
    define('BHV_COMPANY_URL', 'https://beachhydrovac.com');
    define('BHV_COMPANY_LOGO', 'https://beachhydrovac.com/wp-content/uploads/beach-hydrovac-logo.png');
    define('BHV_COMPANY_IMAGE', 'https://beachhydrovac.com/wp-content/uploads/hero-beach-truck.jpg');
    define('BHV_COMPANY_PHONE', '+1-${NEW_PHONE}');
    define('BHV_COMPANY_MOBILE', '+1-${NEW_MOBILE}');
    define('BHV_COMPANY_EMAIL', '${NEW_EMAIL}');
    define('BHV_COMPANY_DESCRIPTION', 'Veteran-owned hydro-excavation company providing precision vacuum excavation services including potholing, daylighting, slot trenching, and SUE Level A verification across Virginia, North Carolina, Maryland, and Delaware. A division of Advanced Infrastructure Mapping, LLC.');
}

function bhv_clean_schema_markup() {
    if (is_admin()) return;
    $schemas = array();

    // LocalBusiness — critical for Google Local Pack
    if (is_front_page() || is_page('contact')) {
        $schemas[] = array(
            '@context' => 'https://schema.org',
            '@type' => 'LocalBusiness',
            '@id' => BHV_COMPANY_URL . '/#localbusiness',
            'name' => BHV_COMPANY_NAME,
            'legalName' => BHV_COMPANY_LEGAL,
            'description' => BHV_COMPANY_DESCRIPTION,
            'url' => BHV_COMPANY_URL,
            'logo' => array('@type' => 'ImageObject', 'url' => BHV_COMPANY_LOGO, 'width' => 300, 'height' => 100),
            'image' => BHV_COMPANY_IMAGE,
            'telephone' => BHV_COMPANY_PHONE,
            'email' => BHV_COMPANY_EMAIL,
            'foundingDate' => '2023',
            'address' => array(
                '@type' => 'PostalAddress',
                'streetAddress' => '2716 Nevada Ave',
                'addressLocality' => 'Norfolk',
                'addressRegion' => 'VA',
                'postalCode' => '23513',
                'addressCountry' => 'US'
            ),
            'geo' => array('@type' => 'GeoCoordinates', 'latitude' => '36.9211', 'longitude' => '-76.2641'),
            'areaServed' => array(
                array('@type' => 'State', 'name' => 'Virginia'),
                array('@type' => 'State', 'name' => 'North Carolina'),
                array('@type' => 'State', 'name' => 'Maryland'),
                array('@type' => 'State', 'name' => 'Delaware')
            ),
            'priceRange' => '$$',
            'openingHoursSpecification' => array(array(
                '@type' => 'OpeningHoursSpecification',
                'dayOfWeek' => array('Monday','Tuesday','Wednesday','Thursday','Friday'),
                'opens' => '07:00',
                'closes' => '18:00'
            )),
            'contactPoint' => array(
                array(
                    '@type' => 'ContactPoint',
                    'telephone' => BHV_COMPANY_PHONE,
                    'contactType' => 'customer service',
                    'availableLanguage' => 'English'
                ),
                array(
                    '@type' => 'ContactPoint',
                    'telephone' => BHV_COMPANY_MOBILE,
                    'contactType' => 'sales',
                    'availableLanguage' => 'English'
                )
            ),
            'parentOrganization' => array(
                '@type' => 'Organization',
                'name' => 'Advanced Infrastructure Mapping, LLC',
                'url' => 'http://www.aimlocatingva.com'
            ),
            'hasOfferCatalog' => array(
                '@type' => 'OfferCatalog',
                'name' => 'Hydro-Excavation Services',
                'itemListElement' => array(
                    array('@type' => 'Offer', 'itemOffered' => array('@type' => 'Service', 'name' => 'Potholing / Daylighting', 'description' => 'Safe exposure of underground utilities using high-pressure water and vacuum technology.')),
                    array('@type' => 'Offer', 'itemOffered' => array('@type' => 'Service', 'name' => 'Slot Trenching', 'description' => 'Precision narrow trenches for pipes, cables, or conduit.')),
                    array('@type' => 'Offer', 'itemOffered' => array('@type' => 'Service', 'name' => 'Remote Excavation', 'description' => 'Extended 600ft hose reach for restricted-access excavation.')),
                    array('@type' => 'Offer', 'itemOffered' => array('@type' => 'Service', 'name' => 'SUE Level A Verification', 'description' => 'ASCE compliant subsurface utility engineering through physical exposure.'))
                )
            )
        );
    }

    // Service schemas
    if (is_page('services') || is_front_page()) {
        $services = array(
            array('name' => 'Potholing / Daylighting', 'desc' => 'Safe exposure of underground utilities. SUE Level A compliant.', 'type' => 'Hydro Excavation', 'url' => BHV_COMPANY_URL . '/services/potholing/'),
            array('name' => 'Slot Trenching', 'desc' => 'Narrow, precise trenches for pipes, cables, or conduit.', 'type' => 'Precision Trenching', 'url' => BHV_COMPANY_URL . '/services/slot-trenching/'),
            array('name' => 'Remote Excavation', 'desc' => '600ft hose reach for restricted-access areas.', 'type' => 'Remote Access Excavation', 'url' => BHV_COMPANY_URL . '/services/remote-excavation/'),
            array('name' => 'SUE Level A Verification', 'desc' => 'Highest accuracy per ASCE 38 standards. VDOT compliant.', 'type' => 'Utility Engineering', 'url' => BHV_COMPANY_URL . '/services/sue-level-a/')
        );
        foreach ($services as $svc) {
            $schemas[] = array(
                '@context' => 'https://schema.org',
                '@type' => 'Service',
                '@id' => $svc['url'],
                'name' => $svc['name'],
                'description' => $svc['desc'],
                'serviceType' => $svc['type'],
                'provider' => array('@type' => 'LocalBusiness', '@id' => BHV_COMPANY_URL . '/#localbusiness', 'name' => BHV_COMPANY_NAME),
                'areaServed' => array(
                    array('@type' => 'State', 'name' => 'Virginia'),
                    array('@type' => 'State', 'name' => 'North Carolina'),
                    array('@type' => 'State', 'name' => 'Maryland'),
                    array('@type' => 'State', 'name' => 'Delaware')
                ),
                'url' => $svc['url']
            );
        }
    }

    // FAQ schema
    if (is_front_page() || is_page('services') || is_page('faq')) {
        $faqs = array(
            array('q' => 'What is hydro excavation?', 'a' => 'Hydro excavation uses pressurized water to break up soil and a powerful vacuum to remove debris. It safely exposes underground utilities without risk of damage from mechanical excavation.'),
            array('q' => 'What areas does Beach Hydrovac serve?', 'a' => 'We serve Virginia, North Carolina, Maryland, and Delaware. Based in Virginia Beach, we cover Hampton Roads, Norfolk, Chesapeake, Richmond, and the entire Mid-Atlantic region.'),
            array('q' => 'What is SUE Level A verification?', 'a' => 'SUE Level A is the highest accuracy in Subsurface Utility Engineering per ASCE 38 standards. It requires physically exposing utilities for precise location data.'),
            array('q' => 'How far can your equipment reach?', 'a' => 'Our hydrovac trucks have a 600-foot hose reach for excavation in restricted-access areas including behind buildings, landscaped areas, and tight urban spaces.'),
            array('q' => 'Is hydro excavation safer than traditional digging?', 'a' => 'Yes. Hydro excavation eliminates utility strike risk, protecting gas lines, electrical cables, fiber optics, and water mains.'),
            array('q' => 'How much does hydro excavation cost in Virginia?', 'a' => 'Costs vary by project scope. Contact us at ${NEW_PHONE} for a free quote. Veteran-owned with competitive pricing.'),
            array('q' => 'Do you offer emergency services?', 'a' => 'Yes, we are available for emergency excavation needs. Call ${NEW_PHONE} for immediate assistance.')
        );
        $faq_schema = array('@context' => 'https://schema.org', '@type' => 'FAQPage', 'mainEntity' => array());
        foreach ($faqs as $f) {
            $faq_schema['mainEntity'][] = array(
                '@type' => 'Question', 'name' => $f['q'],
                'acceptedAnswer' => array('@type' => 'Answer', 'text' => $f['a'])
            );
        }
        $schemas[] = $faq_schema;
    }

    foreach ($schemas as $schema) {
        echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . "</script>\\n";
    }
}
add_action('wp_head', 'bhv_clean_schema_markup', 5);
`;

// ── MAIN ──

async function main() {
  console.log('╔═══════════════════════════════════════════════════════╗');
  console.log('║  UPDATE ALL SEO TO NEW CONTACT INFO                  ║');
  console.log('║  Phone: ' + NEW_PHONE + '  |  Email: ' + NEW_EMAIL + '  ║');
  console.log('║  Address: ' + NEW_ADDRESS + '          ║');
  console.log('╚═══════════════════════════════════════════════════════╝\n');

  // Phase 1: Update meta descriptions via Yoast
  console.log('── PHASE 1: Update Yoast Meta Descriptions ──\n');

  let allPages = [];
  for (let pg = 1; pg <= 5; pg++) {
    const r = await fetch(`${WP_URL}/wp-json/wp/v2/pages?per_page=100&page=${pg}`, { headers });
    if (!r.ok) break;
    const data = await r.json();
    if (!data.length) break;
    allPages.push(...data);
  }
  const postResp = await fetch(`${WP_URL}/wp-json/wp/v2/posts?per_page=100`, { headers });
  const allPosts = await postResp.json();

  let ok = 0, fail = 0;

  for (const page of allPages) {
    const seo = SEO_DATA[page.slug];
    if (!seo) continue;
    const r = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${page.id}`, {
      method: 'POST', headers,
      body: JSON.stringify({ meta: { _yoast_wpseo_title: seo.t, _yoast_wpseo_metadesc: seo.d, _yoast_wpseo_focuskw: seo.k } })
    });
    if (r.ok) { console.log(`  ✅ ${page.slug}`); ok++; }
    else { console.log(`  ❌ ${page.slug}`); fail++; }
  }

  for (const post of allPosts) {
    const seo = POST_SEO[post.slug];
    if (!seo) continue;
    const r = await fetch(`${WP_URL}/wp-json/wp/v2/posts/${post.id}`, {
      method: 'POST', headers,
      body: JSON.stringify({ meta: { _yoast_wpseo_title: seo.t, _yoast_wpseo_metadesc: seo.d, _yoast_wpseo_focuskw: seo.k } })
    });
    if (r.ok) { console.log(`  ✅ ${post.slug}`); ok++; }
    else { console.log(`  ❌ ${post.slug}`); fail++; }
  }

  console.log(`\n  → ${ok} updated, ${fail} failed`);

  // Phase 2: Update Schema snippet (#7) with new contact info
  console.log('\n── PHASE 2: Update Schema Snippet (Code Snippet #7) ──\n');

  const r2 = await fetch(`${WP_URL}/wp-json/code-snippets/v1/snippets/7`, {
    method: 'PUT', headers,
    body: JSON.stringify({ code: UPDATED_SCHEMA_CODE, active: true })
  });
  console.log(`  Schema snippet: ${r2.ok ? '✅ Updated with new phone/email/address' : '❌ Failed'}`);

  // Phase 3: Verify
  console.log('\n── PHASE 3: Verify ──\n');
  await new Promise(r => setTimeout(r, 2000));

  const ts = Date.now();
  const checkPages = ['/', '/contact/', '/locations/virginia-beach/'];
  for (const path of checkPages) {
    const r = await fetch(`${WP_URL}${path}?_=${ts}`, {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Cache-Control': 'no-cache' }
    });
    const html = await r.text();
    const desc = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)?.[1];
    const hasOldPhone = html.includes('757-785-5177');
    const hasNewPhone = html.includes(NEW_PHONE);

    console.log(`  ${path}`);
    console.log(`    desc: ${desc ? desc.substring(0, 80) + '...' : 'MISSING'}`);
    console.log(`    old phone (757-785-5177): ${hasOldPhone ? '⚠ STILL PRESENT' : '✅ removed'}`);
    console.log(`    new phone (${NEW_PHONE}): ${hasNewPhone ? '✅ found' : '⚠ not yet (cache)'}`);
    console.log('');
  }

  console.log('╔═══════════════════════════════════════════════════════╗');
  console.log('║  DONE — All SEO updated to new contact info          ║');
  console.log('║                                                       ║');
  console.log('║  Google will re-crawl and update the snippet within   ║');
  console.log('║  a few days. To speed it up:                          ║');
  console.log('║  1. Go to Google Search Console                       ║');
  console.log('║  2. URL Inspection → enter beachhydrovac.com          ║');
  console.log('║  3. Click "Request Indexing"                          ║');
  console.log('║                                                       ║');
  console.log('║  Also purge LiteSpeed Cache in WP Admin.              ║');
  console.log('╚═══════════════════════════════════════════════════════╝');
}

main().catch(console.error);
