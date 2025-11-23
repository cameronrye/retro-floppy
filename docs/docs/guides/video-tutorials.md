---
sidebar_position: 11
---

# Video Tutorials & GIFs

Guide for creating and adding video tutorials and animated GIFs to the documentation.

## Overview

Visual content like videos and GIFs can significantly improve documentation by:

- Showing real-time interactions
- Demonstrating complex workflows
- Providing quick visual references
- Improving user engagement

## Creating GIFs

### Recommended Tools

#### 1. **LICEcap** (Free, Windows/macOS)

- Lightweight screen recorder
- Outputs directly to GIF
- Simple interface

**Download:** https://www.cockos.com/licecap/

**Usage:**

1. Open LICEcap
2. Resize the recording frame
3. Click "Record"
4. Perform your demonstration
5. Click "Stop"

#### 2. **Kap** (Free, macOS)

- Modern screen recorder
- Exports to GIF, MP4, WebM
- Plugins for optimization

**Download:** https://getkap.co/

**Usage:**

1. Open Kap
2. Select recording area
3. Click record button
4. Perform demonstration
5. Export as GIF

#### 3. **ScreenToGif** (Free, Windows)

- Feature-rich recorder
- Built-in editor
- Optimization tools

**Download:** https://www.screentogif.com/

**Usage:**

1. Open ScreenToGif
2. Choose "Recorder"
3. Position and resize frame
4. Click "Record"
5. Edit and export

### GIF Best Practices

**Size:**

