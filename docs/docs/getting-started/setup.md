---
sidebar_position: 3
---

# Setup Guide

Framework-specific setup instructions for Retro Floppy.

## CSS Import

Retro Floppy requires its CSS file to be imported. There are several ways to do this depending on your setup.

### Option 1: Import in Component

Import the CSS directly in your component file:

```tsx
import { FloppyDisk } from 'retro-floppy';
import 'retro-floppy/dist/retro-floppy.css';
```

### Option 2: Import in Entry File

Import once in your app's entry point (e.g., `main.tsx`, `index.tsx`, `App.tsx`):

```tsx
// main.tsx or index.tsx
import 'retro-floppy/dist/retro-floppy.css';
import App from './App';
```

### Option 3: Import in Global CSS

Add an import statement in your global CSS file:

```css
/* styles.css or global.css */
@import 'retro-floppy/dist/retro-floppy.css';
```

## Framework-Specific Setup

### Create React App (CRA)

No additional configuration needed. Just import the CSS:

```tsx
import { FloppyDisk } from 'retro-floppy';
import 'retro-floppy/dist/retro-floppy.css';
```

### Vite

Vite handles CSS imports automatically. Import in your component or `main.tsx`:

```tsx
import { FloppyDisk } from 'retro-floppy';
import 'retro-floppy/dist/retro-floppy.css';
```

### Next.js (App Router)

Import the CSS in your root layout:

```tsx
// app/layout.tsx
import 'retro-floppy/dist/retro-floppy.css';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

### Next.js (Pages Router)

Import the CSS in `_app.tsx`:

```tsx
// pages/_app.tsx
import 'retro-floppy/dist/retro-floppy.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

### Remix

Import the CSS in your root route:

```tsx
// app/root.tsx
import styles from 'retro-floppy/dist/retro-floppy.css';

export const links = () => [{ rel: 'stylesheet', href: styles }];
```

### Astro

Import in your layout or page:

```astro
---
import { FloppyDisk } from 'retro-floppy';
import 'retro-floppy/dist/retro-floppy.css';
---

<FloppyDisk size="medium" label={{ name: 'Astro' }} />
```

## TypeScript Configuration

Retro Floppy includes TypeScript definitions. Ensure your `tsconfig.json` has:

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true,
    "jsx": "react" // or "react-jsx" for React 17+
  }
}
```

## CSS Modules Conflict

If you're using CSS Modules and experiencing style conflicts, you can:

### Option 1: Import with Higher Specificity

```tsx
import 'retro-floppy/dist/retro-floppy.css';
```

The component uses CSS Modules internally, so styles are scoped.

### Option 2: Use CSS Layer (Modern Browsers)

```css
@layer retro-floppy {
  @import 'retro-floppy/dist/retro-floppy.css';
}
```

## Server-Side Rendering (SSR)

Retro Floppy works with SSR out of the box. The component doesn't use browser-only APIs during initial render.

### Next.js

No special configuration needed. The component is SSR-compatible.

### Remix

Works with Remix's SSR by default.

## Bundler Configuration

### Webpack

No additional configuration needed. Webpack handles CSS imports automatically.

### Rollup

If using Rollup, ensure you have a CSS plugin:

```bash
npm install rollup-plugin-postcss
```

```js
// rollup.config.js
import postcss from 'rollup-plugin-postcss';

export default {
  plugins: [postcss()],
};
```

### esbuild

esbuild handles CSS imports automatically.

## Next Steps

- **[Quick Start](/docs/getting-started/quick-start)** - Create your first component
- **[Basic Examples](/docs/examples/basic-usage)** - See common usage patterns
- **[API Reference](/docs/api/props)** - Complete props documentation
