import type { ReactNode } from 'react';

type Tone = 'rice' | 'husk' | 'sage' | 'sky' | 'forest' | 'canopy';

const TONES: Record<Tone, string> = {
  rice: 'bg-kb-ricepaper text-kb-ink',
  husk: 'bg-kb-husk text-kb-ink',
  sage: 'bg-kb-sage text-kb-ink',
  sky: 'bg-kb-sky-wash text-kb-ink',
  forest: 'bg-kb-forest-night text-kb-ricepaper on-dark leaf-texture',
  canopy: 'bg-kb-deep-canopy text-kb-ricepaper on-dark leaf-texture',
};

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export default function Section({ tone = 'rice', id, className = '', children, tight }: { tone?: Tone; id?: string; className?: string; children: ReactNode; tight?: boolean }) {
  return (
    <section id={id} className={`${TONES[tone]} ${tight ? 'py-14 md:py-20' : 'py-20 md:py-28'} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, lead, center, className = '' }: { eyebrow?: ReactNode; title: ReactNode; lead?: ReactNode; center?: boolean; className?: string }) {
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="h2 text-balance">{title}</h2>
      {lead && <p className="lead mt-4 text-pretty opacity-85">{lead}</p>}
    </div>
  );
}

/** Soft curved divider between light and dark sections (as in the decks). */
export function WaveDivider({ from, to, flip }: { from: string; to: string; flip?: boolean }) {
  return (
    <div aria-hidden className="relative -mt-px h-10 md:h-16" style={{ background: from }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className={`absolute inset-0 h-full w-full ${flip ? 'scale-x-[-1]' : ''}`}>
        <path d="M0 48 C 240 8, 480 8, 720 36 S 1200 76, 1440 28 V80 H0 Z" fill={to} />
      </svg>
    </div>
  );
}
