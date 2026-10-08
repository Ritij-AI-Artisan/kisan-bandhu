'use client';
import { LANGS, useLang } from './LangProvider';

/** EN · ಕನ್ನಡ · తెలుగు · हिंदी segmented switch. */
export default function LanguageSwitch({ dark = false, large = false }: { dark?: boolean; large?: boolean }) {
  const { lang, setLang, t } = useLang();
  return (
    <div role="group" aria-label={t('nav.language')} className={`flex items-center rounded-full p-1 ring-1 ${dark ? 'ring-kb-ricepaper/25' : 'ring-kb-ink/15'} ${large ? 'w-full' : ''}`}>
      {LANGS.map((l) => {
        const active = l.code === lang;
        return (
          <button
            key={l.code}
            type="button"
            lang={l.code}
            onClick={() => setLang(l.code)}
            aria-pressed={active}
            title={l.name}
            className={`press rounded-full font-semibold transition-colors ${large ? 'min-h-12 flex-1 px-2 text-base' : 'min-h-8 px-2.5 text-[0.8rem]'} ${
              active ? 'bg-kb-green text-white' : dark ? 'text-kb-ricepaper/85 hover:bg-kb-ricepaper/10' : 'text-kb-ink/80 hover:bg-kb-ink/5'
            }`}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
