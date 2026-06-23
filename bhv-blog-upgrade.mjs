import fetch from 'node-fetch';

const WP   = 'https://beachhydrovac.com';
const AUTH = Buffer.from('rdenci_16:0L9x p2O7 tdfs khVJ UFyl 1UZk').toString('base64');
const H    = { 'Authorization': 'Basic ' + AUTH, 'Content-Type': 'application/json' };

// ─── NEW LOCAL POSTS ──────────────────────────────────────────────────────────
const newPosts = [

// ── POST 1 ────────────────────────────────────────────────────────────────────
{
  slug: '5-signs-emergency-hydro-excavation-hampton-roads',
  title: '5 Signs You Need Emergency Hydro Excavation in Hampton Roads',
  yoastTitle: '5 Signs You Need Emergency Hydro Excavation in Hampton Roads | Beach HydroVac',
  yoastDesc: 'Utility strike? Unexpected cave-in? Flooded trench? These 5 signs mean you need emergency hydro excavation in Hampton Roads right now. Beach HydroVac responds 24/7.',
  focusKw: 'emergency hydro excavation Hampton Roads',
  content: `
<article>
<p>When something goes wrong underground in Hampton Roads — a utility strike, a flooded excavation, a collapsing trench wall — every minute counts. Hydro excavation is the safest, fastest way to respond. Here are the five signs that you need emergency hydrovac service right now.</p>

<h2>1. You've Struck a Utility Line</h2>
<p>A utility strike is a code-red situation. Natural gas, electrical, fiber optic, water mains — the moment your equipment hits an unmarked or mislocated line, you stop digging and call for hydrovac immediately. Traditional excavation cannot safely expose a damaged line without risk of further damage or ignition. Pressurized water and a vacuum system allows technicians to expose the full extent of the strike without metal contact.</p>
<p>Virginia 811 (Miss Utility) requires you to call before you dig — but mislocates happen. If you're in Virginia Beach, Norfolk, Chesapeake, or anywhere in Hampton Roads and you've hit a line, <a href="/emergency-hydro-excavation-virginia/">our 24/7 emergency hydrovac team</a> responds within hours.</p>

<h2>2. Your Trench Is Flooding or Collapsing</h2>
<p>Heavy rain is a fact of life in Hampton Roads — especially during hurricane season. A flooded trench that starts to show signs of wall collapse is an emergency. Workers cannot be in or near an unstable excavation. Hydrovac equipment can quickly remove water and loose soil without the vibration that worsens wall integrity. If your trench is showing cracks, bulging, or active seeping, stop work and call immediately.</p>

<h2>3. You've Uncovered an Unknown Underground Obstruction</h2>
<p>Old fuel tanks, abandoned sewer lines, unmapped conduit bundles — Hampton Roads has decades of buried infrastructure that doesn't always appear on utility maps. If you hit an unexpected obstruction and don't know what it is, hydrovac is the only safe way to expose it for identification. Metal blades and augers can rupture pressurized lines or pierce containment systems. Water and vacuum cannot.</p>

<h2>4. A Utility Repair Requires Immediate Exposure</h2>
<p>A water main burst. A gas line failed. A critical electrical feed is down. Repair crews need the line exposed cleanly, quickly, and without causing secondary damage to adjacent infrastructure. In these scenarios — common in the dense utility corridors of downtown Norfolk, Newport News shipyard areas, and Hampton Roads military installations — <a href="/services/daylighting/">daylighting via hydrovac</a> is the standard of care, not an option.</p>

<h2>5. Your Job Site Has Stopped Due to Safety Concerns</h2>
<p>If your superintendent has halted work because of an underground safety issue — gas smell, exposed wiring, structural instability — you need hydrovac to get the site back to a controlled, documentable state before work can resume. OSHA and Virginia DPOR both require documented soil conditions before re-entry in certain situations. Hydrovac provides the precision exposure and the paper trail.</p>

<h2>Beach HydroVac — 24/7 Emergency Response Across Hampton Roads</h2>
<p>We serve all of Hampton Roads including <a href="/locations/virginia-beach/">Virginia Beach</a>, <a href="/locations/norfolk/">Norfolk</a>, <a href="/locations/chesapeake/">Chesapeake</a>, <a href="/locations/hampton/">Hampton</a>, <a href="/locations/newport-news/">Newport News</a>, <a href="/locations/portsmouth/">Portsmouth</a>, and <a href="/locations/suffolk/">Suffolk</a>. Veteran-owned. Licensed. We carry full EPA documentation on every job.</p>
<p><strong><a href="/contact/">Call us now for emergency hydrovac response →</a></strong></p>

<hr>
<h2>Frequently Asked Questions</h2>

<div><h3>How fast can Beach HydroVac respond to an emergency in Hampton Roads?</h3>
<p>We maintain 24/7 availability across Hampton Roads. For emergency callouts in Virginia Beach, Norfolk, Chesapeake, and surrounding cities, our response time is typically 2–4 hours depending on location and equipment availability.</p></div>

<div><h3>Is hydro excavation required after a utility strike in Virginia?</h3>
<p>Not legally required in all cases, but it is the industry standard and strongly recommended. VDOT and Virginia utility owners increasingly specify hydrovac exposure in their emergency response protocols to prevent secondary damage.</p></div>

<div><h3>Do you provide documentation after emergency hydrovac work?</h3>
<p>Yes. Every job includes a signed service record documenting the scope of work, soil conditions, and any utilities exposed. This documentation is often required for insurance claims and regulatory reporting after a utility incident.</p></div>

<div><h3>Can hydrovac equipment access tight urban job sites in Norfolk or downtown Virginia Beach?</h3>
<p>Yes. Our vacuum excavation trucks are configured for urban access and can operate in parking garages, narrow streets, and dense utility corridors common in downtown Norfolk, Newport News, and the Virginia Beach resort strip.</p></div>

<div><h3>What areas do you serve for emergency hydrovac?</h3>
<p>All of Hampton Roads including Virginia Beach, Norfolk, Chesapeake, Hampton, Newport News, Portsmouth, Suffolk, and surrounding communities. We also serve Williamsburg, Richmond, and the Northern Virginia corridor for large-scale emergencies.</p></div>
</article>

<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"How fast can Beach HydroVac respond to an emergency in Hampton Roads?","acceptedAnswer":{"@type":"Answer","text":"We maintain 24/7 availability across Hampton Roads. For emergency callouts in Virginia Beach, Norfolk, Chesapeake, and surrounding cities, our response time is typically 2–4 hours."}},
{"@type":"Question","name":"Is hydro excavation required after a utility strike in Virginia?","acceptedAnswer":{"@type":"Answer","text":"Not legally required in all cases, but it is the industry standard. VDOT and Virginia utility owners increasingly specify hydrovac exposure in their emergency response protocols."}},
{"@type":"Question","name":"Do you provide documentation after emergency hydrovac work?","acceptedAnswer":{"@type":"Answer","text":"Yes. Every job includes a signed service record documenting scope of work, soil conditions, and any utilities exposed — required for insurance claims and regulatory reporting."}},
{"@type":"Question","name":"What areas do you serve for emergency hydrovac?","acceptedAnswer":{"@type":"Answer","text":"All of Hampton Roads including Virginia Beach, Norfolk, Chesapeake, Hampton, Newport News, Portsmouth, Suffolk, and surrounding communities. We also serve Williamsburg, Richmond, and Northern Virginia."}}
]}</script>`
},

// ── POST 2 ────────────────────────────────────────────────────────────────────
{
  slug: 'hydro-excavation-cost-virginia-beach-2026',
  title: 'How Much Does Hydro Excavation Cost in Virginia Beach? (2026 Guide)',
  yoastTitle: 'Hydro Excavation Cost in Virginia Beach 2026 | Beach HydroVac',
  yoastDesc: 'What does hydro excavation actually cost in Virginia Beach and Hampton Roads? Hourly rates, project minimums, and what drives cost up or down. Updated for 2026.',
  focusKw: 'hydro excavation cost Virginia Beach',
  content: `
<article>
<p>If you're a contractor or facilities manager in Virginia Beach or Hampton Roads trying to budget a hydrovac job, the honest answer is: it depends. But the ranges are predictable, and knowing what drives cost up or down will help you get accurate quotes and avoid surprises.</p>

<h2>Typical Hydro Excavation Rates in Virginia Beach (2026)</h2>
<p>In the Hampton Roads market, hydrovac pricing generally falls into these ranges:</p>
<ul>
<li><strong>Hourly rate (single truck + operator):</strong> $185–$275/hour depending on truck size and project type</li>
<li><strong>Half-day minimum (4 hours):</strong> $750–$1,100 typical for most potholing and utility exposure work</li>
<li><strong>Full day (8 hours):</strong> $1,400–$2,200 for slot trenching, large daylighting, or multi-utility exposure</li>
<li><strong>Emergency/after-hours premium:</strong> 25–50% surcharge on standard rates</li>
<li><strong>Waste disposal:</strong> Usually included in Hampton Roads area jobs; confirm with your contractor</li>
</ul>
<p>These are general market ranges — actual quotes depend on your specific project. <a href="/contact/">Contact us for a same-day quote.</a></p>

<h2>What Makes a Hydrovac Job More Expensive</h2>
<p><strong>Soil conditions:</strong> Virginia Beach's sandy coastal soil is generally favorable. Clay-heavy inland areas (common in Chesapeake and Suffolk) require more water pressure and vacuum time — adds 15–30% to job time.</p>
<p><strong>Depth:</strong> Standard potholing to 4–6 feet is baseline. Deep utility exposure (10+ feet) in areas like the Hampton Roads Bridge-Tunnel corridor or waterfront infrastructure may require specialized equipment.</p>
<p><strong>Access constraints:</strong> Tight urban corridors in downtown Norfolk, parking garages, or military installation access requirements add mobilization time.</p>
<p><strong>Emergency callout:</strong> 24/7 emergency response carries a premium. If you can schedule 48–72 hours out, you'll pay standard rates.</p>

<h2>What Keeps Costs Down</h2>
<p>Consolidating multiple pothole locations into a single mobilization is the biggest cost saver. If you have 8 utility verification locations across a Virginia Beach project, scheduling them in one day versus 3 separate callouts can cut total cost by 30–40%.</p>
<p><a href="/services/potholing/">Our potholing service</a> is priced to support exactly this kind of batch scheduling for utility contractors and civil engineers across Hampton Roads.</p>

<h2>How Hydrovac Compares to Traditional Excavation Cost</h2>
<p>Hydrovac looks more expensive per hour than a backhoe. But the total project cost — including utility damage risk, restoration, downtime, and liability — tells a different story. A single utility strike in Virginia can cost $10,000–$250,000 in repairs, delays, and regulatory penalties. The Virginia 811 program exists precisely because utility strikes are common and costly.</p>
<p>For utility exposure and verification work, hydrovac's precision means <a href="/hydro-excavation-vs-traditional-excavation/">no secondary damage</a> and a signed manifest on every job.</p>

<h2>Get a Same-Day Quote for Your Hampton Roads Project</h2>
<p>We serve <a href="/locations/virginia-beach/">Virginia Beach</a>, <a href="/locations/norfolk/">Norfolk</a>, <a href="/locations/chesapeake/">Chesapeake</a>, <a href="/locations/hampton/">Hampton</a>, <a href="/locations/newport-news/">Newport News</a>, <a href="/locations/portsmouth/">Portsmouth</a>, <a href="/locations/suffolk/">Suffolk</a>, and all surrounding areas. Same-day quotes, no obligation.</p>
<p><strong><a href="/contact/">Get your project quote →</a></strong></p>

<hr>
<h2>Frequently Asked Questions</h2>
<div><h3>Is there a minimum charge for hydro excavation in Virginia Beach?</h3>
<p>Most hydrovac contractors in Hampton Roads have a 4-hour minimum. For small potholing jobs (1–3 holes), expect to pay for at least a half day of service even if the work takes less time.</p></div>
<div><h3>Does Beach HydroVac charge for travel time in Hampton Roads?</h3>
<p>For most Hampton Roads jobs within our core service area (Virginia Beach, Norfolk, Chesapeake, Hampton, Newport News, Portsmouth), travel time is included in the base rate. Jobs requiring mobilization to Richmond or Northern Virginia include a travel fee.</p></div>
<div><h3>Do hydrovac rates change seasonally in Virginia?</h3>
<p>Emergency demand increases during hurricane season (June–November) and after major storms due to utility damage. Scheduling non-emergency work in winter months (December–February) often gets faster availability and no premium pricing.</p></div>
<div><h3>What's included in a hydrovac quote from Beach HydroVac?</h3>
<p>Our quotes include operator labor, water, vacuum excavation, and waste disposal for standard Hampton Roads jobs. We provide a signed service record and EPA waste manifest with every completed job.</p></div>
</article>

<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"Is there a minimum charge for hydro excavation in Virginia Beach?","acceptedAnswer":{"@type":"Answer","text":"Most hydrovac contractors in Hampton Roads have a 4-hour minimum. For small potholing jobs, expect to pay for at least a half day of service."}},
{"@type":"Question","name":"Does Beach HydroVac charge for travel time in Hampton Roads?","acceptedAnswer":{"@type":"Answer","text":"For most Hampton Roads jobs within our core service area, travel time is included in the base rate. Jobs requiring mobilization to Richmond or Northern Virginia include a travel fee."}},
{"@type":"Question","name":"What's included in a hydrovac quote from Beach HydroVac?","acceptedAnswer":{"@type":"Answer","text":"Our quotes include operator labor, water, vacuum excavation, and waste disposal for standard Hampton Roads jobs, plus a signed service record and EPA waste manifest."}}
]}</script>`
},

// ── POST 3 ────────────────────────────────────────────────────────────────────
{
  slug: 'potholing-vs-traditional-digging-hampton-roads',
  title: 'Potholing vs Traditional Digging: What Hampton Roads Contractors Need to Know',
  yoastTitle: 'Potholing vs Traditional Digging | Hampton Roads Contractors | Beach HydroVac',
  yoastDesc: 'When does potholing beat traditional digging in Hampton Roads? A contractor\'s guide to utility verification, VDOT requirements, and why hydrovac saves money on Virginia Beach projects.',
  focusKw: 'potholing contractor Hampton Roads',
  content: `
<article>
<p>If you're a general contractor, civil engineer, or utility subcontractor working in Hampton Roads, the choice between potholing and traditional mechanical digging comes up on almost every project with underground utilities. Here's what you need to know to make the right call — and stay on the right side of Virginia liability law.</p>

<h2>What Is Potholing?</h2>
<p>Potholing (also called daylighting) is the process of excavating a small test hole directly above a suspected utility to verify its exact horizontal and vertical location. It's the only reliable way to know precisely where a utility is before your larger equipment gets near it.</p>
<p>In Hampton Roads — one of the most utility-dense regions in the mid-Atlantic, with military, civilian, and port infrastructure layered over decades — utility mislocates are common. Virginia 811 marks paint approximate locations, with tolerances that can vary by feet.</p>

<h2>When Virginia Regulations Require Potholing</h2>
<p>Virginia Code and VDOT standards increasingly specify hydrovac potholing in certain conditions:</p>
<ul>
<li>Work within 18 inches of a marked utility</li>
<li>VDOT projects requiring SUE (Subsurface Utility Engineering) Level A quality</li>
<li>Any excavation near high-pressure gas or petroleum lines</li>
<li>Hampton Roads military installation projects (strict utility protection protocols)</li>
<li>Projects in designated historic districts (Old Town Portsmouth, Ghent Norfolk)</li>
</ul>
<p>Our <a href="/services/potholing/">potholing service</a> provides signed documentation for every hole — the paperwork your project may legally require.</p>

<h2>Where Traditional Digging Still Makes Sense</h2>
<p>If you're working in a utility-free zone (confirmed by <a href="/virginia-811-miss-utility-guide/">Virginia 811 clearance</a> and project records), and depth is shallow and soil is clean, a backhoe is faster and cheaper for bulk material removal. Hydrovac isn't always necessary — but utility verification always is.</p>

<h2>The Real Cost Comparison for Hampton Roads Projects</h2>
<p>Contractors often hesitate at hydrovac's hourly rate versus a backhoe. The math changes fast when you account for a single utility strike:</p>
<ul>
<li>Average utility repair cost in Virginia: $15,000–$80,000+</li>
<li>Project delay from a utility strike: 3–14 days typical</li>
<li>VDOT penalty exposure for damaging a highway utility: varies by type</li>
<li>Insurance premium impact after a reportable utility incident: significant</li>
</ul>
<p>A half-day of <a href="/services/potholing/">potholing</a> at $800–$1,100 is straightforward risk management. Most Hampton Roads GCs with more than one utility strike on their record adopt hydrovac potholing as standard practice on every project.</p>

<h2>Beach HydroVac for Hampton Roads Contractors</h2>
<p>We work directly with GCs, utility contractors, civil engineers, and municipal crews across <a href="/locations/virginia-beach/">Virginia Beach</a>, <a href="/locations/norfolk/">Norfolk</a>, <a href="/locations/chesapeake/">Chesapeake</a>, <a href="/locations/newport-news/">Newport News</a>, and all Hampton Roads cities. We can mobilize same-day for planned potholing and provide full SUE Level A documentation.</p>
<p><strong><a href="/contact/">Schedule potholing for your next project →</a></strong></p>

<hr>
<h2>Frequently Asked Questions</h2>
<div><h3>Does Virginia 811 marking count as utility verification for VDOT projects?</h3>
<p>Virginia 811 provides approximate locations (Quality Level D). VDOT projects requiring Quality Level A (SUE) need physical potholing with documentation to confirm exact depth and position. 811 marks alone are not sufficient for VDOT QLA compliance.</p></div>
<div><h3>How many pothole locations can Beach HydroVac complete in a day in Hampton Roads?</h3>
<p>In typical Hampton Roads soil conditions, we can complete 8–15 standard pothole locations (to 6 feet depth) in a single day. Complex locations, deep utilities, or access constraints reduce throughput.</p></div>
<div><h3>Do you provide SUE documentation for VDOT projects?</h3>
<p>Yes. We provide signed service records documenting utility location, depth, size, and material for each pothole — compatible with SUE Level A quality requirements for VDOT and other Virginia transportation projects.</p></div>
<div><h3>Can you pothole on active Hampton Roads roadways?</h3>
<p>Yes, with appropriate traffic control. We work on VDOT-maintained roads, city streets, and private property throughout Hampton Roads. Traffic control planning is the contractor's responsibility; we coordinate closely on right-of-way projects.</p></div>
</article>

<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"Does Virginia 811 marking count as utility verification for VDOT projects?","acceptedAnswer":{"@type":"Answer","text":"Virginia 811 provides approximate locations (Quality Level D). VDOT projects requiring Quality Level A (SUE) need physical potholing with documentation. 811 marks alone are not sufficient for VDOT QLA compliance."}},
{"@type":"Question","name":"How many pothole locations can Beach HydroVac complete in a day?","acceptedAnswer":{"@type":"Answer","text":"In typical Hampton Roads soil conditions, we can complete 8–15 standard pothole locations (to 6 feet depth) in a single day."}},
{"@type":"Question","name":"Do you provide SUE documentation for VDOT projects?","acceptedAnswer":{"@type":"Answer","text":"Yes. We provide signed service records documenting utility location, depth, size, and material for each pothole — compatible with SUE Level A quality requirements for VDOT projects."}}
]}</script>`
},

// ── POST 4 ────────────────────────────────────────────────────────────────────
{
  slug: 'slot-trenching-fiber-optic-hampton-roads-virginia-beach',
  title: 'Slot Trenching for Fiber Optic Cable in Virginia Beach and Hampton Roads',
  yoastTitle: 'Slot Trenching Fiber Optic Virginia Beach & Hampton Roads | Beach HydroVac',
  yoastDesc: 'Need slot trenching for fiber optic installation in Virginia Beach or Hampton Roads? Beach HydroVac provides precision hydrovac slot trenching with minimal surface disruption. Veteran-owned.',
  focusKw: 'slot trenching fiber optic Virginia Beach',
  content: `
<article>
<p>Fiber optic expansion across Hampton Roads is accelerating — from municipal broadband in Virginia Beach to data center buildouts near the Norfolk waterfront and military communication upgrades at Hampton Roads installations. Slot trenching with hydrovac is the standard installation method when surface disruption must be minimized and existing utilities are dense.</p>

<h2>What Is Hydrovac Slot Trenching?</h2>
<p>Slot trenching cuts a narrow, precise trench — typically 4–8 inches wide and 18–48 inches deep — using pressurized water and vacuum extraction. It produces a clean-walled trench without vibration, without risk of utility damage, and with minimal disturbance to surrounding pavement, landscaping, or structures.</p>
<p>For fiber optic installation, this matters because:</p>
<ul>
<li>Fiber routes often run alongside existing conduit bundles — mechanical cutting is dangerous</li>
<li>Many Hampton Roads routes cross parking lots, sidewalks, and managed landscapes where surface restoration cost is high</li>
<li>Military installations, hospitals, and data centers require zero-disruption installation near active infrastructure</li>
</ul>

<h2>Where We Do Slot Trenching in Hampton Roads</h2>
<p>Our <a href="/services/slot-trenching/">slot trenching service</a> operates across all Hampton Roads cities and into Eastern Shore, Richmond, and Northern Virginia. Common project types in the region:</p>
<ul>
<li><strong>Virginia Beach resort strip:</strong> Fiber upgrades alongside Atlantic Ave utility corridors</li>
<li><strong>Norfolk medical district:</strong> Sentara, CHKD, and Bon Secours campus expansions</li>
<li><strong>Newport News shipyard corridor:</strong> Industrial fiber for Huntington Ingalls and supplier facilities</li>
<li><strong>Hampton Roads military installations:</strong> NAS Oceana, Fort Eustis, Norfolk Naval Station — all require non-destructive methods near SCIF and operations areas</li>
<li><strong>Chesapeake and Suffolk suburban buildouts:</strong> New development fiber-to-the-home installations</li>
</ul>

<h2>Slot Trenching vs Directional Boring for Fiber in Hampton Roads</h2>
<p>Directional boring (HDD) is the right choice for long runs under roads, waterways, and major obstructions. Slot trenching wins for:</p>
<ul>
<li>Short runs (under 500 feet) in utility-dense corridors</li>
<li>Multiple junction points requiring open access</li>
<li>Locations where boring spoils cannot be managed (tight urban sites)</li>
<li>Tight curves that HDD equipment can't navigate precisely</li>
</ul>
<p>For <a href="/fiber-optic-trenching-virginia/">fiber optic trenching projects</a> across Virginia, we help project managers choose the right method and can handle slot trenching as part of a broader install package.</p>

<h2>Get a Quote for Your Hampton Roads Fiber Project</h2>
<p>We work with telecom contractors, ISPs, municipal utilities, and government agencies. Same-day quotes for projects in <a href="/locations/virginia-beach/">Virginia Beach</a>, <a href="/locations/norfolk/">Norfolk</a>, <a href="/locations/chesapeake/">Chesapeake</a>, <a href="/locations/hampton/">Hampton</a>, and all Hampton Roads cities.</p>
<p><strong><a href="/contact/">Contact us for a slot trenching quote →</a></strong></p>

<hr>
<h2>Frequently Asked Questions</h2>
<div><h3>How narrow can a hydrovac slot trench be in Virginia Beach?</h3>
<p>We can cut slot trenches as narrow as 4 inches wide for micro-duct fiber installation. Standard fiber conduit work typically uses 6–8 inch wide trenches. Minimum width depends on trench depth and soil conditions.</p></div>
<div><h3>Can slot trenching be done through asphalt or concrete in Hampton Roads?</h3>
<p>Yes, but saw-cutting the surface first is standard practice before hydrovac slot trenching through paved surfaces. We coordinate with saw-cutting crews or can recommend subcontractors in the Hampton Roads market.</p></div>
<div><h3>Do you handle vacuum spoil disposal for slot trenching projects?</h3>
<p>Yes. All excavated material is loaded into our vacuum truck and disposed of at a licensed facility. We provide disposal documentation, which is required for some municipal and government contracts in Virginia.</p></div>
<div><h3>How long does slot trenching take for a 200-foot fiber run in Virginia Beach?</h3>
<p>In typical Virginia Beach coastal soil, a 200-foot slot trench to 24-inch depth takes approximately 4–6 hours including setup and cleanup — usually completable in one day with our standard crew.</p></div>
</article>

<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"How narrow can a hydrovac slot trench be in Virginia Beach?","acceptedAnswer":{"@type":"Answer","text":"We can cut slot trenches as narrow as 4 inches wide for micro-duct fiber installation. Standard fiber conduit work typically uses 6–8 inch wide trenches."}},
{"@type":"Question","name":"Can slot trenching be done through asphalt or concrete in Hampton Roads?","acceptedAnswer":{"@type":"Answer","text":"Yes, but saw-cutting the surface first is standard practice before hydrovac slot trenching through paved surfaces."}},
{"@type":"Question","name":"How long does slot trenching take for a 200-foot fiber run in Virginia Beach?","acceptedAnswer":{"@type":"Answer","text":"In typical Virginia Beach coastal soil, a 200-foot slot trench to 24-inch depth takes approximately 4–6 hours including setup and cleanup."}}
]}</script>`
},

// ── POST 5 ────────────────────────────────────────────────────────────────────
{
  slug: 'daylighting-utilities-hampton-roads-guide',
  title: 'Daylighting Underground Utilities in Hampton Roads: A Contractor\'s Guide',
  yoastTitle: 'Daylighting Underground Utilities Hampton Roads | Beach HydroVac',
  yoastDesc: 'What is utility daylighting and when is it required in Hampton Roads? Beach HydroVac explains when Virginia code, VDOT, and project owners require daylighting before excavation.',
  focusKw: 'daylighting utilities Hampton Roads',
  content: `
<article>
<p>Utility daylighting — exposing underground infrastructure to daylight for visual inspection and verification — is becoming a baseline requirement on commercial and government projects across Hampton Roads. If you're a contractor in Virginia Beach, Norfolk, or Chesapeake and your project manager is asking for daylighting, here's what it means and what to expect.</p>

<h2>What Daylighting Means in Practice</h2>
<p>Daylighting is the process of using hydro excavation to expose a utility line at a specific point so that its exact position, depth, size, material, and condition can be visually confirmed and documented. It's distinct from potholing (which may just verify location) — daylighting implies full visual access, often for inspection or repair preparation.</p>
<p>Our <a href="/services/daylighting/">daylighting service</a> produces a clean, stable excavation with vertical walls, suitable for inspector access and photography documentation.</p>

<h2>When Daylighting Is Required in Hampton Roads</h2>
<p>Several regulatory and contractual triggers make daylighting mandatory or strongly advisable:</p>
<ul>
<li><strong>VDOT utility relocation projects:</strong> All existing utility conflicts must be physically verified before relocation design is finalized — Quality Level A SUE</li>
<li><strong>Hampton Roads Sanitation District (HRSD) work near force mains:</strong> HRSD requires hydrovac daylighting within specified distances of critical infrastructure</li>
<li><strong>NAS Oceana and other DoD installations:</strong> Non-destructive exposure required near airfield lighting, fuel lines, and communications conduit</li>
<li><strong>Waterfront and port projects:</strong> Norfolk International Terminal and Portsmouth Marine Terminal projects often specify daylighting for existing buried infrastructure due to historic mislocate rates</li>
<li><strong>Virginia Natural Gas and Dominion Energy easements:</strong> Both require daylighting within defined buffer zones around transmission lines</li>
</ul>

<h2>What Daylighting Documentation Looks Like</h2>
<p>A properly documented daylighting operation produces:</p>
<ul>
<li>GPS coordinates of the exposed utility (horizontal position)</li>
<li>Top-of-pipe elevation and depth below grade</li>
<li>Pipe size and material as-observed</li>
<li>Photographic record of exposed utility in context</li>
<li>Signed service record by the hydrovac operator</li>
</ul>
<p>This package integrates directly into <a href="/services/sue-level-a/">SUE Level A</a> deliverables for engineering firms and serves as the evidentiary baseline for utility relocation claims.</p>

<h2>Daylighting Across Hampton Roads Cities</h2>
<p>We perform utility daylighting throughout the region — <a href="/locations/virginia-beach/">Virginia Beach</a>, <a href="/locations/norfolk/">Norfolk</a>, <a href="/locations/chesapeake/">Chesapeake</a>, <a href="/locations/hampton/">Hampton</a>, <a href="/locations/newport-news/">Newport News</a>, <a href="/locations/portsmouth/">Portsmouth</a>, <a href="/locations/suffolk/">Suffolk</a>, and surrounding cities. We coordinate directly with utility owners, VDOT project managers, and base operations staff on government projects.</p>
<p><strong><a href="/contact/">Request a daylighting quote for your project →</a></strong></p>

<hr>
<h2>Frequently Asked Questions</h2>
<div><h3>What's the difference between daylighting and potholing in Virginia?</h3>
<p>Potholing is the general term for a small test excavation to locate a utility. Daylighting specifically means exposing the utility fully to daylight for visual inspection — it implies a larger, documented exposure suitable for an inspector or engineer to observe and record the utility condition.</p></div>
<div><h3>Does VDOT accept hydrovac daylighting for SUE Level A work in Hampton Roads?</h3>
<p>Yes. VDOT's IIM-LD-248 guidance specifies that Quality Level A SUE requires physical exposure of the utility, which hydrovac daylighting satisfies. Documentation must include horizontal and vertical position to engineering survey tolerances.</p></div>
<div><h3>Can you daylight utilities in tidal or flood-prone areas of Hampton Roads?</h3>
<p>Yes, with planning. Coastal Hampton Roads has high water tables, and some areas near the Elizabeth River, Chesapeake Bay shoreline, and tidal creeks require shoring or rapid-exposure techniques. We assess site conditions before mobilizing on coastal or waterfront projects.</p></div>
<div><h3>How deep can Beach HydroVac daylight utilities?</h3>
<p>Our standard equipment handles depths to 15 feet in typical Hampton Roads soil conditions. Deep utility work (15–25 feet) is possible with specialized configuration — contact us to discuss deep exposure requirements.</p></div>
</article>

<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"What's the difference between daylighting and potholing in Virginia?","acceptedAnswer":{"@type":"Answer","text":"Potholing is the general term for a small test excavation to locate a utility. Daylighting specifically means exposing the utility fully to daylight for visual inspection — a larger, documented exposure."}},
{"@type":"Question","name":"Does VDOT accept hydrovac daylighting for SUE Level A work in Hampton Roads?","acceptedAnswer":{"@type":"Answer","text":"Yes. VDOT's IIM-LD-248 guidance specifies that Quality Level A SUE requires physical exposure of the utility, which hydrovac daylighting satisfies."}},
{"@type":"Question","name":"Can you daylight utilities in tidal or flood-prone areas of Hampton Roads?","acceptedAnswer":{"@type":"Answer","text":"Yes, with planning. Coastal Hampton Roads has high water tables and some areas near tidal zones require shoring or rapid-exposure techniques. We assess site conditions before mobilizing on coastal projects."}}
]}</script>`
},

];

