import axios from 'axios';

const WP_URL = 'https://beachhydrovac.com';
const USERNAME = 'rdenci_16';
const APP_PASSWORD = '0L9x p2O7 tdfs khVJ UFyl 1UZk';
const auth = Buffer.from(`${USERNAME}:${APP_PASSWORD}`).toString('base64');

const minifiedCSS = `/* BeachHydrovac Optimized CSS */
:root{--navy:#1a365d;--gold:#f7bb14;--gold-light:#ffd65a}
@font-face{font-family:Inter;font-display:swap;src:url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2) format('woff2');font-weight:400 900}
@font-face{font-family:Montserrat;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw5aXo.woff2) format('woff2');font-weight:600 700}
body.page-id-10,body.page-id-10 .site,body.page-id-10 .site-content,body.page-id-10 .entry-content,body.page-id-10 article,.ast-container,.ast-separate-container .ast-article-single{max-width:100%!important;width:100%!important;padding:0!important;margin:0!important}
body.page-id-10 .alignfull{width:100vw!important;max-width:100vw!important;margin-left:calc(-50vw + 50%)!important;margin-right:calc(-50vw + 50%)!important}
body.elementor-template-canvas header,body.elementor-template-canvas footer,body.elementor-template-canvas .site-header,body.elementor-template-canvas .site-footer,.ast-header-break-point .site-header{display:none!important}
.font-inter{font-family:Inter,-apple-system,sans-serif!important}
.font-montserrat{font-family:Montserrat,-apple-system,sans-serif!important}
.deep-navy{color:var(--navy)!important}
.golden-sun{color:var(--gold)!important}
.hero-text-shadow{text-shadow:0 2px 4px rgba(0,0,0,.5),0 4px 8px rgba(0,0,0,.4),0 8px 16px rgba(0,0,0,.3)}
.golden-gradient{background:linear-gradient(135deg,var(--gold),var(--gold-light))!important}
.veteran-badge{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#B91C1C,#DC2626);color:#fff;padding:8px 18px;border-radius:9999px;font-weight:700;font-size:.85rem;box-shadow:0 4px 12px rgba(185,28,28,.3)}
.card-navy-border{border-top:4px solid var(--navy)!important;border-radius:16px!important;box-shadow:0 10px 40px rgba(0,0,0,.08)!important;transition:transform .3s,box-shadow .3s!important}
.card-gold-border{border-top:4px solid var(--gold)!important;border-radius:16px!important;box-shadow:0 10px 40px rgba(0,0,0,.08)!important;transition:transform .3s,box-shadow .3s!important}
.card-navy-border:hover,.card-gold-border:hover,.capability-card:hover{box-shadow:0 20px 60px rgba(0,0,0,.12)!important;transform:translateY(-4px)}
.icon-circle{width:52px;height:52px;min-width:52px;background:rgba(247,187,20,.12);border-radius:50%;display:flex;align-items:center;justify-content:center}
.icon-circle-lg{width:68px;height:68px;min-width:68px;background:rgba(247,187,20,.15);border-radius:50%;display:flex;align-items:center;justify-content:center}
.btn-primary .wp-block-button__link{background:var(--gold)!important;color:#fff!important;padding:18px 36px!important;border-radius:9999px!important;font-weight:700!important;font-size:18px!important;box-shadow:0 10px 30px rgba(247,187,20,.3)!important;transition:all .3s!important;border:0!important}
.btn-primary .wp-block-button__link:hover{background:var(--navy)!important;transform:translateY(-2px);box-shadow:0 15px 40px rgba(26,54,93,.3)!important}
.btn-secondary .wp-block-button__link{background:#fff!important;color:var(--navy)!important;padding:18px 36px!important;border-radius:9999px!important;font-weight:700!important;font-size:18px!important;box-shadow:0 10px 30px rgba(0,0,0,.1)!important;transition:all .3s!important;border:0!important}
.btn-secondary .wp-block-button__link:hover{background:var(--gold)!important;color:#fff!important;transform:translateY(-2px)}
.wp-block-cover__inner-container{max-width:1200px;margin:0 auto;padding:0 24px}
.capability-card{transition:transform .3s,box-shadow .3s!important}
@media(max-width:782px){.hero-heading{font-size:32px!important}.section-heading{font-size:28px!important}.wp-block-columns{flex-direction:column!important}.wp-block-column{flex-basis:100%!important;margin-bottom:24px}.btn-primary .wp-block-button__link,.btn-secondary .wp-block-button__link{padding:16px 28px!important;font-size:16px!important}}`;

async function addCSS() {
  console.log('🔍 Adding CSS to WordPress Customizer...\n');

  try {
    // Try to get existing custom_css posts
    const cssCheck = await axios.get(`${WP_URL}/wp-json/wp/v2/custom_css`, {
      headers: { 'Authorization': `Basic ${auth}` }
    }).catch(() => ({ data: [] }));

    console.log('Found', cssCheck.data.length, 'existing custom CSS entries');

    if (cssCheck.data && cssCheck.data.length > 0) {
      // Update existing
      console.log('Updating existing custom CSS (ID:', cssCheck.data[0].id + ')...');
      const response = await axios.put(
        `${WP_URL}/wp-json/wp/v2/custom_css/${cssCheck.data[0].id}`,
        {
          content: { raw: minifiedCSS },
          status: 'publish'
        },
        { headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/json' } }
      );
      console.log('✅ Custom CSS updated!');
      console.log('   ID:', response.data.id);
      console.log('   Length:', response.data.content?.raw?.length || 'N/A', 'chars');
    } else {
      // Create new
      console.log('Creating new custom CSS entry...');
      const response = await axios.post(
        `${WP_URL}/wp-json/wp/v2/custom_css`,
        {
          content: { raw: minifiedCSS },
          status: 'publish'
        },
        { headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/json' } }
      );
      console.log('✅ Custom CSS created!');
      console.log('   ID:', response.data.id);
    }

    console.log('\n🔗 View site: https://beachhydrovac.com');

  } catch (error) {
    console.log('❌ API Error:', error.response?.data?.message || error.message);
    console.log('\n📋 The CSS needs to be added manually:');
    console.log('   1. Go to: https://beachhydrovac.com/wp-admin/customize.php');
    console.log('   2. Click "Additional CSS"');
    console.log('   3. Paste the CSS from beachhydrovac-child-theme.css');
    console.log('   4. Click "Publish"');
  }
}

addCSS();
