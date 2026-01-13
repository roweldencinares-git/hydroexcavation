import 'dotenv/config';
import fetch from 'node-fetch';
import { readFileSync } from 'fs';
import { basename } from 'path';

const WP_URL = 'https://silver-raccoon-464412.hostingersite.com';
const WP_USER = process.env.BEACH_HYDROVAC_WP_USER;
const WP_APP_PASSWORD = process.env.BEACH_HYDROVAC_WP_PASSWORD;

const headers = {
  'Authorization': 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64')
};

// Step 1: Upload hero image
async function uploadHeroImage() {
  console.log('\n📤 Uploading hero image...');

  const imagePath = './images/hero-beach-truck.jpg';
  const imageBuffer = readFileSync(imagePath);
  const fileName = basename(imagePath);

  const response = await fetch(`${WP_URL}/wp-json/wp/v2/media`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'image/jpeg',
      'Content-Disposition': `attachment; filename="${fileName}"`
    },
    body: imageBuffer
  });

  if (response.ok) {
    const media = await response.json();
    console.log('✅ Image uploaded!');
    console.log('   ID:', media.id);
    console.log('   URL:', media.source_url);
    return media;
  } else {
    const error = await response.text();
    console.log('❌ Upload failed:', error.substring(0, 300));
    return null;
  }
}

// Step 2: Get current homepage
async function getHomepage() {
  const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages/14?context=edit`, { headers });
  const page = await response.json();
  return page;
}

// Step 3: Update homepage with proper styling and hero image
async function updateHomepage(heroImageUrl) {
  console.log('\n📝 Updating homepage with proper styling...');

  const homepage = await getHomepage();

  // Brand colors CSS block
  const brandColorsCSS = `<!-- wp:html -->
<style>
/* Beach Hydrovac Brand Colors */
:root {
  --beach-deep-atlantic: #00416A;
  --beach-safety-cyan: #27AEFD;
  --beach-warm-shoreline: #D4A373;
  --beach-soft-sand: #F5F1E8;
}

/* Apply brand colors globally */
.wp-block-button__link {
  background-color: var(--beach-safety-cyan) !important;
  border-color: var(--beach-safety-cyan) !important;
}

.wp-block-button.is-style-outline .wp-block-button__link {
  color: var(--beach-deep-atlantic) !important;
  border-color: var(--beach-deep-atlantic) !important;
}

h1, h2, h3, .has-text-color {
  color: var(--beach-deep-atlantic) !important;
}

/* Hero section specific */
.wp-block-cover {
  min-height: 600px !important;
}

.wp-block-cover__inner-container h1 {
  color: white !important;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.wp-block-cover__inner-container p {
  color: white !important;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

/* Animation classes */
.fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.wp-block-column {
  animation: fadeInUp 0.8s ease-out;
}

.wp-block-group:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 65, 106, 0.2) !important;
}

.wp-block-button__link {
  transition: all 0.3s ease !important;
}

.wp-block-button__link:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 5px 15px rgba(39, 174, 253, 0.4) !important;
}

html {
  scroll-behavior: smooth;
}
</style>
<!-- /wp:html -->

`;

  // New hero section with uploaded image
  const heroSection = `<!-- wp:cover {"url":"${heroImageUrl}","id":999,"dimRatio":40,"overlayColor":"black","minHeight":600,"minHeightUnit":"px","contentPosition":"center center","isDark":true,"align":"full"} -->
<div class="wp-block-cover alignfull is-dark" style="min-height:600px"><span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-40 has-background-dim"></span><img class="wp-block-cover__image-background wp-image-999" alt="" src="${heroImageUrl}" data-object-fit="cover"/><div class="wp-block-cover__inner-container"><!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"3.5rem","fontWeight":"700"}}} -->
<h1 class="wp-block-heading has-text-align-center" style="font-size:3.5rem;font-weight:700">Protecting Virginia's Underground Infrastructure</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.25rem"}}} -->
<p class="has-text-align-center" style="font-size:1.25rem">Precision hydro excavation for Virginia Beach and surrounding areas</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button {"style":{"spacing":{"padding":{"left":"2rem","right":"2rem","top":"1rem","bottom":"1rem"}}}} -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" style="padding-top:1rem;padding-right:2rem;padding-bottom:1rem;padding-left:2rem">Get a Free Quote</a></div>
<!-- /wp:button -->

<!-- wp:button {"className":"is-style-outline"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button">757-XXX-XXXX</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div></div>
<!-- /wp:cover -->

`;

  // Get rest of content (skip old hero if it exists)
  let content = homepage.content.raw || homepage.content.rendered || '';

  // Remove old hero section if exists
  content = content.replace(/<!-- wp:cover[\s\S]*?<!-- \/wp:cover -->/m, '');

  // Remove old style blocks if they exist
  content = content.replace(/<!-- wp:html -->[\s\S]*?<style>[\s\S]*?<\/style>[\s\S]*?<!-- \/wp:html -->/g, '');

  // Construct new content: Brand CSS + Hero + Rest of content
  const newContent = brandColorsCSS + heroSection + content.trim();

  // Update page
  const response = await fetch(`${WP_URL}/wp-json/wp/v2/pages/14`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content: newContent })
  });

  if (response.ok) {
    const updated = await response.json();
    console.log('✅ Homepage updated!');
    console.log('   URL:', updated.link);
    return updated;
  } else {
    const error = await response.text();
    console.log('❌ Update failed:', error.substring(0, 300));
    return null;
  }
}

// Main execution
async function main() {
  console.log('==========================================');
  console.log('Fixing Beach Hydrovac Homepage');
  console.log('==========================================');

  try {
    // Upload hero image
    const heroImage = await uploadHeroImage();

    if (!heroImage) {
      console.log('\n⚠️  Could not upload image. Checking if it already exists...');

      // Check media library
      const mediaResponse = await fetch(`${WP_URL}/wp-json/wp/v2/media?per_page=100`, { headers });
      const media = await mediaResponse.json();

      // Find any beach/hero images
      const existingHero = media.find(m =>
        m.slug.includes('hero') ||
        m.slug.includes('beach') ||
        m.slug.includes('truck')
      );

      if (existingHero) {
        console.log('ℹ️  Found existing image:', existingHero.source_url);
        await updateHomepage(existingHero.source_url);
      } else {
        console.log('❌ No hero image found. Please upload manually.');
        return;
      }
    } else {
      // Use newly uploaded image
      await updateHomepage(heroImage.source_url);
    }

    console.log('\n==========================================');
    console.log('✅ DONE!');
    console.log('==========================================');
    console.log('\n🎨 What was fixed:');
    console.log('  • Hero image uploaded and applied');
    console.log('  • Brand colors set (Deep Atlantic, Safety Cyan, Warm Shoreline)');
    console.log('  • Animations added (fade-in, hover effects)');
    console.log('  • Proper hero overlay and text styling\n');
    console.log('👉 Visit: ' + WP_URL);
    console.log('\nIf you still see old styling:');
    console.log('1. Clear LiteSpeed Cache: WP Admin → LiteSpeed Cache → Purge All');
    console.log('2. Hard refresh browser: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)');
    console.log('3. Try incognito mode');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

main();
