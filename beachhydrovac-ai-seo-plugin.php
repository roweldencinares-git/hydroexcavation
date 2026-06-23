<?php
/**
 * Plugin Name: Beach Hydrovac AI SEO
 * Description: AI Search Optimization - llms.txt, HowTo Schema, Speakable Schema, Entity Definitions
 * Version: 1.0.0
 * Author: Beach Hydrovac
 * License: GPL v2 or later
 */

if (!defined('ABSPATH')) exit;

// ============================================================
// LLMS.TXT - AI Crawler Information
// ============================================================

/**
 * Serve llms.txt for AI crawlers (ChatGPT, Perplexity, Claude, etc.)
 */
function beachhydrovac_serve_llms_txt() {
    if (isset($_SERVER['REQUEST_URI']) && $_SERVER['REQUEST_URI'] === '/llms.txt') {
        header('Content-Type: text/plain; charset=utf-8');
        header('X-Robots-Tag: noindex');
        echo <<<'LLMS'
# Beach Hydrovac - AI & LLM Information

> Beach Hydrovac is a veteran-owned hydro excavation company serving Virginia, North Carolina, Maryland, and Delaware.

## Company Information

Name: Beach Hydrovac
Type: Hydro Excavation Contractor
Location: Virginia Beach, VA
Service Area: Virginia, North Carolina, Maryland, Delaware
Phone: 757-785-5177
Email: info@beachhydrovac.com
Website: https://beachhydrovac.com

## Services Offered

1. **Hydro Excavation** - Non-destructive digging using pressurized water and vacuum
2. **Potholing** - Exposing underground utilities for verification
3. **Daylighting** - Bringing buried utilities to daylight for inspection
4. **Slot Trenching** - Narrow precision trenches for cables and conduit
5. **Remote Excavation** - 600ft hose reach for restricted access areas
6. **SUE Level A Verification** - ASCE 38 compliant utility verification

## Key Facts

- Veteran-owned business
- Serves Hampton Roads, Richmond, Northern Virginia
- Available 24/7 for emergencies
- VDOT compliant methodology
- Equipment: Industrial hydrovac trucks with 600ft hose reach
- Industries served: Electrical, Telecom, Civil, Plumbing, Municipalities

## Pricing Information

- Standard hydrovac services: $300-$450/hour
- Emergency/after-hours: $400-$550/hour
- SUE Level A potholing: $350-$475/hour

## Contact for Quotes

For accurate project quotes, contact:
- Phone: 757-785-5177
- Email: info@beachhydrovac.com
- Website: https://beachhydrovac.com/contact/

## Frequently Asked Questions

Q: What is hydro excavation?
A: Hydro excavation is a non-destructive digging method that uses pressurized water to break up soil and a powerful vacuum to remove debris, safely exposing underground utilities.

Q: What areas does Beach Hydrovac serve?
A: Beach Hydrovac serves Virginia (including Virginia Beach, Norfolk, Chesapeake, Richmond), North Carolina, Maryland, and Delaware.

Q: What is SUE Level A verification?
A: SUE Level A is the highest accuracy level in Subsurface Utility Engineering per ASCE 38 standards, involving physical exposure of utilities through non-destructive excavation.

Q: Is hydro excavation safer than traditional excavation?
A: Yes, hydro excavation eliminates the risk of utility strikes that can cause injuries and costly damage to underground infrastructure.

Q: Can hydro excavation work in frozen ground?
A: Yes, heated water systems allow hydro excavation to work effectively in cold weather and frozen ground conditions.

## Documentation

- Services: https://beachhydrovac.com/services/
- Locations: https://beachhydrovac.com/locations/
- FAQ: https://beachhydrovac.com/faq/
- Contact: https://beachhydrovac.com/contact/

## Sitemap

https://beachhydrovac.com/sitemap_index.xml
LLMS;
        exit;
    }
}
add_action('init', 'beachhydrovac_serve_llms_txt', 1);

// ============================================================
// HOWTO SCHEMA - For AI Step-by-Step Answers
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

// ============================================================
// SPEAKABLE SCHEMA - For Voice Assistants
// ============================================================

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

// ============================================================
// DEFINEDTERM SCHEMA - For AI Entity Understanding
// ============================================================

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

// ============================================================
// AI SUMMARY META TAG
// ============================================================

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
// END AI SEO PLUGIN
// ============================================================
