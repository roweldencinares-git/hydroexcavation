/**
 * State Page Content Enricher
 * Adds unique content + Yoast SEO meta to all 49 state pages.
 *
 * Run: node enrich-state-pages.js
 *      node enrich-state-pages.js --state texas   (single state)
 */

import fetch from 'node-fetch';
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';

const WP_URL = 'https://springgreen-stinkbug-577322.hostingersite.com';
const AUTH   = 'Basic ' + Buffer.from('roweldencinares@gmail.com:jqfA ESlL T5xL QsLo e0fI H4Pt').toString('base64');
const H      = { 'Authorization': AUTH, 'Content-Type': 'application/json' };
const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── STATE METADATA ───────────────────────────────────────────────────────────
const STATES = [
  { name: 'Alabama',        slug: 'alabama',        abbr: 'AL', cities: ['Birmingham','Montgomery','Huntsville','Mobile'], industries: 'automotive manufacturing, chemical plants, steel mills, agriculture, military (Redstone Arsenal, Fort Rucker)', soil: 'red clay in north, sandy coastal plain in south', note: 'Heavy industrial corridor along I-20/59 drives consistent utility excavation demand' },
  { name: 'Alaska',         slug: 'alaska',         abbr: 'AK', cities: ['Anchorage','Fairbanks','Juneau'], industries: 'oil & gas pipeline (Trans-Alaska Pipeline), mining, military (JBER, Eielson AFB), fishing industry infrastructure', soil: 'permafrost in interior, glacial till in south — mechanical excavation risks pipe damage', note: 'Permafrost makes hydrovac the only safe excavation method for most of the state' },
  { name: 'Arizona',        slug: 'arizona',        abbr: 'AZ', cities: ['Phoenix','Tucson','Mesa','Scottsdale','Chandler'], industries: 'semiconductor manufacturing (Intel, TSMC), data centers, copper mining, military (Luke AFB, Davis-Monthan), construction', soil: 'caliche hardpan and desert alluvium — rock-hard substrate requires high-pressure water', note: 'Caliche soil is notoriously difficult for mechanical excavation — hydrovac is preferred' },
  { name: 'Arkansas',       slug: 'arkansas',       abbr: 'AR', cities: ['Little Rock','Fort Smith','Fayetteville','Jonesboro'], industries: 'poultry processing, agriculture, Walmart supply chain logistics, natural gas, military (Little Rock AFB)', soil: 'silty clay in delta, rocky shale in Ozarks', note: 'Natural gas pipeline infrastructure across the state creates ongoing utility locating demand' },
  { name: 'California',     slug: 'california',     abbr: 'CA', cities: ['Los Angeles','San Diego','San Francisco','San Jose','Sacramento','Fresno'], industries: 'tech infrastructure, entertainment, agriculture (Central Valley irrigation), oil refining, military, ports (LA/Long Beach)', soil: 'expansive clay in valleys, rock in hills, sandy coastal areas', note: 'Strictest utility damage regulations in the US — hydrovac required near sensitive infrastructure' },
  { name: 'Colorado',       slug: 'colorado',       abbr: 'CO', cities: ['Denver','Colorado Springs','Aurora','Fort Collins','Boulder'], industries: 'oil & gas (DJ Basin, Piceance Basin), mining, military (NORAD, Fort Carson, Buckley), tech, aerospace', soil: 'expansive bentonite clay along Front Range — one of the most utility-damaging soils in the US', note: 'Bentonite clay shrinks/swells dramatically — hydrovac protects utilities in unpredictable ground' },
  { name: 'Connecticut',    slug: 'connecticut',    abbr: 'CT', cities: ['Bridgeport','New Haven','Hartford','Stamford'], industries: 'submarine manufacturing (Electric Boat), aerospace (Pratt & Whitney), finance, healthcare, defense', soil: 'rocky glacial till — dense cobbles make mechanical excavation dangerous near utilities', note: 'Dense glacial debris and aged utility infrastructure require non-destructive excavation' },
  { name: 'Delaware',       slug: 'delaware',       abbr: 'DE', cities: ['Wilmington','Dover','Newark'], industries: 'chemical manufacturing (DuPont legacy), financial services, port operations, pharmaceutical', soil: 'sandy coastal plain with clay pockets, high water table in coastal areas', note: 'Chemical plant utility corridors and coastal infrastructure demand careful excavation' },
  { name: 'Florida',        slug: 'florida',        abbr: 'FL', cities: ['Jacksonville','Miami','Tampa','Orlando','Fort Lauderdale','St. Petersburg'], industries: 'tourism, aerospace (Kennedy Space Center), military, port operations, real estate development, agriculture', soil: 'sandy substrate with high water table statewide — standing water in excavations is common', note: 'Statewide high water table makes hydrovac essential — dewatering and excavation in one operation' },
  { name: 'Georgia',        slug: 'georgia',        abbr: 'GA', cities: ['Atlanta','Savannah','Augusta','Columbus','Macon'], industries: 'logistics (Hartsfield-Jackson hub), port operations (Port of Savannah — largest US East Coast port), military (Fort Moore, Robins AFB), manufacturing', soil: 'red clay piedmont in north, sandy coastal plain in south', note: 'Savannah port expansion and Atlanta metro growth drive massive infrastructure excavation demand' },
  { name: 'Hawaii',         slug: 'hawaii',         abbr: 'HI', cities: ['Honolulu','Hilo','Kailua'], industries: 'military (Pearl Harbor, Schofield Barracks, JBPHH), tourism, federal government, agriculture', soil: 'volcanic basalt and coral substrate — rock-hard, requires high-pressure water excavation', note: 'Volcanic rock substrate makes hydrovac the primary excavation method for utility work' },
  { name: 'Idaho',          slug: 'idaho',          abbr: 'ID', cities: ['Boise','Nampa','Meridian','Twin Falls'], industries: 'agriculture (potato, dairy, hops), semiconductor (Micron Technology HQ), food processing, military (Mountain Home AFB)', soil: 'volcanic basalt over alluvial soil in Snake River Plain — hard rock with sandy overburden', note: 'Micron semiconductor campus and agricultural irrigation infrastructure drive utility locating demand' },
  { name: 'Illinois',       slug: 'illinois',       abbr: 'IL', cities: ['Chicago','Aurora','Rockford','Joliet','Naperville'], industries: 'finance, manufacturing, food processing, rail hub (largest in US), petrochemical, agriculture', soil: 'heavy glacial clay across most of state — dense utility corridors in Chicago metro', note: 'Chicago\'s century-old underground utility network is one of the densest in North America' },
  { name: 'Indiana',        slug: 'indiana',        abbr: 'IN', cities: ['Indianapolis','Fort Wayne','Evansville','South Bend'], industries: 'automotive manufacturing (largest US auto producer), pharmaceuticals (Eli Lilly HQ), steel, agriculture', soil: 'glacial till clay — dense and utility-rich in manufacturing corridors', note: 'Dense auto plant utility corridors require precise non-destructive excavation for maintenance' },
  { name: 'Iowa',           slug: 'iowa',           abbr: 'IA', cities: ['Des Moines','Cedar Rapids','Davenport','Sioux City'], industries: 'agriculture (corn, soy, pork — top US producer), food processing, wind energy, insurance', soil: 'deep loess and glacial till — excellent for farming but hides dense irrigation/drainage networks', note: 'Extensive underground drainage tile networks across farmland create unique utility locating challenges' },
  { name: 'Kansas',         slug: 'kansas',         abbr: 'KS', cities: ['Wichita','Overland Park','Kansas City','Topeka'], industries: 'aviation manufacturing (Cessna, Learjet, Spirit AeroSystems), agriculture, oil & gas, military (Fort Riley, McConnell AFB)', soil: 'clay-heavy prairie soil with caliche in western areas', note: 'Aviation manufacturing plants and dense agricultural pipeline networks drive hydrovac demand' },
  { name: 'Kentucky',       slug: 'kentucky',       abbr: 'KY', cities: ['Louisville','Lexington','Bowling Green','Covington'], industries: 'automotive manufacturing (Ford, Toyota), bourbon distilling, coal (declining), healthcare, UPS hub (Louisville)', soil: 'karst limestone in central/western regions — sinkholes and caves create underground hazards', note: 'Karst terrain creates unpredictable underground conditions — hydrovac prevents sinkhole triggers' },
  { name: 'Louisiana',      slug: 'louisiana',      abbr: 'LA', cities: ['New Orleans','Baton Rouge','Shreveport','Lafayette'], industries: 'oil & gas refining (largest US refining capacity), petrochemical, port operations, military', soil: 'soft deltaic clay and marsh — extremely high water table, unstable soil statewide', note: 'Highest concentration of petrochemical pipelines in the US — utility damage is catastrophic here' },
  { name: 'Maine',          slug: 'maine',          abbr: 'ME', cities: ['Portland','Lewiston','Bangor','South Portland'], industries: 'paper/timber, fishing, tourism, defense (Bath Iron Works — Navy shipbuilder)', soil: 'glacial till with significant rock outcrops — ledge rock close to surface in many areas', note: 'Shallow bedrock and aging coastal infrastructure require careful non-destructive excavation' },
  { name: 'Maryland',       slug: 'maryland',       abbr: 'MD', cities: ['Baltimore','Columbia','Germantown','Silver Spring'], industries: 'defense/cybersecurity (NSA, Fort Meade, Aberdeen Proving Ground), healthcare (Johns Hopkins), port operations, biotech', soil: 'heavy clay piedmont, sandy coastal plain, tidal areas near Chesapeake', note: 'Dense federal facility utility corridors and Chesapeake Bay watershed regulations drive hydrovac use' },
  { name: 'Massachusetts',  slug: 'massachusetts',  abbr: 'MA', cities: ['Boston','Worcester','Springfield','Cambridge','Lowell'], industries: 'biotech/pharma, education (Harvard, MIT), defense, finance, healthcare, fishing (commercial)', soil: 'glacial till with dense rock cobbles — some of oldest utility infrastructure in the US', note: 'Boston\'s 19th-century underground utility network requires extreme care during excavation' },
  { name: 'Michigan',       slug: 'michigan',       abbr: 'MI', cities: ['Detroit','Grand Rapids','Warren','Sterling Heights','Ann Arbor'], industries: 'automotive (GM, Ford, Stellantis HQs), manufacturing, aerospace, agriculture, Great Lakes shipping', soil: 'glacial clay and sandy glacial outwash — varied by region', note: 'Dense automotive plant utility infrastructure and Great Lakes pipeline routes drive consistent demand' },
  { name: 'Minnesota',      slug: 'minnesota',      abbr: 'MN', cities: ['Minneapolis','St. Paul','Rochester','Duluth','Bloomington'], industries: 'medical devices (Medtronic, St. Jude), food processing (General Mills, Cargill HQs), mining (Iron Range), agriculture', soil: 'glacial till clay, prairie soil, and rocky terrain in the Iron Range', note: 'Iron Range mining infrastructure and Twin Cities urban utility density drive hydrovac demand' },
  { name: 'Mississippi',    slug: 'mississippi',    abbr: 'MS', cities: ['Jackson','Gulfport','Southaven','Hattiesburg'], industries: 'shipbuilding (Ingalls Shipbuilding), agriculture, military (Keesler AFB, Columbus AFB), casinos', soil: 'loess bluffs along Mississippi River, coastal sandy soil in south', note: 'Ingalls Shipbuilding and Gulf Coast port infrastructure require regular utility excavation' },
  { name: 'Missouri',       slug: 'missouri',       abbr: 'MO', cities: ['Kansas City','St. Louis','Springfield','Columbia'], industries: 'agriculture, automotive (Ford, GM plants), defense, transportation hub, beer brewing (Anheuser-Busch)', soil: 'clay-heavy Ozark plateau in south, glacial till in north, karst in central areas', note: 'Major rail and highway corridor hub with dense pipeline crossings requiring utility locating' },
  { name: 'Montana',        slug: 'montana',        abbr: 'MT', cities: ['Billings','Missoula','Great Falls','Bozeman'], industries: 'oil & gas (Bakken formation access), coal, agriculture, mining (copper, silver), tourism', soil: 'varied — glacial till in north, rocky mountain soil, alluvial river valleys', note: 'Bakken formation oil pipeline infrastructure and mining sites require careful utility excavation' },
  { name: 'Nebraska',       slug: 'nebraska',       abbr: 'NE', cities: ['Omaha','Lincoln','Bellevue','Grand Island'], industries: 'agriculture (beef, corn, soy), food processing (Tyson, ConAgra HQ), insurance (Berkshire Hathaway), military (Offutt AFB — STRATCOM)', soil: 'deep loess prairie soil, sandy Sandhills in western areas', note: 'Strategic Command base and agricultural processing plants drive utility excavation demand' },
  { name: 'Nevada',         slug: 'nevada',         abbr: 'NV', cities: ['Las Vegas','Henderson','Reno','North Las Vegas'], industries: 'gaming/hospitality, data centers, lithium/gold mining, military (Nellis AFB, NAS Fallon), manufacturing (Tesla Gigafactory)', soil: 'caliche hardpan and desert alluvium — dense substrate requiring high-pressure water', note: 'Caliche desert soil makes hydrovac the preferred excavation method across Nevada' },
  { name: 'New Hampshire',  slug: 'new-hampshire',  abbr: 'NH', cities: ['Manchester','Nashua','Concord','Derry'], industries: 'defense electronics (BAE Systems), manufacturing, healthcare, tourism, tech (proximity to Boston)', soil: 'glacial till with frequent ledge rock — shallow bedrock creates utility exposure risk', note: 'Shallow granite bedrock and aging mill-town utility systems require precise excavation' },
  { name: 'New Jersey',     slug: 'new-jersey',     abbr: 'NJ', cities: ['Newark','Jersey City','Paterson','Elizabeth','Trenton'], industries: 'pharmaceutical (J&J, Merck, Bayer HQs), finance, port operations (Port Newark — 3rd largest US port), petrochemical', soil: 'glacial till and marine clay — one of densest utility networks in the US', note: 'Highest utility line density in the US per square mile — hydrovac is standard practice' },
  { name: 'New Mexico',     slug: 'new-mexico',     abbr: 'NM', cities: ['Albuquerque','Las Cruces','Rio Rancho','Santa Fe'], industries: 'oil & gas (Permian Basin), military (Kirtland AFB, White Sands, Holloman), national labs (Sandia, Los Alamos)', soil: 'caliche, desert alluvium, and adobe clay — hardpan that resists mechanical excavation', note: 'National laboratory and military base utility work demands precision non-destructive excavation' },
  { name: 'New York',       slug: 'new-york',       abbr: 'NY', cities: ['New York City','Buffalo','Rochester','Yonkers','Syracuse'], industries: 'finance, media, healthcare, manufacturing, port operations, defense, agriculture (upstate)', soil: 'glacial till and rock in upstate, dense urban fill and bedrock in NYC metro', note: 'NYC underground utility complexity is unmatched — steam pipes, subway lines, fiber, water, gas all interwoven' },
  { name: 'North Carolina', slug: 'north-carolina', abbr: 'NC', cities: ['Charlotte','Raleigh','Greensboro','Durham','Winston-Salem','Fayetteville','Wilmington','Jacksonville'], industries: 'banking (Bank of America, Wells Fargo), military (Fort Liberty, Camp Lejeune, Pope AAF), biotech (RTP), port operations, manufacturing', soil: 'red clay piedmont, sandy coastal plain, rocky mountain terrain in west', note: 'Research Triangle growth and military base infrastructure create high hydrovac demand' },
  { name: 'North Dakota',   slug: 'north-dakota',   abbr: 'ND', cities: ['Fargo','Bismarck','Grand Forks','Minot'], industries: 'oil & gas (Bakken shale — largest US oil field), agriculture, military (Minot AFB — nuclear bombers)', soil: 'glacial till clay — dense and permafrost-affected in northern areas', note: 'Bakken shale pipeline network is one of the most extensive in the US — hydrovac is essential' },
  { name: 'Ohio',           slug: 'ohio',           abbr: 'OH', cities: ['Columbus','Cleveland','Cincinnati','Toledo','Akron'], industries: 'automotive, steel, aerospace (Wright-Patterson AFB), chemical, agriculture, healthcare', soil: 'glacial clay and till — dense, heavy soil with complex utility networks in industrial corridors', note: 'Industrial heartland with aging utility infrastructure and active manufacturing facility maintenance' },
  { name: 'Oklahoma',       slug: 'oklahoma',       abbr: 'OK', cities: ['Oklahoma City','Tulsa','Norman','Broken Arrow'], industries: 'oil & gas (major pipeline hub), aviation (Tinker AFB — largest US Air Force base by acreage), agriculture', soil: 'red clay and shale — corrosive to metal pipes, high utility maintenance demand', note: 'Largest concentration of pipeline crossings per square mile outside of Louisiana' },
  { name: 'Oregon',         slug: 'oregon',         abbr: 'OR', cities: ['Portland','Salem','Eugene','Gresham','Hillsboro'], industries: 'tech (Intel Hillsboro campus), timber/paper, agriculture, port operations (Port of Portland), military', soil: 'volcanic rock in east, dense clay in Willamette Valley, sandy coastal areas', note: 'Intel semiconductor campus and Willamette Valley urban growth create sustained utility excavation demand' },
  { name: 'Pennsylvania',   slug: 'pennsylvania',   abbr: 'PA', cities: ['Philadelphia','Pittsburgh','Allentown','Erie','Reading'], industries: 'natural gas (Marcellus Shale — largest US gas field), steel/manufacturing, healthcare, defense, agriculture', soil: 'shale rock, glacial till in north, clay in river valleys — complex geological variation', note: 'Marcellus Shale pipeline network expansion is the largest ongoing utility infrastructure project in the Northeast' },
  { name: 'Rhode Island',   slug: 'rhode-island',   abbr: 'RI', cities: ['Providence','Cranston','Warwick','Pawtucket'], industries: 'defense (Naval Station Newport), jewelry manufacturing, healthcare, education, marine industries', soil: 'glacial till with rock outcrops — 19th-century mill infrastructure underneath modern streets', note: 'Oldest utility infrastructure in the US mixed with modern systems requires careful excavation' },
  { name: 'South Carolina', slug: 'south-carolina', abbr: 'SC', cities: ['Columbia','Charleston','North Charleston','Mount Pleasant'], industries: 'military (Joint Base Charleston, Fort Jackson — largest US Army training base), port operations (Port of Charleston), automotive (BMW, Volvo, Boeing), manufacturing', soil: 'sandy coastal plain with clay, piedmont red clay in upstate', note: 'Port of Charleston expansion and Fort Jackson military infrastructure drive consistent hydrovac demand' },
  { name: 'South Dakota',   slug: 'south-dakota',   abbr: 'SD', cities: ['Sioux Falls','Rapid City','Aberdeen'], industries: 'agriculture, military (Ellsworth AFB — B-1 bombers), Mount Rushmore tourism, financial services', soil: 'glacial till clay, Prairie Missouri Coteau deposits, Black Hills rock', note: 'Ellsworth AFB infrastructure and agricultural pipeline networks drive utility excavation demand' },
  { name: 'Tennessee',      slug: 'tennessee',      abbr: 'TN', cities: ['Nashville','Memphis','Knoxville','Chattanooga'], industries: 'automotive (Nissan, Volkswagen, GM), healthcare (HCA HQ), music/entertainment, military (Arnold AFB), logistics (FedEx HQ)', soil: 'karst limestone in central/western Tennessee — sinkholes common, utilities at risk', note: 'Nashville\'s explosive growth and karst terrain create perfect conditions for hydrovac demand' },
  { name: 'Texas',          slug: 'texas',          abbr: 'TX', cities: ['Houston','Dallas','San Antonio','Austin','Fort Worth','El Paso'], industries: 'oil & gas (largest US producer), petrochemical refining, military (Fort Hood, Fort Sam Houston, numerous AFBs), tech, agriculture', soil: 'expansive black clay (Houston), caliche (West Texas), sandy loam (East Texas) — massive variation', note: 'Texas has more pipeline miles than any other state — hydrovac is the dominant excavation method' },
  { name: 'Utah',           slug: 'utah',           abbr: 'UT', cities: ['Salt Lake City','West Valley City','Provo','West Jordan','Ogden'], industries: 'tech (Silicon Slopes), mining (copper, gold), military (Hill AFB — largest US Air Force base by employment), tourism', soil: 'caliche, rocky desert soil, alluvial fan deposits — hard substrate with seasonal freeze-thaw', note: 'Silicon Slopes tech campus growth and Hill AFB utility work create consistent excavation demand' },
  { name: 'Vermont',        slug: 'vermont',        abbr: 'VT', cities: ['Burlington','South Burlington','Rutland','Barre'], industries: 'dairy farming, granite quarrying, maple syrup, tourism (skiing), defense (F-35 base in Burlington)', soil: 'glacial till with significant rock — shallow bedrock and cobble-heavy soil', note: 'Shallow granite ledge and aging infrastructure in historic towns require careful non-destructive excavation' },
  { name: 'Virginia',       slug: 'virginia',       abbr: 'VA', cities: ['Norfolk','Virginia Beach','Chesapeake','Richmond','Alexandria','Hampton','Newport News'], industries: 'military (largest US Navy concentration — Naval Station Norfolk, Pentagon adjacent, Langley AFB, Fort Belvoir), defense contracting, port operations, government', soil: 'tidal clay and sandy coastal fill (Hampton Roads), red clay piedmont (central VA)', note: 'Hampton Roads has the highest concentration of military utility corridors in the US' },
  { name: 'Washington',     slug: 'washington',     abbr: 'WA', cities: ['Seattle','Spokane','Tacoma','Vancouver','Bellevue'], industries: 'tech (Amazon, Microsoft HQs), aerospace (Boeing), military (Joint Base Lewis-McChord, Naval Base Kitsap — largest US submarine base), agriculture', soil: 'glacial till, volcanic ash deposits in east, rocky terrain — varied by region', note: 'Submarine base utility security requirements and tech campus expansion drive hydrovac demand' },
  { name: 'West Virginia',  slug: 'west-virginia',  abbr: 'WV', cities: ['Charleston','Huntington','Morgantown','Parkersburg'], industries: 'natural gas (Marcellus/Utica shale), chemical manufacturing (Institute — "Chemical Valley"), coal (declining), military (Buckley Mountain — NOAA)', soil: 'shale and sandstone bedrock, steep terrain — utilities often buried in rocky mountain soil', note: 'Chemical Valley pipeline density and shale gas infrastructure require constant utility excavation' },
  { name: 'Wisconsin',      slug: 'wisconsin',      abbr: 'WI', cities: ['Milwaukee','Madison','Green Bay','Kenosha','Racine'], industries: 'manufacturing (Harley-Davidson, Johnson Controls, Kimberly-Clark), dairy/agriculture, healthcare, paper mills', soil: 'glacial clay and till — dense utility networks in industrial corridor along Lake Michigan', note: 'Dense industrial corridor from Milwaukee to Racine has aging utility infrastructure requiring regular maintenance' },
  { name: 'Wyoming',        slug: 'wyoming',        abbr: 'WY', cities: ['Cheyenne','Casper','Laramie','Gillette'], industries: 'coal mining (Powder River Basin — largest US coal reserve), oil & gas, military (F.E. Warren AFB — nuclear missiles), tourism', soil: 'caliche, shale, rocky high desert — hard substrate with extreme temperature swings', note: 'Powder River Basin energy infrastructure and missile silo utility corridors create specialized excavation demand' },
];

