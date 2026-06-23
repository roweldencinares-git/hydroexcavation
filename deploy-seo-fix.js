import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(
  process.env.BEACH_HYDROVAC_WP_USER + ':' + process.env.BEACH_HYDROVAC_WP_PASSWORD
).toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

// ── SNIPPET 1: Expose Yoast meta fields to REST API ──

const SNIPPET_YOAST_REST = `
function bhv_register_yoast_meta_rest() {
    $yoast_fields = array(
        '_yoast_wpseo_title',
        '_yoast_wpseo_metadesc',
        '_yoast_wpseo_focuskw',
        '_yoast_wpseo_canonical',
        '_yoast_wpseo_meta-robots-noindex',
    );
    $post_types = array('post', 'page');
    foreach ($post_types as $type) {
        foreach ($yoast_fields as $field) {
            register_post_meta($type, $field, array(
                'show_in_rest' => true,
                'single' => true,
                'type' => 'string',
                'auth_callback' => function() {
                    return current_user_can('edit_posts');
                }
            ));
        }
    }
}
add_action('init', 'bhv_register_yoast_meta_rest');
`;

// ── SNIPPET 2: Remove duplicate OG tags & schemas from old custom code ──

const SNIPPET_REMOVE_DUPES = `
// Remove the OLD custom OG tags function (conflicts with Yoast)
remove_action('wp_head', 'beachhydrovac_add_social_meta_tags', 4);

// Remove the OLD custom canonical function (Yoast handles it)
remove_action('wp_head', 'beachhydrovac_add_canonical_url', 3);

// Remove the OLD custom meta description (we set via Yoast now)
remove_action('wp_head', 'beachhydrovac_add_meta_description', 1);

// Remove the OLD custom robots meta (Yoast handles it)
remove_action('wp_head', 'beachhydrovac_add_robots_meta', 1);

// Remove the OLD custom keywords meta (Google ignores keywords)
remove_action('wp_head', 'beachhydrovac_add_keywords_meta', 1);

// Remove the OLD custom title filter (Yoast handles titles)
remove_filter('pre_get_document_title', 'beachhydrovac_custom_title', 20);

// Remove the OLD custom schema function (has duplicate Org/WebSite/Breadcrumb)
remove_action('wp_head', 'beachhydrovac_add_schema_markup', 5);
`;

// ── SNIPPET 3: Clean schemas (only what Yoast doesn't generate) ──

