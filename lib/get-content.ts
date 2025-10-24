import { Locale } from '@/i18n.config';
import { landingPageContent as frContent } from './content/landing-page';
import { landingPageContent as enContent } from './content/landing-page-en';

const content = {
  fr: frContent,
  en: enContent,
};

export function getContent(locale: Locale) {
  return content[locale] || content.fr;
}
