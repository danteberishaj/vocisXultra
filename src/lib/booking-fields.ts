/**
 * The booking enquiry fields.
 *
 * Labels are NOT here — they already exist, translated, as
 * `events.booking.checklist` in each dictionary. This file carries only the
 * parts that must not be translated: the form field name, its input type and
 * whether it is required. The two are matched positionally, exactly like the
 * portrait mapping, so the order here must track the order there.
 *
 * `emailLabel` is the English wording used when composing the message, so the
 * Foundation reads a consistent enquiry whatever language the sender used.
 */
export const bookingFields = [
  { name: "eventName", type: "text", required: true, emailLabel: "Event name" },
  { name: "date", type: "text", required: true, emailLabel: "Date" },
  { name: "venue", type: "text", required: false, emailLabel: "Venue" },
  { name: "location", type: "text", required: false, emailLabel: "Location" },
  { name: "duration", type: "text", required: false, emailLabel: "Expected programme duration" },
  { name: "technical", type: "textarea", required: false, emailLabel: "Technical requirements" },
  { name: "budget", type: "text", required: false, emailLabel: "Budget" },
  // The reply address. Required and typed, so replies do not depend on
  // scraping an address out of free-form contact text.
  { name: "senderEmail", type: "email", required: true, emailLabel: "Email" },
  { name: "contact", type: "textarea", required: false, emailLabel: "Contact details" },
] as const;

export type BookingField = (typeof bookingFields)[number];

/** Result of a submission, rendered back into the form. */
export type BookingState = {
  status: "idle" | "success" | "error";
  /** Field names that failed validation, so the form can mark them. */
  invalid?: string[];
  /**
   * What the sender typed, echoed back on failure.
   *
   * React 19 resets uncontrolled inputs once a Server Action settles, which
   * would otherwise wipe all eight fields the moment anything went wrong.
   * These are re-applied as defaultValue so nothing is lost.
   */
  values?: Record<string, string>;
};
