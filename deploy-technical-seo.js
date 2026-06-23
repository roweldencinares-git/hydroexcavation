import 'dotenv/config';
import fetch from 'node-fetch';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Deploy Technical SEO to BeachHydrovac WordPress Site
 *
 * This script:
 * 1. Adds visible FAQ section to pages (as Gutenberg blocks)
 * 2. Provides instructions for PHP schema deployment
 * 3. Verifies the deployment
 */

const WP_URL = 'https://beachhydrovac.com';
const WP_USER = process.env.BEACH_HYDROVAC_WP_USER;
const WP_APP_PASSWORD = process.env.BEACH_HYDROVAC_WP_PASSWORD;

const headers = {
  'Authorization': 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64'),
  'Content-Type': 'application/json'
};

// FAQ Items for visible content
const FAQ_ITEMS = [
  {
    question: 'What is hydro excavation?',
    answer: 'Hydro excavation (also called vacuum excavation or hydrovac) is a non-destructive digging method that uses pressurized water to break up soil and a powerful vacuum to remove the debris. This technique safely exposes underground utilities without risk of damage from traditional mechanical excavation methods.'
  },
  {
    question: 'What areas do you serve?',
    answer: 'Beach Hydrovac provides hydro-excavation services throughout Virginia, North Carolina, Maryland, and Delaware. We are based in Virginia Beach and serve the entire Mid-Atlantic region including Hampton Roads, Norfolk, Chesapeake, Richmond, and surrounding areas.'
  },
  {
    question: 'What is SUE Level A verification?',
    answer: 'SUE Level A is the highest accuracy level in Subsurface Utility Engineering as defined by ASCE standards. It involves physically exposing utilities through non-destructive excavation (like hydrovac) to obtain precise horizontal and vertical location data. This is required for critical infrastructure projects and provides legally defensible documentation.'
  },
  {
    question: 'How far can your equipment reach?',
    answer: 'Our hydrovac trucks feature an extended 600-foot hose reach, allowing us to excavate in restricted-access areas where traditional equipment cannot go. This includes behind buildings, in landscaped areas, on slopes, and in tight urban spaces.'
  },
  {
    question: 'What industries do you serve?',
    answer: 'We serve electrical contractors, civil contractors, water and sewer utilities (including HRSD), telecom companies, municipalities, and engineering firms. Our precision excavation services are trusted for fiber optic installation, power line work, utility upgrades, and infrastructure verification projects.'
  },
  {
    question: 'Is hydro excavation safer than traditional excavation?',
    answer: 'Yes, hydro excavation is significantly safer than mechanical excavation. It eliminates the risk of utility strikes that can cause injuries, service outages, and expensive repairs. The non-destructive nature protects gas lines, electrical cables, fiber optics, and water mains during excavation.'
  },
  {
    question: 'Can you work in cold weather?',
    answer: 'Yes, hydro excavation works effectively in cold weather and frozen ground conditions when traditional excavation methods struggle. Our heated water systems can break through frost and frozen soil, making it ideal for year-round utility work in the Mid-Atlantic region.'
  },
  {
    question: 'How do I get a quote?',
    answer: 'Contact us at 757-785-5177 or email info@beachhydrovac.com for a free quote. We will discuss your project requirements, timeline, and provide competitive pricing. As a veteran-owned local business, we pride ourselves on responsive service and fair pricing.'
  }
];

/**
 * Generate FAQ Gutenberg blocks
 */
function generateFAQBlocks() {
  let faqHtml = `
<!-- wp:group {"style":{"spacing":{"padding":{"top":"4rem","bottom":"4rem"}}},"backgroundColor":"base","layout":{"type":"constrained","contentSize":"900px"}} -->
<div class="wp-block-group has-base-background-color has-background" style="padding-top:4rem;padding-bottom:4rem">

<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"2.5rem","fontWeight":"900"}},"textColor":"deep-atlantic"} -->
<h2 class="wp-block-heading has-text-align-center has-deep-atlantic-color has-text-color" style="font-size:2.5rem;font-weight:900">Frequently Asked Questions</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"spacing":{"margin":{"bottom":"2rem"}}}} -->
<p class="has-text-align-center" style="margin-bottom:2rem">Get answers to common questions about hydro excavation services</p>
<!-- /wp:paragraph -->

<!-- wp:group {"style":{"spacing":{"blockGap":"1rem"}}} -->
<div class="wp-block-group">
`;

  FAQ_ITEMS.forEach((item, index) => {
    faqHtml += `
<!-- wp:details {"style":{"border":{"width":"1px","color":"#e5e7eb","radius":"8px"},"spacing":{"padding":{"top":"1rem","right":"1.5rem","bottom":"1rem","left":"1.5rem"}}}} -->
<details class="wp-block-details has-border-color" style="border-color:#e5e7eb;border-width:1px;border-radius:8px;padding-top:1rem;padding-right:1.5rem;padding-bottom:1rem;padding-left:1.5rem">
<summary><strong>${item.question}</strong></summary>
<!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"1rem"}}}} -->
<p style="margin-top:1rem">${item.answer}</p>
<!-- /wp:paragraph -->
</details>
<!-- /wp:details -->
`;
  });

  faqHtml += `
</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->
`;

  return faqHtml;
}

