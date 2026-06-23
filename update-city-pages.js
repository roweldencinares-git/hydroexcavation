import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(`${process.env.BEACH_HYDROVAC_WP_USER}:${process.env.BEACH_HYDROVAC_WP_PASSWORD}`).toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

const PHONE = '757-510-5220';
const MOBILE = '757-633-8922';
const EMAIL = 'johnw@beachhydrovac.com';
const PHONE_RAW = '7575105220';
const DARK_NAVY = '#0f2134';
const CYAN = '#27aefd';
const GOLD = '#e8a020';

const statsBar = `
<!-- wp:html -->
<div style="background:${GOLD};padding:1.25rem 2rem;">
  <div style="max-width:1100px;margin:0 auto;display:flex;flex-wrap:wrap;justify-content:center;gap:1.5rem;text-align:center;">
    <span style="font-weight:700;font-size:0.95rem;color:${DARK_NAVY};">500ft+ Hose Reach</span>
    <span style="color:${DARK_NAVY};opacity:0.4;">|</span>
    <span style="font-weight:700;font-size:0.95rem;color:${DARK_NAVY};">Veteran-Owned</span>
    <span style="color:${DARK_NAVY};opacity:0.4;">|</span>
    <span style="font-weight:700;font-size:0.95rem;color:${DARK_NAVY};">SUE Level A Verified</span>
    <span style="color:${DARK_NAVY};opacity:0.4;">|</span>
    <span style="font-weight:700;font-size:0.95rem;color:${DARK_NAVY};">Fast Mobilization</span>
  </div>
</div>
<!-- /wp:html -->`;

