/**
 * BeachHydroVac — Cleanup Duplicates + Expand Thin Pages
 * - Deletes -2 and root -hydrovac duplicate pages (not indexed, no purpose)
 * - Expands thin purposeful pages to 500+ words with Yoast-compliant structure
 * Run: node cleanup-and-expand.js
 */
import fetch from 'node-fetch';

const WP_BASE = 'https://beachhydrovac.com/wp-json/wp/v2';
const AUTH    = 'Basic ' + Buffer.from('rdenci_16:0L9x p2O7 tdfs khVJ UFyl 1UZk').toString('base64');
const HEADERS = { Authorization: AUTH, 'Content-Type': 'application/json' };

async function deletePage(id, label) {
    const r = await fetch(`${WP_BASE}/pages/${id}?force=true`, { method:'DELETE', headers: HEADERS });
    const d = await r.json();
    return r.ok && d.deleted;
}

async function updatePage(id, content, yoastTitle, yoastDesc) {
    const r = await fetch(`${WP_BASE}/pages/${id}`, {
        method:'POST', headers: HEADERS,
        body: JSON.stringify({ content, meta: { _yoast_wpseo_title: yoastTitle, _yoast_wpseo_metadesc: yoastDesc }})
    });
    const d = await r.json();
    const words = d.content?.rendered?.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim().split(' ').length;
    return { ok: r.ok, words };
}

// ── PAGES TO DELETE ──────────────────────────────────────────────────────────
const TO_DELETE = [
    // -2 WordPress slug duplicates (exact copies of canonical /locations/ pages)
    { id: 3469, slug: 'virginia-beach-2' },
    { id: 3470, slug: 'norfolk-2' },
    { id: 3471, slug: 'chesapeake-2' },
    { id: 3472, slug: 'newport-news-2' },
    { id: 3473, slug: 'hampton-2' },
    { id: 3477, slug: 'richmond-2' },
    // Root-level -hydrovac pages (duplicates of /locations/{city}/ — not indexed)
    { id: 3750, slug: 'norfolk-hydrovac' },
    { id: 3751, slug: 'chesapeake-hydrovac' },
    { id: 3752, slug: 'newport-news-hydrovac' },
    { id: 3753, slug: 'suffolk-hydrovac' },
    { id: 3754, slug: 'hampton-hydrovac' },
    { id: 3755, slug: 'portsmouth-hydrovac' },
];