- Keep file size under 5MB
- Optimize with tools like [ezgif.com](https://ezgif.com/optimize)
- Use 10-15 FPS for smooth playback
- Reduce colors if needed (256 colors usually sufficient)

**Dimensions:**

- Width: 600-800px (optimal for docs)
- Height: Maintain aspect ratio
- Crop to relevant area only

**Duration:**

- Keep under 10 seconds
- Loop seamlessly if possible
- Show one concept per GIF

**Content:**

- Focus on one feature/interaction
- Remove unnecessary UI elements
- Use clear, deliberate mouse movements
- Add 1-2 second pause at start/end

### Optimization

Use [ezgif.com](https://ezgif.com/) to optimize:

1. Upload your GIF
2. Click "Optimize"
3. Choose compression level (50-100)
4. Reduce colors if needed
5. Download optimized version

**Before/After Example:**

- Before: 8.5MB, 30 FPS, 256 colors
- After: 2.1MB, 15 FPS, 128 colors
- Quality: Minimal difference

## Creating Videos

### Recommended Tools

#### 1. **OBS Studio** (Free, All Platforms)

- Professional screen recording
- Live streaming capable
- Extensive configuration

**Download:** https://obsproject.com/

**Basic Setup:**

1. Add "Display Capture" source
2. Set resolution (1920x1080 recommended)
3. Configure audio (optional)
4. Click "Start Recording"

#### 2. **QuickTime Player** (Free, macOS)

- Built-in screen recorder
- Simple and reliable
- Good quality output

**Usage:**

1. File → New Screen Recording
2. Select recording area
3. Click record button
4. Stop when done

#### 3. **Loom** (Free tier available)

- Cloud-based recording
- Easy sharing
- Automatic hosting

**Download:** https://www.loom.com/

### Video Best Practices

**Format:**

- MP4 (H.264 codec)
- 1920x1080 or 1280x720
- 30 FPS
- AAC audio (if narrated)

**Duration:**

- Quick tips: 30-60 seconds
- Tutorials: 2-5 minutes
- Deep dives: 5-15 minutes

**Content:**

- Script your narration
- Use clear, concise language
- Show code and result side-by-side
- Add captions for accessibility

**Editing:**

- Trim dead space
- Add intro/outro (optional)
- Include timestamps in description
- Add chapter markers for long videos

## Adding to Documentation

### GIFs in Markdown

```markdown
## Interactive Example

![Gradient customization demo](./assets/gradient-demo.gif)

_Demonstrating how to customize gradient colors_
```

### Videos in Markdown

#### Embedded YouTube

```markdown
## Video Tutorial

<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="Retro Floppy Tutorial"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>
```

#### Embedded Loom

```markdown
<div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
  <iframe
    src="https://www.loom.com/embed/VIDEO_ID"
    frameborder="0"
    webkitallowfullscreen
    mozallowfullscreen
    allowfullscreen
    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
  ></iframe>
</div>
```

#### Video with Fallback

```markdown
<video width="100%" controls>
  <source src="/videos/tutorial.mp4" type="video/mp4" />
  Your browser does not support the video tag.
  [Download the video](./videos/tutorial.mp4)
</video>
```

## File Organization

### Directory Structure

```
docs/
├── static/
│   ├── img/
│   │   └── gifs/
│   │       ├── basic-usage.gif
│   │       ├── gradient-demo.gif
│   │       └── theme-customization.gif
│   └── videos/
│       ├── getting-started.mp4
│       └── advanced-features.mp4
└── docs/
    └── guides/
        └── video-tutorials.md
```

### Naming Conventions

**GIFs:**

- Use kebab-case: `gradient-demo.gif`
- Be descriptive: `font-scaling-animation.gif`
- Include version if needed: `v1-basic-usage.gif`

**Videos:**

- Use kebab-case: `getting-started.mp4`
- Include duration: `5min-advanced-tutorial.mp4`
- Version if needed: `v2-migration-guide.mp4`

## Hosting Options

### Self-Hosted (Recommended for GIFs)

**Pros:**

- Full control
- No external dependencies
- Fast loading (same domain)

**Cons:**

- Increases repo size
- Bandwidth costs (if high traffic)

**Setup:**

1. Add to `docs/static/img/gifs/`
2. Reference: `![Demo](/img/gifs/demo.gif)`

### External Hosting (Recommended for Videos)

#### YouTube

**Pros:**

- Free unlimited hosting
- Good player
- SEO benefits

**Cons:**

- Ads (unless Premium)
- Requires Google account

#### Loom

**Pros:**

- Easy recording and sharing
- Good for quick demos
- Automatic transcription

**Cons:**

- Free tier limits
- Less control over player

#### Vimeo

**Pros:**

- No ads
- Professional appearance
- Good privacy controls

**Cons:**

- Free tier limits
- Upload limits

## Content Ideas

### GIFs to Create

1. **Basic Usage** - Installing and rendering first disk
2. **Theme Customization** - Changing colors and gradients
3. **Size Variations** - Showing different size presets
4. **Interactive States** - Hover, click, focus effects
5. **Font Scaling** - Long text auto-scaling
6. **Gradient Types** - Linear, radial, conic gradients
7. **Badge Overlays** - Adding badges and overlays
8. **Animation Effects** - Hover and transition effects

### Videos to Create

1. **Getting Started** (2-3 min)
   - Installation
   - First component
   - Basic customization

2. **Advanced Customization** (5-7 min)
   - Custom themes
   - Gradient options
   - CSS variables

3. **Real-World Examples** (5-10 min)
   - File gallery
   - Save button
   - Project selector

4. **Performance Optimization** (3-5 min)
   - Virtualization
   - Memoization
   - Large lists

5. **Accessibility** (3-5 min)
   - Keyboard navigation
   - Screen readers
   - ARIA labels

## Accessibility for Videos

### Captions

Always provide captions for videos:

1. **Auto-generated** (YouTube, Loom)
   - Review and edit for accuracy
   - Fix technical terms

2. **Manual** (SRT files)
   - Create with tools like [Subtitle Edit](https://www.nikse.dk/subtitleedit)
   - Upload alongside video

### Transcripts

Provide text transcripts:

```markdown
## Video Tutorial

<video controls>...</video>

### Transcript

[00:00] Welcome to this tutorial on Retro Floppy...
[00:15] First, let's install the package...
[00:30] Now we'll create our first component...
```

### Audio Descriptions

For complex visual content, add audio descriptions:

```markdown
_[Audio description: The cursor moves to the theme prop and changes the diskColor to red]_
```

## See Also

- [Contributing Guide](../contributing.md) - How to contribute content
- [Examples](../examples/basic-usage.mdx) - Live code examples
