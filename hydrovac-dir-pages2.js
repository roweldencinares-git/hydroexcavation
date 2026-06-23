import fetch from 'node-fetch';

const WP_URL = 'https://springgreen-stinkbug-577322.hostingersite.com';
const AUTH = 'Basic ' + Buffer.from('roweldencinares@gmail.com:jqfA ESlL T5xL QsLo e0fI H4Pt').toString('base64');
const H = { 'Authorization': AUTH, 'Content-Type': 'application/json' };

// ─── BLOCK HELPERS ───────────────────────────────────────────────────────────
const hero = (h1, sub, bg = '#1a365d', height = '280px') => `
<!-- wp:spectra/container {"align":"full","variationSelected":true,"height":"${height}","background":{"type":"color","color":"${bg}"},"isBlockRootParent":true,"style":{"spacing":{"padding":{"left":"2rem","right":"2rem"},"blockGap":"var:preset|spacing|20"}},"layout":{"type":"flex","orientation":"vertical","justifyContent":"center","verticalAlignment":"center"}} -->
<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"clamp(1.8rem,4vw,2.8rem)","fontWeight":"800"}},"textColor":"white"} -->
<h1 class="wp-block-heading has-text-align-center has-white-color has-text-color">${h1}</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","textColor":"ast-global-color-5"} -->
<p class="has-text-align-center has-ast-global-color-5-color has-text-color">${sub}</p>
<!-- /wp:paragraph -->
<!-- /wp:spectra/container -->`;

const section = (inner, bg = '#ffffff', pad = '3rem 2rem') => `
<!-- wp:spectra/container {"align":"full","variationSelected":true,"isBlockRootParent":true,"background":{"type":"color","color":"${bg}"},"style":{"spacing":{"padding":{"top":"${pad.split(' ')[0]}","bottom":"${pad.split(' ')[0]}","left":"${pad.split(' ')[1]}","right":"${pad.split(' ')[1]}"}}}} -->
${inner}
<!-- /wp:spectra/container -->`;

const card = (emoji, title, desc, link) => `
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","right":"1.5rem","bottom":"2rem","left":"1.5rem"}},"border":{"radius":"12px","top":{"color":"var:preset|color|ast-global-color-0","width":"4px"},"right":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"bottom":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"left":{"width":"1px","color":"var:preset|color|ast-global-color-8"}},"shadow":"var:preset|shadow|natural"},"backgroundColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-white-background-color has-background" style="border-radius:12px;border-top:4px solid var(--wp--preset--color--ast-global-color-0);border:1px solid var(--wp--preset--color--ast-global-color-8);padding:2rem 1.5rem;box-shadow:var(--wp--preset--shadow--natural)">
<!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"2.5rem"}}} --><h3 class="wp-block-heading has-text-align-center" style="font-size:2.5rem">${emoji}</h3><!-- /wp:heading -->
<!-- wp:heading {"textAlign":"center","level":4,"textColor":"ast-global-color-2"} --><h4 class="wp-block-heading has-text-align-center has-ast-global-color-2-color has-text-color">${title}</h4><!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"0.9rem"}}} --><p class="has-text-align-center" style="font-size:0.9rem">${desc}</p><!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} --><div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"ast-global-color-2","style":{"border":{"radius":"9999px"},"typography":{"fontSize":"0.85rem"}}} --><div class="wp-block-button"><a class="wp-block-button__link has-ast-global-color-2-background-color has-background wp-element-button" href="${link}" style="border-radius:9999px;font-size:0.85rem">Browse →</a></div><!-- /wp:button --></div><!-- /wp:buttons -->
</div><!-- /wp:group -->
</div><!-- /wp:column -->`;

const cityCard = (city, state, slug) => `
<!-- wp:group {"style":{"spacing":{"padding":{"top":"0.8rem","right":"1rem","bottom":"0.8rem","left":"1rem"}},"border":{"radius":"8px","width":"1px","color":"var:preset|color|ast-global-color-8"},"shadow":"var:preset|shadow|natural"},"backgroundColor":"white","layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between","verticalAlignment":"center"}} -->
<div class="wp-block-group has-white-background-color has-background" style="border-radius:8px;border:1px solid var(--wp--preset--color--ast-global-color-8);padding:0.8rem 1rem;box-shadow:var(--wp--preset--shadow--natural)">
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.95rem","fontWeight":"600"}}} --><p style="font-size:0.95rem;font-weight:600">📍 <a href="/${slug}/" style="color:inherit;text-decoration:none">${city}, ${state}</a></p><!-- /wp:paragraph -->
<!-- wp:buttons --><div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"ast-global-color-2","style":{"border":{"radius":"9999px"},"typography":{"fontSize":"0.8rem"}}} --><div class="wp-block-button"><a class="wp-block-button__link has-ast-global-color-2-background-color has-background wp-element-button" href="/${slug}/" style="border-radius:9999px;font-size:0.8rem">View →</a></div><!-- /wp:button --></div><!-- /wp:buttons -->
</div><!-- /wp:group -->`;

const listingCard = (featured, name, category, location, phone, desc) => `
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"},"margin":{"bottom":"1rem"}},"border":{"radius":"12px","top":{"color":"${featured ? 'var:preset|color|ast-global-color-5' : 'var:preset|color|ast-global-color-0'}","width":"4px"},"right":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"bottom":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"left":{"width":"1px","color":"var:preset|color|ast-global-color-8"}},"shadow":"var:preset|shadow|natural"},"backgroundColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-white-background-color has-background" style="border-radius:12px;border-top:4px solid ${featured ? 'var(--wp--preset--color--ast-global-color-5)' : 'var(--wp--preset--color--ast-global-color-0)'};border-right:1px solid var(--wp--preset--color--ast-global-color-8);border-bottom:1px solid var(--wp--preset--color--ast-global-color-8);border-left:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.5rem;margin-bottom:1rem;box-shadow:var(--wp--preset--shadow--natural)">
<!-- wp:columns --><div class="wp-block-columns">
<!-- wp:column {"width":"70%"} --><div class="wp-block-column" style="flex-basis:70%">
<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.1rem","fontWeight":"700"}},"textColor":"ast-global-color-2"} --><h3 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1.1rem;font-weight:700">${featured ? '⭐ Featured — ' : ''}${name}</h3><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.88rem"}}} --><p style="font-size:0.88rem"><strong>Category:</strong> ${category} &nbsp;|&nbsp; <strong>Location:</strong> ${location}${phone ? ` &nbsp;|&nbsp; <strong>Phone:</strong> <a href="tel:${phone.replace(/\D/g,'')}">${phone}</a>` : ''}</p><!-- /wp:paragraph -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.93rem"}}} --><p style="font-size:0.93rem">${desc}</p><!-- /wp:paragraph -->
</div><!-- /wp:column -->
<!-- wp:column {"width":"30%"} --><div class="wp-block-column" style="flex-basis:30%">
<!-- wp:buttons {"layout":{"type":"flex","orientation":"vertical","justifyContent":"center","verticalAlignment":"center"}} --><div class="wp-block-buttons">
<!-- wp:button {"backgroundColor":"ast-global-color-2","style":{"border":{"radius":"9999px"},"typography":{"fontSize":"0.85rem"}},"width":100} --><div class="wp-block-button has-custom-width wp-block-button__width-100"><a class="wp-block-button__link has-ast-global-color-2-background-color has-background wp-element-button" href="/contact/" style="border-radius:9999px;font-size:0.85rem">Get Quote</a></div><!-- /wp:button -->
</div><!-- /wp:buttons -->
</div><!-- /wp:column -->
</div><!-- /wp:columns -->
</div><!-- /wp:group -->`;

