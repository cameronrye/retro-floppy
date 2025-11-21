---
sidebar_position: 3
---

# Performance

Tips for optimizing Retro Floppy performance.

## Memoization

The component is memoized with `React.memo` to prevent unnecessary re-renders.

## Large Lists

When rendering many disks, use virtualization:

```tsx
import { FixedSizeGrid } from 'react-window';

function VirtualizedGrid() {
  return (
    <FixedSizeGrid
      columnCount={4}
      columnWidth={150}
      height={600}
      rowCount={100}
      rowHeight={150}
      width={800}
    >
      {({ columnIndex, rowIndex, style }) => (
        <div style={style}>
          <FloppyDisk size="small" />
        </div>
      )}
    </FixedSizeGrid>
  );
}
```

## Bundle Size

Retro Floppy is optimized for small bundle size:

- Tree-shakeable ES modules
- No external dependencies
- CSS Modules for scoped styles

## Animation Performance

Animations use CSS transforms for optimal performance.

Disable animations if needed:

```tsx
<FloppyDisk animation={{ disableAnimations: true }} />
```
