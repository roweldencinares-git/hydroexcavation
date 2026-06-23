/**
 * BeachHydroVac — Top Tier SEO Fix
 * Updates Yoast titles + meta descriptions for all key pages
 * Run: node fix-all-seo.js
 */
import fetch from 'node-fetch';

const WP_BASE = 'https://beachhydrovac.com/wp-json/wp/v2';
const AUTH    = 'rdenci_16:0L9x p2O7 tdfs khVJ UFyl 1UZk';
const HEADERS = {
  'Authorization': 'Basic ' + Buffer.from(AUTH).toString('base64'),
  'Content-Type': 'application/json'
};

// Top-tier SEO fixes — every title front-loads the primary keyword
const FIXES = [
  {
    slug: '/',
    type: 'pages',
    label: 'Homepage',
    yoast_title: 'Beach HydroVac | Hydrovac & Hydro Excavation Virginia Beach, VA',
    yoast_metadesc: "Virginia's #1 hydrovac contractor. Hydro excavation, vacuum excavation, potholing & SUE Level A in Virginia Beach, VA. Veteran-owned. Call 757-510-5220.",
  },
  {
    slug: 'vacuum-excavation',
    type: 'pages',
    label: 'Vacuum Excavation',
    yoast_title: 'Vacuum Excavation Services & Contractors Virginia Beach, VA | Beach HydroVac',
    yoast_metadesc: 'Professional vacuum excavation services in Virginia Beach, VA. Safe, non-destructive utility exposure by veteran-owned Beach HydroVac. Call 757-510-5220.',
  },
  {
    slug: 'vactor-truck-services',
    type: 'pages',
    label: 'Vactor Truck Services',
    yoast_title: 'Vactor Truck Services Virginia Beach, VA | Beach HydroVac',
    yoast_metadesc: 'Industrial vactor truck & vacuum excavation services in Virginia Beach & Hampton Roads, VA. Veteran-owned Beach HydroVac. Call 757-510-5220.',
  },
  {
    slug: 'services',
    type: 'pages',
    label: 'Services',
    yoast_title: 'Hydrovac Services Virginia Beach, VA | Beach HydroVac',
    yoast_metadesc: 'Complete hydrovac services in Virginia Beach, VA: hydro excavation, vacuum excavation, potholing, daylighting, slot trenching & SUE Level A. 757-510-5220.',
  },
  {
    slug: 'hydro-excavation',
    type: 'pages',
    label: 'Hydro Excavation Service',
    yoast_title: 'Hydro Excavation Services Virginia Beach, VA | Beach HydroVac',
    yoast_metadesc: 'Expert hydro excavation services in Virginia Beach & Hampton Roads, VA. Potholing, daylighting, SUE verification. Veteran-owned. Call 757-510-5220.',
  },
  {
    slug: 'potholing',
    type: 'pages',
    label: 'Potholing',
    yoast_title: 'Potholing Contractor Virginia Beach, VA | Beach HydroVac',
    yoast_metadesc: 'Expert potholing contractor in Virginia Beach & Hampton Roads, VA. Safe utility exposure using hydro excavation. Veteran-owned. 757-510-5220.',
  },
  {
    slug: 'daylighting',
    type: 'pages',
    label: 'Daylighting',
    yoast_title: 'Daylighting Services Virginia Beach, VA | Beach HydroVac',
    yoast_metadesc: 'Professional daylighting services in Virginia Beach, VA. Safely expose underground utilities with hydro excavation. Veteran-owned. 757-510-5220.',
  },
  {
    slug: 'slot-trenching',
    type: 'pages',
    label: 'Slot Trenching',
    yoast_title: 'Slot Trenching Virginia Beach & Hampton Roads, VA | Beach HydroVac',
    yoast_metadesc: 'Precision slot trenching in Virginia Beach & Hampton Roads, VA. Fiber optic & utility installation. Veteran-owned Beach HydroVac. 757-510-5220.',
  },
  {
    slug: 'sue-level-a',
    type: 'pages',
    label: 'SUE Level A',
    yoast_title: 'SUE Level A Verification Virginia | Beach HydroVac',
    yoast_metadesc: 'ASCE 38 SUE Level A verification services across Virginia. Potholing & daylighting for utility quality level designation. Call 757-510-5220.',
  },
  {
    slug: 'hydro-excavation-virginia-guide',
    type: 'pages',
    label: 'Virginia Guide',
    yoast_title: 'Hydro Excavation Virginia | Industrial Hydrovac Contractor Guide | Beach HydroVac',
    yoast_metadesc: 'Complete guide to hydro excavation & industrial hydrovac companies in Virginia. SUE, potholing & vacuum excavation. Beach HydroVac — 757-510-5220.',
  },
  {
    slug: 'hydro-excavation-contractors-virginia',
    type: 'pages',
    label: 'Contractors Virginia',
    yoast_title: 'Hydro Excavation Contractors Virginia Beach, VA | Industrial Hydrovac | Beach HydroVac',
    yoast_metadesc: 'Top-rated hydro excavation & industrial hydrovac contractors in Virginia Beach, VA. Serving Hampton Roads. Veteran-owned. 757-510-5220.',
  },
  {
    slug: 'faq',
    type: 'pages',
    label: 'FAQ',
    yoast_title: 'Hydrovac & Hydro Excavation FAQ Virginia Beach | Beach HydroVac',
    yoast_metadesc: 'Frequently asked questions about hydrovac & hydro excavation services in Virginia Beach, VA. Cost, process, safety. Beach HydroVac — 757-510-5220.',
  },
  {
    slug: 'what-is-hydro-excavation',
    type: 'posts',
    label: 'What is Hydro Excavation',
    yoast_title: 'What Is Hydro Excavation? Complete Guide | Beach HydroVac Virginia Beach',
    yoast_metadesc: 'Learn what hydro excavation is, how it works & why it\'s safer than traditional digging. Expert guide from Beach HydroVac, Virginia Beach, VA.',
  },
  {
    slug: 'virginia-811-miss-utility-guide',
    type: 'posts',
    label: '811 Miss Utility Guide',
    yoast_title: 'Virginia 811 Miss Utility Guide | Beach HydroVac Virginia Beach',
    yoast_metadesc: 'Complete guide to Virginia 811 Miss Utility: call before you dig, marking colors, deadlines & contractor requirements. Beach HydroVac 757-510-5220.',
  },
  {
    slug: 'hydro-excavation-cost-guide-virginia-2026',
    type: 'posts',
    label: 'Cost Guide 2026',
    yoast_title: 'Hydro Excavation Cost Guide Virginia 2026 | Beach HydroVac',
    yoast_metadesc: 'How much does hydro excavation cost in Virginia? 2026 pricing guide for potholing, daylighting & vacuum excavation. Beach HydroVac — 757-510-5220.',
  },
  {
    slug: 'vacuum-excavation-virginia-beach',
    type: 'posts',
    label: 'Vacuum Excavation VB Post',
    yoast_title: 'Vacuum Excavation Services Virginia Beach, VA | Beach HydroVac',
    yoast_metadesc: 'Vacuum excavation services in Virginia Beach, VA. Safe, non-destructive utility exposure for contractors & utilities. Veteran-owned. 757-510-5220.',
  },
  {
    slug: 'non-destructive-excavation-hampton-roads',
    type: 'posts',
    label: 'Non-Destructive Hampton Roads',
    yoast_title: 'Non-Destructive Excavation Hampton Roads, VA | Beach HydroVac',
    yoast_metadesc: 'Local non-destructive & hydro excavation services in Hampton Roads, VA. Safe utility exposure for contractors. Veteran-owned. 757-510-5220.',
  },
  {
    slug: 'hydro-excavation-vs-traditional-excavation',
    type: 'posts',
    label: 'Hydro vs Traditional',
    yoast_title: 'Hydro Excavation vs Mechanical Digging | Virginia | Beach HydroVac',
    yoast_metadesc: 'Hydro excavation vs traditional mechanical digging compared. Why hydrovac is safer, faster & cheaper for utility work in Virginia. Beach HydroVac.',
  },
];

