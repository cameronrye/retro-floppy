import React, { useState } from 'react';
import {
  FloppyDisk,
  FloppyLabel,
  DARK_FLOPPY_THEME,
  NEON_THEME,
  RETRO_THEME,
  PASTEL_THEME,
} from '../src';
import './App.css';

interface DiskData {
  id: number;
  label: FloppyLabel;
  diskType: 'HD' | 'DD';
}

const sampleDisks: DiskData[] = [
  {
    id: 1,
    label: {
      name: 'Second Reality',
      author: 'Future Crew',
      year: '1993',
      description: 'Legendary demo',
      type: 'ZIP',
      size: '1.44 MB',
    },
    diskType: 'HD',
  },
  {
    id: 2,
    label: {
      name: 'Crystal Dream II',
      author: 'Triton',
      year: '1993',
      description: 'Amiga demo',
      type: 'DISK',
      size: '880 KB',
    },
    diskType: 'DD',
  },
  {
    id: 3,
    label: {
      name: 'Unreal',
      author: 'Future Crew',
      year: '1992',
      description: 'PC demo',
      type: 'ZIP',
      size: '1.44 MB',
    },
    diskType: 'HD',
  },
  {
    id: 4,
    label: {
      name: 'State of the Art',
      author: 'Spaceballs',
      year: '1992',
      description: 'Amiga demo',
      type: 'DISK',
      size: '880 KB',
    },
    diskType: 'DD',
  },
  {
    id: 5,
    label: {
      name: '9 Fingers',
      author: 'Spaceballs',
      year: '1993',
      description: 'Amiga demo',
      type: 'DISK',
      size: '880 KB',
    },
    diskType: 'DD',
  },
  {
    id: 6,
    label: {
      name: 'Verses',
      author: 'EMF',
      year: '1994',
      description: 'PC demo',
      type: 'ZIP',
      size: '1.44 MB',
    },
    diskType: 'HD',
  },
];

