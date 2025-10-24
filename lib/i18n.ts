import { useRouter } from 'next/router';
import enTranslations from '@/locales/en.json';
import frTranslations from '@/locales/fr.json';

type TranslationKey = string;
type Translations = typeof enTranslations;

const translations: Record<string, Translations> = {
  en: enTranslations,
  fr: frTranslations,
};

export function useTranslation() {
  const router = useRouter();
  const { locale = 'en' } = router;

  const t = (key: TranslationKey): string => {
    const keys = key.split('.');
    let value: any = translations[locale];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return { t, locale };
}

export function getStaticTranslation(locale: string, key: TranslationKey): string {
  const keys = key.split('.');
  let value: any = translations[locale] || translations.en;

  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key;
    }
  }

  return typeof value === 'string' ? value : key;
}

export const locales = ['en', 'fr'] as const;
export const defaultLocale = 'en';

export type Locale = typeof locales[number];
