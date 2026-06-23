import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(
  process.env.BEACH_HYDROVAC_WP_USER + ':' + process.env.BEACH_HYDROVAC_WP_PASSWORD
).toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

async function main() {
  // Get all pages
  const pagesR = await fetch(`${WP_URL}/wp-json/wp/v2/pages?per_page=100&status=publish`, { headers });
  const pages = await pagesR.json();

  // Get all posts
  const postsR = await fetch(`${WP_URL}/wp-json/wp/v2/posts?per_page=100&status=publish`, { headers });
  const posts = await postsR.json();

  const allContent = [...pages, ...posts];

  console.log(`\n=== INTERNAL LINK AUDIT ===`);
  console.log(`Total pages: ${pages.length}`);
  console.log(`Total posts: ${posts.length}`);
  console.log(`Total content: ${allContent.length}\n`);

  // Build URL map
  const urlMap = {};
  allContent.forEach(item => {
    urlMap[item.link] = { id: item.id, title: item.title.rendered, type: item.type };
  });

  // Audit each page/post for internal links
  const linkReport = [];

  for (const item of allContent) {
    const content = item.content.rendered || '';
    const internalLinks = [];
    const regex = /href="(https?:\/\/beachhydrovac\.com[^"]*?)"/gi;
    let match;
    while ((match = regex.exec(content)) !== null) {
      internalLinks.push(match[1]);
    }

    linkReport.push({
      id: item.id,
      title: item.title.rendered,
      slug: item.slug,
      type: item.type,
      link: item.link,
      internalLinkCount: internalLinks.length,
      internalLinks: internalLinks
    });
  }

  // Sort by internal link count (ascending - least links first)
  linkReport.sort((a, b) => a.internalLinkCount - b.internalLinkCount);

  console.log('--- Pages/Posts by Internal Link Count ---\n');
  for (const item of linkReport) {
    const icon = item.internalLinkCount === 0 ? '❌' : item.internalLinkCount < 3 ? '⚠️' : '✅';
    console.log(`${icon} [${item.type}] ${item.title} (ID:${item.id}) - ${item.internalLinkCount} internal links`);
    if (item.internalLinkCount > 0) {
      item.internalLinks.forEach(link => {
        console.log(`     → ${link}`);
      });
    }
  }

  // Summary
  const noLinks = linkReport.filter(i => i.internalLinkCount === 0);
  const fewLinks = linkReport.filter(i => i.internalLinkCount > 0 && i.internalLinkCount < 3);

  console.log(`\n--- SUMMARY ---`);
  console.log(`Pages with 0 internal links: ${noLinks.length}`);
  console.log(`Pages with 1-2 internal links: ${fewLinks.length}`);
  console.log(`Pages with 3+ internal links: ${linkReport.length - noLinks.length - fewLinks.length}`);

  // List orphan pages
  if (noLinks.length > 0) {
    console.log(`\n--- ORPHAN PAGES (no internal links) ---`);
    noLinks.forEach(item => {
      console.log(`  - ${item.title} (${item.link})`);
    });
  }

  // Check which pages are NOT linked TO from anywhere
  const allLinkedUrls = new Set();
  linkReport.forEach(item => {
    item.internalLinks.forEach(link => {
      // Normalize URL
      const normalized = link.replace(/\/$/, '').replace(/^https?:\/\/beachhydrovac\.com/, '');
      allLinkedUrls.add(normalized);
    });
  });

  console.log(`\n--- PAGES NOT LINKED TO FROM ANY OTHER PAGE ---`);
  for (const item of linkReport) {
    const normalized = item.link.replace(/\/$/, '').replace(/^https?:\/\/beachhydrovac\.com/, '');
    if (!allLinkedUrls.has(normalized) && !allLinkedUrls.has(normalized + '/')) {
      console.log(`  ❌ ${item.title} (${item.link})`);
    }
  }
}

main().catch(console.error);
