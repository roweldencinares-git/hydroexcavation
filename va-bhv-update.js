/**
 * Virginia City Pages — Beach HydroVac Full Listing Update
 * Replaces the basic listing card with a comprehensive business profile
 * on all 20 Virginia city pages.
 *
 * Run: node va-bhv-update.js
 */

import fetch from 'node-fetch';

const WP_URL  = 'https://springgreen-stinkbug-577322.hostingersite.com';
const WP_USER = 'roweldencinares@gmail.com';
const WP_PASS = 'jqfA ESlL T5xL QsLo e0fI H4Pt';
const AUTH    = 'Basic ' + Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64');
const H       = { 'Authorization': AUTH, 'Content-Type': 'application/json' };

// ─── BEACH HYDROVAC FULL PROFILE ─────────────────────────────────────────────
const BHV = {
  name:        'Beach HydroVac',
  tagline:     'A Division of AIM Locating — Map First, Dig Second',
  phone:       '757-510-5220',
  phoneRaw:    '7575105220',
  website:     'https://www.beachhydrovac.com',
  location:    'Norfolk, VA',
  area:        'Norfolk · Virginia Beach · Chesapeake · Hampton · Newport News · Portsmouth · Suffolk · Hampton Roads · VA · NC · MD · DE',
  veteran:     true,
  badges:      ['Veteran-Owned', 'Licensed', 'Insured', 'EPA Compliant'],
  services: [
    { name: 'Potholing / Daylighting',    desc: 'SUE Level A verification — safe utility exposure with photo documentation for engineers.' },
    { name: 'Slot Trenching',             desc: 'Narrow, precise trenches for pipes, cables, and conduit with minimal surface disruption.' },
    { name: 'Remote Excavation',          desc: '500+ ft hose reach — access tight, congested, or restricted areas traditional equipment can\'t reach.' },
    { name: 'SUE Level A Verification',   desc: 'Gold-standard subsurface utility mapping with exact depth, material ID, and condition assessment.' },
    { name: 'Industrial Projects',        desc: 'High-volume commercial and industrial excavation with heavy-capacity equipment.' },
    { name: 'Utility Coordination',       desc: 'Integrated AIM Locating workflow eliminates the blame game between locators and excavators.' },
    { name: 'Emergency Response',         desc: 'Rapid deployment for utility strikes, leak investigations, and urgent excavation needs.' },
  ],
  differentiators: [
    '500+ ft hose reach — longest in Hampton Roads',
    'Division of AIM Locating (SUE firm)',
    'Military-grade precision and discipline',
    '24/7 emergency response available',
  ],
  story: 'Founded by veterans who brought military discipline to infrastructure protection. BeachHydrovac operates as a specialized division of AIM Locating, one of Virginia\'s leading subsurface utility engineering firms. This partnership means locating specialists and excavation professionals work together seamlessly — no blame game, just results.',
};

// ─── VIRGINIA CITY PAGES ─────────────────────────────────────────────────────
const VA_CITIES = [
  ['norfolk-va',          'Norfolk'],
  ['virginia-beach-va',   'Virginia Beach'],
  ['chesapeake-va',       'Chesapeake'],
  ['hampton-va',          'Hampton'],
  ['newport-news-va',     'Newport News'],
  ['portsmouth-va',       'Portsmouth'],
  ['suffolk-va',          'Suffolk'],
  ['richmond-va',         'Richmond'],
  ['roanoke-va',          'Roanoke'],
  ['alexandria-va',       'Alexandria'],
  ['lynchburg-va',        'Lynchburg'],
  ['harrisonburg-va',     'Harrisonburg'],
  ['charlottesville-va',  'Charlottesville'],
  ['danville-va',         'Danville'],
  ['manassas-va',         'Manassas'],
  ['petersburg-va',       'Petersburg'],
  ['fredericksburg-va',   'Fredericksburg'],
  ['winchester-va',       'Winchester'],
  ['blacksburg-va',       'Blacksburg'],
  ['leesburg-va',         'Leesburg'],
];

