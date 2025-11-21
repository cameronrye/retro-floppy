# Floppy Disk Component - Project Structure

## 📁 Directory Layout

```
floppy/
├── src/                          # Component source code
│   ├── FloppyDisk.tsx           # Main React component
│   ├── FloppyDisk.module.css    # Component styles (CSS Modules)
│   ├── types.ts                 # TypeScript type definitions
│   └── index.ts                 # Public exports
│
├── example/                      # Demo application
│   ├── App.tsx                  # Demo app component
│   ├── App.css                  # Demo app styles
│   ├── main.tsx                 # Demo entry point
│   ├── index.html               # Demo HTML template
│   ├── vite.config.ts           # Vite configuration
│   ├── tsconfig.json            # TypeScript config for demo
│   ├── tsconfig.node.json       # TypeScript config for Vite
│   └── package.json             # Demo dependencies
│
├── dist/                         # Build output (generated)
│   ├── index.cjs                # CommonJS bundle
│   ├── index.esm.js             # ES Module bundle
│   ├── index.d.ts               # TypeScript definitions
│   ├── retro-floppy.css         # Extracted component styles
│   └── *.map                    # Source maps
│
├── package.json                  # Package configuration
├── tsconfig.json                 # TypeScript configuration
├── rollup.config.js              # Build configuration
├── .gitignore                    # Git ignore rules
├── .npmignore                    # NPM ignore rules
├── README.md                     # Main documentation
├── USAGE_GUIDE.md               # Detailed usage guide
└── PROJECT_STRUCTURE.md         # This file
```

## 🔧 Key Files Explained

### Component Files

**`src/FloppyDisk.tsx`**

- Main React component implementation
- Handles props, state, and rendering
- Includes color manipulation utilities
- ~140 lines

**`src/FloppyDisk.module.css`**

- CSS Module with scoped styles
- Uses CSS custom properties for dynamic sizing
- Responsive and flexible
- ~310 lines

**`src/types.ts`**

- TypeScript interfaces and types
- Size variants, theme definitions
- Default values and constants
- ~70 lines

**`src/index.ts`**

- Public API exports
- Re-exports component and types
- Entry point for consumers

### Configuration Files

**`package.json`**

- Package metadata
- Dependencies and peer dependencies
- Build scripts
- NPM publishing configuration

**`tsconfig.json`**

- TypeScript compiler options
- Strict mode enabled
- ES2015 target for broad compatibility

**`rollup.config.js`**

- Bundler configuration
- Creates both CJS and ESM outputs
- Handles TypeScript and CSS Modules
- Generates type definitions

### Example Application

**`example/App.tsx`**

- Comprehensive demo application
- Shows all size variants
- Grid and list view examples
- Interactive features demonstration

**`example/App.css`**

- Demo styling
- Responsive layout
- Grid and list view styles

## 🚀 Build Process

### Development Workflow

1. **Edit component**: Modify files in `src/`
2. **Build**: Run `npm run build`
3. **Test**: Run example with `cd example && npm run dev`
4. **Iterate**: Repeat as needed

### Build Output

The build process creates:

```
dist/
├── index.js          # CommonJS (require)
├── index.esm.js      # ES Modules (import)
├── index.d.ts        # TypeScript types
└── *.map             # Source maps for debugging
```

### What Gets Published

When you run `npm publish`, only these are included:

- `dist/` folder (built files)
- `README.md`
- `package.json`
- `LICENSE` (if present)

Excluded via `.npmignore`:

- `src/` (source code)
- `example/` (demo app)
- Configuration files
- Development files

## 📦 Package Distribution

### NPM Package Structure

```
retro-floppy/
├── dist/
│   ├── index.js
│   ├── index.esm.js
│   └── index.d.ts
├── README.md
└── package.json
```

### Import Paths

```tsx
// Main component
import { FloppyDisk } from 'retro-floppy';

// Types
import type { FloppyDiskProps, FloppyTheme } from 'retro-floppy';

// Constants
import { SIZE_MAP, DEFAULT_THEME } from 'retro-floppy';
```

## 🔄 Development Commands

```bash
# Install dependencies
npm install

# Build the component
npm run build

# Watch mode (auto-rebuild)
npm run dev

# Run example app
cd example && npm install && npm run dev

# Publish to NPM (after building)
npm publish
```

## 🎯 Integration Points

### For Consumers

1. **Install**: `npm install retro-floppy`
2. **Import**: `import { FloppyDisk } from 'retro-floppy'`
3. **Use**: `<FloppyDisk size="small" label={{ name: 'Hello' }} />`

### For Contributors

1. **Clone**: Get the repository
2. **Install**: `npm install`
3. **Develop**: Edit `src/` files
4. **Build**: `npm run build`
5. **Test**: Run example app
6. **Submit**: Create pull request

## 📝 Notes

- **CSS Modules**: Styles are scoped to prevent conflicts
- **TypeScript**: Full type safety throughout
- **Tree-shakeable**: ES Module output supports tree-shaking
- **Zero dependencies**: Only React as peer dependency
- **Accessible**: ARIA labels and keyboard support included

---

For more information, see:

- [README.md](./README.md) - Main documentation
- [USAGE_GUIDE.md](./USAGE_GUIDE.md) - Detailed usage examples
