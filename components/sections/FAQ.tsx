import { ChevronDown } from 'lucide-react';
import type { QA } from '@/content/faq';

/** Accessible accordion built on <details>. */
export default function FAQ({ items, dark }: { items: QA[]; dark?: boolean }) {
  return (
    <div className="divide-y divide-current/10">
      {items.map((it) => (
        <details key={it.q} className="group py-1">
          <summary className={`flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-2 text-lg font-bold ${dark ? 'hover:bg-kb-ricepaper/5' : 'hover:bg-kb-ink/5'} [&::-webkit-details-marker]:hidden`}>
            {it.q}
            <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" strokeWidth={1.75} />
          </summary>
          <p className={`px-2 pb-4 ${dark ? 'text-kb-ricepaper/80' : 'text-kb-ink/80'}`}>{it.a}</p>
        </details>
      ))}
    </div>
  );
}
