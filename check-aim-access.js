import 'dotenv/config';
import fetch from 'node-fetch';

async function main() {
  // Try Beach HydroVac credentials on AIM Locating
  const auth = 'Basic ' + Buffer.from(
    process.env.BEACH_HYDROVAC_WP_USER + ':' + process.env.BEACH_HYDROVAC_WP_PASSWORD
  ).toString('base64');

  console.log('Testing Beach HydroVac credentials on AIM Locating...');
  const r = await fetch('https://aimlocatingva.com/wp-json/wp/v2/users/me', {
    headers: { 'Authorization': auth }
  });

  if (r.ok) {
    const user = await r.json();
    console.log(`✅ ACCESS GRANTED — User: ${user.name} (${user.slug})`);
    console.log(`   Roles: ${user.roles?.join(', ') || 'unknown'}`);
  } else {
    console.log(`❌ Same credentials don't work: ${r.status}`);
    console.log('   Need separate credentials for AIM Locating');
  }

  // Get all pages
  console.log('\n--- ALL PUBLISHED PAGES ---');
  const pagesR = await fetch('https://aimlocatingva.com/wp-json/wp/v2/pages?per_page=100&status=publish');
  const pages = await pagesR.json();

  for (const page of pages) {
    console.log(`  ID:${page.id} /${page.slug}/ — ${page.title.rendered}`);
  }

  console.log(`\nTotal pages: ${pages.length}`);

  // Get all posts
  const postsR = await fetch('https://aimlocatingva.com/wp-json/wp/v2/posts?per_page=100&status=publish');
  const posts = await postsR.json();
  console.log(`Total posts: ${Array.isArray(posts) ? posts.length : 0}`);
  if (Array.isArray(posts)) {
    for (const post of posts) {
      console.log(`  ID:${post.id} /${post.slug}/ — ${post.title.rendered}`);
    }
  }
}

main().catch(console.error);
