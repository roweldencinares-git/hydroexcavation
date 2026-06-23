import axios from 'axios';

const WP_URL = 'https://beachhydrovac.com';
const USERNAME = 'rdenci_16';
const APP_PASSWORD = '0L9x p2O7 tdfs khVJ UFyl 1UZk';

const auth = Buffer.from(`${USERNAME}:${APP_PASSWORD}`).toString('base64');

// Custom CSS to add to WordPress
const customCSS = `
<style>
/* BeachHydrovac Custom Styles */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Montserrat:wght@600;700&family=Roboto:wght@400;500&display=swap');

:root {
  --deep-navy: #1a365d;
  --golden-sun: #f7bb14;
  --golden-light: #ffd65a;
}

.font-inter { font-family: 'Inter', sans-serif !important; }
.font-montserrat { font-family: 'Montserrat', sans-serif !important; }
.font-roboto { font-family: 'Roboto', sans-serif !important; }

.deep-navy { color: #1a365d !important; }
.golden-sun { color: #f7bb14 !important; }
.bg-deep-navy { background-color: #1a365d !important; }
.bg-golden-sun { background-color: #f7bb14 !important; }

.hero-text-shadow {
  text-shadow: 0 2px 4px rgba(0,0,0,0.5), 0 4px 8px rgba(0,0,0,0.4), 0 8px 16px rgba(0,0,0,0.3);
}

.golden-gradient {
  background: linear-gradient(135deg, #f7bb14 0%, #ffd65a 100%) !important;
}

.veteran-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #B91C1C 0%, #DC2626 100%);
  color: white;
  padding: 6px 16px;
  border-radius: 9999px;
  font-weight: bold;
  font-size: 0.85rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.card-navy-border {
  border-top: 4px solid #1a365d !important;
  border-radius: 12px !important;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
}

.card-gold-border {
  border-top: 4px solid #f7bb14 !important;
  border-radius: 12px !important;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
}

.icon-circle {
  width: 48px;
  height: 48px;
  background: rgba(247, 187, 20, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-circle-lg {
  width: 64px;
  height: 64px;
  background: rgba(247, 187, 20, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background-color: #f7bb14 !important;
  color: white !important;
  padding: 16px 32px !important;
  border-radius: 9999px !important;
  font-weight: bold !important;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
  transition: all 0.3s ease !important;
}

.btn-primary:hover {
  background-color: #1a365d !important;
}

.btn-secondary {
  background-color: white !important;
  color: #1a365d !important;
  padding: 16px 32px !important;
  border-radius: 9999px !important;
  font-weight: bold !important;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
  transition: all 0.3s ease !important;
}

.btn-secondary:hover {
  background-color: #f7bb14 !important;
  color: white !important;
}

.service-area-box {
  background: #1a365d;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 25px 50px rgba(0,0,0,0.25);
}

.capability-card {
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.check-icon {
  color: #f7bb14;
  margin-right: 12px;
}

.section-padding {
  padding: 80px 0;
}

/* Responsive adjustments */
@media (max-width: 782px) {
  .hero-heading { font-size: 36px !important; }
  .section-heading { font-size: 28px !important; }
}
</style>
`;

