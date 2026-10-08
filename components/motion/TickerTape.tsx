'use client';
import { useEffect, useState } from 'react';
import { DEMO_RATES } from '@/content/rates-demo';
import { useLang } from '@/components/layout/LangProvider';
import Marquee from './Marquee';

const inr = new Intl.NumberFormat('en-IN');

/** Infinite rates strip with small random ▲/▼ moves every few seconds. Demo values only. */
export default function TickerTape() {
  const { t } = useLang();
  const [rates, setRates] = useState(() => DEMO_RATES.map((r) => ({ ...r, delta: 0 })));

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      if (document.hidden) return;
      setRates((prev) =>
        prev.map((r) => {
          if (Math.random() > 0.45) return r;
          const delta = Math.round(r.price * (Math.random() - 0.48) * 0.012);
          return { ...r, price: r.price + delta, delta };
        }),
      );
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative flex items-stretch bg-kb-deep-canopy text-kb-ricepaper">
      <div className="relative z-10 flex shrink-0 items-center gap-2 bg-kb-forest-night px-3 py-3 text-[0.68rem] font-bold uppercase tracking-wider text-kb-sprout-lime sm:px-5 sm:text-xs">
        <span className="relative flex h-2 w-2" aria-hidden>
          <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-kb-gold opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-kb-gold" />
        </span>
        <span className="max-w-[7.5rem] leading-tight sm:max-w-none">{t('ticker.label')}</span>
      </div>
      <Marquee duration={60} className="min-w-0 flex-1 py-3" label="Illustrative crop rates">
        {rates.map((r, i) => (
          <span key={i} className="flex items-center gap-2 whitespace-nowrap px-5 font-mono text-sm">
            <span className="font-semibold text-kb-sprout-lime">{r.crop}</span>
            <span className="text-kb-ricepaper/75">
              ({r.grade}) · {r.market}
            </span>
            <span className="tabular-nums">
              ₹{inr.format(r.price)}/{r.unit}
            </span>
            <span className={r.delta >= 0 ? 'text-kb-leaf' : 'text-[#ff8a7a]'}>
              <span aria-hidden>{r.delta >= 0 ? '▲' : '▼'}</span>
              <span className="sr-only">{r.delta >= 0 ? 'up' : 'down'}</span>
              {r.delta !== 0 && <span className="ml-0.5 text-xs">{inr.format(Math.abs(r.delta))}</span>}
            </span>
            <span className="ml-3 text-kb-sprout-lime/40" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
