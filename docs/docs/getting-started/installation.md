---
sidebar_position: 1
---

# Installation

Get started with Retro Floppy in your React project.

## Prerequisites

Before installing Retro Floppy, make sure you have:

- **Node.js** 16.0 or higher
- **React** 16.8 or higher (hooks support required)
- **npm**, **yarn**, or **pnpm** package manager

## Install via npm

```bash
npm install retro-floppy
```

## Install via yarn

```bash
yarn add retro-floppy
```

## Install via pnpm

```bash
pnpm add retro-floppy
```

## Peer Dependencies

Retro Floppy requires React and React DOM as peer dependencies. If you don't have them installed:

```bash
npm install react react-dom
```

The component supports React versions:

- React 16.8+ (hooks support)
- React 17.x
- React 18.x
- React 19.x

## Verify Installation

After installation, verify that the package is installed correctly:

```bash
npm list retro-floppy
```

You should see output similar to:

```
your-project@1.0.0
└── retro-floppy@1.0.0
```

## TypeScript Support

Retro Floppy includes TypeScript definitions out of the box. No additional `@types` packages are needed.

If you're using TypeScript, the types will be automatically available:

```tsx
import { FloppyDisk, FloppyDiskProps } from 'retro-floppy';
```

## Bundle Size

Retro Floppy is lightweight and optimized for production:

- **ESM Bundle**: < 15 KB (minified + gzipped)
- **CJS Bundle**: < 15 KB (minified + gzipped)
- **CSS**: < 5 KB (minified + gzipped)

Check the latest bundle size on [Bundlephobia](https://bundlephobia.com/package/retro-floppy).

## Next Steps

Now that you have Retro Floppy installed, you're ready to:

- **[Quick Start](/docs/getting-started/quick-start)** - Create your first floppy disk component
- **[Setup Guide](/docs/getting-started/setup)** - Configure CSS imports and TypeScript
- **[Basic Examples](/docs/examples/basic-usage)** - See common usage patterns

## Troubleshooting

### Module not found

If you see an error like `Module not found: Can't resolve 'retro-floppy'`:

1. Make sure the package is installed: `npm list retro-floppy`
2. Try deleting `node_modules` and reinstalling: `rm -rf node_modules && npm install`
3. Clear your bundler cache (for Vite: `rm -rf node_modules/.vite`)

### CSS not loading

If the styles aren't applied:

1. Make sure you've imported the CSS file: `import 'retro-floppy/dist/retro-floppy.css'`
2. Check that your bundler supports CSS imports
3. See the [Setup Guide](/docs/getting-started/setup) for framework-specific instructions

### TypeScript errors

If you're getting TypeScript errors:

1. Make sure you're using TypeScript 4.0 or higher
2. Check that `moduleResolution` is set to `"node"` in your `tsconfig.json`
3. Try restarting your TypeScript server

## Getting Help

If you encounter any issues:

- Check the [GitHub Issues](https://github.com/cameronrye/retro-floppy/issues)
- Read the [API Documentation](/docs/api/props)
- Review the [Examples](/docs/examples/basic-usage)
