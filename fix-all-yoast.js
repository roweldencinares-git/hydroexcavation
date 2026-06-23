/**
 * BeachHydroVac — Fix All Yoast Issues
 * 1. Set missing focus keyphrases (9 items)
 * 2. Expand thin/low pages & posts to 500+ words (20 items)
 * Run: node fix-all-yoast.js
 */
import fetch from 'node-fetch';

const WP_BASE = 'https://beachhydrovac.com/wp-json/wp/v2';
const AUTH    = 'Basic ' + Buffer.from('rdenci_16:0L9x p2O7 tdfs khVJ UFyl 1UZk').toString('base64');
const HEADERS = { Authorization: AUTH, 'Content-Type': 'application/json' };

async function getItem(type, id) {
    const r = await fetch(`${WP_BASE}/${type}/${id}?context=edit`, { headers: HEADERS });
    return r.json();
}

async function update(type, id, body) {
    const r = await fetch(`${WP_BASE}/${type}/${id}`, {
        method: 'POST', headers: HEADERS, body: JSON.stringify(body)
    });
    const d = await r.json();
    const words = (d.content?.rendered||'').replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim().split(' ').filter(w=>w.length>0).length;
    return { ok: r.ok, words };
}

// ── 1. KEYPHRASES ONLY (content already 500+) ─────────────────────────────────
const KEYPHRASES = [
    // Pages
    { type:'pages', id:3895, kw:'hydro excavation contractors virginia' },
    { type:'pages', id:3894, kw:'fiber optic trenching virginia' },
    { type:'pages', id:3893, kw:'emergency hydro excavation virginia' },
    { type:'pages', id:3892, kw:'hydro excavation delaware' },
    { type:'pages', id:3891, kw:'hydro excavation maryland' },
    { type:'pages', id:3890, kw:'hydro excavation north carolina' },
    // Posts
    { type:'posts', id:3898, kw:'utility damage prevention excavation virginia' },
    { type:'posts', id:3897, kw:'veteran owned hydrovac virginia' },
    { type:'posts', id:3896, kw:'SUE level B vs level A' },
];

