import fs from 'node:fs';
import path from 'node:path';

const SNIPPET =
  '<script src="/theme-init.js"></script><style>html,body{background-color:#f8fafc}html.dark,html.dark body{background-color:#0a0d11}</style>';

const outDir = path.join(process.cwd(), 'out');

function injectThemeHead(html) {
  const headEnd = html.indexOf('</head>');
  const bodyStart = html.indexOf('<body');

  if (headEnd === -1) return html;

  let updated = html;

  if (bodyStart !== -1 && updated.slice(bodyStart).includes(SNIPPET)) {
    updated =
      updated.slice(0, bodyStart) + updated.slice(bodyStart).replace(SNIPPET, '');
  }

  if (updated.slice(0, headEnd).includes('/theme-init.js')) {
    return updated;
  }

  if (updated.includes('<link rel="stylesheet"')) {
    return updated.replace('<link rel="stylesheet"', `${SNIPPET}<link rel="stylesheet"`);
  }

  return updated.replace('<head>', `<head>${SNIPPET}`);
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (!entry.name.endsWith('.html')) continue;

    const html = fs.readFileSync(fullPath, 'utf8');
    const updated = injectThemeHead(html);
    if (updated !== html) {
      fs.writeFileSync(fullPath, updated);
    }
  }
}

if (!fs.existsSync(outDir)) {
  console.error('inject-theme-head: out/ not found — run next build first');
  process.exit(1);
}

walk(outDir);
console.log('inject-theme-head: injected blocking theme script before stylesheets');
