import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(
  process.env.BEACH_HYDROVAC_WP_USER + ':' + process.env.BEACH_HYDROVAC_WP_PASSWORD
).toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

async function main() {
  // First check - do these pages output Yoast head at all?
  console.log('Checking if Yoast outputs on these pages...\n');

  const testPages = [
    { id: 3469, url: 'https://beachhydrovac.com/locations/virginia-beach-2/' },
    { id: 3462, url: 'https://beachhydrovac.com/locations/virginia-beach/' }, // compare with working page
  ];

  for (const p of testPages) {
    const r = await fetch(p.url);
    const html = await r.text();
    const hasYoast = html.includes('yoast-schema');
    const hasCanonical = html.includes('rel="canonical"');
    const hasYoastHead = html.includes('Yoast SEO');
    console.log(`ID:${p.id} ${p.url}`);
    console.log(`  Yoast comment: ${hasYoastHead}`);
    console.log(`  Yoast schema: ${hasYoast}`);
    console.log(`  Canonical: ${hasCanonical}`);

    // Check what template is being used
    const templateMatch = html.match(/body class="([^"]+)"/);
    if (templateMatch) {
      console.log(`  Body classes: ${templateMatch[1].substring(0, 100)}...`);
    }
    console.log('');
  }

  // Check the raw page data for Yoast head
  console.log('\nChecking Yoast REST API output...\n');
  for (const p of testPages) {
    const r = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${p.id}`, { headers });
    const data = await r.json();
    const yoastHead = data.yoast_head || '';
    const hasCanonical = yoastHead.includes('rel="canonical"');
    console.log(`ID:${p.id} - Yoast head in API: ${yoastHead.length} chars, canonical: ${hasCanonical}`);
    if (hasCanonical) {
      const match = yoastHead.match(/rel="canonical" href="([^"]+)"/);
      console.log(`  Canonical URL: ${match ? match[1] : 'parse error'}`);
    }
    // Check page template
    console.log(`  Template: ${data.template || 'default'}`);
    console.log(`  Status: ${data.status}`);
  }
}

main().catch(console.error);
