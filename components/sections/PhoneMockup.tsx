import type { ReactNode } from 'react';
import { BadgeCheck, CheckCheck, Mic, Paperclip, Play, ScanLine, ShieldCheck, Sprout } from 'lucide-react';
import LogoMark from '@/components/brand/LogoMark';
import DemoBadge from '@/components/brand/DemoBadge';

/** Phone frame with real JSX content (not screenshots). */
export function PhoneFrame({ children, className = '', title = 'Kisan Bandhu' }: { children: ReactNode; className?: string; title?: string }) {
  return (
    <div className={`relative mx-auto w-[280px] rounded-[36px] bg-kb-ink p-2.5 shadow-kb-lg ring-1 ring-black/40 ${className}`} role="img" aria-label={`Demo phone screen: ${title}`}>
      <div className="absolute left-1/2 top-3.5 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-kb-ink" aria-hidden />
      <div className="overflow-hidden rounded-[28px] bg-[#ECE5DA]">{children}</div>
    </div>
  );
}

function ChatHeader({ subtitle = 'online' }: { subtitle?: string }) {
  return (
    <div className="flex items-center gap-2.5 bg-kb-green px-3 pb-2.5 pt-8 text-white">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-white">
        <LogoMark className="h-6 w-6" />
      </span>
      <div className="leading-tight">
        <p className="text-sm font-bold">Kisan Bandhu</p>
        <p className="text-[0.7rem] opacity-80">{subtitle}</p>
      </div>
    </div>
  );
}

