import axios from 'axios';
const WP = 'https://beachhydrovac.com';
const auth = { username: 'rdenci_16', password: '0L9x p2O7 tdfs khVJ UFyl 1UZk' };

const content = `<!-- wp:cover {"customOverlayColor":"#1a365d","minHeight":500,"isDark":true,"align":"full"} -->
<div class="wp-block-cover alignfull is-dark" style="min-height:500px"><span aria-hidden="true" class="wp-block-cover__background has-background-dim-100 has-background-dim" style="background-color:#1a365d"></span><div class="wp-block-cover__inner-container"><!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"48px","fontWeight":"700"}},"textColor":"white"} -->
<h1 class="wp-block-heading has-text-align-center has-white-color has-text-color" style="font-size:48px;font-weight:700">Virginia Beach Hydro-Excavation Services</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"20px"}},"textColor":"white"} -->
<p class="has-text-align-center has-white-color has-text-color" style="font-size:20px">Local hydro-excavation specialist. High-volume production with mechanical boom precision.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"style":{"color":{"background":"#f7bb14","text":"#1a365d"},"border":{"radius":"8px"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-text-color has-background wp-element-button" href="/services/" style="border-radius:8px;color:#1a365d;background-color:#f7bb14">Our Services</a></div>
<!-- /wp:button -->

<!-- wp:button {"style":{"border":{"radius":"8px","width":"2px"},"color":{"text":"#ffffff"}},"className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link has-text-color wp-element-button" href="/contact/" style="border-radius:8px;border-width:2px;color:#ffffff">Get a Quote</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div></div>
<!-- /wp:cover -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"80px","bottom":"80px","left":"40px","right":"40px"}}},"backgroundColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-white-background-color has-background" style="padding-top:80px;padding-right:40px;padding-bottom:80px;padding-left:40px"><!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"22px","fontWeight":"600"},"color":{"text":"#1a365d"}}} -->
<h3 class="wp-block-heading has-text-align-center has-text-color" style="color:#1a365d;font-size:22px;font-weight:600">Local Expertise</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"color":{"text":"#64748b"}}} -->
<p class="has-text-align-center has-text-color" style="color:#64748b">Virginia Beach-based team with deep knowledge of local soil conditions and utility infrastructure.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"22px","fontWeight":"600"},"color":{"text":"#1a365d"}}} -->
<h3 class="wp-block-heading has-text-align-center has-text-color" style="color:#1a365d;font-size:22px;font-weight:600">AIM Partnership</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"color":{"text":"#64748b"}}} -->
<p class="has-text-align-center has-text-color" style="color:#64748b">Integrated support with AIM for comprehensive utility locating and excavation services.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"22px","fontWeight":"600"},"color":{"text":"#1a365d"}}} -->
<h3 class="wp-block-heading has-text-align-center has-text-color" style="color:#1a365d;font-size:22px;font-weight:600">Damage Prevention</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"color":{"text":"#64748b"}}} -->
<p class="has-text-align-center has-text-color" style="color:#64748b">Non-destructive excavation that protects underground utilities from costly damage.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"80px","bottom":"80px","left":"40px","right":"40px"}},"color":{"background":"#f8fafc"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-background" style="background-color:#f8fafc;padding-top:80px;padding-right:40px;padding-bottom:80px;padding-left:40px"><!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"36px","fontWeight":"700"},"color":{"text":"#1a365d"},"spacing":{"margin":{"bottom":"50px"}}}} -->
<h2 class="wp-block-heading has-text-align-center has-text-color" style="color:#1a365d;margin-bottom:50px;font-size:36px;font-weight:700">Specialized Services</h2>
<!-- /wp:heading -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column {"style":{"color":{"background":"#ffffff"},"border":{"radius":"12px"},"spacing":{"padding":{"top":"30px","bottom":"30px","left":"24px","right":"24px"}}}} -->
<div class="wp-block-column has-background" style="border-radius:12px;background-color:#ffffff;padding-top:30px;padding-right:24px;padding-bottom:30px;padding-left:24px"><!-- wp:heading {"textAlign":"center","level":4,"style":{"typography":{"fontSize":"18px","fontWeight":"600"},"color":{"text":"#1a365d"}}} -->
<h4 class="wp-block-heading has-text-align-center has-text-color" style="color:#1a365d;font-size:18px;font-weight:600">Potholing/Daylighting</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"14px"},"color":{"text":"#64748b"}}} -->
<p class="has-text-align-center has-text-color" style="color:#64748b;font-size:14px">SUE Level A verification. Expose utilities safely for accurate documentation.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column {"style":{"color":{"background":"#ffffff"},"border":{"radius":"12px"},"spacing":{"padding":{"top":"30px","bottom":"30px","left":"24px","right":"24px"}}}} -->
<div class="wp-block-column has-background" style="border-radius:12px;background-color:#ffffff;padding-top:30px;padding-right:24px;padding-bottom:30px;padding-left:24px"><!-- wp:heading {"textAlign":"center","level":4,"style":{"typography":{"fontSize":"18px","fontWeight":"600"},"color":{"text":"#1a365d"}}} -->
<h4 class="wp-block-heading has-text-align-center has-text-color" style="color:#1a365d;font-size:18px;font-weight:600">Slot Trenching</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"14px"},"color":{"text":"#64748b"}}} -->
<p class="has-text-align-center has-text-color" style="color:#64748b;font-size:14px">Narrow, precise trenches for utility installation with minimal disruption.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column {"style":{"color":{"background":"#ffffff"},"border":{"radius":"12px"},"spacing":{"padding":{"top":"30px","bottom":"30px","left":"24px","right":"24px"}}}} -->
<div class="wp-block-column has-background" style="border-radius:12px;background-color:#ffffff;padding-top:30px;padding-right:24px;padding-bottom:30px;padding-left:24px"><!-- wp:heading {"textAlign":"center","level":4,"style":{"typography":{"fontSize":"18px","fontWeight":"600"},"color":{"text":"#1a365d"}}} -->
<h4 class="wp-block-heading has-text-align-center has-text-color" style="color:#1a365d;font-size:18px;font-weight:600">Remote Excavation</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"14px"},"color":{"text":"#64748b"}}} -->
<p class="has-text-align-center has-text-color" style="color:#64748b;font-size:14px">600ft hose reach for hard-to-access areas and confined spaces.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column {"style":{"color":{"background":"#ffffff"},"border":{"radius":"12px"},"spacing":{"padding":{"top":"30px","bottom":"30px","left":"24px","right":"24px"}}}} -->
<div class="wp-block-column has-background" style="border-radius:12px;background-color:#ffffff;padding-top:30px;padding-right:24px;padding-bottom:30px;padding-left:24px"><!-- wp:heading {"textAlign":"center","level":4,"style":{"typography":{"fontSize":"18px","fontWeight":"600"},"color":{"text":"#1a365d"}}} -->
<h4 class="wp-block-heading has-text-align-center has-text-color" style="color:#1a365d;font-size:18px;font-weight:600">SUE Level A</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"14px"},"color":{"text":"#64748b"}}} -->
<p class="has-text-align-center has-text-color" style="color:#64748b;font-size:14px">Highest accuracy utility verification meeting ASCE 38-02 standards.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"60px","bottom":"60px","left":"40px","right":"40px"}},"color":{"background":"#1a365d"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-background" style="background-color:#1a365d;padding-top:60px;padding-right:40px;padding-bottom:60px;padding-left:40px"><!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"42px","fontWeight":"700"},"color":{"text":"#f7bb14"}}} -->
<h3 class="wp-block-heading has-text-align-center has-text-color" style="color:#f7bb14;font-size:42px;font-weight:700">3000</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","textColor":"white"} -->
<p class="has-text-align-center has-white-color has-text-color">PSI Water System</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"42px","fontWeight":"700"},"color":{"text":"#f7bb14"}}} -->
<h3 class="wp-block-heading has-text-align-center has-text-color" style="color:#f7bb14;font-size:42px;font-weight:700">5000+</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","textColor":"white"} -->
<p class="has-text-align-center has-white-color has-text-color">CFM Vacuum Power</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"42px","fontWeight":"700"},"color":{"text":"#f7bb14"}}} -->
<h3 class="wp-block-heading has-text-align-center has-text-color" style="color:#f7bb14;font-size:42px;font-weight:700">600</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","textColor":"white"} -->
<p class="has-text-align-center has-white-color has-text-color">Ft Hose Reach</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"42px","fontWeight":"700"},"color":{"text":"#f7bb14"}}} -->
<h3 class="wp-block-heading has-text-align-center has-text-color" style="color:#f7bb14;font-size:42px;font-weight:700">360°</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","textColor":"white"} -->
<p class="has-text-align-center has-white-color has-text-color">Boom Precision</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"80px","bottom":"80px","left":"40px","right":"40px"}}},"backgroundColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-white-background-color has-background" style="padding-top:80px;padding-right:40px;padding-bottom:80px;padding-left:40px"><!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"36px","fontWeight":"700"},"color":{"text":"#1a365d"}}} -->
<h2 class="wp-block-heading has-text-align-center has-text-color" style="color:#1a365d;font-size:36px;font-weight:700">Veteran-Owned & Operated</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"color":{"text":"#64748b"},"typography":{"fontSize":"18px"}}} -->
<p class="has-text-align-center has-text-color" style="color:#64748b;font-size:18px">We bring military discipline and attention to detail to every hydro-excavation project. Proudly serving Virginia Beach, Norfolk, Chesapeake, Hampton Roads, and surrounding areas.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"style":{"color":{"background":"#dc2626","text":"#ffffff"},"border":{"radius":"8px"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-text-color has-background wp-element-button" style="border-radius:8px;color:#ffffff;background-color:#dc2626">🎖️ Veteran Owned Business</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"60px","bottom":"60px","left":"40px","right":"40px"}},"color":{"background":"#f7bb14"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-background" style="background-color:#f7bb14;padding-top:60px;padding-right:40px;padding-bottom:60px;padding-left:40px"><!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"32px","fontWeight":"700"},"color":{"text":"#1a365d"}}} -->
<h2 class="wp-block-heading has-text-align-center has-text-color" style="color:#1a365d;font-size:32px;font-weight:700">Ready to Start Your Project?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"color":{"text":"#0f2744"},"typography":{"fontSize":"18px"}}} -->
<p class="has-text-align-center has-text-color" style="color:#0f2744;font-size:18px">Contact us today for a free consultation and quote.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"style":{"color":{"background":"#1a365d","text":"#ffffff"},"border":{"radius":"8px"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-text-color has-background wp-element-button" href="tel:7575550123" style="border-radius:8px;color:#ffffff;background-color:#1a365d">📞 Call Us</a></div>
<!-- /wp:button -->

<!-- wp:button {"style":{"border":{"radius":"8px","width":"2px"},"color":{"text":"#1a365d"}},"className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link has-text-color wp-element-button" href="/contact/" style="border-radius:8px;border-width:2px;color:#1a365d">Request Quote</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group -->`;

axios.post(WP + '/wp-json/wp/v2/pages/10', { content }, { auth })
  .then(r => console.log('✅ SUCCESS! Updated with native Gutenberg blocks\n\nView: https://beachhydrovac.com/'))
  .catch(e => console.log('❌ Error:', e.response?.data?.message || e.message));
