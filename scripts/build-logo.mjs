// Builds every logo file from the hand-traced mark (public/brand/kb-mark.svg) and the original logo sheet.
// Run: npm run assets:logo
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import opentype from 'opentype.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const P = (...p) => path.join(ROOT, ...p);
const SHEET = P('source-materials', '1 · Hands & sprout@1x.png');

const C = {
  green: '#2E7D32',
  gold: '#F2A900',
  ink: '#1E2A1F',
  forest: '#143D1E',
  lime: '#C9E58C',
  rice: '#FAF7F0',
  white: '#FFFFFF',
};

// Mark geometry, traced from the logo sheet (sheet pixel coordinates, viewBox 304 168 152 156).
const VB = { x: 304, y: 168, w: 152, h: 156 };
const mark = ({ stem = C.green, left = C.green, right = C.gold } = {}) => `
  <path d="M378 213C380 193 404 178 433 177C432 200 414 216 378 220Z" fill="${stem}"/>
  <path d="M381 240C362 241 339 228 333 205C356 202 376 213 381 232Z" fill="${stem}"/>
  <rect x="375" y="203" width="10" height="92" rx="5" fill="${stem}"/>
  <path d="M327 255A53 48 0 0 0 380 303" fill="none" stroke="${left}" stroke-width="28"/>
  <circle cx="327" cy="255" r="14" fill="${left}"/>
  <path d="M380 303A53 48 0 0 0 433 255" fill="none" stroke="${right}" stroke-width="28"/>
  <circle cx="433" cy="255" r="14" fill="${right}"/>`;

const markSvg = (colors, label = 'Kisan Bandhu') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VB.x} ${VB.y} ${VB.w} ${VB.h}" role="img" aria-label="${label}">${mark(colors)}\n</svg>\n`;

const font = opentype.parse(
  (await fs.readFile(P('node_modules', '@fontsource', 'baloo-2', 'files', 'baloo-2-latin-800-normal.woff'))).buffer,
);

// Horizontal lockup: mark on the left, outlined wordmark on the right (as in the decks' headers).
function lockup({ markColors, kisan, bandhu, label }) {
  const size = 104;
  const gap = 22;
  const x0 = VB.x + VB.w + gap;
  const baseline = VB.y + 118;
  const k = font.getPath('Kisan ', x0, baseline, size);
  const kAdv = font.getAdvanceWidth('Kisan ', size);
  const b = font.getPath('Bandhu', x0 + kAdv, baseline, size);
  const bb = b.getBoundingBox();
  const width = Math.ceil(bb.x2 - VB.x + 4);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VB.x} ${VB.y} ${width} ${VB.h}" role="img" aria-label="${label}">${mark(markColors)}
  <path d="${k.toPathData(1)}" fill="${kisan}"/>
  <path d="${b.toPathData(1)}" fill="${bandhu}"/>
</svg>\n`;
}

// Stacked lockup, exactly as the top of the logo sheet (mark above, wordmark centred below).
function stacked() {
  const size = 104;
  const kAdv = font.getAdvanceWidth('Kisan ', size);
  const total = kAdv + font.getAdvanceWidth('Bandhu', size);
  const cx = 380;
  const x0 = cx - total / 2;
  const baseline = 420;
  const k = font.getPath('Kisan ', x0, baseline, size);
  const b = font.getPath('Bandhu', x0 + kAdv, baseline, size);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${Math.floor(x0 - 8)} ${VB.y} ${Math.ceil(total + 16)} ${270}" role="img" aria-label="Kisan Bandhu">${mark()}
  <path d="${k.toPathData(1)}" fill="${C.ink}"/>
  <path d="${b.toPathData(1)}" fill="${C.green}"/>
</svg>\n`;
}

const brand = P('public', 'brand');
await fs.mkdir(brand, { recursive: true });
await fs.copyFile(SHEET, path.join(brand, 'kb-logo-sheet-original.png'));

const files = {
  'kb-mark.svg': markSvg(),
  'kb-mark-mono.svg': markSvg({ stem: C.ink, left: C.ink, right: C.ink }),
  'kb-mark-reversed.svg': markSvg({ stem: C.white, left: C.white, right: C.gold }),
  'kb-logo-primary.svg': lockup({ kisan: C.ink, bandhu: C.green, label: 'Kisan Bandhu' }),
  'kb-logo-reversed.svg': lockup({
    markColors: { stem: C.white, left: C.white, right: C.gold },
    kisan: C.white,
    bandhu: C.lime,
    label: 'Kisan Bandhu',
  }),
  'kb-logo-stacked.svg': stacked(),
};
for (const [name, svg] of Object.entries(files)) await fs.writeFile(path.join(brand, name), svg);

