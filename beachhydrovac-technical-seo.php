<?php
/**
 * Beach Hydrovac Technical SEO
 *
 * Copy this entire file content and paste it at the end of your
 * child theme's functions.php file.
 *
 * Location: wp-content/themes/beachhydrovac-child/functions.php
 *
 * This adds comprehensive technical SEO including:
 * - LocalBusiness Schema
 * - Organization Schema
 * - WebSite Schema with SearchAction
 * - Service Schema (4 services)
 * - FAQ Schema (8 Q&As)
 * - BreadcrumbList Schema
 * - Article Schema (for blog posts)
 * - Open Graph meta tags
 * - Twitter Card meta tags
 * - Canonical URLs
 * - Meta descriptions
 * - Geo meta tags
 * - Robots optimization
 * - Performance preconnects
 */

// ============================================================
// BEACH HYDROVAC TECHNICAL SEO - START
// ============================================================

/**
 * Company Information Constants
 */
if (!defined('BHV_COMPANY_NAME')) {
    define('BHV_COMPANY_NAME', 'Beach Hydrovac');
    define('BHV_COMPANY_LEGAL', 'Beach Hydrovac LLC');
    define('BHV_COMPANY_URL', 'https://beachhydrovac.com');
    define('BHV_COMPANY_LOGO', 'https://beachhydrovac.com/wp-content/uploads/beach-hydrovac-logo.png');
    define('BHV_COMPANY_IMAGE', 'https://beachhydrovac.com/wp-content/uploads/hero-beach-truck.jpg');
    define('BHV_COMPANY_PHONE', '+1-757-785-5177');
    define('BHV_COMPANY_EMAIL', 'info@beachhydrovac.com');
    define('BHV_COMPANY_DESCRIPTION', 'Veteran-owned hydro-excavation company providing precision vacuum excavation services including potholing, daylighting, slot trenching, and SUE Level A verification across Virginia, North Carolina, Maryland, and Delaware.');
}

/**
 * Add comprehensive Schema.org structured data
 */
