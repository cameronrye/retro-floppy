import React, {
  CSSProperties,
  useRef,
  useLayoutEffect,
  useState,
  useMemo,
} from 'react';
import { FloppyDiskProps, SIZE_MAP, DEFAULT_THEME } from './types';
import styles from './FloppyDisk.module.css';
import { generateLabelGradient } from './gradientUtils';

// Constants for component behavior
const FONT_SCALE_MIN = 0.4;
const FONT_SCALE_MAX = 1.5;
const FONT_SCALE_DEFAULT = 1;
const LABEL_WIDTH_RATIO = 0.88;
const BORDER_THICKNESS_DIVISOR = 200;
const BORDER_THICKNESS_MIN = 1;
const SIZE_WARNING_MIN = 10;
const SIZE_WARNING_MAX = 1000;
const COLOR_ADJUSTMENT_PERCENT = 10;
const DEFAULT_ANIMATION_DURATION_MS = 500;
const DISABLED_TAB_INDEX = -1;
const ENABLED_TAB_INDEX = 0;
const NAME_LINE_INDEX = 0;
const AUTHOR_LINE_INDEX = 1;
const INITIAL_FONT_SCALES = [1, 1];

// SVG constants for slide text
const SLIDE_TYPE_VIEWBOX = '0 0 50 15';
const SLIDE_TYPE_TEXT_X = '45';
const SLIDE_TYPE_TEXT_Y = '12';
const SLIDE_CAPACITY_VIEWBOX = '0 0 80 15';
const SLIDE_CAPACITY_TEXT_X = '72';
const SLIDE_CAPACITY_TEXT_Y = '12';

// CSS transform constants
const TRANSFORM_CENTER_PERCENT = '-50%';

// Color manipulation constants
const HEX_SHORT_LENGTH = 3;
const HEX_FULL_LENGTH = 6;
const HEX_RADIX = 16;
const PERCENT_TO_RGB_MULTIPLIER = 2.55;
const RGB_MAX = 255;
const RGB_MIN = 0;
const RGB_SHIFT_RED = 16;
const RGB_SHIFT_GREEN = 8;
const RGB_SHIFT_BLUE = 0;
const HEX_PREFIX_SHIFT = 24;

/**
 * A beautiful, interactive 3.5" floppy disk React component for retro-themed UIs.
 *
 * @example
 * ```tsx
 * <FloppyDisk
 *   size="medium"
 *   label={{ name: "My App", author: "Me" }}
 *   onClick={() => console.log("clicked")}
 * />
 * ```
 */