// Raster fallback: crop the mark from the sheet and turn the cream background transparent.
{
  const { data, info } = await sharp(SHEET)
    .extract({ left: VB.x, top: VB.y, width: VB.w, height: VB.h })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const d = Math.abs(data[i] - 0xfa) + Math.abs(data[i + 1] - 0xf7) + Math.abs(data[i + 2] - 0xf0);
    if (d < 24) data[i + 3] = 0;
    else if (d < 60) data[i + 3] = Math.round(((d - 24) / 36) * 255);
  }
  await sharp(data, { raw: info }).png().toFile(path.join(brand, 'kb-mark-crop.png'));
}

// App icon variant: white/gold mark on a Kisan Green rounded square.
const appIcon = (size, radius = 0.22) => {
  const pad = VB.w * 0.3;
  const s = VB.w + pad * 2;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${VB.x - pad} ${VB.y - pad + (VB.w - VB.h) / 2} ${s} ${s}">
  <rect x="${VB.x - pad}" y="${VB.y - pad + (VB.w - VB.h) / 2}" width="${s}" height="${s}" rx="${s * radius}" fill="${C.green}"/>${mark({ stem: C.white, left: C.white, right: C.gold })}
</svg>`);
};
const png = (size, radius) => sharp(appIcon(size, radius), { density: 300 }).resize(size, size).png().toBuffer();

await fs.writeFile(P('app', 'icon.png'), await png(512));
await fs.writeFile(P('app', 'apple-icon.png'), await png(180, 0)); // iOS applies its own mask
await fs.mkdir(P('public', 'icons'), { recursive: true });
await fs.writeFile(P('public', 'icons', 'icon-192.png'), await png(192));
await fs.writeFile(P('public', 'icons', 'icon-512.png'), await png(512));
await fs.writeFile(P('public', 'icons', 'icon-maskable-512.png'), await png(512, 0));

// favicon.ico with 32px and 48px PNG entries.
{
  const imgs = [await png(32), await png(48)];
  const header = Buffer.alloc(6 + 16 * imgs.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(imgs.length, 4);
  let offset = header.length;
  imgs.forEach((img, i) => {
    const size = i === 0 ? 32 : 48;
    const o = 6 + i * 16;
    header.writeUInt8(size, o);
    header.writeUInt8(size, o + 1);
    header.writeUInt16LE(1, o + 4);
    header.writeUInt16LE(32, o + 6);
    header.writeUInt32LE(img.length, o + 8);
    header.writeUInt32LE(offset, o + 12);
    offset += img.length;
  });
  await fs.writeFile(P('app', 'favicon.ico'), Buffer.concat([header, ...imgs]));
}

// Open Graph image: reversed lockup on Forest Night beside a plantation photo.
{
  const photoSrc = P('scripts', '.cache', 'stock', 'hero__areca-mist-coorg.jpg');
  const W = 1200;
  const H = 630;
  const layers = [];
  try {
    const photo = await sharp(photoSrc).resize(560, H, { fit: 'cover' }).toBuffer();
    const fade = Buffer.from(`<svg width="560" height="${H}"><defs><linearGradient id="g"><stop offset="0" stop-color="${C.forest}" stop-opacity="1"/><stop offset=".25" stop-color="${C.forest}" stop-opacity=".7"/><stop offset=".7" stop-color="${C.forest}" stop-opacity="0"/></linearGradient></defs><rect width="560" height="${H}" fill="url(#g)"/></svg>`);
    layers.push({ input: photo, left: W - 560, top: 0 }, { input: fade, left: W - 560, top: 0 });
  } catch {
    console.warn('OG: hero photo not found yet — run assets:stock first for the photo version');
  }
  const logo = await sharp(Buffer.from(files['kb-logo-reversed.svg']), { density: 400 }).resize({ width: 620 }).png().toBuffer();
  const text = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <text x="72" y="380" font-family="Georgia, serif" font-style="italic" font-size="40" fill="${C.lime}">Har kadam, kisan ke saath</text>
    <text x="72" y="440" font-family="Arial, sans-serif" font-size="26" fill="${C.rice}" fill-opacity=".85">Inputs, machines, workers, village hubs and fair prices</text>
    <text x="72" y="476" font-family="Arial, sans-serif" font-size="26" fill="${C.rice}" fill-opacity=".85">for India's plantation farmers.</text>
    <rect x="72" y="530" width="120" height="6" rx="3" fill="${C.gold}"/>
  </svg>`);
  await sharp({ create: { width: W, height: H, channels: 3, background: C.forest } })
    .composite([...layers, { input: logo, left: 64, top: 170 }, { input: text, left: 0, top: 0 }])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(P('app', 'opengraph-image.jpg'));
}

console.log('logo assets written');
