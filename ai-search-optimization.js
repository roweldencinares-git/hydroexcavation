import 'dotenv/config';
import fetch from 'node-fetch';
import { writeFileSync } from 'fs';

/**
 * Beach Hydrovac AI Search Optimization
 *
 * Optimizes the website for AI search engines:
 * - ChatGPT / OpenAI
 * - Google AI Overviews (SGE)
 * - Perplexity AI
 * - Bing Chat / Copilot
 * - Claude AI
 * - Meta AI
 *
 * Implements:
 * 1. llms.txt - AI crawler instructions
 * 2. Speakable Schema - Voice/AI readable content
 * 3. HowTo Schema - Step-by-step guides
 * 4. AI-Optimized Content Blocks
 * 5. Entity-Based Structured Data
 * 6. Direct Answer Content Format
 */

const WP_URL = 'https://beachhydrovac.com';
const WP_USER = process.env.BEACH_HYDROVAC_WP_USER;
const WP_APP_PASSWORD = process.env.BEACH_HYDROVAC_WP_PASSWORD;

const headers = {
  'Authorization': 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64'),
  'Content-Type': 'application/json'
};

// ============================================================
// LLMS.TXT - Instructions for AI Crawlers
// ============================================================

const LLMS_TXT = `# Beach Hydrovac - AI & LLM Information

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
`;

// ============================================================
// AI-OPTIMIZED CONTENT - Direct Answer Format
// ============================================================

const AI_OPTIMIZED_CONTENT = {
  title: 'Hydro Excavation Virginia: Complete Guide',
  slug: 'hydro-excavation-virginia-guide',
  content: `
<!-- wp:paragraph {"className":"ai-summary"} -->
<p class="ai-summary"><strong>Summary:</strong> Beach Hydrovac provides professional hydro excavation services throughout Virginia, including Virginia Beach, Norfolk, Chesapeake, Richmond, and Hampton Roads. As a veteran-owned company, we offer potholing, daylighting, slot trenching, and SUE Level A verification services. Call 757-785-5177 for a free quote.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>What is Hydro Excavation?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>Hydro excavation</strong> (also called hydrovac or vacuum excavation) is a non-destructive digging method that uses pressurized water to break up soil and a powerful vacuum to remove the debris. This technique safely exposes underground utilities without risk of damage from traditional mechanical excavation methods.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Hydro Excavation Services in Virginia</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Beach Hydrovac offers the following hydro excavation services throughout Virginia:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>Potholing/Daylighting:</strong> Safely exposing underground utilities for verification and documentation</li>
<li><strong>Slot Trenching:</strong> Creating narrow, precise trenches for cables, pipes, and conduit installation</li>
<li><strong>Remote Excavation:</strong> Extended 600-foot hose reach for restricted access areas</li>
<li><strong>SUE Level A Verification:</strong> ASCE 38 compliant utility verification for VDOT projects</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>Service Areas in Virginia</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Beach Hydrovac provides hydro excavation services in these Virginia cities:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>Hampton Roads:</strong> Virginia Beach, Norfolk, Chesapeake, Newport News, Hampton, Suffolk, Portsmouth</li>
<li><strong>Central Virginia:</strong> Richmond, Henrico, Chesterfield, Williamsburg</li>
<li><strong>Northern Virginia:</strong> Alexandria, Arlington, Fairfax, Fredericksburg</li>
<li><strong>Western Virginia:</strong> Roanoke, Lynchburg</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>Hydro Excavation Cost in Virginia</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Hydro excavation services in Virginia typically cost:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>Standard services:</strong> $300-$450 per hour</li>
<li><strong>Emergency/after-hours:</strong> $400-$550 per hour</li>
<li><strong>SUE Level A potholing:</strong> $350-$475 per hour</li>
</ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Factors affecting cost include soil conditions, depth, access, and project complexity. Contact Beach Hydrovac at 757-785-5177 for an accurate quote.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Why Choose Beach Hydrovac?</h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li><strong>Veteran-Owned:</strong> Military precision and discipline in every project</li>
<li><strong>Local Expertise:</strong> Based in Virginia Beach, serving all of Virginia</li>
<li><strong>VDOT Compliant:</strong> SUE Level A verification meets all state requirements</li>
<li><strong>24/7 Availability:</strong> Emergency services when you need them</li>
<li><strong>Modern Equipment:</strong> Industrial hydrovac trucks with 600ft hose reach</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>Industries We Serve</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Beach Hydrovac serves contractors and organizations across Virginia, including:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li>Electrical contractors (conduit and power line installation)</li>
<li>Telecommunications companies (fiber optic and cable installation)</li>
<li>Civil contractors (infrastructure projects)</li>
<li>Plumbing contractors (water and sewer line work)</li>
<li>Municipalities (public works projects)</li>
<li>Engineering firms (SUE verification for design projects)</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>Contact Beach Hydrovac</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Ready to start your hydro excavation project in Virginia?</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li><strong>Phone:</strong> <a href="tel:7577855177">757-785-5177</a></li>
<li><strong>Email:</strong> <a href="mailto:info@beachhydrovac.com">info@beachhydrovac.com</a></li>
<li><strong>Website:</strong> <a href="https://beachhydrovac.com">beachhydrovac.com</a></li>
</ul>
<!-- /wp:list -->
`
};

