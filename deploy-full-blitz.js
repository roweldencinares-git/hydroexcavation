import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(`${process.env.BEACH_HYDROVAC_WP_USER}:${process.env.BEACH_HYDROVAC_WP_PASSWORD}`).toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

const PHONE = '757-510-5220';
const MOBILE = '757-633-8922';
const EMAIL = 'johnw@beachhydrovac.com';
const PHONE_RAW = '7575105220';
const NAVY = '#0f2134';
const GOLD = '#e8a020';

// ─── SHARED COMPONENTS ───────────────────────────────────────────────
const statsBar = `<!-- wp:html -->
<div style="background:${GOLD};padding:1.1rem 2rem;">
  <div style="max-width:1100px;margin:0 auto;display:flex;flex-wrap:wrap;justify-content:center;gap:1.5rem;text-align:center;">
    <span style="font-weight:700;font-size:0.9rem;color:${NAVY};">500ft+ Hose Reach</span>
    <span style="color:${NAVY};opacity:0.35;">|</span>
    <span style="font-weight:700;font-size:0.9rem;color:${NAVY};">Veteran-Owned</span>
    <span style="color:${NAVY};opacity:0.35;">|</span>
    <span style="font-weight:700;font-size:0.9rem;color:${NAVY};">SUE Level A Verified</span>
    <span style="color:${NAVY};opacity:0.35;">|</span>
    <span style="font-weight:700;font-size:0.9rem;color:${NAVY};">Fast Mobilization</span>
    <span style="color:${NAVY};opacity:0.35;">|</span>
    <span style="font-weight:700;font-size:0.9rem;color:${NAVY};">AIM Locating Partnership</span>
  </div>
</div>
<!-- /wp:html -->`;

const cta = (city) => `<!-- wp:html -->
<div style="background:linear-gradient(135deg,${NAVY} 0%,#1a4a6e 100%);padding:3rem 2rem;text-align:center;">
  <h2 style="color:#ffffff;font-size:2rem;font-weight:900;margin:0 0 0.75rem 0;">Get a Free Quote — ${city}</h2>
  <p style="color:#aacce0;font-size:1rem;margin:0 0 2rem 0;">Veteran-owned. Hampton Roads-based. Ready to mobilize fast.</p>
  <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
    <a href="tel:${PHONE_RAW}" style="background:${GOLD};color:${NAVY};font-weight:700;font-size:1rem;padding:0.9rem 2rem;border-radius:9999px;text-decoration:none;">Call ${PHONE}</a>
    <a href="tel:7576338922" style="background:transparent;color:${GOLD};font-weight:700;font-size:1rem;padding:0.9rem 2rem;border-radius:9999px;text-decoration:none;border:2px solid ${GOLD};">Mobile ${MOBILE}</a>
    <a href="mailto:${EMAIL}" style="background:transparent;color:#fff;font-weight:600;font-size:0.95rem;padding:0.9rem 2rem;border-radius:9999px;text-decoration:none;border:2px solid rgba(255,255,255,0.6);">Email Us</a>
  </div>
</div>
<!-- /wp:html -->`;

const servicesGrid = (city) => `<!-- wp:group {"style":{"spacing":{"padding":{"top":"3rem","bottom":"2rem"}}},"backgroundColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-white-background-color has-background" style="padding-top:3rem;padding-bottom:2rem">
<!-- wp:heading {"textAlign":"center","textColor":"deep-atlantic","style":{"typography":{"fontWeight":"900","fontSize":"1.75rem"}}} -->
<h2 class="wp-block-heading has-text-align-center has-deep-atlantic-color has-text-color" style="font-weight:900;font-size:1.75rem">Our Services in ${city}</h2>
<!-- /wp:heading -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"1.25rem"},"margin":{"top":"2rem"}}}} -->
<div class="wp-block-columns" style="margin-top:2rem">
<!-- wp:column {"style":{"border":{"radius":"10px","width":"1px","color":"#e2e8f0"},"spacing":{"padding":{"top":"1.75rem","right":"1.25rem","bottom":"1.75rem","left":"1.25rem"}}}} -->
<div class="wp-block-column has-border-color" style="border-radius:10px;border-color:#e2e8f0;border-width:1px;padding:1.75rem 1.25rem">
<!-- wp:heading {"level":3,"textColor":"deep-atlantic","style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} --><h3 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-size:1rem;font-weight:700">Potholing & Daylighting</h3><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.875rem"}}} --><p style="font-size:0.875rem">Expose buried utilities safely using high-pressure water. Zero risk to gas, fiber, or electric lines. Achieves SUE Level A accuracy.</p><!-- /wp:paragraph -->
</div><!-- /wp:column -->
<!-- wp:column {"style":{"border":{"radius":"10px","width":"1px","color":"#e2e8f0"},"spacing":{"padding":{"top":"1.75rem","right":"1.25rem","bottom":"1.75rem","left":"1.25rem"}}}} -->
<div class="wp-block-column has-border-color" style="border-radius:10px;border-color:#e2e8f0;border-width:1px;padding:1.75rem 1.25rem">
<!-- wp:heading {"level":3,"textColor":"deep-atlantic","style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} --><h3 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-size:1rem;font-weight:700">Slot Trenching</h3><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.875rem"}}} --><p style="font-size:0.875rem">Precise narrow trenches for fiber optic, conduit, gas, and water lines — minimal disruption, minimal restoration cost.</p><!-- /wp:paragraph -->
</div><!-- /wp:column -->
<!-- wp:column {"style":{"border":{"radius":"10px","width":"1px","color":"#e2e8f0"},"spacing":{"padding":{"top":"1.75rem","right":"1.25rem","bottom":"1.75rem","left":"1.25rem"}}}} -->
<div class="wp-block-column has-border-color" style="border-radius:10px;border-color:#e2e8f0;border-width:1px;padding:1.75rem 1.25rem">
<!-- wp:heading {"level":3,"textColor":"deep-atlantic","style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} --><h3 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-size:1rem;font-weight:700">Vacuum Excavation</h3><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.875rem"}}} --><p style="font-size:0.875rem">Industrial-grade vacuum system removes slurry safely. 500ft+ hose reach accesses tight corridors and restricted zones.</p><!-- /wp:paragraph -->
</div><!-- /wp:column -->
<!-- wp:column {"style":{"border":{"radius":"10px","width":"1px","color":"#e2e8f0"},"spacing":{"padding":{"top":"1.75rem","right":"1.25rem","bottom":"1.75rem","left":"1.25rem"}}}} -->
<div class="wp-block-column has-border-color" style="border-radius:10px;border-color:#e2e8f0;border-width:1px;padding:1.75rem 1.25rem">
<!-- wp:heading {"level":3,"textColor":"deep-atlantic","style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} --><h3 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-size:1rem;font-weight:700">SUE Level A Verification</h3><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.875rem"}}} --><p style="font-size:0.875rem">ASCE-compliant documentation. Exact 3D coordinates, depth, material type — legally defensible for engineering projects.</p><!-- /wp:paragraph -->
</div><!-- /wp:column -->
</div><!-- /wp:columns -->
</div><!-- /wp:group -->`;

