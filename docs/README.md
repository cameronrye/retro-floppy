# Retro Floppy Documentation

This directory contains the Docusaurus documentation site for Retro Floppy.

## 🚀 Quick Start

### Development

```bash
# From the root directory
npm run docs:dev

# Or from the docs directory
npm start
```

The site will be available at `http://localhost:3000/retro-floppy/`

### Build

```bash
# From the root directory
npm run docs:build

# Or from the docs directory
npm run build
```

### Serve Production Build

```bash
npm run serve
```

## 📁 Structure

```
docs/
├── docs/                      # Documentation content
│   ├── intro.md              # Welcome page
│   ├── getting-started/      # Installation and setup guides
│   ├── examples/             # Interactive examples (MDX)
│   ├── api/                  # API reference documentation
│   ├── guides/               # Usage guides
│   └── contributing.md       # Contributing guide
├── src/
│   ├── components/           # React components
│   ├── css/                  # Custom retro-themed styles
│   ├── pages/                # Landing page and playground
│   └── theme/                # Theme customizations
├── docusaurus.config.ts      # Docusaurus configuration
└── sidebars.ts               # Sidebar navigation
```

## 📝 Adding Documentation

### Create a New Page

1. Add a new `.md` or `.mdx` file in the appropriate directory
2. Add frontmatter with `sidebar_position`
3. Update `sidebars.ts` if needed

### Add Interactive Examples

Use MDX files with live code blocks:

````mdx
```jsx live
function Example() {
  return <FloppyDisk size="medium" label={{ name: 'Example' }} />;
}
```
````

## 🚢 Deployment

The documentation is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to `main`.

**Live Site**: https://cameronrye.github.io/retro-floppy/

### Manual Deployment

```bash
npm run deploy
```

## 🔧 Key Files

- **docusaurus.config.ts**: Site configuration, navbar, footer
- **sidebars.ts**: Documentation navigation structure
- **src/css/custom.css**: Retro-themed styling
- **src/pages/index.tsx**: Landing page with interactive demo
- **src/pages/playground.tsx**: Interactive component playground
- **src/theme/ReactLiveScope/index.js**: Components available in live code blocks

## 📚 Resources

- [Docusaurus Documentation](https://docusaurus.io/)
- [Retro Floppy Repository](https://github.com/cameronrye/retro-floppy)