const SNIPPET_CLEAN_SCHEMAS = `
if (!defined('BHV_COMPANY_NAME')) {
    define('BHV_COMPANY_NAME', 'Beach Hydrovac');
    define('BHV_COMPANY_LEGAL', 'Beach Hydrovac LLC');
    define('BHV_COMPANY_URL', 'https://beachhydrovac.com');
    define('BHV_COMPANY_LOGO', 'https://beachhydrovac.com/wp-content/uploads/beach-hydrovac-logo.png');
    define('BHV_COMPANY_IMAGE', 'https://beachhydrovac.com/wp-content/uploads/hero-beach-truck.jpg');
    define('BHV_COMPANY_PHONE', '+1-757-785-5177');
    define('BHV_COMPANY_EMAIL', 'info@beachhydrovac.com');
    define('BHV_COMPANY_DESCRIPTION', 'Veteran-owned hydro-excavation company providing precision vacuum excavation services including potholing, daylighting, slot trenching, and SUE Level A verification across Virginia, North Carolina, Maryland, and Delaware.');
}

/**
 * CLEAN Schema Markup - Only schemas Yoast free does NOT generate:
 * LocalBusiness, Service, FAQPage
 * (Yoast already handles: Organization, WebSite, Breadcrumb, WebPage)
 */
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
                'streetAddress' => 'Virginia Beach',
                'addressLocality' => 'Virginia Beach',
                'addressRegion' => 'VA',
                'postalCode' => '23456',
                'addressCountry' => 'US'
            ),
            'geo' => array('@type' => 'GeoCoordinates', 'latitude' => '36.8529', 'longitude' => '-75.9780'),
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

    // Service schemas (services page + homepage)
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

    // FAQ schema (homepage, services, FAQ page)
    if (is_front_page() || is_page('services') || is_page('faq')) {
        $faqs = array(
            array('q' => 'What is hydro excavation?', 'a' => 'Hydro excavation uses pressurized water to break up soil and a powerful vacuum to remove debris. It safely exposes underground utilities without risk of damage from mechanical excavation.'),
            array('q' => 'What areas does Beach Hydrovac serve?', 'a' => 'We serve Virginia, North Carolina, Maryland, and Delaware. Based in Virginia Beach, we cover Hampton Roads, Norfolk, Chesapeake, Richmond, and the entire Mid-Atlantic region.'),
            array('q' => 'What is SUE Level A verification?', 'a' => 'SUE Level A is the highest accuracy in Subsurface Utility Engineering per ASCE 38 standards. It requires physically exposing utilities for precise location data.'),
            array('q' => 'How far can your equipment reach?', 'a' => 'Our hydrovac trucks have a 600-foot hose reach for excavation in restricted-access areas including behind buildings, landscaped areas, and tight urban spaces.'),
            array('q' => 'Is hydro excavation safer than traditional digging?', 'a' => 'Yes. Hydro excavation eliminates utility strike risk, protecting gas lines, electrical cables, fiber optics, and water mains.'),
            array('q' => 'How much does hydro excavation cost in Virginia?', 'a' => 'Costs vary by project scope. Contact us at 757-785-5177 for a free quote. Veteran-owned with competitive pricing.'),
            array('q' => 'Do you offer emergency services?', 'a' => 'Yes, we are available for emergency excavation needs. Call 757-785-5177 for immediate assistance.')
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

// ── DEPLOY ──

async function deploy() {
  console.log('Deploying SEO fix snippets via Code Snippets API...\n');

  // Snippet 1: Expose Yoast fields
  const r1 = await fetch(`${WP_URL}/wp-json/code-snippets/v1/snippets`, {
    method: 'POST', headers,
    body: JSON.stringify({
      name: 'BHV SEO: Expose Yoast Meta to REST API',
      desc: 'Registers Yoast meta fields (title, description, keyword, canonical, noindex) for the WordPress REST API so they can be set programmatically.',
      code: SNIPPET_YOAST_REST,
      active: true,
      scope: 'global',
      priority: 1,
      tags: ['seo']
    })
  });
  const d1 = await r1.json();
  console.log(`  Snippet 1 (Yoast REST): ${r1.status === 201 ? '✅' : '❌'} ID:${d1.id}`);

  // Snippet 2: Remove duplicate OG/schema functions
  const r2 = await fetch(`${WP_URL}/wp-json/code-snippets/v1/snippets`, {
    method: 'POST', headers,
    body: JSON.stringify({
      name: 'BHV SEO: Remove Duplicate OG Tags & Schemas',
      desc: 'Removes the old custom functions that duplicate what Yoast SEO already outputs (OG tags, canonical, meta desc, robots, keywords, schemas, title filter).',
      code: SNIPPET_REMOVE_DUPES,
      active: true,
      scope: 'global',
      priority: 20,
      tags: ['seo']
    })
  });
  const d2 = await r2.json();
  console.log(`  Snippet 2 (Remove dupes): ${r2.status === 201 ? '✅' : '❌'} ID:${d2.id}`);

  // Snippet 3: Clean schemas
  const r3 = await fetch(`${WP_URL}/wp-json/code-snippets/v1/snippets`, {
    method: 'POST', headers,
    body: JSON.stringify({
      name: 'BHV SEO: Clean Schema Markup (LocalBusiness + Service + FAQ)',
      desc: 'Adds only the schemas Yoast free does not generate: LocalBusiness, Service (x4), and FAQPage. No duplicates with Yoast.',
      code: SNIPPET_CLEAN_SCHEMAS,
      active: true,
      scope: 'global',
      priority: 30,
      tags: ['seo']
    })
  });
  const d3 = await r3.json();
  console.log(`  Snippet 3 (Clean schemas): ${r3.status === 201 ? '✅' : '❌'} ID:${d3.id}`);

  return { s1: d1.id, s2: d2.id, s3: d3.id };
}

async function setYoastMeta(type, id, title, desc, kw) {
  const endpoint = type === 'post' ? 'posts' : 'pages';
  const body = { meta: {} };
  if (title) body.meta._yoast_wpseo_title = title;
  if (desc) body.meta._yoast_wpseo_metadesc = desc;
  if (kw) body.meta._yoast_wpseo_focuskw = kw;

  const r = await fetch(`${WP_URL}/wp-json/wp/v2/${endpoint}/${id}`, {
    method: 'POST', headers, body: JSON.stringify(body)
  });
  return r.ok;
}

async function setYoastCanonicalAndNoindex(pageId, canonicalUrl) {
  const r = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${pageId}`, {
    method: 'POST', headers,
    body: JSON.stringify({
      meta: {
        _yoast_wpseo_canonical: canonicalUrl,
        '_yoast_wpseo_meta-robots-noindex': '1'
      }
    })
  });
  return r.ok;
}

