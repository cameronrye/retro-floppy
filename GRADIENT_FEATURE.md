# Dynamic Gradient Labels Feature

## Overview

The FloppyDisk component now supports dynamic gradient backgrounds for disk labels with adaptive text colors that ensure optimal readability and WCAG accessibility compliance.

## Features

### 1. Dynamic Gradient Backgrounds

- **Deterministic Generation**: Each disk label gets a unique gradient based on its name, ensuring consistency across renders
- **Multiple Gradient Types**: Supports linear, radial, and conic gradients
- **Vibrant Color Palettes**: Generates aesthetically pleasing color combinations with high saturation (60-95%) and medium lightness (40-70%)
- **Seeded Randomization**: Uses a Mulberry32 PRNG seeded from the label name for reproducible results

### 2. Adaptive Text Color

- **Automatic Contrast Calculation**: Analyzes gradient luminance using WCAG formulas
- **Smart Color Selection**: Automatically chooses between black (#000000) or white (#ffffff) text
- **Accessibility Compliant**: Ensures contrast ratios meet WCAG AA standards (4.5:1 for normal text)

## Usage

### Basic Usage

```tsx
import { FloppyDisk } from 'retro-floppy';

// Enable gradients with auto type selection
<FloppyDisk
  label={{ name: 'My App', author: 'Developer' }}
  theme={{ enableGradient: true }}
/>;
```

### Gradient Types

```tsx
// Linear gradient
<FloppyDisk
  label={{ name: 'Linear Demo', author: 'Dev' }}
  theme={{ enableGradient: true, gradientType: 'linear' }}
/>

// Radial gradient
<FloppyDisk
  label={{ name: 'Radial Demo', author: 'Dev' }}
  theme={{ enableGradient: true, gradientType: 'radial' }}
/>

// Conic gradient
<FloppyDisk
  label={{ name: 'Conic Demo', author: 'Dev' }}
  theme={{ enableGradient: true, gradientType: 'conic' }}
/>

// Auto (random type selection)
<FloppyDisk
  label={{ name: 'Auto Demo', author: 'Dev' }}
  theme={{ enableGradient: true, gradientType: 'auto' }}
/>
```

## API Changes

### FloppyTheme Interface

Two new optional properties have been added to the `FloppyTheme` interface:

```typescript
interface FloppyTheme {
  // ... existing properties ...

  /** Enable dynamic gradient backgrounds for the label (default: false) */
  enableGradient?: boolean;

  /**
   * Gradient type: 'linear', 'radial', 'conic', or 'auto' for random selection
   * Only used when enableGradient is true
   * @default 'auto'
   */
  gradientType?: 'linear' | 'radial' | 'conic' | 'auto';
}
```

## Implementation Details

### New Files

1. **src/gradientUtils.ts**: Core gradient generation and color contrast utilities
   - `createSeededRandom()`: Mulberry32 PRNG implementation
   - `stringToSeed()`: Converts label name to numeric seed
   - `generateColorPalette()`: Creates harmonious color combinations
   - `calculateLuminance()`: WCAG relative luminance calculation
   - `calculateContrastRatio()`: WCAG contrast ratio calculation
   - `getAdaptiveTextColor()`: Determines optimal text color
   - `generateGradientCSS()`: Creates CSS gradient strings
   - `generateLabelGradient()`: Main function that orchestrates gradient generation

### Modified Files

1. **src/types.ts**: Added gradient options to `FloppyTheme` interface
2. **src/FloppyDisk.tsx**: Integrated gradient generation with useMemo for performance
3. **example/App.tsx**: Added gradient showcase section and toggle button
4. **example/App.css**: Added styling for gradient showcase
5. **src/**tests**/FloppyDisk.test.tsx**: Added 6 new tests for gradient functionality

## Backward Compatibility

The feature is **fully backward compatible**:

- Gradients are disabled by default (`enableGradient: false`)
- Existing disks continue to use solid colors unless explicitly enabled
- All existing props and themes work exactly as before

## Performance

- Gradient generation is memoized using `useMemo`
- Only recalculates when `enableGradient`, `gradientType`, or `label.name` changes
- Minimal performance impact on render cycles

## Testing

All tests pass (30/30), including:

- ✅ Gradient application when enabled
- ✅ Solid color fallback when disabled
- ✅ Deterministic gradient generation (same name = same gradient)
- ✅ Different gradients for different names
- ✅ Adaptive text color (black or white)
- ✅ All existing functionality preserved

## Browser Support

Works in all modern browsers that support:

- CSS gradients (linear-gradient, radial-gradient, conic-gradient)
- CSS custom properties (CSS variables)
- ES6+ JavaScript features

## Examples

See the example app at `http://localhost:5173/` with gradients enabled to see:

- Different gradient types in action
- Adaptive text colors on various backgrounds
- Deterministic gradient generation
- Integration with existing themes and variants
