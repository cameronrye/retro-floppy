---
sidebar_position: 3
---

# Theme API

Built-in themes and customization options.

## Built-in Themes

### LIGHT_FLOPPY_THEME

Default light theme.

### DARK_FLOPPY_THEME

Dark theme for dark backgrounds.

### NEON_THEME

Cyberpunk neon aesthetic.

### RETRO_THEME

Vintage 80s/90s colors.

### PASTEL_THEME

Soft modern pastels.

## Custom Themes

Create custom themes by providing a `FloppyTheme` object:

```typescript
const customTheme: FloppyTheme = {
  diskColor: '#ff6b6b',
  slideColor: '#ffd93d',
  backgroundColor: '#6bcf7f',
  labelColor: '#fff',
  labelTextColor: '#333',
};
```

## Gradient Options

```typescript
interface GradientOptions {
  seed?: number;
  colors?: string[];
  angle?: number;
}
```
