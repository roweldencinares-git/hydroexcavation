import fetch from 'node-fetch';

const BASE = 'https://seo-repo-temp-three.vercel.app';
const site = 'https://beachhydrovac.com/';

async function submit(path) {
  const sitemapUrl = 'https://beachhydrovac.com/' + path;
  const r = await fetch(`${BASE}/api/gsc/submit-sitemap`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ site, sitemap: sitemapUrl })
  });
  const text = await r.text();
  try {
    const data = JSON.parse(text);
    console.log(`${path}: ${data.success ? 'Submitted ✅' : 'Failed ❌ ' + JSON.stringify(data)}`);
  } catch {
    console.log(`${path}: Response status ${r.status} - ${text.substring(0, 200)}`);
  }
}

async function main() {
  await submit('sitemap_index.xml');
  await submit('page-sitemap.xml');
  await submit('post-sitemap.xml');
  console.log('\nAll sitemaps resubmitted to Google');
}

main().catch(console.error);
