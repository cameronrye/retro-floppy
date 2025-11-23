/**
 * Utility functions for gradient generation and color contrast calculations
 */

/**
 * Simple seeded pseudo-random number generator (Mulberry32)
 * Returns a function that generates deterministic random numbers between 0 and 1
 * @param seed - Numeric seed for deterministic random generation
 * @returns Function that generates random numbers between 0 and 1
 * @remarks This function does not throw errors. Always returns a valid random number generator.
 */
function createSeededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generate a seed from a string (label name)
 * @param str - String to convert to numeric seed
 * @returns Numeric seed value (always positive)
 * @remarks This function does not throw errors. Empty strings return a default seed of 12345.
 */
function stringToSeed(str: string): number {
  if (!str) return 12345; // Default seed for empty strings
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Gradient Color Palette Generation Algorithm
 *
 * Generates soft, harmonious color palettes optimized for floppy disk labels.
 * Uses color theory principles to create visually pleasing, non-clashing gradients.
 *
 * Algorithm Overview:
 * 1. Generate deterministic random numbers from seed (label name hash)
 * 2. Select a random base hue (0-360 degrees on color wheel)
 * 3. Create 2-3 analogous colors (close on color wheel)
 * 4. Apply pastel-optimized saturation and lightness values
 *
 * Color Theory Principles:
 * - Analogous Color Scheme: Colors within 15-45 degrees create harmony
 * - Pastel Optimization: Low saturation (25-50%) + high lightness (65-85%)
 * - Limited Palette: 2-3 colors prevent visual chaos in small label area
 *
 * HSL Color Space Benefits:
 * - Hue: Intuitive color wheel representation (0=red, 120=green, 240=blue)
 * - Saturation: Easy control of color intensity (0%=gray, 100%=vivid)
 * - Lightness: Simple brightness adjustment (0%=black, 50%=pure, 100%=white)
 *
 * @param seed - Numeric seed for deterministic color generation
 * @returns Array of 2-3 HSL color strings
 * @remarks This function does not throw errors. Always returns a valid color palette.
 *
 * @example
 * // Seed 12345 might generate:
 * // ["hsl(210, 35%, 75%)", "hsl(225, 40%, 70%)"]
 * // Blue-ish pastel gradient with 15-degree hue shift
 */
function generateColorPalette(seed: number): string[] {
  const random = createSeededRandom(seed);

  // Choose a base hue (0-360 degrees on the color wheel)
  // This determines the primary color family (red, orange, yellow, green, etc.)
  const baseHue = random() * 360;

  // Generate 2-3 colors for smoother gradients
  // Too few colors (1) = boring, too many (4+) = chaotic in small space
  const colorCount = 2 + Math.floor(random() * 2); // 2-3 colors
  const colors: string[] = [];

  for (let i = 0; i < colorCount; i++) {
    // Analogous Color Scheme: Use hues within 30-60 degrees of base
    // This creates harmonious, non-clashing gradients that feel cohesive
    // Formula: 15-45 degree spread per color index
    // - Color 0: baseHue + 0-0 = baseHue
    // - Color 1: baseHue + 15-45 = slightly shifted
    // - Color 2: baseHue + 30-90 = more shifted (still analogous)
    const hueOffset = (random() * 30 + 15) * i; // 15-45 degree spread per step
    const hue = (baseHue + hueOffset) % 360; // Wrap around at 360

    // Pastel Saturation: 25-50% for soft, muted colors
    // Lower saturation = less intense, more pleasant for backgrounds
    // Avoids garish, overly-vivid colors that strain the eyes
    const saturation = 25 + random() * 25;

    // Pastel Lightness: 65-85% for light, airy colors
    // Higher lightness = brighter, more cheerful appearance
    // Ensures good contrast with dark text (accessibility)
    const lightness = 65 + random() * 20;

    // Format as HSL string for CSS compatibility
    colors.push(
      `hsl(${Math.round(hue)}, ${Math.round(saturation)}%, ${Math.round(lightness)}%)`,
    );
  }

  return colors;
}

/**
 * Convert HSL color to RGB values
 * @param hsl - HSL color string (e.g., "hsl(200, 50%, 70%)")
 * @returns RGB values as an object
 * @remarks This function does not throw errors. Invalid HSL strings return white (255, 255, 255).
 */
function hslToRgb(hsl: string): { r: number; g: number; b: number } {
  const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!match) return { r: 255, g: 255, b: 255 };

  const h = parseInt(match[1]) / 360;
  const s = parseInt(match[2]) / 100;
  const l = parseInt(match[3]) / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Calculate relative luminance according to WCAG formula
 * https://www.w3.org/TR/WCAG20/#relativeluminancedef
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns Relative luminance value (0-1)
 * @remarks This function does not throw errors. Always returns a valid luminance value.
 */
function calculateLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const val = c / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * https://www.w3.org/TR/WCAG20/#contrast-ratiodef
 * @param lum1 - Luminance of first color (0-1)
 * @param lum2 - Luminance of second color (0-1)
 * @returns Contrast ratio (1-21)
 * @remarks This function does not throw errors. Always returns a valid contrast ratio.
 */
function calculateContrastRatio(lum1: number, lum2: number): number {
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Calculate average luminance of a gradient
 * Samples multiple points along the gradient
 * @param colors - Array of HSL color strings
 * @returns Average luminance value (0-1)
 * @remarks This function does not throw errors. Always returns a valid luminance value.
 */
function calculateGradientLuminance(colors: string[]): number {
  let totalLuminance = 0;

  for (const color of colors) {
    const rgb = hslToRgb(color);
    totalLuminance += calculateLuminance(rgb.r, rgb.g, rgb.b);
  }

  return totalLuminance / colors.length;
}

/**
 * Determine the best text color (black or white) for a gradient background
 * Returns the color with better contrast ratio (WCAG AA standard: 4.5:1 for normal text)
 * @param colors - Array of HSL color strings representing the gradient
 * @returns Hex color string ('#ffffff' or '#000000')
 * @remarks This function does not throw errors. Always returns either white or black for optimal contrast.
 */
export function getAdaptiveTextColor(colors: string[]): string {
  const gradientLuminance = calculateGradientLuminance(colors);

  // Luminance of white and black
  const whiteLuminance = 1;
  const blackLuminance = 0;

  const contrastWithWhite = calculateContrastRatio(
    gradientLuminance,
    whiteLuminance,
  );
  const contrastWithBlack = calculateContrastRatio(
    gradientLuminance,
    blackLuminance,
  );

  // Return the color with better contrast
  return contrastWithWhite > contrastWithBlack ? '#ffffff' : '#000000';
}

/**
 * Generate a CSS gradient string
 * @param colors - Array of color strings (HSL or hex format)
 * @param type - Gradient type: 'linear', 'radial', or 'conic'
 * @param random - Random number generator function (0-1)
 * @param customAngle - Optional custom angle for linear gradients (0-360 degrees)
 * @returns CSS gradient string
 * @remarks This function does not throw errors. Empty arrays return a default gradient, single colors return the color itself.
 */
export function generateGradientCSS(
  colors: string[],
  type: 'linear' | 'radial' | 'conic',
  random: () => number,
  customAngle?: number,
): string {
  if (colors.length === 0)
    return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  if (colors.length === 1) return colors[0];

  switch (type) {
    case 'linear': {
      // Use custom angle if provided, otherwise random angle between 0 and 360
      const angle =
        customAngle !== undefined ? customAngle : Math.round(random() * 360);
      const colorStops = colors
        .map((color, i) => {
          const position = (i / (colors.length - 1)) * 100;
          return `${color} ${Math.round(position)}%`;
        })
        .join(', ');
      return `linear-gradient(${angle}deg, ${colorStops})`;
    }

    case 'radial': {
      // Random position for the center
      const x = 30 + Math.round(random() * 40); // 30-70%
      const y = 30 + Math.round(random() * 40); // 30-70%
      const colorStops = colors
        .map((color, i) => {
          const position = (i / (colors.length - 1)) * 100;
          return `${color} ${Math.round(position)}%`;
        })
        .join(', ');
      return `radial-gradient(circle at ${x}% ${y}%, ${colorStops})`;
    }

    case 'conic': {
      // Random starting angle
      const startAngle = Math.round(random() * 360);
      const colorStops = colors
        .map((color, i) => {
          const position = (i / colors.length) * 360;
          return `${color} ${Math.round(position)}deg`;
        })
        .join(', ');
      return `conic-gradient(from ${startAngle}deg, ${colorStops})`;
    }

    default:
      return colors[0];
  }
}

/**
 * Generate a complete gradient configuration for a disk label
 */
export interface GradientConfig {
  gradient: string;
  textColor: string;
  textShadow: string;
  colors: string[];
}

export interface GradientGenerationOptions {
  seed?: number;
  colors?: string[];
  angle?: number;
}

/**
 * Generate a complete gradient configuration for a floppy disk label
 * @param labelName - Label name used to generate deterministic gradient (if no custom seed provided)
 * @param gradientType - Type of gradient: 'linear', 'radial', 'conic', or 'auto' for random selection
 * @param options - Optional customization: seed, colors, angle
 * @returns Complete gradient configuration with CSS gradient, text color, and text shadow
 * @remarks This function does not throw errors. Always returns a valid gradient configuration.
 */
export function generateLabelGradient(
  labelName: string,
  gradientType: 'linear' | 'radial' | 'conic' | 'auto' = 'auto',
  options?: GradientGenerationOptions,
): GradientConfig {
  // Use custom seed if provided, otherwise generate from label name
  const seed =
    options?.seed !== undefined ? options.seed : stringToSeed(labelName);
  const random = createSeededRandom(seed);

  // Use custom colors if provided, otherwise generate color palette
  const colors =
    options?.colors && options.colors.length > 0
      ? options.colors
      : generateColorPalette(seed);

  // Determine gradient type
  let type: 'linear' | 'radial' | 'conic';
  if (gradientType === 'auto') {
    const typeChoice = random();
    if (typeChoice < 0.5) type = 'linear';
    else if (typeChoice < 0.8) type = 'radial';
    else type = 'conic';
  } else {
    type = gradientType;
  }

  // Generate gradient CSS with optional custom angle
  const gradient = generateGradientCSS(colors, type, random, options?.angle);

  // Calculate adaptive text color
  const textColor = getAdaptiveTextColor(colors);

  // Add subtle text shadow for better readability
  // Use opposite color of text for shadow (white text gets dark shadow, black text gets light shadow)
  const textShadow =
    textColor === '#ffffff'
      ? '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)'
      : '0 1px 2px rgba(255, 255, 255, 0.8), 0 0 1px rgba(255, 255, 255, 0.5)';

  return {
    gradient,
    textColor,
    textShadow,
    colors,
  };
}