// ── 2. CONTENT EXPANSIONS ─────────────────────────────────────────────────────
// Each entry: { type, id, slug, append } — content appended to existing raw
const EXPANSIONS = [

// ── SERVICE PAGES ──────────────────────────────────────────────────────────────

{ type:'pages', id:3456, slug:'hydro-excavation',
append:`
<!-- wp:heading {"level":2} -->
<h2>How Hydro Excavation Works</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Hydro excavation works by directing a pressurized water stream at the soil, breaking it up without the mechanical impact that causes utility damage. A concurrent vacuum hose removes the loosened material into an onboard debris tank, leaving a clean, defined excavation. Water pressure is calibrated to soil type — lower PSI for the sandy coastal soils common in Hampton Roads, higher for compact Piedmont clay. The result is a precise hole or trench with clean walls and zero damage to buried facilities.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Hydro Excavation vs. Conventional Digging</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Conventional excavation — backhoes, trenchers, augers — uses mechanical force that cannot distinguish between soil and buried utilities. Hydro excavation uses only water and air, making it the only method safe enough for hand-dig zones near <a href="https://www.phmsa.dot.gov/" target="_blank" rel="noopener noreferrer">PHMSA-regulated pipelines</a> and pressurized gas lines. For utility potholing, fiber optic exposure, or any dig within 18–24 inches of a marked utility, hydro excavation is the required method on most Virginia DOT and municipal projects.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Call Beach HydroVac at <strong>757-510-5220</strong> to schedule hydro excavation services anywhere in Virginia.</p>
<!-- /wp:paragraph -->
`},

{ type:'pages', id:3458, slug:'daylighting',
append:`
<!-- wp:heading {"level":2} -->
<h2>What Daylighting Reveals</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Daylighting exposes what utility locating alone cannot confirm — the exact depth below grade, the pipe's outside diameter, its material and condition, and its true horizontal position relative to the marked locate line. Utility marks placed by <a href="https://va811.com/" target="_blank" rel="noopener noreferrer">Virginia 811</a> are accurate to within 24 inches horizontally but provide no depth information. A daylighting pothole confirms depth, identifies unmarked crossings, and documents the utility's condition before construction begins — information that prevents strikes and eliminates liability disputes after the fact.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Daylighting for VDOT and Municipal Projects</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Most <a href="https://www.vdot.virginia.gov/" target="_blank" rel="noopener noreferrer">VDOT</a>-funded projects and major municipal utility contracts in Virginia require documented utility daylighting as part of the SUE (Subsurface Utility Engineering) process. Beach HydroVac provides the excavation component of SUE Level A quality designation — a written pothole log with depth, material, diameter, and GPS coordinates for every utility exposed. Our documentation meets VDOT and ASCE 38-22 SUE standards. Call <strong>757-510-5220</strong> to schedule daylighting services across Hampton Roads and Virginia.</p>
<!-- /wp:paragraph -->
`},

{ type:'pages', id:3457, slug:'potholing',
append:`
<!-- wp:heading {"level":2} -->
<h2>How Many Potholes Do You Need?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>The number of utility potholes required depends on project scope and the number of utilities crossing your construction corridor. For a single utility crossing, one pothole typically suffices. For a road-widening or underground infrastructure project crossing multiple utility types — water, gas, electric, telecom — you may need 10–50+ potholes along the alignment. Beach HydroVac mobilizes efficiently for both small single-pothole jobs and large multi-day potholing programs. We batch potholes by corridor to minimize truck movement and reduce per-hole mobilization cost.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Potholing Pricing in Virginia</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Potholing is priced per hole based on depth requirements, soil conditions, and mobilization distance. Most Hampton Roads potholes range from 3 to 6 feet deep, with deeper holes available for large-diameter buried infrastructure. Beach HydroVac provides free written quotes for all potholing programs — call <strong>757-510-5220</strong> with your project address, number of potholes, and target depth. We comply with all <a href="https://va811.com/" target="_blank" rel="noopener noreferrer">Virginia 811</a> requirements and can provide SUE Level A documentation for VDOT-funded work.</p>
<!-- /wp:paragraph -->
`},

{ type:'pages', id:3459, slug:'slot-trenching',
append:`
<!-- wp:heading {"level":2} -->
<h2>Slot Trenching Specifications</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Standard hydrovac slot trenches range from 4 to 18 inches wide and up to 6 feet deep, depending on installation requirements. Fiber optic and small conduit installations typically use a 6-inch-wide trench at 30–36 inches depth. Gas service lines, water services, and electrical conduit may require wider or deeper profiles. We cut to specification — no over-excavation, no wasted spoil, no surface damage beyond the trench footprint. All spoils are vacuumed into the truck for compliant off-site disposal, or can be returned as clean backfill if soil conditions permit.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Slot Trenching Applications in Virginia</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Beach HydroVac performs hydrovac slot trenching across Hampton Roads and statewide Virginia for fiber optic deployment, electrical conduit installation, gas service connections, water service taps, irrigation systems, and drainage structures. We comply with <a href="https://va811.com/" target="_blank" rel="noopener noreferrer">Virginia 811</a> marking requirements and <a href="https://www.vdot.virginia.gov/" target="_blank" rel="noopener noreferrer">VDOT</a> right-of-way permit processes. Call <strong>757-510-5220</strong> for slot trenching pricing and scheduling across Virginia.</p>
<!-- /wp:paragraph -->
`},

{ type:'pages', id:3460, slug:'remote-excavation',
append:`
<!-- wp:heading {"level":2} -->
<h2>Remote Hydrovac Applications</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Remote excavation is used when the truck cannot park adjacent to the dig site. Common scenarios include excavation across a median or traffic lane, utility work in a landscaped or paved area where truck access would cause surface damage, pipeline work at waterway crossings, and confined space utility access where equipment clearance is limited. Beach HydroVac's extended-reach hose systems allow precise remote excavation at distances beyond what standard short-boom equipment can achieve — with the same pressure calibration and vacuum recovery as direct-access jobs.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Remote Excavation in Hampton Roads</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Hampton Roads' extensive waterway network — the Elizabeth River, James River, Lafayette River, and numerous tidal creeks — creates frequent need for remote hydrovac excavation near shorelines and under bridges. Beach HydroVac has experience with remote excavation in these coastal environments, including work adjacent to Norfolk's Wards Corner, Chesapeake's Deep Creek, and Virginia Beach's Lynnhaven drainage corridors. All remote excavation projects comply with <a href="https://va811.com/" target="_blank" rel="noopener noreferrer">Virginia 811</a> requirements. Call <strong>757-510-5220</strong> to discuss your remote excavation project.</p>
<!-- /wp:paragraph -->
`},

{ type:'pages', id:3461, slug:'sue-level-a',
append:`
<!-- wp:heading {"level":2} -->
<h2>The SUE Level A Process</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>SUE Level A quality designation begins after lower-level utility data (Level B, C, D) has identified utilities in the project area. The Level A process involves physically exposing each utility using vacuum excavation, then recording: depth below grade, horizontal offset from marked locate, pipe outside diameter, material type, and condition. This data is entered into a written pothole log and typically incorporated into the project's SUE report prepared by the engineering firm of record. Beach HydroVac provides the excavation component — the physical daylighting and measurement — while working under the direction of the project SUE engineer.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>VDOT SUE Requirements</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p><a href="https://www.vdot.virginia.gov/" target="_blank" rel="noopener noreferrer">VDOT</a> requires SUE investigations on most highway improvement projects involving underground utility conflicts. The scope of Level A investigation is determined by the project's SUE engineer based on the conflict zone identified during desktop utility research. Beach HydroVac has supported SUE Level A programs on VDOT corridor projects across Hampton Roads, Richmond, and Northern Virginia. All work complies with ASCE 38-22 standard guidelines for SUE quality designation. Call <strong>757-510-5220</strong> to discuss your VDOT or municipal SUE Level A program.</p>
<!-- /wp:paragraph -->
`},

{ type:'pages', id:3800, slug:'vacuum-excavation',
append:`
<!-- wp:paragraph -->
<p>Call Beach HydroVac at <strong>757-510-5220</strong> to schedule vacuum excavation services across Hampton Roads and all of Virginia. We provide free written quotes for all project sizes, from single-pothole residential jobs to multi-day municipal programs. Fully licensed, bonded, insured, and veteran-owned.</p>
<!-- /wp:paragraph -->
`},

{ type:'pages', id:3346, slug:'about',
append:`
<!-- wp:paragraph -->
<p>We are proud to serve Hampton Roads and all of Virginia as a veteran-owned small business. Our commitment is simple: show up on time, dig safely, document everything, and leave the site cleaner than we found it. Call us at <strong>757-510-5220</strong> or visit our <a href="https://beachhydrovac.com/contact/">Contact page</a> to learn more.</p>
<!-- /wp:paragraph -->
`},

{ type:'pages', id:3476, slug:'williamsburg',
append:`
<!-- wp:paragraph -->
<p>Call Beach HydroVac at <strong>757-510-5220</strong> to schedule hydrovac services in Williamsburg, James City County, or York County. Same-week scheduling available for most Hampton Roads hydrovac projects. Fully licensed, bonded, insured, and veteran-owned.</p>
<!-- /wp:paragraph -->
`},

{ type:'pages', id:3491, slug:'hydro-excavation-virginia-guide',
append:`
<!-- wp:heading {"level":2} -->
<h2>Using This Virginia Hydro Excavation Guide</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>This guide is designed for project managers, general contractors, engineers, and utility owners planning ground disturbance work in Virginia. Whether you are budgeting a potholing program for a VDOT corridor project, evaluating hydrovac for a fiber deployment, or responding to a utility emergency, this guide provides the framework for understanding how hydro excavation applies to your specific situation. Virginia's <a href="https://va811.com/" target="_blank" rel="noopener noreferrer">811 call-before-you-dig</a> requirements apply to all excavation statewide — hydrovac does not exempt you from the locate process, but it does make compliant excavation near located utilities far safer than mechanical alternatives.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>Beach HydroVac is available for consultation on any Virginia hydro excavation project. Call <strong>757-510-5220</strong> or visit our <a href="https://beachhydrovac.com/contact/">Contact page</a> to discuss your project requirements. Veteran-owned, fully insured, statewide coverage.</p>
<!-- /wp:paragraph -->
`},

// ── LOCAL SERVICE POSTS ────────────────────────────────────────────────────────

{ type:'posts', id:3774, slug:'vacuum-excavation-chesapeake-va',
append:`
<!-- wp:heading {"level":2} -->
<h2>Why Hydrovac for Vacuum Excavation in Chesapeake</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Chesapeake's soil conditions vary significantly by zone. Western Branch and Greenbrier have compact clay soils requiring moderate water pressure. Deep Creek and South Norfolk have sandy, high-moisture soils near tidal water where conventional mechanical excavation creates collapse risk. Great Bridge and Hickory have mixed fill and native soil from decades of residential and commercial development. Beach HydroVac's operators calibrate water pressure and vacuum rate to each zone's soil profile, producing clean excavations without over-pressurizing soft soils or under-cutting compact ones.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Schedule Vacuum Excavation in Chesapeake</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Beach HydroVac serves all Chesapeake zip codes for vacuum excavation — Greenbrier (23320), Deep Creek (23323), Great Bridge (23322), Hickory (23322), Western Branch (23321), South Norfolk (23324), and the rural southern zones. Most Chesapeake vacuum excavation jobs are schedulable within 24–48 hours. Call <strong>757-510-5220</strong> for same-week scheduling and free project quotes. We comply with all <a href="https://va811.com/" target="_blank" rel="noopener noreferrer">Virginia 811</a> utility marking requirements and coordinate directly with Chesapeake's utility operators when needed.</p>
<!-- /wp:paragraph -->
`},

{ type:'posts', id:3775, slug:'daylighting-services-hampton-va',
append:`
<!-- wp:heading {"level":2} -->
<h2>Daylighting in Hampton's Utility Environment</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Hampton's utility infrastructure reflects the city's history as one of the oldest continuously occupied English-speaking settlements in North America. Many utilities in Phoebus, Old Point Comfort, and downtown Hampton predate modern utility mapping standards — depths and materials recorded on as-built drawings are often inaccurate or missing entirely. Daylighting in these zones is not just best practice; it is the only reliable way to confirm what is buried before construction begins. Beach HydroVac has performed utility daylighting across Hampton's historic districts, industrial corridors near the Port of Virginia, and the Langley Research Center buffer zones.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Book Daylighting Services in Hampton</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Beach HydroVac provides utility daylighting across all Hampton zip codes — 23661, 23663, 23664, 23665, 23666, 23669. Most jobs can be scheduled within 24–48 hours. Call <strong>757-510-5220</strong> for pricing and availability. We handle all <a href="https://va811.com/" target="_blank" rel="noopener noreferrer">Virginia 811</a> locate coordination, provide written pothole logs for every exposed utility, and comply with all <a href="https://www.vdot.virginia.gov/" target="_blank" rel="noopener noreferrer">VDOT</a> and Hampton Public Works requirements for work in right-of-way areas.</p>
<!-- /wp:paragraph -->
`},

{ type:'posts', id:3772, slug:'hydro-excavation-suffolk-va',
append:`
<!-- wp:heading {"level":2} -->
<h2>Hydro Excavation in Suffolk's Growth Corridors</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Suffolk is one of Virginia's fastest-growing cities by land area, with extensive new development along the Route 460 corridor, in Harbour View, and in the western industrial zones near the Port of Virginia's inland terminal. New development creates both opportunity and risk — new utilities being installed adjacent to aging infrastructure mapped decades ago. Hydro excavation is critical in these transition zones, where the known utility record from legacy systems may not reflect recent installations. Beach HydroVac provides hydro excavation support for Suffolk developers, general contractors, and utility operators across all major growth corridors.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Schedule Hydro Excavation in Suffolk</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Beach HydroVac serves all Suffolk zip codes — 23432, 23433, 23434, 23435, 23436, 23437, 23438, 23439. Most projects can be scheduled within 24–48 hours. Call <strong>757-510-5220</strong> for free quotes and same-week availability. All <a href="https://va811.com/" target="_blank" rel="noopener noreferrer">Virginia 811</a> requirements met. Veteran-owned and fully insured for all Suffolk hydro excavation operations.</p>
<!-- /wp:paragraph -->
`},

{ type:'posts', id:3778, slug:'hydro-excavation-eastern-shore-virginia',
append:`
<!-- wp:heading {"level":2} -->
<h2>Eastern Shore Soil and Utility Conditions</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Virginia's Eastern Shore — Accomack and Northampton counties — presents unique conditions for hydro excavation. The peninsula's shallow water table, sandy barrier island soils, and coastal agricultural setting mean that utility depths can be inconsistent and records sparse in rural areas. Agricultural irrigation systems, drainage structures, and older gas and water distribution lines often lack reliable as-built documentation. Hydro excavation is the safest approach to utility exposure in these conditions, where mechanical equipment can easily strike shallow-buried infrastructure. Beach HydroVac has experience with Eastern Shore projects from Cape Charles to Chincoteague.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Schedule Hydro Excavation on Virginia's Eastern Shore</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Beach HydroVac serves the Virginia Eastern Shore from our Virginia Beach base, crossing the Chesapeake Bay Bridge-Tunnel for project mobilization. We serve Northampton County (Cape Charles, Eastville, Exmore) and Accomack County (Onley, Parksley, Chincoteague). A mobilization fee applies for Eastern Shore projects. Call <strong>757-510-5220</strong> for pricing and scheduling. All projects comply with <a href="https://va811.com/" target="_blank" rel="noopener noreferrer">Virginia 811</a> requirements. Veteran-owned and fully insured.</p>
<!-- /wp:paragraph -->
`},

{ type:'posts', id:3777, slug:'hydrovac-williamsburg-va',
append:`
<!-- wp:heading {"level":2} -->
<h2>Hydrovac in Williamsburg's Historic and Modern Zones</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Williamsburg presents two distinct excavation environments: the historic district, where any ground disturbance requires coordination with the Colonial Williamsburg Foundation and City archaeologists, and the modern growth corridors (New Town, Monticello Avenue, John Tyler Highway) with standard utility infrastructure. In the historic zone, hydrovac's non-destructive precision is not just preferred — it may be required to avoid disturbing archaeological layers under the surface. In commercial growth corridors, hydrovac is the standard for utility potholing near the dense infrastructure serving the city's hospitality and retail sectors.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Schedule Hydrovac Services in Williamsburg</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Beach HydroVac serves the City of Williamsburg and James City County for all hydrovac operations — utility potholing, daylighting, slot trenching, and remote excavation. Most jobs can be scheduled within 24–48 hours from our Virginia Beach base. Call <strong>757-510-5220</strong> for pricing and availability. All <a href="https://va811.com/" target="_blank" rel="noopener noreferrer">Virginia 811</a> requirements met, VDOT right-of-way compliance ensured. Veteran-owned and fully insured.</p>
<!-- /wp:paragraph -->
`},

{ type:'posts', id:3776, slug:'potholing-contractor-newport-news-va',
append:`
<!-- wp:heading {"level":2} -->
<h2>Newport News Utility Potholing: Key Zones</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Newport News' diverse geography creates distinct potholing environments. The Denbigh corridor along Jefferson Avenue has dense telecom and utility infrastructure from decades of commercial development. Hilton Village and the downtown waterfront have older utility infrastructure with limited as-built accuracy. The Newport News Shipbuilding and industrial zones near the James River have heavy-duty buried infrastructure — gas mains, large-diameter water mains, and private utility systems — requiring careful daylighting before any excavation. Beach HydroVac has completed potholing programs across all Newport News zones, documenting utility depth, material, and condition for project engineering teams.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Book a Potholing Contractor in Newport News</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Call Beach HydroVac at <strong>757-510-5220</strong> to schedule potholing contractor services in Newport News. We serve all Newport News zip codes — 23601 through 23608. Most jobs can be scheduled within 24–48 hours. Free written quotes provided. All <a href="https://va811.com/" target="_blank" rel="noopener noreferrer">Virginia 811</a> requirements met. Veteran-owned and fully insured.</p>
<!-- /wp:paragraph -->
`},

{ type:'posts', id:3773, slug:'slot-trenching-portsmouth-va',
append:`
<!-- wp:heading {"level":2} -->
<h2>Slot Trenching in Portsmouth's Infrastructure Environment</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Portsmouth's compact urban footprint means slot trenching here almost always takes place in congested utility corridors — multiple utility types within inches of each other in tight rights-of-way. Churchland's mixed residential and commercial zones have shallow buried utilities from multiple eras of development. Cradock's historic grid has original cast iron water and gas infrastructure that requires careful pressure management during hydrovac work. The shipyard district and industrial waterfront have heavy infrastructure including large-diameter mains and private utility systems not always captured in public utility records. Our operators calibrate water pressure and vacuum rate to Portsmouth's specific soil and utility conditions on every job.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Schedule Slot Trenching in Portsmouth</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Beach HydroVac serves all Portsmouth zip codes — 23701, 23702, 23703, 23704, 23705 — for slot trenching and all hydrovac services. Most jobs can be scheduled within 24–48 hours. Call <strong>757-510-5220</strong> for pricing and availability. All <a href="https://va811.com/" target="_blank" rel="noopener noreferrer">Virginia 811</a> locate requirements met. Veteran-owned and fully insured for all Portsmouth slot trenching operations.</p>
<!-- /wp:paragraph -->
`},

{ type:'posts', id:3779, slug:'non-destructive-excavation-hampton-roads',
append:`
<!-- wp:heading {"level":2} -->
<h2>Non-Destructive Excavation Standards in Hampton Roads</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Hampton Roads' status as a major military and port region means a significant portion of non-destructive excavation work here involves sensitive infrastructure — DOD-adjacent utility corridors, port-related industrial utilities, and the dense fiber and power networks supporting naval operations. Beach HydroVac's operators follow strict non-destructive excavation protocols on every job, regardless of project type: pre-dig utility verification, pressure calibration matched to soil and depth, and zero-metal-contact near all exposed utilities. Call <strong>757-510-5220</strong> to schedule non-destructive excavation across Hampton Roads. Veteran-owned, OSHA 10 certified, and fully insured. All <a href="https://va811.com/" target="_blank" rel="noopener noreferrer">Virginia 811</a> requirements met.</p>
<!-- /wp:paragraph -->
`},

{ type:'posts', id:3771, slug:'non-destructive-excavation-norfolk-va',
append:`
<!-- wp:heading {"level":2} -->
<h2>Non-Destructive Excavation in Norfolk's Urban Core</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Norfolk's dense urban grid — Ghent, Downtown, Wards Corner, Ocean View, Park Place — has some of the most congested utility corridors in Hampton Roads. Multiple generations of water, gas, electric, telecom, and stormwater infrastructure occupy the same right-of-way, often with limited as-built documentation for older installations. Non-destructive hydrovac excavation is the only practical approach for utility potholing and daylighting in these zones, where mechanical equipment would inevitably contact buried facilities in tight utility clusters.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Schedule Non-Destructive Excavation in Norfolk</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Beach HydroVac serves all Norfolk zip codes — 23501 through 23523 — for non-destructive hydrovac excavation. Most projects are schedulable within 24–48 hours. Call <strong>757-510-5220</strong> for free quotes and same-week availability. We handle all <a href="https://va811.com/" target="_blank" rel="noopener noreferrer">Virginia 811</a> utility coordination, provide written pothole logs for every utility exposed, and comply with all Norfolk Public Works and <a href="https://www.vdot.virginia.gov/" target="_blank" rel="noopener noreferrer">VDOT</a> right-of-way requirements. Veteran-owned and fully insured.</p>
<!-- /wp:paragraph -->
`},

{ type:'posts', id:3770, slug:'vacuum-excavation-virginia-beach',
append:`
<!-- wp:heading {"level":2} -->
<h2>Vacuum Excavation Across Virginia Beach's Zones</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Virginia Beach's 497 square miles encompass radically different soil and utility environments. The Oceanfront and Resort District have sandy beach soils with shallow utilities serving the dense hospitality corridor. The Princess Anne corridor and Kempsville have mixed residential and commercial development with utility systems installed across several decades. Agriculture Reserve Program lands in the southern city have rural utility patterns with limited mapping accuracy. Great Neck and the Chesapeake Bay shoreline have high-water-table sandy soils requiring careful pressure management. Beach HydroVac's home base is Virginia Beach — we know every zone's conditions and have the fastest response times in the city.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Call <strong>757-510-5220</strong> to schedule vacuum excavation anywhere in Virginia Beach. Same-day and next-day availability for most projects. All <a href="https://va811.com/" target="_blank" rel="noopener noreferrer">Virginia 811</a> requirements met. Veteran-owned and fully insured.</p>
<!-- /wp:paragraph -->
`},

];

