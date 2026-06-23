import 'dotenv/config';
import fetch from 'node-fetch';

/**
 * Install AI SEO Plugin to WordPress
 *
 * This script checks current status and provides installation instructions
 */

const WP_URL = 'https://beachhydrovac.com';

async function testLlmsTxt() {
  try {
    const response = await fetch(`${WP_URL}/llms.txt`);
    const text = await response.text();

    if (text.includes('Beach Hydrovac')) {
      console.log('✅ llms.txt is LIVE at https://beachhydrovac.com/llms.txt');
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

async function testAISchemas() {
  try {
    const response = await fetch(WP_URL);
    const html = await response.text();

    const hasHowTo = html.includes('"@type":"HowTo"') || html.includes('"@type": "HowTo"');
    const hasSpeakable = html.includes('SpeakableSpecification');
    const hasDefinedTerm = html.includes('"@type":"DefinedTerm"') || html.includes('"@type": "DefinedTerm"');

    return { hasHowTo, hasSpeakable, hasDefinedTerm };
  } catch (error) {
    return { hasHowTo: false, hasSpeakable: false, hasDefinedTerm: false };
  }
}

async function main() {
  console.log('==========================================');
  console.log('Beach Hydrovac AI SEO Plugin Installer');
  console.log('==========================================\n');

  // Test current status
  console.log('Checking current AI SEO status...\n');

  const llmsLive = await testLlmsTxt();
  const schemas = await testAISchemas();

  console.log('Current Status:');
  console.log(`  llms.txt: ${llmsLive ? '✅ LIVE' : '❌ Not deployed'}`);
  console.log(`  HowTo Schema: ${schemas.hasHowTo ? '✅ LIVE' : '❌ Not deployed'}`);
  console.log(`  Speakable Schema: ${schemas.hasSpeakable ? '✅ LIVE' : '❌ Not deployed'}`);
  console.log(`  DefinedTerm Schema: ${schemas.hasDefinedTerm ? '✅ LIVE' : '❌ Not deployed'}`);
  console.log('');

  if (llmsLive && schemas.hasHowTo && schemas.hasSpeakable && schemas.hasDefinedTerm) {
    console.log('🎉 All AI SEO components are already deployed!\n');
    return;
  }

  // Provide installation instructions
  console.log('==========================================');
  console.log('MANUAL INSTALLATION INSTRUCTIONS');
  console.log('==========================================\n');

  console.log('OPTION 1: Upload Plugin via WordPress Admin');
  console.log('-------------------------------------------');
  console.log('1. Go to: https://beachhydrovac.com/wp-admin/plugins.php');
  console.log('2. Click "Add New" → "Upload Plugin"');
  console.log('3. Upload: beachhydrovac-ai-seo.zip');
  console.log('4. Click "Activate Plugin"\n');

  console.log('OPTION 2: Add Code to functions.php');
  console.log('-------------------------------------------');
  console.log('1. Go to: https://beachhydrovac.com/wp-admin/theme-editor.php');
  console.log('2. Select: beachhydrovac-child theme');
  console.log('3. Open: functions.php');
  console.log('4. Add the code from: beachhydrovac-ai-seo-plugin.php');
  console.log('   (Remove the <?php and plugin header comments)\n');

  console.log('OPTION 3: FTP Upload');
  console.log('-------------------------------------------');
  console.log('1. Connect to FTP');
  console.log('2. Navigate to: /wp-content/plugins/');
  console.log('3. Create folder: beachhydrovac-ai-seo');
  console.log('4. Upload: beachhydrovac-ai-seo-plugin.php');
  console.log('   (rename to beachhydrovac-ai-seo.php)');
  console.log('5. Activate in WordPress admin\n');

  console.log('==========================================');
  console.log('VERIFICATION AFTER INSTALLATION');
  console.log('==========================================\n');

  console.log('Test these URLs after activation:');
  console.log('• llms.txt: https://beachhydrovac.com/llms.txt');
  console.log('• Schema Test: https://search.google.com/test/rich-results?url=https://beachhydrovac.com');
  console.log('• Run this script again to verify status\n');

  console.log('==========================================');
  console.log('AI SEARCH TESTING');
  console.log('==========================================\n');

  console.log('After deployment, test AI visibility:');
  console.log('• ChatGPT: Ask "What is Beach Hydrovac?"');
  console.log('• Perplexity: Search "Beach Hydrovac Virginia"');
  console.log('• Google: Search "hydro excavation Virginia Beach" for AI Overview\n');
}

main().catch(console.error);
