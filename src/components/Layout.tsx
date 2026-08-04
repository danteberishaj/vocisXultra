import type { ReactNode } from "react";

/**
 * Compositional vocabulary — not a template.
 *
 * An earlier pass locked every section into one label-left / content-right
 * grid. It was coherent and completely lifeless: fifteen identical rows read
 * as machine output just as loudly as fifteen random ones do. What holds the
 * page together is a shared *voice* — one type scale, one spacing rhythm, one
 * generous canvas — while each section is composed for what it actually says.
 *
 * So these are ingredients. Sections combine them differently on purpose:
 * some run full width, some break to two columns, some sit hard right, one
 * centres. Vary the composition; never vary the scale or the rhythm.
 */

/** The page's canvas. Wider than a reading column — space is the material. */
export function Shell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[84rem] px-6 sm:px-10 lg:px-16 ${className}`}>{children}</div>;
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-20 py-[clamp(5.5rem,15vh,10rem)] ${className}`}>
      <Shell>{children}</Shell>
    </section>
  );
}

/** Section title. Big — these are chapter openings, not labels. */
export function SectionTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-display text-[clamp(2.1rem,5.6vw,4.5rem)] leading-[1.02] tracking-[-0.03em] ${className}`}
    >
      {children}
    </h2>
  );
}

/** Large-set prose used as a design element: opening statements, manifestos. */
export function Statement({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-[clamp(1.3rem,2.6vw,2.15rem)] leading-[1.32] tracking-[-0.015em] text-balance text-ink ${className}`}
    >
      {children}
    </p>
  );
}

/** A comfortable reading column for ordinary body copy. */
export function Measure({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`max-w-[62ch] ${className}`}>{children}</div>;
}

/** Small standing label — used sparingly, where a section genuinely needs a marker. */
export function Marker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-sans text-xs tracking-[0.2em] uppercase text-accent ${className}`}>
      {children}
    </p>
  );
}

/** Full-width hairline used to open or close a movement. */
export function Rule({ className = "" }: { className?: string }) {
  return <hr className={`border-0 border-t border-hairline ${className}`} />;
}
