import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Marker, Section, SectionTitle } from "@/components/Layout";
import { IconArrowUpRight } from "@/components/icons";
import type { Dictionary } from "@/dictionaries/en";

export function Events({ dict }: { dict: Dictionary }) {
  const ev = dict.events;

  return (
    <Section id="events">
      <Reveal variant="line">
        <SectionTitle className="max-w-[10ch]">{ev.heading}</SectionTitle>
      </Reveal>
      <Reveal delay={140}>
        <p className="mt-6 max-w-[58ch] text-[1.05rem] leading-[1.75] text-faint">{ev.lede}</p>
      </Reveal>

      {/* The empty season, said at full size — the honest centrepiece */}
      <div id="upcoming" className="mt-[clamp(4rem,11vh,8rem)] scroll-mt-24 border-t border-hairline pt-12">
        <Reveal>
          <Marker>{ev.upcoming.heading}</Marker>
        </Reveal>
        <div className="mt-7 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <p className="max-w-[18ch] font-display text-[clamp(2rem,5.4vw,4.25rem)] leading-[1.02] tracking-[-0.03em] text-balance text-ink">
                {ev.upcoming.emptyTitle}
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-xl text-[1.05rem] leading-[1.7] text-faint">
                {ev.upcoming.emptyText}
              </p>
            </Reveal>
            <Reveal delay={260}>
              <a
                href="#contact"
                className="mt-7 inline-flex min-h-11 items-center gap-2 font-sans text-[0.82rem] font-medium tracking-[0.16em] uppercase text-accent transition-colors hover:text-ink"
              >
                {ev.upcoming.follow}
                <IconArrowUpRight />
              </a>
            </Reveal>
          </div>
          <Reveal variant="fade" delay={160} className="lg:col-span-4 lg:col-start-9">
            <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl bg-panel">
              <Image
                src="/images/upcoming-faceless.png"
                alt={dict.a11y.upcomingImageAlt}
                fill
                sizes="(min-width: 1024px) 22rem, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>

      <div id="past" className="mt-[clamp(3.5rem,9vh,6rem)] scroll-mt-24 border-t border-hairline pt-10">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-3">
            <Marker>{ev.past.heading}</Marker>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-9">
            <p className="max-w-2xl font-display text-[clamp(1.6rem,3vw,2.5rem)] leading-[1.15] tracking-[-0.025em] text-ink text-balance">
              {ev.past.emptyTitle}
            </p>
            <p className="mt-4 max-w-xl text-base leading-[1.75] text-faint">{ev.past.emptyText}</p>
          </Reveal>
        </div>
      </div>

    </Section>
  );
}
