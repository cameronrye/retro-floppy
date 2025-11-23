# ADR-002: Dynamic Font Scaling with scaleX Transform

**Status**: Accepted

**Date**: 2024-01-15

**Deciders**: Core Development Team

## Context

The Retro Floppy component displays user-provided text labels on a fixed-size disk surface. The challenge:

1. **Variable Text Length**: Users can input any text (short or long)
2. **Fixed Label Area**: The label area has a fixed width based on disk size
3. **Readability**: Text must remain readable at all sizes
4. **Aesthetic**: Text should look natural, not distorted
5. **Performance**: Scaling must be smooth and not cause layout thrashing

We needed to choose a method for dynamically fitting text within the label area.

### Options Considered

1. **Reduce font-size**: Decrease `font-size` CSS property
2. **CSS transform: scale()**: Scale both X and Y axes
3. **CSS transform: scaleX()**: Scale only X axis (horizontal compression)
4. **Text truncation**: Cut off text with ellipsis
5. **Word wrapping**: Break text into multiple lines

## Decision

We chose **CSS transform: scaleX()** for horizontal text compression with the following constraints:

- **Scale Range**: 0.4 (40%) to 1.5 (150%)
- **Only Name Field**: Apply scaling only to the primary name field, not author
- **Measurement**: Temporarily remove transforms to measure true text width
- **Timing**: Use `useLayoutEffect` to prevent flash of unstyled content (FOUC)

### Implementation

```typescript
// Calculate scale factor
const availableWidth = containerWidth * 0.88; // 12% padding
const scale = availableWidth / textWidth;

// Clamp to readable range
const finalScale = Math.max(0.4, Math.min(1.5, scale));

// Apply as scaleX transform
element.style.transform = `scaleX(${finalScale})`;
```

## Rationale

### Why scaleX() over font-size?

1. **Performance**: Transform is GPU-accelerated, font-size triggers reflow
2. **Smoothness**: Transform doesn't affect layout, preventing cascade effects
3. **Precision**: Can scale to exact fit, not limited to discrete font sizes
4. **Animation**: Easier to animate if needed in future

### Why scaleX() over scale()?

1. **Readability**: Preserving vertical height maintains better readability
2. **Aesthetic**: Horizontal compression looks more natural than shrinking
3. **Line Height**: Vertical spacing remains consistent
4. **Retro Feel**: Condensed fonts are common in retro design

### Why 0.4 - 1.5 Range?

- **Minimum (0.4)**: Below this, text becomes illegible
  - Tested with various fonts and sizes
  - Maintains character recognition
- **Maximum (1.5)**: Above this, text looks stretched and unnatural
  - Prevents "wide" distortion
  - Keeps proportions reasonable

### Why Only Name Field?

- **Hierarchy**: Author field should remain at natural size for visual hierarchy
- **Readability**: Smaller author text shouldn't be compressed further
- **Design**: Creates clear distinction between primary and secondary text

## Consequences

### Positive Consequences

- **Performance**: GPU-accelerated transforms are fast and smooth
- **Flexibility**: Handles any text length gracefully
- **No Truncation**: Users see their full text, not "My Disk..."
- **Responsive**: Automatically adjusts when disk size changes
- **Retro Aesthetic**: Condensed text fits the retro floppy disk theme
- **Accessibility**: Text remains readable within scale bounds

### Negative Consequences

- **Distortion**: Very long text (>150% compression) looks condensed
  - Mitigated by: 0.4 minimum scale prevents extreme distortion
  - User feedback: Console warning for very long text (future enhancement)
- **Font Rendering**: Some fonts may look worse when scaled
  - Impact: Minimal, most fonts handle scaleX well
  - Mitigation: Use web-safe fonts with good hinting
- **Measurement Complexity**: Need to temporarily remove transforms to measure
  - Impact: Minimal performance cost, happens once per render
  - Benefit: Accurate measurements worth the complexity

### Neutral Consequences

- **Browser Compatibility**: Transform is well-supported (IE9+)
- **Testing**: Need to test with various text lengths and fonts
- **Documentation**: Developers need to understand the scaling algorithm

## Implementation Notes

### Measurement Technique

```typescript
// Remove transform to get true dimensions
const originalTransform = element.style.transform;
element.style.transform = 'none';

const textWidth = element.scrollWidth;

// Restore immediately
element.style.transform = originalTransform;
```

This prevents the transform from affecting measurements, ensuring accurate calculations.

### FOUC Prevention

```typescript
useLayoutEffect(() => {
  calculateScales();
}, [labelLines, sizeInPx]);
```

`useLayoutEffect` runs synchronously before browser paint, preventing users from seeing unscaled text flash.

### Transform Origin

```typescript
transformOrigin: 'center center';
```

Scaling from center keeps text visually centered in the label area.

## Alternatives Considered

### 1. Reduce font-size

**Rejected because**:

- Triggers layout reflow (performance)
- Discrete sizes (12px, 11px, 10px) don't fit exactly
- Affects line-height and vertical spacing
- Harder to animate

### 2. scale() (both axes)

**Rejected because**:

- Makes text too small vertically
- Reduces readability more than scaleX
- Doesn't fit retro condensed font aesthetic

### 3. Text Truncation

**Rejected because**:

- Users can't see their full text
- Poor UX for important labels
- Doesn't fit "show everything" philosophy

### 4. Word Wrapping

**Rejected because**:

- Limited vertical space on label
- Multi-line text looks cluttered
- Harder to read at small sizes
- Doesn't fit single-line label design

## Future Enhancements

1. **User Warning**: Console warning when scale < 0.6 (heavily compressed)
2. **Custom Scale Limits**: Allow users to override min/max scale via props
3. **Font Selection**: Recommend condensed fonts for long text
4. **Animation**: Smooth transition when text changes

## References

- [CSS Transforms - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
- [useLayoutEffect - React Docs](https://react.dev/reference/react/useLayoutEffect)
- [GPU Acceleration - Web Performance](https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/)
- Implementation: `src/FloppyDisk.tsx` - Font scaling algorithm (lines 252-335)
