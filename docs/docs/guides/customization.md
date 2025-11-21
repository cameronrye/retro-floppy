---
sidebar_position: 1
---

# Customization Guide

Learn how to customize Retro Floppy to match your design.

## Theme Customization

Create custom themes by providing theme props:

```tsx
const myTheme = {
  diskColor: '#your-color',
  slideColor: '#your-color',
  labelColor: '#your-color',
  labelTextColor: '#your-color',
};

<FloppyDisk theme={myTheme} />;
```

## Partial Overrides

Override only specific colors:

```tsx
<FloppyDisk
  theme={{
    labelColor: '#ff6b6b',
    labelTextColor: '#fff',
  }}
/>
```

## Dynamic Theming

Change themes based on state:

```tsx
function ThemedDisk() {
  const [isDark, setIsDark] = useState(false);

  return (
    <FloppyDisk
      theme={isDark ? DARK_FLOPPY_THEME : LIGHT_FLOPPY_THEME}
      onClick={() => setIsDark(!isDark)}
    />
  );
}
```

## CSS Custom Properties

Use CSS variables for global theming:

```css
:root {
  --disk-color: #2a2a2a;
  --label-color: #fff;
}
```

## Animation Customization

Customize animations:

```tsx
<FloppyDisk
  animation={{
    hoverDuration: 300,
    slideDuration: 400,
    easing: 'ease-in-out',
  }}
/>
```

## Disable Animations

Turn off all animations:

```tsx
<FloppyDisk animation={{ disableAnimations: true }} />
```