const internalLinks = `<!-- wp:html -->
<div style="background:#f8fafc;padding:1.25rem 2rem;text-align:center;border-top:1px solid #e2e8f0;">
  <p style="font-size:0.85rem;color:#555;margin:0;">
    <strong>Also Serving:</strong>&nbsp;
    <a href="https://beachhydrovac.com/" style="color:${NAVY};">Virginia Beach</a> &nbsp;|&nbsp;
    <a href="https://beachhydrovac.com/norfolk-hydrovac/" style="color:${NAVY};">Norfolk</a> &nbsp;|&nbsp;
    <a href="https://beachhydrovac.com/chesapeake-hydrovac/" style="color:${NAVY};">Chesapeake</a> &nbsp;|&nbsp;
    <a href="https://beachhydrovac.com/newport-news-hydrovac/" style="color:${NAVY};">Newport News</a> &nbsp;|&nbsp;
    <a href="https://beachhydrovac.com/suffolk-hydrovac/" style="color:${NAVY};">Suffolk</a> &nbsp;|&nbsp;
    <a href="https://beachhydrovac.com/hampton-hydrovac/" style="color:${NAVY};">Hampton</a> &nbsp;|&nbsp;
    <a href="https://beachhydrovac.com/portsmouth-hydrovac/" style="color:${NAVY};">Portsmouth</a> &nbsp;|&nbsp;
    <a href="https://beachhydrovac.com/williamsburg/" style="color:${NAVY};">Williamsburg</a> &nbsp;|&nbsp;
    <a href="https://beachhydrovac.com/eastern-shore/" style="color:${NAVY};">Eastern Shore</a>
  </p>
</div>
<!-- /wp:html -->`;

const schema = (city) => `<!-- wp:html -->
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"LocalBusiness","name":"Beach HydroVac","description":"Hydrovac, vacuum excavation, and hydro excavation services in ${city}, VA. Potholing, daylighting, slot trenching, SUE Level A.","telephone":"+1-757-510-5220","email":"${EMAIL}","url":"https://beachhydrovac.com","address":{"@type":"PostalAddress","addressLocality":"Virginia Beach","addressRegion":"VA","addressCountry":"US"},"areaServed":{"@type":"City","name":"${city}","addressRegion":"VA"},"serviceType":["Hydrovac Excavation","Vacuum Excavation","Potholing","Daylighting","Slot Trenching","Non-Destructive Excavation","SUE Level A Verification"]}
</script>
<!-- /wp:html -->`;

function hero(headline, sub) {
  return `<!-- wp:cover {"dimRatio":70,"overlayColor":"deep-atlantic","minHeight":420,"align":"full"} -->
<div class="wp-block-cover alignfull" style="min-height:420px"><span aria-hidden="true" class="wp-block-cover__background has-deep-atlantic-background-color has-background-dim-70 has-background-dim"></span><div class="wp-block-cover__inner-container">
<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"2.75rem","fontWeight":"900"}}} -->
<h1 class="wp-block-heading has-text-align-center" style="font-size:2.75rem;font-weight:900;color:#ffffff;">${headline}</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center" style="color:#cce0f0;font-size:1.1rem;margin-top:1rem;">${sub}</p>
<!-- /wp:paragraph -->
<!-- wp:html -->
<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;margin-top:2rem;">
  <a href="tel:${PHONE_RAW}" style="background:${GOLD};color:${NAVY};font-weight:700;font-size:1rem;padding:0.9rem 2rem;border-radius:9999px;text-decoration:none;">Call ${PHONE}</a>
  <a href="mailto:${EMAIL}" style="background:transparent;color:#fff;font-weight:600;font-size:1rem;padding:0.9rem 2rem;border-radius:9999px;text-decoration:none;border:2px solid rgba(255,255,255,0.7);">Email Us</a>
</div>
<!-- /wp:html -->
</div></div><!-- /wp:cover -->`;
}

function body(city, p1, p2, note, zips) {
  return `<!-- wp:group {"style":{"spacing":{"padding":{"top":"3rem","bottom":"2.5rem"}}},"backgroundColor":"white","layout":{"type":"constrained","contentSize":"860px"}} -->
<div class="wp-block-group has-white-background-color has-background" style="padding-top:3rem;padding-bottom:2.5rem">
<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700","fontSize":"1.75rem"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700;font-size:1.75rem">Hydrovac & Vacuum Excavation in ${city}, VA</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.05rem"}}} --><p style="font-size:1.05rem">${p1}</p><!-- /wp:paragraph -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.05rem"}}} --><p style="font-size:1.05rem">${p2}</p><!-- /wp:paragraph -->
<!-- wp:html -->
<div style="background:#f0f7ff;border-left:4px solid ${GOLD};border-radius:4px;padding:1.25rem 1.5rem;margin:1.5rem 0;">
  <p style="margin:0;font-size:0.95rem;color:#333;">${note}</p>
</div>
<!-- /wp:html -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.875rem"}}} --><p style="font-size:0.875rem;color:#666;"><strong>Zip codes served:</strong> ${zips}</p><!-- /wp:paragraph -->
</div><!-- /wp:group -->`;
}

// ─── CITY PAGE UPDATES ───────────────────────────────────────────────
const cityPageUpdates = [
  {
    id: 3476, city: 'Williamsburg',
    headline: 'Hydrovac & Vacuum Excavation — Williamsburg, VA',
    sub: 'Non-destructive hydro excavation for Williamsburg contractors, historic districts & Colonial Parkway corridor.',
    p1: 'Williamsburg presents one of Virginia\'s most sensitive excavation environments. Between the Colonial Williamsburg historic district, William & Mary\'s campus, and the Route 60 commercial corridor, underground utility work demands absolute precision. One utility strike in a historic zone can mean massive fines, project shutdowns, and irreversible damage.',
    p2: 'Beach HydroVac\'s non-destructive hydro excavation and vacuum excavation services protect Williamsburg\'s underground infrastructure during construction, renovation, and utility installation. Our <strong>500ft+ hose reach</strong> is especially critical near historic structures where trucks cannot access.',
    note: 'Williamsburg\'s historic district utilities are often unmapped or recorded on decades-old drawings. Our "Map First, Dig Second" workflow with AIM Locating verifies exact utility location before any excavation — protecting both your project and the historic environment.',
    zips: '23185, 23186, 23187, 23188, 23690, 23692, 23693, 23696',
    focuskw: 'hydrovac williamsburg virginia',
    yoast_title: 'Hydrovac & Vacuum Excavation Williamsburg VA | Beach HydroVac',
    yoast_desc: 'Non-destructive hydrovac and vacuum excavation in Williamsburg, VA. Historic district safe. Potholing, slot trenching, SUE Level A. Veteran-owned. Call 757-510-5220.'
  },
  {
    id: 3671, city: 'Eastern Shore',
    headline: 'Hydrovac & Vacuum Excavation — Eastern Shore, VA',
    sub: 'Serving Accomack & Northampton Counties. Non-destructive hydro excavation across the Delmarva Peninsula.',
    p1: 'The Eastern Shore of Virginia — spanning Accomack and Northampton Counties along the Delmarva Peninsula — is one of the most underserved hydrovac markets in the region. With agricultural development, coastal infrastructure projects, and Route 13 corridor expansion, the need for safe non-destructive excavation is growing rapidly.',
    p2: 'Beach HydroVac mobilizes to the Eastern Shore for potholing, daylighting, slot trenching, and vacuum excavation projects. Whether you\'re in Chincoteague, Onancock, Cape Charles, or Exmore, our team brings Hampton Roads\' most specialized hydrovac equipment to your site.',
    note: 'Eastern Shore utility infrastructure is often older and poorly documented. Our partnership with AIM Locating for ground-penetrating radar and electromagnetic locating before any potholing ensures we find what\'s really down there — not just what the records say.',
    zips: '23301, 23302, 23306, 23308, 23310, 23313, 23316, 23336, 23337, 23347, 23350, 23354, 23356, 23357, 23359, 23389, 23395, 23396, 23401, 23405, 23408, 23410, 23414, 23415, 23417, 23418, 23420, 23421, 23422, 23423, 23426, 23427, 23480, 23486',
    focuskw: 'hydrovac eastern shore virginia',
    yoast_title: 'Hydrovac Eastern Shore VA | Vacuum Excavation Accomack Northampton | Beach HydroVac',
    yoast_desc: 'Hydrovac and vacuum excavation services on Virginia\'s Eastern Shore. Serving Accomack & Northampton Counties. Potholing, daylighting, slot trenching. Call 757-510-5220.'
  }
];

