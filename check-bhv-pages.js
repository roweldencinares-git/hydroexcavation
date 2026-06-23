import fetch from 'node-fetch';

async function main() {
  console.log('=== BEACH HYDROVAC — BEST LANDING PAGES ===\n');

  // Check key pages
  const pages = [
    { url: 'https://beachhydrovac.com/', name: 'Homepage' },
    { url: 'https://beachhydrovac.com/contact/', name: 'Contact' },
    { url: 'https://beachhydrovac.com/free-quote/', name: 'Free Quote' },
    { url: 'https://beachhydrovac.com/get-a-quote/', name: 'Get a Quote' },
    { url: 'https://beachhydrovac.com/request-quote/', name: 'Request Quote' },
    { url: 'https://beachhydrovac.com/services/', name: 'Services' },
    { url: 'https://beachhydrovac.com/hydro-excavation/', name: 'Hydro Excavation' },
    { url: 'https://beachhydrovac.com/potholing/', name: 'Potholing' },
    { url: 'https://beachhydrovac.com/about/', name: 'About' },
  ];

  for (const page of pages) {
    try {
      const r = await fetch(page.url, { redirect: 'manual' });
      const status = r.status;
      const location = r.headers.get('location') || '';
      if (status === 200) {
        console.log(`  ✅ ${status} ${page.name} — ${page.url}`);
      } else if (status === 301 || status === 302) {
        console.log(`  ↪️  ${status} ${page.name} → ${location}`);
      } else {
        console.log(`  ❌ ${status} ${page.name} — ${page.url}`);
      }
    } catch (e) {
      console.log(`  ❌ ${page.name} — ${e.message}`);
    }
  }

  // Get all published pages from the API
  console.log('\n\nALL PUBLISHED PAGES:\n');
  const auth = 'Basic ' + Buffer.from('rdenci_16:0L9x p2O7 tdfs khVJ UFyl 1UZk').toString('base64');
  const r = await fetch('https://beachhydrovac.com/wp-json/wp/v2/pages?per_page=100&status=publish', {
    headers: { 'Authorization': auth }
  });
  const allPages = await r.json();

  for (const p of allPages) {
    const slug = p.slug;
    if (slug.includes('quote') || slug.includes('contact') || slug.includes('services') ||
        slug.includes('about') || slug.includes('hydro') || slug.includes('potholing') ||
        slug.includes('daylighting') || slug.includes('slot') || slug.includes('vacuum')) {
      console.log(`  ID:${p.id} /${p.slug}/ — ${p.title.rendered}`);
    }
  }
}

main().catch(console.error);
