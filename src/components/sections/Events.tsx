import { Reveal } from "@/components/Reveal";
import { ImageSlot } from "@/components/ImageSlot";
import { Marker, Section, SectionTitle, Statement } from "@/components/Layout";
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
      <div className="mt-[clamp(4rem,11vh,8rem)] border-t border-hairline pt-12">
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
            <ImageSlot
              ratio="aspect-3/4"
              label="Poster or photograph for the first announced concert"
              hint="1200 × 1600"
            />
          </Reveal>
        </div>
      </div>

      <div className="mt-[clamp(3.5rem,9vh,6rem)] border-t border-hairline pt-10">
        <Reveal>
          <div className="lg:flex lg:gap-16">
            <Marker className="shrink-0 lg:w-48">{ev.past.heading}</Marker>
            <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-faint italic lg:mt-0">
              {ev.past.emptyText}
            </p>
          </div>
        </Reveal>
        {/* Where the performance archive accumulates */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {["Concert photograph", "Concert photograph", "Concert photograph"].map((label, i) => (
            <Reveal key={i} variant="fade" delay={i * 90}>
              <ImageSlot ratio="aspect-4/3" label={label} hint="1600 × 1200" />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Bookings — the practical close */}
      <div className="mt-[clamp(5rem,13vh,9rem)] grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <Statement className="max-w-[14ch]">{ev.booking.heading}</Statement>
          </Reveal>
          <Reveal delay={110}>
            <p className="mt-6 max-w-md text-[1.05rem] leading-[1.7] text-faint">
              {ev.booking.intro}
            </p>
          </Reveal>
          <Reveal delay={280}>
            <a
              href={`mailto:${dict.contact.email}?subject=${encodeURIComponent(ev.booking.heading)}`}
              className="mt-8 inline-flex min-h-11 items-center border border-accent-deep px-7 font-sans text-[0.82rem] font-medium tracking-[0.16em] uppercase text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              {ev.booking.cta}
            </a>
          </Reveal>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ul className="grid sm:grid-cols-2 sm:gap-x-12">
            {ev.booking.checklist.map((item, i) => (
              <Reveal key={item} delay={i * 55}>
                <li className="border-b border-hairline py-4 font-sans text-sm text-ink/90">
                  {item}
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={200}>
            <p className="mt-7 text-base text-faint italic">{ev.booking.note}</p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
