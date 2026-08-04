import Image from "next/image";
import type { CSSProperties } from "react";
import type { Dictionary } from "@/dictionaries/en";

const delay = (s: number) => ({ "--rise-delay": `${s}s` }) as CSSProperties;

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative flex min-h-dvh flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 hero-fade" style={delay(0.05)}>
        <Image
          src="/images/hero.webp"
          alt={dict.a11y.heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Blend only the edges into the page — keep the photograph clear */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-canvas/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-canvas via-canvas/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[84rem] px-6 pt-44 pb-20 sm:px-10 sm:pb-24 lg:px-16">
        <h1 className="font-display text-[clamp(2.9rem,8.5vw,6rem)] leading-[1.02] tracking-[-0.02em]">
          <span className="hero-rise block" style={delay(0.25)}>
            {dict.hero.titleA}
          </span>
          <span
            className="hero-rise block font-serif italic tracking-normal text-accent"
            style={delay(0.42)}
          >
            {dict.hero.titleB}
          </span>
        </h1>

        <p
          className="hero-rise mt-7 max-w-xl text-lg leading-relaxed text-ink/90 sm:text-xl"
          style={delay(0.6)}
        >
          {dict.hero.intro}
        </p>

        <div className="hero-rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-5" style={delay(0.75)}>
          <a
            href="#events"
            className="inline-flex min-h-11 items-center border border-accent-deep/70 px-6 font-sans text-[0.82rem] font-medium tracking-[0.16em] uppercase text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            {dict.hero.ctaEvents}
          </a>
          <a
            href="#ensemble"
            className="inline-flex min-h-11 items-center font-sans text-[0.82rem] font-medium tracking-[0.16em] uppercase text-faint underline decoration-hairline underline-offset-8 transition-colors duration-300 hover:text-accent hover:decoration-accent-deep"
          >
            {dict.hero.ctaEnsemble}
          </a>
        </div>

        <p
          className="hero-rise mt-12 font-sans text-xs tracking-[0.22em] uppercase text-faint"
          style={delay(0.9)}
        >
          {dict.hero.est}
        </p>
      </div>

      {/* Scroll hint — a single hairline descending, like a held breath */}
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 hidden h-16 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-accent-deep/60 to-transparent sm:block" />
    </section>
  );
}
