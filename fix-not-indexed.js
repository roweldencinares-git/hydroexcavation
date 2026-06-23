/**
 * BeachHydroVac — Fix "Discovered, Currently Not Indexed" Pages
 * Targets: thin content pages + author archive noindex
 * Run: node fix-not-indexed.js
 */
import fetch from 'node-fetch';

const WP_BASE = 'https://beachhydrovac.com/wp-json/wp/v2';
const AUTH    = 'Basic ' + Buffer.from('rdenci_16:0L9x p2O7 tdfs khVJ UFyl 1UZk').toString('base64');
const HEADERS = { Authorization: AUTH, 'Content-Type': 'application/json' };

async function updatePage(id, content, title = null, yoastTitle = null, yoastDesc = null) {
    const body = { content };
    if (title) body.title = title;
    if (yoastTitle || yoastDesc) {
        body.meta = {};
        if (yoastTitle) body.meta._yoast_wpseo_title = yoastTitle;
        if (yoastDesc)  body.meta._yoast_wpseo_metadesc = yoastDesc;
    }
    const r = await fetch(`${WP_BASE}/pages/${id}`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(body)
    });
    const d = await r.json();
    const words = d.content?.rendered?.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim().split(' ').length;
    return { ok: r.ok, id, words, link: d.link };
}

// ── PAGE CONTENT ──────────────────────────────────────────────────────────────

const SERVICE_AREAS_CONTENT = `
<!-- wp:heading -->
<h2>Hydrovac & Hydro Excavation Service Areas — Hampton Roads & Virginia</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Beach HydroVac provides professional hydro excavation, vacuum excavation, potholing, daylighting, and SUE Level A services across Hampton Roads and throughout the state of Virginia. As a veteran-owned company based in Virginia Beach, we serve residential, commercial, and municipal clients with fast response times and a fully equipped fleet of hydrovac trucks.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Primary Service Areas — Hampton Roads</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Our core coverage area spans the seven cities of Hampton Roads, Virginia. We maintain same-day and next-day availability for most hydro excavation requests in this region.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>Virginia Beach, VA</strong> — Our home base. Full hydrovac services including potholing, daylighting, vacuum excavation, slot trenching, and SUE Level A verification. Serving all zip codes: 23451–23464.</li>
<li><strong>Chesapeake, VA</strong> — Serving Greenbrier, Western Branch, Deep Creek, and Great Bridge corridors. Fast response for municipal and commercial jobs.</li>
<li><strong>Norfolk, VA</strong> — Downtown, Ghent, Wards Corner, and all industrial areas. Frequent utility congestion work near the naval station.</li>
<li><strong>Suffolk, VA</strong> — Covering Route 460 corridor, downtown Suffolk, and western industrial zones. Rural and suburban utility exposure projects.</li>
<li><strong>Portsmouth, VA</strong> — Shipyard district, Churchland, and all commercial zones. Experienced with high-density utility environments.</li>
<li><strong>Hampton, VA</strong> — Langley corridor, Phoebus, and all Hampton industrial and residential zones.</li>
<li><strong>Newport News, VA</strong> — Serving Denbigh, Hilton Village, and all commercial and industrial sectors. Experience with shipbuilding-adjacent utility projects.</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {"level":3} -->
<h3>Extended Service Areas — Virginia</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Beyond Hampton Roads, Beach HydroVac regularly dispatches to all major Virginia markets. Travel fees may apply for locations outside Hampton Roads.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>Williamsburg, VA</strong> — Historic district, James City County, and Route 60 commercial corridor. Experienced with sensitive archaeological overlay zones.</li>
<li><strong>Eastern Shore, VA</strong> — Accomack and Northampton counties. Serving agricultural, coastal, and highway utility projects.</li>
<li><strong>Richmond, VA</strong> — Scott's Addition, West End, Chesterfield County, and surrounding metro area.</li>
<li><strong>Fredericksburg, VA</strong> — Stafford County, Spotsylvania, and the I-95 commercial corridor.</li>
<li><strong>Alexandria, VA</strong> — Old Town, Eisenhower Valley, and Northern Virginia metro projects.</li>
<li><strong>Arlington, VA</strong> — Pentagon area, Rosslyn-Ballston corridor, and high-density urban excavation projects.</li>
<li><strong>Henrico, VA</strong> — Short Pump, West Broad Village, and all Henrico County commercial zones.</li>
<li><strong>Chesterfield, VA</strong> — Midlothian, Hull Street corridor, and all Chesterfield County utility work.</li>
<li><strong>Roanoke, VA</strong> — Valley communities, Route 220 corridor, and Western Virginia industrial projects.</li>
<li><strong>Lynchburg, VA</strong> — Central Virginia corridor, Liberty University area, and surrounding municipalities.</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {"level":3} -->
<h3>Out-of-State Service Areas</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Beach HydroVac also accepts contracts in neighboring states for large-scale or emergency hydrovac projects. We are licensed and insured to operate in:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>North Carolina</strong> — Outer Banks, Raleigh metro, and Charlotte commercial projects</li>
<li><strong>Maryland</strong> — Eastern Shore, Baltimore, and DC metro utility work</li>
<li><strong>Delaware</strong> — Wilmington, Dover, and coastal infrastructure projects</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {"level":3} -->
<h3>What We Do In Each Service Area</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>In every market we serve, Beach HydroVac provides the same high-standard services:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>Hydro Excavation</strong> — High-pressure water breaks up soil; vacuum removes debris. Safe around gas lines, fiber optics, and water mains.</li>
<li><strong>Potholing / Daylighting</strong> — Precisely expose underground utilities for visual confirmation without mechanical damage.</li>
<li><strong>Slot Trenching</strong> — Narrow, precise trenches for fiber optic cable, conduit, and irrigation installation.</li>
<li><strong>SUE Level A Verification</strong> — ASCE 38-22 compliant subsurface utility engineering. Required for VDOT-funded projects.</li>
<li><strong>Vacuum Excavation</strong> — Air or water vacuum excavation for soft dig applications near sensitive infrastructure.</li>
<li><strong>Remote Excavation</strong> — Extended-reach hydrovac for areas inaccessible to conventional excavation equipment.</li>
<li><strong>Emergency Response</strong> — 24/7 emergency hydrovac available across all Hampton Roads service areas.</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {"level":3} -->
<h3>Why Choose Beach HydroVac In Your Area</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Beach HydroVac is veteran-owned and operated, with deep roots in the Hampton Roads community. Our team understands Virginia soil conditions, utility infrastructure patterns, and VDOT safety requirements specific to each region we serve. We work with general contractors, utility companies, municipalities, and homeowners across all our service areas.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Our trucks are equipped with high-pressure water systems and industrial vacuum units capable of handling sandy coastal soils (common in Virginia Beach and Eastern Shore) as well as heavy clay and rock common in Western Virginia. Whatever your project site, we have the equipment and experience to complete it safely.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Request Service In Your Area</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Call us at <strong>757-510-5220</strong> or request a free quote online. We'll confirm availability in your area and schedule your hydrovac project promptly. Same-day quotes available for Hampton Roads. For projects outside our primary service area, call for dispatch availability and travel details.</p>
<!-- /wp:paragraph -->
`;

