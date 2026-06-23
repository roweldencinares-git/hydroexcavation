import axios from 'axios';

const WP_URL = 'https://beachhydrovac.com';
const USERNAME = 'rdenci_16';
const APP_PASSWORD = '0L9x p2O7 tdfs khVJ UFyl 1UZk';
const auth = Buffer.from(`${USERNAME}:${APP_PASSWORD}`).toString('base64');

// Complete page content with INLINE SVG icons (no Font Awesome dependency!)
const pageContent = `
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
<div class="icon-center">
<svg class="icon-svg icon-navy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="56" height="56"><path fill="currentColor" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
</div>
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
<div class="icon-center">
<svg class="icon-svg icon-gold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="56" height="56"><path fill="currentColor" d="M323.4 85.2l-96.8 78.4c-16.1 13-19.2 36.4-7 53.1c12.9 17.8 38 21.3 55.3 7.8l99.3-77.2c7-5.4 17-4.2 22.5 2.8s4.2 17-2.8 22.5l-20.9 16.2L512 316.8V128h-.7l-3.9-2.5L434.8 79c-15.3-9.8-33.2-15-51.4-15c-21.8 0-43 7.5-60 21.2zm22.8 124.4l-51.7 40.2C263 274.4 217.3 268 googletranslate 245.5c-31.7-20.8-44.4-60.4-31.5-96.8L16 224l91 144.4L0 480l128 32 96-128 224 96 32-128-96-192z"/></svg>
</div>
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
<div class="icon-center">
<svg class="icon-svg icon-gold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="56" height="56"><path fill="currentColor" d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z"/></svg>
</div>
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
<div class="icon-circle">
<svg class="icon-svg-sm icon-gold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="24" height="24"><path fill="currentColor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
</div>
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
<div class="icon-circle">
<svg class="icon-svg-sm icon-gold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24"><path fill="currentColor" d="M278.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l9.4-9.4V224H109.3l9.4-9.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4H224V402.7l-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-9.4 9.4V288H402.7l-9.4 9.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l9.4 9.4H288V109.3l9.4 9.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-64-64z"/></svg>
</div>
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
<div class="icon-circle">
<svg class="icon-svg-sm icon-gold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24"><path fill="currentColor" d="M32 288c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 288zm0-128c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 160z"/></svg>
</div>
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
<div class="icon-circle">
<svg class="icon-svg-sm icon-gold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24"><path fill="currentColor" d="M211 7.3C205 1 196-1.4 187.6 .8s-14.9 8.9-17.1 17.3L154.7 80.6l-62-17.5c-8.4-2.4-17.4 0-23.5 6.1s-8.5 15.1-6.1 23.5l17.5 62L18.1 170.6c-8.4 2.1-15 8.7-17.3 17.1S1 205 7.3 211l46.2 45L7.3 301C1 307-1.4 316 .8 324.4s8.9 14.9 17.3 17.1l62.5 15.8-17.5 62c-2.4 8.4 0 17.4 6.1 23.5s15.1 8.5 23.5 6.1l62-17.5 15.8 62.5c2.1 8.4 8.7 15 17.1 17.3s17.3-.2 23.4-6.4l45-46.2 45 46.2c6.1 6.2 15 8.7 23.4 6.4s14.9-8.9 17.1-17.3l15.8-62.5 62 17.5c8.4 2.4 17.4 0 23.5-6.1s8.5-15.1 6.1-23.5l-17.5-62 62.5-15.8c8.4-2.1 15-8.7 17.3-17.1s-.2-17.4-6.4-23.4l-46.2-45 46.2-45c6.2-6.1 8.7-15 6.4-23.4s-8.9-14.9-17.3-17.1l-62.5-15.8 17.5-62c2.4-8.4 0-17.4-6.1-23.5s-15.1-8.5-23.5-6.1l-62 17.5L341.4 18.1c-2.1-8.4-8.7-15-17.1-17.3S307 1 301 7.3L256 53.5 211 7.3z"/></svg>
</div>
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
<div class="icon-circle-lg">
<svg class="icon-svg-md icon-gold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="32" height="32"><path fill="currentColor" d="M269.5 69.9c11.1-7.9 25.9-7.9 37 0C329 85.4 356.5 96 384 96c26.9 0 55.4-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 149.7 417 160 384 160c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.4 27.3-10.1 39.2-1.7l0 0C136.7 85.2 165.1 96 192 96c27.5 0 55-10.6 77.5-26.1zm37 288c22.5-15.6 50-26.1 77.5-26.1c26.9 0 55.4 10.8 77.4 26.1l0 0c11.9 8.5 28.1 7.8 39.2-1.7c14.4-11.9 32.5-21 50.6-25.2c17.2-4 34.4 6.7 38.4 23.9s-6.7 34.4-23.9 38.4c-24.5 5.7-44.9 16.5-58.2 25C478.5 433.7 446 444 413 444c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.5 27.3-10.1 39.2-1.7l0 0c22.1 15.2 50.5 26 77.4 26c27.5 0 55-10.6 77.5-26.1zm0-144C329 229.4 356.5 240 384 240c26.9 0 55.4-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 293.7 417 304 384 304c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.4 27.3-10.1 39.2-1.7l0 0C136.7 229.2 165.1 240 192 240c27.5 0 55-10.6 77.5-26.1z"/></svg>
</div>
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
<div class="icon-circle-lg">
<svg class="icon-svg-md icon-gold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="32" height="32"><path fill="currentColor" d="M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43 96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z"/></svg>
</div>
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
<div class="icon-circle-lg">
<svg class="icon-svg-md icon-gold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="32" height="32"><path fill="currentColor" d="M177.9 494.1c-18.7 18.7-49.1 18.7-67.9 0L17.9 401.9c-18.7-18.7-18.7-49.1 0-67.9l50.7-50.7 48 48c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-48-48 41.4-41.4 48 48c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-48-48 41.4-41.4 48 48c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-48-48 41.4-41.4 48 48c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-48-48 50.7-50.7c18.7-18.7 49.1-18.7 67.9 0l92.1 92.1c18.7 18.7 18.7 49.1 0 67.9L177.9 494.1z"/></svg>
</div>
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
<div class="icon-circle-lg">
<svg class="icon-svg-md icon-gold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="32" height="32"><path fill="currentColor" d="M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H48zM416 160h50.7L544 237.3V256H416V160zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
</div>
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
<div class="veteran-badge"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="14" height="14" style="margin-right:8px;"><path fill="currentColor" d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32V64 368 480c0 17.7 14.3 32 32 32s32-14.3 32-32V352l64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48V32z"/></svg><span>VETERAN OWNED</span></div>
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
<li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" style="margin-right:14px;vertical-align:middle;"><path fill="#f7bb14" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>Virginia Beach & Hampton Roads</li>
<li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" style="margin-right:14px;vertical-align:middle;"><path fill="#f7bb14" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>Norfolk, Chesapeake, Portsmouth</li>
<li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" style="margin-right:14px;vertical-align:middle;"><path fill="#f7bb14" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>Richmond & Central Virginia</li>
<li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" style="margin-right:14px;vertical-align:middle;"><path fill="#f7bb14" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>North Carolina, Maryland & Delaware</li>
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
<div class="veteran-badge"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="14" height="14" style="margin-right:8px;"><path fill="currentColor" d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32V64 368 480c0 17.7 14.3 32 32 32s32-14.3 32-32V352l64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48V32z"/></svg><span>VETERAN OWNED</span></div>
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
<li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" style="margin-right:12px;vertical-align:middle;"><path fill="#f7bb14" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>757-785-5177</li>
<li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="16" height="16" style="margin-right:12px;vertical-align:middle;"><path fill="#f7bb14" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>Virginia Beach, VA</li>
<li><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="16" height="16" style="margin-right:12px;vertical-align:middle;"><path fill="#f7bb14" d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z"/></svg>A Division of AIM Locating</li>
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

async function updatePage() {
  console.log('🚀 Updating page with SVG icons (no Font Awesome needed)...\n');

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

    console.log('✅ Page updated successfully!');
    console.log('📄 Page ID:', response.data.id);
    console.log('\n🎯 Changes made:');
    console.log('   • Replaced all Font Awesome icons with inline SVGs');
    console.log('   • No external icon font dependency');
    console.log('   • Icons will always display correctly');
    console.log('   • Faster loading (no extra CSS file)');
    console.log('\n🔗 View: https://beachhydrovac.com');

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

updatePage();
