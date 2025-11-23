# ADR-004: Deterministic Gradient Generation

**Status**: Accepted

**Date**: 2024-01-15

**Deciders**: Core Development Team

## Context

The Retro Floppy component generates colorful gradients for disk labels. We needed to decide how gradients are generated:

1. **Consistency**: Should the same label always have the same gradient?
2. **Uniqueness**: Should different labels have different gradients?
3. **Randomness**: Should gradients be random or deterministic?
4. **Performance**: How to generate gradients efficiently?
5. **User Control**: Should users be able to customize gradients?

### Use Cases

- **Gallery View**: Multiple disks displayed together
- **Persistence**: Disk appearance should be consistent across sessions
- **Sharing**: Shared disks should look the same for all users
- **Customization**: Users may want specific colors

## Decision

We chose **Deterministic Gradient Generation** using seeded pseudo-random number generation:

1. **Seed from Label Name**: Hash the label name to create a numeric seed
2. **Seeded PRNG**: Use Mulberry32 algorithm for deterministic randomness
3. **Consistent Output**: Same label name always generates same gradient
4. **Override Option**: Allow users to provide custom seed or colors

### Implementation

```typescript
// 1. Convert label name to numeric seed
const seed = stringToSeed(labelName); // "My Disk" → 1234567

// 2. Create seeded random number generator
const random = createSeededRandom(seed);

// 3. Generate deterministic colors
const baseHue = random() * 360; // Always same for "My Disk"
const colors = generateColorPalette(seed);

// 4. Allow custom override
const finalColors = options?.colors || colors;
```

## Rationale

### Why Deterministic?

1. **Consistency**: Same label always looks the same
   - Across page reloads
   - Across different users
   - Across different devices

2. **Predictability**: Users can rely on visual appearance
   - Easier to find specific disks in a collection
   - Visual identity remains stable

3. **Shareability**: Shared disks look identical for everyone
   - Screenshots match live view
   - Documentation stays accurate

4. **Performance**: No need to store gradient data
   - Regenerate on demand
   - No database/localStorage needed

### Why Seeded PRNG?

1. **Deterministic**: Same seed always produces same sequence
2. **Fast**: Mulberry32 is extremely fast (< 1μs per call)
3. **Good Distribution**: Produces well-distributed random numbers
4. **Small Code**: Only ~10 lines of code
5. **No Dependencies**: Pure JavaScript implementation

### Why Hash Label Name?

1. **Natural Seed**: Label name is always available
2. **Unique**: Different labels produce different seeds
3. **Intuitive**: "My Disk" always gets same gradient
4. **No Storage**: Don't need to store seed separately

### Why Allow Override?

1. **Flexibility**: Users can customize if needed
2. **Branding**: Companies can use brand colors
3. **Accessibility**: Users can choose high-contrast colors
4. **Testing**: Easier to test with fixed colors

## Consequences

### Positive Consequences

- **Consistency**: Same label always has same appearance
- **Performance**: No storage or network requests needed
- **Simplicity**: No state management for gradients
- **Shareability**: Screenshots and demos stay accurate
- **Predictability**: Users can rely on visual identity
- **Testing**: Deterministic output is easier to test
- **Flexibility**: Can override with custom colors when needed

### Negative Consequences

- **Limited Variety**: Can't get different gradient for same label
  - Mitigated by: Custom seed option
  - Mitigated by: Custom colors option
- **Hash Collisions**: Different labels might produce same seed (rare)
  - Impact: Minimal, hash space is large (32-bit)
  - Probability: ~0.0001% for 1000 labels
- **No True Randomness**: Can't get "surprise me" random gradients
  - Mitigated by: Users can change label name to get new gradient
  - Mitigated by: Custom seed option for randomness

### Neutral Consequences

- **Algorithm Dependency**: Changing PRNG algorithm changes all gradients
  - Addressed by: Version gradients if algorithm changes
- **Seed Stability**: Hash algorithm must remain stable
  - Addressed by: Document hash algorithm in code

## Implementation Notes

### String to Seed Algorithm

```typescript
function stringToSeed(str: string): number {
  if (!str) return 12345; // Default seed for empty strings

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  return Math.abs(hash);
}
```

This is a simple, fast hash function that:

- Produces consistent output for same input
- Distributes well across the 32-bit integer space
- Handles Unicode characters correctly

### Mulberry32 PRNG

```typescript
function createSeededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
```

Mulberry32 is chosen because:

- **Fast**: ~10x faster than Math.random()
- **Deterministic**: Same seed always produces same sequence
- **Good Quality**: Passes statistical randomness tests
- **Small**: Only 6 lines of code

### Custom Override Options

```typescript
interface GradientGenerationOptions {
  seed?: number; // Custom seed for different gradient
  colors?: string[]; // Custom colors override generation
  angle?: number; // Custom gradient angle
}

// Usage
generateLabelGradient('My Disk', 'linear', {
  seed: 42, // Different gradient
  colors: ['#ff0000', '#00ff00'], // Custom colors
  angle: 45, // Custom angle
});
```

## Testing Strategy

Deterministic generation makes testing straightforward:

```typescript
test('same label produces same gradient', () => {
  const gradient1 = generateLabelGradient('Test', 'linear');
  const gradient2 = generateLabelGradient('Test', 'linear');
  expect(gradient1).toEqual(gradient2);
});

test('different labels produce different gradients', () => {
  const gradient1 = generateLabelGradient('Test1', 'linear');
  const gradient2 = generateLabelGradient('Test2', 'linear');
  expect(gradient1).not.toEqual(gradient2);
});
```

## Future Enhancements

1. **Gradient Versioning**: Version gradients to allow algorithm updates

   ```typescript
   generateLabelGradient('My Disk', 'linear', { version: 2 });
   ```

2. **Gradient Presets**: Named gradient presets

   ```typescript
   generateLabelGradient('My Disk', 'linear', { preset: 'sunset' });
   ```

3. **Gradient Gallery**: Show all possible gradients for a label
   ```typescript
   getAllGradientVariations('My Disk'); // Returns 10 variations
   ```

## References

- [Mulberry32 PRNG](https://github.com/bryc/code/blob/master/jshash/PRNGs.md#mulberry32)
- [Hash Functions](https://en.wikipedia.org/wiki/Hash_function)
- [Deterministic Random](https://en.wikipedia.org/wiki/Pseudorandom_number_generator)
- Implementation: `src/gradientUtils.ts` - `stringToSeed()`, `createSeededRandom()`
- Tests: `src/__tests__/gradientUtils.test.ts`
