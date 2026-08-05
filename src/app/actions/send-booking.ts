"use server";

import { bookingFields, type BookingState } from "@/lib/booking-fields";

const TO = process.env.CONTACT_TO_EMAIL ?? "vocisxultra@gmail.com";
/**
 * Resend will only deliver from a domain you have verified. Until
 * vocisxultra.org is verified there, `onboarding@resend.dev` works and
 * delivers to the address that owns the Resend account.
 */
const FROM = process.env.CONTACT_FROM_EMAIL ?? "vocisXultra <onboarding@resend.dev>";

const MAX_FIELD_LENGTH = 2000;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Deliberately permissive — reject the obviously malformed, not the unusual. */
const EMAIL = /^[^\s<>()[\],;:@"]+@[^\s<>()[\],;:@"]+\.[a-z]{2,}$/i;

export async function sendBooking(
  _previous: BookingState,
  formData: FormData,
): Promise<BookingState> {
  // Honeypot: a real person never fills a field they cannot see. Report success
  // so a bot gets no signal about why nothing arrived.
  if (((formData.get("company") as string) ?? "").trim() !== "") {
    return { status: "success" };
  }

  const values: Record<string, string> = {};
  const invalid: string[] = [];

  for (const field of bookingFields) {
    const raw = ((formData.get(field.name) as string) ?? "").trim();
    if (field.required && raw === "") invalid.push(field.name);
    // A malformed reply address is worth catching here: without it the
    // Foundation has no way to answer the enquiry.
    else if (field.type === "email" && raw !== "" && !EMAIL.test(raw)) invalid.push(field.name);
    values[field.name] = raw.slice(0, MAX_FIELD_LENGTH);
  }

  if (invalid.length > 0) return { status: "error", invalid, values };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[booking] RESEND_API_KEY is not set — enquiry was not sent.");
    return { status: "error", values };
  }

  const locale = ((formData.get("locale") as string) ?? "en").slice(0, 5);
  const rows = bookingFields
    .map(
      (field) =>
        `<tr><td style="padding:6px 16px 6px 0;vertical-align:top;color:#5b6472;white-space:nowrap">${field.emailLabel}</td>` +
        `<td style="padding:6px 0;vertical-align:top;color:#12161d">${escapeHtml(values[field.name]) || "—"}</td></tr>`,
    )
    .join("");

  const replyTo = values.senderEmail;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        subject: `Booking enquiry — ${values.eventName || "untitled"}`,
        ...(replyTo ? { reply_to: replyTo } : {}),
        html:
          `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6">` +
          `<p style="margin:0 0 16px;color:#5b6472">Booking enquiry sent from the ${locale} site.</p>` +
          `<table style="border-collapse:collapse">${rows}</table></div>`,
        text: bookingFields
          .map((field) => `${field.emailLabel}: ${values[field.name] || "—"}`)
          .join("\n"),
      }),
    });

    if (!response.ok) {
      console.error("[booking] Resend rejected the request:", response.status, await response.text());
      return { status: "error", values };
    }
  } catch (error) {
    console.error("[booking] Could not reach the mail provider:", error);
    return { status: "error", values };
  }

  return { status: "success" };
}
