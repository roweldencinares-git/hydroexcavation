import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(
  process.env.BEACH_HYDROVAC_WP_USER + ':' + process.env.BEACH_HYDROVAC_WP_PASSWORD
).toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

async function main() {
  // Get the service-areas page
  const r = await fetch(`${WP_URL}/wp-json/wp/v2/pages/3468?context=edit`, { headers });
  const page = await r.json();
  let content = page.content.raw;

  // Add Eastern Shore section after the Hampton Roads list (after Williamsburg)
  // Insert right after the Williamsburg entry in the Hampton Roads section
  const williamsburgLine = '<li><a href="/locations/williamsburg/">Williamsburg, VA</a></li>';
  const easternShoreEntry = `${williamsburgLine}
<li><a href="/locations/eastern-shore/">Eastern Shore, VA</a> (Accomack &amp; Northampton Counties)</li>`;

  content = content.replace(williamsburgLine, easternShoreEntry);

  // Update the page
  const resp = await fetch(`${WP_URL}/wp-json/wp/v2/pages/3468`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ content })
  });

  if (resp.ok) {
    console.log('Service Areas page updated - Eastern Shore link added!');
  } else {
    console.log('Failed:', resp.status);
    const err = await resp.text();
    console.log(err.substring(0, 300));
  }
}

main().catch(console.error);
