export const locales = ["en", "sq", "de"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  sq: "Shqip",
  de: "Deutsch",
};

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);
