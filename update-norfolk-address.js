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

async function findPageBySlug(slug) {
  const res = await fetch(`${WP_URL}/wp-json/wp/v2/pages?slug=${slug}&_fields=id,slug,title`, { headers: HEADERS });
  const pages = await res.json();
  return pages[0] || null;
}

async function updatePageContent(pageId, content) {
  const res = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${pageId}`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ content })
  });
  return res.json();
}

async function run() {
  console.log('Updating contact page address to Norfolk, VA...\n');

  const contactPage = await findPageBySlug('contact');
  if (!contactPage) {
    console.error('❌ Contact page not found — check slug');
    process.exit(1);
  }
  console.log(`Found contact page: ID ${contactPage.id} — "${contactPage.title.rendered}"`);

  const newContent = fs.readFileSync(path.join(__dirname, 'wordpress-pages', '04-contact.txt'), 'utf8');

  const result = await updatePageContent(contactPage.id, newContent);
  if (result.id) {
    console.log(`✅ Contact page updated — https://beachhydrovac.com/contact/`);
  } else {
    console.error('❌ Update failed:', JSON.stringify(result, null, 2));
  }
}

run().catch(console.error);
