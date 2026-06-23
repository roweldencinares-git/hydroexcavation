import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(
  process.env.BEACH_HYDROVAC_WP_USER + ':' + process.env.BEACH_HYDROVAC_WP_PASSWORD
).toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

// ============================================================
// INTERNAL LINKING STRATEGY
// ============================================================
// Blog posts → services + locations + other posts + contact CTA
// Service pages → other services + locations + blog posts + contact CTA
// Location pages → services + blog posts + nearby locations + contact CTA
// ============================================================

// Key URLs
const URLS = {
  home: 'https://beachhydrovac.com/',
  services: 'https://beachhydrovac.com/services/',
  contact: 'https://beachhydrovac.com/contact/',
  about: 'https://beachhydrovac.com/about/',
  faq: 'https://beachhydrovac.com/faq/',
  locations: 'https://beachhydrovac.com/locations/',
  serviceAreas: 'https://beachhydrovac.com/service-areas/',
  // Services
  hydroExcavation: 'https://beachhydrovac.com/services/hydro-excavation/',
  potholing: 'https://beachhydrovac.com/services/potholing/',
  daylighting: 'https://beachhydrovac.com/services/daylighting/',
  slotTrenching: 'https://beachhydrovac.com/services/slot-trenching/',
  remoteExcavation: 'https://beachhydrovac.com/services/remote-excavation/',
  sueLevel: 'https://beachhydrovac.com/services/sue-level-a/',
  // Blog posts
  whatIsHydro: 'https://beachhydrovac.com/what-is-hydro-excavation/',
  safety: 'https://beachhydrovac.com/hydro-excavation-safety-best-practices/',
  va811: 'https://beachhydrovac.com/virginia-811-miss-utility-guide/',
  fiberOptic: 'https://beachhydrovac.com/fiber-optic-installation-hydro-excavation/',
  costGuide: 'https://beachhydrovac.com/hydro-excavation-cost-guide-virginia-2026/',
  utilityStrikes: 'https://beachhydrovac.com/common-utility-strike-mistakes-how-to-avoid/',
  vdotSue: 'https://beachhydrovac.com/vdot-sue-requirements-contractors-guide/',
  vsTraditional: 'https://beachhydrovac.com/hydro-excavation-vs-traditional-excavation/',
  // Key locations
  virginiaBeach: 'https://beachhydrovac.com/locations/virginia-beach-2/',
  norfolk: 'https://beachhydrovac.com/locations/norfolk-2/',
  chesapeake: 'https://beachhydrovac.com/locations/chesapeake-2/',
  richmond: 'https://beachhydrovac.com/locations/richmond-2/',
  hampton: 'https://beachhydrovac.com/locations/hampton-2/',
};

// Helper: create a contextual link block to append at the end of page content
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

// Helper: create a CTA block
function createCTA() {
  return `

<div style="margin-top:25px;padding:20px 25px;background:#0f2134;border-radius:6px;text-align:center;">
  <p style="color:#fff;margin:0 0 10px 0;font-size:16px;">Ready to get started? Get a free quote today.</p>
  <a href="${URLS.contact}" style="display:inline-block;padding:12px 30px;background:#e8a020;color:#0f2134;text-decoration:none;border-radius:4px;font-weight:bold;font-size:16px;">Request a Free Quote</a>
  <p style="color:#ccc;margin:10px 0 0 0;font-size:14px;">Or call us at <a href="tel:7575105220" style="color:#e8a020;text-decoration:none;">757-510-5220</a></p>
</div>`;
}

async function getContent(id) {
  const r = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${id}`, { headers });
  if (!r.ok) {
    const r2 = await fetch(`${WP_URL}/wp-json/wp/v2/posts/${id}`, { headers });
    return await r2.json();
  }
  return await r.json();
}

async function updateContent(id, type, newContent) {
  const endpoint = type === 'post' ? 'posts' : 'pages';
  const r = await fetch(`${WP_URL}/wp-json/wp/v2/${endpoint}/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ content: newContent })
  });
  return r.ok;
}

