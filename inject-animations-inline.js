import 'dotenv/config';
import fetch from 'node-fetch';
import { readFileSync } from 'fs';

const WP_URL = 'https://silver-raccoon-464412.hostingersite.com';
const WP_USER = process.env.BEACH_HYDROVAC_WP_USER;
const WP_APP_PASSWORD = process.env.BEACH_HYDROVAC_WP_PASSWORD;

const headers = {
  'Authorization': 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64'),
  'Content-Type': 'application/json'
};

// Read animation files
const animationCSS = readFileSync('./kadence-child-theme/advanced-animations.css', 'utf-8');
const animationJS = readFileSync('./kadence-child-theme/advanced-animations.js', 'utf-8');

// Get page by slug
async function getPage(slug) {
  const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages?slug=${slug}`, { headers });
  const pages = await response.json();
  return pages[0] || null;
}

// Update page with inline animations
async function updatePageWithInlineAnimations(pageId, pageName) {
  // Create custom CSS block
  const cssBlock = `<!-- wp:html -->
<style>
${animationCSS}
</style>
<!-- /wp:html -->

`;

  // Create custom JS block
  const jsBlock = `<!-- wp:html -->
<script>
${animationJS}
</script>
<!-- /wp:html -->`;

  const page = await getPage(pageName);
  if (!page) {
    console.log(`❌ Page not found: ${pageName}`);
    return;
  }

  let content = page.content.rendered;

  // Add CSS at the beginning
  content = cssBlock + content;

  // Add JS at the end
  content = content + '\n\n' + jsBlock;

  // Add animation classes
  content = content.replace(/<!-- wp:column\s/g, '<!-- wp:column {"className":"fade-in-up"} ');
  content = content.replace(/<!-- wp:heading\s/g, '<!-- wp:heading {"className":"fade-in-up"} ');
  content = content.replace(/<!-- wp:group\s/g, '<!-- wp:group {"className":"service-card"} ');

  const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${pageId}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ content })
  });

  if (response.ok) {
    const updated = await response.json();
    console.log(`✅ Updated: ${updated.title.rendered} with inline animations`);
    console.log(`   URL: ${updated.link}`);
  } else {
    const error = await response.text();
    console.log(`❌ Failed to update ${pageName}:`, error.substring(0, 300));
  }
}

// Main
async function main() {
  console.log('==========================================');
  console.log('Injecting Animations INLINE to Pages');
  console.log('==========================================\n');

  const pages = [
    { name: 'home', title: 'Homepage' },
    { name: 'services', title: 'Services Page' },
    { name: 'about', title: 'About Page' },
    { name: 'contact', title: 'Contact Page' }
  ];

  for (const page of pages) {
    console.log(`\n📄 Processing: ${page.title}...`);
    const wpPage = await getPage(page.name);
    if (wpPage) {
      await updatePageWithInlineAnimations(wpPage.id, page.name);
    }
    await new Promise(resolve => setTimeout(resolve, 1500));
  }

  console.log('\n==========================================');
  console.log('✅ DONE! All pages now have animations!');
  console.log('==========================================\n');
  console.log('🎨 Animations included:');
  console.log('  • Scroll animations (fade-in, slide-in)');
  console.log('  • Interactive hover effects');
  console.log('  • Smooth scrolling');
  console.log('  • Scroll progress bar');
  console.log('  • Button animations\n');
  console.log('👉 Visit your site: ' + WP_URL);
}

main().catch(console.error);
