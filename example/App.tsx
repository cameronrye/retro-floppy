import React, { useState } from 'react';
import { FloppyDisk, FloppyLabel } from '../src';
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
  const [selectedDisk, setSelectedDisk] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleDiskClick = (id: number) => {
    const disk = sampleDisks.find(d => d.id === id);
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
        </div>
      </header>

      <main className="main">
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
              {sampleDisks.map(disk => (
                <FloppyDisk
                  key={disk.id}
                  size="small"
                  label={disk.label}
                  diskType={disk.diskType}
                  onClick={() => handleDiskClick(disk.id)}
                />
              ))}
            </div>
          ) : (
            <div className="list-view">
              {sampleDisks.map(disk => (
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
                  />
                  <div className="list-info">
                    <strong>{disk.label.name}</strong>
                    <span>{disk.label.author} ({disk.label.year})</span>
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

