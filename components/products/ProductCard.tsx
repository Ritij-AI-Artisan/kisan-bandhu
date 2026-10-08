'use client';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import type { Product } from '@/content/products';
import { categoryLabel } from '@/content/products';
import { waLink } from '@/content/site';

const inr = new Intl.NumberFormat('en-IN');

export default function ProductCard({ p }: { p: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-white shadow-kb ring-1 ring-kb-ink/5 transition-transform duration-300 hover:-translate-y-1">
      <Link href={`/products/${p.slug}`} className="relative block aspect-square overflow-hidden bg-kb-ricepaper" aria-label={`${p.name} by ${p.manufacturer}`}>
        <Image
          src={p.image}
          alt={`${p.name} pack — ${p.manufacturer}`}
          fill
          sizes="(min-width:1024px) 300px, (min-width:640px) 45vw, 85vw"
          unoptimized={p.image.endsWith('.svg')}
          className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider text-kb-terracotta">{categoryLabel(p.category)}</span>
        {p.crops.length > 0 && (
          <span className="pointer-events-none absolute inset-x-3 bottom-3 rounded-xl bg-kb-forest-night/90 px-3 py-2 text-xs font-semibold text-kb-ricepaper opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Which crop is this for? {p.crops.join(', ')}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-bold leading-snug">
          <Link href={`/products/${p.slug}`} className="hover:text-kb-green">
            {p.name}
          </Link>
        </h3>
        <p className="text-sm text-kb-stone">{p.manufacturer}</p>
        {p.composition && <p className="mt-2 font-mono text-[0.78rem] leading-snug text-kb-ink/80">{p.composition}</p>}
        {p.crops.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.crops.map((c) => (
              <span key={c} className="rounded-full bg-kb-sage px-2 py-0.5 text-xs font-semibold text-kb-green">
                {c}
              </span>
            ))}
          </div>
        )}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {p.tags?.map((t) => (
            <span key={t} className="rounded-full bg-kb-husk px-2 py-0.5 text-[0.7rem] font-semibold text-kb-ink/80">
              {t === 'Credit eligible' ? 'Pay from harvest*' : t}
            </span>
          ))}
        </div>
        <div className="mt-auto pt-4">
          {p.demoPrice && (
            <p className="flex flex-wrap items-baseline gap-x-2 text-sm">
              <span className="font-mono text-kb-stone line-through">₹{inr.format(p.demoPrice.mrp)}</span>
              <span className="font-mono text-lg font-medium text-kb-green">₹{inr.format(p.demoPrice.pooled)}</span>
              <span className="text-kb-stone">/ {p.demoPrice.unit}</span>
              <span className="rounded bg-kb-sky-wash px-1.5 text-[0.65rem] font-bold uppercase text-kb-monsoon">Illustrative</span>
            </p>
          )}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <a
              href={waLink(`Namaskara, I want advice on ${p.name} (${p.manufacturer}) for my crop.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="press inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-kb-green px-3 text-sm font-bold text-white"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2} /> Ask an agronomist
            </a>
            <Link href={`/products/${p.slug}`} className="press inline-flex min-h-11 items-center justify-center rounded-full px-3 text-sm font-bold ring-[1.5px] ring-kb-ink">
              Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
