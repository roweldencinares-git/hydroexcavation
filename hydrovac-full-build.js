import fetch from 'node-fetch';

const WP_URL = 'https://springgreen-stinkbug-577322.hostingersite.com';
const AUTH = 'Basic ' + Buffer.from('roweldencinares@gmail.com:jqfA ESlL T5xL QsLo e0fI H4Pt').toString('base64');
const H = { 'Authorization': AUTH, 'Content-Type': 'application/json' };

// ─── KNOWN CLIENTS ───────────────────────────────────────────────────────────
// Beach HydroVac — all Virginia cities
const BHV = {
  name: 'Beach HydroVac',
  category: 'Hydro Excavation / Vacuum Excavation',
  phone: '757-510-5220',
  desc: 'Professional hydro excavation and vacuum excavation services serving Norfolk, Virginia Beach, Chesapeake, Hampton, Newport News, Portsmouth, Suffolk, and all of Hampton Roads. Veteran-owned and operated. Licensed, insured, EPA compliant.'
};

// Vac Truck Services — Wilmington NC (already has its own page, skip)
const SKIP_SLUGS = new Set(['wilmington-nc','jacksonville-nc','fayetteville-nc','raleigh-nc','charlotte-nc','greensboro-nc','north-carolina']);

// ─── STATE + CITY DATA ───────────────────────────────────────────────────────
const STATES = [
  { name:'Alabama',       abbr:'AL', slug:'alabama',        cities:['Birmingham','Huntsville','Montgomery','Tuscaloosa','Mobile','Dothan','Auburn','Decatur','Madison','Florence','Phenix City','Gadsden'] },
  { name:'Alaska',        abbr:'AK', slug:'alaska',         cities:['Anchorage','Fairbanks','Juneau','Sitka','Ketchikan','Kenai','Palmer','Wasilla','Kodiak','Bethel'] },
  { name:'Arizona',       abbr:'AZ', slug:'arizona',        cities:['Phoenix','Tucson','Mesa','Chandler','Scottsdale','Glendale','Gilbert','Tempe','Peoria','Surprise','Flagstaff','Yuma','Prescott'] },
  { name:'Arkansas',      abbr:'AR', slug:'arkansas',       cities:['Little Rock','Fort Smith','Fayetteville','Springdale','Jonesboro','Conway','Rogers','North Little Rock','Pine Bluff','Bentonville'] },
  { name:'California',    abbr:'CA', slug:'california',     cities:['Los Angeles','San Diego','San Jose','San Francisco','Fresno','Sacramento','Long Beach','Oakland','Bakersfield','Anaheim','Santa Ana','Riverside','Stockton','Irvine','Chula Vista','Modesto','San Bernardino','Oxnard','Fontana','Moreno Valley'] },
  { name:'Colorado',      abbr:'CO', slug:'colorado',       cities:['Denver','Colorado Springs','Aurora','Fort Collins','Lakewood','Thornton','Arvada','Westminster','Pueblo','Centennial','Boulder','Greeley','Highlands Ranch','Loveland'] },
  { name:'Connecticut',   abbr:'CT', slug:'connecticut',    cities:['Bridgeport','New Haven','Stamford','Hartford','Waterbury','Norwalk','Danbury','New Britain','Bristol','West Haven','Meriden','Middletown','Norwich','Shelton'] },
  { name:'Delaware',      abbr:'DE', slug:'delaware',       cities:['Wilmington','Dover','Newark','Middletown','Smyrna','Milford','Seaford','Georgetown','Elsmere','New Castle'] },
  { name:'Florida',       abbr:'FL', slug:'florida',        cities:['Jacksonville','Miami','Tampa','Orlando','St. Petersburg','Hialeah','Port St. Lucie','Cape Coral','Tallahassee','Fort Lauderdale','Pembroke Pines','Hollywood','Miramar','Gainesville','Coral Springs','Clearwater','Palm Bay','Pompano Beach','West Palm Beach','Lakeland','Daytona Beach','Sarasota','Naples','Pensacola'] },
  { name:'Georgia',       abbr:'GA', slug:'georgia',        cities:['Atlanta','Columbus','Savannah','Augusta','Athens','Macon','Roswell','Albany','Johns Creek','Warner Robins','Alpharetta','Marietta','Sandy Springs','Smyrna','Valdosta'] },
  { name:'Hawaii',        abbr:'HI', slug:'hawaii',         cities:['Honolulu','Pearl City','Hilo','Kailua','Waipahu','Kaneohe','Mililani','Kahului','Ewa Beach','Kihei'] },
  { name:'Idaho',         abbr:'ID', slug:'idaho',          cities:['Boise','Meridian','Nampa','Idaho Falls','Pocatello','Caldwell','Coeur d\'Alene','Twin Falls','Post Falls','Lewiston','Rexburg','Eagle'] },
  { name:'Illinois',      abbr:'IL', slug:'illinois',       cities:['Chicago','Aurora','Joliet','Rockford','Springfield','Elgin','Peoria','Champaign','Waukegan','Cicero','Naperville','Evanston','Decatur','Bloomington','Schaumburg'] },
  { name:'Indiana',       abbr:'IN', slug:'indiana',        cities:['Indianapolis','Fort Wayne','Evansville','South Bend','Carmel','Fishers','Hammond','Gary','Muncie','Bloomington','Lafayette','Terre Haute','Noblesville','Greenwood'] },
  { name:'Iowa',          abbr:'IA', slug:'iowa',           cities:['Des Moines','Cedar Rapids','Davenport','Sioux City','Iowa City','Waterloo','Council Bluffs','Ames','Dubuque','West Des Moines','Ankeny','Urbandale','Cedar Falls','Marion'] },
  { name:'Kansas',        abbr:'KS', slug:'kansas',         cities:['Wichita','Overland Park','Kansas City','Olathe','Topeka','Lawrence','Shawnee','Manhattan','Lenexa','Salina','Hutchinson','Leavenworth'] },
  { name:'Kentucky',      abbr:'KY', slug:'kentucky',       cities:['Louisville','Lexington','Bowling Green','Owensboro','Covington','Richmond','Georgetown','Florence','Hopkinsville','Nicholasville','Elizabethtown','Frankfort','Henderson'] },
  { name:'Louisiana',     abbr:'LA', slug:'louisiana',      cities:['New Orleans','Baton Rouge','Shreveport','Metairie','Lafayette','Lake Charles','Kenner','Bossier City','Monroe','Alexandria','Prairieville','Marrero','Hammond'] },
  { name:'Maine',         abbr:'ME', slug:'maine',          cities:['Portland','Lewiston','Bangor','South Portland','Auburn','Biddeford','Sanford','Augusta','Saco','Westbrook','Brewer','Waterville'] },
  { name:'Maryland',      abbr:'MD', slug:'maryland',       cities:['Baltimore','Frederick','Rockville','Gaithersburg','Bowie','Hagerstown','Annapolis','College Park','Salisbury','Laurel','Greenbelt','Cumberland','Waldorf','Columbia'] },
  { name:'Massachusetts', abbr:'MA', slug:'massachusetts',  cities:['Boston','Worcester','Springfield','Lowell','Cambridge','New Bedford','Brockton','Quincy','Lynn','Fall River','Newton','Somerville','Lawrence','Framingham','Haverhill'] },
  { name:'Michigan',      abbr:'MI', slug:'michigan',       cities:['Detroit','Grand Rapids','Warren','Sterling Heights','Ann Arbor','Lansing','Flint','Dearborn','Livonia','Westland','Kalamazoo','Southfield','Troy','Clinton Township','Canton','Pontiac','St. Clair Shores','Rochester Hills','Saginaw'] },
  { name:'Minnesota',     abbr:'MN', slug:'minnesota',      cities:['Minneapolis','St. Paul','Rochester','Duluth','Bloomington','Brooklyn Park','Plymouth','Maple Grove','Woodbury','St. Cloud','Eagan','Coon Rapids','Eden Prairie','Burnsville','Blaine'] },
  { name:'Mississippi',   abbr:'MS', slug:'mississippi',    cities:['Jackson','Gulfport','Southaven','Hattiesburg','Biloxi','Meridian','Tupelo','Olive Branch','Greenville','Horn Lake','Pearl','Madison','Ridgeland','Clinton'] },
  { name:'Missouri',      abbr:'MO', slug:'missouri',       cities:['Kansas City','St. Louis','Springfield','Columbia','Independence','Lee\'s Summit','O\'Fallon','St. Joseph','St. Charles','Blue Springs','Joplin','Chesterfield','Jefferson City','Cape Girardeau'] },
  { name:'Montana',       abbr:'MT', slug:'montana',        cities:['Billings','Missoula','Great Falls','Bozeman','Butte','Helena','Kalispell','Havre','Anaconda','Miles City','Belgrade','Livingston'] },
  { name:'Nebraska',      abbr:'NE', slug:'nebraska',       cities:['Omaha','Lincoln','Bellevue','Grand Island','Kearney','Fremont','Hastings','Norfolk','North Platte','Columbus','Papillion','La Vista','Scottsbluff'] },
  { name:'Nevada',        abbr:'NV', slug:'nevada',         cities:['Las Vegas','Henderson','Reno','North Las Vegas','Sparks','Carson City','Enterprise','Sunrise Manor','Paradise','Spring Valley','Fernley','Elko'] },
  { name:'New Hampshire', abbr:'NH', slug:'new-hampshire',  cities:['Manchester','Nashua','Concord','Derry','Rochester','Salem','Dover','Merrimack','Hudson','Londonderry','Keene','Portsmouth','Laconia'] },
  { name:'New Jersey',    abbr:'NJ', slug:'new-jersey',     cities:['Newark','Jersey City','Paterson','Elizabeth','Edison','Woodbridge','Lakewood','Toms River','Hamilton','Trenton','Clifton','Camden','Brick','Cherry Hill','Passaic'] },
  { name:'New Mexico',    abbr:'NM', slug:'new-mexico',     cities:['Albuquerque','Las Cruces','Rio Rancho','Santa Fe','Roswell','Farmington','Clovis','Hobbs','Alamogordo','Carlsbad','Gallup','Taos'] },
  { name:'New York',      abbr:'NY', slug:'new-york',       cities:['New York City','Buffalo','Rochester','Yonkers','Syracuse','Albany','New Rochelle','Mount Vernon','Schenectady','Utica','White Plains','Hempstead','Troy','Niagara Falls','Binghamton','Freeport','Long Beach','Rome','Spring Valley'] },
  { name:'North Carolina',abbr:'NC', slug:'north-carolina', cities:['Wilmington','Jacksonville','Fayetteville','Raleigh','Charlotte','Greensboro','Durham','Winston-Salem','Cary','High Point','Concord','Gastonia','Greenville','Asheville','New Bern','Rocky Mount','Kannapolis','Burlington','Wilson','Goldsboro'] },
  { name:'North Dakota',  abbr:'ND', slug:'north-dakota',   cities:['Fargo','Bismarck','Grand Forks','Minot','Williston','Dickinson','Mandan','West Fargo','Jamestown','Watford City'] },
  { name:'Ohio',          abbr:'OH', slug:'ohio',           cities:['Columbus','Cleveland','Cincinnati','Toledo','Akron','Dayton','Parma','Canton','Youngstown','Lorain','Hamilton','Springfield','Kettering','Elyria','Middletown','Newark','Mansfield','Mentor','Beavercreek','Cuyahoga Falls'] },
  { name:'Oklahoma',      abbr:'OK', slug:'oklahoma',       cities:['Oklahoma City','Tulsa','Norman','Broken Arrow','Lawton','Edmond','Moore','Midwest City','Stillwater','Enid','Muskogee','Bartlesville','Owasso','Shawnee'] },
  { name:'Oregon',        abbr:'OR', slug:'oregon',         cities:['Portland','Salem','Eugene','Gresham','Hillsboro','Beaverton','Bend','Medford','Springfield','Corvallis','Albany','Tigard','Lake Oswego','Keizer','Grants Pass','Oregon City'] },
  { name:'Pennsylvania',  abbr:'PA', slug:'pennsylvania',   cities:['Philadelphia','Pittsburgh','Allentown','Erie','Reading','Scranton','Bethlehem','Lancaster','Harrisburg','Altoona','York','Wilkes-Barre','Chester','Norristown','Easton','Hazleton'] },
  { name:'Rhode Island',  abbr:'RI', slug:'rhode-island',   cities:['Providence','Cranston','Warwick','Pawtucket','East Providence','Woonsocket','Coventry','Cumberland','North Providence','West Warwick','Johnston','North Kingstown'] },
  { name:'South Carolina',abbr:'SC', slug:'south-carolina', cities:['Columbia','Charleston','North Charleston','Mount Pleasant','Rock Hill','Greenville','Summerville','Goose Creek','Hilton Head Island','Sumter','Florence','Spartanburg','Myrtle Beach','Aiken','Anderson'] },
  { name:'South Dakota',  abbr:'SD', slug:'south-dakota',   cities:['Sioux Falls','Rapid City','Aberdeen','Brookings','Watertown','Mitchell','Yankton','Pierre','Huron','Spearfish','Brandon','Box Elder'] },
  { name:'Tennessee',     abbr:'TN', slug:'tennessee',      cities:['Memphis','Nashville','Knoxville','Chattanooga','Clarksville','Murfreesboro','Franklin','Jackson','Johnson City','Bartlett','Hendersonville','Kingsport','Collierville','Smyrna','Cleveland'] },
  { name:'Texas',         abbr:'TX', slug:'texas',          cities:['Houston','San Antonio','Dallas','Austin','Fort Worth','El Paso','Arlington','Corpus Christi','Plano','Laredo','Lubbock','Garland','Irving','Amarillo','Grand Prairie','McKinney','Frisco','Brownsville','Pasadena','Killeen','McAllen','Waco','Carrollton','Midland','Round Rock','Odessa','Beaumont','Abilene'] },
  { name:'Utah',          abbr:'UT', slug:'utah',           cities:['Salt Lake City','West Valley City','Provo','West Jordan','Orem','Sandy','Ogden','St. George','Layton','South Jordan','Lehi','Millcreek','Taylorsville','Logan','Murray'] },
  { name:'Vermont',       abbr:'VT', slug:'vermont',        cities:['Burlington','South Burlington','Rutland','Barre','Montpelier','Winooski','St. Albans','Newport','Vergennes','Brattleboro','Bennington','Middlebury'] },
  { name:'Virginia',      abbr:'VA', slug:'virginia',       cities:['Norfolk','Virginia Beach','Chesapeake','Richmond','Newport News','Alexandria','Hampton','Roanoke','Portsmouth','Suffolk','Lynchburg','Harrisonburg','Charlottesville','Danville','Manassas','Petersburg','Fredericksburg','Winchester','Blacksburg','Leesburg'] },
  { name:'Washington',    abbr:'WA', slug:'washington',     cities:['Seattle','Spokane','Tacoma','Vancouver','Bellevue','Kent','Everett','Renton','Spokane Valley','Kirkland','Bellingham','Kennewick','Federal Way','Yakima','Redmond','Marysville','South Hill','Richland','Shoreline','Pasco'] },
  { name:'West Virginia', abbr:'WV', slug:'west-virginia',  cities:['Charleston','Huntington','Parkersburg','Morgantown','Wheeling','Weirton','Fairmont','Beckley','Clarksburg','Martinsburg','South Charleston','Teays Valley'] },
  { name:'Wisconsin',     abbr:'WI', slug:'wisconsin',      cities:['Milwaukee','Madison','Green Bay','Kenosha','Racine','Appleton','Waukesha','Oshkosh','Eau Claire','Janesville','West Allis','La Crosse','Sheboygan','Wauwatosa','Fond du Lac','New Berlin','Wausau'] },
  { name:'Wyoming',       abbr:'WY', slug:'wyoming',        cities:['Cheyenne','Casper','Laramie','Gillette','Rock Springs','Sheridan','Green River','Evanston','Riverton','Jackson','Cody','Lander'] },
];

