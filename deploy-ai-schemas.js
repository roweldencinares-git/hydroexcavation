import 'dotenv/config';
import fetch from 'node-fetch';
import { readFileSync } from 'fs';

/**
 * Deploy AI Schemas to WordPress
 *
 * Attempts to deploy HowTo, Speakable, and DefinedTerm schemas
 */

const WP_URL = 'https://beachhydrovac.com';
const WP_USER = process.env.BEACH_HYDROVAC_WP_USER;
const WP_APP_PASSWORD = process.env.BEACH_HYDROVAC_WP_PASSWORD;

const headers = {
  'Authorization': 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64'),
  'Content-Type': 'application/json'
};

// Read the PHP code to deploy
const schemaCode = readFileSync('./add-ai-schemas.php', 'utf-8');

async function checkCodeSnippetsPlugin() {
  try {
    // Check if Code Snippets plugin REST API is available
    const response = await fetch(`${WP_URL}/wp-json/code-snippets/v1/snippets`, {
      headers
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

async function deployViaCodeSnippets() {
  try {
    const response = await fetch(`${WP_URL}/wp-json/code-snippets/v1/snippets`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: 'Beach Hydrovac AI SEO Schemas',
        code: schemaCode,
        scope: 'global',
        active: true
      })
    });

    if (response.ok) {
      console.log('✅ Deployed via Code Snippets plugin!');
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

async function checkPlugins() {
  try {
    const response = await fetch(`${WP_URL}/wp-json/wp/v2/plugins`, {
      headers
    });

    if (response.ok) {
      const plugins = await response.json();
      console.log('\nInstalled Plugins:');
      plugins.slice(0, 10).forEach(p => {
        console.log(`  - ${p.name}: ${p.status}`);
      });
      return plugins;
    }
    return [];
  } catch (error) {
    console.log('Could not fetch plugins list');
    return [];
  }
}

async function testSchemas() {
  try {
    const response = await fetch(WP_URL);
    const html = await response.text();

    const hasHowTo = html.includes('"@type":"HowTo"') || html.includes('"@type": "HowTo"');
    const hasSpeakable = html.includes('SpeakableSpecification');
    const hasDefinedTerm = html.includes('"@type":"DefinedTerm"') || html.includes('"@type": "DefinedTerm"');
    const hasAiMeta = html.includes('ai-summary');

    return { hasHowTo, hasSpeakable, hasDefinedTerm, hasAiMeta };
  } catch (error) {
    return { hasHowTo: false, hasSpeakable: false, hasDefinedTerm: false, hasAiMeta: false };
  }
}

async function main() {
  console.log('==========================================');
  console.log('Deploy AI Schemas to Beach Hydrovac');
  console.log('==========================================\n');

  // Check current status
  console.log('Checking current schema status...');
  const schemas = await testSchemas();

  console.log('\nCurrent AI Schema Status:');
  console.log(`  HowTo Schema: ${schemas.hasHowTo ? '✅ LIVE' : '❌ Not deployed'}`);
  console.log(`  Speakable Schema: ${schemas.hasSpeakable ? '✅ LIVE' : '❌ Not deployed'}`);
  console.log(`  DefinedTerm Schema: ${schemas.hasDefinedTerm ? '✅ LIVE' : '❌ Not deployed'}`);
  console.log(`  AI Meta Tags: ${schemas.hasAiMeta ? '✅ LIVE' : '❌ Not deployed'}`);

  if (schemas.hasHowTo && schemas.hasSpeakable && schemas.hasDefinedTerm && schemas.hasAiMeta) {
    console.log('\n🎉 All AI schemas are already deployed!\n');
    return;
  }

  // Check available deployment methods
  console.log('\nChecking deployment methods...');

  const hasCodeSnippets = await checkCodeSnippetsPlugin();
  if (hasCodeSnippets) {
    console.log('Found Code Snippets plugin - attempting deployment...');
    const deployed = await deployViaCodeSnippets();
    if (deployed) {
      console.log('\n✅ AI Schemas deployed successfully!');
      console.log('Verify at: https://search.google.com/test/rich-results?url=https://beachhydrovac.com\n');
      return;
    }
  }

  // Check plugins
  await checkPlugins();

  // Provide manual instructions
  console.log('\n==========================================');
  console.log('DEPLOYMENT REQUIRED');
  console.log('==========================================\n');

  console.log('The AI schemas need to be added manually to WordPress.');
  console.log('File to add: add-ai-schemas.php\n');

  console.log('STEP 1: Access WordPress Admin');
  console.log('  URL: https://beachhydrovac.com/wp-admin/\n');

  console.log('STEP 2: Go to Theme Editor');
  console.log('  Appearance → Theme File Editor');
  console.log('  Select: beachhydrovac-child theme');
  console.log('  Open: functions.php\n');

  console.log('STEP 3: Add the Code');
  console.log('  Copy the contents of: add-ai-schemas.php');
  console.log('  Paste at the END of functions.php (before closing ?>)');
  console.log('  Click "Update File"\n');

  console.log('STEP 4: Verify Deployment');
  console.log('  Run: node deploy-ai-schemas.js');
  console.log('  Or visit: https://search.google.com/test/rich-results?url=https://beachhydrovac.com\n');

  console.log('==========================================');
  console.log('CODE TO ADD:');
  console.log('==========================================\n');
  console.log(schemaCode);
}

main().catch(console.error);
