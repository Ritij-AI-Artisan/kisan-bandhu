'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ShieldCheck } from 'lucide-react';
import PageHero from '@/components/sections/PageHero';
import Section, { SectionHeading } from '@/components/ui/Section';
import { buttonClass } from '@/components/ui/Button';
import FAQ from '@/components/sections/FAQ';
import FilloutEmbed from '@/components/forms/FilloutEmbed';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { SERVICE_ICONS } from '@/components/sections/Services';
import { useLang } from '@/components/layout/LangProvider';
import { SERVICES } from '@/content/services';
import { BOOKING_ACCORDIONS, FARMER_FAQ } from '@/content/faq';
import { waLink } from '@/content/site';

export default function FarmersContent() {
  const { t } = useLang();
  const free = ['free1', 'free2', 'free3'];
  const paid = ['paid1', 'paid2', 'paid3'];
  return (
    <>
      <PageHero tone="dark" photo="hero/farmer-portrait" eyebrow={t('farmers.eyebrow')} title={t('farmers.title')} lead={t('farmers.lead')}>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="#register" className={buttonClass('gold', 'lg')}>
            {t('cta.register')}
          </Link>
          <a href={waLink(t('wa.message'))} target="_blank" rel="noopener noreferrer" className={buttonClass('whatsapp', 'lg')}>
            {t('cta.whatsapp')}
          </a>
        </div>
      </PageHero>

      <Section tone="rice">
        <SectionHeading title={t('farmers.benefitsTitle')} />
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {['b1', 'b2', 'b3', 'b4', 'b5', 'b6'].map((b) => (
            <RevealItem key={b} className="flex gap-3 rounded-[20px] bg-kb-sage p-5 text-lg font-semibold">
              <Check className="mt-1 h-5 w-5 shrink-0 text-kb-green" strokeWidth={2.5} />
              {t(`farmers.${b}`)}
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const Icon = SERVICE_ICONS[s.icon];
            return (
              <div key={s.key} className="flex gap-4 rounded-[20px] bg-white p-5 shadow-kb">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-kb-green text-white">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-bold">{t(`services.${s.key}t`)}</p>
                  <p className="text-[0.95rem] text-kb-ink/75">{t(`services.${s.key}b`)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section tone="husk" id="advice">
        <SectionHeading title={t('farmers.consultTitle')} />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-[20px] bg-kb-ricepaper p-6 shadow-kb">
            <p className="text-2xl font-bold text-kb-green">{t('farmers.free')} · ₹0</p>
            <ul className="mt-4 space-y-3">
              {free.map((k) => (
                <li key={k} className="flex items-center gap-3 text-lg">
                  <Check className="h-5 w-5 text-kb-green" strokeWidth={2.5} /> {t(`farmers.${k}`)}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[20px] bg-kb-forest-night p-6 text-kb-ricepaper shadow-kb">
            <p className="text-2xl font-bold text-kb-gold">{t('farmers.paid')}</p>
            <ul className="mt-4 space-y-3">
              {paid.map((k, i) => (
                <li key={k} className="flex flex-wrap items-center justify-between gap-2 text-lg">
                  <span className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-kb-sprout-lime" strokeWidth={2.5} /> {t(`farmers.${k}`)}
                  </span>
                  <span className="font-mono text-sm text-kb-sprout-lime">₹{['499', '299', '1,999'][i]}/season*</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-kb-ricepaper/70">*Illustrative prices — final prices will be shown before you book.</p>
          </div>
        </div>
      </Section>

      <Section tone="rice" id="pay-from-harvest">
        <SectionHeading title={t('farmers.phfTitle')} />
        <ol className="mt-10 grid gap-4 md:grid-cols-4">
          {['phf1', 'phf2', 'phf3', 'phf4'].map((k, i) => (
            <li key={k} className="rounded-[20px] bg-kb-sky-wash p-5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-kb-monsoon font-mono text-white">{i + 1}</span>
              <p className="mt-3 text-lg font-semibold">{t(`farmers.${k}`)}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 flex gap-3 rounded-[20px] bg-kb-husk p-5 font-semibold">
          <ShieldCheck className="h-6 w-6 shrink-0 text-kb-monsoon" strokeWidth={1.75} />
          {t('farmers.phfNote')}
        </p>
      </Section>

      <Section tone="sage" id="booking">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading title={t('farmers.howTitle')} />
            <div className="mt-6">
              <FAQ items={BOOKING_ACCORDIONS} />
            </div>
          </div>
          <div>
            <SectionHeading title={t('farmers.faqTitle')} />
            <div className="mt-6">
              <FAQ items={FARMER_FAQ} />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="husk" id="register">
        <SectionHeading title={t('farmers.formTitle')} lead={t('farmers.formLead')} />
        <div className="mt-8 max-w-3xl">
          <FilloutEmbed context="registering as a farmer" />
        </div>
        <a href={waLink(t('wa.message'))} target="_blank" rel="noopener noreferrer" className={buttonClass('whatsapp', 'lg', 'mt-10 w-full max-w-3xl text-lg')}>
          <Image src="/brand/whatsapp.svg" alt="" width={26} height={26} unoptimized className="rounded-full bg-white p-0.5" />
          {t('farmers.waBig')}
        </a>
      </Section>
    </>
  );
}
