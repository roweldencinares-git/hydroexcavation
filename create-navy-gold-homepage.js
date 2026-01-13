import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://silver-raccoon-464412.hostingersite.com';
const WP_USER = process.env.BEACH_HYDROVAC_WP_USER;
const WP_APP_PASSWORD = process.env.BEACH_HYDROVAC_WP_PASSWORD;

const headers = {
  'Authorization': 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64'),
  'Content-Type': 'application/json'
};

async function createNavyGoldHomepage() {
  console.log('Creating Homepage with Navy & Gold Design...\n');

  // Homepage with navy/gold color scheme and fully editable blocks
  const homepageContent = `<!-- wp:cover {"url":"","customOverlayColor":"#1a365d","minHeight":600,"minHeightUnit":"px","contentPosition":"center center","isDark":true,"align":"full","style":{"spacing":{"padding":{"top":"100px","bottom":"100px","left":"40px","right":"40px"}}}} -->
<div class="wp-block-cover alignfull is-dark" style="padding-top:100px;padding-right:40px;padding-bottom:100px;padding-left:40px;min-height:600px"><span aria-hidden="true" class="wp-block-cover__background has-background-dim-100 has-background-dim" style="background-color:#1a365d"></span><div class="wp-block-cover__inner-container"><!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"3.5rem","fontWeight":"800","lineHeight":"1.2"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<h1 class="wp-block-heading has-text-align-center has-base-color has-text-color has-link-color" style="font-size:3.5rem;font-weight:800;line-height:1.2">Professional Hydro-Excavation Services</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.3rem"},"elements":{"link":{"color":{"text":"#f7bb14"}}},"color":{"text":"#f7bb14"}}} -->
<p class="has-text-align-center has-text-color has-link-color" style="color:#f7bb14;font-size:1.3rem">Safe, precise, and efficient excavation solutions for Virginia's infrastructure projects</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"40px"} -->
<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"base","textColor":"contrast","style":{"border":{"radius":"50px"},"spacing":{"padding":{"left":"45px","right":"45px","top":"18px","bottom":"18px"}},"typography":{"fontSize":"1.1rem","fontWeight":"700"}}} -->
<div class="wp-block-button" style="font-size:1.1rem;font-weight:700"><a class="wp-block-button__link has-contrast-color has-base-background-color has-text-color has-background wp-element-button" href="tel:757-785-5177" style="border-radius:50px;padding-top:18px;padding-right:45px;padding-bottom:18px;padding-left:45px">📞 Call 757-785-5177</a></div>
<!-- /wp:button -->

<!-- wp:button {"style":{"border":{"radius":"50px","width":"2px"},"spacing":{"padding":{"left":"45px","right":"45px","top":"16px","bottom":"16px"}},"typography":{"fontSize":"1.1rem","fontWeight":"700"},"color":{"text":"#f7bb14","background":"#ffffff00"}},"borderColor":"accent","className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline" style="font-size:1.1rem;font-weight:700"><a class="wp-block-button__link has-accent-border-color has-text-color has-background has-border-color wp-element-button" style="border-width:2px;border-radius:50px;color:#f7bb14;background-color:#ffffff00;padding-top:16px;padding-right:45px;padding-bottom:16px;padding-left:45px">Get Free Quote</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div></div>
<!-- /wp:cover -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:group {"align":"wide","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignwide"><!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"2.5rem","fontWeight":"700"},"color":{"text":"#1a365d"}}} -->
<h2 class="wp-block-heading has-text-align-center has-text-color" style="color:#1a365d;font-size:2.5rem;font-weight:700">Why Choose Beach Hydrovac?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.1rem"}}} -->
<p class="has-text-align-center" style="font-size:1.1rem">Local hydro-excavation specialist serving Virginia Beach and Hampton Roads</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"60px"} -->
<div style="height:60px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"left":"40px"}}}} -->
<div class="wp-block-columns alignwide"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"style":{"border":{"radius":"16px","width":"3px"},"spacing":{"padding":{"top":"40px","bottom":"40px","left":"35px","right":"35px"}},"color":{"background":"#f8f9fa"}},"borderColor":"accent","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-border-color has-accent-border-color has-background" style="border-width:3px;border-radius:16px;background-color:#f8f9fa;padding-top:40px;padding-right:35px;padding-bottom:40px;padding-left:35px"><!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"4rem"}}} -->
<p class="has-text-align-center" style="font-size:4rem">🏆</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"1.5rem","fontWeight":"700"},"color":{"text":"#1a365d"}}} -->
<h3 class="wp-block-heading has-text-align-center has-text-color" style="color:#1a365d;font-size:1.5rem;font-weight:700">Veteran Owned</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"color":{"text":"#4a5568"}}} -->
<p class="has-text-align-center has-text-color" style="color:#4a5568">Commitment to excellence and precision in every project we undertake</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"style":{"border":{"radius":"16px","width":"3px"},"spacing":{"padding":{"top":"40px","bottom":"40px","left":"35px","right":"35px"}},"color":{"background":"#f8f9fa"}},"borderColor":"accent","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-border-color has-accent-border-color has-background" style="border-width:3px;border-radius:16px;background-color:#f8f9fa;padding-top:40px;padding-right:35px;padding-bottom:40px;padding-left:35px"><!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"4rem"}}} -->
<p class="has-text-align-center" style="font-size:4rem">📍</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"1.5rem","fontWeight":"700"},"color":{"text":"#1a365d"}}} -->
<h3 class="wp-block-heading has-text-align-center has-text-color" style="color:#1a365d;font-size:1.5rem;font-weight:700">Virginia Beach Based</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"color":{"text":"#4a5568"}}} -->
<p class="has-text-align-center has-text-color" style="color:#4a5568">Local business committed to serving our Hampton Roads community</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"style":{"border":{"radius":"16px","width":"3px"},"spacing":{"padding":{"top":"40px","bottom":"40px","left":"35px","right":"35px"}},"color":{"background":"#f8f9fa"}},"borderColor":"accent","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-border-color has-accent-border-color has-background" style="border-width:3px;border-radius:16px;background-color:#f8f9fa;padding-top:40px;padding-right:35px;padding-bottom:40px;padding-left:35px"><!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"4rem"}}} -->
<p class="has-text-align-center" style="font-size:4rem">🤝</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"1.5rem","fontWeight":"700"},"color":{"text":"#1a365d"}}} -->
<h3 class="wp-block-heading has-text-align-center has-text-color" style="color:#1a365d;font-size:1.5rem;font-weight:700">AIM Partnership</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"color":{"text":"#4a5568"}}} -->
<p class="has-text-align-center has-text-color" style="color:#4a5568">"Map First, Dig Second" workflow eliminates the blame game</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"2.5rem","fontWeight":"700"},"color":{"text":"#1a365d"}}} -->
<h2 class="wp-block-heading has-text-align-center has-text-color" style="color:#1a365d;font-size:2.5rem;font-weight:700">Our Core Services</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.1rem"}}} -->
<p class="has-text-align-center" style="font-size:1.1rem">Safe, non-destructive excavation for Virginia's infrastructure projects</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"50px"} -->
<div style="height:50px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"left":"40px"}}}} -->
<div class="wp-block-columns alignwide"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"style":{"border":{"radius":"12px"},"spacing":{"padding":{"top":"35px","bottom":"35px","left":"30px","right":"30px"}},"color":{"background":"#ffffff"}},"className":"service-card","layout":{"type":"constrained"}} -->
<div class="wp-block-group service-card has-background" style="border-radius:12px;background-color:#ffffff;padding-top:35px;padding-right:30px;padding-bottom:35px;padding-left:30px"><!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"3.5rem"}}} -->
<p class="has-text-align-center" style="font-size:3.5rem">🎯</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"1.4rem","fontWeight":"700"},"color":{"text":"#1a365d"}}} -->
<h3 class="wp-block-heading has-text-align-center has-text-color" style="color:#1a365d;font-size:1.4rem;font-weight:700">Potholing Services</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"color":{"text":"#4a5568"}}} -->
<p class="has-text-align-center has-text-color" style="color:#4a5568">Precision utility exposure without damage to existing infrastructure</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"style":{"border":{"radius":"12px"},"spacing":{"padding":{"top":"35px","bottom":"35px","left":"30px","right":"30px"}},"color":{"background":"#ffffff"}},"className":"service-card","layout":{"type":"constrained"}} -->
<div class="wp-block-group service-card has-background" style="border-radius:12px;background-color:#ffffff;padding-top:35px;padding-right:30px;padding-bottom:35px;padding-left:30px"><!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"3.5rem"}}} -->
<p class="has-text-align-center" style="font-size:3.5rem">⚡</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"1.4rem","fontWeight":"700"},"color":{"text":"#1a365d"}}} -->
<h3 class="wp-block-heading has-text-align-center has-text-color" style="color:#1a365d;font-size:1.4rem;font-weight:700">Slot Trenching</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"color":{"text":"#4a5568"}}} -->
<p class="has-text-align-center has-text-color" style="color:#4a5568">Narrow trenches with minimal surface disruption and fast restoration</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"style":{"border":{"radius":"12px"},"spacing":{"padding":{"top":"35px","bottom":"35px","left":"30px","right":"30px"}},"color":{"background":"#ffffff"}},"className":"service-card","layout":{"type":"constrained"}} -->
<div class="wp-block-group service-card has-background" style="border-radius:12px;background-color:#ffffff;padding-top:35px;padding-right:30px;padding-bottom:35px;padding-left:30px"><!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"3.5rem"}}} -->
<p class="has-text-align-center" style="font-size:3.5rem">📋</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"1.4rem","fontWeight":"700"},"color":{"text":"#1a365d"}}} -->
<h3 class="wp-block-heading has-text-align-center has-text-color" style="color:#1a365d;font-size:1.4rem;font-weight:700">SUE Level A</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"color":{"text":"#4a5568"}}} -->
<p class="has-text-align-center has-text-color" style="color:#4a5568">Highest level of subsurface utility accuracy for engineering records</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:cover {"customOverlayColor":"#1a365d","isDark":true,"align":"full","style":{"spacing":{"padding":{"top":"80px","bottom":"80px","left":"40px","right":"40px"}}}} -->
<div class="wp-block-cover alignfull is-dark" style="padding-top:80px;padding-right:40px;padding-bottom:80px;padding-left:40px"><span aria-hidden="true" class="wp-block-cover__background has-background-dim-100 has-background-dim" style="background-color:#1a365d"></span><div class="wp-block-cover__inner-container"><!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"2.5rem","fontWeight":"700"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<h2 class="wp-block-heading has-text-align-center has-base-color has-text-color has-link-color" style="font-size:2.5rem;font-weight:700">Need Hydro-Excavation Services?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.2rem"},"color":{"text":"#f7bb14"}}} -->
<p class="has-text-align-center has-text-color" style="color:#f7bb14;font-size:1.2rem">Get a free quote today and discover why contractors across Virginia trust us</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"30px"} -->
<div style="height:30px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"style":{"border":{"radius":"50px"},"spacing":{"padding":{"left":"45px","right":"45px","top":"18px","bottom":"18px"}},"typography":{"fontSize":"1.1rem","fontWeight":"700"},"color":{"background":"#f7bb14","text":"#1a365d"}}} -->
<div class="wp-block-button" style="font-size:1.1rem;font-weight:700"><a class="wp-block-button__link has-text-color has-background wp-element-button" href="tel:757-785-5177" style="border-radius:50px;color:#1a365d;background-color:#f7bb14;padding-top:18px;padding-right:45px;padding-bottom:18px;padding-left:45px">Call 757-785-5177</a></div>
<!-- /wp:button -->

<!-- wp:button {"backgroundColor":"base","textColor":"contrast","style":{"border":{"radius":"50px"},"spacing":{"padding":{"left":"45px","right":"45px","top":"18px","bottom":"18px"}},"typography":{"fontSize":"1.1rem","fontWeight":"700"}}} -->
<div class="wp-block-button" style="font-size:1.1rem;font-weight:700"><a class="wp-block-button__link has-contrast-color has-base-background-color has-text-color has-background wp-element-button" href="/contact/" style="border-radius:50px;padding-top:18px;padding-right:45px;padding-bottom:18px;padding-left:45px">Request Quote</a></div>
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
    console.log('✅ Navy & Gold Homepage created!');
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

    console.log('\n🎨 Design features:');
    console.log('  ✅ Navy blue (#1a365d) primary color');
    console.log('  ✅ Golden yellow (#f7bb14) accents');
    console.log('  ✅ Professional corporate style');
    console.log('  ✅ Veteran-owned badge');
    console.log('  ✅ Virginia Beach emphasis');
    console.log('  ✅ AIM Partnership callout');
    console.log('  ✅ Service cards');
    console.log('  ✅ Dual CTA buttons');
    console.log('\n✏️ All blocks are fully editable!');
    console.log('📝 Edit: ' + WP_URL + '/wp-admin/post.php?post=' + page.id + '&action=edit');
    console.log('👉 View: ' + WP_URL);
  } else {
    const error = await response.text();
    console.log('❌ Failed:', error.substring(0, 300));
  }
}

createNavyGoldHomepage().catch(console.error);