// Build the content with native Gutenberg blocks
const pageContent = `
${customCSS}

<!-- wp:html -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
<!-- /wp:html -->

<!-- HERO SECTION -->
<!-- wp:cover {"url":"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80","dimRatio":60,"overlayColor":"black","minHeight":600,"align":"full","style":{"spacing":{"padding":{"top":"120px","bottom":"120px"}}}} -->
<div class="wp-block-cover alignfull" style="min-height:600px;padding-top:120px;padding-bottom:120px"><span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-60 has-background-dim"></span><img class="wp-block-cover__image-background" alt="" src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&amp;q=80" data-object-fit="cover"/><div class="wp-block-cover__inner-container">

<!-- wp:group {"style":{"spacing":{"blockGap":"24px"}},"layout":{"type":"constrained","contentSize":"900px"}} -->
<div class="wp-block-group">

<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"56px","fontStyle":"normal","fontWeight":"900","lineHeight":"1.1"}},"className":"font-inter hero-text-shadow"} -->
<h1 class="wp-block-heading has-text-align-center font-inter hero-text-shadow" style="font-size:56px;font-style:normal;font-weight:900;line-height:1.1">Virginia Beach <span class="golden-sun">Hydro-Excavation</span> Services</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"22px","lineHeight":"1.6"}},"className":"font-roboto hero-text-shadow"} -->
<p class="has-text-align-center font-roboto hero-text-shadow" style="font-size:22px;line-height:1.6">Local hydro-excavation specialist. High-volume production with mechanical boom precision.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"40px"}}}} -->
<div class="wp-block-buttons" style="margin-top:40px">

<!-- wp:button {"className":"btn-secondary","style":{"border":{"radius":"9999px"},"typography":{"fontSize":"18px","fontStyle":"normal","fontWeight":"700"}}} -->
<div class="wp-block-button btn-secondary" style="font-size:18px;font-style:normal;font-weight:700"><a class="wp-block-button__link" style="border-radius:9999px">Our Services</a></div>
<!-- /wp:button -->

<!-- wp:button {"className":"btn-primary","style":{"border":{"radius":"9999px"},"typography":{"fontSize":"18px","fontStyle":"normal","fontWeight":"700"}}} -->
<div class="wp-block-button btn-primary" style="font-size:18px;font-style:normal;font-weight:700"><a class="wp-block-button__link" style="border-radius:9999px">Get A Quote</a></div>
<!-- /wp:button -->

</div>
<!-- /wp:buttons -->

</div>
<!-- /wp:group -->

</div></div>
<!-- /wp:cover -->

<!-- WHY BEACHHYDROVAC SECTION -->
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"80px","bottom":"80px","left":"24px","right":"24px"}},"color":{"background":"#ffffff"}},"layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group alignfull has-background" style="background-color:#ffffff;padding-top:80px;padding-right:24px;padding-bottom:80px;padding-left:24px">

<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"42px","fontStyle":"normal","fontWeight":"900"}},"className":"font-inter deep-navy"} -->
<h2 class="wp-block-heading has-text-align-center font-inter deep-navy" style="font-size:42px;font-style:normal;font-weight:900">Why BeachHydrovac?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"18px","lineHeight":"1.7"},"spacing":{"margin":{"bottom":"48px"}}},"className":"deep-navy"} -->
<p class="has-text-align-center deep-navy" style="font-size:18px;line-height:1.7;margin-bottom:48px">We combine <strong>advanced hydro-excavation technology</strong> with the responsiveness and expertise of a local Virginia Beach team.</p>
<!-- /wp:paragraph -->

<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"32px"}}}} -->
<div class="wp-block-columns">

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"32px","bottom":"32px","left":"32px","right":"32px"}},"border":{"radius":"12px"}},"className":"card-navy-border","backgroundColor":"white"} -->
<div class="wp-block-group card-navy-border has-white-background-color has-background" style="border-radius:12px;padding-top:32px;padding-right:32px;padding-bottom:32px;padding-left:32px">

<!-- wp:html -->
<div style="text-align:center;margin-bottom:16px;">
<i class="fas fa-map-marker-alt" style="font-size:48px;color:#1a365d;"></i>
</div>
<!-- /wp:html -->

<!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"22px","fontStyle":"normal","fontWeight":"700"}},"className":"font-montserrat deep-navy"} -->
<h3 class="wp-block-heading has-text-align-center font-montserrat deep-navy" style="font-size:22px;font-style:normal;font-weight:700">Virginia Beach Based</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"lineHeight":"1.7"}},"className":"deep-navy"} -->
<p class="has-text-align-center deep-navy" style="line-height:1.7">Local business committed to serving our Hampton Roads community with integrity and precision.</p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"32px","bottom":"32px","left":"32px","right":"32px"}},"border":{"radius":"12px"}},"className":"card-gold-border","backgroundColor":"white"} -->
<div class="wp-block-group card-gold-border has-white-background-color has-background" style="border-radius:12px;padding-top:32px;padding-right:32px;padding-bottom:32px;padding-left:32px">

<!-- wp:html -->
<div style="text-align:center;margin-bottom:16px;">
<i class="fas fa-handshake" style="font-size:48px;color:#f7bb14;"></i>
</div>
<!-- /wp:html -->

<!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"22px","fontStyle":"normal","fontWeight":"700"}},"className":"font-montserrat deep-navy"} -->
<h3 class="wp-block-heading has-text-align-center font-montserrat deep-navy" style="font-size:22px;font-style:normal;font-weight:700">AIM Partnership</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"lineHeight":"1.7"}},"className":"deep-navy"} -->
<p class="has-text-align-center deep-navy" style="line-height:1.7">Combined "Map First, Dig Second" workflow eliminates the blame game between locator and excavator.</p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"32px","bottom":"32px","left":"32px","right":"32px"}},"border":{"radius":"12px"}},"className":"card-gold-border","backgroundColor":"white"} -->
<div class="wp-block-group card-gold-border has-white-background-color has-background" style="border-radius:12px;padding-top:32px;padding-right:32px;padding-bottom:32px;padding-left:32px">

<!-- wp:html -->
<div style="text-align:center;margin-bottom:16px;">
<i class="fas fa-shield-alt" style="font-size:48px;color:#f7bb14;"></i>
</div>
<!-- /wp:html -->

<!-- wp:heading {"textAlign":"center","level":3,"style":{"typography":{"fontSize":"22px","fontStyle":"normal","fontWeight":"700"}},"className":"font-montserrat deep-navy"} -->
<h3 class="wp-block-heading has-text-align-center font-montserrat deep-navy" style="font-size:22px;font-style:normal;font-weight:700">Damage Prevention</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"lineHeight":"1.7"}},"className":"deep-navy"} -->
<p class="has-text-align-center deep-navy" style="line-height:1.7">Surgical precision protects underground utilities from damage during excavation.</p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->

</div>
<!-- /wp:columns -->

</div>
<!-- /wp:group -->

<!-- SERVICES SECTION -->
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"80px","bottom":"80px","left":"24px","right":"24px"}},"color":{"background":"#f9fafb"}},"layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group alignfull has-background" style="background-color:#f9fafb;padding-top:80px;padding-right:24px;padding-bottom:80px;padding-left:24px">

<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"42px","fontStyle":"normal","fontWeight":"900"},"spacing":{"margin":{"bottom":"48px"}}},"className":"font-inter deep-navy"} -->
<h2 class="wp-block-heading has-text-align-center font-inter deep-navy" style="font-size:42px;font-style:normal;font-weight:900;margin-bottom:48px">Specialized Hydro-Excavation Services</h2>
<!-- /wp:heading -->

<!-- wp:columns {"style":{"spacing":{"blockGap":{"top":"32px","left":"48px"}}}} -->
<div class="wp-block-columns">

<!-- wp:column -->
<div class="wp-block-column">

<!-- wp:group {"style":{"spacing":{"padding":{"top":"0","bottom":"24px"}}},"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
<div class="wp-block-group" style="padding-top:0;padding-bottom:24px">

<!-- wp:html -->
<div class="icon-circle"><i class="fas fa-eye" style="font-size:20px;color:#f7bb14;"></i></div>
<!-- /wp:html -->

<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">

<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"20px","fontStyle":"normal","fontWeight":"700"}},"className":"font-montserrat deep-navy"} -->
<h3 class="wp-block-heading font-montserrat deep-navy" style="font-size:20px;font-style:normal;font-weight:700">Potholing / Daylighting</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"lineHeight":"1.7"}},"className":"deep-navy"} -->
<p class="deep-navy" style="line-height:1.7">The process of uncovering an underground utility using high-pressure water and vacuum for SUE Level A verification.</p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"0","bottom":"24px"}}},"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
<div class="wp-block-group" style="padding-top:0;padding-bottom:24px">

<!-- wp:html -->
<div class="icon-circle"><i class="fas fa-arrows-alt" style="font-size:20px;color:#f7bb14;"></i></div>
<!-- /wp:html -->

<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">

<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"20px","fontStyle":"normal","fontWeight":"700"}},"className":"font-montserrat deep-navy"} -->
<h3 class="wp-block-heading font-montserrat deep-navy" style="font-size:20px;font-style:normal;font-weight:700">Remote Excavation</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"lineHeight":"1.7"}},"className":"deep-navy"} -->
<p class="deep-navy" style="line-height:1.7">Utilizing the truck's 600ft hose reach for restricted-access environments.</p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">

<!-- wp:group {"style":{"spacing":{"padding":{"top":"0","bottom":"24px"}}},"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
<div class="wp-block-group" style="padding-top:0;padding-bottom:24px">

<!-- wp:html -->
<div class="icon-circle"><i class="fas fa-grip-lines" style="font-size:20px;color:#f7bb14;"></i></div>
<!-- /wp:html -->

<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">

<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"20px","fontStyle":"normal","fontWeight":"700"}},"className":"font-montserrat deep-navy"} -->
<h3 class="wp-block-heading font-montserrat deep-navy" style="font-size:20px;font-style:normal;font-weight:700">Slot Trenching</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"lineHeight":"1.7"}},"className":"deep-navy"} -->
<p class="deep-navy" style="line-height:1.7">Creating narrow trenches for pipes/cables that require minimal backfill and restoration.</p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"0","bottom":"24px"}}},"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
<div class="wp-block-group" style="padding-top:0;padding-bottom:24px">

<!-- wp:html -->
<div class="icon-circle"><i class="fas fa-certificate" style="font-size:20px;color:#f7bb14;"></i></div>
<!-- /wp:html -->

<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">

<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"20px","fontStyle":"normal","fontWeight":"700"}},"className":"font-montserrat deep-navy"} -->
<h3 class="wp-block-heading font-montserrat deep-navy" style="font-size:20px;font-style:normal;font-weight:700">SUE Level A Verification</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"lineHeight":"1.7"}},"className":"deep-navy"} -->
<p class="deep-navy" style="line-height:1.7">Providing the highest level of subsurface utility accuracy for engineering records.</p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:column -->

</div>
<!-- /wp:columns -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"40px"}}}} -->
<div class="wp-block-buttons" style="margin-top:40px">

<!-- wp:button {"className":"btn-primary","style":{"border":{"radius":"9999px"},"typography":{"fontSize":"18px","fontStyle":"normal","fontWeight":"700"}}} -->
<div class="wp-block-button btn-primary" style="font-size:18px;font-style:normal;font-weight:700"><a class="wp-block-button__link" style="border-radius:9999px">View All Services</a></div>
<!-- /wp:button -->

</div>
<!-- /wp:buttons -->

</div>
<!-- /wp:group -->

<!-- CAPABILITIES SECTION (Navy Background) -->
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"80px","bottom":"80px","left":"24px","right":"24px"}},"color":{"background":"#1a365d"}},"layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group alignfull has-background" style="background-color:#1a365d;padding-top:80px;padding-right:24px;padding-bottom:80px;padding-left:24px">

<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"42px","fontStyle":"normal","fontWeight":"900"},"elements":{"link":{"color":{"text":"#ffffff"}}}},"textColor":"white","className":"font-inter"} -->
<h2 class="wp-block-heading has-text-align-center font-inter has-white-color has-text-color has-link-color" style="font-size:42px;font-style:normal;font-weight:900">Professional Capabilities</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"20px","fontStyle":"normal","fontWeight":"600"}},"className":"font-montserrat golden-sun"} -->
<p class="has-text-align-center font-montserrat golden-sun" style="font-size:20px;font-style:normal;font-weight:600">Industrial-Grade Equipment</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"16px"},"spacing":{"margin":{"bottom":"48px"}},"elements":{"link":{"color":{"text":"#e5e7eb"}}}},"textColor":"white"} -->
<p class="has-text-align-center has-white-color has-text-color has-link-color" style="font-size:16px;margin-bottom:48px">We've upgraded to industrial-grade vacuum trucks with unmatched capacity and reach.</p>
<!-- /wp:paragraph -->

<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"24px"}}}} -->
<div class="wp-block-columns">

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"32px","bottom":"32px","left":"32px","right":"32px"}},"border":{"radius":"12px"}},"backgroundColor":"white","className":"capability-card"} -->
<div class="wp-block-group capability-card has-white-background-color has-background" style="border-radius:12px;padding-top:32px;padding-right:32px;padding-bottom:32px;padding-left:32px">

<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
<div class="wp-block-group">

<!-- wp:html -->
<div class="icon-circle-lg"><i class="fas fa-water" style="font-size:24px;color:#f7bb14;"></i></div>
<!-- /wp:html -->

<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">

<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"20px","fontStyle":"normal","fontWeight":"700"}},"className":"font-montserrat deep-navy"} -->
<h3 class="wp-block-heading font-montserrat deep-navy" style="font-size:20px;font-style:normal;font-weight:700">High-Pressure Water System</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"lineHeight":"1.7"}},"className":"deep-navy"} -->
<p class="deep-navy" style="line-height:1.7">3000 PSI capacity for breaking through compacted soil and around delicate utilities.</p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"32px","bottom":"32px","left":"32px","right":"32px"}},"border":{"radius":"12px"}},"backgroundColor":"white","className":"capability-card"} -->
<div class="wp-block-group capability-card has-white-background-color has-background" style="border-radius:12px;padding-top:32px;padding-right:32px;padding-bottom:32px;padding-left:32px">

<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
<div class="wp-block-group">

<!-- wp:html -->
<div class="icon-circle-lg"><i class="fas fa-wind" style="font-size:24px;color:#f7bb14;"></i></div>
<!-- /wp:html -->

<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">

<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"20px","fontStyle":"normal","fontWeight":"700"}},"className":"font-montserrat deep-navy"} -->
<h3 class="wp-block-heading font-montserrat deep-navy" style="font-size:20px;font-style:normal;font-weight:700">Industrial Vacuum Power</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"lineHeight":"1.7"}},"className":"deep-navy"} -->
<p class="deep-navy" style="line-height:1.7">High-volume debris tank with powerful suction for efficient material removal.</p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->

</div>
<!-- /wp:columns -->

<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"24px"},"margin":{"top":"24px"}}}} -->
<div class="wp-block-columns" style="margin-top:24px">

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"32px","bottom":"32px","left":"32px","right":"32px"}},"border":{"radius":"12px"}},"backgroundColor":"white","className":"capability-card"} -->
<div class="wp-block-group capability-card has-white-background-color has-background" style="border-radius:12px;padding-top:32px;padding-right:32px;padding-bottom:32px;padding-left:32px">

<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
<div class="wp-block-group">

<!-- wp:html -->
<div class="icon-circle-lg"><i class="fas fa-ruler-combined" style="font-size:24px;color:#f7bb14;"></i></div>
<!-- /wp:html -->

<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">

<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"20px","fontStyle":"normal","fontWeight":"700"}},"className":"font-montserrat deep-navy"} -->
<h3 class="wp-block-heading font-montserrat deep-navy" style="font-size:20px;font-style:normal;font-weight:700">600ft Hose Reach</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"lineHeight":"1.7"}},"className":"deep-navy"} -->
<p class="deep-navy" style="line-height:1.7">Extended reach capability for remote or restricted-access locations.</p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"32px","bottom":"32px","left":"32px","right":"32px"}},"border":{"radius":"12px"}},"backgroundColor":"white","className":"capability-card"} -->
<div class="wp-block-group capability-card has-white-background-color has-background" style="border-radius:12px;padding-top:32px;padding-right:32px;padding-bottom:32px;padding-left:32px">

<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
<div class="wp-block-group">

<!-- wp:html -->
<div class="icon-circle-lg"><i class="fas fa-truck" style="font-size:24px;color:#f7bb14;"></i></div>
<!-- /wp:html -->

<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">

<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"20px","fontStyle":"normal","fontWeight":"700"}},"className":"font-montserrat deep-navy"} -->
<h3 class="wp-block-heading font-montserrat deep-navy" style="font-size:20px;font-style:normal;font-weight:700">Mechanical Boom System</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"lineHeight":"1.7"}},"className":"deep-navy"} -->
<p class="deep-navy" style="line-height:1.7">Precision control for targeted excavation in tight spaces.</p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->

</div>
<!-- /wp:columns -->

</div>
<!-- /wp:group -->

<!-- VETERAN OWNED SECTION -->
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"80px","bottom":"80px","left":"24px","right":"24px"}},"color":{"background":"#ffffff"}},"layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group alignfull has-background" style="background-color:#ffffff;padding-top:80px;padding-right:24px;padding-bottom:80px;padding-left:24px">

<!-- wp:columns {"verticalAlignment":"center","style":{"spacing":{"blockGap":{"left":"64px"}}}} -->
<div class="wp-block-columns are-vertically-aligned-center">

<!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center">

<!-- wp:html -->
<div class="veteran-badge" style="margin-bottom:16px;">
<i class="fas fa-flag-usa"></i>
<span>VETERAN OWNED</span>
</div>
<!-- /wp:html -->

<!-- wp:heading {"style":{"typography":{"fontSize":"42px","fontStyle":"normal","fontWeight":"900","lineHeight":"1.2"}},"className":"font-inter deep-navy"} -->
<h2 class="wp-block-heading font-inter deep-navy" style="font-size:42px;font-style:normal;font-weight:900;line-height:1.2">Built on Values of <span class="golden-sun">Service &amp; Precision</span></h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"18px","lineHeight":"1.7"}},"className":"deep-navy"} -->
<p class="deep-navy" style="font-size:18px;line-height:1.7">As a veteran-owned business, we bring military discipline and attention to detail to every project. Our commitment to excellence isn't just a slogan—it's how we operate every day.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"18px","lineHeight":"1.7"}},"className":"deep-navy"} -->
<p class="deep-navy" style="font-size:18px;line-height:1.7">Serving Virginia Beach, Norfolk, Chesapeake, and throughout Hampton Roads with the same dedication we brought to serving our country.</p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center">

<!-- wp:group {"style":{"spacing":{"padding":{"top":"32px","bottom":"32px","left":"32px","right":"32px"}},"border":{"radius":"16px"},"color":{"background":"#1a365d"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-background" style="background-color:#1a365d;border-radius:16px;padding-top:32px;padding-right:32px;padding-bottom:32px;padding-left:32px">

<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"24px","fontStyle":"normal","fontWeight":"700"}},"textColor":"white","className":"font-montserrat"} -->
<h3 class="wp-block-heading font-montserrat has-white-color has-text-color" style="font-size:24px;font-style:normal;font-weight:700">Our Service Area</h3>
<!-- /wp:heading -->

<!-- wp:html -->
<ul style="list-style:none;padding:0;margin:0;color:white;font-size:18px;line-height:2.2;">
<li><i class="fas fa-check-circle" style="color:#f7bb14;margin-right:12px;"></i>Virginia Beach & Hampton Roads</li>
<li><i class="fas fa-check-circle" style="color:#f7bb14;margin-right:12px;"></i>Norfolk, Chesapeake, Portsmouth</li>
<li><i class="fas fa-check-circle" style="color:#f7bb14;margin-right:12px;"></i>Richmond & Central Virginia</li>
<li><i class="fas fa-check-circle" style="color:#f7bb14;margin-right:12px;"></i>North Carolina, Maryland & Delaware</li>
</ul>
<!-- /wp:html -->

</div>
<!-- /wp:group -->

</div>
<!-- /wp:column -->

</div>
<!-- /wp:columns -->

</div>
<!-- /wp:group -->

<!-- CTA SECTION (Golden Gradient) -->
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"80px","bottom":"80px","left":"24px","right":"24px"}}},"className":"golden-gradient","layout":{"type":"constrained","contentSize":"900px"}} -->
<div class="wp-block-group alignfull golden-gradient" style="padding-top:80px;padding-right:24px;padding-bottom:80px;padding-left:24px">

<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"48px","fontStyle":"normal","fontWeight":"900"}},"textColor":"white","className":"font-inter"} -->
<h2 class="wp-block-heading has-text-align-center font-inter has-white-color has-text-color" style="font-size:48px;font-style:normal;font-weight:900">Ready to Start Your Project?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"20px","lineHeight":"1.6"},"spacing":{"margin":{"bottom":"32px"}}},"textColor":"white"} -->
<p class="has-text-align-center has-white-color has-text-color" style="font-size:20px;line-height:1.6;margin-bottom:32px">Get in touch with Beach Hydrovac today for a professional consultation and quote.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">

<!-- wp:button {"backgroundColor":"white","textColor":"black","style":{"border":{"radius":"9999px"},"typography":{"fontSize":"18px","fontStyle":"normal","fontWeight":"700"}}} -->
<div class="wp-block-button" style="font-size:18px;font-style:normal;font-weight:700"><a class="wp-block-button__link has-black-color has-white-background-color has-text-color has-background" href="tel:7577855177" style="border-radius:9999px"><i class="fas fa-phone" style="margin-right:8px;"></i>Call 757-785-5177</a></div>
<!-- /wp:button -->

<!-- wp:button {"style":{"border":{"radius":"9999px","width":"2px"},"typography":{"fontSize":"18px","fontStyle":"normal","fontWeight":"700"},"color":{"background":"#00000000","text":"#ffffff"}}} -->
<div class="wp-block-button" style="font-size:18px;font-style:normal;font-weight:700"><a class="wp-block-button__link has-text-color has-background" style="border-radius:9999px;border-width:2px;color:#ffffff;background-color:#00000000">Request Quote</a></div>
<!-- /wp:button -->

</div>
<!-- /wp:buttons -->

</div>
<!-- /wp:group -->

<!-- FOOTER SECTION -->
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"64px","bottom":"64px","left":"24px","right":"24px"}},"color":{"background":"#1a365d"}},"layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group alignfull has-background" style="background-color:#1a365d;padding-top:64px;padding-right:24px;padding-bottom:64px;padding-left:24px">

<!-- wp:columns -->
<div class="wp-block-columns">

<!-- wp:column -->
<div class="wp-block-column">

<!-- wp:heading {"level":4,"style":{"typography":{"fontSize":"20px","fontStyle":"normal","fontWeight":"700"}},"textColor":"white","className":"font-montserrat"} -->
<h4 class="wp-block-heading font-montserrat has-white-color has-text-color" style="font-size:20px;font-style:normal;font-weight:700">BeachHydrovac</h4>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"elements":{"link":{"color":{"text":"#e5e7eb"}}}},"textColor":"white"} -->
<p class="has-white-color has-text-color has-link-color">Professional hydro-excavation services for Virginia and surrounding states.</p>
<!-- /wp:paragraph -->

<!-- wp:html -->
<div class="veteran-badge" style="margin-top:16px;">
<i class="fas fa-flag-usa"></i>
<span>VETERAN OWNED</span>
</div>
<!-- /wp:html -->

</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">

<!-- wp:heading {"level":4,"style":{"typography":{"fontSize":"20px","fontStyle":"normal","fontWeight":"700"}},"textColor":"white","className":"font-montserrat"} -->
<h4 class="wp-block-heading font-montserrat has-white-color has-text-color" style="font-size:20px;font-style:normal;font-weight:700">Quick Links</h4>
<!-- /wp:heading -->

<!-- wp:html -->
<ul style="list-style:none;padding:0;margin:0;">
<li style="margin-bottom:8px;"><a href="/" style="color:#e5e7eb;text-decoration:none;">Home</a></li>
<li style="margin-bottom:8px;"><a href="/services" style="color:#e5e7eb;text-decoration:none;">Services</a></li>
<li style="margin-bottom:8px;"><a href="/about" style="color:#e5e7eb;text-decoration:none;">About</a></li>
<li style="margin-bottom:8px;"><a href="/contact" style="color:#e5e7eb;text-decoration:none;">Contact</a></li>
</ul>
<!-- /wp:html -->

</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">

<!-- wp:heading {"level":4,"style":{"typography":{"fontSize":"20px","fontStyle":"normal","fontWeight":"700"}},"textColor":"white","className":"font-montserrat"} -->
<h4 class="wp-block-heading font-montserrat has-white-color has-text-color" style="font-size:20px;font-style:normal;font-weight:700">Contact</h4>
<!-- /wp:heading -->

<!-- wp:html -->
<ul style="list-style:none;padding:0;margin:0;color:#e5e7eb;">
<li style="margin-bottom:8px;"><i class="fas fa-phone" style="margin-right:8px;color:#f7bb14;"></i> 757-785-5177</li>
<li style="margin-bottom:8px;"><i class="fas fa-map-marker-alt" style="margin-right:8px;color:#f7bb14;"></i> Virginia Beach, VA</li>
<li style="margin-bottom:8px;"><i class="fas fa-building" style="margin-right:8px;color:#f7bb14;"></i> A Division of AIM Locating</li>
</ul>
<!-- /wp:html -->

</div>
<!-- /wp:column -->

</div>
<!-- /wp:columns -->

<!-- wp:separator {"style":{"spacing":{"margin":{"top":"32px","bottom":"32px"}}},"backgroundColor":"white","className":"is-style-wide"} -->
<hr class="wp-block-separator has-text-color has-white-color has-alpha-channel-opacity has-white-background-color has-background is-style-wide" style="margin-top:32px;margin-bottom:32px"/>
<!-- /wp:separator -->

<!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"#f7bb14"}}}},"textColor":"white"} -->
<p class="has-text-align-center has-white-color has-text-color has-link-color">© 2026 BeachHydrovac. All rights reserved. A division of <a href="https://aimlocating.com" target="_blank">AIM Locating</a>.</p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->
`;

async function updateHomepage() {
  console.log('Updating BeachHydrovac homepage with exact design...\n');

  try {
    const response = await axios.put(
      `${WP_URL}/wp-json/wp/v2/pages/10`,
      {
        content: pageContent,
        status: 'publish'
      },
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Homepage updated successfully!');
    console.log(`📄 Page ID: ${response.data.id}`);
    console.log(`🔗 View: ${response.data.link}`);
    console.log('\n📋 Sections included:');
    console.log('   • Hero with background image');
    console.log('   • Why BeachHydrovac? (3 cards with icons)');
    console.log('   • Specialized Services (4 items with icons)');
    console.log('   • Professional Capabilities (navy bg, 4 white cards)');
    console.log('   • Veteran Owned (badge + service area box)');
    console.log('   • CTA (golden gradient)');
    console.log('   • Footer (3 columns)');

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

updateHomepage();