const servicesGrid = (city) => `
<!-- wp:group {"style":{"spacing":{"padding":{"top":"3rem","bottom":"1rem"}}},"backgroundColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-white-background-color has-background" style="padding-top:3rem;padding-bottom:1rem">
<!-- wp:heading {"textAlign":"center","textColor":"deep-atlantic","style":{"typography":{"fontWeight":"900","fontSize":"2rem"}}} -->
<h2 class="wp-block-heading has-text-align-center has-deep-atlantic-color has-text-color" style="font-weight:900;font-size:2rem">Our Services in ${city}</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","style":{"spacing":{"margin":{"bottom":"2rem"}}}} -->
<p class="has-text-align-center" style="margin-bottom:2rem">Non-destructive. Precise. Safe. Every time.</p>
<!-- /wp:paragraph -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"1.5rem"}}}} -->
<div class="wp-block-columns">

<!-- wp:column {"style":{"border":{"radius":"12px","width":"1px","color":"#e5e7eb"},"spacing":{"padding":{"top":"2rem","right":"1.5rem","bottom":"2rem","left":"1.5rem"}}}} -->
<div class="wp-block-column has-border-color" style="border-radius:12px;border-color:#e5e7eb;border-width:1px;padding:2rem 1.5rem">
<!-- wp:paragraph {"style":{"typography":{"fontSize":"2.5rem"},"spacing":{"margin":{"bottom":"0.5rem"}}}} --><p style="font-size:2.5rem;margin-bottom:0.5rem">🕳️</p><!-- /wp:paragraph -->
<!-- wp:heading {"level":3,"textColor":"deep-atlantic","style":{"typography":{"fontSize":"1.1rem","fontWeight":"700"}}} -->
<h3 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-size:1.1rem;font-weight:700">Potholing & Daylighting</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} -->
<p style="font-size:0.9rem">Safely expose buried utilities using high-pressure water — zero risk of damage to gas, fiber, or electric lines.</p>
<!-- /wp:paragraph -->
</div><!-- /wp:column -->

<!-- wp:column {"style":{"border":{"radius":"12px","width":"1px","color":"#e5e7eb"},"spacing":{"padding":{"top":"2rem","right":"1.5rem","bottom":"2rem","left":"1.5rem"}}}} -->
<div class="wp-block-column has-border-color" style="border-radius:12px;border-color:#e5e7eb;border-width:1px;padding:2rem 1.5rem">
<!-- wp:paragraph {"style":{"typography":{"fontSize":"2.5rem"},"spacing":{"margin":{"bottom":"0.5rem"}}}} --><p style="font-size:2.5rem;margin-bottom:0.5rem">⛏️</p><!-- /wp:paragraph -->
<!-- wp:heading {"level":3,"textColor":"deep-atlantic","style":{"typography":{"fontSize":"1.1rem","fontWeight":"700"}}} -->
<h3 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-size:1.1rem;font-weight:700">Slot Trenching</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} -->
<p style="font-size:0.9rem">Narrow, precise trenches for fiber optic, conduit, water, and gas line installation with minimal restoration needed.</p>
<!-- /wp:paragraph -->
</div><!-- /wp:column -->

<!-- wp:column {"style":{"border":{"radius":"12px","width":"1px","color":"#e5e7eb"},"spacing":{"padding":{"top":"2rem","right":"1.5rem","bottom":"2rem","left":"1.5rem"}}}} -->
<div class="wp-block-column has-border-color" style="border-radius:12px;border-color:#e5e7eb;border-width:1px;padding:2rem 1.5rem">
<!-- wp:paragraph {"style":{"typography":{"fontSize":"2.5rem"},"spacing":{"margin":{"bottom":"0.5rem"}}}} --><p style="font-size:2.5rem;margin-bottom:0.5rem">📡</p><!-- /wp:paragraph -->
<!-- wp:heading {"level":3,"textColor":"deep-atlantic","style":{"typography":{"fontSize":"1.1rem","fontWeight":"700"}}} -->
<h3 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-size:1.1rem;font-weight:700">Remote Excavation</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} -->
<p style="font-size:0.9rem">500ft+ hose reach lets us work in areas where trucks can't go — tight corridors, residential lots, restricted zones.</p>
<!-- /wp:paragraph -->
</div><!-- /wp:column -->

<!-- wp:column {"style":{"border":{"radius":"12px","width":"1px","color":"#e5e7eb"},"spacing":{"padding":{"top":"2rem","right":"1.5rem","bottom":"2rem","left":"1.5rem"}}}} -->
<div class="wp-block-column has-border-color" style="border-radius:12px;border-color:#e5e7eb;border-width:1px;padding:2rem 1.5rem">
<!-- wp:paragraph {"style":{"typography":{"fontSize":"2.5rem"},"spacing":{"margin":{"bottom":"0.5rem"}}}} --><p style="font-size:2.5rem;margin-bottom:0.5rem">📋</p><!-- /wp:paragraph -->
<!-- wp:heading {"level":3,"textColor":"deep-atlantic","style":{"typography":{"fontSize":"1.1rem","fontWeight":"700"}}} -->
<h3 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-size:1.1rem;font-weight:700">SUE Level A Verification</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} -->
<p style="font-size:0.9rem">ASCE-compliant utility documentation. Legally defensible 3D coordinates, depth, material type — for engineering records.</p>
<!-- /wp:paragraph -->
</div><!-- /wp:column -->

</div><!-- /wp:columns -->
</div><!-- /wp:group -->`;

const ctaSection = (city) => `
<!-- wp:html -->
<div style="background:linear-gradient(135deg,${DARK_NAVY} 0%,#1a4a6e 100%);padding:3rem 2rem;text-align:center;">
  <h2 style="color:#ffffff;font-size:2rem;font-weight:900;margin:0 0 0.75rem 0;">Get a Free Quote for ${city}</h2>
  <p style="color:#ccddee;font-size:1rem;margin:0 0 2rem 0;">Veteran-owned. Locally based. Ready to mobilize across Hampton Roads.</p>
  <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
    <a href="tel:${PHONE_RAW}" style="display:inline-block;background:${GOLD};color:#0f2134;font-weight:700;font-size:1rem;padding:0.875rem 2rem;border-radius:9999px;text-decoration:none;">Call ${PHONE}</a>
    <a href="tel:7576338922" style="display:inline-block;background:transparent;color:${GOLD};font-weight:700;font-size:1rem;padding:0.875rem 2rem;border-radius:9999px;text-decoration:none;border:2px solid ${GOLD};">Mobile ${MOBILE}</a>
    <a href="mailto:${EMAIL}" style="display:inline-block;background:transparent;color:#ffffff;font-weight:600;font-size:0.9rem;padding:0.875rem 2rem;border-radius:9999px;text-decoration:none;border:2px solid #ffffff;">Email Us</a>
  </div>
</div>
<!-- /wp:html -->`;

