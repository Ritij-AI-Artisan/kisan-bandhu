// ILLUSTRATIVE demo values only — not live market data. Never present these as real prices.
export type DemoRate = { crop: string; grade: string; market: string; price: number; unit: string };

export const DEMO_RATES: DemoRate[] = [
  { crop: 'ARECANUT', grade: 'Rashi', market: 'Shivamogga', price: 48200, unit: 'qtl' },
  { crop: 'ARECANUT', grade: 'Chali', market: 'Puttur', price: 43600, unit: 'qtl' },
  { crop: 'COCONUT', grade: 'Copra (milling)', market: 'Tiptur', price: 16800, unit: 'qtl' },
  { crop: 'COCONUT', grade: 'Ball copra', market: 'Tiptur', price: 19400, unit: 'qtl' },
  { crop: 'BLACK PEPPER', grade: 'Garbled', market: 'Kochi', price: 66500, unit: 'qtl' },
  { crop: 'COFFEE', grade: 'Robusta cherry', market: 'Chikkamagaluru', price: 11200, unit: '50 kg' },
  { crop: 'COFFEE', grade: 'Arabica parchment', market: 'Madikeri', price: 18900, unit: '50 kg' },
  { crop: 'CASHEW', grade: 'Raw nut', market: 'Mangaluru', price: 13400, unit: 'qtl' },
];

/** 12 weeks of illustrative arecanut (Rashi) prices, ₹/qtl, for the small chart. */
export const DEMO_ARECA_SERIES = [45200, 45800, 45100, 46300, 46900, 46400, 47200, 47900, 47300, 48100, 48600, 48200];

/** Illustrative 4-week forecast band: [low, mid, high]. */
export const DEMO_ARECA_FORECAST: [number, number, number][] = [
  [47600, 48500, 49300],
  [47300, 48800, 50100],
  [47000, 49100, 50900],
  [46800, 49300, 51600],
];
