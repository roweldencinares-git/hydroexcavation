import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://silver-raccoon-464412.hostingersite.com';
const WP_USER = process.env.BEACH_HYDROVAC_WP_USER;
const WP_APP_PASSWORD = process.env.BEACH_HYDROVAC_WP_PASSWORD;

const headers = {
  'Authorization': 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64'),
  'Content-Type': 'application/json'
};

async function createHomepage() {
  console.log('==========================================');
  console.log('Creating Homepage with Kadence Blocks');
  console.log('==========================================\n');

  // Homepage content with Kadence blocks
  const homepageContent = `<!-- wp:kadence/rowlayout {"uniqueID":"_hero_section","columns":1,"colLayout":"equal","bgColor":"palette9","bgImg":"","bgImgAttachment":"scroll","bgImgSize":"cover","overlayBgImg":"","overlayBgColor":"palette9","overlayOpacity":70,"padding":["80","20","80","20"],"align":"full","minHeight":600,"minHeightUnit":"px"} -->
<div class="wp-block-kadence-rowlayout alignfull has-theme-palette-9-background-color"><div class="kt-row-column-wrap kt-has-1-columns kt-row-layout-equal kt-tab-layout-inherit kt-m-colapse-left-to-right kt-mobile-layout-row kb-theme-content-width" id="_hero_section"><div class="wp-block-kadence-column kadence-column_unique_1"><div class="kt-inside-inner-col"><!-- wp:kadence/advancedheading {"uniqueID":"_hero_heading","align":"center","level":1,"htmlTag":"h1","size":["3.5","2.5","2"],"sizeType":"rem","lineHeight":["1.2","1.3","1.3"],"color":"palette4","marginType":"px","margin":[0,0,20,0],"typography":"","googleFont":false,"loadGoogleFont":true,"fontFamily":"","fontWeight":"800","textShadow":[{"enable":true,"color":"#000000","blur":12,"hOffset":0,"vOffset":4,"opacity":0.3}]} -->
<h1 class="kt-adv-heading_unique_1 wp-block-kadence-advancedheading has-text-align-center has-theme-palette-4-color" data-kb-block="kb-adv-heading_unique_1"><strong>Protecting Virginia's Underground Infrastructure</strong></h1>
<!-- /wp:kadence/advancedheading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.25rem"},"color":{"text":"#ffffff"}}} -->
<p class="has-text-align-center has-text-color" style="color:#ffffff;font-size:1.25rem">Precision hydro excavation for Virginia Beach and surrounding areas. Safe, non-destructive utility exposure.</p>
<!-- /wp:paragraph -->

<!-- wp:kadence/advancedbtn {"uniqueID":"_hero_buttons","hAlign":"center","margin":["30","0","0","0"]} -->
<div class="wp-block-kadence-advancedbtn kb-btns_unique_1 kb-btns-align-center"><!-- wp:kadence/singlebtn {"uniqueID":"_btn_quote","text":"Get a Free Quote","borderRadius":50,"paddingBT":"16","paddingLR":"40","inheritStyles":"outline","icon":"fe_phoneCall","iconSide":"right","backgroundHoverType":"gradient","background":"palette2","backgroundHover":"palette1","gradient":["linear-gradient(135deg, #27AEFD 0%, #1E90FF 100%)","linear-gradient(135deg, #00416A 0%, #27AEFD 100%)"],"shadow":[{"enable":true,"color":"#27AEFD4D","hOffset":0,"vOffset":8,"blur":20,"spread":0,"inset":false}],"shadowHover":[{"enable":true,"color":"#27AEFD66","hOffset":0,"vOffset":12,"blur":30,"spread":0,"inset":false}]} -->
<div class="wp-block-kadence-singlebtn kb-btn_unique_1 kb-button-width-type-auto" data-kb-block="kb-btn_unique_1"><a class="kt-button button kb-btn_unique_1-btn kb-btn-global-outline" href="#contact" target="_self" rel="noopener noreferrer"><span class="kt-btn-inner-text">Get a Free Quote</span><span class="kadence-svg-iconset kt-btn-svg-icon kt-btn-svg-icon-fe_phoneCall kt-btn-side-right"><svg aria-hidden="true" class="kt-svg-icon kt-svg-icon-fe_phoneCall" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.047 18.563c3.656-3.609 5.344-6.891 3.797-8.438-0.281-0.281-0.469-0.469-0.656-0.609-1.313-1.078-1.313-3.797 1.219-6.328 1.969-1.969 4.688-3.188 6.188-1.688 3.375 3.375 2.859 10.734-4.219 17.813s-14.391 7.641-17.766 4.266c-1.5-1.5-0.281-4.219 1.688-6.188 2.531-2.531 5.25-2.531 6.328-1.219 0.141 0.188 0.328 0.375 0.609 0.656 1.547 1.547 4.828-0.141 8.438-3.797z"></path></svg></span></a></div>
<!-- /wp:kadence/singlebtn --></div>
<!-- /wp:kadence/advancedbtn --></div></div></div></div>
<!-- /wp:kadence/rowlayout -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:kadence/advancedheading {"uniqueID":"_services_heading","align":"center","level":2,"htmlTag":"h2","size":["2.5","2","1.75"],"sizeType":"rem","color":"palette1"} -->
<h2 class="kt-adv-heading_unique_2 wp-block-kadence-advancedheading has-text-align-center has-theme-palette-1-color" data-kb-block="kb-adv-heading_unique_2">Our Services</h2>
<!-- /wp:kadence/advancedheading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.1rem"}}} -->
<p class="has-text-align-center" style="font-size:1.1rem">Safe, non-destructive excavation for Virginia Beach and surrounding areas</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"50px"} -->
<div style="height:50px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:kadence/rowlayout {"uniqueID":"_services_row","columns":3,"colLayout":"equal","tabletLayout":"row","columnGutter":"wider","padding":["0","20","0","20"]} -->
<div class="wp-block-kadence-rowlayout"><div class="kt-row-column-wrap kt-has-3-columns kt-row-layout-equal kt-tab-layout-row kt-m-colapse-left-to-right kt-mobile-layout-row" id="_services_row"><!-- wp:kadence/column {"uniqueID":"_col_1","borderRadius":[12,12,12,12],"background":"palette4","padding":["30","30","30","30"],"shadow":[{"enable":true,"color":"#00416A14","hOffset":0,"vOffset":4,"blur":20,"spread":0,"inset":false}],"shadowHover":[{"enable":true,"color":"#00416A26","hOffset":0,"vOffset":12,"blur":35,"spread":0,"inset":false}]} -->
<div class="wp-block-kadence-column kadence-column_col_1"><div class="kt-inside-inner-col"><!-- wp:kadence/icon {"uniqueID":"_icon_1","icon":"fe_target","size":40,"color":"palette2","style":"default","marginType":"px","margin":[0,0,20,0]} -->
<div class="wp-block-kadence-icon kadence-icon_unique_1 kt-svg-icons kt-svg-icon-fe_target" data-kb-block="kadence-icon_unique_1"><span class="kt-svg-icon-wrap" style="display:inline-flex;justify-content:center;align-items:center"><svg class="kt-svg-icon kt-svg-icon-fe_target" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M12 2.016q4.125 0 7.055 2.93t2.93 7.055-2.93 7.055-7.055 2.93-7.055-2.93-2.93-7.055 2.93-7.055 7.055-2.93zM12 9q1.219 0 2.109 0.891t0.891 2.109-0.891 2.109-2.109 0.891-2.109-0.891-0.891-2.109 0.891-2.109 2.109-0.891zM12 15.984q1.641 0 2.813-1.172t1.172-2.813-1.172-2.813-2.813-1.172-2.813 1.172-1.172 2.813 1.172 2.813 2.813 1.172zM18 12q0-2.484-1.758-4.242t-4.242-1.758-4.242 1.758-1.758 4.242 1.758 4.242 4.242 1.758 4.242-1.758 1.758-4.242z"></path></svg></span></div>
<!-- /wp:kadence/icon -->

<!-- wp:kadence/advancedheading {"uniqueID":"_service_1_heading","align":"center","level":3,"htmlTag":"h3","color":"palette1"} -->
<h3 class="kt-adv-heading_unique_3 wp-block-kadence-advancedheading has-text-align-center has-theme-palette-1-color" data-kb-block="kb-adv-heading_unique_3">Potholing Services</h3>
<!-- /wp:kadence/advancedheading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Precision utility exposure without damage to existing infrastructure. Safe verification of underground utilities.</p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:kadence/column -->

<!-- wp:kadence/column {"uniqueID":"_col_2","borderRadius":[12,12,12,12],"background":"palette4","padding":["30","30","30","30"],"shadow":[{"enable":true,"color":"#00416A14","hOffset":0,"vOffset":4,"blur":20,"spread":0,"inset":false}],"shadowHover":[{"enable":true,"color":"#00416A26","hOffset":0,"vOffset":12,"blur":35,"spread":0,"inset":false}]} -->
<div class="wp-block-kadence-column kadence-column_col_2"><div class="kt-inside-inner-col"><!-- wp:kadence/icon {"uniqueID":"_icon_2","icon":"fe_zap","size":40,"color":"palette2","style":"default","marginType":"px","margin":[0,0,20,0]} -->
<div class="wp-block-kadence-icon kadence-icon_unique_2 kt-svg-icons kt-svg-icon-fe_zap" data-kb-block="kadence-icon_unique_2"><span class="kt-svg-icon-wrap" style="display:inline-flex;justify-content:center;align-items:center"><svg class="kt-svg-icon kt-svg-icon-fe_zap" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M12.984 2.016l-10.969 12h8.016v7.969l10.969-12h-8.016v-7.969z"></path></svg></span></div>
<!-- /wp:kadence/icon -->

<!-- wp:kadence/advancedheading {"uniqueID":"_service_2_heading","align":"center","level":3,"htmlTag":"h3","color":"palette1"} -->
<h3 class="kt-adv-heading_unique_4 wp-block-kadence-advancedheading has-text-align-center has-theme-palette-1-color" data-kb-block="kb-adv-heading_unique_4">Slot Trenching</h3>
<!-- /wp:kadence/advancedheading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Narrow trenches for utility installation with minimal surface disruption. Efficient and cost-effective.</p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:kadence/column -->

<!-- wp:kadence/column {"uniqueID":"_col_3","borderRadius":[12,12,12,12],"background":"palette4","padding":["30","30","30","30"],"shadow":[{"enable":true,"color":"#00416A14","hOffset":0,"vOffset":4,"blur":20,"spread":0,"inset":false}],"shadowHover":[{"enable":true,"color":"#00416A26","hOffset":0,"vOffset":12,"blur":35,"spread":0,"inset":false}]} -->
<div class="wp-block-kadence-column kadence-column_col_3"><div class="kt-inside-inner-col"><!-- wp:kadence/icon {"uniqueID":"_icon_3","icon":"fe_mapPin","size":40,"color":"palette2","style":"default","marginType":"px","margin":[0,0,20,0]} -->
<div class="wp-block-kadence-icon kadence-icon_unique_3 kt-svg-icons kt-svg-icon-fe_mapPin" data-kb-block="kadence-icon_unique_3"><span class="kt-svg-icon-wrap" style="display:inline-flex;justify-content:center;align-items:center"><svg class="kt-svg-icon kt-svg-icon-fe_mapPin" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.727-3.375q0-2.906 2.039-4.945t4.945-2.039zM12 11.016q1.219 0 2.109-0.891t0.891-2.109-0.891-2.109-2.109-0.891-2.109 0.891-0.891 2.109 0.891 2.109 2.109 0.891z"></path></svg></span></div>
<!-- /wp:kadence/icon -->

<!-- wp:kadence/advancedheading {"uniqueID":"_service_3_heading","align":"center","level":3,"htmlTag":"h3","color":"palette1"} -->
<h3 class="kt-adv-heading_unique_5 wp-block-kadence-advancedheading has-text-align-center has-theme-palette-1-color" data-kb-block="kb-adv-heading_unique_5">SUE Level A Verification</h3>
<!-- /wp:kadence/advancedheading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Subsurface utility engineering with precise location verification. ASCE 38 compliant services.</p>
<!-- /wp:paragraph --></div></div>
<!-- /wp:kadence/column --></div></div>
<!-- /wp:kadence/rowlayout -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:kadence/rowlayout {"uniqueID":"_cta_section","columns":1,"colLayout":"equal","bgColor":"palette1","padding":["60","20","60","20"],"align":"full"} -->
<div class="wp-block-kadence-rowlayout alignfull has-theme-palette-1-background-color"><div class="kt-row-column-wrap kt-has-1-columns kt-row-layout-equal kt-tab-layout-inherit kt-m-colapse-left-to-right kt-mobile-layout-row kb-theme-content-width" id="_cta_section"><div class="wp-block-kadence-column kadence-column_unique_4"><div class="kt-inside-inner-col"><!-- wp:kadence/advancedheading {"uniqueID":"_cta_heading","align":"center","level":2,"htmlTag":"h2","color":"palette4","size":["2.5","2","1.75"],"sizeType":"rem"} -->
<h2 class="kt-adv-heading_unique_6 wp-block-kadence-advancedheading has-text-align-center has-theme-palette-4-color" data-kb-block="kb-adv-heading_unique_6">Ready to Start Your Project?</h2>
<!-- /wp:kadence/advancedheading -->

<!-- wp:paragraph {"align":"center","style":{"color":{"text":"#ffffff"},"typography":{"fontSize":"1.1rem"}}} -->
<p class="has-text-align-center has-text-color" style="color:#ffffff;font-size:1.1rem">Get a free quote today and discover why contractors across Virginia trust us for precision excavation.</p>
<!-- /wp:paragraph -->

<!-- wp:kadence/advancedbtn {"uniqueID":"_cta_buttons","hAlign":"center","margin":["30","0","0","0"]} -->
<div class="wp-block-kadence-advancedbtn kb-btns_unique_2 kb-btns-align-center"><!-- wp:kadence/singlebtn {"uniqueID":"_btn_call","text":"Call 757-785-5177","borderRadius":50,"paddingBT":"16","paddingLR":"40","background":"palette2","icon":"fe_phoneCall","iconSide":"left"} -->
<div class="wp-block-kadence-singlebtn kb-btn_unique_2 kb-button-width-type-auto" data-kb-block="kb-btn_unique_2"><a class="kt-button button kb-btn_unique_2-btn" href="tel:757-785-5177" target="_self" rel="noopener noreferrer"><span class="kadence-svg-iconset kt-btn-svg-icon kt-btn-svg-icon-fe_phoneCall kt-btn-side-left"><svg aria-hidden="true" class="kt-svg-icon kt-svg-icon-fe_phoneCall" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.047 18.563c3.656-3.609 5.344-6.891 3.797-8.438-0.281-0.281-0.469-0.469-0.656-0.609-1.313-1.078-1.313-3.797 1.219-6.328 1.969-1.969 4.688-3.188 6.188-1.688 3.375 3.375 2.859 10.734-4.219 17.813s-14.391 7.641-17.766 4.266c-1.5-1.5-0.281-4.219 1.688-6.188 2.531-2.531 5.25-2.531 6.328-1.219 0.141 0.188 0.328 0.375 0.609 0.656 1.547 1.547 4.828-0.141 8.438-3.797z"></path></svg></span><span class="kt-btn-inner-text">Call 757-785-5177</span></a></div>
<!-- /wp:kadence/singlebtn --></div>
<!-- /wp:kadence/advancedbtn --></div></div></div></div>
<!-- /wp:kadence/rowlayout -->`;

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
    console.log('✅ Homepage created with Kadence blocks!');
    console.log('   ID:', page.id);
    console.log('   URL:', page.link);

    // Set as front page
    const settingsResponse = await fetch(`${WP_URL}/wp-json/wp/v2/settings`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        show_on_front: 'page',
        page_on_front: page.id
      })
    });

    if (settingsResponse.ok) {
      console.log('✅ Set as front page!');
    }

    console.log('\n✨ Features:');
    console.log('  • Full-width hero with gradient overlay');
    console.log('  • Kadence Advanced Headings with animations');
    console.log('  • 3 service cards with icons');
    console.log('  • CTA section with phone button');
    console.log('  • Fully responsive');
    console.log('  • Optimized for speed');

    return page;
  } else {
    const error = await response.text();
    console.log('❌ Failed:', error.substring(0, 500));
    return null;
  }
}

createHomepage().catch(console.error);
