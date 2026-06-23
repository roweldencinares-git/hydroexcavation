import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(
  process.env.BEACH_HYDROVAC_WP_USER + ':' + process.env.BEACH_HYDROVAC_WP_PASSWORD
).toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

async function fixH1(pageId, pageName) {
  console.log(`\nFixing ${pageName} (ID: ${pageId})...`);

  const r = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${pageId}?context=edit`, { headers });
  const page = await r.json();
  let content = page.content.raw;

  const h1Before = (content.match(/<h1/g) || []).length;
  console.log(`  H1 tags before: ${h1Before}`);

  if (h1Before <= 1) {
    console.log('  No fix needed.');
    return;
  }

  // Replace ALL H1s after the first one with H2
  let h1Count = 0;
  content = content.replace(/<h1(\s[^>]*)>/g, (match, attrs) => {
    h1Count++;
    if (h1Count >= 2) {
      return '<h2' + attrs + '>';
    }
    return match;
  });

  let closeCount = 0;
  content = content.replace(/<\/h1>/g, (match) => {
    closeCount++;
    if (closeCount >= 2) {
      return '</h2>';
    }
    return match;
  });

  const h1After = (content.match(/<h1/g) || []).length;
  console.log(`  H1 tags after: ${h1After}`);

  const resp = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${pageId}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ content })
  });

  if (resp.ok) {
    console.log(`  ${pageName} updated - H1 fix applied`);
  } else {
    console.log(`  FAILED: ${resp.status}`);
  }
}

async function main() {
  await fixH1(3346, 'About');
  await fixH1(3332, 'Services');
  console.log('\nAll H1 fixes complete.');
}

main().catch(console.error);
