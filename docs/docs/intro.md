---
sidebar_position: 1
---

# Welcome to Retro Floppy

A beautiful, interactive 3.5" floppy disk React component for retro-themed UIs. Perfect for file managers, software libraries, game launchers, and nostalgic interfaces.

## What is Retro Floppy?

Retro Floppy is a highly customizable React component that renders a realistic, interactive 3.5" floppy disk. It's designed to bring a touch of nostalgia to modern web applications while maintaining excellent performance and accessibility.

## Key Features

- **Highly Customizable** - 5 built-in themes plus full custom theme support
- **Interactive** - Hover animations, click handlers, and keyboard navigation
- **Flexible Sizing** - From tiny (60px) to hero (600px) or custom pixel values
- **Performant** - Optimized for rendering multiple instances in lists/grids
- **Accessible** - ARIA labels and keyboard navigation support
- **TypeScript** - Full type definitions included
- **Zero Dependencies** - Only requires React as a peer dependency

## Quick Example

```tsx
import { FloppyDisk } from 'retro-floppy';
import 'retro-floppy/dist/retro-floppy.css';

function App() {
  return (
    <FloppyDisk
      size="medium"
      label={{
        name: 'My App',
        author: 'Developer',
        year: '2024',
      }}
      onClick={() => console.log('Disk clicked!')}
    />
  );
}
```

## What's Next?

- **[Installation](/docs/getting-started/installation)** - Get started with Retro Floppy
- **[Quick Start](/docs/getting-started/quick-start)** - Your first component in 2 minutes
- **[Examples](/docs/examples/basic-usage)** - See interactive examples
- **[API Reference](/docs/api/props)** - Complete API documentation
- **[Playground](/playground)** - Try it out interactively

## Use Cases

Retro Floppy is perfect for:

- **Retro-themed applications** - Add authentic 90s nostalgia
- **File managers** - Visual representation of files and folders
- **Software libraries** - Display downloadable content
- **Game launchers** - Showcase game collections
- **Portfolio sites** - Creative way to present projects
- **Educational tools** - Teach about computing history

## Browser Support

Retro Floppy works in all modern browsers:

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- React 16.8+ (hooks support required)

## Community

- **[GitHub](https://github.com/cameronrye/retro-floppy)** - Source code and issues
- **[npm](https://www.npmjs.com/package/retro-floppy)** - Package registry
- **[Contributing](/docs/contributing)** - Help improve Retro Floppy
