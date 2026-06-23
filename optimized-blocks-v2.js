import axios from 'axios';

const WP_URL = 'https://beachhydrovac.com';
const USERNAME = 'rdenci_16';
const APP_PASSWORD = '0L9x p2O7 tdfs khVJ UFyl 1UZk';
const auth = Buffer.from(`${USERNAME}:${APP_PASSWORD}`).toString('base64');

// OPTIMIZED PAGE CONTENT
// - Uses CSS classes from child theme (no inline styles where possible)
// - Reduced HTML blocks
// - CSS variables for colors
// - Reusable typography classes

const optimizedContent = `<!-- wp:html -->
<link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" media="print" onload="this.media='all'">
<noscript><link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet"></noscript>
<!-- /wp:html -->

<!-- HERO SECTION -->
<!-- wp:cover {"url":"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80","dimRatio":60,"overlayColor":"black","minHeight":650,"align":"full","className":"hero-section"} -->
<div class="wp-block-cover alignfull hero-section" style="min-height:650px"><span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-60 has-background-dim"></span><img class="wp-block-cover__image-background" alt="Beach Hydrovac Truck" src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80" data-object-fit="cover" loading="eager" fetchpriority="high"/><div class="wp-block-cover__inner-container">

<!-- wp:heading {"textAlign":"center","level":1,"className":"font-inter hero-text-shadow hero-heading text-white"} -->
<h1 class="wp-block-heading has-text-align-center font-inter hero-text-shadow hero-heading text-white">Virginia Beach <span class="golden-sun">Hydro-Excavation</span> Services</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","className":"hero-text-shadow text-white text-lg"} -->
<p class="has-text-align-center hero-text-shadow text-white text-lg">Local hydro-excavation specialist. High-volume production with mechanical boom precision.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"className":"hero-buttons"} -->
<div class="wp-block-buttons hero-buttons">
<!-- wp:button {"className":"btn-secondary"} -->
<div class="wp-block-button btn-secondary"><a class="wp-block-button__link wp-element-button" href="/services/">Our Services</a></div>
<!-- /wp:button -->
<!-- wp:button {"className":"btn-primary"} -->
<div class="wp-block-button btn-primary"><a class="wp-block-button__link wp-element-button" href="/contact/">Get A Quote</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->

</div></div>
<!-- /wp:cover -->

<!-- WHY BEACHHYDROVAC SECTION -->
<!-- wp:group {"align":"full","className":"section-white section-padding","layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group alignfull section-white section-padding">

<!-- wp:heading {"textAlign":"center","className":"font-inter deep-navy section-heading"} -->
<h2 class="wp-block-heading has-text-align-center font-inter deep-navy section-heading">Why BeachHydrovac?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","className":"deep-navy section-intro"} -->
<p class="has-text-align-center deep-navy section-intro">We combine <strong>advanced hydro-excavation technology</strong> with the responsiveness and expertise of a local Virginia Beach team.</p>
<!-- /wp:paragraph -->

<!-- wp:columns {"className":"card-grid"} -->
<div class="wp-block-columns card-grid">

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"className":"card-navy-border card-padding","backgroundColor":"white"} -->
<div class="wp-block-group card-navy-border card-padding has-white-background-color has-background">
<!-- wp:html -->
<div class="icon-center"><i class="fas fa-map-marker-alt icon-large deep-navy"></i></div>
<!-- /wp:html -->
<!-- wp:heading {"textAlign":"center","level":3,"className":"font-montserrat deep-navy card-title"} -->
<h3 class="wp-block-heading has-text-align-center font-montserrat deep-navy card-title">Virginia Beach Based</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","className":"deep-navy"} -->
<p class="has-text-align-center deep-navy">Local business committed to serving our Hampton Roads community with integrity and precision.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"className":"card-gold-border card-padding","backgroundColor":"white"} -->
<div class="wp-block-group card-gold-border card-padding has-white-background-color has-background">
<!-- wp:html -->
<div class="icon-center"><i class="fas fa-handshake icon-large golden-sun"></i></div>
<!-- /wp:html -->
<!-- wp:heading {"textAlign":"center","level":3,"className":"font-montserrat deep-navy card-title"} -->
<h3 class="wp-block-heading has-text-align-center font-montserrat deep-navy card-title">AIM Partnership</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","className":"deep-navy"} -->
<p class="has-text-align-center deep-navy">Combined "Map First, Dig Second" workflow eliminates the blame game between locator and excavator.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"className":"card-gold-border card-padding","backgroundColor":"white"} -->
<div class="wp-block-group card-gold-border card-padding has-white-background-color has-background">
<!-- wp:html -->
<div class="icon-center"><i class="fas fa-shield-alt icon-large golden-sun"></i></div>
<!-- /wp:html -->
<!-- wp:heading {"textAlign":"center","level":3,"className":"font-montserrat deep-navy card-title"} -->
<h3 class="wp-block-heading has-text-align-center font-montserrat deep-navy card-title">Damage Prevention</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","className":"deep-navy"} -->
<p class="has-text-align-center deep-navy">Surgical precision protects underground utilities from damage during excavation.</p>
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
<!-- wp:group {"align":"full","className":"section-light section-padding","layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group alignfull section-light section-padding">

<!-- wp:heading {"textAlign":"center","className":"font-inter deep-navy section-heading"} -->
<h2 class="wp-block-heading has-text-align-center font-inter deep-navy section-heading">Specialized Hydro-Excavation Services</h2>
<!-- /wp:heading -->

<!-- wp:columns {"className":"services-grid"} -->
<div class="wp-block-columns services-grid">

<!-- wp:column -->
<div class="wp-block-column">

<!-- wp:group {"className":"service-item","layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
<div class="wp-block-group service-item">
<!-- wp:html -->
<div class="icon-circle"><i class="fas fa-eye golden-sun"></i></div>
<!-- /wp:html -->
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
<!-- wp:heading {"level":3,"className":"font-montserrat deep-navy service-title"} -->
<h3 class="wp-block-heading font-montserrat deep-navy service-title">Potholing / Daylighting</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"deep-navy"} -->
<p class="deep-navy">The process of uncovering an underground utility using high-pressure water and vacuum for SUE Level A verification.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->

<!-- wp:group {"className":"service-item","layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
<div class="wp-block-group service-item">
<!-- wp:html -->
<div class="icon-circle"><i class="fas fa-arrows-alt golden-sun"></i></div>
<!-- /wp:html -->
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
<!-- wp:heading {"level":3,"className":"font-montserrat deep-navy service-title"} -->
<h3 class="wp-block-heading font-montserrat deep-navy service-title">Remote Excavation</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"deep-navy"} -->
<p class="deep-navy">Utilizing the truck's 600ft hose reach for restricted-access environments.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->

</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">

<!-- wp:group {"className":"service-item","layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
<div class="wp-block-group service-item">
<!-- wp:html -->
<div class="icon-circle"><i class="fas fa-grip-lines golden-sun"></i></div>
<!-- /wp:html -->
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
<!-- wp:heading {"level":3,"className":"font-montserrat deep-navy service-title"} -->
<h3 class="wp-block-heading font-montserrat deep-navy service-title">Slot Trenching</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"deep-navy"} -->
<p class="deep-navy">Creating narrow trenches for pipes/cables that require minimal backfill and restoration.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->

<!-- wp:group {"className":"service-item","layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
<div class="wp-block-group service-item">
<!-- wp:html -->
<div class="icon-circle"><i class="fas fa-certificate golden-sun"></i></div>
<!-- /wp:html -->
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
<!-- wp:heading {"level":3,"className":"font-montserrat deep-navy service-title"} -->
<h3 class="wp-block-heading font-montserrat deep-navy service-title">SUE Level A Verification</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"deep-navy"} -->
<p class="deep-navy">Providing the highest level of subsurface utility accuracy for engineering records.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->

</div>
<!-- /wp:column -->

</div>
<!-- /wp:columns -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"className":"section-cta"} -->
<div class="wp-block-buttons section-cta">
<!-- wp:button {"className":"btn-primary"} -->
<div class="wp-block-button btn-primary"><a class="wp-block-button__link wp-element-button" href="/services/">View All Services</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->

</div>
<!-- /wp:group -->

<!-- CAPABILITIES SECTION -->
<!-- wp:group {"align":"full","className":"section-navy section-padding","layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group alignfull section-navy section-padding">

<!-- wp:heading {"textAlign":"center","className":"font-inter text-white section-heading"} -->
<h2 class="wp-block-heading has-text-align-center font-inter text-white section-heading">Professional Capabilities</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","className":"font-montserrat golden-sun section-subtitle"} -->
<p class="has-text-align-center font-montserrat golden-sun section-subtitle">Industrial-Grade Equipment</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"center","className":"text-white section-intro"} -->
<p class="has-text-align-center text-white section-intro">We've upgraded to industrial-grade vacuum trucks with unmatched capacity and reach.</p>
<!-- /wp:paragraph -->

<!-- wp:columns {"className":"capability-grid"} -->
<div class="wp-block-columns capability-grid">

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"className":"capability-card","backgroundColor":"white"} -->
<div class="wp-block-group capability-card has-white-background-color has-background">
<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
<div class="wp-block-group">
<!-- wp:html -->
<div class="icon-circle-lg"><i class="fas fa-water golden-sun"></i></div>
<!-- /wp:html -->
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
<!-- wp:heading {"level":3,"className":"font-montserrat deep-navy capability-title"} -->
<h3 class="wp-block-heading font-montserrat deep-navy capability-title">High-Pressure Water System</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"deep-navy text-sm"} -->
<p class="deep-navy text-sm">3000 PSI capacity for breaking through compacted soil and around delicate utilities.</p>
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
<!-- wp:group {"className":"capability-card","backgroundColor":"white"} -->
<div class="wp-block-group capability-card has-white-background-color has-background">
<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
<div class="wp-block-group">
<!-- wp:html -->
<div class="icon-circle-lg"><i class="fas fa-wind golden-sun"></i></div>
<!-- /wp:html -->
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
<!-- wp:heading {"level":3,"className":"font-montserrat deep-navy capability-title"} -->
<h3 class="wp-block-heading font-montserrat deep-navy capability-title">Industrial Vacuum Power</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"deep-navy text-sm"} -->
<p class="deep-navy text-sm">High-volume debris tank with powerful suction for efficient material removal.</p>
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

<!-- wp:columns {"className":"capability-grid"} -->
<div class="wp-block-columns capability-grid">

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:group {"className":"capability-card","backgroundColor":"white"} -->
<div class="wp-block-group capability-card has-white-background-color has-background">
<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
<div class="wp-block-group">
<!-- wp:html -->
<div class="icon-circle-lg"><i class="fas fa-ruler-combined golden-sun"></i></div>
<!-- /wp:html -->
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
<!-- wp:heading {"level":3,"className":"font-montserrat deep-navy capability-title"} -->
<h3 class="wp-block-heading font-montserrat deep-navy capability-title">600ft Hose Reach</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"deep-navy text-sm"} -->
<p class="deep-navy text-sm">Extended reach capability for remote or restricted-access locations.</p>
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
<!-- wp:group {"className":"capability-card","backgroundColor":"white"} -->
<div class="wp-block-group capability-card has-white-background-color has-background">
<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"}} -->
<div class="wp-block-group">
<!-- wp:html -->
<div class="icon-circle-lg"><i class="fas fa-truck golden-sun"></i></div>
<!-- /wp:html -->
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
<!-- wp:heading {"level":3,"className":"font-montserrat deep-navy capability-title"} -->
<h3 class="wp-block-heading font-montserrat deep-navy capability-title">Mechanical Boom System</h3>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"deep-navy text-sm"} -->
<p class="deep-navy text-sm">Precision control for targeted excavation in tight spaces.</p>
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
<!-- wp:group {"align":"full","className":"section-white section-padding","layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group alignfull section-white section-padding">

<!-- wp:columns {"verticalAlignment":"center","className":"veteran-grid"} -->
<div class="wp-block-columns are-vertically-aligned-center veteran-grid">

<!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center">
<!-- wp:html -->
<div class="veteran-badge"><i class="fas fa-flag-usa"></i><span>VETERAN OWNED</span></div>
<!-- /wp:html -->
<!-- wp:heading {"className":"font-inter deep-navy section-heading veteran-heading"} -->
<h2 class="wp-block-heading font-inter deep-navy section-heading veteran-heading">Built on Values of <span class="golden-sun">Service &amp; Precision</span></h2>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"deep-navy text-lg"} -->
<p class="deep-navy text-lg">As a veteran-owned business, we bring military discipline and attention to detail to every project. Our commitment to excellence isn't just a slogan—it's how we operate every day.</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph {"className":"deep-navy text-lg"} -->
<p class="deep-navy text-lg">Serving Virginia Beach, Norfolk, Chesapeake, and throughout Hampton Roads with the same dedication we brought to serving our country.</p>
<!-- /wp:paragraph -->
</div>
<!-- /wp:column -->

<!-- wp:column {"verticalAlignment":"center"} -->
<div class="wp-block-column is-vertically-aligned-center">
<!-- wp:group {"className":"service-area-box"} -->
<div class="wp-block-group service-area-box">
<!-- wp:heading {"level":3,"className":"font-montserrat text-white service-area-title"} -->
<h3 class="wp-block-heading font-montserrat text-white service-area-title">Our Service Area</h3>
<!-- /wp:heading -->
<!-- wp:html -->
<ul class="service-area-list">
<li><i class="fas fa-check-circle"></i>Virginia Beach & Hampton Roads</li>
<li><i class="fas fa-check-circle"></i>Norfolk, Chesapeake, Portsmouth</li>
<li><i class="fas fa-check-circle"></i>Richmond & Central Virginia</li>
<li><i class="fas fa-check-circle"></i>North Carolina, Maryland & Delaware</li>
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

<!-- CTA SECTION -->
<!-- wp:group {"align":"full","className":"golden-gradient section-padding cta-section","layout":{"type":"constrained","contentSize":"900px"}} -->
<div class="wp-block-group alignfull golden-gradient section-padding cta-section">

<!-- wp:heading {"textAlign":"center","className":"font-inter text-white cta-heading"} -->
<h2 class="wp-block-heading has-text-align-center font-inter text-white cta-heading">Ready to Start Your Project?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","className":"text-white text-lg cta-text"} -->
<p class="has-text-align-center text-white text-lg cta-text">Get in touch with Beach Hydrovac today for a professional consultation and quote.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"className":"cta-buttons"} -->
<div class="wp-block-buttons cta-buttons">
<!-- wp:button {"className":"btn-white"} -->
<div class="wp-block-button btn-white"><a class="wp-block-button__link wp-element-button" href="tel:7577855177">📞 Call 757-785-5177</a></div>
<!-- /wp:button -->
<!-- wp:button {"className":"btn-outline-white"} -->
<div class="wp-block-button btn-outline-white"><a class="wp-block-button__link wp-element-button" href="/contact/">Request Quote</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->

</div>
<!-- /wp:group -->

<!-- FOOTER SECTION -->
<!-- wp:group {"align":"full","className":"section-navy footer-section","layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group alignfull section-navy footer-section">

<!-- wp:columns {"className":"footer-grid"} -->
<div class="wp-block-columns footer-grid">

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":4,"className":"font-montserrat text-white footer-title"} -->
<h4 class="wp-block-heading font-montserrat text-white footer-title">BeachHydrovac</h4>
<!-- /wp:heading -->
<!-- wp:paragraph {"className":"text-gray-light"} -->
<p class="text-gray-light">Professional hydro-excavation services for Virginia and surrounding states.</p>
<!-- /wp:paragraph -->
<!-- wp:html -->
<div class="veteran-badge"><i class="fas fa-flag-usa"></i><span>VETERAN OWNED</span></div>
<!-- /wp:html -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":4,"className":"font-montserrat text-white footer-title"} -->
<h4 class="wp-block-heading font-montserrat text-white footer-title">Quick Links</h4>
<!-- /wp:heading -->
<!-- wp:html -->
<ul class="footer-links">
<li><a href="/">Home</a></li>
<li><a href="/services/">Services</a></li>
<li><a href="/about/">About</a></li>
<li><a href="/contact/">Contact</a></li>
</ul>
<!-- /wp:html -->
</div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column">
<!-- wp:heading {"level":4,"className":"font-montserrat text-white footer-title"} -->
<h4 class="wp-block-heading font-montserrat text-white footer-title">Contact</h4>
<!-- /wp:heading -->
<!-- wp:html -->
<ul class="footer-contact">
<li><i class="fas fa-phone"></i>757-785-5177</li>
<li><i class="fas fa-map-marker-alt"></i>Virginia Beach, VA</li>
<li><i class="fas fa-building"></i>A Division of AIM Locating</li>
</ul>
<!-- /wp:html -->
</div>
<!-- /wp:column -->

</div>
<!-- /wp:columns -->

<!-- wp:separator {"className":"footer-divider"} -->
<hr class="wp-block-separator has-alpha-channel-opacity footer-divider"/>
<!-- /wp:separator -->

<!-- wp:paragraph {"align":"center","className":"footer-copyright"} -->
<p class="has-text-align-center footer-copyright">© 2026 BeachHydrovac. All rights reserved. A division of <a href="https://aimlocating.com" target="_blank" rel="noopener">AIM Locating</a>.</p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->
`;

