'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Section, { SectionHeading } from '@/components/ui/Section';
import SlideCarousel from '@/components/motion/SlideCarousel';
import DemoBadge from '@/components/brand/DemoBadge';
import ProductCard from '@/components/products/ProductCard';
import { PRODUCTS } from '@/content/products';

const PICKS = ['matco-8-64', 'tag-cop', 'nimbecidine-300', 'bio-nematon', 'factamfos-20-20-0-13', 'mahadhan-zn-edta', 'saaf', 'ipl-bioharz'];

export default function ProductsTeaser({ title = 'Inputs farmers trust, at pooled prices' }: { title?: string }) {
  const items = PICKS.map((s) => PRODUCTS.find((p) => p.slug === s)!).filter(Boolean);
  return (
    <Section tone="husk" id="products-teaser">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="Demo catalogue" title={title} />
        <DemoBadge />
      </div>
      <div className="mt-10">
        <SlideCarousel label="Featured products" slideClass="basis-[85%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
          {items.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </SlideCarousel>
      </div>
      <Link href="/products" className="mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-kb-green underline-offset-4 hover:underline">
        View all products <ArrowRight className="h-4 w-4" />
      </Link>
      <p className="mt-2 text-sm text-kb-stone">Product names and images belong to their manufacturers. Kisan Bandhu is not yet an authorised seller. Prices are illustrative.</p>
    </Section>
  );
}
