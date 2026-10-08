// "Ideas proven elsewhere" — text credits only, never third-party logos.
export type ModelStatus = 'phase1' | 'soon' | 'pilot';

export const MODELS: { title: string; benefit: string; inspiredBy: string; status: ModelStatus; statusLabel?: string }[] = [
  { title: 'Village hubs', benefit: 'Weigh, dry, grade and store your crop within a short drive of home.', inspiredBy: 'Releaf, Nigeria', status: 'phase1' },
  { title: 'Hold & Earn', benefit: 'Store at harvest, borrow against your stock, and sell later when prices are better.', inspiredBy: 'Arya.ag / e-NWR, India', status: 'soon' },
  { title: 'Pooled buying + buyer demand board', benefit: 'Your village orders together for lower prices; buyers post what they need.', inspiredBy: 'Pinduoduo, China', status: 'phase1' },
  { title: 'Smart pest traps', benefit: 'Camera traps count pests and warn you before the damage is visible.', inspiredBy: 'Trapview (Slovenia) & Semios (Canada)', status: 'pilot' },
  { title: 'Verified marketplace', benefit: 'You set the price; buyers see the grade, verified at the hub.', inspiredBy: 'Algrano, Switzerland', status: 'soon' },
  { title: 'Pre-harvest contracts', benefit: 'A buyer commits early and you get an advance — without being tied to a trader.', inspiredBy: 'Algrano & Apollo Agriculture', status: 'soon' },
  { title: 'Trust Score credit', benefit: 'Your real farming and selling record helps you get fairer credit.', inspiredBy: 'Apollo Agriculture, Kenya', status: 'soon', statusLabel: 'Coming soon · via regulated lenders' },
  { title: 'Thirsty-tree sensors', benefit: 'Small trunk sensors tell you when palms need water, before they wilt.', inspiredBy: 'Phytech, Israel', status: 'pilot' },
];

export const COMING_SOON_WORDS = [
  'Logistics network',
  'Export buyers',
  'Areca leaf plates',
  'Biochar',
  'Coconut husk products',
  'Carbon credits',
  'Crop insurance via partners',
  'More crops',
  'More states',
];
