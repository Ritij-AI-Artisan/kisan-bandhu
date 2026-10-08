// Stock photo fetcher (dev-time only — never runs on Vercel).
//
// Two modes:
//   node scripts/fetch-stock.mjs search   → searches Pixabay + Wikimedia Commons and writes candidates to scripts/.cache/stock-candidates.json
//   node scripts/fetch-stock.mjs          → downloads every photo listed in scripts/stock-manifest.json
//                                           into scripts/.cache/stock/, then writes content/credits.json.
//                                           Run `npm run assets:optimise` afterwards to produce /public WebP files.
//
// Unsplash serves a bot challenge and Pexels returns 403 without an API key; we do not bypass either.
// Sources used: Pixabay (public search pages, allowed by robots.txt) and the Wikimedia Commons open API.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = path.join(ROOT, 'scripts', '.cache');
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function loadEnv() {
  try {
    const txt = await fs.readFile(path.join(ROOT, '.env.local'), 'utf8');
    for (const line of txt.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
      if (m && m[2]) process.env[m[1]] ??= m[2];
    }
  } catch {}
}

const TERMS = [
  'arecanut', 'areca palm plantation', 'betel nut drying', 'coconut grove kerala', 'coconut farmer',
  'black pepper vine', 'pepper harvest', 'coffee plantation coorg', 'coffee plantation india', 'coffee cherries',
  'cashew fruit', 'cashew nuts', 'indian farmer', 'indian woman farmer', 'tractor india', 'agriculture drone',
  'farm workers india', 'karnataka village', 'western ghats', 'kerala paddy monsoon', 'grain sacks warehouse',
  'weighing scale market india', 'farmer smartphone', 'leaf disease', 'soil hands', 'coconut tree climber',
  'fertilizer', 'seedling', 'leaf macro', 'coconut husk', 'tea plantation india', 'indian village',
  'coconut plantation kerala', 'copra drying', 'jute sacks india', 'agricultural market karnataka', 'coffee estate chikmagalur',
];

async function searchPixabay(term) {
  const url = `https://pixabay.com/images/search/${encodeURIComponent(term)}/`;
  const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'text/html' } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const html = await res.text();
  const out = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let o;
    try {
      o = JSON.parse(m[1]);
    } catch {
      continue;
    }
    if (o['@type'] !== 'ImageObject' || !o.contentUrl) continue;
    const id = o.contentUrl.match(/-(\d+)_\d+\.\w+$/)?.[1];
    out.push({
      id: `pixabay-${id}`,
      source: 'Pixabay',
      name: o.name?.replace(/^Free /, '').replace(/ photo and picture$/, ''),
      photoUrl: `https://pixabay.com${o.acquireLicensePage}`,
      contentUrl: o.contentUrl, // 1280px — the largest size served without an account
      license: 'Pixabay Content License',
    });
  }
  return out;
}

// Wikimedia Commons: open API, used for South-India-specific subjects Pixabay lacks.
// Only CC0 / CC BY / CC BY-SA / public-domain files are kept, and attribution goes on /credits.
async function searchCommons(term) {
  const api = new URL('https://commons.wikimedia.org/w/api.php');
  Object.entries({
    action: 'query', format: 'json', generator: 'search', gsrnamespace: '6', gsrsearch: `${term} filetype:bitmap`,
    gsrlimit: '24', prop: 'imageinfo', iiprop: 'url|extmetadata|size', iiurlwidth: '2400',
  }).forEach(([k, v]) => api.searchParams.set(k, v));
  const res = await fetch(api, { headers: { 'User-Agent': 'KisanBandhuAssetScript/0.1 (dev-time asset fetch; https://kisanbandhu.in)' } });
  if (!res.ok || !(res.headers.get('content-type') ?? '').includes('json')) throw new Error(`commons ${res.status}`);
  const j = await res.json();
  const strip = (h) => (h ?? '').replace(/<[^>]+>/g, '').trim();
  return Object.values(j.query?.pages ?? {})
    .map((p) => {
      const ii = p.imageinfo?.[0];
      const md = ii?.extmetadata ?? {};
      return {
        id: `commons-${p.pageid}`,
        source: 'Wikimedia Commons',
        name: p.title.replace(/^File:/, ''),
        description: strip(md.ImageDescription?.value).slice(0, 200),
        photographer: strip(md.Artist?.value).slice(0, 80),
        photographerUrl: md.Artist?.value?.match(/href="([^"]+)"/)?.[1]?.replace(/^\/\//, 'https://'),
        photoUrl: ii?.descriptionurl,
        contentUrl: ii?.thumburl ?? ii?.url,
        width: ii?.width,
        height: ii?.height,
        license: strip(md.LicenseShortName?.value),
      };
    })
    .filter((c) => c.width >= 1000 && /^(cc0|cc by|cc-by|public domain|pd)/i.test(c.license));
}

