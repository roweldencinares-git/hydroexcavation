import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
dotenv.config();

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(
  `${process.env.BEACH_HYDROVAC_WP_USER}:${process.env.BEACH_HYDROVAC_WP_PASSWORD}`
).toString('base64');
const headers = { Authorization: auth, 'Content-Type': 'application/json' };

// All city pages + their IDs and slugs
const CITY_PAGES = [
  { id: 3750, city: 'Norfolk',        slug: 'norfolk-hydrovac',        url: '/locations/norfolk-hydrovac/' },
  { id: 3751, city: 'Chesapeake',     slug: 'chesapeake-hydrovac',     url: '/locations/chesapeake-hydrovac/' },
  { id: 3752, city: 'Newport News',   slug: 'newport-news-hydrovac',   url: '/locations/newport-news-hydrovac/' },
  { id: 3753, city: 'Suffolk',        slug: 'suffolk-hydrovac',        url: '/locations/suffolk-hydrovac/' },
  { id: 3754, city: 'Hampton',        slug: 'hampton-hydrovac',        url: '/locations/hampton-hydrovac/' },
  { id: 3755, city: 'Portsmouth',     slug: 'portsmouth-hydrovac',     url: '/locations/portsmouth-hydrovac/' },
  { id: 3476, city: 'Williamsburg',   slug: 'williamsburg',            url: '/locations/williamsburg/' },
  { id: 3671, city: 'Eastern Shore',  slug: 'eastern-shore',           url: '/locations/eastern-shore/' },
];

// Blog posts (for internal linking from service posts back to city pages)
const BLOG_POSTS = [
  { id: 3770, slug: 'vacuum-excavation-virginia-beach',             city: 'Virginia Beach' },
  { id: 3771, slug: 'non-destructive-excavation-norfolk-va',        city: 'Norfolk' },
  { id: 3772, slug: 'hydro-excavation-suffolk-va',                  city: 'Suffolk' },
  { id: 3773, slug: 'slot-trenching-portsmouth-va',                 city: 'Portsmouth' },
  { id: 3774, slug: 'vacuum-excavation-chesapeake-va',              city: 'Chesapeake' },
  { id: 3775, slug: 'daylighting-services-hampton-va',              city: 'Hampton' },
  { id: 3776, slug: 'potholing-contractor-newport-news-va',         city: 'Newport News' },
  { id: 3777, slug: 'hydrovac-williamsburg-va',                     city: 'Williamsburg' },
  { id: 3778, slug: 'hydro-excavation-eastern-shore-virginia',      city: 'Eastern Shore' },
  { id: 3779, slug: 'non-destructive-excavation-hampton-roads',     city: null },
];

function buildCityLinksBlock(currentCityId) {
  const others = CITY_PAGES.filter(c => c.id !== currentCityId);
  const links = others.map(c =>
    `<a href="https://beachhydrovac.com${c.url}" style="color:#e8a020;text-decoration:none;font-weight:600;">${c.city}</a>`
  ).join(' &nbsp;|&nbsp; ');

  return `<!-- wp:html -->
<div style="background:#0f2134;padding:1.5rem 2rem;margin:2rem 0;border-radius:8px;">
  <p style="color:#aacce0;font-size:0.85rem;margin:0 0 0.6rem 0;text-transform:uppercase;letter-spacing:0.08em;">Also Serving Hampton Roads</p>
  <p style="margin:0;font-size:0.95rem;line-height:2;">
    ${links}
  </p>
</div>
<!-- /wp:html -->`;
}

async function getPageContent(id) {
  const r = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${id}?context=edit`, { headers });
  if (!r.ok) throw new Error(`Failed to fetch page ${id}: ${r.status}`);
  return r.json();
}

async function getPostContent(id) {
  const r = await fetch(`${WP_URL}/wp-json/wp/v2/posts/${id}?context=edit`, { headers });
  if (!r.ok) throw new Error(`Failed to fetch post ${id}: ${r.status}`);
  return r.json();
}

async function updatePage(id, content) {
  const r = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ content })
  });
  if (!r.ok) throw new Error(`Failed to update page ${id}: ${r.status}`);
  return r.json();
}

async function updatePost(id, content) {
  const r = await fetch(`${WP_URL}/wp-json/wp/v2/posts/${id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ content })
  });
  if (!r.ok) throw new Error(`Failed to update post ${id}: ${r.status}`);
  return r.json();
}

