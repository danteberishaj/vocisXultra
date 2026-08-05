import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { BookingForm } from "@/components/BookingForm";
import { Marker, Section, SectionTitle, Statement } from "@/components/Layout";
import { IconArrowUpRight } from "@/components/icons";
import type { Locale } from "@/lib/locales";
import type { Dictionary } from "@/dictionaries/en";

export function Events({ dict, locale }: { dict: Dictionary; locale: Locale }) {
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
            <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl bg-panel">
              <Image
                src="/images/upcoming.webp"
                alt={dict.a11y.upcomingImageAlt}
                fill
                sizes="(min-width: 1024px) 22rem, 90vw"
                className="object-cover"
              />
            </div>
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
        {/* The performance archive */}
        <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {ev.past.concerts.map((concert, i) => (
            <li key={concert.title}>
              <Reveal variant="fade" delay={i * 90}>
                <article>
                  <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-panel">
                    <Image
                      src={`/images/past-${i + 1}.webp`}
                      alt={dict.a11y.pastImageAlts[i]}
                      fill
                      sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                  <h4 className="mt-5 font-display text-xl tracking-[-0.02em] text-ink">
                    {concert.title}
                  </h4>
                  <p className="mt-1.5 font-sans text-xs tracking-[0.18em] uppercase text-accent">
                    {concert.meta}
                  </p>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-faint">{concert.text}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
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
          <Reveal delay={200}>
            <p className="mt-7 text-base text-faint italic">{ev.booking.note}</p>
          </Reveal>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal delay={120}>
            <BookingForm
              locale={locale}
              labels={ev.booking.checklist}
              form={ev.booking.form}
            />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
