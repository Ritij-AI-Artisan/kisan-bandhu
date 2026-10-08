// Copies third-party brand glyphs from the simple-icons package (CC0) into /public/brand as standalone SVGs.
// Each icon gets a colour file (official hex) and a "-mono" file (currentColor-free, Rice Paper) for the footer.
// Run: npm run assets:icons
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as si from 'simple-icons';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public', 'brand');

const ICONS = {
  whatsapp: si.siWhatsapp,
  youtube: si.siYoutube,
  instagram: si.siInstagram,
  facebook: si.siFacebook,
  x: si.siX,
  'google-play': si.siGoogleplay,
  'app-store': si.siAppstore,
};

const svg = (d, fill, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="${title}"><path fill="${fill}" d="${d}"/></svg>\n`;

await fs.mkdir(OUT, { recursive: true });
for (const [name, icon] of Object.entries(ICONS)) {
  await fs.writeFile(path.join(OUT, `${name}.svg`), svg(icon.path, `#${icon.hex}`, icon.title));
  await fs.writeFile(path.join(OUT, `${name}-mono.svg`), svg(icon.path, '#FAF7F0', icon.title));
  await fs.writeFile(path.join(OUT, `${name}-white.svg`), svg(icon.path, '#FFFFFF', icon.title));
}

// simple-icons no longer ships LinkedIn (removed at the brand owner's request), so we draw a plain "in" tile.
const linkedin = (fill, fg) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="LinkedIn"><rect width="24" height="24" rx="4" fill="${fill}"/><g fill="${fg}"><rect x="5" y="9.5" width="3" height="9.5" rx=".4"/><circle cx="6.5" cy="6.3" r="1.75"/><path d="M10.5 9.5h2.8v1.4c.5-.9 1.6-1.7 3.2-1.7 2.6 0 3.5 1.6 3.5 4.3V19h-3v-4.8c0-1.3-.3-2.3-1.6-2.3s-1.9 1-1.9 2.3V19h-3z"/></g></svg>\n`;
await fs.writeFile(path.join(OUT, 'linkedin.svg'), linkedin('#0A66C2', '#FFFFFF'));
await fs.writeFile(path.join(OUT, 'linkedin-mono.svg'), linkedin('#FAF7F0', '#143D1E'));

console.log(`brand icons written: ${Object.keys(ICONS).length + 1}`);