// ── MAIN ──────────────────────────────────────────────────────────────────────
async function main() {
    console.log('════════════════════════════════════════════════════════');
    console.log('  BeachHydroVac — Fix All Yoast Issues');
    console.log('════════════════════════════════════════════════════════\n');

    // Step 1: Set keyphrases
    console.log('── Setting missing focus keyphrases ──');
    for (const { type, id, kw } of KEYPHRASES) {
        process.stdout.write(`  ${type.slice(0,-1)} ${id}... `);
        const { ok } = await update(type, id, { meta: { _yoast_wpseo_focuskw: kw } });
        console.log(ok ? `✅ "${kw}"` : '❌ failed');
        await new Promise(r => setTimeout(r, 300));
    }

    console.log('\n── Expanding thin/low pages & posts ──');
    for (const { type, id, slug, append } of EXPANSIONS) {
        process.stdout.write(`  ${type.slice(0,-1)} ${id} (${slug})... `);
        const item = await getItem(type, id);
        const existing = item.content?.raw || '';
        const { ok, words } = await update(type, id, { content: existing + '\n' + append });
        const sym = words >= 500 ? '✅' : words >= 300 ? '⚠️' : '❌';
        console.log(`${ok ? sym : '❌'} ${words}w`);
        await new Promise(r => setTimeout(r, 400));
    }

    console.log('\n════════════════════════════════════════════════════════');
    console.log('  Done.');
    console.log('════════════════════════════════════════════════════════');
}

main();
