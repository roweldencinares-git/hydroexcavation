import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(
  process.env.BEACH_HYDROVAC_WP_USER + ':' + process.env.BEACH_HYDROVAC_WP_PASSWORD
).toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

// Contact page ID (confirmed via API)
const PAGE_ID = 3434;

// New page content — NO Spectra blocks anywhere.
// Form is rendered via native wp:shortcode block using [sureforms id="4019"]
// This avoids all Spectra JS conflicts that prevent form submission.
const NEW_CONTENT = `<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem"}}},"backgroundColor":"base","layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group alignfull has-base-background-color has-background" style="padding-top:3rem;padding-bottom:3rem">

<!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"4rem"}}}} -->
<div class="wp-block-columns">

<!-- wp:column {"width":"55%"} -->
<div class="wp-block-column" style="flex-basis:55%">

<!-- wp:heading {"style":{"typography":{"fontSize":"2rem","fontWeight":"900"}}} -->
<h2 class="wp-block-heading" style="font-size:2rem;font-weight:900">Request a Quote</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"style":{"spacing":{"margin":{"bottom":"1.5rem"}}}} -->
<p style="margin-bottom:1.5rem">Fill out the form below and we'll get back to you with a customized quote for your project.</p>
<!-- /wp:paragraph -->

<!-- wp:shortcode -->
[sureforms id="4019"]
<!-- /wp:shortcode -->

</div>
<!-- /wp:column -->

<!-- wp:column {"width":"45%"} -->
<div class="wp-block-column" style="flex-basis:45%">

<!-- wp:heading {"style":{"typography":{"fontSize":"2rem","fontWeight":"900"}}} -->
<h2 class="wp-block-heading" style="font-size:2rem;font-weight:900">Contact Us</h2>
<!-- /wp:heading -->

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading">📧 Email</h4>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>General Inquiries</strong><br><a href="mailto:johnw@beachhydrovac.com">johnw@beachhydrovac.com</a></p>
<!-- /wp:paragraph -->

<!-- wp:separator {"className":"is-style-wide"} -->
<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading">📞 Call or Text</h4>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>Direct Line:</strong><br><a href="tel:7575105220">757-510-5220</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Mobile:</strong><br><a href="tel:7576338922">757-633-8922</a></p>
<!-- /wp:paragraph -->

<!-- wp:separator {"className":"is-style-wide"} -->
<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide"/>
<!-- /wp:separator -->

<!-- wp:heading {"level":4} -->
<h4 class="wp-block-heading">📍 Location</h4>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>Virginia Beach, VA 23456</strong><br>Serving VA, NC, MD &amp; DE</p>
<!-- /wp:paragraph -->

<!-- wp:separator {"className":"is-style-wide"} -->
<hr class="wp-block-separator has-alpha-channel-opacity is-style-wide"/>
<!-- /wp:separator -->

<!-- wp:buttons -->
<div class="wp-block-buttons">
<!-- wp:button {"backgroundColor":"luminous-vivid-amber","textColor":"black","style":{"border":{"radius":"50px"}}} -->
<div class="wp-block-button"><a class="wp-block-button__link has-black-color has-luminous-vivid-amber-background-color has-text-color has-background wp-element-button" href="tel:7575105220" style="border-radius:50px">📞 Call Direct Now</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->

</div>
<!-- /wp:column -->

</div>
<!-- /wp:columns -->

</div>
<!-- /wp:group -->

<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem"}}},"layout":{"type":"constrained","contentSize":"900px"}} -->
<div class="wp-block-group alignfull" style="padding-top:3rem;padding-bottom:3rem">

<!-- wp:heading {"textAlign":"center"} -->
<h2 class="wp-block-heading has-text-align-center">Frequently Asked Questions</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Everything you need to know about our Hydro-Excavation services.</p>
<!-- /wp:paragraph -->

<!-- wp:details -->
<details class="wp-block-details"><summary>What is Hydro-Excavation (Hydrovac)?</summary>
<!-- wp:paragraph -->
<p>Hydro-excavation is a non-destructive method of digging that uses pressurized water to loosen soil and a high-flow vacuum to remove the debris. This allows for surgical precision when uncovering sensitive underground utilities like gas lines, fiber optics, and water mains.</p>
<!-- /wp:paragraph --></details>
<!-- /wp:details -->

<!-- wp:details -->
<details class="wp-block-details"><summary>Why is Hydrovac safer than traditional digging?</summary>
<!-- wp:paragraph -->
<p>Traditional backhoes and excavators use metal buckets that can easily strike and rupture underground lines. Hydro-excavation uses water, which flows around pipes and cables without damaging them, significantly reducing the risk of utility strikes, service outages, and injuries.</p>
<!-- /wp:paragraph --></details>
<!-- /wp:details -->

<!-- wp:details -->
<details class="wp-block-details"><summary>What areas do you serve?</summary>
<!-- wp:paragraph -->
<p>As a division of AIM Locating, Beach HydroVac serves the entire Hampton Roads area — including Virginia Beach, Norfolk, Chesapeake, Suffolk, Portsmouth, Newport News, Hampton, Williamsburg, and the Eastern Shore — as well as Richmond and Central Virginia. We also extend services into North Carolina, Maryland, and Delaware for larger infrastructure projects.</p>
<!-- /wp:paragraph --></details>
<!-- /wp:details -->

<!-- wp:details -->
<details class="wp-block-details"><summary>Can you dig in frozen ground or hard clay?</summary>
<!-- wp:paragraph -->
<p>Yes. Our advanced trucks can use heated water to cut through frozen ground and high-pressure streams to break up the toughest clay and compacted soils that would be difficult for manual labor or standard machinery to handle.</p>
<!-- /wp:paragraph --></details>
<!-- /wp:details -->

<!-- wp:details -->
<details class="wp-block-details"><summary>Is hydro-excavation environmentally friendly?</summary>
<!-- wp:paragraph -->
<p>Absolutely. It reduces the amount of material removed from the site, causes less surface disruption, and prevents the chemical spills often associated with accidental utility punctures. All debris is contained within our vacuum tanks for proper disposal.</p>
<!-- /wp:paragraph --></details>
<!-- /wp:details -->

<!-- wp:paragraph {"align":"center","style":{"spacing":{"margin":{"top":"2rem"}}}} -->
<p class="has-text-align-center" style="margin-top:2rem">Still have questions? <a href="tel:7575105220">Call our experts today.</a></p>
<!-- /wp:paragraph -->

</div>
<!-- /wp:group -->

<!-- wp:html -->
<iframe
  title="Beach Hydrovac Location"
  src="https://maps.google.com/maps?q=2216+Mansion+Cross+Ln&z=14&hl=en&t=m&output=embed&iwloc=near"
  width="100%"
  height="400"
  style="border:0;display:block;"
  allowfullscreen=""
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade">
</iframe>
<!-- /wp:html -->

<!-- wp:html -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://beachhydrovac.com/contact/#faqpage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Hydro-Excavation (Hydrovac)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Hydro-excavation is a non-destructive method of digging that uses pressurized water to loosen soil and a high-flow vacuum to remove the debris. This allows for surgical precision when uncovering sensitive underground utilities like gas lines, fiber optics, and water mains."
      }
    },
    {
      "@type": "Question",
      "name": "Why is Hydrovac safer than traditional digging?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Traditional backhoes and excavators use metal buckets that can easily strike and rupture underground lines. Hydro-excavation uses water, which flows around pipes and cables without damaging them, significantly reducing the risk of utility strikes, service outages, and injuries."
      }
    },
    {
      "@type": "Question",
      "name": "What areas do you serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As a division of AIM Locating, Beach HydroVac serves the entire Hampton Roads area including Virginia Beach, Norfolk, Chesapeake, Suffolk, Portsmouth, Newport News, Hampton, Williamsburg, and the Eastern Shore. We also serve Richmond, Central Virginia, and extend services into North Carolina, Maryland, and Delaware for larger infrastructure projects."
      }
    },
    {
      "@type": "Question",
      "name": "Can you dig in frozen ground or hard clay?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Our advanced trucks can use heated water to cut through frozen ground and high-pressure streams to break up the toughest clay and compacted soils that would be difficult for manual labor or standard machinery to handle."
      }
    },
    {
      "@type": "Question",
      "name": "Is hydro-excavation environmentally friendly?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. It reduces the amount of material removed from the site, causes less surface disruption, and prevents the chemical spills often associated with accidental utility punctures. All debris is contained within our vacuum tanks for proper disposal."
      }
    }
  ]
}
</script>
<!-- /wp:html -->`;

async function main() {
  console.log('Updating contact page — removing all Spectra blocks, using shortcode for form...\n');

  const r = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${PAGE_ID}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ content: NEW_CONTENT })
  });

  const data = await r.json();

  if (r.ok) {
    console.log('✅ Contact page updated successfully');
    console.log(`   Status: ${data.status}`);
    console.log(`   URL: ${data.link}`);
    console.log('\nSpectra blocks removed. Form now uses [sureforms id="4019"] shortcode.');
    console.log('FAQ uses native WP details blocks. Map uses plain iframe embed.');
  } else {
    console.log('❌ Failed to update page');
    console.log(JSON.stringify(data, null, 2));
  }
}

main().catch(console.error);