// ============================================================
// HOWTO SCHEMA - For AI Step-by-Step Answers
// ============================================================

const HOWTO_SCHEMAS = [
  {
    name: 'How to Prepare for a Hydro Excavation Project',
    description: 'Step-by-step guide to preparing your site for hydro excavation services',
    steps: [
      {
        name: 'Call 811 Before You Dig',
        text: 'Contact Virginia 811 at least 48 hours before excavation to have public utilities marked. This is required by Virginia law.',
        url: 'https://va811.com'
      },
      {
        name: 'Identify Private Utilities',
        text: 'Note any private utilities not covered by 811, such as irrigation lines, propane tanks, or private electrical runs.',
      },
      {
        name: 'Clear Site Access',
        text: 'Ensure the hydrovac truck can access the excavation area. Trucks need approximately 12 feet of width and overhead clearance.',
      },
      {
        name: 'Mark Excavation Points',
        text: 'Mark the specific locations where excavation is needed with flags or paint.',
      },
      {
        name: 'Contact Beach Hydrovac',
        text: 'Call 757-785-5177 or email info@beachhydrovac.com to schedule your hydro excavation service.',
        url: 'https://beachhydrovac.com/contact/'
      }
    ]
  },
  {
    name: 'How to Choose a Hydro Excavation Contractor in Virginia',
    description: 'Guide to selecting the right hydrovac contractor for your project',
    steps: [
      {
        name: 'Verify Licensing and Insurance',
        text: 'Ensure the contractor has proper Virginia contractor licensing and liability insurance coverage.',
      },
      {
        name: 'Check Equipment Capabilities',
        text: 'Confirm the contractor has appropriate equipment for your project, including tank capacity and hose reach.',
      },
      {
        name: 'Review Experience',
        text: 'Look for contractors with experience in your specific type of project (utility work, SUE, trenching, etc.).',
      },
      {
        name: 'Get Multiple Quotes',
        text: 'Request quotes from at least 2-3 contractors to compare pricing and services.',
      },
      {
        name: 'Check References',
        text: 'Ask for references from similar projects and verify their work quality.',
      }
    ]
  }
];

// ============================================================
// SPEAKABLE SCHEMA - For Voice AI
// ============================================================

const SPEAKABLE_CONTENT = {
  headline: 'Beach Hydrovac - Virginia Hydro Excavation Services',
  speakableText: `Beach Hydrovac is a veteran-owned hydro excavation company serving Virginia, North Carolina, Maryland, and Delaware. We provide potholing, daylighting, slot trenching, and SUE Level A verification services. Our service area includes Virginia Beach, Norfolk, Chesapeake, Richmond, and Hampton Roads. For a free quote, call 757-785-5177 or visit beachhydrovac.com.`
};

