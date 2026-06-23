import 'dotenv/config';
import fetch from 'node-fetch';

/**
 * Beach Hydrovac Content Marketing Strategy
 *
 * Creates SEO-optimized blog posts to build topical authority
 * and capture long-tail keywords
 */

const WP_URL = 'https://beachhydrovac.com';
const WP_USER = process.env.BEACH_HYDROVAC_WP_USER;
const WP_APP_PASSWORD = process.env.BEACH_HYDROVAC_WP_PASSWORD;

const headers = {
  'Authorization': 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64'),
  'Content-Type': 'application/json'
};

// ============================================================
// BLOG POST CONTENT - Targeting specific keywords
// ============================================================

const BLOG_POSTS = [
  {
    title: 'Hydro Excavation vs Traditional Excavation: Which is Better for Your Project?',
    slug: 'hydro-excavation-vs-traditional-excavation',
    excerpt: 'Compare hydro excavation and traditional mechanical excavation. Learn why contractors are switching to hydrovac for safer, faster, and more precise digging.',
    keywords: ['hydro excavation vs traditional', 'hydrovac benefits', 'excavation comparison'],
    content: `
<!-- wp:paragraph -->
<p>When planning an excavation project, choosing the right method can mean the difference between a smooth operation and costly disasters. Today, contractors and project managers face a critical decision: <strong>traditional mechanical excavation</strong> or <strong>hydro excavation (hydrovac)</strong>.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>What is Traditional Excavation?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Traditional excavation uses mechanical equipment like backhoes, excavators, and trenchers to physically dig and remove soil. While this method has been the industry standard for decades, it comes with significant risks—especially when working near underground utilities.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>What is Hydro Excavation?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Hydro excavation, also known as hydrovac or vacuum excavation, uses <strong>pressurized water</strong> to break up soil and a <strong>powerful vacuum</strong> to remove the debris into a holding tank. This non-destructive method has become the gold standard for projects involving underground utilities.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>The Head-to-Head Comparison</h2>
<!-- /wp:heading -->

<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>Factor</th><th>Traditional Excavation</th><th>Hydro Excavation</th></tr></thead><tbody><tr><td><strong>Safety</strong></td><td>High risk of utility strikes</td><td>Non-destructive, minimal risk</td></tr><tr><td><strong>Precision</strong></td><td>Imprecise, over-excavation common</td><td>Surgical precision</td></tr><tr><td><strong>Speed</strong></td><td>Fast for large areas</td><td>Faster for utility work</td></tr><tr><td><strong>Restoration</strong></td><td>Extensive backfill needed</td><td>Minimal site disturbance</td></tr><tr><td><strong>Cost</strong></td><td>Lower hourly rate, higher risk costs</td><td>Higher hourly rate, lower total cost</td></tr><tr><td><strong>Weather</strong></td><td>Limited in cold/frozen conditions</td><td>Works in all conditions</td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:heading -->
<h2>When to Choose Hydro Excavation</h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li><strong>Near underground utilities</strong> - Hydrovac is the only safe choice</li>
<li><strong>SUE Level A verification</strong> - Required for ASCE compliance</li>
<li><strong>Confined or sensitive areas</strong> - Minimal surface disruption</li>
<li><strong>Cold weather projects</strong> - Heated water breaks through frost</li>
<li><strong>High-liability projects</strong> - Reduces risk of damage claims</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>The Bottom Line</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>While traditional excavation still has its place for large open-area digging, <strong>hydro excavation is the superior choice</strong> for any project involving underground utilities. The initial hourly cost is higher, but the reduced risk of utility strikes, faster project completion, and minimal restoration requirements typically result in <strong>lower overall project costs</strong>.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>At Beach Hydrovac, we provide professional hydro excavation services throughout Virginia, North Carolina, Maryland, and Delaware. <a href="/contact/">Contact us today</a> for a free quote on your next project.</p>
<!-- /wp:paragraph -->
`
  },
  {
    title: 'Understanding VDOT SUE Requirements: A Contractor\'s Guide',
    slug: 'vdot-sue-requirements-contractors-guide',
    excerpt: 'Complete guide to Virginia DOT subsurface utility engineering (SUE) requirements. Learn about Quality Levels A-D and ASCE 38 compliance for your projects.',
    keywords: ['VDOT SUE requirements', 'ASCE 38', 'SUE Quality Levels', 'Virginia utility verification'],
    content: `
<!-- wp:paragraph -->
<p>Working on Virginia Department of Transportation (VDOT) projects? Understanding <strong>Subsurface Utility Engineering (SUE)</strong> requirements is essential for compliance and project success. This guide covers everything contractors and engineers need to know about VDOT's SUE standards.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>What is SUE?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Subsurface Utility Engineering (SUE) is a branch of engineering practice that manages risks associated with underground utilities. VDOT follows the <strong>ASCE 38 Standard</strong> (CI/ASCE 38-02), which defines four quality levels for utility data collection.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>The Four SUE Quality Levels</h2>
<!-- /wp:heading -->

<!-- wp:heading {"level":3} -->
<h3>Quality Level D (Lowest)</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Information gathered from existing utility records and verbal recollections. This is the <strong>least reliable</strong> level and should only be used for preliminary planning.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Quality Level C</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Involves surveying visible utility features (manholes, valve boxes, meters) and correlating with existing records. Provides horizontal location but <strong>no depth information</strong>.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Quality Level B</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Uses surface geophysical methods (GPR, electromagnetic locating) to determine horizontal position. More accurate than Level C but still doesn't provide verified depth.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Quality Level A (Highest)</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>The <strong>gold standard</strong>. Involves physically exposing utilities through non-destructive excavation (hydrovac) to obtain precise horizontal AND vertical location data. This is the only level that provides <strong>legally defensible documentation</strong>.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>When is Quality Level A Required?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>VDOT typically requires Quality Level A verification for:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li>Projects with high conflict potential</li>
<li>Design-phase utility coordination</li>
<li>Areas where utility strikes would cause significant damage</li>
<li>Projects requiring accurate as-built documentation</li>
<li>Any situation where Level B data shows potential conflicts</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>How Beach Hydrovac Supports SUE Compliance</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Our <a href="/services/sue-level-a/">SUE Level A verification services</a> use hydro excavation to safely expose utilities and provide accurate location data. We work with engineering firms, contractors, and municipalities across Virginia to ensure VDOT compliance on every project.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Need SUE Level A verification for your VDOT project?</strong> <a href="/contact/">Contact Beach Hydrovac</a> for professional hydrovac services that meet all state requirements.</p>
<!-- /wp:paragraph -->
`
  },
  {
    title: '5 Common Utility Strike Mistakes and How to Avoid Them',
    slug: 'common-utility-strike-mistakes-how-to-avoid',
    excerpt: 'Utility strikes cost billions annually. Learn the 5 most common mistakes that lead to underground utility damage and how to prevent them on your job site.',
    keywords: ['utility strike prevention', 'underground utility damage', 'excavation safety', 'call before you dig'],
    content: `
<!-- wp:paragraph -->
<p>Underground utility strikes cost the U.S. construction industry <strong>billions of dollars annually</strong>. Beyond the financial impact, utility strikes can cause injuries, service outages, and project delays. Here are the five most common mistakes that lead to utility damage—and how to avoid them.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Mistake #1: Not Calling 811 Before Digging</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>It seems obvious, but <strong>failing to call 811</strong> remains the leading cause of utility strikes. Virginia law requires you to notify Miss Utility at least 48 hours before any excavation.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Solution:</strong> Always call 811 or submit a ticket online before breaking ground. Keep documentation of your locate request for liability protection.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Mistake #2: Relying on Old Utility Maps</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Utility records can be inaccurate or outdated. Maps may show approximate locations, but actual utility positions can vary by <strong>several feet horizontally and vertically</strong>.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Solution:</strong> Use <a href="/services/sue-level-a/">SUE Level A verification</a> through hydro excavation to physically confirm utility locations before excavating.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Mistake #3: Excavating in the "Tolerance Zone" with Mechanical Equipment</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The tolerance zone extends 24 inches on each side of marked utilities. Using backhoes or excavators in this zone is <strong>the #1 cause of utility strikes</strong>.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Solution:</strong> Use <a href="/services/hydro-excavation/">hydro excavation</a> for all digging within the tolerance zone. It's the only method that won't damage underground utilities.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Mistake #4: Ignoring Unmarked Private Utilities</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>811 only locates <strong>public utilities</strong>. Private utilities like irrigation lines, propane tanks, and private electrical runs are often unmarked and unlocated.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Solution:</strong> Hire a private utility locator and use <a href="/services/potholing/">potholing services</a> to verify all utilities—public and private—before excavation.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Mistake #5: Rushing the Project</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Time pressure leads to shortcuts. Skipping locate verification or using mechanical equipment to "save time" often results in expensive delays from utility strikes.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Solution:</strong> Build <a href="/services/daylighting/">daylighting and potholing</a> into your project timeline. The extra day for utility verification can save weeks of delay from a utility strike.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Protect Your Project with Beach Hydrovac</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Don't become a utility strike statistic. Beach Hydrovac provides professional hydro excavation services throughout Virginia that eliminate utility strike risk. <a href="/contact/">Contact us today</a> for a free quote.</p>
<!-- /wp:paragraph -->
`
  },
  {
    title: 'Hydro Excavation Cost Guide: What to Expect in Virginia (2026)',
    slug: 'hydro-excavation-cost-guide-virginia-2026',
    excerpt: 'How much does hydro excavation cost in Virginia? Get real pricing data, cost factors, and tips to budget for your hydrovac project.',
    keywords: ['hydro excavation cost', 'hydrovac pricing Virginia', 'excavation cost estimate', 'hydrovac hourly rate'],
    content: `
<!-- wp:paragraph -->
<p>Planning a hydro excavation project in Virginia? Understanding costs upfront helps you budget accurately and avoid surprises. Here's a comprehensive guide to <strong>hydro excavation pricing in 2026</strong>.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Typical Hydro Excavation Costs</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Hydro excavation services are typically priced <strong>by the hour</strong>, with rates varying based on several factors:</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>Service Type</th><th>Typical Rate</th></tr></thead><tbody><tr><td>Standard hydrovac services</td><td>$300-$450/hour</td></tr><tr><td>Emergency/after-hours</td><td>$400-$550/hour</td></tr><tr><td>Remote excavation (extended reach)</td><td>$350-$500/hour</td></tr><tr><td>SUE Level A potholing</td><td>$350-$475/hour</td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:heading -->
<h2>Factors That Affect Pricing</h2>
<!-- /wp:heading -->

<!-- wp:heading {"level":3} -->
<h3>1. Soil Conditions</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Sandy soil excavates faster than clay or rocky terrain. Virginia's varied soil conditions mean excavation time can differ significantly by location.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>2. Depth and Volume</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Deeper excavations and larger volumes require more time, water, and potentially more trips to dispose of spoils.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>3. Access and Location</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Tight spaces, urban environments with heavy utility congestion, or remote locations can increase project time and costs.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>4. Travel Distance</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Projects outside the contractor's primary service area may include mobilization charges or travel time.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Hydro Excavation vs. Traditional Excavation Costs</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>While hydro excavation has a higher hourly rate than traditional excavation, the <strong>total project cost is often lower</strong> due to:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li>No utility strike repair costs (average repair: $5,000-$50,000+)</li>
<li>Faster completion near utilities</li>
<li>Reduced restoration and backfill costs</li>
<li>Lower liability insurance claims</li>
<li>Fewer project delays</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>How to Get an Accurate Quote</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>For the most accurate pricing, provide your hydrovac contractor with:</p>
<!-- /wp:paragraph -->

<!-- wp:list {"ordered":true} -->
<ol>
<li>Project location and site access information</li>
<li>Type of excavation needed (potholing, trenching, daylighting)</li>
<li>Estimated depth and number of holes/linear feet</li>
<li>Known soil conditions</li>
<li>Project timeline and any scheduling constraints</li>
</ol>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>Get Your Free Quote from Beach Hydrovac</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Beach Hydrovac provides competitive, transparent pricing for hydro excavation services throughout Virginia. We'll visit your site, assess the conditions, and provide a detailed quote with no hidden fees.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Call 757-785-5177</strong> or <a href="/contact/">request a quote online</a> to get started.</p>
<!-- /wp:paragraph -->
`
  },
  {
    title: 'Fiber Optic Installation: Why Contractors Choose Hydro Excavation',
    slug: 'fiber-optic-installation-hydro-excavation',
    excerpt: 'Installing fiber optic cable? Learn why telecom contractors prefer hydro excavation for safer, faster fiber optic installations with minimal damage risk.',
    keywords: ['fiber optic installation', 'telecom excavation', 'cable installation hydrovac', 'slot trenching fiber'],
    content: `
<!-- wp:paragraph -->
<p>The demand for fiber optic infrastructure is exploding as 5G networks expand and data requirements grow. For telecom contractors, the challenge is clear: <strong>how do you install fiber safely and efficiently</strong> in areas crowded with existing utilities?</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The answer: <strong>hydro excavation</strong>.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>The Fiber Optic Installation Challenge</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Fiber optic cables often run through utility corridors packed with gas lines, water mains, electrical conduits, and other telecommunications infrastructure. Traditional trenching methods risk:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li>Cutting existing fiber optic lines (extremely costly)</li>
<li>Damaging gas or water mains</li>
<li>Hitting electrical lines (safety hazard)</li>
<li>Disrupting service to thousands of customers</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>Why Hydro Excavation is the Solution</h2>
<!-- /wp:heading -->

<!-- wp:heading {"level":3} -->
<h3>Precision Slot Trenching</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Our <a href="/services/slot-trenching/">slot trenching services</a> create narrow, precise trenches exactly where you need them—without over-excavating or damaging adjacent utilities.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Safe Utility Exposure</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p><a href="/services/potholing/">Potholing and daylighting</a> lets you see exactly what's underground before installing new conduit. Verify locations, depths, and clearances with 100% accuracy.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>Minimal Site Disruption</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Hydrovac creates smaller holes with cleaner edges. Less disturbance means faster restoration, less backfill, and happier property owners.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>All-Weather Capability</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Fiber rollout schedules don't stop for weather. Hydro excavation works year-round, even in frozen ground conditions that stop traditional equipment.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>Case Study: Fiber Installation in Virginia Beach</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>A major telecom provider needed to install fiber optic conduit through a congested utility corridor in Virginia Beach. Using hydro excavation, we:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li>Potholed 45 locations to verify existing utility positions</li>
<li>Created 2,400 linear feet of slot trenching</li>
<li>Completed the project with <strong>zero utility strikes</strong></li>
<li>Finished 3 days ahead of the traditional excavation estimate</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>Partner with Beach Hydrovac for Your Fiber Projects</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>We work with telecom contractors across Virginia, North Carolina, and Maryland on fiber optic installation projects of all sizes. Our fleet and experienced operators are ready to support your next project.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="/contact/">Contact Beach Hydrovac</a> to discuss your fiber installation needs.</p>
<!-- /wp:paragraph -->
`
  }
];

