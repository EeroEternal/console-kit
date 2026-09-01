import { create } from 'zustand';
import zh from './locales/zh';
import en from './locales/en';

type Locale = 'zh' | 'en';

const translations: Record<Locale, any> = { zh, en };

interface I18nState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string, fallback?: string) => string;
}

export const useI18n = create<I18nState>((set, get) => ({
  locale: 'zh',
  setLocale: (locale: Locale) => set({ locale }),
  t: (path: string, fallback?: string) => {
    const { locale } = get();
    const keys = path.split('.');
    let current: any = translations[locale];
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return fallback || path;
      }
    }
    return typeof current === 'string' ? current : fallback || path;
  },
}));