// ─── PAGES ───────────────────────────────────────────────────────────────────
const pages = [

// ══════════════════════════════════════════════════════════════════════════════
// ABOUT PAGE
// ══════════════════════════════════════════════════════════════════════════════
{
  title: 'About HydroVac Pro | The Hydro Excavation Directory',
  slug: 'about',
  surerank: {
    title: 'About HydroVac Pro | #1 Hydro Excavation Directory',
    description: 'HydroVac Pro is the most comprehensive hydro excavation and vacuum excavation directory in the US — connecting contractors, utilities, and project owners with verified service companies.'
  },
  content: `
${hero('About HydroVac Pro', 'The most comprehensive hydro excavation directory in the United States', '#1a365d', '240px')}
${section(`
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"4rem"}}}} -->
<div class="wp-block-columns">
<!-- wp:column {"width":"60%"} -->
<div class="wp-block-column" style="flex-basis:60%">
<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"1.8rem","fontWeight":"700"}}} --><h2 class="wp-block-heading" style="font-size:1.8rem;font-weight:700">Our Mission</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>HydroVac Pro was built to solve a simple problem: when a utility contractor, civil engineer, or property owner needs a hydrovac service company, finding verified, qualified operators takes too long. Phone books are gone. Google results are flooded with lead generation middlemen and directories that haven't been updated in years.</p><!-- /wp:paragraph -->
<!-- wp:paragraph --><p>We built HydroVac Pro to be the resource the hydro excavation industry actually deserves — a clean, organized, regularly updated directory of legitimate service companies, equipment providers, and dealers, organized by location and category so you can find exactly who you need in minutes.</p><!-- /wp:paragraph -->
<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"1.8rem","fontWeight":"700"}}} --><h2 class="wp-block-heading" style="font-size:1.8rem;font-weight:700">What We Do</h2><!-- /wp:heading -->
<!-- wp:list --><ul>
<!-- wp:list-item --><li>List and verify hydro excavation service companies across the US</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Organize listings by state, city, and specialty category</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Provide educational resources about hydro excavation methods and applications</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Connect project owners directly with contractors in their area</li><!-- /wp:list-item -->
</ul><!-- /wp:list -->
</div><!-- /wp:column -->
<!-- wp:column {"width":"40%"} -->
<div class="wp-block-column" style="flex-basis:40%">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","right":"2rem","bottom":"2rem","left":"2rem"}},"border":{"radius":"12px","width":"1px","color":"var:preset|color|ast-global-color-8"}},"backgroundColor":"ast-global-color-5","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-ast-global-color-5-background-color has-background" style="border-radius:12px;padding:2rem">
<!-- wp:heading {"level":3,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1.2rem","fontWeight":"700"}}} --><h3 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1.2rem;font-weight:700">Directory Stats</h3><!-- /wp:heading -->
<!-- wp:list {"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"0.95rem"}}} --><ul class="has-ast-global-color-2-color has-text-color" style="font-size:0.95rem">
<!-- wp:list-item --><li>🗺️ Growing US coverage</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>📋 Multiple service categories</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>📍 State & city geo-pages</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>🆓 Free basic listings</li><!-- /wp:list-item -->
</ul><!-- /wp:list -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"1rem"}}}} --><div class="wp-block-buttons" style="margin-top:1rem"><!-- wp:button {"backgroundColor":"ast-global-color-2","style":{"border":{"radius":"9999px"}}} --><div class="wp-block-button"><a class="wp-block-button__link has-ast-global-color-2-background-color has-background wp-element-button" href="/submit-listing/" style="border-radius:9999px">Get Listed Free →</a></div><!-- /wp:button --></div><!-- /wp:buttons -->
</div><!-- /wp:group -->
</div><!-- /wp:column -->
</div><!-- /wp:columns -->
`)}
${section(`
<!-- wp:heading {"textAlign":"center","level":2,"style":{"typography":{"fontSize":"1.8rem","fontWeight":"700"}}} --><h2 class="wp-block-heading has-text-align-center" style="font-size:1.8rem;font-weight:700">Who Uses HydroVac Pro?</h2><!-- /wp:heading -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"1.5rem"},"margin":{"top":"2rem"}}}} --><div class="wp-block-columns" style="margin-top:2rem">
<!-- wp:column --><div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"10px","width":"1px","color":"var:preset|color|ast-global-color-8"}},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;padding:1.5rem">
<!-- wp:heading {"level":4,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1rem"}}} --><h4 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1rem">🏗️ Contractors & Engineers</h4><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} --><p style="font-size:0.9rem">Find qualified hydrovac operators for potholing, slot trenching, and utility exposure on your next project.</p><!-- /wp:paragraph -->
</div><!-- /wp:group -->
</div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"10px","width":"1px","color":"var:preset|color|ast-global-color-8"}},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;padding:1.5rem">
<!-- wp:heading {"level":4,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1rem"}}} --><h4 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1rem">🏛️ Municipalities & Utilities</h4><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} --><p style="font-size:0.9rem">Source pre-vetted hydrovac service companies for municipal water, sewer, and infrastructure maintenance.</p><!-- /wp:paragraph -->
</div><!-- /wp:group -->
</div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"10px","width":"1px","color":"var:preset|color|ast-global-color-8"}},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;padding:1.5rem">
<!-- wp:heading {"level":4,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1rem"}}} --><h4 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1rem">🏢 Property Owners</h4><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} --><p style="font-size:0.9rem">Find local hydrovac companies for residential and commercial excavation near existing utilities.</p><!-- /wp:paragraph -->
</div><!-- /wp:group -->
</div><!-- /wp:column -->
</div><!-- /wp:columns -->
`, '#f8f9fa')}
`
},