// ─── CLAUDE CONTENT GENERATOR ─────────────────────────────────────────────────
async function generateStateContent(state) {
  const { name, abbr, cities, industries, soil, note } = state;
  const prompt = `Write content for a hydro excavation contractor directory page for the state of ${name} (${abbr}).

State context:
- Key industries: ${industries}
- Soil/geology: ${soil}
- Local note: ${note}
- Major cities covered: ${cities.join(', ')}

Write 5 paragraphs of UNIQUE, FACTUAL content about hydro excavation in ${name}:

1. (2-3 sentences) Why hydro excavation demand is high in ${name} — tie to specific industries, projects, or infrastructure
2. (2-3 sentences) Soil and geological conditions in ${name} and how they affect underground utility work
3. (2-3 sentences) The types of projects that most commonly require hydrovac in ${name} — specific to the state's economy
4. (2 sentences) ${name} utility damage prevention: mention "Call 811 before any excavation in ${name}" and state-specific considerations
5. (2-3 sentences) Overview of the hydrovac contractor market in ${name} and what to look for when hiring — mention "hydro excavation ${name}" naturally

Requirements:
- Reference specific cities, industries, or landmarks in ${name} where relevant
- Sound knowledgeable about ${name} specifically — not generic
- NO company name mentions, no fluff, no generic statements
- Output 5 HTML <p> tags only, nothing else`;

  const response = await claude.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 700,
    messages: [{ role: 'user', content: prompt }]
  });
  return response.content[0].text.trim();
}

