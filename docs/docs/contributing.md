---
sidebar_position: 6
---

# Contributing

Thank you for your interest in contributing to Retro Floppy!

## Development Setup

1. **Fork and clone the repository**

```bash
git clone https://github.com/cameronrye/retro-floppy.git
cd retro-floppy
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the example app**

```bash
npm run dev
```

4. **Build the library**

```bash
npm run build
```

## Project Structure

```
retro-floppy/
├── src/              # Component source code
├── example/          # Example application
├── docs/             # Documentation site
├── dist/             # Built library
└── tests/            # Test files
```

## Development Workflow

1. Create a new branch: `git checkout -b feature/my-feature`
2. Make your changes
3. Run tests: `npm test`
4. Build: `npm run build`
5. Test in example app: `npm run dev`
6. Commit: `git commit -m "feat: add new feature"`
7. Push: `git push origin feature/my-feature`
8. Open a Pull Request

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Test changes
- `chore:` Build process or tooling changes

## Testing

Run tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm test -- --watch
```

## Code Style

We use ESLint and Prettier for code formatting:

```bash
npm run lint
npm run format
```

## Documentation

Update documentation when adding features:

1. Update relevant docs in `docs/docs/`
2. Add examples to showcase the feature
3. Update API reference if needed

## Pull Request Guidelines

- Keep PRs focused on a single feature or fix
- Include tests for new features
- Update documentation
- Follow the existing code style
- Write clear commit messages

## Reporting Issues

When reporting issues, please include:

- Retro Floppy version
- React version
- Browser and OS
- Steps to reproduce
- Expected vs actual behavior
- Code example (if applicable)

## Feature Requests

We welcome feature requests! Please:

- Check if the feature already exists
- Describe the use case
- Provide examples of how it would work
- Consider submitting a PR

## Questions?

- Open a [GitHub Discussion](https://github.com/cameronrye/retro-floppy/discussions)
- Check existing [Issues](https://github.com/cameronrye/retro-floppy/issues)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Made with ❤️ by [Cameron Rye](https://rye.dev)
