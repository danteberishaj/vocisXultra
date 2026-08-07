import type { MetadataRoute } from "next";
import { locales } from "@/lib/locales";

const base = "https://vocisxultra.org";

/** Every localised page, as a path appended to `/{locale}`. */
const paths = ["", "/emanuel-mates"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${base}/${locale}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: (locale === "en" ? 1 : 0.9) - (path ? 0.2 : 0),
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${base}/${l}${path}`])),
      },
    })),
  );
}
