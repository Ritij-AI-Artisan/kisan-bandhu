'use client';
import { useEffect, useState } from 'react';
import LogoMark from '@/components/brand/LogoMark';

const KEY = 'kb-sprout-shown';

/** Once per session the mark's leaves "grow" (600ms) over a Rice Paper veil. Skipped with reduced motion. */
export default function SproutLoader() {
  const [phase, setPhase] = useState<'hidden' | 'show' | 'out'>('hidden');

  useEffect(() => {
    let seen = true;
    try {
      seen = !!sessionStorage.getItem(KEY);
      sessionStorage.setItem(KEY, '1');
    } catch {}
    if (seen || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setPhase('show');
    const a = setTimeout(() => setPhase('out'), 900);
    const b = setTimeout(() => setPhase('hidden'), 1300);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);

  if (phase === 'hidden') return null;
  return (
    <div aria-hidden className={`pointer-events-none fixed inset-0 z-[100] grid place-items-center bg-kb-ricepaper transition-opacity duration-400 ${phase === 'out' ? 'opacity-0' : 'opacity-100'}`}>
      <LogoMark grow className="h-24 w-24" />
    </div>
  );
}