// ══════════════════════════════════════════════════════════════════════════════
// MAIN LISTINGS PAGE
// ══════════════════════════════════════════════════════════════════════════════
{
  title: 'Hydro Excavation Company Directory | Browse All Listings',
  slug: 'listings',
  surerank: {
    title: 'Hydro Excavation Company Directory | HydroVac Pro',
    description: 'Browse the complete HydroVac Pro directory. Find service companies, equipment manufacturers, and sales & leasing companies for vacuum excavation and hydrovac across the US.'
  },
  content: `
${hero('Hydro Excavation Company Directory', 'Browse verified hydrovac contractors and suppliers across the United States')}
${section(`
<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"1.8rem","fontWeight":"700"}}} --><h2 class="wp-block-heading" style="font-size:1.8rem;font-weight:700">Browse by Category</h2><!-- /wp:heading -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"1.5rem","top":"1.5rem"},"margin":{"top":"2rem"}}}} --><div class="wp-block-columns" style="margin-top:2rem">
${card('🚛','Service Companies','Local hydrovac and vacuum excavation contractors ready for your project','/listings/service-companies/')}
${card('⚙️','Equipment Manufacturers','Leading manufacturers of hydrovac trucks and vacuum excavation equipment','/listings/equipment-manufacturers/')}
${card('🔧','Sales & Leasing','Buy, rent, or lease hydrovac equipment from trusted dealers','/listings/sales-leasing/')}
</div><!-- /wp:columns -->
<!-- wp:separator {"style":{"color":{"background":"var:preset|color|ast-global-color-8"}},"style":{"spacing":{"margin":{"top":"3rem","bottom":"3rem"}}}} --><hr class="wp-block-separator" style="margin-top:3rem;margin-bottom:3rem"/><!-- /wp:separator -->
<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"1.8rem","fontWeight":"700"}}} --><h2 class="wp-block-heading" style="font-size:1.8rem;font-weight:700">Browse by Location</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>Find hydrovac contractors in your state. We currently have listings across multiple US states with more added regularly.</p><!-- /wp:paragraph -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"1.5rem","top":"1rem"},"margin":{"top":"1.5rem"}}}} --><div class="wp-block-columns" style="margin-top:1.5rem">
<!-- wp:column --><div class="wp-block-column">
<!-- wp:heading {"level":4,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} --><h4 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1rem;font-weight:700">Southeast</h4><!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.95rem"}}} --><ul style="font-size:0.95rem">
<!-- wp:list-item --><li><a href="/north-carolina/">North Carolina</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/south-carolina/">South Carolina</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/georgia/">Georgia</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/virginia/">Virginia</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/tennessee/">Tennessee</a></li><!-- /wp:list-item -->
</ul><!-- /wp:list -->
</div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column">
<!-- wp:heading {"level":4,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} --><h4 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1rem;font-weight:700">Mid-Atlantic</h4><!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.95rem"}}} --><ul style="font-size:0.95rem">
<!-- wp:list-item --><li><a href="/maryland/">Maryland</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/pennsylvania/">Pennsylvania</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/new-jersey/">New Jersey</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/new-york/">New York</a></li><!-- /wp:list-item -->
</ul><!-- /wp:list -->
</div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column">
<!-- wp:heading {"level":4,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} --><h4 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1rem;font-weight:700">Midwest</h4><!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.95rem"}}} --><ul style="font-size:0.95rem">
<!-- wp:list-item --><li><a href="/ohio/">Ohio</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/michigan/">Michigan</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/illinois/">Illinois</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/texas/">Texas</a></li><!-- /wp:list-item -->
</ul><!-- /wp:list -->
</div><!-- /wp:column -->
</div><!-- /wp:columns -->
<!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"1.5rem"}}}} --><p style="margin-top:1.5rem"><a href="/locations/">View all states →</a></p><!-- /wp:paragraph -->
`)}
`
},

// ══════════════════════════════════════════════════════════════════════════════
// SERVICE COMPANIES CATEGORY
// ══════════════════════════════════════════════════════════════════════════════
{
  title: 'Hydrovac Service Companies Directory | Find Contractors Near You',
  slug: 'listings/service-companies',
  surerank: {
    title: 'Hydrovac Service Companies Directory | HydroVac Pro',
    description: 'Browse hydro excavation and vacuum excavation service companies across the US. Find local contractors for potholing, slot trenching, daylighting, and utility exposure.'
  },
  content: `
${hero('Hydro Excavation Service Companies', 'Find verified hydrovac contractors for your project — organized by state and city')}
${section(`
<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"1.8rem","fontWeight":"700"}}} --><h2 class="wp-block-heading" style="font-size:1.8rem;font-weight:700">Featured Service Companies</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>These companies are featured members of the HydroVac Pro directory. Contact them directly for quotes and availability.</p><!-- /wp:paragraph -->
<div style="margin-top:1.5rem">
${listingCard(true,'Vac Truck Services','Hydro Excavation / Vacuum Excavation','Wilmington, NC','888-480-8225','Professional hydro excavation services serving Wilmington, NC and the Cape Fear region. Over 30 years of field experience in utility locating, potholing, and non-destructive digging.')}
${listingCard(false,'[Your Company Here]','Hydro Excavation','Your City, Your State','','Is your hydrovac company missing from this list? Get featured at the top of your city page.')}
</div>
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1rem","right":"1.5rem","bottom":"1rem","left":"1.5rem"},"margin":{"top":"2rem"}},"border":{"radius":"10px","width":"1px","color":"var:preset|color|ast-global-color-8"}},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1rem 1.5rem;margin-top:2rem">
<!-- wp:paragraph --><p><strong>Is your business missing?</strong> <a href="/submit-listing/">Submit a free listing →</a></p><!-- /wp:paragraph -->
</div><!-- /wp:group -->
`)}
${section(`
<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"1.8rem","fontWeight":"700"}}} --><h2 class="wp-block-heading" style="font-size:1.8rem;font-weight:700">Browse Service Companies by State</h2><!-- /wp:heading -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"1.5rem","top":"0.75rem"},"margin":{"top":"1.5rem"}}}} --><div class="wp-block-columns" style="margin-top:1.5rem">
<!-- wp:column --><div class="wp-block-column">
<!-- wp:list {"style":{"typography":{"fontSize":"0.95rem"}}} --><ul style="font-size:0.95rem">
<!-- wp:list-item --><li><a href="/north-carolina/">North Carolina</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/south-carolina/">South Carolina</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/virginia/">Virginia</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/georgia/">Georgia</a></li><!-- /wp:list-item -->
</ul><!-- /wp:list -->
</div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column">
<!-- wp:list {"style":{"typography":{"fontSize":"0.95rem"}}} --><ul style="font-size:0.95rem">
<!-- wp:list-item --><li><a href="/ohio/">Ohio</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/tennessee/">Tennessee</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/texas/">Texas</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/locations/">All States →</a></li><!-- /wp:list-item -->
</ul><!-- /wp:list -->
</div><!-- /wp:column -->
</div><!-- /wp:columns -->
`, '#f8f9fa')}
`
},

