import 'dotenv/config';
import fetch from 'node-fetch';

const WP_URL = 'https://beachhydrovac.com';
const auth = 'Basic ' + Buffer.from(
  process.env.BEACH_HYDROVAC_WP_USER + ':' + process.env.BEACH_HYDROVAC_WP_PASSWORD
).toString('base64');
const headers = { 'Authorization': auth };

const locationSlugs = [
  'virginia-beach', 'norfolk', 'chesapeake', 'suffolk', 'portsmouth',
  'newport-news', 'hampton', 'williamsburg', 'eastern-shore',
  'richmond', 'henrico', 'chesterfield', 'alexandria', 'arlington',
  'fairfax', 'fredericksburg', 'roanoke', 'lynchburg'
];

async function main() {
  console.log('LOCATION PAGE CONTENT COMPARISON AUDIT');
  console.log('======================================\n');

  const pages = [];

  for (const slug of locationSlugs) {
    const r = await fetch(`${WP_URL}/wp-json/wp/v2/pages?slug=${slug}&context=edit`, { headers });
    const results = await r.json();
    // Pick the non -2 version
    const page = results.find(p => p.slug === slug);
    if (!page) {
      console.log(`MISSING: /${slug}`);
      continue;
    }

    const raw = page.content.raw || '';
    // Strip HTML tags to get just text
    const textOnly = raw.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
    const wordCount = textOnly.split(' ').filter(w => w.length > 2).length;

    // Extract key unique phrases (not just city name swaps)
    const h2s = (raw.match(/<h2[^>]*>(.*?)<\/h2>/gs) || []).map(h => h.replace(/<[^>]+>/g, '').trim());
    const h3s = (raw.match(/<h3[^>]*>(.*?)<\/h3>/gs) || []).map(h => h.replace(/<[^>]+>/g, '').trim());

    // Check for unique local content indicators
    const mentionsLocalLandmarks = /bridge|tunnel|base|naval|port|downtown|airport|university|college|highway|interstate|I-64|I-264|I-95|I-85|route|military|fort|dam|river|bay|ocean|coast/i.test(textOnly);
    const mentionsLocalIndustries = textOnly.match(/(?:agriculture|farming|tourism|naval|military|shipping|port|government|university|tech|manufacturing|fishing|aquaculture)/gi) || [];
    const mentionsNeighbors = (textOnly.match(/(?:Virginia Beach|Norfolk|Chesapeake|Suffolk|Portsmouth|Newport News|Hampton|Richmond|Eastern Shore)/g) || []).length;

    pages.push({
      slug,
      wordCount,
      h2s,
      h3s,
      mentionsLocalLandmarks,
      mentionsLocalIndustries: [...new Set(mentionsLocalIndustries.map(i => i.toLowerCase()))],
      mentionsNeighbors,
      textSnippet: textOnly.substring(0, 200)
    });

    console.log(`/${slug}`);
    console.log(`  Words: ${wordCount}`);
    console.log(`  H2s: ${h2s.join(' | ')}`);
    console.log(`  Local landmarks/features: ${mentionsLocalLandmarks ? 'YES' : 'NO'}`);
    console.log(`  Local industries: ${[...new Set(mentionsLocalIndustries.map(i => i.toLowerCase()))].join(', ') || 'NONE'}`);
    console.log(`  Neighbor city mentions: ${mentionsNeighbors}`);
    console.log('');
  }

  // Now compare similarity
  console.log('\n========== SIMILARITY ANALYSIS ==========\n');

  // Compare H2 structures
  const h2Patterns = pages.map(p => p.h2s.map(h => {
    // Normalize by removing city name
    return h.replace(/Virginia Beach|Norfolk|Chesapeake|Suffolk|Portsmouth|Newport News|Hampton|Williamsburg|Eastern Shore|Richmond|Henrico|Chesterfield|Alexandria|Arlington|Fairfax|Fredericksburg|Roanoke|Lynchburg/g, '[CITY]').trim();
  }).join(' | '));

  // Group pages by identical H2 patterns
  const patternGroups = {};
  h2Patterns.forEach((pattern, i) => {
    if (!patternGroups[pattern]) patternGroups[pattern] = [];
    patternGroups[pattern].push(pages[i].slug);
  });

  console.log('H2 HEADING PATTERN GROUPS (pages with identical structure):');
  for (const [pattern, slugs] of Object.entries(patternGroups)) {
    console.log(`  Pattern: "${pattern.substring(0, 120)}"`);
    console.log(`  Pages (${slugs.length}): ${slugs.join(', ')}`);
    if (slugs.length > 1) {
      console.log(`  ⚠️  DUPLICATE STRUCTURE - ${slugs.length} pages share this pattern`);
    }
    console.log('');
  }

  // Word count comparison
  const wordCounts = pages.map(p => p.wordCount);
  const avgWords = Math.round(wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length);
  const minWords = Math.min(...wordCounts);
  const maxWords = Math.max(...wordCounts);

  console.log('WORD COUNT SUMMARY:');
  console.log(`  Average: ${avgWords} words`);
  console.log(`  Min: ${minWords} (${pages.find(p => p.wordCount === minWords)?.slug})`);
  console.log(`  Max: ${maxWords} (${pages.find(p => p.wordCount === maxWords)?.slug})`);
  console.log(`  Spread: ${maxWords - minWords} words`);

  // Final verdict
  console.log('\n========== SEO RISK ASSESSMENT ==========\n');

  const duplicateGroups = Object.values(patternGroups).filter(g => g.length > 1);
  const pagesWithNoUniqueContent = pages.filter(p => !p.mentionsLocalLandmarks && p.mentionsLocalIndustries.length === 0);

  if (duplicateGroups.length > 0) {
    console.log('⚠️  RISK: DOORWAY PAGES DETECTED');
    console.log('   Google explicitly penalizes "doorway pages" - multiple pages with');
    console.log('   nearly identical content, just swapping city names.');
    console.log('   Ref: https://developers.google.com/search/docs/essentials/spam-policies#doorways');
    console.log('');
    for (const group of duplicateGroups) {
      console.log(`   ${group.length} pages share identical structure: ${group.join(', ')}`);
    }
  }

  if (pagesWithNoUniqueContent.length > 0) {
    console.log('\n⚠️  Pages with NO unique local content:');
    for (const p of pagesWithNoUniqueContent) {
      console.log(`   /${p.slug} (${p.wordCount} words)`);
    }
  }
}

main().catch(console.error);
