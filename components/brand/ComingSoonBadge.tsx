'use client';
import { useLang } from '@/components/layout/LangProvider';

type Kind = 'soon' | 'pilot' | 'phase1' | 'planned';

export default function ComingSoonBadge({ kind = 'soon', label, className = '' }: { kind?: Kind; label?: string; className?: string }) {
  const { t } = useLang();
  const tone =
    kind === 'phase1'
      ? 'bg-kb-sage text-kb-green ring-kb-green/20'
      : kind === 'pilot'
        ? 'bg-kb-husk text-kb-monsoon ring-kb-monsoon/20'
        : 'bg-kb-husk text-kb-terracotta ring-kb-terracotta/20';
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider ring-1 ${tone} ${className}`}>
      {label ?? t(`badge.${kind}`)}
    </span>
  );
}
