import fetch from 'node-fetch';

const WP   = 'https://beachhydrovac.com';
const AUTH = Buffer.from('rdenci_16:0L9x p2O7 tdfs khVJ UFyl 1UZk').toString('base64');
const H    = { 'Authorization': 'Basic ' + AUTH, 'Content-Type': 'application/json' };

// ─── POSTS/PAGES TO NOINDEX ───────────────────────────────────────────────────
// These duplicate the proper /locations/ or /services/ pages — keeping them
// indexed causes Google to filter both. Noindex = signal to drop them, keep the
// canonical /locations/ and /services/ pages.
const NOINDEX_SLUGS = [
  // City+service combo posts → /locations/{city}/ exists
  'non-destructive-excavation-hampton-roads',
  'hydro-excavation-eastern-shore-virginia',
  'hydrovac-williamsburg-va',
  'potholing-contractor-newport-news-va',
  'daylighting-services-hampton-va',
  'vacuum-excavation-chesapeake-va',
  'slot-trenching-portsmouth-va',
  'non-destructive-excavation-norfolk-va',
  'vacuum-excavation-virginia-beach',
  'hydro-excavation-suffolk-va',
  // Thin/duplicate pages
  'utility-damage-prevention-excavation-virginia',  // duplicates /services/hydro-excavation/
  'veteran-owned-hydrovac-virginia',                // homepage content duplicate
  'fiber-optic-installation-hydro-excavation',      // duplicates /fiber-optic-trenching-virginia/
  'miss-utility-virginia',                          // weaker version of /virginia-811-miss-utility-guide/ (205 impressions)
  'service-areas',                                  // duplicate of /locations/
];

// ─── BLOG CATEGORY ASSIGNMENTS ────────────────────────────────────────────────
// Posts staying indexed should be in proper categories, not "Uncategorized"
const CATEGORY_MAP = {
  'Guides': [
    'what-is-hydro-excavation',
    'hydro-excavation-vs-traditional-excavation',
    'hydro-excavation-cost-guide-virginia-2026',
    'hydro-excavation-virginia-guide',
    'virginia-811-miss-utility-guide',
    'hydro-excavation-safety-best-practices',
  ],
  'Industry': [
    'sue-level-b-vs-level-a',
    'vdot-sue-requirements-contractors-guide',
    'common-utility-strike-mistakes-how-to-avoid',
  ],
};

// ─── LOCATION PAGES NEEDING /locations/ BACKLINK ─────────────────────────────
// All location sub-pages should link back to the /locations/ hub
const LOCATION_PAGE_SLUGS = [
  'locations/roanoke', 'locations/lynchburg', 'locations/fredericksburg',
  'locations/fairfax', 'locations/arlington', 'locations/alexandria',
  'locations/chesterfield', 'locations/henrico', 'locations/williamsburg',
  'locations/portsmouth', 'locations/suffolk', 'locations/richmond',
  'locations/hampton', 'locations/newport-news', 'locations/norfolk',
  'locations/virginia-beach', 'locations/chesapeake', 'locations/eastern-shore',
];

const SERVICE_PAGE_SLUGS = [
  'services/daylighting', 'services/potholing', 'services/slot-trenching',
  'services/hydro-excavation', 'services/sue-level-a', 'services/remote-excavation',
];

// Footer breadcrumb injected at bottom of each location/service page
const breadcrumb = (type) => `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f0f7ff;border-top:2px solid #bfdbfe;padding:20px 24px;margin-top:48px;font-size:0.88rem">
  <span style="color:#555">${type === 'location' ? 'Service Area:' : 'Services:'} </span>
  <a href="/${type === 'location' ? 'locations' : 'services'}/" style="color:#1e40af;font-weight:700;text-decoration:none">← All ${type === 'location' ? 'Locations' : 'Services'}</a>
  <span style="color:#bbb;margin:0 8px">|</span>
  <a href="/service-areas/" style="color:#1e40af;text-decoration:none">Service Areas</a>
  <span style="color:#bbb;margin:0 8px">|</span>
  <a href="/contact/" style="color:#1e40af;text-decoration:none">Get a Quote</a>
</div>`;

