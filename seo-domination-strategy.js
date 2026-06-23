import 'dotenv/config';
import fetch from 'node-fetch';

/**
 * Beach Hydrovac SEO Domination Strategy
 *
 * GOAL: Become #1 for "hydro excavation Virginia" and related keywords
 *
 * Strategy Components:
 * 1. Location Pages - Target every major Virginia city
 * 2. Service Pages - Dedicated landing pages per service
 * 3. Industry Pages - Target specific customer segments
 * 4. Content Hub - Pillar pages + blog clusters
 * 5. Internal Linking - Strategic link architecture
 */

const WP_URL = 'https://beachhydrovac.com';
const WP_USER = process.env.BEACH_HYDROVAC_WP_USER;
const WP_APP_PASSWORD = process.env.BEACH_HYDROVAC_WP_PASSWORD;

const headers = {
  'Authorization': 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64'),
  'Content-Type': 'application/json'
};

// ============================================================
// LOCATION DATA - Virginia Cities + Service Areas
// ============================================================

const VIRGINIA_CITIES = [
  // Hampton Roads (Primary Market)
  { city: 'Virginia Beach', slug: 'virginia-beach', region: 'Hampton Roads', priority: 1, population: 459470 },
  { city: 'Norfolk', slug: 'norfolk', region: 'Hampton Roads', priority: 1, population: 238005 },
  { city: 'Chesapeake', slug: 'chesapeake', region: 'Hampton Roads', priority: 1, population: 249422 },
  { city: 'Newport News', slug: 'newport-news', region: 'Hampton Roads', priority: 1, population: 186247 },
  { city: 'Hampton', slug: 'hampton', region: 'Hampton Roads', priority: 1, population: 137148 },
  { city: 'Suffolk', slug: 'suffolk', region: 'Hampton Roads', priority: 2, population: 94324 },
  { city: 'Portsmouth', slug: 'portsmouth', region: 'Hampton Roads', priority: 2, population: 97915 },
  { city: 'Williamsburg', slug: 'williamsburg', region: 'Hampton Roads', priority: 2, population: 15425 },

  // Central Virginia
  { city: 'Richmond', slug: 'richmond', region: 'Central Virginia', priority: 1, population: 226610 },
  { city: 'Henrico', slug: 'henrico', region: 'Central Virginia', priority: 2, population: 340000 },
  { city: 'Chesterfield', slug: 'chesterfield', region: 'Central Virginia', priority: 2, population: 364548 },

  // Northern Virginia
  { city: 'Alexandria', slug: 'alexandria', region: 'Northern Virginia', priority: 2, population: 159467 },
  { city: 'Arlington', slug: 'arlington', region: 'Northern Virginia', priority: 2, population: 238643 },
  { city: 'Fairfax', slug: 'fairfax', region: 'Northern Virginia', priority: 2, population: 24019 },
  { city: 'Fredericksburg', slug: 'fredericksburg', region: 'Central Virginia', priority: 2, population: 29036 },

  // Other Virginia Cities
  { city: 'Roanoke', slug: 'roanoke', region: 'Western Virginia', priority: 3, population: 100011 },
  { city: 'Lynchburg', slug: 'lynchburg', region: 'Central Virginia', priority: 3, population: 82168 },
];

// Neighboring states we serve
const NEIGHBORING_AREAS = [
  { city: 'Outer Banks', slug: 'outer-banks-nc', state: 'NC', region: 'Northeast NC' },
  { city: 'Elizabeth City', slug: 'elizabeth-city-nc', state: 'NC', region: 'Northeast NC' },
  { city: 'Salisbury', slug: 'salisbury-md', state: 'MD', region: 'Eastern Shore' },
  { city: 'Ocean City', slug: 'ocean-city-md', state: 'MD', region: 'Eastern Shore' },
];

// ============================================================
// SERVICE DEFINITIONS
// ============================================================