// Additional CSS classes needed for the child theme
const additionalCSS = `
/* ===========================================
   ADDITIONAL CSS CLASSES FOR OPTIMIZED BLOCKS
   Add this to the Astra child theme style.css
   =========================================== */

/* Section Layouts */
.section-padding { padding: 100px 24px; }
.section-white { background-color: #ffffff; }
.section-light { background-color: #f8fafc; }
.section-navy { background-color: var(--deep-navy); }

/* Typography Sizes */
.text-lg { font-size: 18px; line-height: 1.8; }
.text-sm { font-size: 15px; line-height: 1.7; }
.text-white { color: #ffffff !important; }
.text-gray-light { color: #cbd5e1; }

/* Section Headings */
.section-heading { font-size: 44px; font-weight: 900; margin-bottom: 16px; }
.section-subtitle { font-size: 22px; font-weight: 600; margin-top: 8px; }
.section-intro { font-size: 18px; line-height: 1.8; margin-bottom: 56px; }

/* Cards */
.card-padding { padding: 40px 32px; border-radius: 16px; }
.card-title { font-size: 22px; font-weight: 700; margin-bottom: 12px; }
.card-grid { gap: 32px; }

/* Icons */
.icon-center { text-align: center; margin-bottom: 20px; }
.icon-large { font-size: 52px; }

/* Services */
.service-item { padding-bottom: 32px; }
.service-title { font-size: 20px; font-weight: 700; margin-bottom: 8px; }
.services-grid { gap: 40px 56px; }

/* Capabilities */
.capability-grid { gap: 24px; margin-top: 24px; }
.capability-card { padding: 32px 28px; border-radius: 16px; }
.capability-title { font-size: 19px; font-weight: 700; margin-bottom: 8px; }

/* Veteran Section */
.veteran-grid { gap: 72px; }
.veteran-heading { font-size: 44px; line-height: 1.15; margin-bottom: 24px; margin-top: 20px; }

/* Service Area Box */
.service-area-box {
  background: var(--deep-navy);
  padding: 36px;
  border-radius: 20px;
}
.service-area-title { font-size: 26px; font-weight: 700; margin-bottom: 24px; }
.service-area-list {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #fff;
  font-size: 18px;
  line-height: 2.4;
}
.service-area-list i { color: var(--golden-sun); margin-right: 14px; }

/* CTA Section */
.cta-heading { font-size: 50px; font-weight: 900; line-height: 1.1; }
.cta-text { margin: 20px 0 40px; }

/* CTA Buttons */
.btn-white .wp-block-button__link {
  background: #fff !important;
  color: var(--deep-navy) !important;
  padding: 18px 36px !important;
  border-radius: 9999px !important;
  font-weight: 700 !important;
  font-size: 18px !important;
}
.btn-outline-white .wp-block-button__link {
  background: transparent !important;
  color: #fff !important;
  border: 2px solid rgba(255,255,255,0.5) !important;
  padding: 18px 36px !important;
  border-radius: 9999px !important;
  font-weight: 700 !important;
  font-size: 18px !important;
}

/* Footer */
.footer-section { padding: 72px 24px; }
.footer-grid { margin-bottom: 40px; }
.footer-title { font-size: 22px; font-weight: 700; margin-bottom: 16px; }
.footer-links { list-style: none; padding: 0; margin: 0; }
.footer-links li { margin-bottom: 12px; }
.footer-links a { color: #cbd5e1; text-decoration: none; }
.footer-links a:hover { color: var(--golden-sun); }
.footer-contact { list-style: none; padding: 0; margin: 0; color: #cbd5e1; line-height: 2.2; }
.footer-contact i { color: var(--golden-sun); margin-right: 12px; width: 16px; }
.footer-divider { background-color: #475569; margin: 40px 0; }
.footer-copyright { color: #94a3b8; }
.footer-copyright a { color: var(--golden-sun); }

/* Hero */
.hero-buttons { margin-top: 48px; gap: 16px; }

/* Responsive */
@media (max-width: 782px) {
  .section-padding { padding: 60px 16px; }
  .section-heading { font-size: 28px; }
  .cta-heading { font-size: 32px; }
  .veteran-heading { font-size: 28px; }
  .card-grid, .services-grid, .capability-grid, .veteran-grid, .footer-grid {
    flex-direction: column;
  }
}
`;

