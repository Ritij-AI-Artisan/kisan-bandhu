// Fails the build if any image/script/link src points off-site (other than the allowed Fillout embed)
// or references a file that doesn't exist in /public. Runs automatically before `npm run build`.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIRS = ['app', 'components', 'content'];
const ALLOWED_REMOTE = [/^https:\/\/server\.fillout\.com\/embed\/v1\/?$/];

async function walk(dir) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true }).catch(() => [])) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(tsx?|jsx?|json|css)$/.test(e.name)) out.push(p);
  }
  return out;
}

const errors = [];
let checked = 0;
for (const file of (await Promise.all(DIRS.map((d) => walk(path.join(ROOT, d))))).flat()) {
  const text = await fs.readFile(file, 'utf8');
  const rel = path.relative(ROOT, file);
  // src="…", src={'…'}, src: '…', image: '…', poster, url(…)
  const re = /(?:\bsrc|\bimage|\bposter|\bphoto|\blogo|\bbg|\bfile)["']?\s*[:=]\s*\{?\s*["'`]([^"'`]+)["'`]|url\(\s*["']?([^"')]+)["']?\s*\)/g;
  for (const m of text.matchAll(re)) {
    const ref = m[1] ?? m[2];
    if (!ref || ref.startsWith('data:') || ref.startsWith('#') || ref.includes('${')) continue;
    checked++;
    if (/^https?:\/\//.test(ref) || ref.startsWith('//')) {
      if (!ALLOWED_REMOTE.some((r) => r.test(ref))) errors.push(`${rel}: remote asset ${ref}`);
      continue;
    }
    if (!ref.startsWith('/')) continue;
    const clean = ref.split(/[?#]/)[0];
    try {
      await fs.access(path.join(ROOT, 'public', clean));
    } catch {
      errors.push(`${rel}: missing file public${clean}`);
    }
  }
}

if (errors.length) {
  console.error(`check-assets: ${errors.length} problem(s)\n` + errors.map((e) => '  ✗ ' + e).join('\n'));
  process.exit(1);
}
console.log(`check-assets: ${checked} asset references OK, all local`);