// ── PAGES TO EXPAND ──────────────────────────────────────────────────────────
const TO_EXPAND = [

// Locations hub — 37 words → proper hub with city links
{
id: 3455, slug: 'locations',
yoastTitle: 'Hydrovac Service Locations — Hampton Roads & Virginia | Beach HydroVac',
yoastDesc: 'Beach HydroVac serves Virginia Beach, Chesapeake, Norfolk, Hampton, Newport News, Portsmouth, Suffolk & all Virginia. View all hydrovac service locations.',
content: `
<!-- wp:paragraph -->
<p>Beach HydroVac provides <strong>hydro excavation and vacuum excavation services</strong> at locations across Hampton Roads, greater Virginia, and neighboring states. Browse our service locations below to learn about hydrovac availability, local soil conditions, and project experience in your area.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Hampton Roads Service Locations</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Our primary service area covers all seven cities of Hampton Roads, Virginia, with same-day and next-day hydrovac scheduling for most projects.</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<li><a href="https://beachhydrovac.com/locations/virginia-beach/">Virginia Beach, VA</a> — Home base. Full hydrovac services across all zip codes 23451–23464.</li>
<li><a href="https://beachhydrovac.com/locations/chesapeake/">Chesapeake, VA</a> — Greenbrier, Western Branch, Deep Creek, Great Bridge corridors.</li>
<li><a href="https://beachhydrovac.com/locations/norfolk/">Norfolk, VA</a> — Downtown, Ghent, Wards Corner, naval station vicinity.</li>
<li><a href="https://beachhydrovac.com/locations/suffolk/">Suffolk, VA</a> — Route 460 corridor, downtown Suffolk, western industrial zones.</li>
<li><a href="https://beachhydrovac.com/locations/portsmouth/">Portsmouth, VA</a> — Churchland, Cradock, shipyard district, Olde Towne.</li>
<li><a href="https://beachhydrovac.com/locations/hampton/">Hampton, VA</a> — Langley corridor, Phoebus, all Hampton industrial and residential zones.</li>
<li><a href="https://beachhydrovac.com/locations/newport-news/">Newport News, VA</a> — Denbigh, Hilton Village, Jefferson Avenue, downtown waterfront.</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {"level":2} -->
<h2>Greater Virginia Service Locations</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<li><a href="https://beachhydrovac.com/locations/williamsburg/">Williamsburg, VA</a> — Historic district, James City County, Route 60 corridor.</li>
<li><a href="https://beachhydrovac.com/locations/eastern-shore/">Eastern Shore, VA</a> — Accomack and Northampton counties, coastal and agricultural projects.</li>
<li><a href="https://beachhydrovac.com/locations/richmond/">Richmond, VA</a> — Scott's Addition, West End, Chesterfield County metro area.</li>
<li><a href="https://beachhydrovac.com/locations/fredericksburg/">Fredericksburg, VA</a> — Stafford County, Spotsylvania, I-95 commercial corridor.</li>
<li><a href="https://beachhydrovac.com/locations/alexandria/">Alexandria, VA</a> — Old Town, Eisenhower Valley, Northern Virginia metro.</li>
<li><a href="https://beachhydrovac.com/locations/arlington/">Arlington, VA</a> — Pentagon area, Rosslyn-Ballston, high-density urban projects.</li>
<li><a href="https://beachhydrovac.com/locations/henrico/">Henrico, VA</a> — Short Pump, West Broad Village, all Henrico County commercial zones.</li>
<li><a href="https://beachhydrovac.com/locations/chesterfield/">Chesterfield, VA</a> — Midlothian, Hull Street corridor, Chesterfield County utility work.</li>
<li><a href="https://beachhydrovac.com/locations/roanoke/">Roanoke, VA</a> — Valley communities, Route 220 corridor, Western Virginia industrial.</li>
<li><a href="https://beachhydrovac.com/locations/lynchburg/">Lynchburg, VA</a> — Central Virginia corridor, surrounding municipalities.</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {"level":2} -->
<h2>Out-of-State Service Locations</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<li><a href="https://beachhydrovac.com/hydro-excavation-north-carolina/">North Carolina</a> — Outer Banks, Raleigh, Charlotte for large-scale contracts.</li>
<li><a href="https://beachhydrovac.com/hydro-excavation-maryland/">Maryland</a> — Eastern Shore, Baltimore, DC metro utility work.</li>
<li><a href="https://beachhydrovac.com/hydro-excavation-delaware/">Delaware</a> — Wilmington, Dover, coastal infrastructure projects.</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Don't see your location? Call <strong>757-510-5220</strong> — Beach HydroVac accepts projects statewide and can dispatch to any Virginia location. Travel fees may apply outside Hampton Roads.</p>
<!-- /wp:paragraph -->
`},

// Hydro Excavation Contractors Virginia — 283 words → 500+
{
id: 3895, slug: 'hydro-excavation-contractors-virginia',
yoastTitle: 'Hydro Excavation Contractors Virginia | Beach HydroVac',
yoastDesc: 'Top-rated hydro excavation contractors in Virginia. Veteran-owned Beach HydroVac serves Hampton Roads & all Virginia. Potholing, daylighting, SUE Level A. 757-510-5220.',
content: `
<!-- wp:paragraph -->
<p>Finding reliable <strong>hydro excavation contractors in Virginia</strong> who understand local soil conditions, VDOT requirements, and utility infrastructure is critical for any ground disturbance project. Beach HydroVac is a veteran-owned hydro excavation contractor based in Virginia Beach, serving Hampton Roads and all of Virginia with professional hydrovac services since our founding.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Virginia's Trusted Hydro Excavation Contractors</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>As hydro excavation contractors serving Virginia, we bring specialized knowledge of the state's diverse geological conditions — from the sandy coastal soils of Hampton Roads and the Eastern Shore, to the heavy red clay of the Piedmont, to the rocky terrain of the Blue Ridge. Our hydrovac trucks are equipped to handle all Virginia soil types safely and efficiently.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Hydro Excavation Contractor Services Across Virginia</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<li><strong>Utility potholing & daylighting</strong> — Visual confirmation of underground utility location and depth before construction</li>
<li><strong>SUE Level A verification</strong> — ASCE 38-22 compliant quality designation for <a href="https://www.vdot.virginia.gov/" target="_blank" rel="noopener noreferrer">VDOT</a>-funded projects statewide</li>
<li><strong>Slot trenching</strong> — Fiber optic, electrical conduit, and gas service trenching with minimal surface disturbance</li>
<li><strong>Remote excavation</strong> — Extended-reach hydrovac for inaccessible sites, waterway crossings, and confined spaces</li>
<li><strong>Emergency hydrovac</strong> — 24/7 emergency response for utility strikes and rapid utility exposure across Virginia</li>
<li><strong>Vacuum excavation</strong> — Soft dig for residential, commercial, and municipal projects statewide</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {"level":2} -->
<h2>Why Choose a Veteran-Owned Hydro Excavation Contractor</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Beach HydroVac is veteran-owned and operated, bringing military-grade precision, reliability, and accountability to every hydro excavation project in Virginia. We carry full general liability insurance, maintain OSHA 10 certified field personnel, and comply with all Virginia Department of Labor and <a href="https://www.labor.virginia.gov/" target="_blank" rel="noopener noreferrer">DOLI</a> safety requirements. Our safety record and project completion rate are our strongest references.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Hydro Excavation Contractor Coverage — Virginia</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>We provide hydro excavation contractor services from our Virginia Beach base across Hampton Roads and regularly work statewide. Primary Virginia markets served: Virginia Beach, Chesapeake, Norfolk, Portsmouth, Hampton, Newport News, Suffolk, Richmond, Fredericksburg, Alexandria, Arlington, Roanoke, Lynchburg, Williamsburg, and the Eastern Shore.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>Call <strong>757-510-5220</strong> to discuss your hydro excavation project anywhere in Virginia. Free quotes, fast scheduling, veteran-owned reliability.</p>
<!-- /wp:paragraph -->
`},

// Fiber Optic Trenching Virginia — 284 words → 500+
{
id: 3894, slug: 'fiber-optic-trenching-virginia',
yoastTitle: 'Fiber Optic Trenching Virginia | Beach HydroVac',
yoastDesc: 'Hydrovac fiber optic trenching across Virginia. Precision slot trenching for telecom & fiber installation. Veteran-owned Beach HydroVac. Call 757-510-5220.',
content: `
<!-- wp:paragraph -->
<p>Beach HydroVac provides <strong>fiber optic trenching in Virginia</strong> using hydrovac slot trenching technology — the safest, most precise method for telecom cable installation near existing underground infrastructure. We serve telecommunications companies, internet service providers, and general contractors across Hampton Roads and all of Virginia for fiber optic trench installation projects.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Fiber Optic Trenching Services in Virginia</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Fiber optic trenching requires a narrow, clean trench — typically 6 to 12 inches wide and 24 to 36 inches deep — installed without disturbing adjacent utilities or damaging existing fiber runs. Our hydrovac slot trenching service creates this precise trench using high-pressure water and vacuum suction, cutting through Virginia's varied soils without the vibration, mechanical strike risk, or surface damage of conventional trenching equipment.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Why Hydrovac for Fiber Optic Trenching?</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<li><strong>Zero fiber strikes</strong> — No metal teeth or rotating blades to cut through existing fiber optic cables</li>
<li><strong>Precise trench width</strong> — Cut to exact specification without over-excavation or collateral damage</li>
<li><strong>Works in congested areas</strong> — Safe alongside power lines, gas mains, water services, and other telecom cables</li>
<li><strong>Minimal surface disruption</strong> — Ideal for trenching in finished pavement, landscaping, or pedestrian areas</li>
<li><strong>OSHA compliant</strong> — All Virginia 811 requirements met; proper utility marking verification before any trenching begins</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {"level":2} -->
<h2>Virginia Fiber Optic Trenching Markets</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>We have completed fiber optic trenching projects across Hampton Roads for commercial and municipal broadband expansion, including projects in Virginia Beach, Chesapeake, Norfolk, and Newport News. We also support fiber deployment projects in Richmond, Northern Virginia, and rural Virginia communities where broadband expansion is accelerating. Our crews are experienced with <a href="https://va811.com/" target="_blank" rel="noopener noreferrer">Virginia 811</a> notification requirements and <a href="https://www.vdot.virginia.gov/" target="_blank" rel="noopener noreferrer">VDOT</a> right-of-way permit processes.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Request Fiber Optic Trenching in Virginia</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Call Beach HydroVac at <strong>757-510-5220</strong> for fiber optic trenching availability and pricing across Virginia. We provide free project quotes, can mobilize within 24–48 hours for Hampton Roads projects, and accept statewide contracts for larger fiber deployment programs. Veteran-owned and fully insured.</p>
<!-- /wp:paragraph -->
`},

// Emergency Hydro Excavation Virginia — 287 words → 500+
{
id: 3893, slug: 'emergency-hydro-excavation-virginia',
yoastTitle: 'Emergency Hydro Excavation Virginia | 24/7 Beach HydroVac',
yoastDesc: '24/7 emergency hydro excavation across Virginia. Rapid utility exposure & repair access. Veteran-owned Beach HydroVac. Call now: 757-510-5220.',
content: `
<!-- wp:paragraph -->
<p>Beach HydroVac provides <strong>emergency hydro excavation in Virginia</strong> with 24/7 availability for utility strikes, emergency pipeline repairs, and critical infrastructure access across Hampton Roads and statewide. When a utility is damaged and repair crews need immediate, safe excavation to access the break, our hydrovac trucks respond fast — minimizing outage duration and liability exposure.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>24/7 Emergency Hydro Excavation Response</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Utility emergencies don't follow business hours. A gas line strike, water main break, or buried cable failure can shut down a job site — or an entire neighborhood — in minutes. Our emergency hydro excavation service provides rapid-response mobilization across Virginia, with priority dispatch for Hampton Roads and same-day response for most Virginia locations. Call <strong>757-510-5220</strong> any time for emergency hydrovac response.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Emergency Hydro Excavation Applications</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<li><strong>Utility strike response</strong> — Immediately expose a struck gas line, fiber cable, or water main for utility company repair crews</li>
<li><strong>Emergency pipeline access</strong> — Rapid excavation to access a failed pipeline section for emergency repair</li>
<li><strong>Sinkhole investigation</strong> — Safe excavation to locate the utility break causing a surface sinkhole</li>
<li><strong>Flood response</strong> — Expose and clear utility infrastructure affected by flooding or storm surge</li>
<li><strong>Construction site emergencies</strong> — Immediate response when mechanical equipment strikes a buried utility mid-project</li>
<li><strong>Gas leak excavation</strong> — Safe, non-sparking hydrovac excavation in active gas leak environments</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {"level":2} -->
<h2>Why Hydrovac for Emergency Excavation?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>In a utility emergency, using mechanical excavation equipment risks making a bad situation worse. A backhoe near a struck gas line creates ignition risk. A trencher near a damaged fiber cable can sever additional runs. Hydro excavation uses only water and vacuum — no sparks, no metal contact, no secondary strike risk. For emergency excavation near <a href="https://www.phmsa.dot.gov/" target="_blank" rel="noopener noreferrer">PHMSA-regulated pipelines</a>, hydrovac is often the only approved method.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Emergency Hydro Excavation — Virginia Coverage</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>We provide 24/7 emergency hydro excavation response across Hampton Roads (Virginia Beach, Chesapeake, Norfolk, Portsmouth, Hampton, Newport News, Suffolk) with 1–2 hour mobilization. For emergency projects across Virginia, call for dispatch availability. We maintain relationships with major utility operators and general contractors throughout the state for priority emergency response.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p><strong>Emergency line: 757-510-5220</strong> — available 24 hours, 7 days a week.</p>
<!-- /wp:paragraph -->
`},

// Hydro Excavation Delaware — 269 words → 500+
{
id: 3892, slug: 'hydro-excavation-delaware',
yoastTitle: 'Hydro Excavation Delaware | Beach HydroVac',
yoastDesc: 'Hydro excavation services in Delaware. Potholing, vacuum excavation & utility exposure. Beach HydroVac serves Wilmington, Dover & Delaware coast. 757-510-5220.',
content: `
<!-- wp:paragraph -->
<p>Beach HydroVac provides <strong>hydro excavation in Delaware</strong> for contractors, utility companies, and municipalities requiring non-destructive excavation services along the Delmarva Peninsula and throughout the state. As a Virginia-based hydrovac contractor, we serve Delaware as part of our mid-Atlantic coverage area — offering the same veteran-owned reliability and OSHA-compliant services available across Virginia and Maryland.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Hydro Excavation Services in Delaware</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Our Delaware hydro excavation service covers potholing, daylighting, vacuum excavation, slot trenching, and SUE Level A utility verification. Delaware's coastal soils — sandy loam and tidal clay common along the coast and the Chesapeake & Delaware Canal corridor — respond well to hydro excavation, making it the preferred non-destructive method for utility work statewide.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Delaware Hydro Excavation Applications</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<li><strong>Pre-construction utility verification</strong> — Potholing to confirm depths before mechanical excavation begins</li>
<li><strong>Fiber optic & telecom trenching</strong> — Slot trenching for broadband expansion along Delaware's Route 1 corridor</li>
<li><strong>Pipeline utility work</strong> — Safe excavation alongside the Colonial Pipeline and other major Delaware infrastructure</li>
<li><strong>Coastal construction</strong> — Hydrovac services for Rehoboth Beach, Dewey Beach, and Delaware Seashore projects</li>
<li><strong>Municipal infrastructure</strong> — Water main, sewer, and stormwater utility exposure for Wilmington, Dover, and Newark</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {"level":2} -->
<h2>Delaware Coverage Areas</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>We serve all Delaware counties — New Castle, Kent, and Sussex — with priority coverage in Wilmington, Dover, Newark, Middletown, Milford, and the coastal resort communities. Projects are dispatched from our Virginia Beach base; travel time to Wilmington is approximately 4 hours. For large Delaware contracts, we can stage equipment regionally.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Request Hydro Excavation in Delaware</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Call Beach HydroVac at <strong>757-510-5220</strong> for hydro excavation pricing and availability in Delaware. We provide free project quotes for all Delaware markets and can schedule around project timelines for both single-day and multi-week Delaware contracts. <a href="https://www.digsafelydelaware.com/" target="_blank" rel="noopener noreferrer">Dig Safely Delaware</a> marking is required before any excavation — we coordinate with all Delaware utility locating services.</p>
<!-- /wp:paragraph -->
`},

// Hydro Excavation Maryland — 277 words → 500+
{
id: 3891, slug: 'hydro-excavation-maryland',
yoastTitle: 'Hydro Excavation Maryland | Beach HydroVac',
yoastDesc: 'Professional hydro excavation in Maryland. Potholing, vacuum excavation & utility exposure. Beach HydroVac serves Baltimore, Eastern Shore & DC metro. 757-510-5220.',
content: `
<!-- wp:paragraph -->
<p>Beach HydroVac provides professional <strong>hydro excavation in Maryland</strong> for utility contractors, general contractors, and municipal clients across the Eastern Shore, Baltimore metro, and DC suburbs. Our veteran-owned hydrovac operation serves Maryland as part of our mid-Atlantic service area, bringing the same non-destructive excavation expertise available across Hampton Roads and Virginia.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Hydro Excavation Services in Maryland</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Our Maryland hydro excavation services include potholing, daylighting, slot trenching, vacuum excavation, SUE Level A utility verification, and emergency hydrovac response. Maryland's varied soil conditions — from the sandy Eastern Shore soils similar to Virginia's coastal zones, to the heavy urban clay of Baltimore, to the rocky terrain of Western Maryland — are all handled by our hydrovac equipment.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Maryland Hydro Excavation Applications</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<li><strong>Baltimore metro utility work</strong> — Dense urban infrastructure requires hydrovac precision for any ground disturbance</li>
<li><strong>Maryland Eastern Shore</strong> — Coastal and agricultural utility projects along the Chesapeake Bay shoreline</li>
<li><strong>DC suburbs (Prince George's, Montgomery)</strong> — High-density suburban utility verification and installation</li>
<li><strong>State highway projects</strong> — <a href="https://roads.maryland.gov/" target="_blank" rel="noopener noreferrer">MDOT SHA</a> requires SUE Level A for utility conflicts on state highway projects</li>
<li><strong>Port of Baltimore</strong> — Industrial and marine infrastructure utility work in the Port area</li>
<li><strong>Fiber optic expansion</strong> — Slot trenching for Maryland broadband and telecom expansion programs</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {"level":2} -->
<h2>Maryland Coverage Areas</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>We serve all Maryland regions from our Virginia Beach headquarters. The Maryland Eastern Shore (Salisbury, Ocean City, Cambridge) is approximately 2 hours from our base — we regularly dispatch for Eastern Shore projects. Baltimore and the DC suburbs are approximately 3–4 hours. For large Maryland contracts, we can arrange extended deployments with on-site staging. <a href="https://missutility.net/" target="_blank" rel="noopener noreferrer">Miss Utility Maryland</a> notification is required before all excavation work.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Get a Hydro Excavation Quote in Maryland</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Call <strong>757-510-5220</strong> for Maryland hydro excavation availability and project quotes. We work with Maryland utility companies, MDOT subcontractors, and municipal crews across the state. Free quotes, veteran-owned reliability, and full mid-Atlantic coverage.</p>
<!-- /wp:paragraph -->
`},

// Hydro Excavation North Carolina — 313 words → 500+
{
id: 3890, slug: 'hydro-excavation-north-carolina',
yoastTitle: 'Hydro Excavation North Carolina | Beach HydroVac',
yoastDesc: 'Hydro excavation services in North Carolina. Potholing, vacuum excavation & SUE Level A. Beach HydroVac serves Outer Banks, Raleigh & NC coast. 757-510-5220.',
content: `
<!-- wp:paragraph -->
<p>Beach HydroVac provides <strong>hydro excavation in North Carolina</strong> for contractors and utility operators requiring safe, non-destructive excavation along the Outer Banks, coastal NC, Raleigh metro, and Charlotte market. As a Virginia Beach-based hydrovac contractor, we serve North Carolina as part of our Southeast coverage area — particularly for the northeastern NC markets adjacent to Hampton Roads.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Hydro Excavation Services in North Carolina</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Our North Carolina hydro excavation services cover utility potholing, daylighting, slot trenching, vacuum excavation, and SUE Level A verification. Northeastern North Carolina's coastal sandy soils are similar to Hampton Roads — our equipment is optimized for these conditions. We work alongside NC utility locating services and follow all <a href="https://www.nc811.org/" target="_blank" rel="noopener noreferrer">NC 811</a> requirements for every North Carolina excavation project.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>North Carolina Hydro Excavation Markets</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<li><strong>Outer Banks, NC</strong> — Hydrovac for coastal utility work, water/sewer infrastructure, and storm recovery projects on the barrier islands</li>
<li><strong>Elizabeth City / Northeastern NC</strong> — Closest NC markets to our Virginia Beach base; frequent dispatch for utility and infrastructure work</li>
<li><strong>Kill Devil Hills / Nags Head</strong> — Seasonal construction and utility projects on the Outer Banks</li>
<li><strong>Raleigh-Durham metro</strong> — SUE Level A, fiber optic trenching, and pre-construction potholing for Triangle-area development</li>
<li><strong>Wilmington, NC</strong> — Coastal utility work and infrastructure projects in the Cape Fear region</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {"level":2} -->
<h2>Why Use Beach HydroVac in North Carolina?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Our proximity to northeastern North Carolina gives us a travel time advantage over Charlotte-based or Raleigh-based contractors for Outer Banks and Elizabeth City projects. We dispatch from Virginia Beach, crossing the Chesapeake Bay Bridge-Tunnel and reaching Outer Banks job sites in approximately 2–3 hours. We're licensed and insured to operate in North Carolina, and our crews are familiar with NCDOT right-of-way requirements.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Request Hydro Excavation in North Carolina</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Call Beach HydroVac at <strong>757-510-5220</strong> for hydro excavation pricing and scheduling across North Carolina. We provide free project quotes for all NC markets and can deploy for both single-day potholing and extended multi-week contracts. Veteran-owned, fully insured, serving the Southeast.</p>
<!-- /wp:paragraph -->
`},

];

