import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(
  process.env.BEACH_HYDROVAC_WP_USER + ':' + process.env.BEACH_HYDROVAC_WP_PASSWORD
).toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

// Each location has fully unique content
const locations = {
  'virginia-beach': {
    id: 3462,
    h1: 'Hydro Excavation Services in Virginia Beach, VA',
    subtitle: 'Veteran-owned vacuum excavation serving Virginia Beach&#8217;s military installations, oceanfront developments, and residential communities',
    introH2: 'Virginia Beach&#8217;s Local Hydro Excavation Team',
    introParagraph: 'Beach HydroVac is headquartered right here in Virginia Beach at 2216 Mansion Cross Ln. As your neighbor, we understand the unique challenges of excavating in VB &#8211; from the sandy, high-water-table soil along the oceanfront to the clay-heavy ground inland near Stumpy Lake. Our trucks are on-site faster than any competitor because we&#8217;re already here.',
    whyChooseH3: 'Why Virginia Beach Contractors Call Us First',
    whyChooseItems: [
      '<strong>Based in VB</strong> &#8211; Our yard is on Mansion Cross Ln. No travel charges within Virginia Beach city limits',
      '<strong>Sandy Soil Specialists</strong> &#8211; VB&#8217;s sandy, waterlogged soil is ideal for hydro excavation and we&#8217;ve mastered it',
      '<strong>Military Base Cleared</strong> &#8211; Experienced working near NAS Oceana, JEB Little Creek-Fort Story, and Dam Neck',
      '<strong>VDOT &amp; City of VB Compliant</strong> &#8211; We know Virginia Beach&#8217;s dig permit process inside and out',
      '<strong>Emergency Response</strong> &#8211; On-site within 45 minutes anywhere in Virginia Beach'
    ],
    industriesH2: 'Virginia Beach Projects We Handle',
    industries: [
      { emoji: '🏖️', title: 'Resort &amp; Oceanfront', desc: 'Boardwalk area utility work with minimal disruption to businesses' },
      { emoji: '🎖️', title: 'Military Installations', desc: 'Cleared for projects near NAS Oceana &amp; JEB Little Creek' },
      { emoji: '🏘️', title: 'Residential Development', desc: 'New construction in Red Mill, Sandbridge &amp; Princess Anne' },
      { emoji: '📡', title: 'Fiber &amp; Telecom', desc: 'Cox &amp; Verizon fiber installations across VB neighborhoods' }
    ],
    areaH2: 'Virginia Beach Neighborhoods We Serve',
    areaParagraph: 'From the Oceanfront to Pungo, we cover every corner of Virginia Beach. Our hydrovac trucks work in Kempsville, Great Neck, Lynnhaven, Red Mill Farm, Sandbridge, Princess Anne, Thalia, Town Center, Hilltop, and Shore Drive. We also handle projects at Joint Expeditionary Base Little Creek, NAS Oceana, and Dam Neck Annex.',
    areaExtra: '<strong>Recent VB projects:</strong> Fiber optic trenching in Town Center district, potholing for waterline relocation on Shore Drive, SUE Level A verification for the Nimmo Parkway extension.',
    nearbyLinks: '<a href="/locations/norfolk/">Norfolk</a> | <a href="/locations/chesapeake/">Chesapeake</a> | <a href="/locations/portsmouth/">Portsmouth</a>',
    footerH2: 'Your Virginia Beach Hydro Excavation Partner',
    footerText: 'As the only hydro excavation company headquartered in Virginia Beach, we offer the fastest response times and deepest local knowledge in the 757. Call for a same-day quote.',
    yoastTitle: 'Hydro Excavation Virginia Beach VA | Local Veteran-Owned | Beach HydroVac',
    yoastDesc: 'Virginia Beach\u2019s only local hydro excavation company. Based on Mansion Cross Ln. Potholing, daylighting, SUE Level A near NAS Oceana & the oceanfront. Call 757-510-5220.',
    yoastKw: 'hydro excavation virginia beach'
  },
  'norfolk': {
    id: 3463,
    h1: 'Hydro Excavation Services in Norfolk, VA',
    subtitle: 'Safe, non-destructive excavation for Norfolk&#8217;s naval facilities, port operations, and historic Ghent neighborhood',
    introH2: 'Norfolk&#8217;s Go-To Hydro Excavation Contractor',
    introParagraph: 'Norfolk is home to the world&#8217;s largest naval base and one of the busiest ports on the East Coast. That means underground infrastructure everywhere &#8211; fuel lines, fiber optics, high-voltage cables, and century-old water mains. Beach HydroVac specializes in safely exposing these utilities without damage. We&#8217;re just 15 minutes across the Bay Bridge-Tunnel from our Virginia Beach headquarters.',
    whyChooseH3: 'What Makes Us Different in Norfolk',
    whyChooseItems: [
      '<strong>Port &amp; Naval Experience</strong> &#8211; We&#8217;ve worked alongside Naval Station Norfolk, Norfolk Naval Shipyard, and the Virginia Port Authority',
      '<strong>Historic District Care</strong> &#8211; Ghent, Freemason, and Downtown Norfolk have aging utilities that require non-destructive methods',
      '<strong>Flood Zone Expertise</strong> &#8211; Norfolk&#8217;s high water table and flood-prone areas demand precision hydro excavation',
      '<strong>15-Minute Response</strong> &#8211; From our VB headquarters, we reach any Norfolk job site in minutes',
      '<strong>City of Norfolk Dig Permits</strong> &#8211; Familiar with Norfolk&#8217;s utility coordination and permitting requirements'
    ],
    industriesH2: 'Norfolk Industries We Support',
    industries: [
      { emoji: '⚓', title: 'Naval &amp; Maritime', desc: 'Utility work near Naval Station Norfolk &amp; port terminals' },
      { emoji: '🏥', title: 'Healthcare Campuses', desc: 'Sentara Norfolk General &amp; CHKD hospital utility projects' },
      { emoji: '🎓', title: 'Universities', desc: 'ODU &amp; EVMS campus infrastructure excavation' },
      { emoji: '🏗️', title: 'Downtown Development', desc: 'Waterside District &amp; NEON district construction support' }
    ],
    areaH2: 'Norfolk Areas &amp; Neighborhoods We Cover',
    areaParagraph: 'Our hydrovac trucks work throughout Norfolk &#8211; from Ocean View and Willoughby in the north to Larchmont and Riverview in the south. We serve Ghent, Colonial Place, Freemason District, Downtown, Wards Corner, Norview, Tidewater Gardens, Campostella, and Lambert&#8217;s Point.',
    areaExtra: '<strong>Norfolk infrastructure note:</strong> Many Norfolk neighborhoods have utility lines dating to the early 1900s. Mechanical excavation risks catastrophic breaks. Our hydro excavation safely exposes these aging pipes and cables for inspection or replacement.',
    nearbyLinks: '<a href="/locations/virginia-beach/">Virginia Beach</a> | <a href="/locations/portsmouth/">Portsmouth</a> | <a href="/locations/chesapeake/">Chesapeake</a>',
    footerH2: 'Norfolk Hydro Excavation &#8211; Fast &amp; Safe',
    footerText: 'Norfolk&#8217;s dense utility networks require precision excavation. Beach HydroVac provides the safest method for exposing underground utilities in Virginia&#8217;s most infrastructure-heavy city.',
    yoastTitle: 'Hydro Excavation Norfolk VA | Naval Base & Port Area Specialists',
    yoastDesc: 'Norfolk VA hydro excavation near Naval Station Norfolk, Ghent & downtown. Non-destructive potholing for port and naval utility work. 15 min from VB. Call 757-510-5220.',
    yoastKw: 'hydro excavation norfolk va'
  },
  'chesapeake': {
    id: 3464,
    h1: 'Hydro Excavation Services in Chesapeake, VA',
    subtitle: 'Non-destructive excavation for Chesapeake&#8217;s growing residential communities and commercial corridors',
    introH2: 'Chesapeake&#8217;s Trusted Excavation Partner',
    introParagraph: 'Chesapeake is one of Virginia&#8217;s fastest-growing cities, with new residential subdivisions and commercial projects breaking ground across Greenbrier, Western Branch, and the Battlefield Blvd corridor. All that growth means more underground utilities to protect. Beach HydroVac provides non-destructive hydro excavation that keeps Chesapeake&#8217;s development on schedule without utility strikes.',
    whyChooseH3: 'Why Chesapeake Builders Trust Beach HydroVac',
    whyChooseItems: [
      '<strong>New Construction Experts</strong> &#8211; We support Chesapeake&#8217;s booming residential and commercial development safely',
      '<strong>Rural &amp; Urban Coverage</strong> &#8211; From Greenbrier&#8217;s urban core to Deep Creek&#8217;s rural properties',
      '<strong>Wetland-Adjacent Work</strong> &#8211; Experienced near the Great Dismal Swamp and Chesapeake&#8217;s protected waterways',
      '<strong>10-Minute Response</strong> &#8211; We&#8217;re right next door in Virginia Beach, faster than anyone else',
      '<strong>VDOT Battlefield Blvd Projects</strong> &#8211; SUE Level A verification for Chesapeake road improvements'
    ],
    industriesH2: 'Chesapeake Sectors We Serve',
    industries: [
      { emoji: '🏘️', title: 'Residential Builders', desc: 'New subdivisions in Grassfield, Indian River &amp; Western Branch' },
      { emoji: '🏢', title: 'Commercial Development', desc: 'Greenbrier, Crossways, &amp; Battlefield Blvd retail projects' },
      { emoji: '🌿', title: 'Environmental', desc: 'Sensitive excavation near Great Dismal Swamp waterways' },
      { emoji: '⚡', title: 'Dominion Energy', desc: 'Power line and transformer excavation across Chesapeake' }
    ],
    areaH2: 'Chesapeake Communities We Serve',
    areaParagraph: 'We provide hydro excavation across all of Chesapeake &#8211; Greenbrier, Great Bridge, Deep Creek, Western Branch, South Norfolk, Indian River, Hickory, Grassfield, Camelot, and Battlefield Blvd South. Our trucks handle both the developed northern corridors and the rural southern areas of the city.',
    areaExtra: '<strong>Chesapeake soil conditions:</strong> Northern Chesapeake has compacted clay mixed with fill material from decades of development. Southern Chesapeake transitions to organic peat soils near the Great Dismal Swamp. Hydro excavation handles both safely.',
    nearbyLinks: '<a href="/locations/virginia-beach/">Virginia Beach</a> | <a href="/locations/norfolk/">Norfolk</a> | <a href="/locations/suffolk/">Suffolk</a>',
    footerH2: 'Chesapeake Hydro Excavation Services',
    footerText: 'Chesapeake&#8217;s mix of new development and established neighborhoods demands careful excavation. We protect existing utilities while supporting growth across the city.',
    yoastTitle: 'Hydro Excavation Chesapeake VA | Greenbrier & Great Bridge Area',
    yoastDesc: 'Chesapeake VA hydro excavation for residential & commercial projects. Greenbrier, Great Bridge, Deep Creek, Western Branch. Non-destructive potholing. Call 757-510-5220.',
    yoastKw: 'hydro excavation chesapeake va'
  },
  'suffolk': {
    id: 3474,
    h1: 'Hydro Excavation Services in Suffolk, VA',
    subtitle: 'Precision vacuum excavation for Suffolk&#8217;s expanding Harbour View corridor and rural communities',
    introH2: 'Suffolk&#8217;s Reliable Hydro Excavation Service',
    introParagraph: 'Suffolk is Virginia&#8217;s largest city by land area, stretching from the urban Harbour View development to rural farmland along the North Carolina border. This diversity creates unique excavation challenges &#8211; from dense utility networks in new commercial zones to isolated agricultural properties with unmarked water and gas lines. Beach HydroVac handles both with precision.',
    whyChooseH3: 'Why Suffolk Contractors Choose Us',
    whyChooseItems: [
      '<strong>Largest City Coverage</strong> &#8211; We serve all 430 square miles of Suffolk, the largest city in Virginia by area',
      '<strong>Harbour View Specialists</strong> &#8211; Experienced in Suffolk&#8217;s fastest-growing commercial and residential corridor',
      '<strong>Rural Property Access</strong> &#8211; Our 600ft hose reach handles remote agricultural properties',
      '<strong>VDOT Route 58 Projects</strong> &#8211; SUE verification for Suffolk&#8217;s major highway corridors',
      '<strong>20-Minute Response</strong> &#8211; Quick deployment from our Virginia Beach base via I-664'
    ],
    industriesH2: 'Suffolk Sectors We Support',
    industries: [
      { emoji: '🏗️', title: 'New Development', desc: 'Harbour View, Bridgeport, &amp; North Suffolk commercial projects' },
      { emoji: '🌾', title: 'Agriculture', desc: 'Irrigation and drainage line work on Suffolk farmland' },
      { emoji: '🚛', title: 'Logistics &amp; Warehousing', desc: 'Virginia Inland Port utility installations' },
      { emoji: '💧', title: 'Water &amp; Sewer', desc: 'HRSD and city water main replacement projects' }
    ],
    areaH2: 'Suffolk Areas We Cover',
    areaParagraph: 'From Harbour View and North Suffolk to downtown and the rural Holland, Whaleyville, and Chuckatuck communities, we reach every part of Suffolk. We also serve the industrial areas near the Suffolk bypass and Route 58/460 corridors.',
    areaExtra: '<strong>Suffolk excavation note:</strong> Suffolk&#8217;s soil transitions from sandy loam near the rivers to heavy clay inland. Many rural properties have no 811 markings for older utility lines &#8211; hydro excavation is the only safe way to dig near unmarked infrastructure.',
    nearbyLinks: '<a href="/locations/chesapeake/">Chesapeake</a> | <a href="/locations/portsmouth/">Portsmouth</a> | <a href="/locations/newport-news/">Newport News</a>',
    footerH2: 'Suffolk Hydro Excavation &#8211; City to Country',
    footerText: 'Whether it&#8217;s a Harbour View commercial project or a rural property in Holland, Beach HydroVac provides safe hydro excavation across all of Suffolk.',
    yoastTitle: 'Hydro Excavation Suffolk VA | Harbour View & Rural Suffolk Service',
    yoastDesc: 'Suffolk VA hydro excavation covering all 430 sq miles. Harbour View, North Suffolk, Route 58 corridor. Rural & commercial vacuum excavation. Call 757-510-5220.',
    yoastKw: 'hydro excavation suffolk va'
  },
  'portsmouth': {
    id: 3475,
    h1: 'Hydro Excavation Services in Portsmouth, VA',
    subtitle: 'Safe excavation for Portsmouth&#8217;s historic shipyard district, aging infrastructure, and waterfront redevelopment',
    introH2: 'Portsmouth&#8217;s Experienced Hydro Excavation Team',
    introParagraph: 'Portsmouth is one of Hampton Roads&#8217; oldest cities, with underground infrastructure dating back over a century. The Norfolk Naval Shipyard &#8211; the Navy&#8217;s oldest shipyard &#8211; sits at the heart of the city, surrounded by dense utility networks. Traditional mechanical digging risks catastrophic breaks to aging water mains, gas lines, and electrical conduits. Beach HydroVac&#8217;s pressurized water method is the safest approach for Portsmouth&#8217;s sensitive underground environment.',
    whyChooseH3: 'Why Portsmouth Projects Need Hydro Excavation',
    whyChooseItems: [
      '<strong>Aging Infrastructure Safety</strong> &#8211; Portsmouth has some of the oldest utility lines in Hampton Roads. We expose them without damage',
      '<strong>Shipyard District Experience</strong> &#8211; Familiar with excavation protocols near Norfolk Naval Shipyard',
      '<strong>Waterfront Redevelopment</strong> &#8211; Supporting Olde Towne and waterfront revitalization construction',
      '<strong>Tight-Space Capability</strong> &#8211; Portsmouth&#8217;s narrow historic streets require our remote excavation with 600ft hose reach',
      '<strong>15-Minute Response</strong> &#8211; Quick access via the Downtown Tunnel and Midtown Tunnel from VB'
    ],
    industriesH2: 'Portsmouth Industries We Work With',
    industries: [
      { emoji: '🚢', title: 'Shipyard &amp; Maritime', desc: 'Utility work supporting Norfolk Naval Shipyard operations' },
      { emoji: '🏛️', title: 'Historic Restoration', desc: 'Careful excavation in Olde Towne Portsmouth&#8217;s historic district' },
      { emoji: '💧', title: 'Water Infrastructure', desc: 'Aging water main and sewer line exposure for HRSD' },
      { emoji: '🏗️', title: 'Waterfront Development', desc: 'New construction along the Elizabeth River waterfront' }
    ],
    areaH2: 'Portsmouth Neighborhoods We Serve',
    areaParagraph: 'We work throughout Portsmouth including Olde Towne, Port Norfolk, Cradock, Churchland, Western Branch, Cavalier Manor, Hodges Ferry, Brighton, and Waterview. Our hydrovac trucks navigate Portsmouth&#8217;s narrow historic streets using remote excavation hoses to reach utility access points without blocking traffic.',
    areaExtra: '<strong>Portsmouth utility warning:</strong> Many Portsmouth neighborhoods have cast iron water mains and terra cotta sewer lines from the early 1900s. A backhoe strike on these brittle pipes causes flooding and expensive emergency repairs. Hydro excavation eliminates this risk.',
    nearbyLinks: '<a href="/locations/norfolk/">Norfolk</a> | <a href="/locations/suffolk/">Suffolk</a> | <a href="/locations/chesapeake/">Chesapeake</a>',
    footerH2: 'Portsmouth Excavation &#8211; Protecting Historic Infrastructure',
    footerText: 'Portsmouth&#8217;s aging utility networks demand the precision of hydro excavation. We protect what&#8217;s underground while supporting the city&#8217;s renewal.',
    yoastTitle: 'Hydro Excavation Portsmouth VA | Shipyard & Historic District Service',
    yoastDesc: 'Portsmouth VA hydro excavation near Norfolk Naval Shipyard & Olde Towne. Safe digging around aging water mains & historic utilities. Call 757-510-5220.',
    yoastKw: 'hydro excavation portsmouth va'
  },
  'newport-news': {
    id: 3465,
    h1: 'Hydro Excavation Services in Newport News, VA',
    subtitle: 'Non-destructive excavation supporting Newport News Shipbuilding, Fort Eustis, and Peninsula development',
    introH2: 'Newport News&#8217; Precision Hydro Excavation Provider',
    introParagraph: 'Newport News is home to the largest industrial employer in Virginia &#8211; HII Newport News Shipbuilding, where America&#8217;s aircraft carriers and submarines are built. The city&#8217;s heavy industrial and military infrastructure creates a dense web of underground utilities including high-voltage power lines, industrial water systems, and fiber optic networks. Beach HydroVac provides the safe, non-destructive excavation these critical facilities demand.',
    whyChooseH3: 'Why Newport News Chooses Beach HydroVac',
    whyChooseItems: [
      '<strong>Industrial-Grade Service</strong> &#8211; We support heavy industrial sites like Newport News Shipbuilding and Amerigas',
      '<strong>Fort Eustis Access</strong> &#8211; Experienced working on and near Joint Base Langley-Eustis projects',
      '<strong>Peninsula Coverage</strong> &#8211; From Denbigh to the shipyard district, we serve the entire city',
      '<strong>Oyster Point Commercial</strong> &#8211; Supporting Newport News&#8217;s growing tech and office corridor',
      '<strong>I-64 Corridor Projects</strong> &#8211; VDOT SUE verification for Peninsula highway widening'
    ],
    industriesH2: 'Newport News Sectors We Serve',
    industries: [
      { emoji: '🚢', title: 'Shipbuilding &amp; Defense', desc: 'Utility work supporting HII and defense contractors on the Peninsula' },
      { emoji: '🎖️', title: 'Military Installations', desc: 'Projects near Fort Eustis and Joint Base Langley-Eustis' },
      { emoji: '🏢', title: 'Tech &amp; Office', desc: 'Oyster Point, City Center &amp; Tech Center commercial infrastructure' },
      { emoji: '🛣️', title: 'VDOT Highway', desc: 'I-64 widening, J. Clyde Morris Blvd &amp; Warwick Blvd projects' }
    ],
    areaH2: 'Newport News Areas We Cover',
    areaParagraph: 'Our hydrovac trucks serve all of Newport News from the south end shipyard district to the northern Denbigh community. We cover Oyster Point, City Center, Hidenwood, Riverside, Warwick, Menchville, Kiln Creek, and the Fort Eustis area. We also support projects along the entire I-64 Peninsula corridor.',
    areaExtra: '<strong>Peninsula soil conditions:</strong> Newport News sits on the Virginia Peninsula with soil ranging from sandy near the James River waterfront to dense marine clay inland. Groundwater is often close to the surface, making traditional trenching messy and dangerous &#8211; hydro excavation keeps the job site clean and safe.',
    nearbyLinks: '<a href="/locations/hampton/">Hampton</a> | <a href="/locations/williamsburg/">Williamsburg</a> | <a href="/locations/suffolk/">Suffolk</a>',
    footerH2: 'Newport News Hydro Excavation &#8211; Industrial Strength',
    footerText: 'From shipyard-scale industrial projects to residential utility work, Beach HydroVac delivers safe, precise excavation across Newport News.',
    yoastTitle: 'Hydro Excavation Newport News VA | Shipyard & Peninsula Service',
    yoastDesc: 'Newport News VA hydro excavation near HII Shipbuilding, Fort Eustis & Oyster Point. Non-destructive potholing for industrial & commercial projects. Call 757-510-5220.',
    yoastKw: 'hydro excavation newport news va'
  },
  'hampton': {
    id: 3466,
    h1: 'Hydro Excavation Services in Hampton, VA',
    subtitle: 'Vacuum excavation serving Langley Air Force Base, NASA Langley, and Hampton&#8217;s coastal communities',
    introH2: 'Hampton&#8217;s Trusted Hydro Excavation Experts',
    introParagraph: 'Hampton is where air power and space exploration meet &#8211; home to Langley Air Force Base and NASA Langley Research Center. These high-security installations, combined with Hampton University&#8217;s historic campus and the city&#8217;s coastal location, create demanding excavation requirements. Beach HydroVac provides the non-destructive precision these sensitive sites require, with full VDOT compliance and security clearance experience.',
    whyChooseH3: 'Why Hampton Trusts Beach HydroVac',
    whyChooseItems: [
      '<strong>Langley AFB Experience</strong> &#8211; Familiar with security and excavation protocols at Joint Base Langley-Eustis',
      '<strong>NASA Langley Precision</strong> &#8211; The level of care space research facilities demand is what we deliver everywhere',
      '<strong>Coastal Excavation</strong> &#8211; Hampton&#8217;s Buckroe Beach and Grandview areas have high water tables we manage expertly',
      '<strong>Fort Monroe Projects</strong> &#8211; Historic former military base redevelopment requiring careful utility work',
      '<strong>Coliseum Central Support</strong> &#8211; Commercial and infrastructure projects in Hampton&#8217;s core corridor'
    ],
    industriesH2: 'Hampton Industries We Support',
    industries: [
      { emoji: '✈️', title: 'Aerospace &amp; Defense', desc: 'Langley AFB &amp; NASA Langley Research Center support work' },
      { emoji: '🎓', title: 'Education', desc: 'Hampton University &amp; Thomas Nelson campus infrastructure' },
      { emoji: '🏛️', title: 'Historic Redevelopment', desc: 'Fort Monroe National Monument adaptive reuse projects' },
      { emoji: '🏖️', title: 'Coastal Properties', desc: 'Buckroe Beach &amp; Grandview waterfront utility work' }
    ],
    areaH2: 'Hampton Neighborhoods We Serve',
    areaParagraph: 'We work throughout Hampton including Phoebus, Buckroe Beach, Grandview, Wythe, Fox Hill, Hampton Roads Center, Coliseum Central, Aberdeen, Langley, and the Fort Monroe area. Our trucks also support projects along Mercury Blvd, Settlers Landing Road, and the I-64 corridor through Hampton.',
    areaExtra: '<strong>Hampton coastal note:</strong> Hampton is surrounded by water on three sides &#8211; the Chesapeake Bay, Hampton Roads harbor, and Back River. This means consistently high water tables and saturated soil. Hydro excavation handles this wet environment safely, unlike mechanical methods that create dangerous trench collapses in waterlogged ground.',
    nearbyLinks: '<a href="/locations/newport-news/">Newport News</a> | <a href="/locations/norfolk/">Norfolk</a> | <a href="/locations/williamsburg/">Williamsburg</a>',
    footerH2: 'Hampton Hydro Excavation &#8211; From Langley to the Bay',
    footerText: 'Hampton&#8217;s aerospace heritage and coastal location demand excavation precision. Beach HydroVac delivers safe, non-destructive service across the city.',
    yoastTitle: 'Hydro Excavation Hampton VA | Langley AFB & NASA Area Service',
    yoastDesc: 'Hampton VA hydro excavation near Langley AFB, NASA Langley & Fort Monroe. Coastal excavation specialists. Potholing & SUE Level A. Call 757-510-5220.',
    yoastKw: 'hydro excavation hampton va'
  },
  'williamsburg': {
    id: 3476,
    h1: 'Hydro Excavation Services in Williamsburg, VA',
    subtitle: 'Careful excavation protecting Williamsburg&#8217;s historic sites, college campus, and tourism infrastructure',
    introH2: 'Williamsburg&#8217;s Careful Hydro Excavation Specialists',
    introParagraph: 'Williamsburg presents a unique excavation challenge found nowhere else in Virginia &#8211; the need to protect centuries-old historic infrastructure alongside modern utility networks. Colonial Williamsburg, the College of William &amp; Mary (founded 1693), and Busch Gardens create a mix of preservation-sensitive sites and high-traffic tourism facilities. Beach HydroVac&#8217;s non-destructive approach is the only responsible way to excavate in this historically significant city.',
    whyChooseH3: 'Why Williamsburg Requires Hydro Excavation',
    whyChooseItems: [
      '<strong>Historic Preservation</strong> &#8211; Non-destructive excavation near Colonial Williamsburg&#8217;s 18th-century foundations',
      '<strong>William &amp; Mary Campus</strong> &#8211; Careful utility work around the nation&#8217;s second-oldest college',
      '<strong>Tourism Infrastructure</strong> &#8211; Busch Gardens, Water Country, and Premium Outlets utility support',
      '<strong>James City County</strong> &#8211; New residential development in New Town, Stonehouse, and Ford&#8217;s Colony',
      '<strong>Archaeological Sensitivity</strong> &#8211; We work carefully in areas with potential archaeological significance'
    ],
    industriesH2: 'Williamsburg Projects We Handle',
    industries: [
      { emoji: '🏛️', title: 'Historic Preservation', desc: 'Excavation near Colonial Williamsburg&#8217;s preserved buildings' },
      { emoji: '🎓', title: 'Higher Education', desc: 'William &amp; Mary campus utility and infrastructure projects' },
      { emoji: '🎢', title: 'Tourism &amp; Entertainment', desc: 'Busch Gardens, Water Country &amp; outlet mall infrastructure' },
      { emoji: '🏘️', title: 'Residential Growth', desc: 'New Town, Stonehouse, Ford&#8217;s Colony developments' }
    ],
    areaH2: 'Greater Williamsburg Areas We Serve',
    areaParagraph: 'We serve the City of Williamsburg, James City County, and upper York County. This includes Colonial Williamsburg, the William &amp; Mary campus, New Town, Kingsmill, Ford&#8217;s Colony, Stonehouse, Governor&#8217;s Land, First Colony, Lightfoot, Norge, and Toano. We also cover the Route 60 and I-64 commercial corridors.',
    areaExtra: '<strong>Williamsburg excavation note:</strong> The Williamsburg area sits on a mix of sandy coastal plain soils and heavy Tidewater clay. Near the James and York Rivers, groundwater can be just 2-3 feet below the surface. Our hydro excavation safely handles these conditions while protecting any historically significant artifacts that may be encountered.',
    nearbyLinks: '<a href="/locations/newport-news/">Newport News</a> | <a href="/locations/hampton/">Hampton</a> | <a href="/locations/richmond/">Richmond</a>',
    footerH2: 'Williamsburg Hydro Excavation &#8211; History Meets Precision',
    footerText: 'In a city where every shovel strike could impact centuries of history, Beach HydroVac provides the careful, non-destructive excavation Williamsburg deserves.',
    yoastTitle: 'Hydro Excavation Williamsburg VA | Historic District Safe Digging',
    yoastDesc: 'Williamsburg VA hydro excavation protecting historic sites & modern infrastructure. Colonial Williamsburg, W&M campus, Busch Gardens area. Call 757-510-5220.',
    yoastKw: 'hydro excavation williamsburg va'
  },
  'richmond': {
    id: 3467,
    h1: 'Hydro Excavation Services in Richmond, VA',
    subtitle: 'Professional vacuum excavation for Virginia&#8217;s capital city &#8211; from Shockoe Bottom to Short Pump',
    introH2: 'Richmond&#8217;s Professional Hydro Excavation Service',
    introParagraph: 'As Virginia&#8217;s capital and one of the oldest cities in America, Richmond has an extremely complex underground utility network. Downtown&#8217;s Shockoe Bottom sits on century-old brick sewer lines and gas mains. The Manchester district&#8217;s industrial heritage means buried infrastructure that isn&#8217;t on any map. Beach HydroVac provides safe excavation across the entire Richmond metro, from the urban core to the suburbs along I-64 and I-95.',
    whyChooseH3: 'Why Richmond Projects Need Hydro Excavation',
    whyChooseItems: [
      '<strong>Historic Urban Core</strong> &#8211; Richmond&#8217;s downtown has unmapped utilities from the 1800s that only hydro excavation can safely expose',
      '<strong>State Capital Projects</strong> &#8211; We support Commonwealth of Virginia facility and infrastructure work',
      '<strong>James River Corridor</strong> &#8211; Excavation along flood-prone riverfront areas with saturated soil',
      '<strong>I-95/I-64 Interchange Work</strong> &#8211; VDOT SUE Level A verification for major highway projects',
      '<strong>VCU &amp; Medical District</strong> &#8211; Precision excavation near VCU Medical Center&#8217;s critical utility feeds'
    ],
    industriesH2: 'Richmond Industries We Serve',
    industries: [
      { emoji: '🏛️', title: 'State Government', desc: 'Capitol complex &amp; state facility infrastructure support' },
      { emoji: '🏥', title: 'Healthcare', desc: 'VCU Medical Center, Bon Secours &amp; HCA hospital campuses' },
      { emoji: '💼', title: 'Financial District', desc: 'Downtown &amp; Federal Reserve Bank of Richmond utility work' },
      { emoji: '🏗️', title: 'Urban Redevelopment', desc: 'Scott&#8217;s Addition, Manchester &amp; Shockoe Bottom projects' }
    ],
    areaH2: 'Richmond Areas We Cover',
    areaParagraph: 'We serve the City of Richmond and surrounding areas including the Fan District, Carytown, Scott&#8217;s Addition, Church Hill, Shockoe Bottom, Manchester, Monroe Ward, Oregon Hill, Northside, Southside, and the East End. Our hydrovac trucks also work the I-95 corridor, Broad Street commercial strip, and the growing Stony Point area.',
    areaExtra: '<strong>Richmond soil conditions:</strong> Richmond&#8217;s geology varies dramatically. The fall line runs through the city, creating hard Piedmont rock on the west side and soft coastal plain sediment on the east. Downtown&#8217;s fill material near the James River often contains abandoned foundations, old pipes, and construction debris &#8211; exactly the conditions where hydro excavation prevents costly utility strikes.',
    nearbyLinks: '<a href="/locations/henrico/">Henrico</a> | <a href="/locations/chesterfield/">Chesterfield</a> | <a href="/locations/fredericksburg/">Fredericksburg</a>',
    footerH2: 'Richmond Hydro Excavation &#8211; Capital City Service',
    footerText: 'Richmond&#8217;s complex underground infrastructure demands precision. Beach HydroVac provides safe excavation from the historic Fan to the suburbs.',
    yoastTitle: 'Hydro Excavation Richmond VA | Downtown & Metro Area Service',
    yoastDesc: 'Richmond VA hydro excavation for state capital projects, VCU Medical, downtown redevelopment. Shockoe Bottom to Short Pump. VDOT compliant. Call 757-510-5220.',
    yoastKw: 'hydro excavation richmond va'
  },
  'henrico': {
    id: 3478,
    h1: 'Hydro Excavation Services in Henrico County, VA',
    subtitle: 'Vacuum excavation for Henrico&#8217;s commercial corridors, data centers, and suburban development',
    introH2: 'Henrico County&#8217;s Hydro Excavation Provider',
    introParagraph: 'Henrico County surrounds Richmond on three sides and is one of Virginia&#8217;s most active development markets. The Short Pump commercial district, Innsbrook office park, and the rapidly growing data center corridor along I-95 all demand safe excavation near dense underground utility networks. Beach HydroVac provides the non-destructive solution that Henrico&#8217;s development pace requires.',
    whyChooseH3: 'Why Henrico County Contractors Call Us',
    whyChooseItems: [
      '<strong>Data Center Corridor</strong> &#8211; Supporting the growing data center industry along Henrico&#8217;s I-95 and Staples Mill corridors',
      '<strong>Short Pump &amp; West End</strong> &#8211; Commercial and residential excavation in Henrico&#8217;s busiest area',
      '<strong>Innsbrook Support</strong> &#8211; Office park utility work without disrupting business operations',
      '<strong>Henrico County Permits</strong> &#8211; Familiar with Henrico&#8217;s utility coordination and right-of-way requirements',
      '<strong>I-95/I-64 Access</strong> &#8211; Fast deployment via major highways to any Henrico location'
    ],
    industriesH2: 'Henrico Sectors We Support',
    industries: [
      { emoji: '💾', title: 'Data Centers', desc: 'High-voltage and fiber excavation for Henrico&#8217;s growing data center campus' },
      { emoji: '🏢', title: 'Office &amp; Commercial', desc: 'Innsbrook, Short Pump &amp; West Broad Street corridor projects' },
      { emoji: '🏘️', title: 'Residential', desc: 'New and established neighborhoods across East and West Henrico' },
      { emoji: '🛣️', title: 'VDOT Highway', desc: 'I-64, I-95, Route 250 &amp; Parham Rd improvement projects' }
    ],
    areaH2: 'Henrico County Areas We Cover',
    areaParagraph: 'We serve all of Henrico County including Short Pump, Glen Allen, Innsbrook, Lakeside, Highland Springs, Varina, Sandston, Tuckahoe, and the West End. Our hydrovac trucks work both the densely developed western side and the more rural eastern Henrico communities.',
    areaExtra: '<strong>Henrico development note:</strong> Henrico is adding data centers, distribution facilities, and residential subdivisions at a rapid pace. These new developments often intersect with existing gas, water, and electric infrastructure. One utility strike can shut down a project for days and cost tens of thousands in repairs &#8211; hydro excavation eliminates that risk.',
    nearbyLinks: '<a href="/locations/richmond/">Richmond</a> | <a href="/locations/chesterfield/">Chesterfield</a> | <a href="/locations/fredericksburg/">Fredericksburg</a>',
    footerH2: 'Henrico County Hydro Excavation',
    footerText: 'Henrico&#8217;s rapid growth demands safe excavation. From data center corridors to suburban neighborhoods, Beach HydroVac keeps projects on schedule.',
    yoastTitle: 'Hydro Excavation Henrico County VA | Short Pump & Data Center Area',
    yoastDesc: 'Henrico County VA hydro excavation for data centers, Short Pump, Innsbrook & I-95 corridor. Non-destructive potholing & SUE verification. Call 757-510-5220.',
    yoastKw: 'hydro excavation henrico county va'
  },
  'chesterfield': {
    id: 3479,
    h1: 'Hydro Excavation Services in Chesterfield County, VA',
    subtitle: 'Safe excavation for Chesterfield&#8217;s Midlothian growth corridor and established communities',
    introH2: 'Chesterfield County&#8217;s Hydro Excavation Experts',
    introParagraph: 'Chesterfield County sits south of the James River and is one of Richmond&#8217;s fastest-growing suburbs. The Midlothian corridor, Brandermill, and Magnolia Green communities represent billions in development investment &#8211; all built atop a growing network of underground utilities. Beach HydroVac protects this infrastructure with non-destructive excavation that keeps Chesterfield&#8217;s construction projects on schedule and on budget.',
    whyChooseH3: 'Why Chesterfield Developers Trust Us',
    whyChooseItems: [
      '<strong>Midlothian Corridor</strong> &#8211; Extensive experience in Chesterfield&#8217;s busiest development zone along Route 60',
      '<strong>Residential Community Work</strong> &#8211; Safe excavation in Brandermill, Woodlake, and Magnolia Green',
      '<strong>Chester &amp; I-95 South</strong> &#8211; Industrial and commercial projects along the southern I-95 corridor',
      '<strong>Chesterfield County Compliant</strong> &#8211; We follow all county utility and right-of-way requirements',
      '<strong>Mixed-Use Development</strong> &#8211; Supporting Chesterfield&#8217;s growing mixed-use town center projects'
    ],
    industriesH2: 'Chesterfield Industries We Serve',
    industries: [
      { emoji: '🏘️', title: 'Residential Builders', desc: 'Midlothian, Brandermill, Magnolia Green &amp; Harpers Mill' },
      { emoji: '🏢', title: 'Commercial', desc: 'Midlothian Turnpike &amp; Hull Street Rd commercial corridors' },
      { emoji: '🏫', title: 'Schools &amp; Public', desc: 'Chesterfield County Schools &amp; county government projects' },
      { emoji: '🛣️', title: 'Road Construction', desc: 'Route 288, Route 360 &amp; Powhite Parkway improvements' }
    ],
    areaH2: 'Chesterfield County Areas We Cover',
    areaParagraph: 'Our hydrovac trucks serve all of Chesterfield County including Midlothian, Chester, Brandermill, Woodlake, Magnolia Green, Bon Air, Moseley, Enon, Ettrick, and Matoaca. We also handle projects along the Route 288 loop, Hull Street corridor, and Jefferson Davis Highway.',
    areaExtra: '<strong>Chesterfield soil profile:</strong> Chesterfield&#8217;s terrain varies from low-lying James River bottomland to rolling Piedmont hills. The county&#8217;s red clay soil is notoriously difficult for mechanical trenching &#8211; it sticks to buckets, clogs equipment, and obscures utility markings. Hydro excavation cuts through clay cleanly, exposing utilities with precision regardless of soil type.',
    nearbyLinks: '<a href="/locations/richmond/">Richmond</a> | <a href="/locations/henrico/">Henrico</a> | <a href="/locations/fredericksburg/">Fredericksburg</a>',
    footerH2: 'Chesterfield County Hydro Excavation',
    footerText: 'Chesterfield&#8217;s growth needs safe excavation. Beach HydroVac delivers non-destructive service from Midlothian to Chester.',
    yoastTitle: 'Hydro Excavation Chesterfield County VA | Midlothian & Chester Area',
    yoastDesc: 'Chesterfield County VA hydro excavation. Midlothian, Brandermill, Chester & I-95 South corridor. Non-destructive potholing for residential & commercial. Call 757-510-5220.',
    yoastKw: 'hydro excavation chesterfield county va'
  },
  'alexandria': {
    id: 3480,
    h1: 'Hydro Excavation Services in Alexandria, VA',
    subtitle: 'Precision excavation for Old Town Alexandria&#8217;s historic district and Northern Virginia development',
    introH2: 'Alexandria&#8217;s Precision Hydro Excavation Service',
    introParagraph: 'Alexandria&#8217;s Old Town district features cobblestone streets and utility infrastructure dating to the 1700s, sitting directly alongside modern federal facilities and the bustling Potomac Yard redevelopment. This contrast makes Alexandria one of the most challenging excavation environments in Virginia. Beach HydroVac brings the precision and care that this unique city demands &#8211; from exposing colonial-era brick storm drains to supporting Amazon&#8217;s HQ2-adjacent construction in National Landing.',
    whyChooseH3: 'Why Alexandria Projects Demand Hydro Excavation',
    whyChooseItems: [
      '<strong>Old Town Expertise</strong> &#8211; Non-destructive excavation near Alexandria&#8217;s 18th-century underground infrastructure',
      '<strong>National Landing / HQ2</strong> &#8211; Supporting major development in the Potomac Yard and Crystal City corridor',
      '<strong>Federal Facility Experience</strong> &#8211; Work near Mark Center, Patent &amp; Trademark Office, and other government sites',
      '<strong>Historic Preservation Compliant</strong> &#8211; We follow Alexandria&#8217;s strict historic district excavation requirements',
      '<strong>Metro Corridor Work</strong> &#8211; Utility projects along the King Street and Eisenhower Ave Metro lines'
    ],
    industriesH2: 'Alexandria Sectors We Support',
    industries: [
      { emoji: '🏛️', title: 'Federal Government', desc: 'Mark Center DOD, Patent Office &amp; federal campus projects' },
      { emoji: '🏗️', title: 'Major Development', desc: 'National Landing, Potomac Yard &amp; Eisenhower Valley projects' },
      { emoji: '🏘️', title: 'Historic Preservation', desc: 'Old Town underground utility work preserving colonial infrastructure' },
      { emoji: '🚇', title: 'Transit Infrastructure', desc: 'Metro station area utility relocation and new service connections' }
    ],
    areaH2: 'Alexandria Areas We Cover',
    areaParagraph: 'We serve all of Alexandria including Old Town, Del Ray, Arlandria, Rosemont, Seminary Hill, Eisenhower Valley, Landmark, Potomac Yard, National Landing, and the West End. Our hydrovac trucks also support projects along Duke Street, King Street, and the George Washington Memorial Parkway corridor.',
    areaExtra: '<strong>Alexandria excavation challenge:</strong> Alexandria&#8217;s location along the Potomac River means high groundwater, especially in Old Town where basements frequently flood. Add in 300 years of buried infrastructure &#8211; some of it undocumented &#8211; and mechanical excavation becomes a gamble. Hydro excavation is the only responsible choice.',
    nearbyLinks: '<a href="/locations/arlington/">Arlington</a> | <a href="/locations/fairfax/">Fairfax</a> | <a href="/locations/fredericksburg/">Fredericksburg</a>',
    footerH2: 'Alexandria Hydro Excavation &#8211; Colonial Roots, Modern Precision',
    footerText: 'From Old Town&#8217;s colonial infrastructure to National Landing&#8217;s cutting-edge development, Beach HydroVac provides the precision Alexandria requires.',
    yoastTitle: 'Hydro Excavation Alexandria VA | Old Town & National Landing Area',
    yoastDesc: 'Alexandria VA hydro excavation for Old Town historic district, Potomac Yard & federal facilities. Precision potholing near colonial-era utilities. Call 757-510-5220.',
    yoastKw: 'hydro excavation alexandria va'
  },
  'arlington': {
    id: 3481,
    h1: 'Hydro Excavation Services in Arlington, VA',
    subtitle: 'Non-destructive excavation for the Pentagon corridor, Rosslyn-Ballston, and Arlington&#8217;s dense urban core',
    introH2: 'Arlington&#8217;s Urban Hydro Excavation Specialists',
    introParagraph: 'Arlington is the most densely developed county in Virginia &#8211; home to the Pentagon, numerous federal agencies, and one of the nation&#8217;s most active commercial real estate markets along the Rosslyn-Ballston corridor. Every square foot of Arlington has underground utilities beneath it. In this environment, mechanical excavation isn&#8217;t just risky &#8211; it&#8217;s reckless. Beach HydroVac provides the precision excavation that Arlington&#8217;s urban density demands.',
    whyChooseH3: 'Why Arlington Requires Hydro Excavation',
    whyChooseItems: [
      '<strong>Pentagon Area Clearance</strong> &#8211; Experience working near the Pentagon and Arlington National Cemetery',
      '<strong>Dense Urban Expertise</strong> &#8211; Arlington&#8217;s underground is packed with utilities &#8211; we navigate it safely',
      '<strong>Rosslyn-Ballston Corridor</strong> &#8211; Supporting the R-B corridor&#8217;s continuous commercial development',
      '<strong>Zero Street Disruption</strong> &#8211; Our remote hose reach means we don&#8217;t need to close lanes on busy Arlington streets',
      '<strong>Crystal City / National Landing</strong> &#8211; Major utility work supporting ongoing Amazon HQ2 development'
    ],
    industriesH2: 'Arlington Industries We Serve',
    industries: [
      { emoji: '🏛️', title: 'Federal &amp; Defense', desc: 'Pentagon, DARPA, Arlington National Cemetery &amp; agency campuses' },
      { emoji: '🏢', title: 'Commercial Real Estate', desc: 'Rosslyn, Ballston, Clarendon &amp; Crystal City tower projects' },
      { emoji: '🚇', title: 'Metro &amp; Transit', desc: 'Utility work along Metro&#8217;s Orange/Silver line corridor' },
      { emoji: '🏗️', title: 'Amazon HQ2', desc: 'National Landing infrastructure supporting tech headquarters' }
    ],
    areaH2: 'Arlington Neighborhoods We Serve',
    areaParagraph: 'We serve all of Arlington County including Rosslyn, Courthouse, Clarendon, Ballston, Virginia Square, Crystal City, Pentagon City, Columbia Pike, Shirlington, Cherrydale, Lyon Village, Ashton Heights, and Bluemont. Our remote excavation capability is especially valuable in Arlington where tight spaces between buildings make traditional excavation impossible.',
    areaExtra: '<strong>Arlington underground reality:</strong> Arlington has one of the highest utility densities per square mile in Virginia. Gas, electric, telecom, water, sewer, steam, and fiber all compete for space underground. A single backhoe strike can knock out power to a government building or rupture a high-pressure gas main. Hydro excavation eliminates this risk entirely.',
    nearbyLinks: '<a href="/locations/alexandria/">Alexandria</a> | <a href="/locations/fairfax/">Fairfax</a>',
    footerH2: 'Arlington Hydro Excavation &#8211; Urban Precision',
    footerText: 'Arlington&#8217;s urban density demands the safest excavation method available. Beach HydroVac keeps federal and commercial projects safe underground.',
    yoastTitle: 'Hydro Excavation Arlington VA | Pentagon & Rosslyn-Ballston Area',
    yoastDesc: 'Arlington VA hydro excavation near the Pentagon, Rosslyn-Ballston & Crystal City. Dense urban utility work without disruption. Non-destructive. Call 757-510-5220.',
    yoastKw: 'hydro excavation arlington va'
  },
  'fairfax': {
    id: 3482,
    h1: 'Hydro Excavation Services in Fairfax, VA',
    subtitle: 'Vacuum excavation for Tysons Corner, the Dulles data center corridor, and Fairfax County&#8217;s infrastructure',
    introH2: 'Fairfax County&#8217;s Hydro Excavation Provider',
    introParagraph: 'Fairfax County is the economic engine of Northern Virginia &#8211; home to Tysons Corner (the largest commercial district on the East Coast outside of NYC), the Dulles Technology Corridor, and the nation&#8217;s densest concentration of data centers. These facilities demand absolute precision when excavating near their power feeds and fiber optic connections. Beach HydroVac delivers that precision with non-destructive hydro excavation.',
    whyChooseH3: 'Why Fairfax County Depends on Hydro Excavation',
    whyChooseItems: [
      '<strong>Data Center Specialists</strong> &#8211; We understand the zero-downtime requirements of Dulles corridor data center excavation',
      '<strong>Tysons Corner Experience</strong> &#8211; Commercial excavation in Northern Virginia&#8217;s densest business district',
      '<strong>Dulles Toll Road Corridor</strong> &#8211; VDOT SUE verification for Route 267 and I-66 projects',
      '<strong>George Mason University</strong> &#8211; Campus infrastructure excavation with minimal disruption',
      '<strong>Silver Line Metro</strong> &#8211; Utility work along the Metrorail extension corridor'
    ],
    industriesH2: 'Fairfax County Sectors We Serve',
    industries: [
      { emoji: '💾', title: 'Data Centers', desc: 'Dulles corridor data center power &amp; fiber excavation' },
      { emoji: '🏢', title: 'Tysons Corner', desc: 'Commercial towers, Metro station &amp; mixed-use development' },
      { emoji: '🛡️', title: 'Defense Contractors', desc: 'Utility work for defense and intelligence community facilities' },
      { emoji: '🚇', title: 'Metro Silver Line', desc: 'Phase 2 and station-area development utility work' }
    ],
    areaH2: 'Fairfax County Areas We Cover',
    areaParagraph: 'We serve all of Fairfax County including Tysons Corner, McLean, Vienna, Herndon, Reston, Centreville, Chantilly, Burke, Springfield, Annandale, Falls Church, and the Dulles corridor. We also cover Fairfax City, George Mason University, and the entire I-66 and Route 28 corridor.',
    areaExtra: '<strong>Fairfax data center note:</strong> A single fiber optic cut in the Dulles corridor can knock major cloud services offline, costing millions per minute. Data center operators require hydro excavation for any dig within proximity of their fiber routes &#8211; no mechanical excavation allowed. Beach HydroVac is the reliable provider these critical facilities trust.',
    nearbyLinks: '<a href="/locations/arlington/">Arlington</a> | <a href="/locations/alexandria/">Alexandria</a> | <a href="/locations/fredericksburg/">Fredericksburg</a>',
    footerH2: 'Fairfax County Hydro Excavation &#8211; Tech Corridor Precision',
    footerText: 'From Tysons Corner towers to Dulles corridor data centers, Beach HydroVac provides the precision excavation Fairfax County&#8217;s economy demands.',
    yoastTitle: 'Hydro Excavation Fairfax VA | Tysons Corner & Dulles Data Centers',
    yoastDesc: 'Fairfax County VA hydro excavation. Tysons Corner, Dulles data center corridor, Reston, Herndon. Zero-disruption potholing & SUE verification. Call 757-510-5220.',
    yoastKw: 'hydro excavation fairfax county va'
  },
  'fredericksburg': {
    id: 3483,
    h1: 'Hydro Excavation Services in Fredericksburg, VA',
    subtitle: 'Precision excavation for Fredericksburg&#8217;s historic downtown, I-95 corridor, and Spotsylvania growth',
    introH2: 'Fredericksburg&#8217;s Reliable Hydro Excavation Service',
    introParagraph: 'Fredericksburg sits at the crossroads of Virginia &#8211; halfway between Washington DC and Richmond along I-95, and at the edge of the Rappahannock River. The city&#8217;s historic downtown dates to 1728 with underground infrastructure to match, while the surrounding Spotsylvania and Stafford County areas are among Virginia&#8217;s fastest-growing suburbs. Beach HydroVac serves both the historic preservation needs of downtown and the new construction demands of the growing region.',
    whyChooseH3: 'Why Fredericksburg Area Contractors Choose Us',
    whyChooseItems: [
      '<strong>Historic Downtown Care</strong> &#8211; Non-destructive excavation in Fredericksburg&#8217;s Civil War-era historic district',
      '<strong>I-95 Corridor Projects</strong> &#8211; VDOT SUE Level A for the busiest highway section in Virginia',
      '<strong>Rappahannock River Area</strong> &#8211; Experienced with riverbank and flood zone excavation challenges',
      '<strong>Spotsylvania &amp; Stafford</strong> &#8211; Supporting the region&#8217;s explosive residential and commercial growth',
      '<strong>VRE Commuter Rail</strong> &#8211; Utility work along the Virginia Railway Express corridor'
    ],
    industriesH2: 'Fredericksburg Region Industries',
    industries: [
      { emoji: '🛣️', title: 'VDOT Highway', desc: 'I-95, Route 3, Route 17 &amp; the Rappahannock River Crossing' },
      { emoji: '🏘️', title: 'Residential Boom', desc: 'Spotsylvania &amp; Stafford County new subdivision construction' },
      { emoji: '🏛️', title: 'Historic Preservation', desc: 'Fredericksburg Battlefield &amp; downtown historic district' },
      { emoji: '🏥', title: 'Healthcare', desc: 'Mary Washington Hospital campus infrastructure projects' }
    ],
    areaH2: 'Greater Fredericksburg Areas We Cover',
    areaParagraph: 'We serve the City of Fredericksburg, Spotsylvania County, and Stafford County. This includes downtown Fredericksburg, Central Park, Celebrate Virginia, Massaponax, Thornburg, Hartwood, Falmouth, and the rapidly growing Route 3 and Route 17 corridors. Our trucks access the region via I-95 from our Virginia Beach headquarters.',
    areaExtra: '<strong>Fredericksburg geology note:</strong> The Fredericksburg area sits right on Virginia&#8217;s fall line where the hard Piedmont rock meets soft coastal plain sediment. This transition zone creates unpredictable soil conditions &#8211; you can hit solid rock one foot and sandy soil the next. Hydro excavation safely handles both without risking utility damage.',
    nearbyLinks: '<a href="/locations/richmond/">Richmond</a> | <a href="/locations/alexandria/">Alexandria</a> | <a href="/locations/arlington/">Arlington</a>',
    footerH2: 'Fredericksburg Area Hydro Excavation',
    footerText: 'Fredericksburg&#8217;s blend of historic preservation and rapid growth demands excavation that&#8217;s both careful and efficient. Beach HydroVac delivers both.',
    yoastTitle: 'Hydro Excavation Fredericksburg VA | I-95 Corridor & Historic Area',
    yoastDesc: 'Fredericksburg VA hydro excavation for I-95 corridor, historic downtown & Spotsylvania/Stafford growth. VDOT SUE Level A compliant. Call 757-510-5220.',
    yoastKw: 'hydro excavation fredericksburg va'
  },
  'roanoke': {
    id: 3484,
    h1: 'Hydro Excavation Services in Roanoke, VA',
    subtitle: 'Mountain-terrain excavation for Roanoke&#8217;s infrastructure, railroad corridors, and Blue Ridge development',
    introH2: 'Roanoke&#8217;s Mountain-Terrain Hydro Excavation Team',
    introParagraph: 'Roanoke &#8211; the Star City of the Blue Ridge &#8211; presents excavation challenges you won&#8217;t find anywhere else in Virginia. Rocky mountain soil, steep hillside grades, and the city&#8217;s historic railroad infrastructure create a demanding underground environment. Beach HydroVac&#8217;s pressurized water method cuts through Roanoke&#8217;s rocky Piedmont soil safely, while our 600-foot hose reach handles the steep terrain that makes backhoe access impossible on many Roanoke job sites.',
    whyChooseH3: 'Why Roanoke Needs Hydro Excavation',
    whyChooseItems: [
      '<strong>Rocky Soil Specialists</strong> &#8211; Roanoke&#8217;s mountain terrain has shallow bedrock that destroys backhoe teeth &#8211; water pressure works',
      '<strong>Steep Grade Access</strong> &#8211; Our 600ft remote hose reaches hillside utility lines traditional equipment can&#8217;t access',
      '<strong>Railroad Corridor Work</strong> &#8211; Safe excavation along Norfolk Southern&#8217;s active rail lines through downtown',
      '<strong>Blue Ridge Parkway Area</strong> &#8211; Careful excavation near protected National Park Service lands',
      '<strong>Carilion Medical Campus</strong> &#8211; Precision utility work at Roanoke&#8217;s major healthcare hub'
    ],
    industriesH2: 'Roanoke Valley Industries We Serve',
    industries: [
      { emoji: '🚂', title: 'Railroad &amp; Transit', desc: 'Norfolk Southern rail corridor &amp; Amtrak station area projects' },
      { emoji: '🏥', title: 'Healthcare', desc: 'Carilion Clinic &amp; Roanoke Memorial Hospital campus work' },
      { emoji: '⛰️', title: 'Mountain Development', desc: 'Residential and commercial projects on Blue Ridge terrain' },
      { emoji: '🏭', title: 'Manufacturing', desc: 'Roanoke Valley industrial park utility installations' }
    ],
    areaH2: 'Roanoke Valley Areas We Cover',
    areaParagraph: 'We serve the City of Roanoke, Roanoke County, Salem, and Vinton. This includes downtown Roanoke, Grandin Village, South Roanoke, Wasena, Crystal Spring, Cave Spring, Hollins, Bonsack, and the Valley View area. We also cover projects along I-81, I-581, and the Blue Ridge Parkway corridor.',
    areaExtra: '<strong>Roanoke terrain reality:</strong> Roanoke Valley sits between the Blue Ridge Mountains and the Allegheny range. Excavation here means dealing with fractured bedrock, steep slopes, and mountain spring seepage. Standard mechanical digging is slow, dangerous, and often impossible on grade. Our hydro excavation and remote hose capability were built for exactly this kind of terrain.',
    nearbyLinks: '<a href="/locations/lynchburg/">Lynchburg</a> | <a href="/locations/fredericksburg/">Fredericksburg</a> | <a href="/locations/richmond/">Richmond</a>',
    footerH2: 'Roanoke Hydro Excavation &#8211; Mountain Tough',
    footerText: 'Roanoke&#8217;s mountain terrain and railroad infrastructure demand specialized excavation. Beach HydroVac brings coastal precision to the Blue Ridge.',
    yoastTitle: 'Hydro Excavation Roanoke VA | Mountain Terrain & Railroad Corridor',
    yoastDesc: 'Roanoke VA hydro excavation for rocky mountain soil, railroad corridors & Blue Ridge development. 600ft hose reach for steep terrain. Call 757-510-5220.',
    yoastKw: 'hydro excavation roanoke va'
  },
  'lynchburg': {
    id: 3485,
    h1: 'Hydro Excavation Services in Lynchburg, VA',
    subtitle: 'Non-destructive excavation for Lynchburg&#8217;s hillside terrain, Liberty University, and James River corridor',
    introH2: 'Lynchburg&#8217;s Hillside Hydro Excavation Specialists',
    introParagraph: 'Lynchburg is built on seven hills overlooking the James River, earning it the nickname "City of Seven Hills." This dramatic topography creates excavation challenges that flat-terrain contractors never face &#8211; steep slopes, gravity-fed utility lines, and hillside erosion concerns. Liberty University&#8217;s massive campus expansion adds even more underground infrastructure to navigate. Beach HydroVac&#8217;s remote excavation capability and non-destructive method are perfectly suited for Lynchburg&#8217;s unique terrain.',
    whyChooseH3: 'Why Lynchburg&#8217;s Terrain Demands Hydro Excavation',
    whyChooseItems: [
      '<strong>Seven Hills Expertise</strong> &#8211; Our remote hose system works on Lynchburg&#8217;s steep hillsides where backhoes can&#8217;t safely operate',
      '<strong>Liberty University Projects</strong> &#8211; Supporting LU&#8217;s ongoing campus expansion with safe utility excavation',
      '<strong>James River Corridor</strong> &#8211; Excavation along the flood-prone riverfront with high water table challenges',
      '<strong>Historic Downtown</strong> &#8211; Careful work in Lynchburg&#8217;s revitalized downtown with aging brick sewer lines',
      '<strong>Centra Health Campus</strong> &#8211; Precision utility excavation at Lynchburg&#8217;s hospital complex'
    ],
    industriesH2: 'Lynchburg Industries We Support',
    industries: [
      { emoji: '🎓', title: 'Higher Education', desc: 'Liberty University &amp; University of Lynchburg campus infrastructure' },
      { emoji: '🏥', title: 'Healthcare', desc: 'Centra Lynchburg General Hospital expansion projects' },
      { emoji: '🏭', title: 'Manufacturing', desc: 'BWX Technologies (BWXT) nuclear facility &amp; industrial utility work' },
      { emoji: '🏛️', title: 'Downtown Revival', desc: 'Lower Bluffwalk &amp; Riverfront revitalization utility projects' }
    ],
    areaH2: 'Lynchburg Area Communities We Serve',
    areaParagraph: 'We serve the City of Lynchburg, Campbell County, and Bedford County. This includes downtown Lynchburg, Boonsboro, Fort Hill, Rivermont, Forest, Timberlake, Wyndhurst, Liberty University&#8217;s campus area, and the Route 29 and Route 221 corridors. We also support projects in Bedford, Altavista, and Rustburg.',
    areaExtra: '<strong>Lynchburg hillside challenge:</strong> Lynchburg&#8217;s steep hills mean utility lines often run at steep angles, with gravity sewer lines following the terrain down to the James River. Trenching on these slopes is dangerous &#8211; equipment can slide, trenches can collapse, and erosion can undermine foundations. Hydro excavation eliminates slope instability risk while precisely exposing utilities at any angle.',
    nearbyLinks: '<a href="/locations/roanoke/">Roanoke</a> | <a href="/locations/richmond/">Richmond</a> | <a href="/locations/chesterfield/">Chesterfield</a>',
    footerH2: 'Lynchburg Hydro Excavation &#8211; Built for Hills',
    footerText: 'Lynchburg&#8217;s seven hills and James River corridor require excavation methods as unique as the terrain. Beach HydroVac delivers hillside precision.',
    yoastTitle: 'Hydro Excavation Lynchburg VA | Hillside Terrain & Liberty University',
    yoastDesc: 'Lynchburg VA hydro excavation for hilly terrain, Liberty University, James River corridor. Remote hose for steep slopes. Non-destructive. Call 757-510-5220.',
    yoastKw: 'hydro excavation lynchburg va'
  }
};

