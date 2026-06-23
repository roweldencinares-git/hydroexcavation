import fetch from 'node-fetch';

const WP_URL = 'https://springgreen-stinkbug-577322.hostingersite.com';
const AUTH = 'Basic ' + Buffer.from('roweldencinares@gmail.com:jqfA ESlL T5xL QsLo e0fI H4Pt').toString('base64');
const H = { 'Authorization': AUTH, 'Content-Type': 'application/json' };

// Virginia (3108), South Carolina (3109), + all 47 new states (3115-3161)
// Keep: North Carolina (3086) — has real city pages
const IDS = [3108, 3109, ...Array.from({length: 47}, (_, i) => 3115 + i)];

async function run() {
  console.log(`Deleting ${IDS.length} state pages...\n`);
  let ok = 0;
  for (const id of IDS) {
    const res = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${id}?force=true`, {
      method: 'DELETE', headers: H
    });
    const r = await res.json();
    if (r.deleted) {
      console.log(`✅ Deleted ID ${id}`);
      ok++;
    } else {
      console.log(`❌ Failed ID ${id}: ${JSON.stringify(r).substring(0,80)}`);
    }
    await new Promise(r => setTimeout(r, 150));
  }
  console.log(`\nDone — ${ok}/${IDS.length} deleted`);
}

run().catch(console.error);
