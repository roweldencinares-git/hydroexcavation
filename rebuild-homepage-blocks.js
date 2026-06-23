import axios from 'axios';
import 'dotenv/config';

/**
 * BEACHHYDROVAC HOMEPAGE - BLOCK BY BLOCK REBUILD
 * Matches design from: https://beachhydrovac-website.vercel.app/
 */

const WP_URL = 'https://beachhydrovac.com';
const WP_USER = process.env.BEACH_HYDROVAC_WP_USER;
const WP_APP_PASSWORD = process.env.BEACH_HYDROVAC_WP_PASSWORD;

const COLORS = {
  navy: '#1a365d',
  navyDark: '#0f2744',
  gold: '#f7bb14',
  goldDark: '#d4a012',
  red: '#B91C1C',
  white: '#ffffff',
  gray: '#f8fafc',
  grayDark: '#64748b'
};

// Gutenberg block content
const homepageContent = `
<!-- wp:kadence/rowlayout {"uniqueID":"hero-section","columns":1,"colLayout":"equal","bgColor":"${COLORS.navy}","padding":["80","40","80","40"],"minHeight":600,"verticalAlignment":"middle"} -->
<div class="wp-block-kadence-rowlayout alignnone">
<div class="kt-row-column-wrap kt-has-1-columns">

<!-- wp:kadence/column {"id":1,"uniqueID":"hero-col"} -->
<div class="wp-block-kadence-column kadence-column">
<div class="kt-inside-inner-col" style="text-align:center;">

<!-- wp:heading {"level":1,"style":{"typography":{"fontSize":"48px","fontWeight":"700"}},"textColor":"white"} -->
<h1 class="wp-block-heading has-white-color has-text-color" style="font-size:48px;font-weight:700">Virginia Beach Hydro-Excavation Services</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"20px"}},"textColor":"white"} -->
<p class="has-white-color has-text-color" style="font-size:20px">Local hydro-excavation specialist. High-volume production with mechanical boom precision.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"30px"}}}} -->
<div class="wp-block-buttons" style="margin-top:30px">

<!-- wp:button {"backgroundColor":"luminous-vivid-amber","textColor":"black","style":{"border":{"radius":"8px"},"typography":{"fontWeight":"600"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-black-color has-luminous-vivid-amber-background-color has-text-color has-background wp-element-button" style="border-radius:8px;font-weight:600">Our Services</a></div>
<!-- /wp:button -->

<!-- wp:button {"textColor":"white","style":{"border":{"radius":"8px","width":"2px"},"typography":{"fontWeight":"600"}},"borderColor":"white","className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link has-white-color has-text-color has-border-color has-white-border-color wp-element-button" style="border-radius:8px;border-width:2px;font-weight:600">Get a Quote</a></div>
<!-- /wp:button -->

</div>
<!-- /wp:buttons -->

</div>
</div>
<!-- /wp:kadence/column -->

</div>
</div>
<!-- /wp:kadence/rowlayout -->

<!-- wp:kadence/rowlayout {"uniqueID":"why-section","columns":3,"colLayout":"equal","bgColor":"${COLORS.white}","padding":["80","40","80","40"]} -->
<div class="wp-block-kadence-rowlayout alignnone">

<!-- wp:kadence/column {"id":1,"uniqueID":"why-col-1"} -->
<div class="wp-block-kadence-column kadence-column">
<div class="kt-inside-inner-col" style="text-align:center;padding:30px;">

<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"22px","fontWeight":"600"}},"textColor":"navy"} -->
<h3 class="wp-block-heading" style="font-size:22px;font-weight:600;color:${COLORS.navy}">Local Expertise</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"16px"}},"textColor":"gray"} -->
<p style="font-size:16px;color:${COLORS.grayDark}">Virginia Beach-based team with deep knowledge of local soil conditions and utility infrastructure.</p>
<!-- /wp:paragraph -->

</div>
</div>
<!-- /wp:kadence/column -->

<!-- wp:kadence/column {"id":2,"uniqueID":"why-col-2"} -->
<div class="wp-block-kadence-column kadence-column">
<div class="kt-inside-inner-col" style="text-align:center;padding:30px;">

<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"22px","fontWeight":"600"}}} -->
<h3 class="wp-block-heading" style="font-size:22px;font-weight:600;color:${COLORS.navy}">AIM Partnership</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"16px"}}} -->
<p style="font-size:16px;color:${COLORS.grayDark}">Integrated support with AIM for comprehensive utility locating and excavation services.</p>
<!-- /wp:paragraph -->

</div>
</div>
<!-- /wp:kadence/column -->

<!-- wp:kadence/column {"id":3,"uniqueID":"why-col-3"} -->
<div class="wp-block-kadence-column kadence-column">
<div class="kt-inside-inner-col" style="text-align:center;padding:30px;">

<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"22px","fontWeight":"600"}}} -->
<h3 class="wp-block-heading" style="font-size:22px;font-weight:600;color:${COLORS.navy}">Damage Prevention</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"16px"}}} -->
<p style="font-size:16px;color:${COLORS.grayDark}">Non-destructive excavation that protects underground utilities from costly damage.</p>
<!-- /wp:paragraph -->

</div>
</div>
<!-- /wp:kadence/column -->

</div>
<!-- /wp:kadence/rowlayout -->

<!-- wp:kadence/rowlayout {"uniqueID":"services-section","columns":1,"bgColor":"${COLORS.gray}","padding":["80","40","40","40"]} -->
<div class="wp-block-kadence-rowlayout alignnone">
<div class="kt-row-column-wrap kt-has-1-columns">

<!-- wp:kadence/column {"id":1} -->
<div class="wp-block-kadence-column kadence-column">
<div class="kt-inside-inner-col" style="text-align:center;">

<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"36px","fontWeight":"700"}}} -->
<h2 class="wp-block-heading" style="font-size:36px;font-weight:700;color:${COLORS.navy}">Specialized Services</h2>
<!-- /wp:heading -->

</div>
</div>
<!-- /wp:kadence/column -->

</div>
</div>
<!-- /wp:kadence/rowlayout -->

<!-- wp:kadence/rowlayout {"uniqueID":"services-grid","columns":4,"colLayout":"equal","bgColor":"${COLORS.gray}","padding":["0","40","80","40"]} -->
<div class="wp-block-kadence-rowlayout alignnone">

<!-- wp:kadence/column {"id":1} -->
<div class="wp-block-kadence-column kadence-column">
<div class="kt-inside-inner-col" style="background:white;padding:30px;border-radius:12px;text-align:center;">

<!-- wp:heading {"level":4,"style":{"typography":{"fontSize":"18px","fontWeight":"600"}}} -->
<h4 style="font-size:18px;font-weight:600;color:${COLORS.navy}">Potholing/Daylighting</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"14px"}}} -->
<p style="font-size:14px;color:${COLORS.grayDark}">SUE Level A verification. Expose utilities safely for accurate documentation.</p>
<!-- /wp:paragraph -->

</div>
</div>
<!-- /wp:kadence/column -->

<!-- wp:kadence/column {"id":2} -->
<div class="wp-block-kadence-column kadence-column">
<div class="kt-inside-inner-col" style="background:white;padding:30px;border-radius:12px;text-align:center;">

<!-- wp:heading {"level":4,"style":{"typography":{"fontSize":"18px","fontWeight":"600"}}} -->
<h4 style="font-size:18px;font-weight:600;color:${COLORS.navy}">Slot Trenching</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"14px"}}} -->
<p style="font-size:14px;color:${COLORS.grayDark}">Narrow, precise trenches for utility installation with minimal surface disruption.</p>
<!-- /wp:paragraph -->

</div>
</div>
<!-- /wp:kadence/column -->

<!-- wp:kadence/column {"id":3} -->
<div class="wp-block-kadence-column kadence-column">
<div class="kt-inside-inner-col" style="background:white;padding:30px;border-radius:12px;text-align:center;">

<!-- wp:heading {"level":4,"style":{"typography":{"fontSize":"18px","fontWeight":"600"}}} -->
<h4 style="font-size:18px;font-weight:600;color:${COLORS.navy}">Remote Excavation</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"14px"}}} -->
<p style="font-size:14px;color:${COLORS.grayDark}">600ft hose reach for hard-to-access areas and confined spaces.</p>
<!-- /wp:paragraph -->

</div>
</div>
<!-- /wp:kadence/column -->

<!-- wp:kadence/column {"id":4} -->
<div class="wp-block-kadence-column kadence-column">
<div class="kt-inside-inner-col" style="background:white;padding:30px;border-radius:12px;text-align:center;">

<!-- wp:heading {"level":4,"style":{"typography":{"fontSize":"18px","fontWeight":"600"}}} -->
<h4 style="font-size:18px;font-weight:600;color:${COLORS.navy}">SUE Level A</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"14px"}}} -->
<p style="font-size:14px;color:${COLORS.grayDark}">Highest accuracy utility verification meeting ASCE 38-02 standards.</p>
<!-- /wp:paragraph -->

</div>
</div>
<!-- /wp:kadence/column -->

</div>
<!-- /wp:kadence/rowlayout -->

<!-- wp:kadence/rowlayout {"uniqueID":"capabilities-section","columns":4,"colLayout":"equal","bgColor":"${COLORS.navy}","padding":["80","40","80","40"]} -->
<div class="wp-block-kadence-rowlayout alignnone">

<!-- wp:kadence/column {"id":1} -->
<div class="wp-block-kadence-column kadence-column">
<div class="kt-inside-inner-col" style="text-align:center;">

<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"36px","fontWeight":"700"}},"textColor":"white"} -->
<h3 style="font-size:36px;font-weight:700;color:${COLORS.gold}">3000</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"textColor":"white"} -->
<p style="color:white">PSI Water System</p>
<!-- /wp:paragraph -->

</div>
</div>
<!-- /wp:kadence/column -->

<!-- wp:kadence/column {"id":2} -->
<div class="wp-block-kadence-column kadence-column">
<div class="kt-inside-inner-col" style="text-align:center;">

<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"36px","fontWeight":"700"}}} -->
<h3 style="font-size:36px;font-weight:700;color:${COLORS.gold}">5000+</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p style="color:white">CFM Vacuum Power</p>
<!-- /wp:paragraph -->

</div>
</div>
<!-- /wp:kadence/column -->

<!-- wp:kadence/column {"id":3} -->
<div class="wp-block-kadence-column kadence-column">
<div class="kt-inside-inner-col" style="text-align:center;">

<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"36px","fontWeight":"700"}}} -->
<h3 style="font-size:36px;font-weight:700;color:${COLORS.gold}">600</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p style="color:white">Ft Hose Reach</p>
<!-- /wp:paragraph -->

</div>
</div>
<!-- /wp:kadence/column -->

<!-- wp:kadence/column {"id":4} -->
<div class="wp-block-kadence-column kadence-column">
<div class="kt-inside-inner-col" style="text-align:center;">

<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"36px","fontWeight":"700"}}} -->
<h3 style="font-size:36px;font-weight:700;color:${COLORS.gold}">360°</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p style="color:white">Boom Precision</p>
<!-- /wp:paragraph -->

</div>
</div>
<!-- /wp:kadence/column -->

</div>
<!-- /wp:kadence/rowlayout -->

<!-- wp:kadence/rowlayout {"uniqueID":"veteran-section","columns":1,"bgColor":"${COLORS.white}","padding":["80","40","80","40"]} -->
<div class="wp-block-kadence-rowlayout alignnone">
<div class="kt-row-column-wrap kt-has-1-columns">

<!-- wp:kadence/column {"id":1} -->
<div class="wp-block-kadence-column kadence-column">
<div class="kt-inside-inner-col" style="text-align:center;max-width:800px;margin:0 auto;">

<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"36px","fontWeight":"700"}}} -->
<h2 style="font-size:36px;font-weight:700;color:${COLORS.navy}">Veteran-Owned & Operated</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"18px"}}} -->
<p style="font-size:18px;color:${COLORS.grayDark}">We bring military discipline and attention to detail to every hydro-excavation project. Proudly serving Virginia Beach, Norfolk, Chesapeake, Hampton Roads, and surrounding areas.</p>
<!-- /wp:paragraph -->

<!-- wp:html -->
<div style="display:inline-block;background:linear-gradient(135deg,#B91C1C,#DC2626);color:white;padding:12px 24px;border-radius:8px;font-weight:600;margin-top:20px;">🎖️ Veteran Owned Business</div>
<!-- /wp:html -->

</div>
</div>
<!-- /wp:kadence/column -->

</div>
</div>
<!-- /wp:kadence/rowlayout -->

<!-- wp:kadence/rowlayout {"uniqueID":"cta-section","columns":1,"bgColor":"${COLORS.gold}","padding":["60","40","60","40"]} -->
<div class="wp-block-kadence-rowlayout alignnone">
<div class="kt-row-column-wrap kt-has-1-columns">

<!-- wp:kadence/column {"id":1} -->
<div class="wp-block-kadence-column kadence-column">
<div class="kt-inside-inner-col" style="text-align:center;">

<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"32px","fontWeight":"700"}}} -->
<h2 style="font-size:32px;font-weight:700;color:${COLORS.navy}">Ready to Start Your Project?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"18px"}}} -->
<p style="font-size:18px;color:${COLORS.navyDark}">Contact us today for a free consultation and quote.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"20px"}}}} -->
<div class="wp-block-buttons" style="margin-top:20px">

<!-- wp:button {"style":{"border":{"radius":"8px"},"typography":{"fontWeight":"600"},"color":{"background":"${COLORS.navy}","text":"${COLORS.white}"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" style="border-radius:8px;font-weight:600;background-color:${COLORS.navy};color:${COLORS.white}">📞 (757) 555-0123</a></div>
<!-- /wp:button -->

<!-- wp:button {"style":{"border":{"radius":"8px","width":"2px"},"typography":{"fontWeight":"600"},"color":{"text":"${COLORS.navy}"}},"className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" style="border-radius:8px;border-width:2px;font-weight:600;color:${COLORS.navy}">Request Quote</a></div>
<!-- /wp:button -->

</div>
<!-- /wp:buttons -->

</div>
</div>
<!-- /wp:kadence/column -->

</div>
</div>
<!-- /wp:kadence/rowlayout -->
`;

