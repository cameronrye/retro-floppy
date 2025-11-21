---
sidebar_position: 5
---

# TypeScript Guide

Using Retro Floppy with TypeScript.

## Type Imports

Import types from the package:

```typescript
import {
  FloppyDisk,
  FloppyDiskProps,
  FloppyTheme,
  FloppyLabel,
} from 'retro-floppy';
```

## Typed Props

Use types for props:

```typescript
const props: FloppyDiskProps = {
  size: 'medium',
  label: {
    name: 'My File',
    author: 'John Doe',
  },
};

<FloppyDisk {...props} />
```

## Custom Theme Type

Type your custom themes:

```typescript
const myTheme: FloppyTheme = {
  diskColor: '#ff6b6b',
  labelColor: '#fff',
};
```

## Generic Components

Create typed wrapper components:

```typescript
interface FileData {
  id: number;
  name: string;
  author: string;
}

function FileDisk({ file }: { file: FileData }) {
  return (
    <FloppyDisk
      label={{
        name: file.name,
        author: file.author,
      }}
    />
  );
}
```