const SERVICES = [
  {
    name: 'Hydro Excavation',
    slug: 'hydro-excavation',
    title: 'Hydro Excavation Services',
    description: 'Non-destructive digging using pressurized water and vacuum technology',
    keywords: ['hydro excavation', 'hydrovac', 'vacuum excavation', 'non-destructive digging'],
    benefits: [
      'Non-destructive and safe for underground utilities',
      'Faster than traditional excavation methods',
      'Minimal site restoration required',
      'Works in all weather conditions',
      'Reduces liability and project risk'
    ]
  },
  {
    name: 'Potholing',
    slug: 'potholing',
    title: 'Potholing Services',
    description: 'Safely expose and verify underground utility locations',
    keywords: ['potholing', 'utility potholing', 'test holes', 'utility verification'],
    benefits: [
      'Achieves SUE Level A verification',
      'Prevents costly utility strikes',
      'Required for accurate engineering records',
      'Legally defensible documentation',
      'ASCE standard compliance'
    ]
  },
  {
    name: 'Daylighting',
    slug: 'daylighting',
    title: 'Daylighting Services',
    description: 'Expose underground utilities to daylight for inspection and verification',
    keywords: ['daylighting', 'utility daylighting', 'expose utilities', 'utility exposure'],
    benefits: [
      'Visual confirmation of utility location',
      'Accurate depth measurements',
      'Material and condition assessment',
      'Safe working environment',
      'Minimal surface disruption'
    ]
  },
  {
    name: 'Slot Trenching',
    slug: 'slot-trenching',
    title: 'Slot Trenching Services',
    description: 'Narrow, precise trenches for pipes, cables, and conduit installation',
    keywords: ['slot trenching', 'precision trenching', 'cable trenching', 'conduit installation'],
    benefits: [
      'Minimal disruption to existing infrastructure',
      'Less backfill material needed',
      'Faster restoration and lower costs',
      'Ideal for fiber optic installation',
      'Surgical precision near utilities'
    ]
  },
  {
    name: 'Remote Excavation',
    slug: 'remote-excavation',
    title: 'Remote Excavation Services',
    description: '600ft hose reach for restricted-access and hard-to-reach areas',
    keywords: ['remote excavation', 'extended reach', 'hard to reach excavation', 'restricted access'],
    benefits: [
      'Access areas trucks cannot reach',
      'Protects landscaping and hardscaping',
      'Works on slopes and unstable terrain',
      'Behind buildings and in tight spaces',
      'Ideal for residential areas'
    ]
  },
  {
    name: 'SUE Level A Verification',
    slug: 'sue-level-a',
    title: 'SUE Level A Verification Services',
    description: 'Highest accuracy subsurface utility engineering verification',
    keywords: ['SUE Level A', 'subsurface utility engineering', 'utility verification', 'ASCE 38'],
    benefits: [
      'Highest accuracy level per ASCE 38 standards',
      'VDOT approved methodology',
      'Legally defensible documentation',
      'Eliminates utility location guesswork',
      'Reduces project liability'
    ]
  }
];

// ============================================================
// INDUSTRY TARGETS
// ============================================================

const INDUSTRIES = [
  {
    name: 'Electrical Contractors',
    slug: 'electrical-contractors',
    icon: '⚡',
    description: 'Safe trenching for conduit, power lines, and electrical infrastructure',
    useCases: ['Underground conduit installation', 'Power line excavation', 'Transformer pad preparation', 'Street light installation']
  },
  {
    name: 'Telecom & Fiber Optic',
    slug: 'telecom-fiber-optic',
    icon: '📡',
    description: 'Precision excavation for fiber optic and telecommunications infrastructure',
    useCases: ['Fiber optic cable installation', '5G infrastructure', 'Data center connections', 'Underground cable repairs']
  },
  {
    name: 'Civil Contractors',
    slug: 'civil-contractors',
    icon: '🏗️',
    description: 'Utility verification and excavation for infrastructure projects',
    useCases: ['Road construction projects', 'Bridge and overpass work', 'Stormwater management', 'Infrastructure upgrades']
  },
  {
    name: 'Municipalities',
    slug: 'municipalities',
    icon: '🏛️',
    description: 'Government and municipal excavation and utility services',
    useCases: ['Water main repairs', 'Sewer line maintenance', 'Traffic signal installation', 'Public works projects']
  },
  {
    name: 'Plumbing Contractors',
    slug: 'plumbing-contractors',
    icon: '💧',
    description: 'Water and sewer line excavation and repairs',
    useCases: ['Water line installation', 'Sewer line repairs', 'Septic system work', 'Commercial plumbing projects']
  },
  {
    name: 'Engineering Firms',
    slug: 'engineering-firms',
    icon: '📐',
    description: 'SUE Level A verification and utility documentation for design projects',
    useCases: ['Design-phase utility verification', 'As-built documentation', 'Conflict analysis', 'CAD/GIS integration']
  }
];

// ============================================================
// CONTENT GENERATION FUNCTIONS
// ============================================================