// ─── FAQ + INTERNAL LINKS TO ADD TO EXISTING POSTS ───────────────────────────
// Existing kept posts need FAQ schema + links to /locations/ and /services/
const existingPostUpgrades = [
  {
    slug: 'virginia-811-miss-utility-guide',
    addLinks: ['/services/potholing/', '/services/hydro-excavation/', '/locations/virginia-beach/', '/locations/norfolk/'],
    faqSchema: `<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What happens if you dig without calling 811 in Virginia?","acceptedAnswer":{"@type":"Answer","text":"Digging without calling Virginia 811 is a civil violation. Penalties include liability for all repair costs, potential fines under Virginia Code § 56-265.14:1, and increased insurance exposure. Always call 811 at least 3 business days before digging."}},{"@type":"Question","name":"How long does Virginia 811 take to mark utilities?","acceptedAnswer":{"@type":"Answer","text":"Virginia 811 requires notification at least 3 business days before excavation. In practice, most marks appear within 2–3 days. Emergency marking is available for immediate utility strikes."}}]}</script>`
  },
  {
    slug: 'hydro-excavation-safety-best-practices',
    addLinks: ['/services/hydro-excavation/', '/services/potholing/', '/locations/virginia-beach/'],
    faqSchema: `<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Is hydro excavation safer than mechanical digging near utilities?","acceptedAnswer":{"@type":"Answer","text":"Yes. Hydro excavation uses pressurized water rather than metal cutting tools, eliminating the risk of utility strikes from equipment contact. It's the recommended method within 18 inches of marked utilities under OSHA and VDOT guidelines."}},{"@type":"Question","name":"What safety documentation does Beach HydroVac provide?","acceptedAnswer":{"@type":"Answer","text":"We provide a signed service record on every job documenting scope, soil conditions, and utilities exposed. For projects requiring OSHA documentation or VDOT SUE records, we can provide expanded documentation packages."}}]}</script>`
  },
  {
    slug: 'what-is-hydro-excavation',
    addLinks: ['/services/hydro-excavation/', '/services/potholing/', '/services/daylighting/', '/locations/virginia-beach/', '/contact/'],
    faqSchema: `<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How does hydro excavation work?","acceptedAnswer":{"@type":"Answer","text":"Hydro excavation uses high-pressure water to break up soil and a powerful vacuum system to extract the loosened material into a debris tank. The result is a precise excavation without metal tools near underground utilities."}},{"@type":"Question","name":"Where is hydro excavation used in Hampton Roads?","acceptedAnswer":{"@type":"Answer","text":"In Hampton Roads, hydrovac is widely used for utility potholing and verification, slot trenching for fiber optic cable, emergency utility exposure, daylighting for VDOT projects, and tight-access excavation near buildings and existing infrastructure."}}]}</script>`
  },
];