function App() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [enableGradients, setEnableGradients] = useState(false);

  React.useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkTheme]);

  const handleDiskClick = (id: number) => {
    const disk = sampleDisks.find((d) => d.id === id);
    alert(`Launching: ${disk?.label.name}`);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>💾 Demoscene Collection</h1>
        <div className="toolbar">
          <button
            className={viewMode === 'grid' ? 'active' : ''}
            onClick={() => setViewMode('grid')}
          >
            Grid View
          </button>
          <button
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => setViewMode('list')}
          >
            List View
          </button>
          <button
            className={isDarkTheme ? 'active' : ''}
            onClick={() => setIsDarkTheme((prev) => !prev)}
          >
            {isDarkTheme ? 'Dark Theme' : 'Light Theme'}
          </button>
          <button
            className={enableGradients ? 'active' : ''}
            onClick={() => setEnableGradients((prev) => !prev)}
          >
            {enableGradients ? '🌈 Gradients ON' : '🌈 Gradients OFF'}
          </button>
        </div>
      </header>

      <main className="main">
        <section className="theme-demo">
          <h2>🎨 Theme Presets</h2>
          <p className="hint">
            Choose from 5 built-in themes or create your own!
          </p>
          <div className="theme-showcase">
            <div className="theme-item">
              <FloppyDisk
                size="medium"
                label={{
                  name: 'Light Theme',
                  author: 'Default',
                  year: '2024',
                }}
              />
              <span>Light (Default)</span>
            </div>
            <div className="theme-item">
              <FloppyDisk
                size="medium"
                label={{
                  name: 'Dark Theme',
                  author: 'Sleek',
                  year: '2024',
                }}
                theme={DARK_FLOPPY_THEME}
              />
              <span>Dark</span>
            </div>
            <div className="theme-item">
              <FloppyDisk
                size="medium"
                label={{
                  name: 'Neon Theme',
                  author: 'Cyberpunk',
                  year: '2024',
                }}
                theme={NEON_THEME}
              />
              <span>Neon</span>
            </div>
            <div className="theme-item">
              <FloppyDisk
                size="medium"
                label={{
                  name: 'Retro Theme',
                  author: 'Vintage',
                  year: '2024',
                }}
                theme={RETRO_THEME}
              />
              <span>Retro</span>
            </div>
            <div className="theme-item">
              <FloppyDisk
                size="medium"
                label={{
                  name: 'Pastel Theme',
                  author: 'Modern',
                  year: '2024',
                }}
                theme={PASTEL_THEME}
              />
              <span>Pastel</span>
            </div>
          </div>
        </section>

        {enableGradients && (
          <section className="gradient-demo">
            <h2>🌈 Dynamic Gradient Labels</h2>
            <p className="hint">
              Each disk gets a unique, deterministic gradient based on its name!
            </p>
            <div className="gradient-showcase">
              <div className="gradient-item">
                <FloppyDisk
                  size="medium"
                  label={{
                    name: 'Cybernetic Dreams',
                    author: 'Neon Labs',
                    year: '2024',
                  }}
                  theme={{
                    enableGradient: true,
                    gradientType: 'linear',
                  }}
                />
                <span>Linear Gradient</span>
              </div>
              <div className="gradient-item">
                <FloppyDisk
                  size="medium"
                  label={{
                    name: 'Quantum Flux',
                    author: 'Pixel Wizards',
                    year: '2024',
                  }}
                  theme={{
                    enableGradient: true,
                    gradientType: 'radial',
                  }}
                />
                <span>Radial Gradient</span>
              </div>
              <div className="gradient-item">
                <FloppyDisk
                  size="medium"
                  label={{
                    name: 'Stellar Voyage',
                    author: 'Code Artists',
                    year: '2024',
                  }}
                  theme={{
                    enableGradient: true,
                    gradientType: 'conic',
                  }}
                />
                <span>Conic Gradient</span>
              </div>
              <div className="gradient-item">
                <FloppyDisk
                  size="medium"
                  label={{
                    name: 'Digital Horizon',
                    author: 'Retro Coders',
                    year: '2024',
                  }}
                  theme={{
                    enableGradient: true,
                    gradientType: 'auto',
                  }}
                />
                <span>Auto (Random Type)</span>
              </div>
            </div>
          </section>
        )}

        <section className="features-demo">
          <h2>✨ Advanced Features</h2>
          <p className="hint">
            Loading states, error states, badges, and custom overlays!
          </p>
          <div className="features-showcase">
            <div className="feature-item">
              <FloppyDisk
                size="medium"
                label={{
                  name: 'Loading',
                  author: 'Please Wait',
                  year: '2024',
                }}
                loading
              />
              <span>Loading State</span>
            </div>
            <div className="feature-item">
              <FloppyDisk
                size="medium"
                label={{
                  name: 'Error',
                  author: 'Failed',
                  year: '2024',
                }}
                error
              />
              <span>Error State</span>
            </div>
            <div className="feature-item">
              <FloppyDisk
                size="medium"
                label={{
                  name: 'With Badge',
                  author: 'Featured',
                  year: '2024',
                }}
                badge={
                  <span
                    style={{
                      background: '#ff4444',
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}
                  >
                    NEW
                  </span>
                }
              />
              <span>Badge Overlay</span>
            </div>
            <div className="feature-item">
              <FloppyDisk
                size="medium"
                label={{
                  name: 'Custom Overlay',
                  author: 'Interactive',
                  year: '2024',
                }}
              >
                <div
                  style={{
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '8px',
                    borderRadius: '4px',
                    fontSize: '24px',
                  }}
                >
                  ⭐
                </div>
              </FloppyDisk>
              <span>Custom Overlay</span>
            </div>
          </div>
        </section>

        <section className="size-demo">
          <h2>Size Variants</h2>
          <div className="size-showcase">
            <div className="size-item">
              <FloppyDisk
                size="tiny"
                label={{
                  name: 'Panic',
                  author: 'Future Crew',
                  year: '1992',
                  description: 'PC demo',
                  type: 'ZIP',
                  size: '1.44 MB',
                }}
                diskType="HD"
                theme={{
                  enableGradient: enableGradients,
                }}
              />
              <span>Tiny (60px)</span>
            </div>
            <div className="size-item">
              <FloppyDisk
                size="small"
                label={{
                  name: 'Copper',
                  author: 'Surprise!',
                  year: '1995',
                  description: 'PC demo',
                  type: 'ZIP',
                  size: '1.44 MB',
                }}
                diskType="HD"
                theme={{
                  enableGradient: enableGradients,
                }}
              />
              <span>Small (120px)</span>
            </div>
            <div className="size-item">
              <FloppyDisk
                size="medium"
                label={{
                  name: 'Dope',
                  author: 'Complex',
                  year: '1997',
                  description: 'PC demo',
                  type: 'ZIP',
                  size: '1.44 MB',
                }}
                diskType="HD"
                theme={{
                  enableGradient: enableGradients,
                }}
              />
              <span>Medium (200px)</span>
            </div>
            <div className="size-item">
              <FloppyDisk
                size="large"
                label={{
                  name: 'Heaven 7',
                  author: 'Exceed',
                  year: '1999',
                  description: 'PC demo',
                  type: 'ZIP',
                  size: '1.44 MB',
                }}
                diskType="HD"
                theme={{
                  enableGradient: enableGradients,
                }}
              />
              <span>Large (400px)</span>
            </div>
          </div>
        </section>

        <section className="library">
          <h2>Demo Collection</h2>
          <p className="hint">Click to launch, hover to see the metal slide!</p>

          {viewMode === 'grid' ? (
            <div className="grid-view">
              {sampleDisks.map((disk) => (
                <FloppyDisk
                  key={disk.id}
                  size="medium"
                  label={disk.label}
                  diskType={disk.diskType}
                  theme={{
                    enableGradient: enableGradients,
                  }}
                  onClick={() => handleDiskClick(disk.id)}
                />
              ))}
            </div>
          ) : (
            <div className="list-view">
              {sampleDisks.map((disk) => (
                <div
                  key={disk.id}
                  className="list-item"
                  onClick={() => handleDiskClick(disk.id)}
                >
                  <FloppyDisk
                    size="tiny"
                    label={disk.label}
                    diskType={disk.diskType}
                    variant="compact"
                    theme={{
                      enableGradient: enableGradients,
                    }}
                  />
                  <div className="list-info">
                    <strong>{disk.label.name}</strong>
                    <span>
                      {disk.label.author} ({disk.label.year})
                    </span>
                  </div>
                  <span className="capacity">{disk.label.size}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
