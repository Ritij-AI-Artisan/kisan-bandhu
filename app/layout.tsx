import type { Metadata, Viewport } from 'next';
import { Fraunces, Bricolage_Grotesque, Manrope, Instrument_Serif, JetBrains_Mono, Baloo_Tamma_2, Baloo_2, Baloo_Tammudu_2 } from 'next/font/google';
import './globals.css';
import { LangProvider } from '@/components/layout/LangProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFab from '@/components/layout/WhatsAppFab';
import LangBanner from '@/components/layout/LangBanner';
import SproutLoader from '@/components/layout/SproutLoader';
import { SITE_URL } from '@/content/site';

// next/font downloads and self-hosts every font at build time — no runtime requests to Google.
const fraunces = Fraunces({ subsets: ['latin'], axes: ['opsz'], variable: '--font-fraunces', display: 'swap' });
const bricolage = Bricolage_Grotesque({ subsets: ['latin'], weight: ['700', '800'], variable: '--font-bricolage', display: 'swap', preload: false });
const manrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-manrope', display: 'swap' });
const instrument = Instrument_Serif({ subsets: ['latin'], weight: '400', style: 'italic', variable: '--font-instrument', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], weight: ['500'], variable: '--font-jetbrains', display: 'swap', preload: false });
const balooTamma = Baloo_Tamma_2({ subsets: ['kannada'], weight: ['500', '700'], variable: '--font-baloo-tamma', display: 'swap', preload: false });
const baloo = Baloo_2({ subsets: ['devanagari'], weight: ['500', '700'], variable: '--font-baloo', display: 'swap', preload: false });
const balooTammudu = Baloo_Tammudu_2({ subsets: ['telugu'], weight: ['500', '700'], variable: '--font-baloo-tammudu', display: 'swap', preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Kisan Bandhu — Har kadam, kisan ke saath', template: 'Kisan Bandhu — %s' },
  description:
    'Kisan Bandhu is one trusted partner for every step of the farm season for plantation farmers in Karnataka, Kerala, Andhra Pradesh, Telangana and Tamil Nadu: genuine inputs, machines, workers, village hubs and fair prices.',
  applicationName: 'Kisan Bandhu',
  openGraph: { type: 'website', siteName: 'Kisan Bandhu', locale: 'en_IN' },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/', languages: { 'en-IN': '/', kn: '/?lang=kn', te: '/?lang=te', hi: '/?lang=hi' } },
};

export const viewport: Viewport = {
  themeColor: '#143D1E',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fonts = [fraunces, bricolage, manrope, instrument, jetbrains, balooTamma, baloo, balooTammudu].map((f) => f.variable).join(' ');
  return (
    <html lang="en-IN" data-lang="en" className={fonts}>
      <body className="min-h-dvh overflow-x-clip">
        <a href="#main" className="sr-only z-[200] rounded-full bg-kb-gold px-4 py-2 font-bold text-kb-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        <LangProvider>
          <SproutLoader />
          <Header />
          <LangBanner />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppFab />
        </LangProvider>
      </body>
    </html>
  );
}
