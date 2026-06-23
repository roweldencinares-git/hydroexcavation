import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

async function main() {
  const r = await fetch('https://aimlocatingva.com/');
  const html = await r.text();
  const $ = cheerio.load(html);

  console.log('=== AIM LOCATING FONT ANALYSIS ===\n');

  // 1. Check Google Fonts links
  console.log('GOOGLE FONTS:');
  $('link[href*="fonts.googleapis"]').each((i, el) => {
    console.log(`  ${$(el).attr('href')}`);
  });

  // 2. Check @font-face in inline styles
  console.log('\n@FONT-FACE DECLARATIONS:');
  $('style').each((i, el) => {
    const css = $(el).html() || '';
    const fontFaces = css.match(/@font-face\s*\{[^}]+\}/g);
    if (fontFaces) {
      fontFaces.forEach(ff => {
        const family = ff.match(/font-family\s*:\s*['"]?([^'";]+)/);
        if (family) console.log(`  ${family[1].trim()}`);
      });
    }
  });

  // 3. Check CSS font-family on body and key elements
  console.log('\nINLINE FONT-FAMILY STYLES:');
  const fontFamilies = new Set();
  $('[style*="font-family"]').each((i, el) => {
    const style = $(el).attr('style') || '';
    const match = style.match(/font-family\s*:\s*([^;]+)/);
    if (match) fontFamilies.add(match[1].trim());
  });
  fontFamilies.forEach(f => console.log(`  ${f}`));

  // 4. Check for theme font settings in CSS files
  console.log('\nLINKED STYLESHEETS:');
  $('link[rel="stylesheet"]').each((i, el) => {
    const href = $(el).attr('href') || '';
    if (href.includes('font') || href.includes('theme') || href.includes('style')) {
      console.log(`  ${href.substring(0, 120)}`);
    }
  });

  // 5. Check for Cornerstone/Pro theme font variables
  console.log('\nTHEME CSS VARIABLES / FONT REFS IN HTML:');
  const fontRefs = html.match(/font-family[^;]{0,100}/g) || [];
  const uniqueFonts = [...new Set(fontRefs)];
  uniqueFonts.forEach(f => console.log(`  ${f}`));

  // 6. Check body/headings classes for theme font indicators
  console.log('\nBODY CLASSES:');
  console.log(`  ${$('body').attr('class')?.substring(0, 200)}`);

  // 7. Try to find the main theme CSS and extract font-family
  console.log('\nSEARCHING THEME CSS FOR FONTS...');
  const cssLinks = [];
  $('link[rel="stylesheet"]').each((i, el) => {
    const href = $(el).attr('href') || '';
    if (href.includes('themes/') || href.includes('cornerstone') || href.includes('pro')) {
      cssLinks.push(href);
    }
  });

  for (const cssUrl of cssLinks.slice(0, 3)) {
    try {
      const cssR = await fetch(cssUrl);
      const css = await cssR.text();
      const bodyFont = css.match(/body\s*\{[^}]*font-family\s*:\s*([^;]+)/);
      const h1Font = css.match(/h1[^{]*\{[^}]*font-family\s*:\s*([^;]+)/);
      if (bodyFont) console.log(`  Body font in ${cssUrl.split('/').pop()}: ${bodyFont[1].trim()}`);
      if (h1Font) console.log(`  H1 font in ${cssUrl.split('/').pop()}: ${h1Font[1].trim()}`);

      // Also check CSS custom properties
      const varFonts = css.match(/--[^:]*font[^:]*:\s*([^;]+)/g);
      if (varFonts) {
        varFonts.forEach(v => console.log(`  CSS var: ${v.trim()}`));
      }
    } catch {}
  }

  // 8. Check inline script for theme settings with fonts
  console.log('\nTHEME SETTINGS (JS):');
  $('script').each((i, el) => {
    const js = $(el).html() || '';
    if (js.includes('font') && (js.includes('family') || js.includes('Font'))) {
      const fontLines = js.split('\n').filter(l => l.toLowerCase().includes('font'));
      fontLines.slice(0, 10).forEach(l => console.log(`  ${l.trim().substring(0, 120)}`));
    }
  });
}

main().catch(console.error);
