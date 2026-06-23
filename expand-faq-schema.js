import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(
  process.env.BEACH_HYDROVAC_WP_USER + ':' + process.env.BEACH_HYDROVAC_WP_PASSWORD
).toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

async function main() {
  // Get current snippet #7
  const r = await fetch(`${WP_URL}/wp-json/code-snippets/v1/snippets/7`, { headers });
  const snippet = await r.json();
  let code = snippet.code;

  // Replace the FAQ section with expanded 15-question version
  const oldFaqStart = '// FAQ schema on homepage, services, and FAQ page';
  const oldFaqEnd = '?>';

  // Find and replace the FAQ section
  const faqSectionStart = code.indexOf('// FAQ schema on homepage');
  const faqSectionEnd = code.lastIndexOf('?>');

  if (faqSectionStart === -1) {
    console.log('Could not find FAQ section in snippet');
    return;
  }

  const beforeFaq = code.substring(0, faqSectionStart);

  const newFaqSection = `// FAQ schema on homepage, services, and FAQ page - 15 questions for featured snippets
add_action('wp_head', function() {
  if (!is_front_page() && !is_page('services') && !is_page('faq')) return;
  ?>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is hydro excavation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hydro excavation uses pressurized water and a powerful vacuum system to safely break up and remove soil. It is the safest, most precise method for exposing underground utilities without risking damage to existing infrastructure. The water breaks up soil into slurry, which is then vacuumed into a debris tank on the hydrovac truck."
        }
      },
      {
        "@type": "Question",
        "name": "How much does hydro excavation cost in Virginia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hydro excavation in Virginia typically costs $300-$450 per hour for standard services, $350-$475/hour for SUE Level A potholing, and $400-$550/hour for emergency/after-hours work. Per-pothole pricing ranges from $250-$1,500 depending on depth. Contact Beach HydroVac at 757-510-5220 for a free project-specific quote."
        }
      },
      {
        "@type": "Question",
        "name": "What areas does Beach HydroVac serve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Beach HydroVac serves Virginia, North Carolina, Maryland, and Delaware. We are headquartered in Virginia Beach and cover Hampton Roads (Norfolk, Chesapeake, Suffolk, Portsmouth, Newport News, Hampton), the Eastern Shore, Williamsburg, Richmond, Northern Virginia (Alexandria, Arlington, Fairfax), Fredericksburg, Roanoke, and Lynchburg."
        }
      },
      {
        "@type": "Question",
        "name": "Is hydro excavation safer than traditional excavation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, hydro excavation is significantly safer than mechanical excavation. Pressurized water cannot cut through steel pipes, PVC conduit, or fiber optic cables, eliminating the risk of utility strikes. It also eliminates trench collapse risk since it creates small-diameter holes rather than open trenches. OSHA and VDOT both recommend hydro excavation near underground utilities."
        }
      },
      {
        "@type": "Question",
        "name": "What is SUE Level A verification?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SUE Level A (Subsurface Utility Engineering) is the highest accuracy level for utility location per ASCE 38-22 standards. It requires physically exposing utilities through potholing to determine their exact horizontal and vertical position within \\u00b16 inches. VDOT requires Level A verification at all critical conflict points on highway projects. Beach HydroVac provides VDOT-compliant SUE Level A services."
        }
      },
      {
        "@type": "Question",
        "name": "Does Beach HydroVac offer emergency services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Beach HydroVac offers emergency hydro excavation services across Virginia and the Mid-Atlantic. We respond to utility strikes, broken water mains, gas leaks, and urgent excavation needs. Call 757-510-5220 for immediate emergency assistance. Emergency rates are $400-$550/hour."
        }
      },
      {
        "@type": "Question",
        "name": "How long does hydro excavation take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A single pothole (12-18 inches diameter, 3-6 feet deep) typically takes 15-45 minutes depending on soil conditions. Sandy soil in coastal Virginia excavates fastest, while clay soil in Richmond takes longer. A full day of hydro excavation can complete 10-20 potholes. Larger projects like slot trenching for fiber optic installation vary by length and complexity."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between potholing and daylighting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Potholing and daylighting are essentially the same process—using hydro excavation to create a small hole that exposes an underground utility for visual verification. 'Potholing' typically refers to creating a vertical hole to verify a utility's depth and position. 'Daylighting' emphasizes exposing the utility to daylight so it can be seen and measured. Both are used interchangeably in the industry."
        }
      },
      {
        "@type": "Question",
        "name": "Can hydro excavation damage underground utilities?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Pressurized water at 2,000-3,000 PSI cannot cut through steel pipes, PVC conduit, concrete encasements, or fiber optic cables. This is the fundamental safety advantage of hydro excavation over mechanical methods. The water is strong enough to break up soil but gentle enough to leave utilities completely undamaged. This is why it's called non-destructive excavation."
        }
      },
      {
        "@type": "Question",
        "name": "Do you need permits for hydro excavation in Virginia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You must call Virginia 811 (Miss Utility) at least 48 business hours before any excavation in Virginia—this is state law (§56-265.17). Additional permits may be required depending on location: VDOT right-of-way permits for state roads, city excavation permits for municipal roads, and traffic control permits if lane closures are needed. Beach HydroVac can advise on permit requirements for your specific project."
        }
      },
      {
        "@type": "Question",
        "name": "Is Beach HydroVac veteran-owned?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Beach HydroVac is a veteran-owned hydro excavation company based in Virginia Beach, VA. We are a division of Advanced Infrastructure Mapping, LLC (AIM Locating). Our military background brings discipline, precision, and safety-first culture to every excavation project."
        }
      },
      {
        "@type": "Question",
        "name": "What is the 811 tolerance zone in Virginia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Virginia's tolerance zone is 24 inches on either side of a marked utility line, creating a 4-foot total window. Excavation within this tolerance zone must use careful and prudent methods—which most Virginia municipalities and VDOT interpret as requiring hand digging or hydro excavation. Mechanical equipment like backhoes should not be used within the tolerance zone."
        }
      },
      {
        "@type": "Question",
        "name": "Can hydro excavation work in frozen ground?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Hydrovac trucks can heat the water to cut through frozen ground, making hydro excavation one of the only viable methods for winter excavation in Virginia. Traditional mechanical equipment struggles with frozen soil, and hand digging frozen ground is extremely slow. Heated hydro excavation works effectively even when the ground is frozen several inches deep."
        }
      },
      {
        "@type": "Question",
        "name": "How far can a hydrovac truck reach?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Beach HydroVac's trucks can reach up to 600 feet from the vehicle using extended remote hose systems. This is critical for restricted-access job sites where the truck can't park directly adjacent to the dig location—such as backyards, between buildings, inside fenced compounds, or on steep hillsides in areas like Roanoke and Lynchburg."
        }
      },
      {
        "@type": "Question",
        "name": "How do I get a free quote from Beach HydroVac?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Call 757-510-5220 or visit beachhydrovac.com/contact to request a free, no-obligation quote. Provide your project location, type of work needed, approximate number of holes or trench length, and desired timeline. We respond to quote requests within 24 hours and can typically schedule service within days of approval."
        }
      }
    ]
  }
  </script>
  <?php
}, 3);
?>`;

  const newCode = beforeFaq + newFaqSection;

  const updateResp = await fetch(`${WP_URL}/wp-json/code-snippets/v1/snippets/7`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ code: newCode, active: true })
  });

  if (updateResp.ok) {
    console.log('FAQ schema expanded: 6 → 15 questions');
    console.log('\nNew questions added:');
    console.log('  - How long does hydro excavation take?');
    console.log('  - What is the difference between potholing and daylighting?');
    console.log('  - Can hydro excavation damage underground utilities?');
    console.log('  - Do you need permits for hydro excavation in Virginia?');
    console.log('  - Is Beach HydroVac veteran-owned?');
    console.log('  - What is the 811 tolerance zone in Virginia?');
    console.log('  - Can hydro excavation work in frozen ground?');
    console.log('  - How far can a hydrovac truck reach?');
    console.log('  - How do I get a free quote from Beach HydroVac?');
  } else {
    console.log('Failed:', updateResp.status);
    const err = await updateResp.text();
    console.log(err.substring(0, 500));
  }
}

main().catch(console.error);
