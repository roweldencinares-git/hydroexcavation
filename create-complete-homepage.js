import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://silver-raccoon-464412.hostingersite.com';
const WP_USER = process.env.BEACH_HYDROVAC_WP_USER;
const WP_APP_PASSWORD = process.env.BEACH_HYDROVAC_WP_PASSWORD;

const headers = {
  'Authorization': 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64'),
  'Content-Type': 'application/json'
};

async function createCompleteHomepage() {
  console.log('Creating COMPLETE Homepage matching Vercel design...\n');

  // Note: You'll need to upload the hero image to WordPress media library
  // Then replace the URL in the cover block below

  const homepageContent = `<!-- wp:cover {"url":"","overlayColor":"contrast","minHeight":600,"minHeightUnit":"px","contentPosition":"center center","isDark":true,"align":"full","style":{"spacing":{"padding":{"top":"120px","bottom":"120px","left":"40px","right":"40px"}}}} -->
<div class="wp-block-cover alignfull is-dark" style="padding-top:120px;padding-right:40px;padding-bottom:120px;padding-left:40px;min-height:600px"><span aria-hidden="true" class="wp-block-cover__background has-contrast-background-color has-background-dim-100 has-background-dim"></span><div class="wp-block-cover__inner-container"><!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"3.5rem","fontWeight":"800","lineHeight":"1.2"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<h1 class="wp-block-heading has-text-align-center has-base-color has-text-color has-link-color" style="font-size:3.5rem;font-weight:800;line-height:1.2">Virginia Beach <mark style="background-color:rgba(0, 0, 0, 0);color:#f7bb14" class="has-inline-color">Hydro-Excavation</mark> Services</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.2rem"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<p class="has-text-align-center has-base-color has-text-color has-link-color" style="font-size:1.2rem">Local hydro-excavation specialist. High-volume production with mechanical boom precision</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"30px"} -->
<div style="height:30px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"base","textColor":"contrast","style":{"border":{"radius":"50px"},"spacing":{"padding":{"left":"35px","right":"35px","top":"14px","bottom":"14px"}}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-contrast-color has-base-background-color has-text-color has-background wp-element-button" href="/services/" style="border-radius:50px;padding-top:14px;padding-right:35px;padding-bottom:14px;padding-left:35px">Our Services</a></div>
<!-- /wp:button -->

<!-- wp:button {"style":{"border":{"radius":"50px"},"spacing":{"padding":{"left":"35px","right":"35px","top":"14px","bottom":"14px"}},"color":{"background":"#f7bb14","text":"#1a365d"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-text-color has-background wp-element-button" href="/contact/" style="border-radius:50px;color:#1a365d;background-color:#f7bb14;padding-top:14px;padding-right:35px;padding-bottom:14px;padding-left:35px">Get A Quote</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div></div>
<!-- /wp:cover -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"2.5rem","fontWeight":"700"},"color":{"text":"#1a365d"}}} -->
<h2 class="wp-block-heading has-text-align-center has-text-color" style="color:#1a365d;font-size:2.5rem;font-weight:700">Why BeachHydrovac?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.1rem"}}} -->
<p class="has-text-align-center" style="font-size:1.1rem">We combine advanced hydro-excavation technology with the responsiveness and expertise of a local Virginia Beach team</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"50px"} -->
<div style="height:50px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"left":"40px"}}}} -->
<div class="wp-block-columns alignwide"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"style":{"spacing":{"padding":{"top":"40px","bottom":"40px","left":"30px","right":"30px"}},"border":{"width":"0px","style":"none","radius":"0px"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group" style="border-style:none;border-width:0px;border-radius:0px;padding-top:40px;padding-right:30px;padding-bottom:40px;padding-left:30px"><!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"3.5rem"}}} -->
<p class="has-text-align-center" style="font-size:3.5rem">📍</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"1.3rem","fontWeight":"700"},"color":{"text":"#1a365d"}}} -->
<h3 class="wp-block-heading has-text-align-center has-text-color" style="color:#1a365d;font-size:1.3rem;font-weight:700">Virginia Beach Based</h3>
<!-- /wp:heading -->

<!-- wp:separator {"style":{"color":{"background":"#f7bb14"}},"className":"is-style-wide"} -->
<hr class="wp-block-separator has-text-color has-alpha-channel-opacity has-background is-style-wide" style="background-color:#f7bb14;color:#f7bb14"/>
<!-- /wp:separator -->

<!-- wp:paragraph {"align":"center","style":{"color":{"text":"#4a5568"}}} -->
<p class="has-text-align-center has-text-color" style="color:#4a5568">Local business committed to serving our Hampton Roads community with integrity and precision</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"style":{"spacing":{"padding":{"top":"40px","bottom":"40px","left":"30px","right":"30px"}},"border":{"width":"0px","style":"none","radius":"0px"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group" style="border-style:none;border-width:0px;border-radius:0px;padding-top:40px;padding-right:30px;padding-bottom:40px;padding-left:30px"><!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"3.5rem"}}} -->
<p class="has-text-align-center" style="font-size:3.5rem">🤝</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"1.3rem","fontWeight":"700"},"color":{"text":"#1a365d"}}} -->
<h3 class="wp-block-heading has-text-align-center has-text-color" style="color:#1a365d;font-size:1.3rem;font-weight:700">AIM Partnership</h3>
<!-- /wp:heading -->

<!-- wp:separator {"style":{"color":{"background":"#f7bb14"}},"className":"is-style-wide"} -->
<hr class="wp-block-separator has-text-color has-alpha-channel-opacity has-background is-style-wide" style="background-color:#f7bb14;color:#f7bb14"/>
<!-- /wp:separator -->

<!-- wp:paragraph {"align":"center","style":{"color":{"text":"#4a5568"}}} -->
<p class="has-text-align-center has-text-color" style="color:#4a5568">Combined "Map First, Dig Second" workflow eliminates the blame game between locator and excavator</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"style":{"spacing":{"padding":{"top":"40px","bottom":"40px","left":"30px","right":"30px"}},"border":{"width":"0px","style":"none","radius":"0px"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group" style="border-style:none;border-width:0px;border-radius:0px;padding-top:40px;padding-right:30px;padding-bottom:40px;padding-left:30px"><!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"3.5rem"}}} -->
<p class="has-text-align-center" style="font-size:3.5rem">🛡️</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"1.3rem","fontWeight":"700"},"color":{"text":"#1a365d"}}} -->
<h3 class="wp-block-heading has-text-align-center has-text-color" style="color:#1a365d;font-size:1.3rem;font-weight:700">Damage Prevention</h3>
<!-- /wp:heading -->

<!-- wp:separator {"style":{"color":{"background":"#f7bb14"}},"className":"is-style-wide"} -->
<hr class="wp-block-separator has-text-color has-alpha-channel-opacity has-background is-style-wide" style="background-color:#f7bb14;color:#f7bb14"/>
<!-- /wp:separator -->

<!-- wp:paragraph {"align":"center","style":{"color":{"text":"#4a5568"}}} -->
<p class="has-text-align-center has-text-color" style="color:#4a5568">Surgical precision protects underground utilities from damage during excavation</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"2.5rem","fontWeight":"700"},"color":{"text":"#1a365d"}}} -->
<h2 class="wp-block-heading has-text-align-center has-text-color" style="color:#1a365d;font-size:2.5rem;font-weight:700">Specialized Hydro-Excavation Services</h2>
<!-- /wp:heading -->

<!-- wp:spacer {"height":"50px"} -->
<div style="height:50px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"left":"50px"}}}} -->
<div class="wp-block-columns alignwide"><!-- wp:column {"width":"50%"} -->
<div class="wp-block-column" style="flex-basis:50%"><!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group"><!-- wp:paragraph {"style":{"typography":{"fontSize":"2.5rem"}}} -->
<p style="font-size:2.5rem">⭐</p>
<!-- /wp:paragraph -->

<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.3rem","fontWeight":"700"},"color":{"text":"#1a365d"}}} -->
<h3 class="wp-block-heading has-text-color" style="color:#1a365d;font-size:1.3rem;font-weight:700">Potholing / Daylighting</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"color":{"text":"#4a5568"}}} -->
<p class="has-text-color" style="color:#4a5568">The process of uncovering an underground utility using high-pressure water and vacuum for SUE Level A verification</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"50%"} -->
<div class="wp-block-column" style="flex-basis:50%"><!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group"><!-- wp:paragraph {"style":{"typography":{"fontSize":"2.5rem"}}} -->
<p style="font-size:2.5rem">⭐</p>
<!-- /wp:paragraph -->

<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.3rem","fontWeight":"700"},"color":{"text":"#1a365d"}}} -->
<h3 class="wp-block-heading has-text-color" style="color:#1a365d;font-size:1.3rem;font-weight:700">Slot Trenching</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"color":{"text":"#4a5568"}}} -->
<p class="has-text-color" style="color:#4a5568">Creating narrow trenches for pipes/cables that require minimal backfill and restoration</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:spacer {"height":"30px"} -->
<div style="height:30px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"left":"50px"}}}} -->
<div class="wp-block-columns alignwide"><!-- wp:column {"width":"50%"} -->
<div class="wp-block-column" style="flex-basis:50%"><!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group"><!-- wp:paragraph {"style":{"typography":{"fontSize":"2.5rem"}}} -->
<p style="font-size:2.5rem">⭐</p>
<!-- /wp:paragraph -->

<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.3rem","fontWeight":"700"},"color":{"text":"#1a365d"}}} -->
<h3 class="wp-block-heading has-text-color" style="color:#1a365d;font-size:1.3rem;font-weight:700">Remote Excavation</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"color":{"text":"#4a5568"}}} -->
<p class="has-text-color" style="color:#4a5568">Utilizing the truck's 600ft hose reach for restricted-access environments</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"50%"} -->
<div class="wp-block-column" style="flex-basis:50%"><!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group"><!-- wp:paragraph {"style":{"typography":{"fontSize":"2.5rem"}}} -->
<p style="font-size:2.5rem">⭐</p>
<!-- /wp:paragraph -->

<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.3rem","fontWeight":"700"},"color":{"text":"#1a365d"}}} -->
<h3 class="wp-block-heading has-text-color" style="color:#1a365d;font-size:1.3rem;font-weight:700">SUE Level A Verification</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"color":{"text":"#4a5568"}}} -->
<p class="has-text-color" style="color:#4a5568">Providing the highest level of subsurface utility accuracy for engineering records</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:spacer {"height":"40px"} -->
<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"style":{"border":{"radius":"50px"},"spacing":{"padding":{"left":"35px","right":"35px","top":"14px","bottom":"14px"}},"color":{"background":"#f7bb14","text":"#1a365d"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-text-color has-background wp-element-button" href="/services/" style="border-radius:50px;color:#1a365d;background-color:#f7bb14;padding-top:14px;padding-right:35px;padding-bottom:14px;padding-left:35px">View All Services</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:cover {"customOverlayColor":"#1a365d","isDark":true,"align":"full","style":{"spacing":{"padding":{"top":"80px","bottom":"80px","left":"40px","right":"40px"}}}} -->
<div class="wp-block-cover alignfull is-dark" style="padding-top:80px;padding-right:40px;padding-bottom:80px;padding-left:40px"><span aria-hidden="true" class="wp-block-cover__background has-background-dim-100 has-background-dim" style="background-color:#1a365d"></span><div class="wp-block-cover__inner-container"><!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"2.5rem","fontWeight":"700"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<h2 class="wp-block-heading has-text-align-center has-base-color has-text-color has-link-color" style="font-size:2.5rem;font-weight:700">Professional Capabilities</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.1rem"},"color":{"text":"#f7bb14"}}} -->
<p class="has-text-align-center has-text-color" style="color:#f7bb14;font-size:1.1rem">Industrial-Grade Equipment</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<p class="has-text-align-center has-base-color has-text-color has-link-color">We're equipped with industrial-grade vacuum trucks with unmatched capacity and reach</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"40px"} -->
<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"30px"}}}} -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"style":{"spacing":{"padding":{"top":"30px","bottom":"30px","left":"25px","right":"25px"}},"border":{"radius":"12px"},"color":{"background":"#ffffff"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-background" style="border-radius:12px;background-color:#ffffff;padding-top:30px;padding-right:25px;padding-bottom:30px;padding-left:25px"><!-- wp:paragraph {"style":{"typography":{"fontSize":"2.5rem"}}} -->
<p style="font-size:2.5rem">💧</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":4,"style":{"typography":{"fontSize":"1.1rem","fontWeight":"700"},"color":{"text":"#1a365d"}}} -->
<h4 class="wp-block-heading has-text-color" style="color:#1a365d;font-size:1.1rem;font-weight:700">High-Pressure Water System</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"},"color":{"text":"#4a5568"}}} -->
<p class="has-text-color" style="color:#4a5568;font-size:0.9rem">2600 PSI capacity for breaking through compacted soil and around delicate utilities</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"style":{"spacing":{"padding":{"top":"30px","bottom":"30px","left":"25px","right":"25px"}},"border":{"radius":"12px"},"color":{"background":"#ffffff"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-background" style="border-radius:12px;background-color:#ffffff;padding-top:30px;padding-right:25px;padding-bottom:30px;padding-left:25px"><!-- wp:paragraph {"style":{"typography":{"fontSize":"2.5rem"}}} -->
<p style="font-size:2.5rem">⚡</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":4,"style":{"typography":{"fontSize":"1.1rem","fontWeight":"700"},"color":{"text":"#1a365d"}}} -->
<h4 class="wp-block-heading has-text-color" style="color:#1a365d;font-size:1.1rem;font-weight:700">Industrial Vacuum Power</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"},"color":{"text":"#4a5568"}}} -->
<p class="has-text-color" style="color:#4a5568;font-size:0.9rem">High-volume debris tank with powerful suction for efficient material removal</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:spacer {"height":"20px"} -->
<div style="height:20px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"30px"}}}} -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"style":{"spacing":{"padding":{"top":"30px","bottom":"30px","left":"25px","right":"25px"}},"border":{"radius":"12px"},"color":{"background":"#ffffff"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-background" style="border-radius:12px;background-color:#ffffff;padding-top:30px;padding-right:25px;padding-bottom:30px;padding-left:25px"><!-- wp:paragraph {"style":{"typography":{"fontSize":"2.5rem"}}} -->
<p style="font-size:2.5rem">📏</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":4,"style":{"typography":{"fontSize":"1.1rem","fontWeight":"700"},"color":{"text":"#1a365d"}}} -->
<h4 class="wp-block-heading has-text-color" style="color:#1a365d;font-size:1.1rem;font-weight:700">600ft Hose Reach</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"},"color":{"text":"#4a5568"}}} -->
<p class="has-text-color" style="color:#4a5568;font-size:0.9rem">Extended reach capability for remote or restricted-access locations</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"style":{"spacing":{"padding":{"top":"30px","bottom":"30px","left":"25px","right":"25px"}},"border":{"radius":"12px"},"color":{"background":"#ffffff"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-background" style="border-radius:12px;background-color:#ffffff;padding-top:30px;padding-right:25px;padding-bottom:30px;padding-left:25px"><!-- wp:paragraph {"style":{"typography":{"fontSize":"2.5rem"}}} -->
<p style="font-size:2.5rem">🎯</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":4,"style":{"typography":{"fontSize":"1.1rem","fontWeight":"700"},"color":{"text":"#1a365d"}}} -->
<h4 class="wp-block-heading has-text-color" style="color:#1a365d;font-size:1.1rem;font-weight:700">Mechanical Boom System</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"},"color":{"text":"#4a5568"}}} -->
<p class="has-text-color" style="color:#4a5568;font-size:0.9rem">Precision control for targeted excavation in tight spaces</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div></div>
<!-- /wp:cover -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"left":"60px"}}}} -->
<div class="wp-block-columns alignwide"><!-- wp:column {"width":"60%"} -->
<div class="wp-block-column" style="flex-basis:60%"><!-- wp:group {"style":{"border":{"radius":"8px","width":"3px"},"spacing":{"padding":{"top":"10px","bottom":"10px","left":"20px","right":"20px"}},"color":{"background":"#dc2626"}},"borderColor":"accent","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-border-color has-accent-border-color has-background" style="border-width:3px;border-radius:8px;background-color:#dc2626;padding-top:10px;padding-right:20px;padding-bottom:10px;padding-left:20px"><!-- wp:paragraph {"style":{"typography":{"fontSize":"0.8rem","fontWeight":"700"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<p class="has-base-color has-text-color has-link-color" style="font-size:0.8rem;font-weight:700">⭐ VETERAN OWNED</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->

<!-- wp:heading {"style":{"typography":{"fontSize":"2.2rem","fontWeight":"700"},"color":{"text":"#1a365d"}}} -->
<h2 class="wp-block-heading has-text-color" style="color:#1a365d;font-size:2.2rem;font-weight:700">Built on Values of <mark style="background-color:rgba(0, 0, 0, 0);color:#f7bb14" class="has-inline-color">Service &amp; Precision</mark></h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"color":{"text":"#4a5568"}}} -->
<p class="has-text-color" style="color:#4a5568">As a veteran-owned business, we bring military discipline and attention to detail to every project. Our commitment to excellence isn't just a slogan—it's how we operate every day.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"style":{"color":{"text":"#4a5568"}}} -->
<p class="has-text-color" style="color:#4a5568">Serving Virginia Beach, Norfolk, Chesapeake, and throughout Hampton Roads with the same dedication we brought to serving our country.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"40%"} -->
<div class="wp-block-column" style="flex-basis:40%"><!-- wp:group {"style":{"spacing":{"padding":{"top":"30px","bottom":"30px","left":"30px","right":"30px"}},"border":{"radius":"12px"},"color":{"background":"#1a365d"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-background" style="border-radius:12px;background-color:#1a365d;padding-top:30px;padding-right:30px;padding-bottom:30px;padding-left:30px"><!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.5rem","fontWeight":"700"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<h3 class="wp-block-heading has-base-color has-text-color has-link-color" style="font-size:1.5rem;font-weight:700">Our Service Area</h3>
<!-- /wp:heading -->

<!-- wp:list {"style":{"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<ul class="has-base-color has-text-color has-link-color"><!-- wp:list-item -->
<li>✓ Virginia Beach &amp; Hampton Roads</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>✓ Norfolk, Chesapeake, Portsmouth</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>✓ Richmond &amp; Central Virginia</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>✓ North Carolina, Maryland &amp; Delaware</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:cover {"customOverlayColor":"#f7bb14","isDark":false,"align":"full","style":{"spacing":{"padding":{"top":"80px","bottom":"80px","left":"40px","right":"40px"}}}} -->
<div class="wp-block-cover alignfull" style="padding-top:80px;padding-right:40px;padding-bottom:80px;padding-left:40px"><span aria-hidden="true" class="wp-block-cover__background has-background-dim-100 has-background-dim" style="background-color:#f7bb14"></span><div class="wp-block-cover__inner-container"><!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"2.5rem","fontWeight":"700"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<h2 class="wp-block-heading has-text-align-center has-base-color has-text-color has-link-color" style="font-size:2.5rem;font-weight:700">Ready to Start Your Project?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.1rem"},"elements":{"link":{"color":{"text":"var:preset|color|contrast"}}}},"textColor":"contrast"} -->
<p class="has-text-align-center has-contrast-color has-text-color has-link-color" style="font-size:1.1rem">Get in touch with Beach Hydrovac today for a professional consultation on your next project</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"30px"} -->
<div style="height:30px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"base","textColor":"contrast","style":{"border":{"radius":"50px"},"spacing":{"padding":{"left":"35px","right":"35px","top":"16px","bottom":"16px"}},"typography":{"fontSize":"1.1rem","fontWeight":"700"}}} -->
<div class="wp-block-button" style="font-size:1.1rem;font-weight:700"><a class="wp-block-button__link has-contrast-color has-base-background-color has-text-color has-background wp-element-button" href="tel:757-785-5177" style="border-radius:50px;padding-top:16px;padding-right:35px;padding-bottom:16px;padding-left:35px">📞 Call 757-785-5177</a></div>
<!-- /wp:button -->

<!-- wp:button {"style":{"border":{"radius":"50px","width":"2px"},"spacing":{"padding":{"left":"35px","right":"35px","top":"14px","bottom":"14px"}},"typography":{"fontSize":"1.1rem","fontWeight":"700"},"color":{"text":"#1a365d","background":"#ffffff00"}},"borderColor":"contrast","className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline" style="font-size:1.1rem;font-weight:700"><a class="wp-block-button__link has-contrast-border-color has-text-color has-background has-border-color wp-element-button" href="/contact/" style="border-width:2px;border-radius:50px;color:#1a365d;background-color:#ffffff00;padding-top:14px;padding-right:35px;padding-bottom:14px;padding-left:35px">Request Quote</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div></div>
<!-- /wp:cover -->`;

  const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      title: 'Home',
      content: homepageContent,
      status: 'publish',
      slug: 'home'
    })
  });

  if (response.ok) {
    const page = await response.json();
    console.log('✅ Complete homepage created!');
    console.log('   URL:', page.link);

    // Set as front page
    await fetch(`${WP_URL}/wp-json/wp/v2/settings`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        show_on_front: 'page',
        page_on_front: page.id
      })
    });

    console.log('\n🎨 Sections included:');
    console.log('  ✅ Hero (needs background image)');
    console.log('  ✅ Why BeachHydrovac? (3 cards)');
    console.log('  ✅ Specialized Services (4 services)');
    console.log('  ✅ Professional Capabilities (navy bg, 4 cards)');
    console.log('  ✅ Values & Service Area (veteran badge)');
    console.log('  ✅ CTA section (yellow background)');
    console.log('\n📝 To add hero image:');
    console.log('  1. Upload image to Media Library');
    console.log('  2. Edit homepage');
    console.log('  3. Click hero cover block');
    console.log('  4. Add media in sidebar');
    console.log('\n✏️ Edit: ' + WP_URL + '/wp-admin/post.php?post=' + page.id + '&action=edit');
    console.log('👉 View: ' + WP_URL);
  } else {
    const error = await response.text();
    console.log('❌ Failed:', error.substring(0, 300));
  }
}

createCompleteHomepage().catch(console.error);
