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
  [
    "/images/team/margjela-portrait.webp",
    "/images/team/rite-hyseni-portrait.webp",
    "/images/team/vlera-firza-portrait.webp",
    "/images/team/erleta-elezkurtaj-portrait.webp",
    "/images/team/margarita-berisha-portrait.webp",
    "/images/team/magdalena-sedaj-portrait.webp",
  ], // Alto
  [
    "/images/team/atlantik-syla-portrait.webp",
    "/images/team/edison-qyqalla-portrait.webp",
    "/images/team/emanuel-gjergji-portrait.webp",
    "/images/team/auron-deva-portrait.webp",
  ], // Tenor
  [
    "/images/team/leon-ndou-portrait.webp",
    "/images/team/ardit-hasani-portrait.webp",
    "/images/team/artan-quni-portrait.webp",
    "/images/team/taulant-lleshi-portrait.webp",
    "/images/team/mikel-berisha-portrait.webp",
  ], // Bass
] as const;
