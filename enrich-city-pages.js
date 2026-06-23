/**
 * City Page Content Enricher
 * Uses Claude API to generate unique local content for each city page,
 * then updates the page via WordPress REST API.
 *
 * Run in batches:
 *   node enrich-city-pages.js --state VA        (all VA cities)
 *   node enrich-city-pages.js --state NC        (all NC cities)
 *   node enrich-city-pages.js --city norfolk-va (single city)
 *   node enrich-city-pages.js --batch 1 --size 20 (first 20 pages)
 */

import fetch from 'node-fetch';
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';

const WP_URL = 'https://springgreen-stinkbug-577322.hostingersite.com';
const AUTH = 'Basic ' + Buffer.from('roweldencinares@gmail.com:jqfA ESlL T5xL QsLo e0fI H4Pt').toString('base64');
const H = { 'Authorization': AUTH, 'Content-Type': 'application/json' };

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── CITY DATA (slug → metadata for richer prompts) ──────────────────────────
const CITY_META = {
  // Virginia — Beach HydroVac territory
  'norfolk-va':          { pop: '238K', industries: 'military (largest naval base in the US — Naval Station Norfolk), port operations, shipbuilding, defense contracting', soil: 'tidal clay and sandy coastal fill, high water table', note: 'Dense underground utility corridors near active military and port infrastructure' },
  'virginia-beach-va':   { pop: '459K', industries: 'military (NAS Oceana, Joint Expeditionary Base), tourism, resort corridor development, retail', soil: 'sandy coastal soil with high water table near oceanfront', note: 'Rapid residential and commercial growth near utility corridors' },
  'chesapeake-va':       { pop: '249K', industries: 'industrial distribution, logistics, manufacturing, agriculture', soil: 'clay-heavy inland soil transitioning to tidal marsh near Chesapeake Bay', note: 'Growing industrial park development creating utility locating demand' },
  'hampton-va':          { pop: '137K', industries: 'NASA Langley Research Center, military (Langley AFB), manufacturing', soil: 'tidal clay and fill, coastal water table challenges', note: 'Active federal facility construction and utility upgrade projects' },
  'newport-news-va':     { pop: '180K', industries: 'Huntington Ingalls shipyard (largest US naval shipbuilder), manufacturing, port', soil: 'heavy clay near shipyard corridor, fill over tidal areas', note: 'Shipyard expansion and industrial utility work drives consistent demand' },
  'portsmouth-va':       { pop: '95K',  industries: 'naval shipyard (Norfolk Naval Shipyard), port, manufacturing', soil: 'tidal clay and industrial fill along waterfront', note: 'Active naval shipyard projects with strict underground utility protocols' },
  'suffolk-va':          { pop: '94K',  industries: 'agriculture, food processing (Planters/Jif), logistics, industrial parks', soil: 'loam and clay mix, Dismal Swamp proximity creates variable water table', note: 'Expanding industrial development in former agricultural areas' },
  'richmond-va':         { pop: '226K', industries: 'state government, finance, healthcare, manufacturing, distribution', soil: 'clay-heavy piedmont soil, James River corridor presents challenging conditions', note: 'Historic utility infrastructure requiring careful non-destructive exposure' },
  'roanoke-va':          { pop: '100K', industries: 'healthcare, railroads (Norfolk Southern HQ), manufacturing, education', soil: 'rocky clay in mountain valley, challenging for mechanical excavation', note: 'Railroad and industrial corridor utility work drives specialty excavation demand' },
  // NC cities
  'wilmington-nc':       { pop: '123K', industries: 'port operations (Port of Wilmington), film production, tourism, healthcare', soil: 'sandy coastal soil, high water table near Cape Fear River', note: 'Rapid coastal development and film studio construction driving utility demand' },
  'jacksonville-nc':     { pop: '72K',  industries: 'military (Camp Lejeune Marine Corps Base, MCAS New River)', soil: 'sandy coastal soil, variable water table on base', note: 'Military construction projects require non-destructive excavation near active utility corridors' },
  'fayetteville-nc':     { pop: '208K', industries: 'military (Fort Liberty, formerly Fort Bragg — largest US Army post by population)', soil: 'sandy loam piedmont soil', note: 'Major military base expansion and off-post development drives hydrovac demand' },
  'raleigh-nc':          { pop: '476K', industries: 'state government, Research Triangle Park, tech, biotech, healthcare', soil: 'red clay piedmont, dense utility corridors in fast-growing corridors', note: 'One of fastest-growing US metros — constant infrastructure and utility work' },
  'charlotte-nc':        { pop: '900K', industries: 'banking (Bank of America, Wells Fargo), energy (Duke Energy HQ), manufacturing', soil: 'heavy red clay piedmont, rock in older downtown corridors', note: 'Major financial district utility upgrades and suburban expansion driving demand' },
};