const SERVICES_CONTENT = `
<!-- wp:heading -->
<h2>Hydrovac & Hydro Excavation Services — Virginia Beach & Hampton Roads, VA</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Beach HydroVac is Virginia's premier hydro excavation contractor, providing safe, non-destructive excavation services for utility contractors, general contractors, municipalities, and private landowners across Hampton Roads and all of Virginia. All services are performed by trained hydrovac technicians using modern, fully-equipped vacuum excavation trucks.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Core Hydrovac Services</h3>
<!-- /wp:heading -->

<!-- wp:heading {"level":4} -->
<h4>Hydro Excavation</h4>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Hydro excavation uses high-pressure water to break up soil combined with a powerful vacuum system to remove the slurry. It is the safest method of excavation near existing underground utilities, fiber optic lines, gas mains, and water infrastructure. Beach HydroVac's hydro excavation service is available across Hampton Roads with same-day scheduling for urgent projects.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":4} -->
<h4>Vacuum Excavation</h4>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Vacuum excavation (also called soft dig or suction excavation) uses either water or compressed air combined with industrial vacuum suction to safely expose underground utilities. Our vacuum excavation service is ideal for utility verification, construction site preparation, and slot trenching projects in Virginia Beach, Chesapeake, Norfolk, and surrounding cities.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":4} -->
<h4>Potholing & Daylighting</h4>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Potholing (also called daylighting) is the process of creating small, precise test holes to visually confirm the depth, location, and type of underground utilities. Required by VDOT and most utility owners prior to ground disturbance near existing infrastructure. Beach HydroVac performs potholing for pre-construction surveys throughout Virginia.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":4} -->
<h4>Slot Trenching</h4>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Slot trenching creates narrow, straight trenches for fiber optic cables, electrical conduit, irrigation pipes, and other utilities. Hydrovac slot trenching causes minimal surface disturbance and is ideal in areas with existing pavement, landscaping, or high-traffic zones. We perform slot trenching across Hampton Roads and statewide.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":4} -->
<h4>SUE Level A Verification</h4>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Subsurface Utility Engineering (SUE) Level A is the highest quality level designation under ASCE 38-22, requiring physical exposure and direct visual identification of underground utilities. Beach HydroVac provides SUE Level A potholing services compliant with VDOT requirements for all funded infrastructure projects in Virginia.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":4} -->
<h4>Remote Excavation</h4>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Remote excavation extends the reach of our hydrovac equipment to locations inaccessible by conventional trucks — across waterways, down steep embankments, or through confined spaces. Our remote excavation capability uses extended hose systems to safely excavate up to 600 feet from the truck location.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":4} -->
<h4>Vactor Truck Services</h4>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Beach HydroVac provides industrial vactor truck services for catch basin cleaning, storm drain maintenance, lift station cleaning, and bulk liquid/solid waste removal across Hampton Roads. Our vactor trucks are permitted for Virginia Department of Environmental Quality (DEQ) regulated waste disposal.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Industries We Serve</h3>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li>Utility contractors & general contractors</li>
<li>Telecom & fiber optic installation companies</li>
<li>Oil, gas & pipeline operators</li>
<li>Municipalities & local government agencies</li>
<li>VDOT-funded infrastructure projects</li>
<li>Military & federal government facilities</li>
<li>Commercial real estate developers</li>
<li>Homeowners with utility exposure needs</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {"level":3} -->
<h3>Why Hydro Excavation Over Traditional Excavation?</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Traditional mechanical excavation with backhoes and trenchers risks striking buried utilities, causing outages, environmental damage, and serious injury. Hydro excavation eliminates this risk by using water and vacuum — no metal teeth, no rotating drums, no blind digging. The result is faster project completion, zero utility strikes, and full OSHA and VDOT compliance.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Call Beach HydroVac at <strong>757-510-5220</strong> for a free project quote. We serve Virginia Beach, Chesapeake, Norfolk, Suffolk, Portsmouth, Hampton, Newport News, and all Virginia markets.</p>
<!-- /wp:paragraph -->
`;

