import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageHero from '@/components/sections/PageHero';
import Section from '@/components/ui/Section';
import DemoBadge from '@/components/brand/DemoBadge';
import Catalogue from './Catalogue';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Demo catalogue of fungicides, bio-pesticides, fertilisers, micronutrients and planting material for plantation crops — sourced straight from manufacturers.',
  alternates: { canonical: '/products' },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero eyebrow="Demo catalogue" title="Genuine inputs, sourced straight from manufacturers">
        <div className="mt-5">
          <DemoBadge />
        </div>
        <p className="mt-5 rounded-[20px] bg-kb-ricepaper p-5 text-[0.95rem] text-kb-ink/85 ring-1 ring-kb-ink/10">
          Demo catalogue for illustration. Product names, images and specifications belong to their manufacturers and are shown to explain how Kisan Bandhu will work. Kisan Bandhu is not yet an
          authorised seller of these products. Prices are illustrative. Always read the label and follow the dose on the pack.
        </p>
      </PageHero>
      <Section tone="rice" tight>
        <Suspense fallback={<p>Loading catalogue…</p>}>
          <Catalogue />
        </Suspense>
      </Section>
    </>
  );
}
