# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- **Rebranding**: Package renamed from `@floppy/disk-component` to `retro-floppy`
- **CSS Output**: CSS file renamed from `floppydisk.css` to `retro-floppy.css`
- Updated all documentation and examples to reflect new branding

## [1.0.0] - 2024-12-21

### Added

#### Core Features

- Initial release of FloppyDisk component
- Interactive 3.5" floppy disk React component with realistic design
- Multiple size variants (tiny, small, medium, large, hero, custom)
- Structured label data support (name, author, year, description, type, size)
- Keyboard navigation and accessibility features (ARIA labels, Enter/Space activation)
- Click and double-click handlers
- Selected and disabled states
- Static and compact variants
- Dynamic font scaling for label text
- Hover animations for interactive variant
- Full TypeScript support with comprehensive type definitions
- CSS modules for styling with zero dependencies

#### Phase 1: Enhanced Flexibility (v1.0)

- **Style & Data Props**: Added `style`, `data-testid`, and `data-disk-id` props for better integration
- **State Props**: Added `loading` (pulse animation) and `error` (red outline) state props
- **Overlay System**: Added `badge` prop for simple overlays and `children` prop for custom overlay content
- **Event Callbacks**: Added `onHover` and `onFocus` callbacks for advanced interaction tracking
- **Animation Control**: Added `AnimationConfig` interface with `hoverDuration`, `slideDuration`, `easing`, and `disableAnimations` options
- **CSS Customization**: Exposed CSS custom properties for border-radius, hover-scale, hover-brightness, animation-duration, animation-easing, and shadow properties
- **CSS Module Export**: Exported CSS module classes for advanced styling use cases

#### Phase 2: Enhanced Theming & Gradients (v1.0)

- **Theme Presets**: Added 5 built-in theme presets:
  - `LIGHT_FLOPPY_THEME` - Classic light theme (default)
  - `DARK_FLOPPY_THEME` - Sleek dark theme
  - `NEON_THEME` - Vibrant cyberpunk aesthetic
  - `RETRO_THEME` - Classic 90s beige computer aesthetic
  - `PASTEL_THEME` - Soft, modern colors with gradients
- **Dynamic Gradients**: Deterministic gradient generation based on label names with WCAG-compliant adaptive text colors
- **Gradient Customization**: Added `GradientOptions` interface with:
  - `seed` - Custom seed for reproducible gradients
  - `colors` - Custom color palette (array of HSL or hex colors)
  - `angle` - Custom angle for linear gradients (0-360 degrees)
- **Gradient Types**: Support for linear, radial, conic, and auto (random) gradient types

#### Developer Experience

- Comprehensive JSDoc comments for all types and components
- Expanded test coverage (48 passing tests covering all features)
- Runtime validation for custom size values with console warnings
- Color validation for hex color inputs with fallback behavior
- Performance optimization with React.memo and memoized calculations
- Enhanced demo application showcasing all features and themes

### Changed

- Improved keyboard handling: Space key now activates on keyup (native button behavior)
- Optimized font scaling with useLayoutEffect to prevent flash of unstyled content
- Memoized label lines and gradient calculations to prevent unnecessary re-renders
- Enhanced color manipulation functions with support for 3-digit hex codes
- Updated package.json with complete metadata (author, repository, bugs, homepage)
- Reordered exports to put TypeScript types first for better IDE support

### Fixed

- TypeScript build errors by excluding test files from compilation
- Missing development dependencies (testing and linting tools)
- Linting errors and code formatting issues

[Unreleased]: https://github.com/cameronrye/floppydisk/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/cameronrye/floppydisk/releases/tag/v1.0.0
