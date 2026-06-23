import fetch from 'node-fetch';

const WP_URL = 'https://springgreen-stinkbug-577322.hostingersite.com';
const AUTH = 'Basic ' + Buffer.from('roweldencinares@gmail.com:jqfA ESlL T5xL QsLo e0fI H4Pt').toString('base64');
const H = { 'Authorization': AUTH, 'Content-Type': 'application/json' };

// Already built: north-carolina, virginia, south-carolina
// Build all remaining 47 states

const STATES = [
  {
    name: 'Alabama', abbr: 'AL', slug: 'alabama',
    regions: [
      { name: '🏙️ Metro Alabama', cities: ['Birmingham','Huntsville','Montgomery','Tuscaloosa'] },
      { name: '🌊 Gulf Coast', cities: ['Mobile','Daphne','Foley','Gulf Shores'] },
      { name: '🏭 Industrial Corridor', cities: ['Decatur','Anniston','Gadsden','Talladega'] },
    ]
  },
  {
    name: 'Alaska', abbr: 'AK', slug: 'alaska',
    regions: [
      { name: '🏔️ Southcentral', cities: ['Anchorage','Palmer','Wasilla','Kenai'] },
      { name: '🌲 Interior', cities: ['Fairbanks','North Pole','Delta Junction','Tok'] },
      { name: '🌊 Southeast', cities: ['Juneau','Ketchikan','Sitka','Kodiak'] },
    ]
  },
  {
    name: 'Arizona', abbr: 'AZ', slug: 'arizona',
    regions: [
      { name: '🏙️ Greater Phoenix', cities: ['Phoenix','Scottsdale','Tempe','Mesa','Chandler'] },
      { name: '🌵 Southern Arizona', cities: ['Tucson','Sierra Vista','Yuma','Douglas'] },
      { name: '🏔️ Northern Arizona', cities: ['Flagstaff','Prescott','Sedona','Kingman'] },
    ]
  },
  {
    name: 'Arkansas', abbr: 'AR', slug: 'arkansas',
    regions: [
      { name: '🏙️ Central Arkansas', cities: ['Little Rock','North Little Rock','Conway','Benton'] },
      { name: '🏭 Northwest', cities: ['Fayetteville','Fort Smith','Springdale','Rogers'] },
      { name: '🌾 Delta & South', cities: ['Jonesboro','Pine Bluff','Texarkana','El Dorado'] },
    ]
  },
  {
    name: 'California', abbr: 'CA', slug: 'california',
    regions: [
      { name: '🌉 Northern California', cities: ['San Francisco','Sacramento','Oakland','San Jose','Fresno'] },
      { name: '🌴 Southern California', cities: ['Los Angeles','San Diego','Long Beach','Riverside','Anaheim'] },
      { name: '🏔️ Central Valley', cities: ['Bakersfield','Stockton','Modesto','Visalia','Chico'] },
    ]
  },
  {
    name: 'Colorado', abbr: 'CO', slug: 'colorado',
    regions: [
      { name: '🏙️ Front Range', cities: ['Denver','Colorado Springs','Aurora','Fort Collins','Pueblo'] },
      { name: '🏔️ Mountain Corridor', cities: ['Boulder','Grand Junction','Loveland','Greeley'] },
      { name: '🌄 Western Slope', cities: ['Durango','Steamboat Springs','Glenwood Springs','Montrose'] },
    ]
  },
  {
    name: 'Connecticut', abbr: 'CT', slug: 'connecticut',
    regions: [
      { name: '🏙️ Greater Hartford', cities: ['Hartford','New Britain','Bristol','Meriden'] },
      { name: '🌊 Shoreline', cities: ['New Haven','Bridgeport','Stamford','Norwalk','Waterbury'] },
      { name: '🌲 Eastern CT', cities: ['New London','Norwich','Groton','Middletown'] },
    ]
  },
  {
    name: 'Delaware', abbr: 'DE', slug: 'delaware',
    regions: [
      { name: '🏙️ Northern Delaware', cities: ['Wilmington','Newark','Middletown','Bear'] },
      { name: '🌊 Coastal Delaware', cities: ['Dover','Rehoboth Beach','Milford','Seaford'] },
    ]
  },
  {
    name: 'Florida', abbr: 'FL', slug: 'florida',
    regions: [
      { name: '🌴 South Florida', cities: ['Miami','Fort Lauderdale','West Palm Beach','Boca Raton','Naples'] },
      { name: '🌞 Central Florida', cities: ['Orlando','Tampa','St. Petersburg','Clearwater','Sarasota'] },
      { name: '🌊 North Florida', cities: ['Jacksonville','Tallahassee','Pensacola','Gainesville','Daytona Beach'] },
    ]
  },
  {
    name: 'Georgia', abbr: 'GA', slug: 'georgia',
    regions: [
      { name: '🏙️ Metro Atlanta', cities: ['Atlanta','Marietta','Smyrna','Alpharetta','Roswell'] },
      { name: '🌊 Coastal Georgia', cities: ['Savannah','Brunswick','Valdosta','Statesboro'] },
      { name: '🏭 Central & North', cities: ['Augusta','Macon','Columbus','Rome','Athens'] },
    ]
  },
  {
    name: 'Hawaii', abbr: 'HI', slug: 'hawaii',
    regions: [
      { name: '🌺 Oahu', cities: ['Honolulu','Pearl City','Kailua','Kaneohe'] },
      { name: '🏝️ Maui County', cities: ['Kahului','Wailuku','Lahaina','Kihei'] },
      { name: '🌋 Big Island', cities: ['Hilo','Kailua-Kona','Waimea','Pahoa'] },
    ]
  },
  {
    name: 'Idaho', abbr: 'ID', slug: 'idaho',
    regions: [
      { name: '🏙️ Treasure Valley', cities: ['Boise','Nampa','Meridian','Caldwell','Twin Falls'] },
      { name: '🏔️ North Idaho', cities: ['Coeur d\'Alene','Spokane Valley','Post Falls','Moscow'] },
      { name: '🌾 Eastern Idaho', cities: ['Idaho Falls','Pocatello','Blackfoot','Rexburg'] },
    ]
  },
  {
    name: 'Illinois', abbr: 'IL', slug: 'illinois',
    regions: [
      { name: '🏙️ Chicagoland', cities: ['Chicago','Aurora','Rockford','Joliet','Naperville'] },
      { name: '🏭 Central Illinois', cities: ['Springfield','Peoria','Champaign','Decatur','Bloomington'] },
      { name: '🌾 Southern Illinois', cities: ['East St. Louis','Carbondale','Belleville','Collinsville'] },
    ]
  },
  {
    name: 'Indiana', abbr: 'IN', slug: 'indiana',
    regions: [
      { name: '🏙️ Central Indiana', cities: ['Indianapolis','Carmel','Fishers','Noblesville','Anderson'] },
      { name: '🏭 Northern Indiana', cities: ['Fort Wayne','South Bend','Elkhart','Mishawaka','Gary'] },
      { name: '🌾 Southern Indiana', cities: ['Evansville','Terre Haute','Bloomington','Columbus'] },
    ]
  },
  {
    name: 'Iowa', abbr: 'IA', slug: 'iowa',
    regions: [
      { name: '🏙️ Central Iowa', cities: ['Des Moines','Ames','Ankeny','Urbandale','West Des Moines'] },
      { name: '🌾 Eastern Iowa', cities: ['Cedar Rapids','Davenport','Iowa City','Dubuque','Waterloo'] },
      { name: '🌾 Western Iowa', cities: ['Sioux City','Council Bluffs','Mason City','Fort Dodge'] },
    ]
  },
  {
    name: 'Kansas', abbr: 'KS', slug: 'kansas',
    regions: [
      { name: '🏙️ Northeast Kansas', cities: ['Wichita','Overland Park','Olathe','Kansas City','Topeka'] },
      { name: '🌾 Central Kansas', cities: ['Salina','Hutchinson','Manhattan','Emporia'] },
      { name: '🌾 Western Kansas', cities: ['Dodge City','Garden City','Liberal','Hays'] },
    ]
  },
  {
    name: 'Kentucky', abbr: 'KY', slug: 'kentucky',
    regions: [
      { name: '🏙️ Central Kentucky', cities: ['Lexington','Frankfort','Richmond','Georgetown','Nicholasville'] },
      { name: '🏙️ Metro Louisville', cities: ['Louisville','Elizabethtown','Bardstown','Jeffersontown'] },
      { name: '⛰️ Eastern & Western KY', cities: ['Bowling Green','Owensboro','Covington','Paducah'] },
    ]
  },
  {
    name: 'Louisiana', abbr: 'LA', slug: 'louisiana',
    regions: [
      { name: '🌊 Greater New Orleans', cities: ['New Orleans','Metairie','Kenner','Chalmette','Gretna'] },
      { name: '🏙️ Baton Rouge Corridor', cities: ['Baton Rouge','Prairieville','Denham Springs','Gonzales'] },
      { name: '🏭 North & Central LA', cities: ['Shreveport','Lafayette','Lake Charles','Monroe'] },
    ]
  },
  {
    name: 'Maine', abbr: 'ME', slug: 'maine',
    regions: [
      { name: '🌊 Southern Maine', cities: ['Portland','Biddeford','Saco','South Portland','Westbrook'] },
      { name: '🌲 Central Maine', cities: ['Augusta','Waterville','Lewiston','Auburn'] },
      { name: '🏔️ Northern Maine', cities: ['Bangor','Brewer','Orono','Presque Isle'] },
    ]
  },
  {
    name: 'Maryland', abbr: 'MD', slug: 'maryland',
    regions: [
      { name: '🏙️ Baltimore Metro', cities: ['Baltimore','Towson','Columbia','Ellicott City','Glen Burnie'] },
      { name: '🌊 Southern MD & Eastern Shore', cities: ['Annapolis','Waldorf','Salisbury','Ocean City'] },
      { name: '🏔️ Western Maryland', cities: ['Frederick','Hagerstown','Rockville','Germantown'] },
    ]
  },
  {
    name: 'Massachusetts', abbr: 'MA', slug: 'massachusetts',
    regions: [
      { name: '🏙️ Greater Boston', cities: ['Boston','Worcester','Cambridge','Lowell','Springfield'] },
      { name: '🌊 South Shore & Cape', cities: ['Brockton','New Bedford','Quincy','Plymouth','Fall River'] },
      { name: '🏔️ Western Massachusetts', cities: ['Northampton','Chicopee','Pittsfield','Holyoke'] },
    ]
  },
  {
    name: 'Michigan', abbr: 'MI', slug: 'michigan',
    regions: [
      { name: '🏙️ Southeast Michigan', cities: ['Detroit','Grand Rapids','Warren','Ann Arbor','Sterling Heights'] },
      { name: '🏭 West Michigan', cities: ['Kalamazoo','Muskegon','Holland','Lansing','Flint'] },
      { name: '🌲 Northern Michigan', cities: ['Traverse City','Saginaw','Bay City','Midland','Marquette'] },
    ]
  },
  {
    name: 'Minnesota', abbr: 'MN', slug: 'minnesota',
    regions: [
      { name: '🏙️ Twin Cities Metro', cities: ['Minneapolis','St. Paul','Rochester','Bloomington','Plymouth'] },
      { name: '🌲 Greater Minnesota', cities: ['Duluth','St. Cloud','Mankato','Moorhead','Brainerd'] },
      { name: '🌾 Southern Minnesota', cities: ['Winona','Owatonna','Faribault','Austin','Albert Lea'] },
    ]
  },
  {
    name: 'Mississippi', abbr: 'MS', slug: 'mississippi',
    regions: [
      { name: '🏙️ Central Mississippi', cities: ['Jackson','Ridgeland','Brandon','Pearl','Flowood'] },
      { name: '🌊 Gulf Coast', cities: ['Gulfport','Biloxi','Pascagoula','Ocean Springs','Bay St. Louis'] },
      { name: '🌾 North Mississippi', cities: ['Tupelo','Southaven','Hattiesburg','Columbus','Meridian'] },
    ]
  },
  {
    name: 'Missouri', abbr: 'MO', slug: 'missouri',
    regions: [
      { name: '🏙️ Kansas City Metro', cities: ['Kansas City','Independence','Lee\'s Summit','Blue Springs','St. Joseph'] },
      { name: '🏙️ St. Louis Metro', cities: ['St. Louis','St. Charles','Florissant','O\'Fallon','Chesterfield'] },
      { name: '🌾 Mid & South Missouri', cities: ['Springfield','Joplin','Columbia','Jefferson City'] },
    ]
  },
  {
    name: 'Montana', abbr: 'MT', slug: 'montana',
    regions: [
      { name: '🏔️ Western Montana', cities: ['Missoula','Kalispell','Helena','Butte','Whitefish'] },
      { name: '🌾 Eastern Montana', cities: ['Billings','Great Falls','Bozeman','Havre','Miles City'] },
    ]
  },
  {
    name: 'Nebraska', abbr: 'NE', slug: 'nebraska',
    regions: [
      { name: '🏙️ Eastern Nebraska', cities: ['Omaha','Lincoln','Bellevue','Fremont','Grand Island'] },
      { name: '🌾 Central & Western Nebraska', cities: ['Kearney','Norfolk','North Platte','Scottsbluff'] },
    ]
  },
  {
    name: 'Nevada', abbr: 'NV', slug: 'nevada',
    regions: [
      { name: '🎰 Southern Nevada', cities: ['Las Vegas','Henderson','North Las Vegas','Boulder City','Laughlin'] },
      { name: '🏔️ Northern Nevada', cities: ['Reno','Sparks','Carson City','Elko','Fernley'] },
    ]
  },
  {
    name: 'New Hampshire', abbr: 'NH', slug: 'new-hampshire',
    regions: [
      { name: '🏙️ Southern NH', cities: ['Manchester','Nashua','Concord','Derry','Rochester'] },
      { name: '🏔️ Lakes & North', cities: ['Laconia','Keene','Portsmouth','Dover','Lebanon'] },
    ]
  },
  {
    name: 'New Jersey', abbr: 'NJ', slug: 'new-jersey',
    regions: [
      { name: '🏙️ North Jersey', cities: ['Newark','Jersey City','Paterson','Elizabeth','Edison'] },
      { name: '🌊 Shore & Central NJ', cities: ['Trenton','Camden','Atlantic City','Toms River','Brick'] },
      { name: '🏘️ South Jersey', cities: ['Vineland','Cherry Hill','Gloucester','Millville','Bridgeton'] },
    ]
  },
  {
    name: 'New Mexico', abbr: 'NM', slug: 'new-mexico',
    regions: [
      { name: '🏙️ Central New Mexico', cities: ['Albuquerque','Rio Rancho','Santa Fe','Los Lunas','Belen'] },
      { name: '🌵 South & East New Mexico', cities: ['Las Cruces','Roswell','Carlsbad','Hobbs','Alamogordo'] },
    ]
  },
  {
    name: 'New York', abbr: 'NY', slug: 'new-york',
    regions: [
      { name: '🏙️ New York City Metro', cities: ['New York City','Yonkers','New Rochelle','Mount Vernon','White Plains'] },
      { name: '🏙️ Upstate New York', cities: ['Buffalo','Rochester','Albany','Syracuse','Utica'] },
      { name: '🌲 Hudson Valley & LI', cities: ['Poughkeepsie','Newburgh','Binghamton','Hempstead','Islip'] },
    ]
  },
  {
    name: 'North Dakota', abbr: 'ND', slug: 'north-dakota',
    regions: [
      { name: '🏙️ Eastern North Dakota', cities: ['Fargo','Grand Forks','Valley City','Jamestown'] },
      { name: '🛢️ Western North Dakota', cities: ['Bismarck','Minot','Williston','Dickinson','Mandan'] },
    ]
  },
  {
    name: 'Ohio', abbr: 'OH', slug: 'ohio',
    regions: [
      { name: '🏙️ Northeast Ohio', cities: ['Cleveland','Akron','Canton','Youngstown','Lorain'] },
      { name: '🏙️ Central Ohio', cities: ['Columbus','Dayton','Springfield','Newark','Lancaster'] },
      { name: '🏭 Northwest & Southwest', cities: ['Toledo','Cincinnati','Hamilton','Kettering','Findlay'] },
    ]
  },
  {
    name: 'Oklahoma', abbr: 'OK', slug: 'oklahoma',
    regions: [
      { name: '🏙️ Central Oklahoma', cities: ['Oklahoma City','Edmond','Norman','Midwest City','Moore'] },
      { name: '🏙️ Tulsa Metro', cities: ['Tulsa','Broken Arrow','Owasso','Bixby','Jenks'] },
      { name: '🛢️ North & South OK', cities: ['Lawton','Enid','Stillwater','Muskogee','Ardmore'] },
    ]
  },
  {
    name: 'Oregon', abbr: 'OR', slug: 'oregon',
    regions: [
      { name: '🌲 Willamette Valley', cities: ['Portland','Salem','Eugene','Beaverton','Hillsboro'] },
      { name: '🏔️ Central & Southern Oregon', cities: ['Bend','Medford','Ashland','Klamath Falls','Redmond'] },
      { name: '🌊 Oregon Coast', cities: ['Newport','Lincoln City','Coos Bay','Astoria','Tillamook'] },
    ]
  },
  {
    name: 'Pennsylvania', abbr: 'PA', slug: 'pennsylvania',
    regions: [
      { name: '🏙️ Southeast PA', cities: ['Philadelphia','Allentown','Reading','Chester','Lancaster'] },
      { name: '🏙️ Pittsburgh Metro', cities: ['Pittsburgh','Bethel Park','Mount Lebanon','Monroeville','Cranberry Township'] },
      { name: '🏔️ Central & North PA', cities: ['Harrisburg','Scranton','Erie','York','Wilkes-Barre'] },
    ]
  },
  {
    name: 'Rhode Island', abbr: 'RI', slug: 'rhode-island',
    regions: [
      { name: '🏙️ Greater Providence', cities: ['Providence','Cranston','Warwick','Pawtucket','North Providence'] },
      { name: '🌊 Bay & South County', cities: ['Woonsocket','Newport','East Providence','Westerly','Coventry'] },
    ]
  },
  {
    name: 'South Dakota', abbr: 'SD', slug: 'south-dakota',
    regions: [
      { name: '🏙️ Eastern South Dakota', cities: ['Sioux Falls','Aberdeen','Watertown','Brookings','Mitchell'] },
      { name: '🏔️ Western South Dakota', cities: ['Rapid City','Spearfish','Sturgis','Yankton','Huron'] },
    ]
  },
  {
    name: 'Tennessee', abbr: 'TN', slug: 'tennessee',
    regions: [
      { name: '🏙️ Middle Tennessee', cities: ['Nashville','Murfreesboro','Franklin','Clarksville','Smyrna'] },
      { name: '🏙️ West Tennessee', cities: ['Memphis','Jackson','Bartlett','Germantown','Collierville'] },
      { name: '🏔️ East Tennessee', cities: ['Knoxville','Chattanooga','Johnson City','Kingsport','Bristol'] },
    ]
  },
  {
    name: 'Texas', abbr: 'TX', slug: 'texas',
    regions: [
      { name: '🏙️ DFW Metroplex', cities: ['Dallas','Fort Worth','Arlington','Plano','Garland','Irving'] },
      { name: '🏙️ Greater Houston', cities: ['Houston','San Antonio','Austin','Corpus Christi','Beaumont'] },
      { name: '🌵 West & South Texas', cities: ['El Paso','Lubbock','Amarillo','Laredo','McAllen','Waco'] },
    ]
  },
  {
    name: 'Utah', abbr: 'UT', slug: 'utah',
    regions: [
      { name: '🏙️ Wasatch Front', cities: ['Salt Lake City','West Valley City','Provo','West Jordan','Orem'] },
      { name: '🏔️ Northern & Southern Utah', cities: ['Ogden','St. George','Layton','Murray','Taylorsville'] },
    ]
  },
  {
    name: 'Vermont', abbr: 'VT', slug: 'vermont',
    regions: [
      { name: '🏔️ Greater Vermont', cities: ['Burlington','South Burlington','Rutland','Barre','Montpelier'] },
      { name: '🌲 Southern Vermont', cities: ['Brattleboro','Bennington','Springfield','Windsor','St. Johnsbury'] },
    ]
  },
  {
    name: 'Washington', abbr: 'WA', slug: 'washington',
    regions: [
      { name: '🌲 Puget Sound', cities: ['Seattle','Spokane','Tacoma','Vancouver','Bellevue','Kent'] },
      { name: '🌾 Eastern Washington', cities: ['Spokane Valley','Kennewick','Richland','Pasco','Yakima'] },
      { name: '🌊 Olympic Peninsula', cities: ['Olympia','Bellingham','Everett','Renton','Kirkland'] },
    ]
  },
  {
    name: 'West Virginia', abbr: 'WV', slug: 'west-virginia',
    regions: [
      { name: '⛰️ Northern West Virginia', cities: ['Morgantown','Clarksburg','Fairmont','Weirton','Wheeling'] },
      { name: '⛰️ Southern West Virginia', cities: ['Charleston','Huntington','Parkersburg','Martinsburg','Beckley'] },
    ]
  },
  {
    name: 'Wisconsin', abbr: 'WI', slug: 'wisconsin',
    regions: [
      { name: '🏙️ Southeast Wisconsin', cities: ['Milwaukee','Racine','Kenosha','Waukesha','Oshkosh'] },
      { name: '🏙️ Central Wisconsin', cities: ['Madison','Green Bay','Appleton','Fond du Lac','Sheboygan'] },
      { name: '🌲 Northern Wisconsin', cities: ['Wausau','Eau Claire','La Crosse','Superior','Stevens Point'] },
    ]
  },
  {
    name: 'Wyoming', abbr: 'WY', slug: 'wyoming',
    regions: [
      { name: '🏔️ Southeast Wyoming', cities: ['Cheyenne','Laramie','Rock Springs','Casper','Gillette'] },
      { name: '🌄 Western Wyoming', cities: ['Jackson','Sheridan','Cody','Riverton','Lander'] },
    ]
  },
];

