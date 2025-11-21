# 💾 Retro Floppy

[![npm version](https://img.shields.io/npm/v/retro-floppy.svg?style=flat-square)](https://www.npmjs.com/package/retro-floppy)
[![npm downloads](https://img.shields.io/npm/dm/retro-floppy.svg?style=flat-square)](https://www.npmjs.com/package/retro-floppy)
[![bundle size](https://img.shields.io/bundlephobia/minzip/retro-floppy?style=flat-square)](https://bundlephobia.com/package/retro-floppy)
[![license](https://img.shields.io/npm/l/retro-floppy.svg?style=flat-square)](https://github.com/cameronrye/floppydisk/blob/main/LICENSE)
[![CI](https://img.shields.io/github/actions/workflow/status/cameronrye/floppydisk/ci.yml?branch=main&style=flat-square)](https://github.com/cameronrye/floppydisk/actions)

A beautiful, interactive 3.5" floppy disk React component for retro-themed UIs. Perfect for file managers, software libraries, game launchers, and nostalgic interfaces.

![Floppy Disk Component](https://via.placeholder.com/800x400?text=Floppy+Disk+Component+Demo)

## ✨ Features

- 🎨 **Highly Customizable** - Size variants, color themes, and structured label content
- 🖱️ **Interactive** - Hover animations plus click and double-click handlers
- 📦 **Flexible Sizing** - From tiny (60px) to hero (600px) or custom pixel values
- ⚡ **Performant** - Optimized for rendering multiple instances in lists/grids
- ♿ **Accessible** - ARIA labels and keyboard navigation support
- 🎯 **TypeScript** - Full type definitions included
- 🔧 **Zero Dependencies** - Only requires React

## 📦 Installation

```bash
npm install retro-floppy
# or
yarn add retro-floppy
# or
pnpm add retro-floppy
```

## 🚀 Quick Start

```tsx
import { FloppyDisk } from 'retro-floppy';
import 'retro-floppy/dist/retro-floppy.css';

function App() {
  return (
    <FloppyDisk
      size="medium"
      label={{
        name: 'Second Reality',
        author: 'Future Crew',
        year: '1993',
        description: 'Legendary 1993 demo by Future Crew',
        type: 'ZIP',
        size: '1.44 MB',
      }}
      onClick={() => console.log('Disk clicked!')}
    />
  );
}
```

## 📖 Usage Examples

### Basic Usage

```tsx
<FloppyDisk
  size="small"
  label={{
    name: 'My Application',
    author: 'Version 1.0',
  }}
  diskType="HD"
  capacity="1.44 MB"
/>
```

### Software Library Grid

```tsx
const applications = [
  { id: 1, name: 'Photoshop 3.0', author: 'Adobe Systems' },
  { id: 2, name: 'Doom', author: 'id Software' },
  { id: 3, name: 'Windows 95', author: 'Microsoft' },
];

function SoftwareLibrary() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: '20px',
      }}
    >
      {applications.map((app) => (
        <FloppyDisk
          key={app.id}
          size="small"
          label={{
            name: app.name,
            author: app.author,
          }}
          selected={selected === app.id}
          onClick={() => setSelected(app.id)}
          onDoubleClick={() => alert(`Launching ${app.name}`)}
        />
      ))}
    </div>
  );
}
```

### Custom Theme

```tsx
<FloppyDisk
  size="large"
  label={{
    name: 'Custom Theme',
  }}
  theme={{
    diskColor: '#1a1a1a',
    slideColor: '#ffd700',
    backgroundColor: '#f0f0f0',
    labelColor: '#ffffcc',
    labelTextColor: '#333333',
  }}
/>
```

### List View with Compact Variant

```tsx
<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
  {files.map((file) => (
    <div
      key={file.id}
      style={{ display: 'flex', alignItems: 'center', gap: '15px' }}
    >
      <FloppyDisk size="tiny" variant="compact" label={{ name: file.name }} />
      <span>{file.name}</span>
      <span>{file.size}</span>
    </div>
  ))}
</div>
```

## 🎨 Theming

The disk uses a default theme that works well in both light and dark UIs.
You can customize colors via the `theme` prop to match your design.

## 🎨 Theme Showcase

The component includes several built-in theme presets for different aesthetics:

### Light Theme (Default)

Classic floppy disk appearance optimized for light backgrounds.

```tsx
import { FloppyDisk, LIGHT_FLOPPY_THEME } from 'retro-floppy';

<FloppyDisk
  label={{ name: 'My App', author: 'Developer' }}
  theme={LIGHT_FLOPPY_THEME}
/>;
```

### Dark Theme

Sleek dark appearance optimized for dark backgrounds.

```tsx
import { FloppyDisk, DARK_FLOPPY_THEME } from 'retro-floppy';

<FloppyDisk
  label={{ name: 'My App', author: 'Developer' }}
  theme={DARK_FLOPPY_THEME}
/>;
```

### Neon Theme

Vibrant cyberpunk aesthetic with magenta and cyan accents.

```tsx
import { FloppyDisk, NEON_THEME } from 'retro-floppy';

<FloppyDisk
  label={{ name: 'My App', author: 'Developer' }}
  theme={NEON_THEME}
/>;
```

### Retro Theme

Classic 90s beige computer aesthetic with warm, vintage colors.

```tsx
import { FloppyDisk, RETRO_THEME } from 'retro-floppy';

<FloppyDisk
  label={{ name: 'My App', author: 'Developer' }}
  theme={RETRO_THEME}
/>;
```

### Pastel Theme

Soft, modern colors with gradient labels.

```tsx
import { FloppyDisk, PASTEL_THEME } from 'retro-floppy';

<FloppyDisk
  label={{ name: 'My App', author: 'Developer' }}
  theme={PASTEL_THEME}
/>;
```

### Custom Themes

Create your own theme by providing a custom theme object:

```tsx
<FloppyDisk
  label={{ name: 'Custom', author: 'Me' }}
  theme={{
    diskColor: '#ff6b6b',
    slideColor: '#4ecdc4',
    backgroundColor: '#ffe66d',
    labelColor: '#ffffff',
    labelTextColor: '#2c3e50',
    enableGradient: false,
  }}
/>
```

### Gradient Customization

When using gradients, you can customize the generation:

```tsx
<FloppyDisk
  label={{ name: 'Gradient Demo', author: 'Dev' }}
  theme={{
    enableGradient: true,
    gradientType: 'linear', // 'linear', 'radial', 'conic', or 'auto'
    gradientOptions: {
      seed: 12345, // Custom seed for reproducible gradients
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1'], // Custom color palette
      angle: 135, // Angle for linear gradients (0-360)
    },
  }}
/>
```

## 🎛️ API Reference

### Props

| Prop            | Type                                                           | Default         | Description                                                                      |
| --------------- | -------------------------------------------------------------- | --------------- | -------------------------------------------------------------------------------- |
| `size`          | `'tiny' \| 'small' \| 'medium' \| 'large' \| 'hero' \| number` | `'medium'`      | Size of the disk. Predefined or custom px value                                  |
| `label`         | `FloppyLabel`                                                  | `undefined`     | Structured label data for the disk (name, author, year, description, type, size) |
| `diskType`      | `'HD' \| 'DD'`                                                 | `'HD'`          | High Density or Double Density                                                   |
| `capacity`      | `string`                                                       | `'1.44 MB'`     | Storage capacity display (overrides `label.size` if provided)                    |
| `theme`         | `FloppyTheme`                                                  | Default theme   | Color customization object                                                       |
| `animation`     | `AnimationConfig`                                              | `{}`            | Animation timing and easing configuration                                        |
| `variant`       | `'interactive' \| 'static' \| 'compact'`                       | `'interactive'` | Interaction mode                                                                 |
| `selected`      | `boolean`                                                      | `false`         | Whether the disk is selected                                                     |
| `disabled`      | `boolean`                                                      | `false`         | Whether the disk is disabled                                                     |
| `loading`       | `boolean`                                                      | `false`         | Shows subtle pulse animation                                                     |
| `error`         | `boolean`                                                      | `false`         | Shows red label with white text                                                  |
| `onClick`       | `() => void`                                                   | -               | Click handler                                                                    |
| `onDoubleClick` | `() => void`                                                   | -               | Double-click handler                                                             |
| `onHover`       | `(isHovered: boolean) => void`                                 | -               | Hover state change handler                                                       |
| `onFocus`       | `(isFocused: boolean) => void`                                 | -               | Focus state change handler                                                       |
| `className`     | `string`                                                       | `''`            | Additional CSS class                                                             |
| `style`         | `React.CSSProperties`                                          | -               | Inline styles for root element                                                   |
| `data-testid`   | `string`                                                       | -               | Test ID for testing libraries                                                    |
| `data-disk-id`  | `string`                                                       | -               | Custom disk ID for tracking                                                      |
| `badge`         | `React.ReactNode`                                              | -               | Badge content (top-right corner)                                                 |
| `children`      | `React.ReactNode`                                              | -               | Custom overlay content                                                           |
| `ariaLabel`     | `string`                                                       | Auto-generated  | Accessible label override                                                        |

### Size Variants

| Size     | Pixels     | Use Case                |
| -------- | ---------- | ----------------------- |
| `tiny`   | 60px       | Compact lists, icons    |
| `small`  | 120px      | Grid views, thumbnails  |
| `medium` | 200px      | Featured items, cards   |
| `large`  | 400px      | Detail views, showcases |
| `hero`   | 600px      | Landing pages, heroes   |
| Custom   | Any number | Specific requirements   |

### Theme Object

```typescript
interface FloppyTheme {
  diskColor?: string; // Main disk body color
  slideColor?: string; // Metal slide color
  backgroundColor?: string; // Background/cutout color
  labelColor?: string; // Label paper color
  labelTextColor?: string; // Label text color
  enableGradient?: boolean; // Enable dynamic gradient backgrounds (default: false)
  gradientType?: 'linear' | 'radial' | 'conic' | 'auto'; // Gradient type (default: 'auto')
  gradientOptions?: GradientOptions; // Custom gradient options
}

interface GradientOptions {
  seed?: number; // Custom seed for gradient generation
  colors?: string[]; // Custom color palette (HSL or hex colors)
  angle?: number; // Gradient angle for linear gradients (0-360 degrees)
}
```

### Animation Config

```typescript
interface AnimationConfig {
  hoverDuration?: number; // Hover animation duration in ms (default: 500)
  slideDuration?: number; // Slide animation duration in ms (default: 500)
  easing?: string; // Animation easing function (default: 'linear')
  disableAnimations?: boolean; // Disable all animations (default: false)
}
```

## 🎨 Variants

### Interactive (Default)

- Hover to slide out the metal shutter
- Click to trigger the `onClick` handler
- Double-click to trigger the `onDoubleClick` handler

### Static

- No hover animations
- Click handlers still work
- Best for performance-critical lists

### Compact

- Reduced label area
- Smaller slide track
- Optimized for tight spaces

## 🎨 Advanced Features

### Loading and Error States

```tsx
// Loading state with pulse animation
<FloppyDisk loading label={{ name: "Uploading..." }} />

// Error state with red label and white text
<FloppyDisk error label={{ name: "Failed" }} />
```

### Badge and Overlays

```tsx
// Simple badge
<FloppyDisk
  label={{ name: "New Release" }}
  badge={<span style={{ background: 'red', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>NEW</span>}
/>

// Custom overlay
<FloppyDisk label={{ name: "Locked" }}>
  <div style={{ fontSize: '48px' }}>🔒</div>
</FloppyDisk>
```

### Event Callbacks

```tsx
<FloppyDisk
  label={{ name: 'Interactive' }}
  onHover={(isHovered) => console.log('Hover:', isHovered)}
  onFocus={(isFocused) => console.log('Focus:', isFocused)}
  onClick={() => console.log('Clicked')}
  onDoubleClick={() => console.log('Double-clicked')}
/>
```

### Animation Customization

```tsx
// Custom animation timing
<FloppyDisk
  animation={{
    hoverDuration: 1000,
    easing: 'ease-in-out'
  }}
/>

// Disable animations
<FloppyDisk animation={{ disableAnimations: true }} />
```

### CSS Customization

```tsx
// Using inline styles
<FloppyDisk
  style={
    {
      '--floppy-border-radius': '10%',
      '--floppy-hover-scale': '1.1',
      '--floppy-shadow-blur': '10px',
    } as React.CSSProperties
  }
/>;

// Using CSS module classes
import { floppyDiskStyles } from 'retro-floppy';

// Access individual classes for advanced styling
<div className={floppyDiskStyles.silhouette}>...</div>;
```

### Available CSS Custom Properties

You can customize the appearance using CSS custom properties:

```css
--floppy-size              /* Disk size in px */
--floppy-border            /* Border thickness */
--floppy-border-radius     /* Corner radius (default: 3%) */
--floppy-color             /* Main disk color */
--floppy-highlight         /* Highlight color */
--floppy-shadow            /* Shadow color */
--floppy-hover-scale       /* Hover scale factor (default: 1.02) */
--floppy-hover-brightness  /* Hover brightness (default: 1.05) */
--animation-duration       /* Animation duration (default: 500ms) */
--animation-easing         /* Animation easing (default: linear) */
--slide-color              /* Metal slide color */
--bg-color                 /* Background color */
--label-color              /* Label background */
--label-text-color         /* Label text color */
--label-text-shadow        /* Label text shadow */
```

## 🎯 Best Practices

### Performance with Multiple Disks

When rendering many disks (50+), consider:

```tsx
import { memo } from 'react';

const MemoizedFloppyDisk = memo(FloppyDisk);

// Use in your list
{
  disks.map((disk) => <MemoizedFloppyDisk key={disk.id} {...disk} />);
}
```

### Responsive Sizing

```tsx
// Use CSS custom properties for responsive sizing
<div style={{ '--floppy-size': 'clamp(80px, 15vw, 200px)' }}>
  <FloppyDisk size={120} />
</div>
```

### Accessibility

```tsx
<FloppyDisk
  label={{ name: 'Important Document' }}
  ariaLabel="Important Document floppy disk, double-click to open"
  onClick={handleSelect}
  onDoubleClick={handleOpen}
/>
```

- The entire floppy is a focusable `figure` with `role="button"`.
- `ariaLabel` controls the screen reader label; if omitted, it falls back to the `label` text.
- Keyboard users can press **Enter** or **Space** to trigger `onClick` when `variant !== 'static'` and `disabled` is `false`.
- A visible focus outline appears when navigating with the keyboard.

## 🛠️ Development

### Running the Example

```bash
# Install dependencies
npm install

# Build the component
npm run build

# Run the example
cd example
npm install
npm run dev
```

### Building for Production

```bash
npm run build
```

This creates:

- `dist/index.cjs` - CommonJS bundle
- `dist/index.esm.js` - ES Module bundle
- `dist/index.d.ts` - TypeScript definitions
- `dist/retro-floppy.css` - Extracted CSS styles for the component (import this in your app)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development instructions and guidelines and [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) for expected behavior.

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](./LICENSE) file for details.

## 🙏 Credits

Inspired by the iconic 3.5" floppy disk that stored our precious data in the 80s and 90s.

---

Made with 💾 and nostalgia