async function rebuildHomepage() {
  try {
    console.log('🏗️  REBUILDING BEACHHYDROVAC HOMEPAGE\n');
    console.log('='.repeat(50));

    // First, get the homepage ID
    console.log('\n📝 Finding homepage...');
    const pagesRes = await axios.get(
      `${WP_URL}/wp-json/wp/v2/pages?per_page=50`,
      { auth: { username: WP_USER, password: WP_APP_PASSWORD } }
    );

    let homepageId = null;
    for (const page of pagesRes.data) {
      if (page.slug === 'home' || page.title.rendered.toLowerCase().includes('home')) {
        homepageId = page.id;
        console.log(`✅ Found homepage: ID ${homepageId} (${page.title.rendered})`);
        break;
      }
    }

    if (!homepageId) {
      // Create new homepage
      console.log('📝 Creating new homepage...');
      const newPage = await axios.post(
        `${WP_URL}/wp-json/wp/v2/pages`,
        {
          title: 'Home',
          slug: 'home',
          status: 'publish',
          content: homepageContent
        },
        { auth: { username: WP_USER, password: WP_APP_PASSWORD } }
      );
      homepageId = newPage.data.id;
      console.log(`✅ Created homepage: ID ${homepageId}`);
    } else {
      // Update existing homepage
      console.log('\n🔄 Updating homepage content...');
      await axios.post(
        `${WP_URL}/wp-json/wp/v2/pages/${homepageId}`,
        {
          content: homepageContent,
          status: 'publish'
        },
        { auth: { username: WP_USER, password: WP_APP_PASSWORD } }
      );
      console.log('✅ Homepage updated!');
    }

    console.log('\n' + '='.repeat(50));
    console.log('🎉 REBUILD COMPLETE!\n');

    console.log('📊 Sections created:');
    console.log('   ✅ Hero - Navy gradient with CTA buttons');
    console.log('   ✅ Why BeachHydrovac - 3 value props');
    console.log('   ✅ Services - 4 service cards');
    console.log('   ✅ Capabilities - Stats bar (3000 PSI, etc)');
    console.log('   ✅ Veteran-Owned - Mission statement');
    console.log('   ✅ CTA - Gold background with contact');

    console.log('\n🔗 View: https://beachhydrovac.com/');
    console.log('🔗 Edit: https://beachhydrovac.com/wp-admin/');

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

rebuildHomepage();