// ─── CLAUDE PROMPTS ───────────────────────────────────────────────────────────
async function generateCityContent(city, stateAbbr, stateName, meta) {
  const metaContext = meta
    ? `Population: ${meta.pop}. Key industries: ${meta.industries}. Soil/geology: ${meta.soil}. Local note: ${meta.note}.`
    : `This is a city in ${stateName}.`;

  const prompt = `You are writing content for a hydro excavation contractor directory page for ${city}, ${stateAbbr} (${stateName}).

City context: ${metaContext}

Write 5 paragraphs of UNIQUE, LOCAL, FACTUAL content about hydro excavation in ${city}.

Paragraph structure:
1. (2-3 sentences) Local demand: specific industries, infrastructure, or geography that drives need for hydro excavation in ${city}
2. (2-3 sentences) Soil/environment context: soil conditions, water table, or terrain that affects excavation in this area
3. (2-3 sentences) Common project types in ${city}: utility work, military, oil/gas, agriculture, construction — whatever is relevant
4. (2 sentences) Safety context: mention "Call 811 before any excavation in ${city}" and why utility locating matters here
5. (2-3 sentences) Wrap-up: mention that hydro excavation companies serving ${city} use vacuum excavation to protect underground utilities

Requirements:
- Mention "hydro excavation ${city}" or "vacuum excavation ${city}" at least once naturally
- Sound like it was written by someone who knows ${city} — not generic
- NO fluff, NO "great choice" generic statements
- DO NOT mention any specific company names
- Write in plain HTML paragraphs: <p>...</p>
- Total output: 5 <p> tags only, nothing else`;

  const response = await claude.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 700,
    messages: [{ role: 'user', content: prompt }]
  });

  return response.content[0].text.trim();
}

async function generateSeoMeta(city, stateAbbr, stateName, meta) {
  const metaContext = meta
    ? `Key industries: ${meta.industries}. Local note: ${meta.note}.`
    : `City in ${stateName}.`;

  const prompt = `Write an SEO meta title and meta description for a hydro excavation contractor directory page for ${city}, ${stateAbbr}.

City context: ${metaContext}

Rules:
- Meta title: max 60 characters, include city + state + "hydro excavation" or "hydrovac", end with "| HydroVac Pro"
- Meta description: 140-155 characters, mention a LOCAL angle (industry, geography, or project type specific to this city), include a call to action
- Output ONLY valid JSON in this exact format (no markdown):
{"title":"...","description":"..."} `;

  const response = await claude.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 200,
    messages: [{ role: 'user', content: prompt }]
  });

  try {
    const text = response.content[0].text.trim();
    const json = text.match(/\{[\s\S]*\}/)?.[0];
    return JSON.parse(json);
  } catch {
    // Fallback to generic if parse fails
    return {
      title: `Hydro Excavation ${city} ${stateAbbr} | Hydrovac Contractors | HydroVac Pro`,
      description: `Find trusted hydrovac and vacuum excavation contractors in ${city}, ${stateName}. Compare local service companies for potholing, utility locating, and slot trenching.`
    };
  }
}

// ─── YOAST META VIA XML-RPC (bypasses nonce requirement) ─────────────────────
const WP_USER = 'roweldencinares@gmail.com';
const WP_PASS = 'jqfA ESlL T5xL QsLo e0fI H4Pt';

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

// ─── WORDPRESS FUNCTIONS ──────────────────────────────────────────────────────
async function getPageBySlug(slug) {
  const res = await fetch(`${WP_URL}/wp-json/wp/v2/pages?slug=${slug}&context=edit&_fields=id,slug,content`, { headers: H });
  const pages = await res.json();
  return pages[0] || null;
}

function buildLinksBlock(city, stateAbbr, stateName) {
  const stateSlug = stateName.toLowerCase().replace(/\s+/g, '-');
  const stateUrl  = `${WP_URL}/${stateSlug}/`;
  return `
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.25rem","bottom":"1.25rem","left":"1.25rem","right":"1.25rem"},"margin":{"top":"2rem"}},"border":{"radius":"8px","color":"#e5e7eb","width":"1px"},"color":{"background":"#f9fafb"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-background" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:1.25rem;margin-top:2rem">
<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} --><h3 class="wp-block-heading" style="font-size:1rem;font-weight:700">Hydro Excavation Resources for ${city}, ${stateAbbr}</h3><!-- /wp:heading -->
<!-- wp:list -->
<ul class="wp-block-list">
<!-- wp:list-item --><li><a href="${stateUrl}">Hydro Excavation Companies in ${stateName}</a> — Browse all ${stateName} hydrovac contractors by city</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="${WP_URL}/locations/">HydroVac Pro — Find Contractors Nationwide</a> — Full directory of hydro excavation companies across the US</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="https://www.811.com/" target="_blank" rel="noopener noreferrer">Call 811 Before You Dig</a> — Free utility locating service required before any excavation in ${city}</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="https://www.vacuum-excavation.com/" target="_blank" rel="noopener noreferrer">Vacuum Excavation Industry Resources</a> — Standards and best practices for hydro excavation contractors</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:group -->`;
}

