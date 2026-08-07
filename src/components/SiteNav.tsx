"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { ScrollProgress } from "@/components/ScrollProgress";
import { IconClose, IconMenu } from "@/components/icons";
import { buildNav, type NavEntry } from "@/lib/nav";
import { locales, localeNames, type Locale } from "@/lib/locales";
import type { Dictionary } from "@/dictionaries/en";

type SiteNavProps = {
  locale: Locale;
  dict: Dictionary;
  /**
   * Prefix for the in-page anchors. Empty on the home page, where `#direction`
   * is a same-document jump. Subpages pass `/{locale}` so the same menu points
   * back at the one long page instead of hunting for anchors that aren't there.
   */
  anchorBase?: string;
  /**
   * Path segment the locale switcher keeps when changing language, so a
   * subpage switches to its own translation rather than dropping you home.
   */
  localeSuffix?: string;
};

export function SiteNav({ locale, dict, anchorBase = "", localeSuffix = "" }: SiteNavProps) {
  const nav = buildNav(dict);
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
        <nav className="hidden items-center gap-7 lg:flex" aria-label={dict.nav.welcome}>
          {nav.map((entry) => (
            <DesktopItem key={entry.id} entry={entry} anchorBase={anchorBase} />
          ))}
          <span aria-hidden className="h-4 w-px bg-hairline" />
          <LocaleSwitcher current={locale} label={dict.a11y.langLabel} suffix={localeSuffix} />
        </nav>

        {/* Mobile trigger */}
        <button
          ref={openButtonRef}
          type="button"
          className="-mr-2 flex h-11 w-11 items-center justify-center text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? dict.a11y.menuClose : dict.a11y.menuOpen}
          onClick={() => setOpen((v) => !v)}
        >
          <IconMenu />
        </button>
      </div>

      {/* Mobile overlay — subsections are listed inline rather than hidden
          behind a hover that touch devices do not have. */}
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
            aria-label={dict.a11y.menuClose}
            onClick={close}
          >
            <IconClose />
          </button>
        </div>

        <nav
          className="mx-auto w-full max-w-[84rem] flex-1 overflow-y-auto px-6 pb-10 sm:px-10"
          aria-label={dict.nav.welcome}
        >
          {nav.map((entry) => (
            <div key={entry.id} className="border-b border-hairline/60 py-5">
              <a
                href={`${anchorBase}#${entry.id}`}
                onClick={close}
                className="block font-display text-2xl text-ink transition-colors hover:text-accent"
              >
                {entry.label}
              </a>
              {entry.children.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                  {entry.children.map((child) => (
                    <li key={child.id}>
                      <a
                        href={`${anchorBase}#${child.id}`}
                        onClick={close}
                        className="inline-flex min-h-9 items-center font-sans text-sm text-faint transition-colors hover:text-accent"
                      >
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>

        <div className="mx-auto w-full max-w-[84rem] px-6 pb-12 sm:px-10">
          <LocaleSwitcher current={locale} label={dict.a11y.langLabel} suffix={localeSuffix} large />
        </div>
      </div>
    </header>
  );
}

/**
 * One desktop nav entry and its dropdown.
 *
 * Opening is driven by CSS `group-hover` *and* `group-focus-within`, so a
 * pointer and a keyboard both reach it — hover alone would strand anyone
 * tabbing through. The panel sits in normal flow beneath the header, which has
 * no clipping ancestor, so nothing gets cut off.
 *
 * The parent stays a plain link to the section: the dropdown supplements it
 * rather than trapping the top-level destination behind a menu.
 */
function DesktopItem({ entry, anchorBase }: { entry: NavEntry; anchorBase: string }) {
  const linkClass =
    "font-sans text-[0.8rem] font-medium tracking-[0.14em] uppercase text-faint transition-colors hover:text-ink focus-visible:text-ink";

  if (entry.children.length === 0) {
    return (
      <a href={`${anchorBase}#${entry.id}`} className={linkClass}>
        {entry.label}
      </a>
    );
  }

  return (
    <div className="group relative">
      <a href={`${anchorBase}#${entry.id}`} className={`${linkClass} inline-flex h-16 items-center`}>
        {entry.label}
      </a>

      <div
        // Hidden from assistive tech only while closed; `invisible` also keeps
        // the links out of the tab order until the panel is reachable.
        className="invisible absolute top-full left-1/2 z-10 -translate-x-1/2 pt-0 opacity-0 transition-[opacity,transform] duration-200 ease-out group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 -translate-y-1"
      >
        <ul className="min-w-52 rounded-2xl border border-hairline bg-canvas p-2 shadow-[0_18px_40px_-24px_oklch(0.35_0.078_240_/_0.45)]">
          {entry.children.map((child) => (
            <li key={child.id}>
              <a
                href={`${anchorBase}#${child.id}`}
                className="block rounded-xl px-4 py-2.5 font-sans text-sm whitespace-nowrap text-faint transition-colors hover:bg-panel hover:text-ink focus-visible:bg-panel focus-visible:text-ink"
              >
                {child.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function LocaleSwitcher({
  current,
  label,
  suffix = "",
  large = false,
}: {
  current: Locale;
  label: string;
  suffix?: string;
  large?: boolean;
}) {
  return (
    <nav aria-label={label} className={`flex items-center ${large ? "gap-5" : "gap-3"}`}>
      {locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}${suffix}`}
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