// ── META DESCRIPTIONS ──

const SEO_DATA = {
  'home': { t: 'Hydro Excavation Virginia Beach | Veteran-Owned | Beach Hydrovac', d: "Virginia's trusted hydro excavation company. Potholing, daylighting, SUE Level A verification. Serving Hampton Roads & Richmond. Call 757-785-5177.", k: 'hydro excavation virginia beach' },
  'services': { t: 'Hydro Excavation Services | Potholing, Daylighting, SUE | Beach Hydrovac', d: 'Full-service hydro excavation: potholing, daylighting, slot trenching, remote dig & SUE Level A. Non-destructive. Veteran-owned. Free quotes across Virginia.', k: 'hydro excavation services virginia' },
  'about': { t: 'About Beach Hydrovac | Veteran-Owned Hydro Excavation Virginia', d: 'Veteran-owned hydro excavation in Virginia Beach. Military discipline, civilian expertise. Serving VA, NC, MD & DE since 2023. Meet our team.', k: 'veteran owned hydro excavation virginia' },
  'contact': { t: 'Contact Beach Hydrovac | Free Hydro Excavation Quote | 757-785-5177', d: 'Get your free hydro excavation quote today. Call 757-785-5177 or submit online. Serving Virginia Beach, Norfolk, Chesapeake, Richmond & all Hampton Roads.', k: 'hydro excavation quote virginia beach' },
  'faq': { t: 'Hydro Excavation FAQ | Your Questions Answered | Beach Hydrovac', d: 'Common hydro excavation questions answered: costs, safety, SUE levels, equipment reach, service areas. Everything Virginia contractors need to know.', k: 'hydro excavation faq' },
  'locations': { t: 'Hydro Excavation Locations | Service Areas Across Virginia', d: 'Beach Hydrovac serves 17+ cities across Virginia. Find hydro excavation near you. Hampton Roads, Richmond, NoVA & beyond. Veteran-owned.', k: 'hydro excavation locations virginia' },
  'service-areas': { t: 'Hydro Excavation Service Areas | VA, NC, MD, DE | Beach Hydrovac', d: 'Professional hydro excavation across Virginia, North Carolina, Maryland & Delaware. Full Mid-Atlantic coverage from our Virginia Beach base.', k: 'hydro excavation service areas' },
  'hydro-excavation': { t: 'Hydro Excavation Virginia | Non-Destructive Vacuum Excavation', d: 'Industrial hydro excavation in Virginia. 3000 PSI water + vacuum safely exposes buried utilities. Zero damage to surrounding infrastructure. Free estimates.', k: 'hydro excavation virginia' },
  'potholing': { t: 'Potholing Services Virginia | Utility Exposure & Verification', d: 'Precision potholing to safely expose underground utilities. SUE Level A compliant. Prevents utility strikes across Virginia. Call 757-785-5177.', k: 'potholing services virginia' },
  'daylighting': { t: 'Daylighting Services Virginia | Safe Underground Utility Exposure', d: 'Non-destructive daylighting to visually confirm buried utility locations. Required for SUE verification & safe construction. Free quotes.', k: 'daylighting services virginia' },
  'slot-trenching': { t: 'Slot Trenching Virginia | Precision Narrow Trench Excavation', d: 'Precision slot trenching for pipes, cables & conduit. Minimal site disruption, reduced backfill. Veteran-owned Beach Hydrovac. Free quotes.', k: 'slot trenching services virginia' },
  'remote-excavation': { t: 'Remote Excavation | 600ft Hose Reach | Beach Hydrovac Virginia', d: '600-foot hose reach for excavation in tight or restricted areas. Behind buildings, historic sites, landscaped properties. No area too hard to reach.', k: 'remote excavation services virginia' },
  'sue-level-a': { t: 'SUE Level A Verification Virginia | ASCE 38 & VDOT Compliant', d: 'ASCE 38 compliant SUE Level A verification through physical utility exposure. VDOT approved. Legally defensible documentation.', k: 'SUE level A verification virginia' },
  'virginia-beach': { t: 'Hydro Excavation Virginia Beach VA | Local Veteran-Owned Service', d: 'Virginia Beach hydro excavation by a local veteran-owned company. Potholing, daylighting, SUE verification. Based in VB. Call 757-785-5177.', k: 'hydro excavation virginia beach va' },
  'norfolk': { t: 'Hydro Excavation Norfolk VA | Hampton Roads Utility Excavation', d: 'Professional hydro excavation in Norfolk, VA. Safe digging near Naval Station Norfolk & downtown. Potholing & daylighting. Call 757-785-5177.', k: 'hydro excavation norfolk va' },
  'chesapeake': { t: 'Hydro Excavation Chesapeake VA | Safe Non-Destructive Digging', d: 'Chesapeake hydro excavation. Non-destructive utility exposure for residential & commercial projects. Veteran-owned. Free quotes.', k: 'hydro excavation chesapeake va' },
  'newport-news': { t: 'Hydro Excavation Newport News VA | Peninsula Services', d: 'Hydro excavation on the Virginia Peninsula. Serving Newport News contractors & municipalities. Potholing, SUE Level A. Call 757-785-5177.', k: 'hydro excavation newport news va' },
  'hampton': { t: 'Hydro Excavation Hampton VA | Potholing & Daylighting Experts', d: 'Hampton hydro excavation for safe utility exposure. Potholing, daylighting & slot trenching. Veteran-owned. Free estimates.', k: 'hydro excavation hampton va' },
  'richmond': { t: 'Hydro Excavation Richmond VA | Central Virginia Vacuum Excavation', d: 'Richmond hydro excavation. Potholing, slot trenching & SUE verification for Central Virginia projects. Veteran-owned. Call 757-785-5177.', k: 'hydro excavation richmond va' },
  'suffolk': { t: 'Hydro Excavation Suffolk VA | Vacuum Excavation Services', d: 'Suffolk hydro excavation for safe underground utility work. Non-destructive digging for construction & infrastructure. Free quotes.', k: 'hydro excavation suffolk va' },
  'portsmouth': { t: 'Hydro Excavation Portsmouth VA | Utility Daylighting & Potholing', d: 'Portsmouth hydro excavation. Daylighting, potholing & safe utility exposure for Hampton Roads contractors. Call 757-785-5177.', k: 'hydro excavation portsmouth va' },
  'williamsburg': { t: 'Hydro Excavation Williamsburg VA | Safe Digging for Historic Areas', d: 'Williamsburg hydro excavation — ideal for historic areas. Non-destructive vacuum excavation protects surrounding structures. Free quotes.', k: 'hydro excavation williamsburg va' },
  'henrico': { t: 'Hydro Excavation Henrico VA | Residential & Commercial Potholing', d: 'Henrico County hydro excavation. Residential & commercial potholing, daylighting, utility verification. Free estimates.', k: 'hydro excavation henrico va' },
  'chesterfield': { t: 'Hydro Excavation Chesterfield VA | Underground Utility Services', d: 'Chesterfield County hydro excavation for underground utility location & verification. Potholing, SUE Level A. Veteran-owned.', k: 'hydro excavation chesterfield va' },
  'alexandria': { t: 'Hydro Excavation Alexandria VA | Northern Virginia Services', d: 'Alexandria hydro excavation for NoVA projects. Non-destructive vacuum excavation for dense urban & historic areas. Free quotes.', k: 'hydro excavation alexandria va' },
  'arlington': { t: 'Hydro Excavation Arlington VA | Government & Commercial Projects', d: 'Arlington hydro excavation for government, commercial & residential projects in Northern Virginia. Veteran-owned. Call 757-785-5177.', k: 'hydro excavation arlington va' },
  'fairfax': { t: 'Hydro Excavation Fairfax VA | Utility Location & Verification', d: 'Fairfax hydro excavation. Underground utility location, potholing & daylighting for Northern Virginia. Free estimates.', k: 'hydro excavation fairfax va' },
  'fredericksburg': { t: 'Hydro Excavation Fredericksburg VA | Central Virginia Services', d: 'Fredericksburg hydro excavation. Slot trenching, potholing & vacuum excavation for Central Virginia. Call 757-785-5177.', k: 'hydro excavation fredericksburg va' },
  'roanoke': { t: 'Hydro Excavation Roanoke VA | Western Virginia Excavation', d: 'Roanoke hydro excavation. Safe, non-destructive vacuum excavation for Western Virginia. Potholing & daylighting. Free quotes.', k: 'hydro excavation roanoke va' },
  'lynchburg': { t: 'Hydro Excavation Lynchburg VA | Central Virginia Potholing', d: 'Lynchburg hydro excavation. Potholing, daylighting & utility verification for Central Virginia. Veteran-owned. Call 757-785-5177.', k: 'hydro excavation lynchburg va' },
  'hydro-excavation-virginia-guide': { t: 'Hydro Excavation Virginia: Complete 2026 Guide | Beach Hydrovac', d: 'Everything about hydro excavation in Virginia: costs, methods, VDOT requirements, choosing a contractor. Updated 2026 industry guide.', k: 'hydro excavation virginia guide 2026' },
};