function buildPageContent(loc) {
  return `<div class="wp-block-cover alignfull" style="min-height:300px;aspect-ratio:unset;"><span aria-hidden="true" class="wp-block-cover__background has-deep-atlantic-background-color has-background-dim-100 has-background-dim"></span>
<div class="wp-block-cover__inner-container is-layout-flow wp-block-cover-is-layout-flow">
<h1 class="wp-block-heading has-text-align-center" style="font-size:3rem;font-weight:900">${loc.h1}</h1>
<p class="has-text-align-center" style="font-size:1.25rem">${loc.subtitle}</p>
<div class="wp-block-buttons is-content-justification-center is-layout-flex wp-block-buttons-is-layout-flex">
<div class="wp-block-button"><a class="wp-block-button__link has-warm-shoreline-background-color has-background wp-element-button" style="border-radius:9999px" href="tel:7575105220">Call 757-510-5220</a></div>
<div class="wp-block-button"><a class="wp-block-button__link has-safety-cyan-background-color has-background wp-element-button" style="border-radius:9999px" href="/contact/">Get Free Quote</a></div>
</div>
</div>
</div>
<div class="wp-block-group has-white-background-color has-background is-layout-constrained wp-block-group-is-layout-constrained" style="padding-top:4rem;padding-bottom:4rem">
<h2 class="wp-block-heading has-text-align-center has-deep-atlantic-color has-text-color" style="font-size:2.25rem;font-weight:800">${loc.introH2}</h2>
<p class="has-text-align-center" style="margin-bottom:2rem">${loc.introParagraph}</p>
<div class="wp-block-columns is-layout-flex wp-block-columns-is-layout-flex">
<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
<h3 class="wp-block-heading has-deep-atlantic-color has-text-color">${loc.whyChooseH3}</h3>
<ul class="wp-block-list">
${loc.whyChooseItems.map(item => `<li>${item}</li>`).join('\n')}
</ul>
</div>
<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
<h3 class="wp-block-heading has-deep-atlantic-color has-text-color">Our Services</h3>
<ul class="wp-block-list">
<li><a href="/services/hydro-excavation/">Hydro Excavation</a> &#8211; Non-destructive vacuum excavation</li>
<li><a href="/services/potholing/">Potholing &amp; Daylighting</a> &#8211; Utility location verification</li>
<li><a href="/services/slot-trenching/">Slot Trenching</a> &#8211; Precision trenches for cables</li>
<li><a href="/services/remote-excavation/">Remote Excavation</a> &#8211; 600ft hose reach capability</li>
<li><a href="/services/sue-level-a/">SUE Level A</a> &#8211; ASCE 38 compliant verification</li>
</ul>
</div>
</div>
</div>
<div class="wp-block-group has-background is-layout-constrained wp-block-group-is-layout-constrained" style="background:linear-gradient(135deg,rgb(0,65,106) 0%,rgb(39,174,253) 100%);padding-top:4rem;padding-bottom:4rem">
<h2 class="wp-block-heading has-text-align-center has-white-color has-text-color" style="font-size:2rem;font-weight:800">${loc.industriesH2}</h2>
<div class="wp-block-columns is-layout-flex wp-block-columns-is-layout-flex" style="margin-top:2rem">
${loc.industries.map(ind => `<div class="wp-block-column has-white-background-color has-background is-layout-flow wp-block-column-is-layout-flow" style="border-radius:12px;padding-top:1.5rem;padding-right:1.5rem;padding-bottom:1.5rem;padding-left:1.5rem">
<p style="font-size:2rem">${ind.emoji}</p>
<h4 class="wp-block-heading has-deep-atlantic-color has-text-color">${ind.title}</h4>
<p style="font-size:0.9rem">${ind.desc}</p>
</div>`).join('\n')}
</div>
</div>
<div class="wp-block-group has-base-background-color has-background is-layout-constrained wp-block-group-is-layout-constrained" style="padding-top:4rem;padding-bottom:4rem">
<h2 class="wp-block-heading has-text-align-center has-deep-atlantic-color has-text-color" style="font-size:2rem;font-weight:800">${loc.areaH2}</h2>
<p class="has-text-align-center">${loc.areaParagraph}</p>
<p class="has-text-align-center" style="margin-top:1rem">${loc.areaExtra}</p>
<div class="wp-block-buttons is-content-justification-center is-layout-flex wp-block-buttons-is-layout-flex" style="margin-top:2rem">
<div class="wp-block-button"><a class="wp-block-button__link has-deep-atlantic-background-color has-background wp-element-button" style="border-radius:9999px" href="/service-areas/">View All Service Areas</a></div>
</div>
</div>
<div class="wp-block-group has-white-background-color has-background is-layout-constrained wp-block-group-is-layout-constrained" style="padding-top:4rem;padding-bottom:4rem">
<h2 class="wp-block-heading has-text-align-center has-deep-atlantic-color has-text-color" style="font-size:2rem;font-weight:800">Get Your Free Quote</h2>
<p class="has-text-align-center" style="margin-bottom:2rem">Ready to start your project? Contact Beach Hydrovac today for a free, no-obligation quote. We respond quickly and provide competitive pricing for all hydro excavation services.</p>
<div class="wp-block-columns is-layout-flex wp-block-columns-is-layout-flex">
<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style="border-color:#e5e7eb;border-width:1px;border-radius:12px;padding-top:2rem;padding-right:2rem;padding-bottom:2rem;padding-left:2rem">
<h4 class="wp-block-heading has-text-align-center has-deep-atlantic-color has-text-color">&#x1f4de; Call Us</h4>
<p class="has-text-align-center"><a href="tel:7575105220"><strong>757-510-5220</strong></a></p>
</div>
<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style="border-color:#e5e7eb;border-width:1px;border-radius:12px;padding-top:2rem;padding-right:2rem;padding-bottom:2rem;padding-left:2rem">
<h4 class="wp-block-heading has-text-align-center has-deep-atlantic-color has-text-color">&#x2709;&#xfe0f; Email Us</h4>
<p class="has-text-align-center"><a href="mailto:johnw@beachhydrovac.com">johnw@beachhydrovac.com</a></p>
</div>
</div>
</div>

<div class="wp-block-group has-background is-layout-constrained wp-block-group-is-layout-constrained" style="background-color:#f8f9fa;padding-top:3rem;padding-bottom:3rem;border-top:3px solid #00416a">
<h2 class="wp-block-heading has-text-align-center" style="font-size:1.75rem;font-weight:800;color:#00416a">${loc.footerH2}</h2>
<p class="has-text-align-center" style="font-size:1.1rem;margin-bottom:1.5rem">${loc.footerText}</p>
<div class="wp-block-columns is-layout-flex wp-block-columns-is-layout-flex" style="max-width:800px;margin:0 auto">
<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
<h3 class="wp-block-heading" style="font-size:1.25rem;color:#00416a">Contact Us</h3>
<p><strong>Beach HydroVac</strong><br>A Division of AIM Locating<br>2216 Mansion Cross Ln<br>Virginia Beach, VA 23456<br><strong>Direct:</strong> <a href="tel:7575105220">757-510-5220</a><br><strong>Email:</strong> <a href="mailto:johnw@beachhydrovac.com">johnw@beachhydrovac.com</a></p>
</div>
<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
<h3 class="wp-block-heading" style="font-size:1.25rem;color:#00416a">Nearby Service Areas</h3>
<p>${loc.nearbyLinks}</p>
<p style="margin-top:1rem"><a href="/services/hydro-excavation/" style="font-weight:700">All Services</a> | <a href="/service-areas/" style="font-weight:700">All Locations</a> | <a href="/contact/" style="font-weight:700">Get Free Quote</a></p>
</div>
</div>
</div>`;
}