// ══════════════════════════════════════════════════════════════════════════════
// EQUIPMENT MANUFACTURERS
// ══════════════════════════════════════════════════════════════════════════════
{
  title: 'Hydrovac Equipment Manufacturers | Vacuum Excavation Truck Makers',
  slug: 'listings/equipment-manufacturers',
  surerank: {
    title: 'Hydrovac Equipment Manufacturers Directory | HydroVac Pro',
    description: 'Browse leading hydrovac truck and vacuum excavation equipment manufacturers. Compare brands, specs, and find authorized dealers across the US.'
  },
  content: `
${hero('Hydrovac Equipment Manufacturers', 'Leading manufacturers of hydro excavation trucks and vacuum excavation equipment')}
${section(`
<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"1.8rem","fontWeight":"700"}}} --><h2 class="wp-block-heading" style="font-size:1.8rem;font-weight:700">Major Hydrovac Equipment Manufacturers</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>The hydro excavation equipment industry is dominated by a handful of major manufacturers that set the standard for truck performance, debris tank capacity, and water system specifications. Below are the most widely recognized brands in the US market.</p><!-- /wp:paragraph -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"1.5rem","top":"1rem"},"margin":{"top":"2rem"}}}} --><div class="wp-block-columns" style="margin-top:2rem">
<!-- wp:column --><div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"10px","top":{"color":"var:preset|color|ast-global-color-0","width":"4px"},"right":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"bottom":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"left":{"width":"1px","color":"var:preset|color|ast-global-color-8"}}},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;border-top:4px solid var(--wp--preset--color--ast-global-color-0);border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.5rem">
<!-- wp:heading {"level":3,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1.1rem","fontWeight":"700"}}} --><h3 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1.1rem;font-weight:700">Vactor Manufacturing</h3><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} --><p style="font-size:0.9rem">One of the most widely recognized names in combination sewer cleaning and hydrovac trucks. The Vactor HXX series is a standard in the utility contractor market.</p><!-- /wp:paragraph -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.85rem","fontStyle":"italic"}}} --><p style="font-size:0.85rem;font-style:italic">Category: Hydrovac Trucks | Based in: Illinois, USA</p><!-- /wp:paragraph -->
</div><!-- /wp:group -->
</div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"10px","top":{"color":"var:preset|color|ast-global-color-0","width":"4px"},"right":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"bottom":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"left":{"width":"1px","color":"var:preset|color|ast-global-color-8"}}},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;border-top:4px solid var(--wp--preset--color--ast-global-color-0);border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.5rem">
<!-- wp:heading {"level":3,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1.1rem","fontWeight":"700"}}} --><h3 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1.1rem;font-weight:700">Aquatech</h3><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} --><p style="font-size:0.9rem">Canadian-founded manufacturer known for purpose-built hydrovac and combination trucks, widely used in both the US and Canadian oil & gas and utility markets.</p><!-- /wp:paragraph -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.85rem","fontStyle":"italic"}}} --><p style="font-size:0.85rem;font-style:italic">Category: Hydrovac Trucks | Based in: Alberta, Canada</p><!-- /wp:paragraph -->
</div><!-- /wp:group -->
</div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"10px","top":{"color":"var:preset|color|ast-global-color-0","width":"4px"},"right":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"bottom":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"left":{"width":"1px","color":"var:preset|color|ast-global-color-8"}}},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;border-top:4px solid var(--wp--preset--color--ast-global-color-0);border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.5rem">
<!-- wp:heading {"level":3,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1.1rem","fontWeight":"700"}}} --><h3 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1.1rem;font-weight:700">Tornado Global Hydrovacs</h3><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} --><p style="font-size:0.9rem">Specializes in dedicated hydrovac trucks with a reputation for high water pressure capacity and large debris tank configurations suited for industrial and oil field work.</p><!-- /wp:paragraph -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.85rem","fontStyle":"italic"}}} --><p style="font-size:0.85rem;font-style:italic">Category: Hydrovac Trucks | Based in: Alberta, Canada</p><!-- /wp:paragraph -->
</div><!-- /wp:group -->
</div><!-- /wp:column -->
</div><!-- /wp:columns -->
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1rem","right":"1.5rem","bottom":"1rem","left":"1.5rem"},"margin":{"top":"2rem"}},"border":{"radius":"10px","width":"1px","color":"var:preset|color|ast-global-color-8"}},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1rem 1.5rem;margin-top:2rem">
<!-- wp:paragraph --><p><strong>Are you an equipment manufacturer?</strong> <a href="/submit-listing/">Get listed in our directory →</a></p><!-- /wp:paragraph -->
</div><!-- /wp:group -->
`)}
`
},

// ══════════════════════════════════════════════════════════════════════════════
// SALES & LEASING
// ══════════════════════════════════════════════════════════════════════════════
{
  title: 'Hydrovac Equipment Sales & Leasing | Buy or Rent Vacuum Excavation Trucks',
  slug: 'listings/sales-leasing',
  surerank: {
    title: 'Hydrovac Equipment Sales & Leasing Directory | HydroVac Pro',
    description: 'Find hydrovac truck dealers, equipment rental companies, and leasing options across the US. Compare new and used vacuum excavation equipment from verified sellers.'
  },
  content: `
${hero('Hydrovac Equipment Sales & Leasing', 'Buy, rent, or lease vacuum excavation trucks and equipment from verified dealers')}
${section(`
<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"1.8rem","fontWeight":"700"}}} --><h2 class="wp-block-heading" style="font-size:1.8rem;font-weight:700">Find Equipment Dealers Near You</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>Whether you're looking to purchase a new hydrovac truck, buy used equipment, or lease for a specific project, this directory connects you with verified dealers and rental companies across the United States.</p><!-- /wp:paragraph -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"1.5rem"},"margin":{"top":"2rem"}}}} --><div class="wp-block-columns" style="margin-top:2rem">
<!-- wp:column --><div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"10px","width":"1px","color":"var:preset|color|ast-global-color-8"}},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.5rem">
<!-- wp:heading {"level":3,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1.1rem","fontWeight":"700"}}} --><h3 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1.1rem;font-weight:700">🆕 New Equipment</h3><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} --><p style="font-size:0.9rem">Authorized dealers for major hydrovac truck manufacturers. Factory warranty, current-model configurations, financing available.</p><!-- /wp:paragraph -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} --><p style="font-size:0.9rem"><strong>Typical range:</strong> $250,000 – $750,000+</p><!-- /wp:paragraph -->
</div><!-- /wp:group -->
</div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"10px","width":"1px","color":"var:preset|color|ast-global-color-8"}},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.5rem">
<!-- wp:heading {"level":3,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1.1rem","fontWeight":"700"}}} --><h3 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1.1rem;font-weight:700">🔄 Used Equipment</h3><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} --><p style="font-size:0.9rem">Pre-owned hydrovac trucks from reputable sellers. Inspection reports, service history, and warranty options vary by seller.</p><!-- /wp:paragraph -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} --><p style="font-size:0.9rem"><strong>Typical range:</strong> $80,000 – $350,000</p><!-- /wp:paragraph -->
</div><!-- /wp:group -->
</div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"10px","width":"1px","color":"var:preset|color|ast-global-color-8"}},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.5rem">
<!-- wp:heading {"level":3,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1.1rem","fontWeight":"700"}}} --><h3 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1.1rem;font-weight:700">📋 Rental & Lease</h3><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} --><p style="font-size:0.9rem">Short and long-term rental of hydrovac equipment. Ideal for contractors scaling up for a specific project without capital purchase.</p><!-- /wp:paragraph -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} --><p style="font-size:0.9rem"><strong>Typical range:</strong> $1,500 – $5,000/week</p><!-- /wp:paragraph -->
</div><!-- /wp:group -->
</div><!-- /wp:column -->
</div><!-- /wp:columns -->
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1rem","right":"1.5rem","bottom":"1rem","left":"1.5rem"},"margin":{"top":"2rem"}},"border":{"radius":"10px","width":"1px","color":"var:preset|color|ast-global-color-8"}},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1rem 1.5rem;margin-top:2rem">
<!-- wp:paragraph --><p><strong>Are you an equipment dealer?</strong> <a href="/submit-listing/">List your inventory in our directory →</a></p><!-- /wp:paragraph -->
</div><!-- /wp:group -->
`)}
`
},

