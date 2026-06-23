/**
 * BeachHydroVac — Fix Thin Blog Posts
 * Follows Yoast SEO checklist: keyphrase in intro, H2/H3, 500+ words, outbound links
 * Run: node fix-thin-posts.js
 */
import fetch from 'node-fetch';

const WP_BASE = 'https://beachhydrovac.com/wp-json/wp/v2';
const AUTH    = 'Basic ' + Buffer.from('rdenci_16:0L9x p2O7 tdfs khVJ UFyl 1UZk').toString('base64');
const HEADERS = { Authorization: AUTH, 'Content-Type': 'application/json' };

async function updatePost(id, content, yoastTitle, yoastDesc) {
    const r = await fetch(`${WP_BASE}/posts/${id}`, {
        method: 'POST', headers: HEADERS,
        body: JSON.stringify({ content, meta: { _yoast_wpseo_title: yoastTitle, _yoast_wpseo_metadesc: yoastDesc } })
    });
    const d = await r.json();
    const words = d.content?.rendered?.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim().split(' ').length;
    return { ok: r.ok, words };
}

// ── POSTS ────────────────────────────────────────────────────────────────────

const POSTS = [

// ── 1. Potholing Contractor Newport News VA (ID 3776) ────────────────────────
{
id: 3776,
slug: 'potholing-contractor-newport-news-va',
yoastTitle: 'Potholing Contractor Newport News, VA | Beach HydroVac',
yoastDesc: 'Expert potholing contractor serving Newport News, VA. Safe utility exposure using hydro excavation. Veteran-owned Beach HydroVac. Call 757-510-5220.',
content: `
<!-- wp:paragraph -->
<p>If you need a <strong>potholing contractor in Newport News, VA</strong>, Beach HydroVac provides fast, safe utility exposure using hydro excavation across all Newport News zip codes. From Denbigh to Hilton Village to the Newport News Shipbuilding corridor, we locate and expose underground utilities without mechanical damage — protecting your project, your timeline, and your budget.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Potholing Services in Newport News, VA</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Potholing — also called daylighting — creates small, precise test holes to visually confirm the exact location, depth, size, and material of underground utilities. As a potholing contractor serving Newport News, we use high-pressure water to break up soil and a vacuum system to remove debris, leaving a clean exposure hole with zero risk of striking the utility. Every potholing project we complete in Newport News meets VDOT and ASCE 38-22 standards.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Why Pothole Before You Dig in Newport News?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Newport News has one of the most complex underground utility networks in Hampton Roads, with water mains, sewer lines, high-pressure gas lines, and fiber optic cables concentrated in and around the downtown shipyard district and the Route 17 commercial corridor. Striking a buried utility costs an average of $50,000–$250,000 in damage, delays, and fines. <a href="https://va811.com/" target="_blank" rel="noopener noreferrer">Virginia 811</a> markings show approximate locations — potholing gives you the exact location before any mechanical equipment breaks ground.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Newport News Potholing Process</h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li><strong>Site review</strong> — Review utility records, One-Call markings, and project drawings to plan test hole locations</li>
<li><strong>Hydro excavation</strong> — High-pressure water breaks soil; vacuum removes slurry cleanly and safely</li>
<li><strong>Visual confirmation</strong> — Technician confirms utility type, depth, diameter, condition, and spatial relationship to adjacent utilities</li>
<li><strong>Documentation</strong> — Photos, depth measurements, and GPS coordinates provided for project records</li>
<li><strong>Restoration</strong> — Test hole backfilled and compacted; surface restored to pre-excavation condition</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {"level":2} -->
<h2>Areas We Serve in Newport News</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Our potholing crews serve all Newport News neighborhoods including Denbigh, Hidenwood, Hilton Village, Jefferson Avenue corridor, and the downtown/waterfront district. We also serve Fort Eustis and surrounding areas. Travel time from our Virginia Beach base is typically 45–60 minutes — we offer same-day scheduling for urgent utility verification needs.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Get a Potholing Quote in Newport News</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Call Beach HydroVac at <strong>757-510-5220</strong> for a free project estimate. We serve Newport News, Hampton, Williamsburg, and all of Hampton Roads for potholing, daylighting, hydro excavation, and SUE Level A verification. Veteran-owned and operated.</p>
<!-- /wp:paragraph -->
`},

// ── 2. Daylighting Services Hampton VA (ID 3775) ─────────────────────────────
{
id: 3775,
slug: 'daylighting-services-hampton-va',
yoastTitle: 'Daylighting Services Hampton, VA | Beach HydroVac',
yoastDesc: 'Professional daylighting services in Hampton, VA. Safe utility exposure using hydro excavation. Veteran-owned Beach HydroVac. Call 757-510-5220.',
content: `
<!-- wp:paragraph -->
<p>Beach HydroVac provides professional <strong>daylighting services in Hampton, VA</strong> for contractors, utility companies, and municipalities across the Langley Corridor, Phoebus, and all Hampton neighborhoods. Daylighting — also called potholing — safely exposes underground utilities using hydro excavation so your crew can visually confirm locations before any mechanical equipment breaks ground.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Daylighting Services in Hampton, VA</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Our daylighting service uses high-pressure water and vacuum suction to create precise test holes exposing buried gas lines, water mains, fiber optic cables, and electrical conduit. As a daylighting contractor serving Hampton, we provide the exact utility location data required for VDOT projects, permit applications, and pre-construction utility verification. All work is performed by trained hydrovac technicians with OSHA 10 certification.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>When You Need Daylighting in Hampton</h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li><strong>Before any ground disturbance</strong> — Virginia law requires <a href="https://va811.com/" target="_blank" rel="noopener noreferrer">Virginia 811</a> notification and utility verification before digging</li>
<li><strong>VDOT-funded projects</strong> — SUE Level A daylighting required at all utility conflict locations</li>
<li><strong>Near high-pressure gas lines</strong> — Mechanical excavation near gas infrastructure is prohibited without prior daylighting</li>
<li><strong>Fiber optic installations</strong> — Verify existing telecom infrastructure depth and location before trenching</li>
<li><strong>Near Hampton's waterfront</strong> — Dense utility corridors along the waterfront district require careful verification</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {"level":2} -->
<h2>Hampton Daylighting Coverage Areas</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>We serve all Hampton zip codes including 23661, 23663, 23664, 23665, and 23666. Our crews are familiar with Hampton's unique infrastructure including the Langley Air Force Base vicinity, Buckroe Beach area, and the Mercury Boulevard commercial corridor. Same-day and next-day daylighting scheduling available for most Hampton projects.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Why Choose Beach HydroVac for Daylighting in Hampton</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Beach HydroVac is veteran-owned and based in nearby Virginia Beach, giving us deep familiarity with Hampton Roads soil conditions, utility infrastructure patterns, and local permit requirements. Our hydrovac trucks are fully equipped for both water and vacuum operations, and our crews carry full general liability insurance and professional certifications for every daylighting project in Hampton.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Call <strong>757-510-5220</strong> or request a free quote online. We serve Hampton, Newport News, Poquoson, Williamsburg, and all of Hampton Roads.</p>
<!-- /wp:paragraph -->
`},

// ── 3. Slot Trenching Portsmouth VA (ID 3773) ────────────────────────────────
{
id: 3773,
slug: 'slot-trenching-portsmouth-va',
yoastTitle: 'Slot Trenching Portsmouth, VA | Beach HydroVac',
yoastDesc: 'Precision slot trenching in Portsmouth, VA for fiber optic & utility installation. Hydrovac slot trenching by veteran-owned Beach HydroVac. 757-510-5220.',
content: `
<!-- wp:paragraph -->
<p>Beach HydroVac provides precision <strong>slot trenching in Portsmouth, VA</strong> for fiber optic installation, electrical conduit, irrigation lines, and utility relocations across the Churchland corridor, downtown Portsmouth, and all Portsmouth industrial zones. Our hydrovac slot trenching creates narrow, clean trenches with minimal surface disturbance — no jackhammers, no wide excavation, no guesswork near existing utilities.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Slot Trenching Services in Portsmouth, VA</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Slot trenching uses a hydrovac truck's high-pressure water lance and vacuum system to cut a narrow trench — typically 6 to 18 inches wide — to a specified depth. The result is a precise trench suitable for cable, conduit, or pipe installation with perfectly vertical sidewalls and clean removal of all spoil material. Our slot trenching service in Portsmouth is ideal for projects in congested areas where traditional mechanical trenching would risk striking adjacent utilities.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Slot Trenching Applications in Portsmouth</h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li><strong>Fiber optic cable installation</strong> — Telecom companies use hydrovac slot trenching to install fiber without disturbing existing infrastructure</li>
<li><strong>Electrical conduit</strong> — Underground power distribution and service lateral installations in high-density areas</li>
<li><strong>Gas service connections</strong> — Safe approach to new gas service installation near other buried utilities</li>
<li><strong>Irrigation systems</strong> — Narrow trenches for drip irrigation and sprinkler system installation</li>
<li><strong>Utility relocation</strong> — Relocate conflicting utilities with minimal site impact</li>
<li><strong>Pavement-adjacent work</strong> — Trench alongside existing pavement without undermining road base or curbing</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {"level":2} -->
<h2>Portsmouth Slot Trenching Coverage</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>We serve all Portsmouth neighborhoods and commercial zones including Churchland, Cradock, Port Norfolk, Olde Towne Portsmouth, and the Naval Medical Center area. Portsmouth's dense urban utility environment — with aging water, sewer, and gas infrastructure — requires the precision that only hydrovac slot trenching can provide. Our crews are experienced with <a href="https://www.vdot.virginia.gov/" target="_blank" rel="noopener noreferrer">VDOT</a> right-of-way requirements and Portsmouth City permit processes.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Request Slot Trenching in Portsmouth</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Call Beach HydroVac at <strong>757-510-5220</strong> for slot trenching availability and pricing in Portsmouth. We provide free project quotes and can typically schedule within 24–48 hours for standard slot trenching jobs in the Hampton Roads region. Veteran-owned and fully insured.</p>
<!-- /wp:paragraph -->
`},

// ── 4. Non-Destructive Excavation Hampton Roads (ID 3779) ────────────────────
{
id: 3779,
slug: 'non-destructive-excavation-hampton-roads',
yoastTitle: 'Non-Destructive Excavation Hampton Roads, VA | Beach HydroVac',
yoastDesc: 'Non-destructive excavation services across Hampton Roads, VA. Hydrovac potholing, daylighting & vacuum excavation. Veteran-owned. Call 757-510-5220.',
content: `
<!-- wp:paragraph -->
<p><strong>Non-destructive excavation in Hampton Roads</strong> uses hydro excavation technology to safely expose underground utilities and break ground without risking damage to buried infrastructure. Beach HydroVac provides non-destructive excavation services across all seven Hampton Roads cities — Virginia Beach, Chesapeake, Norfolk, Portsmouth, Hampton, Newport News, and Suffolk — for contractors, municipalities, and utility companies.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>What Is Non-Destructive Excavation?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Non-destructive excavation — also called hydrovac, soft dig, or vacuum excavation — replaces mechanical excavation methods (backhoes, trenchers) with high-pressure water and industrial vacuum suction. The water breaks up soil into a slurry; the vacuum removes it cleanly. No metal teeth, no rotating blades, no risk of severing a gas line or cutting through a fiber optic bundle. The result is a safe, precise excavation with zero utility strikes.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Non-Destructive Excavation Applications Across Hampton Roads</h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li><strong>Utility potholing</strong> — Expose utilities for visual verification before construction activity</li>
<li><strong>Slot trenching</strong> — Narrow trenches for fiber optic, conduit, and irrigation installation</li>
<li><strong>Daylighting</strong> — Visual confirmation of underground utility location, depth, and condition</li>
<li><strong>SUE Level A verification</strong> — ASCE 38-22 compliant utility quality designation for VDOT projects</li>
<li><strong>Foundation work</strong> — Safe excavation adjacent to existing building foundations without vibration damage</li>
<li><strong>Emergency utility exposure</strong> — Rapid access to damaged underground utilities for repair crews</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {"level":2} -->
<h2>Hampton Roads Soil Conditions & Non-Destructive Excavation</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Hampton Roads presents some of the most challenging soil conditions in Virginia for underground utility work. Coastal sandy soils in Virginia Beach and the Eastern Shore are easily displaced by mechanical equipment. Heavy clay in Chesapeake and Suffolk can mask utility depths on <a href="https://va811.com/" target="_blank" rel="noopener noreferrer">Virginia 811</a> markings. High water table conditions throughout the region mean conventional mechanical excavation risks flooding and soil collapse. Hydrovac non-destructive excavation handles all these conditions safely.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Why Hampton Roads Contractors Choose Non-Destructive Excavation</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>A single utility strike on a Hampton Roads job site can cost $50,000 to $500,000 in repairs, delays, and penalties. Gas line strikes carry additional liability under <a href="https://www.phmsa.dot.gov/" target="_blank" rel="noopener noreferrer">PHMSA regulations</a>. Non-destructive excavation eliminates this risk entirely while also reducing project timelines — hydrovac is often faster than mechanical excavation because no utility avoidance delays are needed.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Schedule Non-Destructive Excavation Across Hampton Roads</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Beach HydroVac serves all Hampton Roads cities with same-day and next-day non-destructive excavation scheduling. Call <strong>757-510-5220</strong> for a free project quote. We're veteran-owned, fully insured, and available for both single-hole potholing and large-scale slot trenching projects.</p>
<!-- /wp:paragraph -->
`},

// ── 5. Vacuum Excavation Chesapeake VA (ID 3774) ─────────────────────────────
{
id: 3774,
slug: 'vacuum-excavation-chesapeake-va',
yoastTitle: 'Vacuum Excavation Chesapeake, VA | Beach HydroVac',
yoastDesc: 'Professional vacuum excavation services in Chesapeake, VA. Safe, non-destructive utility exposure. Veteran-owned Beach HydroVac. Call 757-510-5220.',
content: `
<!-- wp:paragraph -->
<p>Beach HydroVac provides professional <strong>vacuum excavation in Chesapeake, VA</strong> for utility contractors, general contractors, and municipal crews across Greenbrier, Western Branch, Deep Creek, and all Chesapeake neighborhoods. Our vacuum excavation service uses hydro excavation technology — high-pressure water and industrial vacuum suction — to safely expose underground utilities without mechanical damage.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Vacuum Excavation Services in Chesapeake, VA</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Vacuum excavation — also known as hydrovac or soft dig — is the safest way to break ground near existing buried infrastructure. In Chesapeake, where rapid residential and commercial growth along the Battlefield Boulevard and Route 17 corridors has created dense underground utility networks, vacuum excavation is the preferred method for any project that requires ground disturbance within 18–24 inches of marked utilities.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Chesapeake Vacuum Excavation Applications</h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li><strong>Utility potholing</strong> — Expose gas, water, sewer, and telecom lines before construction begins</li>
<li><strong>New service connections</strong> — Safe trench excavation for new utility service taps</li>
<li><strong>Fiber optic installation</strong> — Slot trenching for telecom expansion in Chesapeake's growing communities</li>
<li><strong>Stormwater infrastructure</strong> — Safely excavate around storm drain and culvert infrastructure</li>
<li><strong>Subdivision development</strong> — Pre-construction utility verification for Chesapeake's active residential developments</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading {"level":2} -->
<h2>Chesapeake Soil Conditions</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Chesapeake's soil ranges from sandy loam near the waterways to heavy clay in the western areas. The city's high water table — particularly in Great Bridge and South Norfolk — creates challenging conditions for mechanical excavation. Our hydrovac trucks handle these conditions with ease, and our debris tanks manage the slurry without environmental impact. We follow <a href="https://www.chesapeake.va.us/" target="_blank" rel="noopener noreferrer">City of Chesapeake</a> right-of-way permit requirements on all projects.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Schedule Vacuum Excavation in Chesapeake</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Call Beach HydroVac at <strong>757-510-5220</strong> to schedule vacuum excavation in Chesapeake. We offer same-day response for urgent utility exposure requests and free quotes for all project sizes. Veteran-owned, fully licensed and insured in Virginia.</p>
<!-- /wp:paragraph -->
`},

];

// ── EXECUTE ──────────────────────────────────────────────────────────────────

console.log('\n════════════════════════════════════════════');
console.log('  BeachHydroVac — Fix Thin Blog Posts');
console.log('  Following Yoast SEO checklist');
console.log('════════════════════════════════════════════\n');

let passed = 0, failed = 0;

for (const post of POSTS) {
    process.stdout.write(`  Updating: ${post.slug}... `);
    try {
        const result = await updatePost(post.id, post.content, post.yoastTitle, post.yoastDesc);
        if (result.ok) {
            const flag = result.words >= 500 ? '✅' : result.words >= 300 ? '⚠️' : '❌';
            console.log(`${flag} ${result.words} words`);
            passed++;
        } else {
            console.log('❌ API error');
            failed++;
        }
    } catch(e) {
        console.log(`❌ ${e.message}`);
        failed++;
    }
    await new Promise(r => setTimeout(r, 600));
}

console.log(`\n  Done: ${passed} updated, ${failed} failed`);
console.log('════════════════════════════════════════════\n');
