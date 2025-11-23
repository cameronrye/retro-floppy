# ADR-003: Graceful Degradation Error Handling

**Status**: Accepted

**Date**: 2024-01-15

**Deciders**: Core Development Team

## Context

The Retro Floppy component accepts various user inputs (colors, sizes, labels, themes) that could be invalid or malformed. We needed to decide how to handle errors:

1. **Invalid Colors**: Non-hex colors, malformed hex strings
2. **Out-of-Range Sizes**: Extremely small or large disk sizes
3. **Missing Data**: Undefined or null props
4. **Type Mismatches**: Wrong data types (caught by TypeScript at compile time)

### Error Handling Philosophies

1. **Fail Fast**: Throw errors immediately when invalid input detected
2. **Fail Silent**: Ignore errors, use defaults without notification
3. **Graceful Degradation**: Warn about issues but continue rendering
4. **Strict Validation**: Reject invalid props, require valid input

## Decision

We chose **Graceful Degradation** with the following principles:

1. **Never Throw Errors**: Component never crashes the application
2. **Console Warnings**: Log helpful warnings in development mode
3. **Fallback Behavior**: Use safe defaults for invalid inputs
4. **TypeScript Safety**: Catch type errors at compile time
5. **Production Silent**: No console output in production builds

### Implementation

```typescript
// Example: Color validation
function adjustColor(color: string, percent: number): string {
  const fullHex = parseHexColor(color);

  if (!fullHex) {
    console.warn(
      `FloppyDisk: Invalid color format: '${color}'. ` +
        `Expected hex format (e.g., '#2a2a2a' or '#fff'). ` +
        `Using original color.`,
    );
    return color; // Fallback: use original value
  }

  // Continue with valid color...
}
```

## Rationale

### Why Graceful Degradation?

1. **User Experience**: App continues working even with invalid props
2. **Developer Friendly**: Clear warnings help debug issues
3. **Production Safe**: No console spam in production
4. **Predictable**: Always renders something useful
5. **React Philosophy**: Aligns with React's error boundary pattern

### Why Not Fail Fast?

- **Breaking Changes**: Throwing errors breaks user applications
- **Over-Strict**: Minor issues (like slightly wrong color) shouldn't crash
- **Poor DX**: Developers have to wrap component in try-catch
- **Cascade Failures**: One bad prop shouldn't break entire page

### Why Not Fail Silent?

- **Hidden Bugs**: Developers won't know about issues
- **Debugging Difficulty**: Silent failures are hard to track down
- **Poor DX**: No feedback on what went wrong

### Why Not Strict Validation?

- **Inflexible**: Rejects potentially usable inputs
- **Breaking**: Minor version updates could break existing code
- **Complexity**: Requires extensive validation logic

## Consequences

### Positive Consequences

- **Reliability**: Component never crashes user applications
- **Developer Experience**: Clear, actionable error messages
- **Debugging**: Easy to identify and fix issues
- **Backward Compatibility**: Can relax validation in future without breaking changes
- **Production Performance**: No console overhead in production
- **Accessibility**: Component always renders, screen readers always work

### Negative Consequences

- **Potential Misuse**: Developers might not notice invalid props
  - Mitigated by: Clear console warnings in development
  - Mitigated by: TypeScript type checking
- **Unexpected Rendering**: Invalid props may render differently than expected
  - Mitigated by: Documented fallback behavior
  - Mitigated by: Consistent warning messages
- **Testing Complexity**: Need to test both valid and invalid inputs
  - Addressed by: Comprehensive test suite

### Neutral Consequences

- **Documentation**: Need to document error handling behavior
- **Message Format**: Need consistent warning message format
- **TypeScript**: Still need strong types for compile-time safety

## Implementation Notes

### Warning Message Format

All warnings follow this structure:

```
FloppyDisk: [Issue description]. [Expected format/range]. [Fallback behavior].
```

Examples:

```
FloppyDisk: Invalid color format: 'red'. Expected hex format (e.g., '#2a2a2a' or '#fff'). Using original color.

FloppyDisk: size 5000px is outside recommended range (10-1000px). This may cause rendering issues or poor performance. Consider using predefined sizes: 'tiny', 'small', 'medium', 'large', or 'hero'.
```

### Fallback Strategies

| Invalid Input         | Fallback Behavior            |
| --------------------- | ---------------------------- |
| Invalid color         | Use original color value     |
| Out-of-range size     | Render anyway with warning   |
| Empty gradient colors | Use auto-generated gradient  |
| Invalid HSL           | Return white (255, 255, 255) |
| Missing label         | Render blank label area      |
| Invalid theme         | Merge with default theme     |

### JSDoc Documentation

All functions document their error handling:

```typescript
/**
 * @remarks This function does not throw errors.
 * Invalid colors trigger a console warning and return the original color unchanged.
 */
function adjustColor(color: string, percent: number): string {
  // ...
}
```

### Production Optimization

Console warnings are automatically removed in production builds by bundlers (Rollup, Webpack) that perform dead code elimination on `console.*` calls.

## Testing Strategy

Error handling is tested in:

- `src/__tests__/colorUtils.test.tsx` - Color validation
- `src/__tests__/FloppyDisk.test.tsx` - Component validation
- `src/__tests__/gradientUtils.test.ts` - Gradient edge cases

All tests verify:

1. Invalid inputs trigger warnings (not errors)
2. Fallback behavior is correct
3. Component continues to function

## Future Enhancements

1. **Custom Warning Handler**: Allow users to provide custom warning handler

   ```typescript
   <FloppyDisk onWarning={(message) => logger.warn(message)} />
   ```

2. **Validation Mode**: Strict mode that throws errors for testing

   ```typescript
   <FloppyDisk validationMode="strict" />
   ```

3. **Error Metrics**: Track validation failures for analytics
   ```typescript
   <FloppyDisk onValidationError={(error) => analytics.track(error)} />
   ```

## References

- [React Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [Defensive Programming](https://en.wikipedia.org/wiki/Defensive_programming)
- [Graceful Degradation - MDN](https://developer.mozilla.org/en-US/docs/Glossary/Graceful_degradation)
- Implementation: `ERROR_HANDLING.md` - Comprehensive error handling documentation
- Implementation: `src/FloppyDisk.tsx` - Validation logic
- Implementation: `src/gradientUtils.ts` - Gradient validation
