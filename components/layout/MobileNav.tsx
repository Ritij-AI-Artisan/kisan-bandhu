'use client';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { ArrowRight, X } from 'lucide-react';
import Logo from '@/components/brand/Logo';
import { buttonClass } from '@/components/ui/Button';
import { waLink } from '@/content/site';
import { useLang } from './LangProvider';
import LanguageSwitch from './LanguageSwitch';
import { NAV } from './nav';

/** Full-height sheet from the right: body scroll lock, focus trap, Esc to close. */
export default function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusables = () => Array.from(panel.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    requestAnimationFrame(() => focusables()[0]?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const f = focusables();
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] xl:hidden">
          <motion.div className="absolute inset-0 bg-kb-forest-night/50 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div
            ref={panel}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label={t('nav.menu')}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-kb-ricepaper shadow-kb-lg"
            style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
            initial={{ x: reduce ? 0 : '100%', opacity: reduce ? 0 : 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: reduce ? 0 : '100%', opacity: reduce ? 0 : 1 }}
            transition={{ type: 'tween', duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div className="flex h-16 items-center justify-between px-4">
              <Logo className="h-[30px] w-auto" />
              <button type="button" onClick={onClose} aria-label={t('nav.close')} className="press grid h-11 w-11 place-items-center rounded-full ring-1 ring-kb-ink/15">
                <X className="h-6 w-6" strokeWidth={1.75} />
              </button>
            </div>
            <div className="px-4 pb-2">
              <LanguageSwitch large />
            </div>
            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-2">
              <ul>
                {NAV.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} onClick={onClose} className="flex min-h-14 items-center justify-between rounded-2xl px-3 text-xl font-semibold text-kb-ink hover:bg-kb-sage">
                      {t(n.key)}
                      <ArrowRight className="h-5 w-5 text-kb-green" strokeWidth={1.75} />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/contact" onClick={onClose} className="flex min-h-14 items-center justify-between rounded-2xl px-3 text-xl font-semibold text-kb-ink hover:bg-kb-sage">
                    {t('footer.contact')}
                    <ArrowRight className="h-5 w-5 text-kb-green" strokeWidth={1.75} />
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="grid gap-3 px-4 pt-3">
              <a href={waLink(t('wa.message'))} target="_blank" rel="noopener noreferrer" className={buttonClass('whatsapp', 'lg', 'w-full')}>
                <Image src="/brand/whatsapp.svg" alt="" width={22} height={22} unoptimized className="rounded-full bg-white p-0.5" />
                {t('cta.whatsapp')}
              </a>
              <Link href="/register?source=website-mobile-nav" onClick={onClose} className={buttonClass('gold', 'lg', 'w-full')}>
                {t('cta.register')}
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