const HYDRO_EXCAVATION_SVC_CONTENT = `
<!-- wp:heading -->
<h2>Hydro Excavation Services — Virginia Beach & Hampton Roads, VA</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Beach HydroVac's hydro excavation service uses pressurized water and vacuum suction to safely excavate soil without mechanical equipment. This non-destructive excavation method protects underground utilities, reduces liability, and accelerates project timelines for contractors across Hampton Roads and Virginia.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>How Hydro Excavation Works</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Our hydrovac trucks carry two systems: a high-pressure water pump (typically 2,000–3,000 PSI) and a high-powered vacuum blower (typically 4,000–5,000 CFM). The water lance breaks up soil and creates a slurry; the vacuum hose immediately removes the slurry into the truck's debris tank. The result is a clean, precise excavation hole with zero collateral damage to surrounding infrastructure.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Hydro Excavation Applications</h3>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li><strong>Utility potholing</strong> — Expose gas lines, water mains, and fiber optic cables for visual verification</li>
<li><strong>New utility installation</strong> — Dig safe trenches for conduit, pipe, and cable without striking existing utilities</li>
<li><strong>Pre-construction utility verification</strong> — Confirm depths and locations before mechanical equipment breaks ground</li>
<li><strong>Emergency utility repairs</strong> — Rapidly expose a damaged utility for immediate access and repair</li>
<li><strong>Foundation excavation</strong> — Safe excavation near existing building foundations without vibration damage</li>
<li><strong>Environmental cleanup</strong> — Controlled excavation of contaminated soil without spreading contamination</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {"level":3} -->
<h3>Hydro Excavation in Virginia's Soil Conditions</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Hampton Roads presents unique soil challenges including sandy coastal soils, heavy clay, and high water table conditions. Beach HydroVac's equipment is configured for Virginia's specific conditions — our water heating capability allows cold-weather operations, and our high-capacity debris tanks (typically 12–15 cubic yards) minimize service trips on large projects.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Service Area</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>We provide hydro excavation services throughout Hampton Roads including Virginia Beach, Chesapeake, Norfolk, Portsmouth, Hampton, Newport News, and Suffolk. We also serve Richmond, Northern Virginia, and statewide for larger contract projects. Call <strong>757-510-5220</strong> for availability and pricing.</p>
<!-- /wp:paragraph -->
`;

