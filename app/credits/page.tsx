import type { Metadata } from 'next';
import PageHero from '@/components/sections/PageHero';
import Section from '@/components/ui/Section';
import credits from '@/content/credits.json';
import { PRODUCTS } from '@/content/products';

export const metadata: Metadata = { title: 'Photo credits', description: 'Attribution for photos, icons and product images used on the Kisan Bandhu site.', alternates: { canonical: '/credits' } };

export default function CreditsPage() {
  return (
    <>
      <PageHero eyebrow="Credits" title="Photo & image credits" lead="Thank you to the photographers whose work shows the plantation belt. Photos are from Wikimedia Commons under the licences listed." />
      <Section tone="rice" tight>
        <div className="overflow-x-auto rounded-[20px] ring-1 ring-kb-ink/10">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-kb-husk">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Photographer</th>
                <th className="p-3">Source</th>
                <th className="p-3">Licence</th>
              </tr>
            </thead>
            <tbody>
              {credits.map((c) => (
                <tr key={c.file} className="border-t border-kb-ink/10">
                  <td className="p-3">{c.alt}</td>
                  <td className="p-3">{c.photographerUrl ? <a className="text-kb-green underline" href={c.photographerUrl} rel="noopener noreferrer" target="_blank">{c.photographer}</a> : c.photographer}</td>
                  <td className="p-3">
                    <a className="text-kb-green underline" href={c.photoUrl} rel="noopener noreferrer" target="_blank">
                      {c.source}
                    </a>
                  </td>
                  <td className="p-3">{c.license}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2 className="h3 mt-12">Brand icons</h2>
        <p className="mt-2">WhatsApp, YouTube, Instagram, Facebook, X, Google Play and App Store glyphs from the Simple Icons project (CC0). All trademarks belong to their owners.</p>
        <h2 className="h3 mt-10">Product images</h2>
        <p className="mt-2">
          Product names, pack images and specifications belong to their manufacturers and are shown for demonstration only. Kisan Bandhu is not yet an authorised seller of these products. Sources:
        </p>
        <ul className="mt-4 space-y-1 text-sm">
          {PRODUCTS.filter((p) => p.imageSource !== 'placeholder').map((p) => (
            <li key={p.slug}>
              {p.name} — {p.manufacturer} ·{' '}
              <a className="text-kb-green underline" href={p.imageSourceUrl} rel="noopener noreferrer" target="_blank">
                {p.imageSource === 'official' ? 'manufacturer page' : 'marketplace listing'}
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
