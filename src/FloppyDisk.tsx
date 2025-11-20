import React, { CSSProperties, useMemo } from 'react';
import { FloppyDiskProps, SIZE_MAP, DEFAULT_THEME } from './types';
import styles from './FloppyDisk.module.css';

export const FloppyDisk: React.FC<FloppyDiskProps> = ({
  size = 'medium',
  label,
  diskType = 'HD',
  capacity,
  theme = {},
  variant = 'interactive',
  selected = false,
  disabled = false,
  onClick,
  onDoubleClick,
  onFlip,
  className = '',
  ariaLabel,
}) => {
  const sizeInPx = typeof size === 'number' ? size : SIZE_MAP[size];
  const mergedTheme = { ...DEFAULT_THEME, ...theme };

  // Calculate border thickness based on size
  const borderThickness = Math.max(1, Math.round(sizeInPx / 200));

  const cssVariables: CSSProperties = {
    '--floppy-size': `${sizeInPx}px`,
    '--floppy-border': `${borderThickness}px`,
    '--floppy-color': mergedTheme.diskColor,
    '--floppy-highlight': lightenColor(mergedTheme.diskColor, 10),
    '--floppy-shadow': darkenColor(mergedTheme.diskColor, 10),
    '--slide-color': mergedTheme.slideColor,
    '--bg-color': mergedTheme.backgroundColor,
    '--label-color': mergedTheme.labelColor,
    '--label-text-color': mergedTheme.labelTextColor,
  } as CSSProperties;

  const containerClasses = [
    styles.silhouette,
    variant === 'compact' && styles.compact,
    selected && styles.selected,
    disabled && styles.disabled,
    variant === 'static' && styles.static,
    className,
  ].filter(Boolean).join(' ');

  const handleClick = () => {
    if (!disabled && onClick) onClick();
  };

  const handleDoubleClick = () => {
    if (!disabled && onDoubleClick) onDoubleClick();
  };

  // Format label data into display lines
  const labelLines: string[] = [];
  if (label) {
    // Line 1: Name
    labelLines.push(label.name || '');

    // Line 2: Author
    labelLines.push(label.author || '');

    // Line 3: Year
    labelLines.push(label.year || '');
  } else {
    // Default empty lines
    labelLines.push('', '', '');
  }

  // Use capacity from props, or fall back to label.size, or default
  const displayCapacity = capacity || label?.size || '1.44 MB';
  const displayType = label?.type || (diskType === 'HD' ? 'ZIP' : 'DISK');

  const accessibleLabel = ariaLabel || (label ? `${label.name} by ${label.author || 'Unknown'}` : 'Floppy disk');

  return (
    <figure
      className={containerClasses}
      style={cssVariables}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-label={accessibleLabel}
      aria-disabled={disabled}
    >
      <div className={styles.decals}>
        <div className={styles.arrow} />
        <div className={styles.locks} />
      </div>

      <div className={styles.slideTrack}>
        <div className={styles.slideBack}>
          <div className={styles.drop} />
        </div>
        <div className={styles.slide}>
          <div className={styles.cutout} />
          <div className={styles.text}>
            <svg viewBox="0 0 50 15" preserveAspectRatio="xMinYMid meet">
              <text x="2" y="12">{displayType}</text>
            </svg>
            <svg viewBox="0 0 80 15" preserveAspectRatio="xMinYMid meet">
              <text x="2" y="12">{displayCapacity}</text>
            </svg>
          </div>
        </div>
      </div>

      <div className={styles.labelSlot}>
        <div className={styles.label}>
          <div className={styles.lines}>
            {labelLines.map((line, index) => (
              <div key={index} className={styles.lineText}>{line}</div>
            ))}
          </div>
        </div>
      </div>
    </figure>
  );
};

// Helper functions for color manipulation
function lightenColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, ((num >> 16) & 0xff) + amt);
  const G = Math.min(255, ((num >> 8) & 0xff) + amt);
  const B = Math.min(255, (num & 0xff) + amt);
  return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
}

function darkenColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, ((num >> 16) & 0xff) - amt);
  const G = Math.max(0, ((num >> 8) & 0xff) - amt);
  const B = Math.max(0, (num & 0xff) - amt);
  return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
}

