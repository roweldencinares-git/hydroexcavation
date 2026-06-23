import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(
  process.env.BEACH_HYDROVAC_WP_USER + ':' + process.env.BEACH_HYDROVAC_WP_PASSWORD
).toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

// NEW BLOG POSTS targeting keyword gaps
const newPosts = [
  {
    title: 'What is Hydro Excavation? The Complete Guide for Virginia Contractors',
    slug: 'what-is-hydro-excavation',
    focuskw: 'what is hydro excavation',
    metadesc: 'What is hydro excavation and how does it work? Complete guide covering the process, equipment, uses, costs, and why Virginia contractors prefer hydrovac. Call 757-510-5220.',
    seotitle: 'What is Hydro Excavation? | Complete Guide for Virginia Contractors',
    content: `<!-- wp:paragraph -->
<p>Hydro excavation—also called hydrovac, vacuum excavation, or non-destructive digging—is a method of removing soil using <strong>pressurized water and an industrial vacuum system</strong>. It's the safest, most precise excavation technology available today, and it's rapidly replacing traditional mechanical digging for any project involving underground utilities.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>This guide explains exactly how hydro excavation works, when to use it, what it costs, and why it has become the industry standard across Virginia.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">How Hydro Excavation Works</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The process is straightforward:</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol>
<li><strong>Pressurized water</strong> is sprayed onto the soil surface through a handheld wand. The water pressure (typically 2,000-3,000 PSI) breaks up the soil into a slurry</li>
<li>A <strong>powerful vacuum</strong> (up to 6,000 CFM) simultaneously suctions the soil slurry into a debris tank mounted on the hydrovac truck</li>
<li>Underground utilities, pipes, and cables are <strong>exposed cleanly</strong> without any risk of damage because water cannot cut through steel, PVC, fiber optic cable, or other utility materials</li>
<li>The debris tank is transported off-site for disposal, or the soil is deposited in an approved on-site location</li>
</ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>For cold weather operations, the water can be <strong>heated</strong> to cut through frozen ground—a major advantage over mechanical methods in Virginia's winter months (December through March).</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Hydro Excavation Equipment</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>A modern hydrovac truck is a self-contained excavation unit that includes:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>Water tank:</strong> 1,000-1,200 gallons of fresh water (heated option for winter)</li>
<li><strong>Debris tank:</strong> 10-15 cubic yard capacity for excavated soil slurry</li>
<li><strong>Vacuum system:</strong> Industrial fan producing 5,000-6,000 CFM of suction</li>
<li><strong>Water pump:</strong> Delivers 2,000-3,000 PSI through the excavation wand</li>
<li><strong>Boom arm:</strong> 8-foot articulating boom positions the vacuum hose over the dig site</li>
<li><strong>Remote hose:</strong> Up to <strong>600 feet of hose</strong> for reaching restricted-access areas where the truck can't park directly adjacent</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Common Uses for Hydro Excavation</h2>
<!-- /wp:heading -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Potholing &amp; Daylighting</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Creating small test holes (typically 12-18 inches in diameter) to physically <a href="/services/potholing/">expose and verify underground utility locations</a>. This is required for VDOT <a href="/services/sue-level-a/">SUE Level A verification</a> and is the most common use of hydro excavation in Virginia.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Slot Trenching</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Creating narrow, precise trenches for installing new pipes, cables, or conduit. <a href="/services/slot-trenching/">Slot trenching</a> is especially valuable for fiber optic installation where the trench needs to be only 6-8 inches wide.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Remote &amp; Restricted Access Excavation</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>With up to 600 feet of hose reach, hydrovac trucks can excavate in locations that traditional equipment simply can't access—backyards, between buildings, inside fenced compounds, and on steep hillsides. Beach HydroVac's <a href="/services/remote-excavation/">remote excavation service</a> specializes in these challenging locations across Virginia.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Utility Repair &amp; Maintenance</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>When a water main breaks, a gas leak is detected, or an electrical fault needs investigation, hydro excavation safely exposes the problem area without risking further damage to adjacent utilities.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Directional Drilling Support</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Horizontal directional drilling (HDD) for fiber optic and utility installation requires entry and exit pits. Hydro excavation creates these pits safely, exposing any crossing utilities before the bore head reaches them.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Hydro Excavation vs. Traditional Methods</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Traditional excavation with backhoes and trenchers costs less per hour ($150-$250) compared to hydro excavation ($300-$450/hour). But that comparison ignores the cost of utility strikes—averaging $4,000-$15,000 per incident in Virginia—plus project delays, OSHA fines, and liability claims. For a detailed comparison, see our guide: <a href="/hydro-excavation-vs-traditional-excavation/">Hydro Excavation vs Traditional Excavation</a>.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Who Uses Hydro Excavation in Virginia?</h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li><strong>Telecom contractors</strong> installing fiber optic networks for Cox, Verizon, and Lumen</li>
<li><strong>Electrical contractors</strong> working near Dominion Energy underground power lines</li>
<li><strong>General contractors</strong> doing site work near existing utilities</li>
<li><strong>Municipal utilities</strong> (HRSD, city water departments) repairing aging infrastructure</li>
<li><strong>VDOT and highway contractors</strong> requiring SUE Level A verification</li>
<li><strong>Gas companies</strong> locating and repairing distribution lines</li>
<li><strong>Military installations</strong> requiring non-destructive excavation on base</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading">How Much Does Hydro Excavation Cost?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Virginia hydro excavation typically costs $300-$450 per hour or $250-$1,500 per pothole depending on depth and soil conditions. For complete pricing details, see our <a href="/hydro-excavation-cost-guide-virginia-2026/">2026 Hydro Excavation Cost Guide</a>.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Get Started with Hydro Excavation</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Beach HydroVac is a veteran-owned hydro excavation company based in Virginia Beach, serving Virginia, North Carolina, Maryland, and Delaware. We provide <a href="/services/hydro-excavation/">hydro excavation</a>, <a href="/services/potholing/">potholing</a>, <a href="/services/slot-trenching/">slot trenching</a>, <a href="/services/remote-excavation/">remote excavation</a>, and <a href="/services/sue-level-a/">SUE Level A verification</a>.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Call <a href="tel:7575105220">757-510-5220</a></strong> or <a href="/contact/">contact us online</a> for a free quote within 24 hours.</p>
<!-- /wp:paragraph -->`
  },
  {
    title: 'Hydro Excavation Safety: Virginia Best Practices & OSHA Compliance',
    slug: 'hydro-excavation-safety-best-practices',
    focuskw: 'hydro excavation safety',
    metadesc: 'Hydro excavation safety guide: OSHA compliance, best practices, and why hydrovac is the safest excavation method. Virginia contractor safety standards. Call 757-510-5220.',
    seotitle: 'Hydro Excavation Safety Guide | OSHA Compliance & Best Practices',
    content: `<!-- wp:paragraph -->
<p>Excavation is one of the most hazardous activities in construction. OSHA reports that <strong>excavation-related fatalities</strong> account for a significant portion of construction deaths each year—with trench collapses, utility strikes, and equipment accidents being the primary causes. Hydro excavation eliminates or dramatically reduces every one of these risks. Here's why hydrovac is the safest excavation method available and what safety practices every Virginia contractor should follow.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Why Hydro Excavation Is Inherently Safer</h2>
<!-- /wp:heading -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">No Trench Collapse Risk</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Traditional trenching creates open trenches that can collapse without warning—especially in Virginia's sandy coastal soils and waterlogged ground. OSHA requires shoring, sloping, or trench boxes for any trench deeper than 5 feet, adding significant cost and complexity. Hydro excavation typically creates small-diameter holes (12-18 inches) rather than open trenches, virtually eliminating cave-in risk.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Zero Utility Strike Risk</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Pressurized water physically cannot cut through steel pipes, PVC conduit, fiber optic cables, or concrete encasements. When a hydro excavation operator encounters an underground utility, they <strong>see it clearly</strong> as the water washes soil away from it—then they work around it safely. A backhoe operator doesn't know they've hit something until the bucket makes contact.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Reduced Equipment Hazards</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Backhoes and excavators have large swing radiuses, blind spots, and crushing potential. Hydro excavation operators work with a handheld wand and vacuum hose—dramatically reducing the risk of struck-by incidents. The hydrovac truck remains stationary during operation, eliminating the hazards of moving heavy equipment near workers.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">OSHA Excavation Safety Standards</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>OSHA's excavation safety standards (29 CFR 1926 Subpart P) apply to all excavation work, including hydro excavation. Key requirements include:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>Competent person on-site</strong> — Someone trained to identify excavation hazards must be present</li>
<li><strong>Utility locate before digging</strong> — All underground utilities must be located (call 811) before excavation begins</li>
<li><strong>Protective systems for trenches &gt;5 feet</strong> — Sloping, shoring, or shielding required (hydro excavation largely avoids this requirement by creating small-diameter holes)</li>
<li><strong>Means of egress</strong> — Workers in trenches deeper than 4 feet must have safe access/exit within 25 feet</li>
<li><strong>Daily inspections</strong> — Excavation sites must be inspected before each shift and after rain events</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>OSHA's current penalty rates (2026): <strong>$15,625 per serious violation</strong> and up to <strong>$156,259 per willful violation</strong>. These are penalties no Virginia contractor can afford.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Virginia-Specific Safety Requirements</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Virginia has additional excavation safety requirements beyond federal OSHA:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>Virginia Underground Utility Damage Prevention Act (§56-265.14)</strong> — Requires 811 notification 48 business hours before any excavation</li>
<li><strong>Tolerance zone rules</strong> — No mechanical excavation within 24 inches of a marked utility in Virginia</li>
<li><strong>Reporting requirements</strong> — Utility contacts and near-misses must be reported to the utility owner immediately</li>
<li><strong>VDOT work zone safety</strong> — Additional requirements for excavation in VDOT rights-of-way including traffic control, flagging, and lane closure permits</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Hydro Excavation Safety Best Practices</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Even though hydro excavation is inherently safer than mechanical methods, proper safety practices are still essential:</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol>
<li><strong>Always call 811</strong> — Verify all utility locations before starting any hydro excavation work</li>
<li><strong>Wear proper PPE</strong> — Safety glasses, hearing protection (vacuum systems are loud), steel-toe boots, high-visibility vest, and hard hat</li>
<li><strong>Maintain safe water pressure</strong> — Use the minimum pressure needed. Excessive pressure (above 3,500 PSI) can damage some utility coatings</li>
<li><strong>Watch for contaminated soil</strong> — Near gas stations, industrial sites, or military bases, soil may contain hazardous materials requiring special handling</li>
<li><strong>Secure the work area</strong> — Barricade open holes, use traffic control on roads, and mark all excavations clearly</li>
<li><strong>Monitor for underground gas</strong> — Use a gas detector when excavating near suspected gas lines, even with hydro excavation</li>
<li><strong>Maintain equipment</strong> — Inspect hoses, vacuum lines, and safety systems before each shift</li>
<li><strong>Train all crew members</strong> — Every person on site should understand emergency procedures and utility identification</li>
</ol>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading">The Safety Bottom Line</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Hydro excavation doesn't just reduce excavation hazards—it transforms excavation from one of construction's most dangerous activities into one of the safest. For Virginia projects near underground utilities, hydro excavation is the responsible choice for protecting both workers and infrastructure.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Beach HydroVac maintains a <strong>zero utility strike record</strong> and follows all OSHA and Virginia safety requirements on every project. <a href="/contact/">Contact us</a> or call <a href="tel:7575105220">757-510-5220</a> for safe, compliant hydro excavation across Virginia.</p>
<!-- /wp:paragraph -->`
  },
  {
    title: 'Virginia 811 Miss Utility Guide | What Contractors Must Know Before Digging',
    slug: 'virginia-811-miss-utility-guide',
    focuskw: 'virginia 811 miss utility',
    metadesc: 'Virginia 811 Miss Utility guide for contractors: how to file locate requests, tolerance zones, penalties for violations, and how hydro excavation keeps you compliant.',
    seotitle: 'Virginia 811 Miss Utility Guide | Contractor Rules & Requirements 2026',
    content: `<!-- wp:paragraph -->
<p>Before any excavation in Virginia—whether you're digging a fence post or excavating for a highway project—state law requires notification to <strong>Virginia 811 (Miss Utility)</strong>. This guide covers everything Virginia contractors need to know about 811 requirements, the locate process, tolerance zones, and how to stay compliant while keeping your project on schedule.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Virginia's Dig Law: What It Requires</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The <strong>Virginia Underground Utility Damage Prevention Act</strong> (Code of Virginia §56-265.14 through §56-265.32) is clear: anyone who excavates must notify Miss Utility. "Excavation" means any operation that moves earth—including digging, trenching, drilling, augering, boring, tunneling, scraping, and even hand digging.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Key requirements:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li>Submit a locate request <strong>at least 48 business hours</strong> before excavation (not calendar hours—weekends and holidays don't count)</li>
<li>Wait for all utilities to respond with marks before beginning work</li>
<li>Marks are valid for <strong>15 working days</strong>—after that, you must request a re-mark</li>
<li>Excavation within the <strong>24-inch tolerance zone</strong> around marked utilities must use "careful and prudent" methods</li>
<li>Emergency excavations (utility breaks, gas leaks) can proceed immediately but must still notify 811 as soon as practicable</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading">How to File a Virginia 811 Locate Request</h2>
<!-- /wp:heading -->

<!-- wp:list {"ordered":true} -->
<ol>
<li><strong>Call 811</strong> or <strong>1-800-552-7001</strong> (24/7 service)</li>
<li><strong>Online:</strong> Submit at <strong>va811.com</strong> (registered contractors only)</li>
<li>Provide: your name, company, phone, excavation address, type of work, and start date</li>
<li>Receive a <strong>ticket number</strong>—keep this with your project documentation</li>
<li>Wait 48 business hours for utility companies to mark their lines</li>
<li>Verify all utilities have responded (check positive response at va811.com)</li>
<li>Begin excavation only after all marks are in place</li>
</ol>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Understanding Utility Marking Colors</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The APWA (American Public Works Association) uniform color code is used nationwide, including Virginia:</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>Color</th><th>Utility Type</th><th>Examples</th></tr></thead><tbody><tr><td><strong style="color:#ff0000">Red</strong></td><td>Electric</td><td>Dominion Energy, NOVEC</td></tr><tr><td><strong style="color:#f5c400">Yellow</strong></td><td>Gas / Oil</td><td>Virginia Natural Gas, Columbia Gas</td></tr><tr><td><strong style="color:#ff8c00">Orange</strong></td><td>Telecom / Cable</td><td>Cox, Verizon, Lumen</td></tr><tr><td><strong style="color:#0066ff">Blue</strong></td><td>Water</td><td>City water departments</td></tr><tr><td><strong style="color:#00aa00">Green</strong></td><td>Sewer / Drain</td><td>HRSD, city sewer</td></tr><tr><td><strong style="color:#cc00cc">Purple</strong></td><td>Reclaimed Water</td><td>Irrigation systems</td></tr><tr><td><strong>White</strong></td><td>Proposed Excavation</td><td>Your dig area (you mark this)</td></tr><tr><td><strong style="color:#ff69b4">Pink</strong></td><td>Survey / Temp Marks</td><td>Surveyor reference points</td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:heading -->
<h2 class="wp-block-heading">The 24-Inch Tolerance Zone</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Virginia law defines a <strong>tolerance zone of 24 inches</strong> on either side of a marked utility (creating a 4-foot total window). Within this zone, excavation must be performed using methods that won't damage the utility. The law says "careful and prudent" methods—but doesn't specifically define what that means.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>In practice, most Virginia municipalities, VDOT, and utility companies interpret "careful and prudent" as requiring <strong>hand digging or hydro excavation</strong> within the tolerance zone. Mechanical excavation (backhoe, trencher) within 24 inches of a marked utility is widely considered non-compliant, even though the law doesn't explicitly ban it.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="/services/hydro-excavation/">Hydro excavation</a> is the ideal tolerance zone method because it's faster than hand digging and completely non-destructive to utilities.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Penalties for 811 Violations in Virginia</h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li><strong>Civil penalty:</strong> Up to $2,500 per violation for failing to notify 811 (§56-265.32)</li>
<li><strong>Damage liability:</strong> Full cost of utility repair, service restoration, and any consequential damages</li>
<li><strong>Criminal charges:</strong> Possible if a violation results in serious injury or death</li>
<li><strong>OSHA penalties:</strong> Up to $15,625 per serious violation (federal, applies in Virginia)</li>
<li><strong>Project suspension:</strong> VDOT can halt your project until compliance is verified</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading">What 811 Doesn't Cover</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Important: 811 only locates utilities owned by <strong>member utility companies</strong>. It does NOT locate:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li>Private utility lines (gas, electric, water from the meter to the building)</li>
<li>Irrigation systems and sprinkler lines</li>
<li>Septic systems and private sewer laterals</li>
<li>Underground storage tanks</li>
<li>Abandoned utilities that have been disconnected but not removed</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>For areas with potential private or undocumented utilities, <a href="/services/potholing/">potholing with hydro excavation</a> is the only way to safely verify what's underground.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Stay Compliant on Every Dig</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Beach HydroVac helps Virginia contractors stay 811-compliant while keeping projects on schedule. Our <a href="/services/hydro-excavation/">hydro excavation</a> and <a href="/services/sue-level-a/">SUE Level A verification</a> services are the safest, fastest way to excavate within tolerance zones. <a href="/contact/">Contact us</a> or call <a href="tel:7575105220">757-510-5220</a>.</p>
<!-- /wp:paragraph -->`
  }
];

async function main() {
  console.log('CREATING NEW BLOG POSTS FOR KEYWORD GAPS');
  console.log('=========================================\n');

  for (const post of newPosts) {
    const resp = await fetch(`${WP_URL}/wp-json/wp/v2/posts`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title: post.title,
        slug: post.slug,
        content: post.content,
        status: 'publish',
        meta: {
          _yoast_wpseo_focuskw: post.focuskw,
          _yoast_wpseo_metadesc: post.metadesc,
          _yoast_wpseo_title: post.seotitle
        }
      })
    });

    if (resp.ok) {
      const data = await resp.json();
      const words = post.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(w => w.length > 2).length;
      console.log(`OK  /${post.slug}/ (ID:${data.id}) | ~${words} words`);
      console.log(`    Focus: "${post.focuskw}"`);
    } else {
      console.log(`FAIL /${post.slug}/ | ${resp.status}`);
      const err = await resp.text();
      console.log(`  ${err.substring(0, 200)}`);
    }
  }

  console.log('\nAll new posts created!');
}

main().catch(console.error);
