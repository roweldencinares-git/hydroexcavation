import fetch from 'node-fetch';
const auth = 'Basic ' + Buffer.from('rdenci_16:0L9x p2O7 tdfs khVJ UFyl 1UZk').toString('base64');
const headers = { Authorization: auth, 'Content-Type': 'application/json' };

async function restoreFromRevision(pageId, revId, name) {
  const r = await fetch(`https://beachhydrovac.com/wp-json/wp/v2/pages/${pageId}/revisions/${revId}?context=edit`, {
    headers: { Authorization: auth }
  });
  const rev = await r.json();
  const raw = rev.content?.raw;
  if (!raw || !raw.includes('wp:spectra')) {
    console.log(`${name}: no spectra in revision!`);
    return;
  }

  const u = await fetch(`https://beachhydrovac.com/wp-json/wp/v2/pages/${pageId}`, {
    method: 'PUT', headers,
    body: JSON.stringify({ content: raw })
  });
  const result = await u.json();
  const saved = result.content?.raw || '';
  console.log(`${name} (ID:${pageId}): ${saved.includes('wp:spectra') ? '✅ Spectra restored' : '❌ Failed'} len=${saved.length}`);
}

Promise.all([
  restoreFromRevision(3346, 3428, 'About'),
  restoreFromRevision(3332, 3515, 'Services'),
]).catch(console.error);
