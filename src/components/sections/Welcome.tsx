import { Reveal } from "@/components/Reveal";
import { ImageSlot } from "@/components/ImageSlot";
import { Marker, Section, Statement } from "@/components/Layout";
import type { Dictionary } from "@/dictionaries/en";

export function Welcome({ dict }: { dict: Dictionary }) {
  const [opening, ...rest] = dict.welcome.body;

  return (
    <Section id="welcome">
      {/* The opening paragraph is the design — set large, given the width */}
      <Reveal>
        <Statement className="max-w-[26ch] sm:max-w-[34ch] lg:max-w-[46ch]">{opening}</Statement>
      </Reveal>

      {/* …then the page drops to a magazine measure and two columns */}
      <Reveal delay={140}>
        <div className="mt-16 text-[1.05rem] leading-[1.75] text-faint lg:ml-[28%] lg:mt-20 lg:columns-2 lg:gap-14">
          {rest.map((paragraph, i) => (
            <p key={i} className={i > 0 ? "mt-6 break-inside-avoid" : "break-inside-avoid"}>
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>

      <Reveal variant="fade">
        <ImageSlot
          ratio="aspect-video"
          label="Establishing photograph — the ensemble in performance"
          hint="2560 × 1440"
          className="mt-[clamp(4rem,10vh,7rem)]"
        />
      </Reveal>

      <div className="mt-[clamp(4rem,10vh,7rem)]">
        <Reveal>
          <Marker>{dict.welcome.newsHeading}</Marker>
        </Reveal>
        <ul className="mt-8">
          {dict.welcome.news.map((item, i) => (
            <li key={i} className="border-t border-hairline">
              <Reveal delay={i * 90}>
                <article className="py-9 lg:py-11">
                  <p className="font-sans text-xs tracking-[0.2em] uppercase text-faint">
                    {item.date}
                  </p>
                  <h3 className="mt-3 max-w-4xl font-display text-[clamp(1.35rem,3vw,2.25rem)] leading-[1.15] tracking-[-0.02em] text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-faint">{item.text}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
