import type { ReactNode } from 'react';
import Photo from '@/components/ui/Photo';
import { Container } from '@/components/ui/Section';

type Props = { eyebrow: ReactNode; title: ReactNode; lead?: ReactNode; photo?: string; tone?: 'dark' | 'light' | 'sky'; children?: ReactNode; finance?: boolean };

/** Inner-page hero. Dark variant sits under the transparent header (pages listed in Header DARK_HERO). */
export default function PageHero({ eyebrow, title, lead, photo, tone = 'light', children, finance }: Props) {
  if (tone === 'dark') {
    return (
      <section className="relative isolate overflow-hidden bg-kb-forest-night text-kb-ricepaper">
        {photo && (
          <div className="absolute inset-0 -z-10">
            <Photo k={photo} sizes="100vw" priority className="h-full w-full" caption={false} />
            <div className="absolute inset-0 bg-gradient-to-r from-kb-forest-night/95 via-kb-forest-night/75 to-kb-forest-night/30" />
          </div>
        )}
        <Container className="pb-16 pt-[calc(var(--header-h)+56px)] md:pb-24 md:pt-[calc(var(--header-h)+88px)]">
          <div className="max-w-3xl">
            <p className="eyebrow on-dark">{eyebrow}</p>
            <h1 className="h1 mt-4 text-balance">{title}</h1>
            {lead && <p className="lead mt-5 text-kb-ricepaper/85">{lead}</p>}
            {children}
          </div>
        </Container>
      </section>
    );
  }
  return (
    <section className={`${tone === 'sky' ? 'bg-kb-sky-wash' : 'bg-kb-husk'} ${finance ? 'finance' : ''}`}>
      <Container className="pb-14 pt-[calc(var(--header-h)+48px)] md:pb-20 md:pt-[calc(var(--header-h)+72px)]">
        <div className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="h1 mt-4 text-balance">{title}</h1>
          {lead && <p className="lead mt-5 text-kb-ink/80">{lead}</p>}
          {children}
        </div>
      </Container>
    </section>
  );
}