async function search() {
  const file = path.join(CACHE, 'stock-candidates.json');
  let all = {};
  try {
    all = JSON.parse(await fs.readFile(file, 'utf8'));
  } catch {}
  // Pixabay returns 403 to scripts after a few requests; we don't work around that, so it is only tried once.
  let pixabayBlocked = false;
  for (const term of TERMS) {
    const sources = [['commons', searchCommons]];
    if (!pixabayBlocked) sources.unshift(['pixabay', searchPixabay]);
    for (const [name, fn] of sources) {
      const key = `${name}:${term}`;
      if (all[key]?.length) continue;
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          all[key] = await fn(term);
          console.log(`${key}: ${all[key].length}`);
          break;
        } catch (e) {
          console.warn(`${key}: ${e.message.slice(0, 60)}`);
          if (name === 'pixabay') {
            pixabayBlocked = true;
            break;
          }
          await sleep(15000 * (attempt + 1)); // back off when Commons asks us to slow down
        }
      }
      await sleep(3000);
    }
    await fs.writeFile(file, JSON.stringify(all, null, 2));
  }
}

// Pixabay search pages don't carry the photographer; read it from the photo page for chosen photos only.
async function pixabayAuthor(photoUrl) {
  try {
    const html = await (await fetch(photoUrl, { headers: { 'User-Agent': UA } })).text();
    const m = html.match(/href="\/users\/([^"\/]+)\/"/);
    if (!m) return {};
    const name = m[1].replace(/-\d+$/, '');
    return { photographer: name, photographerUrl: `https://pixabay.com/users/${m[1]}/` };
  } catch {
    return {};
  }
}

async function download() {
  const manifest = JSON.parse(await fs.readFile(path.join(ROOT, 'scripts', 'stock-manifest.json'), 'utf8'));
  const candidates = JSON.parse(await fs.readFile(path.join(CACHE, 'stock-candidates.json'), 'utf8'));
  const byId = {};
  for (const list of Object.values(candidates)) for (const c of list) byId[c.id] = c;
  await fs.mkdir(path.join(CACHE, 'stock'), { recursive: true });
  const credits = [];
  const prev = {};
  try {
    for (const p of JSON.parse(await fs.readFile(path.join(ROOT, 'content', 'credits.json'), 'utf8'))) prev[p.id] = p;
  } catch {}
  for (const entry of manifest) {
    const c = byId[entry.id];
    if (!c) {
      console.warn(`missing candidate ${entry.id}`);
      continue;
    }
    const dest = path.join(CACHE, 'stock', `${entry.group}__${entry.slug}.jpg`);
    try {
      await fs.access(dest);
    } catch {
      let res;
      for (let attempt = 0; attempt < 4; attempt++) {
        res = await fetch(c.contentUrl, { headers: { 'User-Agent': 'KisanBandhuAssetScript/0.1 (dev-time asset fetch; https://kisanbandhu.in)' } });
        if (res.status !== 429) break;
        await sleep(20000 * (attempt + 1)); // honour the rate limit
      }
      if (!res.ok) {
        console.warn(`download failed ${entry.id}: ${res.status}`);
        continue;
      }
      await fs.writeFile(dest, Buffer.from(await res.arrayBuffer()));
      console.log(`↓ ${entry.group}/${entry.slug}`);
      await sleep(2500);
    }
    const author = c.source === 'Pixabay' ? (prev[entry.id] ?? (await pixabayAuthor(c.photoUrl))) : c;
    credits.push({
      id: entry.id,
      file: `/images/${entry.group}/${entry.slug}.webp`,
      alt: entry.alt,
      source: c.source,
      photographer: author.photographer || 'Unknown',
      photographerUrl: author.photographerUrl,
      photoUrl: c.photoUrl,
      license: c.license,
    });
  }
  await fs.writeFile(path.join(ROOT, 'content', 'credits.json'), JSON.stringify(credits, null, 2) + '\n');
  console.log(`credits.json: ${credits.length} photos`);
}

await loadEnv();
await fs.mkdir(CACHE, { recursive: true });
if (process.argv[2] === 'search') await search();
else await download();