// VA cities that get Beach HydroVac listing
const VA_BHV_CITIES = new Set(['Norfolk','Virginia Beach','Chesapeake','Hampton','Newport News','Portsmouth','Suffolk','Richmond','Alexandria','Roanoke','Lynchburg','Harrisonburg','Charlottesville','Danville','Manassas','Petersburg','Fredericksburg','Winchester','Blacksburg','Leesburg']);

function citySlug(city, abbr) {
  return city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + abbr.toLowerCase();
}

function buildStatePage(s) {
  const cityLinks = s.cities.map(c =>
    `<!-- wp:list-item --><li><a href="/${citySlug(c, s.abbr)}/">${c}, ${s.abbr}</a></li><!-- /wp:list-item -->`
  ).join('');

  const half = Math.ceil(s.cities.length / 2);
  const col1 = s.cities.slice(0, half).map(c =>
    `<!-- wp:list-item --><li><a href="/${citySlug(c, s.abbr)}/">${c}</a></li><!-- /wp:list-item -->`
  ).join('');
  const col2 = s.cities.slice(half).map(c =>
    `<!-- wp:list-item --><li><a href="/${citySlug(c, s.abbr)}/">${c}</a></li><!-- /wp:list-item -->`
  ).join('');

  return `
<!-- wp:spectra/container {"align":"full","variationSelected":true,"height":"280px","background":{"type":"color","color":"#1a365d"},"isBlockRootParent":true,"style":{"spacing":{"padding":{"left":"2rem","right":"2rem"},"blockGap":"var:preset|spacing|20"}},"layout":{"type":"flex","orientation":"vertical","justifyContent":"center","verticalAlignment":"center"}} -->
<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"clamp(1.8rem,4vw,2.8rem)","fontWeight":"800"}},"textColor":"white"} --><h1 class="wp-block-heading has-text-align-center has-white-color has-text-color">Hydro Excavation Companies in ${s.name}</h1><!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","textColor":"ast-global-color-5"} --><p class="has-text-align-center has-ast-global-color-5-color has-text-color">Find verified hydrovac and vacuum excavation contractors across ${s.name}</p><!-- /wp:paragraph -->
<!-- /wp:spectra/container -->

<!-- wp:spectra/container {"align":"full","variationSelected":true,"isBlockRootParent":true,"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem","left":"2rem","right":"2rem"}}}} -->
<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"1.8rem","fontWeight":"700"}}} --><h2 class="wp-block-heading" style="font-size:1.8rem;font-weight:700">Browse by City</h2><!-- /wp:heading -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"3rem"},"margin":{"top":"1.5rem"}}}} --><div class="wp-block-columns" style="margin-top:1.5rem">
<!-- wp:column --><div class="wp-block-column"><!-- wp:list {"style":{"typography":{"fontSize":"0.95rem"}}} --><ul style="font-size:0.95rem">${col1}</ul><!-- /wp:list --></div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column"><!-- wp:list {"style":{"typography":{"fontSize":"0.95rem"}}} --><ul style="font-size:0.95rem">${col2}</ul><!-- /wp:list --></div><!-- /wp:column -->
</div><!-- /wp:columns -->
<!-- /wp:spectra/container -->

<!-- wp:spectra/container {"align":"full","variationSelected":true,"isBlockRootParent":true,"background":{"type":"color","color":"#f8f9fa"},"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem","left":"2rem","right":"2rem"}}}} -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"2rem"}}}} --><div class="wp-block-columns">
<!-- wp:column {"width":"60%"} --><div class="wp-block-column" style="flex-basis:60%">
<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"1.5rem","fontWeight":"700"}}} --><h2 class="wp-block-heading" style="font-size:1.5rem;font-weight:700">Hydro Excavation in ${s.name}</h2><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.95rem"}}} --><p style="font-size:0.95rem">Find verified hydrovac contractors across ${s.name} for potholing, daylighting, slot trenching, utility locating, debris removal, and vacuum excavation. Coverage includes ${s.cities.slice(0,5).join(', ')}, and more cities statewide.</p><!-- /wp:paragraph -->
</div><!-- /wp:column -->
<!-- wp:column {"width":"40%"} --><div class="wp-block-column" style="flex-basis:40%">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"10px","width":"1px","color":"var:preset|color|ast-global-color-8"}},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.5rem">
<!-- wp:heading {"level":4,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} --><h4 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1rem;font-weight:700">List Your Business</h4><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} --><p style="font-size:0.9rem">Get your hydrovac company listed in ${s.name}. Free basic listings. Exclusive city placement from $299/month.</p><!-- /wp:paragraph -->
<!-- wp:buttons --><div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"ast-global-color-2","style":{"border":{"radius":"9999px"},"typography":{"fontSize":"0.85rem"}}} --><div class="wp-block-button"><a class="wp-block-button__link has-ast-global-color-2-background-color has-background wp-element-button" href="/submit-listing/" style="border-radius:9999px;font-size:0.85rem">Get Listed →</a></div><!-- /wp:button --></div><!-- /wp:buttons -->
</div><!-- /wp:group -->
</div><!-- /wp:column -->
</div><!-- /wp:columns -->
<!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"1.5rem"}}}} --><p style="margin-top:1.5rem">← <a href="/locations/">View all states</a></p><!-- /wp:paragraph -->
<!-- /wp:spectra/container -->`;
}

