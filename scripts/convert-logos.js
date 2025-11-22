#!/usr/bin/env node

/**
 * Convert SVG logos to PNG format
 *
 * This script converts the SVG logo files to PNG format for broader compatibility.
 * It uses sharp library for high-quality image conversion.
 *
 * Usage: node scripts/convert-logos.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const conversions = [
  {
    input: 'docs/static/img/logo.svg',
    output: 'docs/static/img/logo.png',
    width: 200,
    height: 200,
  },
  {
    input: 'docs/static/img/logo-light.svg',
    output: 'docs/static/img/logo-light.png',
    width: 200,
    height: 200,
  },
  {
    input: 'docs/static/img/logo-dark.svg',
    output: 'docs/static/img/logo-dark.png',
    width: 200,
    height: 200,
  },
  {
    input: 'docs/static/img/logo-banner.svg',
    output: 'docs/static/img/logo-banner.png',
    width: 800,
    height: 200,
  },
  {
    input: 'docs/static/img/social-card.svg',
    output: 'docs/static/img/social-card.png',
    width: 1200,
    height: 630,
  },
  {
    input: 'docs/static/img/github-card.svg',
    output: 'docs/static/img/github-card.png',
    width: 1280,
    height: 640,
  },
];

async function convertSvgToPng() {
  console.log('Converting SVG logos to PNG...\n');

  for (const conversion of conversions) {
    const inputPath = path.resolve(conversion.input);
    const outputPath = path.resolve(conversion.output);

    if (!fs.existsSync(inputPath)) {
      console.warn(`⚠️  Skipping ${conversion.input} (file not found)`);
      continue;
    }

    try {
      await sharp(inputPath)
        .resize(conversion.width, conversion.height)
        .png()
        .toFile(outputPath);

      console.log(`✓ Converted ${conversion.input} → ${conversion.output}`);
    } catch (error) {
      console.error(`✗ Failed to convert ${conversion.input}:`, error.message);
    }
  }

  console.log('\n✨ Conversion complete!');
}

convertSvgToPng().catch((error) => {
  console.error('Conversion failed:', error);
  process.exit(1);
});

