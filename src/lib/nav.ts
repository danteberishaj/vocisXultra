import type { Dictionary } from "@/dictionaries/en";

export type NavChild = { id: string; label: string };
export type NavEntry = { id: string; label: string; children: NavChild[] };

/**
 * The navigation tree.
 *
 * Every child label reuses a heading that already exists in the dictionaries,
 * so adding the menu introduced no new strings to translate. The ids match the
 * anchors added to each subsection.
 *
 * Contact deliberately has no children — a dropdown holding a single item is
 * worse than no dropdown.
 */
export function buildNav(dict: Dictionary): NavEntry[] {
  const { nav, foundation, ensemble, repertoire, events } = dict;

  return [
    {
      id: "foundation",
      label: nav.foundation,
      children: [
        { id: "mission", label: foundation.mission.heading },
        { id: "vision", label: foundation.vision.heading },
        { id: "values", label: foundation.valuesHeading },
        { id: "management", label: foundation.managementHeading },
      ],
    },
    {
      id: "ensemble",
      label: nav.ensemble,
      children: [
        { id: "identity", label: ensemble.identityHeading },
        { id: "direction", label: ensemble.directionHeading },
        { id: "membership", label: ensemble.membership.heading },
        { id: "singers", label: ensemble.membership.rosterHeading },
      ],
    },
    {
      id: "repertoire",
      label: nav.repertoire,
      children: [
        { id: "traditions", label: repertoire.traditions.heading },
        { id: "activities", label: repertoire.activitiesHeading },
      ],
    },
    {
      id: "events",
      label: nav.events,
      children: [
        { id: "upcoming", label: events.upcoming.heading },
        { id: "past", label: events.past.heading },
        { id: "bookings", label: events.booking.heading },
      ],
    },
    { id: "contact", label: nav.contact, children: [] },
  ];
}
