"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

type RevealProps = {
  children: ReactNode;
  /** "up" (default) rises softly; "fade" is a slow crossfade; "line" wipes in from the left. */
  variant?: "up" | "fade" | "line";
  /** Stagger delay in ms. */
  delay?: number;
  className?: string;
};

/**
 * Shared scroll watcher for every pending reveal.
 *
 * This deliberately uses plain geometry rather than IntersectionObserver.
 * The hidden state is real — `.js [data-reveal]` sets `opacity: 0` — so a
 * reveal that never fires ships the section blank, and IntersectionObserver
 * callbacks are not dependable in background tabs, headless renderers or some
 * prerender paths. A measured `getBoundingClientRect()` on scroll always
 * agrees with what the reader can actually see.
 *
 * One listener and one rAF serve all elements, and each unregisters the moment
 * it reveals, so the set empties as the reader moves down the page.
 */
type Pending = { node: HTMLElement; show: () => void };

const pending = new Set<Pending>();
let frame = 0;
let listening = false;

function sweep() {
  frame = 0;
  // Reveal once the top edge is just inside the viewport's lower edge.
  const limit = window.innerHeight * 0.94;
  for (const entry of [...pending]) {
    if (entry.node.getBoundingClientRect().top < limit) entry.show();
  }
  if (pending.size === 0) stopListening();
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(sweep);
}

function startListening() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
}

function stopListening() {
  if (!listening) return;
  listening = false;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
}

/**
 * Scroll-reveal wrapper. Content is fully visible without JavaScript — the
 * hidden state only applies under the `.js` root class — and reduced motion
 * skips the animation entirely.
 */
export function Reveal({ children, variant = "up", delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const entry: Pending = {
      node,
      show: () => {
        node.classList.add("in");
        pending.delete(entry);
      },
    };

    // Reduced motion, or a hidden document that may never scroll: show at once.
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.visibilityState === "hidden"
    ) {
      node.classList.add("in");
      return;
    }

    pending.add(entry);
    startListening();
    // Catch anything already on screen at mount without waiting for a scroll.
    schedule();

    return () => {
      pending.delete(entry);
      if (pending.size === 0) stopListening();
    };
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={variant === "up" ? "" : variant}
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
