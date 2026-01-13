import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://silver-raccoon-464412.hostingersite.com';
const WP_USER = process.env.BEACH_HYDROVAC_WP_USER;
const WP_APP_PASSWORD = process.env.BEACH_HYDROVAC_WP_PASSWORD;

const headers = {
  'Authorization': 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64'),
  'Content-Type': 'application/json'
};

// Check current theme
async function getCurrentTheme() {
  try {
    const response = await fetch(`${WP_URL}/wp-json`, { headers });
    const data = await response.json();
    console.log('Site URL:', data.url);
    console.log('Site Name:', data.name);
  } catch (error) {
    console.error('Error checking theme:', error.message);
  }
}

// Get page by slug
async function getPage(slug) {
  const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages?slug=${slug}`, { headers });
  const pages = await response.json();
  return pages[0] || null;
}

// Add animation classes to content
function addAnimationClasses(content) {
  // Add fade-in-up to columns
  content = content.replace(
    /<!-- wp:column /g,
    '<!-- wp:column {"className":"fade-in-up stagger-delay-1"} '
  );

  // Add fade-in-up to headings
  content = content.replace(
    /<!-- wp:heading /g,
    '<!-- wp:heading {"className":"fade-in-up"} '
  );

  // Add service-card and glow-on-hover to bordered groups
  content = content.replace(
    /"border":\{"width":"1px","color":"#e5e7eb","radius":"12px"\}/g,
    '"border":{"width":"1px","color":"#e5e7eb","radius":"12px"},"className":"service-card glow-on-hover fade-in-up"'
  );

  // Add btn-animated to buttons
  content = content.replace(
    /<!-- wp:button /g,
    '<!-- wp:button {"className":"btn-animated btn-pulse"} '
  );

  return content;
}

// Update page
async function updatePage(pageId, content) {
  const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${pageId}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ content })
  });

  if (response.ok) {
    const page = await response.json();
    console.log(`✅ Updated: ${page.title.rendered}`);
    console.log(`   URL: ${page.link}`);
    return page;
  } else {
    const error = await response.text();
    console.log(`❌ Failed:`, error.substring(0, 200));
    return null;
  }
}

// Main
async function main() {
  console.log('==========================================');
  console.log('Adding Animations to Pages');
  console.log('==========================================\n');

  await getCurrentTheme();

  const pages = ['home', 'services', 'about', 'contact'];

  for (const slug of pages) {
    console.log(`\nProcessing: ${slug}...`);
    const page = await getPage(slug);

    if (!page) {
      console.log(`❌ Page not found: ${slug}`);
      continue;
    }

    const updatedContent = addAnimationClasses(page.content.rendered);

    if (updatedContent !== page.content.rendered) {
      await updatePage(page.id, updatedContent);
    } else {
      console.log(`ℹ️  No changes needed for ${slug}`);
    }

    // Wait between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n==========================================');
  console.log('✅ DONE! Pages updated with animations');
  console.log('==========================================\n');
  console.log('Visit your site to see the animations!');
  console.log(WP_URL);
}

main().catch(console.error);