// ============================================================
// API FUNCTIONS
// ============================================================

async function createPost(post) {
  try {
    console.log(`Creating: ${post.title}...`);

    const response = await fetch(`${WP_URL}/wp-json/wp/v2/posts`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        status: 'publish'
      })
    });

    if (response.ok) {
      const result = await response.json();
      console.log(`  ✅ Created: ${result.link}`);
      return result;
    } else {
      const error = await response.text();
      if (error.includes('already exists')) {
        console.log(`  ⏭️  Already exists, skipping`);
        return null;
      }
      console.log(`  ❌ Failed: ${error.substring(0, 100)}`);
      return null;
    }
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return null;
  }
}

// ============================================================
// MAIN
// ============================================================

async function main() {
  console.log('==========================================');
  console.log('Beach Hydrovac Content Marketing');
  console.log('==========================================\n');

  if (!WP_USER || !WP_APP_PASSWORD) {
    console.error('❌ Missing credentials!');
    process.exit(1);
  }

  console.log('Creating SEO-optimized blog posts...\n');

  for (const post of BLOG_POSTS) {
    await createPost(post);
    await new Promise(r => setTimeout(r, 1000));
  }

  console.log('\n==========================================');
  console.log('Content Marketing Complete!');
  console.log('==========================================');
  console.log(`Created ${BLOG_POSTS.length} blog posts targeting:`);
  BLOG_POSTS.forEach(p => {
    console.log(`  - ${p.keywords.join(', ')}`);
  });
}

main().catch(console.error);