async function main() {
  console.log('REWRITING ALL LOCATION PAGES WITH UNIQUE CONTENT');
  console.log('=================================================\n');

  let success = 0;
  let failed = 0;

  for (const [slug, loc] of Object.entries(locations)) {
    const content = buildPageContent(loc);

    const resp = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${loc.id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        content,
        meta: {
          _yoast_wpseo_title: loc.yoastTitle,
          _yoast_wpseo_metadesc: loc.yoastDesc,
          _yoast_wpseo_focuskw: loc.yoastKw
        }
      })
    });

    if (resp.ok) {
      success++;
      console.log(`OK  /${slug} (ID:${loc.id}) - unique content deployed`);
    } else {
      failed++;
      console.log(`FAIL /${slug} (ID:${loc.id}) - ${resp.status}`);
      const err = await resp.text();
      console.log(`  ${err.substring(0, 200)}`);
    }
  }

  console.log(`\nDone: ${success} updated, ${failed} failed`);
  console.log('\nEach page now has:');
  console.log('  - Unique intro paragraph with city-specific details');
  console.log('  - Unique "Why Choose" section with local reasons');
  console.log('  - Unique industries section for each city');
  console.log('  - Unique neighborhoods/areas covered');
  console.log('  - Unique soil/terrain/excavation notes');
  console.log('  - Unique Yoast meta titles, descriptions, and focus keywords');
  console.log('  - Same visual design/layout across all pages');
}

main().catch(console.error);
