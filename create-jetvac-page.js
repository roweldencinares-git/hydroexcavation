import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(
  process.env.BEACH_HYDROVAC_WP_USER + ':' + process.env.BEACH_HYDROVAC_WP_PASSWORD
).toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

const page = {
  title: 'Jetvac Services Virginia Beach | Beach Hydrovac',
  slug: 'jetvac-services-virginia-beach',
  status: 'publish',
  content: `<!-- wp:paragraph -->
<p><strong>Jetvac</strong> — also called hydrovac, vacuum excavation, or hydro excavation — uses <strong>high-pressure water and an industrial vacuum</strong> to safely expose underground utilities and remove soil without any mechanical contact. If you've searched for jetvac service in Virginia Beach or Hampton Roads, Beach Hydrovac is the local answer.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Call us at <strong><a href="tel:7575105220">757-510-5220</a></strong> for same-week scheduling across Virginia Beach, Chesapeake, Norfolk, Suffolk, and the Eastern Shore.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">What Is Jetvac?</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Jetvac is the process of simultaneously jetting water at high pressure into the ground and vacuuming the resulting slurry into a debris tank on the truck. The result: a clean, precise excavation with <strong>zero risk of striking buried utilities</strong>.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The terms jetvac, hydrovac, and vacuum excavation are used interchangeably across the industry. All three describe the same core process — the name just varies by region and equipment manufacturer.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Jetvac vs. Mechanical Digging</h2>
<!-- /wp:heading -->

<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>Method</th><th>Utility Strike Risk</th><th>Precision</th><th>Surface Damage</th><th>Best For</th></tr></thead><tbody><tr><td>Jetvac / Hydrovac</td><td>None</td><td>Within inches</td><td>Minimal</td><td>Utility work, confined spaces, potholing</td></tr><tr><td>Mechanical Excavator</td><td>High</td><td>±12–18 inches</td><td>Significant</td><td>Large open-area earthmoving</td></tr><tr><td>Hand Digging</td><td>Low</td><td>Good</td><td>Low</td><td>Very small areas only</td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Our Jetvac Services in Virginia Beach</h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul>
<li><strong>Utility potholing</strong> — Expose gas, water, electric, and fiber lines before digging nearby</li>
<li><strong>Slot trenching</strong> — Narrow, precise trenches for new utility runs without disturbing surrounding soil</li>
<li><strong>Daylighting</strong> — Safely expose buried infrastructure for inspection, repair, or connection</li>
<li><strong>Catch basin cleaning</strong> — Vacuum out sediment and debris from stormwater basins</li>
<li><strong>Pipeline exposure</strong> — Uncover existing pipes for repair or tie-in without damage</li>
<li><strong>Emergency excavation</strong> — Fast response for utility strikes, leaks, or collapses</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Why Virginia Beach Contractors Choose Jetvac</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Virginia's 811 Miss Utility law requires you to call before you dig — but even after locates are marked, hitting an unmarked or shifted utility is a real risk with mechanical equipment. Jetvac eliminates that risk entirely because water pressure cannot cut through steel, PVC, fiber optic cable, or conduit.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li>Meets OSHA requirements for working near buried utilities</li>
<li>Accepted by Dominion Energy, Cox, and Virginia Natural Gas for work near their infrastructure</li>
<li>Reduces liability for general contractors and municipalities</li>
<li>Works in tight urban spaces where excavators can't fit</li>
<li>Heated water option for cold-weather and frozen ground operations</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Service Area</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Beach Hydrovac provides jetvac services across all of Hampton Roads and the Eastern Shore of Virginia, including:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li>Virginia Beach</li>
<li>Chesapeake</li>
<li>Norfolk</li>
<li>Suffolk</li>
<li>Portsmouth</li>
<li>Hampton</li>
<li>Newport News</li>
<li>Eastern Shore (Northampton &amp; Accomack Counties)</li>
</ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading">Frequently Asked Questions</h2>
<!-- /wp:heading -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Is jetvac the same as hydrovac?</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Yes. Jetvac and hydrovac refer to the same vacuum excavation process — high-pressure water breaks up soil while an industrial vacuum removes the slurry. The names are used interchangeably depending on the region and equipment brand.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">How much does jetvac service cost in Virginia Beach?</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Jetvac pricing depends on the scope of work — number of potholes, trench length, debris volume, and travel distance. Most utility potholing jobs in Virginia Beach range from a half-day to full-day rates. Contact Beach Hydrovac at 757-510-5220 for a direct quote.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">How quickly can you mobilize for jetvac work?</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Typically same-week scheduling for standard jobs. Emergency response is available for utility strikes or active leaks. Call 757-510-5220 to confirm availability.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Do you handle industrial jetvac projects?</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Yes. Beach Hydrovac regularly works with industrial facilities, municipalities, and general contractors on large-scale vacuum excavation projects across Hampton Roads. We're equipped for complex, multi-day, or high-volume debris jobs.</p>
<!-- /wp:paragraph -->

<!-- wp:separator -->
<hr class="wp-block-separator"/>
<!-- /wp:separator -->

<!-- wp:paragraph -->
<p><strong>Ready to schedule jetvac service in Virginia Beach?</strong> Call <a href="tel:7575105220"><strong>757-510-5220</strong></a> or <a href="/contact">request a quote online</a>. We serve all of Hampton Roads and the Eastern Shore.</p>
<!-- /wp:paragraph -->`,

  meta: {
    _yoast_wpseo_title: 'Jetvac Services Virginia Beach | Beach Hydrovac | 757-510-5220',
    _yoast_wpseo_metadesc: 'Jetvac (hydrovac) services in Virginia Beach & Hampton Roads. Safe vacuum excavation for utility potholing, slot trenching & pipeline exposure. Call 757-510-5220.',
    _yoast_wpseo_focuskw: 'jetvac Virginia Beach'
  }
};

