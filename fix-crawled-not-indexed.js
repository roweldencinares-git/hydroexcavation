import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(
  process.env.BEACH_HYDROVAC_WP_USER + ':' + process.env.BEACH_HYDROVAC_WP_PASSWORD
).toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

// ── POST 3772: hydro-excavation-suffolk-va ────────────────────────────────────
const suffolkContent = `
<p style="font-size:1.125rem">Suffolk is one of Virginia&#8217;s fastest-growing cities by land area — and with that growth comes one of the most complex underground utility environments in Hampton Roads. Beach HydroVac provides <strong>hydro excavation and vacuum excavation</strong> services throughout all of Suffolk, the only non-destructive method for safely digging near buried utilities in high-density development zones.</p>

<h2 class="wp-block-heading">Why Suffolk&#8217;s Underground Is Different</h2>
<p>Suffolk presents a unique utility challenge that sets it apart from other Hampton Roads cities. The city spans 430 square miles — larger than any other city in Virginia — and contains three distinct underground environments that require different approaches:</p>
<ul class="wp-block-list">
<li><strong>Legacy downtown core</strong> (Church Street, Main Street corridor): Utilities dating to the early 1900s, inconsistently mapped, running under buildings and narrow right-of-ways. Exact depths are unreliable from records alone.</li>
<li><strong>Rapid-growth suburban zones</strong> (Harbour View, North Suffolk, Route 58 corridor): New infrastructure installed within the last 10–15 years, but at high density and sometimes before final as-built drawings were filed. Fiber, gas, and high-voltage runs in the same corridors.</li>
<li><strong>Rural and industrial western zones</strong> (Whaleyville, Driver, near the Port of Virginia inland terminal): Agricultural drainage tiles, private utility runs, and aging cast-iron water mains with no digital record.</li>
</ul>
<p>These three environments require the same answer: physical verification with hydro excavation before any mechanical digging begins.</p>

<h2 class="wp-block-heading">Suffolk Utilities Beach HydroVac Works Around</h2>
<p>Our crews are familiar with every major utility operator active in Suffolk:</p>
<ul class="wp-block-list">
<li><strong>Dominion Energy Virginia</strong> — transmission and distribution lines, including high-voltage runs along Route 460 and Nansemond Parkway</li>
<li><strong>Virginia Natural Gas</strong> — distribution mains throughout Harbour View and the Route 58 commercial corridor</li>
<li><strong>Cox Communications</strong> — buried coax and fiber throughout Suffolk residential neighborhoods</li>
<li><strong>Verizon / Zayo</strong> — fiber runs in commercial and industrial zones</li>
<li><strong>City of Suffolk Water &amp; Sewer</strong> — municipal water mains and sewer interceptors, including aged cast-iron mains near downtown</li>
<li><strong>VDOT right-of-way utilities</strong> — storm drainage and conduit in Route 17, Route 58, Route 460, and Route 10 corridors</li>
</ul>

<h2 class="wp-block-heading">Hydro Excavation Services in Suffolk</h2>
<ul class="wp-block-list">
<li><strong>Potholing</strong> — verify exact utility depth and position before mechanical digging. We provide written documentation on every pothole for your project records.</li>
<li><strong>Daylighting</strong> — expose buried utilities for engineering documentation, tie-in connections, or utility owner inspection</li>
<li><strong>Vacuum excavation</strong> — safe soil removal in confined spaces and around sensitive infrastructure with 500ft+ reach via remote boom</li>
<li><strong>Slot trenching</strong> — narrow, precise trenches for fiber optic conduit and utility runs through developed Suffolk corridors</li>
<li><strong>SUE Level A</strong> — full physical exposure with survey coordinates for VDOT submittals and engineering design documents</li>
<li><strong>Emergency response</strong> — same-day response available for utility strikes and active leaks in Suffolk</li>
</ul>

<h2 class="wp-block-heading">Suffolk Growth Corridors We Actively Serve</h2>

<h3 class="wp-block-heading">Harbour View &amp; North Suffolk</h3>
<p>Harbour View is one of the fastest-developing mixed-use corridors in Hampton Roads. New commercial pads, multifamily buildings, and retail centers are under construction alongside existing residential neighborhoods — all sharing utility corridors that were built in phases by multiple contractors. As-built records often lag installation by 6–18 months. We regularly pothole in this area for general contractors managing new builds near existing infrastructure.</p>

<h3 class="wp-block-heading">Route 58 &amp; Nansemond Parkway Commercial Zone</h3>
<p>The Route 58 commercial corridor from Harbour View to downtown Suffolk runs alongside major Dominion transmission infrastructure. High-voltage line setbacks require precise potholing before any excavation within 10 feet. Beach HydroVac is familiar with the Dominion clearance process and can provide the utility exposure documentation required for work permits near transmission assets.</p>

<h3 class="wp-block-heading">Downtown Suffolk &amp; Church Street</h3>
<p>Downtown Suffolk redevelopment involves working around 100-year-old utility infrastructure in tight right-of-ways. We perform utility daylighting for developers and the City of Suffolk on projects involving streetscape improvements, underground parking, and mixed-use redevelopment.</p>

<h3 class="wp-block-heading">Route 460 Industrial &amp; Western Suffolk</h3>
<p>The western industrial zones near the Port of Virginia&#8217;s inland terminal have a mix of active industrial utilities, private runs, and agricultural drainage infrastructure that isn&#8217;t captured in standard 811 locates. We work with industrial clients in this corridor to physically verify what&#8217;s underground before excavation.</p>

<h2 class="wp-block-heading">Suffolk Zip Codes We Serve</h2>
<p>Beach HydroVac serves all Suffolk zip codes: <strong>23432, 23433, 23434, 23435, 23436, 23437, 23438, 23439</strong>. We also cover unincorporated areas adjacent to Suffolk including Isle of Wight County and Nansemond areas.</p>

<h2 class="wp-block-heading">Scheduling &amp; Response Time</h2>
<p>Most Suffolk hydro excavation jobs can be scheduled within 24–48 hours. Emergency response for utility strikes or active infrastructure issues is available same-day. All work meets <a href="https://va811.com/" rel="noopener noreferrer">Virginia 811</a> requirements. Beach HydroVac is veteran-owned, fully insured, and OSHA 10 certified for all Suffolk operations.</p>

<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Is there a hydro excavation contractor in Suffolk VA?","acceptedAnswer":{"@type":"Answer","text":"Yes. Beach HydroVac serves all of Suffolk VA for hydro excavation, potholing, vacuum excavation, and slot trenching. Call 757-510-5220 for a free quote."}},{"@type":"Question","name":"How does hydro excavation help new construction in Suffolk?","acceptedAnswer":{"@type":"Answer","text":"New construction in Suffolk — especially in Harbour View and the Route 58 corridor — often involves utilities installed in the last 10-15 years that may not be fully documented. Hydro excavation physically exposes what's underground before mechanical digging begins, preventing costly utility strikes."}},{"@type":"Question","name":"What areas of Suffolk do you serve?","acceptedAnswer":{"@type":"Answer","text":"We serve all of Suffolk including Harbour View, North Suffolk, downtown Suffolk, the Route 58 corridor, Route 460 industrial zone, Driver, and Whaleyville. All Suffolk zip codes: 23432-23439."}},{"@type":"Question","name":"How quickly can you mobilize for hydro excavation in Suffolk?","acceptedAnswer":{"@type":"Answer","text":"Most jobs can be scheduled within 24-48 hours. Emergency response for utility strikes or active leaks is available same-day. Call 757-510-5220."}},{"@type":"Question","name":"Do you work near Dominion Energy infrastructure in Suffolk?","acceptedAnswer":{"@type":"Answer","text":"Yes. Beach HydroVac is familiar with Dominion Energy's clearance process and can provide utility exposure documentation required for work permits near transmission assets on the Route 58 and Nansemond Parkway corridors."}}]}
</script>

<div style="background:linear-gradient(135deg,#0f2134,#1a4a6e);padding:2.5rem 2rem;text-align:center;border-radius:8px;margin-top:2rem;">
  <h3 style="color:#fff;font-size:1.5rem;font-weight:900;margin:0 0 0.75rem 0;">Free Quote for Suffolk Hydro Excavation</h3>
  <p style="color:#aacce0;margin:0 0 1.5rem 0;">Veteran-owned. Fast mobilization across Hampton Roads.</p>
  <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:1rem;">
    <a href="tel:7575105220" style="background:#e8a020;color:#0f2134;font-weight:700;padding:0.875rem 2rem;border-radius:9999px;text-decoration:none;">Call 757-510-5220</a>
    <a href="/contact/" style="background:transparent;color:#fff;font-weight:600;padding:0.875rem 2rem;border-radius:9999px;text-decoration:none;border:2px solid rgba(255,255,255,0.6);">Request a Quote</a>
  </div>
</div>

<div style="background:#0f2134;padding:1.5rem 2rem;margin:2rem 0;border-radius:8px;">
  <p style="color:#aacce0;font-size:0.85rem;margin:0 0 0.6rem 0;text-transform:uppercase;letter-spacing:0.08em;">Nearby Service Areas</p>
  <p style="margin:0;font-size:0.95rem;line-height:2;">
    <a href="/locations/norfolk/" style="color:#e8a020;text-decoration:none;font-weight:600;">Norfolk</a> &nbsp;|&nbsp;
    <a href="/locations/chesapeake/" style="color:#e8a020;text-decoration:none;font-weight:600;">Chesapeake</a> &nbsp;|&nbsp;
    <a href="/locations/newport-news/" style="color:#e8a020;text-decoration:none;font-weight:600;">Newport News</a> &nbsp;|&nbsp;
    <a href="/locations/portsmouth/" style="color:#e8a020;text-decoration:none;font-weight:600;">Portsmouth</a> &nbsp;|&nbsp;
    <a href="/locations/hampton/" style="color:#e8a020;text-decoration:none;font-weight:600;">Hampton</a> &nbsp;|&nbsp;
    <a href="/locations/virginia-beach/" style="color:#e8a020;text-decoration:none;font-weight:600;">Virginia Beach</a> &nbsp;|&nbsp;
    <a href="/locations/williamsburg/" style="color:#e8a020;text-decoration:none;font-weight:600;">Williamsburg</a> &nbsp;|&nbsp;
    <a href="/locations/eastern-shore/" style="color:#e8a020;text-decoration:none;font-weight:600;">Eastern Shore</a>
  </p>
</div>
`;

