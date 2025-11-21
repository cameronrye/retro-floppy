import React from 'react';
import { FloppyDisk, DARK_FLOPPY_THEME, NEON_THEME, RETRO_THEME, PASTEL_THEME, LIGHT_FLOPPY_THEME } from 'retro-floppy';
import 'retro-floppy/dist/retro-floppy.css';

// Add react-live imports
const ReactLiveScope = {
  React,
  ...React,
  FloppyDisk,
  DARK_FLOPPY_THEME,
  NEON_THEME,
  RETRO_THEME,
  PASTEL_THEME,
  LIGHT_FLOPPY_THEME,
};

export default ReactLiveScope;