async function updatePageContent(pageId, newUniqueContent, city, stateAbbr, stateName) {
  const res = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${pageId}?context=edit`, { headers: H });
  const page = await res.json();
  let content = page.content?.raw || '';

  // Build unique content blocks
  const uniqueBlocks = newUniqueContent.split('\n').filter(l => l.trim()).map(p =>
    `<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.95rem"}}} -->\n${p}\n<!-- /wp:paragraph -->`
  ).join('\n');

  // Build links block (internal + outbound)
  const linksBlock = buildLinksBlock(city, stateAbbr, stateName);

  // Inject unique paragraphs after the first "Hydrovac contractors in..." paragraph
  const marker = '<p>Hydrovac contractors in';
  const insertAfter = '</p>\n<!-- /wp:paragraph -->';
  const insertIdx = content.indexOf(marker);

  if (insertIdx !== -1) {
    const endIdx = content.indexOf(insertAfter, insertIdx) + insertAfter.length;
    content = content.slice(0, endIdx) + '\n\n' + uniqueBlocks + content.slice(endIdx);
  } else {
    // Fallback: find the back-link paragraph and insert before it
    const backMarker = '<!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"1.5rem"}}}} -->';
    const backIdx = content.indexOf(backMarker);
    content = backIdx !== -1
      ? content.slice(0, backIdx) + uniqueBlocks + '\n\n' + content.slice(backIdx)
      : content + '\n\n' + uniqueBlocks;
  }

  // Append links block before the very end (before last closing group if present)
  const lastGroup = content.lastIndexOf('<!-- /wp:spectra/container -->');
  if (lastGroup !== -1) {
    content = content.slice(0, lastGroup) + linksBlock + '\n\n' + content.slice(lastGroup);
  } else {
    content += '\n\n' + linksBlock;
  }

  const update = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${pageId}`, {
    method: 'POST', headers: H,
    body: JSON.stringify({ content })
  });
  return update.json();
}

// ─── CITY LIST (slug, city, state) ───────────────────────────────────────────
const ALL_CITIES = [
  // Virginia first — Beach HydroVac client, highest priority
  ['norfolk-va','Norfolk','VA','Virginia'],
  ['virginia-beach-va','Virginia Beach','VA','Virginia'],
  ['chesapeake-va','Chesapeake','VA','Virginia'],
  ['hampton-va','Hampton','VA','Virginia'],
  ['newport-news-va','Newport News','VA','Virginia'],
  ['portsmouth-va','Portsmouth','VA','Virginia'],
  ['suffolk-va','Suffolk','VA','Virginia'],
  ['richmond-va','Richmond','VA','Virginia'],
  ['roanoke-va','Roanoke','VA','Virginia'],
  ['alexandria-va','Alexandria','VA','Virginia'],
  ['lynchburg-va','Lynchburg','VA','Virginia'],
  ['harrisonburg-va','Harrisonburg','VA','Virginia'],
  ['charlottesville-va','Charlottesville','VA','Virginia'],
  ['danville-va','Danville','VA','Virginia'],
  ['manassas-va','Manassas','VA','Virginia'],
  ['petersburg-va','Petersburg','VA','Virginia'],
  ['fredericksburg-va','Fredericksburg','VA','Virginia'],
  ['winchester-va','Winchester','VA','Virginia'],
  ['blacksburg-va','Blacksburg','VA','Virginia'],
  ['leesburg-va','Leesburg','VA','Virginia'],
  // NC — active city pages
  ['wilmington-nc','Wilmington','NC','North Carolina'],
  ['jacksonville-nc','Jacksonville','NC','North Carolina'],
  ['fayetteville-nc','Fayetteville','NC','North Carolina'],
  ['raleigh-nc','Raleigh','NC','North Carolina'],
  ['charlotte-nc','Charlotte','NC','North Carolina'],
  ['greensboro-nc','Greensboro','NC','North Carolina'],
  ['durham-nc','Durham','NC','North Carolina'],
  ['winston-salem-nc','Winston-Salem','NC','North Carolina'],
  // FL — high growth, competitive market
  ['jacksonville-fl','Jacksonville','FL','Florida'],
  ['miami-fl','Miami','FL','Florida'],
  ['tampa-fl','Tampa','FL','Florida'],
  ['orlando-fl','Orlando','FL','Florida'],
  // TX — massive market
  ['houston-tx','Houston','TX','Texas'],
  ['dallas-tx','Dallas','TX','Texas'],
  ['san-antonio-tx','San Antonio','TX','Texas'],
  ['austin-tx','Austin','TX','Texas'],
  ['fort-worth-tx','Fort Worth','TX','Texas'],
  // GA
  ['atlanta-ga','Atlanta','GA','Georgia'],
  ['savannah-ga','Savannah','GA','Georgia'],
  // SC
  ['charleston-sc','Charleston','SC','South Carolina'],
  ['columbia-sc','Columbia','SC','South Carolina'],
  // OH
  ['columbus-oh','Columbus','OH','Ohio'],
  ['cleveland-oh','Cleveland','OH','Ohio'],
  ['toledo-oh','Toledo','OH','Ohio'],
  // IL
  ['chicago-il','Chicago','IL','Illinois'],
  // PA
  ['philadelphia-pa','Philadelphia','PA','Pennsylvania'],
  ['pittsburgh-pa','Pittsburgh','PA','Pennsylvania'],
  // MI
  ['detroit-mi','Detroit','MI','Michigan'],
  // TN
  ['nashville-tn','Nashville','TN','Tennessee'],
  ['memphis-tn','Memphis','TN','Tennessee'],
  // AZ
  ['phoenix-az','Phoenix','AZ','Arizona'],
  // CO
  ['denver-co','Denver','CO','Colorado'],
  // WA
  ['seattle-wa','Seattle','WA','Washington'],
  // OR
  ['portland-or','Portland','OR','Oregon'],
  // CA — most competitive, do last
  ['los-angeles-ca','Los Angeles','CA','California'],
  ['san-diego-ca','San Diego','CA','California'],
  ['san-francisco-ca','San Francisco','CA','California'],
];

// ─── PROGRESS TRACKING ───────────────────────────────────────────────────────
const PROGRESS_FILE = 'enrich-progress.json';

function loadProgress() {
  try { return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8')); }
  catch { return { done: [] }; }
}

function saveProgress(done) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify({ done }, null, 2));
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function run() {
  const args = process.argv.slice(2);
  const stateFilter = args.includes('--state') ? args[args.indexOf('--state') + 1]?.toUpperCase() : null;
  const cityFilter  = args.includes('--city')  ? args[args.indexOf('--city') + 1] : null;
  const batchNum    = args.includes('--batch')  ? parseInt(args[args.indexOf('--batch') + 1]) : null;
  const batchSize   = args.includes('--size')   ? parseInt(args[args.indexOf('--size') + 1]) : 20;

  const progress = loadProgress();
  let cities = ALL_CITIES.filter(([slug]) => !progress.done.includes(slug));

  if (stateFilter) cities = cities.filter(([,, abbr]) => abbr === stateFilter);
  if (cityFilter)  cities = cities.filter(([slug]) => slug === cityFilter);
  if (batchNum !== null) {
    const start = (batchNum - 1) * batchSize;
    cities = cities.slice(start, start + batchSize);
  }

  console.log(`\nEnriching ${cities.length} city pages with unique content...\n`);
  console.log('Each page gets 3 unique local paragraphs via Claude Haiku.\n');

  let ok = 0, fail = 0;

  for (const [slug, city, abbr, stateName] of cities) {
    try {
      process.stdout.write(`  ${city}, ${abbr} ... `);

      // Get WP page
      const page = await getPageBySlug(slug);
      if (!page) { console.log('❌ page not found'); fail++; continue; }

      // Generate unique content + SEO meta with Claude (parallel)
      const meta = CITY_META[slug] || null;
      const [uniqueContent, seoMeta] = await Promise.all([
        generateCityContent(city, abbr, stateName, meta),
        generateSeoMeta(city, abbr, stateName, meta)
      ]);

      // Update page body (unique content + internal/outbound links) + Yoast via XML-RPC
      await updatePageContent(page.id, uniqueContent, city, abbr, stateName);
      const keyphrase = `hydro excavation ${city} ${abbr}`.toLowerCase();
      await setYoastMeta(page.id, seoMeta.title, seoMeta.description, keyphrase);

      console.log(`✅  [body + Yoast title + meta desc + keyphrase]`);
      progress.done.push(slug);
      saveProgress(progress.done);
      ok++;

      // Rate limit: Claude + WP API
      await new Promise(r => setTimeout(r, 1200));

    } catch (err) {
      console.log(`❌ ${err.message.substring(0, 80)}`);
      fail++;
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Enriched: ${ok}
❌ Failed:   ${fail}
📋 Total done (all time): ${progress.done.length}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Run again to continue remaining pages.
Priority commands:
  node enrich-city-pages.js --state VA    # All Virginia (Beach HydroVac)
  node enrich-city-pages.js --state NC    # All North Carolina
  node enrich-city-pages.js --batch 1     # First 20 priority cities
`);
}

run().catch(console.error);
