/**
 * Portrait image paths, mapped positionally to the `foundation.people` and
 * `ensemble.membership.voices[].singers` arrays in the dictionaries.
 *
 * The `Dictionary` type forces every locale to share the same array order, so
 * index mapping is stable — keep these lists in sync when adding a person.
 *
 * ⚠ MOSTLY PLACEHOLDERS — every file except the two marked below is an
 * AI-generated portrait, not a photograph of the person named. Replace the
 * rest with real headshots before the site goes live.
 */

export const managementPortraits = [
  "/images/team/management-1.webp", // real — Emanuel Mates at the organ
  "/images/team/management-2.webp", // real — Kristijan Ramaj
  "/images/team/management-3.webp",
  "/images/team/management-4.webp", // real — Liberta Shtimjani
  "/images/team/management-5.webp",
] as const;

/**
 * Indexed by voice group, then by singer within that group — matching the
 * order of `ensemble.membership.voices`. Positional rather than keyed by part
 * name, because the part names are translated ("Bass" / "Bas" / "Bass").
 */
export const memberPortraits = [
  ["/images/team/member-1.webp", "/images/team/member-2.webp"], // Soprano
  ["/images/team/member-3.webp", "/images/team/member-4.webp"], // Alto
  ["/images/team/member-5.webp", "/images/team/member-6.webp"], // Tenor
  ["/images/team/member-7.webp", "/images/team/member-8.webp"], // Bass
] as const;
