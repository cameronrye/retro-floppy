---
sidebar_position: 4
---

# Styling Guide

Advanced styling techniques for Retro Floppy.

## CSS Modules

The component uses CSS Modules internally for scoped styles.

## Custom Classes

Add custom classes:

```tsx
<FloppyDisk className="my-custom-class" />
```

## Inline Styles

Apply inline styles:

```tsx
<FloppyDisk
  style={{
    margin: '1rem',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  }}
/>
```

## CSS Variables

Override CSS variables:

```tsx
<FloppyDisk
  style={
    {
      '--disk-color': '#ff6b6b',
    } as React.CSSProperties
  }
/>
```

## Global Styles

Target the component globally:

```css
.floppy-disk-container {
  /* Your styles */
}
```
