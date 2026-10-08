'use client';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import Section, { SectionHeading } from '@/components/ui/Section';
import Photo from '@/components/ui/Photo';
import ComingSoonBadge from '@/components/brand/ComingSoonBadge';
import Reveal from '@/components/motion/Reveal';
import { useLang } from '@/components/layout/LangProvider';
import HubMap from './HubMap';

export const PLANNED_HUBS = ['Sirsi', 'Puttur', 'Shivamogga', 'Chikkamagaluru', 'Madikeri', 'Tiptur'];

/** Home: village hubs on Forest Night — animated hub map + what happens at a hub. */
export default function HubsBlock() {
  const { t, tList } = useLang();
  return (
    <Section tone="forest" id="hubs">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <HubMap className="mx-auto w-full max-w-[520px]" />
        </Reveal>
        <div className="order-1 lg:order-2">
          <SectionHeading eyebrow={t('hubs.eyebrow')} title={t('hubs.title')} lead={t('hubs.lead')} />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {tList('hubs.list').map((item) => (
              <li key={item} className="flex items-center gap-3 rounded-2xl bg-kb-deep-canopy px-4 py-3 font-semibold">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-kb-sprout-lime text-kb-forest-night">
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <Photo k="hubs/weighing" sizes="(min-width:1024px) 600px, 100vw" className="mt-6 aspect-[16/7] rounded-[24px]" />
          <p className="mt-8 text-sm font-bold uppercase tracking-wider text-kb-sprout-lime">{t('hubs.planned')}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {PLANNED_HUBS.map((h) => (
              <span key={h} className="inline-flex items-center gap-2 rounded-full bg-kb-ricepaper/10 px-3 py-1.5 text-sm font-semibold ring-1 ring-kb-ricepaper/20">
                {h} <ComingSoonBadge kind="planned" />
              </span>
            ))}
          </div>
          <Link href="/hubs" className="mt-8 inline-flex min-h-11 items-center gap-2 font-bold text-kb-sprout-lime underline-offset-4 hover:underline">
            {t('cta.learnMore')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Section>
  );
}
