import 'dotenv/config';
import fetch from 'node-fetch';

/**
 * BeachHydrovac Technical SEO Implementation
 *
 * This script adds comprehensive technical SEO to the WordPress site:
 * - LocalBusiness Schema (JSON-LD)
 * - Service Schema for each service
 * - FAQ Schema for common questions
 * - Organization Schema
 * - BreadcrumbList Schema
 * - WebSite Schema with SearchAction
 * - Article Schema for blog posts
 * - Open Graph meta tags
 * - Twitter Card meta tags
 * - Canonical URL support
 * - Meta robots optimization
 */

const WP_URL = 'https://beachhydrovac.com';
const WP_USER = process.env.BEACH_HYDROVAC_WP_USER;
const WP_APP_PASSWORD = process.env.BEACH_HYDROVAC_WP_PASSWORD;

const headers = {
  'Authorization': 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64'),
  'Content-Type': 'application/json'
};

// ============================================================
// SCHEMA DEFINITIONS
// ============================================================

// Company Information (used across multiple schemas)
const COMPANY_INFO = {
  name: 'Beach Hydrovac',
  legalName: 'Beach Hydrovac LLC',
  description: 'Veteran-owned hydro-excavation company providing precision vacuum excavation services including potholing, daylighting, slot trenching, and SUE Level A verification across Virginia, North Carolina, Maryland, and Delaware.',
  url: 'https://beachhydrovac.com',
  logo: 'https://beachhydrovac.com/wp-content/uploads/beach-hydrovac-logo.png',
  image: 'https://beachhydrovac.com/wp-content/uploads/hero-beach-truck.jpg',
  telephone: '+1-757-785-5177',
  email: 'info@beachhydrovac.com',
  foundingDate: '2023',
  founder: {
    '@type': 'Person',
    name: 'Beach Hydrovac Team'
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Virginia Beach',
    addressLocality: 'Virginia Beach',
    addressRegion: 'VA',
    postalCode: '23456',
    addressCountry: 'US'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '36.8529',
    longitude: '-75.9780'
  },
  areaServed: [
    { '@type': 'State', name: 'Virginia' },
    { '@type': 'State', name: 'North Carolina' },
    { '@type': 'State', name: 'Maryland' },
    { '@type': 'State', name: 'Delaware' }
  ],
  priceRange: '$$',
  openingHours: 'Mo-Fr 07:00-18:00',
  sameAs: [
    // Add social media URLs when available
    // 'https://www.facebook.com/beachhydrovac',
    // 'https://www.linkedin.com/company/beachhydrovac'
  ]
};

// Services offered
const SERVICES = [
  {
    name: 'Potholing / Daylighting Services',
    description: 'Safe exposure of underground utilities using high-pressure water and vacuum technology. Achieves SUE Level A verification (highest accuracy), prevents costly utility strikes, and provides legally defensible documentation.',
    url: 'https://beachhydrovac.com/services/#potholing',
    serviceType: 'Hydro Excavation',
    provider: COMPANY_INFO.name,
    areaServed: 'Virginia, North Carolina, Maryland, Delaware'
  },
  {
    name: 'Slot Trenching Services',
    description: 'Creating narrow, precise trenches for pipes, cables, or conduit using hydro excavation. Minimal disruption to existing infrastructure with significantly less backfill material needed.',
    url: 'https://beachhydrovac.com/services/#slot-trenching',
    serviceType: 'Precision Trenching',
    provider: COMPANY_INFO.name,
    areaServed: 'Virginia, North Carolina, Maryland, Delaware'
  },
  {
    name: 'Remote Excavation Services',
    description: 'Extended 600ft hose reach to excavate in restricted-access areas. Perfect for residential areas, historic sites, landscaped properties, and tight spaces where traditional equipment cannot reach.',
    url: 'https://beachhydrovac.com/services/#remote-excavation',
    serviceType: 'Remote Access Excavation',
    provider: COMPANY_INFO.name,
    areaServed: 'Virginia, North Carolina, Maryland, Delaware'
  },
  {
    name: 'SUE Level A Verification',
    description: 'Highest level of subsurface utility engineering accuracy through physical exposure and measurement. ASCE standard for design-stage projects with legally defensible documentation.',
    url: 'https://beachhydrovac.com/services/#sue-level-a',
    serviceType: 'Utility Engineering Verification',
    provider: COMPANY_INFO.name,
    areaServed: 'Virginia, North Carolina, Maryland, Delaware'
  }
];

