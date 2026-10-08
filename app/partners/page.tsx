import type { Metadata } from 'next';
import { BarChart3, Factory, Landmark, Plane, ShieldCheck, ShoppingCart, Tractor, Truck, Users, Warehouse } from 'lucide-react';
import PageHero from '@/components/sections/PageHero';
import Section, { SectionHeading } from '@/components/ui/Section';
import ProductsTeaser from '@/components/sections/ProductsTeaser';
import FilloutEmbed from '@/components/forms/FilloutEmbed';
import { FORMS } from '@/content/forms';

export const metadata: Metadata = {
  title: 'For Manufacturers & Partners',
  description: 'Reach plantation farmers directly through village hubs, pooled orders and a genuine-product promise. For input manufacturers, equipment owners, drone operators, lenders and buyers.',
  alternates: { canonical: '/partners' },
};

const WHY = [
  { icon: Users, t: 'Direct access to plantation farmers', b: 'Arecanut, coconut, pepper, coffee and cashew growers across five southern states.' },
  { icon: Warehouse, t: 'Village hub distribution', b: 'One hub for every 10–15 villages handles storage, pickup and last-mile delivery.' },
  { icon: ShoppingCart, t: 'Pooled, predictable orders', b: 'Village-level group orders mean bigger, earlier and more predictable demand.' },
  { icon: ShieldCheck, t: 'Genuine-product promise', b: 'Sourcing only from manufacturers and authorised distributors fights counterfeits.' },
  { icon: BarChart3, t: 'Demand data by crop and village', b: 'Plan production and stock with aggregated, consented demand signals.' },
];
const STEPS = ['Apply', 'Verify licences — dealer licence, CIB&RC registration (pesticides), FCO compliance (fertilisers)', 'Onboard your catalogue', 'Orders flow via hubs', 'Settlement'];
const TYPES = [
  { icon: Factory, t: 'Input manufacturers & distributors' },
  { icon: Tractor, t: 'Equipment owners & suppliers' },
  { icon: Plane, t: 'Drone operators' },
  { icon: Landmark, t: 'Lenders (banks / NBFCs)' },
  { icon: Truck, t: 'Buyers (processors & exporters)' },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero eyebrow="For manufacturers & partners" title="Reach plantation farmers, village by village" lead="List genuine products, rent out machines, lend through a trusted channel, or buy verified produce — all through Kisan Bandhu village hubs.">
        <p className="mt-4 text-sm text-kb-stone">This page is in English only for now.</p>
      </PageHero>
      <Section tone="rice">
        <SectionHeading eyebrow="Why list with us" title="A trusted channel into the plantation belt" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map(({ icon: Icon, t, b }) => (
            <div key={t} className="rounded-[20px] bg-kb-husk p-6 shadow-kb">
              <Icon className="h-8 w-8 text-kb-green" strokeWidth={1.75} />
              <h3 className="h3 mt-4">{t}</h3>
              <p className="mt-2 text-kb-ink/80">{b}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section tone="forest">
        <SectionHeading eyebrow="How listing works" title="Five steps from application to settlement" />
        <ol className="mt-10 grid gap-4 md:grid-cols-5">
          {STEPS.map((s, i) => (
            <li key={s} className="rounded-[20px] bg-kb-deep-canopy p-5">
              <span className="font-mono text-3xl text-kb-sprout-lime">0{i + 1}</span>
              <p className="mt-2 font-semibold">{s}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section tone="rice">
        <SectionHeading eyebrow="Partner types" title="Who we work with" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {TYPES.map(({ icon: Icon, t }) => (
            <div key={t} className="flex flex-col items-start gap-3 rounded-[20px] bg-kb-sage p-5 font-bold">
              <Icon className="h-7 w-7 text-kb-green" strokeWidth={1.75} /> {t}
            </div>
          ))}
        </div>
      </Section>
      <ProductsTeaser title="See how your products would appear" />
      <Section tone="rice" id="enquire">
        <SectionHeading eyebrow="Partner enquiry" title="Let’s talk" lead="Tell us who you are and how you’d like to work with plantation farmers." />
        <div className="mt-8 max-w-3xl">
          <FilloutEmbed id={FORMS.partner} context="a partnership with Kisan Bandhu" />
        </div>
      </Section>
    </>
  );
}
