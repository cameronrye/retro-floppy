# Floppy Disk Component - Usage Guide

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Component

```bash
npm run build
```

This will create the distributable files in the `dist/` folder.

### 3. Run the Example

```bash
cd example
npm install
npm run dev
```

Open your browser to `http://localhost:5173` to see the demo.

## Using in Your Project

### Option 1: Install from NPM (After Publishing)

```bash
npm install @floppy/disk-component
```

```tsx
import { FloppyDisk } from '@floppy/disk-component';

function MyApp() {
  return (
    <FloppyDisk
      size="small"
      labelLines={['My App', 'Version 1.0']}
    />
  );
}
```

### Option 2: Copy Component Files

If you want to customize the component heavily, copy these files to your project:

```
src/
├── FloppyDisk.tsx
├── FloppyDisk.module.css
├── types.ts
└── index.ts
```

Then import:

```tsx
import { FloppyDisk } from './components/FloppyDisk';
```

## Common Use Cases

### 1. Software Library Grid

Perfect for displaying a collection of applications or files:

```tsx
const apps = [
  { id: 1, name: 'Photoshop', author: 'Adobe' },
  { id: 2, name: 'Doom', author: 'id Software' },
];

<div className="grid">
  {apps.map(app => (
    <FloppyDisk
      key={app.id}
      size="small"
      labelLines={[app.name, app.author]}
      onClick={() => selectApp(app.id)}
    />
  ))}
</div>
```

### 2. File Manager

Use tiny variant for compact file lists:

```tsx
<div className="file-list">
  {files.map(file => (
    <div className="file-row">
      <FloppyDisk size="tiny" variant="compact" />
      <span>{file.name}</span>
    </div>
  ))}
</div>
```

### 3. Hero Section

Large, eye-catching disk for landing pages:

```tsx
<FloppyDisk
  size="hero"
  labelLines={[
    'Welcome to',
    'Retro Computing',
    '',
    'Experience the nostalgia'
  ]}
  variant="static"
/>
```

### 4. Interactive Demo

Full interactivity with all handlers:

```tsx
<FloppyDisk
  size="large"
  labelLines={['Click me!', 'Double-click to launch']}
  onClick={() => console.log('Selected')}
  onDoubleClick={() => console.log('Launched')}
  onFlip={() => console.log('Flipped')}
/>
```

## Customization Tips

### Custom Colors

```tsx
<FloppyDisk
  theme={{
    diskColor: '#1a1a1a',      // Dark gray disk
    slideColor: '#ffd700',      // Gold slide
    backgroundColor: '#f5f5f5', // Light background
    labelColor: '#ffffcc',      // Cream label
    labelTextColor: '#333',     // Dark text
  }}
/>
```

### Custom Size

```tsx
// Exact pixel size
<FloppyDisk size={175} />

// Responsive with CSS
<div style={{ width: '20vw' }}>
  <FloppyDisk size="medium" />
</div>
```

### Label Content

The label supports up to 5 lines. Use empty strings for spacing:

```tsx
<FloppyDisk
  labelLines={[
    'Second Reality',           // Line 1: Title
    'Future Crew (1993)',       // Line 2: Author/Date
    '',                         // Line 3: Blank for spacing
    'Legendary 1993 demo',      // Line 4: Description
    'by Future Crew'            // Line 5: More description
  ]}
/>
```

## Performance Optimization

### For Large Lists (100+ items)

1. **Use React.memo**:
```tsx
const MemoizedDisk = memo(FloppyDisk);
```

2. **Disable animations**:
```tsx
<FloppyDisk variant="static" />
```

3. **Use virtualization** (react-window):
```tsx
import { FixedSizeGrid } from 'react-window';

<FixedSizeGrid
  columnCount={5}
  rowCount={Math.ceil(disks.length / 5)}
  columnWidth={140}
  rowHeight={140}
>
  {({ columnIndex, rowIndex, style }) => (
    <div style={style}>
      <FloppyDisk {...disks[rowIndex * 5 + columnIndex]} />
    </div>
  )}
</FixedSizeGrid>
```

## Troubleshooting

### Fonts not loading

Make sure to include the Google Font in your HTML:

```html
<link href="https://fonts.googleapis.com/css2?family=Covered+By+Your+Grace&display=swap" rel="stylesheet">
```

### Animations not working

Check that `variant` is not set to `"static"`.

### Size not responsive

The component uses fixed pixel sizes. Wrap in a container with responsive width for fluid sizing.

## Next Steps

- Explore the example app for more patterns
- Check the API reference in README.md
- Customize the CSS module for your needs
- Share your creations!

---

Happy coding! 💾

