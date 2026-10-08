'use client';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/components/brand/Logo';
import { Container } from '@/components/ui/Section';
import { EMAIL, PHONE, ADDRESS, GRIEVANCE_OFFICER, SOCIAL, waLink } from '@/content/site';
import { useLang } from './LangProvider';

export default function Footer() {
  const { t, lang } = useLang();
  const cols = [
    {
      title: t('footer.farmers'),
      links: [
        ['/farmers', t('nav.farmers')],
        ['/register?source=website-footer', t('cta.register')],
        ['/products', t('nav.products')],
        ['/hubs', t('nav.hubs')],
      ],
    },
    {
      title: t('footer.partners'),
      links: [
        ['/partners', t('nav.partners')],
        ['/partners#enquire', t('cta.becomePartner')],
        ['/hubs#hub-partner', 'Become a hub partner'],
        ['/investors', t('nav.investors')],
      ],
    },
    {
      title: t('footer.company'),
      links: [
        ['/about', t('nav.about')],
        ['/technology', t('nav.technology')],
        ['/contact', t('footer.contact')],
      ],
    },
    {
      title: t('footer.legal'),
      links: [
        ['/privacy', t('footer.privacy')],
        ['/terms', t('footer.terms')],
        ['/credits', t('footer.credits')],
      ],
    },
  ];
  const social: [keyof typeof SOCIAL, string][] = [
    ['youtube', 'YouTube'],
    ['instagram', 'Instagram'],
    ['facebook', 'Facebook'],
    ['x', 'X'],
    ['linkedin', 'LinkedIn'],
  ];

  return (
    <footer className="leaf-texture bg-kb-forest-night pb-28 pt-16 text-kb-ricepaper md:pb-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo variant="reversed" className="h-10 w-auto" />
            <p className="mt-4 text-lg text-kb-ricepaper/85" style={{ fontFamily: 'var(--ff-kn)' }}>
              ಕಿಸಾನ್ ಬಂಧು <span style={{ fontFamily: 'var(--ff-hi)' }}>· किसान बंधु</span>
            </p>
            <p className="accent-word mt-1 text-xl text-kb-sprout-lime">Har kadam, kisan ke saath</p>
            <ul className="mt-6 space-y-2 text-[0.95rem] text-kb-ricepaper/85">
              <li>
                <a className="underline-offset-4 hover:underline" href={waLink(t('wa.message'))} target="_blank" rel="noopener noreferrer">
                  WhatsApp: {PHONE}
                </a>
              </li>
              <li>Phone: {PHONE}</li>
              <li>
                <a className="underline-offset-4 hover:underline" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </li>
              <li>{ADDRESS}</li>
            </ul>
            <div className="mt-6 flex gap-2">
              {social.map(([key, name]) => (
                <a key={key} href={SOCIAL[key]} aria-label={`${name} (coming soon)`} className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-kb-ricepaper/20 transition hover:bg-kb-ricepaper/10">
                  <Image src={`/brand/${key}-mono.svg`} alt="" width={18} height={18} unoptimized />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {cols.map((c) => (
              <div key={c.title}>
                <h2 className="eyebrow">{c.title}</h2>
                <ul className="mt-4 space-y-1">
                  {c.links.map(([href, label]) => (
                    <li key={href}>
                      <Link href={href} className="inline-flex min-h-11 items-center text-[0.95rem] text-kb-ricepaper/85 underline-offset-4 hover:text-white hover:underline">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 space-y-3 border-t border-kb-ricepaper/15 pt-8 text-sm text-kb-ricepaper/75">
          <p className="max-w-3xl font-semibold text-kb-ricepaper/90">{t('footer.noLending')}</p>
          <p>
            Grievance officer: {GRIEVANCE_OFFICER.name}, {GRIEVANCE_OFFICER.email} (to be appointed before credit services launch)
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>© 2026 Kisan Bandhu</span>
            <Link href="/privacy" className="underline-offset-4 hover:underline">
              {t('footer.privacy')}
            </Link>
            <Link href="/terms" className="underline-offset-4 hover:underline">
              {t('footer.terms')}
            </Link>
            <Link href="/credits" className="underline-offset-4 hover:underline">
              {t('footer.credits')}
            </Link>
            {lang !== 'en' && <span className="rounded-full bg-kb-ricepaper/10 px-2 py-0.5 text-xs text-kb-sprout-lime">{t('footer.translation')}</span>}
          </div>
        </div>
      </Container>
    </footer>
  );
}
