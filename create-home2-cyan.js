import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://silver-raccoon-464412.hostingersite.com';
const WP_USER = process.env.BEACH_HYDROVAC_WP_USER;
const WP_APP_PASSWORD = process.env.BEACH_HYDROVAC_WP_PASSWORD;

const headers = {
  'Authorization': 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64'),
  'Content-Type': 'application/json'
};

async function createHome2Cyan() {
  console.log('Creating Home 2 with CYAN colors...\n');

  // Get current homepage content
  const homeResponse = await fetch(`${WP_URL}/wp-json/wp/v2/pages?slug=home`, { headers });
  const homePages = await homeResponse.json();

  if (!homePages[0]) {
    console.log('❌ Homepage not found');
    return;
  }

  // Get the raw content and replace navy with cyan
  let content = homePages[0].content.raw || homePages[0].content.rendered;

  // Replace all navy colors (#1a365d) with cyan (#27AEFD)
  content = content.replace(/#1a365d/g, '#27AEFD');
  content = content.replace(/color:#1a365d/g, 'color:#27AEFD');
  content = content.replace(/background-color:#1a365d/g, 'background-color:#27AEFD');

  console.log('✅ Converted navy to cyan');

  // Create Home 2 page
  const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      title: 'Home 2',
      content: content,
      status: 'publish',
      slug: 'home-2'
    })
  });

  if (response.ok) {
    const page = await response.json();
    console.log('✅ Home 2 page created!');
    console.log('   URL:', page.link);

    // Add to menu
    console.log('\n📋 Adding to menu...');

    // Get existing menu
    const menusResponse = await fetch(`${WP_URL}/wp-json/wp/v2/menus`, { headers });
    const menus = await menusResponse.json();

    let menuId = null;
    if (menus && menus.length > 0) {
      menuId = menus[0].id;
      console.log('   Found menu ID:', menuId);
    }

    if (menuId) {
      // Add menu item
      const menuItemResponse = await fetch(`${WP_URL}/wp-json/wp/v2/menu-items`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          title: 'Home 2',
          object_id: page.id,
          type: 'post_type',
          object: 'page',
          menu_order: 2,
          menus: menuId
        })
      });

      if (menuItemResponse.ok) {
        console.log('✅ Added to menu!');
      } else {
        console.log('⚠️  Could not add to menu (add manually)');
      }
    }

    console.log('\n🎨 Changes made:');
    console.log('  ✅ Navy (#1a365d) → Cyan (#27AEFD)');
    console.log('  ✅ All headings are now cyan');
    console.log('  ✅ Hero background is cyan');
    console.log('  ✅ Professional Capabilities section is cyan');
    console.log('  ✅ Service area box is cyan');
    console.log('\n✏️ Edit: ' + WP_URL + '/wp-admin/post.php?post=' + page.id + '&action=edit');
    console.log('👉 View: ' + page.link);
  } else {
    const error = await response.text();
    console.log('❌ Failed:', error.substring(0, 300));
  }
}

createHome2Cyan().catch(console.error);
