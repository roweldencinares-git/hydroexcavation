import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(
  process.env.BEACH_HYDROVAC_WP_USER + ':' + process.env.BEACH_HYDROVAC_WP_PASSWORD
).toString('base64');
const headers = { 'Authorization': auth };

async function main() {
  let allPages = [];
  let pg = 1;
  while (true) {
    const r = await fetch(`${WP_URL}/wp-json/wp/v2/pages?per_page=50&page=${pg}&context=edit`, { headers });
    if (r.status !== 200) break;
    const items = await r.json();
    if (items.length === 0) break;
    allPages = allPages.concat(items);
    pg++;
  }

  const postsR = await fetch(`${WP_URL}/wp-json/wp/v2/posts?per_page=50&context=edit`, { headers });
  const posts = await postsR.json();

  console.log('Focus Keyword Audit');
  console.log('===================\n');

  let missing = 0;
  let total = 0;

  for (const p of [...allPages, ...posts]) {
    if (p.status !== 'publish') continue;
    total++;
    const fk = p.meta?._yoast_wpseo_focuskw || '';
    if (!fk) {
      missing++;
      console.log(`MISSING | ${p.type} | /${p.slug} | "${p.title.rendered.substring(0, 60)}"`);
    }
  }

  console.log(`\n${missing} of ${total} published pages missing focus keywords`);
}

main().catch(console.error);
