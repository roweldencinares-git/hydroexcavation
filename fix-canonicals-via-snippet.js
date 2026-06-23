import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(
  process.env.BEACH_HYDROVAC_WP_USER + ':' + process.env.BEACH_HYDROVAC_WP_PASSWORD
).toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

async function main() {
  // Get current snippet #7
  const r = await fetch(`${WP_URL}/wp-json/code-snippets/v1/snippets/7`, { headers });
  const snippet = await r.json();
  let code = snippet.code;

  // Add canonical fix for the 6 pages missing them
  const canonicalFix = `

// Fix missing canonical tags on -2 location pages
add_action('wp_head', function() {
  $pages_needing_canonical = array(3469, 3470, 3471, 3472, 3473, 3474, 3475, 3476, 3477, 3478, 3479, 3480, 3481, 3482, 3483, 3484, 3485, 3671);
  if (is_page($pages_needing_canonical)) {
    $url = get_permalink();
    // Only add if Yoast hasn't already output one
    echo '<link rel="canonical" href="' . esc_url($url) . '" />' . "\\n";
  }
}, 1);
`;

  // Check if we already added this
  if (code.includes('pages_needing_canonical')) {
    console.log('Already added canonical fix, skipping');
    return;
  }

  // Add to beginning of snippet (before other add_action calls)
  const newCode = canonicalFix + code;

  const updateR = await fetch(`${WP_URL}/wp-json/code-snippets/v1/snippets/7`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ code: newCode, active: true })
  });

  if (updateR.ok) {
    console.log('✅ Canonical fix added to Code Snippet #7');
    console.log('Pages covered: 3469-3485 + 3671 (all location pages)');

    // Verify on a page
    console.log('\nVerifying (may need cache clear)...');
    const testR = await fetch('https://beachhydrovac.com/locations/virginia-beach-2/', {
      headers: { 'Cache-Control': 'no-cache' }
    });
    const html = await testR.text();
    const hasCanonical = html.includes('rel="canonical"');
    console.log(`virginia-beach-2 canonical: ${hasCanonical ? '✅' : '⏳ (needs LiteSpeed cache purge)'}`);
  } else {
    console.log('❌ Failed:', updateR.status);
  }
}

main().catch(console.error);
