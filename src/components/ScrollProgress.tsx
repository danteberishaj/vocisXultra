"use client";

import { useEffect, useRef } from "react";

/**
 * Reading-progress bar across the top of the page.
 *
 * Writes `transform: scaleX()` straight to the node rather than going through
 * React state — this updates once per animation frame while scrolling, and a
 * re-render per frame would cost far more than the bar is worth. Scaling a
 * transform is also compositor-only, so it never triggers layout.
 *
 * A ResizeObserver recomputes the scrollable height, since late-loading images
 * and font swaps change the document length after first paint.
 *
 * `aria-hidden`: this duplicates information the browser's own scrollbar and
 * screen-reader position feedback already provide. Exposing it as a live
 * progressbar would announce on every frame of scrolling.
 */
export function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;

    let frame = 0;

    const paint = () => {
      frame = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      fill.style.transform = `scaleX(${progress})`;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    const observer = new ResizeObserver(schedule);
    observer.observe(document.documentElement);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, []);

  return (
    <div aria-hidden className="absolute inset-x-0 top-0 h-0.5 overflow-hidden">
      <div
        ref={fillRef}
        className="h-full w-full origin-left bg-accent"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