// ══════════════════════════════════════════════════════════════════════════════
// LOCATIONS PAGE
// ══════════════════════════════════════════════════════════════════════════════
{
  title: 'Hydro Excavation Contractors by State | All Locations',
  slug: 'locations',
  surerank: {
    title: 'Hydro Excavation by State | Find Contractors Near You | HydroVac Pro',
    description: 'Browse hydrovac and vacuum excavation companies by US state. Find verified contractors in your area for potholing, slot trenching, utility locating, and daylighting.'
  },
  content: `
${hero('Find Hydrovac Contractors by Location', 'Browse hydro excavation companies by state and city across the United States')}
${section(`
<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"1.8rem","fontWeight":"700"}}} --><h2 class="wp-block-heading" style="font-size:1.8rem;font-weight:700">Southeast</h2><!-- /wp:heading -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"1.5rem","top":"0.75rem"},"margin":{"top":"1.5rem"}}}} --><div class="wp-block-columns" style="margin-top:1.5rem">
<!-- wp:column --><div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"10px","top":{"color":"var:preset|color|ast-global-color-0","width":"4px"},"right":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"bottom":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"left":{"width":"1px","color":"var:preset|color|ast-global-color-8"}}},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;border-top:4px solid var(--wp--preset--color--ast-global-color-0);border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.5rem">
<!-- wp:heading {"level":3,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} --><h3 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1rem;font-weight:700"><a href="/north-carolina/" style="color:inherit">North Carolina</a></h3><!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.9rem"}}} --><ul style="font-size:0.9rem">
<!-- wp:list-item --><li><a href="/wilmington-nc/">Wilmington</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/jacksonville-nc/">Jacksonville</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/raleigh-nc/">Raleigh</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/charlotte-nc/">Charlotte</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/fayetteville-nc/">Fayetteville</a></li><!-- /wp:list-item -->
</ul><!-- /wp:list -->
</div><!-- /wp:group -->
</div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"10px","top":{"color":"var:preset|color|ast-global-color-0","width":"4px"},"right":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"bottom":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"left":{"width":"1px","color":"var:preset|color|ast-global-color-8"}}},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;border-top:4px solid var(--wp--preset--color--ast-global-color-0);border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.5rem">
<!-- wp:heading {"level":3,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} --><h3 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1rem;font-weight:700"><a href="/south-carolina/" style="color:inherit">South Carolina</a></h3><!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.9rem"}}} --><ul style="font-size:0.9rem">
<!-- wp:list-item --><li><a href="/charleston-sc/">Charleston</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/columbia-sc/">Columbia</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/myrtle-beach-sc/">Myrtle Beach</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/greenville-sc/">Greenville</a></li><!-- /wp:list-item -->
</ul><!-- /wp:list -->
</div><!-- /wp:group -->
</div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"10px","top":{"color":"var:preset|color|ast-global-color-0","width":"4px"},"right":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"bottom":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"left":{"width":"1px","color":"var:preset|color|ast-global-color-8"}}},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;border-top:4px solid var(--wp--preset--color--ast-global-color-0);border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.5rem">
<!-- wp:heading {"level":3,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} --><h3 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1rem;font-weight:700"><a href="/georgia/" style="color:inherit">Georgia</a></h3><!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.9rem"}}} --><ul style="font-size:0.9rem">
<!-- wp:list-item --><li><a href="/atlanta-ga/">Atlanta</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/savannah-ga/">Savannah</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/augusta-ga/">Augusta</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/macon-ga/">Macon</a></li><!-- /wp:list-item -->
</ul><!-- /wp:list -->
</div><!-- /wp:group -->
</div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"10px","top":{"color":"var:preset|color|ast-global-color-0","width":"4px"},"right":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"bottom":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"left":{"width":"1px","color":"var:preset|color|ast-global-color-8"}}},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;border-top:4px solid var(--wp--preset--color--ast-global-color-0);border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.5rem">
<!-- wp:heading {"level":3,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} --><h3 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1rem;font-weight:700"><a href="/virginia/" style="color:inherit">Virginia</a></h3><!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.9rem"}}} --><ul style="font-size:0.9rem">
<!-- wp:list-item --><li><a href="/norfolk-va/">Norfolk</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/virginia-beach-va/">Virginia Beach</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/richmond-va/">Richmond</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/roanoke-va/">Roanoke</a></li><!-- /wp:list-item -->
</ul><!-- /wp:list -->
</div><!-- /wp:group -->
</div><!-- /wp:column -->
</div><!-- /wp:columns -->
<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"1.8rem","fontWeight":"700"},"spacing":{"margin":{"top":"3rem"}}}} --><h2 class="wp-block-heading" style="font-size:1.8rem;font-weight:700;margin-top:3rem">More States Coming Soon</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>We're actively adding coverage across the US. States being added: Tennessee, Ohio, Texas, Michigan, Maryland, Pennsylvania, Florida. <a href="/submit-listing/">Submit your listing</a> to get your city added faster.</p><!-- /wp:paragraph -->
`)}
`
},

