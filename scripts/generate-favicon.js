#!/usr/bin/env node

/**
 * Generate favicon from logo
 * 
 * This script generates a favicon.ico from the logo.svg file.
 * 
 * Usage: node scripts/generate-favicon.js
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateFavicon() {
  console.log('Generating favicon...\n');

  const inputPath = path.resolve('docs/static/img/logo.svg');
  const outputPath = path.resolve('docs/static/img/favicon.ico');

  try {
    // Generate a 32x32 PNG first (ICO format is complex, so we'll use PNG)
    // Most modern browsers support PNG favicons
    await sharp(inputPath)
      .resize(32, 32)
      .png()
      .toFile(outputPath.replace('.ico', '-32x32.png'));

    console.log('✓ Generated favicon-32x32.png');

    // Generate a 16x16 version
    await sharp(inputPath)
      .resize(16, 16)
      .png()
      .toFile(outputPath.replace('.ico', '-16x16.png'));

    console.log('✓ Generated favicon-16x16.png');

    // For actual .ico file, we'll just use the 32x32 PNG renamed
    // (Most browsers will accept this)
    await sharp(inputPath)
      .resize(32, 32)
      .png()
      .toFile(outputPath);

    console.log('✓ Generated favicon.ico');
    console.log('\n✨ Favicon generation complete!');
  } catch (error) {
    console.error('✗ Failed to generate favicon:', error.message);
    process.exit(1);
  }
}

generateFavicon();