// ─── BLOG POSTS ──────────────────────────────────────────────────────
function faqSchema(faqs) {
  return `<!-- wp:html -->
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[${faqs.map(f => `{"@type":"Question","name":${JSON.stringify(f.q)},"acceptedAnswer":{"@type":"Answer","text":${JSON.stringify(f.a)}}}`).join(',')}]}
</script>
<!-- /wp:html -->`;
}

const blogPosts = [
  // ── Virginia Beach ──
  {
    slug: 'vacuum-excavation-virginia-beach',
    title: 'Vacuum Excavation Virginia Beach VA | Non-Destructive Digging',
    focuskw: 'vacuum excavation virginia beach',
    yoast_title: 'Vacuum Excavation Virginia Beach VA | Beach HydroVac',
    yoast_desc: 'Professional vacuum excavation in Virginia Beach, VA. Non-destructive hydrovac digging for utility exposure, slot trenching & SUE Level A. Call 757-510-5220.',
    content: `<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.125rem"}}} -->
<p style="font-size:1.125rem">When contractors in Virginia Beach need to dig safely near underground utilities, <strong>vacuum excavation</strong> — also called hydrovac or hydro excavation — is the method that eliminates risk. Beach HydroVac is Virginia Beach's veteran-owned vacuum excavation specialist.</p>
<!-- /wp:paragraph -->

<!-- wp:heading --><h2 class="wp-block-heading">What is Vacuum Excavation?</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>Vacuum excavation uses high-pressure water to break up soil, combined with an industrial vacuum system to remove the resulting slurry into a debris tank. Unlike mechanical excavation with backhoes or trenchers, vacuum excavation is <strong>non-destructive</strong> — it cannot damage gas lines, fiber optic cables, water mains, or electrical conduits.</p><!-- /wp:paragraph -->

<!-- wp:heading --><h2 class="wp-block-heading">Why Virginia Beach Contractors Use Vacuum Excavation</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>Virginia Beach's underground utility network is one of the most complex in Hampton Roads. Decades of coastal development have layered utilities on top of each other, with many installations predating modern mapping standards. Vacuum excavation is the only method that lets you dig with confidence when the exact location of buried lines is uncertain.</p><!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Zero utility strikes</strong> — water cannot damage buried infrastructure</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>SUE Level A accuracy</strong> — exact depth, location, material recorded</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>500ft+ hose reach</strong> — access tight residential and commercial spaces</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Minimal restoration</strong> — surgical removal means less backfill, faster completion</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->

<!-- wp:heading --><h2 class="wp-block-heading">Vacuum Excavation Applications in Virginia Beach</h2><!-- /wp:heading -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Potholing & daylighting</strong> — exposing utilities for verification before construction</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Slot trenching</strong> — fiber optic, conduit, and water line installation</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Remote excavation</strong> — reaching restricted areas with 500ft+ hose</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>SUE Level A verification</strong> — ASCE-compliant documentation for engineering</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->

<!-- wp:heading --><h2 class="wp-block-heading">Serving All Virginia Beach Zip Codes</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>23451, 23452, 23453, 23454, 23455, 23456, 23457, 23459, 23460, 23461, 23462, 23464, 23466, 23467, 23479</p><!-- /wp:paragraph -->

${faqSchema([
  {q:'What is vacuum excavation?',a:'Vacuum excavation uses high-pressure water to break up soil and an industrial vacuum to remove it. It\'s non-destructive — safe to use around gas lines, fiber optic cables, and all buried utilities.'},
  {q:'How much does vacuum excavation cost in Virginia Beach?',a:'Vacuum excavation in Virginia Beach typically runs $200-$400/hour or $300-$800 per pothole. Day rates offer better value for larger projects. Contact Beach HydroVac at 757-510-5220 for a free quote.'},
  {q:'Is vacuum excavation the same as hydrovac?',a:'Yes. Vacuum excavation, hydrovac, and hydro excavation all refer to the same non-destructive digging method using water and vacuum.'}
])}

<!-- wp:html -->
<div style="background:linear-gradient(135deg,${NAVY},#1a4a6e);padding:2.5rem 2rem;text-align:center;border-radius:8px;margin-top:2rem;">
  <h3 style="color:#fff;font-size:1.5rem;font-weight:900;margin:0 0 0.75rem 0;">Need Vacuum Excavation in Virginia Beach?</h3>
  <p style="color:#aacce0;margin:0 0 1.5rem 0;">Veteran-owned. Based in Virginia Beach. Ready to mobilize fast.</p>
  <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
    <a href="tel:${PHONE_RAW}" style="background:${GOLD};color:${NAVY};font-weight:700;padding:0.875rem 2rem;border-radius:9999px;text-decoration:none;">Call ${PHONE}</a>
    <a href="mailto:${EMAIL}" style="background:transparent;color:#fff;font-weight:600;padding:0.875rem 2rem;border-radius:9999px;text-decoration:none;border:2px solid rgba(255,255,255,0.6);">Email Us</a>
  </div>
</div>
<!-- /wp:html -->`
  },

  // ── Norfolk ──
  {
    slug: 'non-destructive-excavation-norfolk-va',
    title: 'Non-Destructive Excavation Norfolk VA | Hydrovac Services',
    focuskw: 'non-destructive excavation norfolk virginia',
    yoast_title: 'Non-Destructive Excavation Norfolk VA | Hydrovac | Beach HydroVac',
    yoast_desc: 'Non-destructive hydrovac excavation in Norfolk, VA. Safe utility exposure near Naval Station Norfolk, ODU, and downtown. Veteran-owned. Call 757-510-5220.',
    content: `<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.125rem"}}} -->
<p style="font-size:1.125rem">Norfolk's dense utility corridors — from downtown to Naval Station Norfolk — make <strong>non-destructive excavation</strong> not just preferable, but essential. Beach HydroVac provides Norfolk contractors with hydrovac and vacuum excavation services that eliminate utility strike risk entirely.</p>
<!-- /wp:paragraph -->

<!-- wp:heading --><h2 class="wp-block-heading">Why Non-Destructive Excavation Matters in Norfolk</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>Norfolk is one of Virginia's oldest cities with some of the most layered underground infrastructure in the state. Utility strikes near Naval Station Norfolk, the port, or downtown Norfolk carry outsized consequences — project shutdowns, fines, and liability that can end a project. Non-destructive hydrovac excavation is the only method that guarantees safe digging in these environments.</p><!-- /wp:paragraph -->

<!-- wp:heading --><h2 class="wp-block-heading">Services for Norfolk Contractors</h2><!-- /wp:heading -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Non-destructive potholing</strong> — expose utilities without mechanical tools</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Daylighting</strong> — bring buried lines to surface visibility safely</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Vacuum excavation</strong> — industrial-grade removal with 500ft+ reach</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Slot trenching</strong> — fiber optic and conduit in Norfolk's dense corridors</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>SUE Level A documentation</strong> — required for government and DOD-adjacent projects</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->

<!-- wp:heading --><h2 class="wp-block-heading">Norfolk Zip Codes Served</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>23501, 23502, 23503, 23504, 23505, 23507, 23508, 23509, 23510, 23511, 23513, 23517, 23518, 23523</p><!-- /wp:paragraph -->

${faqSchema([
  {q:'What is non-destructive excavation?',a:'Non-destructive excavation uses high-pressure water and vacuum — not mechanical tools — to dig. It cannot damage buried utilities, making it the safest method for excavation near gas lines, fiber, and electrical conduit.'},
  {q:'Do you serve all of Norfolk VA?',a:'Yes. Beach HydroVac serves all Norfolk zip codes including downtown, Naval Station Norfolk adjacent areas, ODU, Ghent, and Ocean View. Call 757-510-5220 for Norfolk availability.'},
  {q:'How fast can you mobilize to Norfolk?',a:'Beach HydroVac is based in Virginia Beach — we typically mobilize to Norfolk job sites same-day or next-day depending on scheduling.'}
])}

<!-- wp:html -->
<div style="background:linear-gradient(135deg,${NAVY},#1a4a6e);padding:2.5rem 2rem;text-align:center;border-radius:8px;margin-top:2rem;">
  <h3 style="color:#fff;font-size:1.5rem;font-weight:900;margin:0 0 0.75rem 0;">Norfolk Non-Destructive Excavation Quote</h3>
  <p style="color:#aacce0;margin:0 0 1.5rem 0;">Veteran-owned. Fast mobilization from Virginia Beach to Norfolk.</p>
  <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
    <a href="tel:${PHONE_RAW}" style="background:${GOLD};color:${NAVY};font-weight:700;padding:0.875rem 2rem;border-radius:9999px;text-decoration:none;">Call ${PHONE}</a>
    <a href="https://beachhydrovac.com/norfolk-hydrovac/" style="background:transparent;color:#fff;font-weight:600;padding:0.875rem 2rem;border-radius:9999px;text-decoration:none;border:2px solid rgba(255,255,255,0.6);">View Norfolk Services</a>
  </div>
</div>
<!-- /wp:html -->`
  },

  // ── Suffolk ──
  {
    slug: 'hydro-excavation-suffolk-va',
    title: 'Hydro Excavation Suffolk VA | Vacuum Excavation Contractor',
    focuskw: 'hydro excavation suffolk virginia',
    yoast_title: 'Hydro Excavation Suffolk VA | Vacuum Excavation | Beach HydroVac',
    yoast_desc: 'Hydro excavation and vacuum excavation services in Suffolk, VA. Potholing, slot trenching for new development along Route 58 & Harbour View. Call 757-510-5220.',
    content: `<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.125rem"}}} -->
<p style="font-size:1.125rem">Suffolk is one of Virginia's fastest-growing cities, and with rapid development comes rapidly expanding underground utility networks. Beach HydroVac provides <strong>hydro excavation and vacuum excavation</strong> services throughout Suffolk — the only non-destructive method for safely digging near buried utilities.</p>
<!-- /wp:paragraph -->

<!-- wp:heading --><h2 class="wp-block-heading">Why Suffolk Needs Hydro Excavation Right Now</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>As Suffolk's Harbour View development expands, Route 58 corridor builds out, and new residential subdivisions go in across North Suffolk, underground utility conflicts are becoming more common. New construction areas often have unmarked or poorly documented utilities laid during rapid development — exactly the scenario where hydro excavation prevents costly, dangerous strikes.</p><!-- /wp:paragraph -->

<!-- wp:heading --><h2 class="wp-block-heading">Hydro Excavation Services in Suffolk</h2><!-- /wp:heading -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Potholing</strong> — verify utility location before breaking ground on new Suffolk developments</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Daylighting</strong> — expose buried lines for accurate engineering documentation</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Vacuum excavation</strong> — safe soil removal with 500ft+ reach for large Suffolk lots</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Slot trenching</strong> — fiber optic and conduit installation in new Suffolk corridors</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>SUE Level A</strong> — engineering documentation for city and county infrastructure projects</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->

<!-- wp:heading --><h2 class="wp-block-heading">Areas We Serve in Suffolk</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>Harbour View, North Suffolk, Downtown Suffolk, Nansemond Parkway corridor, Route 58 commercial zone, Driver area, Whaleyville. Zip codes: 23432, 23433, 23434, 23435, 23436, 23437, 23438, 23439.</p><!-- /wp:paragraph -->

${faqSchema([
  {q:'Is there a hydro excavation contractor in Suffolk VA?',a:'Yes. Beach HydroVac serves all of Suffolk VA for hydro excavation, potholing, vacuum excavation, and slot trenching. Call 757-510-5220 for a free quote.'},
  {q:'How does hydro excavation help new construction in Suffolk?',a:'New construction areas often have recently installed utilities that may not be fully mapped. Hydro excavation safely exposes what\'s underground before mechanical digging begins, preventing costly utility strikes.'},
  {q:'What areas of Suffolk do you serve?',a:'We serve all of Suffolk including Harbour View, North Suffolk, downtown Suffolk, and the Route 58 corridor. Zip codes 23432-23439.'}
])}

<!-- wp:html -->
<div style="background:linear-gradient(135deg,${NAVY},#1a4a6e);padding:2.5rem 2rem;text-align:center;border-radius:8px;margin-top:2rem;">
  <h3 style="color:#fff;font-size:1.5rem;font-weight:900;margin:0 0 0.75rem 0;">Free Quote for Suffolk Hydro Excavation</h3>
  <p style="color:#aacce0;margin:0 0 1.5rem 0;">Veteran-owned. Fast mobilization across Hampton Roads.</p>
  <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
    <a href="tel:${PHONE_RAW}" style="background:${GOLD};color:${NAVY};font-weight:700;padding:0.875rem 2rem;border-radius:9999px;text-decoration:none;">Call ${PHONE}</a>
    <a href="https://beachhydrovac.com/suffolk-hydrovac/" style="background:transparent;color:#fff;font-weight:600;padding:0.875rem 2rem;border-radius:9999px;text-decoration:none;border:2px solid rgba(255,255,255,0.6);">View Suffolk Services</a>
  </div>
</div>
<!-- /wp:html -->`
  },

  // ── Portsmouth ──
  {
    slug: 'slot-trenching-portsmouth-va',
    title: 'Slot Trenching & Hydrovac Portsmouth VA | Beach HydroVac',
    focuskw: 'slot trenching portsmouth virginia',
    yoast_title: 'Slot Trenching Portsmouth VA | Hydrovac Contractor | Beach HydroVac',
    yoast_desc: 'Slot trenching and hydrovac services in Portsmouth, VA. Non-destructive trenching near Naval Shipyard, Olde Towne & beyond. Veteran-owned. Call 757-510-5220.',
    content: `<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.125rem"}}} -->
<p style="font-size:1.125rem"><strong>Slot trenching</strong> in Portsmouth, VA requires a precision approach — especially near the Naval Shipyard, Olde Towne's historic streets, and the dense utility corridors along High Street and County Street. Beach HydroVac's hydrovac slot trenching protects Portsmouth's underground infrastructure while getting your project done right.</p>
<!-- /wp:paragraph -->

<!-- wp:heading --><h2 class="wp-block-heading">What is Slot Trenching?</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>Slot trenching is a hydrovac technique that creates narrow, precise trenches — typically 4 to 12 inches wide — using high-pressure water and vacuum. It's used for installing fiber optic cable, electrical conduit, gas lines, and water service connections without the wide disruption of traditional mechanical trenching.</p><!-- /wp:paragraph -->

<!-- wp:heading --><h2 class="wp-block-heading">Why Portsmouth Projects Need Hydrovac Slot Trenching</h2><!-- /wp:heading -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Olde Towne historic district</strong> — minimal surface disruption preserves brick streets and historic surroundings</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Naval Shipyard adjacent areas</strong> — SUE Level A documentation and strict utility safety protocols</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>HRSD infrastructure</strong> — precise trenching for water and sewer upgrades</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Telecom installation</strong> — fiber optic runs through Portsmouth's aging corridors</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->

<!-- wp:heading --><h2 class="wp-block-heading">Portsmouth Zip Codes Served</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>23701, 23702, 23703, 23704, 23705, 23707, 23708, 23709</p><!-- /wp:paragraph -->

${faqSchema([
  {q:'What is hydrovac slot trenching?',a:'Hydrovac slot trenching creates narrow, precise trenches using high-pressure water and vacuum excavation. It causes minimal surface disruption and is ideal for fiber optic, conduit, gas, and water line installation.'},
  {q:'Do you do slot trenching in Portsmouth VA?',a:'Yes. Beach HydroVac provides slot trenching throughout Portsmouth including Olde Towne, the Naval Shipyard corridor, and all Portsmouth zip codes. Call 757-510-5220.'},
  {q:'How narrow can slot trenches be?',a:'Hydrovac slot trenches can be as narrow as 4 inches wide, which is far narrower than any mechanical trencher can achieve. This minimizes surface damage and restoration cost.'}
])}

<!-- wp:html -->
<div style="background:linear-gradient(135deg,${NAVY},#1a4a6e);padding:2.5rem 2rem;text-align:center;border-radius:8px;margin-top:2rem;">
  <h3 style="color:#fff;font-size:1.5rem;font-weight:900;margin:0 0 0.75rem 0;">Portsmouth Slot Trenching Quote</h3>
  <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;margin-top:1.5rem;">
    <a href="tel:${PHONE_RAW}" style="background:${GOLD};color:${NAVY};font-weight:700;padding:0.875rem 2rem;border-radius:9999px;text-decoration:none;">Call ${PHONE}</a>
    <a href="https://beachhydrovac.com/portsmouth-hydrovac/" style="background:transparent;color:#fff;font-weight:600;padding:0.875rem 2rem;border-radius:9999px;text-decoration:none;border:2px solid rgba(255,255,255,0.6);">Portsmouth Services</a>
  </div>
</div>
<!-- /wp:html -->`
  },

  // ── Chesapeake ──
  {
    slug: 'vacuum-excavation-chesapeake-va',
    title: 'Vacuum Excavation Chesapeake VA | Non-Destructive Hydrovac',
    focuskw: 'vacuum excavation chesapeake virginia',
    yoast_title: 'Vacuum Excavation Chesapeake VA | Hydrovac Contractor | Beach HydroVac',
    yoast_desc: 'Vacuum excavation in Chesapeake, VA. Non-destructive hydrovac for Battlefield Blvd, Greenbrier & new development. Veteran-owned. Call 757-510-5220.',
    content: `<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.125rem"}}} -->
<p style="font-size:1.125rem">Chesapeake's rapid commercial and residential growth makes <strong>vacuum excavation</strong> one of the most in-demand services in Hampton Roads. Beach HydroVac serves Chesapeake contractors with non-destructive hydrovac excavation — the safest way to dig near underground utilities in Virginia's largest city by land area.</p>
<!-- /wp:paragraph -->

<!-- wp:heading --><h2 class="wp-block-heading">Vacuum Excavation for Chesapeake's Growth Corridors</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>From Battlefield Boulevard's commercial strip to Indian River Road's residential expansion to the Greenbrier district's continued build-out, Chesapeake is installing thousands of feet of new utility infrastructure annually. Vacuum excavation ensures that new installations don't strike existing buried infrastructure — and that existing utilities are exposed safely when repairs or upgrades are needed.</p><!-- /wp:paragraph -->

<!-- wp:heading --><h2 class="wp-block-heading">Vacuum Excavation Applications in Chesapeake</h2><!-- /wp:heading -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Pre-construction potholing</strong> — verify utilities before new Chesapeake development breaks ground</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Fiber optic slot trenching</strong> — precision installation in Chesapeake's expanding telecom network</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Gas line daylighting</strong> — expose and document gas infrastructure safely</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Residential remote excavation</strong> — 500ft+ hose reach for suburban lots with limited truck access</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->

<!-- wp:heading --><h2 class="wp-block-heading">Chesapeake Areas Served</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>Greenbrier, Battlefield Blvd corridor, Deep Creek, Great Bridge, Indian River, South Norfolk, Hickory, Western Branch. Zip codes: 23320, 23321, 23322, 23323, 23324, 23325.</p><!-- /wp:paragraph -->

${faqSchema([
  {q:'Is Beach HydroVac the best vacuum excavation company in Chesapeake VA?',a:'Beach HydroVac is Chesapeake\'s veteran-owned local hydrovac specialist, partnered with AIM Locating for complete "Map First, Dig Second" utility safety. Call 757-510-5220 for a free quote.'},
  {q:'How does vacuum excavation work?',a:'Vacuum excavation uses high-pressure water to break up soil and an industrial vacuum to remove the slurry. The result is precise, non-destructive digging that\'s safe around all buried utilities.'},
  {q:'Can you do vacuum excavation in residential areas in Chesapeake?',a:'Absolutely. Our 500ft+ hose reach means the truck doesn\'t need to be right next to the dig site. We regularly work in Chesapeake residential neighborhoods with limited access.'}
])}

<!-- wp:html -->
<div style="background:linear-gradient(135deg,${NAVY},#1a4a6e);padding:2.5rem 2rem;text-align:center;border-radius:8px;margin-top:2rem;">
  <h3 style="color:#fff;font-size:1.5rem;font-weight:900;margin:0 0 0.75rem 0;">Chesapeake Vacuum Excavation Quote</h3>
  <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;margin-top:1.5rem;">
    <a href="tel:${PHONE_RAW}" style="background:${GOLD};color:${NAVY};font-weight:700;padding:0.875rem 2rem;border-radius:9999px;text-decoration:none;">Call ${PHONE}</a>
    <a href="https://beachhydrovac.com/chesapeake-hydrovac/" style="background:transparent;color:#fff;font-weight:600;padding:0.875rem 2rem;border-radius:9999px;text-decoration:none;border:2px solid rgba(255,255,255,0.6);">Chesapeake Services</a>
  </div>
</div>
<!-- /wp:html -->`
  },

  // ── Hampton ──
  {
    slug: 'daylighting-services-hampton-va',
    title: 'Daylighting Services Hampton VA | Hydrovac Contractor',
    focuskw: 'daylighting services hampton virginia',
    yoast_title: 'Daylighting Services Hampton VA | Hydrovac | Beach HydroVac',
    yoast_desc: 'Professional daylighting and hydrovac services in Hampton, VA. Near Langley AFB, NASA Langley & downtown Hampton. Veteran-owned. Call 757-510-5220.',
    content: `<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.125rem"}}} -->
<p style="font-size:1.125rem"><strong>Daylighting</strong> — the process of safely exposing buried utilities to daylight using hydrovac equipment — is critical for Hampton contractors working near Langley AFB, NASA Langley Research Center, and the city's dense residential and commercial infrastructure.</p>
<!-- /wp:paragraph -->

<!-- wp:heading --><h2 class="wp-block-heading">What is Daylighting?</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>Daylighting (also called potholing) uses high-pressure water to excavate soil around a buried utility until it is physically visible — "brought to daylight." This allows engineers and contractors to record the exact location, depth, material type, and condition of underground infrastructure. It achieves <strong>SUE Level A</strong> — the highest ASCE standard for utility documentation.</p><!-- /wp:paragraph -->

<!-- wp:heading --><h2 class="wp-block-heading">Why Hampton Projects Require Daylighting</h2><!-- /wp:heading -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Langley AFB projects</strong> — SUE Level A documentation required for federal projects</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>NASA Langley Research Center</strong> — utility strikes near research facilities carry massive liability</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Hampton downtown corridor</strong> — historic utility corridors along Mercury Blvd and Settlers Landing</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Peninsula infrastructure</strong> — aging utility maps require physical verification before any major dig</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->

<!-- wp:heading --><h2 class="wp-block-heading">Hampton Zip Codes Served</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>23661, 23662, 23663, 23664, 23665, 23666, 23667, 23668, 23669</p><!-- /wp:paragraph -->

${faqSchema([
  {q:'What is daylighting in excavation?',a:'Daylighting is the process of using hydrovac equipment to safely expose a buried utility until it is physically visible. It achieves SUE Level A — the highest accuracy standard for utility documentation under ASCE 38.'},
  {q:'Do you provide daylighting services in Hampton VA?',a:'Yes. Beach HydroVac serves all of Hampton VA for daylighting, potholing, and hydrovac services. Call 757-510-5220.'},
  {q:'Is daylighting required near Langley AFB?',a:'SUE Level A verification through daylighting is typically required or strongly recommended for projects on or adjacent to federal facilities. Beach HydroVac provides full ASCE-compliant documentation.'}
])}

<!-- wp:html -->
<div style="background:linear-gradient(135deg,${NAVY},#1a4a6e);padding:2.5rem 2rem;text-align:center;border-radius:8px;margin-top:2rem;">
  <h3 style="color:#fff;font-size:1.5rem;font-weight:900;margin:0 0 0.75rem 0;">Hampton Daylighting Services Quote</h3>
  <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;margin-top:1.5rem;">
    <a href="tel:${PHONE_RAW}" style="background:${GOLD};color:${NAVY};font-weight:700;padding:0.875rem 2rem;border-radius:9999px;text-decoration:none;">Call ${PHONE}</a>
    <a href="https://beachhydrovac.com/hampton-hydrovac/" style="background:transparent;color:#fff;font-weight:600;padding:0.875rem 2rem;border-radius:9999px;text-decoration:none;border:2px solid rgba(255,255,255,0.6);">Hampton Services</a>
  </div>
</div>
<!-- /wp:html -->`
  },

  // ── Newport News ──
  {
    slug: 'potholing-contractor-newport-news-va',
    title: 'Potholing Contractor Newport News VA | Hydrovac Services',
    focuskw: 'potholing contractor newport news virginia',
    yoast_title: 'Potholing Contractor Newport News VA | Beach HydroVac',
    yoast_desc: 'Professional potholing and hydrovac services in Newport News, VA. SUE Level A verification near shipyard & beyond. Veteran-owned. Call 757-510-5220.',
    content: `<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.125rem"}}} -->
<p style="font-size:1.125rem">Newport News contractors working near the shipyard, industrial waterfront, or dense residential corridors need a <strong>potholing contractor</strong> who understands the stakes. Beach HydroVac provides Newport News with professional potholing, daylighting, and hydrovac services backed by SUE Level A documentation.</p>
<!-- /wp:paragraph -->

<!-- wp:heading --><h2 class="wp-block-heading">What is Potholing?</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>Potholing is a hydrovac technique that safely exposes underground utilities by excavating a small, precise hole using high-pressure water and vacuum. It's the primary method for achieving <strong>SUE Level A verification</strong> — confirming the exact location, depth, size, and material of buried utilities before construction begins.</p><!-- /wp:paragraph -->

<!-- wp:heading --><h2 class="wp-block-heading">Potholing Applications in Newport News</h2><!-- /wp:heading -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Pre-construction utility verification</strong> — confirm what's underground before heavy equipment moves in</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Federal/government project compliance</strong> — SUE Level A required for DOD-adjacent work</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Shipyard-area utility clearance</strong> — 500ft+ hose reach for restricted access zones</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Engineering documentation</strong> — ASCE-compliant data integrated into CAD drawings</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->

<!-- wp:heading --><h2 class="wp-block-heading">Newport News Zip Codes Served</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>23601, 23602, 23603, 23604, 23605, 23606, 23607, 23608</p><!-- /wp:paragraph -->

${faqSchema([
  {q:'What does a potholing contractor do?',a:'A potholing contractor uses hydrovac equipment (high-pressure water + vacuum) to safely expose buried utilities at specific test locations. The exposed utility is then measured and documented to achieve SUE Level A accuracy.'},
  {q:'Is there a potholing contractor in Newport News VA?',a:'Yes. Beach HydroVac provides potholing and hydrovac services throughout Newport News. Call 757-510-5220 for a free quote.'},
  {q:'How long does potholing take in Newport News?',a:'Most potholing projects complete individual test holes in 20-60 minutes depending on depth, soil conditions, and access. Large multi-hole programs are quoted by the day.'}
])}

<!-- wp:html -->
<div style="background:linear-gradient(135deg,${NAVY},#1a4a6e);padding:2.5rem 2rem;text-align:center;border-radius:8px;margin-top:2rem;">
  <h3 style="color:#fff;font-size:1.5rem;font-weight:900;margin:0 0 0.75rem 0;">Newport News Potholing Quote</h3>
  <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;margin-top:1.5rem;">
    <a href="tel:${PHONE_RAW}" style="background:${GOLD};color:${NAVY};font-weight:700;padding:0.875rem 2rem;border-radius:9999px;text-decoration:none;">Call ${PHONE}</a>
    <a href="https://beachhydrovac.com/newport-news-hydrovac/" style="background:transparent;color:#fff;font-weight:600;padding:0.875rem 2rem;border-radius:9999px;text-decoration:none;border:2px solid rgba(255,255,255,0.6);">Newport News Services</a>
  </div>
</div>
<!-- /wp:html -->`
  },

  // ── Williamsburg ──
  {
    slug: 'hydrovac-williamsburg-va',
    title: 'Hydrovac Williamsburg VA | Vacuum Excavation Colonial Area',
    focuskw: 'hydrovac williamsburg virginia',
    yoast_title: 'Hydrovac Williamsburg VA | Vacuum Excavation | Beach HydroVac',
    yoast_desc: 'Hydrovac and vacuum excavation in Williamsburg, VA. Safe non-destructive digging near Colonial Williamsburg, W&M & Route 60 corridor. Call 757-510-5220.',
    content: `<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.125rem"}}} -->
<p style="font-size:1.125rem">Williamsburg's unique combination of historic preservation requirements and active modern development makes <strong>hydrovac</strong> the only sensible excavation method for utility work across the city. Beach HydroVac serves Williamsburg contractors with precision vacuum excavation that's safe for historic environments and compliant with engineering standards.</p>
<!-- /wp:paragraph -->

<!-- wp:heading --><h2 class="wp-block-heading">Hydrovac in Williamsburg's Unique Environment</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>Few Virginia cities present the excavation challenges that Williamsburg does. Colonial Williamsburg's underground infrastructure is a mix of modern utilities threaded through historically sensitive soil — where a misplaced mechanical excavator could uncover archaeological artifacts, damage preservation zones, or strike unmapped utilities installed during the 20th century build-out.</p><!-- /wp:paragraph -->
<!-- wp:paragraph --><p>Beach HydroVac's non-destructive hydrovac approach uses water — not steel — to remove soil. Combined with our AIM Locating partnership for ground-penetrating radar scanning, we know what's underground before we dig.</p><!-- /wp:paragraph -->

<!-- wp:heading --><h2 class="wp-block-heading">Services in the Williamsburg Area</h2><!-- /wp:heading -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Potholing & daylighting</strong> — safe utility exposure in historic and sensitive areas</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Vacuum excavation</strong> — 500ft+ reach keeps trucks away from sensitive sites</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Slot trenching</strong> — fiber and conduit on the Route 60 and Monticello Ave corridors</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>SUE Level A</strong> — documentation for W&M campus, city of Williamsburg, and VDOT projects</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->

<!-- wp:heading --><h2 class="wp-block-heading">Williamsburg Zip Codes Served</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>23185, 23186, 23187, 23188, 23690, 23692, 23693, 23696</p><!-- /wp:paragraph -->

${faqSchema([
  {q:'Can you do hydrovac excavation near Colonial Williamsburg?',a:'Yes. Beach HydroVac\'s non-destructive method is ideal for historically sensitive areas. We use water — not mechanical tools — and our 500ft+ hose reach keeps trucks at a safe distance from sensitive structures.'},
  {q:'Is there a hydrovac contractor near Williamsburg VA?',a:'Beach HydroVac serves Williamsburg from our Virginia Beach base. Typical mobilization to Williamsburg is same-day or next-day. Call 757-510-5220.'},
  {q:'Do you do hydrovac at William & Mary campus?',a:'Yes. We serve university campus environments including William & Mary. SUE Level A documentation is available for campus infrastructure projects.'}
])}

<!-- wp:html -->
<div style="background:linear-gradient(135deg,${NAVY},#1a4a6e);padding:2.5rem 2rem;text-align:center;border-radius:8px;margin-top:2rem;">
  <h3 style="color:#fff;font-size:1.5rem;font-weight:900;margin:0 0 0.75rem 0;">Williamsburg Hydrovac Quote</h3>
  <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;margin-top:1.5rem;">
    <a href="tel:${PHONE_RAW}" style="background:${GOLD};color:${NAVY};font-weight:700;padding:0.875rem 2rem;border-radius:9999px;text-decoration:none;">Call ${PHONE}</a>
    <a href="https://beachhydrovac.com/williamsburg/" style="background:transparent;color:#fff;font-weight:600;padding:0.875rem 2rem;border-radius:9999px;text-decoration:none;border:2px solid rgba(255,255,255,0.6);">Williamsburg Page</a>
  </div>
</div>
<!-- /wp:html -->`
  },

  // ── Eastern Shore ──
  {
    slug: 'hydro-excavation-eastern-shore-virginia',
    title: 'Hydro Excavation Eastern Shore Virginia | Beach HydroVac',
    focuskw: 'hydro excavation eastern shore virginia',
    yoast_title: 'Hydro Excavation Eastern Shore VA | Vacuum Excavation | Beach HydroVac',
    yoast_desc: 'Hydro excavation and vacuum excavation on Virginia\'s Eastern Shore. Serving Accomack & Northampton Counties — Chincoteague, Cape Charles, Onancock. Call 757-510-5220.',
    content: `<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.125rem"}}} -->
<p style="font-size:1.125rem">Virginia's Eastern Shore — spanning Accomack and Northampton Counties along the Delmarva Peninsula — has long been underserved for <strong>hydro excavation and vacuum excavation</strong> services. Beach HydroVac is one of the few Hampton Roads-based operators willing and equipped to mobilize across the Chesapeake Bay Bridge-Tunnel to serve Eastern Shore projects.</p>
<!-- /wp:paragraph -->

<!-- wp:heading --><h2 class="wp-block-heading">Hydro Excavation on Virginia's Eastern Shore</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>The Eastern Shore presents unique utility challenges. Infrastructure along Route 13 supports agricultural operations, coastal communities, and growing residential development. Utility maps in many Eastern Shore communities are decades old — making physical verification through potholing and daylighting essential before any significant excavation.</p><!-- /wp:paragraph -->

<!-- wp:heading --><h2 class="wp-block-heading">Communities We Serve on the Eastern Shore</h2><!-- /wp:heading -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Chincoteague</strong> — coastal utility work on Assateague Island corridor</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Cape Charles</strong> — historic downtown and new development along the bay</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Onancock & Accomac</strong> — Route 13 corridor utility projects</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Exmore & Nassawadox</strong> — agricultural and commercial infrastructure</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Parksley & Tasley</strong> — inland Accomack County development</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->

<!-- wp:heading --><h2 class="wp-block-heading">Services Available on the Eastern Shore</h2><!-- /wp:heading -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Potholing & daylighting</strong> — verify aging utility infrastructure before construction</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Vacuum excavation</strong> — safe soil removal in coastal and agricultural environments</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Slot trenching</strong> — fiber and conduit along Route 13 expansion zones</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>SUE Level A</strong> — documentation for VDOT and county infrastructure projects</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->

${faqSchema([
  {q:'Do you provide hydro excavation on Virginia\'s Eastern Shore?',a:'Yes. Beach HydroVac mobilizes to the Eastern Shore for potholing, vacuum excavation, and slot trenching projects in Accomack and Northampton Counties. Call 757-510-5220.'},
  {q:'How do you get equipment to the Eastern Shore?',a:'We cross via the Chesapeake Bay Bridge-Tunnel. Mobilization costs apply but are often cost-effective for projects requiring specialized non-destructive excavation not available locally on the Eastern Shore.'},
  {q:'What cities on the Eastern Shore do you serve?',a:'We serve Chincoteague, Onancock, Cape Charles, Exmore, Nassawadox, Accomac, Parksley, and all communities in Accomack and Northampton Counties.'}
])}

<!-- wp:html -->
<div style="background:linear-gradient(135deg,${NAVY},#1a4a6e);padding:2.5rem 2rem;text-align:center;border-radius:8px;margin-top:2rem;">
  <h3 style="color:#fff;font-size:1.5rem;font-weight:900;margin:0 0 0.75rem 0;">Eastern Shore Hydro Excavation Quote</h3>
  <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;margin-top:1.5rem;">
    <a href="tel:${PHONE_RAW}" style="background:${GOLD};color:${NAVY};font-weight:700;padding:0.875rem 2rem;border-radius:9999px;text-decoration:none;">Call ${PHONE}</a>
    <a href="https://beachhydrovac.com/eastern-shore/" style="background:transparent;color:#fff;font-weight:600;padding:0.875rem 2rem;border-radius:9999px;text-decoration:none;border:2px solid rgba(255,255,255,0.6);">Eastern Shore Page</a>
  </div>
</div>
<!-- /wp:html -->`
  },

  // ── Hampton Roads Hub ──
  {
    slug: 'non-destructive-excavation-hampton-roads',
    title: 'Non-Destructive Excavation Hampton Roads VA | Complete Guide',
    focuskw: 'non-destructive excavation hampton roads',
    yoast_title: 'Non-Destructive Excavation Hampton Roads VA | Beach HydroVac',
    yoast_desc: 'Complete guide to non-destructive hydrovac excavation across Hampton Roads VA. Serving Virginia Beach, Norfolk, Chesapeake, Suffolk, Newport News & more. Call 757-510-5220.',
    content: `<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.125rem"}}} -->
<p style="font-size:1.125rem"><strong>Non-destructive excavation</strong> — using high-pressure water and vacuum instead of mechanical tools — is the safest and most precise way to dig near underground utilities across Hampton Roads. Beach HydroVac is Hampton Roads' veteran-owned non-destructive excavation specialist, serving all cities across the region.</p>
<!-- /wp:paragraph -->

<!-- wp:heading --><h2 class="wp-block-heading">What Makes Excavation "Non-Destructive"?</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>Traditional mechanical excavation — backhoes, trenchers, augers — uses steel teeth and blades to break soil. These tools cannot distinguish between soil and buried utilities. A gas line, fiber trunk, or electrical conduit looks the same as dirt to a backhoe bucket. Non-destructive excavation uses water pressure to break soil and vacuum to remove it. Water cannot cut through steel pipe or damage buried cable — making utility strikes physically impossible.</p><!-- /wp:paragraph -->

<!-- wp:heading --><h2 class="wp-block-heading">Non-Destructive Excavation Services Across Hampton Roads</h2><!-- /wp:heading -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Potholing & Daylighting</strong> — physical utility exposure for SUE Level A verification</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Vacuum Excavation</strong> — industrial-grade soil removal with 500ft+ hose reach</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Slot Trenching</strong> — narrow precise trenches for fiber, conduit, water, and gas</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Remote Excavation</strong> — access restricted areas without bringing trucks close</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->

<!-- wp:heading --><h2 class="wp-block-heading">Cities We Serve Across Hampton Roads</h2><!-- /wp:heading -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"1rem"}}}} -->
<div class="wp-block-columns">
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><a href="https://beachhydrovac.com/">Virginia Beach</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="https://beachhydrovac.com/norfolk-hydrovac/">Norfolk</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="https://beachhydrovac.com/chesapeake-hydrovac/">Chesapeake</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="https://beachhydrovac.com/suffolk-hydrovac/">Suffolk</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="https://beachhydrovac.com/newport-news-hydrovac/">Newport News</a></li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
</div><!-- /wp:column -->
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><a href="https://beachhydrovac.com/hampton-hydrovac/">Hampton</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="https://beachhydrovac.com/portsmouth-hydrovac/">Portsmouth</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="https://beachhydrovac.com/williamsburg/">Williamsburg</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="https://beachhydrovac.com/eastern-shore/">Eastern Shore</a></li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
</div><!-- /wp:column -->
</div><!-- /wp:columns -->

${faqSchema([
  {q:'What is non-destructive excavation?',a:'Non-destructive excavation uses high-pressure water and industrial vacuum — not mechanical tools — to remove soil. It cannot damage buried utilities, making it the standard for safe digging near gas, fiber, electric, and water lines.'},
  {q:'Who provides non-destructive excavation in Hampton Roads?',a:'Beach HydroVac is Hampton Roads\' veteran-owned non-destructive excavation specialist, serving Virginia Beach, Norfolk, Chesapeake, Suffolk, Newport News, Hampton, Portsmouth, Williamsburg, and the Eastern Shore. Call 757-510-5220.'},
  {q:'Is non-destructive excavation required by law?',a:'Not always required by law, but it is the industry standard for excavation near known utilities. Many government and DOD contracts explicitly require SUE Level A verification through non-destructive potholing.'},
  {q:'How much does non-destructive excavation cost in Hampton Roads?',a:'Rates typically run $200-$400/hour or $300-$800 per pothole in the Hampton Roads market. Contact Beach HydroVac at 757-510-5220 for a project-specific free quote.'}
])}

<!-- wp:html -->
<div style="background:linear-gradient(135deg,${NAVY},#1a4a6e);padding:2.5rem 2rem;text-align:center;border-radius:8px;margin-top:2rem;">
  <h3 style="color:#fff;font-size:1.5rem;font-weight:900;margin:0 0 0.75rem 0;">Hampton Roads Non-Destructive Excavation Quote</h3>
  <p style="color:#aacce0;margin:0 0 1.5rem 0;">Veteran-owned. Based in Virginia Beach. Serving all of Hampton Roads.</p>
  <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
    <a href="tel:${PHONE_RAW}" style="background:${GOLD};color:${NAVY};font-weight:700;padding:0.875rem 2rem;border-radius:9999px;text-decoration:none;">Call ${PHONE}</a>
    <a href="tel:7576338922" style="background:transparent;color:${GOLD};font-weight:700;padding:0.875rem 2rem;border-radius:9999px;text-decoration:none;border:2px solid ${GOLD};">Mobile ${MOBILE}</a>
    <a href="mailto:${EMAIL}" style="background:transparent;color:#fff;font-weight:600;padding:0.875rem 2rem;border-radius:9999px;text-decoration:none;border:2px solid rgba(255,255,255,0.6);">Email Us</a>
  </div>
</div>
<!-- /wp:html -->`
  }
];

