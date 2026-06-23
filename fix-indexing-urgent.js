import 'dotenv/config';
import fetch from 'node-fetch';

/**
 * URGENT: Fix Beach Hydrovac Google Indexing
 *
 * This script checks indexing status and provides fixes
 */

const WP_URL = 'https://beachhydrovac.com';

async function checkNoIndexTags() {
  console.log('Checking for noindex tags...\n');

  const pages = [
    '/',
    '/services/',
    '/contact/',
    '/about/',
    '/faq/',
    '/locations/virginia-beach/',
  ];

  for (const page of pages) {
    try {
      const response = await fetch(`${WP_URL}${page}`);
      const html = await response.text();

      const hasNoIndex = html.includes('noindex') || html.includes('NOINDEX');
      const robotsMeta = html.match(/<meta[^>]*robots[^>]*>/gi) || [];

      console.log(`${WP_URL}${page}`);
      if (hasNoIndex) {
        console.log(`  ⚠️  WARNING: Found "noindex" in page!`);
        robotsMeta.forEach(tag => console.log(`  Tag: ${tag}`));
      } else {
        console.log(`  ✅ No noindex tags found`);
      }

      // Check for canonical issues
      const canonical = html.match(/<link[^>]*rel="canonical"[^>]*>/gi);
      if (canonical) {
        console.log(`  Canonical: ${canonical[0]}`);
      }
    } catch (error) {
      console.log(`  ❌ Error checking page: ${error.message}`);
    }
  }
}

async function checkServerHeaders() {
  console.log('\n\nChecking server headers...\n');

  try {
    const response = await fetch(WP_URL, { method: 'HEAD' });

    console.log('Response Headers:');
    console.log(`  Status: ${response.status}`);
    console.log(`  X-Robots-Tag: ${response.headers.get('x-robots-tag') || 'Not set (good)'}`);
    console.log(`  Cache-Control: ${response.headers.get('cache-control') || 'Not set'}`);

    if (response.headers.get('x-robots-tag')?.includes('noindex')) {
      console.log('\n  ⚠️  CRITICAL: Server is sending X-Robots-Tag: noindex!');
      console.log('  This MUST be removed from server config or .htaccess');
    }
  } catch (error) {
    console.log(`  ❌ Error: ${error.message}`);
  }
}

async function pingSitemap() {
  console.log('\n\nPinging sitemap to Google...\n');

  const sitemapUrl = `${WP_URL}/sitemap_index.xml`;
  const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;

  try {
    const response = await fetch(pingUrl);
    if (response.ok) {
      console.log(`✅ Sitemap pinged successfully!`);
      console.log(`   URL: ${pingUrl}`);
    } else {
      console.log(`❌ Ping failed: ${response.status}`);
    }
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
  }
}

async function main() {
  console.log('==========================================');
  console.log('URGENT: Beach Hydrovac Indexing Check');
  console.log('==========================================\n');

  console.log('CRITICAL ISSUE DETECTED:');
  console.log('beachhydrovac.com is NOT appearing in Google search results!\n');
  console.log('This means all SEO work is currently invisible.\n');

  await checkNoIndexTags();
  await checkServerHeaders();
  await pingSitemap();

  console.log('\n==========================================');
  console.log('IMMEDIATE ACTIONS REQUIRED');
  console.log('==========================================\n');

  console.log('1. VERIFY GOOGLE SEARCH CONSOLE');
  console.log('   Go to: https://search.google.com/search-console/');
  console.log('   Add property: beachhydrovac.com');
  console.log('   Verify via DNS TXT record or HTML file\n');

  console.log('2. SUBMIT SITEMAP');
  console.log('   In GSC sidebar: Sitemaps → Add');
  console.log('   Enter: sitemap_index.xml');
  console.log('   Click Submit\n');

  console.log('3. REQUEST INDEXING');
  console.log('   In GSC: URL Inspection');
  console.log('   Test: https://beachhydrovac.com/');
  console.log('   Click "Request Indexing"');
  console.log('   Repeat for: /services/, /contact/, /about/, /faq/\n');

  console.log('4. CLAIM GOOGLE BUSINESS PROFILE');
  console.log('   Go to: https://business.google.com/');
  console.log('   Search for "Beach Hydrovac"');
  console.log('   Claim and verify the listing\n');

  console.log('5. CHECK FOR HOSTING ISSUES');
  console.log('   Contact host to ensure no server-level blocks');
  console.log('   Check .htaccess for any blocking rules\n');

  console.log('==========================================');
  console.log('WHY THIS MATTERS');
  console.log('==========================================\n');

  console.log('Your competitors are indexed:');
  console.log('  • Black Hydrovac: 10+ pages indexed');
  console.log('  • DigMasters: Indexed');
  console.log('  • Performance Plumbing: Indexed\n');

  console.log('Your site status:');
  console.log('  • Beach Hydrovac: 0 pages indexed\n');

  console.log('All your content (37+ pages, schemas, location pages)');
  console.log('is completely invisible to Google users.\n');

  console.log('FIX THIS FIRST before any other SEO work!\n');
}

main().catch(console.error);
