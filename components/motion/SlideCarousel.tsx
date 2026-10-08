'use client';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Tailwind basis classes for each slide, e.g. "basis-[85%] sm:basis-1/2 lg:basis-1/3" */
  slideClass?: string;
  autoplayMs?: number;
  label: string;
  dark?: boolean;
  showArrows?: boolean;
};

/**
 * Embla carousel: loop + drag/swipe + autoplay. Autoplay pauses on hover/touch, while off-screen,
 * while the tab is hidden, and never starts with reduced motion.
 */
export default function SlideCarousel({ children, slideClass = 'basis-[85%] sm:basis-1/2 lg:basis-1/3', autoplayMs = 3500, label, dark, showArrows = true }: Props) {
  const autoplay = useRef(Autoplay({ delay: autoplayMs, stopOnInteraction: false, stopOnMouseEnter: true, playOnInit: false }));
  const [emblaRef, api] = useEmblaCarousel({ loop: true, align: 'start' }, [autoplay.current]);
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    const onInit = () => {
      setSnaps(api.scrollSnapList());
      onSelect();
    };
    onInit();
    api.on('select', onSelect).on('reInit', onInit);
    return () => {
      api.off('select', onSelect).off('reInit', onInit);
    };
  }, [api]);

  useEffect(() => {
    if (!api || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ap = autoplay.current;
    let onScreen = false;
    const sync = () => (onScreen && !document.hidden ? ap.play() : ap.stop());
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      sync();
    });
    if (rootRef.current) io.observe(rootRef.current);
    document.addEventListener('visibilitychange', sync);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [api]);

  const prev = useCallback(() => api?.scrollPrev(), [api]);
  const next = useCallback(() => api?.scrollNext(), [api]);
  const btn = dark ? 'bg-kb-ricepaper/10 text-kb-ricepaper ring-kb-ricepaper/30 hover:bg-kb-ricepaper/20' : 'bg-white text-kb-ink ring-kb-ink/15 hover:bg-kb-sage';

  return (
    <div ref={rootRef} role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-4 flex touch-pan-y py-2">
          {Children.map(children, (child, i) => (
            <div className={`min-w-0 shrink-0 grow-0 pl-4 ${slideClass}`} role="group" aria-roledescription="slide" aria-label={`Slide ${i + 1}`}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex flex-wrap">
          {snaps.map((_, i) => (
            <button key={i} type="button" onClick={() => api?.scrollTo(i)} aria-label={`Go to slide ${i + 1}`} aria-current={i === selected} className="grid h-8 w-8 place-items-center">
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  i === selected ? 'w-6 ' + (dark ? 'bg-kb-sprout-lime' : 'bg-kb-green') : 'w-2 ' + (dark ? 'bg-kb-ricepaper/35' : 'bg-kb-ink/25')
                }`}
              />
            </button>
          ))}
        </div>
        {showArrows && (
          <div className="flex shrink-0 gap-2">
            <button type="button" onClick={prev} aria-label="Previous slide" className={`press grid h-11 w-11 place-items-center rounded-full ring-1 transition ${btn}`}>
              <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
            </button>
            <button type="button" onClick={next} aria-label="Next slide" className={`press grid h-11 w-11 place-items-center rounded-full ring-1 transition ${btn}`}>
              <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
