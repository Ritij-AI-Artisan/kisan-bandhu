'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu } from 'lucide-react';
import Logo from '@/components/brand/Logo';
import LogoMark from '@/components/brand/LogoMark';
import { buttonClass } from '@/components/ui/Button';
import { waLink } from '@/content/site';
import { useLang } from './LangProvider';
import LanguageSwitch from './LanguageSwitch';
import MobileNav from './MobileNav';
import { NAV } from './nav';

/** Pages whose top section is a dark full-bleed hero (header starts transparent with light text). */
const DARK_HERO = ['/', '/farmers', '/hubs', '/about'];

export default function Header() {
  const { t } = useLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 240 && y > lastY.current + 4);
      if (y < lastY.current - 4 || y < 240) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const overDark = DARK_HERO.includes(pathname) && !scrolled;
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow] duration-300 ${hidden && !open ? '-translate-y-full' : 'translate-y-0'} ${
          scrolled ? 'border-b border-kb-ink/10 bg-kb-ricepaper/85 backdrop-blur-md' : 'bg-transparent'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="mx-auto flex h-[var(--header-h)] max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center rounded-lg" aria-label="Kisan Bandhu — home">
            <span className="hidden min-[360px]:block">
              <Logo variant={overDark ? 'reversed' : 'primary'} className="h-[30px] w-auto lg:h-[36px]" priority />
            </span>
            <LogoMark className="h-9 w-9 min-[360px]:hidden" variant={overDark ? 'reversed' : 'colour'} title="Kisan Bandhu" />
          </Link>

          <nav aria-label="Main" className="mx-auto hidden xl:block">
            <ul className="flex items-center gap-0.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    aria-current={isActive(n.href) ? 'page' : undefined}
                    className={`group relative block whitespace-nowrap rounded-full px-2 py-2 text-[0.9rem] font-semibold 2xl:px-3 transition-colors ${overDark ? 'text-kb-ricepaper/90 hover:text-white' : 'text-kb-ink/80 hover:text-kb-ink'}`}
                  >
                    {t(n.key)}
                    <span
                      className={`absolute inset-x-2 -bottom-0.5 h-[2px] origin-left rounded-full transition-transform duration-300 ${overDark ? 'bg-kb-sprout-lime' : 'bg-kb-green'} ${
                        isActive(n.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 xl:ml-0">
            <div className="hidden lg:block">
              <LanguageSwitch dark={overDark} />
            </div>
            <a
              href={waLink(t('wa.message'))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('cta.whatsapp')}
              className={`press hidden h-11 w-11 place-items-center rounded-full ring-1 transition sm:grid xl:hidden 2xl:grid ${overDark ? 'ring-kb-ricepaper/30 hover:bg-kb-ricepaper/10' : 'ring-kb-ink/15 hover:bg-kb-sage'}`}
            >
              <Image src="/brand/whatsapp.svg" alt="" width={22} height={22} unoptimized />
            </a>
            <Link href="/register?source=website-header" className={buttonClass('gold', 'md', 'hidden whitespace-nowrap md:inline-flex')}>
              {t('cta.register')}
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t('nav.menu')}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className={`press grid h-11 w-11 place-items-center rounded-full ring-1 xl:hidden ${overDark ? 'text-kb-ricepaper ring-kb-ricepaper/30' : 'text-kb-ink ring-kb-ink/15'}`}
            >
              <Menu className="h-6 w-6" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>
      <MobileNav open={open} onClose={() => setOpen(false)} />
    </>
  );
}