function beachhydrovac_add_schema_markup() {
    if (is_admin()) return;

    $schemas = array();

    // Organization Schema (all pages)
    $organization_schema = array(
        '@context' => 'https://schema.org',
        '@type' => 'Organization',
        '@id' => BHV_COMPANY_URL . '/#organization',
        'name' => BHV_COMPANY_NAME,
        'legalName' => BHV_COMPANY_LEGAL,
        'url' => BHV_COMPANY_URL,
        'logo' => BHV_COMPANY_LOGO,
        'description' => BHV_COMPANY_DESCRIPTION,
        'telephone' => BHV_COMPANY_PHONE,
        'email' => BHV_COMPANY_EMAIL,
        'address' => array(
            '@type' => 'PostalAddress',
            'addressLocality' => 'Norfolk',
            'addressRegion' => 'VA',
            'addressCountry' => 'US'
        ),
        'areaServed' => array(
            array('@type' => 'State', 'name' => 'Virginia'),
            array('@type' => 'State', 'name' => 'North Carolina'),
            array('@type' => 'State', 'name' => 'Maryland'),
            array('@type' => 'State', 'name' => 'Delaware')
        ),
        'foundingDate' => '2023',
        'knowsAbout' => array(
            'Hydro Excavation',
            'Vacuum Excavation',
            'Potholing',
            'Daylighting',
            'Slot Trenching',
            'SUE Level A Verification',
            'Utility Locating',
            'Non-Destructive Digging'
        )
    );
    $schemas[] = $organization_schema;

    // WebSite Schema (all pages)
    $website_schema = array(
        '@context' => 'https://schema.org',
        '@type' => 'WebSite',
        '@id' => BHV_COMPANY_URL . '/#website',
        'url' => BHV_COMPANY_URL,
        'name' => BHV_COMPANY_NAME,
        'description' => BHV_COMPANY_DESCRIPTION,
        'publisher' => array(
            '@id' => BHV_COMPANY_URL . '/#organization'
        ),
        'potentialAction' => array(
            '@type' => 'SearchAction',
            'target' => array(
                '@type' => 'EntryPoint',
                'urlTemplate' => BHV_COMPANY_URL . '/?s={search_term_string}'
            ),
            'query-input' => 'required name=search_term_string'
        ),
        'inLanguage' => 'en-US'
    );
    $schemas[] = $website_schema;

    // LocalBusiness Schema (homepage and contact)
    if (is_front_page() || is_page('contact')) {
        $local_business_schema = array(
            '@context' => 'https://schema.org',
            '@type' => 'LocalBusiness',
            '@id' => BHV_COMPANY_URL . '/#localbusiness',
            'name' => BHV_COMPANY_NAME,
            'legalName' => BHV_COMPANY_LEGAL,
            'description' => BHV_COMPANY_DESCRIPTION,
            'url' => BHV_COMPANY_URL,
            'logo' => array(
                '@type' => 'ImageObject',
                'url' => BHV_COMPANY_LOGO,
                'width' => 300,
                'height' => 100
            ),
            'image' => BHV_COMPANY_IMAGE,
            'telephone' => BHV_COMPANY_PHONE,
            'email' => BHV_COMPANY_EMAIL,
            'foundingDate' => '2023',
            'founder' => array(
                '@type' => 'Person',
                'name' => 'Beach Hydrovac Team'
            ),
            'address' => array(
                '@type' => 'PostalAddress',
                'addressLocality' => 'Norfolk',
                'addressRegion' => 'VA',
                'addressCountry' => 'US'
            ),
            'geo' => array(
                '@type' => 'GeoCoordinates',
                'latitude' => '36.8508',
                'longitude' => '-76.2859'
            ),
            'areaServed' => array(
                array('@type' => 'State', 'name' => 'Virginia'),
                array('@type' => 'State', 'name' => 'North Carolina'),
                array('@type' => 'State', 'name' => 'Maryland'),
                array('@type' => 'State', 'name' => 'Delaware')
            ),
            'priceRange' => '$$',
            'openingHoursSpecification' => array(
                array(
                    '@type' => 'OpeningHoursSpecification',
                    'dayOfWeek' => array('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'),
                    'opens' => '07:00',
                    'closes' => '18:00'
                )
            ),
            'hasOfferCatalog' => array(
                '@type' => 'OfferCatalog',
                'name' => 'Hydro-Excavation Services',
                'itemListElement' => array(
                    array(
                        '@type' => 'Offer',
                        'itemOffered' => array(
                            '@type' => 'Service',
                            'name' => 'Potholing / Daylighting Services',
                            'description' => 'Safe exposure of underground utilities using high-pressure water and vacuum technology.'
                        )
                    ),
                    array(
                        '@type' => 'Offer',
                        'itemOffered' => array(
                            '@type' => 'Service',
                            'name' => 'Slot Trenching Services',
                            'description' => 'Creating narrow, precise trenches for pipes, cables, or conduit using hydro excavation.'
                        )
                    ),
                    array(
                        '@type' => 'Offer',
                        'itemOffered' => array(
                            '@type' => 'Service',
                            'name' => 'Remote Excavation Services',
                            'description' => 'Extended 600ft hose reach to excavate in restricted-access areas.'
                        )
                    ),
                    array(
                        '@type' => 'Offer',
                        'itemOffered' => array(
                            '@type' => 'Service',
                            'name' => 'SUE Level A Verification',
                            'description' => 'Highest level of subsurface utility engineering accuracy through physical exposure.'
                        )
                    )
                )
            )
        );
        $schemas[] = $local_business_schema;
    }

    // Service Schemas (services page and homepage)
    if (is_page('services') || is_front_page()) {
        $services = array(
            array(
                'name' => 'Potholing / Daylighting Services',
                'description' => 'Safe exposure of underground utilities using high-pressure water and vacuum technology. Achieves SUE Level A verification (highest accuracy), prevents costly utility strikes, and provides legally defensible documentation.',
                'serviceType' => 'Hydro Excavation',
                'url' => BHV_COMPANY_URL . '/services/#potholing'
            ),
            array(
                'name' => 'Slot Trenching Services',
                'description' => 'Creating narrow, precise trenches for pipes, cables, or conduit using hydro excavation. Minimal disruption to existing infrastructure with significantly less backfill material needed.',
                'serviceType' => 'Precision Trenching',
                'url' => BHV_COMPANY_URL . '/services/#slot-trenching'
            ),
            array(
                'name' => 'Remote Excavation Services',
                'description' => 'Extended 600ft hose reach to excavate in restricted-access areas. Perfect for residential areas, historic sites, landscaped properties, and tight spaces where traditional equipment cannot reach.',
                'serviceType' => 'Remote Access Excavation',
                'url' => BHV_COMPANY_URL . '/services/#remote-excavation'
            ),
            array(
                'name' => 'SUE Level A Verification',
                'description' => 'Highest level of subsurface utility engineering accuracy through physical exposure and measurement. ASCE standard for design-stage projects with legally defensible documentation.',
                'serviceType' => 'Utility Engineering Verification',
                'url' => BHV_COMPANY_URL . '/services/#sue-level-a'
            )
        );

        foreach ($services as $service) {
            $service_schema = array(
                '@context' => 'https://schema.org',
                '@type' => 'Service',
                '@id' => $service['url'],
                'name' => $service['name'],
                'description' => $service['description'],
                'serviceType' => $service['serviceType'],
                'provider' => array(
                    '@type' => 'LocalBusiness',
                    '@id' => BHV_COMPANY_URL . '/#localbusiness',
                    'name' => BHV_COMPANY_NAME
                ),
                'areaServed' => array(
                    array('@type' => 'State', 'name' => 'Virginia'),
                    array('@type' => 'State', 'name' => 'North Carolina'),
                    array('@type' => 'State', 'name' => 'Maryland'),
                    array('@type' => 'State', 'name' => 'Delaware')
                ),
                'url' => $service['url']
            );
            $schemas[] = $service_schema;
        }
    }

    // FAQ Schema (homepage, services, contact)
    if (is_front_page() || is_page('services') || is_page('contact')) {
        $faq_items = array(
            array(
                'question' => 'What is hydro excavation?',
                'answer' => 'Hydro excavation (also called vacuum excavation or hydrovac) is a non-destructive digging method that uses pressurized water to break up soil and a powerful vacuum to remove the debris. This technique safely exposes underground utilities without risk of damage from traditional mechanical excavation methods.'
            ),
            array(
                'question' => 'What areas do you serve?',
                'answer' => 'Beach Hydrovac provides hydro-excavation services throughout Virginia, North Carolina, Maryland, and Delaware. We are based in Norfolk, VA and serve the entire Mid-Atlantic region including Hampton Roads, Virginia Beach, Chesapeake, Richmond, and surrounding areas.'
            ),
            array(
                'question' => 'What is SUE Level A verification?',
                'answer' => 'SUE Level A is the highest accuracy level in Subsurface Utility Engineering as defined by ASCE standards. It involves physically exposing utilities through non-destructive excavation (like hydrovac) to obtain precise horizontal and vertical location data. This is required for critical infrastructure projects and provides legally defensible documentation.'
            ),
            array(
                'question' => 'How far can your equipment reach?',
                'answer' => 'Our hydrovac trucks feature an extended 600-foot hose reach, allowing us to excavate in restricted-access areas where traditional equipment cannot go. This includes behind buildings, in landscaped areas, on slopes, and in tight urban spaces.'
            ),
            array(
                'question' => 'What industries do you serve?',
                'answer' => 'We serve electrical contractors, civil contractors, water and sewer utilities (including HRSD), telecom companies, municipalities, and engineering firms. Our precision excavation services are trusted for fiber optic installation, power line work, utility upgrades, and infrastructure verification projects.'
            ),
            array(
                'question' => 'Is hydro excavation safer than traditional excavation?',
                'answer' => 'Yes, hydro excavation is significantly safer than mechanical excavation. It eliminates the risk of utility strikes that can cause injuries, service outages, and expensive repairs. The non-destructive nature protects gas lines, electrical cables, fiber optics, and water mains during excavation.'
            ),
            array(
                'question' => 'Can you work in cold weather?',
                'answer' => 'Yes, hydro excavation works effectively in cold weather and frozen ground conditions when traditional excavation methods struggle. Our heated water systems can break through frost and frozen soil, making it ideal for year-round utility work in the Mid-Atlantic region.'
            ),
            array(
                'question' => 'How do I get a quote?',
                'answer' => 'Contact us at 757-785-5177 or email info@beachhydrovac.com for a free quote. We will discuss your project requirements, timeline, and provide competitive pricing. As a veteran-owned local business, we pride ourselves on responsive service and fair pricing.'
            )
        );

        $faq_schema = array(
            '@context' => 'https://schema.org',
            '@type' => 'FAQPage',
            '@id' => BHV_COMPANY_URL . '/#faq',
            'mainEntity' => array()
        );

        foreach ($faq_items as $item) {
            $faq_schema['mainEntity'][] = array(
                '@type' => 'Question',
                'name' => $item['question'],
                'acceptedAnswer' => array(
                    '@type' => 'Answer',
                    'text' => $item['answer']
                )
            );
        }
        $schemas[] = $faq_schema;
    }

    // Breadcrumb Schema (all pages except homepage)
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

    // Article Schema (blog posts)
    if (is_single() && get_post_type() === 'post') {
        $article_schema = array(
            '@context' => 'https://schema.org',
            '@type' => 'Article',
            'headline' => get_the_title(),
            'description' => get_the_excerpt() ? get_the_excerpt() : wp_trim_words(get_the_content(), 30),
            'image' => get_the_post_thumbnail_url(get_the_ID(), 'full') ? get_the_post_thumbnail_url(get_the_ID(), 'full') : BHV_COMPANY_IMAGE,
            'author' => array(
                '@type' => 'Organization',
                'name' => BHV_COMPANY_NAME
            ),
            'publisher' => array(
                '@type' => 'Organization',
                '@id' => BHV_COMPANY_URL . '/#organization',
                'name' => BHV_COMPANY_NAME,
                'logo' => array(
                    '@type' => 'ImageObject',
                    'url' => BHV_COMPANY_LOGO
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
        echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>' . "\n";
    }
}
add_action('wp_head', 'beachhydrovac_add_schema_markup', 5);

/**
 * Add Open Graph and Twitter Card meta tags
 */
function beachhydrovac_add_social_meta_tags() {
    if (is_admin()) return;

    $site_name = BHV_COMPANY_NAME;
    $default_image = BHV_COMPANY_IMAGE;

    // Get page-specific data
    if (is_front_page()) {
        $title = BHV_COMPANY_NAME . ' | Veteran-Owned Hydro-Excavation Services | Norfolk, VA';
        $description = BHV_COMPANY_DESCRIPTION;
        $url = home_url('/');
        $type = 'website';
    } elseif (is_page() || is_single()) {
        $title = get_the_title() . ' | ' . $site_name;
        $excerpt = get_the_excerpt();
        $description = $excerpt ? $excerpt : wp_trim_words(strip_tags(get_the_content()), 30);
        $url = get_permalink();
        $type = is_single() ? 'article' : 'website';
    } else {
        $title = wp_title('|', false, 'right') . $site_name;
        $description = get_bloginfo('description');
        $url = home_url(isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '/');
        $type = 'website';
    }

    $thumbnail = get_the_post_thumbnail_url(get_the_ID(), 'large');
    $image = $thumbnail ? $thumbnail : $default_image;

    // Open Graph tags
    echo '<meta property="og:site_name" content="' . esc_attr($site_name) . '" />' . "\n";
    echo '<meta property="og:title" content="' . esc_attr($title) . '" />' . "\n";
    echo '<meta property="og:description" content="' . esc_attr($description) . '" />' . "\n";
    echo '<meta property="og:url" content="' . esc_url($url) . '" />' . "\n";
    echo '<meta property="og:type" content="' . esc_attr($type) . '" />' . "\n";
    echo '<meta property="og:image" content="' . esc_url($image) . '" />' . "\n";
    echo '<meta property="og:image:width" content="1200" />' . "\n";
    echo '<meta property="og:image:height" content="630" />' . "\n";
    echo '<meta property="og:locale" content="en_US" />' . "\n";

    // Twitter Card tags
    echo '<meta name="twitter:card" content="summary_large_image" />' . "\n";
    echo '<meta name="twitter:title" content="' . esc_attr($title) . '" />' . "\n";
    echo '<meta name="twitter:description" content="' . esc_attr($description) . '" />' . "\n";
    echo '<meta name="twitter:image" content="' . esc_url($image) . '" />' . "\n";

    // Article-specific meta
    if (is_single() && get_post_type() === 'post') {
        echo '<meta property="article:published_time" content="' . get_the_date('c') . '" />' . "\n";
        echo '<meta property="article:modified_time" content="' . get_the_modified_date('c') . '" />' . "\n";
        echo '<meta property="article:author" content="' . esc_attr($site_name) . '" />' . "\n";
    }
}
add_action('wp_head', 'beachhydrovac_add_social_meta_tags', 4);

/**
 * Add canonical URL
 */
function beachhydrovac_add_canonical_url() {
    if (is_admin()) return;
    if (defined('WPSEO_VERSION')) return;

    if (is_front_page()) {
        $canonical = home_url('/');
    } elseif (is_singular()) {
        $canonical = get_permalink();
    } elseif (is_archive()) {
        $canonical = get_post_type_archive_link(get_post_type());
    } else {
        $canonical = home_url(isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '/');
    }

    $canonical = strtok($canonical, '?');
    echo '<link rel="canonical" href="' . esc_url($canonical) . '" />' . "\n";
}
add_action('wp_head', 'beachhydrovac_add_canonical_url', 3);

/**
 * Add geo meta tags for local SEO
 */
function beachhydrovac_add_geo_meta_tags() {
    if (is_admin()) return;

    echo '<meta name="geo.region" content="US-VA" />' . "\n";
    echo '<meta name="geo.placename" content="Norfolk" />' . "\n";
    echo '<meta name="geo.position" content="36.8508;-76.2859" />' . "\n";
    echo '<meta name="ICBM" content="36.8508, -76.2859" />' . "\n";
}
add_action('wp_head', 'beachhydrovac_add_geo_meta_tags', 2);

/**
 * Optimize title tag
 */
function beachhydrovac_custom_title($title) {
    if (is_front_page()) {
        return BHV_COMPANY_NAME . ' | Veteran-Owned Hydro-Excavation Services | Norfolk, VA';
    }
    return $title;
}
add_filter('pre_get_document_title', 'beachhydrovac_custom_title', 20);

/**
 * Add meta description
 */
function beachhydrovac_add_meta_description() {
    if (is_admin()) return;
    if (defined('WPSEO_VERSION')) return;

    $description = '';

    if (is_front_page()) {
        $description = BHV_COMPANY_DESCRIPTION;
    } elseif (is_page('services')) {
        $description = 'Professional hydro-excavation services including potholing, daylighting, slot trenching, and SUE Level A verification. Serving Virginia, NC, MD, DE. Call 757-785-5177.';
    } elseif (is_page('about')) {
        $description = 'Beach Hydrovac is a veteran-owned hydro-excavation company providing safe, precise vacuum excavation services. Based in Norfolk, VA, serving the Mid-Atlantic region.';
    } elseif (is_page('contact')) {
        $description = 'Contact Beach Hydrovac for a free quote. Call 757-785-5177 or email info@beachhydrovac.com. Hydro-excavation services in Virginia, North Carolina, Maryland, and Delaware.';
    } elseif (is_page('our-mission')) {
        $description = 'Our mission at Beach Hydrovac: Providing safe, precise, and professional hydro-excavation services. Veteran-owned and committed to excellence.';
    } elseif (is_singular()) {
        $excerpt = get_the_excerpt();
        $description = $excerpt ? $excerpt : wp_trim_words(strip_tags(get_the_content()), 30);
    }

    if ($description) {
        echo '<meta name="description" content="' . esc_attr($description) . '" />' . "\n";
    }
}
add_action('wp_head', 'beachhydrovac_add_meta_description', 1);

/**
 * Add robots meta tag
 */
function beachhydrovac_add_robots_meta() {
    if (is_admin()) return;
    if (defined('WPSEO_VERSION')) return;

    $robots = 'index, follow';

    if (is_search() || is_404() || is_attachment()) {
        $robots = 'noindex, follow';
    }

    $robots .= ', max-snippet:-1, max-image-preview:large, max-video-preview:-1';
    echo '<meta name="robots" content="' . esc_attr($robots) . '" />' . "\n";
}
add_action('wp_head', 'beachhydrovac_add_robots_meta', 1);

/**
 * Add preconnect for performance
 */
function beachhydrovac_add_preconnect() {
    echo '<link rel="preconnect" href="https://fonts.googleapis.com" />' . "\n";
    echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />' . "\n";
}
add_action('wp_head', 'beachhydrovac_add_preconnect', 0);

/**
 * Add theme color for mobile browsers
 */
function beachhydrovac_add_theme_color() {
    echo '<meta name="theme-color" content="#1a365d" />' . "\n";
    echo '<meta name="msapplication-navbutton-color" content="#1a365d" />' . "\n";
    echo '<meta name="apple-mobile-web-app-status-bar-style" content="#1a365d" />' . "\n";
}
add_action('wp_head', 'beachhydrovac_add_theme_color', 0);

/**
 * Add keywords meta tag
 */
function beachhydrovac_add_keywords_meta() {
    if (is_admin()) return;
    if (defined('WPSEO_VERSION')) return;

    $keywords = 'hydro excavation, vacuum excavation, hydrovac, potholing, daylighting, slot trenching, SUE Level A, utility locating, non-destructive digging, Norfolk, Virginia Beach, Hampton Roads, Virginia, North Carolina, Maryland, Delaware, veteran-owned';
    echo '<meta name="keywords" content="' . esc_attr($keywords) . '" />' . "\n";
}
add_action('wp_head', 'beachhydrovac_add_keywords_meta', 1);

/**
 * Remove WordPress version for security
 */
function beachhydrovac_remove_wp_version() {
    return '';
}
add_filter('the_generator', 'beachhydrovac_remove_wp_version');

/**
 * Add hreflang for English US
 */
function beachhydrovac_add_hreflang() {
    if (is_admin()) return;

    $url = is_front_page() ? home_url('/') : get_permalink();
    echo '<link rel="alternate" hreflang="en-US" href="' . esc_url($url) . '" />' . "\n";
    echo '<link rel="alternate" hreflang="x-default" href="' . esc_url($url) . '" />' . "\n";
}
add_action('wp_head', 'beachhydrovac_add_hreflang', 1);

// ============================================================
// BEACH HYDROVAC TECHNICAL SEO - END
// ============================================================
