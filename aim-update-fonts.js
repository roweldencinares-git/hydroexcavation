import fetch from 'node-fetch';

const AIM_URL = 'https://aimlocatingva.com';
const auth = 'Basic ' + Buffer.from('Rowelden:VxoJ exxM 6ljY WGSD NbYW 8FP8').toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

async function main() {
  console.log('=== UPDATING SNIPPET #5 — MATCHING WEBSITE FONTS ===\n');

  const r = await fetch(`${AIM_URL}/wp-json/code-snippets/v1/snippets/5`, { headers });
  const snippet = await r.json();
  let code = snippet.code;

  console.log(`Current code: ${code.length} chars`);

  // 1. Update footer banner — change inline fonts to Karla/Quantico
  const oldFooter = `<div style="background:#0f2134;padding:20px 30px;text-align:center;border-top:3px solid #e8a020;">
    <p style="color:#ccc;margin:0 0 8px 0;font-size:14px;">
      <strong style="color:#fff;">Need Hydro Excavation?</strong> Our division
      <a href="https://beachhydrovac.com" style="color:#e8a020;text-decoration:none;font-weight:bold;" target="_blank" rel="noopener">Beach HydroVac</a>
      provides potholing, daylighting, slot trenching & vacuum excavation across Virginia.
      <a href="https://beachhydrovac.com/contact/" style="color:#e8a020;text-decoration:none;" target="_blank" rel="noopener">Get a Free Quote →</a>
    </p>
  </div>`;

  const newFooter = `<div style="background:#0f2134;padding:20px 30px;text-align:center;border-top:3px solid #e8a020;font-family:'Karla',sans-serif;">
    <p style="color:#ccc;margin:0 0 8px 0;font-size:14px;font-family:'Karla',sans-serif;">
      <strong style="color:#fff;font-family:'Quantico',sans-serif;">Need Hydro Excavation?</strong> Our division
      <a href="https://beachhydrovac.com" style="color:#e8a020;text-decoration:none;font-weight:bold;font-family:'Quantico',sans-serif;" target="_blank" rel="noopener">Beach HydroVac</a>
      provides potholing, daylighting, slot trenching & vacuum excavation across Virginia.
      <a href="https://beachhydrovac.com/contact/" style="color:#e8a020;text-decoration:none;font-family:'Karla',sans-serif;" target="_blank" rel="noopener">Get a Free Quote →</a>
    </p>
  </div>`;

  if (code.includes(oldFooter)) {
    code = code.replace(oldFooter, newFooter);
    console.log('✅ Footer banner — updated to Karla/Quantico');
  } else {
    console.log('⚠️  Footer banner — exact match not found, trying flexible match...');
    // Flexible replacement for the footer div
    code = code.replace(
      /(<div style="background:#0f2134;padding:20px 30px;text-align:center;border-top:3px solid #e8a020;)(">)/,
      '$1font-family:\'Karla\',sans-serif;$2'
    );
    code = code.replace(
      /(<p style="color:#ccc;margin:0 0 8px 0;font-size:14px;)(">)/,
      '$1font-family:\'Karla\',sans-serif;$2'
    );
    code = code.replace(
      /(<strong style="color:#fff;)(">Need Hydro Excavation\?)/,
      '$1font-family:\'Quantico\',sans-serif;$2'
    );
    console.log('✅ Footer banner — applied font overrides via regex');
  }

  // 2. Update location cross-links
  const oldLocationH3 = `<h3 style="margin:0 0 10px 0;font-size:16px;color:#333;">`;
  const newLocationH3 = `<h3 style="margin:0 0 10px 0;font-size:16px;color:#333;font-family:'Quantico',sans-serif;">`;

  const oldLocationP = `<p style="color:#555;margin:0;font-size:14px;line-height:1.6;">`;
  const newLocationP = `<p style="color:#555;margin:0;font-size:14px;line-height:1.6;font-family:'Karla',sans-serif;">`;

  if (code.includes(oldLocationH3)) {
    code = code.replace(oldLocationH3, newLocationH3);
    console.log('✅ Location cross-link H3 — updated to Quantico');
  }

  if (code.includes(oldLocationP)) {
    code = code.replace(oldLocationP, newLocationP);
    console.log('✅ Location cross-link body — updated to Karla');
  }

  // 3. Save updated snippet
  const updateR = await fetch(`${AIM_URL}/wp-json/code-snippets/v1/snippets/5`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ code, active: true })
  });

  if (updateR.ok) {
    const updated = await updateR.json();
    console.log(`\n✅ Snippet #5 saved — ${updated.code.length} chars`);
    console.log('\nFonts now match the website:');
    console.log('  Headings/bold text: Quantico (same as site H1-H6)');
    console.log('  Body text: Karla (same as site paragraphs)');
  } else {
    console.log(`\n❌ Save failed: ${updateR.status}`);
    console.log(await updateR.text());
  }
}

main().catch(console.error);