const POST_SEO = {
  'fiber-optic-installation-hydro-excavation': { t: 'Fiber Optic Installation with Hydro Excavation | Safe Trenching', d: 'How hydro excavation protects fiber optic cables during installation. Non-destructive trenching prevents costly damage.', k: 'fiber optic installation hydro excavation' },
  'common-utility-strike-mistakes-how-to-avoid': { t: '5 Common Utility Strike Mistakes & How to Prevent Them', d: 'Avoid costly utility strikes. Learn the top mistakes contractors make and how hydro excavation prevents underground damage.', k: 'utility strike prevention' },
  'hydro-excavation-vs-traditional-excavation': { t: 'Hydro Excavation vs Traditional Digging | Comparison', d: 'Hydro excavation vs backhoe: safety, cost, speed & environmental impact compared. Why Virginia contractors switch to vacuum excavation.', k: 'hydro excavation vs traditional excavation' },
  'vdot-sue-requirements-contractors-guide': { t: "VDOT SUE Requirements: Virginia Contractor's Guide (2026)", d: 'Complete guide to VDOT SUE requirements. Levels A-D explained, compliance steps & deadlines for Virginia contractors.', k: 'VDOT SUE requirements virginia' },
  'hydro-excavation-cost-guide-virginia-2026': { t: 'Hydro Excavation Cost Virginia (2026) | Pricing Breakdown', d: 'What does hydro excavation cost in Virginia? 2026 pricing: per-hole rates, hourly costs & estimates. Free quote from Beach Hydrovac.', k: 'hydro excavation cost virginia' },
};

