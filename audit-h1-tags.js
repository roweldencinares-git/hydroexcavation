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

  const allContent = [...allPages, ...posts];
  console.log(`Checking ${allContent.length} pages+posts for H1 issues...\n`);

  let issueCount = 0;
  for (const p of allContent) {
    const content = p.content.raw || '';
    const h1Tags = content.match(/<h1/g) || [];
    if (h1Tags.length > 1) {
      issueCount++;
      console.log(`MULTIPLE H1s (${h1Tags.length}) | ${p.type} | ID:${p.id} | /${p.slug}`);
      // Show the H1 content
      const h1Content = content.match(/<h1[^>]*>(.*?)<\/h1>/gs) || [];
      h1Content.forEach((h, i) => {
        const text = h.replace(/<[^>]+>/g, '').trim();
        console.log(`  H1 #${i + 1}: "${text.substring(0, 80)}"`);
      });
    }
  }

  if (issueCount === 0) {
    console.log('No duplicate H1 issues found!');
  } else {
    console.log(`\n${issueCount} pages with H1 issues found.`);
  }
}

main().catch(console.error);
