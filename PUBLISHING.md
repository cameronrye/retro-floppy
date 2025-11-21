# Publishing Checklist

This document outlines the steps to publish the `retro-floppy` package to npm.

## Pre-Publishing Checklist

Before publishing, ensure all of the following are complete:

### 1. Code Quality

- [ ] All tests pass (`npm test`)
- [ ] No linting errors (`npm run lint`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] Bundle size is within limits (`npm run size`)
- [ ] Build succeeds (`npm run build`)

### 2. Documentation

- [ ] README.md is up to date with all features
- [ ] CHANGELOG.md has entry for the new version
- [ ] All code has JSDoc comments
- [ ] Examples are working and up to date

### 3. Package Configuration

- [ ] `package.json` version is correct
- [ ] `package.json` has all required metadata (author, repository, bugs, homepage)
- [ ] `package.json` keywords are comprehensive
- [ ] `.npmignore` excludes unnecessary files
- [ ] `files` field in package.json includes only dist folder

### 4. Git

- [ ] All changes are committed
- [ ] Working directory is clean
- [ ] On the correct branch (usually `main`)
- [ ] Branch is up to date with remote

## Publishing Steps

### First-Time Setup

If this is your first time publishing this package:

1. **Login to npm**

   ```bash
   npm login
   ```

2. **Verify your npm account**

   ```bash
   npm whoami
   ```

3. **Check package name availability** (if not already published)
   ```bash
   npm view retro-floppy
   ```

### Publishing a New Version

1. **Update version number**

   ```bash
   # For patch releases (bug fixes)
   npm version patch

   # For minor releases (new features, backward compatible)
   npm version minor

   # For major releases (breaking changes)
   npm version major
   ```

2. **Run pre-publish checks** (automatically runs via `prepublishOnly` script)

   ```bash
   npm run prepublishOnly
   ```

3. **Publish to npm**

   ```bash
   # For first release or public packages
   npm publish --access public

   # For subsequent releases
   npm publish
   ```

4. **Push git tags**

   ```bash
   git push && git push --tags
   ```

5. **Create GitHub release**
   - Go to https://github.com/cameronrye/retro-floppy/releases/new
   - Select the version tag
   - Copy changelog entry for this version
   - Publish release

## Post-Publishing

1. **Verify package on npm**
   - Visit https://www.npmjs.com/package/retro-floppy
   - Check that version, README, and files are correct

2. **Test installation**

   ```bash
   # In a test project
   npm install retro-floppy
   ```

3. **Update documentation**
   - Update any external documentation
   - Announce the release (Twitter, Discord, etc.)

## Troubleshooting

### "You do not have permission to publish"

- Ensure you're logged in: `npm whoami`
- Check package name isn't taken by someone else
- For scoped packages, use `--access public`

### "Version already exists"

- Update version number: `npm version patch/minor/major`
- Check current version: `npm view retro-floppy version`

### Build fails during prepublishOnly

- Run `npm run build` manually to see errors
- Fix any TypeScript, linting, or test errors
- Ensure all dependencies are installed

## Automated Publishing (Future)

Consider setting up automated publishing with GitHub Actions:

- Publish on git tag push
- Run all checks in CI
- Automatic changelog generation
- Automated GitHub releases
