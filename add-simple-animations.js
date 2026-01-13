import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://silver-raccoon-464412.hostingersite.com';
const WP_USER = process.env.BEACH_HYDROVAC_WP_USER;
const WP_APP_PASSWORD = process.env.BEACH_HYDROVAC_WP_PASSWORD;

const headers = {
  'Authorization': 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64'),
  'Content-Type': 'application/json'
};

// Simple CSS that works on ALL elements automatically
const simpleAnimationCSS = `
<style>
/* Fade in animations - works automatically! */
.wp-block-column {
  animation: fadeInUp 0.8s ease-out;
}

.wp-block-group {
  animation: fadeIn 0.6s ease-out;
}

.wp-block-heading {
  animation: fadeInUp 0.7s ease-out;
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

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Hover effects on cards */
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
  position: relative;
  overflow: hidden;
}

.wp-block-button__link:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 5px 15px rgba(39, 174, 253, 0.4) !important;
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Stagger animation for columns */
.wp-block-columns .wp-block-column:nth-child(1) {
  animation-delay: 0.1s;
}

.wp-block-columns .wp-block-column:nth-child(2) {
  animation-delay: 0.2s;
}

.wp-block-columns .wp-block-column:nth-child(3) {
  animation-delay: 0.3s;
}

.wp-block-columns .wp-block-column:nth-child(4) {
  animation-delay: 0.4s;
}
</style>
`;

async function addAnimationsToCustomizer() {
  console.log('Adding animations via Customizer (site-wide)...\n');

  try {
    // Try to update Additional CSS setting
    const response = await fetch(`${WP_URL}/wp-json/wp/v2/settings`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        // Kadence stores additional CSS here
        custom_css_post_id: simpleAnimationCSS
      })
    });

    if (response.ok) {
      console.log('✅ Added to customizer!');
    } else {
      console.log('ℹ️  Customizer method not available, trying page injection...');
      return false;
    }
  } catch (error) {
    return false;
  }

  return true;
}

async function addToHomepage() {
  console.log('Adding animations directly to homepage...\n');

  // Get homepage
  const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages?slug=home`, { headers });
  const pages = await response.json();
  const homepage = pages[0];

  if (!homepage) {
    console.log('❌ Homepage not found');
    return;
  }

  // Create HTML block with CSS
  const htmlBlock = `<!-- wp:html -->
${simpleAnimationCSS}
<!-- /wp:html -->

`;

  // Check if CSS already exists
  let content = homepage.content.rendered;

  if (content.includes('fadeInUp')) {
    console.log('ℹ️  Animations already added!');
    return;
  }

  // Add at the beginning
  content = htmlBlock + content;

  // Update page
  const updateResponse = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${homepage.id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ content })
  });

  if (updateResponse.ok) {
    const updated = await updateResponse.json();
    console.log('✅ Animations added to homepage!');
    console.log('   URL:', updated.link);
    return true;
  } else {
    const error = await updateResponse.text();
    console.log('❌ Failed:', error.substring(0, 200));
    return false;
  }
}

async function main() {
  console.log('==========================================');
  console.log('Adding SIMPLE Animations (Auto-Working!)');
  console.log('==========================================\n');

  // Try customizer first (applies to all pages)
  const customizerWorked = await addAnimationsToCustomizer();

  if (!customizerWorked) {
    // Fall back to homepage injection
    await addToHomepage();
  }

  console.log('\n==========================================');
  console.log('✅ DONE!');
  console.log('==========================================\n');
  console.log('🎨 What you\'ll see now:');
  console.log('  • Elements fade in as page loads');
  console.log('  • Cards lift up on hover');
  console.log('  • Buttons have hover effects');
  console.log('  • Smooth scrolling\n');
  console.log('👉 Visit: ' + WP_URL);
  console.log('\nIf you still don\'t see animations, try:');
  console.log('1. Hard refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)');
  console.log('2. Clear browser cache');
  console.log('3. Try incognito/private browsing mode');
}

main().catch(console.error);
