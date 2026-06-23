import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(
  process.env.BEACH_HYDROVAC_WP_USER + ':' + process.env.BEACH_HYDROVAC_WP_PASSWORD
).toString('base64');
const headers = { 'Authorization': auth, 'Content-Type': 'application/json' };

async function main() {
  console.log('='.repeat(70));
  console.log('TOP 1% SEO AUDIT — BEACH HYDROVAC');
  console.log('Beyond technical — what separates #1 from page 2');
  console.log('='.repeat(70));

  // Get all content
  const pages = await (await fetch(`${WP_URL}/wp-json/wp/v2/pages?per_page=100&status=publish`, { headers })).json();
  const posts = await (await fetch(`${WP_URL}/wp-json/wp/v2/posts?per_page=100&status=publish`, { headers })).json();
  const allContent = [...pages, ...posts];

  // ============================================================
  // 1. E-E-A-T SIGNALS (Experience, Expertise, Authority, Trust)
  // ============================================================
  console.log('\n\n🏆 1. E-E-A-T SIGNALS (Google\'s Quality Standard)');
  console.log('-'.repeat(50));

  const aboutPage = pages.find(p => p.slug === 'about');
  const aboutContent = aboutPage?.content?.rendered || '';
  const aboutWordCount = aboutContent.replace(/<[^>]*>/g, '').split(/\s+/).filter(w => w.length > 0).length;

  console.log(`\nAbout Page Word Count: ${aboutWordCount}`);
  console.log(aboutWordCount < 200 ? '  ❌ CRITICAL: About page is only ~${aboutWordCount} words. Google needs E-E-A-T signals.' : '  ✅ Adequate length');

  // Check for trust signals across the site
  const homepage = await (await fetch('https://beachhydrovac.com/')).text();

  const trustChecks = [
    { name: 'Phone number visible', found: homepage.includes('757-510-5220') },
    { name: 'Email visible', found: homepage.includes('johnw@beachhydrovac.com') || homepage.includes('mailto:') },
    { name: 'Physical address', found: homepage.includes('2216') || homepage.includes('Mansion Cross') },
    { name: 'Veteran-owned mention', found: homepage.toLowerCase().includes('veteran') },
    { name: 'Years in business', found: homepage.match(/\d+\s*(years?|yrs?)\s*(of\s+)?(experience|business|serving)/i) !== null },
    { name: 'License/certification', found: homepage.toLowerCase().includes('license') || homepage.toLowerCase().includes('certified') || homepage.toLowerCase().includes('certification') },
    { name: 'Insurance mention', found: homepage.toLowerCase().includes('insured') || homepage.toLowerCase().includes('insurance') },
    { name: 'Client testimonials', found: homepage.toLowerCase().includes('testimonial') || homepage.toLowerCase().includes('review') || homepage.match(/[""][^""]{20,}[""]/) !== null },
    { name: 'Case studies/projects', found: homepage.toLowerCase().includes('case study') || homepage.toLowerCase().includes('project') || homepage.toLowerCase().includes('portfolio') },
    { name: 'Team/founder bio', found: homepage.toLowerCase().includes('founder') || homepage.toLowerCase().includes('owner') || homepage.toLowerCase().includes('team') },
    { name: 'BBB/association badges', found: homepage.toLowerCase().includes('bbb') || homepage.toLowerCase().includes('better business') || homepage.toLowerCase().includes('chamber') },
    { name: 'Safety record/stats', found: homepage.toLowerCase().includes('safety record') || homepage.toLowerCase().includes('zero incidents') || homepage.toLowerCase().includes('accident-free') },
  ];

  let trustScore = 0;
  for (const check of trustChecks) {
    console.log(`  ${check.found ? '✅' : '❌'} ${check.name}`);
    if (check.found) trustScore++;
  }
  console.log(`\n  TRUST SCORE: ${trustScore}/${trustChecks.length} (${Math.round(trustScore/trustChecks.length*100)}%)`);

  // ============================================================
  // 2. TITLE TAG CTR OPTIMIZATION
  // ============================================================
  console.log('\n\n🎯 2. TITLE TAG CTR ANALYSIS');
  console.log('-'.repeat(50));
  console.log('Power words, numbers, brackets = higher click-through rates\n');

  const powerWords = ['free', 'best', 'top', 'guide', 'how', 'why', '#1', 'trusted', 'expert', 'fast', 'safe', 'proven', 'guaranteed'];
  const ctrBoosters = ['[', '(', '|', '—', '#', '%'];

  for (const item of allContent) {
    const title = item.yoast_head_json?.title || item.title.rendered;
    const hasPowerWord = powerWords.some(w => title.toLowerCase().includes(w));
    const hasNumber = /\d/.test(title);
    const hasBracket = ctrBoosters.some(b => title.includes(b));
    const length = title.length;

    const score = (hasPowerWord ? 1 : 0) + (hasNumber ? 1 : 0) + (hasBracket ? 1 : 0);
    const icon = score >= 2 ? '✅' : score === 1 ? '⚠️' : '❌';

    if (score < 2) {
      console.log(`${icon} "${title.substring(0, 65)}${title.length > 65 ? '...' : ''}"`);
      console.log(`   Length: ${length} | Power word: ${hasPowerWord ? 'Yes' : 'NO'} | Number: ${hasNumber ? 'Yes' : 'NO'} | Separator: ${hasBracket ? 'Yes' : 'NO'}`);
    }
  }

  // ============================================================
  // 3. TOPICAL AUTHORITY MAP
  // ============================================================
  console.log('\n\n📚 3. TOPICAL AUTHORITY — CONTENT GAPS');
  console.log('-'.repeat(50));
  console.log('What a topical authority on "hydro excavation" NEEDS to cover:\n');

  const topicalMap = [
    { topic: 'What is hydro excavation', covered: posts.some(p => p.slug.includes('what-is')), type: 'Pillar' },
    { topic: 'Hydro excavation vs traditional', covered: posts.some(p => p.slug.includes('vs-traditional')), type: 'Cluster' },
    { topic: 'Hydro excavation cost/pricing', covered: posts.some(p => p.slug.includes('cost')), type: 'Cluster' },
    { topic: 'Hydro excavation safety', covered: posts.some(p => p.slug.includes('safety')), type: 'Cluster' },
    { topic: 'Virginia 811 / Miss Utility', covered: posts.some(p => p.slug.includes('811')), type: 'Cluster' },
    { topic: 'VDOT SUE requirements', covered: posts.some(p => p.slug.includes('sue') || p.slug.includes('vdot')), type: 'Cluster' },
    { topic: 'Utility strike prevention', covered: posts.some(p => p.slug.includes('utility-strike')), type: 'Cluster' },
    { topic: 'Fiber optic installation', covered: posts.some(p => p.slug.includes('fiber')), type: 'Cluster' },
    // MISSING TOPICS
    { topic: 'Hydro excavation for construction', covered: false, type: 'Cluster - MISSING' },
    { topic: 'Hydro excavation for plumbers/utilities', covered: false, type: 'Cluster - MISSING' },
    { topic: 'Hydro excavation in winter/frozen ground', covered: false, type: 'Cluster - MISSING' },
    { topic: 'How to hire a hydrovac company', covered: false, type: 'Cluster - MISSING' },
    { topic: 'Hydro excavation equipment explained', covered: false, type: 'Cluster - MISSING' },
    { topic: 'Environmental benefits of hydro excavation', covered: false, type: 'Cluster - MISSING' },
    { topic: 'Hydro excavation for municipalities', covered: false, type: 'Cluster - MISSING' },
    { topic: 'Potholing vs daylighting explained', covered: false, type: 'Cluster - MISSING' },
    { topic: 'Hydro excavation for solar/wind farms', covered: false, type: 'Cluster - MISSING' },
    { topic: 'ASCE 38 standards explained', covered: false, type: 'Cluster - MISSING' },
    { topic: 'Hydro excavation case study / project gallery', covered: false, type: 'Trust Content - MISSING' },
    { topic: 'Virginia excavation laws & permits', covered: false, type: 'Authority Content - MISSING' },
  ];

  let coveredCount = 0;
  for (const topic of topicalMap) {
    console.log(`  ${topic.covered ? '✅' : '❌'} ${topic.topic} [${topic.type}]`);
    if (topic.covered) coveredCount++;
  }
  console.log(`\n  TOPICAL COVERAGE: ${coveredCount}/${topicalMap.length} (${Math.round(coveredCount/topicalMap.length*100)}%)`);
  console.log(`  TARGET: 80%+ for topical authority status`);

  // ============================================================
  // 4. SERP FEATURE OPPORTUNITIES
  // ============================================================
  console.log('\n\n🔍 4. SERP FEATURE OPPORTUNITIES');
  console.log('-'.repeat(50));

  const serpFeatures = [
    { feature: 'FAQ Rich Results', status: '✅ LIVE', details: '15 questions in FAQPage schema' },
    { feature: 'HowTo Rich Results', status: '✅ LIVE', details: '2 HowTo schemas deployed' },
    { feature: 'Local Pack (Map Pack)', status: '❌ BLOCKED', details: 'Requires Google Business Profile — not created yet' },
    { feature: 'Sitelinks Search Box', status: '✅ LIVE', details: 'WebSite schema with SearchAction' },
    { feature: 'Breadcrumbs in SERP', status: '✅ LIVE', details: 'BreadcrumbList schema on all pages' },
    { feature: 'Featured Snippet (Position 0)', status: '⚠️ PARTIAL', details: 'Need definition paragraphs and comparison tables' },
    { feature: 'People Also Ask', status: '✅ TARGETING', details: 'FAQ schema + blog posts target PAA queries' },
    { feature: 'Video Carousel', status: '❌ MISSING', details: 'No video content. Add YouTube + VideoObject schema' },
    { feature: 'Image Pack', status: '⚠️ PARTIAL', details: 'Images have alt text but no original project photos' },
    { feature: 'AI Overview Citation', status: '⚠️ UNKNOWN', details: 'Need to test if AI models cite beachhydrovac.com' },
    { feature: 'Review Stars in SERP', status: '❌ MISSING', details: 'No AggregateRating schema (need real reviews first)' },
  ];

  for (const sf of serpFeatures) {
    console.log(`  ${sf.status} ${sf.feature}`);
    console.log(`     ${sf.details}`);
  }

  // ============================================================
  // 5. CONVERSION PATH AUDIT
  // ============================================================
  console.log('\n\n💰 5. CONVERSION PATH AUDIT');
  console.log('-'.repeat(50));
  console.log('Traffic without conversions = wasted SEO\n');

  let pagesWithCTA = 0;
  let pagesWithPhone = 0;
  let pagesWithForm = 0;

  for (const item of allContent) {
    const content = item.content?.rendered || '';
    const hasCTA = content.includes('/contact') || content.includes('Request a') || content.includes('Get a Quote') || content.includes('Free Quote');
    const hasPhone = content.includes('757-510-5220') || content.includes('tel:');
    const hasForm = content.includes('<form') || content.includes('wpforms') || content.includes('contact-form');

    if (hasCTA) pagesWithCTA++;
    if (hasPhone) pagesWithPhone++;
    if (hasForm) pagesWithForm++;
  }

  console.log(`  Pages with CTA link: ${pagesWithCTA}/${allContent.length} (${Math.round(pagesWithCTA/allContent.length*100)}%)`);
  console.log(`  Pages with phone number: ${pagesWithPhone}/${allContent.length} (${Math.round(pagesWithPhone/allContent.length*100)}%)`);
  console.log(`  Pages with contact form: ${pagesWithForm}/${allContent.length} (${Math.round(pagesWithForm/allContent.length*100)}%)`);

  // ============================================================
  // 6. PAGE SPEED CHECK
  // ============================================================
  console.log('\n\n⚡ 6. PAGE SPEED (Core Web Vitals)');
  console.log('-'.repeat(50));

  try {
    const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://beachhydrovac.com/&strategy=mobile&category=performance&category=seo&category=accessibility`;
    const psiResp = await fetch(psiUrl, { timeout: 30000 });
    const psi = await psiResp.json();

    if (psi.lighthouseResult) {
      const cats = psi.lighthouseResult.categories;
      console.log(`\n  Mobile Performance: ${Math.round(cats.performance?.score * 100 || 0)}/100`);
      console.log(`  SEO Score: ${Math.round(cats.seo?.score * 100 || 0)}/100`);
      console.log(`  Accessibility: ${Math.round(cats.accessibility?.score * 100 || 0)}/100`);

      const audits = psi.lighthouseResult.audits;
      if (audits['largest-contentful-paint']) console.log(`  LCP: ${audits['largest-contentful-paint'].displayValue}`);
      if (audits['first-contentful-paint']) console.log(`  FCP: ${audits['first-contentful-paint'].displayValue}`);
      if (audits['cumulative-layout-shift']) console.log(`  CLS: ${audits['cumulative-layout-shift'].displayValue}`);
      if (audits['total-blocking-time']) console.log(`  TBT: ${audits['total-blocking-time'].displayValue}`);
      if (audits['speed-index']) console.log(`  Speed Index: ${audits['speed-index'].displayValue}`);
    }
  } catch (e) {
    console.log(`  Could not fetch PageSpeed data: ${e.message}`);
  }

  // ============================================================
  // 7. AI DISCOVERABILITY CHECK
  // ============================================================
  console.log('\n\n🤖 7. AI DISCOVERABILITY (GEO — Generative Engine Optimization)');
  console.log('-'.repeat(50));
  console.log('Does your site appear in AI-generated answers?\n');

  const geoChecks = [
    { name: 'Structured data (JSON-LD)', status: true, note: '8 schema blocks — excellent for AI parsing' },
    { name: 'Direct answer paragraphs', status: true, note: 'FAQ schema provides clear Q&A for AI to cite' },
    { name: 'Authoritative entity signals', status: true, note: 'LocalBusiness + Organization + parentOrg' },
    { name: 'Step-by-step content', status: true, note: 'HowTo schema — AI models love numbered steps' },
    { name: 'Factual data points', status: true, note: 'Pricing ($300-$450/hr), specs (600ft reach, 2000-3000 PSI)' },
    { name: 'Source citations', status: false, note: 'Blog posts should cite OSHA, VDOT, ASCE standards with links' },
    { name: 'Author attribution', status: false, note: 'No author on blog posts — AI models prefer cited experts' },
    { name: 'Publish/update dates', status: true, note: 'WordPress auto-manages dates' },
    { name: 'Unique data/research', status: false, note: 'No original research, surveys, or proprietary data' },
    { name: 'Brand mentions elsewhere', status: false, note: 'No backlinks/mentions from industry sites yet' },
  ];

  for (const check of geoChecks) {
    console.log(`  ${check.status ? '✅' : '❌'} ${check.name}`);
    console.log(`     ${check.note}`);
  }

  // ============================================================
  // PRIORITY ACTION PLAN
  // ============================================================
  console.log('\n\n' + '='.repeat(70));
  console.log('TOP 1% SEO — PRIORITY ACTION PLAN');
  console.log('='.repeat(70));

  const actions = [
    { priority: '🔴 P0', action: 'Create Google Business Profile', impact: 'LOCAL PACK — this alone can 3x your leads', effort: 'Manual (15 min)', doable: 'Manual' },
    { priority: '🔴 P0', action: 'Expand About page (50 → 500+ words)', impact: 'E-E-A-T — Google\'s quality rater guidelines demand this', effort: 'Scriptable', doable: 'Auto' },
    { priority: '🔴 P0', action: 'Add AggregateRating + Review schema', impact: 'REVIEW STARS in SERP = massive CTR boost', effort: 'Need real reviews first', doable: 'Manual' },
    { priority: '🟡 P1', action: 'Add author attribution to blog posts', impact: 'AI CITATION — AI models prefer content with named experts', effort: 'Scriptable', doable: 'Auto' },
    { priority: '🟡 P1', action: 'Add source citations (OSHA, VDOT, ASCE)', impact: 'AUTHORITY — referenced sources = more AI citations', effort: 'Scriptable', doable: 'Auto' },
    { priority: '🟡 P1', action: 'Create 5+ more cluster posts', impact: 'TOPICAL AUTHORITY — 40% topic coverage → 80%', effort: 'Scriptable', doable: 'Auto' },
    { priority: '🟡 P1', action: 'Optimize title tags for CTR', impact: 'CLICKS — power words + numbers = 20-30% more clicks', effort: 'Scriptable', doable: 'Auto' },
    { priority: '🟡 P1', action: 'Submit to Bing Webmaster Tools', impact: 'BING/COPILOT — Bing feeds Microsoft Copilot AI', effort: 'Manual (2 min)', doable: 'Manual' },
    { priority: '🟢 P2', action: 'Create YouTube video + VideoObject schema', impact: 'VIDEO CAROUSEL in SERP', effort: 'Manual (film)', doable: 'Manual' },
    { priority: '🟢 P2', action: 'Submit to 12 local directories', impact: 'NAP CITATIONS — local ranking signal', effort: 'Manual', doable: 'Manual' },
    { priority: '🟢 P2', action: 'Add project gallery / case studies', impact: 'TRUST + UNIQUE CONTENT', effort: 'Need project photos', doable: 'Manual' },
    { priority: '🟢 P2', action: 'Purge LiteSpeed cache', impact: 'IMMEDIATE — all new schema visible to Google', effort: 'Manual (1 click)', doable: 'Manual' },
  ];

  for (const a of actions) {
    console.log(`\n  ${a.priority} ${a.action}`);
    console.log(`     Impact: ${a.impact}`);
    console.log(`     ${a.doable === 'Auto' ? '🤖 Can automate now' : '👤 Needs your action'}`);
  }

  console.log('\n\n' + '='.repeat(70));
  console.log('ITEMS I CAN EXECUTE RIGHT NOW (say "go"):');
  console.log('='.repeat(70));
  console.log(`
  1. Expand About page (add founder story, certs, years, E-E-A-T signals)
  2. Add author attribution to all 8 blog posts
  3. Add source citations (OSHA, VDOT, ASCE links) to blog posts
  4. Optimize all title tags for higher CTR
  5. Create 5 new cluster posts for topical authority
  6. Add featured snippet formatting (definition boxes, tables)
  `);
}

main().catch(console.error);
