<?php
/**
 * Plugin Name: Enable Application Passwords
 * Description: Forces Application Passwords to be enabled for REST API authentication
 * Version: 1.0
 * Author: Beach Hydrovac
 */

// Force enable Application Passwords
add_filter( 'wp_is_application_passwords_available', '__return_true' );

// Ensure REST API authentication is available
add_filter( 'rest_authentication_errors', function( $result ) {
    // If a previous authentication check was applied, pass it through
    if ( true === $result || is_wp_error( $result ) ) {
        return $result;
    }

    // No authentication has been performed yet, return true
    return true;
} );

// Log when plugin is activated
register_activation_hook( __FILE__, function() {
    error_log( 'Application Passwords plugin activated' );
} );
