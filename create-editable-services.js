import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://silver-raccoon-464412.hostingersite.com';
const WP_USER = process.env.BEACH_HYDROVAC_WP_USER;
const WP_APP_PASSWORD = process.env.BEACH_HYDROVAC_WP_PASSWORD;

const headers = {
  'Authorization': 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64'),
  'Content-Type': 'application/json'
};

async function createEditableServicesPage() {
  console.log('Creating VISUALLY EDITABLE Services Page...\n');

  // Delete old services page if exists
  const oldPages = await fetch(`${WP_URL}/wp-json/wp/v2/pages?slug=services`, { headers });
  const pages = await oldPages.json();
  if (pages[0]) {
    await fetch(`${WP_URL}/wp-json/wp/v2/pages/${pages[0].id}?force=true`, {
      method: 'DELETE',
      headers
    });
    console.log('Deleted old services page');
  }

  // Services page with fully editable core blocks
  const servicesContent = `<!-- wp:cover {"overlayColor":"contrast","isDark":true,"align":"full","style":{"spacing":{"padding":{"top":"60px","bottom":"60px","left":"40px","right":"40px"}}}} -->
<div class="wp-block-cover alignfull is-dark" style="padding-top:60px;padding-right:40px;padding-bottom:60px;padding-left:40px"><span aria-hidden="true" class="wp-block-cover__background has-contrast-background-color has-background-dim-100 has-background-dim"></span><div class="wp-block-cover__inner-container"><!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"3rem","fontWeight":"800"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<h1 class="wp-block-heading has-text-align-center has-base-color has-text-color has-link-color" style="font-size:3rem;font-weight:800">Our Services</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.1rem"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<p class="has-text-align-center has-base-color has-text-color has-link-color" style="font-size:1.1rem">Professional hydro excavation services for Virginia Beach and surrounding areas</p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:cover -->

<!-- wp:spacer {"height":"60px"} -->
<div style="height:60px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"left":"40px"}}}} -->
<div class="wp-block-columns alignwide"><!-- wp:column {"width":"60%"} -->
<div class="wp-block-column" style="flex-basis:60%"><!-- wp:heading {"style":{"typography":{"fontSize":"2rem","fontWeight":"700"}}} -->
<h2 class="wp-block-heading" style="font-size:2rem;font-weight:700">Potholing / Daylighting</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.1rem"}}} -->
<p style="font-size:1.1rem">The process of uncovering an underground utility using high-pressure water and vacuum for SUE Level A verification. This non-destructive method protects existing infrastructure while providing precise utility location data.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.3rem","fontWeight":"700"}}} -->
<h3 class="wp-block-heading" style="font-size:1.3rem;font-weight:700">Key Benefits:</h3>
<!-- /wp:heading -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>No damage to existing utilities</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Precise depth and location verification</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>ASCE 38 compliant</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Fast and efficient</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"40%","verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:40%"><!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"8rem"}}} -->
<p class="has-text-align-center" style="font-size:8rem">🎯</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:separator {"backgroundColor":"contrast-2","className":"is-style-wide"} -->
<hr class="wp-block-separator has-text-color has-contrast-2-color has-alpha-channel-opacity has-contrast-2-background-color has-background is-style-wide"/>
<!-- /wp:separator -->

<!-- wp:spacer {"height":"40px"} -->
<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"left":"40px"}}}} -->
<div class="wp-block-columns alignwide"><!-- wp:column {"width":"40%","verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:40%"><!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"8rem"}}} -->
<p class="has-text-align-center" style="font-size:8rem">⚡</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"60%"} -->
<div class="wp-block-column" style="flex-basis:60%"><!-- wp:heading {"style":{"typography":{"fontSize":"2rem","fontWeight":"700"}}} -->
<h2 class="wp-block-heading" style="font-size:2rem;font-weight:700">Slot Trenching</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.1rem"}}} -->
<p style="font-size:1.1rem">Creating narrow trenches for pipes/cables that require minimal backfill and restoration. Perfect for utility installation with minimal surface disruption.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.3rem","fontWeight":"700"}}} -->
<h3 class="wp-block-heading" style="font-size:1.3rem;font-weight:700">Applications:</h3>
<!-- /wp:heading -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Fiber optic cable installation</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Water and sewer line installation</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Gas line trenching</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Minimal landscape disruption</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:separator {"backgroundColor":"contrast-2","className":"is-style-wide"} -->
<hr class="wp-block-separator has-text-color has-contrast-2-color has-alpha-channel-opacity has-contrast-2-background-color has-background is-style-wide"/>
<!-- /wp:separator -->

<!-- wp:spacer {"height":"40px"} -->
<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"left":"40px"}}}} -->
<div class="wp-block-columns alignwide"><!-- wp:column {"width":"60%"} -->
<div class="wp-block-column" style="flex-basis:60%"><!-- wp:heading {"style":{"typography":{"fontSize":"2rem","fontWeight":"700"}}} -->
<h2 class="wp-block-heading" style="font-size:2rem;font-weight:700">SUE Level A Verification</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.1rem"}}} -->
<p style="font-size:1.1rem">Providing the highest level of subsurface utility accuracy for engineering records. ASCE 38 compliant subsurface utility engineering services.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.3rem","fontWeight":"700"}}} -->
<h3 class="wp-block-heading" style="font-size:1.3rem;font-weight:700">What's Included:</h3>
<!-- /wp:heading -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Precise horizontal and vertical location</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Utility type identification</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Condition assessment</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Detailed documentation</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></div>
<!-- /wp:column -->

<!-- wp:column {"width":"40%","verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center" style="flex-basis:40%"><!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"8rem"}}} -->
<p class="has-text-align-center" style="font-size:8rem">📍</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:spacer {"height":"60px"} -->
<div style="height:60px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:cover {"overlayColor":"accent","isDark":true,"align":"full","style":{"spacing":{"padding":{"top":"60px","bottom":"60px","left":"40px","right":"40px"}}}} -->
<div class="wp-block-cover alignfull is-dark" style="padding-top:60px;padding-right:40px;padding-bottom:60px;padding-left:40px"><span aria-hidden="true" class="wp-block-cover__background has-accent-background-color has-background-dim-100 has-background-dim"></span><div class="wp-block-cover__inner-container"><!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"2.5rem","fontWeight":"700"},"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<h2 class="wp-block-heading has-text-align-center has-base-color has-text-color has-link-color" style="font-size:2.5rem;font-weight:700">Need a Quote for Your Project?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|base"}}}},"textColor":"base"} -->
<p class="has-text-align-center has-base-color has-text-color has-link-color">Contact us today for a free consultation and quote</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"30px"}}}} -->
<div class="wp-block-buttons" style="margin-top:30px"><!-- wp:button {"backgroundColor":"base","textColor":"contrast","style":{"border":{"radius":"50px"},"spacing":{"padding":{"left":"40px","right":"40px","top":"16px","bottom":"16px"}}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-contrast-color has-base-background-color has-text-color has-background wp-element-button" href="/contact/" style="border-radius:50px;padding-top:16px;padding-right:40px;padding-bottom:16px;padding-left:40px">Contact Us</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div></div>
<!-- /wp:cover -->`;

  const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      title: 'Services',
      content: servicesContent,
      status: 'publish',
      slug: 'services'
    })
  });

  if (response.ok) {
    const page = await response.json();
    console.log('✅ Editable Services page created!');
    console.log('   URL:', page.link);
    console.log('\n✨ Fully editable blocks:');
    console.log('  ✅ Hero section (click to change text/colors)');
    console.log('  ✅ Service descriptions (click to edit)');
    console.log('  ✅ Icons (click to change size/emoji)');
    console.log('  ✅ Lists (add/remove items)');
    console.log('  ✅ Spacers (adjust heights)');
    console.log('  ✅ CTA section (edit text/button)');
    console.log('\n📝 Edit: ' + WP_URL + '/wp-admin/post.php?post=' + page.id + '&action=edit');
    console.log('👉 View: ' + page.link);
  } else {
    const error = await response.text();
    console.log('❌ Failed:', error.substring(0, 300));
  }
}

createEditableServicesPage().catch(console.error);
