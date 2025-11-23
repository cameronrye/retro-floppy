# ADR-005: CSS Modules for Component Styling

**Status**: Accepted

**Date**: 2024-01-15

**Deciders**: Core Development Team

## Context

The Retro Floppy component needs a styling solution that:

1. **Scoped Styles**: Prevents style conflicts with user applications
2. **Type Safety**: TypeScript support for class names
3. **Performance**: Minimal runtime overhead
4. **Bundle Size**: Small CSS footprint
5. **Developer Experience**: Easy to use and maintain
6. **Customization**: Allows users to override styles

### Styling Options Considered

1. **CSS Modules**: Scoped CSS with build-time transformation
2. **CSS-in-JS** (styled-components, emotion): Runtime CSS generation
3. **Tailwind CSS**: Utility-first CSS framework
4. **Plain CSS**: Global CSS with BEM naming
5. **Sass/SCSS**: CSS preprocessor with modules

## Decision

We chose **CSS Modules** with the following approach:

1. **Scoped Styles**: All class names are locally scoped
2. **TypeScript Definitions**: Auto-generated `.d.ts` files for type safety
3. **CSS Variables**: Expose customization via CSS custom properties
4. **Minimal Runtime**: No JavaScript runtime for styling
5. **Standard CSS**: Use standard CSS syntax (no preprocessor)

### Implementation

```typescript
// FloppyDisk.module.css
.container {
  width: var(--floppy-size);
  background: var(--floppy-disk-color);
}

// FloppyDisk.tsx
import styles from './FloppyDisk.module.css';

<div className={styles.container} />
```

## Rationale

### Why CSS Modules?

1. **Scoped by Default**: No global namespace pollution
   - Class names are transformed: `.container` → `.FloppyDisk_container_a1b2c3`
   - Prevents conflicts with user styles

2. **Zero Runtime**: Styles are extracted at build time
   - No JavaScript overhead
   - Faster than CSS-in-JS solutions
   - Smaller bundle size

3. **Type Safety**: TypeScript definitions for class names

   ```typescript
   // FloppyDisk.module.css.d.ts (auto-generated)
   export const container: string;
   export const label: string;
   ```

4. **Standard CSS**: No new syntax to learn
   - Familiar to all developers
   - Works with existing CSS tools
   - Easy to copy/paste from examples

5. **Build Tool Support**: Excellent support across bundlers
   - Rollup (via postcss)
   - Webpack (built-in)
   - Vite (built-in)

### Why Not CSS-in-JS?

**Rejected because**:

- **Runtime Overhead**: Adds 5-15KB to bundle + runtime cost
- **Performance**: Slower than static CSS
- **SSR Complexity**: Requires server-side setup
- **Learning Curve**: New API to learn
- **Tooling**: Requires additional dependencies

### Why Not Tailwind?

**Rejected because**:

- **Bundle Size**: Large utility class set
- **Customization**: Harder for users to override
- **Specificity**: Utility classes can conflict
- **Learning Curve**: Requires Tailwind knowledge
- **Build Complexity**: Requires Tailwind configuration

### Why Not Plain CSS?

**Rejected because**:

- **Global Namespace**: Risk of conflicts
- **No Scoping**: Users must avoid our class names
- **Maintenance**: BEM naming is verbose
- **Type Safety**: No TypeScript support

### Why Not Sass/SCSS?

**Rejected because**:

- **Build Dependency**: Requires Sass compiler
- **Complexity**: Adds preprocessing step
- **Bundle Size**: Larger than plain CSS
- **Overkill**: Don't need advanced features

## Consequences

### Positive Consequences

- **No Conflicts**: Scoped styles prevent clashes with user CSS
- **Type Safety**: TypeScript catches typos in class names
- **Performance**: Zero runtime overhead, fast rendering
- **Small Bundle**: Only includes used styles
- **Standard CSS**: Easy to understand and maintain
- **Customization**: CSS variables allow user overrides
- **Build Tool Agnostic**: Works with any modern bundler
- **SSR Compatible**: No special server-side setup needed

### Negative Consequences

- **Build Step Required**: Can't use without bundler
  - Impact: Acceptable, all modern React apps use bundlers
- **Class Name Hashing**: Harder to debug in production
  - Mitigated by: Source maps
  - Mitigated by: Readable class names in development
- **No Dynamic Styles**: Can't generate styles at runtime
  - Mitigated by: CSS variables for dynamic values
  - Mitigated by: Inline styles for truly dynamic values
- **Global Styles**: Need `:global()` for global styles
  - Impact: Minimal, we don't need many global styles

### Neutral Consequences

- **TypeScript Definitions**: Need to generate `.d.ts` files
  - Automated by build tools
- **CSS Variable Naming**: Need consistent naming convention
  - Addressed by: `--floppy-*` prefix for all variables

## Implementation Notes

### CSS Variable Strategy

All customizable values are exposed as CSS variables:

```css
.container {
  /* Size */
  width: var(--floppy-size);
  height: var(--floppy-size);

  /* Colors */
  background: var(--floppy-disk-color);
  border-color: var(--floppy-border-color);

  /* Spacing */
  padding: var(--floppy-padding);
}
```

Users can override via inline styles:

```tsx
<FloppyDisk
  style={
    {
      '--floppy-disk-color': '#ff0000',
    } as React.CSSProperties
  }
/>
```

### Class Name Composition

```typescript
// Combine multiple classes
const containerClasses = [
  styles.container,
  isHovered && styles.hovered,
  isDisabled && styles.disabled,
]
  .filter(Boolean)
  .join(' ');
```

### TypeScript Configuration

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "plugins": [
      { "name": "typescript-plugin-css-modules" }
    ]
  }
}
```

This enables IntelliSense for CSS Module class names.

### Build Configuration

```javascript
// rollup.config.js
import postcss from 'rollup-plugin-postcss';

export default {
  plugins: [
    postcss({
      modules: true,
      extract: true,
      minimize: true,
    }),
  ],
};
```

## Customization Examples

### Override via CSS Variables

```tsx
<FloppyDisk
  style={
    {
      '--floppy-disk-color': '#2a2a2a',
      '--floppy-label-color': '#ffffff',
    } as React.CSSProperties
  }
/>
```

### Override via className

```tsx
<FloppyDisk
  className="my-custom-disk"
/>

// In user's CSS
.my-custom-disk {
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}
```

### Override via style prop

```tsx
<FloppyDisk
  style={{
    transform: 'rotate(5deg)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  }}
/>
```

## Future Enhancements

1. **CSS Variable Documentation**: Auto-generate docs for all CSS variables
2. **Theme Presets**: Predefined CSS variable sets
3. **Dark Mode**: CSS variables for dark mode support
4. **Animation Variables**: Expose animation timing via CSS variables

## References

- [CSS Modules Specification](https://github.com/css-modules/css-modules)
- [TypeScript CSS Modules Plugin](https://github.com/mrmckeb/typescript-plugin-css-modules)
- [CSS Custom Properties - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- Implementation: `src/FloppyDisk.module.css`
- Build Config: `rollup.config.js`
