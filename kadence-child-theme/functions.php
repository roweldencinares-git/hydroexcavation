<?php
/**
 * BeachHydrovac Kadence Child Theme Functions
 *
 * @package BeachHydrovac
 * @since 1.0.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Enqueue parent and child theme styles
 */
function beachhydrovac_kadence_enqueue_styles() {
    // Enqueue parent Kadence theme stylesheet
    wp_enqueue_style(
        'kadence-style',
        get_template_directory_uri() . '/style.css',
        array(),
        wp_get_theme()->parent()->get('Version')
    );

    // Enqueue child theme stylesheet
    wp_enqueue_style(
        'beachhydrovac-kadence-child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array( 'kadence-style' ),
        wp_get_theme()->get('Version')
    );

    // Load Google Fonts - Inter (Black 900), Montserrat (Bold 700), Roboto (Regular 400)
    wp_enqueue_style(
        'beachhydrovac-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Montserrat:wght@600;700&family=Roboto:wght@400;500&display=swap',
        array(),
        null
    );

    // Enqueue Advanced Animations CSS
    wp_enqueue_style(
        'beachhydrovac-animations',
        get_stylesheet_directory_uri() . '/advanced-animations.css',
        array( 'beachhydrovac-kadence-child-style' ),
        wp_get_theme()->get('Version')
    );

    // Enqueue Advanced Animations JavaScript
    wp_enqueue_script(
        'beachhydrovac-animations-js',
        get_stylesheet_directory_uri() . '/advanced-animations.js',
        array(),
        wp_get_theme()->get('Version'),
        true
    );
}
add_action( 'wp_enqueue_scripts', 'beachhydrovac_kadence_enqueue_styles', 20 );

/**
 * Register custom color palette for Gutenberg
 * BeachHydrovac "Warm Tech" Brand Colors
 */
function beachhydrovac_kadence_custom_colors() {
    add_theme_support( 'editor-color-palette', array(
        array(
            'name'  => __( 'Deep Atlantic (Primary)', 'beachhydrovac-kadence-child' ),
            'slug'  => 'deep-atlantic',
            'color' => '#00416A',
        ),
        array(
            'name'  => __( 'Safety Cyan (Accent)', 'beachhydrovac-kadence-child' ),
            'slug'  => 'safety-cyan',
            'color' => '#27AEFD',
        ),
        array(
            'name'  => __( 'Warm Shoreline (Secondary)', 'beachhydrovac-kadence-child' ),
            'slug'  => 'warm-shoreline',
            'color' => '#D4A373',
        ),
        array(
            'name'  => __( 'White', 'beachhydrovac-kadence-child' ),
            'slug'  => 'white',
            'color' => '#FFFFFF',
        ),
        array(
            'name'  => __( 'Gray 50', 'beachhydrovac-kadence-child' ),
            'slug'  => 'gray-50',
            'color' => '#F9FAFB',
        ),
        array(
            'name'  => __( 'Gray 600', 'beachhydrovac-kadence-child' ),
            'slug'  => 'gray-600',
            'color' => '#6B7280',
        ),
        array(
            'name'  => __( 'Gray 900', 'beachhydrovac-kadence-child' ),
            'slug'  => 'gray-900',
            'color' => '#111827',
        ),
    ) );
}
add_action( 'after_setup_theme', 'beachhydrovac_kadence_custom_colors' );

/**
 * Add custom font sizes for Gutenberg
 */
function beachhydrovac_kadence_custom_font_sizes() {
    add_theme_support( 'editor-font-sizes', array(
        array(
            'name' => __( 'Small', 'beachhydrovac-kadence-child' ),
            'size' => 14,
            'slug' => 'small'
        ),
        array(
            'name' => __( 'Normal', 'beachhydrovac-kadence-child' ),
            'size' => 16,
            'slug' => 'normal'
        ),
        array(
            'name' => __( 'Medium', 'beachhydrovac-kadence-child' ),
            'size' => 20,
            'slug' => 'medium'
        ),
        array(
            'name' => __( 'Large', 'beachhydrovac-kadence-child' ),
            'size' => 28,
            'slug' => 'large'
        ),
        array(
            'name' => __( 'Extra Large', 'beachhydrovac-kadence-child' ),
            'size' => 36,
            'slug' => 'x-large'
        ),
        array(
            'name' => __( 'Huge', 'beachhydrovac-kadence-child' ),
            'size' => 48,
            'slug' => 'huge'
        )
    ) );
}
add_action( 'after_setup_theme', 'beachhydrovac_kadence_custom_font_sizes' );

/**
 * Modify excerpt length for blog posts
 */
function beachhydrovac_excerpt_length( $length ) {
    return 30;
}
add_filter( 'excerpt_length', 'beachhydrovac_excerpt_length', 999 );

/**
 * Modify excerpt more string
 */
function beachhydrovac_excerpt_more( $more ) {
    return '...';
}
add_filter( 'excerpt_more', 'beachhydrovac_excerpt_more' );

/**
 * Add custom body classes
 */
function beachhydrovac_body_classes( $classes ) {
    $classes[] = 'beachhydrovac-theme';
    $classes[] = 'warm-tech-branding';
    return $classes;
}
add_filter( 'body_class', 'beachhydrovac_body_classes' );

/**
 * Enable additional theme supports
 */
