import Section, { SectionHeading } from '@/components/ui/Section';
import Counter from '@/components/motion/Counter';
import { COUNTERS } from '@/content/site';

export default function Impact() {
  const items = [
    { label: 'Farmers registered', value: COUNTERS.farmers },
    { label: 'Villages covered', value: COUNTERS.villages },
    { label: 'Local jobs created', value: COUNTERS.jobs },
    ...(COUNTERS.lois != null ? [{ label: 'Letters of intent collected', value: COUNTERS.lois }] : []),
  ];
  return (
    <Section tone="forest" id="impact">
      <SectionHeading eyebrow="Impact" title="What we will measure ourselves by" center />
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-3">
        {items.map((i) => (
          <div key={i.label} className="rounded-[20px] bg-kb-deep-canopy p-8 text-center">
            <Counter value={i.value} className="text-6xl font-medium text-kb-sprout-lime" />
            <p className="mt-3 font-display text-xl">{i.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-kb-ricepaper/75">Live once our pilot starts. We will never show made-up numbers.</p>
    </Section>
  );
}