// ─── DEPLOY ──────────────────────────────────────────────────────────
async function deployPage(id, data) {
  const content = [hero(data.headline, data.sub), statsBar, body(data.city, data.p1, data.p2, data.note, data.zips), servicesGrid(data.city), cta(data.city), internalLinks, schema(data.city)].join('\n\n');
  const r = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${id}`, {
    method: 'PUT', headers,
    body: JSON.stringify({
      content, status: 'publish',
      meta: { _yoast_wpseo_title: data.yoast_title, _yoast_wpseo_metadesc: data.yoast_desc, _yoast_wpseo_focuskw: data.focuskw }
    })
  });
  return r.ok;
}

async function deployPost(post) {
  const r = await fetch(`${WP_URL}/wp-json/wp/v2/posts`, {
    method: 'POST', headers,
    body: JSON.stringify({
      title: post.title, content: post.content, slug: post.slug, status: 'publish',
      meta: { _yoast_wpseo_title: post.yoast_title, _yoast_wpseo_metadesc: post.yoast_desc, _yoast_wpseo_focuskw: post.focuskw }
    })
  });
  if (r.ok) { const d = await r.json(); return d.id; }
  return null;
}

async function main() {
  console.log('='.repeat(65));
  console.log('BEACH HYDROVAC — FULL CONTENT BLITZ');
  console.log('Targeting: VB, Norfolk, Chesapeake, Suffolk, Portsmouth,');
  console.log('Newport News, Hampton, Williamsburg, Eastern Shore');
  console.log('='.repeat(65));

  // 1. Update Williamsburg + Eastern Shore pages
  console.log('\n── UPDATING CITY PAGES ──');
  for (const p of cityPageUpdates) {
    process.stdout.write(`  ${p.city} (ID:${p.id})...`);
    const ok = await deployPage(p.id, p);
    console.log(ok ? ' ✅' : ' ❌');
  }

  // 2. Deploy blog posts
  console.log('\n── DEPLOYING BLOG POSTS ──');
  const results = [];
  for (const post of blogPosts) {
    process.stdout.write(`  "${post.title.substring(0,50)}..."...`);
    const id = await deployPost(post);
    if (id) {
      console.log(` ✅ ID:${id}`);
      results.push({ title: post.title, slug: post.slug, id });
    } else {
      console.log(' ❌');
    }
  }

  console.log('\n' + '='.repeat(65));
  console.log(`DONE — ${results.length + cityPageUpdates.length} assets deployed`);
  console.log('='.repeat(65));

  console.log('\nCITY PAGES UPDATED:');
  cityPageUpdates.forEach(p => console.log(`  → https://beachhydrovac.com/${p.id === 3476 ? 'williamsburg' : 'eastern-shore'}/`));

  console.log('\nBLOG POSTS LIVE:');
  results.forEach(r => console.log(`  → https://beachhydrovac.com/${r.slug}/`));

  console.log('\nKEYWORDS TARGETED:');
  blogPosts.forEach(p => console.log(`  → "${p.focuskw}"`));
}

main().catch(console.error);