function buildCityPage(city, state, client) {
  const hasClient = !!client;
  const listingBlock = hasClient ? `
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"},"margin":{"top":"2rem","bottom":"1rem"}},"border":{"radius":"12px","top":{"color":"var:preset|color|ast-global-color-5","width":"4px"},"right":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"bottom":{"width":"1px","color":"var:preset|color|ast-global-color-8"},"left":{"width":"1px","color":"var:preset|color|ast-global-color-8"}},"shadow":"var:preset|shadow|natural"},"backgroundColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-white-background-color has-background" style="border-radius:12px;border-top:4px solid var(--wp--preset--color--ast-global-color-5);border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.5rem;margin-top:2rem;margin-bottom:1rem;box-shadow:var(--wp--preset--shadow--natural)">
<!-- wp:columns --><div class="wp-block-columns">
<!-- wp:column {"width":"70%"} --><div class="wp-block-column" style="flex-basis:70%">
<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.1rem","fontWeight":"700"}},"textColor":"ast-global-color-2"} --><h3 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1.1rem;font-weight:700">⭐ Featured — ${client.name}</h3><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.88rem"}}} --><p style="font-size:0.88rem"><strong>Category:</strong> ${client.category} &nbsp;|&nbsp; <strong>Phone:</strong> <a href="tel:${client.phone.replace(/\D/g,'')}">${client.phone}</a></p><!-- /wp:paragraph -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.93rem"}}} --><p style="font-size:0.93rem">${client.desc}</p><!-- /wp:paragraph -->
</div><!-- /wp:column -->
<!-- wp:column {"width":"30%"} --><div class="wp-block-column" style="flex-basis:30%">
<!-- wp:buttons {"layout":{"type":"flex","orientation":"vertical","justifyContent":"center","verticalAlignment":"center"}} --><div class="wp-block-buttons">
<!-- wp:button {"backgroundColor":"ast-global-color-2","style":{"border":{"radius":"9999px"},"typography":{"fontSize":"0.85rem"}},"width":100} --><div class="wp-block-button has-custom-width wp-block-button__width-100"><a class="wp-block-button__link has-ast-global-color-2-background-color has-background wp-element-button" href="tel:${client.phone.replace(/\D/g,'')}" style="border-radius:9999px;font-size:0.85rem">📞 Call Now</a></div><!-- /wp:button -->
</div><!-- /wp:buttons -->
</div><!-- /wp:column -->
</div><!-- /wp:columns -->
</div><!-- /wp:group -->` : `
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"},"margin":{"top":"2rem","bottom":"1rem"}},"border":{"radius":"12px","width":"1px","color":"var:preset|color|ast-global-color-8"}},"backgroundColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-white-background-color has-background" style="border-radius:12px;border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.5rem;margin-top:2rem;margin-bottom:1rem">
<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.1rem","fontWeight":"600"}},"textColor":"ast-global-color-1"} --><h3 class="wp-block-heading has-ast-global-color-1-color has-text-color" style="font-size:1.1rem;font-weight:600">No listings yet for ${city}, ${state.abbr}</h3><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} --><p style="font-size:0.9rem">Be the first hydrovac company listed in ${city}. Get exclusive placement — all leads from this page go directly to you.</p><!-- /wp:paragraph -->
<!-- wp:buttons --><div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"ast-global-color-2","style":{"border":{"radius":"9999px"},"typography":{"fontSize":"0.85rem"}}} --><div class="wp-block-button"><a class="wp-block-button__link has-ast-global-color-2-background-color has-background wp-element-button" href="/submit-listing/" style="border-radius:9999px;font-size:0.85rem">Claim This City →</a></div><!-- /wp:button --></div><!-- /wp:buttons -->
</div><!-- /wp:group -->`;

  return `
<!-- wp:spectra/container {"align":"full","variationSelected":true,"height":"260px","background":{"type":"color","color":"#1a365d"},"isBlockRootParent":true,"style":{"spacing":{"padding":{"left":"2rem","right":"2rem"},"blockGap":"var:preset|spacing|20"}},"layout":{"type":"flex","orientation":"vertical","justifyContent":"center","verticalAlignment":"center"}} -->
<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"clamp(1.6rem,4vw,2.5rem)","fontWeight":"800"}},"textColor":"white"} --><h1 class="wp-block-heading has-text-align-center has-white-color has-text-color">Hydro Excavation Contractors in ${city}, ${state.abbr}</h1><!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","textColor":"ast-global-color-5"} --><p class="has-text-align-center has-ast-global-color-5-color has-text-color">Find verified hydrovac and vacuum excavation service companies in ${city}, ${state.name}</p><!-- /wp:paragraph -->
<!-- /wp:spectra/container -->

<!-- wp:spectra/container {"align":"full","variationSelected":true,"isBlockRootParent":true,"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem","left":"2rem","right":"2rem"}}}} -->
<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"1.7rem","fontWeight":"700"}}} --><h2 class="wp-block-heading" style="font-size:1.7rem;font-weight:700">Hydrovac Companies in ${city}, ${state.abbr}</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>Browse hydro excavation and vacuum excavation contractors serving ${city}, ${state.name} and the surrounding area.</p><!-- /wp:paragraph -->
${listingBlock}
<!-- wp:group {"style":{"spacing":{"padding":{"top":"0.8rem","right":"1.5rem","bottom":"0.8rem","left":"1.5rem"},"margin":{"top":"0.75rem"}},"border":{"radius":"8px","width":"1px","color":"var:preset|color|ast-global-color-8"}},"backgroundColor":"white","layout":{"type":"constrained"}} --><div class="wp-block-group has-white-background-color has-background" style="border-radius:8px;border:1px solid var(--wp--preset--color--ast-global-color-8);padding:0.8rem 1.5rem;margin-top:0.75rem">
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} --><p style="font-size:0.9rem"><strong>Is your business missing?</strong> <a href="/submit-listing/">Submit a free listing →</a></p><!-- /wp:paragraph -->
</div><!-- /wp:group -->
<!-- /wp:spectra/container -->

<!-- wp:spectra/container {"align":"full","variationSelected":true,"isBlockRootParent":true,"background":{"type":"color","color":"#f8f9fa"},"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem","left":"2rem","right":"2rem"}}}} -->
<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"1.5rem","fontWeight":"700"}}} --><h2 class="wp-block-heading" style="font-size:1.5rem;font-weight:700">Hydro Excavation Services in ${city}, ${state.name}</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>Hydrovac contractors in ${city} provide non-destructive excavation services for utility contractors, municipalities, civil engineers, and property owners throughout ${state.name}.</p><!-- /wp:paragraph -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"1.5rem"},"margin":{"top":"1.5rem"}}}} --><div class="wp-block-columns" style="margin-top:1.5rem">
<!-- wp:column --><div class="wp-block-column">
<!-- wp:heading {"level":4,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"0.95rem","fontWeight":"700"}}} --><h4 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:0.95rem;font-weight:700">Services Available</h4><!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.9rem"}}} --><ul style="font-size:0.9rem">
<!-- wp:list-item --><li>Potholing &amp; Daylighting</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Utility Locating</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Slot Trenching</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Debris Removal</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Pipeline Rehabilitation</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Cold Weather Digging</li><!-- /wp:list-item -->
</ul><!-- /wp:list -->
</div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column">
<!-- wp:heading {"level":4,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"0.95rem","fontWeight":"700"}}} --><h4 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:0.95rem;font-weight:700">Learn More</h4><!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.9rem"}}} --><ul style="font-size:0.9rem">
<!-- wp:list-item --><li><a href="/what-is-hydro-excavation/">What is Hydro Excavation?</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/potholing-daylighting/">Potholing &amp; Daylighting</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/slot-trenching/">Slot Trenching</a></li><!-- /wp:list-item -->
<!-- wp:list-item --><li><a href="/benefits-of-hydro-excavation/">Benefits of Hydrovac</a></li><!-- /wp:list-item -->
</ul><!-- /wp:list -->
</div><!-- /wp:column -->
</div><!-- /wp:columns -->
<!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"1.5rem"}}}} --><p style="margin-top:1.5rem">← <a href="/${state.slug}/">Back to ${state.name}</a> &nbsp;|&nbsp; <a href="/locations/">All States</a></p><!-- /wp:paragraph -->
<!-- /wp:spectra/container -->`;
}