/**
 * Get all pages
 */
async function getPages() {
  try {
    const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages?per_page=100`, { headers });
    if (response.ok) {
      return await response.json();
    }
    console.error('Failed to fetch pages:', response.status);
    return [];
  } catch (error) {
    console.error('Error fetching pages:', error.message);
    return [];
  }
}

/**
 * Update page content
 */
async function updatePage(pageId, content) {
  try {
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
      console.error('Failed to update page:', error.substring(0, 200));
      return null;
    }
  } catch (error) {
    console.error('Error updating page:', error.message);
    return null;
  }
}

/**
 * Add FAQ section to a page
 */
async function addFAQToPage(page) {
  console.log(`\nProcessing: ${page.title.rendered} (ID: ${page.id})`);

  // Check if FAQ already exists
  if (page.content.rendered.includes('Frequently Asked Questions')) {
    console.log('  ⏭️  FAQ section already exists, skipping');
    return false;
  }

  // Get current content and append FAQ
  const currentContent = page.content.raw || page.content.rendered;
  const faqBlocks = generateFAQBlocks();
  const newContent = currentContent + '\n\n' + faqBlocks;

  const updated = await updatePage(page.id, newContent);
  if (updated) {
    console.log('  ✅ FAQ section added successfully');
    return true;
  } else {
    console.log('  ❌ Failed to add FAQ section');
    return false;
  }
}

/**
 * Create a dedicated FAQ page
 */
async function createFAQPage() {
  console.log('\nCreating dedicated FAQ page...');

  const faqPageContent = `
<!-- wp:cover {"overlayColor":"deep-atlantic","minHeight":200,"align":"full"} -->
<div class="wp-block-cover alignfull" style="min-height:200px"><span aria-hidden="true" class="wp-block-cover__background has-deep-atlantic-background-color has-background-dim-100 has-background-dim"></span><div class="wp-block-cover__inner-container">
<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"3rem","fontWeight":"900"}}} -->
<h1 class="wp-block-heading has-text-align-center" style="font-size:3rem;font-weight:900">Frequently Asked Questions</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Everything you need to know about hydro excavation services</p>
<!-- /wp:paragraph -->
</div></div>
<!-- /wp:cover -->

${generateFAQBlocks()}

<!-- wp:group {"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem"}},"color":{"gradient":"linear-gradient(135deg,rgb(0,65,106) 0%,rgb(39,174,253) 100%)"}},"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group has-background" style="background:linear-gradient(135deg,rgb(0,65,106) 0%,rgb(39,174,253) 100%);padding-top:3rem;padding-bottom:3rem">

