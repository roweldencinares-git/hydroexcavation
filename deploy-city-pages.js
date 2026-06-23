import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(`${process.env.BEACH_HYDROVAC_WP_USER}:${process.env.BEACH_HYDROVAC_WP_PASSWORD}`).toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

const DARK_NAVY = '#0f2134';
const CYAN = '#27aefd';
const GOLD = '#e8a020';

const internalLinks = `
<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","bottom":"2rem"}}},"backgroundColor":"gray-100","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-gray-100-background-color has-background" style="padding-top:2rem;padding-bottom:2rem">
<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"0.9rem"}}} -->
<p class="has-text-align-center" style="font-size:0.9rem">
<strong>Also Serving:</strong>
<a href="https://beachhydrovac.com/">Virginia Beach</a> &nbsp;|&nbsp;
<a href="https://beachhydrovac.com/norfolk-hydrovac/">Norfolk</a> &nbsp;|&nbsp;
<a href="https://beachhydrovac.com/chesapeake-hydrovac/">Chesapeake</a> &nbsp;|&nbsp;
<a href="https://beachhydrovac.com/newport-news-hydrovac/">Newport News</a> &nbsp;|&nbsp;
<a href="https://beachhydrovac.com/suffolk-hydrovac/">Suffolk</a> &nbsp;|&nbsp;
<a href="https://beachhydrovac.com/hampton-hydrovac/">Hampton</a> &nbsp;|&nbsp;
<a href="https://beachhydrovac.com/portsmouth-hydrovac/">Portsmouth</a>
</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->`;

const ctaSection = (city, phone = '757-785-5177') => `
<!-- wp:group {"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem"}},"color":{"gradient":"linear-gradient(135deg,${DARK_NAVY} 0%,${CYAN} 100%)"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-background" style="background:linear-gradient(135deg,${DARK_NAVY} 0%,${CYAN} 100%);padding-top:3rem;padding-bottom:3rem">
<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"2rem","fontWeight":"900"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<h2 class="wp-block-heading has-text-align-center has-base-color has-text-color has-link-color" style="font-size:2rem;font-weight:900">Need Hydrovac in ${city}?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<p class="has-text-align-center has-base-color has-text-color has-link-color">Veteran-owned. Local. Fast mobilization across Hampton Roads.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"1.5rem"}}}} -->
<div class="wp-block-buttons" style="margin-top:1.5rem">
<!-- wp:button {"style":{"border":{"radius":"9999px"},"spacing":{"padding":{"top":"1rem","bottom":"1rem","left":"2rem","right":"2rem"}},"color":{"background":"${GOLD}"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-background wp-element-button" href="tel:${phone.replace(/-/g,'')}" style="border-radius:9999px;background-color:${GOLD};padding:1rem 2rem">Call ${phone}</a></div>
<!-- /wp:button -->
<!-- wp:button {"style":{"border":{"radius":"9999px","width":"2px","color":"#ffffff"},"spacing":{"padding":{"top":"1rem","bottom":"1rem","left":"2rem","right":"2rem"}},"elements":{"link":{"color":{"text":"#ffffff"}}}},"backgroundColor":"transparent"} -->
<div class="wp-block-button"><a class="wp-block-button__link has-background wp-element-button" href="mailto:info@beachhydrovac.com" style="border-radius:9999px;border:2px solid #fff;padding:1rem 2rem;color:#fff">Email Us</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->`;