// FAQ Items for FAQ Schema
const FAQ_ITEMS = [
  {
    question: 'What is hydro excavation?',
    answer: 'Hydro excavation (also called vacuum excavation or hydrovac) is a non-destructive digging method that uses pressurized water to break up soil and a powerful vacuum to remove the debris. This technique safely exposes underground utilities without risk of damage from traditional mechanical excavation methods.'
  },
  {
    question: 'What areas do you serve?',
    answer: 'Beach Hydrovac provides hydro-excavation services throughout Virginia, North Carolina, Maryland, and Delaware. We are based in Virginia Beach and serve the entire Mid-Atlantic region including Hampton Roads, Norfolk, Chesapeake, Richmond, and surrounding areas.'
  },
  {
    question: 'What is SUE Level A verification?',
    answer: 'SUE Level A is the highest accuracy level in Subsurface Utility Engineering as defined by ASCE standards. It involves physically exposing utilities through non-destructive excavation (like hydrovac) to obtain precise horizontal and vertical location data. This is required for critical infrastructure projects and provides legally defensible documentation.'
  },
  {
    question: 'How far can your equipment reach?',
    answer: 'Our hydrovac trucks feature an extended 600-foot hose reach, allowing us to excavate in restricted-access areas where traditional equipment cannot go. This includes behind buildings, in landscaped areas, on slopes, and in tight urban spaces.'
  },
  {
    question: 'What industries do you serve?',
    answer: 'We serve electrical contractors, civil contractors, water and sewer utilities (including HRSD), telecom companies, municipalities, and engineering firms. Our precision excavation services are trusted for fiber optic installation, power line work, utility upgrades, and infrastructure verification projects.'
  },
  {
    question: 'Is hydro excavation safer than traditional excavation?',
    answer: 'Yes, hydro excavation is significantly safer than mechanical excavation. It eliminates the risk of utility strikes that can cause injuries, service outages, and expensive repairs. The non-destructive nature protects gas lines, electrical cables, fiber optics, and water mains during excavation.'
  },
  {
    question: 'Can you work in cold weather?',
    answer: 'Yes, hydro excavation works effectively in cold weather and frozen ground conditions when traditional excavation methods struggle. Our heated water systems can break through frost and frozen soil, making it ideal for year-round utility work in the Mid-Atlantic region.'
  },
  {
    question: 'How do I get a quote?',
    answer: 'Contact us at 757-785-5177 or email info@beachhydrovac.com for a free quote. We will discuss your project requirements, timeline, and provide competitive pricing. As a veteran-owned local business, we pride ourselves on responsive service and fair pricing.'
  }
];

// ============================================================
// SCHEMA GENERATORS
// ============================================================

function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${COMPANY_INFO.url}/#organization`,
    name: COMPANY_INFO.name,
    legalName: COMPANY_INFO.legalName,
    description: COMPANY_INFO.description,
    url: COMPANY_INFO.url,
    logo: {
      '@type': 'ImageObject',
      url: COMPANY_INFO.logo,
      width: 300,
      height: 100
    },
    image: COMPANY_INFO.image,
    telephone: COMPANY_INFO.telephone,
    email: COMPANY_INFO.email,
    foundingDate: COMPANY_INFO.foundingDate,
    founder: COMPANY_INFO.founder,
    address: COMPANY_INFO.address,
    geo: COMPANY_INFO.geo,
    areaServed: COMPANY_INFO.areaServed,
    priceRange: COMPANY_INFO.priceRange,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00'
      }
    ],
    sameAs: COMPANY_INFO.sameAs,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Hydro-Excavation Services',
      itemListElement: SERVICES.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.description
        }
      }))
    }
  };
}

function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${COMPANY_INFO.url}/#organization`,
    name: COMPANY_INFO.name,
    legalName: COMPANY_INFO.legalName,
    url: COMPANY_INFO.url,
    logo: COMPANY_INFO.logo,
    description: COMPANY_INFO.description,
    telephone: COMPANY_INFO.telephone,
    email: COMPANY_INFO.email,
    address: COMPANY_INFO.address,
    areaServed: COMPANY_INFO.areaServed,
    sameAs: COMPANY_INFO.sameAs,
    foundingDate: COMPANY_INFO.foundingDate,
    knowsAbout: [
      'Hydro Excavation',
      'Vacuum Excavation',
      'Potholing',
      'Daylighting',
      'Slot Trenching',
      'SUE Level A Verification',
      'Utility Locating',
      'Non-Destructive Digging'
    ]
  };
}