async function generateStateSeoMeta(state) {
  const { name, abbr, cities } = state;
  return {
    title:       `Hydro Excavation Companies in ${name} | Hydrovac Contractors ${abbr} | HydroVac Pro`,
    description: `Find verified hydro excavation contractors across ${name}. Browse hydrovac companies in ${cities.slice(0,3).join(', ')} and more ${name} cities. Get quotes from local vacuum excavation specialists.`,
    keyphrase:   `hydro excavation companies ${name}`
  };
}

// ─── CONTENT INJECTION ────────────────────────────────────────────────────────
function buildStateLinksBlock(state) {
  return `
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.25rem","bottom":"1.25rem","left":"1.25rem","right":"1.25rem"},"margin":{"top":"2rem","bottom":"2rem"}},"border":{"radius":"8px","color":"#e5e7eb","width":"1px"},"color":{"background":"#f9fafb"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group has-background" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:1.25rem;margin:2rem 0">
<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} --><h3 class="wp-block-heading" style="font-size:1rem;font-weight:700">Hydro Excavation Resources — ${state.name}</h3><!-- /wp:heading -->
<!-- wp:list -->
<ul class="wp-block-list">
<!-- wp:list-item --><li><a href="${WP_URL}/locations/">Browse All States — HydroVac Pro Directory</a> — Find hydrovac contractors in every US state</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="${WP_URL}/submit-listing/">List Your Hydro Excavation Company in ${state.name}</a> — Add your business to our ${state.name} directory</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="https://www.811.com/" target="_blank" rel="noopener noreferrer">Call 811 Before You Dig in ${state.name}</a> — Free utility locating required by law before any excavation</li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="https://www.vacuum-excavation.com/" target="_blank" rel="noopener noreferrer">Vacuum Excavation Industry Standards</a> — Best practices for hydro excavation contractors</li><!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
</div>
<!-- /wp:group -->`;
}

