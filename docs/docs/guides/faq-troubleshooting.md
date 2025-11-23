---
sidebar_position: 10
---

# FAQ & Troubleshooting

Common questions and solutions for the Retro Floppy component.

## Frequently Asked Questions

### General Questions

#### Q: What React versions are supported?

**A:** Retro Floppy supports React 16.8+ (any version with Hooks support). It has been tested with:

- React 16.8 - 18.x
- React 19.x (latest)

#### Q: Can I use this with Next.js?

**A:** Yes! Retro Floppy works with Next.js. For server-side rendering (SSR), the component is fully compatible:

```tsx
import { FloppyDisk } from 'retro-floppy';

export default function Page() {
  return <FloppyDisk label={{ name: 'My Disk' }} />;
}
```

#### Q: Does this work with TypeScript?

**A:** Yes! Retro Floppy is written in TypeScript and includes full type definitions. You get complete IntelliSense and type checking out of the box.

#### Q: What's the bundle size?

**A:** The minified bundle is approximately:

- **Component**: ~15KB (minified)
- **CSS**: ~3KB (minified)
- **Total**: ~18KB (minified)
- **Gzipped**: ~6KB

Tree-shaking is supported, so you only bundle what you use.

#### Q: Is this accessible?

**A:** Yes! The component follows WCAG 2.1 AA guidelines:

- Semantic HTML (`<figure>`, `<figcaption>`)
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast text (7:1+ ratio with gradients)
- Focus indicators

See the [Accessibility Guide](./accessibility.md) for details.

### Styling Questions

#### Q: How do I customize colors?

**A:** Use the `theme` prop to customize colors:

```tsx
<FloppyDisk
  theme={{
    diskColor: '#2a2a2a',
    labelColor: '#ffffff',
    shutterColor: '#1a1a1a',
    enableGradient: true,
  }}
/>
```

See the [Themes Example](../examples/themes.mdx) for more options.

#### Q: Can I override the CSS?

**A:** Yes! You can override styles in three ways:

1. **CSS Variables** (recommended):

```tsx
<FloppyDisk
  style={
    {
      '--floppy-disk-color': '#ff0000',
    } as React.CSSProperties
  }
/>
```

2. **className prop**:

```tsx
<FloppyDisk className="my-custom-disk" />
```

3. **style prop**:

```tsx
<FloppyDisk style={{ transform: 'rotate(5deg)' }} />
```

See the [Styling Guide](./styling.md) for details.

#### Q: How do I disable gradients?

**A:** Set `enableGradient: false` in the theme:

```tsx
<FloppyDisk theme={{ enableGradient: false }} label={{ name: 'My Disk' }} />
```

### Label Questions

#### Q: Why is my long text getting compressed?

**A:** The component automatically scales text to fit within the label area. Text is compressed horizontally (scaleX) between 40% and 150% to maintain readability.

**Solutions:**

- Use shorter text
- Increase disk size
- The compression is intentional and maintains readability

See the [Font Scaling Algorithm](./font-scaling-algorithm.md) for details.

#### Q: Can I use multi-line labels?

**A:** Yes! Use the `lines` array in the label prop:

```tsx
<FloppyDisk
  label={{
    name: 'My Project',
    lines: ['Line 1', 'Line 2', 'Line 3'],
  }}
/>
```

The first line is the name field (auto-scaled), subsequent lines display at natural size.

#### Q: How do I add an author/date?

**A:** Use the `author` and `date` properties:

```tsx
<FloppyDisk
  label={{
    name: 'My Disk',
    author: 'John Doe',
    date: '2024-01-15',
  }}
/>
```

### Gradient Questions

#### Q: Why does my gradient look different each time?

**A:** Gradients are deterministic based on the label name. If the gradient changes, the label name likely changed.

**Same label name = same gradient:**

```tsx
<FloppyDisk label={{ name: 'Test' }} /> {/* Always same gradient */}
```

**To get a different gradient:**

```tsx
<FloppyDisk
  label={{ name: 'Test' }}
  gradientOptions={{ seed: 42 }} {/* Custom seed */}
/>
```

See [Deterministic Gradients ADR](../adr/deterministic-gradients).

#### Q: Can I use custom gradient colors?

**A:** Yes! Provide custom colors in `gradientOptions`:

```tsx
<FloppyDisk
  label={{ name: 'My Disk' }}
  gradientOptions={{
    colors: ['#ff6b6b', '#4ecdc4', '#45b7d1'],
  }}
/>
```

See the [Gradients Example](../examples/gradients.mdx).

## Troubleshooting

### Text is cut off or overflowing

**Symptoms:** Label text extends beyond the label area.

**Causes:**

1. Very long text exceeds compression limits
2. Custom CSS overriding transforms
3. Container width is too small

**Solutions:**