// ══════════════════════════════════════════════════════════════════════════════
// INFORMATION LANDING PAGE
// ══════════════════════════════════════════════════════════════════════════════
{
  title: 'Hydro Excavation Information & Resources | HydroVac Pro Library',
  slug: 'information',
  surerank: {
    title: 'Hydro Excavation Information & Guides | HydroVac Pro Library',
    description: 'Learn everything about hydro excavation — what it is, how it works, applications, industries, and best practices. Complete resource library from HydroVac Pro.'
  },
  content: `
${hero('Hydro Excavation Information', 'Educational guides and resources about vacuum excavation — written for contractors and project owners', '#1a365d', '240px')}
${section(`
<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"1.8rem","fontWeight":"700"}}} --><h2 class="wp-block-heading" style="font-size:1.8rem;font-weight:700">Getting Started with Hydro Excavation</h2><!-- /wp:heading -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"1.5rem","top":"1rem"},"margin":{"top":"1.5rem"}}}} --><div class="wp-block-columns" style="margin-top:1.5rem">
<!-- wp:column --><div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"10px","top":{"color":"var:preset|color|ast-global-color-0","width":"4px"},"right":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"bottom":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"left":{"width":"1px","color":"var:preset|color|ast-global-color-8"}},"shadow":"var:preset|shadow|natural"},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;border-top:4px solid var(--wp--preset--color--ast-global-color-0);border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.5rem;box-shadow:var(--wp--preset--shadow--natural)">
<!-- wp:heading {"level":3,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1.05rem","fontWeight":"700"}}} --><h3 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1.05rem;font-weight:700"><a href="/what-is-hydro-excavation/" style="color:inherit">What is Hydro Excavation?</a></h3><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} --><p style="font-size:0.9rem">The complete beginner's guide to hydrovac technology — how it works, why it's safer than mechanical digging, and where it's used.</p><!-- /wp:paragraph -->
<!-- wp:buttons --><div class="wp-block-buttons"><!-- wp:button {"style":{"border":{"radius":"9999px"},"typography":{"fontSize":"0.8rem"}},"textColor":"ast-global-color-2","className":"is-style-outline"} --><div class="wp-block-button is-style-outline"><a class="wp-block-button__link has-ast-global-color-2-color has-text-color wp-element-button" href="/what-is-hydro-excavation/" style="border-radius:9999px;font-size:0.8rem">Read Guide →</a></div><!-- /wp:button --></div><!-- /wp:buttons -->
</div><!-- /wp:group -->
</div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"10px","top":{"color":"var:preset|color|ast-global-color-0","width":"4px"},"right":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"bottom":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"left":{"width":"1px","color":"var:preset|color|ast-global-color-8"}},"shadow":"var:preset|shadow|natural"},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;border-top:4px solid var(--wp--preset--color--ast-global-color-0);border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.5rem;box-shadow:var(--wp--preset--shadow--natural)">
<!-- wp:heading {"level":3,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1.05rem","fontWeight":"700"}}} --><h3 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1.05rem;font-weight:700"><a href="/history-of-hydro-excavation/" style="color:inherit">History of Hydro Excavation</a></h3><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} --><p style="font-size:0.9rem">From Canadian oil sands in the 1970s to a $1B+ US industry today — the origin story of modern hydrovac technology.</p><!-- /wp:paragraph -->
<!-- wp:buttons --><div class="wp-block-buttons"><!-- wp:button {"style":{"border":{"radius":"9999px"},"typography":{"fontSize":"0.8rem"}},"textColor":"ast-global-color-2","className":"is-style-outline"} --><div class="wp-block-button is-style-outline"><a class="wp-block-button__link has-ast-global-color-2-color has-text-color wp-element-button" href="/history-of-hydro-excavation/" style="border-radius:9999px;font-size:0.8rem">Read Guide →</a></div><!-- /wp:button --></div><!-- /wp:buttons -->
</div><!-- /wp:group -->
</div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"10px","top":{"color":"var:preset|color|ast-global-color-0","width":"4px"},"right":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"bottom":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"left":{"width":"1px","color":"var:preset|color|ast-global-color-8"}},"shadow":"var:preset|shadow|natural"},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;border-top:4px solid var(--wp--preset--color--ast-global-color-0);border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.5rem;box-shadow:var(--wp--preset--shadow--natural)">
<!-- wp:heading {"level":3,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1.05rem","fontWeight":"700"}}} --><h3 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1.05rem;font-weight:700"><a href="/benefits-of-hydro-excavation/" style="color:inherit">Benefits of Hydro Excavation</a></h3><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} --><p style="font-size:0.9rem">8 key reasons why contractors choose hydrovac over traditional digging — safety, precision, speed, and liability reduction.</p><!-- /wp:paragraph -->
<!-- wp:buttons --><div class="wp-block-buttons"><!-- wp:button {"style":{"border":{"radius":"9999px"},"typography":{"fontSize":"0.8rem"}},"textColor":"ast-global-color-2","className":"is-style-outline"} --><div class="wp-block-button is-style-outline"><a class="wp-block-button__link has-ast-global-color-2-color has-text-color wp-element-button" href="/benefits-of-hydro-excavation/" style="border-radius:9999px;font-size:0.8rem">Read Guide →</a></div><!-- /wp:button --></div><!-- /wp:buttons -->
</div><!-- /wp:group -->
</div><!-- /wp:column -->
</div><!-- /wp:columns -->
<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"1.8rem","fontWeight":"700"},"spacing":{"margin":{"top":"3rem"}}}} --><h2 class="wp-block-heading" style="font-size:1.8rem;font-weight:700;margin-top:3rem">Applications & Techniques</h2><!-- /wp:heading -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"1.5rem","top":"1rem"},"margin":{"top":"1.5rem"}}}} --><div class="wp-block-columns" style="margin-top:1.5rem">
<!-- wp:column --><div class="wp-block-column"><!-- wp:group {"style":{"spacing":{"padding":{"top":"1.2rem","right":"1.2rem","bottom":"1.2rem","left":"1.2rem"}},"border":{"radius":"8px","width":"1px","color":"var:preset|color|ast-global-color-8"}},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:8px;border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.2rem"><!-- wp:heading {"level":4,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} --><h4 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1rem;font-weight:700"><a href="/potholing-daylighting/" style="color:inherit">Potholing & Daylighting</a></h4><!-- /wp:heading --><!-- wp:paragraph {"style":{"typography":{"fontSize":"0.88rem"}}} --><p style="font-size:0.88rem">The most common application — exposing utilities before construction.</p><!-- /wp:paragraph --></div><!-- /wp:group --></div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column"><!-- wp:group {"style":{"spacing":{"padding":{"top":"1.2rem","right":"1.2rem","bottom":"1.2rem","left":"1.2rem"}},"border":{"radius":"8px","width":"1px","color":"var:preset|color|ast-global-color-8"}},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:8px;border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.2rem"><!-- wp:heading {"level":4,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} --><h4 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1rem;font-weight:700"><a href="/slot-trenching/" style="color:inherit">Slot Trenching</a></h4><!-- /wp:heading --><!-- wp:paragraph {"style":{"typography":{"fontSize":"0.88rem"}}} --><p style="font-size:0.88rem">Narrow precision trenches for fiber, conduit, and pipe installation.</p><!-- /wp:paragraph --></div><!-- /wp:group --></div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column"><!-- wp:group {"style":{"spacing":{"padding":{"top":"1.2rem","right":"1.2rem","bottom":"1.2rem","left":"1.2rem"}},"border":{"radius":"8px","width":"1px","color":"var:preset|color|ast-global-color-8"}},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:8px;border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.2rem"><!-- wp:heading {"level":4,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} --><h4 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1rem;font-weight:700"><a href="/debris-removal/" style="color:inherit">Debris Removal</a></h4><!-- /wp:heading --><!-- wp:paragraph {"style":{"typography":{"fontSize":"0.88rem"}}} --><p style="font-size:0.88rem">Removing wet, dry, and contaminated material from any location.</p><!-- /wp:paragraph --></div><!-- /wp:group --></div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column"><!-- wp:group {"style":{"spacing":{"padding":{"top":"1.2rem","right":"1.2rem","bottom":"1.2rem","left":"1.2rem"}},"border":{"radius":"8px","width":"1px","color":"var:preset|color|ast-global-color-8"}},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:8px;border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.2rem"><!-- wp:heading {"level":4,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} --><h4 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1rem;font-weight:700"><a href="/cold-weather-digging/" style="color:inherit">Cold Weather Digging</a></h4><!-- /wp:heading --><!-- wp:paragraph {"style":{"typography":{"fontSize":"0.88rem"}}} --><p style="font-size:0.88rem">Hot water hydrovac for frozen ground — year-round operation.</p><!-- /wp:paragraph --></div><!-- /wp:group --></div><!-- /wp:column -->
</div><!-- /wp:columns -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"1.5rem","top":"1rem"},"margin":{"top":"1rem"}}}} --><div class="wp-block-columns" style="margin-top:1rem">
<!-- wp:column --><div class="wp-block-column"><!-- wp:group {"style":{"spacing":{"padding":{"top":"1.2rem","right":"1.2rem","bottom":"1.2rem","left":"1.2rem"}},"border":{"radius":"8px","width":"1px","color":"var:preset|color|ast-global-color-8"}},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:8px;border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.2rem"><!-- wp:heading {"level":4,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} --><h4 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1rem;font-weight:700"><a href="/exposing-utilities/" style="color:inherit">Exposing Utilities</a></h4><!-- /wp:heading --><!-- wp:paragraph {"style":{"typography":{"fontSize":"0.88rem"}}} --><p style="font-size:0.88rem">Safe utility exposure — gas, electric, fiber, telecom, and water mains.</p><!-- /wp:paragraph --></div><!-- /wp:group --></div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column"><!-- wp:group {"style":{"spacing":{"padding":{"top":"1.2rem","right":"1.2rem","bottom":"1.2rem","left":"1.2rem"}},"border":{"radius":"8px","width":"1px","color":"var:preset|color|ast-global-color-8"}},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:8px;border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.2rem"><!-- wp:heading {"level":4,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} --><h4 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1rem;font-weight:700"><a href="/piling-hole-excavation/" style="color:inherit">Piling Hole Excavation</a></h4><!-- /wp:heading --><!-- wp:paragraph {"style":{"typography":{"fontSize":"0.88rem"}}} --><p style="font-size:0.88rem">Precise cylindrical holes for foundations, sign posts, and light poles.</p><!-- /wp:paragraph --></div><!-- /wp:group --></div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column"><!-- wp:group {"style":{"spacing":{"padding":{"top":"1.2rem","right":"1.2rem","bottom":"1.2rem","left":"1.2rem"}},"border":{"radius":"8px","width":"1px","color":"var:preset|color|ast-global-color-8"}},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:8px;border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.2rem"><!-- wp:heading {"level":4,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} --><h4 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1rem;font-weight:700"><a href="/remote-digging/" style="color:inherit">Remote Digging</a></h4><!-- /wp:heading --><!-- wp:paragraph {"style":{"typography":{"fontSize":"0.88rem"}}} --><p style="font-size:0.88rem">Excavating up to 60+ feet from the truck with boom arms and hose extensions.</p><!-- /wp:paragraph --></div><!-- /wp:group --></div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column"><!-- wp:group {"style":{"spacing":{"padding":{"top":"1.2rem","right":"1.2rem","bottom":"1.2rem","left":"1.2rem"}},"border":{"radius":"8px","width":"1px","color":"var:preset|color|ast-global-color-8"}},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:8px;border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.2rem"><!-- wp:heading {"level":4,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} --><h4 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1rem;font-weight:700"><a href="/industries-where-hydro-excavation-is-used/" style="color:inherit">Industries</a></h4><!-- /wp:heading --><!-- wp:paragraph {"style":{"typography":{"fontSize":"0.88rem"}}} --><p style="font-size:0.88rem">Oil & gas, telecom, municipal, construction, environmental — full industry breakdown.</p><!-- /wp:paragraph --></div><!-- /wp:group --></div><!-- /wp:column -->
</div><!-- /wp:columns -->
`)}
`
},

// ══════════════════════════════════════════════════════════════════════════════
// VIRGINIA STATE PAGE
// ══════════════════════════════════════════════════════════════════════════════
{
  title: 'Hydro Excavation Companies in Virginia | Hydrovac Contractors VA',
  slug: 'virginia',
  surerank: {
    title: 'Hydro Excavation Companies in Virginia | HydroVac Pro',
    description: 'Find trusted hydrovac and hydro excavation contractors across Virginia. Browse verified service companies in Norfolk, Virginia Beach, Richmond, Roanoke, and more.'
  },
  content: `
${hero('Hydro Excavation Companies in Virginia', 'Verified hydrovac contractors serving all of Virginia')}
${section(`
<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"1.8rem","fontWeight":"700"}}} --><h2 class="wp-block-heading" style="font-size:1.8rem;font-weight:700">Browse by City</h2><!-- /wp:heading -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"1.5rem","top":"1.5rem"},"margin":{"top":"1.5rem"}}}} --><div class="wp-block-columns" style="margin-top:1.5rem">
<!-- wp:column --><div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"10px","width":"1px","color":"var:preset|color|ast-global-color-8"},"shadow":"var:preset|shadow|natural"},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.5rem;box-shadow:var(--wp--preset--shadow--natural)">
<!-- wp:heading {"level":3,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1.1rem","fontWeight":"700"}}} --><h3 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1.1rem;font-weight:700">🌊 Hampton Roads</h3><!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.95rem"}}} --><ul style="font-size:0.95rem">
<!-- wp:list-item --><li><a href="/norfolk-va/">Norfolk, VA</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/virginia-beach-va/">Virginia Beach, VA</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/chesapeake-va/">Chesapeake, VA</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/newport-news-va/">Newport News, VA</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/hampton-va/">Hampton, VA</a></li><!-- /wp:list-item -->
</ul><!-- /wp:list -->
</div><!-- /wp:group -->
</div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"10px","width":"1px","color":"var:preset|color|ast-global-color-8"},"shadow":"var:preset|shadow|natural"},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.5rem;box-shadow:var(--wp--preset--shadow--natural)">
<!-- wp:heading {"level":3,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1.1rem","fontWeight":"700"}}} --><h3 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1.1rem;font-weight:700">🏙️ Central Virginia</h3><!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.95rem"}}} --><ul style="font-size:0.95rem">
<!-- wp:list-item --><li><a href="/richmond-va/">Richmond, VA</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/chesterfield-va/">Chesterfield, VA</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/henrico-va/">Henrico, VA</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/colonial-heights-va/">Colonial Heights, VA</a></li><!-- /wp:list-item -->
</ul><!-- /wp:list -->
</div><!-- /wp:group -->
</div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"10px","width":"1px","color":"var:preset|color|ast-global-color-8"},"shadow":"var:preset|shadow|natural"},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.5rem;box-shadow:var(--wp--preset--shadow--natural)">
<!-- wp:heading {"level":3,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1.1rem","fontWeight":"700"}}} --><h3 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1.1rem;font-weight:700">🏔️ Western Virginia</h3><!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.95rem"}}} --><ul style="font-size:0.95rem">
<!-- wp:list-item --><li><a href="/roanoke-va/">Roanoke, VA</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/lynchburg-va/">Lynchburg, VA</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/charlottesville-va/">Charlottesville, VA</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/harrisonburg-va/">Harrisonburg, VA</a></li><!-- /wp:list-item -->
</ul><!-- /wp:list -->
</div><!-- /wp:group -->
</div><!-- /wp:column -->
</div><!-- /wp:columns -->
`)}
`
},

