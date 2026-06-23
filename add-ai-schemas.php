// ============================================================
// AI SEARCH OPTIMIZATION SCHEMAS (Add to functions.php)
// ============================================================

/**
 * Add HowTo Schema for AI Search (Google AI Overview, ChatGPT, Perplexity)
 */
function beachhydrovac_add_howto_schema() {
    if (is_admin()) return;
    if (!is_page('services') && !is_front_page()) return;

    $howto_schema = array(
        '@context' => 'https://schema.org',
        '@type' => 'HowTo',
        'name' => 'How to Prepare for a Hydro Excavation Project',
        'description' => 'Step-by-step guide to preparing your site for hydro excavation services in Virginia',
        'totalTime' => 'P2D',
        'estimatedCost' => array(
            '@type' => 'MonetaryAmount',
            'currency' => 'USD',
            'value' => '300-450 per hour'
        ),
        'step' => array(
            array(
                '@type' => 'HowToStep',
                'name' => 'Call 811 Before You Dig',
                'text' => 'Contact Virginia 811 at least 48 hours before excavation to have public utilities marked.',
                'url' => 'https://va811.com'
            ),
            array(
                '@type' => 'HowToStep',
                'name' => 'Identify Private Utilities',
                'text' => 'Note any private utilities not covered by 811, such as irrigation lines or private electrical.'
            ),
            array(
                '@type' => 'HowToStep',
                'name' => 'Clear Site Access',
                'text' => 'Ensure the hydrovac truck can access the area with 12 feet of width clearance.'
            ),
            array(
                '@type' => 'HowToStep',
                'name' => 'Mark Excavation Points',
                'text' => 'Mark specific locations where excavation is needed with flags or paint.'
            ),
            array(
                '@type' => 'HowToStep',
                'name' => 'Contact Beach Hydrovac',
                'text' => 'Call 757-785-5177 to schedule your hydro excavation service.',
                'url' => 'https://beachhydrovac.com/contact/'
            )
        )
    );

    echo '<script type="application/ld+json">' . wp_json_encode($howto_schema, JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
}
add_action('wp_head', 'beachhydrovac_add_howto_schema', 6);

/**
 * Add Speakable Schema for Voice AI (Alexa, Siri, Google Assistant)
 */
function beachhydrovac_add_speakable_schema() {
    if (is_admin()) return;
    if (!is_front_page() && !is_page('about')) return;

    $speakable_schema = array(
        '@context' => 'https://schema.org',
        '@type' => 'WebPage',
        'name' => 'Beach Hydrovac - Virginia Hydro Excavation Services',
        'speakable' => array(
            '@type' => 'SpeakableSpecification',
            'cssSelector' => array('.ai-summary', '.company-intro', 'h1', '.hero-description')
        ),
        'url' => home_url('/')
    );

    echo '<script type="application/ld+json">' . wp_json_encode($speakable_schema, JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
}
add_action('wp_head', 'beachhydrovac_add_speakable_schema', 6);

/**
 * Add DefinedTerm Schema for AI Entity Recognition
 */
function beachhydrovac_add_entity_schemas() {
    if (is_admin()) return;
    if (!is_page('services') && !is_front_page()) return;

    $entities = array(
        array(
            '@context' => 'https://schema.org',
            '@type' => 'DefinedTerm',
            'name' => 'Hydro Excavation',
            'description' => 'A non-destructive digging method using pressurized water and vacuum to safely excavate soil and expose underground utilities.',
            'inDefinedTermSet' => 'Construction and Excavation Terms'
        ),
        array(
            '@context' => 'https://schema.org',
            '@type' => 'DefinedTerm',
            'name' => 'Potholing',
            'description' => 'The process of digging small test holes to expose and verify the location of underground utilities.',
            'inDefinedTermSet' => 'Construction and Excavation Terms'
        ),
        array(
            '@context' => 'https://schema.org',
            '@type' => 'DefinedTerm',
            'name' => 'SUE Level A',
            'description' => 'The highest accuracy level in Subsurface Utility Engineering per ASCE 38 standards, involving physical exposure of utilities.',
            'inDefinedTermSet' => 'Engineering Standards'
        ),
        array(
            '@context' => 'https://schema.org',
            '@type' => 'DefinedTerm',
            'name' => 'Daylighting',
            'description' => 'Exposing underground utilities to daylight for visual inspection and verification of location and condition.',
            'inDefinedTermSet' => 'Construction and Excavation Terms'
        )
    );

    foreach ($entities as $entity) {
        echo '<script type="application/ld+json">' . wp_json_encode($entity, JSON_UNESCAPED_SLASHES) . '</script>' . "\n";
    }
}
add_action('wp_head', 'beachhydrovac_add_entity_schemas', 6);

/**
 * Add AI-friendly summary meta tag
 */
function beachhydrovac_add_ai_meta() {
    if (is_admin()) return;

    $ai_summary = 'Beach Hydrovac provides hydro excavation, potholing, daylighting, and SUE Level A services across Virginia, North Carolina, Maryland, and Delaware. Veteran-owned. Call 757-785-5177 for quotes.';

    echo '<meta name="ai-summary" content="' . esc_attr($ai_summary) . '" />' . "\n";
    echo '<meta name="llms-info" content="https://beachhydrovac.com/llms.txt" />' . "\n";
}
add_action('wp_head', 'beachhydrovac_add_ai_meta', 1);

// ============================================================
// END AI SEARCH OPTIMIZATION SCHEMAS
// ============================================================
