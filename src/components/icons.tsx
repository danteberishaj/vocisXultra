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

export function IconImage(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8.75" cy="10" r="1.4" />
      <path d="M21 15.5l-4.8-4.6L9 18" />
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