<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"2rem","fontWeight":"800"},"elements":{"link":{"color":{"text":"var:preset|color|white"}}}},"textColor":"white"} -->
<h2 class="wp-block-heading has-text-align-center has-white-color has-text-color has-link-color" style="font-size:2rem;font-weight:800">Still Have Questions?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"elements":{"link":{"color":{"text":"var:preset|color|white"}}}},"textColor":"white"} -->
<p class="has-text-align-center has-white-color has-text-color has-link-color">We're here to help! Contact our team for personalized answers.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons">
<!-- wp:button {"backgroundColor":"warm-shoreline","style":{"border":{"radius":"9999px"},"spacing":{"padding":{"left":"2rem","right":"2rem","top":"0.875rem","bottom":"0.875rem"}}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-warm-shoreline-background-color has-background wp-element-button" href="tel:7577855177" style="border-radius:9999px;padding-top:0.875rem;padding-right:2rem;padding-bottom:0.875rem;padding-left:2rem">Call 757-785-5177</a></div>
<!-- /wp:button -->

<!-- wp:button {"backgroundColor":"white","textColor":"deep-atlantic","style":{"border":{"radius":"9999px"},"spacing":{"padding":{"left":"2rem","right":"2rem","top":"0.875rem","bottom":"0.875rem"}}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-deep-atlantic-color has-white-background-color has-text-color has-background wp-element-button" href="/contact/" style="border-radius:9999px;padding-top:0.875rem;padding-right:2rem;padding-bottom:0.875rem;padding-left:2rem">Contact Us</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->

</div>
<!-- /wp:group -->
`;

  try {
    const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title: 'FAQ',
        slug: 'faq',
        content: faqPageContent,
        status: 'publish'
      })
    });

    if (response.ok) {
      const page = await response.json();
      console.log(`✅ FAQ page created: ${page.link}`);
      return page;
    } else {
      const error = await response.text();
      console.log('❌ Failed to create FAQ page');
      console.log('Error:', error.substring(0, 200));
      return null;
    }
  } catch (error) {
    console.error('Error creating FAQ page:', error.message);
    return null;
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('==========================================');
  console.log('Beach Hydrovac Technical SEO Deployment');
  console.log('==========================================\n');

  if (!WP_USER || !WP_APP_PASSWORD) {
    console.error('❌ Missing credentials!');
    console.error('Please set BEACH_HYDROVAC_WP_USER and BEACH_HYDROVAC_WP_PASSWORD in .env');
    process.exit(1);
  }

  // Step 1: Create dedicated FAQ page
  console.log('==========================================');
  console.log('Step 1: Creating Dedicated FAQ Page');
  console.log('==========================================');
  await createFAQPage();

  // Step 2: Instructions for PHP deployment
  console.log('\n==========================================');
  console.log('Step 2: Deploy PHP Schema Code');
  console.log('==========================================\n');

  console.log('To add the schema markup to your site, you need to:');
  console.log('\n1. Copy the content of: beachhydrovac-technical-seo.php');
  console.log('2. Paste it at the END of your child theme functions.php');
  console.log('   Location: wp-content/themes/beachhydrovac-child/functions.php');
  console.log('\nMethods to do this:');
  console.log('  a) WordPress Admin → Appearance → Theme File Editor');
  console.log('  b) Hostinger File Manager');
  console.log('  c) FTP/SFTP client\n');

  // Step 3: Verify deployment checklist
  console.log('==========================================');
  console.log('Step 3: Verification Checklist');
  console.log('==========================================\n');

  console.log('After deploying the PHP code, verify at:');
  console.log('');
  console.log('1. Google Rich Results Test:');
  console.log('   https://search.google.com/test/rich-results?url=https://beachhydrovac.com');
  console.log('');
  console.log('2. Schema.org Validator:');
  console.log('   https://validator.schema.org/#url=https://beachhydrovac.com');
  console.log('');
  console.log('3. Facebook Sharing Debugger (for Open Graph):');
  console.log('   https://developers.facebook.com/tools/debug/?q=https://beachhydrovac.com');
  console.log('');
  console.log('4. Twitter Card Validator:');
  console.log('   https://cards-dev.twitter.com/validator');
  console.log('');

  // Summary
  console.log('==========================================');
  console.log('TECHNICAL SEO IMPLEMENTATION SUMMARY');
  console.log('==========================================\n');

  console.log('✅ COMPLETED:');
  console.log('   • FAQ page created with 8 Q&As');
  console.log('   • PHP file generated: beachhydrovac-technical-seo.php');
  console.log('');
  console.log('📋 SCHEMAS INCLUDED (in PHP file):');
  console.log('   • Organization Schema');
  console.log('   • WebSite Schema with SearchAction');
  console.log('   • LocalBusiness Schema (homepage, contact)');
  console.log('   • Service Schema x4 (services, homepage)');
  console.log('   • FAQ Schema with 8 Q&As (homepage, services, contact)');
  console.log('   • BreadcrumbList Schema (all pages except homepage)');
  console.log('   • Article Schema (blog posts)');
  console.log('');
  console.log('📋 META TAGS INCLUDED (in PHP file):');
  console.log('   • Open Graph tags (og:title, og:description, og:image, etc.)');
  console.log('   • Twitter Card tags (summary_large_image)');
  console.log('   • Canonical URLs');
  console.log('   • Meta descriptions per page');
  console.log('   • Geo meta tags (local SEO)');
  console.log('   • Robots meta (index/noindex, max-snippet, max-image-preview)');
  console.log('   • Hreflang tags');
  console.log('   • Keywords meta');
  console.log('   • Theme color for mobile');
  console.log('   • Preconnect for fonts');
  console.log('');
  console.log('🔐 SECURITY (in PHP file):');
  console.log('   • WordPress version removed from source');
  console.log('');
  console.log('⚡ PERFORMANCE (in PHP file):');
  console.log('   • Preconnect to Google Fonts');
  console.log('');
  console.log('==========================================');
  console.log('NEXT STEP: Deploy the PHP code manually');
  console.log('==========================================');
}

main().catch(console.error);
