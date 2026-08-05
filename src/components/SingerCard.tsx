"use client";

import { useState } from "react";
import Image from "next/image";

type SingerCardProps = {
  name: string;
  part: string;
  bio: string;
  portrait: string;
  /** Accessible label for the toggle, already localised. */
  toggleLabel: string;
};

/**
 * Portrait that turns to reveal a short biography.
 *
 * Hover alone would leave this out of reach for touch and keyboard users, so
 * the portrait is a real <button>: pointer users get hover, keyboard users get
 * focus, and a tap toggles `data-flipped` for touch devices where hover does
 * not exist. Leaving the pointer resets the toggle so a stray tap doesn't
 * strand a card face-down.
 *
 * The biography is in the DOM at all times, so assistive tech reads it whether
 * or not the card has been turned — the flip is presentation, not gating.
 */
export function SingerCard({ name, part, bio, portrait, toggleLabel }: SingerCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div>
      <div className="flip aspect-3/4 w-full">
        <button
          type="button"
          aria-expanded={flipped}
          aria-label={`${name} — ${part}. ${toggleLabel}`}
          data-flipped={flipped}
          onClick={() => setFlipped((v) => !v)}
          onMouseLeave={() => setFlipped(false)}
          className="flip-inner cursor-pointer rounded-2xl text-left"
        >
          <span className="flip-face flip-front block bg-panel">
            <Image
              src={portrait}
              alt=""
              fill
              sizes="(min-width: 1024px) 18rem, (min-width: 640px) 40vw, 85vw"
              className="object-cover"
            />
          </span>
          <span className="flip-face flip-back flex flex-col justify-end bg-panel p-6">
            <span className="text-[0.95rem] leading-relaxed text-ink/80">{bio}</span>
          </span>
        </button>
      </div>
      <p className="mt-4 font-display text-lg tracking-[-0.02em] text-ink">{name}</p>
      <p className="mt-1.5 font-sans text-xs tracking-[0.18em] uppercase text-accent">{part}</p>
    </div>
  );
}
