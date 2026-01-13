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

// Get page by slug
async function getPageBySlug(slug) {
  const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages?slug=${slug}`, { headers });
  const pages = await response.json();
  return pages[0] || null;
}

// Update page content
async function updatePage(pageId, content) {
  const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${pageId}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ content })
  });

  if (response.ok) {
    const page = await response.json();
    console.log(`✅ Updated page ID ${pageId}`);
    return page;
  } else {
    const error = await response.text();
    console.log(`❌ Failed to update page ${pageId}:`, error.substring(0, 200));
    return null;
  }
}

// Upload theme to WordPress
async function uploadTheme(zipPath) {
  console.log('\n📦 Uploading updated child theme with animations...\n');
  console.log('⚠️  To upload the theme:');
  console.log('1. Go to: https://silver-raccoon-464412.hostingersite.com/wp-admin/theme-install.php?tab=upload');
  console.log('2. Upload file: beachhydrovac-kadence-child-v2-animated.zip');
  console.log('3. Click "Replace current with uploaded"');
  console.log('4. Activate the theme\n');
}

console.log('==========================================');
console.log('Beach Hydrovac - Advanced Animations Update');
console.log('==========================================\n');

uploadTheme();

console.log('After uploading the theme, the advanced animations will be active!');
console.log('\nFeatures included:');
console.log('✨ Scroll animations (fade-in, slide-in)');
console.log('✨ Parallax effects');
console.log('✨ Interactive service cards with hover effects');
console.log('✨ Smooth scrolling');
console.log('✨ Scroll progress bar');
console.log('✨ Counter animations');
console.log('✨ Button ripple effects');
console.log('✨ Gradient animations');
console.log('✨ Image hover zoom effects');
console.log('✨ Glowing effects\n');
