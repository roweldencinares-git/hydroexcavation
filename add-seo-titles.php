// ============================================================
// CUSTOM SEO TITLES AND META DESCRIPTIONS
// Add this code to functions.php in beachhydrovac-child theme
// ============================================================

/**
 * Custom SEO titles for main pages - Keyword optimized
 */
function beachhydrovac_custom_page_titles($title) {
    if (is_front_page() || is_home()) {
        return 'Hydro Excavation Virginia | Veteran-Owned | Beach Hydrovac';
    }
    if (is_page('services')) {
        return 'Hydro Excavation Services | Potholing, Daylighting, SUE | Beach Hydrovac';
    }
    if (is_page('contact')) {
        return 'Contact Beach Hydrovac | Get a Free Quote | 757-785-5177';
    }
    if (is_page('about')) {
        return 'About Beach Hydrovac | Veteran-Owned Hydro Excavation Company';
    }
    if (is_page('faq')) {
        return 'Hydro Excavation FAQ | Questions Answered | Beach Hydrovac';
    }
    return $title;
}
add_filter('pre_get_document_title', 'beachhydrovac_custom_page_titles', 99);

/**
 * Also filter Yoast title if installed
 */
function beachhydrovac_filter_yoast_title($title) {
    if (is_front_page() || is_home()) {
        return 'Hydro Excavation Virginia | Veteran-Owned | Beach Hydrovac';
    }
    if (is_page('services')) {
        return 'Hydro Excavation Services | Potholing, Daylighting, SUE | Beach Hydrovac';
    }
    if (is_page('contact')) {
        return 'Contact Beach Hydrovac | Get a Free Quote | 757-785-5177';
    }
    if (is_page('about')) {
        return 'About Beach Hydrovac | Veteran-Owned Hydro Excavation Company';
    }
    if (is_page('faq')) {
        return 'Hydro Excavation FAQ | Questions Answered | Beach Hydrovac';
    }
    return $title;
}
add_filter('wpseo_title', 'beachhydrovac_filter_yoast_title', 99);

/**
 * Custom meta descriptions for main pages
 */
function beachhydrovac_custom_meta_descriptions() {
    $description = '';

    if (is_front_page() || is_home()) {
        $description = "Virginia's trusted hydro excavation company. Potholing, daylighting, SUE Level A verification. Serving Virginia Beach, Norfolk, Richmond. Call 757-785-5177 for a free quote.";
    } elseif (is_page('services')) {
        $description = "Professional hydro excavation services: potholing, daylighting, slot trenching, SUE Level A verification. Safe, non-destructive excavation in Virginia. Get a quote today.";
    } elseif (is_page('contact')) {
        $description = "Request a free hydro excavation quote. Serving Virginia Beach, Norfolk, Chesapeake, Richmond & Hampton Roads. Call 757-785-5177 or fill out our online form.";
    } elseif (is_page('about')) {
        $description = "Beach Hydrovac is a veteran-owned hydro excavation company serving Virginia, North Carolina, Maryland & Delaware. Military precision meets safe excavation. Learn more.";
    } elseif (is_page('faq')) {
        $description = "Get answers to common hydro excavation questions: What is hydrovac? How much does it cost? Is it safe? Learn about potholing, daylighting, and SUE services.";
    }

    if ($description) {
        // Remove any existing description meta tags first
        remove_action('wp_head', 'beachhydrovac_output_meta_description');
        echo '<meta name="description" content="' . esc_attr($description) . '" />' . "\n";
    }
}
add_action('wp_head', 'beachhydrovac_custom_meta_descriptions', 1);

/**
 * Filter Yoast meta description if installed
 */
function beachhydrovac_filter_yoast_metadesc($description) {
    if (is_front_page() || is_home()) {
        return "Virginia's trusted hydro excavation company. Potholing, daylighting, SUE Level A verification. Serving Virginia Beach, Norfolk, Richmond. Call 757-785-5177 for a free quote.";
    }
    if (is_page('services')) {
        return "Professional hydro excavation services: potholing, daylighting, slot trenching, SUE Level A verification. Safe, non-destructive excavation in Virginia. Get a quote today.";
    }
    if (is_page('contact')) {
        return "Request a free hydro excavation quote. Serving Virginia Beach, Norfolk, Chesapeake, Richmond & Hampton Roads. Call 757-785-5177 or fill out our online form.";
    }
    if (is_page('about')) {
        return "Beach Hydrovac is a veteran-owned hydro excavation company serving Virginia, North Carolina, Maryland & Delaware. Military precision meets safe excavation. Learn more.";
    }
    if (is_page('faq')) {
        return "Get answers to common hydro excavation questions: What is hydrovac? How much does it cost? Is it safe? Learn about potholing, daylighting, and SUE services.";
    }
    return $description;
}
add_filter('wpseo_metadesc', 'beachhydrovac_filter_yoast_metadesc', 99);

// ============================================================
// END CUSTOM SEO TITLES AND META DESCRIPTIONS
// ============================================================
