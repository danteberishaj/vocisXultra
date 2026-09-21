/**
 * Portrait image paths, mapped positionally to the `foundation.people` and
 * `ensemble.membership.voices[].singers` arrays in the dictionaries.
 *
 * The `Dictionary` type forces every locale to share the same array order, so
 * index mapping is stable — keep these lists in sync when adding a person.
 *
 * ⚠ MOSTLY PLACEHOLDERS — every file except the four marked below is an
 * AI-generated portrait, not a photograph of the person named. Replace the
 * rest with real headshots before the site goes live.
 */

export const managementPortraits = [
  "/images/team/management-1.webp", // real — Emanuel Mates at the organ
  "/images/team/management-2.webp", // real — Kristijan Ramaj
  "/images/team/arta-jashari.png", // real — Arta Jashari
] as const;

/**
 * Indexed by voice group, then by singer within that group — matching the
 * order of `ensemble.membership.voices`. Positional rather than keyed by part
 * name, because the part names are translated ("Bass" / "Bas" / "Bass").
 */
export const memberPortraits = [
  ["/images/team/elife-podvorica-jashari.jpg", "/images/team/diellza-dedushi.jpg", "/images/team/martina-lekaj.jpg", "/images/team/teuta-morina.jpg"], // Soprano
  ["/images/team/blenda-kelmendi.jpg"], // Alto
  ["/images/team/erdonis-gashi.jpg"], // Tenor
  ["/images/team/leon-ndou.jpg", "/images/team/taulant-lleshi.jpg"], // Bass
] as const;