/** Deck 1: Kannada voice-note chat on WhatsApp. */
export function VoiceChatPhone({ className = '' }: { className?: string }) {
  return (
    <PhoneFrame className={className} title="WhatsApp voice note in Kannada and the bot's reply">
      <ChatHeader />
      <div className="space-y-2.5 px-3 py-3 text-[0.8rem] leading-snug text-kb-ink">
        <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-sm bg-[#D9FDD3] p-2.5 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-kb-green text-white">
              <Play className="h-3.5 w-3.5 fill-current" />
            </span>
            <span className="flex h-6 flex-1 items-center gap-[2px]" aria-hidden>
              {[5, 9, 14, 7, 12, 16, 8, 11, 6, 13, 9, 15, 7, 10, 5, 8].map((h, i) => (
                <span key={i} className="w-[3px] rounded-full bg-kb-green/60" style={{ height: h }} />
              ))}
            </span>
            <span className="font-mono text-[0.65rem] text-kb-stone">0:07</span>
          </div>
          <p className="mt-2 font-semibold" lang="kn" style={{ fontFamily: 'var(--ff-kn)' }}>
            ನನ್ನ ಅಡಿಕೆ 10 ಕ್ವಿಂಟಾಲ್ ಇದೆ, ಈಗ ಮಾರಲೇ?
          </p>
          <p className="mt-0.5 text-[0.7rem] italic text-kb-stone">I have 10 quintals of arecanut. Should I sell now?</p>
          <p className="mt-1 flex items-center justify-end gap-1 text-[0.6rem] text-kb-stone">
            9:41 <CheckCheck className="h-3 w-3 text-[#53BDEB]" />
          </p>
        </div>
        <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-white p-2.5 shadow-sm">
          <p>Prices usually rise after the harvest rush. Store at your Kisan Bandhu Hub and get an advance today from a partner lender.</p>
          <div className="mt-2 flex gap-1.5">
            <span className="rounded-full bg-kb-gold px-2.5 py-1 text-[0.7rem] font-bold text-kb-ink">Store &amp; borrow</span>
            <span className="rounded-full px-2.5 py-1 text-[0.7rem] font-bold ring-1 ring-kb-ink/20">Sell now</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-[#F0F2F5] px-3 py-2.5">
        <Paperclip className="h-4 w-4 text-kb-stone" />
        <span className="flex-1 rounded-full bg-white px-3 py-1.5 text-[0.75rem] text-kb-stone">Message</span>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-kb-green text-white">
          <Mic className="h-4 w-4" />
        </span>
      </div>
    </PhoneFrame>
  );
}

/** AI Crop Doctor scan. */
export function CropDoctorPhone({ className = '' }: { className?: string }) {
  return (
    <PhoneFrame className={className} title="AI Crop Doctor scanning a leaf">
      <ChatHeader subtitle="AI Crop Doctor" />
      <div className="space-y-3 bg-kb-ricepaper px-3 py-3 text-[0.8rem] text-kb-ink">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-[#5b8f3a] via-[#3f7a2c] to-[#24521c]">
          <svg viewBox="0 0 200 150" className="absolute inset-0 h-full w-full" aria-hidden>
            <path d="M30 120 C 60 40, 140 20, 180 30 C 160 80, 110 130, 30 120 Z" fill="#7fb04d" />
            <path d="M30 120 C 80 90, 130 60, 180 30" stroke="#4d7f2c" strokeWidth="2" fill="none" />
            {[
              [90, 80, 7],
              [115, 62, 5],
              [70, 95, 5],
              [128, 78, 4],
            ].map(([x, y, r], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r={r} fill="#6b4a1f" />
                <circle cx={x} cy={y} r={r + 3} fill="none" stroke="#c9a84a" strokeWidth="1.5" opacity=".7" />
              </g>
            ))}
          </svg>
          <div className="absolute inset-3 rounded-xl border-2 border-dashed border-kb-sprout-lime/90" />
          <ScanLine className="absolute right-3 top-3 h-5 w-5 text-kb-sprout-lime" />
        </div>
        <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-kb-ink/5">
          <p className="text-[0.7rem] font-bold uppercase tracking-wider text-kb-terracotta">Likely issue</p>
          <p className="mt-0.5 font-bold">Leaf spot (fungal)</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-kb-sage">
            <div className="h-full w-[82%] rounded-full bg-kb-green" />
          </div>
          <p className="mt-1 font-mono text-[0.65rem] text-kb-stone">Confidence 82% · agronomist review pending</p>
          <p className="mt-2">Remove badly affected leaves. Spray a copper fungicide as per label.</p>
          <span className="mt-2 inline-flex rounded-full bg-kb-gold px-2.5 py-1 text-[0.7rem] font-bold">Order at hub price</span>
        </div>
      </div>
    </PhoneFrame>
  );
}

export function FloatCard({ children, className = '', style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`rounded-[20px] bg-white p-3.5 text-kb-ink shadow-kb-lg ring-1 ring-kb-ink/5 ${className}`} style={style}>
      {children}
    </div>
  );
}

export function VerifiedLotCard({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <FloatCard className={`w-[250px] ${className}`} style={style}>
      <div className="flex items-start justify-between gap-2">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-kb-sage text-kb-green">
          <Sprout className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <DemoBadge />
      </div>
      <p className="mt-2 text-sm font-bold leading-snug">Grade A Rashi Arecanut · 10 qtl</p>
      <p className="mt-1 font-mono text-[0.72rem] text-kb-stone">Moisture 7% · Verified at Sirsi Hub</p>
      <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-kb-sage px-2 py-0.5 text-[0.7rem] font-bold text-kb-green">
        <BadgeCheck className="h-3.5 w-3.5" /> Quality verified
      </p>
    </FloatCard>
  );
}

export function TrustScoreCard({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  const pct = 782 / 900;
  return (
    <FloatCard className={`w-[200px] ${className}`} style={style}>
      <div className="flex items-center justify-between">
        <p className="text-[0.7rem] font-bold uppercase tracking-wider text-kb-monsoon">Trust Score</p>
        <DemoBadge label="Demo" />
      </div>
      <div className="mt-2 flex items-center gap-3">
        <svg viewBox="0 0 44 44" className="h-14 w-14 -rotate-90" aria-hidden>
          <circle cx="22" cy="22" r="18" fill="none" stroke="#DCE8D2" strokeWidth="5" />
          <circle cx="22" cy="22" r="18" fill="none" stroke="#2E7D32" strokeWidth="5" strokeLinecap="round" strokeDasharray={`${pct * 113} 113`} />
        </svg>
        <p className="font-mono text-3xl font-medium">782</p>
      </div>
    </FloatCard>
  );
}

export function AdvanceCard({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <FloatCard className={`w-[240px] ${className}`} style={style}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold">Hi Ramesh</p>
        <DemoBadge label="Demo" />
      </div>
      <p className="mt-1 text-[0.8rem] text-kb-stone">Your advance of</p>
      <p className="font-mono text-2xl font-medium text-kb-green">₹3,36,000</p>
      <p className="text-[0.8rem] text-kb-stone">is approved</p>
      <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-kb-sky-wash px-2 py-0.5 text-[0.7rem] font-bold text-kb-monsoon">
        <ShieldCheck className="h-3.5 w-3.5" /> Approved by partner lender
      </p>
    </FloatCard>
  );
}