// ══════════════════════════════════════════════════════════════════════════════
// SOUTH CAROLINA STATE PAGE
// ══════════════════════════════════════════════════════════════════════════════
{
  title: 'Hydro Excavation Companies in South Carolina | Hydrovac Contractors SC',
  slug: 'south-carolina',
  surerank: {
    title: 'Hydro Excavation Companies in South Carolina | HydroVac Pro',
    description: 'Find trusted hydrovac and hydro excavation contractors across South Carolina. Browse verified service companies in Charleston, Columbia, Myrtle Beach, and Greenville.'
  },
  content: `
${hero('Hydro Excavation Companies in South Carolina', 'Verified hydrovac contractors serving all of South Carolina')}
${section(`
<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"1.8rem","fontWeight":"700"}}} --><h2 class="wp-block-heading" style="font-size:1.8rem;font-weight:700">Browse by City</h2><!-- /wp:heading -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"1.5rem","top":"1.5rem"},"margin":{"top":"1.5rem"}}}} --><div class="wp-block-columns" style="margin-top:1.5rem">
<!-- wp:column --><div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"10px","width":"1px","color":"var:preset|color|ast-global-color-8"},"shadow":"var:preset|shadow|natural"},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.5rem;box-shadow:var(--wp--preset--shadow--natural)">
<!-- wp:heading {"level":3,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1.1rem","fontWeight":"700"}}} --><h3 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1.1rem;font-weight:700">🌊 Lowcountry & Coast</h3><!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.95rem"}}} --><ul style="font-size:0.95rem">
<!-- wp:list-item --><li><a href="/charleston-sc/">Charleston, SC</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/myrtle-beach-sc/">Myrtle Beach, SC</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/hilton-head-sc/">Hilton Head, SC</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/beaufort-sc/">Beaufort, SC</a></li><!-- /wp:list-item -->
</ul><!-- /wp:list -->
</div><!-- /wp:group -->
</div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"10px","width":"1px","color":"var:preset|color|ast-global-color-8"},"shadow":"var:preset|shadow|natural"},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.5rem;box-shadow:var(--wp--preset--shadow--natural)">
<!-- wp:heading {"level":3,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1.1rem","fontWeight":"700"}}} --><h3 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1.1rem;font-weight:700">🏙️ Midlands & Upstate</h3><!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.95rem"}}} --><ul style="font-size:0.95rem">
<!-- wp:list-item --><li><a href="/columbia-sc/">Columbia, SC</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/greenville-sc/">Greenville, SC</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/spartanburg-sc/">Spartanburg, SC</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/anderson-sc/">Anderson, SC</a></li><!-- /wp:list-item -->
</ul><!-- /wp:list -->
</div><!-- /wp:group -->
</div><!-- /wp:column -->
</div><!-- /wp:columns -->
`)}
`
},

