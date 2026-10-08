import type { Metadata } from 'next';
import Image from 'next/image';
import PageHero from '@/components/sections/PageHero';
import Section, { SectionHeading } from '@/components/ui/Section';
import Counter from '@/components/motion/Counter';
import Reveal from '@/components/motion/Reveal';
import FilloutEmbed from '@/components/forms/FilloutEmbed';
import { FORMS } from '@/content/forms';
import { COUNTERS } from '@/content/site';
import { TEAM } from '@/content/team';

export const metadata: Metadata = {
  title: 'Investors',
  description: 'Kisan Bandhu is raising a $10M seed round in 2026 to build village hubs, technology and a regulated-lender credit channel for plantation farmers.',
  alternates: { canonical: '/investors' },
  robots: { index: true },
};

const MODEL = [
  ['Input margins', 'Seeds, fertilisers & pesticides'],
  ['Service fees', 'Equipment, drone & worker bookings; hub handling'],
  ['Credit distribution fees', 'Sourcing fees from partner banks / NBFCs'],
  ['Marketplace take rate', 'On verified produce sales'],
  ['Hub services', 'Drying, grading, storage'],
];
const MOATS = ['Hub network — one trusted centre per 10–15 villages', 'Repayment collected at the point of crop sale', 'Farmer data, with consent', 'Pooled demand on both sides', 'Local language, voice-first'];
const PHASES = [
  ['Phase 1 · Months 0–12', 'First 10 hubs in [cluster]; inputs, AI Crop Doctor, equipment & worker booking; 15,000 farmers (target)'],
  ['Phase 2 · Months 12–24', '35 hubs; Hold & Earn and pre-harvest contracts with partner lenders; pooled buying at scale; sensor pilots; 55,000 farmers (target)'],
  ['Phase 3 · Months 24–36', '90 hubs; EBITDA breakeven target; 1.3 lakh farmers; logistics, export buyers & new crops in planning'],
];

export default function InvestorsPage() {
  return (
    <div className="finance">
      <PageHero tone="sky" finance eyebrow="Raising $10M · Seed · 2026" title="Trade with trust. Credit before harvest." lead="We are building the trusted operating network of India’s plantation belt: village hubs, genuine inputs, bookings, a verified marketplace and a credit channel to regulated lenders — one wallet, paid from the harvest." />
      <Section tone="rice">
        <SectionHeading eyebrow="The problem in numbers" title="High-value crops, low-power farmers" />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-[20px] bg-kb-forest-night p-6 text-kb-ricepaper">
            <p className="font-mono text-4xl text-kb-sprout-lime">16–25%</p>
            <p className="mt-2">typical interest outside formal lenders, often as trader advances (Inc42, 2025)</p>
          </div>
          {['[X% of surveyed farmers don’t know the final selling price]', '[X% rely on trader advances]'].map((s) => (
            <div key={s} className="rounded-[20px] border-2 border-dashed border-kb-terracotta/40 p-6 text-kb-stone">
              {s}
              <p className="mt-2 text-xs">Farmer survey in progress</p>
            </div>
          ))}
        </div>
      </Section>
      <Section tone="sky">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Business model" title="How we earn" />
            <ul className="mt-8 divide-y divide-kb-ink/10 rounded-[20px] bg-white">
              {MODEL.map(([a, b]) => (
                <li key={a} className="flex flex-wrap justify-between gap-2 p-4">
                  <span className="font-bold">{a}</span>
                  <span className="text-kb-stone">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Market opportunity" title="TAM · SAM · SOM" />
            <div className="mt-8 space-y-3">
              {['TAM', 'SAM', 'SOM'].map((m, i) => (
                <div key={m} className="flex items-center gap-4 rounded-[20px] bg-white p-5" style={{ marginLeft: i * 24 }}>
                  <span className="font-mono text-2xl font-bold text-kb-monsoon">{m}</span>
                  <span className="text-kb-stone">[to be filled from the deck]</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
      <Section tone="forest">
        <SectionHeading eyebrow="Moats" title="Why this compounds" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {MOATS.map((m, i) => (
            <div key={m} className="rounded-[20px] bg-kb-deep-canopy p-5">
              <span className="font-mono text-kb-sprout-lime">0{i + 1}</span>
              <p className="mt-2 font-semibold">{m}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section tone="rice">
        <SectionHeading eyebrow="Roadmap" title="Three phases to breakeven" />
        <div className="no-scrollbar -mx-4 mt-10 flex snap-x gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {PHASES.map(([h, b], i) => (
            <Reveal key={h} delay={i * 0.12} className="w-[85%] shrink-0 snap-start rounded-[20px] bg-kb-husk p-6 md:w-auto">
              <p className="font-bold text-kb-green">{h}</p>
              <p className="mt-2">{b}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {[
            ['LOIs', COUNTERS.lois],
            ['Partners', COUNTERS.partners],
            ['Pilots', COUNTERS.pilots],
          ].map(([l, v]) => (
            <div key={l as string} className="rounded-[20px] bg-kb-sage p-6 text-center">
              <Counter value={v as number | null} className="text-5xl text-kb-green" />
              <p className="mt-2 font-bold">{l as string}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-sm text-kb-stone">Traction shown as “—” until real numbers exist.</p>
      </Section>
      <Section tone="husk" id="team">
        <SectionHeading eyebrow="Team" title="Built by founders who will live in the plantation belt" />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {TEAM.map((m) => (
            <div key={m.name} className="rounded-[20px] bg-kb-ricepaper p-6 shadow-kb">
              <span className="grid h-24 w-24 place-items-center rounded-full bg-kb-sage font-display text-3xl font-bold text-kb-green">{m.initials}</span>
              <p className="mt-4 text-xl font-bold">{m.name}</p>
              <p className="text-kb-stone">{m.role}</p>
              {/* TODO: real LinkedIn URLs */}
              <a href={m.linkedin} aria-label={`${m.name} on LinkedIn (coming soon)`} className="mt-3 inline-grid h-11 w-11 place-items-center">
                <Image src="/brand/linkedin.svg" alt="" width={24} height={24} unoptimized />
              </a>
            </div>
          ))}
          <div className="grid place-items-center rounded-[20px] border-2 border-dashed border-kb-ink/15 p-6 text-center text-kb-stone">Advisors — coming soon</div>
        </div>
      </Section>
      <Section tone="rice" id="deck">
        <SectionHeading eyebrow="Request the deck" title="Want the full picture?" lead="Tell us a little about you and we’ll share the investor deck directly. The deck is never posted publicly." />
        <div className="mt-8 max-w-3xl">
          <FilloutEmbed id={FORMS.investorDeck} context="the Kisan Bandhu investor deck" />
        </div>
      </Section>
    </div>
  );
}
