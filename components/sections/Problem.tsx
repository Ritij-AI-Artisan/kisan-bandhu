'use client';
import { Bug, ShoppingBasket, TrendingDown, type LucideIcon } from 'lucide-react';
import Section, { SectionHeading } from '@/components/ui/Section';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { useLang } from '@/components/layout/LangProvider';

const CARDS: { k: string; icon: LucideIcon; stat: string }[] = [
  { k: 'c1', icon: TrendingDown, stat: '[X% of surveyed farmers sold within a month of harvest — from our farmer survey]' },
  { k: 'c2', icon: ShoppingBasket, stat: '[X% of surveyed farmers bought inputs on trader credit — from our farmer survey]' },
  { k: 'c3', icon: Bug, stat: '[X% of surveyed farmers lost part of a crop to late-detected disease — from our farmer survey]' },
];

export default function Problem() {
  const { t } = useLang();
  return (
    <Section tone="rice" id="problem">
      <SectionHeading eyebrow={t('problem.eyebrow')} title={t('problem.title')} />
      <RevealGroup className="mt-12 grid gap-5 md:grid-cols-3">
        {CARDS.map(({ k, icon: Icon, stat }) => (
          <RevealItem key={k} className="flex flex-col rounded-[20px] bg-kb-husk p-6 shadow-kb">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-kb-ricepaper text-kb-terracotta">
              <Icon className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <h3 className="h3 mt-5">{t(`problem.${k}t`)}</h3>
            <p className="mt-2 text-kb-ink/80">{t(`problem.${k}b`)}</p>
            <p className="mt-auto pt-5">
              <span className="block rounded-xl border-2 border-dashed border-kb-terracotta/35 px-3 py-2 text-sm text-kb-stone">{stat}</span>
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
      <div className="mt-6 grid items-center gap-4 rounded-[20px] bg-kb-forest-night p-6 text-kb-ricepaper md:grid-cols-[auto_1fr] md:gap-8 md:p-8">
        <p className="font-grotesk text-5xl font-extrabold tracking-tight text-kb-sprout-lime md:text-6xl" style={{ fontFamily: 'var(--ff-grotesk)' }}>
          16–25%
        </p>
        <div>
          <p className="text-lg font-semibold">Typical interest farmers pay outside formal lenders — often as trader advances that tie them to selling their crop to that trader.</p>
          <p className="mt-1 text-sm text-kb-ricepaper/70">Source: Inc42, 2025 (as cited in our investor deck)</p>
        </div>
      </div>
    </Section>
  );
}