async function getAllContent(type) {
  const res = await fetch(`${WP_BASE}/${type}?per_page=100&_fields=id,slug,link`, { headers: HEADERS });
  const data = await res.json();
  return Array.isArray(data) ? data.map(p => ({ ...p, type })) : [];
}

async function updateYoast(id, type, yoast_title, yoast_metadesc) {
  const res = await fetch(`${WP_BASE}/${type}/${id}`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      meta: {
        _yoast_wpseo_title: yoast_title,
        _yoast_wpseo_metadesc: yoast_metadesc,
      }
    })
  });
  return await res.json();
}

async function main() {
  console.log('\n' + '═'.repeat(65));
  console.log('  🚀  BeachHydroVac — Top Tier SEO Fix');
  console.log('  📝  Updating Yoast titles & meta descriptions');
  console.log('═'.repeat(65) + '\n');

  const [pages, posts] = await Promise.all([
    getAllContent('pages'),
    getAllContent('posts')
  ]);
  const all = [...pages, ...posts];

  let fixed = 0, failed = 0;

  for (const fix of FIXES) {
    process.stdout.write(`  ${fix.label.padEnd(35)}`);

    let match;
    if (fix.slug === '/') {
      // Homepage: find the page with the root URL
      match = pages.find(p => p.link === 'https://beachhydrovac.com/' || p.slug === 'home' || p.slug === '');
      if (!match) match = pages.find(p => p.link?.replace(/\/$/, '') === 'https://beachhydrovac.com');
    } else {
      match = all.find(p => p.slug === fix.slug && p.type === fix.type);
    }

    if (!match) {
      console.log(`⚠  Not found`);
      failed++;
      continue;
    }

    try {
      const result = await updateYoast(match.id, fix.type, fix.yoast_title, fix.yoast_metadesc);
      if (result.id) {
        console.log(`✅  ID:${match.id}`);
        fixed++;
      } else {
        console.log(`⚠  ${result.message || JSON.stringify(result).substring(0, 50)}`);
        failed++;
      }
    } catch (e) {
      console.log(`❌  ${e.message}`);
      failed++;
    }

    await new Promise(r => setTimeout(r, 250));
  }

  console.log('\n' + '═'.repeat(65));
  console.log(`  ✅  Fixed: ${fixed}    ⚠  Not updated: ${failed}`);
  console.log('═'.repeat(65) + '\n');
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
