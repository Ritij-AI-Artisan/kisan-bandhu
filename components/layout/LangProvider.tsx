'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import en from '@/content/i18n/en.json';
// TODO human review: kn, te and hi dictionaries are machine-drafted.
import kn from '@/content/i18n/kn.json';
import te from '@/content/i18n/te.json';
import hi from '@/content/i18n/hi.json';

export const LANGS = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'kn', label: 'ಕನ್ನಡ', name: 'Kannada' },
  { code: 'te', label: 'తెలుగు', name: 'Telugu' },
  { code: 'hi', label: 'हिंदी', name: 'Hindi' },
] as const;
export type Lang = (typeof LANGS)[number]['code'];

const DICTS: Record<Lang, unknown> = { en, kn, te, hi };
const STORAGE_KEY = 'kb-lang';

function lookup(dict: unknown, key: string): unknown {
  return key.split('.').reduce<unknown>((o, k) => (o && typeof o === 'object' ? (o as Record<string, unknown>)[k] : undefined), dict);
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string; tList: (key: string) => string[] };
const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    let initial: string | null = null;
    try {
      initial = new URLSearchParams(window.location.search).get('lang') ?? localStorage.getItem(STORAGE_KEY);
    } catch {}
    if (initial && initial in DICTS && initial !== 'en') setLangState(initial as Lang);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en-IN' : lang;
    document.documentElement.dataset.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  }, []);

  const value = useMemo<Ctx>(() => {
    const t = (key: string) => {
      const v = lookup(DICTS[lang], key) ?? lookup(en, key);
      return typeof v === 'string' ? v : key;
    };
    const tList = (key: string) => {
      const v = lookup(DICTS[lang], key) ?? lookup(en, key);
      return Array.isArray(v) ? (v as string[]) : [];
    };
    return { lang, setLang, t, tList };
  }, [lang, setLang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>');
  return ctx;
}

/** Translated text that can be dropped into server components. */
export function T({ k }: { k: string }) {
  return <>{useLang().t(k)}</>;
}
