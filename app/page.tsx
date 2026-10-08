import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import TickerTape from '@/components/motion/TickerTape';
import BringTogether from '@/components/sections/BringTogether';
import Problem from '@/components/sections/Problem';
import Services from '@/components/sections/Services';
import HowItWorks from '@/components/sections/HowItWorks';
import HubsBlock from '@/components/sections/HubsBlock';
import ComingSoon from '@/components/sections/ComingSoon';
import Impact from '@/components/sections/Impact';
import { SITE_URL } from '@/content/site';

// Below-the-fold, carousel/tab heavy sections are split into their own chunks.
const SmartTools = dynamic(() => import('@/components/sections/SmartTools'));
const CoreModels = dynamic(() => import('@/components/sections/CoreModels'));
const ProductsTeaser = dynamic(() => import('@/components/sections/ProductsTeaser'));
const Trust = dynamic(() => import('@/components/sections/Trust'));
const CTA = dynamic(() => import('@/components/sections/CTA'));

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kisan Bandhu',
    alternateName: ['ಕಿಸಾನ್ ಬಂಧು', 'किसान बंधु'],
    url: SITE_URL,
    logo: `${SITE_URL}/brand/kb-logo-primary.svg`,
    slogan: 'Har kadam, kisan ke saath',
    founder: [
      { '@type': 'Person', name: 'Nanditha Lokesh', jobTitle: 'CEO' },
      { '@type': 'Person', name: 'Ritij Srivastava', jobTitle: 'COO' },
    ],
    address: { '@type': 'PostalAddress', addressLocality: 'Bengaluru', addressRegion: 'Karnataka', addressCountry: 'IN' },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <TickerTape />
      <BringTogether />
      <Problem />
      <Services />
      <HowItWorks />
      <HubsBlock />
      <SmartTools />
      <CoreModels />
      <ComingSoon />
      <ProductsTeaser />
      <Impact />
      <Trust />
      <CTA />
    </>
  );
}
