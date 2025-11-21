---
sidebar_position: 5
---

# CSS Variables

CSS custom properties for advanced styling.

## Available Variables

The component uses CSS custom properties that can be overridden:

```css
.floppy-disk {
  --disk-color: #2a2a2a;
  --slide-color: #888;
  --label-color: #fff;
  --label-text-color: #333;
}
```

## Global Override

Override globally in your CSS:

```css
:root {
  --disk-color: #ff6b6b;
}
```

## Component-Specific Override

Use the `style` prop:

```tsx
<FloppyDisk
  style={
    {
      '--disk-color': '#ff6b6b',
    } as React.CSSProperties
  }
/>
```