const REMOTE_EXCAVATION_CONTENT = `
<!-- wp:heading -->
<h2>Remote Excavation Services — Virginia Beach & Hampton Roads, VA</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Beach HydroVac's remote excavation service extends hydrovac capability to locations that are inaccessible to standard truck positioning. Using extended vacuum hose systems and remote water lances, we can excavate safely in confined spaces, across water features, down steep embankments, and through restricted access sites across Hampton Roads and Virginia.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>What Is Remote Excavation?</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Standard hydrovac trucks position near the excavation site and operate within a 200-foot hose radius. Remote excavation extends this to 400–600 feet using larger-diameter suction hoses and higher-capacity blower systems. The truck remains on accessible pavement or a staging area while the operator works at a remote location with the water lance and vacuum hose.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Remote Excavation Applications</h3>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li><strong>Waterway crossings</strong> — Excavate utilities beneath tidal creeks, wetlands, and coastal waterways without equipment entering the water</li>
<li><strong>Embankment work</strong> — Safe excavation on steep slopes where trucks cannot safely position</li>
<li><strong>Confined space entry</strong> — Work in utility vaults, pump stations, and underground structures without entering the confined space</li>
<li><strong>Protected areas</strong> — Excavate near trees, landscaping, and environmentally sensitive zones without equipment contact</li>
<li><strong>Congested urban sites</strong> — Operate from a street lane while excavating in a pedestrian zone or paved plaza</li>
<li><strong>Rail and roadway proximity</strong> — Stage equipment outside the right-of-way while working near active rail lines or highways</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {"level":3} -->
<h3>Hampton Roads Remote Excavation Projects</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The Hampton Roads region's coastal geography — with its numerous tidal creeks, wetlands, and waterway crossings — makes remote excavation particularly valuable. Beach HydroVac has completed remote excavation projects for utility installations along the Chesapeake Bay shoreline, beneath drainage ditches in Suffolk and Chesapeake, and in restricted military installation areas across the region.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Request Remote Excavation</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Remote excavation projects require site assessment to determine equipment positioning, hose routing, and water/vacuum logistics. Contact Beach HydroVac at <strong>757-510-5220</strong> to schedule a pre-job site visit. We serve all Hampton Roads cities and Virginia statewide for remote excavation projects.</p>
<!-- /wp:paragraph -->
`;

const SUE_LEVEL_A_CONTENT = `
<!-- wp:heading -->
<h2>SUE Level A Verification — Virginia Beach & Hampton Roads, VA</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Beach HydroVac provides Subsurface Utility Engineering (SUE) Level A verification services across Virginia, compliant with ASCE 38-22 standards and required for all VDOT-funded infrastructure projects. Our Level A service physically exposes underground utilities using hydro excavation, providing the highest-quality utility data available for design and construction teams.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>What Is SUE Level A?</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>ASCE 38-22 defines four Quality Levels (QL) for subsurface utility engineering. Quality Level A (QL-A) is the highest designation — it requires physical exposure and direct visual identification of utilities, including confirmation of horizontal position, depth, size, condition, material type, and spatial relationship to other utilities. QL-A data is typically collected using vacuum excavation or hydro excavation to expose the utility without mechanical damage.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>VDOT SUE Level A Requirements</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The Virginia Department of Transportation (VDOT) requires SUE Level A verification at all utility conflict locations on design-build and VDOT-funded highway projects. Beach HydroVac has completed Level A potholing for VDOT corridor projects, bridge widening, and highway interchange improvements across Hampton Roads and statewide. Our field crews coordinate directly with project SUE engineers to collect required data at each test hole location.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Our SUE Level A Process</h3>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li><strong>Pre-field coordination</strong> — Review utility records, One-Call markings, and project drawings to identify Level A locations</li>
<li><strong>Test hole excavation</strong> — Hydro excavate at each designated location to safely expose the utility</li>
<li><strong>Data collection</strong> — Record horizontal coordinates (GPS), depth, diameter, material type, and condition</li>
<li><strong>Survey</strong> — Locate exposed utility horizontally and vertically using survey-grade GPS or total station</li>
<li><strong>Restoration</strong> — Backfill and compact the test hole; restore surface to pre-excavation condition</li>
<li><strong>Documentation</strong> — Provide field sketches, photos, and data sheets for SUE engineer integration</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {"level":3} -->
<h3>Industries That Require SUE Level A</h3>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li>VDOT highway and bridge projects</li>
<li>Water and sewer main installation and relocation</li>
<li>Fiber optic and telecommunications expansion</li>
<li>Gas pipeline installation and replacement</li>
<li>Power line underground conversions</li>
<li>Commercial and municipal site development</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {"level":3} -->
<h3>Why Choose Beach HydroVac for SUE Level A</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Our technicians are trained in proper potholing technique to prevent utility damage during exposure — the most critical phase of Level A work. We carry full general liability and professional liability insurance, provide OSHA 10 certified field personnel, and have completed Level A projects alongside Virginia's leading SUE engineering firms. Call <strong>757-510-5220</strong> to discuss your Level A potholing requirements.</p>
<!-- /wp:paragraph -->
`;

