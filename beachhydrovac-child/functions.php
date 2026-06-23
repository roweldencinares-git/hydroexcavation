<?php
/**
 * Beach Hydrovac Child Theme Functions
 *
 * @package BeachHydrovac
 */

// Remove Astra's default Google Fonts to control loading ourselves
add_filter('astra_google_fonts_uri', '__return_empty_string');
add_filter('astra_load_google_fonts_locally', '__return_false');

// Add preconnect hints for Google Fonts (speeds up DNS + TLS handshake)
function beachhydrovac_preconnect_fonts() {
    echo '<link rel="preconnect" href="https://fonts.googleapis.com">' . "\n";
    echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n";
}
add_action('wp_head', 'beachhydrovac_preconnect_fonts', 1);

// Load Google Fonts asynchronously (non-render-blocking)
// Reduced weights: dropped Roboto (Inter covers it), trimmed weight variants
function beachhydrovac_async_fonts() {
    $fonts_url = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Montserrat:wght@600;700;800&display=swap';
    ?>
    <link rel="preload" as="style" href="<?php echo esc_url($fonts_url); ?>" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="<?php echo esc_url($fonts_url); ?>"></noscript>
    <?php
}
add_action('wp_head', 'beachhydrovac_async_fonts', 2);

// Enqueue parent and child theme styles
function beachhydrovac_child_enqueue_styles() {
    // Enqueue parent Astra stylesheet
    wp_enqueue_style(
        'astra-theme-css',
        get_template_directory_uri() . '/style.css',
        array(),
        wp_get_theme('astra')->get('Version')
    );

    // Enqueue child theme stylesheet (no font dependency — loaded async above)
    wp_enqueue_style(
        'beachhydrovac-child-style',
        get_stylesheet_uri(),
        array('astra-theme-css'),
        wp_get_theme()->get('Version')
    );
}
add_action('wp_enqueue_scripts', 'beachhydrovac_child_enqueue_styles');

// Add lazy loading to all images not already marked eager
function beachhydrovac_add_lazy_loading($content) {
    if (is_admin()) return $content;
    // Add loading="lazy" to images that don't already have a loading attribute
    $content = preg_replace(
        '/<img(?![^>]*loading=)([^>]*?)>/i',
        '<img$1 loading="lazy">',
        $content
    );
    return $content;
}
add_filter('the_content', 'beachhydrovac_add_lazy_loading');
add_filter('post_thumbnail_html', 'beachhydrovac_add_lazy_loading');
add_filter('widget_text', 'beachhydrovac_add_lazy_loading');

// Force eager loading on LCP hero image (above the fold — do NOT lazy load this)
function beachhydrovac_hero_eager_loading($attr, $attachment, $size) {
    // Hero images are typically the first image in the page
    static $image_count = 0;
    $image_count++;
    if ($image_count === 1) {
        $attr['loading'] = 'eager';
        $attr['fetchpriority'] = 'high';
    }
    return $attr;
}
add_filter('wp_get_attachment_image_attributes', 'beachhydrovac_hero_eager_loading', 10, 3);

// Add browser cache headers for static assets
function beachhydrovac_cache_headers() {
    if (!is_admin() && !is_user_logged_in()) {
        $cache_time = 2592000; // 30 days
        header('Cache-Control: public, max-age=' . $cache_time);
        header('Expires: ' . gmdate('D, d M Y H:i:s', time() + $cache_time) . ' GMT');
    }
}
add_action('wp', 'beachhydrovac_cache_headers');

// Add custom color palette to Gutenberg editor
function beachhydrovac_editor_color_palette() {
    add_theme_support('editor-color-palette', array(
        array(
            'name'  => __('Navy Blue', 'beachhydrovac-child'),
            'slug'  => 'navy-blue',
            'color' => '#1a365d',
        ),
        array(
            'name'  => __('Navy Dark', 'beachhydrovac-child'),
            'slug'  => 'navy-dark',
            'color' => '#0f2442',
        ),
        array(
            'name'  => __('Navy Light', 'beachhydrovac-child'),
            'slug'  => 'navy-light',
            'color' => '#2c5282',
        ),
        array(
            'name'  => __('Yellow', 'beachhydrovac-child'),
            'slug'  => 'yellow',
            'color' => '#f6c915',
        ),
        array(
            'name'  => __('Yellow Dark', 'beachhydrovac-child'),
            'slug'  => 'yellow-dark',
            'color' => '#d4a90a',
        ),
        array(
            'name'  => __('White', 'beachhydrovac-child'),
            'slug'  => 'white',
            'color' => '#ffffff',
        ),
        array(
            'name'  => __('Off White', 'beachhydrovac-child'),
            'slug'  => 'off-white',
            'color' => '#f7fafc',
        ),
        array(
            'name'  => __('Gray', 'beachhydrovac-child'),
            'slug'  => 'gray',
            'color' => '#e2e8f0',
        ),
    ));
}
add_action('after_setup_theme', 'beachhydrovac_editor_color_palette');
