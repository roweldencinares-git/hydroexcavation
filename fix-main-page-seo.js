import 'dotenv/config';
import fetch from 'node-fetch';

/**
 * Fix Main Page SEO - Titles and Meta Descriptions
 *
 * Updates the main pages with keyword-optimized titles and descriptions
 */

const WP_URL = 'https://beachhydrovac.com';
const WP_USER = process.env.BEACH_HYDROVAC_WP_USER;
const WP_APP_PASSWORD = process.env.BEACH_HYDROVAC_WP_PASSWORD;

const headers = {
  'Authorization': 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64'),
  'Content-Type': 'application/json'
};

// Optimized SEO for main pages
const PAGE_SEO = {
  // Homepage
  'home': {
    slug: '',
    title: 'Home',
    yoast_title: 'Hydro Excavation Virginia | Veteran-Owned | Beach Hydrovac',
    yoast_description: 'Virginia\'s trusted hydro excavation company. Potholing, daylighting, SUE Level A verification. Serving Virginia Beach, Norfolk, Richmond. Call 757-785-5177 for a free quote.',
    focus_keyword: 'hydro excavation virginia'
  },
  // Services page
  'services': {
    slug: 'services',
    title: 'Services',
    yoast_title: 'Hydro Excavation Services | Potholing, Daylighting, SUE | Beach Hydrovac',
    yoast_description: 'Professional hydro excavation services: potholing, daylighting, slot trenching, SUE Level A verification. Safe, non-destructive excavation in Virginia. Get a quote today.',
    focus_keyword: 'hydro excavation services'
  },
  // Contact page
  'contact': {
    slug: 'contact',
    title: 'Contact',
    yoast_title: 'Contact Beach Hydrovac | Get a Free Quote | 757-785-5177',
    yoast_description: 'Request a free hydro excavation quote. Serving Virginia Beach, Norfolk, Chesapeake, Richmond & Hampton Roads. Call 757-785-5177 or fill out our online form.',
    focus_keyword: 'hydro excavation quote virginia'
  },
  // About page
  'about': {
    slug: 'about',
    title: 'About',
    yoast_title: 'About Beach Hydrovac | Veteran-Owned Hydro Excavation Company',
    yoast_description: 'Beach Hydrovac is a veteran-owned hydro excavation company serving Virginia, North Carolina, Maryland & Delaware. Military precision meets safe excavation. Learn more.',
    focus_keyword: 'veteran owned hydro excavation'
  },
  // FAQ page
  'faq': {
    slug: 'faq',
    title: 'FAQ',
    yoast_title: 'Hydro Excavation FAQ | Questions Answered | Beach Hydrovac',
    yoast_description: 'Get answers to common hydro excavation questions: What is hydrovac? How much does it cost? Is it safe? Learn about potholing, daylighting, and SUE services.',
    focus_keyword: 'hydro excavation faq'
  }
};

async function getPageBySlug(slug) {
  try {
    // For homepage, get page with front page setting
    if (slug === '') {
      const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages?per_page=100`, { headers });
      const pages = await response.json();
      // Find the homepage (usually has slug 'home' or is set as front page)
      const homePage = pages.find(p => p.slug === 'home' || p.slug === 'homepage' || p.slug === 'front-page');
      return homePage;
    }

    const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages?slug=${slug}`, { headers });
    const pages = await response.json();
    return pages[0];
  } catch (error) {
    console.error(`Error fetching page ${slug}:`, error.message);
    return null;
  }
}

async function updatePageSEO(pageId, seoData) {
  try {
    // Update page with Yoast SEO fields
    const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${pageId}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        meta: {
          _yoast_wpseo_title: seoData.yoast_title,
          _yoast_wpseo_metadesc: seoData.yoast_description,
          _yoast_wpseo_focuskw: seoData.focus_keyword
        }
      })
    });

    if (response.ok) {
      return true;
    } else {
      const error = await response.json();
      console.log(`  Note: Yoast fields may not be exposed. Error: ${error.message || 'Unknown'}`);
      return false;
    }
  } catch (error) {
    console.error(`Error updating page ${pageId}:`, error.message);
    return false;
  }
}

async function updatePageTitle(pageId, newTitle) {
  try {
    const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${pageId}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title: newTitle
      })
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

