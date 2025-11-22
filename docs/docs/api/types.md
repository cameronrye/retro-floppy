---
sidebar_position: 2
---

# TypeScript Types

Complete TypeScript type definitions.

## FloppySize

```typescript
type FloppySize = 'tiny' | 'small' | 'medium' | 'large' | 'hero' | number;
```

## FloppyLabel

```typescript
interface FloppyLabel {
  name?: string;
  author?: string;
  year?: string;
  description?: string;
  type?: string;
  size?: string;
}
```

## FloppyTheme

```typescript
interface FloppyTheme {
  diskColor?: string;
  slideColor?: string;
  backgroundColor?: string;
  labelColor?: string;
  labelTextColor?: string;
  enableGradient?: boolean;
  gradientType?: 'linear' | 'radial' | 'conic' | 'auto';
  gradientOptions?: GradientOptions;
}
```

## FloppyDiskProps

```typescript
interface FloppyDiskProps {
  size?: FloppySize;
  label?: FloppyLabel;
  diskType?: 'HD' | 'DD';
  capacity?: string;
  theme?: FloppyTheme;
  animation?: AnimationConfig;
  variant?: 'interactive' | 'static' | 'compact';
  selected?: boolean;
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;
  enableSlideHover?: boolean;
  onClick?: () => void;
  onDoubleClick?: () => void;
  onHover?: (isHovering: boolean) => void;
  onFocus?: () => void;
  className?: string;
  style?: React.CSSProperties;
  badge?: React.ReactNode;
  children?: React.ReactNode;
  ariaLabel?: string;
}
```
