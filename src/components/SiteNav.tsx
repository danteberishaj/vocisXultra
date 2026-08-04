"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { ScrollProgress } from "@/components/ScrollProgress";
import { IconClose, IconMenu } from "@/components/icons";
import { locales, localeNames, type Locale } from "@/lib/locales";
import type { Dictionary } from "@/dictionaries/en";

type SiteNavProps = {
  locale: Locale;
  nav: Dictionary["nav"];
  a11y: Pick<Dictionary["a11y"], "menuOpen" | "menuClose" | "langLabel">;
};

const sections = [
  ["foundation", "foundation"],
  ["ensemble", "ensemble"],
  ["repertoire", "repertoire"],
  ["events", "events"],
  ["contact", "contact"],
] as const;

export function SiteNav({ locale, nav, a11y }: SiteNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    openButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const label = (key: (typeof sections)[number][1]) => nav[key];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled
          ? "border-b border-hairline/60 bg-canvas/90 backdrop-blur-sm"
          : "border-b border-transparent"
      }`}
    >
      <ScrollProgress />

      <div className="mx-auto flex h-16 w-full max-w-[84rem] items-center justify-between px-6 sm:px-10 lg:px-16">
        <Link
          href={`/${locale}`}
          className="text-lg text-ink no-underline"
          onClick={() => setOpen(false)}
        >
          <Wordmark />
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label={nav.welcome}>
          {sections.map(([id, key]) => (
            <a
              key={id}
              href={`#${id}`}
              className="font-sans text-[0.8rem] font-medium tracking-[0.14em] uppercase text-faint transition-colors hover:text-ink focus-visible:text-ink"
            >
              {label(key)}
            </a>
          ))}
          <span aria-hidden className="h-4 w-px bg-hairline" />
          <LocaleSwitcher current={locale} label={a11y.langLabel} />
        </nav>

        {/* Mobile trigger */}
        <button
          ref={openButtonRef}
          type="button"
          className="-mr-2 flex h-11 w-11 items-center justify-center text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? a11y.menuClose : a11y.menuOpen}
          onClick={() => setOpen((v) => !v)}
        >
          <IconMenu />
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        className={`fixed inset-0 z-50 flex min-h-dvh flex-col bg-canvas/[0.985] transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-[84rem] items-center justify-between px-6 sm:px-10 lg:px-16">
          <span className="text-lg text-ink">
            <Wordmark />
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            className="-mr-2 flex h-11 w-11 items-center justify-center text-ink"
            aria-label={a11y.menuClose}
            onClick={close}
          >
            <IconClose />
          </button>
        </div>
        <nav
          className="mx-auto flex w-full max-w-[84rem] flex-1 flex-col justify-center gap-1 px-6 sm:px-10 lg:px-16"
          aria-label={nav.welcome}
        >
          {sections.map(([id, key], i) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={close}
              className="border-b border-hairline/40 py-4 font-display text-3xl text-ink transition-colors hover:text-accent"
              style={{ transitionDelay: open ? `${i * 30}ms` : "0ms" }}
            >
              {label(key)}
            </a>
          ))}
        </nav>
        <div className="mx-auto w-full max-w-[84rem] px-6 pb-12 sm:px-10 lg:px-16">
          <LocaleSwitcher current={locale} label={a11y.langLabel} large />
        </div>
      </div>
    </header>
  );
}

function LocaleSwitcher({
  current,
  label,
  large = false,
}: {
  current: Locale;
  label: string;
  large?: boolean;
}) {
  return (
    <nav aria-label={label} className={`flex items-center ${large ? "gap-5" : "gap-3"}`}>
      {locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}`}
          aria-current={locale === current ? "true" : undefined}
          aria-label={localeNames[locale]}
          className={`font-sans font-medium tracking-[0.14em] uppercase transition-colors ${
            large ? "py-2 text-base" : "text-[0.8rem]"
          } ${
            locale === current
              ? "text-accent underline decoration-accent-deep underline-offset-4"
              : "text-faint hover:text-ink"
          }`}
        >
          {locale}
        </Link>
      ))}
    </nav>
  );
}
