import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://silver-raccoon-464412.hostingersite.com';
const WP_USER = process.env.BEACH_HYDROVAC_WP_USER;
const WP_APP_PASSWORD = process.env.BEACH_HYDROVAC_WP_PASSWORD;

const headers = {
  'Authorization': 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64'),
  'Content-Type': 'application/json'
};

async function setupNavigation() {
  console.log('==========================================');
  console.log('Setting Up Navigation Menu');
  console.log('==========================================\n');

  // Get all pages
  const pagesResponse = await fetch(`${WP_URL}/wp-json/wp/v2/pages?per_page=100`, { headers });
  const pages = await pagesResponse.json();

  console.log('Found pages:');
  pages.forEach(p => {
    console.log(`  - ${p.title.rendered} (ID: ${p.id})`);
  });

  // Find page IDs
  const homePage = pages.find(p => p.slug === 'home');
  const servicesPage = pages.find(p => p.slug === 'services');
  const aboutPage = pages.find(p => p.slug === 'about');
  const contactPage = pages.find(p => p.slug === 'contact');

  console.log('\n📝 Menu structure:');
  console.log('  1. Home');
  console.log('  2. Services');
  console.log('  3. About');
  console.log('  4. Contact\n');

  // Create menu
  const menuResponse = await fetch(`${WP_URL}/wp-json/wp/v2/menus`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name: 'Primary Menu',
      slug: 'primary-menu'
    })
  });

  if (menuResponse.ok) {
    const menu = await menuResponse.json();
    console.log('✅ Menu created!');
    console.log('   Menu ID:', menu.id);

    // Add menu items
    const menuItems = [
      { title: 'Home', object_id: homePage?.id, type: 'post_type', menu_order: 1 },
      { title: 'Services', object_id: servicesPage?.id, type: 'post_type', menu_order: 2 },
      { title: 'About', object_id: aboutPage?.id, type: 'post_type', menu_order: 3 },
      { title: 'Contact', object_id: contactPage?.id, type: 'post_type', menu_order: 4 }
    ];

    for (const item of menuItems) {
      if (item.object_id) {
        const itemResponse = await fetch(`${WP_URL}/wp-json/wp/v2/menu-items`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            title: item.title,
            object_id: item.object_id,
            type: 'post_type',
            object: 'page',
            menu_order: item.menu_order,
            menus: menu.id
          })
        });

        if (itemResponse.ok) {
          console.log(`✅ Added: ${item.title}`);
        } else {
          console.log(`⚠️  Could not add: ${item.title}`);
        }
      }
    }

    // Assign to primary location
    const locationsResponse = await fetch(`${WP_URL}/wp-json/wp/v2/menu-locations/primary`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        menu: menu.id
      })
    });

    if (locationsResponse.ok) {
      console.log('\n✅ Menu assigned to primary location!');
    } else {
      console.log('\n⚠️  Menu created but may need manual assignment');
      console.log('   Go to: Appearance → Menus → Assign to Primary Menu');
    }

  } else {
    const error = await menuResponse.text();
    console.log('ℹ️  Could not create menu via API:', error.substring(0, 200));
    console.log('\n📝 Manual Setup:');
    console.log('1. Go to: Appearance → Menus');
    console.log('2. Create menu: "Primary Menu"');
    console.log('3. Add pages: Home, Services, About, Contact');
    console.log('4. Assign to: Primary Menu location');
  }

  console.log('\n==========================================');
  console.log('Navigation Setup Complete!');
  console.log('==========================================\n');
}

setupNavigation().catch(console.error);
