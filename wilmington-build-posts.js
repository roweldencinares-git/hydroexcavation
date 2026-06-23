import fetch from 'node-fetch';

const WP_URL = 'https://springgreen-stinkbug-577322.hostingersite.com';
const AUTH = 'Basic ' + Buffer.from('roweldencinares@gmail.com:jqfA ESlL T5xL QsLo e0fI H4Pt').toString('base64');
const HEADERS = { 'Authorization': AUTH, 'Content-Type': 'application/json' };

async function createCategory() {
  const res = await fetch(`${WP_URL}/wp-json/wp/v2/categories`, {
    method: 'POST', headers: HEADERS,
    body: JSON.stringify({ name: 'Hydro Excavation Information', slug: 'hydro-excavation-information', description: 'Educational guides and resources about hydro excavation and vacuum excavation.' })
  });
  const cat = await res.json();
  return cat.id || null;
}

async function getExistingCategory(slug) {
  const res = await fetch(`${WP_URL}/wp-json/wp/v2/categories?slug=${slug}`, { headers: HEADERS });
  const cats = await res.json();
  return cats[0]?.id || null;
}

async function createPost(post, catId) {
  const res = await fetch(`${WP_URL}/wp-json/wp/v2/posts`, {
    method: 'POST', headers: HEADERS,
    body: JSON.stringify({ title: post.title, slug: post.slug, status: 'publish', content: post.content, categories: [catId] })
  });
  const result = await res.json();
  if (!result.id) throw new Error(JSON.stringify(result).substring(0, 200));
  if (post.surerank) {
    await fetch(`${WP_URL}/wp-json/surerank/v1/admin/editor`, {
      method: 'POST', headers: HEADERS,
      body: JSON.stringify({ post_id: result.id, data: { title: post.surerank.title, description: post.surerank.description } })
    }).catch(() => {});
  }
  return result;
}