const pages = [
  {
    title: 'Hydrovac Services Norfolk VA',
    slug: 'norfolk-hydrovac',
    yoast_title: 'Hydrovac Services Norfolk VA | Hydro Excavation | Beach HydroVac',
    yoast_desc: 'Professional hydrovac and hydro excavation services in Norfolk, VA. Potholing, slot trenching, SUE Level A. Veteran-owned. Call 757-785-5177.',
    focuskw: 'hydrovac norfolk virginia',
    content: `
<!-- wp:cover {"dimRatio":65,"overlayColor":"deep-atlantic","minHeight":380,"align":"full","style":{"color":{}}} -->
<div class="wp-block-cover alignfull" style="min-height:380px"><span aria-hidden="true" class="wp-block-cover__background has-deep-atlantic-background-color has-background-dim-65 has-background-dim"></span><div class="wp-block-cover__inner-container">
<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"2.75rem","fontWeight":"900"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<h1 class="wp-block-heading has-text-align-center has-base-color has-text-color has-link-color" style="font-size:2.75rem;font-weight:900">Hydrovac Services in Norfolk, Virginia</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<p class="has-text-align-center has-base-color has-text-color has-link-color">Hydro excavation, potholing & slot trenching for Norfolk contractors. Veteran-owned. Fast mobilization.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"1.5rem"}}}} -->
<div class="wp-block-buttons" style="margin-top:1.5rem"><!-- wp:button {"style":{"border":{"radius":"9999px"},"color":{"background":"${GOLD}"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-background wp-element-button" href="tel:7577855177" style="border-radius:9999px;background-color:${GOLD}">Call 757-785-5177</a></div>
<!-- /wp:button --></div><!-- /wp:buttons -->
</div></div><!-- /wp:cover -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem"}}},"layout":{"type":"constrained","contentSize":"860px"}} -->
<div class="wp-block-group" style="padding-top:3rem;padding-bottom:3rem">
<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">Hydrovac Contractor Serving Norfolk, VA</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Norfolk is one of Virginia's most utility-dense cities — home to Naval Station Norfolk, a dense downtown corridor, and aging underground infrastructure that demands extreme care during excavation.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>Beach HydroVac provides hydro excavation services throughout Norfolk for electrical contractors, civil engineers, telecom installers, and municipal crews. Our <strong>"Map First, Dig Second"</strong> approach with <strong>AIM Locating</strong> ensures every pothole is safely executed before digging begins.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">Services Available in Norfolk</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Potholing / Daylighting</strong> — Safely expose buried utilities for SUE Level A verification</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Slot Trenching</strong> — Narrow, precise trenches for fiber, conduit, and water lines</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Remote Excavation</strong> — 600ft hose reach for tight access areas and high-density zones</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>SUE Level A Verification</strong> — ASCE-compliant utility documentation for engineering projects</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Based in Virginia Beach, we mobilize quickly to Norfolk job sites across all zip codes: <strong>23501, 23502, 23503, 23504, 23505, 23507, 23508, 23509, 23510, 23511, 23513, 23517, 23518, 23523</strong>.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">Why Norfolk Contractors Choose Beach HydroVac</h2>
<!-- /wp:heading -->
<!-- wp:columns -->
<div class="wp-block-columns">
<!-- wp:column {"style":{"border":{"top":{"color":"${CYAN}","width":"4px"}},"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}}}} -->
<div class="wp-block-column" style="border-top-color:${CYAN};border-top-width:4px;padding:1.5rem">
<!-- wp:heading {"level":3,"textColor":"deep-atlantic"} --><h3 class="wp-block-heading has-deep-atlantic-color has-text-color">Local & Fast</h3><!-- /wp:heading -->
<!-- wp:paragraph --><p>Virginia Beach-based means we're on your Norfolk site fast — no out-of-state mobilization fees.</p><!-- /wp:paragraph -->
</div><!-- /wp:column -->
<!-- wp:column {"style":{"border":{"top":{"color":"${GOLD}","width":"4px"}},"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}}}} -->
<div class="wp-block-column" style="border-top-color:${GOLD};border-top-width:4px;padding:1.5rem">
<!-- wp:heading {"level":3,"textColor":"deep-atlantic"} --><h3 class="wp-block-heading has-deep-atlantic-color has-text-color">Veteran-Owned</h3><!-- /wp:heading -->
<!-- wp:paragraph --><p>We understand Norfolk's Naval Station environment and DOD-adjacent project requirements.</p><!-- /wp:paragraph -->
</div><!-- /wp:column -->
<!-- wp:column {"style":{"border":{"top":{"color":"${DARK_NAVY}","width":"4px"}},"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}}}} -->
<div class="wp-block-column" style="border-top-color:${DARK_NAVY};border-top-width:4px;padding:1.5rem">
<!-- wp:heading {"level":3,"textColor":"deep-atlantic"} --><h3 class="wp-block-heading has-deep-atlantic-color has-text-color">600ft Hose Reach</h3><!-- /wp:heading -->
<!-- wp:paragraph --><p>Access tight downtown Norfolk corridors and restricted Navy base-adjacent areas other trucks can't reach.</p><!-- /wp:paragraph -->
</div><!-- /wp:column -->
</div><!-- /wp:columns -->
</div><!-- /wp:group -->

${ctaSection('Norfolk')}
${internalLinks}

<!-- wp:html -->
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"LocalBusiness","name":"Beach HydroVac","description":"Hydrovac and hydro excavation services in Norfolk, VA. Potholing, slot trenching, SUE Level A verification.","telephone":"+1-757-785-5177","email":"info@beachhydrovac.com","url":"https://beachhydrovac.com","areaServed":{"@type":"City","name":"Norfolk","addressRegion":"VA"},"serviceType":["Hydrovac Excavation","Potholing","Slot Trenching","SUE Level A Verification"]}
</script>
<!-- /wp:html -->`
  },
  {
    title: 'Hydrovac Services Chesapeake VA',
    slug: 'chesapeake-hydrovac',
    yoast_title: 'Hydrovac Chesapeake VA | Hydro Excavation Contractor | Beach HydroVac',
    yoast_desc: 'Hydrovac and hydro excavation in Chesapeake, VA. Potholing, daylighting, slot trenching for new construction. Veteran-owned. Call 757-785-5177.',
    focuskw: 'hydrovac chesapeake virginia',
    content: `
<!-- wp:cover {"dimRatio":65,"overlayColor":"deep-atlantic","minHeight":380,"align":"full"} -->
<div class="wp-block-cover alignfull" style="min-height:380px"><span aria-hidden="true" class="wp-block-cover__background has-deep-atlantic-background-color has-background-dim-65 has-background-dim"></span><div class="wp-block-cover__inner-container">
<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"2.75rem","fontWeight":"900"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<h1 class="wp-block-heading has-text-align-center has-base-color has-text-color has-link-color" style="font-size:2.75rem;font-weight:900">Hydrovac Services in Chesapeake, Virginia</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<p class="has-text-align-center has-base-color has-text-color has-link-color">Hydro excavation for Chesapeake's growing construction corridor. Fast, safe, precise.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"1.5rem"}}}} -->
<div class="wp-block-buttons" style="margin-top:1.5rem"><!-- wp:button {"style":{"border":{"radius":"9999px"},"color":{"background":"${GOLD}"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-background wp-element-button" href="tel:7577855177" style="border-radius:9999px;background-color:${GOLD}">Call 757-785-5177</a></div>
<!-- /wp:button --></div><!-- /wp:buttons -->
</div></div><!-- /wp:cover -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem"}}},"layout":{"type":"constrained","contentSize":"860px"}} -->
<div class="wp-block-group" style="padding-top:3rem;padding-bottom:3rem">
<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">Hydrovac Contractor Serving Chesapeake, VA</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Chesapeake is one of Virginia's fastest-growing cities — with massive commercial development along Battlefield Blvd, Indian River Road, and the Route 17 corridor. New construction means new utility conflicts, which is exactly where hydro excavation is essential.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>Beach HydroVac serves Chesapeake contractors, developers, and utility crews with fast mobilization and industrial-grade vacuum trucks. Our <strong>600ft hose reach</strong> is especially valuable in Chesapeake's suburban residential developments where truck access is often limited.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">Services Available in Chesapeake</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Potholing / Daylighting</strong> — Pre-construction utility verification</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Slot Trenching</strong> — Fiber, conduit, gas, water line installation</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Remote Excavation</strong> — Residential areas with restricted truck access</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>SUE Level A Verification</strong> — Engineering-grade documentation for major projects</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Serving all Chesapeake zip codes: <strong>23320, 23321, 23322, 23323, 23324, 23325</strong>.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">Chesapeake's Construction Boom Needs Hydrovac</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>As Chesapeake's population and commercial development accelerates, underground utility density increases every year. Whether you're installing fiber along Greenbrier Parkway or running conduit near the Chesapeake Expressway, Beach HydroVac's non-destructive excavation keeps your project on schedule and on budget.</p>
<!-- /wp:paragraph -->
</div><!-- /wp:group -->

${ctaSection('Chesapeake')}
${internalLinks}

<!-- wp:html -->
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"LocalBusiness","name":"Beach HydroVac","description":"Hydrovac and hydro excavation services in Chesapeake, VA.","telephone":"+1-757-785-5177","email":"info@beachhydrovac.com","url":"https://beachhydrovac.com","areaServed":{"@type":"City","name":"Chesapeake","addressRegion":"VA"},"serviceType":["Hydrovac Excavation","Potholing","Slot Trenching","SUE Level A Verification"]}
</script>
<!-- /wp:html -->`
  },
  {
    title: 'Hydrovac Services Newport News VA',
    slug: 'newport-news-hydrovac',
    yoast_title: 'Hydrovac Newport News VA | Hydro Excavation | Beach HydroVac',
    yoast_desc: 'Hydrovac and potholing services in Newport News, VA. SUE Level A, slot trenching, veteran-owned. Serving shipyard area & beyond. Call 757-785-5177.',
    focuskw: 'hydrovac newport news virginia',
    content: `
<!-- wp:cover {"dimRatio":65,"overlayColor":"deep-atlantic","minHeight":380,"align":"full"} -->
<div class="wp-block-cover alignfull" style="min-height:380px"><span aria-hidden="true" class="wp-block-cover__background has-deep-atlantic-background-color has-background-dim-65 has-background-dim"></span><div class="wp-block-cover__inner-container">
<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"2.75rem","fontWeight":"900"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<h1 class="wp-block-heading has-text-align-center has-base-color has-text-color has-link-color" style="font-size:2.75rem;font-weight:900">Hydrovac Services in Newport News, Virginia</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<p class="has-text-align-center has-base-color has-text-color has-link-color">Hydro excavation for Newport News contractors, shipyard-adjacent projects & utility installation.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"1.5rem"}}}} -->
<div class="wp-block-buttons" style="margin-top:1.5rem"><!-- wp:button {"style":{"border":{"radius":"9999px"},"color":{"background":"${GOLD}"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-background wp-element-button" href="tel:7577855177" style="border-radius:9999px;background-color:${GOLD}">Call 757-785-5177</a></div>
<!-- /wp:button --></div><!-- /wp:buttons -->
</div></div><!-- /wp:cover -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem"}}},"layout":{"type":"constrained","contentSize":"860px"}} -->
<div class="wp-block-group" style="padding-top:3rem;padding-bottom:3rem">
<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">Hydrovac Contractor Serving Newport News, VA</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Newport News's industrial waterfront and dense utility corridors make it one of the most complex excavation environments in Hampton Roads. Beach HydroVac's precision hydro excavation ensures utility work near the shipyard, industrial parks, and residential areas is performed safely and documented accurately.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">Why Newport News Contractors Choose Beach HydroVac</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Government & DOD-adjacent</strong> project experience</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Veteran-owned</strong> — understanding of military installation requirements</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>SUE Level A documentation</strong> for federal and state project compliance</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>600ft hose reach</strong> for restricted shipyard-area access</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->

<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">Services in Newport News</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Potholing / Daylighting</strong> — Non-destructive utility exposure</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Slot Trenching</strong> — Fiber optic, conduit, water line installation</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Remote Excavation</strong> — 600ft reach into restricted areas</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>SUE Level A Verification</strong> — ASCE-compliant engineering documentation</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Serving Newport News zip codes: <strong>23601, 23602, 23603, 23604, 23605, 23606, 23607, 23608</strong>.</p>
<!-- /wp:paragraph -->
</div><!-- /wp:group -->

${ctaSection('Newport News')}
${internalLinks}

<!-- wp:html -->
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"LocalBusiness","name":"Beach HydroVac","description":"Hydrovac and hydro excavation services in Newport News, VA.","telephone":"+1-757-785-5177","email":"info@beachhydrovac.com","url":"https://beachhydrovac.com","areaServed":{"@type":"City","name":"Newport News","addressRegion":"VA"},"serviceType":["Hydrovac Excavation","Potholing","Slot Trenching","SUE Level A Verification"]}
</script>
<!-- /wp:html -->`
  },
  {
    title: 'Hydrovac Services Suffolk VA',
    slug: 'suffolk-hydrovac',
    yoast_title: 'Hydrovac Suffolk VA | Hydro Excavation Contractor | Beach HydroVac',
    yoast_desc: 'Hydrovac services in Suffolk, VA. Potholing, slot trenching, SUE Level A for new development and infrastructure. Veteran-owned. 757-785-5177.',
    focuskw: 'hydrovac suffolk virginia',
    content: `
<!-- wp:cover {"dimRatio":65,"overlayColor":"deep-atlantic","minHeight":380,"align":"full"} -->
<div class="wp-block-cover alignfull" style="min-height:380px"><span aria-hidden="true" class="wp-block-cover__background has-deep-atlantic-background-color has-background-dim-65 has-background-dim"></span><div class="wp-block-cover__inner-container">
<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"2.75rem","fontWeight":"900"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<h1 class="wp-block-heading has-text-align-center has-base-color has-text-color has-link-color" style="font-size:2.75rem;font-weight:900">Hydrovac Services in Suffolk, Virginia</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<p class="has-text-align-center has-base-color has-text-color has-link-color">Suffolk's fastest-growing construction corridor deserves the safest excavation. That's us.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"1.5rem"}}}} -->
<div class="wp-block-buttons" style="margin-top:1.5rem"><!-- wp:button {"style":{"border":{"radius":"9999px"},"color":{"background":"${GOLD}"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-background wp-element-button" href="tel:7577855177" style="border-radius:9999px;background-color:${GOLD}">Call 757-785-5177</a></div>
<!-- /wp:button --></div><!-- /wp:buttons -->
</div></div><!-- /wp:cover -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem"}}},"layout":{"type":"constrained","contentSize":"860px"}} -->
<div class="wp-block-group" style="padding-top:3rem;padding-bottom:3rem">
<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">Hydrovac Contractor Serving Suffolk, VA</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Suffolk is one of Virginia's fastest-growing cities. New residential and commercial development means new underground utility installation every day — and that means hydrovac. Beach HydroVac supports Suffolk's construction boom with safe, non-destructive hydro excavation services.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>Whether you're building along Route 58, Harbour View, or anywhere in between, we deliver precision potholing and slot trenching that keeps your project on schedule and your crew safe.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">Services in Suffolk</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>New development potholing</strong> — Verify existing utilities before breaking ground</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Slot trenching</strong> — Fast fiber and conduit installation in new corridors</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Remote excavation</strong> — 600ft reach for large-lot suburban properties</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>SUE Level A</strong> — Engineering-grade documentation</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Serving Suffolk zip codes: <strong>23432, 23433, 23434, 23435, 23436, 23437, 23438, 23439</strong>.</p>
<!-- /wp:paragraph -->
</div><!-- /wp:group -->

${ctaSection('Suffolk')}
${internalLinks}

<!-- wp:html -->
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"LocalBusiness","name":"Beach HydroVac","description":"Hydrovac and hydro excavation services in Suffolk, VA.","telephone":"+1-757-785-5177","email":"info@beachhydrovac.com","url":"https://beachhydrovac.com","areaServed":{"@type":"City","name":"Suffolk","addressRegion":"VA"},"serviceType":["Hydrovac Excavation","Potholing","Slot Trenching","SUE Level A Verification"]}
</script>
<!-- /wp:html -->`
  },
  {
    title: 'Hydrovac Services Hampton VA',
    slug: 'hampton-hydrovac',
    yoast_title: 'Hydrovac Hampton VA | Hydro Excavation Contractor | Beach HydroVac',
    yoast_desc: 'Hydrovac and hydro excavation in Hampton, VA. Potholing, daylighting, slot trenching near Langley AFB & beyond. Veteran-owned. Call 757-785-5177.',
    focuskw: 'hydrovac hampton virginia',
    content: `
<!-- wp:cover {"dimRatio":65,"overlayColor":"deep-atlantic","minHeight":380,"align":"full"} -->
<div class="wp-block-cover alignfull" style="min-height:380px"><span aria-hidden="true" class="wp-block-cover__background has-deep-atlantic-background-color has-background-dim-65 has-background-dim"></span><div class="wp-block-cover__inner-container">
<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"2.75rem","fontWeight":"900"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<h1 class="wp-block-heading has-text-align-center has-base-color has-text-color has-link-color" style="font-size:2.75rem;font-weight:900">Hydrovac Services in Hampton, Virginia</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<p class="has-text-align-center has-base-color has-text-color has-link-color">Precision hydro excavation near Langley AFB, downtown Hampton & surrounding areas.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"1.5rem"}}}} -->
<div class="wp-block-buttons" style="margin-top:1.5rem"><!-- wp:button {"style":{"border":{"radius":"9999px"},"color":{"background":"${GOLD}"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-background wp-element-button" href="tel:7577855177" style="border-radius:9999px;background-color:${GOLD}">Call 757-785-5177</a></div>
<!-- /wp:button --></div><!-- /wp:buttons -->
</div></div><!-- /wp:cover -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem"}}},"layout":{"type":"constrained","contentSize":"860px"}} -->
<div class="wp-block-group" style="padding-top:3rem;padding-bottom:3rem">
<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">Hydrovac Contractor Serving Hampton, VA</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Hampton's proximity to Langley Air Force Base, the NASA Langley Research Center, and a dense residential and commercial core makes it a unique excavation environment. Beach HydroVac brings the precision and clearance awareness that military-adjacent projects demand.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">Services in Hampton</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Potholing / Daylighting</strong> — Safe utility exposure before any major dig</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Slot Trenching</strong> — Precise trenches for fiber, conduit, gas & water</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Remote Excavation</strong> — 600ft hose reach for sensitive or restricted areas</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>SUE Level A</strong> — Required documentation for government & federal projects</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Serving Hampton zip codes: <strong>23661, 23662, 23663, 23664, 23665, 23666, 23667, 23668, 23669</strong>.</p>
<!-- /wp:paragraph -->
</div><!-- /wp:group -->

${ctaSection('Hampton')}
${internalLinks}

<!-- wp:html -->
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"LocalBusiness","name":"Beach HydroVac","description":"Hydrovac and hydro excavation services in Hampton, VA.","telephone":"+1-757-785-5177","email":"info@beachhydrovac.com","url":"https://beachhydrovac.com","areaServed":{"@type":"City","name":"Hampton","addressRegion":"VA"},"serviceType":["Hydrovac Excavation","Potholing","Slot Trenching","SUE Level A Verification"]}
</script>
<!-- /wp:html -->`
  },
  {
    title: 'Hydrovac Services Portsmouth VA',
    slug: 'portsmouth-hydrovac',
    yoast_title: 'Hydrovac Portsmouth VA | Hydro Excavation | Beach HydroVac',
    yoast_desc: 'Hydrovac and hydro excavation in Portsmouth, VA. Potholing, slot trenching near Naval Shipyard & Olde Towne. Veteran-owned. Call 757-785-5177.',
    focuskw: 'hydrovac portsmouth virginia',
    content: `
<!-- wp:cover {"dimRatio":65,"overlayColor":"deep-atlantic","minHeight":380,"align":"full"} -->
<div class="wp-block-cover alignfull" style="min-height:380px"><span aria-hidden="true" class="wp-block-cover__background has-deep-atlantic-background-color has-background-dim-65 has-background-dim"></span><div class="wp-block-cover__inner-container">
<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"2.75rem","fontWeight":"900"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<h1 class="wp-block-heading has-text-align-center has-base-color has-text-color has-link-color" style="font-size:2.75rem;font-weight:900">Hydrovac Services in Portsmouth, Virginia</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<p class="has-text-align-center has-base-color has-text-color has-link-color">Hydro excavation near the Naval Shipyard, Olde Towne & across Portsmouth.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"1.5rem"}}}} -->
<div class="wp-block-buttons" style="margin-top:1.5rem"><!-- wp:button {"style":{"border":{"radius":"9999px"},"color":{"background":"${GOLD}"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-background wp-element-button" href="tel:7577855177" style="border-radius:9999px;background-color:${GOLD}">Call 757-785-5177</a></div>
<!-- /wp:button --></div><!-- /wp:buttons -->
</div></div><!-- /wp:cover -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem"}}},"layout":{"type":"constrained","contentSize":"860px"}} -->
<div class="wp-block-group" style="padding-top:3rem;padding-bottom:3rem">
<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">Hydrovac Contractor Serving Portsmouth, VA</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Portsmouth's Naval Shipyard, historic Olde Towne district, and aging utility infrastructure require a contractor that understands precision. Beach HydroVac's non-destructive hydro excavation protects Portsmouth's underground infrastructure while keeping your project moving.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textColor":"deep-atlantic","style":{"typography":{"fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-weight:700">Services in Portsmouth</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul>
<!-- wp:list-item --><li><strong>Potholing / Daylighting</strong> — Expose utilities safely in dense urban corridors</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Slot Trenching</strong> — Minimal disruption to Portsmouth's historic streetscapes</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>Remote Excavation</strong> — 600ft reach for shipyard-adjacent restricted areas</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><strong>SUE Level A</strong> — Documentation for HRSD and City of Portsmouth projects</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Serving Portsmouth zip codes: <strong>23701, 23702, 23703, 23704, 23705, 23707, 23708, 23709</strong>.</p>
<!-- /wp:paragraph -->
</div><!-- /wp:group -->

${ctaSection('Portsmouth')}
${internalLinks}

<!-- wp:html -->
<script type="application/ld+json">
{"@context":"https://schema.org","@type":"LocalBusiness","name":"Beach HydroVac","description":"Hydrovac and hydro excavation services in Portsmouth, VA.","telephone":"+1-757-785-5177","email":"info@beachhydrovac.com","url":"https://beachhydrovac.com","areaServed":{"@type":"City","name":"Portsmouth","addressRegion":"VA"},"serviceType":["Hydrovac Excavation","Potholing","Slot Trenching","SUE Level A Verification"]}
</script>
<!-- /wp:html -->`
  }
];