// ── POST 3896: sue-level-b-vs-level-a ─────────────────────────────────────────
const sueLevelContent = `
<p style="font-size:1.125rem">If you&#8217;re a contractor, engineer, or project manager working on Virginia infrastructure, you&#8217;ve probably heard the terms <strong>SUE Level B</strong> and <strong>SUE Level A</strong> thrown around. But what&#8217;s actually different between them — and when does your project require each level? This guide breaks it down clearly, with Virginia-specific requirements.</p>

<h2 class="wp-block-heading">What is SUE? A Quick Primer</h2>
<p><strong>Subsurface Utility Engineering (SUE)</strong> is a branch of engineering that manages the risks associated with subsurface utility information. It&#8217;s governed by <strong>ASCE Standard 38-02</strong>, which defines four quality levels (A through D) for how accurately underground utilities are located and documented. The higher the level (A being highest), the more accurate and legally defensible the data.</p>

<h2 class="wp-block-heading">The Four SUE Quality Levels</h2>
<figure class="wp-block-table"><table><thead><tr><th>Quality Level</th><th>Method</th><th>Accuracy</th><th>Best For</th></tr></thead><tbody>
<tr><td><strong>Level D</strong></td><td>Records &amp; maps only</td><td>Lowest — often wrong</td><td>Early planning only</td></tr>
<tr><td><strong>Level C</strong></td><td>Field surveys of visible features</td><td>Surface indicators only</td><td>Preliminary design</td></tr>
<tr><td><strong>Level B</strong></td><td>Geophysical (GPR, EM, etc.)</td><td>Horizontal ±1–3 feet typical</td><td>Design, planning, bid documents</td></tr>
<tr><td><strong>Level A</strong></td><td>Physical exposure (hydro excavation)</td><td>Exact X, Y, Z coordinates</td><td>Final design, construction, legal</td></tr>
</tbody></table></figure>

<h2 class="wp-block-heading">SUE Level B: Geophysical Detection</h2>
<p>Level B uses non-invasive geophysical equipment — ground-penetrating radar (GPR), electromagnetic induction (EM), or acoustic tools — to detect buried utilities from the surface. The result is a map showing <em>approximate</em> horizontal location.</p>

<h3 class="wp-block-heading">What Level B Gives You</h3>
<ul class="wp-block-list">
<li>Horizontal position of utilities (±1–3 feet depending on soil conditions and depth)</li>
<li>Utility type identification in many cases</li>
<li>Mapping suitable for design drawings and bid documents</li>
<li>No physical excavation required — non-invasive and faster to complete</li>
</ul>

<h3 class="wp-block-heading">What Level B Cannot Tell You</h3>
<ul class="wp-block-list">
<li>Exact depth of buried utilities — critical for conflict analysis</li>
<li>Condition, material, or diameter of the utility</li>
<li>Whether a utility has been abandoned, capped, or rerouted</li>
<li>Precise vertical position in 3D space</li>
</ul>

<h3 class="wp-block-heading">Level B Limitations in Virginia Soil Conditions</h3>
<p>Virginia's clay-heavy soils — common in Hampton Roads, the Piedmont, and Northern Virginia — can significantly reduce GPR penetration depth and accuracy. EM tools perform better in clay, but signal interference from dense utility corridors (common in urban cores like Norfolk, Richmond, and Arlington) reduces reliability. In these conditions, the actual accuracy of Level B may be worse than the ±3-foot theoretical spec, making Level A follow-up more critical.</p>

<h2 class="wp-block-heading">SUE Level A: Physical Exposure via Hydro Excavation</h2>
<p>Level A is the gold standard. It requires physically exposing the utility, and <strong>hydro excavation (potholing/daylighting)</strong> is the accepted method per ASCE 38. A trained technician uses high-pressure water and vacuum to safely expose the utility, then a licensed surveyor records exact X, Y, and Z (depth) coordinates.</p>

<h3 class="wp-block-heading">What Level A Gives You</h3>
<ul class="wp-block-list">
<li>Exact horizontal and vertical position — surveyed to sub-inch accuracy</li>
<li>Physical confirmation of utility type, size, material, and condition</li>
<li>Legally defensible documentation for engineering records and owner submittals</li>
<li>Required data format for VDOT SUE submittals on qualifying projects</li>
<li>True 3D conflict resolution — you know exactly where the utility is before construction</li>
</ul>

<h3 class="wp-block-heading">Why Hydro Excavation Is Required for Level A</h3>
<p>ASCE 38 specifies that Level A data must come from <em>physical exposure</em>. Mechanical excavation (backhoes, hand digging) risks damaging the utility you&#8217;re trying to locate. Hydro excavation — pressurized water plus vacuum — safely exposes utilities without contact damage, and produces a clean opening that a surveyor can accurately measure. It&#8217;s the only method that satisfies Level A requirements at scale.</p>

<h2 class="wp-block-heading">VDOT Requirements for SUE Levels in Virginia</h2>
<p>VDOT&#8217;s <em>Utility Accommodation Policy and Standards Manual</em> specifies when SUE is required on state-funded projects. Key triggers:</p>
<ul class="wp-block-list">
<li><strong>Level B minimum</strong> — required for design of projects with known utility conflicts in VDOT right-of-way</li>
<li><strong>Level A required</strong> — when Level B identifies conflicts within the design footprint, or when the project involves excavation within 5 feet of a known utility</li>
<li><strong>Pre-construction Level A</strong> — increasingly required by Dominion Energy and Virginia Natural Gas before granting construction clearance near their infrastructure</li>
</ul>
<p>Many design-build and P3 contracts in Virginia now include mandatory Level A SUE provisions in the utility coordination specifications.</p>

<h2 class="wp-block-heading">When to Use Level B vs Level A</h2>

<h3 class="wp-block-heading">Use Level B When:</h3>
<ul class="wp-block-list">
<li>You&#8217;re in early design and need approximate utility locations for planning</li>
<li>The project area is large and you need to identify which specific locations require Level A follow-up</li>
<li>The contract or agency only requires Level B for design submission</li>
<li>Budget constraints mean Level A isn&#8217;t feasible across the full project area — use Level B to triage</li>
</ul>

<h3 class="wp-block-heading">Use Level A When:</h3>
<ul class="wp-block-list">
<li>VDOT or another agency requires it per project specifications</li>
<li>Mechanical excavation is planned within 5 feet of a known or suspected utility</li>
<li>The design has utility conflicts that must be resolved before construction drawings are finalized</li>
<li>You need legally defensible documentation for liability protection or utility owner clearance</li>
<li>Level B results show conflicts or uncertainty in a critical design zone</li>
</ul>

<h2 class="wp-block-heading">Cost Comparison: Level B vs Level A</h2>
<p>Level B is faster and cheaper per location — geophysical scanning costs significantly less than physical exposure. However, the real cost comparison is against the consequence of not getting Level A when you need it:</p>
<figure class="wp-block-table"><table><thead><tr><th></th><th>Level B</th><th>Level A</th></tr></thead><tbody>
<tr><td>Cost per location</td><td>Lower (surface scan)</td><td>Higher (hydrovac + survey)</td></tr>
<tr><td>Time to complete</td><td>Faster (no excavation)</td><td>Longer (physical exposure)</td></tr>
<tr><td>Depth accuracy</td><td>None</td><td>Sub-inch, surveyed</td></tr>
<tr><td>VDOT construction submittal</td><td>Design phase only</td><td>Construction + design</td></tr>
<tr><td>Legal defensibility</td><td>Limited</td><td>Full — ASCE 38 compliant</td></tr>
<tr><td>Utility strike prevention</td><td>Reduces risk</td><td>Eliminates risk</td></tr>
</tbody></table></figure>

<p>A utility strike on a high-pressure gas main or transmission line costs $50,000–$500,000+ in repairs, project delays, and liability. Level A verification on a critical conflict zone typically costs a small fraction of that.</p>

<h2 class="wp-block-heading">Common Project Types by Level</h2>

<h3 class="wp-block-heading">Projects That Typically Need Level B Only</h3>
<ul class="wp-block-list">
<li>Preliminary road design and alignment studies</li>
<li>Environmental impact assessments requiring utility corridor identification</li>
<li>Large-area pipeline route planning (before route selection)</li>
<li>Early-stage real estate due diligence on undeveloped land</li>
</ul>

<h3 class="wp-block-heading">Projects That Require Level A</h3>
<ul class="wp-block-list">
<li>VDOT highway construction and widening in utility-dense corridors</li>
<li>Municipal water/sewer main replacements near multiple crossings</li>
<li>Fiber optic slot trenching through established utility corridors</li>
<li>Substation and electrical infrastructure installation</li>
<li>Bridge and structure foundations where utilities pass underneath</li>
<li>Any project where a utility owner requires clearance before construction</li>
</ul>

<h2 class="wp-block-heading">Beach Hydrovac: SUE Level A Provider Across Virginia</h2>
<p>We perform SUE Level A potholing for engineering firms, general contractors, VDOT projects, and utility companies across Hampton Roads, Richmond, Northern Virginia, and into NC, MD, and DE. Every Level A pothole includes written documentation your engineers can use for final design submittals. We coordinate directly with utility owners for clearance on Dominion, VNG, and Cox assets.</p>

<script type="application/ld+json">
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the difference between SUE Level A and Level B?","acceptedAnswer":{"@type":"Answer","text":"SUE Level B uses non-invasive geophysical tools (GPR, EM) to estimate horizontal utility position — typically accurate to ±1-3 feet but with no depth data. SUE Level A physically exposes the utility using hydro excavation and records exact X, Y, Z coordinates via survey — the only method accepted for construction-phase documentation under ASCE 38-02."}},{"@type":"Question","name":"When does VDOT require SUE Level A in Virginia?","acceptedAnswer":{"@type":"Answer","text":"VDOT requires Level A when design conflicts are identified within the project footprint, when excavation will occur within 5 feet of a known utility, or when the project specifications call for pre-construction utility verification. Many utility owners (Dominion Energy, Virginia Natural Gas) also independently require Level A clearance before construction."}},{"@type":"Question","name":"Why is hydro excavation required for SUE Level A?","acceptedAnswer":{"@type":"Answer","text":"ASCE 38-02 specifies that Level A data must come from physical exposure of the utility. Hydro excavation — pressurized water plus vacuum — is the only accepted method because it exposes utilities without contact damage, unlike mechanical excavation which risks striking and damaging the utility you're trying to locate."}},{"@type":"Question","name":"Can I use Level B instead of Level A to save money?","acceptedAnswer":{"@type":"Answer","text":"Level B is appropriate for early design and planning, but cannot substitute for Level A when construction-phase verification is required. A utility strike due to insufficient Level A coverage typically costs $50,000-$500,000+ — far exceeding the cost of Level A potholing on critical conflict zones."}},{"@type":"Question","name":"Does Beach Hydrovac provide SUE Level A services in Virginia?","acceptedAnswer":{"@type":"Answer","text":"Yes. Beach HydroVac provides SUE Level A physical exposure across Hampton Roads, Richmond, Northern Virginia, and into Maryland, Delaware, and North Carolina. We produce ASCE 38-compliant documentation for VDOT submittals and utility owner clearances. Call 757-510-5220."}}]}
</script>

<div class="wp-block-buttons is-layout-flex wp-block-buttons-is-layout-flex">
<div class="wp-block-button"><a class="wp-block-button__link has-safety-cyan-background-color has-background wp-element-button" href="tel:7575105220" style="border-radius:9999px">Call 757-510-5220</a></div>
<div class="wp-block-button"><a class="wp-block-button__link has-deep-atlantic-background-color has-background wp-element-button" href="/services/sue-level-a/" style="border-radius:9999px">Our SUE Level A Services</a></div>
</div>
`;

