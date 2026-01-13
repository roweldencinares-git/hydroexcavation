import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://silver-raccoon-464412.hostingersite.com';
const WP_USER = process.env.BEACH_HYDROVAC_WP_USER;
const WP_APP_PASSWORD = process.env.BEACH_HYDROVAC_WP_PASSWORD;

const headers = {
  'Authorization': 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64'),
  'Content-Type': 'application/json'
};

// Get page
async function getPage(slug) {
  const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages?slug=${slug}`, { headers });
  const pages = await response.json();
  return pages[0] || null;
}

// Add animation classes to Gutenberg blocks
function addAnimationClassesToBlocks(content) {
  // Get the raw content (not rendered)
  let updated = content;

  // Add fade-in-up to columns
  updated = updated.replace(
    /<!-- wp:column -->/g,
    '<!-- wp:column {"className":"fade-in-up"} -->'
  );

  updated = updated.replace(
    /<!-- wp:column {/g,
    '<!-- wp:column {"className":"fade-in-up",'
  );

  // Add fade-in-up to groups (cards)
  updated = updated.replace(
    /<!-- wp:group {/g,
    '<!-- wp:group {"className":"service-card glow-on-hover fade-in-up",'
  );

  // Add fade-in-up to headings
  updated = updated.replace(
    /<!-- wp:heading -->/g,
    '<!-- wp:heading {"className":"fade-in-up"} -->'
  );

  updated = updated.replace(
    /<!-- wp:heading {([^}]*)} -->/g,
    (match, attrs) => {
      if (!attrs.includes('"className"')) {
        return `<!-- wp:heading {${attrs},"className":"fade-in-up"} -->`;
      }
      return match;
    }
  );

  // Add btn-animated to buttons
  updated = updated.replace(
    /<!-- wp:button {/g,
    '<!-- wp:button {"className":"btn-animated btn-pulse",'
  );

  updated = updated.replace(
    /<!-- wp:button -->/g,
    '<!-- wp:button {"className":"btn-animated btn-pulse"} -->'
  );

  return updated;
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
    return page;
  } else {
    const error = await response.text();
    console.log(`❌ Error:`, error.substring(0, 300));
    return null;
  }
}

// Main
async function main() {
  console.log('==========================================');
  console.log('Properly Adding Animation Classes');
  console.log('==========================================\n');

  const pages = ['home', 'services', 'about', 'contact'];

  for (const slug of pages) {
    console.log(`\n📄 Processing: ${slug}...`);

    // Get page with raw content
    const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages?slug=${slug}`, { headers });
    const pagesData = await response.json();
    const page = pagesData[0];

    if (!page) {
      console.log(`❌ Not found: ${slug}`);
      continue;
    }

    // Get raw content (not rendered)
    const rawContent = page.content.raw;
    console.log(`   Original length: ${rawContent.length} chars`);

    // Add animation classes
    const updatedContent = addAnimationClassesToBlocks(rawContent);
    console.log(`   Updated length: ${updatedContent.length} chars`);

    if (updatedContent !== rawContent) {
      const updated = await updatePage(page.id, updatedContent);
      if (updated) {
        console.log(`✅ ${updated.title.rendered} - UPDATED`);
        console.log(`   ${updated.link}`);
      }
    } else {
      console.log(`ℹ️  No changes needed`);
    }

    // Wait between requests
    await new Promise(resolve => setTimeout(resolve, 1500));
  }

  console.log('\n==========================================');
  console.log('✅ DONE!');
  console.log('==========================================\n');
  console.log('Now visit your site and scroll down!');
  console.log('👉 ' + WP_URL);
}

main().catch(console.error);