// ── MAIN EXECUTION ───────────────────────────────────────────────────────────

const FIXES = [
    {
        id: 3468,
        label: 'Service Areas',
        content: SERVICE_AREAS_CONTENT,
        yoastTitle: 'Hydrovac Service Areas — Hampton Roads & Virginia | Beach HydroVac',
        yoastDesc: 'Beach HydroVac serves Virginia Beach, Chesapeake, Norfolk, Suffolk, Hampton, Newport News, Portsmouth & all of Virginia with hydro excavation services. Call 757-510-5220.',
    },
    {
        id: 3332,
        label: 'Services',
        content: SERVICES_CONTENT,
        yoastTitle: 'Hydrovac & Hydro Excavation Services Virginia Beach, VA | Beach HydroVac',
        yoastDesc: 'Full hydrovac services: hydro excavation, potholing, daylighting, slot trenching, SUE Level A & vacuum excavation across Hampton Roads, VA. Veteran-owned. 757-510-5220.',
    },
    {
        id: 3456,
        label: 'Services / Hydro Excavation',
        content: HYDRO_EXCAVATION_SVC_CONTENT,
        yoastTitle: 'Hydro Excavation Service Virginia Beach, VA | Beach HydroVac',
        yoastDesc: 'Professional hydro excavation service in Virginia Beach & Hampton Roads. Safe, non-destructive utility exposure. Veteran-owned Beach HydroVac. Call 757-510-5220.',
    },
    {
        id: 3460,
        label: 'Services / Remote Excavation',
        content: REMOTE_EXCAVATION_CONTENT,
        yoastTitle: 'Remote Excavation Services Virginia Beach, VA | Beach HydroVac',
        yoastDesc: 'Remote hydrovac excavation for confined spaces, waterway crossings & inaccessible sites across Hampton Roads, VA. Beach HydroVac. Call 757-510-5220.',
    },
    {
        id: 3461,
        label: 'Services / SUE Level A',
        content: SUE_LEVEL_A_CONTENT,
        yoastTitle: 'SUE Level A Verification Virginia — ASCE 38-22 Potholing | Beach HydroVac',
        yoastDesc: 'ASCE 38-22 SUE Level A utility verification across Virginia. VDOT-compliant potholing & hydro excavation. Veteran-owned Beach HydroVac. Call 757-510-5220.',
    },
];

console.log('\n════════════════════════════════════════════');
console.log('  BeachHydroVac — Fix Not Indexed Pages');
console.log('════════════════════════════════════════════\n');

let passed = 0, failed = 0;

for (const fix of FIXES) {
    process.stdout.write(`  Updating: ${fix.label} (ID ${fix.id})... `);
    try {
        const result = await updatePage(fix.id, fix.content, null, fix.yoastTitle, fix.yoastDesc);
        if (result.ok) {
            console.log(`✅ ${result.words} words`);
            passed++;
        } else {
            console.log(`❌ API error`);
            failed++;
        }
    } catch (e) {
        console.log(`❌ ${e.message}`);
        failed++;
    }
    await new Promise(r => setTimeout(r, 500));
}

// Noindex author archive via Yoast REST API
console.log('\n  Noindexing author archive...');
try {
    const r = await fetch('https://beachhydrovac.com/wp-json/yoast/v1/configuration', {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ 'noindex-author-wpseo': true })
    });
    if (r.ok) {
        console.log('  ✅ Author archive set to noindex via Yoast API');
    } else {
        // Fallback: update option via WP options endpoint
        console.log('  ℹ️  Yoast API not available — set manually:');
        console.log('     Yoast SEO → Search Appearance → Archives → Author archives → Disabled');
    }
} catch (e) {
    console.log('  ℹ️  Set manually: Yoast SEO → Search Appearance → Archives → Author archives → Disabled');
}

console.log(`\n════════════════════════════════════════════`);
console.log(`  Done: ${passed} updated, ${failed} failed`);
console.log(`════════════════════════════════════════════\n`);
console.log('Next steps:');
console.log('  1. Go to WordPress → Yoast SEO → Search Appearance → Archives');
console.log('     Set "Author archives" to "Disabled" (noindex)');
console.log('  2. Resubmit sitemaps at seo.beachhydrovac.com/deindex-recovery');
console.log('  3. Wait 2–4 weeks then click "Validate Fix" in GSC\n');