function generateLocationPage(location) {
  const city = location.city;
  const region = location.region;
  const isVirginia = !location.state;
  const state = location.state || 'VA';
  const stateFull = state === 'VA' ? 'Virginia' : (state === 'NC' ? 'North Carolina' : 'Maryland');

  return `
<!-- wp:cover {"overlayColor":"deep-atlantic","minHeight":300,"align":"full"} -->
<div class="wp-block-cover alignfull" style="min-height:300px"><span aria-hidden="true" class="wp-block-cover__background has-deep-atlantic-background-color has-background-dim-100 has-background-dim"></span><div class="wp-block-cover__inner-container">

<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"3rem","fontWeight":"900"}}} -->
<h1 class="wp-block-heading has-text-align-center" style="font-size:3rem;font-weight:900">Hydro Excavation Services in ${city}, ${state}</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.25rem"}}} -->
<p class="has-text-align-center" style="font-size:1.25rem">Professional vacuum excavation, potholing, and daylighting services for ${region}</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">
<!-- wp:button {"backgroundColor":"warm-shoreline","style":{"border":{"radius":"9999px"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-warm-shoreline-background-color has-background wp-element-button" style="border-radius:9999px" href="tel:7577855177">Call 757-785-5177</a></div>
<!-- /wp:button -->
<!-- wp:button {"backgroundColor":"safety-cyan","style":{"border":{"radius":"9999px"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-safety-cyan-background-color has-background wp-element-button" style="border-radius:9999px" href="/contact/">Get Free Quote</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->

</div></div>
<!-- /wp:cover -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"4rem","bottom":"4rem"}}},"backgroundColor":"white","layout":{"type":"constrained","contentSize":"1100px"}} -->
<div class="wp-block-group has-white-background-color has-background" style="padding-top:4rem;padding-bottom:4rem">

<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"2.25rem","fontWeight":"800"}},"textColor":"deep-atlantic"} -->
<h2 class="wp-block-heading has-text-align-center has-deep-atlantic-color has-text-color" style="font-size:2.25rem;font-weight:800">${city}'s Trusted Hydro Excavation Experts</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"spacing":{"margin":{"bottom":"2rem"}}}} -->
<p class="has-text-align-center" style="margin-bottom:2rem">Beach Hydrovac provides professional hydro excavation services throughout ${city} and the ${region} area. As a veteran-owned company, we bring military precision to every excavation project.</p>
<!-- /wp:paragraph -->

<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"2rem"}}}} -->
<div class="wp-block-columns">

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":3,"textColor":"deep-atlantic"} -->
<h3 class="wp-block-heading has-deep-atlantic-color has-text-color">Why Choose Beach Hydrovac in ${city}?</h3>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li><strong>Local Expertise</strong> - We know ${city} and ${region}'s soil conditions and utility infrastructure</li>
<li><strong>Veteran-Owned</strong> - Military precision and discipline in every project</li>
<li><strong>24/7 Availability</strong> - Emergency services when you need them</li>
<li><strong>VDOT Compliant</strong> - SUE Level A verification meets all state requirements</li>
<li><strong>Fully Insured</strong> - Complete liability coverage for your protection</li>
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":3,"textColor":"deep-atlantic"} -->
<h3 class="wp-block-heading has-deep-atlantic-color has-text-color">Services We Offer in ${city}</h3>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li><a href="/services/hydro-excavation/">Hydro Excavation</a> - Non-destructive vacuum excavation</li>
<li><a href="/services/potholing/">Potholing & Daylighting</a> - Utility location verification</li>
<li><a href="/services/slot-trenching/">Slot Trenching</a> - Precision trenches for cables</li>
<li><a href="/services/remote-excavation/">Remote Excavation</a> - 600ft hose reach capability</li>
<li><a href="/services/sue-level-a/">SUE Level A</a> - ASCE 38 compliant verification</li>
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:column -->

</div>
<!-- /wp:columns -->

</div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"4rem","bottom":"4rem"}},"color":{"gradient":"linear-gradient(135deg,rgb(0,65,106) 0%,rgb(39,174,253) 100%)"}},"layout":{"type":"constrained","contentSize":"1100px"}} -->
<div class="wp-block-group has-background" style="background:linear-gradient(135deg,rgb(0,65,106) 0%,rgb(39,174,253) 100%);padding-top:4rem;padding-bottom:4rem">

<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"2rem","fontWeight":"800"},"elements":{"link":{"color":{"text":"var:preset|color|white"}}}},"textColor":"white"} -->
<h2 class="wp-block-heading has-text-align-center has-white-color has-text-color has-link-color" style="font-size:2rem;font-weight:800">Industries We Serve in ${city}</h2>
<!-- /wp:heading -->

<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"1.5rem"},"margin":{"top":"2rem"}}}} -->
<div class="wp-block-columns" style="margin-top:2rem">

<!-- wp:column {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"12px"}},"backgroundColor":"white"} -->
<div class="wp-block-column has-white-background-color has-background" style="border-radius:12px;padding-top:1.5rem;padding-right:1.5rem;padding-bottom:1.5rem;padding-left:1.5rem">
<!-- wp:paragraph {"style":{"typography":{"fontSize":"2rem"}}} --><p style="font-size:2rem">⚡</p><!-- /wp:paragraph -->
<!-- wp:heading {"level":4,"textColor":"deep-atlantic"} --><h4 class="wp-block-heading has-deep-atlantic-color has-text-color">Electrical Contractors</h4><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} --><p style="font-size:0.9rem">Conduit and power line trenching</p><!-- /wp:paragraph -->
</div>
<!-- /wp:column -->

<!-- wp:column {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"12px"}},"backgroundColor":"white"} -->
<div class="wp-block-column has-white-background-color has-background" style="border-radius:12px;padding-top:1.5rem;padding-right:1.5rem;padding-bottom:1.5rem;padding-left:1.5rem">
<!-- wp:paragraph {"style":{"typography":{"fontSize":"2rem"}}} --><p style="font-size:2rem">📡</p><!-- /wp:paragraph -->
<!-- wp:heading {"level":4,"textColor":"deep-atlantic"} --><h4 class="wp-block-heading has-deep-atlantic-color has-text-color">Telecom Companies</h4><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} --><p style="font-size:0.9rem">Fiber optic installation</p><!-- /wp:paragraph -->
</div>
<!-- /wp:column -->

<!-- wp:column {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"12px"}},"backgroundColor":"white"} -->
<div class="wp-block-column has-white-background-color has-background" style="border-radius:12px;padding-top:1.5rem;padding-right:1.5rem;padding-bottom:1.5rem;padding-left:1.5rem">
<!-- wp:paragraph {"style":{"typography":{"fontSize":"2rem"}}} --><p style="font-size:2rem">🏗️</p><!-- /wp:paragraph -->
<!-- wp:heading {"level":4,"textColor":"deep-atlantic"} --><h4 class="wp-block-heading has-deep-atlantic-color has-text-color">Civil Contractors</h4><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} --><p style="font-size:0.9rem">Infrastructure projects</p><!-- /wp:paragraph -->
</div>
<!-- /wp:column -->

<!-- wp:column {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"12px"}},"backgroundColor":"white"} -->
<div class="wp-block-column has-white-background-color has-background" style="border-radius:12px;padding-top:1.5rem;padding-right:1.5rem;padding-bottom:1.5rem;padding-left:1.5rem">
<!-- wp:paragraph {"style":{"typography":{"fontSize":"2rem"}}} --><p style="font-size:2rem">💧</p><!-- /wp:paragraph -->
<!-- wp:heading {"level":4,"textColor":"deep-atlantic"} --><h4 class="wp-block-heading has-deep-atlantic-color has-text-color">Water & Sewer</h4><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} --><p style="font-size:0.9rem">Utility maintenance</p><!-- /wp:paragraph -->
</div>
<!-- /wp:column -->

</div>
<!-- /wp:columns -->

</div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"4rem","bottom":"4rem"}}},"backgroundColor":"base","layout":{"type":"constrained","contentSize":"900px"}} -->
<div class="wp-block-group has-base-background-color has-background" style="padding-top:4rem;padding-bottom:4rem">

<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"2rem","fontWeight":"800"}},"textColor":"deep-atlantic"} -->
<h2 class="wp-block-heading has-text-align-center has-deep-atlantic-color has-text-color" style="font-size:2rem;font-weight:800">Serving All of ${region}</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Beyond ${city}, we provide hydro excavation services throughout the ${region} region including neighboring cities and communities. Our mobile hydrovac units can reach any location in the area.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"2rem"}}}} -->
<div class="wp-block-buttons" style="margin-top:2rem">
<!-- wp:button {"backgroundColor":"deep-atlantic","style":{"border":{"radius":"9999px"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-deep-atlantic-background-color has-background wp-element-button" style="border-radius:9999px" href="/service-areas/">View All Service Areas</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->

</div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"4rem","bottom":"4rem"}}},"backgroundColor":"white","layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group has-white-background-color has-background" style="padding-top:4rem;padding-bottom:4rem">

<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"2rem","fontWeight":"800"}},"textColor":"deep-atlantic"} -->
<h2 class="wp-block-heading has-text-align-center has-deep-atlantic-color has-text-color" style="font-size:2rem;font-weight:800">Get Your Free Quote in ${city}</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"spacing":{"margin":{"bottom":"2rem"}}}} -->
<p class="has-text-align-center" style="margin-bottom:2rem">Ready to start your project? Contact Beach Hydrovac today for a free, no-obligation quote. We respond quickly and provide competitive pricing for all hydro excavation services in ${city}.</p>
<!-- /wp:paragraph -->

<!-- wp:columns -->
<div class="wp-block-columns">
<!-- wp:column {"style":{"border":{"radius":"12px","width":"1px","color":"#e5e7eb"},"spacing":{"padding":{"top":"2rem","right":"2rem","bottom":"2rem","left":"2rem"}}}} -->
<div class="wp-block-column has-border-color" style="border-color:#e5e7eb;border-width:1px;border-radius:12px;padding-top:2rem;padding-right:2rem;padding-bottom:2rem;padding-left:2rem">
<!-- wp:heading {"level":4,"textAlign":"center","textColor":"deep-atlantic"} --><h4 class="wp-block-heading has-text-align-center has-deep-atlantic-color has-text-color">📞 Call Us</h4><!-- /wp:heading -->
<!-- wp:paragraph {"align":"center"} --><p class="has-text-align-center"><a href="tel:7577855177"><strong>757-785-5177</strong></a></p><!-- /wp:paragraph -->
</div>
<!-- /wp:column -->

<!-- wp:column {"style":{"border":{"radius":"12px","width":"1px","color":"#e5e7eb"},"spacing":{"padding":{"top":"2rem","right":"2rem","bottom":"2rem","left":"2rem"}}}} -->
<div class="wp-block-column has-border-color" style="border-color:#e5e7eb;border-width:1px;border-radius:12px;padding-top:2rem;padding-right:2rem;padding-bottom:2rem;padding-left:2rem">
<!-- wp:heading {"level":4,"textAlign":"center","textColor":"deep-atlantic"} --><h4 class="wp-block-heading has-text-align-center has-deep-atlantic-color has-text-color">✉️ Email Us</h4><!-- /wp:heading -->
<!-- wp:paragraph {"align":"center"} --><p class="has-text-align-center"><a href="mailto:info@beachhydrovac.com">info@beachhydrovac.com</a></p><!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->

</div>
<!-- /wp:group -->
`;
}