// ─── BUILD BHV LISTING BLOCK ─────────────────────────────────────────────────
function buildBHVListing(city) {
  const serviceRows = BHV.services.map(s =>
    `<!-- wp:group {"style":{"spacing":{"padding":{"top":"0.75rem","bottom":"0.75rem"},"margin":{"bottom":"0"}}, "border":{"bottom":{"color":"#e5e7eb","width":"1px"}}},"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between"}} -->
<div class="wp-block-group" style="border-bottom:1px solid #e5e7eb;padding-top:0.75rem;padding-bottom:0.75rem">
<!-- wp:paragraph {"style":{"typography":{"fontWeight":"600","fontSize":"0.9rem"}}} --><p style="font-weight:600;font-size:0.9rem">✓ ${s.name}</p><!-- /wp:paragraph -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.82rem"},"color":{"text":"#6b7280"}}} --><p class="has-text-color" style="font-size:0.82rem;color:#6b7280">${s.desc}</p><!-- /wp:paragraph -->
</div>
<!-- /wp:group -->`
  ).join('\n');

  const badgeItems = BHV.badges.map(b =>
    `<!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"0","bottom":"0"}},"typography":{"fontSize":"0.75rem","fontWeight":"700"},"color":{"background":"#1a365d","text":"#ffffff"},"border":{"radius":"999px"},"spacing":{"padding":{"top":"0.25rem","bottom":"0.25rem","left":"0.75rem","right":"0.75rem"}}}} -->
<p class="has-background has-text-color" style="background-color:#1a365d;color:#fff;font-size:0.75rem;font-weight:700;border-radius:999px;padding:0.25rem 0.75rem;display:inline-block;margin:0 0.25rem 0.25rem 0">${b}</p><!-- /wp:paragraph -->`
  ).join('\n');

  const diffList = BHV.differentiators.map(d =>
    `<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.85rem"}}} --><p style="font-size:0.85rem">⚡ ${d}</p><!-- /wp:paragraph -->`
  ).join('\n');

  return `<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"},"margin":{"top":"2rem","bottom":"2rem"}},"border":{"radius":"12px","top":{"color":"#f7bb14","width":"5px"},"right":{"width":"1px","color":"#e5e7eb"},"bottom":{"width":"1px","color":"#e5e7eb"},"left":{"width":"1px","color":"#e5e7eb"}},"shadow":"var:preset|shadow|natural"},"backgroundColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-white-background-color has-background" style="border-radius:12px;border-top:5px solid #f7bb14;border:1px solid #e5e7eb;padding:1.5rem;margin-top:2rem;margin-bottom:2rem;box-shadow:var(--wp--preset--shadow--natural)">

<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between","verticalAlignment":"center"},"style":{"spacing":{"margin":{"bottom":"1.25rem"}}}} -->
<div class="wp-block-group" style="margin-bottom:1.25rem">
<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.25rem","fontWeight":"800"},"color":{"text":"#1a365d"}}} --><h3 class="wp-block-heading has-text-color" style="color:#1a365d;font-size:1.25rem;font-weight:800">⭐ Featured Contractor — ${BHV.name}</h3><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.75rem","fontWeight":"700"},"color":{"background":"#B91C1C","text":"#ffffff"},"border":{"radius":"999px"},"spacing":{"padding":{"top":"0.2rem","bottom":"0.2rem","left":"0.6rem","right":"0.6rem"}}}} --><p class="has-background has-text-color" style="background:#B91C1C;color:#fff;font-size:0.75rem;font-weight:700;border-radius:999px;padding:0.2rem 0.6rem">🇺🇸 VETERAN OWNED</p><!-- /wp:paragraph -->
</div>
<!-- /wp:group -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.85rem","fontStyle":"italic"},"color":{"text":"#6b7280"}}} --><p class="has-text-color" style="color:#6b7280;font-size:0.85rem;font-style:italic">${BHV.tagline}</p><!-- /wp:paragraph -->

<!-- wp:columns {"style":{"spacing":{"margin":{"top":"1.25rem","bottom":"1.25rem"}}}} -->
<div class="wp-block-columns" style="margin-top:1.25rem;margin-bottom:1.25rem">

<!-- wp:column {"width":"40%"} -->
<div class="wp-block-column" style="flex-basis:40%">

<!-- wp:heading {"level":4,"style":{"typography":{"fontSize":"0.8rem","fontWeight":"700","textTransform":"uppercase","letterSpacing":"0.08em"},"color":{"text":"#9ca3af"},"spacing":{"margin":{"bottom":"0.75rem"}}}} --><h4 class="wp-block-heading has-text-color" style="color:#9ca3af;font-size:0.8rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.75rem">Contact</h4><!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.5rem","fontWeight":"800"},"color":{"text":"#1a365d"}}} --><p class="has-text-color" style="color:#1a365d;font-size:1.5rem;font-weight:800"><a href="tel:${BHV.phoneRaw}" style="color:#1a365d;text-decoration:none">📞 ${BHV.phone}</a></p><!-- /wp:paragraph -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.875rem"}}} --><p style="font-size:0.875rem">🌐 <a href="${BHV.website}" target="_blank" rel="noopener noreferrer">${BHV.website.replace('https://www.','')}</a></p><!-- /wp:paragraph -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.875rem"}}} --><p style="font-size:0.875rem">📍 ${BHV.location}</p><!-- /wp:paragraph -->

<!-- wp:heading {"level":4,"style":{"typography":{"fontSize":"0.8rem","fontWeight":"700","textTransform":"uppercase","letterSpacing":"0.08em"},"color":{"text":"#9ca3af"},"spacing":{"margin":{"top":"1.25rem","bottom":"0.75rem"}}}} --><h4 class="wp-block-heading has-text-color" style="color:#9ca3af;font-size:0.8rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin-top:1.25rem;margin-bottom:0.75rem">Service Area</h4><!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.82rem"},"color":{"text":"#374151"}}} --><p class="has-text-color" style="color:#374151;font-size:0.82rem">${BHV.area}</p><!-- /wp:paragraph -->

<!-- wp:heading {"level":4,"style":{"typography":{"fontSize":"0.8rem","fontWeight":"700","textTransform":"uppercase","letterSpacing":"0.08em"},"color":{"text":"#9ca3af"},"spacing":{"margin":{"top":"1.25rem","bottom":"0.75rem"}}}} --><h4 class="wp-block-heading has-text-color" style="color:#9ca3af;font-size:0.8rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin-top:1.25rem;margin-bottom:0.75rem">Credentials</h4><!-- /wp:heading -->

${badgeItems}

<!-- wp:heading {"level":4,"style":{"typography":{"fontSize":"0.8rem","fontWeight":"700","textTransform":"uppercase","letterSpacing":"0.08em"},"color":{"text":"#9ca3af"},"spacing":{"margin":{"top":"1.25rem","bottom":"0.75rem"}}}} --><h4 class="wp-block-heading has-text-color" style="color:#9ca3af;font-size:0.8rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin-top:1.25rem;margin-bottom:0.75rem">Why Beach HydroVac</h4><!-- /wp:heading -->

${diffList}

</div>
<!-- /wp:column -->

<!-- wp:column {"width":"60%"} -->
<div class="wp-block-column" style="flex-basis:60%">

<!-- wp:heading {"level":4,"style":{"typography":{"fontSize":"0.8rem","fontWeight":"700","textTransform":"uppercase","letterSpacing":"0.08em"},"color":{"text":"#9ca3af"},"spacing":{"margin":{"bottom":"0.5rem"}}}} --><h4 class="wp-block-heading has-text-color" style="color:#9ca3af;font-size:0.8rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.5rem">Services Offered in ${city}</h4><!-- /wp:heading -->

${serviceRows}

<!-- wp:heading {"level":4,"style":{"typography":{"fontSize":"0.8rem","fontWeight":"700","textTransform":"uppercase","letterSpacing":"0.08em"},"color":{"text":"#9ca3af"},"spacing":{"margin":{"top":"1.5rem","bottom":"0.75rem"}}}} --><h4 class="wp-block-heading has-text-color" style="color:#9ca3af;font-size:0.8rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin-top:1.5rem;margin-bottom:0.75rem">About Beach HydroVac</h4><!-- /wp:heading -->

<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.875rem"},"color":{"text":"#374151"}}} --><p class="has-text-color" style="color:#374151;font-size:0.875rem">${BHV.story}</p><!-- /wp:paragraph -->

</div>
<!-- /wp:column -->

</div>
<!-- /wp:columns -->

<!-- wp:group {"style":{"spacing":{"padding":{"top":"1rem","bottom":"1rem"},"margin":{"top":"1rem"}},"border":{"top":{"color":"#f3f4f6","width":"1px"}},"color":{"background":"#fafafa"}},"layout":{"type":"flex","flexWrap":"nowrap","justifyContent":"space-between","verticalAlignment":"center"}} -->
<div class="wp-block-group has-background" style="background:#fafafa;border-top:1px solid #f3f4f6;padding:1rem;margin-top:1rem">
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.85rem","fontWeight":"600"}}} --><p style="font-size:0.85rem;font-weight:600">Ready to schedule in ${city}?</p><!-- /wp:paragraph -->
<!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap"}} -->
<div class="wp-block-group">
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.85rem","fontWeight":"700"},"color":{"background":"#1a365d","text":"#ffffff"},"border":{"radius":"999px"},"spacing":{"padding":{"top":"0.5rem","bottom":"0.5rem","left":"1.25rem","right":"1.25rem"}}}} --><p class="has-background has-text-color" style="background:#1a365d;color:#fff;font-size:0.85rem;font-weight:700;border-radius:999px;padding:0.5rem 1.25rem"><a href="tel:${BHV.phoneRaw}" style="color:#fff;text-decoration:none">📞 Call ${BHV.phone}</a></p><!-- /wp:paragraph -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.85rem","fontWeight":"700"},"color":{"background":"#f7bb14","text":"#1a365d"},"border":{"radius":"999px"},"spacing":{"padding":{"top":"0.5rem","bottom":"0.5rem","left":"1.25rem","right":"1.25rem"}}}} --><p class="has-background has-text-color" style="background:#f7bb14;color:#1a365d;font-size:0.85rem;font-weight:700;border-radius:999px;padding:0.5rem 1.25rem"><a href="${BHV.website}" target="_blank" rel="noopener noreferrer" style="color:#1a365d;text-decoration:none">🌐 Visit Website</a></p><!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->

</div>
<!-- /wp:group -->`;
}

