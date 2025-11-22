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
const LABEL_WIDTH_RATIO = 0.88;
const BORDER_THICKNESS_DIVISOR = 200;
const SIZE_WARNING_MIN = 10;
const SIZE_WARNING_MAX = 1000;

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
        `FloppyDisk: size ${size}px is outside recommended range (${SIZE_WARNING_MIN}-${SIZE_WARNING_MAX}px)`,
      );
    }

    const mergedTheme = { ...DEFAULT_THEME, ...theme };

    // Refs for dynamic font sizing
    const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [fontScales, setFontScales] = useState<number[]>([1, 1]);

    // Calculate border thickness based on size
    const borderThickness = Math.max(
      1,
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
        10,
      ),
      '--floppy-shadow': darkenColor(
        mergedTheme.diskColor || DEFAULT_THEME.diskColor!,
        10,
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
        : `${animation.hoverDuration || 500}ms`,
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

    // Dynamic font sizing effect (useLayoutEffect to prevent flash of unstyled content)
    useLayoutEffect(() => {
      const calculateScales = () => {
        const newScales: number[] = [];

        lineRefs.current.forEach((lineRef, index) => {
          if (lineRef && labelLines[index]) {
            // Only apply dynamic scaling to the name field (index 0)
            // Author field (index 1) should display at natural size
            if (index !== 0) {
              newScales[index] = 1;
              return;
            }

            // Get the actual container width (the .lines element)
            const linesContainer = lineRef.parentElement;
            if (!linesContainer) {
              newScales[index] = 1;
              return;
            }

            // Temporarily remove transform to get true text width
            const originalTransform = lineRef.style.transform;
            lineRef.style.transform = 'none';

            const containerWidth = linesContainer.offsetWidth;
            const textWidth = lineRef.scrollWidth;

            // Restore transform
            lineRef.style.transform = originalTransform;

            // Calculate scale factor with padding
            const availableWidth = containerWidth * LABEL_WIDTH_RATIO;
            const scale = availableWidth / textWidth;

            // Clamp scale to allow compression and expansion
            newScales[index] = Math.max(
              FONT_SCALE_MIN,
              Math.min(FONT_SCALE_MAX, scale),
            );
          } else {
            newScales[index] = 1;
          }
        });

        setFontScales(newScales);
      };

      // Calculate synchronously before paint
      calculateScales();
    }, [labelLines, sizeInPx]);

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
        tabIndex={disabled ? -1 : 0}
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
              <svg viewBox="0 0 50 15" preserveAspectRatio="xMaxYMid meet">
                <text x="45" y="12" textAnchor="end">
                  {displayType}
                </text>
              </svg>
              <svg viewBox="0 0 80 15" preserveAspectRatio="xMaxYMid meet">
                <text x="72" y="12" textAnchor="end">
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
                const isName = index === 0;
                const isAuthor = index === 1;

                let transform: string;
                let transformOrigin: string;

                if (isName) {
                  transform = `translate(-50%, -50%) scaleX(${fontScales[index]})`;
                  transformOrigin = 'center center';
                } else if (isAuthor) {
                  transform = `translateX(-50%)`;
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
 * Lightens a hex color by a given percentage
 * @param color - Hex color string (e.g., "#2a2a2a" or "#fff")
 * @param percent - Percentage to lighten (0-100)
 * @returns Lightened hex color string
 */
function lightenColor(color: string, percent: number): string {
  // Remove # and handle 3-digit hex
  const hex = color.replace('#', '');
  const fullHex =
    hex.length === 3
      ? hex
          .split('')
          .map((c) => c + c)
          .join('')
      : hex;

  if (!/^[0-9A-Fa-f]{6}$/.test(fullHex)) {
    console.warn(
      `FloppyDisk: Invalid color format: ${color}. Using original color.`,
    );
    return color;
  }

  const num = parseInt(fullHex, 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, ((num >> 16) & 0xff) + amt);
  const G = Math.min(255, ((num >> 8) & 0xff) + amt);
  const B = Math.min(255, (num & 0xff) + amt);
  return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
}

/**
 * Darkens a hex color by a given percentage
 * @param color - Hex color string (e.g., "#2a2a2a" or "#fff")
 * @param percent - Percentage to darken (0-100)
 * @returns Darkened hex color string
 */
function darkenColor(color: string, percent: number): string {
  // Remove # and handle 3-digit hex
  const hex = color.replace('#', '');
  const fullHex =
    hex.length === 3
      ? hex
          .split('')
          .map((c) => c + c)
          .join('')
      : hex;

  if (!/^[0-9A-Fa-f]{6}$/.test(fullHex)) {
    console.warn(
      `FloppyDisk: Invalid color format: ${color}. Using original color.`,
    );
    return color;
  }

  const num = parseInt(fullHex, 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, ((num >> 16) & 0xff) - amt);
  const G = Math.max(0, ((num >> 8) & 0xff) - amt);
  const B = Math.max(0, (num & 0xff) - amt);
  return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
}
