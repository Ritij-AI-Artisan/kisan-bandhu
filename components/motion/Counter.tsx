'use client';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const fmt = new Intl.NumberFormat('en-IN');

/** Counts up when visible. A null value renders "—" (no fake numbers). */
export default function Counter({ value, prefix = '', suffix = '', className = '' }: { value: number | null; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || value == null) return;
    if (reduce) {
      setN(value);
      return;
    }
    const c = animate(0, value, { duration: 1.6, ease: [0.2, 0.7, 0.2, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className={`font-mono tabular-nums ${className}`}>
      {value == null ? '—' : `${prefix}${fmt.format(n)}${suffix}`}
    </span>
  );
}
