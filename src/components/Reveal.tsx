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
 * Scroll-reveal wrapper. Content is fully visible without JS — globals.css only
 * hides [data-reveal] under the `.js` root class, and this component adds `.in`
 * once the element approaches the viewport. Respects prefers-reduced-motion.
 */
export function Reveal({ children, variant = "up", delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
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
