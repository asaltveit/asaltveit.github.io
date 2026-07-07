import fs from 'node:fs';
import path from 'node:path';

const { script, style } = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'app/theme-snippet.json'), 'utf8'),
);

const SNIPPET = `<script data-theme-init>${script}</script><style data-theme-init>${style}</style>`;

const outDir = path.join(process.cwd(), 'out');

const THEME_SCRIPT_RE =
  /<script[^>]*data-theme-init[^>]*>[\s\S]*?<\/script>|<script src="\/theme-init\.js"><\/script>/g;
const THEME_STYLE_RE =
  /<style[^>]*data-theme-init[^>]*>[\s\S]*?<\/style>|<style>html,body\{background-color:#f8fafc\}html\.dark,html\.dark body\{background-color:#0a0d11\}<\/style>/g;

function injectThemeHead(html) {
  const headEnd = html.indexOf('</head>');

  if (headEnd === -1) return html;

  let updated = html.replace(THEME_SCRIPT_RE, '').replace(THEME_STYLE_RE, '');

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
