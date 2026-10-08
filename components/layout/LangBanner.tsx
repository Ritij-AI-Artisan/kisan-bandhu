'use client';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useLang, type Lang } from './LangProvider';

const KEY = 'kb-lang-banner-dismissed';

/** First-visit banner offering the Indic languages. Dismissal is remembered per browser. */
export default function LangBanner() {
  const { lang, setLang, t } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      setShow(!localStorage.getItem(KEY) && !localStorage.getItem('kb-lang'));
    } catch {
      setShow(true);
    }
  }, []);

  const dismiss = () => {
    setShow(false);
    try {
      localStorage.setItem(KEY, '1');
    } catch {}
  };
  const pick = (l: Lang) => {
    setLang(l);
    dismiss();
  };

  if (!show || lang !== 'en') return null;
  return (
    <div className="fixed left-0 right-[84px] z-40 px-3 sm:px-6 lg:right-0" style={{ bottom: 'max(16px, env(safe-area-inset-bottom))' }}>
      <div className="mx-auto flex max-w-xl items-center gap-2 rounded-2xl bg-kb-forest-night px-3 py-2 text-kb-ricepaper shadow-kb-lg ring-1 ring-kb-sprout-lime/30">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-1 gap-y-1 text-[0.95rem]">
          <button type="button" lang="kn" onClick={() => pick('kn')} className="min-h-11 rounded-full px-2 font-semibold underline-offset-4 hover:underline" style={{ fontFamily: 'var(--ff-kn)' }}>
            ಕನ್ನಡದಲ್ಲಿ ನೋಡಿ
          </button>
          <span aria-hidden className="text-kb-sprout-lime">·</span>
          <button type="button" lang="te" onClick={() => pick('te')} className="min-h-11 rounded-full px-2 font-semibold underline-offset-4 hover:underline" style={{ fontFamily: 'var(--ff-te)' }}>
            తెలుగులో చూడండి
          </button>
          <span aria-hidden className="text-kb-sprout-lime">·</span>
          <button type="button" lang="hi" onClick={() => pick('hi')} className="min-h-11 rounded-full px-2 font-semibold underline-offset-4 hover:underline" style={{ fontFamily: 'var(--ff-hi)' }}>
            हिंदी में देखें
          </button>
        </div>
        <button type="button" onClick={dismiss} aria-label={t('banner.dismiss')} className="grid h-11 w-11 shrink-0 place-items-center rounded-full hover:bg-kb-ricepaper/10">
          <X className="h-5 w-5" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}