function generateServicePage(service) {
  const benefitsList = service.benefits.map(b => `<li>${b}</li>`).join('\n');

  return `
<!-- wp:cover {"overlayColor":"deep-atlantic","minHeight":300,"align":"full"} -->
<div class="wp-block-cover alignfull" style="min-height:300px"><span aria-hidden="true" class="wp-block-cover__background has-deep-atlantic-background-color has-background-dim-100 has-background-dim"></span><div class="wp-block-cover__inner-container">

<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"3rem","fontWeight":"900"}}} -->
<h1 class="wp-block-heading has-text-align-center" style="font-size:3rem;font-weight:900">${service.title}</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.25rem"}}} -->
<p class="has-text-align-center" style="font-size:1.25rem">${service.description}</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">
<!-- wp:button {"backgroundColor":"warm-shoreline","style":{"border":{"radius":"9999px"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-warm-shoreline-background-color has-background wp-element-button" style="border-radius:9999px" href="tel:7577855177">Call 757-785-5177</a></div>
<!-- /wp:button -->
<!-- wp:button {"backgroundColor":"safety-cyan","style":{"border":{"radius":"9999px"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-safety-cyan-background-color has-background wp-element-button" style="border-radius:9999px" href="/contact/">Get Free Quote</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->

</div></div>
<!-- /wp:cover -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"4rem","bottom":"4rem"}}},"backgroundColor":"white","layout":{"type":"constrained","contentSize":"1100px"}} -->
<div class="wp-block-group has-white-background-color has-background" style="padding-top:4rem;padding-bottom:4rem">

<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"3rem"}}}} -->
<div class="wp-block-columns">

<!-- wp:column {"width":"60%"} -->
<div class="wp-block-column" style="flex-basis:60%">

<!-- wp:heading {"style":{"typography":{"fontSize":"2rem","fontWeight":"800"}},"textColor":"deep-atlantic"} -->
<h2 class="wp-block-heading has-deep-atlantic-color has-text-color" style="font-size:2rem;font-weight:800">What is ${service.name}?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>${service.description}. At Beach Hydrovac, we use state-of-the-art hydrovac equipment to deliver safe, efficient, and precise ${service.name.toLowerCase()} services throughout Virginia, North Carolina, Maryland, and Delaware.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Our veteran-owned team brings military precision to every project, ensuring the highest quality results while maintaining strict safety standards. Whether you're a contractor, municipality, or engineering firm, we have the expertise and equipment to handle your ${service.name.toLowerCase()} needs.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3,"textColor":"deep-atlantic"} -->
<h3 class="wp-block-heading has-deep-atlantic-color has-text-color">Benefits of Our ${service.title}</h3>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
${benefitsList}
</ul>
<!-- /wp:list -->

</div>
<!-- /wp:column -->

<!-- wp:column {"width":"40%"} -->
<div class="wp-block-column" style="flex-basis:40%">

<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","right":"2rem","bottom":"2rem","left":"2rem"}},"border":{"radius":"12px"}},"backgroundColor":"base"} -->
<div class="wp-block-group has-base-background-color has-background" style="border-radius:12px;padding-top:2rem;padding-right:2rem;padding-bottom:2rem;padding-left:2rem">

<!-- wp:heading {"level":3,"textColor":"deep-atlantic"} -->
<h3 class="wp-block-heading has-deep-atlantic-color has-text-color">Request a Quote</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Get a free, no-obligation quote for your ${service.name.toLowerCase()} project.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>📞 Phone:</strong><br><a href="tel:7577855177">757-785-5177</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>✉️ Email:</strong><br><a href="mailto:info@beachhydrovac.com">info@beachhydrovac.com</a></p>
<!-- /wp:paragraph -->

<!-- wp:buttons -->
<div class="wp-block-buttons">
<!-- wp:button {"backgroundColor":"deep-atlantic","width":100,"style":{"border":{"radius":"8px"}}} -->
<div class="wp-block-button has-custom-width wp-block-button__width-100"><a class="wp-block-button__link has-deep-atlantic-background-color has-background wp-element-button" style="border-radius:8px" href="/contact/">Contact Us</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:column -->

</div>
<!-- /wp:columns -->

</div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"4rem","bottom":"4rem"}},"color":{"gradient":"linear-gradient(135deg,rgb(0,65,106) 0%,rgb(39,174,253) 100%)"}},"layout":{"type":"constrained","contentSize":"1000px"}} -->
<div class="wp-block-group has-background" style="background:linear-gradient(135deg,rgb(0,65,106) 0%,rgb(39,174,253) 100%);padding-top:4rem;padding-bottom:4rem">

<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"2rem","fontWeight":"800"},"elements":{"link":{"color":{"text":"var:preset|color|white"}}}},"textColor":"white"} -->
<h2 class="wp-block-heading has-text-align-center has-white-color has-text-color has-link-color" style="font-size:2rem;font-weight:800">Service Areas for ${service.title}</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","textColor":"white"} -->
<p class="has-text-align-center has-white-color has-text-color">We provide ${service.name.toLowerCase()} services throughout the Mid-Atlantic region:</p>
<!-- /wp:paragraph -->

<!-- wp:columns {"style":{"spacing":{"margin":{"top":"2rem"}}}} -->
<div class="wp-block-columns" style="margin-top:2rem">
<!-- wp:column {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"12px"}},"backgroundColor":"white"} -->
<div class="wp-block-column has-white-background-color has-background" style="border-radius:12px;padding-top:1.5rem;padding-right:1.5rem;padding-bottom:1.5rem;padding-left:1.5rem">
<!-- wp:heading {"level":4,"textColor":"deep-atlantic"} --><h4 class="wp-block-heading has-deep-atlantic-color has-text-color">Virginia</h4><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} --><p style="font-size:0.9rem">Virginia Beach, Norfolk, Chesapeake, Newport News, Hampton, Richmond, and more</p><!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
<!-- wp:column {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"12px"}},"backgroundColor":"white"} -->
<div class="wp-block-column has-white-background-color has-background" style="border-radius:12px;padding-top:1.5rem;padding-right:1.5rem;padding-bottom:1.5rem;padding-left:1.5rem">
<!-- wp:heading {"level":4,"textColor":"deep-atlantic"} --><h4 class="wp-block-heading has-deep-atlantic-color has-text-color">North Carolina</h4><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} --><p style="font-size:0.9rem">Outer Banks, Elizabeth City, and Northeast NC</p><!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
<!-- wp:column {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"12px"}},"backgroundColor":"white"} -->
<div class="wp-block-column has-white-background-color has-background" style="border-radius:12px;padding-top:1.5rem;padding-right:1.5rem;padding-bottom:1.5rem;padding-left:1.5rem">
<!-- wp:heading {"level":4,"textColor":"deep-atlantic"} --><h4 class="wp-block-heading has-deep-atlantic-color has-text-color">Maryland & Delaware</h4><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} --><p style="font-size:0.9rem">Eastern Shore and surrounding areas</p><!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->

</div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"4rem","bottom":"4rem"}}},"backgroundColor":"base","layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group has-base-background-color has-background" style="padding-top:4rem;padding-bottom:4rem">

<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"2rem","fontWeight":"800"}},"textColor":"deep-atlantic"} -->
<h2 class="wp-block-heading has-text-align-center has-deep-atlantic-color has-text-color" style="font-size:2rem;font-weight:800">Ready to Get Started?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Contact Beach Hydrovac today for professional ${service.name.toLowerCase()} services. We offer free quotes and competitive pricing.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">
<!-- wp:button {"backgroundColor":"deep-atlantic","style":{"border":{"radius":"9999px"},"spacing":{"padding":{"left":"2rem","right":"2rem"}}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-deep-atlantic-background-color has-background wp-element-button" style="border-radius:9999px;padding-right:2rem;padding-left:2rem" href="/contact/">Get Your Free Quote</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->

</div>
<!-- /wp:group -->
`;
}

