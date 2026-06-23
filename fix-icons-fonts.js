import axios from 'axios';

const WP_URL = 'https://beachhydrovac.com';
const USERNAME = 'rdenci_16';
const APP_PASSWORD = '0L9x p2O7 tdfs khVJ UFyl 1UZk';
const auth = Buffer.from(`${USERNAME}:${APP_PASSWORD}`).toString('base64');

async function fixPage() {
  console.log('🔧 Fixing Font Awesome and icon display...\n');

  // Get current content
  const current = await axios.get(`${WP_URL}/wp-json/wp/v2/pages/10?context=edit`, {
    headers: { 'Authorization': `Basic ${auth}` }
  });

  let content = current.data.content.raw;

  // Fix 1: Change Font Awesome from lazy load to direct load
  content = content.replace(
    /<!-- wp:html -->\s*<link rel="preconnect"[^>]*>\s*<link href="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/6\.0\.0\/css\/all\.min\.css" rel="stylesheet" media="print" onload="this\.media='all'">\s*<noscript><link href="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/6\.0\.0\/css\/all\.min\.css" rel="stylesheet"><\/noscript>\s*<!-- \/wp:html -->/,
    `<!-- wp:html -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous">
<!-- /wp:html -->`
  );

  // Fix 2: Update icon HTML structure for better display
  // The icons should be inside the icon-circle divs with proper styling

  // Update the page
  const response = await axios.put(
    `${WP_URL}/wp-json/wp/v2/pages/10`,
    { content: content },
    { headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/json' } }
  );

  console.log('✅ Page updated with fixed Font Awesome loading');
  console.log('\n⚠️ You also need to add/update this CSS in the child theme:\n');

  const additionalCSS = `
/* ===========================================
   ICON FIXES - Add to child theme
   =========================================== */

/* Icon circles with proper sizing */
.icon-circle {
  width: 56px;
  height: 56px;
  min-width: 56px;
  background: rgba(247, 187, 20, 0.12);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-circle i {
  font-size: 24px;
  line-height: 1;
}

.icon-circle-lg {
  width: 72px;
  height: 72px;
  min-width: 72px;
  background: rgba(247, 187, 20, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-circle-lg i {
  font-size: 32px;
  line-height: 1;
}

/* Icon center for cards */
.icon-center {
  text-align: center;
  margin-bottom: 24px;
}

.icon-center i,
i.icon-large {
  font-size: 56px !important;
  line-height: 1;
  display: inline-block;
}

/* Golden sun color for icons */
.golden-sun, i.golden-sun {
  color: var(--golden-sun, #f7bb14) !important;
}

/* Deep navy color for icons */
.deep-navy, i.deep-navy {
  color: var(--deep-navy, #1a365d) !important;
}

/* Service area list icons */
.service-area-list i,
.footer-contact i {
  font-size: 16px;
  width: 20px;
  display: inline-block;
}

/* Veteran badge icon */
.veteran-badge i {
  font-size: 14px;
}

/* Font imports - ensure fonts load */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Montserrat:wght@600;700&display=swap');

/* Apply fonts */
.font-inter,
h1, h2, .section-heading, .cta-heading, .veteran-heading {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
}

.font-montserrat,
h3, h4, .card-title, .service-title, .capability-title, .footer-title {
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif !important;
}
`;

  console.log(additionalCSS);
  console.log('\n🔗 View: https://beachhydrovac.com');
}

fixPage().catch(err => console.error('Error:', err.response?.data || err.message));
