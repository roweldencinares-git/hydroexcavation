import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://springgreen-stinkbug-577322.hostingersite.com';
const AUTH = 'Basic ' + Buffer.from('roweldencinares@gmail.com:jqfA ESlL T5xL QsLo e0fI H4Pt').toString('base64');
const HEADERS = { 'Authorization': AUTH, 'Content-Type': 'application/json' };

const pages = [

  // ─── HOMEPAGE ───────────────────────────────────────────────────────────────
  {
    title: 'HydroVac Pro | #1 Hydro Excavation Directory',
    slug: 'home',
    status: 'publish',
    surerank: {
      title: 'HydroVac Pro | #1 Hydro Excavation Directory in the US',
      description: 'Find trusted hydro excavation and hydrovac contractors near you. Browse our directory of verified service companies, equipment providers, and vacuum excavation specialists.'
    },
    content: `
<!-- wp:spectra/container {"align":"full","layout":{"type":"flex","orientation":"vertical","flexWrap":"nowrap","justifyContent":"center","verticalAlignment":"center"},"variationSelected":true,"height":"420px","background":{"type":"color","color":"#1a365d"},"isBlockRootParent":true,"style":{"spacing":{"blockGap":"var:preset|spacing|30","padding":{"left":"2rem","right":"2rem"}}},"spectraId":"spectra-home-hero-a1"} -->
<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"clamp(2rem,5vw,3.2rem)","fontWeight":"800"}},"textColor":"white"} -->
<h1 class="wp-block-heading has-text-align-center has-white-color has-text-color">The #1 Hydro Excavation Directory in the US</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.15rem"}},"textColor":"ast-global-color-5"} -->
<p class="has-text-align-center has-ast-global-color-5-color has-text-color" style="font-size:1.15rem">Find verified hydrovac contractors, equipment providers, and vacuum excavation specialists near you.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"1.5rem"}}}} -->
<div class="wp-block-buttons" style="margin-top:1.5rem">
<!-- wp:button {"backgroundColor":"ast-global-color-5","textColor":"ast-global-color-2","style":{"border":{"radius":"9999px"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-ast-global-color-2-color has-ast-global-color-5-background-color has-text-color has-background wp-element-button" href="/listings/" style="border-radius:9999px">Browse Directory</a></div>
<!-- /wp:button -->
<!-- wp:button {"style":{"border":{"radius":"9999px","width":"2px","color":"#ffffff"}},"textColor":"white","className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link has-white-color has-text-color wp-element-button" href="/submit-listing/" style="border-radius:9999px;border-width:2px;border-color:#ffffff">Get Listed Free</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
<!-- /wp:spectra/container -->

<!-- wp:spectra/container {"align":"full","layout":{"type":"flex","orientation":"vertical","flexWrap":"nowrap","justifyContent":"center","verticalAlignment":"center"},"variationSelected":true,"isBlockRootParent":true,"style":{"spacing":{"padding":{"top":"4rem","bottom":"4rem","left":"2rem","right":"2rem"}}},"spectraId":"spectra-home-cats-b2"} -->
<!-- wp:heading {"textAlign":"center","level":2,"style":{"typography":{"fontSize":"2rem","fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-text-align-center" style="font-size:2rem;font-weight:700">Browse by Category</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"spacing":{"margin":{"bottom":"2.5rem"}}}} -->
<p class="has-text-align-center" style="margin-bottom:2.5rem">Find exactly what you need across our directory categories</p>
<!-- /wp:paragraph -->

<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"1.5rem","top":"1.5rem"}}}} -->
<div class="wp-block-columns">
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","right":"1.5rem","bottom":"2rem","left":"1.5rem"}},"border":{"radius":"12px","top":{"color":"var:preset|color|ast-global-color-0","width":"4px"},"right":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"bottom":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"left":{"width":"1px","color":"var:preset|color|ast-global-color-8"}},"shadow":"var:preset|shadow|natural"},"backgroundColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-white-background-color has-background" style="border-radius:12px;border-top-color:var(--wp--preset--color--ast-global-color-0);border-top-width:4px;border-right-color:var(--wp--preset--color--ast-global-color-8);border-right-width:1px;border-bottom-color:var(--wp--preset--color--ast-global-color-8);border-bottom-width:1px;border-left-color:var(--wp--preset--color--ast-global-color-8);border-left-width:1px;padding:2rem 1.5rem;box-shadow:var(--wp--preset--shadow--natural)">
<!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"2.5rem"}}} -->
<h3 class="wp-block-heading has-text-align-center" style="font-size:2.5rem">🚛</h3>
<!-- /wp:heading -->
<!-- wp:heading {"textAlign":"center","level":4,"textColor":"ast-global-color-2"} -->
<h4 class="wp-block-heading has-text-align-center has-ast-global-color-2-color has-text-color">Service Companies</h4>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"0.9rem"}}} -->
<p class="has-text-align-center" style="font-size:0.9rem">Local hydrovac and vacuum excavation contractors ready for your project</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"ast-global-color-2","style":{"border":{"radius":"9999px"},"typography":{"fontSize":"0.85rem"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-ast-global-color-2-background-color has-background wp-element-button" href="/listings/service-companies/" style="border-radius:9999px;font-size:0.85rem">Browse →</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","right":"1.5rem","bottom":"2rem","left":"1.5rem"}},"border":{"radius":"12px","top":{"color":"var:preset|color|ast-global-color-0","width":"4px"},"right":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"bottom":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"left":{"width":"1px","color":"var:preset|color|ast-global-color-8"}},"shadow":"var:preset|shadow|natural"},"backgroundColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-white-background-color has-background" style="border-radius:12px;border-top-color:var(--wp--preset--color--ast-global-color-0);border-top-width:4px;padding:2rem 1.5rem;box-shadow:var(--wp--preset--shadow--natural)">
<!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"2.5rem"}}} -->
<h3 class="wp-block-heading has-text-align-center" style="font-size:2.5rem">⚙️</h3>
<!-- /wp:heading -->
<!-- wp:heading {"textAlign":"center","level":4,"textColor":"ast-global-color-2"} -->
<h4 class="wp-block-heading has-text-align-center has-ast-global-color-2-color has-text-color">Equipment Manufacturers</h4>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"0.9rem"}}} -->
<p class="has-text-align-center" style="font-size:0.9rem">Leading manufacturers of hydrovac trucks, vacuum excavators, and related equipment</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"ast-global-color-2","style":{"border":{"radius":"9999px"},"typography":{"fontSize":"0.85rem"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-ast-global-color-2-background-color has-background wp-element-button" href="/listings/equipment-manufacturers/" style="border-radius:9999px;font-size:0.85rem">Browse →</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","right":"1.5rem","bottom":"2rem","left":"1.5rem"}},"border":{"radius":"12px","top":{"color":"var:preset|color|ast-global-color-0","width":"4px"},"right":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"bottom":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"left":{"width":"1px","color":"var:preset|color|ast-global-color-8"}},"shadow":"var:preset|shadow|natural"},"backgroundColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-white-background-color has-background" style="border-radius:12px;border-top-color:var(--wp--preset--color--ast-global-color-0);border-top-width:4px;padding:2rem 1.5rem;box-shadow:var(--wp--preset--shadow--natural)">
<!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"2.5rem"}}} -->
<h3 class="wp-block-heading has-text-align-center" style="font-size:2.5rem">🔧</h3>
<!-- /wp:heading -->
<!-- wp:heading {"textAlign":"center","level":4,"textColor":"ast-global-color-2"} -->
<h4 class="wp-block-heading has-text-align-center has-ast-global-color-2-color has-text-color">Sales &amp; Leasing</h4>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"0.9rem"}}} -->
<p class="has-text-align-center" style="font-size:0.9rem">Buy, rent, or lease hydrovac equipment from trusted dealers nationwide</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"ast-global-color-2","style":{"border":{"radius":"9999px"},"typography":{"fontSize":"0.85rem"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-ast-global-color-2-background-color has-background wp-element-button" href="/listings/sales-leasing/" style="border-radius:9999px;font-size:0.85rem">Browse →</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","right":"1.5rem","bottom":"2rem","left":"1.5rem"}},"border":{"radius":"12px","top":{"color":"var:preset|color|ast-global-color-0","width":"4px"},"right":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"bottom":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"left":{"width":"1px","color":"var:preset|color|ast-global-color-8"}},"shadow":"var:preset|shadow|natural"},"backgroundColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-white-background-color has-background" style="border-radius:12px;border-top-color:var(--wp--preset--color--ast-global-color-0);border-top-width:4px;padding:2rem 1.5rem;box-shadow:var(--wp--preset--shadow--natural)">
<!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"2.5rem"}}} -->
<h3 class="wp-block-heading has-text-align-center" style="font-size:2.5rem">📍</h3>
<!-- /wp:heading -->
<!-- wp:heading {"textAlign":"center","level":4,"textColor":"ast-global-color-2"} -->
<h4 class="wp-block-heading has-text-align-center has-ast-global-color-2-color has-text-color">Browse by Location</h4>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"0.9rem"}}} -->
<p class="has-text-align-center" style="font-size:0.9rem">Find hydrovac companies by state and city across the United States</p>
<!-- /wp:paragraph -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"ast-global-color-2","style":{"border":{"radius":"9999px"},"typography":{"fontSize":"0.85rem"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-ast-global-color-2-background-color has-background wp-element-button" href="/locations/" style="border-radius:9999px;font-size:0.85rem">Browse →</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
<!-- /wp:spectra/container -->

<!-- wp:spectra/container {"align":"full","layout":{"type":"flex","orientation":"vertical","flexWrap":"nowrap","justifyContent":"center","verticalAlignment":"center"},"variationSelected":true,"isBlockRootParent":true,"background":{"type":"color","color":"#f8f9fa"},"style":{"spacing":{"padding":{"top":"4rem","bottom":"4rem","left":"2rem","right":"2rem"}}},"spectraId":"spectra-home-what-c3"} -->
<!-- wp:heading {"textAlign":"center","level":2,"style":{"typography":{"fontSize":"2rem","fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-text-align-center" style="font-size:2rem;font-weight:700">What is Hydro Excavation?</h2>
<!-- /wp:heading -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"3rem"},"margin":{"top":"2rem"}}}} -->
<div class="wp-block-columns" style="margin-top:2rem">
<!-- wp:column {"width":"60%"} -->
<div class="wp-block-column" style="flex-basis:60%">
<!-- wp:paragraph -->
<p>Hydro excavation (also called hydrovac or vacuum excavation) is a <strong>non-destructive digging method</strong> that uses pressurized water to break up soil and a powerful industrial vacuum to remove the debris. Unlike traditional mechanical excavation, hydrovac safely exposes underground utilities without risk of damage.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>It is widely used across the United States for <strong>utility locating, potholing, daylighting, slot trenching, and pipeline rehabilitation</strong> — anywhere precision and safety around existing infrastructure is critical.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>HydroVac Pro is the most comprehensive directory connecting contractors, utilities, municipalities, and engineering firms with qualified hydro excavation service providers nationwide.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
<!-- wp:column {"width":"40%"} -->
<div class="wp-block-column" style="flex-basis:40%">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","right":"2rem","bottom":"2rem","left":"2rem"}},"border":{"radius":"12px","width":"1px","color":"var:preset|color|ast-global-color-8"}},"backgroundColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-white-background-color has-background" style="border-radius:12px;border-color:var(--wp--preset--color--ast-global-color-8);border-width:1px;padding:2rem">
<!-- wp:heading {"level":4,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1.1rem","fontWeight":"700"}}} -->
<h4 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1.1rem;font-weight:700">Common Applications</h4>
<!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.95rem"}}} -->
<ul style="font-size:0.95rem">
<!-- wp:list-item --><li>✅ Potholing &amp; Daylighting</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>✅ Utility Locating (SUE Level A)</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>✅ Slot Trenching</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>✅ Pipeline Rehabilitation</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>✅ Debris Removal</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>✅ Cold Weather Excavation</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>✅ Environmental Cleanup</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
<!-- /wp:spectra/container -->

<!-- wp:spectra/container {"align":"full","layout":{"type":"flex","orientation":"vertical","flexWrap":"nowrap","justifyContent":"center","verticalAlignment":"center"},"variationSelected":true,"isBlockRootParent":true,"background":{"type":"color","color":"#1a365d"},"style":{"spacing":{"padding":{"top":"4rem","bottom":"4rem","left":"2rem","right":"2rem"},"blockGap":"var:preset|spacing|30"}},"spectraId":"spectra-home-cta-d4"} -->
<!-- wp:heading {"textAlign":"center","level":2,"textColor":"white","style":{"typography":{"fontSize":"2rem","fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-text-align-center has-white-color has-text-color" style="font-size:2rem;font-weight:700">Are You a Hydrovac Contractor?</h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","textColor":"ast-global-color-5","style":{"typography":{"fontSize":"1.1rem"}}} -->
<p class="has-text-align-center has-ast-global-color-5-color has-text-color" style="font-size:1.1rem">Get listed in the #1 hydro excavation directory. Free basic listings available — premium placement starting at $99/month.</p>
<!-- /wp:paragraph -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"2rem"},"margin":{"top":"2rem"}}}} -->
<div class="wp-block-columns" style="margin-top:2rem">
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"8px","color":"rgba(255,255,255,0.15)","width":"1px"},"color":{"background":"rgba(255,255,255,0.07)"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group" style="border-radius:8px;border-color:rgba(255,255,255,0.15);border-width:1px;background-color:rgba(255,255,255,0.07);padding:1.5rem">
<!-- wp:heading {"level":4,"textColor":"ast-global-color-5","style":{"typography":{"fontSize":"1rem"}}} -->
<h4 class="wp-block-heading has-ast-global-color-5-color has-text-color" style="font-size:1rem">🆓 Free Listing</h4>
<!-- /wp:heading -->
<!-- wp:list {"textColor":"white","style":{"typography":{"fontSize":"0.9rem"}}} -->
<ul class="has-white-color has-text-color" style="font-size:0.9rem">
<!-- wp:list-item --><li>Business name &amp; phone</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>City &amp; state</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Category listing</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"8px","color":"rgba(255,255,255,0.15)","width":"1px"},"color":{"background":"rgba(255,255,255,0.07)"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group" style="border-radius:8px;border-color:rgba(255,255,255,0.15);border-width:1px;background-color:rgba(255,255,255,0.07);padding:1.5rem">
<!-- wp:heading {"level":4,"textColor":"ast-global-color-5","style":{"typography":{"fontSize":"1rem"}}} -->
<h4 class="wp-block-heading has-ast-global-color-5-color has-text-color" style="font-size:1rem">⭐ Featured Listing</h4>
<!-- /wp:heading -->
<!-- wp:list {"textColor":"white","style":{"typography":{"fontSize":"0.9rem"}}} -->
<ul class="has-white-color has-text-color" style="font-size:0.9rem">
<!-- wp:list-item --><li>Top of city page</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Website link + description</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Lead tracking + reports</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"8px","color":"rgba(255,255,255,0.15)","width":"1px"},"color":{"background":"rgba(255,255,255,0.07)"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group" style="border-radius:8px;border-color:rgba(255,255,255,0.15);border-width:1px;background-color:rgba(255,255,255,0.07);padding:1.5rem">
<!-- wp:heading {"level":4,"textColor":"ast-global-color-5","style":{"typography":{"fontSize":"1rem"}}} -->
<h4 class="wp-block-heading has-ast-global-color-5-color has-text-color" style="font-size:1rem">🏆 Exclusive Listing</h4>
<!-- /wp:heading -->
<!-- wp:list {"textColor":"white","style":{"typography":{"fontSize":"0.9rem"}}} -->
<ul class="has-white-color has-text-color" style="font-size:0.9rem">
<!-- wp:list-item --><li>Only listing in your city</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>All leads go to you</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Priority support</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"2rem"}}}} -->
<div class="wp-block-buttons" style="margin-top:2rem"><!-- wp:button {"backgroundColor":"ast-global-color-5","textColor":"ast-global-color-2","style":{"border":{"radius":"9999px"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-ast-global-color-2-color has-ast-global-color-5-background-color has-text-color has-background wp-element-button" href="/submit-listing/" style="border-radius:9999px">Get Listed Now →</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->
<!-- /wp:spectra/container -->
`
  },

  // ─── NORTH CAROLINA STATE PAGE ───────────────────────────────────────────────
  {
    title: 'Hydro Excavation Companies in North Carolina',
    slug: 'north-carolina',
    status: 'publish',
    surerank: {
      title: 'Hydro Excavation Companies in North Carolina | HydroVac Pro',
      description: 'Find trusted hydrovac and hydro excavation contractors across North Carolina. Browse verified service companies in Wilmington, Charlotte, Raleigh, Fayetteville, and more.'
    },
    content: `
<!-- wp:spectra/container {"align":"full","layout":{"type":"flex","orientation":"vertical","flexWrap":"nowrap","justifyContent":"center","verticalAlignment":"center"},"variationSelected":true,"height":"280px","background":{"type":"color","color":"#1a365d"},"isBlockRootParent":true,"style":{"spacing":{"padding":{"left":"2rem","right":"2rem"},"blockGap":"var:preset|spacing|20"}},"spectraId":"spectra-nc-hero-a1"} -->
<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"clamp(1.8rem,4vw,2.8rem)","fontWeight":"800"}},"textColor":"white"} -->
<h1 class="wp-block-heading has-text-align-center has-white-color has-text-color">Hydro Excavation Companies in North Carolina</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","textColor":"ast-global-color-5"} -->
<p class="has-text-align-center has-ast-global-color-5-color has-text-color">Verified hydrovac contractors serving all of North Carolina</p>
<!-- /wp:paragraph -->
<!-- /wp:spectra/container -->

<!-- wp:spectra/container {"align":"full","layout":{"type":"flex","orientation":"vertical","flexWrap":"nowrap","justifyContent":"center","verticalAlignment":"center"},"variationSelected":true,"isBlockRootParent":true,"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem","left":"2rem","right":"2rem"}}},"spectraId":"spectra-nc-cities-b2"} -->
<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"1.8rem","fontWeight":"700"}}} -->
<h2 class="wp-block-heading" style="font-size:1.8rem;font-weight:700">Browse by City</h2>
<!-- /wp:heading -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"1.5rem","top":"1rem"},"margin":{"top":"1.5rem"}}}} -->
<div class="wp-block-columns" style="margin-top:1.5rem">
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"10px","width":"1px","color":"var:preset|color|ast-global-color-8"},"shadow":"var:preset|shadow|natural"},"backgroundColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;border-color:var(--wp--preset--color--ast-global-color-8);border-width:1px;padding:1.5rem;box-shadow:var(--wp--preset--shadow--natural)">
<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.1rem","fontWeight":"700"}},"textColor":"ast-global-color-2"} -->
<h3 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1.1rem;font-weight:700">🌊 Coastal NC</h3>
<!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.95rem"}}} -->
<ul style="font-size:0.95rem">
<!-- wp:list-item --><li><a href="/wilmington-nc/">Wilmington, NC</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/jacksonville-nc/">Jacksonville, NC</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/new-bern-nc/">New Bern, NC</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/morehead-city-nc/">Morehead City, NC</a></li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"10px","width":"1px","color":"var:preset|color|ast-global-color-8"},"shadow":"var:preset|shadow|natural"},"backgroundColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;border-color:var(--wp--preset--color--ast-global-color-8);border-width:1px;padding:1.5rem;box-shadow:var(--wp--preset--shadow--natural)">
<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.1rem","fontWeight":"700"}},"textColor":"ast-global-color-2"} -->
<h3 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1.1rem;font-weight:700">🏙️ Central NC</h3>
<!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.95rem"}}} -->
<ul style="font-size:0.95rem">
<!-- wp:list-item --><li><a href="/raleigh-nc/">Raleigh, NC</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/durham-nc/">Durham, NC</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/chapel-hill-nc/">Chapel Hill, NC</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/fayetteville-nc/">Fayetteville, NC</a></li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"10px","width":"1px","color":"var:preset|color|ast-global-color-8"},"shadow":"var:preset|shadow|natural"},"backgroundColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;border-color:var(--wp--preset--color--ast-global-color-8);border-width:1px;padding:1.5rem;box-shadow:var(--wp--preset--shadow--natural)">
<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.1rem","fontWeight":"700"}},"textColor":"ast-global-color-2"} -->
<h3 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1.1rem;font-weight:700">🏔️ Western NC</h3>
<!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.95rem"}}} -->
<ul style="font-size:0.95rem">
<!-- wp:list-item --><li><a href="/charlotte-nc/">Charlotte, NC</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/greensboro-nc/">Greensboro, NC</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/winston-salem-nc/">Winston-Salem, NC</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/asheville-nc/">Asheville, NC</a></li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
<!-- /wp:spectra/container -->
`
  },

  // ─── WILMINGTON NC CITY PAGE ─────────────────────────────────────────────────
  {
    title: 'Hydro Excavation Wilmington NC | Hydrovac Contractors',
    slug: 'wilmington-nc',
    status: 'publish',
    surerank: {
      title: 'Hydro Excavation Wilmington NC | Hydrovac Contractors Near You',
      description: 'Find trusted hydrovac and hydro excavation contractors in Wilmington, NC. Compare local service companies for potholing, utility locating, slot trenching, and vacuum excavation.'
    },
    content: `
<!-- wp:spectra/container {"align":"full","layout":{"type":"flex","orientation":"vertical","flexWrap":"nowrap","justifyContent":"center","verticalAlignment":"center"},"variationSelected":true,"height":"280px","background":{"type":"color","color":"#1a365d"},"isBlockRootParent":true,"style":{"spacing":{"padding":{"left":"2rem","right":"2rem"},"blockGap":"var:preset|spacing|20"}},"spectraId":"spectra-wil-hero-a1"} -->
<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"clamp(1.8rem,4vw,2.8rem)","fontWeight":"800"}},"textColor":"white"} -->
<h1 class="wp-block-heading has-text-align-center has-white-color has-text-color">Hydro Excavation Contractors in Wilmington, NC</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","textColor":"ast-global-color-5"} -->
<p class="has-text-align-center has-ast-global-color-5-color has-text-color">Verified hydrovac service companies serving Wilmington and the Cape Fear region</p>
<!-- /wp:paragraph -->
<!-- /wp:spectra/container -->

<!-- wp:spectra/container {"align":"full","layout":{"type":"flex","orientation":"vertical","flexWrap":"nowrap","justifyContent":"center","verticalAlignment":"center"},"variationSelected":true,"isBlockRootParent":true,"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem","left":"2rem","right":"2rem"}}},"spectraId":"spectra-wil-list-b2"} -->
<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"1.8rem","fontWeight":"700"}}} -->
<h2 class="wp-block-heading" style="font-size:1.8rem;font-weight:700">Hydrovac Companies in Wilmington, NC</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Browse verified hydro excavation contractors serving Wilmington, NC and surrounding areas including Leland, Brunswick County, and the greater Cape Fear region.</p>
<!-- /wp:paragraph -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"},"margin":{"top":"2rem","bottom":"1rem"}},"border":{"radius":"12px","top":{"color":"var:preset|color|ast-global-color-5","width":"4px"},"right":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"bottom":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"left":{"width":"1px","color":"var:preset|color|ast-global-color-8"}},"shadow":"var:preset|shadow|natural"},"backgroundColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-white-background-color has-background" style="border-radius:12px;border-top-color:var(--wp--preset--color--ast-global-color-5);border-top-width:4px;border-right-color:var(--wp--preset--color--ast-global-color-8);border-right-width:1px;border-bottom-color:var(--wp--preset--color--ast-global-color-8);border-bottom-width:1px;border-left-color:var(--wp--preset--color--ast-global-color-8);border-left-width:1px;padding:1.5rem;margin-top:2rem;margin-bottom:1rem;box-shadow:var(--wp--preset--shadow--natural)">
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"2rem"}}}} -->
<div class="wp-block-columns">
<!-- wp:column {"width":"70%"} -->
<div class="wp-block-column" style="flex-basis:70%">
<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.2rem","fontWeight":"700"}},"textColor":"ast-global-color-2"} -->
<h3 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1.2rem;font-weight:700">⭐ Featured — Vac Truck Services</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} -->
<p style="font-size:0.9rem"><strong>Category:</strong> Hydro Excavation / Vacuum Excavation<br><strong>Location:</strong> Wilmington, NC<br><strong>Phone:</strong> <a href="tel:8884808225">888-480-8225</a></p>
<!-- /wp:paragraph -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.95rem"}}} -->
<p style="font-size:0.95rem">Professional hydro excavation services in Wilmington, NC and surrounding areas. Over 30 years of field experience in utility locating, potholing, and non-destructive digging.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->
<!-- wp:column {"width":"30%"} -->
<div class="wp-block-column" style="flex-basis:30%">
<!-- wp:buttons {"layout":{"type":"flex","orientation":"vertical","justifyContent":"center","verticalAlignment":"center"}} -->
<div class="wp-block-buttons">
<!-- wp:button {"backgroundColor":"ast-global-color-2","style":{"border":{"radius":"9999px"},"typography":{"fontSize":"0.85rem"}},"width":100} -->
<div class="wp-block-button has-custom-width wp-block-button__width-100"><a class="wp-block-button__link has-ast-global-color-2-background-color has-background wp-element-button" href="tel:8884808225" style="border-radius:9999px;font-size:0.85rem">📞 Call Now</a></div>
<!-- /wp:button -->
<!-- wp:button {"style":{"border":{"radius":"9999px","width":"1px","color":"var:preset|color|ast-global-color-2"},"typography":{"fontSize":"0.85rem"}},"textColor":"ast-global-color-2","className":"is-style-outline","width":100} -->
<div class="wp-block-button is-style-outline has-custom-width wp-block-button__width-100"><a class="wp-block-button__link has-ast-global-color-2-color has-text-color wp-element-button" href="/contact/" style="border-radius:9999px;border-width:1px;border-color:var(--wp--preset--color--ast-global-color-2);font-size:0.85rem">Get Quote</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
</div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"1rem","right":"1.5rem","bottom":"1rem","left":"1.5rem"},"margin":{"bottom":"1rem"}},"border":{"radius":"10px","width":"1px","color":"var:preset|color|ast-global-color-8"}},"backgroundColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;border-color:var(--wp--preset--color--ast-global-color-8);border-width:1px;padding:1rem 1.5rem;margin-bottom:1rem">
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.95rem"}}} -->
<p style="font-size:0.95rem"><strong>Is your business missing from this list?</strong> <a href="/submit-listing/">Submit a free listing →</a></p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
<!-- /wp:spectra/container -->

<!-- wp:spectra/container {"align":"full","layout":{"type":"flex","orientation":"vertical","flexWrap":"nowrap","justifyContent":"center","verticalAlignment":"center"},"variationSelected":true,"isBlockRootParent":true,"background":{"type":"color","color":"#f8f9fa"},"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem","left":"2rem","right":"2rem"}}},"spectraId":"spectra-wil-info-c3"} -->
<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"1.8rem","fontWeight":"700"}}} -->
<h2 class="wp-block-heading" style="font-size:1.8rem;font-weight:700">Hydro Excavation Services in Wilmington, NC</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Wilmington, NC is one of the fastest-growing coastal cities in the Southeast, with significant infrastructure development, utility upgrades, and construction activity across New Hanover, Brunswick, and Pender counties. Hydrovac services are in high demand for projects near the Cape Fear River, beachfront development areas, and the Port of Wilmington.</p>
<!-- /wp:paragraph -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"1.5rem"},"margin":{"top":"1.5rem"}}}} -->
<div class="wp-block-columns" style="margin-top:1.5rem">
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":4,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} -->
<h4 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1rem;font-weight:700">Services Available</h4>
<!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.9rem"}}} -->
<ul style="font-size:0.9rem">
<!-- wp:list-item --><li>Potholing &amp; Daylighting</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Utility Locating</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Slot Trenching</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Debris Removal</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Pipeline Rehabilitation</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:column -->
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":4,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} -->
<h4 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1rem;font-weight:700">Areas Served</h4>
<!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.9rem"}}} -->
<ul style="font-size:0.9rem">
<!-- wp:list-item --><li>Wilmington, NC</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Leland, NC</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Brunswick County</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Wrightsville Beach</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Carolina Beach</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
<!-- /wp:spectra/container -->
`
  },

  // ─── SUBMIT LISTING PAGE ─────────────────────────────────────────────────────
  {
    title: 'Submit Your Hydrovac Business Listing',
    slug: 'submit-listing',
    status: 'publish',
    surerank: {
      title: 'Submit Your Hydrovac Business | Get Listed Free | HydroVac Pro',
      description: 'Add your hydro excavation or vacuum excavation company to the HydroVac Pro directory. Free basic listings available. Premium and exclusive placements from $99/month.'
    },
    content: `
<!-- wp:spectra/container {"align":"full","layout":{"type":"flex","orientation":"vertical","flexWrap":"nowrap","justifyContent":"center","verticalAlignment":"center"},"variationSelected":true,"height":"250px","background":{"type":"color","color":"#1a365d"},"isBlockRootParent":true,"style":{"spacing":{"padding":{"left":"2rem","right":"2rem"},"blockGap":"var:preset|spacing|20"}},"spectraId":"spectra-sub-hero-a1"} -->
<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"clamp(1.8rem,4vw,2.6rem)","fontWeight":"800"}},"textColor":"white"} -->
<h1 class="wp-block-heading has-text-align-center has-white-color has-text-color">Get Your Business Listed</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","textColor":"ast-global-color-5"} -->
<p class="has-text-align-center has-ast-global-color-5-color has-text-color">Join the #1 hydro excavation directory. Start with a free listing today.</p>
<!-- /wp:paragraph -->
<!-- /wp:spectra/container -->

<!-- wp:spectra/container {"align":"full","layout":{"type":"flex","orientation":"vertical","flexWrap":"nowrap","justifyContent":"center","verticalAlignment":"center"},"variationSelected":true,"isBlockRootParent":true,"style":{"spacing":{"padding":{"top":"4rem","bottom":"4rem","left":"2rem","right":"2rem"}}},"spectraId":"spectra-sub-plans-b2"} -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"1.5rem"}}}} -->
<div class="wp-block-columns">
<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","right":"2rem","bottom":"2rem","left":"2rem"}},"border":{"radius":"12px","width":"1px","color":"var:preset|color|ast-global-color-8"},"shadow":"var:preset|shadow|natural"},"backgroundColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-white-background-color has-background" style="border-radius:12px;border-color:var(--wp--preset--color--ast-global-color-8);border-width:1px;padding:2rem;box-shadow:var(--wp--preset--shadow--natural)">
<!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"1.3rem","fontWeight":"700"}}} -->
<h3 class="wp-block-heading has-text-align-center" style="font-size:1.3rem;font-weight:700">🆓 Free</h3>
<!-- /wp:heading -->
<!-- wp:heading {"textAlign":"center","level":4,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"2rem","fontWeight":"800"}}} -->
<h4 class="wp-block-heading has-text-align-center has-ast-global-color-2-color has-text-color" style="font-size:2rem;font-weight:800">$0</h4>
<!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.9rem"}}} -->
<ul style="font-size:0.9rem">
<!-- wp:list-item --><li>Business name &amp; phone</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>City &amp; state</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Service category</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Basic directory listing</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"ast-global-color-2","style":{"border":{"radius":"9999px"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-ast-global-color-2-background-color has-background wp-element-button" href="/contact/" style="border-radius:9999px">Submit Free</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","right":"2rem","bottom":"2rem","left":"2rem"}},"border":{"radius":"12px","top":{"color":"var:preset|color|ast-global-color-5","width":"4px"},"right":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"bottom":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"left":{"width":"1px","color":"var:preset|color|ast-global-color-8"}},"shadow":"var:preset|shadow|natural"},"backgroundColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-white-background-color has-background" style="border-radius:12px;border-top-color:var(--wp--preset--color--ast-global-color-5);border-top-width:4px;border-right-color:var(--wp--preset--color--ast-global-color-8);border-right-width:1px;border-bottom-color:var(--wp--preset--color--ast-global-color-8);border-bottom-width:1px;border-left-color:var(--wp--preset--color--ast-global-color-8);border-left-width:1px;padding:2rem;box-shadow:var(--wp--preset--shadow--natural)">
<!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"1.3rem","fontWeight":"700"}}} -->
<h3 class="wp-block-heading has-text-align-center" style="font-size:1.3rem;font-weight:700">⭐ Featured</h3>
<!-- /wp:heading -->
<!-- wp:heading {"textAlign":"center","level":4,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"2rem","fontWeight":"800"}}} -->
<h4 class="wp-block-heading has-text-align-center has-ast-global-color-2-color has-text-color" style="font-size:2rem;font-weight:800">$99<span style="font-size:1rem">/mo</span></h4>
<!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.9rem"}}} -->
<ul style="font-size:0.9rem">
<!-- wp:list-item --><li>Everything in Free</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Top of city page placement</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Website link</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Full business description</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Monthly lead report</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"ast-global-color-5","textColor":"ast-global-color-2","style":{"border":{"radius":"9999px"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-ast-global-color-2-color has-ast-global-color-5-background-color has-text-color has-background wp-element-button" href="/contact/" style="border-radius:9999px">Get Featured</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","right":"2rem","bottom":"2rem","left":"2rem"}},"border":{"radius":"12px","top":{"color":"var:preset|color|ast-global-color-2","width":"4px"},"right":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"bottom":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"left":{"width":"1px","color":"var:preset|color|ast-global-color-8"}},"shadow":"var:preset|shadow|natural"},"backgroundColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-white-background-color has-background" style="border-radius:12px;border-top-color:var(--wp--preset--color--ast-global-color-2);border-top-width:4px;border-right-color:var(--wp--preset--color--ast-global-color-8);border-right-width:1px;border-bottom-color:var(--wp--preset--color--ast-global-color-8);border-bottom-width:1px;border-left-color:var(--wp--preset--color--ast-global-color-8);border-left-width:1px;padding:2rem;box-shadow:var(--wp--preset--shadow--natural)">
<!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"1.3rem","fontWeight":"700"}}} -->
<h3 class="wp-block-heading has-text-align-center" style="font-size:1.3rem;font-weight:700">🏆 Exclusive</h3>
<!-- /wp:heading -->
<!-- wp:heading {"textAlign":"center","level":4,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"2rem","fontWeight":"800"}}} -->
<h4 class="wp-block-heading has-text-align-center has-ast-global-color-2-color has-text-color" style="font-size:2rem;font-weight:800">$299<span style="font-size:1rem">/mo</span></h4>
<!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.9rem"}}} -->
<ul style="font-size:0.9rem">
<!-- wp:list-item --><li>Everything in Featured</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Only listing in your city</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>All leads go directly to you</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Logo &amp; photos</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Priority support</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"ast-global-color-2","style":{"border":{"radius":"9999px"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-ast-global-color-2-background-color has-background wp-element-button" href="/contact/" style="border-radius:9999px">Go Exclusive</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
<!-- /wp:spectra/container -->
`
  },

  // ─── CONTACT PAGE ────────────────────────────────────────────────────────────
  {
    title: 'Contact HydroVac Pro',
    slug: 'contact',
    status: 'publish',
    surerank: {
      title: 'Contact HydroVac Pro | Submit Listing or Get a Quote',
      description: 'Contact HydroVac Pro to submit your hydrovac business listing, upgrade your placement, or get help finding a contractor near you.'
    },
    content: `
<!-- wp:spectra/container {"align":"full","layout":{"type":"flex","orientation":"vertical","flexWrap":"nowrap","justifyContent":"center","verticalAlignment":"center"},"variationSelected":true,"height":"220px","background":{"type":"color","color":"#1a365d"},"isBlockRootParent":true,"style":{"spacing":{"padding":{"left":"2rem","right":"2rem"}}},"spectraId":"spectra-con-hero-a1"} -->
<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"2.2rem","fontWeight":"800"}},"textColor":"white"} -->
<h1 class="wp-block-heading has-text-align-center has-white-color has-text-color">Contact Us</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","textColor":"ast-global-color-5"} -->
<p class="has-text-align-center has-ast-global-color-5-color has-text-color">Submit a listing, upgrade your placement, or get help finding a contractor</p>
<!-- /wp:paragraph -->
<!-- /wp:spectra/container -->

<!-- wp:spectra/container {"align":"full","layout":{"type":"flex","orientation":"vertical","flexWrap":"nowrap","justifyContent":"center","verticalAlignment":"center"},"variationSelected":true,"isBlockRootParent":true,"style":{"spacing":{"padding":{"top":"4rem","bottom":"4rem","left":"2rem","right":"2rem"}}},"spectraId":"spectra-con-main-b2"} -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"3rem"}}}} -->
<div class="wp-block-columns">
<!-- wp:column {"width":"40%"} -->
<div class="wp-block-column" style="flex-basis:40%">
<!-- wp:heading {"level":3,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1.4rem","fontWeight":"700"}}} -->
<h3 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1.4rem;font-weight:700">Get In Touch</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Whether you want to list your business, upgrade your placement, or need help finding a hydrovac contractor — we're here to help.</p>
<!-- /wp:paragraph -->
<!-- wp:separator {"style":{"color":{"background":"var:preset|color|ast-global-color-8"}}} -->
<hr class="wp-block-separator has-alpha-channel-opacity has-background" style="background-color:var(--wp--preset--color--ast-global-color-8)"/>
<!-- /wp:separator -->
<!-- wp:heading {"level":5,"textColor":"ast-global-color-1","style":{"typography":{"fontSize":"0.8rem","textTransform":"uppercase","fontWeight":"700"}}} -->
<h5 class="wp-block-heading has-ast-global-color-1-color has-text-color" style="font-size:0.8rem;text-transform:uppercase;font-weight:700">For Contractors</h5>
<!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.95rem"}}} -->
<ul style="font-size:0.95rem">
<!-- wp:list-item --><li>Submit a free listing</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Upgrade to Featured or Exclusive</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Update existing listing info</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
<!-- wp:separator {"style":{"color":{"background":"var:preset|color|ast-global-color-8"}}} -->
<hr class="wp-block-separator has-alpha-channel-opacity has-background" style="background-color:var(--wp--preset--color--ast-global-color-8)"/>
<!-- /wp:separator -->
<!-- wp:heading {"level":5,"textColor":"ast-global-color-1","style":{"typography":{"fontSize":"0.8rem","textTransform":"uppercase","fontWeight":"700"}}} -->
<h5 class="wp-block-heading has-ast-global-color-1-color has-text-color" style="font-size:0.8rem;text-transform:uppercase;font-weight:700">For Project Owners</h5>
<!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.95rem"}}} -->
<ul style="font-size:0.95rem">
<!-- wp:list-item --><li>Find a contractor near you</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Request multiple quotes</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Get project advice</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:column -->
<!-- wp:column {"width":"60%"} -->
<div class="wp-block-column" style="flex-basis:60%">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","right":"2rem","bottom":"2rem","left":"2rem"}},"border":{"radius":"12px","width":"1px","color":"var:preset|color|ast-global-color-8"},"shadow":"var:preset|shadow|natural"},"backgroundColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-white-background-color has-background" style="border-radius:12px;border-color:var(--wp--preset--color--ast-global-color-8);border-width:1px;padding:2rem;box-shadow:var(--wp--preset--shadow--natural)">
<!-- wp:shortcode -->
[sureforms id="1"]
<!-- /wp:shortcode -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
<!-- /wp:spectra/container -->
`
  }
];

async function createPage(page) {
  const res = await fetch(`${WP_URL}/wp-json/wp/v2/pages`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      title: page.title,
      slug: page.slug,
      status: page.status,
      content: page.content
    })
  });
  const result = await res.json();
  if (!result.id) throw new Error(`Failed: ${JSON.stringify(result).substring(0, 200)}`);

  // Set SureRank meta
  if (page.surerank) {
    await fetch(`${WP_URL}/wp-json/surerank/v1/admin/editor`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        post_id: result.id,
        data: {
          title: page.surerank.title,
          description: page.surerank.description
        }
      })
    }).catch(() => {});
  }

  return result;
}

async function run() {
  console.log('Building HydroVac Pro directory pages...\n');
  for (const page of pages) {
    try {
      const result = await createPage(page);
      console.log(`✅ ${page.title}`);
      console.log(`   → ${WP_URL}/${page.slug}/  (ID: ${result.id})`);
    } catch (err) {
      console.error(`❌ ${page.title}: ${err.message}`);
    }
  }
  console.log('\nDone! Set homepage: WP Admin → Settings → Reading → Static page → Home');
}

run().catch(console.error);