async function updateStatePage(pageId, content, state) {
  const res  = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${pageId}?context=edit`, { headers: H });
  const page = await res.json();
  let raw = page.content?.raw || '';

  // Build unique content blocks + links
  const uniqueBlocks = content.split('\n').filter(l => l.trim()).map(p =>
    `<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.95rem"}}} -->\n${p}\n<!-- /wp:paragraph -->`
  ).join('\n');

  const linksBlock = buildStateLinksBlock(state);

  // Inject after the hero (first /wp:spectra/container) and before Browse by City
  const heroEnd = raw.indexOf('<!-- /wp:spectra/container -->');
  if (heroEnd !== -1) {
    const insertAt = heroEnd + '<!-- /wp:spectra/container -->'.length;
    const contentSection = `

<!-- wp:spectra/container {"align":"full","variationSelected":true,"isBlockRootParent":true,"style":{"spacing":{"padding":{"top":"2.5rem","bottom":"1rem","left":"2rem","right":"2rem"}}}} -->
<div class="wp-block-group alignfull" style="padding:2.5rem 2rem 1rem">
<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"1.6rem","fontWeight":"700"}}} --><h2 class="wp-block-heading" style="font-size:1.6rem;font-weight:700">Hydro Excavation in ${state.name}</h2><!-- /wp:heading -->

${uniqueBlocks}

${linksBlock}
</div>
<!-- /wp:spectra/container -->
`;
    raw = raw.slice(0, insertAt) + contentSection + raw.slice(insertAt);
  } else {
    raw = raw + '\n\n' + uniqueBlocks + '\n\n' + linksBlock;
  }

  await fetch(`${WP_URL}/wp-json/wp/v2/pages/${pageId}`, {
    method: 'POST', headers: H,
    body: JSON.stringify({ content: raw })
  });
}

