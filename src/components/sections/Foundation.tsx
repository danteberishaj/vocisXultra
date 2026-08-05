import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Marker, Section, SectionTitle, Statement } from "@/components/Layout";
import { managementPortraits } from "@/lib/portraits";
import {
  IconGlobe,
  IconOpenBook,
  IconOverlap,
  IconShield,
  IconSpark,
  IconTuningFork,
} from "@/components/icons";
import type { Dictionary } from "@/dictionaries/en";

/** One icon per value, in the order the values appear in the dictionaries. */
const valueIcons = [
  IconTuningFork, // Artistic Excellence
  IconShield, // Integrity
  IconOverlap, // Collaboration
  IconOpenBook, // Education
  IconGlobe, // Cultural Dialogue
  IconSpark, // Innovation
];

export function Foundation({ dict }: { dict: Dictionary }) {
  const f = dict.foundation;

  return (
    <Section id="foundation">
      <Reveal variant="line">
        <SectionTitle className="max-w-[16ch]">{f.heading}</SectionTitle>
      </Reveal>
      <Reveal delay={140}>
        <p className="mt-6 max-w-2xl text-lg text-faint italic sm:text-xl">{f.lede}</p>
      </Reveal>

      {/* Two-column magazine setting, indented from the title above it */}
      <Reveal delay={200}>
        <div className="mt-14 text-[1.05rem] leading-[1.75] text-faint lg:mt-20 lg:columns-2 lg:gap-14">
          {f.about.map((paragraph, i) => (
            <p key={i} className={i > 0 ? "mt-6 break-inside-avoid" : "break-inside-avoid"}>
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>

      {/* Mission sits left, vision answers from the right — the page breathes */}
      <div className="mt-[clamp(5rem,13vh,9rem)] space-y-[clamp(4rem,10vh,7rem)]">
        <Reveal>
          <div className="max-w-3xl">
            <Marker>{f.mission.heading}</Marker>
            <div className="mt-5 space-y-5">
              {f.mission.body.map((p, i) =>
                i === 0 ? (
                  <Statement key={i}>{p}</Statement>
                ) : (
                  <p key={i} className="max-w-[62ch] text-[1.05rem] leading-[1.75] text-faint">
                    {p}
                  </p>
                ),
              )}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="max-w-3xl lg:ml-auto lg:text-right">
            <Marker>{f.vision.heading}</Marker>
            <div className="mt-5 space-y-5">
              {f.vision.body.map((p, i) => (
                <Statement key={i}>{p}</Statement>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Values — wide three-up, generous, no card chrome */}
      <div className="mt-[clamp(5rem,13vh,9rem)]">
        <Reveal>
          <Marker>{f.valuesHeading}</Marker>
        </Reveal>
        <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {f.values.map((value, i) => {
            const Icon = valueIcons[i] ?? IconSpark;
            return (
              <Reveal key={value.name} delay={(i % 3) * 80}>
                <div className="flex h-full flex-col rounded-2xl bg-panel p-8 lg:p-9">
                  <span
                    aria-hidden
                    className="flex size-12 shrink-0 items-center justify-center rounded-full bg-canvas text-accent"
                  >
                    <Icon />
                  </span>
                  <dt className="mt-6 font-display text-xl tracking-[-0.02em] text-ink">
                    {value.name}
                  </dt>
                  <dd className="mt-3 text-base leading-relaxed text-faint">{value.text}</dd>
                </div>
              </Reveal>
            );
          })}
        </dl>
      </div>

      {/* Management — a portrait strip, staggered so it reads as a composition */}
      <div className="mt-[clamp(5rem,13vh,9rem)]">
        <Reveal>
          <Marker>{f.managementHeading}</Marker>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-5 max-w-2xl text-[1.05rem] leading-[1.7] text-faint">
            {f.managementIntro}
          </p>
        </Reveal>
        <ul className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {f.people.map((person, i) => (
            <li key={person.name} className={i % 2 === 1 ? "lg:mt-16" : undefined}>
              <Reveal delay={(i % 4) * 90}>
                <div className="relative aspect-3/4 w-full overflow-hidden bg-panel">
                  <Image
                    src={managementPortraits[i]}
                    alt={`${person.name} — ${person.role}`}
                    fill
                    sizes="(min-width: 1024px) 18rem, (min-width: 640px) 40vw, 85vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-5 font-display text-xl tracking-[-0.02em] text-ink">
                  {person.name}
                </p>
                <p className="mt-1.5 font-sans text-xs tracking-[0.18em] uppercase text-accent">
                  {person.role}
                </p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-faint">{person.bio}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

    </Section>
  );
}