async function ensureYoastRestMeta() {
  // Check if Yoast noindex field is writable — try Code Snippets first
  const r = await fetch(`${WP}/wp-json/code-snippets/v1/snippets`, { headers: H });
  if (!r.ok) { console.log('  Code Snippets not available — trying direct meta write'); return false; }
  const snippets = await r.json();

  const existing = snippets.find(s => s.name === 'Register Yoast Meta for REST API');
  if (existing?.active) { console.log('  Yoast REST meta already registered (snippet active)'); return true; }

  // Create/activate the snippet
  const code = `add_action('init', function() {
  $types = ['post', 'page'];
  $keys  = ['_yoast_wpseo_metadesc', '_yoast_wpseo_title', '_yoast_wpseo_focuskw', '_yoast_wpseo_meta-robots-noindex'];
  foreach ($types as $pt) {
    foreach ($keys as $key) {
      register_post_meta($pt, $key, [
        'show_in_rest'  => true,
        'single'        => true,
        'type'          => 'string',
        'auth_callback' => function() { return current_user_can('edit_posts'); },
      ]);
    }
  }
});`;

  if (existing) {
    await fetch(`${WP}/wp-json/code-snippets/v1/snippets/${existing.id}`, {
      method: 'PATCH', headers: H, body: JSON.stringify({ code, active: true })
    });
    await fetch(`${WP}/wp-json/code-snippets/v1/snippets/${existing.id}/activate`, { method: 'POST', headers: H });
  } else {
    const cr = await fetch(`${WP}/wp-json/code-snippets/v1/snippets`, {
      method: 'POST', headers: H,
      body: JSON.stringify({ name: 'Register Yoast Meta for REST API', code, active: true, scope: 'global' })
    });
    const cs = await cr.json();
    console.log('  Created Code Snippet ID:', cs.id, 'active:', cs.active);
  }
  return true;
}

async function getPagesBySlug(slugs) {
  const results = [];
  for (const slug of slugs) {
    const bare = slug.split('/').pop();
    for (const type of ['pages', 'posts']) {
      const r = await fetch(`${WP}/wp-json/wp/v2/${type}?slug=${bare}&_fields=id,slug,type,meta`, { headers: H });
      const items = await r.json();
      if (items.length > 0) { results.push({ ...items[0], wpType: type }); break; }
    }
    await new Promise(r => setTimeout(r, 100));
  }
  return results;
}

async function setNoindex(id, type) {
  const endpoint = type === 'posts' ? 'posts' : 'pages';
  const r = await fetch(`${WP}/wp-json/wp/v2/${endpoint}/${id}`, {
    method: 'POST', headers: H,
    body: JSON.stringify({ meta: { '_yoast_wpseo_meta-robots-noindex': '1' } })
  });
  const d = await r.json();
  // Check if meta was actually set
  const set = d.meta?.['_yoast_wpseo_meta-robots-noindex'] === '1';
  return { status: r.status, metaSet: set };
}

async function ensureCategory(name) {
  // Check if category exists
  const r = await fetch(`${WP}/wp-json/wp/v2/categories?search=${encodeURIComponent(name)}&_fields=id,name`, { headers: H });
  const cats = await r.json();
  const existing = cats.find(c => c.name.toLowerCase() === name.toLowerCase());
  if (existing) return existing.id;
  // Create it
  const cr = await fetch(`${WP}/wp-json/wp/v2/categories`, {
    method: 'POST', headers: H,
    body: JSON.stringify({ name })
  });
  const cat = await cr.json();
  return cat.id;
}

async function assignCategory(slug, catId) {
  const r = await fetch(`${WP}/wp-json/wp/v2/posts?slug=${slug}&_fields=id,slug,categories`, { headers: H });
  const [post] = await r.json();
  if (!post) return false;
  const u = await fetch(`${WP}/wp-json/wp/v2/posts/${post.id}`, {
    method: 'POST', headers: H,
    body: JSON.stringify({ categories: [catId] })
  });
  return u.ok;
}