function buildStatePage(s) {
  const regionCols = s.regions.map(r => `
<!-- wp:column --><div class="wp-block-column">
<!-- wp:group {"style":{"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}},"border":{"radius":"10px","width":"1px","color":"var:preset|color|ast-global-color-8"},"shadow":"var:preset|shadow|natural"},"backgroundColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-white-background-color has-background" style="border-radius:10px;border:1px solid var(--wp--preset--color--ast-global-color-8);padding:1.5rem;box-shadow:var(--wp--preset--shadow--natural)">
<!-- wp:heading {"level":3,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1.05rem","fontWeight":"700"}}} --><h3 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1.05rem;font-weight:700">${r.name}</h3><!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.93rem"}}} --><ul style="font-size:0.93rem">
${r.cities.map(c => `<!-- wp:list-item --><li><a href="/${c.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}-${s.abbr.toLowerCase()}/">${c}, ${s.abbr}</a></li><!-- /wp:list-item -->`).join('')}
</ul><!-- /wp:list -->
</div><!-- /wp:group -->
</div><!-- /wp:column -->`).join('');

  const allCities = s.regions.flatMap(r => r.cities);

  return `
<!-- wp:spectra/container {"align":"full","variationSelected":true,"height":"280px","background":{"type":"color","color":"#1a365d"},"isBlockRootParent":true,"style":{"spacing":{"padding":{"left":"2rem","right":"2rem"},"blockGap":"var:preset|spacing|20"}},"layout":{"type":"flex","orientation":"vertical","justifyContent":"center","verticalAlignment":"center"}} -->
<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"clamp(1.8rem,4vw,2.8rem)","fontWeight":"800"}},"textColor":"white"} -->
<h1 class="wp-block-heading has-text-align-center has-white-color has-text-color">Hydro Excavation Companies in ${s.name}</h1>
<!-- /wp:heading -->
<!-- wp:paragraph {"align":"center","textColor":"ast-global-color-5"} -->
<p class="has-text-align-center has-ast-global-color-5-color has-text-color">Verified hydrovac and vacuum excavation contractors across ${s.name}</p>
<!-- /wp:paragraph -->
<!-- /wp:spectra/container -->

<!-- wp:spectra/container {"align":"full","variationSelected":true,"isBlockRootParent":true,"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem","left":"2rem","right":"2rem"}}}} -->
<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"1.8rem","fontWeight":"700"}}} --><h2 class="wp-block-heading" style="font-size:1.8rem;font-weight:700">Browse by City</h2><!-- /wp:heading -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"1.5rem","top":"1.5rem"},"margin":{"top":"1.5rem"}}}} --><div class="wp-block-columns" style="margin-top:1.5rem">
${regionCols}
</div><!-- /wp:columns -->
<!-- /wp:spectra/container -->

<!-- wp:spectra/container {"align":"full","variationSelected":true,"isBlockRootParent":true,"background":{"type":"color","color":"#f8f9fa"},"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem","left":"2rem","right":"2rem"}}}} -->
<!-- wp:heading {"level":2,"style":{"typography":{"fontSize":"1.8rem","fontWeight":"700"}}} --><h2 class="wp-block-heading" style="font-size:1.8rem;font-weight:700">Hydro Excavation Services in ${s.name}</h2><!-- /wp:heading -->
<!-- wp:paragraph --><p>Find verified hydrovac contractors across ${s.name} for potholing, daylighting, slot trenching, utility locating, debris removal, and vacuum excavation. Cities served include ${allCities.slice(0,6).join(', ')}, and more.</p><!-- /wp:paragraph -->
<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"1.5rem"},"margin":{"top":"1.5rem"}}}} --><div class="wp-block-columns" style="margin-top:1.5rem">
<!-- wp:column --><div class="wp-block-column">
<!-- wp:heading {"level":4,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} --><h4 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1rem;font-weight:700">Services Available</h4><!-- /wp:heading -->
<!-- wp:list {"style":{"typography":{"fontSize":"0.9rem"}}} --><ul style="font-size:0.9rem">
<!-- wp:list-item --><li>Potholing &amp; Daylighting</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Utility Locating (SUE Level A)</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Slot Trenching</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Debris Removal</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Pipeline Rehabilitation</li><!-- /wp:list-item -->
<!-- wp:list-item --><li>Cold Weather Excavation</li><!-- /wp:list-item -->
</ul><!-- /wp:list -->
</div><!-- /wp:column -->
<!-- wp:column --><div class="wp-block-column">
<!-- wp:heading {"level":4,"textColor":"ast-global-color-2","style":{"typography":{"fontSize":"1rem","fontWeight":"700"}}} --><h4 class="wp-block-heading has-ast-global-color-2-color has-text-color" style="font-size:1rem;font-weight:700">Is Your Company Listed?</h4><!-- /wp:heading -->
<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9rem"}}} --><p style="font-size:0.9rem">Add your hydrovac business to the HydroVac Pro directory. Free basic listings available. Get exclusive placement for your city from $299/month.</p><!-- /wp:paragraph -->
<!-- wp:buttons --><div class="wp-block-buttons"><!-- wp:button {"backgroundColor":"ast-global-color-2","style":{"border":{"radius":"9999px"},"typography":{"fontSize":"0.85rem"}}} --><div class="wp-block-button"><a class="wp-block-button__link has-ast-global-color-2-background-color has-background wp-element-button" href="/submit-listing/" style="border-radius:9999px;font-size:0.85rem">Get Listed →</a></div><!-- /wp:button --></div><!-- /wp:buttons -->
</div><!-- /wp:column -->
</div><!-- /wp:columns -->
<!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"1.5rem"}}}} --><p style="margin-top:1.5rem">← <a href="/locations/">View all states</a></p><!-- /wp:paragraph -->
<!-- /wp:spectra/container -->`;
}

