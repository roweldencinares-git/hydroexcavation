import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://silver-raccoon-464412.hostingersite.com';
const WP_USER = process.env.BEACH_HYDROVAC_WP_USER;
const WP_APP_PASSWORD = process.env.BEACH_HYDROVAC_WP_PASSWORD;

const headers = {
  'Authorization': 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64'),
  'Content-Type': 'application/json'
};

async function createPage(title, content, slug) {
  const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      title,
      content,
      status: 'publish',
      slug
    })
  });

  if (response.ok) {
    const page = await response.json();
    console.log(`✅ ${title} created!`);
    console.log(`   URL: ${page.link}\n`);
    return page;
  } else {
    const error = await response.text();
    console.log(`❌ Failed to create ${title}:`, error.substring(0, 200));
    return null;
  }
}

async function createAllPages() {
  console.log('==========================================');
  console.log('Creating All Pages with Kadence Blocks');
  console.log('==========================================\n');

  // SERVICES PAGE
  const servicesContent = `<!-- wp:kadence/rowlayout {"uniqueID":"_services_hero","columns":1,"colLayout":"equal","bgColor":"palette1","padding":["60","20","60","20"],"align":"full"} -->
<div class="wp-block-kadence-rowlayout alignfull has-theme-palette-1-background-color"><div class="kt-row-column-wrap kt-has-1-columns kt-row-layout-equal kt-tab-layout-inherit kt-m-colapse-left-to-right kt-mobile-layout-row kb-theme-content-width" id="_services_hero"><div class="wp-block-kadence-column"><div class="kt-inside-inner-col"><!-- wp:kadence/advancedheading {"uniqueID":"_services_title","align":"center","level":1,"htmlTag":"h1","color":"palette4","size":["3","2.5","2"],"sizeType":"rem"} -->
<h1 class="kt-adv-heading_unique wp-block-kadence-advancedheading has-text-align-center has-theme-palette-4-color">Our Services</h1>
<!-- /wp:kadence/advancedheading -->

<!-- wp:paragraph {"align":"center","style":{"color":{"text":"#ffffff"},"typography":{"fontSize":"1.1rem"}}} -->
<p class="has-text-align-center has-text-color" style="color:#ffffff;font-size:1.1rem">Professional hydro excavation services for Virginia Beach and surrounding areas</p>
<!-- /wp:paragraph --></div></div></div></div>
<!-- /wp:kadence/rowlayout -->

<!-- wp:spacer {"height":"60px"} -->
<div style="height:60px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:kadence/rowlayout {"uniqueID":"_potholing","columns":2,"colLayout":"left-golden","padding":["20","20","40","20"]} -->
<div class="wp-block-kadence-rowlayout"><div class="kt-row-column-wrap kt-has-2-columns kt-row-layout-left-golden kt-tab-layout-inherit kt-m-colapse-left-to-right kt-mobile-layout-row" id="_potholing"><!-- wp:kadence/column -->
<div class="wp-block-kadence-column"><div class="kt-inside-inner-col"><!-- wp:kadence/advancedheading {"uniqueID":"_potholing_title","level":2,"htmlTag":"h2","color":"palette1"} -->
<h2 class="kt-adv-heading_potholing wp-block-kadence-advancedheading has-theme-palette-1-color">Potholing / Daylighting</h2>
<!-- /wp:kadence/advancedheading -->

<!-- wp:paragraph -->
<p>The process of uncovering an underground utility using high-pressure water and vacuum for SUE Level A verification. This non-destructive method protects existing infrastructure while providing precise utility location data.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Key Benefits:</h3>
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
<!-- /wp:list --></div></div>
<!-- /wp:kadence/column -->

<!-- wp:kadence/column {"verticalAlignment":"center"} -->
<div class="wp-block-kadence-column"><div class="kt-inside-inner-col"><!-- wp:kadence/icon {"uniqueID":"_potholing_icon","icon":"fe_target","size":120,"color":"palette2","style":"default"} -->
<div class="wp-block-kadence-icon kadence-icon_potholing kt-svg-icons kt-svg-icon-fe_target"><span class="kt-svg-icon-wrap" style="display:inline-flex;justify-content:center;align-items:center"><svg class="kt-svg-icon" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24"><path d="M12 2.016q4.125 0 7.055 2.93t2.93 7.055-2.93 7.055-7.055 2.93-7.055-2.93-2.93-7.055 2.93-7.055 7.055-2.93zM12 9q1.219 0 2.109 0.891t0.891 2.109-0.891 2.109-2.109 0.891-2.109-0.891-0.891-2.109 0.891-2.109 2.109-0.891z"></path></svg></span></div>
<!-- /wp:kadence/icon --></div></div>
<!-- /wp:kadence/column --></div></div>
<!-- /wp:kadence/rowlayout -->

<!-- wp:separator {"backgroundColor":"palette7","className":"is-style-wide"} -->
<hr class="wp-block-separator has-text-color has-palette-7-color has-alpha-channel-opacity has-palette-7-background-color has-background is-style-wide"/>
<!-- /wp:separator -->

<!-- wp:kadence/rowlayout {"uniqueID":"_slot_trenching","columns":2,"colLayout":"right-golden","padding":["40","20","40","20"]} -->
<div class="wp-block-kadence-rowlayout"><div class="kt-row-column-wrap kt-has-2-columns kt-row-layout-right-golden kt-tab-layout-inherit kt-m-colapse-left-to-right kt-mobile-layout-row" id="_slot_trenching"><!-- wp:kadence/column {"verticalAlignment":"center"} -->
<div class="wp-block-kadence-column"><div class="kt-inside-inner-col"><!-- wp:kadence/icon {"uniqueID":"_slot_icon","icon":"fe_zap","size":120,"color":"palette2","style":"default"} -->
<div class="wp-block-kadence-icon kadence-icon_slot kt-svg-icons kt-svg-icon-fe_zap"><span class="kt-svg-icon-wrap" style="display:inline-flex;justify-content:center;align-items:center"><svg class="kt-svg-icon" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24"><path d="M12.984 2.016l-10.969 12h8.016v7.969l10.969-12h-8.016v-7.969z"></path></svg></span></div>
<!-- /wp:kadence/icon --></div></div>
<!-- /wp:kadence/column -->

<!-- wp:kadence/column -->
<div class="wp-block-kadence-column"><div class="kt-inside-inner-col"><!-- wp:kadence/advancedheading {"uniqueID":"_slot_title","level":2,"htmlTag":"h2","color":"palette1"} -->
<h2 class="kt-adv-heading_slot wp-block-kadence-advancedheading has-theme-palette-1-color">Slot Trenching</h2>
<!-- /wp:kadence/advancedheading -->

<!-- wp:paragraph -->
<p>Creating narrow trenches for pipes/cables that require minimal backfill and restoration. Perfect for utility installation with minimal surface disruption.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Applications:</h3>
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
<!-- /wp:list --></div></div>
<!-- /wp:kadence/column --></div></div>
<!-- /wp:kadence/rowlayout -->

<!-- wp:separator {"backgroundColor":"palette7","className":"is-style-wide"} -->
<hr class="wp-block-separator has-text-color has-palette-7-color has-alpha-channel-opacity has-palette-7-background-color has-background is-style-wide"/>
<!-- /wp:separator -->

<!-- wp:kadence/rowlayout {"uniqueID":"_sue","columns":2,"colLayout":"left-golden","padding":["40","20","40","20"]} -->
<div class="wp-block-kadence-rowlayout"><div class="kt-row-column-wrap kt-has-2-columns kt-row-layout-left-golden kt-tab-layout-inherit kt-m-colapse-left-to-right kt-mobile-layout-row" id="_sue"><!-- wp:kadence/column -->
<div class="wp-block-kadence-column"><div class="kt-inside-inner-col"><!-- wp:kadence/advancedheading {"uniqueID":"_sue_title","level":2,"htmlTag":"h2","color":"palette1"} -->
<h2 class="kt-adv-heading_sue wp-block-kadence-advancedheading has-theme-palette-1-color">SUE Level A Verification</h2>
<!-- /wp:kadence/advancedheading -->

<!-- wp:paragraph -->
<p>Providing the highest level of subsurface utility accuracy for engineering records. ASCE 38 compliant subsurface utility engineering services.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">What's Included:</h3>
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
<!-- /wp:list --></div></div>
<!-- /wp:kadence/column -->

<!-- wp:kadence/column {"verticalAlignment":"center"} -->
<div class="wp-block-kadence-column"><div class="kt-inside-inner-col"><!-- wp:kadence/icon {"uniqueID":"_sue_icon","icon":"fe_mapPin","size":120,"color":"palette2","style":"default"} -->
<div class="wp-block-kadence-icon kadence-icon_sue kt-svg-icons kt-svg-icon-fe_mapPin"><span class="kt-svg-icon-wrap" style="display:inline-flex;justify-content:center;align-items:center"><svg class="kt-svg-icon" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24"><path d="M12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.727-3.375q0-2.906 2.039-4.945t4.945-2.039z"></path></svg></span></div>
<!-- /wp:kadence/icon --></div></div>
<!-- /wp:kadence/column --></div></div>
<!-- /wp:kadence/rowlayout -->

<!-- wp:spacer {"height":"60px"} -->
<div style="height:60px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:kadence/rowlayout {"uniqueID":"_services_cta","columns":1,"colLayout":"equal","bgColor":"palette5","padding":["60","20","60","20"],"align":"full"} -->
<div class="wp-block-kadence-rowlayout alignfull has-theme-palette-5-background-color"><div class="kt-row-column-wrap kt-has-1-columns kt-row-layout-equal kt-tab-layout-inherit kt-m-colapse-left-to-right kt-mobile-layout-row kb-theme-content-width" id="_services_cta"><div class="wp-block-kadence-column"><div class="kt-inside-inner-col"><!-- wp:kadence/advancedheading {"uniqueID":"_cta_heading","align":"center","level":2,"htmlTag":"h2","color":"palette1"} -->
<h2 class="kt-adv-heading_cta wp-block-kadence-advancedheading has-text-align-center has-theme-palette-1-color">Need a Quote for Your Project?</h2>
<!-- /wp:kadence/advancedheading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Contact us today for a free consultation and quote</p>
<!-- /wp:paragraph -->

<!-- wp:kadence/advancedbtn {"uniqueID":"_cta_btn","hAlign":"center","margin":["20","0","0","0"]} -->
<div class="wp-block-kadence-advancedbtn kb-btns_cta kb-btns-align-center"><!-- wp:kadence/singlebtn {"uniqueID":"_btn_contact","text":"Contact Us","borderRadius":50,"paddingBT":"16","paddingLR":"40","background":"palette2"} -->
<div class="wp-block-kadence-singlebtn kb-btn_contact kb-button-width-type-auto"><a class="kt-button button kb-btn_contact-btn" href="/contact/" target="_self" rel="noopener noreferrer"><span class="kt-btn-inner-text">Contact Us</span></a></div>
<!-- /wp:kadence/singlebtn --></div>
<!-- /wp:kadence/advancedbtn --></div></div></div></div>
<!-- /wp:kadence/rowlayout -->`;

  // ABOUT PAGE
  const aboutContent = `<!-- wp:kadence/rowlayout {"uniqueID":"_about_hero","columns":1,"colLayout":"equal","bgColor":"palette1","padding":["60","20","60","20"],"align":"full"} -->
<div class="wp-block-kadence-rowlayout alignfull has-theme-palette-1-background-color"><div class="kt-row-column-wrap kt-has-1-columns kt-row-layout-equal kt-tab-layout-inherit kt-m-colapse-left-to-right kt-mobile-layout-row kb-theme-content-width" id="_about_hero"><div class="wp-block-kadence-column"><div class="kt-inside-inner-col"><!-- wp:kadence/advancedheading {"uniqueID":"_about_title","align":"center","level":1,"htmlTag":"h1","color":"palette4","size":["3","2.5","2"],"sizeType":"rem"} -->
<h1 class="kt-adv-heading_about wp-block-kadence-advancedheading has-text-align-center has-theme-palette-4-color">About Beach Hydrovac</h1>
<!-- /wp:kadence/advancedheading -->

<!-- wp:paragraph {"align":"center","style":{"color":{"text":"#ffffff"},"typography":{"fontSize":"1.1rem"}}} -->
<p class="has-text-align-center has-text-color" style="color:#ffffff;font-size:1.1rem">Local hydro-excavation specialist serving Virginia Beach</p>
<!-- /wp:paragraph --></div></div></div></div>
<!-- /wp:kadence/rowlayout -->

<!-- wp:spacer {"height":"60px"} -->
<div style="height:60px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:kadence/advancedheading {"uniqueID":"_who_we_are","align":"center","level":2,"htmlTag":"h2","color":"palette1"} -->
<h2 class="kt-adv-heading_who wp-block-kadence-advancedheading has-text-align-center has-theme-palette-1-color">Who We Are</h2>
<!-- /wp:kadence/advancedheading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.1rem"}}} -->
<p class="has-text-align-center" style="font-size:1.1rem">Beach Hydrovac is a specialized division of <strong>AIM Locating</strong> (Advanced Infrastructure Mapping)</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"40px"} -->
<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:kadence/rowlayout {"uniqueID":"_values","columns":3,"colLayout":"equal","padding":["20","20","20","20"]} -->
<div class="wp-block-kadence-rowlayout"><div class="kt-row-column-wrap kt-has-3-columns kt-row-layout-equal kt-tab-layout-inherit kt-m-colapse-left-to-right kt-mobile-layout-row" id="_values"><!-- wp:kadence/column {"borderRadius":[12,12,12,12],"background":"palette4","padding":["30","30","30","30"],"shadow":[{"enable":true,"color":"#00416A14","hOffset":0,"vOffset":4,"blur":20,"spread":0}]} -->
<div class="wp-block-kadence-column"><div class="kt-inside-inner-col"><!-- wp:kadence/advancedheading {"uniqueID":"_local_title","align":"center","level":3,"htmlTag":"h3","color":"palette1"} -->
<h3 class="kt-adv-heading_local wp-block-kadence-advancedheading has-text-align-center has-theme-palette-1-color">Virginia Beach Based</h3>
<!-- /wp:kadence/advancedheading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Local business committed to serving our Hampton Roads community with integrity and precision</p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:kadence/column -->

<!-- wp:kadence/column {"borderRadius":[12,12,12,12],"background":"palette4","padding":["30","30","30","30"],"shadow":[{"enable":true,"color":"#00416A14","hOffset":0,"vOffset":4,"blur":20,"spread":0}]} -->
<div class="wp-block-kadence-column"><div class="kt-inside-inner-col"><!-- wp:kadence/advancedheading {"uniqueID":"_tech_title","align":"center","level":3,"htmlTag":"h3","color":"palette1"} -->
<h3 class="kt-adv-heading_tech wp-block-kadence-advancedheading has-text-align-center has-theme-palette-1-color">Advanced Technology</h3>
<!-- /wp:kadence/advancedheading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">High-volume production with mechanical boom precision for efficient project completion</p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:kadence/column -->

<!-- wp:kadence/column {"borderRadius":[12,12,12,12],"background":"palette4","padding":["30","30","30","30"],"shadow":[{"enable":true,"color":"#00416A14","hOffset":0,"vOffset":4,"blur":20,"spread":0}]} -->
<div class="wp-block-kadence-column"><div class="kt-inside-inner-col"><!-- wp:kadence/advancedheading {"uniqueID":"_aim_title","align":"center","level":3,"htmlTag":"h3","color":"palette1"} -->
<h3 class="kt-adv-heading_aim wp-block-kadence-advancedheading has-text-align-center has-theme-palette-1-color">AIM Partnership</h3>
<!-- /wp:kadence/advancedheading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Combined "Map First, Dig Second" workflow eliminates the blame game between locator and excavator</p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:kadence/column --></div></div>
<!-- /wp:kadence/rowlayout -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:kadence/rowlayout {"uniqueID":"_about_cta","columns":1,"colLayout":"equal","bgColor":"palette1","padding":["60","20","60","20"],"align":"full"} -->
<div class="wp-block-kadence-rowlayout alignfull has-theme-palette-1-background-color"><div class="kt-row-column-wrap kt-has-1-columns kt-row-layout-equal kt-tab-layout-inherit kt-m-colapse-left-to-right kt-mobile-layout-row kb-theme-content-width" id="_about_cta"><div class="wp-block-kadence-column"><div class="kt-inside-inner-col"><!-- wp:kadence/advancedheading {"uniqueID":"_about_cta_heading","align":"center","level":2,"htmlTag":"h2","color":"palette4"} -->
<h2 class="kt-adv-heading_about_cta wp-block-kadence-advancedheading has-text-align-center has-theme-palette-4-color">Ready to Work With Us?</h2>
<!-- /wp:kadence/advancedheading -->

<!-- wp:paragraph {"align":"center","style":{"color":{"text":"#ffffff"},"typography":{"fontSize":"1.1rem"}}} -->
<p class="has-text-align-center has-text-color" style="color:#ffffff;font-size:1.1rem">Contact us today to discuss your project</p>
<!-- /wp:paragraph -->

<!-- wp:kadence/advancedbtn {"uniqueID":"_about_cta_btn","hAlign":"center","margin":["20","0","0","0"]} -->
<div class="wp-block-kadence-advancedbtn kb-btns_about_cta kb-btns-align-center"><!-- wp:kadence/singlebtn {"uniqueID":"_btn_about_contact","text":"Get in Touch","borderRadius":50,"paddingBT":"16","paddingLR":"40","background":"palette2"} -->
<div class="wp-block-kadence-singlebtn kb-btn_about_contact kb-button-width-type-auto"><a class="kt-button button kb-btn_about_contact-btn" href="/contact/" target="_self" rel="noopener noreferrer"><span class="kt-btn-inner-text">Get in Touch</span></a></div>
<!-- /wp:kadence/singlebtn --></div>
<!-- /wp:kadence/advancedbtn --></div></div></div></div>
<!-- /wp:kadence/rowlayout -->`;

  // CONTACT PAGE
  const contactContent = `<!-- wp:kadence/rowlayout {"uniqueID":"_contact_hero","columns":1,"colLayout":"equal","bgColor":"palette1","padding":["60","20","60","20"],"align":"full"} -->
<div class="wp-block-kadence-rowlayout alignfull has-theme-palette-1-background-color"><div class="kt-row-column-wrap kt-has-1-columns kt-row-layout-equal kt-tab-layout-inherit kt-m-colapse-left-to-right kt-mobile-layout-row kb-theme-content-width" id="_contact_hero"><div class="wp-block-kadence-column"><div class="kt-inside-inner-col"><!-- wp:kadence/advancedheading {"uniqueID":"_contact_title","align":"center","level":1,"htmlTag":"h1","color":"palette4","size":["3","2.5","2"],"sizeType":"rem"} -->
<h1 class="kt-adv-heading_contact wp-block-kadence-advancedheading has-text-align-center has-theme-palette-4-color">Contact Us</h1>
<!-- /wp:kadence/advancedheading -->

<!-- wp:paragraph {"align":"center","style":{"color":{"text":"#ffffff"},"typography":{"fontSize":"1.1rem"}}} -->
<p class="has-text-align-center has-text-color" style="color:#ffffff;font-size:1.1rem">Get in touch for a free quote or consultation</p>
<!-- /wp:paragraph --></div></div></div></div>
<!-- /wp:kadence/rowlayout -->

<!-- wp:spacer {"height":"60px"} -->
<div style="height:60px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:kadence/rowlayout {"uniqueID":"_contact_info","columns":2,"colLayout":"equal","padding":["20","20","20","20"]} -->
<div class="wp-block-kadence-rowlayout"><div class="kt-row-column-wrap kt-has-2-columns kt-row-layout-equal kt-tab-layout-inherit kt-m-colapse-left-to-right kt-mobile-layout-row" id="_contact_info"><!-- wp:kadence/column {"borderRadius":[12,12,12,12],"background":"palette4","padding":["40","40","40","40"],"shadow":[{"enable":true,"color":"#00416A14","hOffset":0,"vOffset":4,"blur":20,"spread":0}]} -->
<div class="wp-block-kadence-column"><div class="kt-inside-inner-col"><!-- wp:kadence/advancedheading {"uniqueID":"_info_heading","level":2,"htmlTag":"h2","color":"palette1"} -->
<h2 class="kt-adv-heading_info wp-block-kadence-advancedheading has-theme-palette-1-color">Get in Touch</h2>
<!-- /wp:kadence/advancedheading -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.1rem"}}} -->
<p style="font-size:1.1rem"><strong>Phone:</strong><br>757-785-5177</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.1rem"}}} -->
<p style="font-size:1.1rem"><strong>Service Area:</strong><br>Virginia Beach and surrounding Hampton Roads areas</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.1rem"}}} -->
<p style="font-size:1.1rem"><strong>Hours:</strong><br>Monday - Friday: 7:00 AM - 5:00 PM<br>Emergency services available</p>
<!-- /wp:paragraph -->

<!-- wp:kadence/advancedbtn {"uniqueID":"_contact_phone_btn","margin":["30","0","0","0"]} -->
<div class="wp-block-kadence-advancedbtn kb-btns_phone"><!-- wp:kadence/singlebtn {"uniqueID":"_btn_call_now","text":"Call 757-785-5177","borderRadius":50,"paddingBT":"16","paddingLR":"40","background":"palette2","icon":"fe_phoneCall","iconSide":"left"} -->
<div class="wp-block-kadence-singlebtn kb-btn_call kb-button-width-type-auto"><a class="kt-button button kb-btn_call-btn" href="tel:757-785-5177" target="_self" rel="noopener noreferrer"><span class="kadence-svg-iconset kt-btn-svg-icon kt-btn-svg-icon-fe_phoneCall kt-btn-side-left"><svg aria-hidden="true" class="kt-svg-icon" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.047 18.563c3.656-3.609 5.344-6.891 3.797-8.438-0.281-0.281-0.469-0.469-0.656-0.609-1.313-1.078-1.313-3.797 1.219-6.328 1.969-1.969 4.688-3.188 6.188-1.688 3.375 3.375 2.859 10.734-4.219 17.813s-14.391 7.641-17.766 4.266c-1.5-1.5-0.281-4.219 1.688-6.188 2.531-2.531 5.25-2.531 6.328-1.219 0.141 0.188 0.328 0.375 0.609 0.656 1.547 1.547 4.828-0.141 8.438-3.797z"></path></svg></span><span class="kt-btn-inner-text">Call 757-785-5177</span></a></div>
<!-- /wp:kadence/singlebtn --></div>
<!-- /wp:kadence/advancedbtn --></div></div>
<!-- /wp:kadence/column -->

<!-- wp:kadence/column {"borderRadius":[12,12,12,12],"background":"palette5","padding":["40","40","40","40"]} -->
<div class="wp-block-kadence-column"><div class="kt-inside-inner-col"><!-- wp:kadence/advancedheading {"uniqueID":"_request_heading","level":2,"htmlTag":"h2","color":"palette1"} -->
<h2 class="kt-adv-heading_request wp-block-kadence-advancedheading has-theme-palette-1-color">Request a Quote</h2>
<!-- /wp:kadence/advancedheading -->

<!-- wp:paragraph -->
<p>Fill out the form below and we'll get back to you within 24 hours with a detailed quote for your project.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.95rem"}}} -->
<p style="font-size:0.95rem"><em>Note: For immediate assistance, please call us directly at 757-785-5177</em></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"30px"}}}} -->
<p style="margin-top:30px"><strong>Project Types We Handle:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>Utility location verification</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Site preparation</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Underground utility installation</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Emergency excavation services</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list --></div></div>
<!-- /wp:kadence/column --></div></div>
<!-- /wp:kadence/rowlayout -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->`;

  // Create all pages
  await createPage('Services', servicesContent, 'services');
  await new Promise(resolve => setTimeout(resolve, 1000));

  await createPage('About', aboutContent, 'about');
  await new Promise(resolve => setTimeout(resolve, 1000));

  await createPage('Contact', contactContent, 'contact');

  console.log('==========================================');
  console.log('✅ ALL PAGES CREATED WITH KADENCE BLOCKS!');
  console.log('==========================================\n');
  console.log('Pages created:');
  console.log('  • Home (already created)');
  console.log('  • Services');
  console.log('  • About');
  console.log('  • Contact\n');
  console.log('Features:');
  console.log('  ✅ Full Kadence block structure');
  console.log('  ✅ Icons and advanced headings');
  console.log('  ✅ Responsive layouts');
  console.log('  ✅ CTA sections with buttons');
  console.log('  ✅ Professional design');
  console.log('  ✅ Optimized for speed\n');
  console.log('👉 View site: ' + WP_URL);
}

createAllPages().catch(console.error);
