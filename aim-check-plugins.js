import fetch from 'node-fetch';

const AIM_URL = 'https://aimlocatingva.com';
const auth = 'Basic ' + Buffer.from('Rowelden:VxoJ exxM 6ljY WGSD NbYW 8FP8').toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

async function main() {
  // Check plugins
  console.log('=== CHECKING PLUGINS ===\n');
  const pluginsR = await fetch(`${AIM_URL}/wp-json/wp/v2/plugins`, { headers });
  if (pluginsR.ok) {
    const plugins = await pluginsR.json();
    for (const p of plugins) {
      console.log(`  ${p.status === 'active' ? '✅' : '⬜'} ${p.name} (${p.status})`);
    }
  } else {
    console.log(`  Cannot list plugins: ${pluginsR.status}`);
    // Try common plugin endpoints
    console.log('\n  Checking known plugin APIs...');

    // Code Snippets
    const csR = await fetch(`${AIM_URL}/wp-json/code-snippets/v1/snippets`, { headers });
    console.log(`  Code Snippets: ${csR.ok ? '✅ Installed' : '❌ Not found (' + csR.status + ')'}`);

    // Yoast
    const homeR = await fetch(`${AIM_URL}/wp-json/wp/v2/pages/221`, { headers });
    const home = await homeR.json();
    const hasYoast = !!home.yoast_head_json;
    console.log(`  Yoast SEO: ${hasYoast ? '✅ Active (REST API fields present)' : '❌ Not detected'}`);
    if (hasYoast) {
      console.log(`    Yoast head JSON keys: ${Object.keys(home.yoast_head_json || {}).join(', ')}`);
    }

    // Check Yoast meta fields
    console.log('\n  Checking Yoast meta write access...');
    // Try reading existing meta
    const metaR = await fetch(`${AIM_URL}/wp-json/wp/v2/pages/221`, { headers });
    const metaData = await metaR.json();
    console.log(`  Page meta keys: ${Object.keys(metaData.meta || {}).join(', ') || 'none accessible'}`);
  }

  // Check what theme is active
  console.log('\n=== THEME CHECK ===\n');
  const homeHtml = await (await fetch(AIM_URL + '/')).text();

  if (homeHtml.includes('cornerstone')) console.log('  ✅ Cornerstone page builder detected');
  if (homeHtml.includes('/x/')) console.log('  ✅ X Theme detected');
  if (homeHtml.includes('/pro/')) console.log('  ✅ Pro Theme detected');

  // Check for theme framework
  const themeMatch = homeHtml.match(/wp-content\/themes\/([^\/]+)\//);
  if (themeMatch) console.log(`  Theme folder: ${themeMatch[1]}`);

  // Check if we can create posts (for blog content)
  console.log('\n=== WRITE ACCESS TEST ===\n');

  // Test Yoast meta update on a page
  const testR = await fetch(`${AIM_URL}/wp-json/wp/v2/pages/221`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      meta: {
        _yoast_wpseo_title: 'Private Utility Locating Virginia | 30+ Years Experience | AIM Locating'
      }
    })
  });

  if (testR.ok) {
    console.log('  ✅ Can update Yoast meta via REST API');
    // Revert
    await fetch(`${AIM_URL}/wp-json/wp/v2/pages/221`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ meta: { _yoast_wpseo_title: '' } })
    });
    console.log('  ✅ Reverted test change');
  } else {
    console.log(`  ❌ Cannot update pages: ${testR.status}`);
    const err = await testR.text();
    console.log(`  Error: ${err.substring(0, 300)}`);
  }

  // Check if we can create posts
  const postTestR = await fetch(`${AIM_URL}/wp-json/wp/v2/posts`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      title: 'TEST — DELETE ME',
      status: 'draft',
      content: 'Test post'
    })
  });

  if (postTestR.ok) {
    const testPost = await postTestR.json();
    console.log(`  ✅ Can create posts (test post ID: ${testPost.id})`);
    // Delete it
    await fetch(`${AIM_URL}/wp-json/wp/v2/posts/${testPost.id}?force=true`, {
      method: 'DELETE',
      headers
    });
    console.log('  ✅ Deleted test post');
  } else {
    console.log(`  ❌ Cannot create posts: ${postTestR.status}`);
  }

  // Check if Code Snippets can be installed or if there's another way to add PHP
  console.log('\n=== AVAILABLE API ROUTES ===\n');
  const routesR = await fetch(`${AIM_URL}/wp-json/`);
  const routes = await routesR.json();
  const namespaces = routes.namespaces || [];
  console.log('  Namespaces:', namespaces.join(', '));

  // Check for widget/sidebar API
  const widgetsR = await fetch(`${AIM_URL}/wp-json/wp/v2/widgets`, { headers });
  console.log(`  Widgets API: ${widgetsR.ok ? '✅ Available' : '❌ ' + widgetsR.status}`);

  // Check plugin install capability
  const installR = await fetch(`${AIM_URL}/wp-json/wp/v2/plugins`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ slug: 'code-snippets', status: 'active' })
  });
  if (installR.ok) {
    console.log('  ✅ Code Snippets plugin installed and activated!');
  } else {
    console.log(`  Plugin install: ${installR.status} — ${(await installR.text()).substring(0, 200)}`);
  }
}

main().catch(console.error);
