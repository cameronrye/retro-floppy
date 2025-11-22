import React, { useState } from 'react';
import Layout from '@theme/Layout';
import {
  FloppyDisk,
  DARK_FLOPPY_THEME,
  NEON_THEME,
  RETRO_THEME,
  PASTEL_THEME,
  LIGHT_FLOPPY_THEME,
} from 'retro-floppy';
import 'retro-floppy/dist/retro-floppy.css';
import styles from './playground.module.css';

const THEMES = {
  light: LIGHT_FLOPPY_THEME,
  dark: DARK_FLOPPY_THEME,
  neon: NEON_THEME,
  retro: RETRO_THEME,
  pastel: PASTEL_THEME,
};

export default function Playground() {
  const [size, setSize] = useState<
    'tiny' | 'small' | 'medium' | 'large' | 'hero'
  >('hero');
  const [themeName, setThemeName] = useState<keyof typeof THEMES>('light');
  const [enableGradient, setEnableGradient] = useState(false);
  const [gradientType, setGradientType] = useState<
    'linear' | 'radial' | 'conic' | 'auto'
  >('linear');
  const [name, setName] = useState('Retro Floppy');
  const [author, setAuthor] = useState('Cameron Rye');
  const [year, setYear] = useState('2024');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('NPM');
  const [diskSize, setDiskSize] = useState('< 15 KB');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [selected, setSelected] = useState(false);
  const [enableSlideHover, setEnableSlideHover] = useState(true);

  const theme = {
    ...THEMES[themeName],
    enableGradient,
    gradientType,
  };

  return (
    <Layout
      title="Playground"
      description="Interactive Retro Floppy Playground"
    >
      <div className={styles.playground}>
        <div className={styles.container}>
          <h1>Interactive Playground</h1>
          <p className={styles.subtitle}>
            Customize and experiment with the Retro Floppy component in
            real-time
          </p>

          <div className={styles.content}>
            <div className={styles.preview}>
              <h2>Preview</h2>
              <div className={styles.previewArea}>
                <FloppyDisk
                  size={size}
                  label={{
                    name,
                    author,
                    year,
                    description,
                    type,
                    size: diskSize,
                  }}
                  theme={theme}
                  loading={loading}
                  error={error}
                  disabled={disabled}
                  selected={selected}
                  enableSlideHover={enableSlideHover}
                  onClick={() => alert('Disk clicked!')}
                />
              </div>
            </div>

            <div className={styles.controls}>
              <h2>Controls</h2>

              <div className={styles.section}>
                <h3>Size</h3>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value as any)}
                >
                  <option value="tiny">Tiny (60px)</option>
                  <option value="small">Small (120px)</option>
                  <option value="medium">Medium (200px)</option>
                  <option value="large">Large (400px)</option>
                  <option value="hero">Hero (600px)</option>
                </select>
              </div>

              <div className={styles.section}>
                <h3>Theme</h3>
                <select
                  value={themeName}
                  onChange={(e) => setThemeName(e.target.value as any)}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="neon">Neon</option>
                  <option value="retro">Retro</option>
                  <option value="pastel">Pastel</option>
                </select>
              </div>

              <div className={styles.section}>
                <h3>Gradient</h3>
                <label>
                  <input
                    type="checkbox"
                    checked={enableGradient}
                    onChange={(e) => setEnableGradient(e.target.checked)}
                  />
                  Enable Gradient
                </label>
                {enableGradient && (
                  <select
                    value={gradientType}
                    onChange={(e) => setGradientType(e.target.value as any)}
                  >
                    <option value="linear">Linear</option>
                    <option value="radial">Radial</option>
                    <option value="conic">Conic</option>
                    <option value="auto">Auto</option>
                  </select>
                )}
              </div>

              <div className={styles.section}>
                <h3>Metal Slide</h3>
                <label>
                  <input
                    type="checkbox"
                    checked={enableSlideHover}
                    onChange={(e) => setEnableSlideHover(e.target.checked)}
                  />
                  Enable Hover Animation
                </label>
              </div>

              <div className={styles.section}>
                <h3>Label</h3>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Size"
                  value={diskSize}
                  onChange={(e) => setDiskSize(e.target.value)}
                />
              </div>

              <div className={styles.section}>
                <h3>States</h3>
                <label>
                  <input
                    type="checkbox"
                    checked={loading}
                    onChange={(e) => setLoading(e.target.checked)}
                  />
                  Loading
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={error}
                    onChange={(e) => setError(e.target.checked)}
                  />
                  Error
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={disabled}
                    onChange={(e) => setDisabled(e.target.checked)}
                  />
                  Disabled
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={(e) => setSelected(e.target.checked)}
                  />
                  Selected
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
