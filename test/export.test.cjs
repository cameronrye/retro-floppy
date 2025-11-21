const assert = require('node:assert');
const path = require('node:path');

// Ensure the built CommonJS bundle exports the expected surface
const distPath = path.join(__dirname, '..', 'dist', 'index.cjs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const lib = require(distPath);

assert.ok(lib.FloppyDisk, 'FloppyDisk export should be defined');
assert.ok(lib.LIGHT_FLOPPY_THEME, 'LIGHT_FLOPPY_THEME export should be defined');
assert.ok(lib.DEFAULT_THEME, 'DEFAULT_THEME export should be defined');

console.log('All export tests passed.');

