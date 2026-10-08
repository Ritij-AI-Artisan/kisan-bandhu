import type { Metadata } from 'next';
import LegalPage from '@/components/sections/LegalPage';

export const metadata: Metadata = { title: 'Terms of use', description: 'Draft terms of use for the Kisan Bandhu demo website.', alternates: { canonical: '/terms' } };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" updated="October 2026">
      <p>This is a draft under legal review. By using this website you agree to these terms.</p>
      <h2>A demo website</h2>
      <p>This site explains services Kisan Bandhu plans to offer. Screens, charts, prices, rates and scores marked “Demo · Illustrative” are examples, not offers or real market data. Services marked “Coming soon” or “Pilot” are not yet available.</p>
      <h2>No lending, no guarantees</h2>
      <p>Kisan Bandhu does not lend money. Credit, where offered, will be provided by RBI-regulated partner banks and NBFCs on their own terms, which will be shown before you agree. We do not guarantee prices, loans, returns or interest rates.</p>
      <h2>Products</h2>
      <p>Product names, images and specifications belong to their manufacturers. Kisan Bandhu is not yet an authorised seller of the products shown. Always read the label and follow the dose on the pack.</p>
      <h2>Registering interest</h2>
      <p>Submitting the registration form is a non-binding letter of intent. It does not create a contract or any obligation for you or for us.</p>
      <h2>Contact</h2>
      <p>Questions? Use the contact page.</p>
    </LegalPage>
  );
}
