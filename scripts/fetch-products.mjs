// Product image fetcher (dev-time only — never runs on Vercel).
// For each product: official manufacturer page → established Indian marketplace listing → branded placeholder.
// Writes /public/products/<manufacturer>/<product>.webp|.svg, content/product-images.json and
// scripts/.cache/product-sources.csv. Respects robots.txt, waits ≥1s per domain, caches HTML, never bypasses blocks.
// Run: npm run assets:products
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = path.join(ROOT, 'scripts', '.cache', 'products');
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36';

// Images were reviewed by hand: official pages whose og:image was a generic banner (Rallis, IFFCO, Aries Agro)
// are left out so those products fall back to a listing image or the placeholder.
// slug, manufacturerSlug, name, manufacturer, category, official page(s), listing page(s)
export const SOURCES = [
  ['matco-8-64', 'indofil', 'Matco 8-64', 'Indofil Industries', 'fungicide', ['https://indofil.com/agro/fungicides/matco'], ['https://www.bighaat.com/products/matco-8-64-fungicide']],
  ['tag-cop', 'tropical-agro', 'TAG-COP', 'Tropical Agrosystem (India)', 'fungicide', ['https://tropicalagro.in/product/tag-cop/'], []],
  ['marlett-m45', 'coromandel', 'Marlett M45', 'Coromandel International', 'fungicide', [], ['https://www.hunarsetu.com/en/product/coromandel-or-marlett-m45-mancozeb-75percent-wp-']],
  ['indofil-m-45', 'indofil', 'Indofil M-45', 'Indofil Industries', 'fungicide', ['https://www.indofil.com/agro/fungicides/indofil-m-45'], []],
  ['saaf', 'upl', 'Saaf', 'UPL Limited', 'fungicide', [], ['https://www.bighaat.com/products/upl-saaf-fungicide']],
  ['contaf-plus', 'rallis', 'Contaf Plus', 'Rallis India', 'fungicide', [], ['https://www.bighaat.com/products/contaf-plus-fungicide']],
  ['nimbecidine-300', 't-stanes', 'Nimbecidine 300 ppm', 'T. Stanes & Company', 'bio', ['https://tstanes.com/botanic-insecticides'], ['https://www.bighaat.com/products/nimbicidine-300ppm']],
  ['nimbecidine-1500', 't-stanes', 'Nimbecidine 1500 ppm', 'T. Stanes & Company', 'bio', ['https://www.tstanes.com/domestic-crop-care/insect-nematode-management/nimbecidine-1500ppm'], []],
  ['bio-nematon', 't-stanes', 'Bio Nematon', 'T. Stanes & Company', 'bio', ['https://www.tstanes.com/domestic-crop-care/insect-nematode-management/bionematon'], ['https://www.bighaat.com/products/t-stanes-bio-nematon-bio-insecticides']],
  ['ipl-bioharz', 'ipl-biologicals', 'BioHarz', 'IPL Biologicals', 'bio', [], ['https://www.bighaat.com/products/ipl-bioharz-bio-fungicides']],
  ['yaramila-complex', 'yara', 'YaraMila Complex', 'Yara Fertilisers India', 'fertiliser', ['https://www.yara.in/crop-nutrition/fertiliser/compound/yaramila-complex/'], []],
  ['yaramila-winner', 'yara', 'YaraMila Winner', 'Yara Fertilisers India', 'fertiliser', ['https://www.yara.in/crop-nutrition/fertiliser/compound/yaramila-winner/'], []],
  ['yaraliva-nitrabor', 'yara', 'YaraLiva Nitrabor', 'Yara Fertilisers India', 'fertiliser', ['https://www.yara.in/crop-nutrition/fertiliser/calcium-nitrate/yaraliva-nitrabor/'], []],
  ['factamfos-20-20-0-13', 'fact', 'FACTAMFOS 20:20:0:13', 'Fertilisers and Chemicals Travancore (FACT)', 'fertiliser', ['https://fact.co.in/home/Dynamicpages?MenuId=225'], []],
  ['iffco-nano-urea-plus', 'iffco', 'IFFCO Nano Urea Plus', 'IFFCO', 'fertiliser', [], []],
  ['macrofert-20-20-20', 'aries-agro', 'Macrofert 20-20-20', 'Aries Agro', 'fertiliser', [], []],
  ['mahadhan-zn-edta', 'mahadhan', 'Mahadhan Zn EDTA', 'Deepak Fertilisers (Mahadhan)', 'micronutrient', [], ['https://www.bighaat.com/products/mahadhan-chelated-zn-domestic-micronutrient-fertilizer']],
  ['mahadhan-dot', 'mahadhan', 'Mahadhan DOT', 'Deepak Fertilisers (Mahadhan)', 'micronutrient', [], []],
  ['agromin', 'aries-agro', 'Agromin', 'Aries Agro', 'micronutrient', [], []],
  ['arecanut-mangala-sumangala-sreemangala', 'icar-cpcri', 'Arecanut seedlings — Mangala, Sumangala, Sreemangala', 'ICAR–CPCRI', 'planting', [], []],
  ['arecanut-dwarf-hybrids-vtlah', 'icar-cpcri', 'Arecanut dwarf hybrids VTLAH-1 & VTLAH-2', 'ICAR–CPCRI', 'planting', [], []],
  ['cocoa-planting-material', 'icar-cpcri', 'Cocoa planting material (Vittal)', 'ICAR–CPCRI', 'planting', [], []],
];