async function listAllPages() {
  try {
    const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages?per_page=100`, { headers });
    const pages = await response.json();
    return pages;
  } catch (error) {
    console.error('Error listing pages:', error.message);
    return [];
  }
}

async function main() {
  console.log('==========================================');
  console.log('Fix Main Page SEO - Beach Hydrovac');
  console.log('==========================================\n');

  // First, list all pages to find the main ones
  console.log('Fetching all pages...\n');
  const allPages = await listAllPages();

  // Find the main pages
  const mainPages = {
    home: allPages.find(p => p.slug === 'home' || p.slug === 'homepage'),
    services: allPages.find(p => p.slug === 'services'),
    contact: allPages.find(p => p.slug === 'contact'),
    about: allPages.find(p => p.slug === 'about'),
    faq: allPages.find(p => p.slug === 'faq')
  };

  console.log('Found Pages:');
  for (const [key, page] of Object.entries(mainPages)) {
    if (page) {
      console.log(`  ${key}: ID ${page.id} - "${page.title.rendered}"`);
    } else {
      console.log(`  ${key}: NOT FOUND`);
    }
  }
  console.log('');

  // Current vs Recommended SEO
  console.log('==========================================');
  console.log('CURRENT vs RECOMMENDED SEO');
  console.log('==========================================\n');

  for (const [key, seoData] of Object.entries(PAGE_SEO)) {
    const page = mainPages[key];
    if (page) {
      console.log(`📄 ${key.toUpperCase()} PAGE (ID: ${page.id})`);
      console.log(`   Current Title: "${page.title.rendered} - Beach HydroVac"`);
      console.log(`   Recommended:   "${seoData.yoast_title}"`);
      console.log(`   Meta Desc:     "${seoData.yoast_description}"`);
      console.log(`   Focus Keyword: "${seoData.focus_keyword}"`);
      console.log('');
    }
  }

  // Attempt to update via Yoast API
  console.log('==========================================');
  console.log('UPDATING PAGE SEO...');
  console.log('==========================================\n');

  let updatedCount = 0;
  let failedCount = 0;

  for (const [key, seoData] of Object.entries(PAGE_SEO)) {
    const page = mainPages[key];
    if (page) {
      console.log(`Updating ${key} page (ID: ${page.id})...`);
      const success = await updatePageSEO(page.id, seoData);
      if (success) {
        console.log(`  ✅ SEO updated successfully`);
        updatedCount++;
      } else {
        failedCount++;
      }
    }
  }

  console.log('\n==========================================');
  console.log('RESULTS');
  console.log('==========================================\n');

  console.log(`Updated: ${updatedCount} pages`);
  console.log(`Failed: ${failedCount} pages`);

  if (failedCount > 0) {
    console.log('\n⚠️  Some updates failed. This usually means:');
    console.log('   - Yoast SEO meta fields are not exposed via REST API');
    console.log('   - Need to enable "Show in REST API" for Yoast fields');
    console.log('\n📋 MANUAL UPDATE REQUIRED:');
    console.log('   1. Go to WordPress Admin → Pages');
    console.log('   2. Edit each page');
    console.log('   3. Scroll to Yoast SEO section');
    console.log('   4. Update SEO title and meta description');
    console.log('\n   Use the recommended values above for each page.');
  }

  // Generate PHP code alternative
  console.log('\n==========================================');
  console.log('ALTERNATIVE: PHP Code for functions.php');
  console.log('==========================================\n');

  console.log('If Yoast is not installed, add this to functions.php:\n');

  const phpCode = `
// ============================================================
// CUSTOM SEO TITLES AND META DESCRIPTIONS
// ============================================================

/**
 * Custom SEO titles for main pages
 */
function beachhydrovac_custom_page_titles($title) {
    if (is_front_page() || is_home()) {
        return 'Hydro Excavation Virginia | Veteran-Owned | Beach Hydrovac';
    }
    if (is_page('services')) {
        return 'Hydro Excavation Services | Potholing, Daylighting, SUE | Beach Hydrovac';
    }
    if (is_page('contact')) {
        return 'Contact Beach Hydrovac | Get a Free Quote | 757-785-5177';
    }
    if (is_page('about')) {
        return 'About Beach Hydrovac | Veteran-Owned Hydro Excavation Company';
    }
    if (is_page('faq')) {
        return 'Hydro Excavation FAQ | Questions Answered | Beach Hydrovac';
    }
    return $title;
}
add_filter('pre_get_document_title', 'beachhydrovac_custom_page_titles', 99);

/**
 * Custom meta descriptions for main pages
 */
function beachhydrovac_custom_meta_descriptions() {
    $description = '';

    if (is_front_page() || is_home()) {
        $description = "Virginia's trusted hydro excavation company. Potholing, daylighting, SUE Level A verification. Serving Virginia Beach, Norfolk, Richmond. Call 757-785-5177 for a free quote.";
    } elseif (is_page('services')) {
        $description = "Professional hydro excavation services: potholing, daylighting, slot trenching, SUE Level A verification. Safe, non-destructive excavation in Virginia. Get a quote today.";
    } elseif (is_page('contact')) {
        $description = "Request a free hydro excavation quote. Serving Virginia Beach, Norfolk, Chesapeake, Richmond & Hampton Roads. Call 757-785-5177 or fill out our online form.";
    } elseif (is_page('about')) {
        $description = "Beach Hydrovac is a veteran-owned hydro excavation company serving Virginia, North Carolina, Maryland & Delaware. Military precision meets safe excavation. Learn more.";
    } elseif (is_page('faq')) {
        $description = "Get answers to common hydro excavation questions: What is hydrovac? How much does it cost? Is it safe? Learn about potholing, daylighting, and SUE services.";
    }

    if ($description) {
        echo '<meta name="description" content="' . esc_attr($description) . '" />' . "\\n";
    }
}
add_action('wp_head', 'beachhydrovac_custom_meta_descriptions', 1);

// ============================================================
// END CUSTOM SEO
// ============================================================
`;

  console.log(phpCode);
}

main().catch(console.error);
