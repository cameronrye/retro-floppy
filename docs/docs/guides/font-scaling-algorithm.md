---
sidebar_position: 6
---

# Font Scaling Algorithm

This guide explains the dynamic font scaling algorithm used in the Retro Floppy component to automatically fit text within the label area.

## Overview

The font scaling algorithm ensures that label text always fits within the available space while maintaining readability. It uses CSS transforms for smooth, performant scaling.

## Algorithm Steps

### 1. Measure Natural Text Width

First, we measure how wide the text would be at its natural (unscaled) size:

```typescript
// Temporarily remove any transforms
element.style.transform = 'none';

// Measure the natural width
const textWidth = element.scrollWidth;

// Restore transforms
element.style.transform = originalTransform;
```

**Why remove transforms?** Transforms affect measurements, so we need to temporarily remove them to get the true text width.

### 2. Calculate Available Width

The label area has a fixed width based on the disk size. We reserve 12% for padding:

```typescript
const containerWidth = linesContainer.offsetWidth;
const availableWidth = containerWidth * 0.88; // 88% usable, 12% padding
```

**Why 88%?** This provides visual breathing room (6% padding on each side) and prevents text from touching the edges.

### 3. Calculate Scale Factor

Divide available width by natural text width:

```typescript
const scale = availableWidth / textWidth;
```

**Examples:**

- Text width: 100px, Available: 200px → Scale: 2.0 (expand)
- Text width: 200px, Available: 100px → Scale: 0.5 (compress)
- Text width: 100px, Available: 100px → Scale: 1.0 (perfect fit)

### 4. Clamp to Readable Range

Limit the scale to maintain readability:

```typescript
const finalScale = Math.max(0.4, Math.min(1.5, scale));
```

**Scale Bounds:**

- **Minimum (0.4)**: Prevents text from becoming illegible
- **Maximum (1.5)**: Prevents excessive stretching that looks distorted
- **Default (1.0)**: Natural size when no scaling needed

### 5. Apply Transform

Use `scaleX` transform for horizontal compression/expansion:

```typescript
element.style.transform = `scaleX(${finalScale})`;
element.style.transformOrigin = 'center center';
```

**Why scaleX?** Horizontal scaling maintains vertical readability better than uniform scaling.

## Design Decisions

### Only Scale Name Field

The algorithm only scales the **name field** (first line), not the author field:

```typescript
if (index !== NAME_LINE_INDEX) {
  newScales[index] = 1.0; // Author stays at natural size
  return;
}
```

**Rationale:**

- Maintains visual hierarchy (name is primary, author is secondary)
- Prevents author text from becoming too small
- Creates clear distinction between fields

### Use scaleX Instead of font-size

**Advantages of scaleX:**

- ✅ GPU-accelerated (faster rendering)
- ✅ Doesn't trigger layout reflow
- ✅ Precise scaling (not limited to discrete font sizes)
- ✅ Easier to animate if needed

**Disadvantages of font-size:**

- ❌ Triggers layout reflow (slower)
- ❌ Limited to discrete sizes (12px, 11px, 10px)
- ❌ Affects line-height and vertical spacing

### Use useLayoutEffect

```typescript
useLayoutEffect(() => {
  calculateScales();
}, [labelLines, sizeInPx]);
```

**Why useLayoutEffect?** Runs synchronously before browser paint, preventing flash of unstyled content (FOUC).

**Alternative (useEffect):** Would run after paint, causing visible text size jump.

## Visual Examples

### Short Text (Scale > 1.0)

```
Label: "Hi"
Natural width: 30px
Available width: 200px
Scale: 200 / 30 = 6.67
Clamped: min(1.5, 6.67) = 1.5
Result: Text expands to 150% (45px)
```

### Medium Text (Scale ≈ 1.0)

```
Label: "My Floppy Disk"
Natural width: 180px
Available width: 200px
Scale: 200 / 180 = 1.11
Clamped: 1.11 (within bounds)
Result: Text slightly expands to 111% (200px)
```

### Long Text (Scale < 1.0)

```
Label: "My Super Long Floppy Disk Label Name"
Natural width: 500px
Available width: 200px
Scale: 200 / 500 = 0.4
Clamped: max(0.4, 0.4) = 0.4
Result: Text compresses to 40% (200px)
```

### Very Long Text (Scale < 0.4)

```
Label: "This is an extremely long label that exceeds limits"
Natural width: 800px
Available width: 200px
Scale: 200 / 800 = 0.25
Clamped: max(0.4, 0.25) = 0.4
Result: Text compresses to 40% (320px) - overflows slightly
```

## Performance Considerations

### Measurement Cost

Measuring text width requires:

1. Removing transform
2. Reading `scrollWidth` (triggers layout)
3. Restoring transform

**Cost:** ~1-2ms per label line

**Optimization:** Only runs when `labelLines` or `sizeInPx` changes

### Transform Cost

Applying `scaleX` transform:

- GPU-accelerated
- No layout reflow
- ~0.1ms per frame

**Total Cost:** Negligible for typical use cases

### Batch Updates

The algorithm processes all lines in a single `useLayoutEffect`:

```typescript
lineRefs.current.forEach((lineRef, index) => {
  // Calculate scale for each line
  newScales[index] = calculateScale(lineRef);
});

// Single state update for all lines
setFontScales(newScales);
```

This prevents multiple re-renders.

## Edge Cases

### Empty Label

```typescript
if (!lineRef || !labelLines[index]) {
  newScales[index] = 1.0; // Default scale
  return;
}
```

### Missing Container

```typescript
const linesContainer = lineRef.parentElement;
if (!linesContainer) {
  newScales[index] = 1.0; // Fallback
  return;
}
```

### Zero Width Container

If container width is 0, scale defaults to 1.0 to prevent division by zero.

## Customization

### Adjust Scale Bounds

Modify constants in `FloppyDisk.tsx`:

```typescript
const FONT_SCALE_MIN = 0.4; // Minimum compression
const FONT_SCALE_MAX = 1.5; // Maximum expansion
```

### Adjust Padding

Modify the width ratio:

```typescript
const LABEL_WIDTH_RATIO = 0.88; // 88% usable, 12% padding
```

### Disable Scaling

Set both min and max to 1.0:

```typescript
const FONT_SCALE_MIN = 1.0;
const FONT_SCALE_MAX = 1.0;
```

## See Also

- [ADR-002: Font Scaling with scaleX Transform](../adr/font-scaling-transform)
- [Performance Guide](./performance.md)
- [Customization Guide](./customization.md)
