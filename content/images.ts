import credits from './credits.json';
import blur from './blur.json';
import sizes from './image-sizes.json';

export type Photo = { src: string; alt: string; width: number; height: number; blurDataURL?: string; representative: boolean };

const byFile = new Map(credits.map((c) => [c.file, c]));

/** Look up a local stock photo by "<group>/<slug>", with alt text, size and blur placeholder. */
export function photo(key: string): Photo {
  const src = `/images/${key}.webp`;
  const c = byFile.get(src);
  const s = (sizes as Record<string, { width: number; height: number }>)[src];
  if (!c || !s) throw new Error(`Unknown photo ${key} — run npm run assets:stock && npm run assets:optimise`);
  return {
    src,
    alt: c.alt,
    width: s.width,
    height: s.height,
    blurDataURL: (blur as Record<string, string>)[src],
    representative: /representative image/i.test(c.alt),
  };
}
