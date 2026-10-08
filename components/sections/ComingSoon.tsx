import Marquee from '@/components/motion/Marquee';
import { COMING_SOON_WORDS } from '@/content/models';

function Leaf() {
  return (
    <svg viewBox="0 0 24 24" className="mx-6 h-5 w-5 shrink-0" aria-hidden>
      <path d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16zM4 20l9-9" fill="none" stroke="#C9E58C" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Marquee band 2 — slow "coming soon" words on Deep Canopy. */
export default function ComingSoon() {
  return (
    <section className="leaf-texture overflow-x-clip bg-kb-deep-canopy py-10 text-kb-ricepaper md:py-14" aria-labelledby="coming-soon">
      <p id="coming-soon" className="eyebrow on-dark mb-5 text-center">
        Coming soon
      </p>
      <Marquee duration={70} label="Coming soon">
        {COMING_SOON_WORDS.map((w) => (
          <span key={w} className="flex items-center">
            <span className="whitespace-nowrap font-display text-3xl font-semibold md:text-5xl">{w}</span>
            <Leaf />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
