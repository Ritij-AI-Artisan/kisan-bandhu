import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AlertTriangle, ArrowLeft, BadgeCheck, ExternalLink, HandCoins, MessageCircle, Package, Users, Warehouse } from 'lucide-react';
import Section, { Container } from '@/components/ui/Section';
import DemoBadge from '@/components/brand/DemoBadge';
import ProductCard from '@/components/products/ProductCard';
import { PRODUCTS, categoryLabel, getProduct } from '@/content/products';
import { waLink } from '@/content/site';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return { title: `${p.name} — ${p.manufacturer}`, description: `${p.name} by ${p.manufacturer}${p.composition ? ` (${p.composition})` : ''}. Demo listing on Kisan Bandhu.`, alternates: { canonical: `/products/${p.slug}` } };
}

const inr = new Intl.NumberFormat('en-IN');
const SOURCE_LABEL = { official: "Specs from manufacturer's site", listing: 'Specs from a marketplace listing', workbook: 'Specs from our manufacturer research — to be verified', govt: 'Specs from a Government / public source' };

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const related = PRODUCTS.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 4);
  const rows: [string, string | undefined][] = [
    ['Manufacturer', `${p.manufacturer} (${p.ownership})`],
    ['Category', categoryLabel(p.category)],
    ['Composition', p.composition],
    ['Formulation', p.formulation],
    ['Plantation crops', p.crops.length ? p.crops.join(', ') : undefined],
    ['Targets', p.targets?.join(', ')],
    ['Pack sizes', p.packSizes?.join(' · ')],
    ['Dose', p.dose],
  ];
  const isPesticide = p.category === 'fungicide' || p.category === 'bio';

  return (
    <>
      <section className="bg-kb-husk">
        <Container className="pb-14 pt-[calc(var(--header-h)+32px)]">
          <Link href="/products" className="inline-flex min-h-11 items-center gap-2 font-semibold text-kb-green">
            <ArrowLeft className="h-4 w-4" /> All products
          </Link>
          <div className="mt-4 grid gap-10 lg:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-[24px] bg-kb-ricepaper shadow-kb">
              <Image src={p.image} alt={`${p.name} pack — ${p.manufacturer}`} fill priority sizes="(min-width:1024px) 50vw, 100vw" unoptimized={p.image.endsWith('.svg')} className="object-contain p-6" />
              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-xs text-kb-stone">
                Image: {p.imageSource === 'official' ? 'manufacturer' : p.imageSource === 'listing' ? 'marketplace listing' : 'placeholder'}
              </span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-kb-terracotta">{categoryLabel(p.category)}</span>
                <DemoBadge />
                {!p.verified && <span className="rounded-full bg-kb-husk px-2.5 py-0.5 text-xs font-bold text-kb-terracotta ring-1 ring-kb-terracotta/30">Specs pending verification</span>}
              </div>
              <h1 className="h2 mt-4">{p.name}</h1>
              <p className="mt-1 text-lg text-kb-stone">{p.manufacturer}</p>
              {p.composition && <p className="mt-4 font-mono text-kb-ink/85">{p.composition}</p>}
              {p.demoPrice && (
                <p className="mt-5 flex flex-wrap items-baseline gap-x-3">
                  <span className="font-mono text-kb-stone line-through">₹{inr.format(p.demoPrice.mrp)}</span>
                  <span className="font-mono text-3xl text-kb-green">₹{inr.format(p.demoPrice.pooled)}</span>
                  <span className="text-kb-stone">/ {p.demoPrice.unit} · pooled price</span>
                  <span className="rounded bg-kb-sky-wash px-2 text-xs font-bold uppercase text-kb-monsoon">Illustrative</span>
                </p>
              )}
              <a
                href={waLink(`Namaskara, I want advice on ${p.name} (${p.manufacturer}) for my crop.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="press mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-kb-green px-6 font-bold text-white"
              >
                <MessageCircle className="h-5 w-5" /> Ask an agronomist
              </a>
              <dl className="mt-8 divide-y divide-kb-ink/10 rounded-[20px] bg-kb-ricepaper ring-1 ring-kb-ink/10">
                {rows
                  .filter((r): r is [string, string] => !!r[1])
                  .map(([k, v]) => (
                    <div key={k} className="grid gap-1 px-4 py-3 sm:grid-cols-[150px_1fr] sm:gap-4">
                      <dt className="text-sm font-bold text-kb-stone">{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
              </dl>
              {p.notes && (
                <ul className="mt-4 list-disc space-y-1 pl-5 text-kb-ink/85">
                  {p.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              )}
              <a href={p.specSourceUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-kb-green underline underline-offset-4">
                {SOURCE_LABEL[p.specSource]} <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {isPesticide && (
        <div className="bg-kb-alert text-white">
          <Container className="flex items-center gap-3 py-4 font-semibold">
            <AlertTriangle className="h-6 w-6 shrink-0" /> Use only as per label. Wear gloves and mask. Keep away from children.
          </Container>
        </div>
      )}

      <Section tone="rice" tight>
        <h2 className="h2">How Kisan Bandhu helps</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            [BadgeCheck, 'Genuine product from the manufacturer or an authorised distributor'],
            [Users, 'Pooled-buy price when your village orders together'],
            [HandCoins, 'Credit through a partner lender*'],
            [Warehouse, 'Pickup at your village hub'],
            [Package, 'AI + agronomist dose advice'],
          ].map(([Icon, text], i) => {
            const I = Icon as typeof BadgeCheck;
            return (
              <div key={i} className="rounded-[20px] bg-kb-sage p-5">
                <I className="h-7 w-7 text-kb-green" strokeWidth={1.75} />
                <p className="mt-3 font-semibold">{text as string}</p>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-sm text-kb-stone">* Credit, where offered, comes only from RBI-regulated banks and NBFCs. Kisan Bandhu does not lend. Kisan Bandhu is not yet an authorised seller of this product.</p>
        {related.length > 0 && (
          <>
            <h2 className="h3 mt-14">Related products</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <ProductCard key={r.slug} p={r} />
              ))}
            </div>
          </>
        )}
      </Section>
    </>
  );
}