// ══════════════════════════════════════════════════════════════════════════════
// NC CITY PAGES
// ══════════════════════════════════════════════════════════════════════════════
...[
  { city: 'Jacksonville', state: 'NC', slug: 'jacksonville-nc', region: 'Onslow County and the Crystal Coast', desc: 'home to Camp Lejeune Marine Corps Base and a major military construction corridor', cities: ['Richlands, NC','Swansboro, NC','Hubert, NC','Holly Ridge, NC'] },
  { city: 'Fayetteville', state: 'NC', slug: 'fayetteville-nc', region: 'Cumberland County and the Sandhills region', desc: 'home to Fort Liberty (formerly Fort Bragg), one of the largest US Army installations in the world', cities: ['Hope Mills, NC','Spring Lake, NC','Lumberton, NC','Raeford, NC'] },
  { city: 'Raleigh', state: 'NC', slug: 'raleigh-nc', region: 'Wake County and the Research Triangle', desc: 'the state capital and fastest-growing metro in the Southeast with major infrastructure expansion', cities: ['Durham, NC','Cary, NC','Garner, NC','Clayton, NC'] },
  { city: 'Charlotte', state: 'NC', slug: 'charlotte-nc', region: 'Mecklenburg County and the Charlotte metro', desc: 'the largest city in North Carolina and a major financial and construction hub', cities: ['Concord, NC','Kannapolis, NC','Gastonia, NC','Rock Hill, SC'] },
  { city: 'Greensboro', state: 'NC', slug: 'greensboro-nc', region: 'Guilford County and the Piedmont Triad', desc: 'a major industrial and logistics hub in central North Carolina', cities: ['Winston-Salem, NC','High Point, NC','Burlington, NC','Asheboro, NC'] },
].map(c => ({
  title: `Hydro Excavation ${c.city} NC | Hydrovac Contractors`,
  slug: c.slug,
  surerank: {
    title: `Hydro Excavation ${c.city} NC | Hydrovac Contractors Near You | HydroVac Pro`,
    description: `Find trusted hydrovac and hydro excavation contractors in ${c.city}, NC. Compare local service companies for potholing, utility locating, slot trenching, and vacuum excavation.`
  },
  content: `
${hero(`Hydro Excavation Contractors in ${c.city}, NC`, `Verified hydrovac service companies serving ${c.city} and ${c.region}`)}
${section(`
<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"1.8rem","fontWeight":"700"}}} --><h2 class="wp-block-heading" style="font-size:1.8rem;font-weight:700">Hydrovac Companies in ${c.city}, NC</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>Browse verified hydro excavation contractors serving ${c.city}, NC and surrounding areas including ${c.cities.join(', ')}.</p><!-- /wp:paragraph -->
${listingCard(false,'[List Your Company Here]','Hydro Excavation / Vacuum Excavation',`${c.city}, NC`,'',`Be the first featured hydrovac contractor in ${c.city}, NC. Get exclusive placement and all leads from this page.`)}
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1rem","right":"1.5rem","bottom":"1rem","left":"1.5rem"},"margin":{"top":"1rem"}},"border":{"radius":"10px","width":"1px","color":"var:preset|color|ast-global-color-8"}},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1rem 1.5rem;margin-top:1rem">
<!-- wp:paragraph --><p><strong>Is your business missing?</strong> <a href="/submit-listing/">Submit a free listing →</a> | <a href="/contact/">Ask about exclusive placement →</a></p><!-- /wp:paragraph -->
</div><!-- /wp:group -->
`)}
${section(`
<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"1.8rem","fontWeight":"700"}}} --><h2 class="wp-block-heading" style="font-size:1.8rem;font-weight:700">Hydro Excavation Services in ${c.city}, NC</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>${c.city} is ${c.desc}, creating ongoing demand for hydrovac services in utility installation, road construction, and infrastructure maintenance.</p><!-- /wp:paragraph -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"1.5rem"},"margin":{"top":"1.5rem"}}}} --><div class="wp-block-columns" style="margin-top:1.5rem">
<!-- wp:column --><div class="wp-block-column">
<!-- wp:heading {"level":4,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} --><h4 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1rem;font-weight:700">Services Available</h4><!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.9rem"}}} --><ul style="font-size:0.9rem">
<!-- wp:list-item --><li>Potholing & Daylighting</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Utility Locating</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Slot Trenching</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Debris Removal</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Pipeline Rehabilitation</li><!-- /wp:list-item -->
</ul><!-- /wp:list -->
</div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column">
<!-- wp:heading {"level":4,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} --><h4 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1rem;font-weight:700">Areas Served</h4><!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.9rem"}}} --><ul style="font-size:0.9rem">
${c.cities.map(city => `<!-- wp:list-item --><li>${city}</li><!-- /wp:list-item -->`).join('')}
<!-- wp:list-item --><li>${c.city}, NC (primary)</li><!-- /wp:list-item -->
</ul><!-- /wp:list -->
</div><!-- /wp:column -->
</div><!-- /wp:columns -->
<!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"1.5rem"}}}} --><p style="margin-top:1.5rem">← <a href="/north-carolina/">Back to all North Carolina cities</a></p><!-- /wp:paragraph -->
`, '#f8f9fa')}
`
}))

];

// ─── DEPLOY ──────────────────────────────────────────────────────────────────
async function deployPage(page) {
  const res = await fetch(`${WP_URL}/wp-json/wp/v2/pages`, {
    method: 'POST', headers: H,
    body: JSON.stringify({ title: page.title, slug: page.slug, status: 'publish', content: page.content })
  });
  const r = await res.json();
  if (!r.id) throw new Error(JSON.stringify(r).substring(0, 200));
  if (page.surerank) {
    await fetch(`${WP_URL}/wp-json/surerank/v1/admin/editor`, {
      method: 'POST', headers: H,
      body: JSON.stringify({ post_id: r.id, data: { title: page.surerank.title, description: page.surerank.description } })
    }).catch(() => {});
  }
  return r;
}

async function run() {
  console.log(`Building ${pages.length} directory pages...\n`);
  for (const page of pages) {
    try {
      const r = await deployPage(page);
      console.log(`✅ ${page.title.substring(0, 60)}`);
      console.log(`   → /${page.slug}/  (ID: ${r.id})`);
    } catch (err) {
      console.error(`❌ ${page.title.substring(0, 60)}: ${err.message.substring(0, 120)}`);
    }
  }
  console.log('\nDone!');
}

run().catch(console.error);
