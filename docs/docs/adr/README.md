# Architecture Decision Records (ADR)

This directory contains Architecture Decision Records (ADRs) for the Retro Floppy project.

## What is an ADR?

An Architecture Decision Record (ADR) is a document that captures an important architectural decision made along with its context and consequences.

## Format

Each ADR follows this structure:

- **Title**: Short noun phrase describing the decision
- **Status**: Proposed, Accepted, Deprecated, or Superseded
- **Context**: What is the issue we're seeing that is motivating this decision?
- **Decision**: What is the change we're proposing and/or doing?
- **Consequences**: What becomes easier or more difficult to do because of this change?

## Index

1. [ADR-001: Use HSL Color Space for Gradient Generation](001-hsl-color-space.md)
2. [ADR-002: Dynamic Font Scaling with scaleX Transform](002-font-scaling-transform.md)
3. [ADR-003: Graceful Degradation Error Handling](003-graceful-degradation.md)
4. [ADR-004: Deterministic Gradient Generation](004-deterministic-gradients.md)
5. [ADR-005: CSS Modules for Component Styling](005-css-modules.md)

## Creating a New ADR

1. Copy the template from `000-template.md`
2. Number it sequentially (e.g., `006-my-decision.md`)
3. Fill in all sections
4. Update this README index
5. Submit for review

## References

- [ADR GitHub Organization](https://adr.github.io/)
- [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
