import Image from "next/image";
import { Fragment } from "react";
import { Reveal } from "@/components/Reveal";
import { Marker, Section, SectionTitle } from "@/components/Layout";
import type { Dictionary } from "@/dictionaries/en";

export function Repertoire({ dict }: { dict: Dictionary }) {
  const r = dict.repertoire;

  return (
    <Section id="repertoire">
      <div className="lg:flex lg:items-end lg:justify-between lg:gap-16">
        <Reveal variant="line">
          <SectionTitle className="max-w-[12ch]">{r.heading}</SectionTitle>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-6 max-w-md text-lg text-faint italic lg:mt-0 lg:pb-3 lg:text-right">
            {r.lede}
          </p>
        </Reveal>
      </div>

      {/* Six centuries — the era name carries the weight, the period answers it */}
      <ol className="mt-[clamp(3.5rem,9vh,6rem)]">
        {r.eras.map((era, i) => (
          <li key={era.name} className="border-t border-hairline">
            <Reveal delay={Math.min(i * 60, 180)}>
              <article className="py-10 lg:py-14">
                <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                  <h3 className="font-display text-[clamp(1.9rem,5vw,3.75rem)] leading-[1] tracking-[-0.03em] text-ink">
                    {era.name}
                  </h3>
                  <Marker className="text-faint">{era.period}</Marker>
                </div>
                <div className="mt-7 lg:grid lg:grid-cols-2 lg:gap-16">
                  <p className="max-w-[54ch] text-base leading-relaxed text-faint">{era.text}</p>
                  {era.composers.length > 0 && (
                    <p className="mt-4 text-[clamp(1.05rem,1.8vw,1.35rem)] leading-[1.55] text-ink/80 italic lg:mt-0">
                      {era.composers.map((composer, j) => (
                        <Fragment key={composer}>
                          {j > 0 && <span className="text-accent-deep not-italic"> · </span>}
                          {composer}
                        </Fragment>
                      ))}
                    </p>
                  )}
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>

      {/* Sacred & secular — the score gets real size */}
      <div className="mt-[clamp(5rem,13vh,9rem)] grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <h3 className="max-w-[14ch] font-display text-[clamp(1.7rem,3.6vw,2.75rem)] leading-[1.08] tracking-[-0.025em] text-ink">
              {r.traditions.heading}
            </h3>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-[58ch] text-[1.05rem] leading-[1.75] text-faint">
              {r.traditions.body}
            </p>
          </Reveal>
        </div>
        <Reveal variant="fade" className="lg:col-span-5">
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-panel">
            <Image
              src="/images/score.webp"
              alt={dict.a11y.scoreImageAlt}
              fill
              sizes="(min-width: 1024px) 30rem, 90vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>

      {/* Activities — one long breath of text across the full canvas */}
      <div className="mt-[clamp(5rem,13vh,9rem)]">
        <Reveal>
          <Marker>{r.activitiesHeading}</Marker>
        </Reveal>
        {/* A list should look like a list — eight scannable lines, not one
            long run-on set at display size. */}
        <ul className="mt-8 grid border-t border-hairline sm:grid-cols-2 sm:gap-x-16 lg:grid-cols-3 lg:gap-x-12">
          {r.activities.map((activity, i) => (
            <Reveal key={activity} delay={(i % 3) * 60}>
              <li className="border-b border-hairline py-4 text-base text-ink/85">{activity}</li>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