// ─── WP REST HELPERS ─────────────────────────────────────────────────────────
async function getPage(slug) {
  const res = await fetch(`${WP_URL}/wp-json/wp/v2/pages?slug=${slug}&context=edit&_fields=id,content`, { headers: H });
  const pages = await res.json();
  return pages[0] || null;
}

function replaceListing(raw, newBlock) {
  // Remove the old listing group block (the wp:group containing "⭐ Featured")
  // and replace with the new one
  const start = raw.indexOf('<!-- wp:group') ;
  // Find the first group that contains "Featured" or "Beach HydroVac"
  let searchPos = 0;
  let listingStart = -1;
  while (searchPos < raw.length) {
    const idx = raw.indexOf('<!-- wp:group', searchPos);
    if (idx === -1) break;
    // Look ahead 2000 chars to see if this group contains the BHV listing
    const preview = raw.substring(idx, idx + 2000);
    if (preview.includes('Beach HydroVac') || preview.includes('Featured')) {
      listingStart = idx;
      break;
    }
    searchPos = idx + 1;
  }

  if (listingStart === -1) {
    // No existing listing found — insert before "Back to" paragraph
    const backMarker = '<!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"1.5rem"}}';
    const backIdx = raw.indexOf(backMarker);
    if (backIdx !== -1) return raw.slice(0, backIdx) + newBlock + '\n\n' + raw.slice(backIdx);
    return raw + '\n\n' + newBlock;
  }

  // Find the matching closing tag for this group block
  let depth = 0;
  let pos = listingStart;
  while (pos < raw.length) {
    const openIdx  = raw.indexOf('<!-- wp:group', pos);
    const closeIdx = raw.indexOf('<!-- /wp:group -->', pos);
    if (closeIdx === -1) break;

    if (openIdx !== -1 && openIdx < closeIdx) {
      depth++;
      pos = openIdx + 1;
    } else {
      depth--;
      if (depth === 0) {
        const listingEnd = closeIdx + '<!-- /wp:group -->'.length;
        return raw.slice(0, listingStart) + newBlock + raw.slice(listingEnd);
      }
      pos = closeIdx + 1;
    }
  }

  return raw.slice(0, listingStart) + newBlock + raw.slice(listingStart);
}