const internalLinks = `
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","bottom":"1.5rem"}}},"backgroundColor":"base","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-base-background-color has-background" style="padding-top:1.5rem;padding-bottom:1.5rem">
<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"0.875rem"}}} -->
<p class="has-text-align-center" style="font-size:0.875rem"><strong>Also Serving:</strong> &nbsp;
<a href="https://beachhydrovac.com/">Virginia Beach</a> &nbsp;|&nbsp;
<a href="https://beachhydrovac.com/norfolk-hydrovac/">Norfolk</a> &nbsp;|&nbsp;
<a href="https://beachhydrovac.com/chesapeake-hydrovac/">Chesapeake</a> &nbsp;|&nbsp;
<a href="https://beachhydrovac.com/newport-news-hydrovac/">Newport News</a> &nbsp;|&nbsp;
<a href="https://beachhydrovac.com/suffolk-hydrovac/">Suffolk</a> &nbsp;|&nbsp;
<a href="https://beachhydrovac.com/hampton-hydrovac/">Hampton</a> &nbsp;|&nbsp;
<a href="https://beachhydrovac.com/portsmouth-hydrovac/">Portsmouth</a>
</p>
<!-- /wp:paragraph -->
</div><!-- /wp:group -->`;

const pages = [
  {
    id: 3750, city: 'Norfolk', slug: 'norfolk-hydrovac',
    headline: 'Hydrovac Services in Norfolk, Virginia',
    sub: 'Hydro excavation, potholing & slot trenching for Norfolk contractors. Veteran-owned. Fast mobilization.',
    bodyP1: 'Norfolk is one of Virginia\'s most utility-dense cities — home to Naval Station Norfolk, a dense downtown corridor, and aging underground infrastructure that demands extreme care during excavation.',
    bodyP2: 'Beach HydroVac provides hydro excavation services throughout Norfolk for electrical contractors, civil engineers, telecom installers, and municipal crews. Our <strong>"Map First, Dig Second"</strong> approach with <strong>AIM Locating</strong> ensures every pothole is safely executed before digging begins.',
    zips: '23501, 23502, 23503, 23504, 23505, 23507, 23508, 23509, 23510, 23511, 23513, 23517, 23518, 23523',
    localNote: 'We understand Norfolk\'s Naval Station environment and DOD-adjacent project requirements. As a veteran-owned business, we bring the professionalism and precision that government-adjacent work demands.',
  },
  {
    id: 3751, city: 'Chesapeake', slug: 'chesapeake-hydrovac',
    headline: 'Hydrovac Services in Chesapeake, Virginia',
    sub: 'Hydro excavation for Chesapeake\'s growing construction corridor. Fast, safe, precise.',
    bodyP1: 'Chesapeake is one of Virginia\'s fastest-growing cities — with massive commercial development along Battlefield Blvd, Indian River Road, and the Route 17 corridor. New construction means new utility conflicts, which is exactly where hydro excavation is essential.',
    bodyP2: 'Beach HydroVac serves Chesapeake contractors, developers, and utility crews with fast mobilization and industrial-grade vacuum trucks. Our <strong>500ft+ hose reach</strong> is especially valuable in Chesapeake\'s suburban residential developments where truck access is often limited.',
    zips: '23320, 23321, 23322, 23323, 23324, 23325',
    localNote: 'As Chesapeake\'s population and commercial development accelerates, underground utility density increases every year. Whether you\'re installing fiber along Greenbrier Parkway or running conduit near the Chesapeake Expressway, Beach HydroVac keeps your project on schedule.',
  },
  {
    id: 3752, city: 'Newport News', slug: 'newport-news-hydrovac',
    headline: 'Hydrovac Services in Newport News, Virginia',
    sub: 'Hydro excavation for Newport News contractors, shipyard-adjacent projects & utility installation.',
    bodyP1: 'Newport News\'s industrial waterfront and dense utility corridors make it one of the most complex excavation environments in Hampton Roads. Beach HydroVac\'s precision hydro excavation ensures utility work near the shipyard, industrial parks, and residential areas is performed safely and accurately.',
    bodyP2: 'As a veteran-owned business, we understand the unique requirements of DOD-adjacent projects and government contracts. Our <strong>SUE Level A documentation</strong> meets federal and state compliance standards.',
    zips: '23601, 23602, 23603, 23604, 23605, 23606, 23607, 23608',
    localNote: 'Our 500ft+ hose reach is critical in Newport News — letting us access restricted shipyard-adjacent corridors and tight industrial areas that standard vacuum trucks can\'t reach.',
  },
  {
    id: 3753, city: 'Suffolk', slug: 'suffolk-hydrovac',
    headline: 'Hydrovac Services in Suffolk, Virginia',
    sub: 'Suffolk\'s fastest-growing construction corridor deserves the safest excavation. That\'s us.',
    bodyP1: 'Suffolk is one of Virginia\'s fastest-growing cities. New residential and commercial development means new underground utility installation every day — and that means hydrovac. Beach HydroVac supports Suffolk\'s construction boom with safe, non-destructive hydro excavation.',
    bodyP2: 'Whether you\'re building along Route 58, Harbour View, or anywhere in between, we deliver precision potholing and slot trenching that keeps your project on schedule and your crew safe.',
    zips: '23432, 23433, 23434, 23435, 23436, 23437, 23438, 23439',
    localNote: 'Suffolk\'s large suburban lots and rural-to-urban transition zones often have unmapped or outdated utility records. Our "Map First, Dig Second" workflow with AIM Locating eliminates guesswork before any excavation begins.',
  },
  {
    id: 3754, city: 'Hampton', slug: 'hampton-hydrovac',
    headline: 'Hydrovac Services in Hampton, Virginia',
    sub: 'Precision hydro excavation near Langley AFB, downtown Hampton & across the Peninsula.',
    bodyP1: 'Hampton\'s proximity to Langley Air Force Base, NASA Langley Research Center, and a dense residential and commercial core makes it a unique excavation environment. Beach HydroVac brings the precision and clearance awareness that military-adjacent projects demand.',
    bodyP2: 'Our veteran-owned team understands the documentation and safety standards required near federal installations. Every job is completed with the professionalism Hampton\'s contractors and agencies expect.',
    zips: '23661, 23662, 23663, 23664, 23665, 23666, 23667, 23668, 23669',
    localNote: 'SUE Level A verification is especially critical for Hampton projects near Langley AFB — where utility strikes near federal infrastructure carry significant liability. We provide the documentation that protects your project.',
  },
  {
    id: 3755, city: 'Portsmouth', slug: 'portsmouth-hydrovac',
    headline: 'Hydrovac Services in Portsmouth, Virginia',
    sub: 'Hydro excavation near the Naval Shipyard, Olde Towne & across Portsmouth.',
    bodyP1: 'Portsmouth\'s Naval Shipyard, historic Olde Towne district, and aging utility infrastructure require a contractor that understands precision. Beach HydroVac\'s non-destructive hydro excavation protects Portsmouth\'s underground infrastructure while keeping your project moving.',
    bodyP2: 'From HRSD infrastructure upgrades to fiber installation in Portsmouth\'s historic corridors, our minimal-disruption approach preserves the surrounding environment while getting the job done right.',
    zips: '23701, 23702, 23703, 23704, 23705, 23707, 23708, 23709',
    localNote: 'Olde Towne Portsmouth\'s historic brick streetscapes and century-old utility infrastructure demand the most careful excavation possible. Hydrovac is the only method that lets us work safely in these sensitive urban corridors.',
  },
];

