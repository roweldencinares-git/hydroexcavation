import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(
  process.env.BEACH_HYDROVAC_WP_USER + ':' + process.env.BEACH_HYDROVAC_WP_PASSWORD
).toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

// Gap pages IDs
const GAP_PAGES = {
  vactor:     { id: 3799, slug: 'vactor-truck-services',                     title: 'Vactor Truck Services' },
  vacuum:     { id: 3800, slug: 'vacuum-excavation',                         title: 'Vacuum Excavation' },
  comparison: { id: 3801, slug: 'hydro-excavation-vs-traditional-excavation', title: 'Hydro vs Traditional Excavation' }
};

// Core location pages
const LOCATION_URLS = [
  { text: 'Virginia Beach',  url: 'https://beachhydrovac.com/locations/virginia-beach-2/' },
  { text: 'Norfolk',         url: 'https://beachhydrovac.com/locations/norfolk-2/' },
  { text: 'Chesapeake',      url: 'https://beachhydrovac.com/locations/chesapeake-2/' },
  { text: 'Hampton',         url: 'https://beachhydrovac.com/locations/hampton-2/' },
  { text: 'Newport News',    url: 'https://beachhydrovac.com/locations/newport-news/' },
];

function relatedServicesBlock(currentSlug) {
  const others = Object.values(GAP_PAGES).filter(p => p.slug !== currentSlug);
  const links = others.map(p =>
    `<li><a href="https://beachhydrovac.com/${p.slug}/" style="color:#1a73e8;text-decoration:none;">${p.title}</a></li>`
  ).join('\n      ');
  const locationLinks = LOCATION_URLS.map(l =>
    `<li><a href="${l.url}" style="color:#1a73e8;text-decoration:none;">Hydrovac Services in ${l.text}</a></li>`
  ).join('\n      ');

  return `

<!-- SEO Topic Cluster — Internal Links -->
<div style="margin-top:40px;padding:25px;background:#f0f4f8;border-radius:8px;border-left:4px solid #0f2134;">
  <h3 style="margin:0 0 15px 0;font-size:18px;color:#0f2134;">Related Hydrovac Services</h3>
  <ul style="margin:0 0 20px 0;padding:0 0 0 20px;line-height:2;">
      ${links}
  </ul>
  <h3 style="margin:0 0 10px 0;font-size:18px;color:#0f2134;">Service Areas in Hampton Roads</h3>
  <ul style="margin:0;padding:0 0 0 20px;line-height:2;">
      ${locationLinks}
  </ul>
</div>

<div style="margin-top:20px;padding:20px 25px;background:#0f2134;border-radius:6px;text-align:center;">
  <p style="color:#fff;margin:0 0 10px 0;font-size:16px;">Ready for a free quote?</p>
  <a href="https://beachhydrovac.com/contact/" style="display:inline-block;padding:12px 30px;background:#e8a020;color:#0f2134;text-decoration:none;border-radius:4px;font-weight:700;font-size:16px;">Request a Free Quote</a>
  <p style="color:#ccc;margin:10px 0 0;font-size:14px;">Call: <a href="tel:7575105220" style="color:#e8a020;text-decoration:none;">757-510-5220</a></p>
</div>`;
}

async function getPage(id) {
  const r = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${id}?context=edit`, { headers });
  return r.json();
}

async function updatePage(id, content) {
  const r = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${id}`, {
    method: 'POST', headers,
    body: JSON.stringify({ content })
  });
  return r.json();
}

const CLUSTER_TAG = '<!-- SEO Topic Cluster — Internal Links -->';