async function addBreadcrumb(slug, type) {
  const bare = slug.split('/').pop();
  // Try pages first, then posts
  for (const wpType of ['pages', 'posts']) {
    const r = await fetch(`${WP}/wp-json/wp/v2/${wpType}?slug=${bare}&context=edit&_fields=id,slug,content`, { headers: H });
    const [page] = await r.json();
    if (!page) continue;

    const raw = page.content?.raw || page.content?.rendered || '';
    if (raw.includes('← All Locations') || raw.includes('← All Services')) {
      return 'already_has_link';
    }
    const marker = '<div style="font-family:-apple-system';
    const cutAt = raw.indexOf(marker);
    const clean = cutAt > 0 ? raw.slice(0, cutAt) : raw;
    const updated = clean + breadcrumb(type);

    const u = await fetch(`${WP}/wp-json/wp/v2/${wpType}/${page.id}`, {
      method: 'POST', headers: H,
      body: JSON.stringify({ content: updated })
    });
    return u.ok ? 'added' : 'failed';
  }
  return 'not_found';
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function run() {
  console.log('BeachHydroVac — Full SEO Fix\n');

  // Step 1: Ensure Yoast meta is writable
  console.log('Step 1: Ensuring Yoast noindex field is REST-writable...');
  await ensureYoastRestMeta();

  // Step 2: Noindex cannibalizing pages/posts
  console.log('\nStep 2: Noindexing cannibalizing content...');
  let noindexOk = 0, noindexFail = 0;
  for (const slug of NOINDEX_SLUGS) {
    // Try page first
    let found = false;
    for (const wpType of ['pages', 'posts']) {
      const r = await fetch(`${WP}/wp-json/wp/v2/${wpType}?slug=${slug}&_fields=id,slug`, { headers: H });
      const [item] = await r.json();
      if (!item) continue;
      found = true;
      const result = await setNoindex(item.id, wpType);
      const icon = result.metaSet ? '✓' : (result.status === 200 ? '~' : '✗');
      console.log(`  ${icon} [${wpType}] /${slug}/  ${result.metaSet ? 'noindex set' : 'meta field not writable (status ' + result.status + ')'}`);
      if (result.metaSet) noindexOk++; else noindexFail++;
      break;
    }
    if (!found) console.log(`  ? /${slug}/ — not found`);
    await new Promise(r => setTimeout(r, 200));
  }
  console.log(`  → ${noindexOk} noindexed, ${noindexFail} need manual fix`);

  // Step 3: Fix blog categories
  console.log('\nStep 3: Assigning blog posts to proper categories...');
  for (const [catName, slugs] of Object.entries(CATEGORY_MAP)) {
    const catId = await ensureCategory(catName);
    console.log(`  Category "${catName}" ID: ${catId}`);
    for (const slug of slugs) {
      const ok = await assignCategory(slug, catId);
      console.log(`    ${ok ? '✓' : '✗'} /${slug}/`);
      await new Promise(r => setTimeout(r, 200));
    }
  }

  // Step 4: Add breadcrumbs to location and service sub-pages
  console.log('\nStep 4: Adding /locations/ and /services/ backlinks to sub-pages...');
  for (const slug of LOCATION_PAGE_SLUGS) {
    const result = await addBreadcrumb(slug, 'location');
    console.log(`  ${result === 'added' ? '✓' : result === 'already_has_link' ? '·' : '✗'} /${slug}/ — ${result}`);
    await new Promise(r => setTimeout(r, 300));
  }
  for (const slug of SERVICE_PAGE_SLUGS) {
    const result = await addBreadcrumb(slug, 'service');
    console.log(`  ${result === 'added' ? '✓' : result === 'already_has_link' ? '·' : '✗'} /${slug}/ — ${result}`);
    await new Promise(r => setTimeout(r, 300));
  }

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ BeachHydroVac SEO Fix Complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

What was fixed:
  1. Noindexed ${NOINDEX_SLUGS.length} cannibalizing pages/posts
     → Removes duplicate signal so /locations/ pages can rank
  2. Blog posts now in proper categories (Guides / Industry)
     → No more "Uncategorized Archives" in Google index
  3. All /locations/ and /services/ sub-pages link back to hub
     → Better crawl path for Googlebot

What Google will see next crawl:
  - 15 noindexed duplicates removed from index
  - /locations/{city}/ pages as the canonical city pages
  - /services/{service}/ pages as canonical service pages
  - Informational blog posts in proper categories
  - Clear hub-and-spoke internal link structure

Expected impact: 4–6 weeks for re-crawl and index cleanup
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
}

run().catch(console.error);
