import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(
  process.env.BEACH_HYDROVAC_WP_USER + ':' + process.env.BEACH_HYDROVAC_WP_PASSWORD
).toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

async function main() {
  // List all snippets
  const r = await fetch(`${WP_URL}/wp-json/code-snippets/v1/snippets`, { headers });
  const snippets = await r.json();

  console.log('Current snippets:\n');
  for (const s of snippets) {
    console.log(`  ID:${s.id} | active:${s.active} | ${s.name}`);
  }

  // Activate our SEO snippets (IDs 5, 6, 7)
  console.log('\nActivating SEO snippets...\n');

  for (const id of [5, 6, 7]) {
    const snippet = snippets.find(s => s.id === id);
    if (!snippet) {
      console.log(`  Snippet ${id}: not found`);
      continue;
    }

    if (snippet.active) {
      console.log(`  Snippet ${id}: already active - "${snippet.name}"`);
      continue;
    }

    const resp = await fetch(`${WP_URL}/wp-json/code-snippets/v1/snippets/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ active: true })
    });

    if (resp.ok) {
      const data = await resp.json();
      console.log(`  Snippet ${id}: ${data.active ? '✅ ACTIVATED' : '❌ still inactive'} - "${snippet.name}"`);
    } else {
      console.log(`  Snippet ${id}: ❌ failed (${resp.status})`);
      const err = await resp.text();
      console.log(`    Error: ${err.substring(0, 200)}`);
    }
  }

  // Verify the fix on the live site
  console.log('\nWaiting 3s for changes to take effect...');
  await new Promise(r => setTimeout(r, 3000));

  console.log('\nVerifying homepage...\n');
  const homeResp = await fetch(`${WP_URL}/`, {
    headers: { 'User-Agent': 'Mozilla/5.0', 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
  });
  const html = await homeResp.text();

  const desc = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)?.[1];
  const ogTitleCount = (html.match(/og:title/g) || []).length;
  const schemaCount = (html.match(/application\/ld\+json/g) || []).length;

  console.log(`  Meta description: ${desc ? '✅ ' + desc.substring(0, 80) : '❌ MISSING'}`);
  console.log(`  OG title count:   ${ogTitleCount} ${ogTitleCount === 1 ? '✅' : '⚠ still cached'}`);
  console.log(`  Schema count:     ${schemaCount} ${schemaCount <= 7 ? '✅' : '⚠ old code still cached'}`);

  if (ogTitleCount > 1 || schemaCount > 7) {
    console.log('\n  Note: OG/schema duplicates may persist until LiteSpeed cache is purged.');
    console.log('  → Go to WP Admin → LiteSpeed Cache → Purge All');
    console.log('  → Or wait for cache TTL to expire (up to 7 days)');
  }
}

main().catch(console.error);
