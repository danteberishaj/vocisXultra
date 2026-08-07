import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale, locales } from "@/lib/locales";
import { getDictionary } from "@/lib/dictionaries";
import { managementPortraits } from "@/lib/portraits";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { Marker, Rule, Section, Shell, Statement } from "@/components/Layout";
import { IconArrowLeft } from "@/components/icons";

export const dynamicParams = false;

/** Shared by the nav's locale switcher and the alternates below. */
const SLUG = "/emanuel-mates";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/emanuel-mates">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return {
    title: dict.director.meta.title,
    description: dict.director.meta.description,
    alternates: {
      canonical: `/${locale}${SLUG}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}${SLUG}`])),
        "x-default": `/en${SLUG}`,
      },
    },
    openGraph: {
      title: dict.director.meta.title,
      description: dict.director.meta.description,
      type: "profile",
      locale,
    },
  };
}

export default async function DirectorPage({
  params,
}: PageProps<"/[locale]/emanuel-mates">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const d = dict.director;
  const { name, role } = dict.ensemble.direction;

  const backLink = (
    <Link
      href={`/${locale}#direction`}
      className="group inline-flex min-h-11 items-center gap-2.5 font-sans text-[0.78rem] font-medium tracking-[0.16em] uppercase text-faint transition-colors duration-300 hover:text-accent"
    >
      <IconArrowLeft
        aria-hidden
        className="size-3.5 transition-transform duration-300 ease-out-quart group-hover:-translate-x-1"
      />
      {d.back}
    </Link>
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle: role,
    description: d.meta.description,
    url: `https://vocisxultra.org/${locale}${SLUG}`,
    image: `https://vocisxultra.org${managementPortraits[0]}`,
    worksFor: {
      "@type": "NGO",
      name: "Fondacioni vocisXultra",
      url: `https://vocisxultra.org/${locale}`,
    },
  };

  return (
    <>
      <a href="#main" className="skip-link">
        {dict.a11y.skip}
      </a>
      {/* Anchors point back at the long page; the switcher stays on this one. */}
      <SiteNav
        locale={locale}
        dict={dict}
        anchorBase={`/${locale}`}
        localeSuffix={SLUG}
      />

      <main id="main">
        <article>
          {/* Masthead — the name carries the page, the portrait answers it */}
          <Section className="pt-32 sm:pt-36 lg:pt-40">
            <Reveal variant="fade">{backLink}</Reveal>

            <div className="mt-10 grid items-end gap-x-16 gap-y-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Reveal>
                  <Marker>{role}</Marker>
                </Reveal>
                <Reveal variant="line" delay={80}>
                  <h1 className="mt-5 font-display text-[clamp(2.4rem,7vw,5rem)] leading-[1] tracking-[-0.035em] text-ink">
                    {name}
                  </h1>
                </Reveal>
                <Reveal delay={200}>
                  <p className="mt-6 text-lg text-faint italic sm:text-xl">{d.subtitle}</p>
                </Reveal>
              </div>

              <Reveal variant="fade" delay={160} className="lg:col-span-4 lg:col-start-9">
                <div className="relative aspect-3/4 w-full max-w-sm overflow-hidden rounded-2xl bg-panel lg:max-w-none">
                  <Image
                    src={managementPortraits[0]}
                    alt={dict.a11y.directorImageAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 22rem, (min-width: 640px) 24rem, 85vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>

            <Reveal variant="fade" delay={120}>
              <Rule className="mt-[clamp(3.5rem,8vh,5.5rem)]" />
            </Reveal>

            {/* The opening set large — it is the whole biography in one breath */}
            <Reveal delay={100}>
              <div className="mt-[clamp(3rem,7vh,4.5rem)] max-w-4xl">
                <Statement>{d.lead}</Statement>
              </div>
            </Reveal>

            {/* The long read, indented to its own left edge and capped at a
                patient measure — this is the one place on the site that asks
                for sustained reading. */}
            <div className="mt-[clamp(3.5rem,9vh,6rem)] grid lg:grid-cols-12">
              {/* One reveal for the whole block, not one per paragraph: the
                  paragraphs are a single continuous read, and `.prose-voice`
                  sets their rhythm with `p + p`, which only works when the
                  paragraphs are actual siblings. */}
              <Reveal className="lg:col-span-8 lg:col-start-4">
                <div className="prose-voice text-faint">
                  {d.body.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* The X — the wordmark's gesture, set exactly as the philosophy
                ornament is, used once to turn the page from what he has done
                toward what he is building. */}
            <Reveal variant="fade">
              <p
                aria-hidden
                className="mt-[clamp(4rem,10vh,7rem)] text-center font-serif text-2xl text-accent italic"
              >
                X
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-[clamp(2.5rem,6vh,4rem)] max-w-3xl lg:ml-auto lg:text-right">
                <Statement>{d.closing}</Statement>
              </div>
            </Reveal>

            <Reveal variant="fade" delay={100}>
              <Rule className="mt-[clamp(4rem,10vh,6.5rem)]" />
              <div className="mt-10">{backLink}</div>
            </Reveal>
          </Section>
        </article>
      </main>

      <SiteFooter dict={dict} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
