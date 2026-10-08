type Props = {
  className?: string;
  /** colour (default), reversed (white + gold, for dark), mono (Ink) */
  variant?: 'colour' | 'reversed' | 'mono';
  /** Leaves grow in once (used by the loader). */
  grow?: boolean;
  title?: string;
};

const COLOURS = {
  colour: { stem: '#2E7D32', left: '#2E7D32', right: '#F2A900' },
  reversed: { stem: '#FFFFFF', left: '#FFFFFF', right: '#F2A900' },
  mono: { stem: '#1E2A1F', left: '#1E2A1F', right: '#1E2A1F' },
};

/** "Hands & sprout" mark — traced from the logo sheet (see scripts/build-logo.mjs). */
export default function LogoMark({ className, variant = 'colour', grow = false, title }: Props) {
  const c = COLOURS[variant];
  return (
    <svg viewBox="304 168 152 156" className={className} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <path className={grow ? 'leaf-grow' : undefined} style={grow ? { animationDelay: '160ms' } : undefined} d="M378 213C380 193 404 178 433 177C432 200 414 216 378 220Z" fill={c.stem} />
      <path className={grow ? 'leaf-grow' : undefined} d="M381 240C362 241 339 228 333 205C356 202 376 213 381 232Z" fill={c.stem} />
      <rect x="375" y="203" width="10" height="92" rx="5" fill={c.stem} />
      <path d="M327 255A53 48 0 0 0 380 303" fill="none" stroke={c.left} strokeWidth="28" />
      <circle cx="327" cy="255" r="14" fill={c.left} />
      <path d="M380 303A53 48 0 0 0 433 255" fill="none" stroke={c.right} strokeWidth="28" />
      <circle cx="433" cy="255" r="14" fill={c.right} />
    </svg>
  );
}