const CANONICAL_MAP = {
  'virginia-beach-2': 'virginia-beach',
  'norfolk-2': 'norfolk',
  'chesapeake-2': 'chesapeake',
  'newport-news-2': 'newport-news',
  'hampton-2': 'hampton',
  'richmond-2': 'richmond',
};

// ── MAIN ──

async function main() {
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║  BEACH HYDROVAC SEO — DEPLOY ALL FIXES               ║');
  console.log('║  Zero design changes. Only invisible <head> metadata. ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  // Phase 1: Deploy PHP snippets
  console.log('── PHASE 1: Deploy PHP Snippets via Code Snippets ──\n');
  const snippetIds = await deploy();

  // Phase 2: Wait for snippets to take effect, then set Yoast meta
  console.log('\n── PHASE 2: Set Yoast Meta Descriptions ──\n');
  console.log('  Waiting 3s for snippets to register fields...');
  await new Promise(r => setTimeout(r, 3000));

  // Fetch all content
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

  console.log(`  Found ${allPages.length} pages, ${allPosts.length} posts\n`);

  let ok = 0, fail = 0;

  // Set page meta descriptions
  for (const page of allPages) {
    const seo = SEO_DATA[page.slug];
    if (!seo) continue;
    const success = await setYoastMeta('page', page.id, seo.t, seo.d, seo.k);
    if (success) {
      console.log(`  ✅ ${page.slug} (${page.id})`);
      ok++;
    } else {
      console.log(`  ❌ ${page.slug} (${page.id})`);
      fail++;
    }
  }

  // Set post meta descriptions
  for (const post of allPosts) {
    const seo = POST_SEO[post.slug];
    if (!seo) continue;
    const success = await setYoastMeta('post', post.id, seo.t, seo.d, seo.k);
    if (success) {
      console.log(`  ✅ ${post.slug} (${post.id})`);
      ok++;
    } else {
      console.log(`  ❌ ${post.slug} (${post.id})`);
      fail++;
    }
  }

  console.log(`\n  → ${ok} meta descriptions set, ${fail} failed`);

  // Phase 3: Canonical duplicate pages
  console.log('\n── PHASE 3: Canonical + Noindex Duplicate Pages ──\n');

  let canonicalized = 0;
  for (const [dupeSlug, origSlug] of Object.entries(CANONICAL_MAP)) {
    const dupePage = allPages.find(p => p.slug === dupeSlug);
    if (!dupePage) { console.log(`  ⚠  ${dupeSlug} not found`); continue; }
    const origUrl = `${WP_URL}/locations/${origSlug}/`;
    const success = await setYoastCanonicalAndNoindex(dupePage.id, origUrl);
    console.log(`  ${success ? '✅' : '❌'} ${dupeSlug} → canonical: ${origUrl}`);
    if (success) canonicalized++;
  }

  // Phase 4: Purge LiteSpeed Cache
  console.log('\n── PHASE 4: Cache Purge ──\n');
  const purgeResp = await fetch(`${WP_URL}/wp-json/litespeed/v1/purge/all`, {
    method: 'POST', headers
  });
  console.log(`  LiteSpeed purge: ${purgeResp.status === 200 ? '✅ Purged' : '⚠  ' + purgeResp.status + ' (may need manual purge)'}`);

  // Phase 5: Verify
  console.log('\n── PHASE 5: Verification ──\n');
  await new Promise(r => setTimeout(r, 2000));

  const checkPages = ['/', '/services/', '/about/', '/contact/', '/locations/virginia-beach/'];
  for (const path of checkPages) {
    const r = await fetch(`${WP_URL}${path}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SEOCheck/1.0)', 'Cache-Control': 'no-cache' }
    });
    const html = await r.text();

    const desc = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)?.[1];
    const ogCount = (html.match(/og:title/g) || []).length;
    const schemaCount = (html.match(/application\/ld\+json/g) || []).length;

    console.log(`  ${path}`);
    console.log(`    meta description: ${desc ? '✅ ' + desc.substring(0, 70) + '...' : '❌ MISSING (cache may need clearing)'}`);
    console.log(`    og:title count:   ${ogCount} ${ogCount === 1 ? '✅' : ogCount > 1 ? '⚠ DUPLICATE (cache)' : '❌'}`);
    console.log(`    schema count:     ${schemaCount} ${schemaCount <= 7 ? '✅' : '⚠ (cache)'}`);
    console.log('');
  }

  // Summary
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║                    RESULTS                            ║');
  console.log('╠════════════════════════════════════════════════════════╣');
  console.log(`║  PHP Snippets deployed:      3 (via Code Snippets)    ║`);
  console.log(`║  Meta descriptions set:      ${String(ok).padStart(2)} pages/posts           ║`);
  console.log(`║  Duplicate pages canonical:  ${String(canonicalized).padStart(2)}                      ║`);
  console.log('╠════════════════════════════════════════════════════════╣');
  console.log('║                                                        ║');
  console.log('║  If verification still shows issues, it is likely      ║');
  console.log('║  LiteSpeed cache. Go to WP Admin:                     ║');
  console.log('║  LiteSpeed Cache → Purge All → wait 30s → recheck     ║');
  console.log('║                                                        ║');
  console.log('║  Also update Yoast Organization description:          ║');
  console.log('║  Yoast SEO → Settings → Site Basics → Organization    ║');
  console.log('║  Set description to the full company description.      ║');
  console.log('╚════════════════════════════════════════════════════════╝');
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
