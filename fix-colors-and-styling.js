import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://silver-raccoon-464412.hostingersite.com';
const WP_USER = process.env.BEACH_HYDROVAC_WP_USER;
const WP_APP_PASSWORD = process.env.BEACH_HYDROVAC_WP_PASSWORD;

const headers = {
  'Authorization': 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64'),
  'Content-Type': 'application/json'
};

async function fixHomepageStyling() {
  console.log('==========================================');
  console.log('Fixing Colors & Styling');
  console.log('==========================================\n');

  // Get homepage
  console.log('📄 Getting homepage...');
  const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages/14?context=edit`, { headers });
  const homepage = await response.json();

  console.log('✅ Found:', homepage.title.rendered);

  // Complete homepage content with brand colors and placeholder hero
  const newContent = `<!-- wp:html -->
<style>
/* ========================================
   BEACH HYDROVAC BRAND COLORS
   ======================================== */
:root {
  --beach-deep-atlantic: #00416A;
  --beach-safety-cyan: #27AEFD;
  --beach-warm-shoreline: #D4A373;
  --beach-soft-sand: #F5F1E8;
}

/* Global color application */
body {
  color: #333;
}

h1, h2, h3, h4, h5, h6 {
  color: var(--beach-deep-atlantic) !important;
}

.wp-block-button__link {
  background-color: var(--beach-safety-cyan) !important;
  border-color: var(--beach-safety-cyan) !important;
  color: white !important;
}

.wp-block-button.is-style-outline .wp-block-button__link {
  background-color: transparent !important;
  color: var(--beach-deep-atlantic) !important;
  border: 2px solid var(--beach-deep-atlantic) !important;
}

/* Hero section styling */
.hero-section {
  background: linear-gradient(135deg, var(--beach-deep-atlantic) 0%, var(--beach-safety-cyan) 100%);
  color: white !important;
  padding: 100px 20px !important;
  text-align: center;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-section h1 {
  color: white !important;
  font-size: 3.5rem !important;
  font-weight: 700 !important;
  margin-bottom: 1rem !important;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.hero-section p {
  color: white !important;
  font-size: 1.5rem !important;
  margin-bottom: 2rem !important;
}

/* Animations */
.fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.wp-block-column {
  animation: fadeInUp 0.8s ease-out;
}

.wp-block-columns .wp-block-column:nth-child(1) {
  animation-delay: 0.1s;
}

.wp-block-columns .wp-block-column:nth-child(2) {
  animation-delay: 0.2s;
}

.wp-block-columns .wp-block-column:nth-child(3) {
  animation-delay: 0.3s;
}

/* Card hover effects */
.wp-block-group {
  transition: transform 0.3s ease, box-shadow 0.3s ease !important;
}

.wp-block-group:hover {
  transform: translateY(-5px) !important;
  box-shadow: 0 10px 30px rgba(0, 65, 106, 0.2) !important;
}

/* Button animations */
.wp-block-button__link {
  transition: all 0.3s ease !important;
}

.wp-block-button__link:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 5px 15px rgba(39, 174, 253, 0.4) !important;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}
</style>
<!-- /wp:html -->

<!-- wp:group {"className":"hero-section","layout":{"type":"constrained"}} -->
<div class="wp-block-group hero-section"><!-- wp:group {"layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group"><!-- wp:heading {"textAlign":"center","level":1} -->
<h1 class="wp-block-heading has-text-align-center">Protecting Virginia's Underground Infrastructure</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Precision hydro excavation for Virginia Beach and surrounding areas</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"style":{"spacing":{"padding":{"left":"2rem","right":"2rem","top":"1rem","bottom":"1rem"}}}} -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="#contact" style="padding-top:1rem;padding-right:2rem;padding-bottom:1rem;padding-left:2rem">Get a Free Quote</a></div>
<!-- /wp:button -->

<!-- wp:button {"className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="tel:757-XXX-XXXX">757-XXX-XXXX</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div></div></div>
<!-- /wp:group -->

<!-- wp:spacer {"height":"60px"} -->
<div style="height:60px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:heading {"textAlign":"center","level":2} -->
<h2 class="wp-block-heading has-text-align-center">Our Services</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Safe, non-destructive excavation for Virginia Beach and surrounding areas</p>
<!-- /wp:paragraph -->

<!-- wp:spacer {"height":"40px"} -->
<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:columns {"align":"wide"} -->
<div class="wp-block-columns alignwide"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","bottom":"2rem","left":"2rem","right":"2rem"}},"border":{"radius":"8px"}},"backgroundColor":"base","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-base-background-color has-background" style="border-radius:8px;padding-top:2rem;padding-right:2rem;padding-bottom:2rem;padding-left:2rem"><!-- wp:heading {"textAlign":"center","level":3} -->
<h3 class="wp-block-heading has-text-align-center">Potholing Services</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Precision utility exposure without damage to existing infrastructure</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","bottom":"2rem","left":"2rem","right":"2rem"}},"border":{"radius":"8px"}},"backgroundColor":"base","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-base-background-color has-background" style="border-radius:8px;padding-top:2rem;padding-right:2rem;padding-bottom:2rem;padding-left:2rem"><!-- wp:heading {"textAlign":"center","level":3} -->
<h3 class="wp-block-heading has-text-align-center">Slot Trenching</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Narrow trenches for utility installation with minimal surface disruption</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:group {"style":{"spacing":{"padding":{"top":"2rem","bottom":"2rem","left":"2rem","right":"2rem"}},"border":{"radius":"8px"}},"backgroundColor":"base","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-base-background-color has-background" style="border-radius:8px;padding-top:2rem;padding-right:2rem;padding-bottom:2rem;padding-left:2rem"><!-- wp:heading {"textAlign":"center","level":3} -->
<h3 class="wp-block-heading has-text-align-center">SUE Level A</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Subsurface utility engineering with precise location verification</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:spacer {"height":"60px"} -->
<div style="height:60px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:heading {"textAlign":"center","level":2} -->
<h2 class="wp-block-heading has-text-align-center">Why Choose Beach Hydrovac?</h2>
<!-- /wp:heading -->

<!-- wp:spacer {"height":"40px"} -->
<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:columns {"align":"wide"} -->
<div class="wp-block-columns alignwide"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">🎯 Precision Work</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Non-destructive excavation that protects your existing infrastructure</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">⚡ Fast Response</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Emergency services available with rapid deployment</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">🏆 Expert Team</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Veteran-owned with decades of combined experience</p>
<!-- /wp:paragraph --></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:spacer {"height":"80px"} -->
<div style="height:80px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->`;

  // Update page
  console.log('\n📝 Updating homepage...');
  const updateResponse = await fetch(`${WP_URL}/wp-json/wp/v2/pages/14`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ content: newContent })
  });

  if (updateResponse.ok) {
    const updated = await updateResponse.json();
    console.log('✅ Homepage updated successfully!');
    console.log('   URL:', updated.link);

    console.log('\n==========================================');
    console.log('✅ STYLING FIXED!');
    console.log('==========================================\n');
    console.log('🎨 What was applied:');
    console.log('  ✅ Brand colors (Deep Atlantic, Safety Cyan, Warm Shoreline)');
    console.log('  ✅ Gradient hero section with proper styling');
    console.log('  ✅ Fade-in animations');
    console.log('  ✅ Card hover effects');
    console.log('  ✅ Button animations');
    console.log('  ✅ Smooth scrolling\n');
    console.log('📝 Next step - Add hero background image:');
    console.log('  1. Go to: ' + WP_URL + '/wp-admin/post.php?post=14&action=edit');
    console.log('  2. At the top, you\'ll see the HERO SECTION (gradient background)');
    console.log('  3. Click on the hero section block');
    console.log('  4. In the right sidebar, look for "Background" settings');
    console.log('  5. Click "Add Media" and upload: C:\\Users\\rowel\\claude-projects\\beachhydrovac-website\\images\\hero-beach-truck.jpg');
    console.log('  6. Click "Update" to save\n');
    console.log('💡 The gradient looks great, but the beach truck image will make it perfect!\n');
    console.log('⚡ Clear cache after:');
    console.log('  • LiteSpeed Cache → Purge All');
    console.log('  • Hard refresh: Ctrl+F5\n');
    console.log('👉 View now: ' + WP_URL);

  } else {
    const error = await updateResponse.text();
    console.log('❌ Failed to update:', error.substring(0, 500));
  }
}

fixHomepageStyling().catch(console.error);
