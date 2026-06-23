import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(
  process.env.BEACH_HYDROVAC_WP_USER + ':' + process.env.BEACH_HYDROVAC_WP_PASSWORD
).toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

function createLinkBlock(links, heading) {
  const linkItems = links.map(l =>
    `<li><a href="${l.url}" style="color:#1a73e8;text-decoration:none;">${l.text}</a></li>`
  ).join('\n      ');

  return `

<div style="margin-top:30px;padding:20px 25px;background:#f8f9fa;border-left:4px solid #1a73e8;border-radius:4px;">
  <h3 style="margin:0 0 12px 0;font-size:18px;color:#333;">${heading}</h3>
  <ul style="margin:0;padding:0 0 0 20px;line-height:1.8;">
      ${linkItems}
  </ul>
</div>`;
}

function createCTA() {
  return `

<div style="margin-top:25px;padding:20px 25px;background:#0f2134;border-radius:6px;text-align:center;">
  <p style="color:#fff;margin:0 0 10px 0;font-size:16px;">Ready to get started? Get a free quote today.</p>
  <a href="https://beachhydrovac.com/contact/" style="display:inline-block;padding:12px 30px;background:#e8a020;color:#0f2134;text-decoration:none;border-radius:4px;font-weight:bold;font-size:16px;">Request a Free Quote</a>
  <p style="color:#ccc;margin:10px 0 0 0;font-size:14px;">Or call us at <a href="tel:7575105220" style="color:#e8a020;text-decoration:none;">757-510-5220</a></p>
</div>`;
}

async function addLinksToPage(id, links, heading) {
  // Try pages first, then posts
  let r = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${id}`, { headers });
  let item = await r.json();
  let endpoint = 'pages';

  if (item.code === 'rest_post_invalid_id') {
    r = await fetch(`${WP_URL}/wp-json/wp/v2/posts/${id}`, { headers });
    item = await r.json();
    endpoint = 'posts';
  }

  const content = item.content?.raw || item.content?.rendered || '';

  if (content.includes('Related Resources') || content.includes('Learn More') || content.includes('Explore Our Services') || content.includes('Related Reading')) {
    console.log(`  ⏭️  ID:${id} - Already has link block, skipping`);
    return true;
  }

  const linkBlock = createLinkBlock(links, heading);
  const cta = createCTA();
  const newContent = content + linkBlock + cta;

  const updateR = await fetch(`${WP_URL}/wp-json/wp/v2/${endpoint}/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ content: newContent })
  });
  return updateR.ok;
}