async function post(slug, title, content, seo) {
  const res = await fetch(`${WP_URL}/wp-json/wp/v2/pages`, {
    method: 'POST', headers: H,
    body: JSON.stringify({ title, slug, status: 'publish', content })
  });
  const r = await res.json();
  if (!r.id) throw new Error(JSON.stringify(r).substring(0, 120));
  if (seo) {
    await fetch(`${WP_URL}/wp-json/surerank/v1/admin/editor`, {
      method: 'POST', headers: H,
      body: JSON.stringify({ post_id: r.id, data: seo })
    }).catch(() => {});
  }
  return r.id;
}

async function run() {
  let stateOk = 0, cityOk = 0, skipped = 0, fail = 0;
  const totalCities = STATES.reduce((a, s) => a + s.cities.length, 0);
  console.log(`Building ${STATES.length} state pages + ${totalCities} city pages...\n`);

  for (const s of STATES) {
    // ── State page ──────────────────────────────────────────────────
    if (!SKIP_SLUGS.has(s.slug)) {
      try {
        const id = await post(
          s.slug,
          `Hydro Excavation Companies in ${s.name} | Hydrovac Contractors ${s.abbr}`,
          buildStatePage(s),
          {
            title: `Hydro Excavation Companies in ${s.name} | HydroVac Pro`,
            description: `Find trusted hydrovac contractors across ${s.name}. Browse verified service companies in ${s.cities.slice(0,3).join(', ')}, and more cities statewide.`
          }
        );
        console.log(`🗺️  ${s.name} (ID:${id})`);
        stateOk++;
      } catch (e) {
        console.error(`❌ STATE ${s.name}: ${e.message.substring(0,80)}`);
        fail++;
      }
      await new Promise(r => setTimeout(r, 250));
    } else {
      console.log(`⏭️  ${s.name} state page (already exists)`);
      skipped++;
    }

    // ── City pages ───────────────────────────────────────────────────
    for (const city of s.cities) {
      const slug = citySlug(city, s.abbr);
      if (SKIP_SLUGS.has(slug)) {
        skipped++;
        continue;
      }
      const client = (s.abbr === 'VA' && VA_BHV_CITIES.has(city)) ? BHV : null;
      try {
        const id = await post(
          slug,
          `Hydro Excavation ${city} ${s.abbr} | Hydrovac Contractors`,
          buildCityPage(city, s, client),
          {
            title: `Hydro Excavation ${city} ${s.abbr} | Hydrovac Contractors Near You | HydroVac Pro`,
            description: `Find trusted hydrovac and vacuum excavation contractors in ${city}, ${s.name}. Compare local service companies for potholing, utility locating, slot trenching, and daylighting.`
          }
        );
        const tag = client ? '⭐' : '📍';
        console.log(`  ${tag} ${city}, ${s.abbr} (ID:${id})`);
        cityOk++;
      } catch (e) {
        console.error(`  ❌ ${city}, ${s.abbr}: ${e.message.substring(0,80)}`);
        fail++;
      }
      await new Promise(r => setTimeout(r, 200));
    }
  }

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ State pages:  ${stateOk}
✅ City pages:   ${cityOk}  (⭐ = Beach HydroVac client)
⏭️  Skipped:     ${skipped}
❌ Failed:       ${fail}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
}

run().catch(console.error);
