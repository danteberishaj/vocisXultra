/**
 * Portrait image paths, mapped positionally to the `foundation.people` and
 * `ensemble.membership.voices[].singers` arrays in the dictionaries.
 *
 * The `Dictionary` type forces every locale to share the same array order, so
 * index mapping is stable — keep these lists in sync when adding a person.
 *
 * ⚠ PLACEHOLDER IMAGES — these are AI-generated portraits, not photographs of
 * the actual people named. Replace every file with a real headshot before the
 * site goes live.
 */

export const managementPortraits = [
  "/images/team/management-1.webp",
  "/images/team/management-2.webp",
  "/images/team/management-3.webp",
  "/images/team/management-4.webp",
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
