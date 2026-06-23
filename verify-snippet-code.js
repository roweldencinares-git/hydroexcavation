import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(
  process.env.BEACH_HYDROVAC_WP_USER + ':' + process.env.BEACH_HYDROVAC_WP_PASSWORD
).toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

async function main() {
  const r = await fetch(`${WP_URL}/wp-json/code-snippets/v1/snippets/7`, { headers });
  const snippet = await r.json();

  console.log('Snippet #7 Status:');
  console.log(`  Active: ${snippet.active}`);
  console.log(`  Code length: ${snippet.code.length} chars`);
  console.log(`  Name: ${snippet.name}`);

  // Check for all schema types in code
  const checks = [
    { name: 'Canonical fix', pattern: 'pages_needing_canonical' },
    { name: 'LocalBusiness', pattern: '"@type": "LocalBusiness"' },
    { name: 'Service', pattern: '"@type": "Service"' },
    { name: 'FAQPage', pattern: '"@type": "FAQPage"' },
    { name: 'WebSite', pattern: '"@type": "WebSite"' },
    { name: 'BreadcrumbList', pattern: 'BreadcrumbList' },
    { name: 'HowTo (3695)', pattern: 'is_single(3695)' },
    { name: 'HowTo (3697)', pattern: 'is_single(3697)' },
  ];

  console.log('\nSchema types in code:');
  for (const check of checks) {
    const found = snippet.code.includes(check.pattern);
    console.log(`  ${found ? '✅' : '❌'} ${check.name}`);
  }

  // Check for PHP syntax issues
  const phpOpens = (snippet.code.match(/<\?php/g) || []).length;
  const phpCloses = (snippet.code.match(/\?>/g) || []).length;
  console.log(`\nPHP tags: <?php = ${phpOpens}, ?> = ${phpCloses}`);
  if (phpOpens !== phpCloses) {
    console.log('⚠️  WARNING: PHP open/close tags mismatch!');
  }

  // Check add_action count
  const actionCount = (snippet.code.match(/add_action\('wp_head'/g) || []).length;
  console.log(`add_action('wp_head') calls: ${actionCount}`);

  // Show first and last 500 chars
  console.log('\n--- FIRST 300 CHARS ---');
  console.log(snippet.code.substring(0, 300));
  console.log('\n--- LAST 300 CHARS ---');
  console.log(snippet.code.substring(snippet.code.length - 300));
}

main().catch(console.error);
