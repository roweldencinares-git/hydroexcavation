import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://silver-raccoon-464412.hostingersite.com';
const WP_USER = process.env.BEACH_HYDROVAC_WP_USER;
const WP_APP_PASSWORD = process.env.BEACH_HYDROVAC_WP_PASSWORD;

const headers = {
  'Authorization': 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64'),
  'Content-Type': 'application/json'
};

async function createEditableHomepage() {
  console.log('Creating VISUALLY EDITABLE Homepage...\n');

  // Homepage with core blocks that are fully editable
  const homepageContent = `<!-- wp:cover {"overlayColor":"contrast","gradient":"vivid-cyan-blue-to-vivid-purple","contentPosition":"center center","isDark":true,"align":"full","style":{"spacing":{"padding":{"top":"120px","bottom":"120px","left":"40px","right":"40px"}}}} -->
<div class="wp-block-cover alignfull is-dark" style="padding-top:120px;padding-right:40px;padding-bottom:120px;padding-left:40px"><span aria-hidden="true" class="wp-block-cover__background has-contrast-background-color has-background-dim-100 has-background-dim has-background-gradient has-vivid-cyan-blue-to-vivid-purple-gradient-background"></span><div class="wp-block-cover__inner-container"><!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"3.5rem","fontWeight":"800"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<h1 class="wp-block-heading has-text-align-center has-base-color has-text-color has-link-color" style="font-size:3.5rem;font-weight:800">Protecting Virginia's Underground Infrastructure</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.3rem"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<p class="has-text-align-center has-base-color has-text-color has-link-color" style="font-size:1.3rem">Precision hydro excavation for Virginia Beach and surrounding areas</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"40px"}}}} -->
<div class="wp-block-buttons" style="margin-top:40px"><!-- wp:button {"backgroundColor":"base","textColor":"contrast","style":{"border":{"radius":"50px"},"spacing":{"padding":{"left":"45px","right":"45px","top":"18px","bottom":"18px"}},"typography":{"fontSize":"1.1rem","fontWeight":"700"}},"className":"is-style-fill"} -->
<div class="wp-block-button is-style-fill" style="font-size:1.1rem;font-weight:700"><a class="wp-block-button__link has-contrast-color has-base-background-color has-text-color has-background wp-element-button" href="tel:757-785-5177" style="border-radius:50px;padding-top:18px;padding-right:45px;padding-bottom:18px;padding-left:45px">📞 Call 757-785-5177</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div></div>
<!-- /wp:cover -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"2.5rem","fontWeight":"700"}}} -->
<h2 class="wp-block-heading has-text-align-center" style="font-size:2.5rem;font-weight:700">Our Services</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.1rem"}}} -->
<p class="has-text-align-center" style="font-size:1.1rem">Safe, non-destructive excavation for Virginia Beach and surrounding areas</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"60px"} -->
<div style="height:60px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"left":"30px"}}}} -->
<div class="wp-block-columns alignwide"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"style":{"border":{"radius":"16px","width":"2px"},"spacing":{"padding":{"top":"40px","bottom":"40px","left":"30px","right":"30px"}}},"borderColor":"contrast-2","backgroundColor":"base","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-border-color has-contrast-2-border-color has-base-background-color has-background" style="border-width:2px;border-radius:16px;padding-top:40px;padding-right:30px;padding-bottom:40px;padding-left:30px"><!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"4rem"}}} -->
<p class="has-text-align-center" style="font-size:4rem">🎯</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"1.5rem","fontWeight":"700"}}} -->
<h3 class="wp-block-heading has-text-align-center" style="font-size:1.5rem;font-weight:700">Potholing Services</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Precision utility exposure without damage to existing infrastructure. Safe verification of underground utilities.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"style":{"border":{"radius":"16px","width":"2px"},"spacing":{"padding":{"top":"40px","bottom":"40px","left":"30px","right":"30px"}}},"borderColor":"contrast-2","backgroundColor":"base","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-border-color has-contrast-2-border-color has-base-background-color has-background" style="border-width:2px;border-radius:16px;padding-top:40px;padding-right:30px;padding-bottom:40px;padding-left:30px"><!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"4rem"}}} -->
<p class="has-text-align-center" style="font-size:4rem">⚡</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"1.5rem","fontWeight":"700"}}} -->
<h3 class="wp-block-heading has-text-align-center" style="font-size:1.5rem;font-weight:700">Slot Trenching</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Narrow trenches for utility installation with minimal surface disruption. Efficient and cost-effective.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"style":{"border":{"radius":"16px","width":"2px"},"spacing":{"padding":{"top":"40px","bottom":"40px","left":"30px","right":"30px"}}},"borderColor":"contrast-2","backgroundColor":"base","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-border-color has-contrast-2-border-color has-base-background-color has-background" style="border-width:2px;border-radius:16px;padding-top:40px;padding-right:30px;padding-bottom:40px;padding-left:30px"><!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"4rem"}}} -->
<p class="has-text-align-center" style="font-size:4rem">📍</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"1.5rem","fontWeight":"700"}}} -->
<h3 class="wp-block-heading has-text-align-center" style="font-size:1.5rem;font-weight:700">SUE Level A Verification</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Subsurface utility engineering with precise location verification. ASCE 38 compliant services.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:cover {"overlayColor":"contrast","isDark":true,"align":"full","style":{"spacing":{"padding":{"top":"80px","bottom":"80px","left":"40px","right":"40px"}}}} -->
<div class="wp-block-cover alignfull is-dark" style="padding-top:80px;padding-right:40px;padding-bottom:80px;padding-left:40px"><span aria-hidden="true" class="wp-block-cover__background has-contrast-background-color has-background-dim-100 has-background-dim"></span><div class="wp-block-cover__inner-container"><!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"2.5rem","fontWeight":"700"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<h2 class="wp-block-heading has-text-align-center has-base-color has-text-color has-link-color" style="font-size:2.5rem;font-weight:700">Ready to Start Your Project?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.2rem"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<p class="has-text-align-center has-base-color has-text-color has-link-color" style="font-size:1.2rem">Get a free quote today and discover why contractors across Virginia trust us for precision excavation</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"40px"}}}} -->
<div class="wp-block-buttons" style="margin-top:40px"><!-- wp:button {"style":{"border":{"radius":"50px"},"spacing":{"padding":{"left":"45px","right":"45px","top":"18px","bottom":"18px"}},"typography":{"fontSize":"1.1rem","fontWeight":"700"}},"className":"is-style-fill"} -->
<div class="wp-block-button is-style-fill" style="font-size:1.1rem;font-weight:700"><a class="wp-block-button__link wp-element-button" href="tel:757-785-5177" style="border-radius:50px;padding-top:18px;padding-right:45px;padding-bottom:18px;padding-left:45px">Call 757-785-5177</a></div>
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
    console.log('✅ Editable homepage created!');
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

    console.log('\n✨ You can now edit VISUALLY:');
    console.log('  ✅ Click any text to edit it');
    console.log('  ✅ Click blocks to change colors/spacing');
    console.log('  ✅ Drag blocks to rearrange');
    console.log('  ✅ Add new blocks with the + button');
    console.log('  ✅ Change hero background color/gradient');
    console.log('  ✅ Edit button text and links');
    console.log('\n📝 Edit page: ' + WP_URL + '/wp-admin/post.php?post=' + page.id + '&action=edit');
    console.log('👉 View live: ' + WP_URL);
  } else {
    const error = await response.text();
    console.log('❌ Failed:', error.substring(0, 300));
  }
}

createEditableHomepage().catch(console.error);
