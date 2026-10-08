'use client';
import { useLang } from '@/components/layout/LangProvider';

export default function DemoBadge({ className = '', label }: { className?: string; label?: string }) {
  const { t } = useLang();
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-kb-sky-wash px-2.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider text-kb-monsoon ring-1 ring-kb-monsoon/15 ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-kb-monsoon/70" aria-hidden />
      {label ?? t('badge.demo')}
    </span>
  );
}
