import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/locales";
import { getDictionary } from "@/lib/dictionaries";
import { SiteNav } from "@/components/SiteNav";
import { Hero } from "@/components/sections/Hero";
import { Welcome } from "@/components/sections/Welcome";
import { Foundation } from "@/components/sections/Foundation";
import { Ensemble } from "@/components/sections/Ensemble";
import { Repertoire } from "@/components/sections/Repertoire";
import { Events } from "@/components/sections/Events";
import { SiteFooter } from "@/components/sections/SiteFooter";

export const dynamicParams = false;

export default async function Page({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <a href="#main" className="skip-link">
        {dict.a11y.skip}
      </a>
      <SiteNav locale={locale} nav={dict.nav} a11y={dict.a11y} />
      <main id="main">
        <Hero dict={dict} />
        <Welcome dict={dict} />
        <Foundation dict={dict} />
        <Ensemble dict={dict} />
        <Repertoire dict={dict} />
        <Events dict={dict} />
      </main>
      <SiteFooter dict={dict} />
    </>
  );
}
