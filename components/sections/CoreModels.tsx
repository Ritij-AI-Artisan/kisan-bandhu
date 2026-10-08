'use client';
import Section, { SectionHeading } from '@/components/ui/Section';
import SlideCarousel from '@/components/motion/SlideCarousel';
import ComingSoonBadge from '@/components/brand/ComingSoonBadge';
import { MODELS } from '@/content/models';

export default function CoreModels() {
  return (
    <Section tone="rice" id="models">
      <SectionHeading eyebrow="Our models" title="Ideas proven elsewhere, built for our farmers" />
      <div className="mt-10">
        <SlideCarousel label="Kisan Bandhu models" autoplayMs={4000}>
          {MODELS.map((m) => (
            <article key={m.title} className="flex h-full min-h-[230px] flex-col rounded-[20px] bg-kb-husk p-6 shadow-kb">
              <ComingSoonBadge kind={m.status} label={m.statusLabel} className="self-start" />
              <h3 className="h3 mt-4">{m.title}</h3>
              <p className="mt-2 flex-1 text-kb-ink/80">{m.benefit}</p>
              <p className="mt-4 text-sm text-kb-stone">
                Inspired by <span className="font-semibold text-kb-ink">{m.inspiredBy}</span>
              </p>
            </article>
          ))}
        </SlideCarousel>
      </div>
    </Section>
  );
}
