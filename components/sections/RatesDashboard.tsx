'use client';
import { DEMO_ARECA_FORECAST, DEMO_ARECA_SERIES, DEMO_RATES } from '@/content/rates-demo';
import DemoBadge from '@/components/brand/DemoBadge';

const inr = new Intl.NumberFormat('en-IN');

/** Small inline-SVG line chart of illustrative arecanut prices (no chart library). */
export function PriceLineChart({ withForecast = false, className = '' }: { withForecast?: boolean; className?: string }) {
  const W = 560;
  const H = 220;
  const pad = { l: 52, r: 16, t: 16, b: 28 };
  const all = [...DEMO_ARECA_SERIES, ...(withForecast ? DEMO_ARECA_FORECAST.flat() : [])];
  const min = Math.floor(Math.min(...all) / 1000) * 1000 - 500;
  const max = Math.ceil(Math.max(...all) / 1000) * 1000 + 500;
  const n = DEMO_ARECA_SERIES.length + (withForecast ? DEMO_ARECA_FORECAST.length : 0);
  const x = (i: number) => pad.l + (i / (n - 1)) * (W - pad.l - pad.r);
  const y = (v: number) => pad.t + (1 - (v - min) / (max - min)) * (H - pad.t - pad.b);
  const line = DEMO_ARECA_SERIES.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
  const last = DEMO_ARECA_SERIES.length - 1;
  const f0 = DEMO_ARECA_SERIES[last];
  const band = withForecast
    ? [
        `M${x(last)} ${y(f0)}`,
        ...DEMO_ARECA_FORECAST.map(([, , hi], i) => `L${x(last + i + 1)} ${y(hi)}`),
        ...[...DEMO_ARECA_FORECAST].reverse().map(([lo], i) => `L${x(last + DEMO_ARECA_FORECAST.length - i)} ${y(lo)}`),
        'Z',
      ].join(' ')
    : '';
  const mid = withForecast ? [`M${x(last)} ${y(f0)}`, ...DEMO_ARECA_FORECAST.map(([, m], i) => `L${x(last + i + 1)} ${y(m)}`)].join(' ') : '';
  const ticks = [min + 500, (min + max) / 2, max - 500];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={`w-full ${className}`} role="img" aria-label={`Illustrative arecanut Rashi price chart, ₹/quintal, 12 weeks${withForecast ? ' plus a 4-week forecast band' : ''}. Demo data.`}>
      {ticks.map((v) => (
        <g key={v}>
          <line x1={pad.l} x2={W - pad.r} y1={y(v)} y2={y(v)} stroke="#1E2A1F" strokeOpacity=".08" />
          <text x={pad.l - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="#6B7066" fontFamily="var(--ff-mono)">
            ₹{inr.format(v / 1000)}k
          </text>
        </g>
      ))}
      {withForecast && (
        <>
          <path d={band} fill="#1F4E79" fillOpacity=".14" />
          <path d={mid} fill="none" stroke="#1F4E79" strokeWidth="2.5" strokeDasharray="6 5" />
          <line x1={x(last)} x2={x(last)} y1={pad.t} y2={H - pad.b} stroke="#1F4E79" strokeOpacity=".3" strokeDasharray="3 4" />
          <text x={x(last) + 6} y={pad.t + 10} fontSize="11" fill="#1F4E79" fontWeight="700">
            Forecast (illustrative)
          </text>
        </>
      )}
      <path d={`${line} L${x(last)} ${H - pad.b} L${x(0)} ${H - pad.b} Z`} fill="#2E7D32" fillOpacity=".08" />
      <path d={line} fill="none" stroke="#2E7D32" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={x(last)} cy={y(f0)} r="5" fill="#F2A900" stroke="#fff" strokeWidth="2" />
      <text x={pad.l} y={H - 8} fontSize="11" fill="#6B7066">
        12 weeks ago
      </text>
      <text x={x(last)} y={H - 8} fontSize="11" fill="#6B7066" textAnchor={withForecast ? 'middle' : 'end'}>
        This week
      </text>
    </svg>
  );
}

/** Live-rates + forecast dashboard (demo data) used on /technology. */
export default function RatesDashboard() {
  return (
    <div className="rounded-[24px] bg-white p-5 shadow-kb ring-1 ring-kb-ink/5 md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow">Live rates dashboard</p>
          <p className="h3 mt-1">Arecanut (Rashi) · Shivamogga</p>
        </div>
        <DemoBadge />
      </div>
      <PriceLineChart withForecast className="mt-4" />
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {DEMO_RATES.slice(0, 6).map((r) => (
          <div key={r.crop + r.grade} className="flex items-center justify-between rounded-xl bg-kb-ricepaper px-3 py-2 text-sm">
            <span>
              <span className="font-bold">{r.crop.charAt(0) + r.crop.slice(1).toLowerCase()}</span> <span className="text-kb-stone">· {r.grade}, {r.market}</span>
            </span>
            <span className="font-mono">
              ₹{inr.format(r.price)}/{r.unit}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-kb-stone">Illustrative values for demonstration only — not live market data. Future source: daily APMC, CAMPCO and Spices Board prices.</p>
    </div>
  );
}
