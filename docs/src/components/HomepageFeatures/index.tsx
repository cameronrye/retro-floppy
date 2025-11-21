import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Highly Customizable',
    icon: '🎨',
    description: (
      <>
        Choose from 5 built-in themes or create your own. Customize colors,
        sizes, animations, and even add dynamic gradient backgrounds. Full
        control over every aspect.
      </>
    ),
  },
  {
    title: 'Interactive & Animated',
    icon: '✨',
    description: (
      <>
        Smooth hover animations, click handlers, and keyboard navigation.
        Loading states, error states, and custom overlays for rich user
        experiences.
      </>
    ),
  },
  {
    title: 'TypeScript Ready',
    icon: '📘',
    description: (
      <>
        Full TypeScript support with comprehensive type definitions.
        IntelliSense, autocomplete, and type safety out of the box.
      </>
    ),
  },
  {
    title: 'Accessible',
    icon: '♿',
    description: (
      <>
        Built with accessibility in mind. ARIA labels, keyboard navigation, and
        screen reader support ensure everyone can use your components.
      </>
    ),
  },
  {
    title: 'Lightweight',
    icon: '🪶',
    description: (
      <>
        Under 15 KB minified + gzipped. Zero dependencies except React.
        Tree-shakeable ES modules for optimal bundle size.
      </>
    ),
  },
  {
    title: 'Performant',
    icon: '⚡',
    description: (
      <>
        Optimized for rendering multiple instances. CSS Modules for scoped
        styles. Memoized components prevent unnecessary re-renders.
      </>
    ),
  },
];

function Feature({ title, icon, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>{icon}</div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <Heading as="h2" className="text--center margin-bottom--lg">
          Why Retro Floppy?
        </Heading>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
