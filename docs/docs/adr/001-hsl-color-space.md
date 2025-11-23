# ADR-001: Use HSL Color Space for Gradient Generation

**Status**: Accepted

**Date**: 2024-01-15

**Deciders**: Core Development Team

## Context

The Retro Floppy component needs to generate visually appealing, harmonious gradients for disk labels. The gradient generation system must:

1. Create aesthetically pleasing color combinations
2. Ensure sufficient contrast for text readability (WCAG compliance)
3. Generate deterministic gradients from label names
4. Support pastel/soft color palettes for retro aesthetic
5. Be intuitive for developers to understand and maintain

We needed to choose a color space for gradient generation. The main options were:

- **RGB (Red, Green, Blue)**: Standard web color model
- **HSL (Hue, Saturation, Lightness)**: Cylindrical color model
- **HSV (Hue, Saturation, Value)**: Similar to HSL but different lightness calculation
- **LAB**: Perceptually uniform color space

## Decision

We chose **HSL (Hue, Saturation, Lightness)** as the primary color space for gradient generation.

### Rationale

1. **Intuitive Color Theory**: HSL maps directly to color wheel concepts
   - Hue (0-360°) = position on color wheel
   - Saturation (0-100%) = color intensity
   - Lightness (0-100%) = brightness

2. **Easy Analogous Color Generation**: Creating harmonious gradients is simple

   ```typescript
   const baseHue = 210; // Blue
   const analogousHue = (baseHue + 30) % 360; // Blue-green (harmonious)
   ```

3. **Pastel Optimization**: Achieving soft, retro colors is straightforward

   ```typescript
   const saturation = 35; // Low saturation = soft colors
   const lightness = 75; // High lightness = pastel tones
   ```

4. **Contrast Control**: Easy to ensure text readability
   - High lightness (65-85%) ensures light backgrounds
   - Predictable contrast with dark text

5. **Browser Support**: Native CSS support via `hsl()` function
   - No conversion needed for CSS output
   - Efficient rendering

### Alternatives Considered

**RGB**: Rejected because:

- Non-intuitive for color theory (hard to create analogous colors)
- Difficult to control saturation/lightness independently
- Complex calculations for harmonious palettes

**HSV**: Rejected because:

- Less intuitive lightness model (value ≠ perceived brightness)
- No native CSS support (requires conversion)
- Similar complexity to HSL without benefits

**LAB**: Rejected because:

- Overkill for this use case
- No native CSS support
- Complex calculations
- Harder for developers to understand

## Consequences

### Positive Consequences

- **Simple Color Theory**: Developers can easily understand and modify gradient logic
- **Harmonious Gradients**: Analogous color scheme (hue ± 30°) creates pleasing results
- **Pastel Control**: Low saturation + high lightness = consistent retro aesthetic
- **WCAG Compliance**: High lightness values ensure good text contrast
- **Performance**: No color space conversion needed for CSS output
- **Maintainability**: Intuitive parameters make debugging easier

### Negative Consequences

- **Perceptual Non-Uniformity**: HSL is not perceptually uniform
  - A hue shift of 30° may look different in blue vs. yellow
  - Mitigated by: Limited hue ranges and extensive testing
- **Conversion Overhead**: Need to convert HSL to RGB for luminance calculations
  - Impact: Minimal, only done once per gradient generation
- **Limited Color Space**: Can't access all possible colors
  - Impact: None, pastel range is sufficient for use case

### Neutral Consequences

- **Learning Curve**: Developers need to understand HSL color model
  - Mitigated by: Comprehensive inline documentation
- **Testing**: Need to test across different hue ranges
  - Addressed by: Comprehensive test suite with edge cases

## Implementation Notes

### HSL Value Ranges

```typescript
// Pastel-optimized ranges for retro aesthetic
const hue = 0 - 360; // Full color wheel
const saturation = 25 - 50; // Soft, muted colors
const lightness = 65 - 85; // Light, airy backgrounds
```

### Analogous Color Formula

```typescript
// Create harmonious gradients with 15-45° hue shifts
const hueOffset = (random() * 30 + 15) * colorIndex;
const hue = (baseHue + hueOffset) % 360;
```

### Contrast Calculation

For WCAG compliance, we convert HSL → RGB → Luminance:

```typescript
const rgb = hslToRgb(hslColor);
const luminance = calculateLuminance(rgb.r, rgb.g, rgb.b);
const contrast = calculateContrastRatio(luminance, textLuminance);
```

## References

- [HSL Color Space - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl)
- [Color Theory - Analogous Colors](https://www.colormatters.com/color-and-design/basic-color-theory)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- Implementation: `src/gradientUtils.ts` - `generateColorPalette()`
