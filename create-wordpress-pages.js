import 'dotenv/config';
import fetch from 'node-fetch';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// WordPress Configuration
const WP_URL = 'https://silver-raccoon-464412.hostingersite.com';
const WP_USER = process.env.BEACH_HYDROVAC_WP_USER;
const WP_APP_PASSWORD = process.env.BEACH_HYDROVAC_WP_PASSWORD;

const headers = {
  'Authorization': 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64'),
  'Content-Type': 'application/json'
};

// Helper function to clean Gutenberg content from .txt files
function cleanGutenbergContent(filePath) {
  const content = readFileSync(filePath, 'utf-8');

  // If it's a blog post file with instructions at the top, skip the instructions
  if (content.includes('INSTRUCTIONS:')) {
    const lines = content.split('\n');
    let startIndex = lines.findIndex(line => line.trim() === '---');
    if (startIndex !== -1) {
      // Find second --- separator
      startIndex = lines.findIndex((line, idx) => idx > startIndex && line.trim() === '---');
      if (startIndex !== -1) {
        return lines.slice(startIndex + 1).join('\n').trim();
      }
    }
  }

  return content.trim();
}

// Create a page
async function createPage(title, content, status = 'publish') {
  try {
    console.log(`\nCreating page: ${title}...`);

    const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title,
        content,
        status
      })
    });

    if (response.ok) {
      const page = await response.json();
      console.log(`✅ Created: ${title} (ID: ${page.id})`);
      console.log(`   URL: ${page.link}`);
      return page;
    } else {
      const error = await response.text();
      console.log(`❌ Failed to create ${title}`);
      console.log(`   Status: ${response.status} ${response.statusText}`);
      console.log(`   Error: ${error.substring(0, 300)}`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error creating ${title}:`, error.message);
    return null;
  }
}

// Create a blog post
async function createPost(title, content, status = 'publish') {
  try {
    console.log(`\nCreating blog post: ${title}...`);

    const response = await fetch(`${WP_URL}/wp-json/wp/v2/posts`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title,
        content,
        status
      })
    });

    if (response.ok) {
      const post = await response.json();
      console.log(`✅ Created: ${title} (ID: ${post.id})`);
      console.log(`   URL: ${post.link}`);
      return post;
    } else {
      const error = await response.text();
      console.log(`❌ Failed to create ${title}`);
      console.log(`   Status: ${response.status} ${response.statusText}`);
      console.log(`   Error: ${error.substring(0, 300)}`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error creating ${title}:`, error.message);
    return null;
  }
}

// Set homepage
async function setHomepage(pageId) {
  try {
    console.log(`\nSetting page ${pageId} as homepage...`);

    // Update show_on_front setting
    const response1 = await fetch(`${WP_URL}/wp-json/wp/v2/settings`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        show_on_front: 'page',
        page_on_front: pageId
      })
    });

    if (response1.ok) {
      console.log('✅ Homepage set successfully');
      return true;
    } else {
      const error = await response1.text();
      console.log('❌ Failed to set homepage');
      console.log(`   Error: ${error.substring(0, 300)}`);
      return false;
    }
  } catch (error) {
    console.error('❌ Error setting homepage:', error.message);
    return false;
  }
}

// Main execution
async function main() {
  console.log('==========================================');
  console.log('Beach Hydrovac WordPress Page Creator');
  console.log('==========================================');
  console.log('URL:', WP_URL);
  console.log('User:', WP_USER);
  console.log('Password:', WP_APP_PASSWORD ? '✓ Provided' : '✗ Missing');

  if (!WP_USER || !WP_APP_PASSWORD) {
    console.error('\n❌ Missing credentials!');
    console.error('Please create a .env file with:');
    console.error('BEACH_HYDROVAC_WP_USER=your_username');
    console.error('BEACH_HYDROVAC_WP_PASSWORD=your_app_password');
    process.exit(1);
  }

  console.log('\n==========================================');
  console.log('Creating Pages...');
  console.log('==========================================');

  // Create Homepage
  const homepageContent = cleanGutenbergContent(join(__dirname, 'wordpress-pages/01-homepage.txt'));
  const homepage = await createPage('Home', homepageContent);

  // Wait a bit between requests
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Create Services Page
  const servicesContent = cleanGutenbergContent(join(__dirname, 'wordpress-pages/02-services.txt'));
  await createPage('Services', servicesContent);
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Create About Page
  const aboutContent = cleanGutenbergContent(join(__dirname, 'wordpress-pages/03-about.txt'));
  await createPage('About', aboutContent);
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Create Contact Page
  const contactContent = cleanGutenbergContent(join(__dirname, 'wordpress-pages/04-contact.txt'));
  await createPage('Contact', contactContent);
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log('\n==========================================');
  console.log('Creating Blog Posts...');
  console.log('==========================================');

  // Create Blog Post 1
  const post1Content = cleanGutenbergContent(join(__dirname, 'wordpress-pages/blog-post-1-what-is-hydro-excavation.txt'));
  await createPost('What is Hydro Excavation? A Complete Guide', post1Content);
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Create Blog Post 2
  const post2Content = cleanGutenbergContent(join(__dirname, 'wordpress-pages/blog-post-2-sue-level-a-verification.txt'));
  await createPost('Understanding SUE Level A Verification and Why It Matters', post2Content);
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Create Blog Post 3
  const post3Content = cleanGutenbergContent(join(__dirname, 'wordpress-pages/blog-post-3-winter-excavation.txt'));
  await createPost('Cold Weather Excavation: Why Hydro Excavation Works When Others Can\'t', post3Content);

  console.log('\n==========================================');
  console.log('Setting Homepage...');
  console.log('==========================================');

  if (homepage) {
    await setHomepage(homepage.id);
  }

  console.log('\n==========================================');
  console.log('✅ DONE! All pages and posts created.');
  console.log('==========================================');
  console.log('\nNext steps:');
  console.log('1. Visit your site: ' + WP_URL);
  console.log('2. Update hero images in each page');
  console.log('3. Add featured images to blog posts');
  console.log('4. Create menu: Appearance → Menus');
  console.log('5. Customize footer: Appearance → Customize → Footer');
}

main().catch(console.error);