function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${COMPANY_INFO.url}/#website`,
    url: COMPANY_INFO.url,
    name: COMPANY_INFO.name,
    description: COMPANY_INFO.description,
    publisher: {
      '@id': `${COMPANY_INFO.url}/#organization`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${COMPANY_INFO.url}/?s={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    inLanguage: 'en-US'
  };
}

function generateServiceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': service.url,
    name: service.name,
    description: service.description,
    serviceType: service.serviceType,
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${COMPANY_INFO.url}/#organization`,
      name: COMPANY_INFO.name
    },
    areaServed: COMPANY_INFO.areaServed,
    url: service.url
  };
}

function generateFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${COMPANY_INFO.url}/#faq`,
    mainEntity: FAQ_ITEMS.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

function generateArticleSchema(article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image || COMPANY_INFO.image,
    author: {
      '@type': 'Organization',
      name: COMPANY_INFO.name
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${COMPANY_INFO.url}/#organization`,
      name: COMPANY_INFO.name,
      logo: {
        '@type': 'ImageObject',
        url: COMPANY_INFO.logo
      }
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url
    }
  };
}

// ============================================================
// PHP CODE GENERATOR FOR CHILD THEME
// ============================================================

function generatePHPCode() {
  const localBusinessJson = JSON.stringify(generateLocalBusinessSchema(), null, 2);
  const organizationJson = JSON.stringify(generateOrganizationSchema(), null, 2);
  const websiteJson = JSON.stringify(generateWebSiteSchema(), null, 2);
  const faqJson = JSON.stringify(generateFAQSchema(), null, 2);
  const servicesJson = JSON.stringify(SERVICES.map(s => generateServiceSchema(s)), null, 2);

  return `
// ============================================================
// BEACH HYDROVAC TECHNICAL SEO
// Added by Technical SEO Script
// ============================================================

/**
 * Add comprehensive Schema.org structured data
 */
function beachhydrovac_add_schema_markup() {
    // Only add on frontend, not admin
    if (is_admin()) return;

    $schemas = array();

    // Always add Organization and WebSite schema
    $organization_schema = ${organizationJson.split('\n').map((line, i) => i === 0 ? line : '    ' + line).join('\n')};

    $website_schema = ${websiteJson.split('\n').map((line, i) => i === 0 ? line : '    ' + line).join('\n')};

    $schemas[] = $organization_schema;
    $schemas[] = $website_schema;

    // Add LocalBusiness schema on homepage and contact page
    if (is_front_page() || is_page('contact')) {
        $local_business_schema = ${localBusinessJson.split('\n').map((line, i) => i === 0 ? line : '        ' + line).join('\n')};

        $schemas[] = $local_business_schema;
    }

    // Add Service schemas on services page
    if (is_page('services') || is_front_page()) {
        $service_schemas = ${servicesJson.split('\n').map((line, i) => i === 0 ? line : '        ' + line).join('\n')};

        foreach ($service_schemas as $service_schema) {
            $schemas[] = $service_schema;
        }
    }

    // Add FAQ schema on homepage and services page
    if (is_front_page() || is_page('services') || is_page('contact')) {
        $faq_schema = ${faqJson.split('\n').map((line, i) => i === 0 ? line : '        ' + line).join('\n')};

        $schemas[] = $faq_schema;
    }

    // Add Breadcrumb schema (except homepage)
    if (!is_front_page()) {
        $breadcrumb_items = array(
            array('name' => 'Home', 'url' => home_url('/'))
        );

        if (is_page()) {
            $breadcrumb_items[] = array('name' => get_the_title(), 'url' => get_permalink());
        } elseif (is_single()) {
            $breadcrumb_items[] = array('name' => 'Blog', 'url' => home_url('/blog/'));
            $breadcrumb_items[] = array('name' => get_the_title(), 'url' => get_permalink());
        }

        $breadcrumb_schema = array(
            '@context' => 'https://schema.org',
            '@type' => 'BreadcrumbList',
            'itemListElement' => array()
        );

        foreach ($breadcrumb_items as $index => $item) {
            $breadcrumb_schema['itemListElement'][] = array(
                '@type' => 'ListItem',
                'position' => $index + 1,
                'name' => $item['name'],
                'item' => $item['url']
            );
        }

        $schemas[] = $breadcrumb_schema;
    }

    // Add Article schema for blog posts
    if (is_single() && get_post_type() === 'post') {
        $article_schema = array(
            '@context' => 'https://schema.org',
            '@type' => 'Article',
            'headline' => get_the_title(),
            'description' => get_the_excerpt() ?: wp_trim_words(get_the_content(), 30),
            'image' => get_the_post_thumbnail_url(get_the_ID(), 'full') ?: '${COMPANY_INFO.image}',
            'author' => array(
                '@type' => 'Organization',
                'name' => '${COMPANY_INFO.name}'
            ),
            'publisher' => array(
                '@type' => 'Organization',
                '@id' => '${COMPANY_INFO.url}/#organization',
                'name' => '${COMPANY_INFO.name}',
                'logo' => array(
                    '@type' => 'ImageObject',
                    'url' => '${COMPANY_INFO.logo}'
                )
            ),
            'datePublished' => get_the_date('c'),
            'dateModified' => get_the_modified_date('c'),
            'mainEntityOfPage' => array(
                '@type' => 'WebPage',
                '@id' => get_permalink()
            )
        );

        $schemas[] = $article_schema;
    }

    // Output all schemas
    foreach ($schemas as $schema) {
        echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>' . "\\n";
    }
}
add_action('wp_head', 'beachhydrovac_add_schema_markup', 5);

/**
 * Add Open Graph and Twitter Card meta tags
 */
function beachhydrovac_add_social_meta_tags() {
    if (is_admin()) return;

    $site_name = '${COMPANY_INFO.name}';
    $default_image = '${COMPANY_INFO.image}';
    $twitter_handle = '@beachhydrovac'; // Update when available

    // Get page-specific data
    if (is_front_page()) {
        $title = '${COMPANY_INFO.name} | Veteran-Owned Hydro-Excavation Services | Virginia Beach';
        $description = '${COMPANY_INFO.description}';
        $url = home_url('/');
        $type = 'website';
    } elseif (is_page() || is_single()) {
        $title = get_the_title() . ' | ' . $site_name;
        $description = get_the_excerpt() ?: wp_trim_words(strip_tags(get_the_content()), 30);
        $url = get_permalink();
        $type = is_single() ? 'article' : 'website';
    } else {
        $title = wp_title('|', false, 'right') . $site_name;
        $description = get_bloginfo('description');
        $url = home_url($_SERVER['REQUEST_URI']);
        $type = 'website';
    }

    $image = get_the_post_thumbnail_url(get_the_ID(), 'large') ?: $default_image;

    // Open Graph tags
    echo '<meta property="og:site_name" content="' . esc_attr($site_name) . '" />' . "\\n";
    echo '<meta property="og:title" content="' . esc_attr($title) . '" />' . "\\n";
    echo '<meta property="og:description" content="' . esc_attr($description) . '" />' . "\\n";
    echo '<meta property="og:url" content="' . esc_url($url) . '" />' . "\\n";
    echo '<meta property="og:type" content="' . esc_attr($type) . '" />' . "\\n";
    echo '<meta property="og:image" content="' . esc_url($image) . '" />' . "\\n";
    echo '<meta property="og:image:width" content="1200" />' . "\\n";
    echo '<meta property="og:image:height" content="630" />' . "\\n";
    echo '<meta property="og:locale" content="en_US" />' . "\\n";

    // Twitter Card tags
    echo '<meta name="twitter:card" content="summary_large_image" />' . "\\n";
    echo '<meta name="twitter:title" content="' . esc_attr($title) . '" />' . "\\n";
    echo '<meta name="twitter:description" content="' . esc_attr($description) . '" />' . "\\n";
    echo '<meta name="twitter:image" content="' . esc_url($image) . '" />' . "\\n";
    // echo '<meta name="twitter:site" content="' . esc_attr($twitter_handle) . '" />' . "\\n"; // Uncomment when Twitter handle is set up

    // Article-specific meta
    if (is_single() && get_post_type() === 'post') {
        echo '<meta property="article:published_time" content="' . get_the_date('c') . '" />' . "\\n";
        echo '<meta property="article:modified_time" content="' . get_the_modified_date('c') . '" />' . "\\n";
        echo '<meta property="article:author" content="' . esc_attr($site_name) . '" />' . "\\n";
    }
}
add_action('wp_head', 'beachhydrovac_add_social_meta_tags', 4);

/**
 * Add canonical URL
 */
function beachhydrovac_add_canonical_url() {
    if (is_admin()) return;

    // Don't add if Yoast or other SEO plugin is active
    if (defined('WPSEO_VERSION')) return;

    if (is_front_page()) {
        $canonical = home_url('/');
    } elseif (is_singular()) {
        $canonical = get_permalink();
    } elseif (is_archive()) {
        $canonical = get_post_type_archive_link(get_post_type());
    } else {
        $canonical = home_url($_SERVER['REQUEST_URI']);
    }

    // Remove query strings for canonical
    $canonical = strtok($canonical, '?');

    echo '<link rel="canonical" href="' . esc_url($canonical) . '" />' . "\\n";
}
add_action('wp_head', 'beachhydrovac_add_canonical_url', 3);

/**
 * Add geo meta tags for local SEO
 */
function beachhydrovac_add_geo_meta_tags() {
    if (is_admin()) return;

    echo '<meta name="geo.region" content="US-VA" />' . "\\n";
    echo '<meta name="geo.placename" content="Virginia Beach" />' . "\\n";
    echo '<meta name="geo.position" content="${COMPANY_INFO.geo.latitude};${COMPANY_INFO.geo.longitude}" />' . "\\n";
    echo '<meta name="ICBM" content="${COMPANY_INFO.geo.latitude}, ${COMPANY_INFO.geo.longitude}" />' . "\\n";
}
add_action('wp_head', 'beachhydrovac_add_geo_meta_tags', 2);

/**
 * Optimize title tag
 */
function beachhydrovac_custom_title($title) {
    if (is_front_page()) {
        return '${COMPANY_INFO.name} | Veteran-Owned Hydro-Excavation Services | Virginia Beach';
    }
    return $title;
}
add_filter('pre_get_document_title', 'beachhydrovac_custom_title', 20);

/**
 * Add meta description
 */
function beachhydrovac_add_meta_description() {
    if (is_admin()) return;

    // Don't add if Yoast or other SEO plugin is active
    if (defined('WPSEO_VERSION')) return;

    $description = '';

    if (is_front_page()) {
        $description = '${COMPANY_INFO.description}';
    } elseif (is_page('services')) {
        $description = 'Professional hydro-excavation services including potholing, daylighting, slot trenching, and SUE Level A verification. Serving Virginia, NC, MD, DE.';
    } elseif (is_page('about')) {
        $description = 'Beach Hydrovac is a veteran-owned hydro-excavation company providing safe, precise vacuum excavation services. Based in Virginia Beach, serving the Mid-Atlantic.';
    } elseif (is_page('contact')) {
        $description = 'Contact Beach Hydrovac for a free quote. Call 757-785-5177 or email info@beachhydrovac.com. Serving Virginia, North Carolina, Maryland, and Delaware.';
    } elseif (is_singular()) {
        $description = get_the_excerpt() ?: wp_trim_words(strip_tags(get_the_content()), 30);
    }

    if ($description) {
        echo '<meta name="description" content="' . esc_attr($description) . '" />' . "\\n";
    }
}
add_action('wp_head', 'beachhydrovac_add_meta_description', 1);

/**
 * Add robots meta tag
 */
function beachhydrovac_add_robots_meta() {
    if (is_admin()) return;

    // Don't add if Yoast or other SEO plugin is active
    if (defined('WPSEO_VERSION')) return;

    $robots = 'index, follow';

    // Noindex specific pages
    if (is_search() || is_404() || is_attachment()) {
        $robots = 'noindex, follow';
    }

    // Add max-snippet and max-image-preview
    $robots .= ', max-snippet:-1, max-image-preview:large, max-video-preview:-1';

    echo '<meta name="robots" content="' . esc_attr($robots) . '" />' . "\\n";
}
add_action('wp_head', 'beachhydrovac_add_robots_meta', 1);

/**
 * Add preconnect for performance
 */
function beachhydrovac_add_preconnect() {
    echo '<link rel="preconnect" href="https://fonts.googleapis.com" />' . "\\n";
    echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />' . "\\n";
}
add_action('wp_head', 'beachhydrovac_add_preconnect', 0);

/**
 * Add theme color for mobile browsers
 */
function beachhydrovac_add_theme_color() {
    echo '<meta name="theme-color" content="#1a365d" />' . "\\n";
    echo '<meta name="msapplication-navbutton-color" content="#1a365d" />' . "\\n";
    echo '<meta name="apple-mobile-web-app-status-bar-style" content="#1a365d" />' . "\\n";
}
add_action('wp_head', 'beachhydrovac_add_theme_color', 0);

// ============================================================
// END BEACH HYDROVAC TECHNICAL SEO
// ============================================================
`;
}

