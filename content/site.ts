// Contact details and manually updated counters. Everything marked TODO is a placeholder.
export const SITE_URL = 'https://kisanbandhu.in'; // TODO: replace with the production domain once bought
export const WHATSAPP_NUMBER = '91XXXXXXXXXX'; // TODO: real WhatsApp Business number (country code, no +)
export const PHONE = '+91 XXXXX XXXXX'; // TODO
export const EMAIL = 'hello@kisanbandhu.in'; // TODO: placeholder address
export const INVESTOR_EMAIL = 'invest@kisanbandhu.in'; // TODO: placeholder address
export const ADDRESS = 'Bengaluru, Karnataka'; // TODO: full office address
export const GRIEVANCE_OFFICER = {
  name: '[Name]', // TODO: to be appointed before credit services launch
  email: 'grievance@kisanbandhu.in', // TODO: placeholder address
};

/** Real counters. Leave as null until there is real data — the site then shows "—". */
export const COUNTERS: { farmers: number | null; villages: number | null; jobs: number | null; lois: number | null; partners: number | null; pilots: number | null } = {
  farmers: null,
  villages: null,
  jobs: null,
  lois: null, // TODO: update manually from Fillout submissions
  partners: null,
  pilots: null,
};

export const SOCIAL = {
  youtube: '#', // TODO
  instagram: '#', // TODO
  facebook: '#', // TODO
  x: '#', // TODO
  linkedin: '#', // TODO
};

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