export const FloppyDisk: React.FC<FloppyDiskProps> = React.memo(
  ({
    size = 'medium',
    label,
    diskType = 'HD',
    capacity,
    theme = {},
    animation = {},
    variant = 'interactive',
    selected = false,
    disabled = false,
    loading = false,
    error = false,
    enableSlideHover,
    onClick,
    onDoubleClick,
    onHover,
    onFocus,
    className = '',
    style,
    'data-testid': dataTestId,
    'data-disk-id': dataDiskId,
    badge,
    children,
    ariaLabel,
  }) => {
    const sizeInPx = typeof size === 'number' ? size : SIZE_MAP[size];

    // Default enableSlideHover based on size: true for medium and larger, false for tiny/small
    const slideHoverEnabled =
      enableSlideHover ??
      (typeof size === 'string'
        ? ['medium', 'large', 'hero'].includes(size)
        : sizeInPx >= SIZE_MAP.medium);

    // Runtime validation for custom size values
    if (
      typeof size === 'number' &&
      (size < SIZE_WARNING_MIN || size > SIZE_WARNING_MAX)
    ) {
      console.warn(
        `FloppyDisk: size ${size}px is outside recommended range (${SIZE_WARNING_MIN}-${SIZE_WARNING_MAX}px). This may cause rendering issues or poor performance. Consider using predefined sizes: 'tiny', 'small', 'medium', 'large', or 'hero'.`,
      );
    }

    const mergedTheme = { ...DEFAULT_THEME, ...theme };

    // Refs for dynamic font sizing
    const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [fontScales, setFontScales] = useState<number[]>(INITIAL_FONT_SCALES);

    // Calculate border thickness based on size
    const borderThickness = Math.max(
      BORDER_THICKNESS_MIN,
      Math.round(sizeInPx / BORDER_THICKNESS_DIVISOR),
    );

    // Generate gradient if enabled (memoized for performance)
    const gradientConfig = useMemo(() => {
      if (mergedTheme.enableGradient && label?.name) {
        return generateLabelGradient(
          label.name,
          mergedTheme.gradientType || 'auto',
          mergedTheme.gradientOptions,
        );
      }
      return null;
    }, [
      mergedTheme.enableGradient,
      mergedTheme.gradientType,
      mergedTheme.gradientOptions,
      label,
    ]);

    const cssVariables: CSSProperties = {
      '--floppy-size': `${sizeInPx}px`,
      '--floppy-border': `${borderThickness}px`,
      '--floppy-color': mergedTheme.diskColor,
      '--floppy-highlight': lightenColor(
        mergedTheme.diskColor || DEFAULT_THEME.diskColor!,
        COLOR_ADJUSTMENT_PERCENT,
      ),
      '--floppy-shadow': darkenColor(
        mergedTheme.diskColor || DEFAULT_THEME.diskColor!,
        COLOR_ADJUSTMENT_PERCENT,
      ),
      '--slide-color': mergedTheme.slideColor,
      '--bg-color': mergedTheme.backgroundColor,
      '--label-color': gradientConfig
        ? gradientConfig.gradient
        : mergedTheme.labelColor,
      '--label-text-color': gradientConfig
        ? gradientConfig.textColor
        : mergedTheme.labelTextColor,
      '--label-text-shadow': gradientConfig
        ? gradientConfig.textShadow
        : 'none',
      '--animation-duration': animation.disableAnimations
        ? '0ms'
        : `${animation.hoverDuration || DEFAULT_ANIMATION_DURATION_MS}ms`,
      '--animation-easing': animation.easing || 'linear',
    } as CSSProperties;

    const containerClasses = [
      styles.silhouette,
      variant === 'compact' && styles.compact,
      selected && styles.selected,
      disabled && styles.disabled,
      loading && styles.loading,
      error && styles.error,
      variant === 'static' && styles.static,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleClick = () => {
      if (!disabled && onClick) onClick();
    };

    const handleDoubleClick = () => {
      if (!disabled && onDoubleClick) onDoubleClick();
    };

    const handleMouseEnter = () => {
      if (onHover) onHover(true);
    };

    const handleMouseLeave = () => {
      if (onHover) onHover(false);
    };

    const handleFocus = () => {
      if (onFocus) onFocus(true);
    };

    const handleBlur = () => {
      if (onFocus) onFocus(false);
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLElement> = (event) => {
      if (disabled) return;

      if (event.key === 'Enter') {
        event.preventDefault();
        if (onClick) onClick();
      }

      // Prevent scrolling on space, but activate on keyup (native button behavior)
      if (event.key === ' ') {
        event.preventDefault();
      }
    };

    const handleKeyUp: React.KeyboardEventHandler<HTMLElement> = (event) => {
      if (disabled) return;

      if (event.key === ' ') {
        event.preventDefault();
        if (onClick) onClick();
      }
    };

    // Format label data into display lines (memoized to prevent unnecessary re-renders)
    const labelLines = useMemo(() => {
      const lines: string[] = [];
      if (label) {
        // Line 1: Name
        lines.push(label.name || '');
        // Line 2: Author
        lines.push(label.author || '');
      } else {
        // Default empty lines
        lines.push('', '');
      }
      return lines;
    }, [label]);

    const yearText = label?.year || '';

    // Use capacity from props, or fall back to label.size, or default
    const displayCapacity = capacity || label?.size || '1.44 MB';
    const displayType = label?.type || (diskType === 'HD' ? 'ZIP' : 'DISK');

    const accessibleLabel =
      ariaLabel ||
      (label ? `${label.name} by ${label.author || 'Unknown'}` : 'Floppy disk');

    /**
     * Dynamic Font Scaling Algorithm
     *
     * This effect implements an adaptive font scaling system that automatically
     * adjusts text size to fit within the label area while maintaining readability.
     *
     * Algorithm Overview:
     * 1. Measure the natural (unscaled) width of each text line
     * 2. Compare against available container width (with padding)
     * 3. Calculate optimal scale factor to fit text within bounds
     * 4. Clamp scale between min (0.4) and max (1.5) for readability
     *
     * Key Design Decisions:
     * - Only scales the NAME field (index 0) to prevent author text from becoming too small
     * - Uses scaleX transform instead of font-size for smoother rendering
     * - Temporarily removes transforms during measurement for accurate dimensions
     * - Uses useLayoutEffect to prevent flash of unstyled content (FOUC)
     * - Recalculates on labelLines or sizeInPx changes for responsiveness
     *
     * Scale Bounds:
     * - MIN (0.4): Prevents text from becoming unreadable when compressed
     * - MAX (1.5): Prevents excessive expansion that looks distorted
     * - DEFAULT (1.0): Natural size when no scaling needed
     *
     * @see LABEL_WIDTH_RATIO (0.88) - Reserves 12% padding for visual breathing room
     */
    useLayoutEffect(() => {
      const calculateScales = () => {
        const newScales: number[] = [];

        lineRefs.current.forEach((lineRef, index) => {
          if (lineRef && labelLines[index]) {
            // Only apply dynamic scaling to the name field (index 0)
            // Author field (index 1) should display at natural size to maintain hierarchy
            if (index !== NAME_LINE_INDEX) {
              newScales[index] = FONT_SCALE_DEFAULT;
              return;
            }

            // Get the actual container width (the .lines element)
            const linesContainer = lineRef.parentElement;
            if (!linesContainer) {
              newScales[index] = FONT_SCALE_DEFAULT;
              return;
            }

            // Temporarily remove transform to get true text width
            // This is necessary because transforms affect offsetWidth/scrollWidth measurements
            const originalTransform = lineRef.style.transform;
            lineRef.style.transform = 'none';

            // Measure dimensions
            const containerWidth = linesContainer.offsetWidth; // Available space
            const textWidth = lineRef.scrollWidth; // Natural text width

            // Restore transform immediately to prevent visual flicker
            lineRef.style.transform = originalTransform;

            // Calculate scale factor with padding
            // LABEL_WIDTH_RATIO (0.88) reserves 12% for padding on both sides
            const availableWidth = containerWidth * LABEL_WIDTH_RATIO;
            const scale = availableWidth / textWidth;

            // Clamp scale to maintain readability and prevent distortion
            // - If text is too wide: compress down to FONT_SCALE_MIN (0.4)
            // - If text is narrow: allow expansion up to FONT_SCALE_MAX (1.5)
            // - If text fits naturally: use calculated scale (likely close to 1.0)
            newScales[index] = Math.max(
              FONT_SCALE_MIN,
              Math.min(FONT_SCALE_MAX, scale),
            );
          } else {
            // Fallback for missing refs or empty lines
            newScales[index] = FONT_SCALE_DEFAULT;
          }
        });

        setFontScales(newScales);
      };

      // Calculate synchronously before paint to prevent FOUC
      // useLayoutEffect ensures this runs before browser paint
      calculateScales();
    }, [labelLines, sizeInPx]); // Recalculate when text content or disk size changes

    return (
      <figure
        className={containerClasses}
        style={{ ...cssVariables, ...style }}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        tabIndex={disabled ? DISABLED_TAB_INDEX : ENABLED_TAB_INDEX}
        role="button"
        aria-label={accessibleLabel}
        aria-disabled={disabled}
        data-testid={dataTestId}
        data-disk-id={dataDiskId}
      >
        <div className={styles.decals}>
          <div className={styles.arrow} />
          <div className={styles.locks} />
        </div>

        <div className={styles.slideTrack}>
          <div className={styles.slideBack}>
            <div className={styles.drop} />
          </div>
          <div
            className={`${styles.slide} ${!slideHoverEnabled ? styles.slideDisabled : ''}`}
          >
            <div className={styles.cutout} />
            <div className={styles.text}>
              <svg
                viewBox={SLIDE_TYPE_VIEWBOX}
                preserveAspectRatio="xMaxYMid meet"
              >
                <text
                  x={SLIDE_TYPE_TEXT_X}
                  y={SLIDE_TYPE_TEXT_Y}
                  textAnchor="end"
                >
                  {displayType}
                </text>
              </svg>
              <svg
                viewBox={SLIDE_CAPACITY_VIEWBOX}
                preserveAspectRatio="xMaxYMid meet"
              >
                <text
                  x={SLIDE_CAPACITY_TEXT_X}
                  y={SLIDE_CAPACITY_TEXT_Y}
                  textAnchor="end"
                >
                  {displayCapacity}
                </text>
              </svg>
            </div>
          </div>
        </div>

        <div className={styles.labelSlot}>
          <div className={styles.label}>
            <div className={styles.lines}>
              {labelLines.map((line, index) => {
                // Name field (index 0) needs translate for centering + scale
                // Author field (index 1) needs translateX for horizontal centering only
                const isName = index === NAME_LINE_INDEX;
                const isAuthor = index === AUTHOR_LINE_INDEX;

                let transform: string;
                let transformOrigin: string;

                if (isName) {
                  transform = `translate(${TRANSFORM_CENTER_PERCENT}, ${TRANSFORM_CENTER_PERCENT}) scaleX(${fontScales[index]})`;
                  transformOrigin = 'center center';
                } else if (isAuthor) {
                  transform = `translateX(${TRANSFORM_CENTER_PERCENT})`;
                  transformOrigin = 'center center';
                } else {
                  transform = `scaleX(${fontScales[index]})`;
                  transformOrigin = 'center center';
                }

                return (
                  <div
                    key={index}
                    ref={(el) => {
                      lineRefs.current[index] = el;
                    }}
                    className={styles.lineText}
                    style={{
                      transform,
                      transformOrigin,
                    }}
                  >
                    {line}
                  </div>
                );
              })}
            </div>
            {yearText && <div className={styles.yearText}>{yearText}</div>}
          </div>
        </div>

        {/* Badge overlay */}
        {badge && <div className={styles.badge}>{badge}</div>}

        {/* Custom children overlay */}
        {children && <div className={styles.overlay}>{children}</div>}
      </figure>
    );
  },
);

// Helper functions for color manipulation with validation

/**
 * Parses and validates a hex color string, converting 3-digit to 6-digit format
 * @param color - Hex color string (e.g., "#2a2a2a" or "#fff")
 * @returns Full 6-digit hex string without # prefix, or null if invalid
 * @remarks This function does not throw errors. Invalid colors return null.
 */
function parseHexColor(color: string): string | null {
  const hex = color.replace('#', '');
  const fullHex =
    hex.length === HEX_SHORT_LENGTH
      ? hex
          .split('')
          .map((c) => c + c)
          .join('')
      : hex;

  if (!new RegExp(`^[0-9A-Fa-f]{${HEX_FULL_LENGTH}}$`).test(fullHex)) {
    return null;
  }

  return fullHex;
}

/**
 * Converts a 6-digit hex string to RGB values
 * @param hex - 6-digit hex string without # prefix
 * @returns RGB values as an object
 * @remarks This function does not throw errors. Assumes valid hex input from parseHexColor.
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const num = parseInt(hex, HEX_RADIX);
  return {
    r: (num >> RGB_SHIFT_RED) & 0xff,
    g: (num >> RGB_SHIFT_GREEN) & 0xff,
    b: (num >> RGB_SHIFT_BLUE) & 0xff,
  };
}

/**
 * Converts RGB values to a hex color string
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns Hex color string with # prefix
 * @remarks This function does not throw errors. Values are clamped to 0-255 range.
 */
function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << HEX_PREFIX_SHIFT) + (r << RGB_SHIFT_RED) + (g << RGB_SHIFT_GREEN) + b).toString(HEX_RADIX).slice(1)}`;
}

/**
 * Adjusts a hex color by a given percentage
 * @param color - Hex color string (e.g., "#2a2a2a" or "#fff")
 * @param percent - Percentage to adjust (0-100)
 * @param operation - Whether to lighten or darken
 * @returns Adjusted hex color string
 * @remarks This function does not throw errors. Invalid colors trigger a console warning and return the original color unchanged.
 */
function adjustColor(
  color: string,
  percent: number,
  operation: 'lighten' | 'darken',
): string {
  const fullHex = parseHexColor(color);

  if (!fullHex) {
    console.warn(
      `FloppyDisk: Invalid color format: '${color}'. Expected hex format (e.g., '#2a2a2a' or '#fff'). Using original color.`,
    );
    return color;
  }

  const rgb = hexToRgb(fullHex);
  const amt = Math.round(PERCENT_TO_RGB_MULTIPLIER * percent);

  let r: number, g: number, b: number;

  if (operation === 'lighten') {
    r = Math.min(RGB_MAX, rgb.r + amt);
    g = Math.min(RGB_MAX, rgb.g + amt);
    b = Math.min(RGB_MAX, rgb.b + amt);
  } else {
    r = Math.max(RGB_MIN, rgb.r - amt);
    g = Math.max(RGB_MIN, rgb.g - amt);
    b = Math.max(RGB_MIN, rgb.b - amt);
  }

  return rgbToHex(r, g, b);
}

/**
 * Lightens a hex color by a given percentage
 * @param color - Hex color string (e.g., "#2a2a2a" or "#fff")
 * @param percent - Percentage to lighten (0-100)
 * @returns Lightened hex color string
 * @remarks This function does not throw errors. Invalid colors trigger a console warning and return the original color unchanged.
 */
function lightenColor(color: string, percent: number): string {
  return adjustColor(color, percent, 'lighten');
}

/**
 * Darkens a hex color by a given percentage
 * @param color - Hex color string (e.g., "#2a2a2a" or "#fff")
 * @param percent - Percentage to darken (0-100)
 * @returns Darkened hex color string
 * @remarks This function does not throw errors. Invalid colors trigger a console warning and return the original color unchanged.
 */
function darkenColor(color: string, percent: number): string {
  return adjustColor(color, percent, 'darken');
}