1. **Shorten the text**: Keep labels concise
2. **Increase disk size**: Use a larger size preset or custom size
3. **Check for CSS conflicts**: Ensure no custom CSS is overriding transforms

```tsx
// Use larger size
<FloppyDisk size="large" label={{ name: 'Very Long Label Name' }} />

// Or custom size
<FloppyDisk size={400} label={{ name: 'Very Long Label Name' }} />
```

### Gradient colors are too similar/boring

**Symptoms:** Gradient looks monochromatic or lacks visual interest.

**Causes:**

1. Label name produces low-variance seed
2. Random color generation produced similar hues

**Solutions:**

1. **Use custom seed**: Try different seeds until you find one you like

```tsx
<FloppyDisk label={{ name: 'My Disk' }} gradientOptions={{ seed: 12345 }} />
```

2. **Use custom colors**: Specify exact colors you want

```tsx
<FloppyDisk
  label={{ name: 'My Disk' }}
  gradientOptions={{
    colors: ['#ff6b6b', '#4ecdc4', '#45b7d1'],
  }}
/>
```

3. **Change label name**: Different names produce different gradients

```tsx
<FloppyDisk label={{ name: 'My Disk v2' }} /> {/* Different gradient */}
```

### Component not rendering

**Symptoms:** Nothing appears on the page.

**Causes:**

1. Missing CSS import
2. Container has zero width/height
3. React version incompatibility

**Solutions:**

1. **Import CSS**: Ensure you've imported the CSS file

```tsx
import 'retro-floppy/dist/retro-floppy.css';
```

2. **Check container**: Ensure parent has dimensions

```tsx
<div style={{ width: '300px', height: '300px' }}>
  <FloppyDisk label={{ name: 'Test' }} />
</div>
```

3. **Check React version**: Ensure React 16.8+ is installed

```bash
npm list react
```

### TypeScript errors

**Symptoms:** Type errors when using the component.

**Causes:**

1. Missing type definitions
2. Incorrect prop types
3. TypeScript version incompatibility

**Solutions:**

1. **Check types are installed**: Type definitions are included in the package

```bash
npm list retro-floppy
```

2. **Use correct prop types**: Check IntelliSense or [API docs](../api/props.md)

```tsx
import { FloppyDiskProps } from 'retro-floppy';

const props: FloppyDiskProps = {
  label: { name: 'My Disk' },
  size: 'medium',
};
```

3. **Update TypeScript**: Ensure TypeScript 4.0+ is installed

```bash
npm install -D typescript@latest
```

### Performance issues

**Symptoms:** Slow rendering, laggy animations, high CPU usage.

**Causes:**

1. Rendering too many disks at once
2. Frequent re-renders
3. Large disk sizes

**Solutions:**

1. **Use React.memo**: Prevent unnecessary re-renders

```tsx
import { memo } from 'react';

const MemoizedDisk = memo(FloppyDisk);
```

2. **Virtualize lists**: Use react-window for large lists

```tsx
import { FixedSizeGrid } from 'react-window';

<FixedSizeGrid
  columnCount={5}
  rowCount={20}
  // ... render FloppyDisk in cells
/>;
```

3. **Optimize disk size**: Use smaller sizes for galleries

```tsx
<FloppyDisk size="small" /> {/* Faster than 'hero' */}
```

See the [Performance Guide](./performance.md) for details.

### Console warnings

#### "Invalid color format"

**Warning:** `FloppyDisk: Invalid color format: 'red'. Expected hex format...`

**Cause:** Non-hex color provided to theme.

**Solution:** Use hex colors only:

```tsx
// ❌ Wrong
<FloppyDisk theme={{ diskColor: 'red' }} />

// ✅ Correct
<FloppyDisk theme={{ diskColor: '#ff0000' }} />
```

#### "Size outside recommended range"

**Warning:** `FloppyDisk: size 5000px is outside recommended range (10-1000px)...`

**Cause:** Custom size is too small or too large.

**Solution:** Use recommended range or predefined sizes:

```tsx
// ❌ Too large
<FloppyDisk size={5000} />

// ✅ Use predefined size
<FloppyDisk size="hero" />

// ✅ Or reasonable custom size
<FloppyDisk size={500} />
```

## Still Having Issues?

If you're still experiencing problems:

1. **Check the examples**: Browse the [Examples](../examples/basic-usage.mdx) section
2. **Read the guides**: Check the [Guides](./customization.md) section
3. **Search issues**: Look for similar issues on [GitHub](https://github.com/cameronrye/floppydisk/issues)
4. **Ask for help**: Open a new issue with:
   - Minimal reproduction code
   - Expected vs actual behavior
   - Environment details (React version, browser, etc.)

## See Also

- [Error Handling Guide](./error-handling.md)
- [Performance Guide](./performance.md)
- [Customization Guide](./customization.md)
- [API Reference](../api/props.md)
