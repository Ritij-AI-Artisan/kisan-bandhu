'use client';
import { Bot, Drill, Droplets, FlaskConical, GraduationCap, HandCoins, Leaf, LineChart, Plane, Sprout, Tractor, TrendingUp, Users, Warehouse, type LucideIcon } from 'lucide-react';
import Marquee from '@/components/motion/Marquee';
import LogoMark from '@/components/brand/LogoMark';
import { useLang } from '@/components/layout/LangProvider';

const ICONS: LucideIcon[] = [Sprout, Leaf, FlaskConical, Tractor, Plane, Drill, Users, Bot, Warehouse, LineChart, TrendingUp, GraduationCap, HandCoins];

const CROPS = [
  { local: 'ಅಡಿಕೆ', en: 'Arecanut' },
  { local: 'ತೆಂಗು', en: 'Coconut' },
  { local: 'ಕಾಳುಮೆಣಸು', en: 'Pepper' },
  { local: 'ಕಾಫಿ', en: 'Coffee' },
  { local: 'ಗೇರು', en: 'Cashew' },
];

/** Marquee band 1 — services row (left) + crops row in Kannada (right), with our own mark as the divider. */
export default function BringTogether() {
  const { t, tList } = useLang();
  const items = tList('marquee.items');
  return (
    <section className="overflow-x-clip bg-kb-ricepaper py-12 md:py-16" aria-labelledby="bring-together">
      <h2 id="bring-together" className="eyebrow mb-6 text-center">
        {t('marquee.title')}
      </h2>
      <Marquee duration={48} label={t('marquee.title')}>
        {items.map((label, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <span key={label} className="flex items-center">
              <span className="mx-2 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-4 py-2.5 font-semibold text-kb-ink shadow-kb ring-1 ring-kb-ink/5">
                <Icon className="h-5 w-5 text-kb-green" strokeWidth={1.75} aria-hidden />
                {label}
              </span>
              {i % 4 === 3 && <LogoMark className="mx-3 h-7 w-7" />}
            </span>
          );
        })}
      </Marquee>
      <Marquee duration={30} direction="right" className="mt-4" label="Crops we support">
        {CROPS.map((c) => (
          <span key={c.en} className="flex items-center">
            <span className="mx-2 inline-flex items-baseline gap-2 whitespace-nowrap rounded-full bg-kb-sage px-5 py-2.5 text-kb-ink">
              <span lang="kn" className="text-lg font-bold" style={{ fontFamily: 'var(--ff-kn)' }}>
                {c.local}
              </span>
              <span className="font-display text-lg italic">{c.en}</span>
            </span>
            <Droplets className="mx-2 h-4 w-4 text-kb-areca" aria-hidden />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
