'use client';
import { BadgeCheck, HeartHandshake, Lock, Scale } from 'lucide-react';
import Section, { SectionHeading } from '@/components/ui/Section';
import Photo from '@/components/ui/Photo';
import SlideCarousel from '@/components/motion/SlideCarousel';
import { PARTNER_LOGOS_APPROVED } from '@/content/flags';

const PROMISES = [
  { icon: BadgeCheck, label: 'Genuine products' },
  { icon: Scale, label: 'Fair, open pricing' },
  { icon: HeartHandshake, label: 'Farmers first' },
  { icon: Lock, label: 'Your data is never sold' },
];
const VOICES = ['people/woman-farmer', 'people/coconut-climber', 'people/tree-climber', 'hero/farmer-portrait'];

export default function Trust() {
  return (
    <Section tone="rice" id="trust">
      <SectionHeading eyebrow="Trust" title="Built on promises we can keep" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PROMISES.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3 rounded-[20px] bg-kb-sage p-5 font-bold">
            <Icon className="h-7 w-7 shrink-0 text-kb-green" strokeWidth={1.75} /> {label}
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-[20px] border-2 border-dashed border-kb-ink/15 p-6 text-center text-kb-stone">
        {PARTNER_LOGOS_APPROVED ? null : 'Partner logos coming soon — onboarding in progress'}
      </div>

      <h3 className="h3 mt-14">Farmer voices</h3>
      <div className="mt-6">
        <SlideCarousel label="Farmer voices (placeholders)" autoplayMs={5000}>
          {VOICES.map((k) => (
            <figure key={k} className="overflow-hidden rounded-[20px] bg-kb-husk shadow-kb">
              <Photo k={k} sizes="(min-width:1024px) 33vw, 85vw" className="aspect-[4/3]" />
              <figcaption className="p-5">
                <p className="text-kb-ink/80">Farmer testimonials will appear here with their consent.</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-kb-stone">Representative image</p>
              </figcaption>
            </figure>
          ))}
        </SlideCarousel>
      </div>
    </Section>
  );
}
