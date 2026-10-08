'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Section';
import { buttonClass } from '@/components/ui/Button';
import FilloutEmbed from '@/components/forms/FilloutEmbed';
import { useLang } from '@/components/layout/LangProvider';
import { waLink } from '@/content/site';

export default function CTA() {
  const { t } = useLang();
  return (
    <section id="join" className="bg-gradient-to-br from-kb-gold to-kb-areca py-20 text-kb-ink md:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="h2">{t('final.title')}</h2>
          <p className="lead mt-4">{t('final.lead')}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/register?source=website-home-cta" className={buttonClass('primary', 'lg')}>
              {t('cta.registerFarmer')}
            </Link>
            <Link href="/partners#enquire" className={buttonClass('ghost', 'lg')}>
              {t('cta.becomePartner')}
            </Link>
            <a href={waLink(t('wa.message'))} target="_blank" rel="noopener noreferrer" className={buttonClass('whatsapp', 'lg')}>
              <Image src="/brand/whatsapp.svg" alt="" width={22} height={22} unoptimized className="rounded-full bg-white p-0.5" />
              {t('cta.whatsapp')}
            </a>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-3xl">
          <FilloutEmbed lazy context="registering as a farmer" />
        </div>
      </Container>
    </section>
  );
}