function buildContent(p) {
  return `
<!-- wp:cover {"dimRatio":70,"overlayColor":"deep-atlantic","minHeight":420,"align":"full"} -->
<div class="wp-block-cover alignfull" style="min-height:420px"><span aria-hidden="true" class="wp-block-cover__background has-deep-atlantic-background-color has-background-dim-70 has-background-dim"></span><div class="wp-block-cover__inner-container">
<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"2.75rem","fontWeight":"900","lineHeight":"1.2"}}} -->
<h1 class="wp-block-heading has-text-align-center" style="font-size:2.75rem;font-weight:900;line-height:1.2;color:#ffffff;">${p.headline}</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.1rem"},"spacing":{"margin":{"top":"1rem","bottom":"0"}}}} -->
<p class="has-text-align-center" style="font-size:1.1rem;color:#cce0f0;margin-top:1rem;">${p.sub}</p>
<!-- /wp:paragraph -->
<!-- wp:html -->
<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;margin-top:2rem;">
  <a href="tel:${PHONE_RAW}" style="display:inline-block;background:${GOLD};color:#0f2134;font-weight:700;font-size:1rem;padding:0.9rem 2rem;border-radius:9999px;text-decoration:none;">Call ${PHONE}</a>
  <a href="mailto:${EMAIL}" style="display:inline-block;background:transparent;color:#ffffff;font-weight:600;font-size:1rem;padding:0.9rem 2rem;border-radius:9999px;text-decoration:none;border:2px solid rgba(255,255,255,0.7);">Email Us</a>
</div>
<!-- /wp:html -->
</div></div><!-- /wp:cover -->

${statsBar}

<!-- wp:group {"style":{"spacing":{"padding":{"top":"3rem","bottom":"2rem"}}},"backgroundColor":"white","layout":{"type":"constrained","contentSize":"860px"}} -->
<div class="wp-block-group has-white-background-color has-background" style="padding-top:3rem;padding-bottom:2rem">
<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700","fontSize":"1.75rem"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700;font-size:1.75rem">Hydrovac Contractor Serving ${p.city}, VA</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.05rem"}}} -->
<p style="font-size:1.05rem">${p.bodyP1}</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.05rem"}}} -->
<p style="font-size:1.05rem">${p.bodyP2}</p>
<!-- /wp:paragraph -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.25rem","bottom":"1.25rem","left":"1.5rem","right":"1.5rem"}},"border":{"left":{"color":"${GOLD}","width":"4px"},"radius":"4px"}},"backgroundColor":"gray-100"} -->
<div class="wp-block-group has-gray-100-background-color has-background" style="border-left:4px solid ${GOLD};border-radius:4px;padding:1.25rem 1.5rem">
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.95rem"}}} -->
<p style="font-size:0.95rem">${p.localNote}</p>
<!-- /wp:paragraph -->
</div><!-- /wp:group -->

<!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"1.5rem"}},"typography":{"fontSize":"0.9rem"}}} -->
<p style="font-size:0.9rem;margin-top:1.5rem"><strong>Zip codes served:</strong> ${p.zips}</p>
<!-- /wp:paragraph -->
</div><!-- /wp:group -->

${servicesGrid(p.city)}

${ctaSection(p.city)}

${internalLinks}

<!-- wp:html -->
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"LocalBusiness","name":"Beach HydroVac","description":"Hydrovac and hydro excavation services in ${p.city}, VA. Potholing, slot trenching, SUE Level A verification.","telephone":"+1-757-510-5220","email":"${EMAIL}","url":"https://beachhydrovac.com","address":{"@type":"PostalAddress","addressLocality":"Virginia Beach","addressRegion":"VA","addressCountry":"US"},"areaServed":{"@type":"City","name":"${p.city}","addressRegion":"VA"},"serviceType":["Hydrovac Excavation","Potholing","Slot Trenching","SUE Level A Verification"]}
</script>
<!-- /wp:html -->`;
}

async function main() {
  console.log('='.repeat(60));
  console.log('BEACH HYDROVAC — UPDATING 6 CITY PAGES');
  console.log('  Phone: ' + PHONE + ' | Mobile: ' + MOBILE);
  console.log('  Email: ' + EMAIL + ' | Reach: 500ft+');
  console.log('='.repeat(60));

  let updated = 0;

  for (const p of pages) {
    process.stdout.write(`\n  Updating ${p.city} (ID:${p.id})...`);
    const r = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${p.id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        content: buildContent(p),
        status: 'publish'
      })
    });
    if (r.ok) {
      console.log(' ✅');
      updated++;
    } else {
      console.log(` ❌ ${r.status}: ${(await r.text()).substring(0, 80)}`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`DONE — ${updated}/6 pages updated`);
  console.log('='.repeat(60));
  console.log('\nCheck live pages:');
  pages.forEach(p => console.log(`  → https://beachhydrovac.com/${p.slug}/`));
}

main().catch(console.error);
