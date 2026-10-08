// Converts downloaded stock photos (scripts/.cache/stock/<group>__<slug>.jpg) into
// /public/images/<group>/<slug>.webp (max 2400px) + <slug>-1200.webp, and writes tiny blur placeholders
// to content/blur.json. Run: npm run assets:optimise
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'scripts', '.cache', 'stock');
const blur = {};
const sizes = {};

for (const file of (await fs.readdir(SRC)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort()) {
  const [group, slugExt] = file.split('__');
  const slug = slugExt.replace(/\.\w+$/, '');
  const outDir = path.join(ROOT, 'public', 'images', group);
  await fs.mkdir(outDir, { recursive: true });
  const input = sharp(path.join(SRC, file)).rotate();
  // Hero slides are the LCP image, so they get a tighter budget (≤ ~200 KB).
  const big = group === 'hero' ? { w: 1920, q: 66 } : { w: 2400, q: 78 };
  const info = await input.clone().resize({ width: big.w, withoutEnlargement: true }).webp({ quality: big.q }).toFile(path.join(outDir, `${slug}.webp`));
  await input.clone().resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 74 }).toFile(path.join(outDir, `${slug}-1200.webp`));
  const tiny = await input.clone().resize(16, 12, { fit: 'cover' }).webp({ quality: 40 }).toBuffer();
  const key = `/images/${group}/${slug}.webp`;
  blur[key] = `data:image/webp;base64,${tiny.toString('base64')}`;
  sizes[key] = { width: info.width, height: info.height };
  console.log(`${key}  ${info.width}×${info.height}  ${Math.round(info.size / 1024)} KB`);
}

await fs.writeFile(path.join(ROOT, 'content', 'blur.json'), JSON.stringify(blur, null, 1) + '\n');
await fs.writeFile(path.join(ROOT, 'content', 'image-sizes.json'), JSON.stringify(sizes, null, 1) + '\n');
