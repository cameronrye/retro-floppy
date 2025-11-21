---
sidebar_position: 1
---

# Props API

Complete reference for all FloppyDisk component props.

## FloppyDiskProps

### size

- **Type**: `FloppySize`
- **Default**: `'medium'`
- **Options**: `'tiny'` | `'small'` | `'medium'` | `'large'` | `'hero'` | `number`

Size of the floppy disk. Use predefined sizes or custom pixel value (10-1000).

### label

- **Type**: `FloppyLabel`
- **Optional**

Structured label data for the disk.

### theme

- **Type**: `FloppyTheme`
- **Optional**

Color theme customization. Merges with default theme.

### onClick

- **Type**: `() => void`
- **Optional**

Click event handler.

### onDoubleClick

- **Type**: `() => void`
- **Optional**

Double-click event handler.

### onHover

- **Type**: `(isHovering: boolean) => void`
- **Optional**

Hover state change handler.

### loading

- **Type**: `boolean`
- **Default**: `false`

Show loading state.

### error

- **Type**: `boolean`
- **Default**: `false`

Show error state.

### disabled

- **Type**: `boolean`
- **Default**: `false`

Disable interaction.

### selected

- **Type**: `boolean`
- **Default**: `false`

Show selected state.

See [Types](/docs/api/types) for detailed type definitions.
