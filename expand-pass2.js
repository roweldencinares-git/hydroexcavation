/**
 * BeachHydroVac — Expand Thin Pages Pass 2
 * Appends additional content to pages that are still under 500 words
 * Run: node expand-pass2.js
 */
import fetch from 'node-fetch';

const WP_BASE = 'https://beachhydrovac.com/wp-json/wp/v2';
const AUTH    = 'Basic ' + Buffer.from('rdenci_16:0L9x p2O7 tdfs khVJ UFyl 1UZk').toString('base64');
const HEADERS = { Authorization: AUTH, 'Content-Type': 'application/json' };

async function getPage(id) {
    const r = await fetch(`${WP_BASE}/pages/${id}`, { headers: HEADERS });
    return r.json();
}

async function updatePage(id, content) {
    const r = await fetch(`${WP_BASE}/pages/${id}`, {
        method: 'POST', headers: HEADERS,
        body: JSON.stringify({ content })
    });
    const d = await r.json();
    const words = d.content?.rendered?.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim().split(' ').filter(w => w.length > 0).length;
    return { ok: r.ok, words };
}

// Additional content blocks to append to each page
const ADDITIONS = {

3455: `
<!-- wp:heading {"level":2} -->
<h2>How to Schedule Hydrovac Services at Your Location</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Scheduling hydrovac services with Beach HydroVac is straightforward. Call our dispatch line at <strong>757-510-5220</strong> with your project address, the type of excavation needed, approximate depth requirements, and any known utilities in the area. We will confirm utility marking requirements under <a href="https://va811.com/" target="_blank" rel="noopener noreferrer">Virginia 811</a>, provide a free quote, and schedule your dig date. Most Hampton Roads jobs can be scheduled within 24–48 hours. Statewide projects may require additional lead time for travel and permitting.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>What to Expect During a Hydrovac Service Visit</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Our crews arrive with a fully equipped hydrovac truck, personal protective equipment, and all site safety gear. Before any digging begins, we verify all utility markings are in place and confirm the dig zone with you or your site supervisor. We use high-pressure water at controlled PSI to break soil, then vacuum it into the debris tank — no backhoe, no auger, no metal contact with buried utilities. Spoils are contained in our truck and disposed of at an approved facility, or returned to the trench during backfill if clean enough. Site cleanup is included in every job. At project completion, you receive a written summary of what was found and documented.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Beach HydroVac is fully licensed, bonded, and insured for hydrovac operations across all our service locations. We hold general liability insurance and workers' compensation coverage, and our operators carry OSHA 10 certification. Contact us at <strong>757-510-5220</strong> or visit our <a href="https://beachhydrovac.com/contact/">Contact page</a> to request service at any of our locations.</p>
<!-- /wp:paragraph -->
`,

3895: `
<!-- wp:heading {"level":2} -->
<h2>What to Expect from Our Virginia Hydro Excavation Contractors</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Every project we handle begins with a pre-dig verification of utility markings under <a href="https://va811.com/" target="_blank" rel="noopener noreferrer">Virginia 811</a> requirements. Our hydro excavation contractors use calibrated pressure settings matched to the soil type — lower pressure for sandy coastal soils, higher for heavy Piedmont clay — to avoid damaging buried facilities. All spoils are vacuumed into our truck and transported for compliant disposal. Our crews document what was found, depth measurements, and any anomalies during every utility potholing or daylighting engagement.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Pricing for Hydro Excavation in Virginia</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Hydro excavation contractor pricing in Virginia depends on the number of potholes, trench length, depth requirements, soil conditions, and mobilization distance. Beach HydroVac provides free written quotes for all Virginia projects. Hampton Roads projects typically include no mobilization fee. Projects in Richmond, Northern Virginia, Roanoke, Lynchburg, and other statewide locations include a travel fee based on distance. Call <strong>757-510-5220</strong> to discuss your project scope and get a quote from Virginia's trusted hydro excavation contractors.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Fully licensed, bonded, and insured. OSHA 10 certified field personnel. Veteran-owned and operated since our founding. Contact Beach HydroVac at <strong>757-510-5220</strong> or visit our <a href="https://beachhydrovac.com/contact/">Contact page</a> for hydro excavation contractor services anywhere in Virginia.</p>
<!-- /wp:paragraph -->
`,

3894: `
<!-- wp:heading {"level":2} -->
<h2>Fiber Optic Trenching Process in Virginia</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Our fiber optic trenching process begins with a pre-dig utility verification — all underground utilities in the trench path must be marked under <a href="https://va811.com/" target="_blank" rel="noopener noreferrer">Virginia 811</a> requirements before any soil is disturbed. Our hydrovac operator sets water pressure based on soil type and depth, then cuts a precise slot trench to specification. Excavated material is vacuumed into the debris tank, leaving a clean, open trench ready for conduit or direct-bury fiber installation. After installation, spoils can be returned as backfill or hauled away. The finished trench is clean and tight, with minimal surface disturbance to surrounding pavement, landscaping, or structures.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Fiber Optic Trenching Pricing in Virginia</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Fiber optic trenching pricing depends on total linear footage, depth requirements, soil conditions, and project location in Virginia. We quote by the linear foot for standard slot trench depths up to 36 inches, with separate pricing for deeper trenches or difficult soil conditions. Hampton Roads fiber trenching projects typically receive same-week scheduling. For large-scale fiber deployment programs across Virginia, we can provide fixed-price contracts and dedicated crew scheduling. Call <strong>757-510-5220</strong> for a free fiber optic trenching quote at your Virginia project location.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Beach HydroVac is veteran-owned and fully insured for all fiber optic trenching operations across Virginia. Our crews are experienced with both municipal and commercial broadband projects and maintain compliance with <a href="https://www.vdot.virginia.gov/" target="_blank" rel="noopener noreferrer">VDOT</a> right-of-way requirements. Contact us at <strong>757-510-5220</strong> to schedule fiber optic trenching at your Virginia location.</p>
<!-- /wp:paragraph -->
`,

3893: `
<!-- wp:heading {"level":2} -->
<h2>Emergency Hydro Excavation — Response Times</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Response times for emergency hydro excavation across Virginia depend on current truck location and crew availability. For Hampton Roads emergency calls (Virginia Beach, Chesapeake, Norfolk, Portsmouth, Hampton, Newport News, Suffolk), we target 1–2 hour on-site response around the clock. For Richmond, Fredericksburg, Northern Virginia, and other statewide locations, response times range from 2–4 hours depending on distance and traffic. When you call our emergency line at <strong>757-510-5220</strong>, we immediately confirm truck availability and provide a realistic ETA so your team can coordinate with utility company responders and site supervision accordingly.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Coordination with Utility Companies and Repair Crews</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Emergency hydrovac excavation requires tight coordination between our crew, the affected utility operator, and your general contractor or project manager. Beach HydroVac's operators are experienced working alongside gas utility responders, fiber network technicians, water authority crews, and electrical utilities during emergency repair access. We follow all <a href="https://www.phmsa.dot.gov/" target="_blank" rel="noopener noreferrer">PHMSA</a> hand-dig zone protocols near high-pressure pipelines and maintain direct communication with your team throughout the excavation. Documentation of exposed utilities — including depth, condition, and photographic record — is provided for every emergency hydrovac engagement.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>For 24/7 emergency hydro excavation across Virginia, call Beach HydroVac at <strong>757-510-5220</strong>. Veteran-owned, fully insured, and available around the clock for utility emergencies at any Virginia location. You can also submit a non-emergency request via our <a href="https://beachhydrovac.com/contact/">Contact page</a>.</p>
<!-- /wp:paragraph -->
`,

3892: `
<!-- wp:heading {"level":2} -->
<h2>Delaware Hydro Excavation Services</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Delaware's diverse infrastructure — from Wilmington's dense urban utility corridors to Dover's mixed commercial zones to the coastal communities of Rehoboth Beach and Lewes — requires hydro excavation expertise adapted to each environment. Beach HydroVac crews handle Delaware projects with the same precision and documentation standards applied to our Virginia work. All Delaware projects begin with utility marking verification through <a href="https://www.miss-utility.net/" target="_blank" rel="noopener noreferrer">Miss Utility (811)</a> before any hydrovac work begins. We coordinate with Delaware Department of Transportation and local municipalities for any right-of-way or permit requirements on public infrastructure projects.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Getting a Quote for Hydro Excavation in Delaware</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Delaware hydro excavation projects include a mobilization fee from our Virginia Beach base, which varies based on project location within the state. Wilmington and northern Delaware projects (New Castle County) typically require approximately a 2.5-hour mobilization. Dover and central Delaware (Kent County) projects are approximately 3 hours. Coastal Sussex County projects range 3–4 hours. We provide free written quotes for all Delaware hydro excavation projects — call <strong>757-510-5220</strong> or visit our <a href="https://beachhydrovac.com/contact/">Contact page</a> with your project details, utility type, and estimated volume. Veteran-owned, fully insured, and experienced in multi-state hydrovac operations.</p>
<!-- /wp:paragraph -->
`,

3891: `
<!-- wp:heading {"level":2} -->
<h2>Maryland Hydro Excavation Services</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Maryland's geography requires hydro excavation expertise across multiple distinct environments. Baltimore's dense urban core has deeply layered utility infrastructure requiring careful daylighting and SUE verification. The Eastern Shore's sandy soils and shallow water tables require controlled water pressure to avoid utility damage in unstable ground conditions. The DC metro suburbs (Prince George's, Montgomery, and Anne Arundel counties) have complex utility corridors near major transportation corridors and federal facilities. Beach HydroVac is equipped to handle all Maryland environments with precision, documentation, and full compliance with <a href="https://www.missutilityofmaryland.com/" target="_blank" rel="noopener noreferrer">Maryland Miss Utility</a> requirements.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Scheduling Hydro Excavation in Maryland</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Maryland hydro excavation projects are available for scheduling from our Virginia Beach base. Eastern Shore Maryland (Somerset, Wicomico, Worcester, Dorchester, Talbot counties) is our closest Maryland service area — these projects typically have shorter mobilization times. Baltimore City and metro counties are approximately a 3.5-hour drive. DC-adjacent counties (Prince George's, Montgomery) are 4+ hours and typically require overnight crew lodging for multi-day projects. Call <strong>757-510-5220</strong> to discuss your Maryland hydro excavation project scope and receive a free written quote. All Maryland projects are covered by our full general liability and workers' compensation insurance. Veteran-owned and trusted across the Mid-Atlantic region.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Contact Beach HydroVac at <strong>757-510-5220</strong> or via our <a href="https://beachhydrovac.com/contact/">Contact page</a> for hydro excavation contractor services anywhere in Maryland.</p>
<!-- /wp:paragraph -->
`,

3890: `
<!-- wp:heading {"level":2} -->
<h2>North Carolina Hydro Excavation Services</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>North Carolina's diverse geography presents unique challenges for hydro excavation. The Outer Banks and coastal communities face sandy, unstable soils and saltwater-affected underground infrastructure. The Piedmont's red clay soils require higher water pressure and careful vacuum management. Charlotte's urban core has heavily congested utility corridors near major transit and development projects. Beach HydroVac crews are experienced across all North Carolina environments, with particular expertise in coastal utility work from our Hampton Roads base. All North Carolina projects comply with <a href="https://www.nc811.org/" target="_blank" rel="noopener noreferrer">NC 811</a> utility marking requirements before any excavation begins.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":2} -->
<h2>Getting a Quote for Hydro Excavation in North Carolina</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>North Carolina hydro excavation projects from our Virginia Beach base carry a mobilization fee based on project location. Outer Banks and northeastern North Carolina (Elizabeth City, Kitty Hawk, Kill Devil Hills corridor) are our nearest NC service area — approximately 1.5–2 hours. Raleigh and the Research Triangle are approximately 3.5 hours. Charlotte metro projects are 5+ hours and typically require overnight crew lodging for multi-day programs. We provide free written quotes for all North Carolina hydro excavation work — call <strong>757-510-5220</strong> with your project location, utility type, dig count, and depth requirements. Veteran-owned, fully insured, and trusted across the Southeast for hydrovac contractor services. You can also reach us via our <a href="https://beachhydrovac.com/contact/">Contact page</a>.</p>
<!-- /wp:paragraph -->
`,

};

async function main() {
    console.log('════════════════════════════════════════════');
    console.log('  BeachHydroVac — Expand Pages Pass 2');
    console.log('════════════════════════════════════════════\n');

    const ids = Object.keys(ADDITIONS).map(Number);

    for (const id of ids) {
        process.stdout.write(`  Fetching page ${id}... `);
        const page = await getPage(id);
        const slug = page.slug;
        const currentRaw = page.content?.raw || page.content?.rendered || '';
        const currentWords = page.content?.rendered?.replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim().split(' ').filter(w => w.length > 0).length || 0;
        console.log(`${slug} (${currentWords} words)`);

        const newContent = currentRaw + '\n' + ADDITIONS[id];

        process.stdout.write(`  Updating... `);
        const { ok, words } = await updatePage(id, newContent);
        if (ok) {
            const sym = words >= 500 ? '✅' : words >= 300 ? '⚠️' : '❌';
            console.log(`${sym} ${words} words`);
        } else {
            console.log(`❌ Update failed`);
        }
        await new Promise(r => setTimeout(r, 500));
    }

    console.log('\n════════════════════════════════════════════');
    console.log('  Pass 2 complete.');
    console.log('════════════════════════════════════════════');
}

main();
