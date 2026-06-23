import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(
  process.env.BEACH_HYDROVAC_WP_USER + ':' + process.env.BEACH_HYDROVAC_WP_PASSWORD
).toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

// These 6 pages are missing canonical tags
const missingCanonicals = [
  { id: 3477, slug: 'richmond-2', url: 'https://beachhydrovac.com/locations/richmond-2/' },
  { id: 3473, slug: 'hampton-2', url: 'https://beachhydrovac.com/locations/hampton-2/' },
  { id: 3472, slug: 'newport-news-2', url: 'https://beachhydrovac.com/locations/newport-news-2/' },
  { id: 3471, slug: 'chesapeake-2', url: 'https://beachhydrovac.com/locations/chesapeake-2/' },
  { id: 3470, slug: 'norfolk-2', url: 'https://beachhydrovac.com/locations/norfolk-2/' },
  { id: 3469, slug: 'virginia-beach-2', url: 'https://beachhydrovac.com/locations/virginia-beach-2/' },
];

async function main() {
  console.log('=== FIXING MISSING CANONICAL TAGS ===\n');

  for (const page of missingCanonicals) {
    // Set Yoast canonical URL via REST API
    const r = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${page.id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        meta: {
          _yoast_wpseo_canonical: page.url
        }
      })
    });

    if (r.ok) {
      console.log(`✅ Set canonical for ${page.slug}: ${page.url}`);
    } else {
      const text = await r.text();
      console.log(`❌ Failed ${page.slug}: ${r.status} - ${text.substring(0, 200)}`);
    }
  }

  // Verify
  console.log('\nVerifying...');
  for (const page of missingCanonicals) {
    const r = await fetch(page.url);
    const html = await r.text();
    const hasCanonical = html.includes('rel="canonical"');
    console.log(`${hasCanonical ? '✅' : '❌'} ${page.slug}: canonical ${hasCanonical ? 'present' : 'STILL MISSING'}`);
  }
}

main().catch(console.error);