const lastHit = {};
async function politeFetch(url, opts = {}) {
  const host = new URL(url).host;
  const wait = (lastHit[host] ?? 0) + 1100 - Date.now();
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastHit[host] = Date.now();
  return fetch(url, { ...opts, headers: { 'User-Agent': UA, ...(opts.headers ?? {}) }, redirect: 'follow', signal: AbortSignal.timeout(20000) });
}

const robotsCache = {};
async function allowed(url) {
  const u = new URL(url);
  if (!(u.origin in robotsCache)) {
    let rules = [];
    try {
      const res = await politeFetch(`${u.origin}/robots.txt`);
      if (res.ok) {
        let applies = false;
        for (const raw of (await res.text()).split(/\r?\n/)) {
          const line = raw.split('#')[0].trim();
          const [k, ...rest] = line.split(':');
          const v = rest.join(':').trim();
          if (/^user-agent$/i.test(k)) applies = v === '*';
          else if (applies && /^disallow$/i.test(k) && v) rules.push(v);
        }
      }
    } catch {}
    robotsCache[u.origin] = rules;
  }
  const p = u.pathname + u.search;
  return !robotsCache[u.origin].some((r) => {
    const re = new RegExp('^' + r.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*'));
    return re.test(p);
  });
}

async function getHtml(url) {
  const key = path.join(CACHE, 'html', encodeURIComponent(url).slice(0, 180) + '.html');
  try {
    return await fs.readFile(key, 'utf8');
  } catch {}
  if (!(await allowed(url))) throw new Error('disallowed by robots.txt');
  const res = await politeFetch(url);
  if (!res.ok) throw new Error(`source blocked (${res.status})`);
  const html = await res.text();
  await fs.mkdir(path.dirname(key), { recursive: true });
  await fs.writeFile(key, html);
  return html;
}

function pickImage(html, pageUrl) {
  const abs = (u) => new URL(u.replace(/&amp;/g, '&'), pageUrl).href;
  const og = html.match(/<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]+content=["']([^"']+)["']/i)
    ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
  if (og && !/logo|default|placeholder/i.test(og[1])) return abs(og[1]);
  // Fallback: the largest srcset candidate of an <img> that looks like a product shot.
  for (const m of html.matchAll(/<img[^>]+>/gi)) {
    const tag = m[0];
    if (/logo|icon|banner|sprite/i.test(tag)) continue;
    const srcset = tag.match(/srcset=["']([^"']+)["']/i)?.[1];
    if (srcset) {
      const best = srcset.split(',').map((s) => s.trim().split(/\s+/)).sort((a, b) => parseInt(b[1]) - parseInt(a[1]))[0];
      if (best?.[0]) return abs(best[0]);
    }
    const src = tag.match(/\ssrc=["']([^"']+\.(?:png|jpe?g|webp)[^"']*)["']/i)?.[1];
    if (src && /product|upload|media|files/i.test(src)) return abs(src);
  }
  return null;
}

async function processImage(buf, dest) {
  // Flatten onto Rice Paper and centre the pack at ~80% of a 1200×1200 square.
  const inner = await sharp(buf).flatten({ background: '#FAF7F0' }).trim({ threshold: 12 }).resize(960, 960, { fit: 'inside', withoutEnlargement: false }).toBuffer();
  await sharp({ create: { width: 1200, height: 1200, channels: 3, background: '#FAF7F0' } })
    .composite([{ input: inner, gravity: 'centre' }])
    .webp({ quality: 80 })
    .toFile(dest);
}

const CATEGORY_ICON = {
  fungicide: '<path d="M60 22c-14 18-24 30-24 44a24 24 0 0 0 48 0c0-14-10-26-24-44z" fill="none" stroke="#B5651D" stroke-width="4" stroke-linejoin="round"/>',
  bio: '<path d="M38 86c0-30 18-50 46-54-2 30-20 50-46 54zM38 86l26-30" fill="none" stroke="#2E7D32" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>',
  fertiliser: '<path d="M36 40h48l-6 50H42zM44 40c0-8 7-14 16-14s16 6 16 14" fill="none" stroke="#B5651D" stroke-width="4" stroke-linejoin="round"/>',
  micronutrient: '<g fill="none" stroke="#1F4E79" stroke-width="4"><circle cx="48" cy="52" r="12"/><circle cx="74" cy="48" r="9"/><circle cx="62" cy="76" r="10"/></g>',
  planting: '<path d="M60 92V50M60 60c-4-12-14-18-24-18 0 12 10 20 24 18zM60 52c4-14 14-22 26-22 0 14-12 24-26 22z" fill="none" stroke="#2E7D32" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>',
};
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
function wrap(text, max) {
  const words = text.split(' ');
  const lines = [''];
  for (const w of words) {
    if ((lines.at(-1) + ' ' + w).trim().length > max) lines.push(w);
    else lines[lines.length - 1] = (lines.at(-1) + ' ' + w).trim();
  }
  return lines;
}
function placeholderSvg(name, manufacturer, category) {
  const lines = wrap(name, 20).slice(0, 3);
  const nameTspans = lines.map((l, i) => `<tspan x="300" dy="${i === 0 ? 0 : 50}">${esc(l)}</tspan>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" role="img" aria-label="${esc(name)} — image coming soon">
  <rect width="600" height="600" fill="#EFE6D2"/>
  <rect x="24" y="24" width="552" height="552" rx="28" fill="none" stroke="#1E2A1F" stroke-opacity=".08" stroke-width="2"/>
  <g transform="translate(240 110)"><circle cx="60" cy="60" r="58" fill="#FAF7F0"/>${CATEGORY_ICON[category]}</g>
  <text x="300" y="330" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="700" font-size="40" fill="#1E2A1F">${nameTspans}</text>
  <text x="300" y="${350 + lines.length * 50}" text-anchor="middle" font-family="Manrope, Arial, sans-serif" font-size="24" fill="#6B7066">${esc(manufacturer)}</text>
  <text x="300" y="540" text-anchor="middle" font-family="Manrope, Arial, sans-serif" font-weight="700" font-size="18" letter-spacing="3" fill="#B5651D">IMAGE COMING SOON</text>
</svg>\n`;
}

await fs.mkdir(CACHE, { recursive: true });
const results = {};
const rows = [['product', 'manufacturer', 'imageSource', 'imageUrl', 'pageUrl', 'note']];

for (const [slug, mfr, name, manufacturer, category, official, listing] of SOURCES) {
  const dir = path.join(ROOT, 'public', 'products', mfr);
  await fs.mkdir(dir, { recursive: true });
  let done = null;
  const notes = [];
  for (const [kind, urls] of [['official', official], ['listing', listing]]) {
    for (const url of urls) {
      try {
        const html = await getHtml(url);
        const img = pickImage(html, url);
        if (!img) throw new Error('no product image on page');
        if (!(await allowed(img))) throw new Error('image disallowed by robots.txt');
        const res = await politeFetch(img);
        if (!res.ok) throw new Error(`image ${res.status}`);
        const buf = Buffer.from(await res.arrayBuffer());
        await fs.writeFile(path.join(CACHE, `${slug}${path.extname(new URL(img).pathname) || '.img'}`), buf);
        await processImage(buf, path.join(dir, `${slug}.webp`));
        done = { image: `/products/${mfr}/${slug}.webp`, imageSource: kind, imageSourceUrl: url, imageUrl: img };
        break;
      } catch (e) {
        notes.push(`${kind}: ${e.message}`);
      }
    }
    if (done) break;
  }
  if (!done) {
    await fs.writeFile(path.join(dir, `${slug}.svg`), placeholderSvg(name, manufacturer, category));
    done = { image: `/products/${mfr}/${slug}.svg`, imageSource: 'placeholder' };
  }
  results[slug] = { image: done.image, imageSource: done.imageSource, imageSourceUrl: done.imageSourceUrl };
  rows.push([name, manufacturer, done.imageSource, done.imageUrl ?? '', done.imageSourceUrl ?? '', notes.join(' | ')]);
  console.log(`${done.imageSource.padEnd(11)} ${slug}${notes.length ? '  (' + notes.join('; ') + ')' : ''}`);
}

await fs.writeFile(path.join(ROOT, 'content', 'product-images.json'), JSON.stringify(results, null, 2) + '\n');
await fs.writeFile(
  path.join(ROOT, 'scripts', '.cache', 'product-sources.csv'),
  rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n') + '\n',
);