function generateServiceAreasPage() {
  let cityLinks = '';

  // Group cities by region
  const regions = {};
  VIRGINIA_CITIES.forEach(city => {
    if (!regions[city.region]) regions[city.region] = [];
    regions[city.region].push(city);
  });

  for (const [region, cities] of Object.entries(regions)) {
    cityLinks += `
<!-- wp:heading {"level":3,"textColor":"deep-atlantic"} -->
<h3 class="wp-block-heading has-deep-atlantic-color has-text-color">${region}</h3>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
${cities.map(c => `<li><a href="/locations/${c.slug}/">${c.city}, VA</a></li>`).join('\n')}
</ul>
<!-- /wp:list -->
`;
  }

  return `
<!-- wp:cover {"overlayColor":"deep-atlantic","minHeight":300,"align":"full"} -->
<div class="wp-block-cover alignfull" style="min-height:300px"><span aria-hidden="true" class="wp-block-cover__background has-deep-atlantic-background-color has-background-dim-100 has-background-dim"></span><div class="wp-block-cover__inner-container">

<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"3rem","fontWeight":"900"}}} -->
<h1 class="wp-block-heading has-text-align-center" style="font-size:3rem;font-weight:900">Service Areas</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.25rem"}}} -->
<p class="has-text-align-center" style="font-size:1.25rem">Hydro excavation services throughout Virginia, North Carolina, Maryland & Delaware</p>
<!-- /wp:paragraph -->

</div></div>
<!-- /wp:cover -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"4rem","bottom":"4rem"}}},"backgroundColor":"white","layout":{"type":"constrained","contentSize":"1000px"}} -->
<div class="wp-block-group has-white-background-color has-background" style="padding-top:4rem;padding-bottom:4rem">

<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"2rem"}},"textColor":"deep-atlantic"} -->
<h2 class="wp-block-heading has-text-align-center has-deep-atlantic-color has-text-color" style="font-size:2rem">Virginia Service Areas</h2>
<!-- /wp:heading -->

<!-- wp:columns -->
<div class="wp-block-columns">
<!-- wp:column -->
<div class="wp-block-column">
${cityLinks}
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->

</div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem"}},"color":{"gradient":"linear-gradient(135deg,rgb(0,65,106) 0%,rgb(39,174,253) 100%)"}},"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group has-background" style="background:linear-gradient(135deg,rgb(0,65,106) 0%,rgb(39,174,253) 100%);padding-top:3rem;padding-bottom:3rem">

<!-- wp:heading {"textAlign":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|white"}}}},"textColor":"white"} -->
<h2 class="wp-block-heading has-text-align-center has-white-color has-text-color has-link-color">Don't See Your City?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","textColor":"white"} -->
<p class="has-text-align-center has-white-color has-text-color">We serve the entire Mid-Atlantic region. Call us to discuss your project location.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">
<!-- wp:button {"backgroundColor":"warm-shoreline","style":{"border":{"radius":"9999px"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-warm-shoreline-background-color has-background wp-element-button" style="border-radius:9999px" href="tel:7577855177">Call 757-785-5177</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->

</div>
<!-- /wp:group -->
`;
}

