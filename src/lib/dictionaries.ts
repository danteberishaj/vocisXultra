import "server-only";
import type { Dictionary } from "@/dictionaries/en";
import type { Locale } from "@/lib/locales";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/dictionaries/en").then((m) => m.en),
  sq: () => import("@/dictionaries/sq").then((m) => m.sq),
  de: () => import("@/dictionaries/de").then((m) => m.de),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();
export type { Dictionary };
