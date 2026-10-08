import type { Metadata } from 'next';
import { Database, EyeOff, Lock, ShieldCheck, UserCheck } from 'lucide-react';
import PageHero from '@/components/sections/PageHero';
import Section, { SectionHeading } from '@/components/ui/Section';
import RatesDashboard from '@/components/sections/RatesDashboard';
import { CropDoctorPhone, TrustScoreCard, VoiceChatPhone } from '@/components/sections/PhoneMockup';
import DemoBadge from '@/components/brand/DemoBadge';
import ComingSoonBadge from '@/components/brand/ComingSoonBadge';

export const metadata: Metadata = {
  title: 'Technology',
  description: 'AI Crop Doctor, live rates and price forecasts, a Kannada voice assistant on WhatsApp, smart pest traps and a consent-based Trust Score.',
  alternates: { canonical: '/technology' },
};

export default function TechnologyPage() {
  return (
    <div className="finance">
      <PageHero tone="sky" finance eyebrow="Technology" title="AI and live markets, in every farmer’s pocket" lead="Simple tools on WhatsApp and at the hub — in Kannada, by voice or photo.">
        <div className="mt-5">
          <DemoBadge />
        </div>
      </PageHero>
      <Section tone="rice" id="crop-doctor">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <CropDoctorPhone />
          <div>
            <SectionHeading eyebrow="AI Crop Doctor" title="Photo → diagnosis → treatment" />
            <ol className="mt-8 space-y-4">
              {['Take a photo of the leaf, nut or vine', 'AI suggests the likely disease or pest', 'An agronomist checks the result', 'Get the treatment and order inputs at hub price'].map((s, i) => (
                <li key={s} className="flex items-center gap-4 text-lg font-semibold">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-kb-sky-wash font-mono text-kb-monsoon">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>
      <Section tone="sky" id="rates">
        <SectionHeading eyebrow="Live rates & forecasts" title="Sell now, hold, or contract?" lead="Daily mandi, CAMPCO and Spices Board prices with a 1–4 week outlook. Forecasts are guidance, never a guarantee." />
        <div className="mt-10">
          <RatesDashboard />
        </div>
      </Section>
      <Section tone="rice" id="voice">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Voice assistant on WhatsApp" title="Ask in Kannada. Get an answer in Kannada." lead="Voice notes and text in Kannada, Hindi and English — no app download needed." />
          </div>
          <VoiceChatPhone />
        </div>
      </Section>
      <Section tone="husk" id="sensors">
        <SectionHeading eyebrow="On the farm" title="Warnings before the damage" />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-[20px] bg-kb-ricepaper p-6 shadow-kb">
            <ComingSoonBadge kind="pilot" />
            <h3 className="h3 mt-4">Smart pest traps</h3>
            <p className="mt-2 text-kb-ink/80">Camera traps photograph catches daily; AI counts pests and sends a Kannada alert with advice — and opens a group input order at the hub.</p>
            <p className="mt-3 text-sm text-kb-stone">Inspired by Trapview (Slovenia) &amp; Semios (Canada)</p>
          </div>
          <div className="rounded-[20px] bg-kb-ricepaper p-6 shadow-kb">
            <ComingSoonBadge kind="pilot" />
            <h3 className="h3 mt-4">Thirsty-tree sensors</h3>
            <p className="mt-2 text-kb-ink/80">Tiny trunk sensors score daily water stress so farmers irrigate before palms show it.</p>
            <p className="mt-3 text-sm text-kb-stone">Inspired by Phytech (Israel)</p>
          </div>
        </div>
      </Section>
      <Section tone="sky" id="trust-score">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeading eyebrow="Trust Score" title="Credit built from how you actually farm" lead="Your Trust Score is built from your real farming and selling records, with your consent. Loans come only from RBI-regulated partner lenders, who make the final decision. Kisan Bandhu does not lend." />
            <ComingSoonBadge label="Coming soon · via regulated lenders" className="mt-6" />
          </div>
          <TrustScoreCard className="mx-auto scale-125" />
        </div>
      </Section>
      <Section tone="rice" id="data">
        <SectionHeading eyebrow="Data & privacy principles" title="Your data works for you" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            [UserCheck, 'Consent first — you choose what to share'],
            [EyeOff, 'Never sold to anyone'],
            [Lock, 'No Aadhaar or bank details on this site'],
            [Database, 'Minimum data, kept only as long as needed'],
            [ShieldCheck, 'Withdraw consent any time'],
          ].map(([Icon, text], i) => {
            const I = Icon as typeof Lock;
            return (
              <div key={i} className="rounded-[20px] bg-kb-sage p-5 font-semibold">
                <I className="h-7 w-7 text-kb-green" strokeWidth={1.75} />
                <p className="mt-3">{text as string}</p>
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
