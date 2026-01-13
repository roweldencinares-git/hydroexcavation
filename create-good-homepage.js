import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://silver-raccoon-464412.hostingersite.com';
const WP_USER = process.env.BEACH_HYDROVAC_WP_USER;
const WP_APP_PASSWORD = process.env.BEACH_HYDROVAC_WP_PASSWORD;

const headers = {
  'Authorization': 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64'),
  'Content-Type': 'application/json'
};

async function createGoodHomepage() {
  console.log('Creating PROPERLY DESIGNED Homepage...\n');

  // Create homepage with GOOD design using basic blocks + inline CSS
  const homepageContent = `<!-- wp:html -->
<style>
/* Hero Section - Beautiful Design */
.hero-section {
  background: linear-gradient(135deg, #00416A 0%, #27AEFD 100%);
  padding: 120px 40px;
  text-align: center;
  margin: 0 0 80px 0;
}

.hero-section h1 {
  color: white !important;
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0 0 20px 0;
  line-height: 1.2;
  text-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.hero-section p {
  color: rgba(255,255,255,0.95);
  font-size: 1.3rem;
  margin: 0 0 40px 0;
}

.hero-button {
  display: inline-block;
  background: white;
  color: #00416A !important;
  padding: 18px 45px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 700;
  text-decoration: none !important;
  box-shadow: 0 8px 25px rgba(0,0,0,0.2);
  transition: transform 0.3s ease;
}

.hero-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(0,0,0,0.3);
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 60px auto;
  padding: 0 20px;
}

.service-card {
  background: white;
  border: 2px solid #E5E7EB;
  border-radius: 16px;
  padding: 40px 30px;
  text-align: center;
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(0, 65, 106, 0.15);
  border-color: #27AEFD;
}

.service-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.service-card h3 {
  color: #00416A !important;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 15px 0;
}

.service-card p {
  color: #6B7280;
  line-height: 1.6;
  margin: 0;
}

/* CTA Section */
.cta-section {
  background: #00416A;
  padding: 80px 40px;
  text-align: center;
  margin: 80px 0 0 0;
}

.cta-section h2 {
  color: white !important;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 20px 0;
}

.cta-section p {
  color: rgba(255,255,255,0.9);
  font-size: 1.2rem;
  margin: 0 0 40px 0;
}

.cta-button {
  display: inline-block;
  background: #27AEFD;
  color: white !important;
  padding: 18px 45px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 700;
  text-decoration: none !important;
  box-shadow: 0 8px 25px rgba(39, 174, 253, 0.4);
  transition: all 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-3px);
  background: #1E90FF;
  box-shadow: 0 12px 35px rgba(39, 174, 253, 0.5);
}

/* Section Headers */
.section-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px auto;
  padding: 0 20px;
}

.section-header h2 {
  color: #00416A !important;
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 15px 0;
}

.section-header p {
  color: #6B7280;
  font-size: 1.1rem;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2rem;
  }

  .hero-section p {
    font-size: 1.1rem;
  }

  .service-card {
    padding: 30px 20px;
  }

  .cta-section h2 {
    font-size: 2rem;
  }
}
</style>

<!-- Hero Section -->
<div class="hero-section">
  <h1>Protecting Virginia's Underground Infrastructure</h1>
  <p>Precision hydro excavation for Virginia Beach and surrounding areas</p>
  <a href="tel:757-785-5177" class="hero-button">📞 Call 757-785-5177</a>
</div>

<!-- Services Section -->
<div class="section-header">
  <h2>Our Services</h2>
  <p>Safe, non-destructive excavation for Virginia Beach and surrounding areas</p>
</div>

<div class="services-grid">
  <div class="service-card">
    <div class="service-icon">🎯</div>
    <h3>Potholing Services</h3>
    <p>Precision utility exposure without damage to existing infrastructure. Safe verification of underground utilities.</p>
  </div>

  <div class="service-card">
    <div class="service-icon">⚡</div>
    <h3>Slot Trenching</h3>
    <p>Narrow trenches for utility installation with minimal surface disruption. Efficient and cost-effective.</p>
  </div>

  <div class="service-card">
    <div class="service-icon">📍</div>
    <h3>SUE Level A Verification</h3>
    <p>Subsurface utility engineering with precise location verification. ASCE 38 compliant services.</p>
  </div>
</div>

<!-- CTA Section -->
<div class="cta-section">
  <h2>Ready to Start Your Project?</h2>
  <p>Get a free quote today and discover why contractors across Virginia trust us for precision excavation</p>
  <a href="tel:757-785-5177" class="cta-button">Call 757-785-5177</a>
</div>
<!-- /wp:html -->`;

  const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      title: 'Home',
      content: homepageContent,
      status: 'publish',
      slug: 'home'
    })
  });

  if (response.ok) {
    const page = await response.json();
    console.log('✅ Homepage created with PROPER design!');
    console.log('   URL:', page.link);

    // Set as front page
    await fetch(`${WP_URL}/wp-json/wp/v2/settings`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        show_on_front: 'page',
        page_on_front: page.id
      })
    });

    console.log('\n✨ What you get now:');
    console.log('  ✅ Beautiful gradient hero section');
    console.log('  ✅ Clean service cards that actually look good');
    console.log('  ✅ Proper spacing and typography');
    console.log('  ✅ Responsive mobile design');
    console.log('  ✅ Professional CTA section');
    console.log('\n👉 View: ' + WP_URL);
  } else {
    const error = await response.text();
    console.log('❌ Failed:', error.substring(0, 300));
  }
}

createGoodHomepage().catch(console.error);
