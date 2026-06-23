import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(
  process.env.BEACH_HYDROVAC_WP_USER + ':' + process.env.BEACH_HYDROVAC_WP_PASSWORD
).toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

const PARENT_ID = 3455; // /locations/ parent page

const content = `<div class="wp-block-cover alignfull" style="min-height:300px;aspect-ratio:unset;"><span aria-hidden="true" class="wp-block-cover__background has-deep-atlantic-background-color has-background-dim-100 has-background-dim"></span>
<div class="wp-block-cover__inner-container is-layout-flow wp-block-cover-is-layout-flow">
<h1 class="wp-block-heading has-text-align-center" style="font-size:3rem;font-weight:900">Hydro Excavation Services on Virginia&#8217;s Eastern Shore</h1>
<p class="has-text-align-center" style="font-size:1.25rem">Professional vacuum excavation, potholing, and daylighting services for Accomack &amp; Northampton Counties</p>
<div class="wp-block-buttons is-content-justification-center is-layout-flex wp-block-buttons-is-layout-flex">
<div class="wp-block-button"><a class="wp-block-button__link has-warm-shoreline-background-color has-background wp-element-button" style="border-radius:9999px" href="tel:7575105220">Call 757-510-5220</a></div>
<div class="wp-block-button"><a class="wp-block-button__link has-safety-cyan-background-color has-background wp-element-button" style="border-radius:9999px" href="/contact/">Get Free Quote</a></div>
</div>
</div>
</div>
<div class="wp-block-group has-white-background-color has-background is-layout-constrained wp-block-group-is-layout-constrained" style="padding-top:4rem;padding-bottom:4rem">
<h2 class="wp-block-heading has-text-align-center has-deep-atlantic-color has-text-color" style="font-size:2.25rem;font-weight:800">Eastern Shore&#8217;s Trusted Hydro Excavation Experts</h2>
<p class="has-text-align-center" style="margin-bottom:2rem">Beach Hydrovac provides professional hydro excavation services throughout Virginia&#8217;s Eastern Shore, including Accomack County and Northampton County. As a veteran-owned company based in Virginia Beach, we bring military precision to excavation projects across the Delmarva Peninsula.</p>
<div class="wp-block-columns is-layout-flex wp-block-columns-is-layout-flex">
<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
<h3 class="wp-block-heading has-deep-atlantic-color has-text-color">Why Choose Beach Hydrovac on the Eastern Shore?</h3>
<ul class="wp-block-list">
<li><strong>Eastern Shore Experience</strong> &#8211; We understand the unique soil conditions and sandy terrain of the Delmarva Peninsula</li>
<li><strong>Veteran-Owned</strong> &#8211; Military precision and discipline in every project</li>
<li><strong>Mobile Hydrovac Units</strong> &#8211; Our trucks travel to Chincoteague, Onancock, Cape Charles, and all Eastern Shore communities</li>
<li><strong>VDOT Compliant</strong> &#8211; SUE Level A verification meets all state requirements</li>
<li><strong>Fully Insured</strong> &#8211; Complete liability coverage for your protection</li>
</ul>
</div>
<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
<h3 class="wp-block-heading has-deep-atlantic-color has-text-color">Services We Offer on the Eastern Shore</h3>
<ul class="wp-block-list">
<li><a href="/services/hydro-excavation/">Hydro Excavation</a> &#8211; Non-destructive vacuum excavation</li>
<li><a href="/services/potholing/">Potholing &amp; Daylighting</a> &#8211; Utility location verification</li>
<li><a href="/services/slot-trenching/">Slot Trenching</a> &#8211; Precision trenches for cables</li>
<li><a href="/services/remote-excavation/">Remote Excavation</a> &#8211; 600ft hose reach capability</li>
<li><a href="/services/sue-level-a/">SUE Level A</a> &#8211; ASCE 38 compliant verification</li>
</ul>
</div>
</div>
</div>
<div class="wp-block-group has-background is-layout-constrained wp-block-group-is-layout-constrained" style="background:linear-gradient(135deg,rgb(0,65,106) 0%,rgb(39,174,253) 100%);padding-top:4rem;padding-bottom:4rem">
<h2 class="wp-block-heading has-text-align-center has-white-color has-text-color" style="font-size:2rem;font-weight:800">Industries We Serve on the Eastern Shore</h2>
<div class="wp-block-columns is-layout-flex wp-block-columns-is-layout-flex" style="margin-top:2rem">
<div class="wp-block-column has-white-background-color has-background is-layout-flow wp-block-column-is-layout-flow" style="border-radius:12px;padding-top:1.5rem;padding-right:1.5rem;padding-bottom:1.5rem;padding-left:1.5rem">
<p style="font-size:2rem">🌾</p>
<h4 class="wp-block-heading has-deep-atlantic-color has-text-color">Agriculture</h4>
<p style="font-size:0.9rem">Irrigation line installation &amp; repair</p>
</div>
<div class="wp-block-column has-white-background-color has-background is-layout-flow wp-block-column-is-layout-flow" style="border-radius:12px;padding-top:1.5rem;padding-right:1.5rem;padding-bottom:1.5rem;padding-left:1.5rem">
<p style="font-size:2rem">📡</p>
<h4 class="wp-block-heading has-deep-atlantic-color has-text-color">Telecom Companies</h4>
<p style="font-size:0.9rem">Fiber optic &amp; broadband installation</p>
</div>
<div class="wp-block-column has-white-background-color has-background is-layout-flow wp-block-column-is-layout-flow" style="border-radius:12px;padding-top:1.5rem;padding-right:1.5rem;padding-bottom:1.5rem;padding-left:1.5rem">
<p style="font-size:2rem">🏗️</p>
<h4 class="wp-block-heading has-deep-atlantic-color has-text-color">Municipal Projects</h4>
<p style="font-size:0.9rem">Water, sewer &amp; road infrastructure</p>
</div>
<div class="wp-block-column has-white-background-color has-background is-layout-flow wp-block-column-is-layout-flow" style="border-radius:12px;padding-top:1.5rem;padding-right:1.5rem;padding-bottom:1.5rem;padding-left:1.5rem">
<p style="font-size:2rem">⚡</p>
<h4 class="wp-block-heading has-deep-atlantic-color has-text-color">Electrical Contractors</h4>
<p style="font-size:0.9rem">Conduit and power line trenching</p>
</div>
</div>
</div>
<div class="wp-block-group has-base-background-color has-background is-layout-constrained wp-block-group-is-layout-constrained" style="padding-top:4rem;padding-bottom:4rem">
<h2 class="wp-block-heading has-text-align-center has-deep-atlantic-color has-text-color" style="font-size:2rem;font-weight:800">Eastern Shore Communities We Serve</h2>
<p class="has-text-align-center">Beach HydroVac provides hydro excavation across Virginia&#8217;s entire Eastern Shore, including Accomack County and Northampton County. From Chincoteague to Cape Charles, our mobile hydrovac units reach every community on the peninsula.</p>
<p class="has-text-align-center" style="margin-top:1rem"><strong>Accomack County:</strong> Chincoteague, Onancock, Onley, Parksley, Wachapreague, Tangier Island</p>
<p class="has-text-align-center"><strong>Northampton County:</strong> Cape Charles, Exmore, Nassawadox, Eastville, Cheriton</p>
<div class="wp-block-buttons is-content-justification-center is-layout-flex wp-block-buttons-is-layout-flex" style="margin-top:2rem">
<div class="wp-block-button"><a class="wp-block-button__link has-deep-atlantic-background-color has-background wp-element-button" style="border-radius:9999px" href="/service-areas/">View All Service Areas</a></div>
</div>
</div>
<div class="wp-block-group has-white-background-color has-background is-layout-constrained wp-block-group-is-layout-constrained" style="padding-top:4rem;padding-bottom:4rem">
<h2 class="wp-block-heading has-text-align-center has-deep-atlantic-color has-text-color" style="font-size:2rem;font-weight:800">Get Your Free Quote for the Eastern Shore</h2>
<p class="has-text-align-center" style="margin-bottom:2rem">Ready to start your project? Contact Beach Hydrovac today for a free, no-obligation quote. We respond quickly and provide competitive pricing for all hydro excavation services on Virginia&#8217;s Eastern Shore.</p>
<div class="wp-block-columns is-layout-flex wp-block-columns-is-layout-flex">
<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style="border-color:#e5e7eb;border-width:1px;border-radius:12px;padding-top:2rem;padding-right:2rem;padding-bottom:2rem;padding-left:2rem">
<h4 class="wp-block-heading has-text-align-center has-deep-atlantic-color has-text-color">📞 Call Us</h4>
<p class="has-text-align-center"><a href="tel:7575105220"><strong>757-510-5220</strong></a></p>
</div>
<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style="border-color:#e5e7eb;border-width:1px;border-radius:12px;padding-top:2rem;padding-right:2rem;padding-bottom:2rem;padding-left:2rem">
<h4 class="wp-block-heading has-text-align-center has-deep-atlantic-color has-text-color">✉️ Email Us</h4>
<p class="has-text-align-center"><a href="mailto:johnw@beachhydrovac.com">johnw@beachhydrovac.com</a></p>
</div>
</div>
</div>

<div class="wp-block-group has-background is-layout-constrained wp-block-group-is-layout-constrained" style="background-color:#f8f9fa;padding-top:3rem;padding-bottom:3rem;border-top:3px solid #00416a">
<h2 class="wp-block-heading has-text-align-center" style="font-size:1.75rem;font-weight:800;color:#00416a">Serving Virginia&#8217;s Eastern Shore &amp; Beyond</h2>
<p class="has-text-align-center" style="font-size:1.1rem;margin-bottom:1.5rem">Beach HydroVac provides reliable hydro excavation throughout the Eastern Shore and all of Virginia. Contact us for a free quote.</p>
<div class="wp-block-columns is-layout-flex wp-block-columns-is-layout-flex" style="max-width:800px;margin:0 auto">
<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
<h3 class="wp-block-heading" style="font-size:1.25rem;color:#00416a">Contact Us</h3>
<p><strong>Beach HydroVac</strong><br>A Division of AIM Locating<br>2216 Mansion Cross Ln<br>Virginia Beach, VA 23456<br><strong>Direct:</strong> <a href="tel:7575105220">757-510-5220</a><br><strong>Email:</strong> <a href="mailto:johnw@beachhydrovac.com">johnw@beachhydrovac.com</a></p>
</div>
<div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
<h3 class="wp-block-heading" style="font-size:1.25rem;color:#00416a">Nearby Service Areas</h3>
<p><a href="/locations/virginia-beach/">Virginia Beach</a> | <a href="/locations/norfolk/">Norfolk</a> | <a href="/locations/chesapeake/">Chesapeake</a></p>
<p style="margin-top:1rem"><a href="/services/hydro-excavation/" style="font-weight:700">All Services</a> | <a href="/service-areas/" style="font-weight:700">All Locations</a> | <a href="/contact/" style="font-weight:700">Get Free Quote</a></p>
</div>
</div>
</div>`;

