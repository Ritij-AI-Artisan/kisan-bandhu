'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { photo } from '@/content/images';
import { useLang } from '@/components/layout/LangProvider';
import { buttonClass } from '@/components/ui/Button';
import DemoBadge from '@/components/brand/DemoBadge';
import { AdvanceCard, TrustScoreCard, VerifiedLotCard, VoiceChatPhone } from './PhoneMockup';

const SLIDES = ['hero/areca-mist-coorg', 'hero/coconut-grove', 'hero/coffee-pepper-shade', 'hero/areca-palms', 'hero/farmer-portrait', 'hero/village'].map(photo);

export default function Hero() {
  const { t } = useLang();
  const [i, setI] = useState(0);
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0]));

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      if (document.hidden) return;
      setI((n) => {
        const next = (n + 1) % SLIDES.length;
        setLoaded((s) => new Set(s).add(next).add((next + 1) % SLIDES.length));
        return next;
      });
    }, 6500);
    // Warm the next slide after first paint.
    const warm = setTimeout(() => setLoaded((s) => new Set(s).add(1)), 2500);
    return () => {
      clearInterval(id);
      clearTimeout(warm);
    };
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-kb-forest-night text-kb-ricepaper lg:min-h-[100svh]" aria-label="Introduction">
      {/* Slideshow */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        {SLIDES.map((s, n) =>
          loaded.has(n) ? (
            <div key={s.src} className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out" style={{ opacity: n === i ? 1 : 0 }}>
              <Image
                src={s.src}
                alt=""
                fill
                sizes="100vw"
                priority={n === 0}
                fetchPriority={n === 0 ? 'high' : 'auto'}
                placeholder={s.blurDataURL ? 'blur' : 'empty'}
                blurDataURL={s.blurDataURL}
                className={`object-cover ${n === i ? 'kenburns' : ''}`}
              />
            </div>
          ) : null,
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-kb-forest-night/95 via-kb-forest-night/70 to-kb-forest-night/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-kb-forest-night/80 via-transparent to-kb-forest-night/40" />
      </div>
      <p className="sr-only">Background photos: {SLIDES.map((s) => s.alt).join('; ')}.</p>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-[calc(var(--header-h)+48px)] sm:px-6 lg:min-h-[100svh] lg:grid-cols-[1.15fr_1fr] lg:px-8 lg:pb-20">
        <div className="max-w-2xl">
          <p className="eyebrow on-dark">{t('hero.eyebrow')}</p>
          <h1 className="h1 mt-4 text-balance">
            {t('hero.titleA')}{' '}
            <span className="accent-word lime-stroke draw text-kb-sprout-lime">{t('hero.titleTrusted')}</span> {t('hero.titleB')}
          </h1>
          <p className="accent-word mt-5 text-2xl text-kb-ricepaper sm:text-3xl">{t('hero.sub')}</p>
          <p className="mt-1 text-lg text-kb-ricepaper/80">
            <span lang="kn" style={{ fontFamily: 'var(--ff-kn)' }}>
              ಕಿಸಾನ್ ಬಂಧು
            </span>{' '}
            ·{' '}
            <span lang="hi" style={{ fontFamily: 'var(--ff-hi)' }}>
              किसान बंधु
            </span>
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/farmers" className={buttonClass('gold', 'lg', 'w-full sm:w-auto')}>
              {t('hero.farmer')} <ArrowRight className="h-5 w-5" strokeWidth={2} />
            </Link>
            <Link href="/partners" className={buttonClass('ghost-light', 'lg', 'w-full sm:w-auto')}>
              {t('hero.partner')}
            </Link>
            <Link href="/investors" className={buttonClass('ghost-light', 'lg', 'w-full sm:w-auto')}>
              {t('hero.investor')}
            </Link>
          </div>
          <p className="mt-6 text-sm font-semibold text-kb-ricepaper/80">{t('hero.trust')}</p>
        </div>

        {/* Phone mock-up with floating cards */}
        <div className="relative mx-auto h-[450px] w-full max-w-[460px] sm:h-[560px] lg:h-[600px]">
          <div className="absolute left-1/2 top-4 origin-top -translate-x-1/2 scale-[0.8] sm:scale-100">
            <div className="float">
              <VoiceChatPhone />
            </div>
            <div className="mt-3 flex justify-center">
              <DemoBadge className="bg-kb-ricepaper" />
            </div>
          </div>
          <VerifiedLotCard className="float absolute -left-4 top-24 hidden sm:block" style={{ animationDelay: '-2s' }} />
          <TrustScoreCard className="float absolute -right-6 top-6 hidden sm:block" style={{ animationDelay: '-4s' }} />
          <AdvanceCard className="float absolute -right-2 bottom-10 hidden sm:block" style={{ animationDelay: '-1s' }} />
        </div>
      </div>
    </section>
  );
}