async function main() {
  let updated = 0;
  let failed = 0;

  console.log('\n=== LINKING REMAINING ORPHAN PAGES ===\n');

  // Original location pages (Vacuum Excavation set)
  const originalLocations = [
    {
      id: 3462, name: 'Vacuum Excavation Virginia Beach',
      links: [
        { url: 'https://beachhydrovac.com/locations/virginia-beach-2/', text: 'Full Virginia Beach Hydro Excavation Services' },
        { url: 'https://beachhydrovac.com/services/', text: 'View All Services' },
        { url: 'https://beachhydrovac.com/what-is-hydro-excavation/', text: 'What is Hydro Excavation?' },
        { url: 'https://beachhydrovac.com/service-areas/', text: 'All Service Areas' },
      ]
    },
    {
      id: 3463, name: 'Vacuum Excavation Norfolk',
      links: [
        { url: 'https://beachhydrovac.com/locations/norfolk-2/', text: 'Full Norfolk Hydro Excavation Services' },
        { url: 'https://beachhydrovac.com/services/', text: 'View All Services' },
        { url: 'https://beachhydrovac.com/what-is-hydro-excavation/', text: 'What is Hydro Excavation?' },
        { url: 'https://beachhydrovac.com/service-areas/', text: 'All Service Areas' },
      ]
    },
    {
      id: 3464, name: 'Vacuum Excavation Chesapeake',
      links: [
        { url: 'https://beachhydrovac.com/locations/chesapeake-2/', text: 'Full Chesapeake Hydro Excavation Services' },
        { url: 'https://beachhydrovac.com/services/', text: 'View All Services' },
        { url: 'https://beachhydrovac.com/hydro-excavation-cost-guide-virginia-2026/', text: 'Cost Guide Virginia' },
        { url: 'https://beachhydrovac.com/service-areas/', text: 'All Service Areas' },
      ]
    },
    {
      id: 3465, name: 'Vacuum Excavation Newport News',
      links: [
        { url: 'https://beachhydrovac.com/locations/newport-news-2/', text: 'Full Newport News Hydro Excavation Services' },
        { url: 'https://beachhydrovac.com/services/', text: 'View All Services' },
        { url: 'https://beachhydrovac.com/hydro-excavation-safety-best-practices/', text: 'Safety Best Practices' },
        { url: 'https://beachhydrovac.com/service-areas/', text: 'All Service Areas' },
      ]
    },
    {
      id: 3466, name: 'Vacuum Excavation Hampton',
      links: [
        { url: 'https://beachhydrovac.com/locations/hampton-2/', text: 'Full Hampton Hydro Excavation Services' },
        { url: 'https://beachhydrovac.com/services/', text: 'View All Services' },
        { url: 'https://beachhydrovac.com/vdot-sue-requirements-contractors-guide/', text: 'VDOT SUE Requirements' },
        { url: 'https://beachhydrovac.com/service-areas/', text: 'All Service Areas' },
      ]
    },
    {
      id: 3467, name: 'Vacuum Excavation Richmond',
      links: [
        { url: 'https://beachhydrovac.com/locations/richmond-2/', text: 'Full Richmond Hydro Excavation Services' },
        { url: 'https://beachhydrovac.com/services/', text: 'View All Services' },
        { url: 'https://beachhydrovac.com/virginia-811-miss-utility-guide/', text: 'Virginia 811 Guide' },
        { url: 'https://beachhydrovac.com/service-areas/', text: 'All Service Areas' },
      ]
    },
  ];

  console.log('--- Original Location Pages ---\n');
  for (const loc of originalLocations) {
    process.stdout.write(`  Adding links to: ${loc.name}...`);
    const ok = await addLinksToPage(loc.id, loc.links, 'Learn More');
    if (ok) { console.log(' ✅'); updated++; }
    else { console.log(' ❌ FAILED'); failed++; }
  }

  // Hub pages
  console.log('\n--- Hub Pages ---\n');

  const hubPages = [
    {
      id: 3455, name: 'Locations Hub (/locations/)',
      links: [
        { url: 'https://beachhydrovac.com/services/', text: 'View All Services' },
        { url: 'https://beachhydrovac.com/service-areas/', text: 'Service Areas Map' },
        { url: 'https://beachhydrovac.com/what-is-hydro-excavation/', text: 'What is Hydro Excavation?' },
        { url: 'https://beachhydrovac.com/hydro-excavation-cost-guide-virginia-2026/', text: 'Cost Guide Virginia 2026' },
      ]
    },
    {
      id: 3468, name: 'Service Areas (/service-areas/)',
      links: [
        { url: 'https://beachhydrovac.com/locations/', text: 'View All Location Pages' },
        { url: 'https://beachhydrovac.com/services/', text: 'View All Services' },
        { url: 'https://beachhydrovac.com/what-is-hydro-excavation/', text: 'What is Hydro Excavation?' },
        { url: 'https://beachhydrovac.com/faq/', text: 'Frequently Asked Questions' },
      ]
    },
    {
      id: 3491, name: 'Virginia Guide Hub',
      links: [
        { url: 'https://beachhydrovac.com/services/', text: 'View All Services' },
        { url: 'https://beachhydrovac.com/hydro-excavation-cost-guide-virginia-2026/', text: 'Cost Guide Virginia 2026' },
        { url: 'https://beachhydrovac.com/hydro-excavation-safety-best-practices/', text: 'Safety Best Practices' },
        { url: 'https://beachhydrovac.com/virginia-811-miss-utility-guide/', text: 'Virginia 811 Guide' },
        { url: 'https://beachhydrovac.com/service-areas/', text: 'Service Areas Across Virginia' },
      ]
    },
  ];

  for (const hub of hubPages) {
    process.stdout.write(`  Adding links to: ${hub.name}...`);
    const ok = await addLinksToPage(hub.id, hub.links, 'Related Resources');
    if (ok) { console.log(' ✅'); updated++; }
    else { console.log(' ❌ FAILED'); failed++; }
  }

  console.log(`\n=== COMPLETE ===`);
  console.log(`✅ Updated: ${updated} remaining pages`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`Total additional links: ~${updated * 4}`);
}

main().catch(console.error);
