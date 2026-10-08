'use client';
import { useState } from 'react';
import { CloudRain, LineChart, PlayCircle, ScanLine, TrendingUp, type LucideIcon } from 'lucide-react';
import Section, { SectionHeading } from '@/components/ui/Section';
import Photo from '@/components/ui/Photo';
import DemoBadge from '@/components/brand/DemoBadge';
import ComingSoonBadge from '@/components/brand/ComingSoonBadge';
import { PriceLineChart } from './RatesDashboard';
import { CropDoctorPhone } from './PhoneMockup';

const TABS: { id: string; label: string; icon: LucideIcon }[] = [
  { id: 'rates', label: 'Live rates', icon: LineChart },
  { id: 'forecast', label: 'Price forecast', icon: TrendingUp },
  { id: 'tips', label: 'Seasonal tips', icon: CloudRain },
  { id: 'videos', label: 'Learning videos', icon: PlayCircle },
  { id: 'doctor', label: 'AI Crop Doctor', icon: ScanLine },
];

const MONSOON = ['Clear drains around palms before heavy rain', 'Spray Bordeaux / copper fungicide against koleroga (fruit rot) as per label', 'Cover harvested nuts — do not dry on wet ground', 'Check pepper vines for quick-wilt signs at the base', 'Book climbers early — demand peaks after the first spell'];

export default function SmartTools() {
  const [tab, setTab] = useState('rates');
  return (
    <Section tone="sky" id="smart-tools" className="finance">
      <SectionHeading eyebrow="Smart tools" title="Know the price, the weather and the problem — before it costs you" />
      <div role="tablist" aria-label="Smart tools" className="no-scrollbar -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setTab(t.id)}
            className={`press inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 font-semibold transition ${tab === t.id ? 'bg-kb-monsoon text-white' : 'bg-white text-kb-ink ring-1 ring-kb-ink/10 hover:bg-kb-ricepaper'}`}
          >
            <t.icon className="h-4 w-4" strokeWidth={1.75} /> {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="mt-6 rounded-[24px] bg-white p-5 shadow-kb md:p-8">
        <div className="mb-4 flex justify-end">
          <DemoBadge />
        </div>
        {tab === 'rates' && (
          <div>
            <p className="h3">Arecanut (Rashi), Shivamogga — last 12 weeks</p>
            <PriceLineChart className="mt-4" />
            <p className="mt-2 text-sm text-kb-stone">Illustrative values · not live market data.</p>
          </div>
        )}
        {tab === 'forecast' && (
          <div>
            <p className="h3">Sell now, hold, or contract? 1–4 week outlook</p>
            <PriceLineChart withForecast className="mt-4" />
            <p className="mt-2 text-sm text-kb-stone">Illustrative forecast band. Forecasts are guidance, never a guarantee of price.</p>
          </div>
        )}
        {tab === 'tips' && (
          <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
            <Photo k="about/kerala-paddy" sizes="(min-width:768px) 40vw, 100vw" className="aspect-[4/3] rounded-[20px]" />
            <div>
              <p className="h3">Monsoon checklist · arecanut &amp; pepper</p>
              <ul className="mt-4 space-y-3">
                {MONSOON.map((m) => (
                  <li key={m} className="flex gap-3">
                    <span className="mt-1 h-5 w-5 shrink-0 rounded-md ring-2 ring-kb-green" aria-hidden />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {tab === 'videos' && (
          <div>
            <div className="mb-4 flex items-center gap-2">
              <p className="h3">Short videos in Kannada</p>
              <ComingSoonBadge label="Videos coming soon" />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ['crops/arecanut-drying', 'Drying arecanut the right way'],
                ['crops/pepper-vine', 'Spotting quick wilt early'],
                ['crops/coffee-cherries', 'Picking ripe coffee cherries'],
              ].map(([k, title]) => (
                <div key={k} className="overflow-hidden rounded-[20px] bg-kb-ricepaper ring-1 ring-kb-ink/5">
                  <div className="relative">
                    <Photo k={k} sizes="(min-width:640px) 30vw, 100vw" className="aspect-video" />
                    <PlayCircle className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 text-white drop-shadow" strokeWidth={1.5} />
                  </div>
                  <p className="p-3 font-semibold">{title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === 'doctor' && (
          <div className="grid items-center gap-8 md:grid-cols-2">
            <CropDoctorPhone />
            <ol className="space-y-4">
              {['Take a photo of the leaf, nut or vine', 'AI suggests the likely disease or pest', 'An agronomist checks the result', 'Get the treatment and order at hub price'].map((s, i) => (
                <li key={s} className="flex items-center gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-kb-sky-wash font-mono font-medium text-kb-monsoon">{i + 1}</span>
                  <span className="text-lg font-semibold">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </Section>
  );
}
