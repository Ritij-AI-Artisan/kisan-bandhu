import type { Metadata } from 'next';
import FarmersContent from './FarmersContent';

export const metadata: Metadata = {
  title: 'For Farmers',
  description: 'Genuine inputs at group prices, machines and workers on time, advice in your language, village hubs and pay-from-harvest through regulated partners.',
  alternates: { canonical: '/farmers', languages: { kn: '/farmers?lang=kn', te: '/farmers?lang=te', hi: '/farmers?lang=hi' } },
};

export default function Page() {
  return <FarmersContent />;
}
