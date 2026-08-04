import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import { locales, hasLocale, type Locale } from "@/lib/locales";
import { getDictionary } from "@/lib/dictionaries";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return {
    metadataBase: new URL("https://vocisxultra.org"),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", sq: "/sq", de: "/de", "x-default": "/en" },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      type: "website",
      locale,
      images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Fondacioni vocisXultra",
    alternateName: "vocisXultra Foundation",
    description: dict.meta.description,
    url: `https://vocisxultra.org/${locale}`,
    logo: "https://vocisxultra.org/apple-icon.png",
    foundingDate: "2026",
    email: dict.contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Prishtina",
      addressCountry: "XK",
    },
    sameAs: [
      "https://instagram.com/vocisxultra",
      "https://facebook.com/vocisxultra",
    ],
  };

  return (
    <html
      lang={locale as Locale}
      suppressHydrationWarning
      className={`${inter.variable} antialiased`}
    >
      <head>
        {/* Arms reveal choreography before first paint; content stays visible without JS. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