async function main() {
  // 1. Add internal links to each gap page
  for (const [key, page] of Object.entries(GAP_PAGES)) {
    console.log(`\n🔗 Updating ${page.title} (ID: ${page.id})...`);
    const data = await getPage(page.id);
    const raw = data.content?.raw || '';

    if (raw.includes(CLUSTER_TAG)) {
      console.log(`  ⏭  Already has cluster links, skipping`);
      continue;
    }

    const newContent = raw + relatedServicesBlock(page.slug);
    const updated = await updatePage(page.id, newContent);
    console.log(`  ✅ Updated: ${updated.link}`);
  }

  // 2. Add BreadcrumbList schema for gap pages via new code snippet
  console.log('\n📌 Deploying BreadcrumbList + Service schema for gap pages...');
  const breadcrumbCode = `<?php
/**
 * Beach HydroVac - Semantic Cluster Schema (v1)
 * BreadcrumbList + Service schema for gap pages
 */
add_action('wp_head', function() {
  $page_schema = null;

  if (is_page('vactor-truck-services')) {
    $page_schema = [
      'breadcrumb' => [
        ['name' => 'Home', 'url' => 'https://beachhydrovac.com/'],
        ['name' => 'Services', 'url' => 'https://beachhydrovac.com/services/'],
        ['name' => 'Vactor Truck Services', 'url' => 'https://beachhydrovac.com/vactor-truck-services/']
      ],
      'service_name' => 'Vactor Truck Services',
      'service_url'  => 'https://beachhydrovac.com/vactor-truck-services/',
      'description'  => 'Professional vactor truck services in Hampton Roads, Virginia. Industrial vacuum truck work for municipalities, contractors, and utility companies.'
    ];
  } elseif (is_page('vacuum-excavation')) {
    $page_schema = [
      'breadcrumb' => [
        ['name' => 'Home', 'url' => 'https://beachhydrovac.com/'],
        ['name' => 'Services', 'url' => 'https://beachhydrovac.com/services/'],
        ['name' => 'Vacuum Excavation', 'url' => 'https://beachhydrovac.com/vacuum-excavation/']
      ],
      'service_name' => 'Vacuum Excavation Services',
      'service_url'  => 'https://beachhydrovac.com/vacuum-excavation/',
      'description'  => 'Non-destructive vacuum excavation services in Virginia Beach and Hampton Roads. Safe utility exposure without damage to underground infrastructure.'
    ];
  } elseif (is_page('hydro-excavation-vs-traditional-excavation')) {
    $page_schema = [
      'breadcrumb' => [
        ['name' => 'Home', 'url' => 'https://beachhydrovac.com/'],
        ['name' => 'Resources', 'url' => 'https://beachhydrovac.com/'],
        ['name' => 'Hydro vs Traditional Excavation', 'url' => 'https://beachhydrovac.com/hydro-excavation-vs-traditional-excavation/']
      ],
      'service_name' => 'Hydro Excavation vs Traditional Excavation',
      'service_url'  => 'https://beachhydrovac.com/hydro-excavation-vs-traditional-excavation/',
      'description'  => 'Complete guide comparing hydro excavation vs traditional mechanical excavation. Learn why hydrovac is safer, faster, and more cost-effective for Hampton Roads projects.'
    ];
  }

  if (!$page_schema) return;

  $breadcrumb_items = array_map(function($item, $pos) {
    return sprintf(
      '{"@type":"ListItem","position":%d,"name":"%s","item":"%s"}',
      $pos + 1, $item['name'], $item['url']
    );
  }, $page_schema['breadcrumb'], array_keys($page_schema['breadcrumb']));
  ?>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [<?php echo implode(',', $breadcrumb_items); ?>]
      },
      {
        "@type": "Service",
        "@id": "<?php echo $page_schema['service_url']; ?>#service",
        "name": "<?php echo $page_schema['service_name']; ?>",
        "url": "<?php echo $page_schema['service_url']; ?>",
        "description": "<?php echo $page_schema['description']; ?>",
        "provider": {"@id": "https://beachhydrovac.com/#organization"},
        "areaServed": {"@type": "State", "name": "Virginia"},
        "serviceType": "Hydro Excavation"
      }
    ]
  }
  </script>
  <?php
}, 10);
`;

  // Check if snippet 20 exists, if not create new
  const listRes = await fetch(`${WP_URL}/wp-json/code-snippets/v1/snippets`, { headers });
  const snippets = await listRes.json();
  const existing = Array.isArray(snippets) ? snippets.find(s => s.name && s.name.includes('Semantic Cluster')) : null;

  if (existing) {
    const upRes = await fetch(`${WP_URL}/wp-json/code-snippets/v1/snippets/${existing.id}`, {
      method: 'POST', headers,
      body: JSON.stringify({ code: breadcrumbCode, active: true })
    });
    const up = await upRes.json();
    console.log(`  ✅ Updated existing snippet ${existing.id}: ${up.name}`);
  } else {
    const createRes = await fetch(`${WP_URL}/wp-json/code-snippets/v1/snippets`, {
      method: 'POST', headers,
      body: JSON.stringify({ name: 'BHV - Semantic Cluster Schema (v1)', code: breadcrumbCode, active: true, scope: 'front-end' })
    });
    const created = await createRes.json();
    console.log(`  ✅ Created new snippet ${created.id}: ${created.name}`);
  }

  console.log('\n🎉 Semantic cluster deployed!');
  console.log('  ✅ Internal links added to vactor, vacuum, comparison pages');
  console.log('  ✅ BreadcrumbList schema on all 3 gap pages');
  console.log('  ✅ Service schema with provider @id link to organization');
}

main().catch(console.error);
