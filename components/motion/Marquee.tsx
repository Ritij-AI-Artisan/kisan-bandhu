import type { CSSProperties, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Seconds for one full loop. Pass longer values for longer content so speed stays constant. */
  duration?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  className?: string;
  label?: string;
};

/**
 * Infinite CSS marquee. Children are rendered twice and the track slides by -50%.
 * With reduced motion the duplicate is hidden and the row becomes a horizontally scrollable list.
 */
export default function Marquee({ children, duration = 40, direction = 'left', pauseOnHover = true, className = '', label }: Props) {
  return (
    <div
      className={`marquee ${className}`}
      data-direction={direction}
      data-pause={pauseOnHover}
      role={label ? 'region' : undefined}
      aria-label={label}
      style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
    >
      <div className="marquee-track">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="marquee-dup flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
