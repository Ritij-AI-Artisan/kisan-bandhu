'use client';
import Link from 'next/link';
import { ArrowRight, Briefcase, ScanLine, Sprout, Tractor, Users, Warehouse, type LucideIcon } from 'lucide-react';
import Section, { SectionHeading } from '@/components/ui/Section';
import Photo from '@/components/ui/Photo';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { useLang } from '@/components/layout/LangProvider';
import { SERVICES, type ServiceIcon } from '@/content/services';

export const SERVICE_ICONS: Record<ServiceIcon, LucideIcon> = { sprout: Sprout, tractor: Tractor, users: Users, scan: ScanLine, warehouse: Warehouse, briefcase: Briefcase };

export default function Services() {
  const { t } = useLang();
  return (
    <Section tone="husk" id="services">
      <SectionHeading eyebrow={t('services.eyebrow')} title={t('services.title')} />
      {/* 3×2 on desktop, 2×3 on tablet, swipeable row on phones */}
      <RevealGroup className="no-scrollbar -mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-3">
        {SERVICES.map((s) => {
          const Icon = SERVICE_ICONS[s.icon];
          return (
            <RevealItem key={s.key} className="w-[82%] shrink-0 snap-start sm:w-auto">
              <Link href={s.href} className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-kb-ricepaper shadow-kb ring-1 ring-kb-ink/5 transition-transform duration-300 hover:-translate-y-1">
                <Photo k={s.photo} sizes="(min-width:1024px) 400px, (min-width:640px) 50vw, 82vw" className="aspect-[16/10]" imgClassName="transition-transform duration-500 group-hover:scale-[1.03]" />
                <div className="flex flex-1 flex-col p-5">
                  <span className="-mt-11 mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-kb-green text-white shadow-kb ring-4 ring-kb-ricepaper">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <h3 className="h3">{t(`services.${s.key}t`)}</h3>
                  <p className="mt-2 flex-1 text-kb-ink/80">{t(`services.${s.key}b`)}</p>
                  <span className="mt-4 inline-flex items-center gap-1 font-bold text-kb-green">
                    {t('cta.learnMore')} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
                  </span>
                </div>
              </Link>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
