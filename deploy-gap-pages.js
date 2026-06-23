import { readFileSync } from 'fs';
import fetch from 'node-fetch';

const env = readFileSync(new URL('.env', import.meta.url), 'utf8');
env.split(/\r?\n/).forEach(line => {
  const idx = line.indexOf('=');
  if (idx > 0) process.env[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
});

const WP_URL = 'https://beachhydrovac.com';
const AUTH = 'Basic ' + Buffer.from(`${process.env.BEACH_HYDROVAC_WP_USER}:${process.env.BEACH_HYDROVAC_WP_PASSWORD}`).toString('base64');
const HEADERS = { Authorization: AUTH, 'Content-Type': 'application/json' };

const NAVY = '#0f2134';
const CYAN = '#27aefd';
const GOLD = '#e8a020';

async function api(method, path, body = null) {
  const res = await fetch(`${WP_URL}${path}`, {
    method,
    headers: HEADERS,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  try { return { status: res.status, body: JSON.parse(text) }; }
  catch { return { status: res.status, body: text }; }
}

const ctaBlock = (headline = 'Ready to Get Started?') => `
<!-- wp:group {"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem"}},"color":{"gradient":"linear-gradient(135deg,${NAVY} 0%,${CYAN} 100%)"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-background" style="background:linear-gradient(135deg,${NAVY} 0%,${CYAN} 100%);padding-top:3rem;padding-bottom:3rem">
<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"2rem","fontWeight":"900"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<h2 class="wp-block-heading has-text-align-center has-base-color has-text-color has-link-color" style="font-size:2rem;font-weight:900">${headline}</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<p class="has-text-align-center has-base-color has-text-color has-link-color">Veteran-owned. Hampton Roads-based. Fast mobilization across Virginia.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"1.5rem"}}}} -->
<div class="wp-block-buttons" style="margin-top:1.5rem">
<!-- wp:button {"style":{"border":{"radius":"9999px"},"spacing":{"padding":{"top":"1rem","bottom":"1rem","left":"2rem","right":"2rem"}},"color":{"background":"${GOLD}"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-background wp-element-button" href="tel:7577105220" style="border-radius:9999px;background-color:${GOLD};padding:1rem 2rem">Call 757-510-5220</a></div>
<!-- /wp:button -->
<!-- wp:button {"style":{"border":{"radius":"9999px","width":"2px","color":"#ffffff"},"spacing":{"padding":{"top":"1rem","bottom":"1rem","left":"2rem","right":"2rem"}},"elements":{"link":{"color":{"text":"#ffffff"}}}},"backgroundColor":"transparent"} -->
<div class="wp-block-button"><a class="wp-block-button__link has-background wp-element-button" href="/contact/" style="border-radius:9999px;border:2px solid #fff;padding:1rem 2rem;color:#fff">Request a Quote</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->`;

const internalLinks = `
<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","bottom":"2rem"}}},"backgroundColor":"gray-100","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-gray-100-background-color has-background" style="padding-top:2rem;padding-bottom:2rem">
<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"0.9rem"}}} -->
<p class="has-text-align-center" style="font-size:0.9rem"><strong>Our Services:</strong>
<a href="/services/hydro-excavation/">Hydro Excavation</a> &nbsp;|&nbsp;
<a href="/services/potholing/">Potholing</a> &nbsp;|&nbsp;
<a href="/services/slot-trenching/">Slot Trenching</a> &nbsp;|&nbsp;
<a href="/services/sue-level-a/">SUE Level A</a> &nbsp;|&nbsp;
<a href="/services/remote-excavation/">Remote Excavation</a>
</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->`;

// ─── PAGE 1: VACTOR TRUCK SERVICES ───────────────────────────────────────────
const vactorPage = {
  title: 'Vactor Truck Services Virginia Beach & Hampton Roads',
  slug: 'vactor-truck-services',
  yoast_title: 'Vactor Truck Services Virginia Beach | Norfolk | Beach HydroVac',
  yoast_desc: 'Industrial vactor truck services in Virginia Beach, Norfolk & Hampton Roads. Hydro excavation, potholing, sewer cleaning & catch basin services. Veteran-owned. Call 757-510-5220.',
  focuskw: 'vactor truck services Virginia Beach',
  content: `
<!-- wp:cover {"dimRatio":65,"overlayColor":"deep-atlantic","minHeight":400,"align":"full"} -->
<div class="wp-block-cover alignfull" style="min-height:400px"><span aria-hidden="true" class="wp-block-cover__background has-deep-atlantic-background-color has-background-dim-65 has-background-dim"></span><div class="wp-block-cover__inner-container">
<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"2.75rem","fontWeight":"900"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<h1 class="wp-block-heading has-text-align-center has-base-color has-text-color has-link-color" style="font-size:2.75rem;font-weight:900">Vactor Truck Services in Virginia Beach & Hampton Roads</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<p class="has-text-align-center has-base-color has-text-color has-link-color">Industrial vactor truck services for contractors, municipalities & utility crews. Hydro excavation, potholing, sewer & catch basin cleaning.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"1.5rem"}}}} -->
<div class="wp-block-buttons" style="margin-top:1.5rem"><!-- wp:button {"style":{"border":{"radius":"9999px"},"color":{"background":"${GOLD}"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-background wp-element-button" href="tel:7577105220" style="border-radius:9999px;background-color:${GOLD}">Call 757-510-5220</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->
</div></div>
<!-- /wp:cover -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem"}}},"layout":{"type":"constrained","contentSize":"860px"}} -->
<div class="wp-block-group" style="padding-top:3rem;padding-bottom:3rem">

<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">What Is a Vactor Truck?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>A vactor truck — also called a hydrovac truck or vacuum excavation truck — combines a high-pressure water system with an industrial vacuum to excavate soil safely and precisely. The water breaks up the ground, and the vacuum removes the resulting slurry into an onboard debris tank, leaving underground utilities completely undamaged.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>Beach HydroVac operates industrial-grade vactor trucks with <strong>3,000 PSI water pressure</strong> and a <strong>600-foot hose reach</strong> — one of the longest in Hampton Roads. That means we can work from a safe standoff distance in areas where truck access is restricted, from narrow downtown Norfolk corridors to Chesapeake residential subdivisions.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">Vactor Truck Services We Provide</h2>
<!-- /wp:heading -->

<!-- wp:columns -->
<div class="wp-block-columns">
<!-- wp:column {"style":{"border":{"top":{"color":"${CYAN}","width":"4px"}},"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}}}} -->
<div class="wp-block-column" style="border-top:4px solid ${CYAN};padding:1.5rem">
<!-- wp:heading {"level":3,"textColor":"deep-atlantic"} --><h3 class="wp-block-heading has-deep-atlantic-color has-text-color">Utility Potholing</h3><!-- /wp:heading -->
<!-- wp:paragraph --><p>Safely expose buried gas, electric, telecom, and water lines before digging. Required on most commercial and government projects.</p><!-- /wp:paragraph -->
</div><!-- /wp:column -->
<!-- wp:column {"style":{"border":{"top":{"color":"${GOLD}","width":"4px"}},"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}}}} -->
<div class="wp-block-column" style="border-top:4px solid ${GOLD};padding:1.5rem">
<!-- wp:heading {"level":3,"textColor":"deep-atlantic"} --><h3 class="wp-block-heading has-deep-atlantic-color has-text-color">Slot Trenching</h3><!-- /wp:heading -->
<!-- wp:paragraph --><p>Narrow, precise trenches for fiber optic, conduit, water lines, and irrigation — minimal surface disruption compared to mechanical trenching.</p><!-- /wp:paragraph -->
</div><!-- /wp:column -->
<!-- wp:column {"style":{"border":{"top":{"color":"${NAVY}","width":"4px"}},"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}}}} -->
<div class="wp-block-column" style="border-top:4px solid ${NAVY};padding:1.5rem">
<!-- wp:heading {"level":3,"textColor":"deep-atlantic"} --><h3 class="wp-block-heading has-deep-atlantic-color has-text-color">Catch Basin Cleaning</h3><!-- /wp:heading -->
<!-- wp:paragraph --><p>Vactor vacuum removes debris, sediment, and blockages from storm drains and catch basins — fast, clean, no mess left behind.</p><!-- /wp:paragraph -->
</div><!-- /wp:column -->
</div><!-- /wp:columns -->

<!-- wp:columns -->
<div class="wp-block-columns">
<!-- wp:column {"style":{"border":{"top":{"color":"${CYAN}","width":"4px"}},"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}}}} -->
<div class="wp-block-column" style="border-top:4px solid ${CYAN};padding:1.5rem">
<!-- wp:heading {"level":3,"textColor":"deep-atlantic"} --><h3 class="wp-block-heading has-deep-atlantic-color has-text-color">SUE Level A Verification</h3><!-- /wp:heading -->
<!-- wp:paragraph --><p>Engineering-grade utility documentation using hydrovac exposure. Required for VDOT, federal, and ASCE-compliant projects.</p><!-- /wp:paragraph -->
</div><!-- /wp:column -->
<!-- wp:column {"style":{"border":{"top":{"color":"${GOLD}","width":"4px"}},"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}}}} -->
<div class="wp-block-column" style="border-top:4px solid ${GOLD};padding:1.5rem">
<!-- wp:heading {"level":3,"textColor":"deep-atlantic"} --><h3 class="wp-block-heading has-deep-atlantic-color has-text-color">Remote Excavation</h3><!-- /wp:heading -->
<!-- wp:paragraph --><p>Our 600ft hose reach lets the truck stay on the road while we excavate tight spaces, basements, alleys, or military base-adjacent areas.</p><!-- /wp:paragraph -->
</div><!-- /wp:column -->
<!-- wp:column {"style":{"border":{"top":{"color":"${NAVY}","width":"4px"}},"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}}}} -->
<div class="wp-block-column" style="border-top:4px solid ${NAVY};padding:1.5rem">
<!-- wp:heading {"level":3,"textColor":"deep-atlantic"} --><h3 class="wp-block-heading has-deep-atlantic-color has-text-color">Debris Removal</h3><!-- /wp:heading -->
<!-- wp:paragraph --><p>Slurry, contaminated soil, and excavation spoils are contained in our debris tank and properly disposed of — a clean jobsite guaranteed.</p><!-- /wp:paragraph -->
</div><!-- /wp:column -->
</div><!-- /wp:columns -->

<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">Why Beach HydroVac for Vactor Work?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Unlike plumbing companies that offer vactor services as a side offering, <strong>hydro excavation is all we do</strong>. Every technician, every truck, and every process is optimized for one thing: precision non-destructive excavation. That focus means faster mobilization, better results, and no upselling on services you don't need.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Veteran-owned</strong> — discipline and precision on every job</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>3,000 PSI industrial equipment</strong> — handles hard clay, compacted soils, and challenging terrain</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>600ft hose reach</strong> — largest standoff capability in Hampton Roads</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Same-day mobilization available</strong> across Virginia Beach, Norfolk, Chesapeake, and surrounding cities</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>AIM Locating partnership</strong> — utility locating + vactor excavation in a single coordinated workflow</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->

<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">Service Area</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>We dispatch vactor trucks throughout Hampton Roads and beyond: <strong>Virginia Beach, Norfolk, Chesapeake, Portsmouth, Suffolk, Hampton, Newport News, Williamsburg</strong>, and statewide to <strong>Richmond, Roanoke, Northern Virginia</strong>. We also serve coastal <strong>North Carolina and Maryland</strong> on larger projects.</p>
<!-- /wp:paragraph -->

</div><!-- /wp:group -->

${ctaBlock('Need a Vactor Truck? Call Today.')}
${internalLinks}

<!-- wp:html -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Vactor Truck Services",
  "description": "Industrial vactor truck services in Virginia Beach and Hampton Roads including utility potholing, slot trenching, catch basin cleaning, and SUE Level A verification.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Beach HydroVac",
    "telephone": "+1-757-510-5220",
    "url": "https://beachhydrovac.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Virginia Beach",
      "addressRegion": "VA"
    }
  },
  "areaServed": ["Virginia Beach, VA", "Norfolk, VA", "Chesapeake, VA", "Hampton, VA", "Newport News, VA", "Portsmouth, VA", "Suffolk, VA"],
  "serviceType": "Vactor Truck Services"
}
</script>
<!-- /wp:html -->`,
};

// ─── PAGE 2: VACUUM EXCAVATION ────────────────────────────────────────────────
const vacuumPage = {
  title: 'Vacuum Excavation Services Virginia Beach & Hampton Roads',
  slug: 'vacuum-excavation',
  yoast_title: 'Vacuum Excavation Virginia Beach | Norfolk | Beach HydroVac',
  yoast_desc: 'Professional vacuum excavation services in Virginia Beach, Norfolk & Hampton Roads. Non-destructive utility exposure for contractors & engineers. Veteran-owned. 757-510-5220.',
  focuskw: 'vacuum excavation Virginia Beach',
  content: `
<!-- wp:cover {"dimRatio":65,"overlayColor":"deep-atlantic","minHeight":400,"align":"full"} -->
<div class="wp-block-cover alignfull" style="min-height:400px"><span aria-hidden="true" class="wp-block-cover__background has-deep-atlantic-background-color has-background-dim-65 has-background-dim"></span><div class="wp-block-cover__inner-container">
<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"2.75rem","fontWeight":"900"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<h1 class="wp-block-heading has-text-align-center has-base-color has-text-color has-link-color" style="font-size:2.75rem;font-weight:900">Vacuum Excavation Services in Virginia Beach & Hampton Roads</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<p class="has-text-align-center has-base-color has-text-color has-link-color">Precision non-destructive excavation for utility contractors, civil engineers & municipalities. The safe alternative to mechanical digging.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"1.5rem"}}}} -->
<div class="wp-block-buttons" style="margin-top:1.5rem"><!-- wp:button {"style":{"border":{"radius":"9999px"},"color":{"background":"${GOLD}"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-background wp-element-button" href="tel:7577105220" style="border-radius:9999px;background-color:${GOLD}">Call 757-510-5220</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->
</div></div>
<!-- /wp:cover -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem"}}},"layout":{"type":"constrained","contentSize":"860px"}} -->
<div class="wp-block-group" style="padding-top:3rem;padding-bottom:3rem">

<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">What Is Vacuum Excavation?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Vacuum excavation — also called hydro excavation, hydrovac, or soft dig — uses high-pressure water to loosen soil and a powerful industrial vacuum to remove it into an onboard tank. The result is a precise, controlled excavation that doesn't damage buried utilities, pipelines, or infrastructure.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>It's the method specified by engineers, required on VDOT projects, and preferred by any contractor who can't afford to strike a live utility line. In Hampton Roads' utility-dense environment — with aging infrastructure under Norfolk's streets, Navy utility corridors in Virginia Beach, and high-density development in Chesapeake — vacuum excavation is the only responsible choice.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">Vacuum Excavation vs. Traditional Digging</h2>
<!-- /wp:heading -->

<!-- wp:table {"hasFixedLayout":true} -->
<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Factor</th><th>Vacuum Excavation</th><th>Mechanical/Hand Digging</th></tr></thead><tbody>
<tr><td><strong>Utility damage risk</strong></td><td>Near zero</td><td>High</td></tr>
<tr><td><strong>Precision</strong></td><td>Within inches</td><td>Unpredictable</td></tr>
<tr><td><strong>Surface disruption</strong></td><td>Minimal</td><td>Extensive</td></tr>
<tr><td><strong>Hard-to-access areas</strong></td><td>Yes (600ft hose reach)</td><td>Limited</td></tr>
<tr><td><strong>SUE Level A compliant</strong></td><td>Yes</td><td>Yes (hand only)</td></tr>
<tr><td><strong>Speed</strong></td><td>Fast</td><td>Slow</td></tr>
<tr><td><strong>Debris containment</strong></td><td>Fully contained in tank</td><td>Spoils pile on site</td></tr>
</tbody></table></figure>
<!-- /wp:table -->

<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">Who Uses Vacuum Excavation?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Vacuum excavation is specified across a wide range of industries and project types:</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Electrical contractors</strong> — potholing before installing conduit or running cable</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Telecom & fiber crews</strong> — slot trenching for fiber optic installation without service interruption</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Civil engineers & DOT projects</strong> — SUE Level A documentation required for design accuracy</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Municipal & government crews</strong> — sewer, stormwater, and infrastructure maintenance</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>General contractors</strong> — pre-construction utility verification to avoid costly strikes</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Gas & pipeline operators</strong> — safe exposure of existing lines for tie-ins and inspections</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->

<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">Our Vacuum Excavation Capabilities</h2>
<!-- /wp:heading -->
<!-- wp:columns -->
<div class="wp-block-columns">
<!-- wp:column {"style":{"border":{"top":{"color":"${CYAN}","width":"4px"}},"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}}}} -->
<div class="wp-block-column" style="border-top:4px solid ${CYAN};padding:1.5rem">
<!-- wp:heading {"level":3,"textColor":"deep-atlantic"} --><h3 class="wp-block-heading has-deep-atlantic-color has-text-color">3,000 PSI Water System</h3><!-- /wp:heading -->
<!-- wp:paragraph --><p>Industrial pressure cuts through Virginia's clay-heavy soils, compacted fill, and root-dense ground.</p><!-- /wp:paragraph -->
</div><!-- /wp:column -->
<!-- wp:column {"style":{"border":{"top":{"color":"${GOLD}","width":"4px"}},"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}}}} -->
<div class="wp-block-column" style="border-top:4px solid ${GOLD};padding:1.5rem">
<!-- wp:heading {"level":3,"textColor":"deep-atlantic"} --><h3 class="wp-block-heading has-deep-atlantic-color has-text-color">600ft Hose Reach</h3><!-- /wp:heading -->
<!-- wp:paragraph --><p>Longest standoff capability in Hampton Roads. Reach basements, alleys, restricted corridors, and Navy base-adjacent sites.</p><!-- /wp:paragraph -->
</div><!-- /wp:column -->
<!-- wp:column {"style":{"border":{"top":{"color":"${NAVY}","width":"4px"}},"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}}}} -->
<div class="wp-block-column" style="border-top:4px solid ${NAVY};padding:1.5rem">
<!-- wp:heading {"level":3,"textColor":"deep-atlantic"} --><h3 class="wp-block-heading has-deep-atlantic-color has-text-color">Full Debris Containment</h3><!-- /wp:heading -->
<!-- wp:paragraph --><p>All spoils are vacuumed into our onboard tank. No mess, no pile, no secondary cleanup cost on your project.</p><!-- /wp:paragraph -->
</div><!-- /wp:column -->
</div><!-- /wp:columns -->

<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">Serving All of Hampton Roads</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Beach HydroVac provides vacuum excavation services throughout <strong>Virginia Beach, Norfolk, Chesapeake, Portsmouth, Hampton, Newport News, Suffolk</strong>, and across Virginia including <strong>Richmond, Roanoke, and Northern Virginia</strong>. Statewide mobilization available for larger projects.</p>
<!-- /wp:paragraph -->

</div><!-- /wp:group -->

${ctaBlock('Get a Vacuum Excavation Quote')}
${internalLinks}

<!-- wp:html -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Vacuum Excavation Services",
  "description": "Non-destructive vacuum excavation services in Virginia Beach and Hampton Roads for utility contractors, civil engineers, and municipalities.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Beach HydroVac",
    "telephone": "+1-757-510-5220",
    "url": "https://beachhydrovac.com"
  },
  "areaServed": ["Virginia Beach, VA", "Norfolk, VA", "Chesapeake, VA", "Hampton, VA", "Newport News, VA"],
  "serviceType": "Vacuum Excavation"
}
</script>
<!-- /wp:html -->`,
};

// ─── PAGE 3: HYDRO EXCAVATION VS TRADITIONAL ─────────────────────────────────
const comparisonPage = {
  title: 'Hydro Excavation vs Traditional Excavation: The Complete Guide',
  slug: 'hydro-excavation-vs-traditional-excavation',
  yoast_title: 'Hydro Excavation vs Traditional Excavation | Virginia Beach | Beach HydroVac',
  yoast_desc: 'Hydro excavation vs traditional digging — a complete cost, safety, and performance comparison for Virginia contractors. Learn when to choose each method.',
  focuskw: 'hydro excavation vs traditional excavation',
  content: `
<!-- wp:cover {"dimRatio":65,"overlayColor":"deep-atlantic","minHeight":400,"align":"full"} -->
<div class="wp-block-cover alignfull" style="min-height:400px"><span aria-hidden="true" class="wp-block-cover__background has-deep-atlantic-background-color has-background-dim-65 has-background-dim"></span><div class="wp-block-cover__inner-container">
<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"2.75rem","fontWeight":"900"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<h1 class="wp-block-heading has-text-align-center has-base-color has-text-color has-link-color" style="font-size:2.75rem;font-weight:900">Hydro Excavation vs Traditional Excavation: Which Is Right for Your Project?</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<p class="has-text-align-center has-base-color has-text-color has-link-color">A practical comparison for Virginia Beach & Hampton Roads contractors, engineers, and project managers.</p>
<!-- /wp:paragraph -->
</div></div>
<!-- /wp:cover -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem"}}},"layout":{"type":"constrained","contentSize":"860px"}} -->
<div class="wp-block-group" style="padding-top:3rem;padding-bottom:3rem">

<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">The Short Answer</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>If you're digging near any underground utility — gas, electric, telecom, water, sewer — <strong>hydro excavation is the right choice</strong>. If you're breaking ground on a greenfield site with no buried infrastructure and no precision requirements, traditional mechanical excavation may be faster and cheaper.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>In Hampton Roads, with its aging utility networks, dense military corridors, and coastal infrastructure, the reality is: <strong>most urban and suburban excavation work benefits from hydrovac</strong>. The cost of striking a utility line — fines, repairs, project delays, liability — almost always exceeds the cost difference between methods.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">Head-to-Head Comparison</h2>
<!-- /wp:heading -->

<!-- wp:table {"hasFixedLayout":true} -->
<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Factor</th><th>Hydro Excavation</th><th>Mechanical Excavation</th><th>Hand Digging</th></tr></thead><tbody>
<tr><td><strong>Utility damage risk</strong></td><td>Near zero</td><td>High</td><td>Low (slow)</td></tr>
<tr><td><strong>Speed</strong></td><td>Fast</td><td>Very fast (open ground)</td><td>Very slow</td></tr>
<tr><td><strong>Precision</strong></td><td>Within inches</td><td>Within feet</td><td>Within inches</td></tr>
<tr><td><strong>Access in tight spaces</strong></td><td>Excellent (600ft hose)</td><td>Poor</td><td>Good</td></tr>
<tr><td><strong>Surface damage</strong></td><td>Minimal</td><td>High</td><td>Minimal</td></tr>
<tr><td><strong>Debris containment</strong></td><td>Fully contained</td><td>Spoils on site</td><td>Spoils on site</td></tr>
<tr><td><strong>SUE Level A compliant</strong></td><td>Yes</td><td>No</td><td>Yes</td></tr>
<tr><td><strong>Winter/frozen ground</strong></td><td>Yes (heated water)</td><td>Difficult</td><td>Very difficult</td></tr>
<tr><td><strong>Regulatory compliance</strong></td><td>Preferred by VDOT/federal</td><td>Restricted near utilities</td><td>Allowed near utilities</td></tr>
<tr><td><strong>Insurance liability</strong></td><td>Lowest</td><td>Highest</td><td>Low</td></tr>
</tbody></table></figure>
<!-- /wp:table -->

<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">Cost Comparison: What Contractors Don't Account For</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>The upfront day rate for hydro excavation is higher than a backhoe. But that's rarely the complete cost picture. Here's what mechanical excavation projects often miss:</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Utility strike repairs</strong> — Gas line repairs average $5,000–$50,000+. Electric strikes can halt an entire jobsite for days.</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Service outage liability</strong> — You may be liable for business interruption costs if you cut a service line.</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>OSHA fines</strong> — Failure to properly expose utilities before excavating can result in significant penalties.</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Project delays</strong> — A single utility strike can delay a project by days or weeks while repairs are coordinated.</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Site restoration</strong> — Mechanical equipment tears up paving, landscaping, and surrounding areas. Hydrovac doesn't.</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
<!-- wp:paragraph -->
<p>For most Virginia Beach and Hampton Roads contractors, hydro excavation costs <strong>less overall</strong> once avoided damages, delays, and liability are factored in.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">When to Use Hydro Excavation</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li>Potholing/daylighting to verify utility locations before any major dig</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>SUE Level A verification required by engineer or project spec</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Slot trenching in urban or paved environments</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Excavation near Naval installations, airports, or restricted areas</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Cold weather excavation (heated water cuts frozen ground)</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Any job where utility damage = project failure</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->

<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">When Traditional Excavation May Be Appropriate</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li>Large-volume earthmoving on greenfield sites with no buried utilities</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Grading and land clearing where utility risk is zero</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Deep bulk excavation for foundations after utilities have been cleared by hydrovac potholing</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
<!-- wp:paragraph -->
<p><em>Note: Even on traditional excavation projects, hydrovac potholing is typically used first to verify utility locations before the mechanical equipment moves in.</em></p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">Hampton Roads-Specific Considerations</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Virginia Beach, Norfolk, Chesapeake, and the surrounding Hampton Roads region present unique excavation challenges that make hydrovac the default smart choice:</p>
<!-- /wp:paragraph -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Naval Station Norfolk</strong> — Underground utility corridors around the world's largest naval base require strict protocols. Hydrovac is standard practice.</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Aging infrastructure</strong> — Norfolk and Portsmouth have utility systems dating back 50–100 years. Positions in GIS records are often inaccurate. Mechanical digging is a gamble.</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>High water table</strong> — Coastal Virginia's water table complicates traditional excavation but doesn't affect hydrovac.</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Dense urban corridors</strong> — Downtown Norfolk, Ghent, and VB Oceanfront have utility congestion that makes mechanical excavation dangerous.</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->

</div><!-- /wp:group -->

${ctaBlock('Talk to a Hydro Excavation Specialist')}
${internalLinks}

<!-- wp:html -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Hydro Excavation vs Traditional Excavation: Which Is Right for Your Project?",
  "description": "A complete comparison of hydro excavation and traditional excavation methods for Virginia Beach and Hampton Roads contractors.",
  "author": {
    "@type": "Organization",
    "name": "Beach HydroVac"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Beach HydroVac",
    "url": "https://beachhydrovac.com"
  },
  "about": {
    "@type": "Service",
    "name": "Hydro Excavation",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Beach HydroVac",
      "telephone": "+1-757-510-5220"
    }
  }
}
</script>
<!-- /wp:html -->`,
};

// ─── DEPLOY ───────────────────────────────────────────────────────────────────
async function deploy(page) {
  process.stdout.write(`\nDeploying: ${page.title}...`);
  const r = await api('POST', '/wp-json/wp/v2/pages', {
    title: page.title,
    content: page.content,
    slug: page.slug,
    status: 'publish',
    meta: {
      _yoast_wpseo_title: page.yoast_title,
      _yoast_wpseo_metadesc: page.yoast_desc,
      _yoast_wpseo_focuskw: page.focuskw,
    },
  });
  if (r.status === 201) {
    console.log(` PUBLISHED (ID: ${r.body.id})`);
    console.log(`  URL: https://beachhydrovac.com/${page.slug}/`);
  } else {
    console.log(` FAILED ${r.status}: ${JSON.stringify(r.body).substring(0, 200)}`);
  }
  return r;
}

async function main() {
  console.log('=== Deploying 3 SEO Gap Pages ===');

  const me = await api('GET', '/wp-json/wp/v2/users/me');
  if (me.status !== 200) { console.error('Auth failed'); process.exit(1); }
  console.log(`Connected as: ${me.body.name}`);

  await deploy(vactorPage);
  await deploy(vacuumPage);
  await deploy(comparisonPage);

  console.log('\n=== All Done ===');
  console.log('Pages live at:');
  console.log('  https://beachhydrovac.com/vactor-truck-services/');
  console.log('  https://beachhydrovac.com/vacuum-excavation/');
  console.log('  https://beachhydrovac.com/hydro-excavation-vs-traditional-excavation/');
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1); });
