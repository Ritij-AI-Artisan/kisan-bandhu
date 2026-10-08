import type { Metadata } from 'next';
import LegalPage from '@/components/sections/LegalPage';
import { EMAIL, GRIEVANCE_OFFICER } from '@/content/site';

export const metadata: Metadata = { title: 'Privacy policy', description: 'How Kisan Bandhu collects and uses your data (draft, DPDP Act 2023 aligned).', alternates: { canonical: '/privacy' } };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="October 2026">
      <p>
        This draft explains how Kisan Bandhu (“we”) handles personal data under India’s Digital Personal Data Protection Act, 2023. It is under legal review and will be finalised before any service
        launches.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li>Your name and phone number</li>
        <li>Your village, taluk and district</li>
        <li>The crops you grow and your approximate acreage</li>
        <li>How you heard about us (for example, the “source” in the link you used)</li>
      </ul>
      <p>
        <strong>We never collect Aadhaar numbers, bank account details or passwords on this website.</strong>
      </p>
      <h2>Why we collect it</h2>
      <p>To plan Kisan Bandhu services — hubs, inputs, bookings and advice — for your village, and to contact you on WhatsApp or by phone about them.</p>
      <h2>Consent and withdrawal</h2>
      <p>We process your data only with your consent, given on the registration form. You can withdraw consent at any time by messaging us on WhatsApp or emailing {EMAIL}; we will then stop processing and delete your data unless the law requires us to keep it.</p>
      <h2>How long we keep it</h2>
      <p>Only as long as needed to plan and provide services, and no longer than 24 months after your last interaction unless you ask us to keep it.</p>
      <h2>Who processes it for us</h2>
      <ul>
        <li>Fillout — hosts our registration forms</li>
        <li>Vercel — hosts this website</li>
      </ul>
      <p>These processors act only on our instructions. We do not use analytics or advertising trackers on this site.</p>
      <h2>No sale of data</h2>
      <p>We never sell your personal data. Any future sharing with a partner lender will happen only with your separate, explicit consent for that purpose.</p>
      <h2>Your rights</h2>
      <p>You can ask to see, correct or erase your data, and to nominate someone to act for you.</p>
      <h2>Grievances</h2>
      <p>
        Grievance officer: {GRIEVANCE_OFFICER.name}, {GRIEVANCE_OFFICER.email} (to be appointed before credit services launch). If you are not satisfied, you may approach the Data Protection Board of
        India.
      </p>
    </LegalPage>
  );
}
