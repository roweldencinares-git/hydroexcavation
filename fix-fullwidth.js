import axios from 'axios';

const WP_URL = 'https://beachhydrovac.com';
const USERNAME = 'rdenci_16';
const APP_PASSWORD = '0L9x p2O7 tdfs khVJ UFyl 1UZk';

const auth = Buffer.from(`${USERNAME}:${APP_PASSWORD}`).toString('base64');

// First, let's check what templates are available
async function checkAndFixPage() {
  console.log('Checking page 10 and setting full-width template...\n');

  try {
    // Get current page info
    const pageInfo = await axios.get(
      `${WP_URL}/wp-json/wp/v2/pages/10`,
      {
        headers: {
          'Authorization': `Basic ${auth}`
        }
      }
    );

    console.log('Current template:', pageInfo.data.template || 'default');
    
    // Update page with full-width template
    // Kadence theme uses these templates: full-width, canvas, etc.
    const response = await axios.post(
      `${WP_URL}/wp-json/wp/v2/pages/10`,
      {
        template: 'page-fullwidth.php'  // Try full-width first
      },
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Template updated!');
    console.log('New template:', response.data.template);

  } catch (error) {
    console.error('Error with full-width template, trying alternatives...');
    
    // Try other template names
    const templates = ['full-width', 'template-fullwidth', 'page-builder', 'elementor_canvas', 'blank'];
    
    for (const tmpl of templates) {
      try {
        const response = await axios.post(
          `${WP_URL}/wp-json/wp/v2/pages/10`,
          { template: tmpl },
          {
            headers: {
              'Authorization': `Basic ${auth}`,
              'Content-Type': 'application/json'
            }
          }
        );
        console.log(`✅ Template set to: ${tmpl}`);
        break;
      } catch (e) {
        console.log(`Template "${tmpl}" not available`);
      }
    }
  }
}

checkAndFixPage();