async function main() {
  console.log('Creating Eastern Shore location page...\n');

  const resp = await fetch(`${WP_URL}/wp-json/wp/v2/pages`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      title: 'Hydro Excavation Eastern Shore VA | Accomack & Northampton County',
      slug: 'eastern-shore',
      content: content,
      status: 'publish',
      parent: PARENT_ID,
      meta: {
        _yoast_wpseo_title: 'Hydro Excavation Eastern Shore VA | Veteran-Owned Service',
        _yoast_wpseo_metadesc: 'Eastern Shore VA hydro excavation by a veteran-owned company. Potholing, daylighting, SUE verification across Accomack & Northampton Counties. Call 757-510-5220.',
        _yoast_wpseo_focuskw: 'hydro excavation eastern shore va'
      }
    })
  });

  if (resp.ok) {
    const data = await resp.json();
    console.log('Page created successfully!');
    console.log('  ID:', data.id);
    console.log('  URL:', data.link);
    console.log('  Status:', data.status);
    console.log('  Parent:', data.parent);
    console.log('  Slug:', data.slug);

    // Now update the schema snippet to include Eastern Shore
    console.log('\nUpdating schema to include Eastern Shore...');

    const snippetResp = await fetch(`${WP_URL}/wp-json/code-snippets/v1/snippets/7`, { headers });
    const snippet = await snippetResp.json();
    let code = snippet.code;

    // Add Eastern Shore to the service area cities in the schema
    // Find the Williamsburg entry and add Eastern Shore after it
    code = code.replace(
      `"name": "Williamsburg"`,
      `"name": "Williamsburg"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Eastern Shore of Virginia"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Accomack County"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Northampton County"`
    );

    const updateResp = await fetch(`${WP_URL}/wp-json/code-snippets/v1/snippets/7`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ code, active: true })
    });

    if (updateResp.ok) {
      console.log('Schema updated - Eastern Shore added to service areas!');
    } else {
      console.log('Schema update failed:', updateResp.status);
    }
  } else {
    console.log('Page creation failed:', resp.status);
    const err = await resp.text();
    console.log(err.substring(0, 500));
  }
}

main().catch(console.error);
