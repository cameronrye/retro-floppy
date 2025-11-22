import React from 'react';

/**
 * Size of the floppy disk component
 * - Predefined sizes: 'tiny' (60px), 'small' (120px), 'medium' (200px), 'large' (400px), 'hero' (600px)
 * - Custom size: any number in pixels (recommended range: 10-1000px)
 */
export type FloppySize =
  | 'tiny'
  | 'small'
  | 'medium'
  | 'large'
  | 'hero'
  | number;

/**
 * Interaction variant for the floppy disk
 * - 'interactive': Full hover animations and interactions (default)
 * - 'static': No hover animations, click handlers still work
 * - 'compact': Reduced label area for tight spaces
 */
export type FloppyVariant = 'interactive' | 'static' | 'compact';

/**
 * Disk type
 * - 'HD': High Density (1.44 MB)
 * - 'DD': Double Density (720 KB)
 */
export type DiskType = 'HD' | 'DD';

/**
 * Label data for the floppy disk
 */
export interface FloppyLabel {
  /** Software/content name (displayed on first line) */
  name: string;
  /** Author or company (displayed on second line) */
  author?: string;
  /** Year of release (displayed in bottom right corner) */
  year?: string;
  /** Description or additional info (not displayed, for metadata) */
  description?: string;
  /** Disk type label (e.g., "ZIP", "DISK") - displayed on metal slide */
  type?: string;
  /** Storage capacity (e.g., "1.44 MB", "880 KB") - displayed on metal slide */
  size?: string;
}

/**
 * Animation configuration for the floppy disk
 */
export interface AnimationConfig {
  /** Hover animation duration in milliseconds @default 500 */
  hoverDuration?: number;
  /** Slide animation duration in milliseconds @default 500 */
  slideDuration?: number;
  /** Animation easing function @default 'linear' */
  easing?: string;
  /** Disable all animations @default false */
  disableAnimations?: boolean;
}

/**
 * Gradient customization options
 */
export interface GradientOptions {
  /** Custom seed for gradient generation (overrides label name seed) */
  seed?: number;
  /** Custom color palette (array of HSL or hex colors) */
  colors?: string[];
  /** Gradient angle for linear gradients (0-360 degrees) */
  angle?: number;
}

/**
 * Color theme for the floppy disk
 * All colors should be in hex format (e.g., "#2a2a2a" or "#fff")
 */
export interface FloppyTheme {
  /** Main disk body color (hex format) */
  diskColor?: string;
  /** Metal slide color (hex format) */
  slideColor?: string;
  /** Background/cutout color (hex format) */
  backgroundColor?: string;
  /** Label paper color (hex format) */
  labelColor?: string;
  /** Label text color (hex format) */
  labelTextColor?: string;
  /** Enable dynamic gradient backgrounds for the label (default: false) */
  enableGradient?: boolean;
  /**
   * Gradient type: 'linear', 'radial', 'conic', or 'auto' for random selection
   * Only used when enableGradient is true
   * @default 'auto'
   */
  gradientType?: 'linear' | 'radial' | 'conic' | 'auto';
  /** Custom gradient options (seed, colors, angle) */
  gradientOptions?: GradientOptions;
}

/**
 * Props for the FloppyDisk component
 */
export interface FloppyDiskProps {
  /**
   * Size of the floppy disk. Predefined sizes or custom pixel value.
   * @default 'medium'
   */
  size?: FloppySize;

  /**
   * Structured label data for the disk
   */
  label?: FloppyLabel;

  /**
   * Disk type: HD (High Density) or DD (Double Density)
   * @default 'HD'
   */
  diskType?: DiskType;

  /**
   * Storage capacity display (e.g., "1.44 MB") - overrides label.size if provided
   * @default '1.44 MB'
   */
  capacity?: string;

  /**
   * Color theme customization. Merges with default theme.
   */
  theme?: FloppyTheme;

  /**
   * Animation configuration. Customize timing and easing.
   */
  animation?: AnimationConfig;

  /**
   * Interaction variant
   * @default 'interactive'
   */
  variant?: FloppyVariant;

  /**
   * Whether the disk is selected (shows blue outline)
   * @default false
   */
  selected?: boolean;

