import type { Metadata } from 'next';
import PageHero from '@/components/sections/PageHero';
import Section, { SectionHeading } from '@/components/ui/Section';
import Photo from '@/components/ui/Photo';
import HubMap from '@/components/sections/HubMap';
import FilloutEmbed from '@/components/forms/FilloutEmbed';
import ComingSoonBadge from '@/components/brand/ComingSoonBadge';
import { FORMS } from '@/content/forms';

export const metadata: Metadata = {
  title: 'Village Hubs',
  description: 'One Kisan Bandhu hub for every 10–15 villages: weigh, test, dry, grade, store, pick up inputs and dispatch tractors and crews.',
  alternates: { canonical: '/hubs' },
};

const DAY = [
  ['7:00', 'Tractors, drones and crews dispatched to booked farms'],
  ['9:00', 'Input pickups open — pooled orders handed over'],
  ['10:30', 'Produce weighed and moisture-tested in front of farmers'],
  ['12:00', 'Expert desk: agronomist consultations and Crop Doctor checks'],
  ['14:00', 'Grading and packing; lots logged and verified'],
  ['16:00', 'Learning video screening for farmers'],
  ['17:00', 'Drying yard closes; stock secured in storage'],
];
// Planned hub dots on a simplified outline of the five southern states (viewBox 300×380).
const DOTS = [
  { name: 'Sirsi', x: 92, y: 118 },
  { name: 'Shivamogga', x: 120, y: 146 },
  { name: 'Puttur', x: 92, y: 198 },
  { name: 'Chikkamagaluru', x: 118, y: 176 },
  { name: 'Madikeri', x: 110, y: 214 },
  { name: 'Tiptur', x: 150, y: 168 },
];

export default function HubsPage() {
  return (
    <>
      <PageHero tone="dark" photo="hubs/drying-yard" eyebrow="Village hubs" title="One hub for every 10–15 villages" lead="Processing and services at the farm’s doorstep — run by local people, so value stays in the village." />
      <Section tone="forest">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <HubMap className="mx-auto w-full max-w-[600px]" />
          <div>
            <SectionHeading eyebrow="What a hub does" title="Weigh · test · dry · grade · store · pick up · dispatch" />
            <div className="mt-8 grid grid-cols-2 gap-3">
              {['hubs/weighing', 'hubs/arecanut-heap', 'hubs/storage', 'services/hub-copra'].map((k) => (
                <Photo key={k} k={k} sizes="(min-width:1024px) 25vw, 50vw" className="aspect-[4/3] rounded-[20px]" />
              ))}
            </div>
          </div>
        </div>
      </Section>
      <Section tone="rice">
        <SectionHeading eyebrow="A day at a hub" title="From 7am dispatch to 5pm close" />
        <ol className="relative mt-10 space-y-4 border-l-4 border-kb-sage pl-6">
          {DAY.map(([time, what]) => (
            <li key={time} className="relative">
              <span className="absolute -left-[34px] top-1.5 h-4 w-4 rounded-full bg-kb-green ring-4 ring-kb-ricepaper" />
              <span className="font-mono text-kb-green">{time}</span>
              <p className="text-lg font-semibold">{what}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section tone="husk">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Planned locations" title="Starting in the plantation belt" lead="Planned · locations being confirmed. First hubs in Karnataka, then Kerala, Tamil Nadu, Andhra Pradesh and Telangana." />
            <div className="mt-6 flex flex-wrap gap-2">
              {DOTS.map((d) => (
                <span key={d.name} className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 font-semibold">
                  {d.name} <ComingSoonBadge kind="planned" />
                </span>
              ))}
            </div>
          </div>
          <svg viewBox="0 0 300 380" className="mx-auto w-full max-w-[380px]" role="img" aria-label="Simplified map of the five southern states with planned hub locations in Karnataka">
            {/* Simplified, not-to-scale state outlines */}
            <path d="M70 40 L150 30 L190 70 L175 120 L190 160 L160 200 L135 240 L100 245 L80 200 L65 150 L60 95 Z" fill="#DCE8D2" stroke="#2E7D32" strokeWidth="2" />
            <path d="M190 70 L255 55 L285 110 L250 150 L190 160 L175 120 Z" fill="#EFE6D2" stroke="#6B7066" strokeWidth="1.5" />
            <path d="M190 160 L250 150 L262 200 L215 230 L160 200 Z" fill="#EFE6D2" stroke="#6B7066" strokeWidth="1.5" />
            <path d="M80 200 L100 245 L135 240 L150 300 L130 350 L110 345 L90 280 Z" fill="#EFE6D2" stroke="#6B7066" strokeWidth="1.5" />
            <path d="M135 240 L160 200 L215 230 L210 300 L165 360 L130 350 L150 300 Z" fill="#EFE6D2" stroke="#6B7066" strokeWidth="1.5" />
            {[
              ['Karnataka', 115, 80],
              ['Telangana', 225, 100],
              ['Andhra Pradesh', 212, 188],
              ['Kerala', 108, 300],
              ['Tamil Nadu', 180, 285],
            ].map(([n, x, y]) => (
              <text key={n as string} x={x as number} y={y as number} textAnchor="middle" fontSize="11" fill="#1E2A1F" fontWeight="700">
                {n}
              </text>
            ))}
            {DOTS.map((d, i) => (
              <g key={d.name}>
                <circle cx={d.x} cy={d.y} r="5" fill="#F2A900" className="ping-dot" style={{ animationDelay: `${i * 0.3}s` }} />
                <circle cx={d.x} cy={d.y} r="5" fill="#F2A900" stroke="#143D1E" strokeWidth="1.5" />
              </g>
            ))}
            <text x="150" y="375" textAnchor="middle" fontSize="10" fill="#6B7066">
              Not to scale · Planned · locations being confirmed
            </text>
          </svg>
        </div>
      </Section>
      <Section tone="rice" id="hub-partner">
        <SectionHeading eyebrow="Become a hub partner" title="Run the hub in your area" lead="We are looking for local entrepreneurs, cooperatives, ex-servicemen and women’s self-help groups. You get equipment, training, a steady flow of services and income that stays in your village." />
        <div className="mt-8 max-w-3xl">
          <FilloutEmbed id={FORMS.hubPartner} context="becoming a Kisan Bandhu hub partner" />
        </div>
      </Section>
    </>
  );
}
