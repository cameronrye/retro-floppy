import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
        'getting-started/setup',
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      collapsed: false,
      items: [
        'examples/basic-usage',
        'examples/themes',
        'examples/gradients',
        'examples/sizes',
        'examples/states',
        'examples/interactions',
        'examples/badges-overlays',
        'examples/advanced',
        'examples/error-handling',
        'examples/common-use-cases',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      collapsed: false,
      items: [
        'api/props',
        'api/types',
        'api/themes',
        'api/constants',
        'api/css-variables',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: true,
      items: [
        'guides/customization',
        'guides/accessibility',
        'guides/performance',
        'guides/styling',
        'guides/typescript',
        'guides/error-handling',
        'guides/font-scaling-algorithm',
        'guides/gradient-generation-algorithm',
        'guides/architecture-decisions',
        'guides/faq-troubleshooting',
        'guides/video-tutorials',
      ],
    },
    {
      type: 'category',
      label: 'Architecture Decision Records',
      collapsed: true,
      items: [
        'adr/hsl-color-space',
        'adr/font-scaling-transform',
        'adr/graceful-degradation',
        'adr/deterministic-gradients',
        'adr/css-modules',
      ],
    },
    'contributing',
  ],
};

export default sidebars;
