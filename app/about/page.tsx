import type { Metadata } from 'next';
import PageHero from '@/components/sections/PageHero';
import Section, { SectionHeading } from '@/components/ui/Section';
import Photo from '@/components/ui/Photo';
import Marquee from '@/components/motion/Marquee';
import { TEAM } from '@/content/team';

export const metadata: Metadata = {
  title: 'About',
  description: 'Kisan Bandhu — Har kadam, kisan ke saath. Our mission, story, team and values.',
  alternates: { canonical: '/about' },
};

const STRIP = ['about/western-ghats', 'crops/arecanut-bunch', 'about/idukki-hills', 'crops/coffee-estate', 'about/karnataka-paddy', 'hero/coconut-grove', 'about/sahyadri', 'crops/pepper-poles'];
const VALUES = [
  ['Fair pricing', 'Open price breakdowns. Farmers see what they get.'],
  ['Genuine products', 'Only from manufacturers and authorised distributors.'],
  ['Farmers first', 'Every decision starts with what helps the farmer.'],
  ['Local jobs', 'Hubs, agents and crews hired from the villages we serve.'],
];

export default function AboutPage() {
  return (
    <>
      <PageHero tone="dark" photo="about/western-ghats" eyebrow="About Kisan Bandhu" title="Har kadam, kisan ke saath" lead="With the farmer at every step — from buying inputs to selling the harvest." />
      <Section tone="rice">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Mission" title="Make plantation farming fair, modern and profitable" />
            <p className="lead mt-6">
              Plantation farmers grow some of India’s most valuable crops, yet they buy inputs at retail, sell at the worst time and borrow at the highest rates. We are building one trusted partner for the
              whole season.
            </p>
          </div>
          <div>
            <SectionHeading eyebrow="Our story" title="Why we started" />
            {/* TODO: founders to write the real story */}
            <p className="mt-6 rounded-[20px] border-2 border-dashed border-kb-ink/15 p-5 text-kb-stone">[Story placeholder — how the founders met plantation farmers, what they saw, and why they chose to build Kisan Bandhu.]</p>
            <p className="mt-4 rounded-[20px] border-2 border-dashed border-kb-ink/15 p-5 text-kb-stone">[Story placeholder — what the first months of field research taught us.]</p>
          </div>
        </div>
      </Section>
      <section className="overflow-x-clip bg-kb-husk py-10" aria-label="Landscapes of the plantation belt">
        <Marquee duration={60}>
          {STRIP.map((k) => (
            <Photo key={k} k={k} sizes="320px" className="mx-2 h-48 w-72 shrink-0 rounded-[24px] md:h-60 md:w-96" />
          ))}
        </Marquee>
      </section>
      <Section tone="rice">
        <SectionHeading eyebrow="Team" title="Founders" />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {TEAM.map((m) => (
            <div key={m.name} className="rounded-[20px] bg-kb-husk p-6">
              <span className="grid h-24 w-24 place-items-center rounded-full bg-kb-sage font-display text-3xl font-bold text-kb-green">{m.initials}</span>
              <p className="mt-4 text-xl font-bold">{m.name}</p>
              <p className="text-kb-stone">{m.role}</p>
            </div>
          ))}
          <div className="grid place-items-center rounded-[20px] border-2 border-dashed border-kb-ink/15 p-6 text-kb-stone">Advisors — coming soon</div>
        </div>
      </Section>
      <Section tone="forest">
        <SectionHeading eyebrow="Values" title="What we stand for" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(([t, b]) => (
            <div key={t} className="rounded-[20px] bg-kb-deep-canopy p-6">
              <p className="h3 text-kb-sprout-lime">{t}</p>
              <p className="mt-2 text-kb-ricepaper/85">{b}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
