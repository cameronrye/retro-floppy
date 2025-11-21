---
sidebar_position: 2
---

# Accessibility

Retro Floppy is built with accessibility in mind.

## ARIA Labels

The component automatically generates ARIA labels:

```tsx
<FloppyDisk
  label={{ name: 'My File', author: 'John Doe' }}
  // Generates: aria-label="My File by John Doe"
/>
```

## Custom ARIA Labels

Provide custom ARIA labels:

```tsx
<FloppyDisk ariaLabel="Download project files" />
```

## Keyboard Navigation

The component supports keyboard navigation:

- **Tab**: Focus the disk
- **Enter/Space**: Trigger click
- **Escape**: Remove focus

## Screen Readers

The component is fully compatible with screen readers and announces:

- Disk name and author
- Current state (loading, error, disabled)
- Interactive status

## Focus Management

The component manages focus states:

```tsx
<FloppyDisk
  onFocus={() => console.log('Focused')}
  onBlur={() => console.log('Blurred')}
/>
```

## Disabled State

Properly disables interaction:

```tsx
<FloppyDisk
  disabled={true}
  // Sets aria-disabled="true" and tabIndex="-1"
/>
```
