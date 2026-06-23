// ============================================================
// GOOGLE SEARCH CONSOLE VERIFICATION
// Add this to functions.php in beachhydrovac-child theme
// ============================================================

/**
 * Serve Google Search Console verification file
 */
function beachhydrovac_gsc_verification() {
    if (isset($_SERVER['REQUEST_URI']) && $_SERVER['REQUEST_URI'] === '/google47db03472f9d4e10.html') {
        header('Content-Type: text/html; charset=utf-8');
        echo 'google-site-verification: google47db03472f9d4e10.html';
        exit;
    }
}
add_action('init', 'beachhydrovac_gsc_verification', 1);

// ============================================================
// END GOOGLE SEARCH CONSOLE VERIFICATION
// ============================================================