async function addLinksToPage(id, type, links, heading) {
  const item = await getContent(id);
  const content = item.content?.raw || item.content?.rendered || '';

  // Check if we already added links (prevent duplicates)
  if (content.includes('Related Resources') || content.includes('Learn More') || content.includes('Explore Our Services') || content.includes('Related Reading')) {
    console.log(`  ⏭️  ID:${id} - Already has link block, skipping`);
    return true;
  }

  const linkBlock = createLinkBlock(links, heading);
  const cta = createCTA();
  const newContent = content + linkBlock + cta;

  const ok = await updateContent(id, type, newContent);
  return ok;
}

async function main() {
  let updated = 0;
  let failed = 0;

  console.log('\n=== BUILDING INTERNAL LINK NETWORK ===\n');

  // ============================================================
  // 1. BLOG POSTS - Add contextual links to each
  // ============================================================
  console.log('--- BLOG POSTS ---\n');

  const blogLinks = [
    {
      id: 3695, type: 'post', name: 'What is Hydro Excavation',
      links: [
        { url: URLS.hydroExcavation, text: 'Our Hydro Excavation Services' },
        { url: URLS.vsTraditional, text: 'Hydro Excavation vs Traditional Excavation' },
        { url: URLS.costGuide, text: 'Hydro Excavation Cost Guide Virginia 2026' },
        { url: URLS.safety, text: 'Hydro Excavation Safety Best Practices' },
        { url: URLS.serviceAreas, text: 'Service Areas Across Virginia' },
      ],
      heading: 'Related Resources'
    },
    {
      id: 3696, type: 'post', name: 'Hydro Excavation Safety',
      links: [
        { url: URLS.va811, text: 'Virginia 811 Miss Utility Guide' },
        { url: URLS.utilityStrikes, text: '5 Common Utility Strike Mistakes' },
        { url: URLS.vdotSue, text: 'VDOT SUE Requirements Guide' },
        { url: URLS.hydroExcavation, text: 'Our Hydro Excavation Services' },
        { url: URLS.sueLevel, text: 'SUE Level A Verification Services' },
      ],
      heading: 'Related Resources'
    },
    {
      id: 3697, type: 'post', name: 'Virginia 811 Miss Utility Guide',
      links: [
        { url: URLS.safety, text: 'Hydro Excavation Safety Best Practices' },
        { url: URLS.utilityStrikes, text: '5 Common Utility Strike Mistakes' },
        { url: URLS.potholing, text: 'Our Potholing Services' },
        { url: URLS.daylighting, text: 'Our Daylighting Services' },
        { url: URLS.serviceAreas, text: 'Areas We Serve Across Virginia' },
      ],
      heading: 'Related Resources'
    },
    {
      id: 3490, type: 'post', name: 'Fiber Optic Installation',
      links: [
        { url: URLS.slotTrenching, text: 'Slot Trenching Services' },
        { url: URLS.hydroExcavation, text: 'Our Hydro Excavation Services' },
        { url: URLS.whatIsHydro, text: 'What is Hydro Excavation?' },
        { url: URLS.costGuide, text: 'Hydro Excavation Cost Guide' },
        { url: URLS.norfolk, text: 'Hydro Excavation Norfolk VA' },
      ],
      heading: 'Related Resources'
    },
    {
      id: 3489, type: 'post', name: 'Hydro Excavation Cost Guide',
      links: [
        { url: URLS.whatIsHydro, text: 'What is Hydro Excavation?' },
        { url: URLS.vsTraditional, text: 'Hydro Excavation vs Traditional Excavation' },
        { url: URLS.services, text: 'View All Our Services' },
        { url: URLS.sueLevel, text: 'SUE Level A Verification' },
        { url: URLS.virginiaBeach, text: 'Hydro Excavation Virginia Beach' },
      ],
      heading: 'Related Resources'
    },
    {
      id: 3488, type: 'post', name: 'Common Utility Strike Mistakes',
      links: [
        { url: URLS.va811, text: 'Virginia 811 Miss Utility Guide' },
        { url: URLS.safety, text: 'Hydro Excavation Safety Best Practices' },
        { url: URLS.potholing, text: 'Our Potholing Services' },
        { url: URLS.whatIsHydro, text: 'What is Hydro Excavation?' },
        { url: URLS.daylighting, text: 'Our Daylighting Services' },
      ],
      heading: 'Related Resources'
    },
    {
      id: 3487, type: 'post', name: 'VDOT SUE Requirements Guide',
      links: [
        { url: URLS.sueLevel, text: 'Our SUE Level A Services' },
        { url: URLS.potholing, text: 'Potholing Services' },
        { url: URLS.safety, text: 'Hydro Excavation Safety Best Practices' },
        { url: URLS.costGuide, text: 'Hydro Excavation Cost Guide' },
        { url: URLS.richmond, text: 'Hydro Excavation Richmond VA' },
      ],
      heading: 'Related Resources'
    },
    {
      id: 3486, type: 'post', name: 'Hydro Excavation vs Traditional',
      links: [
        { url: URLS.whatIsHydro, text: 'What is Hydro Excavation?' },
        { url: URLS.costGuide, text: 'Hydro Excavation Cost Guide Virginia' },
        { url: URLS.safety, text: 'Hydro Excavation Safety Best Practices' },
        { url: URLS.hydroExcavation, text: 'Our Hydro Excavation Services' },
        { url: URLS.serviceAreas, text: 'Service Areas Across Virginia' },
      ],
      heading: 'Related Resources'
    },
  ];

  for (const blog of blogLinks) {
    process.stdout.write(`  Adding links to: ${blog.name}...`);
    const ok = await addLinksToPage(blog.id, blog.type, blog.links, blog.heading);
    if (ok) { console.log(' ✅'); updated++; }
    else { console.log(' ❌ FAILED'); failed++; }
  }

  // ============================================================
  // 2. SERVICE PAGES - Add links to each
  // ============================================================
  console.log('\n--- SERVICE PAGES ---\n');

  const serviceLinks = [
    {
      id: 3456, type: 'page', name: 'Hydro Excavation (main service)',
      links: [
        { url: URLS.whatIsHydro, text: 'What is Hydro Excavation? Complete Guide' },
        { url: URLS.costGuide, text: 'Hydro Excavation Cost Guide Virginia 2026' },
        { url: URLS.potholing, text: 'Potholing Services' },
        { url: URLS.daylighting, text: 'Daylighting Services' },
        { url: URLS.slotTrenching, text: 'Slot Trenching Services' },
        { url: URLS.serviceAreas, text: 'View All Service Areas' },
      ],
      heading: 'Explore Our Services'
    },
    {
      id: 3457, type: 'page', name: 'Potholing Services',
      links: [
        { url: URLS.hydroExcavation, text: 'Hydro Excavation Services' },
        { url: URLS.sueLevel, text: 'SUE Level A Verification' },
        { url: URLS.vdotSue, text: 'VDOT SUE Requirements Guide' },
        { url: URLS.daylighting, text: 'Daylighting Services' },
        { url: URLS.utilityStrikes, text: '5 Common Utility Strike Mistakes' },
        { url: URLS.serviceAreas, text: 'View All Service Areas' },
      ],
      heading: 'Explore Our Services'
    },
    {
      id: 3458, type: 'page', name: 'Daylighting Services',
      links: [
        { url: URLS.hydroExcavation, text: 'Hydro Excavation Services' },
        { url: URLS.potholing, text: 'Potholing Services' },
        { url: URLS.whatIsHydro, text: 'What is Hydro Excavation?' },
        { url: URLS.va811, text: 'Virginia 811 Miss Utility Guide' },
        { url: URLS.safety, text: 'Safety Best Practices' },
        { url: URLS.serviceAreas, text: 'View All Service Areas' },
      ],
      heading: 'Explore Our Services'
    },
    {
      id: 3459, type: 'page', name: 'Slot Trenching Services',
      links: [
        { url: URLS.hydroExcavation, text: 'Hydro Excavation Services' },
        { url: URLS.fiberOptic, text: 'Fiber Optic Installation with Hydro Excavation' },
        { url: URLS.remoteExcavation, text: 'Remote Excavation Services' },
        { url: URLS.costGuide, text: 'Hydro Excavation Cost Guide' },
        { url: URLS.vsTraditional, text: 'Hydro Excavation vs Traditional' },
        { url: URLS.serviceAreas, text: 'View All Service Areas' },
      ],
      heading: 'Explore Our Services'
    },
    {
      id: 3460, type: 'page', name: 'Remote Excavation Services',
      links: [
        { url: URLS.hydroExcavation, text: 'Hydro Excavation Services' },
        { url: URLS.slotTrenching, text: 'Slot Trenching Services' },
        { url: URLS.potholing, text: 'Potholing Services' },
        { url: URLS.whatIsHydro, text: 'What is Hydro Excavation?' },
        { url: URLS.costGuide, text: 'Cost Guide Virginia 2026' },
        { url: URLS.serviceAreas, text: 'View All Service Areas' },
      ],
      heading: 'Explore Our Services'
    },
    {
      id: 3461, type: 'page', name: 'SUE Level A Verification',
      links: [
        { url: URLS.potholing, text: 'Potholing Services' },
        { url: URLS.vdotSue, text: 'VDOT SUE Requirements Guide' },
        { url: URLS.hydroExcavation, text: 'Hydro Excavation Services' },
        { url: URLS.utilityStrikes, text: '5 Common Utility Strike Mistakes' },
        { url: URLS.safety, text: 'Safety Best Practices' },
        { url: URLS.serviceAreas, text: 'View All Service Areas' },
      ],
      heading: 'Explore Our Services'
    },
  ];

  for (const svc of serviceLinks) {
    process.stdout.write(`  Adding links to: ${svc.name}...`);
    const ok = await addLinksToPage(svc.id, svc.type, svc.links, svc.heading);
    if (ok) { console.log(' ✅'); updated++; }
    else { console.log(' ❌ FAILED'); failed++; }
  }

  // ============================================================
  // 3. LOCATION PAGES - Add links to each (newer -2 versions)
  // ============================================================
  console.log('\n--- LOCATION PAGES (primary set) ---\n');

  const locationPages = [
    {
      id: 3469, type: 'page', name: 'Virginia Beach',
      links: [
        { url: URLS.services, text: 'All Hydro Excavation Services' },
        { url: URLS.costGuide, text: 'Hydro Excavation Cost Guide Virginia' },
        { url: URLS.chesapeake, text: 'Hydro Excavation Chesapeake VA' },
        { url: URLS.norfolk, text: 'Hydro Excavation Norfolk VA' },
        { url: URLS.whatIsHydro, text: 'What is Hydro Excavation?' },
      ],
      heading: 'Learn More'
    },
    {
      id: 3470, type: 'page', name: 'Norfolk',
      links: [
        { url: URLS.services, text: 'All Hydro Excavation Services' },
        { url: URLS.virginiaBeach, text: 'Hydro Excavation Virginia Beach' },
        { url: URLS.chesapeake, text: 'Hydro Excavation Chesapeake VA' },
        { url: URLS.fiberOptic, text: 'Fiber Optic Installation Services' },
        { url: URLS.safety, text: 'Hydro Excavation Safety Guide' },
      ],
      heading: 'Learn More'
    },
    {
      id: 3471, type: 'page', name: 'Chesapeake',
      links: [
        { url: URLS.services, text: 'All Hydro Excavation Services' },
        { url: URLS.virginiaBeach, text: 'Hydro Excavation Virginia Beach' },
        { url: URLS.norfolk, text: 'Hydro Excavation Norfolk VA' },
        { url: URLS.whatIsHydro, text: 'What is Hydro Excavation?' },
        { url: URLS.costGuide, text: 'Cost Guide Virginia 2026' },
      ],
      heading: 'Learn More'
    },
    {
      id: 3474, type: 'page', name: 'Suffolk',
      links: [
        { url: URLS.services, text: 'All Hydro Excavation Services' },
        { url: URLS.chesapeake, text: 'Hydro Excavation Chesapeake VA' },
        { url: URLS.virginiaBeach, text: 'Hydro Excavation Virginia Beach' },
        { url: URLS.va811, text: 'Virginia 811 Utility Guide' },
        { url: URLS.costGuide, text: 'Cost Guide Virginia 2026' },
      ],
      heading: 'Learn More'
    },
    {
      id: 3475, type: 'page', name: 'Portsmouth',
      links: [
        { url: URLS.services, text: 'All Hydro Excavation Services' },
        { url: URLS.norfolk, text: 'Hydro Excavation Norfolk VA' },
        { url: URLS.chesapeake, text: 'Hydro Excavation Chesapeake VA' },
        { url: URLS.utilityStrikes, text: 'Common Utility Strike Mistakes' },
        { url: URLS.whatIsHydro, text: 'What is Hydro Excavation?' },
      ],
      heading: 'Learn More'
    },
    {
      id: 3472, type: 'page', name: 'Newport News',
      links: [
        { url: URLS.services, text: 'All Hydro Excavation Services' },
        { url: URLS.hampton, text: 'Hydro Excavation Hampton VA' },
        { url: URLS.virginiaBeach, text: 'Hydro Excavation Virginia Beach' },
        { url: URLS.sueLevel, text: 'SUE Level A Verification' },
        { url: URLS.vsTraditional, text: 'Hydro Excavation vs Traditional' },
      ],
      heading: 'Learn More'
    },
    {
      id: 3473, type: 'page', name: 'Hampton',
      links: [
        { url: URLS.services, text: 'All Hydro Excavation Services' },
        { url: 'https://beachhydrovac.com/locations/newport-news-2/', text: 'Hydro Excavation Newport News' },
        { url: URLS.norfolk, text: 'Hydro Excavation Norfolk VA' },
        { url: URLS.vdotSue, text: 'VDOT SUE Requirements' },
        { url: URLS.safety, text: 'Safety Best Practices' },
      ],
      heading: 'Learn More'
    },
    {
      id: 3476, type: 'page', name: 'Williamsburg',
      links: [
        { url: URLS.services, text: 'All Hydro Excavation Services' },
        { url: URLS.hampton, text: 'Hydro Excavation Hampton VA' },
        { url: 'https://beachhydrovac.com/locations/newport-news-2/', text: 'Hydro Excavation Newport News' },
        { url: URLS.whatIsHydro, text: 'What is Hydro Excavation?' },
        { url: URLS.costGuide, text: 'Cost Guide Virginia 2026' },
      ],
      heading: 'Learn More'
    },
    {
      id: 3477, type: 'page', name: 'Richmond',
      links: [
        { url: URLS.services, text: 'All Hydro Excavation Services' },
        { url: 'https://beachhydrovac.com/locations/henrico/', text: 'Hydro Excavation Henrico VA' },
        { url: 'https://beachhydrovac.com/locations/chesterfield/', text: 'Hydro Excavation Chesterfield VA' },
        { url: URLS.vdotSue, text: 'VDOT SUE Requirements Guide' },
        { url: URLS.costGuide, text: 'Cost Guide Virginia 2026' },
      ],
      heading: 'Learn More'
    },
    {
      id: 3478, type: 'page', name: 'Henrico',
      links: [
        { url: URLS.services, text: 'All Hydro Excavation Services' },
        { url: URLS.richmond, text: 'Hydro Excavation Richmond VA' },
        { url: 'https://beachhydrovac.com/locations/chesterfield/', text: 'Hydro Excavation Chesterfield VA' },
        { url: URLS.whatIsHydro, text: 'What is Hydro Excavation?' },
        { url: URLS.utilityStrikes, text: 'Common Utility Strike Mistakes' },
      ],
      heading: 'Learn More'
    },
    {
      id: 3479, type: 'page', name: 'Chesterfield',
      links: [
        { url: URLS.services, text: 'All Hydro Excavation Services' },
        { url: URLS.richmond, text: 'Hydro Excavation Richmond VA' },
        { url: 'https://beachhydrovac.com/locations/henrico/', text: 'Hydro Excavation Henrico VA' },
        { url: URLS.fiberOptic, text: 'Fiber Optic Installation Services' },
        { url: URLS.va811, text: 'Virginia 811 Guide' },
      ],
      heading: 'Learn More'
    },
    {
      id: 3480, type: 'page', name: 'Alexandria',
      links: [
        { url: URLS.services, text: 'All Hydro Excavation Services' },
        { url: 'https://beachhydrovac.com/locations/arlington/', text: 'Hydro Excavation Arlington VA' },
        { url: 'https://beachhydrovac.com/locations/fairfax/', text: 'Hydro Excavation Fairfax VA' },
        { url: URLS.sueLevel, text: 'SUE Level A Verification' },
        { url: URLS.safety, text: 'Safety Best Practices' },
      ],
      heading: 'Learn More'
    },
    {
      id: 3481, type: 'page', name: 'Arlington',
      links: [
        { url: URLS.services, text: 'All Hydro Excavation Services' },
        { url: 'https://beachhydrovac.com/locations/alexandria/', text: 'Hydro Excavation Alexandria VA' },
        { url: 'https://beachhydrovac.com/locations/fairfax/', text: 'Hydro Excavation Fairfax VA' },
        { url: URLS.vdotSue, text: 'VDOT SUE Requirements' },
        { url: URLS.whatIsHydro, text: 'What is Hydro Excavation?' },
      ],
      heading: 'Learn More'
    },
    {
      id: 3482, type: 'page', name: 'Fairfax',
      links: [
        { url: URLS.services, text: 'All Hydro Excavation Services' },
        { url: 'https://beachhydrovac.com/locations/arlington/', text: 'Hydro Excavation Arlington VA' },
        { url: 'https://beachhydrovac.com/locations/alexandria/', text: 'Hydro Excavation Alexandria VA' },
        { url: URLS.costGuide, text: 'Cost Guide Virginia 2026' },
        { url: URLS.utilityStrikes, text: 'Common Utility Strike Mistakes' },
      ],
      heading: 'Learn More'
    },
    {
      id: 3483, type: 'page', name: 'Fredericksburg',
      links: [
        { url: URLS.services, text: 'All Hydro Excavation Services' },
        { url: URLS.richmond, text: 'Hydro Excavation Richmond VA' },
        { url: URLS.virginiaBeach, text: 'Hydro Excavation Virginia Beach' },
        { url: URLS.slotTrenching, text: 'Slot Trenching Services' },
        { url: URLS.va811, text: 'Virginia 811 Guide' },
      ],
      heading: 'Learn More'
    },
    {
      id: 3484, type: 'page', name: 'Roanoke',
      links: [
        { url: URLS.services, text: 'All Hydro Excavation Services' },
        { url: 'https://beachhydrovac.com/locations/lynchburg/', text: 'Hydro Excavation Lynchburg VA' },
        { url: URLS.remoteExcavation, text: 'Remote Excavation Services (600ft reach)' },
        { url: URLS.whatIsHydro, text: 'What is Hydro Excavation?' },
        { url: URLS.costGuide, text: 'Cost Guide Virginia 2026' },
      ],
      heading: 'Learn More'
    },
    {
      id: 3485, type: 'page', name: 'Lynchburg',
      links: [
        { url: URLS.services, text: 'All Hydro Excavation Services' },
        { url: 'https://beachhydrovac.com/locations/roanoke/', text: 'Hydro Excavation Roanoke VA' },
        { url: URLS.remoteExcavation, text: 'Remote Excavation Services (600ft reach)' },
        { url: URLS.safety, text: 'Safety Best Practices' },
        { url: URLS.vsTraditional, text: 'Hydro Excavation vs Traditional' },
      ],
      heading: 'Learn More'
    },
    {
      id: 3671, type: 'page', name: 'Eastern Shore',
      links: [
        { url: URLS.services, text: 'All Hydro Excavation Services' },
        { url: URLS.virginiaBeach, text: 'Hydro Excavation Virginia Beach' },
        { url: URLS.norfolk, text: 'Hydro Excavation Norfolk VA' },
        { url: URLS.whatIsHydro, text: 'What is Hydro Excavation?' },
        { url: URLS.costGuide, text: 'Cost Guide Virginia 2026' },
      ],
      heading: 'Learn More'
    },
  ];

  for (const loc of locationPages) {
    process.stdout.write(`  Adding links to: ${loc.name}...`);
    const ok = await addLinksToPage(loc.id, loc.type, loc.links, loc.heading);
    if (ok) { console.log(' ✅'); updated++; }
    else { console.log(' ❌ FAILED'); failed++; }
  }

  // ============================================================
  // 4. CORE PAGES - About, FAQ, Services Hub
  // ============================================================
  console.log('\n--- CORE PAGES ---\n');

  const corePages = [
    {
      id: 3454, type: 'page', name: 'FAQ Page',
      links: [
        { url: URLS.whatIsHydro, text: 'What is Hydro Excavation? Complete Guide' },
        { url: URLS.costGuide, text: 'Hydro Excavation Cost Guide Virginia 2026' },
        { url: URLS.services, text: 'View All Our Services' },
        { url: URLS.va811, text: 'Virginia 811 Miss Utility Guide' },
        { url: URLS.serviceAreas, text: 'Service Areas Across Virginia' },
      ],
      heading: 'Related Resources'
    },
    {
      id: 3346, type: 'page', name: 'About Page',
      links: [
        { url: URLS.services, text: 'View Our Services' },
        { url: URLS.whatIsHydro, text: 'What is Hydro Excavation?' },
        { url: URLS.serviceAreas, text: 'Areas We Serve' },
        { url: URLS.faq, text: 'Frequently Asked Questions' },
      ],
      heading: 'Learn More About Beach HydroVac'
    },
    {
      id: 3332, type: 'page', name: 'Services Hub',
      links: [
        { url: URLS.hydroExcavation, text: 'Hydro Excavation' },
        { url: URLS.potholing, text: 'Potholing' },
        { url: URLS.daylighting, text: 'Daylighting' },
        { url: URLS.slotTrenching, text: 'Slot Trenching' },
        { url: URLS.remoteExcavation, text: 'Remote Excavation' },
        { url: URLS.sueLevel, text: 'SUE Level A Verification' },
        { url: URLS.serviceAreas, text: 'View All Service Areas' },
        { url: URLS.costGuide, text: 'Cost Guide Virginia 2026' },
      ],
      heading: 'Explore Our Services'
    },
  ];

  for (const page of corePages) {
    process.stdout.write(`  Adding links to: ${page.name}...`);
    const ok = await addLinksToPage(page.id, page.type, page.links, page.heading);
    if (ok) { console.log(' ✅'); updated++; }
    else { console.log(' ❌ FAILED'); failed++; }
  }

  // ============================================================
  // SUMMARY
  // ============================================================
  console.log(`\n=== COMPLETE ===`);
  console.log(`✅ Updated: ${updated} pages`);
  console.log(`❌ Failed: ${failed} pages`);
  console.log(`\nTotal internal links added: ~${updated * 5}`);
  console.log('\nLink network structure:');
  console.log('  Blog posts → services, locations, other posts, contact CTA');
  console.log('  Service pages → other services, locations, blog posts, contact CTA');
  console.log('  Location pages → services, nearby locations, blog posts, contact CTA');
  console.log('  Core pages → services, blog posts, service areas');
}

main().catch(console.error);