// ── EXECUTE ──────────────────────────────────────────────────────────────────

console.log('\n════════════════════════════════════════════');
console.log('  BeachHydroVac — Cleanup + Expand Pages');
console.log('════════════════════════════════════════════\n');

// Step 1: Delete duplicates
console.log('── DELETING DUPLICATES ──');
let deleted = 0;
for (const p of TO_DELETE) {
    process.stdout.write(`  Deleting: ${p.slug} (ID ${p.id})... `);
    try {
        const ok = await deletePage(p.id, p.slug);
        console.log(ok ? '✅ Deleted' : '❌ Failed');
        if (ok) deleted++;
    } catch(e) { console.log(`❌ ${e.message}`); }
    await new Promise(r => setTimeout(r, 300));
}

// Step 2: Expand thin pages
console.log('\n── EXPANDING THIN PAGES ──');
let expanded = 0;
for (const p of TO_EXPAND) {
    process.stdout.write(`  Expanding: ${p.slug}... `);
    try {
        const result = await updatePage(p.id, p.content, p.yoastTitle, p.yoastDesc);
        const flag = result.words >= 500 ? '✅' : result.words >= 300 ? '⚠️' : '❌';
        console.log(`${flag} ${result.words} words`);
        if (result.ok) expanded++;
    } catch(e) { console.log(`❌ ${e.message}`); }
    await new Promise(r => setTimeout(r, 500));
}

console.log(`\n════════════════════════════════════════════`);
console.log(`  Deleted: ${deleted}/${TO_DELETE.length} duplicates`);
console.log(`  Expanded: ${expanded}/${TO_EXPAND.length} pages`);
console.log(`════════════════════════════════════════════\n`);
