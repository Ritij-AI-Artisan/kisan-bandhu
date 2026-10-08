'use client';
import { useState } from 'react';
import FilloutEmbed from '@/components/forms/FilloutEmbed';
import { FORMS } from '@/content/forms';

const TABS = [
  { id: 'farmers', label: 'Farmers', form: FORMS.loi, ctx: 'registering as a farmer' },
  { id: 'partners', label: 'Partners', form: FORMS.partner, ctx: 'a partnership with Kisan Bandhu' },
  { id: 'investors', label: 'Investors', form: FORMS.investorDeck, ctx: 'the Kisan Bandhu investor deck' },
];

export default function ContactTabs() {
  const [tab, setTab] = useState('farmers');
  const active = TABS.find((t) => t.id === tab)!;
  return (
    <div>
      <div role="tablist" aria-label="Who are you?" className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`press min-h-11 rounded-full px-5 font-semibold ${tab === t.id ? 'bg-kb-green text-white' : 'bg-white ring-1 ring-kb-ink/15'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="mt-6">
        <FilloutEmbed key={active.id} id={active.form} context={active.ctx} />
      </div>
    </div>
  );
}