const posts = [

  {
    title: 'What is Hydro Excavation?',
    slug: 'what-is-hydro-excavation',
    surerank: {
      title: 'What is Hydro Excavation? Complete Guide | HydroVac Pro',
      description: 'Learn what hydro excavation is, how it works, and why it\'s the safest digging method available. Complete guide to hydrovac technology for contractors and project owners.'
    },
    content: `
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">What is Hydro Excavation?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Hydro excavation — also called hydrovac, vacuum excavation, or hydrovacking — is a <strong>non-destructive digging method</strong> that combines pressurized water with a high-powered industrial vacuum to safely break up and remove soil. Unlike traditional excavation using backhoes and mechanical equipment, hydro excavation does not use blades or teeth that can damage underground utilities, pipes, or cables.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>The process works in two stages: first, a pressurized water jet (typically 1,000–3,000 PSI) breaks the soil apart. Then a powerful vacuum system — generating 15,000–27,000 CFM of air flow — draws the loosened slurry into a debris tank on the truck. The result is a precise, clean excavation with minimal surface disruption.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">How Does a Hydrovac Truck Work?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>A hydrovac truck is a specialized vehicle that carries two main systems:</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Water system</strong> — A tank (typically 500–2,000 gallons), a high-pressure pump, and a flexible wand or boom arm that the operator directs into the dig area</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Vacuum system</strong> — A large displacement blower driven by the truck's PTO (power take-off), connected to a hose (typically 4–6 inches in diameter) that pulls soil slurry into a debris tank (typically 500–2,000 gallons)</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
<!-- wp:paragraph -->
<p>Operators can work at ground level or use a remote boom arm to excavate up to 60 feet away from the truck — useful in areas with limited access.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Why Use Hydro Excavation Instead of Traditional Digging?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>In the United States, underground utility strikes cost the industry an estimated <strong>$1.5 billion per year</strong> in repairs, injuries, and project delays. The Common Ground Alliance reports that a utility strike occurs every 6 minutes in the US. Hydro excavation eliminates most of this risk by removing the blade from the equation entirely.</p>
<!-- /wp:paragraph -->
<!-- wp:columns -->
<div class="wp-block-columns">
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1rem"}}} -->
<h3 class="wp-block-heading" style="font-size:1rem">Traditional Excavation</h3>
<!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.9rem"}}} -->
<ul style="font-size:0.9rem">
<!-- wp:list-item --><li>High risk of utility damage</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Large surface footprint</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Slow in congested areas</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Large spoil piles to manage</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:column -->
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1rem"}}} -->
<h3 class="wp-block-heading" style="font-size:1rem">Hydro Excavation</h3>
<!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.9rem"}}} -->
<ul style="font-size:0.9rem">
<!-- wp:list-item --><li>Non-destructive — utilities stay safe</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Minimal surface disturbance</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Works in tight, congested areas</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Slurry stored in debris tank</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Where is Hydro Excavation Used?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Hydrovac is now the preferred digging method for utility contractors, municipalities, telecom companies, oil &amp; gas operators, and civil engineers across the US. Common applications include potholing, slot trenching, daylighting, debris removal, cold weather digging, and piling hole excavation.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p><a href="/information/benefits-of-hydro-excavation/">Learn more about the benefits of hydro excavation →</a></p>
<!-- /wp:paragraph -->
`
  },

  {
    title: 'History of Hydro Excavation',
    slug: 'history-of-hydro-excavation',
    surerank: {
      title: 'History of Hydro Excavation | HydroVac Pro',
      description: 'Discover the origins of hydro excavation — from gold mining in the 1800s to modern hydrovac trucks used across the US today.'
    },
    content: `
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">The Origins of Hydro Excavation</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>The concept of using water to move soil is not new. During the California Gold Rush of 1853, miners pioneered a technique called <strong>hydraulic mining</strong> — blasting pressurized water at hillsides to dislodge gold-bearing gravel. While effective at moving large volumes of material, hydraulic mining caused massive environmental destruction and was eventually banned in California in 1884.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>The key innovation that would become modern hydro excavation — adding a vacuum system to collect the loosened material rather than letting it flow away — did not emerge until nearly a century later.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">1970s–1980s: Canada Leads the Way</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>The modern hydrovac industry is widely credited to <strong>Canada</strong>, specifically to the oil sands operations in Alberta. In the 1970s and 1980s, Canadian contractors working in extreme cold weather conditions faced a major challenge: frozen ground made conventional mechanical excavation difficult or impossible, and the stakes of damaging pipelines in remote oil fields were extremely high.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>Canadian engineers developed early hydrovac systems that used hot water to thaw frozen soil combined with vacuum extraction. These systems proved dramatically safer and more effective than mechanical alternatives, and the technology spread quickly through the Canadian energy sector.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">1990s: The US Market Opens Up</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Hydrovac equipment began crossing the US border in the 1990s, initially adopted by utility contractors and telecom companies responding to a growing problem: the expansion of underground infrastructure in cities made mechanical excavation near buried utilities increasingly dangerous and expensive.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>The <strong>Telecommunications Act of 1996</strong> accelerated fiber optic deployment across the US, creating massive demand for safe underground digging near existing utility corridors. Hydrovac adoption grew rapidly as a result.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">2000s–2010s: Industry Standardization</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>As the industry matured, manufacturers like Vactor, Aquatech, and Tornado expanded production of purpose-built hydrovac trucks. The <strong>Common Ground Alliance</strong> began publishing annual reports on utility strikes, creating data that documented the cost of mechanical excavation near buried utilities and accelerated adoption of hydrovac as a safer alternative.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>State and local "call before you dig" laws (811 programs) further drove demand for safer excavation methods, especially for potholing to verify utility locations before larger construction projects.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Today: A $1 Billion+ Industry</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Hydro excavation is now a $1+ billion industry in North America, with thousands of service companies operating across all 50 states. Equipment has advanced significantly — modern trucks feature remote-controlled boom arms, heated water systems for cold weather operation, and debris tanks exceeding 2,000 gallons.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>The industry continues to grow as infrastructure upgrades, broadband expansion, renewable energy projects, and tighter safety regulations drive ongoing demand for non-destructive digging across the United States.</p>
<!-- /wp:paragraph -->
`
  },

  {
    title: 'Benefits of Hydro Excavation',
    slug: 'benefits-of-hydro-excavation',
    surerank: {
      title: 'Benefits of Hydro Excavation | Why Hydrovac Wins | HydroVac Pro',
      description: 'Discover the key benefits of hydro excavation over traditional digging — safer, faster, more precise, and lower cost. Why contractors choose hydrovac for utility work.'
    },
    content: `
<!-- wp:paragraph -->
<p>Hydro excavation has rapidly become the preferred digging method for utility contractors, municipalities, and engineering firms across the United States. Here are the core reasons why:</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">1. Non-Destructive — No Utility Damage</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>The single biggest advantage of hydro excavation is that <strong>water and vacuum cannot cut through pipes, conduit, or fiber optic cables</strong>. Mechanical excavators cause thousands of utility strikes every year — each one potentially costing tens of thousands of dollars in emergency repairs, project delays, and liability. Hydrovac eliminates this risk.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">2. Greater Precision</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>A skilled hydrovac operator can excavate around buried utilities with <strong>inch-level precision</strong>. This is critical for potholing and daylighting work where the goal is to expose a utility without disturbing it. Traditional hand-digging can achieve similar precision but is far slower and more labor-intensive.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">3. Faster Than Hand Digging</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>A hydrovac truck can excavate a standard pothole (18" x 18" x 24" deep) in <strong>2–5 minutes</strong>. The same work by hand typically takes 15–30 minutes per hole. On projects requiring dozens or hundreds of potholes, the time savings compound dramatically.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">4. Minimal Surface Disruption</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Hydrovac leaves a much smaller surface footprint than mechanical excavation. No wide trenches, no large equipment disturbing surrounding soil, and no massive spoil piles. This is especially valuable in <strong>landscaped areas, parking lots, and public spaces</strong> where surface restoration costs are high.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">5. Spoil Containment</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>All excavated material is stored in the truck's debris tank — not piled on the ground beside the dig. This keeps the job site cleaner, reduces environmental concerns, and makes disposal straightforward. Contaminated soil (near fuel tanks, chemicals) is safely contained for proper disposal.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">6. Remote Digging Capability</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Modern hydrovac trucks can excavate up to 60 feet away from the truck using extended boom arms and hose systems. This allows work in areas where truck access is restricted — under bridges, inside buildings, in tight urban corridors, and on slopes.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">7. Works in Any Weather</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Equipped with hot water systems, hydrovac trucks can operate in frozen ground conditions that stop mechanical equipment entirely. This is particularly valuable for utility maintenance in northern states and Canada during winter months.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">8. Reduced Liability</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Using hydro excavation demonstrates due diligence in areas with known underground utilities. Insurance carriers and project owners increasingly require or reward the use of non-destructive excavation methods, reducing contractor liability exposure.</p>
<!-- /wp:paragraph -->
`
  },

  {
    title: 'Potholing and Daylighting with Hydro Excavation',
    slug: 'potholing-daylighting',
    surerank: {
      title: 'Potholing & Daylighting | Hydro Excavation Guide | HydroVac Pro',
      description: 'Learn how potholing and daylighting with hydro excavation safely exposes underground utilities before construction. Standard process, depths, and costs explained.'
    },
    content: `
<!-- wp:paragraph -->
<p>Potholing and daylighting are the most common applications of hydro excavation — and the ones with the highest ROI for contractors and project owners working near buried utilities.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">What is Potholing?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p><strong>Potholing</strong> is the process of excavating a small, precise test hole to expose and verify the exact location, depth, and type of underground utilities before larger construction begins. Also called a <strong>test pit</strong> or <strong>exploratory excavation</strong>, a pothole is typically 18–24 inches in diameter and 2–10 feet deep, depending on the depth of the utilities being located.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">What is Daylighting?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p><strong>Daylighting</strong> is essentially the same process — exposing buried utilities to daylight — but the term is more commonly used in the context of exposing utilities along a planned construction corridor to verify their condition and position before trenching or boring. While potholing tends to describe a single test hole, daylighting often describes a series of test holes along a route.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Why Potholing is Required Before Construction</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Most utility locating services (the 811 "call before you dig" system) use electronic signal detection to mark the approximate horizontal position of buried utilities. However, these marks have a <strong>±18-inch tolerance</strong> and do not indicate depth. When construction crews are installing new utilities, boring, or trenching near existing infrastructure, potholing provides SUE (Subsurface Utility Engineering) Level A quality — the highest level of certainty about utility position.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>Many state DOTs and federal projects now require Level A SUE data along construction corridors, making potholing with hydrovac a standard pre-construction step.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">How the Process Works</h2>
<!-- /wp:heading -->
<!-- wp:list {"ordered":true} -->
<ol>
<!-- wp:list-item --><li>Utility locate marks are painted on the surface by the 811 locator</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Hydrovac operator positions the truck nearby and sets up the water wand and vacuum hose</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Pressurized water breaks soil at the locate mark, starting at the surface</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Vacuum removes slurry as the operator works downward</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>When the utility is exposed, the operator stops and documents position, depth, and type</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>The pothole is typically backfilled with the removed soil or flowable fill</li><!-- /wp:list-item -->
</ol>
<!-- /wp:list -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Typical Potholing Specifications</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Hole size:</strong> 12–24 inches diameter</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Depth:</strong> 2–10 feet (varies by utility type)</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Production rate:</strong> 5–15 potholes per day depending on depth, soil, and conditions</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Typical cost:</strong> $200–$600 per pothole depending on region, depth, and access</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
<!-- wp:paragraph -->
<p><a href="/listings/service-companies/">Find potholing and daylighting contractors near you →</a></p>
<!-- /wp:paragraph -->
`
  },

  {
    title: 'Slot Trenching with Hydro Excavation',
    slug: 'slot-trenching',
    surerank: {
      title: 'Slot Trenching | Hydro Excavation Service | HydroVac Pro',
      description: 'Learn how hydro excavation slot trenching creates narrow, precise trenches for utilities, pipes, and cables with minimal surface disruption and no utility damage risk.'
    },
    content: `
<!-- wp:paragraph -->
<p>Slot trenching is one of the most efficient applications of hydro excavation, used anywhere a long, narrow trench is needed — for installing utilities, conduit, irrigation lines, or drainage systems — especially in congested areas where wide mechanical trenching is impractical or too risky.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">What is Slot Trenching?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>A slot trench is a narrow excavation — typically <strong>4 to 18 inches wide</strong> and anywhere from a few feet to hundreds of feet long — created by making a series of overlapping hydrovac passes along a defined path. The result is a precise, clean trench with minimal soil disturbance on either side.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>Slot trenching is fundamentally different from traditional open-cut trenching, where a machine creates a wide V- or box-shaped cut that disturbs a large swath of surface. A hydrovac slot trench looks more like a <strong>saw cut through the ground</strong> — narrow, straight, and well-defined.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Common Uses for Slot Trenching</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Fiber optic conduit installation</strong> in urban rights-of-way where multiple utilities already exist</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Electrical service upgrades</strong> near existing underground lines</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Irrigation system installation</strong> in landscaped areas, parks, and golf courses</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Drainage pipe installation</strong> where conventional equipment can't access</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Gas line tie-ins</strong> in congested utility corridors</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Cathodic protection systems</strong> for pipeline corrosion control</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Slot Trenching vs. Mechanical Trenching</h2>
<!-- /wp:heading -->
<!-- wp:columns -->
<div class="wp-block-columns">
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} -->
<h3 class="wp-block-heading" style="font-size:1rem;font-weight:700">Mechanical Trenching</h3>
<!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.9rem"}}} -->
<ul style="font-size:0.9rem">
<!-- wp:list-item --><li>Wide cut (2–4 ft) disrupts surface</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>High utility strike risk</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Large spoil pile to manage</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Cannot work in tight spaces</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:column -->
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} -->
<h3 class="wp-block-heading" style="font-size:1rem;font-weight:700">Hydrovac Slot Trenching</h3>
<!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.9rem"}}} -->
<ul style="font-size:0.9rem">
<!-- wp:list-item --><li>Narrow cut (4–18 in) — minimal disruption</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Safe near existing utilities</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Spoil contained in truck tank</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Works in any accessible area</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Production Rates</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Hydrovac slot trenching production varies significantly based on soil type, trench depth, and trench width. In average soil conditions:</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>6" wide x 24" deep:</strong> 80–120 linear feet per hour</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>12" wide x 36" deep:</strong> 40–60 linear feet per hour</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>18" wide x 48" deep:</strong> 20–35 linear feet per hour</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
<!-- wp:paragraph -->
<p>Clay soils, rocky conditions, or very deep trenches will reduce production. Sandy soils or loam tend to be faster.</p>
<!-- /wp:paragraph -->
`
  },

  {
    title: 'Debris Removal with Hydro Excavation',
    slug: 'debris-removal',
    surerank: {
      title: 'Debris Removal | Hydrovac Vacuum Services | HydroVac Pro',
      description: 'Hydro excavation and vacuum trucks are ideal for debris removal in confined spaces, industrial sites, and environmental cleanup. Learn how it works and when to use it.'
    },
    content: `
<!-- wp:paragraph -->
<p>Beyond digging, hydrovac trucks are powerful <strong>industrial vacuum systems</strong> capable of removing wet, dry, and mixed debris from virtually any location — including confined spaces, tanks, catch basins, and contaminated sites where other equipment can't safely operate.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">What Types of Debris Can Hydrovac Remove?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Hydrovac and vacuum excavation trucks are not limited to soil. They can handle:</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Dry debris:</strong> Sand, gravel, concrete dust, dry soil, granular material</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Wet debris:</strong> Sludge, slurry, mud, standing water</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Industrial waste:</strong> Catch basin cleanout, storm drain debris, sediment</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Contaminated material:</strong> Petroleum-impacted soil, chemical spill cleanup</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Construction debris:</strong> Slurry from HDD bores, cuttings from drilling</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Common Debris Removal Applications</h2>
<!-- /wp:heading -->
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Catch Basin and Storm Drain Cleanout</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Municipalities and property owners use vacuum trucks to clean accumulated sediment, debris, and leaves from catch basins and storm drain inlets — maintaining drainage system capacity and preventing flooding. A hydrovac truck can clean dozens of catch basins in a single day.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Confined Space Debris Removal</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Entering confined spaces (manholes, tanks, vaults, tunnels) to remove debris manually is one of the most dangerous tasks in construction. Hydrovac vacuum hoses can be inserted into confined spaces without workers needing to enter — removing material safely from outside the hazardous environment.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Slurry and HDD Cuttings Removal</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Horizontal directional drilling (HDD) projects generate large volumes of drilling fluid mixed with soil cuttings. Vacuum trucks efficiently collect this slurry for transport and disposal, keeping job sites clean and compliant.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Environmental Cleanup</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Fuel spills, chemical leaks, and contaminated soil removal often require precise, contained excavation. Hydrovac trucks capture contaminated material in a sealed tank, preventing secondary contamination and allowing proper manifest-tracked disposal at licensed facilities.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Remote Reach Capability</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Most hydrovac trucks can extend vacuum hose 50–100 feet from the truck, allowing debris removal from areas where the truck cannot physically access. This is especially useful for below-grade structures, interior building areas, and sites with weight-restricted access.</p>
<!-- /wp:paragraph -->
`
  },

  {
    title: 'Exposing Utilities with Hydro Excavation',
    slug: 'exposing-utilities',
    surerank: {
      title: 'Exposing Utilities Safely with Hydro Excavation | HydroVac Pro',
      description: 'How hydro excavation safely exposes underground utilities — gas, electric, water, fiber, and telecom — without risk of damage. The standard method for utility exposure across the US.'
    },
    content: `
<!-- wp:paragraph -->
<p>Exposing underground utilities is one of the highest-risk activities in construction. Every year, thousands of utility strikes in the United States result in service outages, injuries, fatalities, and multi-million-dollar repair bills. Hydro excavation has become the <strong>industry standard</strong> for safely exposing buried utilities because it physically cannot cut through pipes, cables, or conduit.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Why Utility Exposure Requires Non-Destructive Methods</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Underground utilities include gas mains, electric transmission lines, water mains, sanitary sewer, storm sewer, telecommunications conduit, fiber optic cable, and more. In urban and suburban areas, <strong>multiple utilities often cross the same corridor</strong> at varying depths, making mechanical excavation extremely risky.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>The 811 "call before you dig" program provides locate marks, but those marks have positional tolerances of ±18 inches and provide no depth information. When an excavator hits a gas main, the result can be catastrophic. When a backhoe severs a fiber optic cable, it can knock out internet service for tens of thousands of customers.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Types of Utilities Commonly Exposed by Hydrovac</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Natural gas mains and service lines</strong> — any penetration can be catastrophic</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>High-voltage electric transmission lines</strong> — underground lines at 13kV–138kV</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Water mains</strong> — from 4-inch services to 36-inch transmission mains</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Fiber optic cable</strong> — often undetectable by locators; easily severed</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Telecommunications conduit</strong> — copper cable bundles, innerduct systems</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Petroleum pipelines</strong> — crude oil, refined products, NGL transmission lines</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">The Utility Exposure Process</h2>
<!-- /wp:heading -->
<!-- wp:list {"ordered":true} -->
<ol>
<!-- wp:list-item --><li><strong>811 Locate:</strong> The 811 system is called and utilities are marked with paint or flags</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Hydrovac Setup:</strong> Truck positions near the locate marks; water and vacuum hoses deployed</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Careful Excavation:</strong> Operator works from the locate mark downward, reducing water pressure as the utility depth is approached</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Exposure and Documentation:</strong> When the utility is visible, the operator stops, photographs, measures depth and horizontal offset from the surface mark</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Reporting:</strong> Data is recorded for the engineering or construction team (SUE Level A data)</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Backfill:</strong> Pothole is backfilled and surface restored</li><!-- /wp:list-item -->
</ol>
<!-- /wp:list -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Water Pressure Near Utilities</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Experienced hydrovac operators reduce water pressure significantly when approaching known utility depths — often dropping from 2,000 PSI to 500–800 PSI near the utility. This ensures the water can still break loose soil without risking damage to the utility surface coating, protective wrap, or outer jacket.</p>
<!-- /wp:paragraph -->
`
  },

  {
    title: 'Piling Hole Excavation with Hydrovac',
    slug: 'piling-hole-excavation',
    surerank: {
      title: 'Piling Hole Excavation | Hydrovac Deep Hole Digging | HydroVac Pro',
      description: 'How hydro excavation creates clean, precise piling holes for foundations, sign posts, and light poles — especially near existing utilities. Faster than augers in difficult soil.'
    },
    content: `
<!-- wp:paragraph -->
<p>Creating cylindrical holes for piling, sign posts, light poles, utility poles, and foundation columns is a precise, repetitive task that hydrovac handles exceptionally well — especially when those holes need to be close to existing underground utilities or in locations where augers and boring equipment cannot safely operate.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">What is Piling Hole Excavation?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Piling hole excavation with hydrovac involves using a <strong>focused water jet</strong> to break soil within a defined circular footprint, while the vacuum hose removes the loosened material to create a clean, vertical-walled cylindrical hole. The holes can range from <strong>6 inches to 36 inches in diameter</strong> and depths of 4 to 20+ feet, depending on the structural requirements.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Advantages Over Auger Drilling</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Auger boring is the traditional method for creating piling holes, but it has significant limitations that hydrovac solves:</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Near utilities:</strong> An auger cannot safely operate within 18 inches of an existing utility. Hydrovac can work right up to the edge of a buried pipe or cable.</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Rocky or mixed soil:</strong> Augers bind or break in cobble and hard clay. Hydrovac slices through mixed soil conditions more consistently.</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Access-restricted sites:</strong> A compact hydrovac truck can access areas where drilling rigs cannot maneuver.</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Spoil management:</strong> Auger spoil is deposited on the surface. Hydrovac captures it all in the debris tank.</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Common Applications</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li>Highway sign post installation along utility corridors</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Street light pole foundations in urban medians</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Utility pole replacement near buried cables</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Foundation piling for small structures</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Fence post installation in commercial and industrial sites</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Solar panel foundation posts in utility corridors</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Typical Specifications</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Hole diameter:</strong> 6–36 inches</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Depth:</strong> 4–20+ feet</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Production rate:</strong> 4–12 holes per day depending on depth, diameter, and soil type</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Wall condition:</strong> Clean, vertical walls suitable for direct concrete placement</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
`
  },

  {
    title: 'Cold Weather Digging with Hydro Excavation',
    slug: 'cold-weather-digging',
    surerank: {
      title: 'Cold Weather Digging | Hot Water Hydrovac | HydroVac Pro',
      description: 'How hydro excavation handles frozen ground with hot water systems. The only reliable non-destructive excavation method in freezing temperatures. Learn how it works.'
    },
    content: `
<!-- wp:paragraph -->
<p>Cold weather digging is one of the original applications that drove hydro excavation's development in Canada — and it remains one of the most compelling advantages over mechanical alternatives. When ground freezes, traditional excavation becomes slow, expensive, and dangerous. Hydrovac with hot water systems works year-round regardless of ground temperature.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">The Cold Weather Problem</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>In northern states and Canada, ground frost can penetrate <strong>2 to 6 feet deep</strong> during severe winters. Frozen soil behaves like concrete — it cannot be broken apart by standard hand tools, and mechanical excavators must apply enormous force that risks damaging buried utilities. Emergency utility repairs in winter months (gas leaks, water main breaks, power outages) cannot wait for spring thaw.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">How Hot Water Hydrovac Works</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Hydrovac trucks equipped for cold weather operation include an <strong>onboard water heater</strong> — typically diesel-fired — that can heat water to 140–200°F before it is pumped through the water wand. Hot water simultaneously:</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li>Thaws frozen soil at the point of contact</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Breaks the thawed soil apart with the pressure jet</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Allows the vacuum to remove the loosened material</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
<!-- wp:paragraph -->
<p>The result is that a hydrovac truck with hot water capability can excavate frozen ground <strong>nearly as fast as unfrozen soil</strong> in the same conditions — something no mechanical method can match.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Cold Weather Operational Considerations</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Water tank heating:</strong> The onboard water tank must be kept warm to prevent freezing between jobs</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Hose management:</strong> Vacuum hoses can freeze if left with standing water during breaks</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Debris tank:</strong> Wet slurry in the debris tank can freeze — trucks use insulated tanks and may add antifreeze agents for disposal</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Water consumption:</strong> Hot water excavation uses more water per cubic foot removed compared to normal conditions</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Who Uses Cold Weather Hydrovac?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Gas utilities (emergency leak repair), water/sewer utilities (main break response), telecommunications (fiber cable splicing), and DOT/highway maintenance crews are the primary users of cold weather hydrovac services. The inability to delay emergency repairs makes this one of the most time-sensitive and premium-priced hydrovac services.</p>
<!-- /wp:paragraph -->
`
  },

  {
    title: 'Remote Digging with Hydro Excavation',
    slug: 'remote-digging',
    surerank: {
      title: 'Remote Digging | Hydrovac Boom Arm & Hose Extension | HydroVac Pro',
      description: 'How hydro excavation handles remote and hard-to-access excavation sites using extended boom arms and long vacuum hoses — up to 60+ feet from the truck.'
    },
    content: `
<!-- wp:paragraph -->
<p>One of the most underappreciated capabilities of hydro excavation is its ability to dig in locations where the truck itself cannot physically go. Through extended boom arms and long vacuum hose systems, hydrovac trucks can excavate up to <strong>60 feet or more</strong> from the truck's position — opening up work sites that other equipment simply cannot reach.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">What is Remote Digging?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Remote digging uses an <strong>extended boom arm</strong> mounted on the hydrovac truck, or simply a long flexible vacuum hose, to excavate in areas where the truck cannot be positioned. The water wand is also extended, allowing pressurized water to be delivered to the dig point while the vacuum hose removes spoil — all while the truck remains parked at a safe, accessible location.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Typical Remote Digging Reach</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Standard boom arm:</strong> 18–25 feet of horizontal reach from the truck</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Extended hose systems:</strong> 40–100 feet of hose reach with some performance loss in suction</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Practical limit:</strong> Most contractors recommend staying within 60 feet for efficient production</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Applications for Remote Excavation</h2>
<!-- /wp:heading -->
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Under Bridges and Overpasses</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Foundation and abutment work beneath bridge structures often requires excavation where large equipment cannot fit. A hydrovac truck parked on the roadway or shoulder can extend its arm under the bridge structure to excavate utilities, inspect foundations, or install new conduit.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Inside Buildings and Structures</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Vacuum hoses can be run through doorways or windows into buildings, allowing excavation inside floor slabs, basements, and crawl spaces without the mess and risk of mechanical equipment inside a structure.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Environmentally Sensitive Areas</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Wetlands, stream banks, and protected vegetation areas may restrict heavy equipment access. A hydrovac truck positioned on a nearby road or upland area can extend its reach into a sensitive zone with a much smaller environmental footprint than mechanical alternatives.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Restricted-Weight Sites</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Spring weight restrictions, weak bridges, or unpaved areas with poor bearing capacity may prohibit heavy equipment. A smaller hydrovac truck positioned at the legal weight limit location can work remotely into the restricted area.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Performance Considerations</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Every foot of vacuum hose adds friction loss, reducing suction at the dig point. Water pressure also drops over long horizontal runs. Most operators find production rates decrease by 20–40% at maximum reach compared to working directly adjacent to the truck. Proper hose sizing and minimizing bends in the hose run help maintain performance at extended distances.</p>
<!-- /wp:paragraph -->
`
  },

  {
    title: 'Industries Where Hydro Excavation is Used',
    slug: 'industries-where-hydro-excavation-is-used',
    surerank: {
      title: 'Industries That Use Hydro Excavation | HydroVac Pro',
      description: 'Discover which industries rely on hydro excavation — from oil & gas to telecom, municipal utilities, construction, and environmental remediation. Full industry breakdown.'
    },
    content: `
<!-- wp:paragraph -->
<p>Hydro excavation has spread across nearly every industry that involves underground infrastructure. Here is a breakdown of the major sectors where hydrovac is now a standard tool of the trade.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Oil &amp; Gas</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>The oil and gas industry was among the earliest adopters of hydrovac technology, particularly in Canada's oil sands operations. Today, hydrovac is used throughout oil and gas for <strong>pipeline exposure and inspection</strong>, tie-in preparation, valve box excavation, cathodic protection installation, and spill remediation. Working safely around high-pressure pipelines carrying crude oil, natural gas, or refined products makes non-destructive excavation non-negotiable.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Electric Utilities</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Underground electric utilities — ranging from 120V residential services to 138kV transmission cables — require careful, non-destructive exposure for inspection, splicing, repair, and upgrade work. Hydrovac is the standard method for exposing underground electric lines safely, and is particularly critical for <strong>underground transmission line work</strong> where accidental contact is potentially fatal.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Telecommunications &amp; Fiber Optic</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Fiber optic cables are invisible to most utility locators (they carry no electrical signal to detect), making mechanical excavation near them extremely risky. Hydrovac is the standard method for potholing, daylighting, and slot trenching near telecom infrastructure. The nationwide fiber expansion underway throughout the 2020s has driven massive growth in hydrovac demand from telecom contractors.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Municipal Water &amp; Sewer</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>City and county utilities use hydrovac for water main repairs, valve box excavation, sewer manhole access, catch basin cleaning, and storm drain maintenance. The ability to work safely in congested urban rights-of-way — without shutting down multiple utility services — makes hydrovac the preferred choice for municipal crews across the US.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Transportation &amp; DOT</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>State departments of transportation use hydrovac for <strong>sign post installation</strong>, guardrail foundation work, drainage system maintenance, and utility conflict resolution on highway projects. Federal and state highway funds increasingly include hydrovac as a standard line item for projects in congested utility corridors.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Construction</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>General contractors, civil contractors, and specialty subcontractors use hydrovac for <strong>utility exposure before foundation work</strong>, piling hole excavation, and slot trenching for underground infrastructure on new construction projects. Any project in an area with existing underground utilities benefits from hydrovac during the site preparation phase.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Environmental Remediation</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Environmental contractors use hydrovac for <strong>contaminated soil excavation</strong>, underground storage tank (UST) exposure and removal, and spill cleanup. The contained debris tank allows contaminated material to be transported directly to licensed disposal facilities without secondary soil contamination from open excavation.</p>
<!-- /wp:paragraph -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Industrial Facilities</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Refineries, chemical plants, manufacturing facilities, and power plants use hydrovac for both <strong>confined space debris removal</strong> and excavation within facilities where mechanical equipment access is restricted and underground utility density is extremely high.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p><a href="/listings/">Find hydrovac contractors in your industry →</a></p>
<!-- /wp:paragraph -->
`
  }

];

async function run() {
  console.log('Creating Hydro Excavation Information category...');
  let catId = await getExistingCategory('hydro-excavation-information');
  if (!catId) {
    catId = await createCategory();
    console.log(`Category created: ID ${catId}`);
  } else {
    console.log(`Category exists: ID ${catId}`);
  }

  console.log('\nBuilding information posts...\n');
  for (const post of posts) {
    try {
      const result = await createPost(post, catId);
      console.log(`✅ ${post.title}`);
      console.log(`   → ${WP_URL}/${post.slug}/  (ID: ${result.id})`);
    } catch (err) {
      console.error(`❌ ${post.title}: ${err.message}`);
    }
  }
  console.log('\nDone! All 11 information posts created.');
}

run().catch(console.error);