async function setYoastMeta(pageId, title, description, keyphrase) {
  const res = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${pageId}`, {
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
  if (d.code && d.code !== 'rest_post_invalid_id') {
    const msg = d.message || '';
    if (!msg.includes('Could not update')) throw new Error(msg);
  }
}

// ─── PROGRESS ─────────────────────────────────────────────────────────────────
const PROGRESS_FILE = 'enrich-state-progress.json';
function loadProgress() {
  try { return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8')).done; }
  catch { return []; }
}
function saveProgress(done) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify({ done }, null, 2));
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function run() {
  const args       = process.argv.slice(2);
  const stateFilter = args.includes('--state') ? args[args.indexOf('--state') + 1]?.toLowerCase() : null;

  const done = loadProgress();
  let states = STATES.filter(s => !done.includes(s.slug));
  if (stateFilter) states = states.filter(s => s.slug === stateFilter || s.name.toLowerCase() === stateFilter);

  console.log(`\nEnriching ${states.length} state pages...\n`);
  let ok = 0, fail = 0;

  for (const state of states) {
    try {
      process.stdout.write(`  ${state.name} ... `);

      // Find the page
      const res   = await fetch(`${WP_URL}/wp-json/wp/v2/pages?slug=${state.slug}&context=edit&_fields=id,slug`, { headers: H });
      const pages = await res.json();
      if (!pages[0]?.id) { console.log('❌ page not found'); fail++; continue; }
      const pageId = pages[0].id;

      // Generate content + SEO meta in parallel
      const [content, seo] = await Promise.all([
        generateStateContent(state),
        generateStateSeoMeta(state)
      ]);

      // Update page body
      await updateStatePage(pageId, content, state);

      // Set Yoast meta
      await setYoastMeta(pageId, seo.title, seo.description, seo.keyphrase);

      console.log('✅');
      done.push(state.slug);
      saveProgress(done);
      ok++;

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
📋 Done (all time): ${done.length} / ${STATES.length}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
}

run().catch(console.error);
