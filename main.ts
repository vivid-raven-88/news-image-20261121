// news-image-20261121 entry (Node 22, standard library only).
// The image is the entry.png beside this file; the program copies it to /output/entry.png.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const source = new URL('./entry.png', import.meta.url);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const dest = join(outDir, 'entry.png');

// Fail loudly if the image is missing or empty, instead of shipping a broken entry.
const before = statSync(source);
if (before.size === 0) throw new Error('entry.png is empty');
copyFileSync(source, dest);
const after = statSync(dest);
console.log(`wrote ${dest} (${after.size} bytes)`);
