import { Reveal } from "@/components/Reveal";
import { Wordmark } from "@/components/Wordmark";
import { Marker, Shell } from "@/components/Layout";
import { IconFacebook, IconInstagram } from "@/components/icons";
import type { Dictionary } from "@/dictionaries/en";

const socials = [
  { label: "Instagram", href: "https://instagram.com/vocisxultra", Icon: IconInstagram },
  { label: "Facebook", href: "https://facebook.com/vocisxultra", Icon: IconFacebook },
];

export function SiteFooter({ dict }: { dict: Dictionary }) {
  const c = dict.contact;
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="scroll-mt-20 py-[clamp(5.5rem,15vh,10rem)]">
      <Shell>
        <Reveal variant="line">
          <p className="max-w-[16ch] font-display text-[clamp(2.1rem,5.6vw,4.5rem)] leading-[1.02] tracking-[-0.03em]">
            {c.heading}
          </p>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-6 max-w-xl text-lg text-faint">{c.lede}</p>
        </Reveal>

        {/* The address is the loudest thing down here, as it should be */}
        <Reveal delay={200}>
          <a
            href={`mailto:${c.email}`}
            className="mt-12 inline-block font-display text-[clamp(1.5rem,4.6vw,3.4rem)] leading-none tracking-[-0.03em] text-accent transition-colors hover:text-ink"
          >
            {c.email}
          </a>
        </Reveal>

        <Reveal delay={280}>
          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2.5 font-sans text-sm text-faint transition-colors hover:text-accent"
              >
                <Icon />
                {label}
              </a>
            ))}
          </div>
        </Reveal>

        <div className="mt-[clamp(4rem,11vh,8rem)] border-t border-hairline pt-10">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:gap-16">
            <div>
              <Marker className="text-faint">{c.impressum.heading}</Marker>
              <ul className="mt-4 space-y-1 font-sans text-sm leading-relaxed text-faint">
                {c.impressum.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="mt-4 font-sans text-xs text-faint">{c.impressum.responsible}</p>
            </div>
            <div className="lg:text-right">
              <p className="text-xl text-ink">
                <Wordmark />
              </p>
              <p className="mt-2 text-base text-faint italic">{dict.footer.meaning}</p>
              <p className="mt-6 font-sans text-xs text-faint">
                © {year} vocisXultra · {dict.footer.rights}
              </p>
            </div>
          </div>
        </div>
      </Shell>
    </footer>
  );
}