// Also build the FAQ schema to inject via Yoast
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is jetvac the same as hydrovac?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Jetvac and hydrovac refer to the same vacuum excavation process — high-pressure water breaks up soil while an industrial vacuum removes the slurry. The names are used interchangeably depending on the region and equipment brand.'
      }
    },
    {
      '@type': 'Question',
      name: 'How much does jetvac service cost in Virginia Beach?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Jetvac pricing depends on the scope of work — number of potholes, trench length, debris volume, and travel distance. Contact Beach Hydrovac at 757-510-5220 for a direct quote.'
      }
    },
    {
      '@type': 'Question',
      name: 'How quickly can you mobilize for jetvac work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Typically same-week scheduling for standard jobs. Emergency response is available for utility strikes or active leaks. Call 757-510-5220.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do you handle industrial jetvac projects?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Beach Hydrovac works with industrial facilities, municipalities, and general contractors on large-scale vacuum excavation projects across Hampton Roads.'
      }
    }
  ]
};

async function createJetvacPage() {
  console.log('Creating jetvac service page...');

  const res = await fetch(`${WP_URL}/wp-json/wp/v2/pages`, {
    method: 'POST',
    headers,
    body: JSON.stringify(page)
  });

  const data = await res.json();

  if (!res.ok) {
    console.error('❌ Failed:', data.message || JSON.stringify(data));
    process.exit(1);
  }

  console.log(`✅ Page created: ${data.link}`);
  console.log(`   ID: ${data.id}`);
  console.log(`   Slug: ${data.slug}`);

  // Inject FAQ schema via Yoast schema block
  const schemaBlock = `\n<!-- wp:yoast-seo/faq-block ${JSON.stringify({ jsonFAQSchema: JSON.stringify(faqSchema) })} /-->`;
  await fetch(`${WP_URL}/wp-json/wp/v2/pages/${data.id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      content: data.content.raw + schemaBlock
    })
  });

  // Submit URL to GSC for indexing via seo.beachhydrovac.com
  console.log('\nSubmitting to GSC for indexing...');
  const gscRes = await fetch(
    `https://seo.beachhydrovac.com/api/gsc/submit?url=${encodeURIComponent(data.link)}`
  );
  const gscData = await gscRes.json().catch(() => ({}));
  if (gscData.success || gscData.submitted) {
    console.log('✅ Submitted to Google for indexing');
  } else {
    console.log('⚠️  GSC submit response:', JSON.stringify(gscData));
  }

  console.log('\nDone. Page live at:', data.link);
}

createJetvacPage().catch(console.error);