  /**
   * Whether the disk is disabled (grayed out, no interactions)
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the disk is in a loading state (shows subtle pulse animation)
   * @default false
   */
  loading?: boolean;

  /**
   * Whether the disk is in an error state (shows red outline)
   * @default false
   */
  error?: boolean;

  /**
   * Enable hover animation for the metal slide
   * When true, slide opens on hover. When false, slide stays closed.
   * @default true for medium/large/hero sizes, false for tiny/small
   */
  enableSlideHover?: boolean;

  /**
   * Click handler - called when disk is clicked
   */
  onClick?: () => void;

  /**
   * Double-click handler - called when disk is double-clicked
   */
  onDoubleClick?: () => void;

  /**
   * Hover handler - called when hover state changes
   * @param isHovered - true when mouse enters, false when mouse leaves
   */
  onHover?: (isHovered: boolean) => void;

  /**
   * Focus handler - called when focus state changes
   * @param isFocused - true when focused, false when blurred
   */
  onFocus?: (isFocused: boolean) => void;

  /**
   * Additional CSS class name to apply to the root element
   * @default ''
   */
  className?: string;

  /**
   * Inline styles for the root element
   */
  style?: React.CSSProperties;

  /**
   * Test ID for testing libraries (e.g., data-testid)
   */
  'data-testid'?: string;

  /**
   * Custom disk ID for tracking (e.g., data-disk-id)
   */
  'data-disk-id'?: string;

  /**
   * Badge content to display in the top-right corner (e.g., "NEW", count badge)
   */
  badge?: React.ReactNode;

  /**
   * Custom overlay content (rendered on top of the disk)
   */
  children?: React.ReactNode;

  /**
   * Accessible label for screen readers. If not provided, auto-generated from label data.
   */
  ariaLabel?: string;
}

/**
 * Mapping of predefined size names to pixel values
 */
export const SIZE_MAP: Record<Exclude<FloppySize, number>, number> = {
  tiny: 60,
  small: 120,
  medium: 200,
  large: 400,
  hero: 600,
};

/**
 * Light theme preset - optimized for light backgrounds
 */
export const LIGHT_FLOPPY_THEME: FloppyTheme = {
  diskColor: '#2a2a2a',
  slideColor: '#c0c0c0',
  backgroundColor: '#ceb',
  labelColor: '#ffffff',
  labelTextColor: '#000000',
  enableGradient: false,
  gradientType: 'auto',
};

/**
 * Dark theme preset - optimized for dark backgrounds
 */
export const DARK_FLOPPY_THEME: FloppyTheme = {
  diskColor: '#1a1a1a',
  slideColor: '#4a4a4a',
  backgroundColor: '#0a0a0a',
  labelColor: '#2a2a2a',
  labelTextColor: '#e0e0e0',
  enableGradient: false,
  gradientType: 'auto',
};

/**
 * Neon theme preset - vibrant cyberpunk aesthetic
 */
export const NEON_THEME: FloppyTheme = {
  diskColor: '#0a0a0a',
  slideColor: '#ff00ff',
  backgroundColor: '#000000',
  labelColor: 'linear-gradient(135deg, #ff00ff 0%, #00ffff 100%)',
  labelTextColor: '#ffffff',
  enableGradient: true,
  gradientType: 'auto',
};

/**
 * Retro theme preset - classic 90s beige computer aesthetic
 */
export const RETRO_THEME: FloppyTheme = {
  diskColor: '#d4c5a9',
  slideColor: '#8b7355',
  backgroundColor: '#f5e6d3',
  labelColor: '#fffef0',
  labelTextColor: '#2c2416',
  enableGradient: false,
  gradientType: 'auto',
};

/**
 * Pastel theme preset - soft, modern colors
 */
export const PASTEL_THEME: FloppyTheme = {
  diskColor: '#ffd6e8',
  slideColor: '#c9a0dc',
  backgroundColor: '#fff0f5',
  labelColor: 'linear-gradient(135deg, #ffd6e8 0%, #c9a0dc 50%, #a8d8ea 100%)',
  labelTextColor: '#4a4a4a',
  enableGradient: true,
  gradientType: 'auto',
};

/**
 * Default theme (same as LIGHT_FLOPPY_THEME)
 */
export const DEFAULT_THEME: FloppyTheme = LIGHT_FLOPPY_THEME;
