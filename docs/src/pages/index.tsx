import type { ReactNode } from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import { FloppyDisk } from 'retro-floppy';
import 'retro-floppy/dist/retro-floppy.css';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const [clicked, setClicked] = useState(false);

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Heading as="h1" className="hero__title">
              💾 {siteConfig.title}
            </Heading>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <div className={styles.badges}>
              <a
                href="https://www.npmjs.com/package/retro-floppy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.shields.io/npm/v/retro-floppy.svg?style=flat-square"
                  alt="npm version"
                />
              </a>
              <a
                href="https://www.npmjs.com/package/retro-floppy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.shields.io/npm/dm/retro-floppy.svg?style=flat-square"
                  alt="npm downloads"
                />
              </a>
              <a
                href="https://bundlephobia.com/package/retro-floppy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.shields.io/bundlephobia/minzip/retro-floppy?style=flat-square"
                  alt="bundle size"
                />
              </a>
              <a
                href="https://github.com/cameronrye/retro-floppy/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.shields.io/npm/l/retro-floppy.svg?style=flat-square"
                  alt="license"
                />
              </a>
            </div>
            <div className={styles.buttons}>
              <Link
                className="button button--primary button--lg"
                to="/docs/intro"
              >
                Get Started →
              </Link>
              <Link
                className="button button--secondary button--lg"
                to="/playground"
              >
                Try Playground
              </Link>
            </div>
            <div className={styles.installCommand}>
              <code>npm install retro-floppy</code>
            </div>
          </div>
          <div className={styles.heroDemo}>
            <FloppyDisk
              size="hero"
              label={{
                name: 'Retro Floppy',
                author: 'Cameron Rye',
                year: '2024',
                description: 'Interactive React Component',
                type: 'NPM',
                size: '< 15 KB',
              }}
              theme={{
                enableGradient: true,
                gradientType: 'linear',
              }}
              onClick={() => {
                setClicked(true);
                setTimeout(() => setClicked(false), 2000);
              }}
            />
            {clicked && (
              <div className={styles.clickMessage}>
                Click! Try hovering too 🎉
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title='A beautiful, interactive 3.5" floppy disk React component'
      description="Retro Floppy - A beautiful, interactive 3.5 inch floppy disk React component for retro-themed UIs. Highly customizable, accessible, and TypeScript-ready."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