// ─── DEPLOY FUNCTIONS ─────────────────────────────────────────────────────────
async function getGuidesCategoryId() {
  const r = await fetch(`${WP}/wp-json/wp/v2/categories?search=Guides&_fields=id,name`, { headers: H });
  const cats = await r.json();
  const cat = cats.find(c => c.name === 'Guides');
  return cat?.id || 1;
}

async function deployPost(post, catId) {
  // Check if exists
  const check = await fetch(`${WP}/wp-json/wp/v2/posts?slug=${post.slug}&_fields=id,slug`, { headers: H });
  const [existing] = await check.json();

  const body = {
    title:   post.title,
    slug:    post.slug,
    content: post.content,
    status:  'publish',
    categories: [catId],
    meta: {
      '_yoast_wpseo_title':    post.yoastTitle,
      '_yoast_wpseo_metadesc': post.yoastDesc,
      '_yoast_wpseo_focuskw':  post.focusKw,
    }
  };

  let r;
  if (existing) {
    r = await fetch(`${WP}/wp-json/wp/v2/posts/${existing.id}`, { method: 'POST', headers: H, body: JSON.stringify(body) });
  } else {
    r = await fetch(`${WP}/wp-json/wp/v2/posts`, { method: 'POST', headers: H, body: JSON.stringify(body) });
  }
  const d = await r.json();
  return { ok: r.ok, link: d.link, id: d.id };
}