async function deployPage(title, slug, content, seo) {
  const res = await fetch(`${WP_URL}/wp-json/wp/v2/pages`, {
    method: 'POST', headers: H,
    body: JSON.stringify({ title, slug, status: 'publish', content })
  });
  const r = await res.json();
  if (!r.id) throw new Error(JSON.stringify(r).substring(0, 150));
  if (seo) {
    await fetch(`${WP_URL}/wp-json/surerank/v1/admin/editor`, {
      method: 'POST', headers: H,
      body: JSON.stringify({ post_id: r.id, data: seo })
    }).catch(() => {});
  }
  return r.id;
}

async function run() {
  console.log(`Deploying ${STATES.length} state pages...\n`);
  let ok = 0, fail = 0;

  for (const s of STATES) {
    try {
      const content = buildStatePage(s);
      const id = await deployPage(
        `Hydro Excavation Companies in ${s.name} | Hydrovac Contractors ${s.abbr}`,
        s.slug,
        content,
        {
          title: `Hydro Excavation Companies in ${s.name} | HydroVac Pro`,
          description: `Find trusted hydrovac and vacuum excavation contractors across ${s.name}. Browse verified service companies by city for potholing, utility locating, slot trenching, and daylighting.`
        }
      );
      console.log(`✅ ${s.name} (ID: ${id}) → /${s.slug}/`);
      ok++;
    } catch (err) {
      console.error(`❌ ${s.name}: ${err.message.substring(0, 100)}`);
      fail++;
    }
    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 300));
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ ${ok} states deployed  |  ❌ ${fail} failed`);
  console.log(`Total state pages: ${ok + 3} (includes NC, VA, SC built earlier)`);
}

run().catch(console.error);