function beachhydrovac_theme_support() {
    // Enable responsive embeds
    add_theme_support( 'responsive-embeds' );

    // Enable wide alignment
    add_theme_support( 'align-wide' );

    // Enable block styles
    add_theme_support( 'wp-block-styles' );

    // Enable custom line height
    add_theme_support( 'custom-line-height' );

    // Enable custom units
    add_theme_support( 'custom-units', 'px', 'rem', 'em', 'vh', 'vw' );
}
add_action( 'after_setup_theme', 'beachhydrovac_theme_support' );

/**
 * Add BeachHydrovac contact information to WordPress Customizer
 */
function beachhydrovac_customize_register( $wp_customize ) {
    // Contact Information Section
    $wp_customize->add_section( 'beachhydrovac_contact_info', array(
        'title'    => __( 'BeachHydrovac Contact Info', 'beachhydrovac-kadence-child' ),
        'priority' => 30,
    ) );

    // Phone Number
    $wp_customize->add_setting( 'beachhydrovac_phone', array(
        'default'           => '757-785-5177',
        'sanitize_callback' => 'sanitize_text_field',
        'transport'         => 'refresh',
    ) );

    $wp_customize->add_control( 'beachhydrovac_phone', array(
        'label'    => __( 'Phone Number', 'beachhydrovac-kadence-child' ),
        'section'  => 'beachhydrovac_contact_info',
        'type'     => 'text',
    ) );

    // Email Address
    $wp_customize->add_setting( 'beachhydrovac_email', array(
        'default'           => 'info@beachhydrovac.com',
        'sanitize_callback' => 'sanitize_email',
        'transport'         => 'refresh',
    ) );

    $wp_customize->add_control( 'beachhydrovac_email', array(
        'label'    => __( 'Email Address', 'beachhydrovac-kadence-child' ),
        'section'  => 'beachhydrovac_contact_info',
        'type'     => 'email',
    ) );

    // Service Area
    $wp_customize->add_setting( 'beachhydrovac_service_area', array(
        'default'           => 'Virginia Beach, VA | Serving VA, NC, MD & DE',
        'sanitize_callback' => 'sanitize_text_field',
        'transport'         => 'refresh',
    ) );

    $wp_customize->add_control( 'beachhydrovac_service_area', array(
        'label'    => __( 'Service Area', 'beachhydrovac-kadence-child' ),
        'section'  => 'beachhydrovac_contact_info',
        'type'     => 'text',
    ) );
}
add_action( 'customize_register', 'beachhydrovac_customize_register' );

/**
 * Helper function to get phone number
 */
function beachhydrovac_get_phone() {
    return get_theme_mod( 'beachhydrovac_phone', '757-785-5177' );
}

/**
 * Helper function to get email
 */
function beachhydrovac_get_email() {
    return get_theme_mod( 'beachhydrovac_email', 'info@beachhydrovac.com' );
}

/**
 * Helper function to get service area
 */
function beachhydrovac_get_service_area() {
    return get_theme_mod( 'beachhydrovac_service_area', 'Virginia Beach, VA | Serving VA, NC, MD & DE' );
}

/**
 * Remove WordPress version from head (security)
 */
remove_action('wp_head', 'wp_generator');

/**
 * Optimize Kadence theme for performance
 */
function beachhydrovac_optimize_kadence() {
    // Remove Kadence's Google Fonts if we're loading our own
    add_filter( 'kadence_theme_google_fonts_array', '__return_empty_array' );
}
add_action( 'after_setup_theme', 'beachhydrovac_optimize_kadence' );

/**
 * Add schema.org markup for LocalBusiness
 */
function beachhydrovac_local_business_schema() {
    if ( is_front_page() ) {
        $schema = array(
            '@context'  => 'https://schema.org',
            '@type'     => 'LocalBusiness',
            'name'      => 'BeachHydrovac',
            'description' => 'Professional hydro-excavation services in Virginia Beach. Specialized in SUE Level A verification, potholing, and utility location.',
            'telephone' => beachhydrovac_get_phone(),
            'email'     => beachhydrovac_get_email(),
            'address'   => array(
                '@type'           => 'PostalAddress',
                'addressLocality' => 'Virginia Beach',
                'addressRegion'   => 'VA',
                'addressCountry'  => 'US',
            ),
            'areaServed' => array(
                array( '@type' => 'State', 'name' => 'Virginia' ),
                array( '@type' => 'State', 'name' => 'North Carolina' ),
                array( '@type' => 'State', 'name' => 'Maryland' ),
                array( '@type' => 'State', 'name' => 'Delaware' ),
            ),
            'priceRange' => '$$',
        );

        echo '<script type="application/ld+json">' . wp_json_encode( $schema ) . '</script>';
    }
}
add_action( 'wp_head', 'beachhydrovac_local_business_schema' );

/**
 * Custom excerpt for SEO
 */
function beachhydrovac_custom_excerpt( $excerpt ) {
    if ( is_home() || is_archive() ) {
        return wp_trim_words( $excerpt, 25, '...' );
    }
    return $excerpt;
}
add_filter( 'get_the_excerpt', 'beachhydrovac_custom_excerpt' );

/**
 * Preload key requests for performance
 */
function beachhydrovac_preload_resources() {
    echo '<link rel="preconnect" href="https://fonts.googleapis.com">';
    echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';
    echo '<link rel="dns-prefetch" href="//fonts.googleapis.com">';
}
add_action( 'wp_head', 'beachhydrovac_preload_resources', 1 );
