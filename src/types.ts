export type FloppySize = 'tiny' | 'small' | 'medium' | 'large' | 'hero' | number;

export type FloppyVariant = 'interactive' | 'static' | 'compact';

export type DiskType = 'HD' | 'DD';

export interface FloppyLabel {
  /** Software/content name */
  name: string;
  /** Author or company */
  author?: string;
  /** Year of release */
  year?: string;
  /** Description or additional info */
  description?: string;
  /** Disk type (e.g., "ZIP", "DISK") */
  type?: string;
  /** Size (e.g., "1.44MB", "2.6MB") */
  size?: string;
}

export interface FloppyTheme {
  /** Main disk body color */
  diskColor?: string;
  /** Metal slide color */
  slideColor?: string;
  /** Background/cutout color */
  backgroundColor?: string;
  /** Label paper color */
  labelColor?: string;
  /** Label text color */
  labelTextColor?: string;
}

export interface FloppyDiskProps {
  /** Size of the floppy disk. Predefined sizes or custom pixel value */
  size?: FloppySize;

  /** Structured label data for the disk */
  label?: FloppyLabel;

  /** Disk type: HD (High Density) or DD (Double Density) */
  diskType?: DiskType;

  /** Storage capacity display (e.g., "1.44 MB") - overrides label.size if provided */
  capacity?: string;

  /** Color theme customization */
  theme?: FloppyTheme;

  /** Interaction variant */
  variant?: FloppyVariant;

  /** Whether the disk is selected */
  selected?: boolean;

  /** Whether the disk is disabled */
  disabled?: boolean;

  /** Click handler */
  onClick?: () => void;

  /** Double-click handler */
  onDoubleClick?: () => void;

  /** Flip animation complete handler */
  onFlip?: () => void;

  /** Additional CSS class name */
  className?: string;

  /** Accessible label for screen readers */
  ariaLabel?: string;
}

export const SIZE_MAP: Record<Exclude<FloppySize, number>, number> = {
  tiny: 60,
  small: 120,
  medium: 200,
  large: 400,
  hero: 600,
};

export const DEFAULT_THEME: Required<FloppyTheme> = {
  diskColor: '#2a2a2a',
  slideColor: '#c0c0c0',
  backgroundColor: '#ceb',
  labelColor: '#ffffff',
  labelTextColor: '#000000',
};

