# 💾 Floppy Disk Component

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
npm install @floppy/disk-component
# or
yarn add @floppy/disk-component
# or
pnpm add @floppy/disk-component
```

## 🚀 Quick Start

```tsx
import { FloppyDisk } from '@floppy/disk-component';
import '@floppy/disk-component/dist/floppydisk.css';

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
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '20px' }}>
      {applications.map(app => (
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
  {files.map(file => (
    <div key={file.id} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
      <FloppyDisk
        size="tiny"
        variant="compact"
        label={{ name: file.name }}
      />
      <span>{file.name}</span>
      <span>{file.size}</span>
    </div>
  ))}
</div>
```

## 🌓 Light & Dark Themes

The disk respects theme colors, so it can sit comfortably in both light and dark UIs.
Use the built-in presets or provide your own `theme`.

```tsx
import { FloppyDisk, LIGHT_FLOPPY_THEME, DARK_FLOPPY_THEME } from 'floppydisk';

function ThemedExample({ isDark }: { isDark: boolean }) {
  return (
    <FloppyDisk
      size="medium"
      label={{ name: isDark ? 'Dark Mode' : 'Light Mode' }}
      theme={isDark ? DARK_FLOPPY_THEME : LIGHT_FLOPPY_THEME}
    />
  );
}
```

- `LIGHT_FLOPPY_THEME` – tuned for light backgrounds (default)
- `DARK_FLOPPY_THEME` – tuned for dark backgrounds

You can still override any color via the `theme` prop.

## 🎛️ API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'tiny' \| 'small' \| 'medium' \| 'large' \| 'hero' \| number` | `'medium'` | Size of the disk. Predefined or custom px value |
| `label` | `FloppyLabel` | `undefined` | Structured label data for the disk (name, author, year, description, type, size) |
| `diskType` | `'HD' \| 'DD'` | `'HD'` | High Density or Double Density |
| `capacity` | `string` | `'1.44 MB'` | Storage capacity display (overrides `label.size` if provided) |
| `theme` | `FloppyTheme` | Default theme | Color customization object |
| `variant` | `'interactive' \| 'static' \| 'compact'` | `'interactive'` | Interaction mode |
| `selected` | `boolean` | `false` | Whether the disk is selected |
| `disabled` | `boolean` | `false` | Whether the disk is disabled |
| `onClick` | `() => void` | - | Click handler |
| `onDoubleClick` | `() => void` | - | Double-click handler |
| `className` | `string` | `''` | Additional CSS class |
| `ariaLabel` | `string` | Auto-generated | Accessible label override |

### Size Variants

| Size | Pixels | Use Case |
|------|--------|----------|
| `tiny` | 60px | Compact lists, icons |
| `small` | 120px | Grid views, thumbnails |
| `medium` | 200px | Featured items, cards |
| `large` | 400px | Detail views, showcases |
| `hero` | 600px | Landing pages, heroes |
| Custom | Any number | Specific requirements |

### Theme Object

```typescript
interface FloppyTheme {
  diskColor?: string;        // Main disk body color
  slideColor?: string;       // Metal slide color
  backgroundColor?: string;  // Background/cutout color
  labelColor?: string;       // Label paper color
  labelTextColor?: string;   // Label text color
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

## 🎯 Best Practices

### Performance with Multiple Disks

When rendering many disks (50+), consider:

```tsx
import { memo } from 'react';

const MemoizedFloppyDisk = memo(FloppyDisk);

// Use in your list
{disks.map(disk => (
  <MemoizedFloppyDisk key={disk.id} {...disk} />
))}
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
- `dist/floppydisk.css` - Extracted CSS styles for the component (import this in your app)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development instructions and guidelines and [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) for expected behavior.

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](./LICENSE) file for details.

## 🙏 Credits

Inspired by the iconic 3.5" floppy disk that stored our precious data in the 80s and 90s.

---

Made with 💾 and nostalgia
