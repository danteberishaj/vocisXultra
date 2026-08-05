"use client";

import { useActionState, useId } from "react";
import { sendBooking } from "@/app/actions/send-booking";
import { bookingFields, type BookingState } from "@/lib/booking-fields";
import type { Dictionary } from "@/dictionaries/en";

type BookingFormProps = {
  locale: string;
  /** The eight translated labels, positionally matched to `bookingFields`. */
  labels: Dictionary["events"]["booking"]["checklist"];
  form: Dictionary["events"]["booking"]["form"];
};

const initial: BookingState = { status: "idle" };

/**
 * Booking enquiry form.
 *
 * Built on a Server Action rather than a mailto, so submitting does not depend
 * on the visitor having a configured mail client. `useActionState` keeps it
 * working without JavaScript too: the browser posts the form and re-renders
 * with the result.
 *
 * Fields are rendered as underlined rules rather than boxes, matching the way
 * this section already read on the page.
 */
export function BookingForm({ locale, labels, form }: BookingFormProps) {
  const [state, action, pending] = useActionState(sendBooking, initial);
  const statusId = useId();

  return (
    <form action={action} className="w-full">
      <input type="hidden" name="locale" value={locale} />

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
        {bookingFields.map((field, i) => {
          const label = labels[i];
          const failed = state.invalid?.includes(field.name);
          const shared =
            "peer w-full border-0 border-b bg-transparent pb-2 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-transparent focus:border-accent " +
            (failed ? "border-danger" : "border-hairline");

          return (
            <div key={field.name} className={field.type === "textarea" ? "sm:col-span-1" : ""}>
              <label htmlFor={field.name} className="block font-sans text-sm text-faint">
                {label}
                {field.required && (
                  <span aria-hidden className="ml-1 text-accent">
                    *
                  </span>
                )}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  rows={2}
                  required={field.required}
                  defaultValue={state.values?.[field.name] ?? ""}
                  aria-invalid={failed || undefined}
                  className={`${shared} mt-2 resize-y`}
                />
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type === "email" ? "email" : "text"}
                  autoComplete={field.type === "email" ? "email" : undefined}
                  inputMode={field.type === "email" ? "email" : undefined}
                  required={field.required}
                  defaultValue={state.values?.[field.name] ?? ""}
                  aria-invalid={failed || undefined}
                  className={`${shared} mt-2`}
                />
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-6 font-sans text-xs text-faint">{form.requiredNote}</p>

      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-11 items-center border border-accent-deep px-7 font-sans text-[0.82rem] font-medium tracking-[0.16em] uppercase text-ink transition-colors duration-300 hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? form.sending : form.submit}
        </button>

        <p
          id={statusId}
          role="status"
          aria-live="polite"
          className={`font-sans text-sm ${
            state.status === "error" ? "text-danger" : "text-accent"
          }`}
        >
          {state.status === "success" && form.success}
          {state.status === "error" &&
            (state.invalid?.length ? form.missingFields : form.error)}
        </p>
      </div>
    </form>
  );
}
