'use client';
import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { HandCoins, Scale, Sprout, Tractor, UserPlus, type LucideIcon } from 'lucide-react';
import Section, { SectionHeading } from '@/components/ui/Section';
import { useLang } from '@/components/layout/LangProvider';

const STEPS: LucideIcon[] = [UserPlus, Sprout, Tractor, Scale, HandCoins];

/** 5-step flow with a connecting line that fills as you scroll (horizontal on desktop, vertical on mobile). */
export default function HowItWorks() {
  const { t } = useLang();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <Section tone="rice" id="how-it-works">
      <SectionHeading eyebrow={t('how.eyebrow')} title={t('how.title')} center />
      <ol ref={ref} className="relative mx-auto mt-14 grid max-w-6xl gap-10 md:grid-cols-5 md:gap-6">
        {/* track + fill */}
        <span aria-hidden className="absolute left-7 top-7 h-[calc(100%-56px)] w-1 rounded-full bg-kb-sage md:left-[10%] md:top-7 md:h-1 md:w-[80%]" />
        <motion.span aria-hidden className="absolute left-7 top-7 hidden h-1 w-[80%] origin-left rounded-full bg-kb-green md:left-[10%] md:block" style={{ scaleX: fill }} />
        <motion.span aria-hidden className="absolute left-7 top-7 h-[calc(100%-56px)] w-1 origin-top rounded-full bg-kb-green md:hidden" style={{ scaleY: fill }} />
        {STEPS.map((Icon, i) => (
          <li key={i} className="relative flex gap-5 md:flex-col md:items-center md:text-center">
            <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full bg-kb-sage text-kb-green ring-8 ring-kb-ricepaper">
              <Icon className="h-6 w-6" strokeWidth={1.75} />
              <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-kb-gold font-mono text-xs font-medium text-kb-ink">{i + 1}</span>
            </span>
            <div className="md:mt-4">
              <h3 className="text-lg font-bold">{t(`how.s${i + 1}`)}</h3>
              <p className="mt-1 text-[0.95rem] text-kb-ink/75">{t(`how.s${i + 1}b`)}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
