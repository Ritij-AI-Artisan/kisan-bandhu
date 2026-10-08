'use client';
import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { Mail } from 'lucide-react';
import { EMAIL, waLink } from '@/content/site';

const SRC = 'https://server.fillout.com/embed/v1/';

type Props = {
  id?: string;
  minHeight?: number;
  /** Mount the embed only when scrolled near (for below-the-fold placements). */
  lazy?: boolean;
  /** Short label used in the fallback WhatsApp message. */
  context?: string;
};

/**
 * Fillout "standard" embed. Fillout scans the page for [data-fillout-id] when its script runs, so on every
 * mount (hard load or client-side navigation) we append a fresh copy of the script after the div exists.
 * `data-fillout-inherit-parameters` passes URL query params (e.g. ?source=…&hub=…) through to the form.
 */
export default function FilloutEmbed({ id = '3mxyVM8BS9us', minHeight = 500, lazy = false, context = 'the form' }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(!lazy);
  const mountKey = useId();
  const isPlaceholder = id.startsWith('TODO');

  useEffect(() => {
    if (visible || isPlaceholder) return;
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible, isPlaceholder]);

  useEffect(() => {
    if (!visible || isPlaceholder) return;
    document.querySelectorAll(`script[data-kb-fillout]`).forEach((s) => s.remove());
    const s = document.createElement('script');
    s.src = SRC;
    s.async = true;
    s.dataset.kbFillout = '1';
    document.body.appendChild(s);
  }, [visible, isPlaceholder, mountKey]);

  if (isPlaceholder) {
    return (
      <div className="grid min-h-[260px] place-items-center rounded-[24px] border-2 border-dashed border-kb-ink/15 bg-kb-ricepaper p-8 text-center">
        <div className="max-w-md">
          <p className="h3">Form coming soon</p>
          <p className="mt-2 text-kb-stone">
            Meanwhile, email us at{' '}
            <a className="font-semibold text-kb-green underline underline-offset-4" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>{' '}
            <span className="text-xs">[placeholder]</span> or WhatsApp us.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a href={waLink(`Namaskara, I'd like to talk about ${context}.`)} target="_blank" rel="noopener noreferrer" className="press inline-flex min-h-11 items-center gap-2 rounded-full bg-whatsapp px-5 font-bold text-kb-ink">
              WhatsApp us
            </a>
            <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(context)}`} className="press inline-flex min-h-11 items-center gap-2 rounded-full px-5 font-bold ring-[1.5px] ring-kb-ink">
              <Mail className="h-4 w-4" strokeWidth={1.75} /> Email
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={wrap}>
      <div className="-mx-4 rounded-none bg-kb-ricepaper p-2 shadow-kb sm:mx-0 sm:rounded-[24px] sm:p-4" style={{ minHeight }}>
        {visible ? (
          <div
            key={mountKey}
            style={{ width: '100%', height: minHeight }}
            data-fillout-id={id}
            data-fillout-embed-type="standard"
            data-fillout-inherit-parameters=""
            data-fillout-dynamic-resize=""
          />
        ) : (
          <div className="grid h-[500px] place-items-center text-kb-stone">Loading form…</div>
        )}
        <noscript>
          <p className="p-4">This form needs JavaScript. Please message us on WhatsApp instead.</p>
        </noscript>
      </div>
      <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-kb-stone">
        <span>
          Form not loading?{' '}
          <a href={waLink('Namaskara, I want to register with Kisan Bandhu.')} target="_blank" rel="noopener noreferrer" className="font-semibold text-kb-green underline underline-offset-4">
            Message us on WhatsApp
          </a>
        </span>
        <span aria-hidden>·</span>
        <Link href="/privacy" className="underline underline-offset-4">
          How we use your data
        </Link>
      </p>
    </div>
  );
}
