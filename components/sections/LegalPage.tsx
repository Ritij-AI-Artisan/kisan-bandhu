import type { ReactNode } from 'react';
import PageHero from './PageHero';
import Section from '@/components/ui/Section';

export default function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <PageHero eyebrow="Draft, under legal review" title={title} lead={`Last updated ${updated}.`} />
      <Section tone="rice" tight>
        <div className="prose-kb mx-auto max-w-3xl space-y-5 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_li]:ml-5 [&_li]:list-disc [&_a]:text-kb-green [&_a]:underline">{children}</div>
      </Section>
    </>
  );
}
