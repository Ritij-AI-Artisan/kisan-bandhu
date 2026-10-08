import type { Metadata } from 'next';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import PageHero from '@/components/sections/PageHero';
import Section from '@/components/ui/Section';
import { ADDRESS, EMAIL, GRIEVANCE_OFFICER, PHONE, waLink } from '@/content/site';
import ContactTabs from './ContactTabs';

export const metadata: Metadata = { title: 'Contact', description: 'Talk to Kisan Bandhu on WhatsApp, phone or email.', alternates: { canonical: '/contact' } };

export default function ContactPage() {
  const items = [
    { icon: MessageCircle, label: 'WhatsApp', value: PHONE, href: waLink('Namaskara, I want to know about Kisan Bandhu') },
    { icon: Phone, label: 'Phone', value: PHONE, href: `tel:${PHONE.replace(/\s/g, '')}` },
    { icon: Mail, label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: MapPin, label: 'Office', value: ADDRESS, href: undefined },
  ];
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to us" lead="Farmers, partners and investors — pick what fits you. All contact details are placeholders until launch." />
      <Section tone="rice" tight>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div className="space-y-3">
            {items.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4 rounded-[20px] bg-kb-husk p-5">
                <Icon className="h-6 w-6 text-kb-green" strokeWidth={1.75} />
                <div>
                  <p className="text-sm font-bold text-kb-stone">{label}</p>
                  {href ? (
                    <a href={href} className="font-semibold underline-offset-4 hover:underline" {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      {value}
                    </a>
                  ) : (
                    <p className="font-semibold">{value}</p>
                  )}
                </div>
              </div>
            ))}
            <div className="rounded-[20px] bg-kb-sky-wash p-5">
              <p className="font-bold">Grievance contact</p>
              <p className="mt-1 text-[0.95rem]">
                {GRIEVANCE_OFFICER.name} · {GRIEVANCE_OFFICER.email}
                <br />
                <span className="text-kb-stone">To be appointed before credit services launch.</span>
              </p>
            </div>
          </div>
          <ContactTabs />
        </div>
      </Section>
    </>
  );
}
