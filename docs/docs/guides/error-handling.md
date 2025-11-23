---
sidebar_position: 6
---

# Error Handling

This guide explains how Retro Floppy handles errors and how to implement robust error handling in your application.

## Error Handling Strategy

Retro Floppy follows a **graceful degradation** approach to error handling:

1. **No Runtime Exceptions**: The component never throws errors that would break your application
2. **Console Warnings**: Invalid inputs trigger helpful console warnings in development
3. **Fallback Behavior**: Invalid values fall back to safe defaults
4. **Type Safety**: TypeScript provides compile-time validation for most issues

### Design Philosophy

- **Fail Gracefully**: Invalid props result in warnings, not crashes
- **Developer-Friendly**: Clear, actionable error messages
- **Production-Safe**: Warnings only appear in development mode
- **Predictable**: Consistent fallback behavior

## Common Validation Scenarios

### Invalid Color Format

When an invalid color is provided, the component warns and uses the original value:

```tsx
<FloppyDisk theme={{ diskColor: 'not-a-color' }} />
// Console: "FloppyDisk: Invalid color format: 'not-a-color'. Expected hex format (e.g., '#2a2a2a' or '#fff'). Using original color."
```

**Recommendation**: Always use hex colors (`#RGB` or `#RRGGBB` format).

### Size Out of Range

Custom numeric sizes outside the recommended range trigger a warning:

```tsx
<FloppyDisk size={5000} />
// Console: "FloppyDisk: size 5000px is outside recommended range (10-1000px). This may cause rendering issues or poor performance."
```

**Recommendation**: Use predefined sizes (`'tiny'`, `'small'`, `'medium'`, `'large'`, `'hero'`) or custom sizes within 10-1000px.

### Invalid Gradient Options

When gradient options are invalid, the component falls back to defaults:

```tsx
<FloppyDisk
  theme={{
    enableGradient: true,
    gradientOptions: { colors: [] }, // Empty array
  }}
/>
// Falls back to auto-generated gradient
```

## Error Boundaries

While Retro Floppy doesn't throw errors, it's good practice to wrap your components in an Error Boundary for comprehensive error handling.

### Basic Error Boundary Example

```tsx
import React from 'react';
import { FloppyDisk } from 'retro-floppy';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('FloppyDisk Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please try again.</div>;
    }

    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <FloppyDisk label={{ name: 'My Disk' }} />
    </ErrorBoundary>
  );
}
```

### Using react-error-boundary Library

For a more robust solution, use the `react-error-boundary` package:

```bash
npm install react-error-boundary
```

```tsx
import { ErrorBoundary } from 'react-error-boundary';
import { FloppyDisk } from 'retro-floppy';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Failed to render floppy disk:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        // Log to error reporting service
        console.error('Error:', error, errorInfo);
      }}
    >
      <FloppyDisk label={{ name: 'My Disk' }} />
    </ErrorBoundary>
  );
}
```

## Validation Error Messages

All validation errors follow a consistent format:

```
FloppyDisk: [Issue description]. [Expected format/range]. [Fallback behavior].
```

### Examples

- **Color validation**: `"FloppyDisk: Invalid color format: 'red'. Expected hex format (e.g., '#2a2a2a' or '#fff'). Using original color."`
- **Size validation**: `"FloppyDisk: size 5000px is outside recommended range (10-1000px). This may cause rendering issues or poor performance."`

## Best Practices

1. **Use TypeScript**: Catch most errors at compile time
2. **Validate Props**: Validate user input before passing to FloppyDisk
3. **Monitor Console**: Check console warnings during development
4. **Test Edge Cases**: Test with invalid/extreme values
5. **Error Boundaries**: Wrap components in error boundaries for production safety

## Debugging Tips

### Enable Verbose Logging

Check your browser console for warnings when things don't look right.

### Common Issues

**Colors not applying?**

- Ensure colors are in hex format (`#RGB` or `#RRGGBB`)
- Check for typos in color values

**Component too small/large?**

- Verify size is within recommended range (10-1000px)
- Use predefined sizes for consistency

**Gradients not showing?**

- Ensure `enableGradient: true` in theme
- Check that gradient colors are valid HSL or hex strings

## See Also

- [TypeScript Guide](./typescript.md) - Type safety best practices
- [Error Boundary Example](../examples/error-handling.mdx) - Interactive examples
- [Accessibility Guide](./accessibility.md) - Accessible error handling
