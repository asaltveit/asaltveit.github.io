import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const publicDir = path.join(process.cwd(), 'public');
const widths = [400, 800];
const quality = 80;

const sources = [
  'map-screenshot.png',
  'pilots-website-screenshot.webp',
  'create-biblio-screenshot-032825.webp',
  'IELTS-speaking-practice.webp',
  'rp1-trees-website-screenshot.webp',
  'angry_boss.webp',
];

function run(command) {
  execSync(command, { stdio: 'inherit' });
}

function baseName(filename) {
  return filename.replace(/\.[^.]+$/, '');
}

for (const source of sources) {
  const inputPath = path.join(publicDir, source);
  if (!fs.existsSync(inputPath)) {
    console.warn(`skip: ${source} not found`);
    continue;
  }

  const base = baseName(source);
  const webpBase = path.join(publicDir, `${base}.webp`);

  if (source.endsWith('.png')) {
    run(`cwebp -q ${quality} "${inputPath}" -o "${webpBase}"`);
    console.log(`converted ${source} -> ${base}.webp`);
  }

  const variantSource = source.endsWith('.png') ? webpBase : inputPath;

  for (const width of widths) {
    const output = path.join(publicDir, `${base}-${width}w.webp`);
    run(`cwebp -q ${quality} -resize ${width} 0 "${variantSource}" -o "${output}"`);
    console.log(`created ${base}-${width}w.webp`);
  }
}

console.log('generate-card-image-variants: done');
