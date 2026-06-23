import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const AUTH = 'Basic ' + Buffer.from(`${process.env.BEACH_HYDROVAC_WP_USER}:${process.env.BEACH_HYDROVAC_WP_PASSWORD}`).toString('base64');
const HEADERS = { 'Authorization': AUTH, 'Content-Type': 'application/json' };

const content = `
<!-- wp:spectra/container {"align":"full","layout":{"type":"flex","orientation":"vertical","flexWrap":"nowrap","justifyContent":"center","verticalAlignment":"center"},"variationSelected":true,"height":"300px","background":{"type":"color","color":"#1a365d"},"isBlockRootParent":true,"style":{"spacing":{"blockGap":"var:preset|spacing|30"}},"spectraId":"spectra-ct-hero-a1b2"} -->
<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"clamp(1.8rem,4vw,3rem)"}},"textColor":"white"} -->
<h1 class="wp-block-heading has-text-align-center has-white-color has-text-color">Request a Free Quote</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.1rem"}},"textColor":"ast-global-color-5"} -->
<p class="has-text-align-center has-ast-global-color-5-color has-text-color" style="font-size:1.1rem">Norfolk&#8217;s hydro-excavation specialists &#8212; serving Hampton Roads &amp; the Mid-Atlantic.</p>
<!-- /wp:paragraph -->
<!-- /wp:spectra/container -->

<!-- wp:spectra/container {"align":"full","layout":{"type":"flex","orientation":"vertical","flexWrap":"nowrap","justifyContent":"center","verticalAlignment":"center"},"variationSelected":true,"isBlockRootParent":true,"style":{"spacing":{"padding":{"top":"4rem","bottom":"4rem","left":"clamp(1rem,5vw,5rem)","right":"clamp(1rem,5vw,5rem)"},"margin":{"top":"0","bottom":"0"}}},"spectraId":"spectra-ct-main-c3d4"} -->

<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"3rem","top":"2rem"}}}} -->
<div class="wp-block-columns">

<!-- wp:column {"width":"38%"} -->
<div class="wp-block-column" style="flex-basis:38%">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","right":"2rem","bottom":"2rem","left":"2rem"}},"border":{"radius":"12px","top":{"color":"var:preset|color|ast-global-color-1","width":"4px"},"right":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"bottom":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"left":{"width":"1px","color":"var:preset|color|ast-global-color-8"}},"shadow":"var:preset|shadow|natural"},"backgroundColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-white-background-color has-background" style="border-radius:12px;border-top-color:var(--wp--preset--color--ast-global-color-1);border-top-width:4px;border-right-color:var(--wp--preset--color--ast-global-color-8);border-right-width:1px;border-bottom-color:var(--wp--preset--color--ast-global-color-8);border-bottom-width:1px;border-left-color:var(--wp--preset--color--ast-global-color-8);border-left-width:1px;padding-top:2rem;padding-right:2rem;padding-bottom:2rem;padding-left:2rem;box-shadow:var(--wp--preset--shadow--natural)">

<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.4rem","fontWeight":"700"}},"textColor":"ast-global-color-2"} -->
<h3 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1.4rem;font-weight:700">Contact Information</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"spacing":{"margin":{"bottom":"1.5rem"}}}} -->
<p style="margin-bottom:1.5rem">Local, responsive, and ready to help with your next project.</p>
<!-- /wp:paragraph -->

<!-- wp:separator {"className":"is-style-wide","style":{"color":{"background":"var:preset|color|ast-global-color-8"}}} -->
<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide has-background" style="background-color:var(--wp--preset--color--ast-global-color-8)"/>
<!-- /wp:separator -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"1rem","bottom":"1rem"}}},"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
<div class="wp-block-group" style="padding-top:1rem;padding-bottom:1rem">
<!-- wp:spectra/icons {"layout":{"type":"flex","flexWrap":"wrap","justifyContent":"left","verticalAlignment":"center"},"spectraId":"spectra-ic-phone-e5f6"} -->
<!-- wp:spectra/icon {"icon":"phone","textColor":"var(--ast-global-color-1)","style":{"spacing":{"margin":{"right":"0.75rem"}}},"spectraId":"spectra-i-phone-g7h8"} /-->
<!-- /wp:spectra/icons -->
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
<!-- wp:heading {"level":6,"style":{"typography":{"fontWeight":"700","textTransform":"uppercase","fontSize":"0.75rem"}},"textColor":"ast-global-color-1"} -->
<h6 class="wp-block-heading has-ast-global-color-1-color has-text-color" style="font-size:0.75rem;font-weight:700;text-transform:uppercase">Phone</h6>
<!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.2rem","fontWeight":"700"}},"textColor":"ast-global-color-2"} -->
<p class="has-ast-global-color-2-color has-text-color" style="font-size:1.2rem;font-weight:700"><a href="tel:7577855177">757-785-5177</a></p>
<!-- /wp:paragraph -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.85rem"}}} -->
<p style="font-size:0.85rem">Mon&#8211;Fri: 7:00 AM &#8211; 5:00 PM<br>Saturday: By appointment</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->

<!-- wp:separator {"className":"is-style-wide","style":{"color":{"background":"var:preset|color|ast-global-color-8"}}} -->
<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide has-background" style="background-color:var(--wp--preset--color--ast-global-color-8)"/>
<!-- /wp:separator -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"1rem","bottom":"1rem"}}},"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
<div class="wp-block-group" style="padding-top:1rem;padding-bottom:1rem">
<!-- wp:spectra/icons {"layout":{"type":"flex","flexWrap":"wrap","justifyContent":"left","verticalAlignment":"center"},"spectraId":"spectra-ic-email-i9j0"} -->
<!-- wp:spectra/icon {"icon":"envelope","textColor":"var(--ast-global-color-1)","spectraId":"spectra-i-email-k1l2"} /-->
<!-- /wp:spectra/icons -->
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
<!-- wp:heading {"level":6,"style":{"typography":{"fontWeight":"700","textTransform":"uppercase","fontSize":"0.75rem"}},"textColor":"ast-global-color-1"} -->
<h6 class="wp-block-heading has-ast-global-color-1-color has-text-color" style="font-size:0.75rem;font-weight:700;text-transform:uppercase">Email</h6>
<!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontWeight":"700"}},"textColor":"ast-global-color-2"} -->
<p class="has-ast-global-color-2-color has-text-color" style="font-weight:700"><a href="mailto:info@beachhydrovac.com">info@beachhydrovac.com</a></p>
<!-- /wp:paragraph -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.85rem"}}} -->
<p style="font-size:0.85rem">We respond to all inquiries within 24 hours</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->

<!-- wp:separator {"className":"is-style-wide","style":{"color":{"background":"var:preset|color|ast-global-color-8"}}} -->
<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide has-background" style="background-color:var(--wp--preset--color--ast-global-color-8)"/>
<!-- /wp:separator -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"1rem","bottom":"1rem"}}},"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
<div class="wp-block-group" style="padding-top:1rem;padding-bottom:1rem">
<!-- wp:spectra/icons {"layout":{"type":"flex","flexWrap":"wrap","justifyContent":"left","verticalAlignment":"center"},"spectraId":"spectra-ic-loc-m3n4"} -->
<!-- wp:spectra/icon {"icon":"location-dot","textColor":"var(--ast-global-color-1)","spectraId":"spectra-i-loc-o5p6"} /-->
<!-- /wp:spectra/icons -->
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
<!-- wp:heading {"level":6,"style":{"typography":{"fontWeight":"700","textTransform":"uppercase","fontSize":"0.75rem"}},"textColor":"ast-global-color-1"} -->
<h6 class="wp-block-heading has-ast-global-color-1-color has-text-color" style="font-size:0.75rem;font-weight:700;text-transform:uppercase">Location</h6>
<!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontWeight":"700"}},"textColor":"ast-global-color-2"} -->
<p class="has-ast-global-color-2-color has-text-color" style="font-weight:700">Norfolk, VA</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.85rem"}}} -->
<p style="font-size:0.85rem">Serving Hampton Roads, Virginia Beach, Chesapeake &amp; the Mid-Atlantic</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->

<!-- wp:separator {"className":"is-style-wide","style":{"color":{"background":"var:preset|color|ast-global-color-8"}}} -->
<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide has-background" style="background-color:var(--wp--preset--color--ast-global-color-8)"/>
<!-- /wp:separator -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"1rem","bottom":"0.5rem"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group" style="padding-top:1rem;padding-bottom:0.5rem">
<!-- wp:heading {"level":6,"style":{"typography":{"fontWeight":"700","textTransform":"uppercase","fontSize":"0.75rem"}},"textColor":"ast-global-color-1"} -->
<h6 class="wp-block-heading has-ast-global-color-1-color has-text-color" style="font-size:0.75rem;font-weight:700;text-transform:uppercase">AIM Partnership</h6>
<!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} -->
<p style="font-size:0.9rem">A specialized division of <strong>Advanced Infrastructure Mapping (AIM Locating)</strong>.<br><a href="https://aimlocatingva.com" target="_blank" rel="noreferrer noopener">aimlocatingva.com</a></p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->

<!-- wp:column {"width":"62%"} -->
<div class="wp-block-column" style="flex-basis:62%">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","right":"2rem","bottom":"2rem","left":"2rem"}},"border":{"radius":"12px","width":"1px","color":"var:preset|color|ast-global-color-8"},"shadow":"var:preset|shadow|natural"},"backgroundColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-white-background-color has-background" style="border-radius:12px;border-color:var(--wp--preset--color--ast-global-color-8);border-width:1px;padding-top:2rem;padding-right:2rem;padding-bottom:2rem;padding-left:2rem;box-shadow:var(--wp--preset--shadow--natural)">

<!-- wp:shortcode -->
[sureforms id="4019"]
<!-- /wp:shortcode -->

</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->

</div>
<!-- /wp:columns -->
<!-- /wp:spectra/container -->

<!-- wp:spectra/container {"align":"full","layout":{"type":"flex","orientation":"vertical","flexWrap":"nowrap","justifyContent":"center","verticalAlignment":"center"},"variationSelected":true,"isBlockRootParent":true,"background":{"type":"color","color":"#1a365d"},"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem","left":"2rem","right":"2rem"},"margin":{"top":"0","bottom":"0"},"blockGap":"var:preset|spacing|30"}},"spectraId":"spectra-ct-faq-q7r8"} -->

<!-- wp:heading {"textAlign":"center","level":2,"textColor":"white"} -->
<h2 class="wp-block-heading has-text-align-center has-white-color has-text-color">Frequently Asked Questions</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","textColor":"ast-global-color-5"} -->
<p class="has-text-align-center has-ast-global-color-5-color has-text-color">Everything you need to know about our hydro-excavation services</p>
<!-- /wp:paragraph -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem"}}},"layout":{"type":"constrained","contentSize":"900px"}} -->
<div class="wp-block-group" style="padding-top:2rem">

<!-- wp:details {"style":{"spacing":{"margin":{"bottom":"0.75rem"}},"border":{"radius":"8px","width":"1px","color":"rgba(255,255,255,0.15)"},"color":{"background":"rgba(255,255,255,0.07)"},"typography":{"fontSize":"1rem","fontWeight":"600"}}} -->
<details class="wp-block-details" style="border-radius:8px;border-color:rgba(255,255,255,0.15);border-width:1px;background-color:rgba(255,255,255,0.07);font-size:1rem;font-weight:600;margin-bottom:0.75rem"><summary class="wp-block-details__summary has-white-color has-text-color" style="color:#ffffff">What is hydro excavation (hydrovac)?</summary>
<!-- wp:paragraph {"textColor":"white","style":{"typography":{"fontSize":"0.95rem","fontWeight":"400"},"spacing":{"padding":{"top":"0.75rem"}}}} -->
<p class="has-white-color has-text-color" style="font-size:0.95rem;font-weight:400;padding-top:0.75rem">Hydro excavation uses pressurized water to break up soil and a powerful vacuum to remove debris. It safely exposes underground utilities without risk of damage from traditional mechanical digging.</p>
<!-- /wp:paragraph -->
</details>
<!-- /wp:details -->

<!-- wp:details {"style":{"spacing":{"margin":{"bottom":"0.75rem"}},"border":{"radius":"8px","width":"1px","color":"rgba(255,255,255,0.15)"},"color":{"background":"rgba(255,255,255,0.07)"},"typography":{"fontSize":"1rem","fontWeight":"600"}}} -->
<details class="wp-block-details" style="border-radius:8px;border-color:rgba(255,255,255,0.15);border-width:1px;background-color:rgba(255,255,255,0.07);font-size:1rem;font-weight:600;margin-bottom:0.75rem"><summary class="wp-block-details__summary has-white-color has-text-color" style="color:#ffffff">Why is hydrovac safer than traditional digging?</summary>
<!-- wp:paragraph {"textColor":"white","style":{"typography":{"fontSize":"0.95rem","fontWeight":"400"},"spacing":{"padding":{"top":"0.75rem"}}}} -->
<p class="has-white-color has-text-color" style="font-size:0.95rem;font-weight:400;padding-top:0.75rem">Hydrovac eliminates the risk of utility strikes that cause injuries, service outages, and costly repairs. It protects gas lines, electrical cables, fiber optics, and water mains during excavation.</p>
<!-- /wp:paragraph -->
</details>
<!-- /wp:details -->

<!-- wp:details {"style":{"spacing":{"margin":{"bottom":"0.75rem"}},"border":{"radius":"8px","width":"1px","color":"rgba(255,255,255,0.15)"},"color":{"background":"rgba(255,255,255,0.07)"},"typography":{"fontSize":"1rem","fontWeight":"600"}}} -->
<details class="wp-block-details" style="border-radius:8px;border-color:rgba(255,255,255,0.15);border-width:1px;background-color:rgba(255,255,255,0.07);font-size:1rem;font-weight:600;margin-bottom:0.75rem"><summary class="wp-block-details__summary has-white-color has-text-color" style="color:#ffffff">What areas do you serve?</summary>
<!-- wp:paragraph {"textColor":"white","style":{"typography":{"fontSize":"0.95rem","fontWeight":"400"},"spacing":{"padding":{"top":"0.75rem"}}}} -->
<p class="has-white-color has-text-color" style="font-size:0.95rem;font-weight:400;padding-top:0.75rem">We serve all of Hampton Roads &#8212; Norfolk, Virginia Beach, Chesapeake, Portsmouth, Suffolk, Newport News, and Hampton &#8212; plus the broader Mid-Atlantic region including Virginia, North Carolina, Maryland, and Delaware.</p>
<!-- /wp:paragraph -->
</details>
<!-- /wp:details -->

<!-- wp:details {"style":{"spacing":{"margin":{"bottom":"0.75rem"}},"border":{"radius":"8px","width":"1px","color":"rgba(255,255,255,0.15)"},"color":{"background":"rgba(255,255,255,0.07)"},"typography":{"fontSize":"1rem","fontWeight":"600"}}} -->
<details class="wp-block-details" style="border-radius:8px;border-color:rgba(255,255,255,0.15);border-width:1px;background-color:rgba(255,255,255,0.07);font-size:1rem;font-weight:600;margin-bottom:0.75rem"><summary class="wp-block-details__summary has-white-color has-text-color" style="color:#ffffff">Can you dig in frozen ground or hard clay?</summary>
<!-- wp:paragraph {"textColor":"white","style":{"typography":{"fontSize":"0.95rem","fontWeight":"400"},"spacing":{"padding":{"top":"0.75rem"}}}} -->
<p class="has-white-color has-text-color" style="font-size:0.95rem;font-weight:400;padding-top:0.75rem">Yes. Our heated water systems break through frost and hard clay effectively, making hydrovac ideal for year-round utility work in the Mid-Atlantic region.</p>
<!-- /wp:paragraph -->
</details>
<!-- /wp:details -->

<!-- wp:details {"style":{"spacing":{"margin":{"bottom":"0"}},"border":{"radius":"8px","width":"1px","color":"rgba(255,255,255,0.15)"},"color":{"background":"rgba(255,255,255,0.07)"},"typography":{"fontSize":"1rem","fontWeight":"600"}}} -->
<details class="wp-block-details" style="border-radius:8px;border-color:rgba(255,255,255,0.15);border-width:1px;background-color:rgba(255,255,255,0.07);font-size:1rem;font-weight:600;margin-bottom:0"><summary class="wp-block-details__summary has-white-color has-text-color" style="color:#ffffff">Is hydro excavation environmentally friendly?</summary>
<!-- wp:paragraph {"textColor":"white","style":{"typography":{"fontSize":"0.95rem","fontWeight":"400"},"spacing":{"padding":{"top":"0.75rem"}}}} -->
<p class="has-white-color has-text-color" style="font-size:0.95rem;font-weight:400;padding-top:0.75rem">Yes. Hydrovac minimizes ground disturbance, reduces spoil volume, and avoids chemical contamination. It&#8217;s one of the most environmentally responsible excavation methods available.</p>
<!-- /wp:paragraph -->
</details>
<!-- /wp:details -->

</div>
<!-- /wp:group -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"2rem"}}}} -->
<div class="wp-block-buttons" style="margin-top:2rem"><!-- wp:button {"backgroundColor":"ast-global-color-5","textColor":"ast-global-color-2","style":{"elements":{"link":{"color":{"text":"var:preset|color|ast-global-color-2"}}},"border":{"radius":"9999px"},"shadow":"var:preset|shadow|natural"}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-ast-global-color-2-color has-ast-global-color-5-background-color has-text-color has-background has-link-color wp-element-button" href="tel:7577855177" style="border-radius:9999px;box-shadow:var(--wp--preset--shadow--natural)">📞 Call 757-785-5177</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->

<!-- /wp:spectra/container -->
`;

async function run() {
  console.log('Rebuilding contact page with Spectra layout...\n');

  const res = await fetch(`${WP_URL}/wp-json/wp/v2/pages/3434`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      content,
      title: 'Contact Beach HydroVac | Free Hydro Excavation Quote | Norfolk VA'
    })
  });

  const result = await res.json();
  if (result.id) {
    console.log('✅ Contact page rebuilt — https://beachhydrovac.com/contact/');
    console.log('   Title:', result.title?.rendered);
  } else {
    console.error('❌ Failed:', JSON.stringify(result, null, 2));
  }
}

run().catch(console.error);
