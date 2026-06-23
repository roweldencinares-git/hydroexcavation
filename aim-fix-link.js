import fetch from 'node-fetch';

const AIM_URL = 'https://aimlocatingva.com';
const auth = 'Basic ' + Buffer.from('Rowelden:VxoJ exxM 6ljY WGSD NbYW 8FP8').toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

async function main() {
  console.log('=== UPDATING "GET A FREE QUOTE" LINK ===\n');

  const r = await fetch(`${AIM_URL}/wp-json/code-snippets/v1/snippets/5`, { headers });
  const snippet = await r.json();
  let code = snippet.code;

  // Change contact link to services page
  const oldLink = 'https://beachhydrovac.com/contact/';
  const newLink = 'https://beachhydrovac.com/services/';

  const oldText = 'Get a Free Quote →';
  const newText = 'View Hydro Excavation Services →';

  code = code.replace(oldLink, newLink);
  code = code.replace(oldText, newText);

  console.log(`Old: ${oldLink} — "${oldText}"`);
  console.log(`New: ${newLink} — "${newText}"`);

  const updateR = await fetch(`${AIM_URL}/wp-json/code-snippets/v1/snippets/5`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ code, active: true })
  });

  if (updateR.ok) {
    console.log('\n✅ Updated — footer now links to services page instead of contact');
  } else {
    console.log(`\n❌ Failed: ${updateR.status}`);
  }
}

main().catch(console.error);
