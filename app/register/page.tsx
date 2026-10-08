import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/sections/PageHero';
import Section from '@/components/ui/Section';
import FilloutEmbed from '@/components/forms/FilloutEmbed';
import { FORMS } from '@/content/forms';

export const metadata: Metadata = {
  title: 'Register interest',
  description: 'Tell us about your farm — it takes about 5 minutes. Your details are used only to plan Kisan Bandhu services in your village.',
  alternates: { canonical: '/register' },
};

export default function RegisterPage() {
  return (
    <>
      <PageHero
        eyebrow="Register interest · Letter of Intent"
        title="Tell us about your farm"
        lead="It takes about 5 minutes. Your details are used only to plan Kisan Bandhu services in your village and are never sold."
      />
      <Section tone="rice" tight>
        <div className="mx-auto max-w-3xl">
          <FilloutEmbed id={FORMS.loi} context="registering as a farmer" />
          <p className="mt-6 rounded-[20px] bg-kb-sage p-5 text-[0.95rem]">
            By submitting, you agree that Kisan Bandhu may contact you on WhatsApp or by phone about services in your area. You can withdraw consent at any time. We never ask for Aadhaar or bank
            details. Read our{' '}
            <Link href="/privacy" className="font-semibold text-kb-green underline underline-offset-4">
              privacy policy
            </Link>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
