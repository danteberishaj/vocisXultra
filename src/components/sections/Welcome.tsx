import { Reveal } from "@/components/Reveal";
import { ImageSlot } from "@/components/ImageSlot";
import { Marker, Section, Statement } from "@/components/Layout";
import type { Dictionary } from "@/dictionaries/en";

export function Welcome({ dict }: { dict: Dictionary }) {
  const [opening, ...rest] = dict.welcome.body;

  return (
    <Section id="welcome">
      {/* Lede and its supporting detail read as one unit: the statement anchors
          the left, the detail stacks in a narrower column beside it, tops
          aligned. Deliberately not CSS multi-column — that is for continuous
          flowing text, and on two discrete paragraphs it just yields two ragged
          columns of unequal depth. */}
      <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <Statement>{opening}</Statement>
        </Reveal>
        <div className="space-y-6 text-[1.05rem] leading-[1.75] text-faint lg:col-span-4 lg:col-start-9 lg:pt-2">
          {rest.map((paragraph, i) => (
            <Reveal key={i} delay={140 + i * 90}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </div>

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
