import { notFound } from "next/navigation";

export const i18nDefaultLanguage = "en";
export const i18nSupportedLanguages = [i18nDefaultLanguage];
const i18nSupportedLanguagesNotMutable = [i18nDefaultLanguage] as const;

export type SupportedLanguages =
  (typeof i18nSupportedLanguagesNotMutable)[number];

export const getI18nLocale = async (locale: SupportedLanguages) =>
  (await import(`../locales/${locale}.json`)).default;

export const localeHandler = async (locale: SupportedLanguages) => {
  try {
    return await getI18nLocale(locale);
  } catch (error) {
    notFound();
  }
};