async function updatePage() {
  console.log('🚀 Optimizing BeachHydrovac page...\n');

  // Update page content
  console.log('1️⃣ Updating page with optimized blocks...');

  try {
    const response = await axios.put(
      `${WP_URL}/wp-json/wp/v2/pages/10`,
      {
        content: optimizedContent,
        status: 'publish'
      },
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('   ✅ Page updated!');
    console.log('   📄 Content length:', optimizedContent.length, 'chars');

    // Analyze improvements
    const newInlineStyles = (optimizedContent.match(/style=\"[^\"]+\"/g) || []).length;
    const newHtmlBlocks = (optimizedContent.match(/<!-- wp:html -->/g) || []).length;

    console.log('\n📊 OPTIMIZATION RESULTS:');
    console.log('   Before → After');
    console.log('   Inline styles: 102 → ' + newInlineStyles);
    console.log('   HTML blocks: 17 → ' + newHtmlBlocks);
    console.log('   Content size: 32,122 → ' + optimizedContent.length + ' chars');

    console.log('\n⚠️  IMPORTANT: Add the additional CSS to your child theme:');
    console.log('   File: wp-content/themes/astra-child/style.css');
    console.log('\n' + '='.repeat(50));
    console.log('ADDITIONAL CSS TO ADD:');
    console.log('='.repeat(50));
    console.log(additionalCSS);

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

updatePage();