// ============================================================
// WORDPRESS API FUNCTIONS
// ============================================================

async function getExistingPages() {
  try {
    const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages?per_page=100`, { headers });
    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (error) {
    console.error('Error fetching pages:', error.message);
    return [];
  }
}

async function getChildThemeFunctions() {
  try {
    // Try to get current functions.php content via a custom endpoint
    // This would need a plugin or direct file access
    console.log('Note: To update functions.php, you need to:');
    console.log('1. Access WordPress admin or');
    console.log('2. Use Hostinger file manager or');
    console.log('3. FTP/SFTP access');
    return null;
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

// ============================================================
// MAIN EXECUTION
// ============================================================

async function main() {
  console.log('==========================================');
  console.log('Beach Hydrovac Technical SEO Generator');
  console.log('==========================================\n');

  // Generate the PHP code
  const phpCode = generatePHPCode();

  console.log('Generated Technical SEO PHP code for WordPress child theme.\n');
  console.log('==========================================');
  console.log('INSTALLATION INSTRUCTIONS');
  console.log('==========================================\n');

  console.log('Option 1: Via WordPress Admin');
  console.log('------------------------------');
  console.log('1. Go to: Appearance → Theme File Editor');
  console.log('2. Select "BeachHydrovac Child" theme');
  console.log('3. Open functions.php');
  console.log('4. Add the generated code at the end');
  console.log('5. Click "Update File"\n');

  console.log('Option 2: Via Hostinger File Manager');
  console.log('------------------------------------');
  console.log('1. Login to Hostinger hPanel');
  console.log('2. Go to File Manager');
  console.log('3. Navigate to: wp-content/themes/beachhydrovac-child/');
  console.log('4. Edit functions.php');
  console.log('5. Add the generated code at the end');
  console.log('6. Save the file\n');

  console.log('==========================================');
  console.log('GENERATED PHP CODE');
  console.log('==========================================\n');

  console.log(phpCode);

  console.log('\n==========================================');
  console.log('SCHEMA VALIDATION');
  console.log('==========================================\n');

  console.log('After installation, validate your schema at:');
  console.log('• Google Rich Results Test: https://search.google.com/test/rich-results');
  console.log('• Schema.org Validator: https://validator.schema.org/');
  console.log('• Test URL: https://beachhydrovac.com\n');

  console.log('==========================================');
  console.log('SCHEMAS INCLUDED');
  console.log('==========================================\n');

  console.log('✅ LocalBusiness Schema (homepage, contact)');
  console.log('✅ Organization Schema (all pages)');
  console.log('✅ WebSite Schema with SearchAction (all pages)');
  console.log('✅ Service Schema x4 (services page, homepage)');
  console.log('✅ FAQ Schema with 8 Q&As (homepage, services, contact)');
  console.log('✅ BreadcrumbList Schema (all pages except homepage)');
  console.log('✅ Article Schema (blog posts)');
  console.log('✅ Open Graph meta tags (all pages)');
  console.log('✅ Twitter Card meta tags (all pages)');
  console.log('✅ Canonical URLs (all pages)');
  console.log('✅ Meta descriptions (all pages)');
  console.log('✅ Geo meta tags for local SEO');
  console.log('✅ Robots meta optimization');
  console.log('✅ Theme color for mobile');
  console.log('✅ Preconnect for performance\n');

  // Save the PHP code to a file
  const fs = await import('fs');
  fs.writeFileSync('./beachhydrovac-technical-seo.php', '<?php\n' + phpCode, 'utf-8');
  console.log('✅ PHP code saved to: beachhydrovac-technical-seo.php');
  console.log('   Copy this content to your functions.php file\n');
}

main().catch(console.error);