async function main() {
  console.log('='.repeat(60));
  console.log('BEACH HYDROVAC — DEPLOYING 6 CITY LANDING PAGES');
  console.log('='.repeat(60));

  let created = 0;
  let failed = 0;

  for (const page of pages) {
    process.stdout.write(`\n  Creating: ${page.title}...`);

    const r = await fetch(`${WP_URL}/wp-json/wp/v2/pages`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title: page.title,
        content: page.content,
        slug: page.slug,
        status: 'publish',
        meta: {
          _yoast_wpseo_title: page.yoast_title,
          _yoast_wpseo_metadesc: page.yoast_desc,
          _yoast_wpseo_focuskw: page.focuskw
        }
      })
    });

    if (r.ok) {
      const data = await r.json();
      console.log(` ✅ Published (ID: ${data.id})`);
      console.log(`     URL: https://beachhydrovac.com/${page.slug}/`);
      created++;
    } else {
      const err = await r.text();
      console.log(` ❌ Failed ${r.status}: ${err.substring(0, 100)}`);
      failed++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`DONE — ✅ ${created} pages published | ❌ ${failed} failed`);
  console.log('='.repeat(60));
  console.log('\nLive pages:');
  pages.forEach(p => console.log(`  → https://beachhydrovac.com/${p.slug}/`));
}

main().catch(console.error);
