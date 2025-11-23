---
sidebar_position: 8
---

# Architecture Decisions

This page provides an overview of the key architectural decisions made in the Retro Floppy project. Each decision is documented in detail in an Architecture Decision Record (ADR).

## What are ADRs?

Architecture Decision Records (ADRs) capture important architectural decisions along with their context and consequences. They help developers understand:

- **Why** certain approaches were chosen
- **What** alternatives were considered
- **What** trade-offs were made
- **What** the consequences are

## Key Decisions

### ADR-001: Use HSL Color Space for Gradient Generation

**Status**: Accepted

**Summary**: We chose HSL (Hue, Saturation, Lightness) as the primary color space for gradient generation instead of RGB, HSV, or LAB.

**Key Benefits**:

- Intuitive color theory mapping (hue = color wheel position)
- Easy analogous color generation (hue ± 30°)
- Simple pastel optimization (low saturation + high lightness)
- Native CSS support (no conversion needed)

**Trade-offs**:

- Not perceptually uniform (mitigated by testing)
- Requires conversion for luminance calculations (minimal overhead)

[Read full ADR →](../adr/hsl-color-space)

---

### ADR-002: Dynamic Font Scaling with scaleX Transform

**Status**: Accepted

**Summary**: We use CSS `scaleX()` transform for dynamic font scaling instead of adjusting `font-size`, using `scale()`, or truncating text.

**Key Benefits**:

- GPU-accelerated (fast and smooth)
- Precise scaling (not limited to discrete font sizes)
- Maintains vertical readability
- No layout reflow

**Trade-offs**:

- Text can look condensed when heavily compressed (mitigated by 0.4 minimum scale)
- Requires measurement complexity (temporary transform removal)

**Scale Bounds**: 0.4 (40%) to 1.5 (150%)

[Read full ADR →](../adr/font-scaling-transform)

---

### ADR-003: Graceful Degradation Error Handling

**Status**: Accepted

**Summary**: We chose graceful degradation over fail-fast, fail-silent, or strict validation approaches.

**Key Benefits**:

- Component never crashes user applications
- Clear, actionable error messages in development
- Predictable fallback behavior
- Production-safe (no console spam)

**Trade-offs**:

- Developers might not notice invalid props (mitigated by TypeScript + warnings)
- Invalid props may render differently than expected (documented behavior)

**Principles**:

1. Never throw errors
2. Console warnings in development
3. Fallback to safe defaults
4. TypeScript for compile-time safety

[Read full ADR →](../adr/graceful-degradation)

---

### ADR-004: Deterministic Gradient Generation

**Status**: Accepted

**Summary**: We use seeded pseudo-random number generation (Mulberry32) to create deterministic gradients from label names.

**Key Benefits**:

- Same label always has same gradient (consistency)
- No need to store gradient data (performance)
- Shareable (screenshots match live view)
- Predictable for users

**Trade-offs**:

- Can't get different gradient for same label (mitigated by custom seed option)
- Hash collisions possible but rare (~0.0001% for 1000 labels)

**Algorithm**: Label name → Hash → Seed → Mulberry32 PRNG → Colors

[Read full ADR →](../adr/deterministic-gradients)

---

### ADR-005: CSS Modules for Component Styling

**Status**: Accepted

**Summary**: We use CSS Modules for component styling instead of CSS-in-JS, Tailwind, plain CSS, or Sass.

**Key Benefits**:

- Scoped styles (no conflicts with user CSS)
- Zero runtime overhead (build-time transformation)
- TypeScript support (auto-generated `.d.ts` files)
- Standard CSS syntax (no learning curve)

**Trade-offs**:

- Requires build step (acceptable for modern React apps)
- Class name hashing makes debugging harder (mitigated by source maps)
- No dynamic styles (mitigated by CSS variables)

**Customization**: CSS variables expose all customizable values

[Read full ADR →](../adr/css-modules)

---

## Decision Process

When making architectural decisions, we consider:

1. **User Experience**: How does this affect end users?
2. **Developer Experience**: How does this affect developers using the library?
3. **Performance**: What is the runtime and build-time cost?
4. **Maintainability**: How easy is this to understand and modify?
5. **Flexibility**: Can users customize or override this behavior?
6. **Standards**: Does this align with web standards and best practices?

## Contributing

When proposing a new architectural decision:

1. Create a new ADR using the [template](../adr/template)
2. Number it sequentially (e.g., `006-my-decision.md`)
3. Fill in all sections (Context, Decision, Consequences)
4. Submit for review via pull request
5. Update this index page

## Full ADR Index

All ADRs are available in the `docs/adr/` directory:

1. [ADR-001: Use HSL Color Space for Gradient Generation](../adr/hsl-color-space)
2. [ADR-002: Dynamic Font Scaling with scaleX Transform](../adr/font-scaling-transform)
3. [ADR-003: Graceful Degradation Error Handling](../adr/graceful-degradation)
4. [ADR-004: Deterministic Gradient Generation](../adr/deterministic-gradients)
5. [ADR-005: CSS Modules for Component Styling](../adr/css-modules)

## See Also

- [Font Scaling Algorithm Guide](./font-scaling-algorithm.md)
- [Gradient Generation Algorithm Guide](./gradient-generation-algorithm.md)
- [Error Handling Guide](./error-handling.md)
- [Contributing Guide](../contributing.md)