// ============================================================
// WORDPRESS API FUNCTIONS
// ============================================================

async function createPage(title, slug, content, parent = 0) {
  try {
    console.log(`Creating: ${title}...`);

    const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title,
        slug,
        content,
        status: 'publish',
        parent
      })
    });

    if (response.ok) {
      const page = await response.json();
      console.log(`  ✅ Created: ${page.link}`);
      return page;
    } else {
      const error = await response.text();
      if (error.includes('rest_invalid_param') || error.includes('already exists')) {
        console.log(`  ⏭️  Already exists, skipping`);
        return null;
      }
      console.log(`  ❌ Failed: ${error.substring(0, 100)}`);
      return null;
    }
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return null;
  }
}

async function getOrCreateParentPage(title, slug) {
  // Check if page exists
  const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages?slug=${slug}`, { headers });
  if (response.ok) {
    const pages = await response.json();
    if (pages.length > 0) {
      return pages[0].id;
    }
  }

  // Create if doesn't exist
  const page = await createPage(title, slug, `<!-- wp:paragraph --><p>Browse our ${title.toLowerCase()}.</p><!-- /wp:paragraph -->`);
  return page ? page.id : 0;
}

// ============================================================
// MAIN EXECUTION
// ============================================================

async function main() {
  console.log('==========================================');
  console.log('Beach Hydrovac SEO Domination Strategy');
  console.log('==========================================\n');

  if (!WP_USER || !WP_APP_PASSWORD) {
    console.error('❌ Missing credentials!');
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const mode = args[0] || 'all';

  // Create parent pages first
  console.log('Creating parent pages...\n');
  const locationsParentId = await getOrCreateParentPage('Locations', 'locations');
  const servicesParentId = await getOrCreateParentPage('Services', 'services');

  await new Promise(r => setTimeout(r, 500));

  if (mode === 'all' || mode === 'service-areas') {
    // Create Service Areas overview page
    console.log('\n--- Creating Service Areas Page ---');
    await createPage('Service Areas', 'service-areas', generateServiceAreasPage());
    await new Promise(r => setTimeout(r, 500));
  }

  if (mode === 'all' || mode === 'services') {
    // Create Service Pages
    console.log('\n--- Creating Service Pages ---');
    for (const service of SERVICES) {
      await createPage(
        service.title,
        service.slug,
        generateServicePage(service),
        servicesParentId
      );
      await new Promise(r => setTimeout(r, 500));
    }
  }

  if (mode === 'all' || mode === 'locations') {
    // Create Location Pages (Priority 1 first)
    console.log('\n--- Creating Location Pages ---');
    const priorityCities = VIRGINIA_CITIES.filter(c => c.priority === 1);

    for (const city of priorityCities) {
      await createPage(
        `Hydro Excavation ${city.city} VA`,
        city.slug,
        generateLocationPage(city),
        locationsParentId
      );
      await new Promise(r => setTimeout(r, 500));
    }
  }

  if (mode === 'locations-all') {
    // Create ALL location pages
    console.log('\n--- Creating ALL Location Pages ---');
    for (const city of VIRGINIA_CITIES) {
      await createPage(
        `Hydro Excavation ${city.city} VA`,
        city.slug,
        generateLocationPage(city),
        locationsParentId
      );
      await new Promise(r => setTimeout(r, 500));
    }
  }

  console.log('\n==========================================');
  console.log('SEO Domination Strategy Complete!');
  console.log('==========================================\n');

  console.log('USAGE:');
  console.log('  node seo-domination-strategy.js all           - Create all pages');
  console.log('  node seo-domination-strategy.js services      - Service pages only');
  console.log('  node seo-domination-strategy.js locations     - Priority 1 cities only');
  console.log('  node seo-domination-strategy.js locations-all - All cities');
  console.log('  node seo-domination-strategy.js service-areas - Service areas page\n');
}

main().catch(console.error);