async function setYoastMeta(postId, title, description, keyphrase) {
  const res = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${postId}`, {
    method: 'POST', headers: H,
    body: JSON.stringify({
      meta: {
        '_yoast_wpseo_title':    title,
        '_yoast_wpseo_metadesc': description,
        '_yoast_wpseo_focuskw':  keyphrase,
      }
    })
  });
  const d = await res.json();
  if (d.code) throw new Error(d.message);
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function run() {
  console.log(`\nUpdating ${VA_CITIES.length} Virginia city pages with full Beach HydroVac profile...\n`);
  let ok = 0, fail = 0;

  for (const [slug, city] of VA_CITIES) {
    try {
      process.stdout.write(`  ${city}, VA ... `);

      const page = await getPage(slug);
      if (!page) { console.log('❌ page not found'); fail++; continue; }

      const newListing = buildBHVListing(city);
      const newContent = replaceListing(page.content?.raw || '', newListing);

      await fetch(`${WP_URL}/wp-json/wp/v2/pages/${page.id}`, {
        method: 'POST', headers: H,
        body: JSON.stringify({ content: newContent })
      });

      await setYoastMeta(
        page.id,
        `Beach HydroVac — Hydro Excavation in ${city}, VA | HydroVac Pro`,
        `Beach HydroVac provides veteran-owned hydro excavation in ${city}, VA. 757-510-5220. SUE Level A, potholing, slot trenching, 500+ ft reach. Serving all of Hampton Roads.`,
        `hydro excavation ${city} VA`
      );

      console.log('✅');
      ok++;
      await new Promise(r => setTimeout(r, 800));

    } catch (err) {
      console.log(`❌ ${err.message.substring(0, 80)}`);
      fail++;
      await new Promise(r => setTimeout(r, 1500));
    }
  }

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Updated: ${ok}
❌ Failed:  ${fail}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
}

run().catch(console.error);