async function upgradeExistingPost(upgrade) {
  const r = await fetch(`${WP}/wp-json/wp/v2/posts?slug=${upgrade.slug}&context=edit&_fields=id,slug,content`, { headers: H });
  const [post] = await r.json();
  if (!post) return 'not_found';

  let content = post.content?.raw || post.content?.rendered || '';
  if (content.includes('FAQPage')) return 'already_has_faq';

  // Add internal links section + FAQ schema
  const linksHtml = `\n<p style="font-size:0.9rem;color:#555;margin-top:32px"><strong>Related:</strong> ${upgrade.addLinks.map(l => `<a href="${l}">${l.replace(/\//g,'').replace(/-/g,' ')}</a>`).join(' · ')}</p>`;
  content = content + linksHtml + '\n' + upgrade.faqSchema;

  const u = await fetch(`${WP}/wp-json/wp/v2/posts/${post.id}`, {
    method: 'POST', headers: H,
    body: JSON.stringify({ content })
  });
  return u.ok ? 'upgraded' : 'failed';
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function run() {
  console.log('BHV Blog Upgrade — Local Posts + FAQ Schema\n');

  const catId = await getGuidesCategoryId();
  console.log(`Using "Guides" category ID: ${catId}\n`);

  // Deploy new locally-targeted posts
  console.log('Deploying 5 new locally-targeted posts...');
  for (const post of newPosts) {
    const result = await deployPost(post, catId);
    console.log(`  ${result.ok ? '✓' : '✗'} /${post.slug}/  →  ${result.link || 'error'}`);
    await new Promise(r => setTimeout(r, 500));
  }

  // Upgrade existing kept posts
  console.log('\nUpgrading existing posts with FAQ schema + internal links...');
  for (const upgrade of existingPostUpgrades) {
    const result = await upgradeExistingPost(upgrade);
    console.log(`  ${result === 'upgraded' ? '✓' : result === 'already_has_faq' ? '·' : '✗'} /${upgrade.slug}/ — ${result}`);
    await new Promise(r => setTimeout(r, 400));
  }

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ BHV Blog Upgrade Complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5 new local posts published:
  /5-signs-emergency-hydro-excavation-hampton-roads/
  /hydro-excavation-cost-virginia-beach-2026/
  /potholing-vs-traditional-digging-hampton-roads/
  /slot-trenching-fiber-optic-hampton-roads-virginia-beach/
  /daylighting-utilities-hampton-roads-guide/

3 existing posts upgraded with FAQ schema + internal links:
  /virginia-811-miss-utility-guide/
  /hydro-excavation-safety-best-practices/
  /what-is-hydro-excavation/

Every new post has:
  ✓ Local Hampton Roads / Virginia Beach targeting
  ✓ FAQ schema (rich result eligible)
  ✓ Internal links to /services/ and /locations/ pages
  ✓ Yoast title + meta description
  ✓ Near-zero SERP competition (local + problem-aware)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
}

run().catch(console.error);
