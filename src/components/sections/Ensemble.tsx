import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Marker, Section, SectionTitle, Shell, Statement } from "@/components/Layout";
import { SingerCard } from "@/components/SingerCard";
import { memberPortraits } from "@/lib/portraits";
import type { Dictionary } from "@/dictionaries/en";

export function Ensemble({ dict }: { dict: Dictionary }) {
  const e = dict.ensemble;
  const [opening, ...restAbout] = e.about;

  // One flat roster: the voice grouping becomes a label per singer rather than
  // four sub-headings, which keeps the section scannable at a glance.
  const roster = e.membership.voices.flatMap((voice, vi) =>
    voice.singers.map((singer, si) => ({
      name: singer.name,
      bio: singer.bio,
      part: voice.part,
      portrait: memberPortraits[vi]?.[si] ?? "",
    })),
  );

  return (
    <section id="ensemble" className="scroll-mt-20">
      {/* Full-bleed band — the section announces itself edge to edge */}
      <div className="relative flex min-h-[52vh] items-end overflow-hidden sm:min-h-[64vh]">
        <Image
          src="/images/rehearsal.webp"
          alt={dict.a11y.rehearsalImageAlt}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-canvas to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-canvas via-canvas/55 to-transparent" />
        <div className="relative z-10 w-full pt-40 pb-10">
          <Shell>
            <Reveal variant="line">
              <SectionTitle className="max-w-[14ch]">{e.heading}</SectionTitle>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-4 text-lg text-faint italic sm:text-xl">{e.lede}</p>
            </Reveal>
          </Shell>
        </div>
      </div>

      <Section>
        <Reveal>
          <Statement className="max-w-[26ch] sm:max-w-[34ch] lg:max-w-[44ch]">{opening}</Statement>
        </Reveal>
        <Reveal delay={140}>
          <div className="mt-14 text-[1.05rem] leading-[1.75] text-faint lg:mt-16 lg:ml-[30%]">
            {restAbout.map((paragraph, i) => (
              <p key={i} className={i > 0 ? "mt-6 max-w-[62ch]" : "max-w-[62ch]"}>
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        {/* Three principles, wide and unboxed */}
        <div id="identity" className="mt-[clamp(5rem,13vh,9rem)] scroll-mt-24">
          <Reveal>
            <Marker>{e.identityHeading}</Marker>
          </Reveal>
          <dl className="mt-10 grid gap-x-14 gap-y-12 lg:grid-cols-3">
            {e.identity.map((principle, i) => (
              <Reveal key={principle.name} delay={i * 90}>
                <div>
                  <dt className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.1] tracking-[-0.025em] text-accent">
                    {principle.name}
                  </dt>
                  <dd className="mt-4 text-base leading-relaxed text-faint">{principle.text}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </Section>

      {/* The still centre — the page's one centred moment */}
      <div id="philosophy" className="scroll-mt-24 py-[clamp(3rem,10vh,7rem)] text-center">
        <Shell>
          <Reveal variant="fade">
            <p aria-hidden className="font-serif text-2xl text-accent italic">
              X
            </p>
          </Reveal>
          <Reveal delay={150}>
            <figure className="mx-auto mt-8 max-w-4xl">
              <blockquote>
                <p className="font-display text-[clamp(1.6rem,4.4vw,3.1rem)] leading-[1.15] tracking-[-0.03em] text-balance text-ink">
                  “{e.philosophy.quote}”
                </p>
              </blockquote>
              <figcaption className="sr-only">{e.heading}</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={280}>
            <p className="mx-auto mt-9 max-w-2xl text-base leading-[1.75] text-faint sm:text-lg">
              {e.philosophy.body}
            </p>
          </Reveal>
        </Shell>
      </div>

      <Section>
        {/* Artistic direction — a tall portrait held against generous space */}
        <div id="direction" className="grid scroll-mt-24 items-end gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal variant="fade" className="lg:col-span-5">
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-panel">
              <Image
                src="/images/conductor.webp"
                alt={dict.a11y.conductorImageAlt}
                fill
                sizes="(min-width: 1024px) 30rem, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="lg:col-span-7 lg:pb-4">
            <Reveal>
              <Marker>{e.directionHeading}</Marker>
              <p className="mt-5 font-display text-[clamp(1.8rem,3.6vw,2.9rem)] leading-[1.05] tracking-[-0.03em] text-ink">
                {e.direction.name}
              </p>
              <p className="mt-2.5 font-sans text-xs tracking-[0.18em] uppercase text-accent">
                {e.direction.role}
              </p>
            </Reveal>
            <div className="mt-7 space-y-5 text-[1.05rem] leading-[1.75] text-faint">
              {e.direction.body.map((p, i) => (
                <Reveal key={i} delay={100 + i * 100}>
                  <p className="max-w-[58ch]">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Membership */}
        <div id="membership" className="mt-[clamp(5rem,13vh,9rem)] scroll-mt-24 lg:flex lg:items-start lg:justify-between lg:gap-16">
          <Reveal>
            <div className="max-w-2xl">
              <Marker>{e.membership.heading}</Marker>
              {e.membership.body.map((p, i) => (
                <p key={i} className="mt-5 text-[1.05rem] leading-[1.75] text-ink/90">
                  {p}
                </p>
              ))}
              <p className="mt-4 text-base text-faint italic">{e.membership.note}</p>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <a
              href={`mailto:${dict.contact.email}?subject=${encodeURIComponent(e.membership.cta)}`}
              className="mt-8 inline-flex min-h-11 shrink-0 items-center border border-accent-deep px-7 font-sans text-[0.82rem] font-medium tracking-[0.16em] uppercase text-ink transition-colors duration-300 hover:border-accent hover:text-accent lg:mt-1"
            >
              {e.membership.cta}
            </a>
          </Reveal>
        </div>

        {/* Roster — faces and voice parts, nothing else. The names carry it. */}
        <div id="singers" className="mt-[clamp(5rem,13vh,9rem)] scroll-mt-24">
          <Reveal>
            <Marker>{e.membership.rosterHeading}</Marker>
          </Reveal>
          <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {roster.map((singer, i) => (
              <li key={singer.name}>
                <Reveal delay={(i % 4) * 80}>
                  <SingerCard
                    name={singer.name}
                    part={singer.part}
                    bio={singer.bio}
                    portrait={singer.portrait}
                    toggleLabel={dict.a11y.readBio}
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </section>
  );
}
