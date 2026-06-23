import 'dotenv/config';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const WP_URL = 'https://beachhydrovac.com';
const WP_USER = process.env.BEACH_HYDROVAC_WP_USER;
const WP_PASS = process.env.BEACH_HYDROVAC_WP_PASSWORD;

const AUTH = 'Basic ' + Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64');
const HEADERS = { 'Authorization': AUTH, 'Content-Type': 'application/json' };

const PAGES_DIR = path.join(__dirname, 'wordpress-pages');

// Files to deploy — prefix determines type
const FILES = [
  // State pages → WordPress Pages
  { file: 'state-north-carolina.txt',         type: 'page' },
  { file: 'state-maryland.txt',               type: 'page' },
  { file: 'state-delaware.txt',               type: 'page' },
  // Service pages → WordPress Pages
  { file: 'service-emergency-hydrovac.txt',   type: 'page' },
  { file: 'service-fiber-optic-trenching.txt',type: 'page' },
  { file: 'service-contractors-b2b.txt',      type: 'page' },
  // Blog posts → WordPress Posts
  { file: 'blog-post-sue-level-b-vs-a.txt',          type: 'post' },
  { file: 'blog-post-veteran-owned-hydrovac.txt',     type: 'post' },
  { file: 'blog-post-utility-damage-prevention.txt',  type: 'post' },
];

/**
 * Parse a .txt file into { title, slug, yoastTitle, yoastMeta, content }
 */
function parseTxtFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');

  // Extract title — line like: "2. Title: Emergency Hydro Excavation Virginia | 24/7 Response"
  const titleMatch = raw.match(/^\d+\.\s+Title:\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : '';

  // Extract slug — line like: "3. Slug: hydro-excavation-north-carolina"
  const slugMatch = raw.match(/^\d+\.\s+Slug:\s+(.+)$/m);
  const slug = slugMatch ? slugMatch[1].trim() : '';

  // Extract Yoast SEO title — line like: '6. Yoast SEO: Title = "..."'
  const yoastTitleMatch = raw.match(/Yoast SEO:\s+Title\s*=\s*"(.+)"/);
  const yoastTitle = yoastTitleMatch ? yoastTitleMatch[1].trim() : '';

  // Extract Yoast meta description — line like: '7. Yoast Meta: "..."'
  const yoastMetaMatch = raw.match(/Yoast Meta:\s*"(.+)"/);
  const yoastMeta = yoastMetaMatch ? yoastMetaMatch[1].trim() : '';

  // Extract content — everything after the `---\n\n<!-- wp:` separator
  const separator = '\n---\n';
  const sepIdx = raw.indexOf(separator);
  const content = sepIdx !== -1 ? raw.slice(sepIdx + separator.length).trim() : '';

  return { title, slug, yoastTitle, yoastMeta, content };
}

/**
 * Check if a page/post with this slug already exists
 */
async function findExisting(type, slug) {
  const endpoint = type === 'post' ? 'posts' : 'pages';
  const res = await fetch(
    `${WP_URL}/wp-json/wp/v2/${endpoint}?slug=${slug}&status=any`,
    { headers: HEADERS }
  );
  if (!res.ok) return null;
  const items = await res.json();
  return items.length > 0 ? items[0] : null;
}

/**
 * Create or update a page/post via WP REST API
 */
async function deploy(type, { title, slug, yoastTitle, yoastMeta, content }) {
  const endpoint = type === 'post' ? 'posts' : 'pages';

  const body = {
    title,
    slug,
    content,
    status: 'publish',
    meta: {
      // Yoast SEO meta fields
      _yoast_wpseo_title:    yoastTitle,
      _yoast_wpseo_metadesc: yoastMeta,
    },
  };

  // Check if already exists
  const existing = await findExisting(type, slug);

  let res;
  if (existing) {
    console.log(`  ↺  Updating existing ${type} (ID: ${existing.id}): ${slug}`);
    res = await fetch(`${WP_URL}/wp-json/wp/v2/${endpoint}/${existing.id}`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(body),
    });
  } else {
    console.log(`  +  Creating new ${type}: ${slug}`);
    res = await fetch(`${WP_URL}/wp-json/wp/v2/${endpoint}`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(body),
    });
  }

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`HTTP ${res.status}: ${err.substring(0, 300)}`);
  }

  const result = await res.json();
  return result;
}

async function main() {
  console.log(`\n🚀 BeachHydrovac WordPress Deploy`);
  console.log(`   Site: ${WP_URL}`);
  console.log(`   User: ${WP_USER}`);
  console.log(`   Files: ${FILES.length}\n`);

  // Test auth first
  const authTest = await fetch(`${WP_URL}/wp-json/wp/v2/users/me`, { headers: HEADERS });
  if (!authTest.ok) {
    console.error('❌ Authentication failed. Check BEACH_HYDROVAC_WP_USER and BEACH_HYDROVAC_WP_PASSWORD in .env');
    process.exit(1);
  }
  const me = await authTest.json();
  console.log(`✅ Authenticated as: ${me.name} (${me.slug})\n`);

  const results = { success: [], failed: [] };

  for (const { file, type } of FILES) {
    const filePath = path.join(PAGES_DIR, file);

    if (!fs.existsSync(filePath)) {
      console.warn(`  ⚠  File not found: ${file}`);
      results.failed.push({ file, error: 'File not found' });
      continue;
    }

    let parsed;
    try {
      parsed = parseTxtFile(filePath);
    } catch (e) {
      console.error(`  ❌ Parse error in ${file}: ${e.message}`);
      results.failed.push({ file, error: e.message });
      continue;
    }

    if (!parsed.title || !parsed.slug || !parsed.content) {
      console.error(`  ❌ Missing title/slug/content in ${file}`);
      results.failed.push({ file, error: 'Missing required fields' });
      continue;
    }

    try {
      const result = await deploy(type, parsed);
      const url = result.link || result.guid?.rendered || '';
      console.log(`     ✅ Published: ${url}`);
      results.success.push({ file, url, id: result.id });
    } catch (e) {
      console.error(`     ❌ Failed: ${e.message}`);
      results.failed.push({ file, error: e.message });
    }
  }

  console.log(`\n${'─'.repeat(60)}`);
  console.log(`✅ Deployed: ${results.success.length}/${FILES.length}`);
  if (results.success.length > 0) {
    console.log('\nPublished URLs:');
    results.success.forEach(r => console.log(`  ${r.url}`));
  }
  if (results.failed.length > 0) {
    console.log('\nFailed:');
    results.failed.forEach(r => console.log(`  ${r.file} — ${r.error}`));
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