// ============================================================
// PHP CODE FOR AI SCHEMAS
// ============================================================

function generateAISchemaPHP() {
  return `
// ============================================================
// AI SEARCH OPTIMIZATION SCHEMAS
// ============================================================

/**
 * Add HowTo Schema for AI Search
 */
function beachhydrovac_add_howto_schema() {
    if (is_admin()) return;

    // Only on relevant pages
    if (!is_page('services') && !is_front_page() && !is_page(array('hydro-excavation', 'potholing'))) return;

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

    echo '<script type="application/ld+json">' . wp_json_encode($howto_schema, JSON_UNESCAPED_SLASHES) . '</script>' . "\\n";
}
add_action('wp_head', 'beachhydrovac_add_howto_schema', 6);

/**
 * Add Speakable Schema for Voice AI
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

    echo '<script type="application/ld+json">' . wp_json_encode($speakable_schema, JSON_UNESCAPED_SLASHES) . '</script>' . "\\n";
}
add_action('wp_head', 'beachhydrovac_add_speakable_schema', 6);

/**
 * Add DefinedTerm Schema for AI Entity Understanding
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
        echo '<script type="application/ld+json">' . wp_json_encode($entity, JSON_UNESCAPED_SLASHES) . '</script>' . "\\n";
    }
}
add_action('wp_head', 'beachhydrovac_add_entity_schemas', 6);

// ============================================================
// END AI SEARCH OPTIMIZATION
// ============================================================
`;
}

// ============================================================
// MAIN EXECUTION
// ============================================================

async function createPage(title, slug, content) {
  try {
    console.log(`Creating: ${title}...`);
    const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ title, slug, content, status: 'publish' })
    });

    if (response.ok) {
      const page = await response.json();
      console.log(`  ✅ Created: ${page.link}`);
      return page;
    } else {
      const error = await response.text();
      if (error.includes('already exists')) {
        console.log(`  ⏭️  Already exists`);
      } else {
        console.log(`  ❌ Failed: ${error.substring(0, 100)}`);
      }
      return null;
    }
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('==========================================');
  console.log('Beach Hydrovac AI Search Optimization');
  console.log('==========================================\n');

  // 1. Create llms.txt file
  console.log('1. Creating llms.txt for AI crawlers...');
  writeFileSync('./llms.txt', LLMS_TXT);
  console.log('   ✅ Created: llms.txt\n');

  // 2. Create AI-optimized content page
  console.log('2. Creating AI-optimized content page...');
  await createPage(
    AI_OPTIMIZED_CONTENT.title,
    AI_OPTIMIZED_CONTENT.slug,
    AI_OPTIMIZED_CONTENT.content
  );

  // 3. Generate PHP code for AI schemas
  console.log('\n3. Generating AI Schema PHP code...');
  const phpCode = generateAISchemaPHP();
  writeFileSync('./ai-search-schemas.php', '<?php\n' + phpCode);
  console.log('   ✅ Created: ai-search-schemas.php\n');

  // 4. Summary
  console.log('==========================================');
  console.log('AI SEARCH OPTIMIZATION COMPLETE');
  console.log('==========================================\n');

  console.log('FILES CREATED:');
  console.log('  • llms.txt - AI crawler instructions');
  console.log('  • ai-search-schemas.php - HowTo, Speakable, Entity schemas');
  console.log('');
  console.log('DEPLOYMENT STEPS:');
  console.log('  1. Upload llms.txt to website root (beachhydrovac.com/llms.txt)');
  console.log('  2. Add ai-search-schemas.php content to functions.php');
  console.log('');
  console.log('AI PLATFORMS OPTIMIZED FOR:');
  console.log('  • ChatGPT / OpenAI');
  console.log('  • Google AI Overviews (SGE)');
  console.log('  • Perplexity AI');
  console.log('  • Bing Chat / Copilot');
  console.log('  • Claude AI');
  console.log('  • Voice assistants (Alexa, Siri, Google Assistant)');
}

main().catch(console.error);
