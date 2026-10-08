'use client';
import Image from 'next/image';
import { waLink } from '@/content/site';
import { useLang } from './LangProvider';

export default function WhatsAppFab() {
  const { t } = useLang();
  return (
    <a
      href={waLink(t('wa.message'))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('cta.whatsapp')}
      className="press fixed right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp shadow-kb-lg sm:right-6"
      style={{ bottom: 'max(16px, env(safe-area-inset-bottom))' }}
    >
      <span className="pulse-ring absolute inset-0 rounded-full bg-whatsapp" aria-hidden />
      <Image src="/brand/whatsapp-white.svg" alt="" width={30} height={30} unoptimized className="relative" />
    </a>
  );
}
