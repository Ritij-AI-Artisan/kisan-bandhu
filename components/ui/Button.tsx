import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'gold' | 'ghost' | 'ghost-light' | 'whatsapp';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-kb-green text-white hover:bg-[#276b2b] shadow-kb',
  gold: 'bg-kb-gold text-kb-ink hover:bg-[#ffb81a] shadow-kb',
  ghost: 'ring-[1.5px] ring-kb-ink text-kb-ink hover:bg-kb-ink hover:text-kb-ricepaper',
  'ghost-light': 'ring-[1.5px] ring-kb-ricepaper/80 text-kb-ricepaper hover:bg-kb-ricepaper hover:text-kb-forest-night',
  // WhatsApp brand colour; dark text keeps AA contrast on #25D366.
  whatsapp: 'bg-whatsapp text-kb-ink hover:brightness-95 shadow-kb',
};

type Props = { variant?: Variant; size?: 'md' | 'lg'; className?: string; children: ReactNode; external?: boolean } & Omit<ComponentProps<typeof Link>, 'className'>;

export function buttonClass(variant: Variant = 'primary', size: 'md' | 'lg' = 'md', extra = '') {
  const s = size === 'lg' ? 'min-h-14 px-7 text-base' : 'min-h-11 px-5 text-[0.95rem]';
  return `press inline-flex items-center justify-center gap-2 rounded-full font-bold transition-colors ${s} ${VARIANTS[variant]} ${extra}`;
}

export default function Button({ variant = 'primary', size = 'md', className = '', children, external, ...rest }: Props) {
  return (
    <Link className={buttonClass(variant, size, className)} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
      {children}
    </Link>
  );
}
