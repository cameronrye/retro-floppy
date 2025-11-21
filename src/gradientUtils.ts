/**
 * Utility functions for gradient generation and color contrast calculations
 */

/**
 * Simple seeded pseudo-random number generator (Mulberry32)
 * Returns a function that generates deterministic random numbers between 0 and 1
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
 * Generate a soft, harmonious color palette with pastel tones
 * Uses analogous colors (close on the color wheel) for smooth, pleasing gradients
 */
function generateColorPalette(seed: number): string[] {
  const random = createSeededRandom(seed);

  // Choose a base hue
  const baseHue = random() * 360;

  // Generate 2-3 colors for smoother gradients (not too many colors)
  const colorCount = 2 + Math.floor(random() * 2); // 2-3 colors
  const colors: string[] = [];

  for (let i = 0; i < colorCount; i++) {
    // Use analogous color scheme (hues within 30-60 degrees)
    // This creates harmonious, non-clashing gradients
    const hueOffset = (random() * 30 + 15) * i; // 15-45 degree spread
    const hue = (baseHue + hueOffset) % 360;

    // Much lower saturation for soft, pastel-like colors (25-50%)
    const saturation = 25 + random() * 25;

    // Higher lightness for lighter, more pleasant colors (65-85%)
    const lightness = 65 + random() * 20;

    colors.push(
      `hsl(${Math.round(hue)}, ${Math.round(saturation)}%, ${Math.round(lightness)}%)`,
    );
  }

  return colors;
}

/**
 * Convert HSL color to RGB values
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
 */
function calculateContrastRatio(lum1: number, lum2: number): number {
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Calculate average luminance of a gradient
 * Samples multiple points along the gradient
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