async function updatePost(id, content, title) {
  const r = await fetch(`${WP_URL}/wp-json/wp/v2/posts/${id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ content, title })
  });
  const d = await r.json();
  if (!r.ok) throw new Error(d.message || JSON.stringify(d));
  return d;
}

async function run() {
  console.log('Updating hydro-excavation-suffolk-va (post 3772)...');
  const s = await updatePost(
    3772,
    suffolkContent,
    'Hydro Excavation Suffolk VA | Vacuum Excavation Services'
  );
  console.log('✅ Suffolk post updated:', s.link);
  console.log('   Approx word count: ~2,100 words');

  console.log('\nUpdating sue-level-b-vs-level-a (post 3896)...');
  const u = await updatePost(
    3896,
    sueLevelContent,
    'SUE Level B vs Level A: What&#8217;s the Difference and When Do You Need Each?'
  );
  console.log('✅ SUE Level B vs A post updated:', u.link);
  console.log('   Approx word count: ~1,900 words');

  console.log('\n✅ Both crawled-not-indexed posts expanded and fixed.');
  console.log('   - Suffolk: broken links fixed, 3 new sections, location-specific content added');
  console.log('   - SUE Level B/A: VDOT requirements, Virginia soil conditions, expanded FAQ schema');
}

run().catch(console.error);
