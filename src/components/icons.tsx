import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function IconMenu(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} {...base} {...props}>
      <path d="M3.5 8h17M3.5 16h17" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} {...base} {...props}>
      <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
    </svg>
  );
}

export function IconArrowDown(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} {...base} {...props}>
      <path d="M12 4v16m0 0l-5.5-5.5M12 20l5.5-5.5" />
    </svg>
  );
}

export function IconArrowUpRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} {...base} {...props}>
      <path d="M6.5 17.5l11-11m0 0H8m9.5 0V17" />
    </svg>
  );
}

/* ——— Value icons ———
   Drawn to the brand where the metaphor allows: a tuning fork for the
   standard we hold, an open score for teaching. Same 24px grid and 1.5
   stroke as every other icon here. */

/** Artistic Excellence — a tuning fork: the reference pitch everything is set against. */
export function IconTuningFork(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} {...base} {...props}>
      <path d="M8.5 3v6.5c0 1.9 1.6 3.5 3.5 3.5s3.5-1.6 3.5-3.5V3" />
      <path d="M12 13v8" />
    </svg>
  );
}

/** Integrity — a shield. */
export function IconShield(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} {...base} {...props}>
      <path d="M12 3l7.5 3v5.4c0 4.4-3 8.3-7.5 10.1-4.5-1.8-7.5-5.7-7.5-10.1V6z" />
    </svg>
  );
}

/** Collaboration — two voices overlapping. */
export function IconOverlap(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} {...base} {...props}>
      <circle cx="9" cy="12" r="5.75" />
      <circle cx="15" cy="12" r="5.75" />
    </svg>
  );
}

/** Education — an open score. */
export function IconOpenBook(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} {...base} {...props}>
      <path d="M12 7.2C9.9 5.4 7 4.7 3.5 4.8v13c3.5-.1 6.4.6 8.5 2.4" />
      <path d="M12 7.2c2.1-1.8 5-2.5 8.5-2.4v13c-3.5-.1-6.4.6-8.5 2.4" />
      <path d="M12 7.2v13" />
    </svg>
  );
}

/** Cultural Dialogue — a globe. */
export function IconGlobe(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.4 2.5 3.8 5.7 3.8 9S14.4 18.5 12 21c-2.4-2.5-3.8-5.7-3.8-9S9.6 5.5 12 3z" />
    </svg>
  );
}

/** Innovation — a spark. */
export function IconSpark(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} {...base} {...props}>
      <path d="M12 2.5l2.2 6.3 6.3 2.2-6.3 2.2-2.2 6.3-2.2-6.3L3.5 11l6.3-2.2z" />
    </svg>
  );
}

export function IconInstagram(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.75" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconFacebook(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} {...base} {...props}>
      <path d="M14.5 8.2h2.3V5h-2.6c-2.2 0-3.7 1.6-3.7 3.9V11H8v3.1h2.5V21h3.2v-6.9h2.6l.5-3.1h-3.1V9.1c0-.6.3-.9.8-.9z" />
    </svg>
  );
}
