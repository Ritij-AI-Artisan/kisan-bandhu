'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import ProductCard from '@/components/products/ProductCard';
import { CATEGORIES, CROPS, MANUFACTURERS, PRODUCTS, type Category, type Crop } from '@/content/products';

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`press min-h-11 shrink-0 whitespace-nowrap rounded-full px-4 text-sm font-semibold transition ${active ? 'bg-kb-green text-white' : 'bg-white text-kb-ink ring-1 ring-kb-ink/15 hover:bg-kb-sage'}`}
    >
      {children}
    </button>
  );
}

/** Category tabs + manufacturer + crop filters, all synced to ?cat=&mfr=&crop= */
export default function Catalogue() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const cat = params.get('cat') as Category | null;
  const mfr = params.get('mfr');
  const crop = params.get('crop') as Crop | null;

  const set = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`${pathname}${next.toString() ? `?${next}` : ''}`, { scroll: false });
  };

  const list = useMemo(
    () => PRODUCTS.filter((p) => (!cat || p.category === cat) && (!mfr || p.manufacturerSlug === mfr) && (!crop || p.crops.includes(crop))),
    [cat, mfr, crop],
  );

  return (
    <div>
      <div role="tablist" aria-label="Category" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        <Chip active={!cat} onClick={() => set('cat', null)}>
          All
        </Chip>
        {CATEGORIES.map((c) => (
          <Chip key={c.id} active={cat === c.id} onClick={() => set('cat', c.id)}>
            {c.label}
          </Chip>
        ))}
      </div>
      <p className="mt-5 text-sm font-bold uppercase tracking-wider text-kb-stone">Manufacturer</p>
      <div className="no-scrollbar -mx-4 mt-2 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        <Chip active={!mfr} onClick={() => set('mfr', null)}>
          All
        </Chip>
        {MANUFACTURERS.map((m) => (
          <Chip key={m.slug} active={mfr === m.slug} onClick={() => set('mfr', m.slug)}>
            {m.name}
          </Chip>
        ))}
      </div>
      <p className="mt-5 text-sm font-bold uppercase tracking-wider text-kb-stone">Crop</p>
      <div className="no-scrollbar -mx-4 mt-2 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        <Chip active={!crop} onClick={() => set('crop', null)}>
          All crops
        </Chip>
        {CROPS.map((c) => (
          <Chip key={c} active={crop === c} onClick={() => set('crop', c)}>
            {c}
          </Chip>
        ))}
      </div>

      <p className="mt-8 text-kb-stone" aria-live="polite">
        {list.length} product{list.length === 1 ? '' : 's'}
      </p>
      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p.slug} p={p} />
        ))}
      </div>
      {list.length === 0 && <p className="mt-6 rounded-[20px] bg-kb-husk p-6">No products match these filters yet. Try another crop or manufacturer.</p>}
      <p className="mt-8 text-sm text-kb-stone">* Pay from harvest: credit, where offered, comes only from RBI-regulated partner banks and NBFCs. Kisan Bandhu does not lend.</p>
    </div>
  );
}
