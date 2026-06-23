import 'dotenv/config';
import fetch from 'node-fetch';
import { readFileSync } from 'fs';

/**
 * Deploy SEO Titles via WordPress
 *
 * Attempts multiple methods to deploy the custom SEO titles
 */

const WP_URL = 'https://beachhydrovac.com';
const WP_USER = process.env.BEACH_HYDROVAC_WP_USER;
const WP_APP_PASSWORD = process.env.BEACH_HYDROVAC_WP_PASSWORD;

const headers = {
  'Authorization': 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64'),
  'Content-Type': 'application/json'
};

const phpCode = readFileSync('./add-seo-titles.php', 'utf-8');

// Page SEO data for direct Yoast update
const PAGE_SEO = {
  3201: { // Home
    _yoast_wpseo_title: 'Hydro Excavation Virginia | Veteran-Owned | Beach Hydrovac',
    _yoast_wpseo_metadesc: "Virginia's trusted hydro excavation company. Potholing, daylighting, SUE Level A verification. Serving Virginia Beach, Norfolk, Richmond. Call 757-785-5177 for a free quote."
  },
  3332: { // Services
    _yoast_wpseo_title: 'Hydro Excavation Services | Potholing, Daylighting, SUE | Beach Hydrovac',
    _yoast_wpseo_metadesc: "Professional hydro excavation services: potholing, daylighting, slot trenching, SUE Level A verification. Safe, non-destructive excavation in Virginia. Get a quote today."
  },
  3434: { // Contact
    _yoast_wpseo_title: 'Contact Beach Hydrovac | Get a Free Quote | 757-785-5177',
    _yoast_wpseo_metadesc: "Request a free hydro excavation quote. Serving Virginia Beach, Norfolk, Chesapeake, Richmond & Hampton Roads. Call 757-785-5177 or fill out our online form."
  },
  3346: { // About
    _yoast_wpseo_title: 'About Beach Hydrovac | Veteran-Owned Hydro Excavation Company',
    _yoast_wpseo_metadesc: "Beach Hydrovac is a veteran-owned hydro excavation company serving Virginia, North Carolina, Maryland & Delaware. Military precision meets safe excavation. Learn more."
  },
  3454: { // FAQ
    _yoast_wpseo_title: 'Hydro Excavation FAQ | Questions Answered | Beach Hydrovac',
    _yoast_wpseo_metadesc: "Get answers to common hydro excavation questions: What is hydrovac? How much does it cost? Is it safe? Learn about potholing, daylighting, and SUE services."
  }
};

async function tryUpdatePostMeta(pageId, metaKey, metaValue) {
  try {
    // Try direct post meta update
    const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${pageId}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        meta: {
          [metaKey]: metaValue
        }
      })
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

async function checkSureRankSEO() {
  try {
    // Check if SureRank has REST API endpoints
    const response = await fetch(`${WP_URL}/wp-json/surerank/v1/`, { headers });
    return response.ok;
  } catch (error) {
    return false;
  }
}

async function updateAllPagesSEO() {
  console.log('Attempting to update page meta directly...\n');

  for (const [pageId, seoData] of Object.entries(PAGE_SEO)) {
    console.log(`Page ${pageId}:`);

    // Try multiple meta key formats
    const metaKeys = [
      '_yoast_wpseo_title',
      '_aioseo_title',
      '_surerank_title',
      'rank_math_title',
      '_genesis_title'
    ];

    const descKeys = [
      '_yoast_wpseo_metadesc',
      '_aioseo_description',
      '_surerank_description',
      'rank_math_description',
      '_genesis_description'
    ];

    let titleUpdated = false;
    let descUpdated = false;

    for (const key of metaKeys) {
      const success = await tryUpdatePostMeta(pageId, key, seoData._yoast_wpseo_title);
      if (success) {
        console.log(`  ✅ Title saved to ${key}`);
        titleUpdated = true;
        break;
      }
    }

    for (const key of descKeys) {
      const success = await tryUpdatePostMeta(pageId, key, seoData._yoast_wpseo_metadesc);
      if (success) {
        console.log(`  ✅ Description saved to ${key}`);
        descUpdated = true;
        break;
      }
    }

    if (!titleUpdated) console.log(`  ⚠️  Title meta not saved (may need manual update)`);
    if (!descUpdated) console.log(`  ⚠️  Description meta not saved (may need manual update)`);
  }
}

async function main() {
  console.log('==========================================');
  console.log('Deploy SEO Titles - Beach Hydrovac');
  console.log('==========================================\n');

  // Check available SEO plugins
  console.log('Checking SEO plugin APIs...');
  const hasSureRank = await checkSureRankSEO();
  console.log(`  SureRank SEO API: ${hasSureRank ? 'Available' : 'Not available'}\n`);

  // Try updating page meta
  await updateAllPagesSEO();

  console.log('\n==========================================');
  console.log('MANUAL DEPLOYMENT REQUIRED');
  console.log('==========================================\n');

  console.log('The SEO titles need to be added via PHP code.');
  console.log('File: add-seo-titles.php\n');

  console.log('STEP 1: Go to WordPress Admin');
  console.log('  https://beachhydrovac.com/wp-admin/\n');

  console.log('STEP 2: Navigate to Theme Editor');
  console.log('  Appearance → Theme File Editor');
  console.log('  Select: beachhydrovac-child');
  console.log('  Open: functions.php\n');

  console.log('STEP 3: Add the code at the END of functions.php');
  console.log('  (Before closing ?> if present)\n');

  console.log('STEP 4: Click "Update File"\n');

  console.log('STEP 5: Clear cache');
  console.log('  LiteSpeed Cache → Purge All\n');

  console.log('==========================================');
  console.log('CODE TO ADD (from add-seo-titles.php):');
  console.log('==========================================\n');

  console.log(phpCode);
}

main().catch(console.error);
