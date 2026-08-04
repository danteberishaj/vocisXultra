import type { MetadataRoute } from "next";
import { locales } from "@/lib/locales";

const base = "https://vocisxultra.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return locales.map((locale) => ({
    url: `${base}/${locale}`,
    lastModified,
    changeFrequency: "monthly",
    priority: locale === "en" ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `${base}/${l}`])),
    },
  }));
}
