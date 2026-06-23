import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(
  process.env.BEACH_HYDROVAC_WP_USER + ':' + process.env.BEACH_HYDROVAC_WP_PASSWORD
).toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

async function getPage(id) {
  const r = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${id}`, { headers });
  return r.json();
}

async function updatePage(id, content) {
  const r = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ content })
  });
  const d = await r.json();
  if (!r.ok) throw new Error(d.message || JSON.stringify(d));
  return d;
}

// ── SERVICES PAGE (ID 3332) ───────────────────────────────────────────────────
const servicesLinksBlock = `
<!-- wp:heading -->
<h2 class="wp-block-heading">Our Services</h2>
<!-- /wp:heading -->

<!-- wp:columns -->
<div class="wp-block-columns">
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Core Excavation</h3>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<li><a href="/services/hydro-excavation/">Hydro Excavation</a></li>
<li><a href="/services/potholing/">Potholing &amp; Daylighting</a></li>
<li><a href="/services/daylighting/">Daylighting Services</a></li>
<li><a href="/services/slot-trenching/">Slot Trenching</a></li>
<li><a href="/vacuum-excavation/">Vacuum Excavation</a></li>
<li><a href="/jetvac-services-virginia-beach/">Jetvac Services</a></li>
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:column -->
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Specialized Services</h3>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<li><a href="/services/sue-level-a/">SUE Level A</a></li>
<li><a href="/services/remote-excavation/">Remote Excavation</a></li>
<li><a href="/vactor-truck-services/">Vactor Truck Services</a></li>
<li><a href="/fiber-optic-trenching-virginia/">Fiber Optic Trenching</a></li>
<li><a href="/emergency-hydro-excavation-virginia/">Emergency Excavation</a></li>
<li><a href="/daylighting-services-hampton-va/">Daylighting — Hampton</a></li>
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:column -->
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Resources</h3>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<li><a href="/what-is-hydro-excavation/">What Is Hydro Excavation?</a></li>
<li><a href="/hydro-excavation-cost-guide-virginia-2026/">Cost Guide 2026</a></li>
<li><a href="/miss-utility-virginia/">Virginia 811 / Miss Utility</a></li>
<li><a href="/hydro-excavation-safety-best-practices/">Safety Best Practices</a></li>
<li><a href="/utility-damage-prevention-excavation-virginia/">Utility Damage Prevention</a></li>
<li><a href="/faq/">FAQ</a></li>
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->`;

// ── SERVICE AREAS PAGE (ID 3468) ──────────────────────────────────────────────
const areasLinksBlock = `
<!-- wp:heading -->
<h2 class="wp-block-heading">Hydrovac Service Areas</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Beach Hydrovac serves contractors, municipalities, and industrial clients across Virginia, Maryland, Delaware, and North Carolina. Select your area for local service details:</p>
<!-- /wp:paragraph -->

<!-- wp:columns -->
<div class="wp-block-columns">
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Hampton Roads</h3>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<li><a href="/locations/virginia-beach/">Virginia Beach</a></li>
<li><a href="/locations/chesapeake/">Chesapeake</a></li>
<li><a href="/locations/norfolk/">Norfolk</a></li>
<li><a href="/locations/portsmouth/">Portsmouth</a></li>
<li><a href="/locations/suffolk/">Suffolk</a></li>
<li><a href="/locations/hampton/">Hampton</a></li>
<li><a href="/locations/newport-news/">Newport News</a></li>
<li><a href="/locations/williamsburg/">Williamsburg</a></li>
<li><a href="/locations/eastern-shore/">Eastern Shore</a></li>
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:column -->
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Central &amp; Northern Virginia</h3>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<li><a href="/locations/richmond/">Richmond</a></li>
<li><a href="/locations/henrico/">Henrico County</a></li>
<li><a href="/locations/chesterfield/">Chesterfield County</a></li>
<li><a href="/locations/fredericksburg/">Fredericksburg</a></li>
<li><a href="/locations/arlington/">Arlington</a></li>
<li><a href="/locations/alexandria/">Alexandria</a></li>
<li><a href="/locations/fairfax/">Fairfax</a></li>
<li><a href="/locations/lynchburg/">Lynchburg</a></li>
<li><a href="/locations/roanoke/">Roanoke</a></li>
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:column -->
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Neighboring States</h3>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<li><a href="/hydro-excavation-maryland/">Maryland</a></li>
<li><a href="/hydro-excavation-delaware/">Delaware</a></li>
<li><a href="/hydro-excavation-north-carolina/">North Carolina</a></li>
<li><a href="/non-destructive-excavation-hampton-roads/">Hampton Roads Region</a></li>
<li><a href="/vacuum-excavation-virginia-beach/">Vacuum Excavation — Virginia Beach</a></li>
<li><a href="/vacuum-excavation-chesapeake-va/">Vacuum Excavation — Chesapeake</a></li>
<li><a href="/hydrovac-williamsburg-va/">Hydrovac — Williamsburg</a></li>
<li><a href="/slot-trenching-portsmouth-va/">Slot Trenching — Portsmouth</a></li>
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->`;

async function run() {
  console.log('Fetching current page content...');
  const [servicesPage, areasPage] = await Promise.all([
    getPage(3332),
    getPage(3468)
  ]);

  const servicesRaw = servicesPage.content?.raw || servicesPage.content?.rendered || '';
  const areasRaw    = areasPage.content?.raw    || areasPage.content?.rendered    || '';

  // Only append if the links block isn't already there
  const newServicesContent = servicesRaw.includes('/services/hydro-excavation/')
    ? servicesRaw
    : servicesRaw + servicesLinksBlock;

  const newAreasContent = areasRaw.includes('/locations/virginia-beach/')
    ? areasRaw
    : areasRaw + areasLinksBlock;

  console.log('Updating /services/ page...');
  const s = await updatePage(3332, newServicesContent);
  console.log('✅ /services/ updated:', s.link);

  console.log('Updating /service-areas/ page...');
  const a = await updatePage(3468, newAreasContent);
  console.log('✅ /service-areas/ updated:', a.link);

  // Also wire homepage to link to service-areas and key service pages
  console.log('Fetching homepage...');
  const homePage = await getPage(3201);
  const homeRaw = homePage.content?.raw || homePage.content?.rendered || '';

  const homeLinksBlock = `
<!-- wp:group -->
<div class="wp-block-group">
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Explore Our Services &amp; Coverage</h3>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<li><a href="/services/">All Services</a> | <a href="/service-areas/">Service Areas</a> | <a href="/faq/">FAQ</a></li>
<li><strong>Nearby:</strong> <a href="/locations/virginia-beach/">Virginia Beach</a> · <a href="/locations/chesapeake/">Chesapeake</a> · <a href="/locations/norfolk/">Norfolk</a> · <a href="/locations/hampton/">Hampton</a> · <a href="/locations/newport-news/">Newport News</a> · <a href="/locations/suffolk/">Suffolk</a></li>
<li><strong>Services:</strong> <a href="/vacuum-excavation/">Vacuum Excavation</a> · <a href="/services/potholing/">Potholing</a> · <a href="/services/slot-trenching/">Slot Trenching</a> · <a href="/jetvac-services-virginia-beach/">Jetvac</a> · <a href="/services/sue-level-a/">SUE Level A</a></li>
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:group -->`;

  const newHomeContent = homeRaw.includes('/service-areas/')
    ? homeRaw
    : homeRaw + homeLinksBlock;

  console.log('Updating homepage...');
  const h = await updatePage(3201, newHomeContent);
  console.log('✅ Homepage updated:', h.link);

  console.log('\n✅ Done. Internal link structure fixed.');
  console.log('   /services/      → 12 service pages linked');
  console.log('   /service-areas/ → 26 location/region pages linked');
  console.log('   / (homepage)    → services, areas, 6 cities, 5 services linked');
}

run().catch(console.error);