async function pingGoogleSitemap() {
  const sitemapUrl = encodeURIComponent(`${WP_URL}/sitemap.xml`);
  const pingUrl = `https://www.google.com/ping?sitemap=${sitemapUrl}`;
  try {
    const r = await fetch(pingUrl);
    return r.status;
  } catch (e) {
    return 'error';
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log('BEACH HYDROVAC — CROSS-LINK ALL CITY PAGES');
  console.log('Goal: Pass authority from #1 pages → Suffolk + all cities');
  console.log('='.repeat(60));

  // 1. Update city pages with "Also Serving" links block
  console.log('\n── UPDATING CITY PAGES (adding cross-links) ──');
  for (const cityPage of CITY_PAGES) {
    try {
      const page = await getPageContent(cityPage.id);
      const existingContent = page.content.raw || '';

      // Skip if already has the cross-links block
      if (existingContent.includes('Also Serving Hampton Roads')) {
        console.log(`  ${cityPage.city}... already has cross-links, skipping`);
        continue;
      }

      const linksBlock = buildCityLinksBlock(cityPage.id);
      // Insert before the CTA section (the dark gradient div)
      const updatedContent = existingContent.includes('Get a Free Quote for')
        ? existingContent.replace(
            '<!-- wp:html -->\n<div style="background:linear-gradient',
            linksBlock + '\n\n<!-- wp:html -->\n<div style="background:linear-gradient'
          )
        : existingContent + '\n\n' + linksBlock;

      await updatePage(cityPage.id, updatedContent);
      console.log(`  ✅ ${cityPage.city} (ID:${cityPage.id}) — cross-links added`);
    } catch (e) {
      console.error(`  ❌ ${cityPage.city}: ${e.message}`);
    }
  }

  // 2. Update blog posts — add "Read more" link to related city page
  console.log('\n── UPDATING BLOG POSTS (adding city page links) ──');
  for (const post of BLOG_POSTS) {
    try {
      const p = await getPostContent(post.id);
      const existingContent = p.content.raw || '';

      // Skip if already has city page link
      if (existingContent.includes('Also Serving Hampton Roads') || existingContent.includes('locations/')) {
        console.log(`  ${post.slug}... already linked, skipping`);
        continue;
      }

      // Find the matching city page for this post
      const relatedCity = CITY_PAGES.find(c => c.city === post.city);
      const cityLinks = CITY_PAGES.map(c =>
        `<a href="https://beachhydrovac.com${c.url}" style="color:#e8a020;text-decoration:none;font-weight:600;">${c.city}</a>`
      ).join(' &nbsp;|&nbsp; ');

      const linksBlock = `<!-- wp:html -->
<div style="background:#0f2134;padding:1.5rem 2rem;margin:2rem 0;border-radius:8px;">
  <p style="color:#aacce0;font-size:0.85rem;margin:0 0 0.6rem 0;text-transform:uppercase;letter-spacing:0.08em;">Beach HydroVac Service Areas</p>
  <p style="margin:0;font-size:0.95rem;line-height:2;">
    ${cityLinks}
  </p>
  ${relatedCity ? `<p style="margin:0.75rem 0 0 0;"><a href="https://beachhydrovac.com${relatedCity.url}" style="color:#fff;background:#e8a020;padding:6px 16px;border-radius:4px;text-decoration:none;font-size:0.9rem;">View ${relatedCity.city} Service Page →</a></p>` : ''}
</div>
<!-- /wp:html -->`;

      // Add before the last CTA section
      const updatedContent = existingContent.includes('Get a Free Quote')
        ? existingContent.replace(
            /<!-- wp:html -->\n<div style="background:linear-gradient\(135deg,#0f2134/,
            linksBlock + '\n\n<!-- wp:html -->\n<div style="background:linear-gradient(135deg,#0f2134'
          )
        : existingContent + '\n\n' + linksBlock;

      await updatePost(post.id, updatedContent);
      console.log(`  ✅ ${post.slug}`);
    } catch (e) {
      console.error(`  ❌ ${post.slug}: ${e.message}`);
    }
  }

  // 3. Ping Google sitemap
  console.log('\n── PINGING GOOGLE SITEMAP ──');
  const pingStatus = await pingGoogleSitemap();
  if (pingStatus === 200) {
    console.log('  ✅ Google sitemap pinged — Googlebot will recrawl soon');
  } else {
    console.log(`  ℹ️  Sitemap ping returned: ${pingStatus}`);
  }

  console.log('\n' + '='.repeat(60));
  console.log('DONE');
  console.log('='.repeat(60));
  console.log('\nWhat this does for Suffolk rankings:');
  console.log('  → 5 #1-ranked pages now link directly to Suffolk page');
  console.log('  → 9 blog posts link to Suffolk + all city pages');
  console.log('  → Google sitemap pinged to trigger faster recrawl');
  console.log('  → Expected Suffolk ranking improvement: 1-2 weeks');
}

main().catch(console.error);
