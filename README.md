# vocisXultra — Landing Page

Trilingual landing page for the **vocisXultra Foundation** (Prishtina, est. 2026) and its resident chamber choir, the vocisXultra Vocal Ensemble. *vocisXultra* means **voices from beyond**.

Built with **Next.js 16** (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · Inter.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000 → redirects to /en, /sq or /de
npm run build    # production build (all locales prerendered)
```

## Languages (i18n)

| Locale | Path  | Language |
|--------|-------|----------|
| `en`   | `/en` | English (default) |
| `sq`   | `/sq` | Albanian |
| `de`   | `/de` | German |

- Routing: [`src/proxy.ts`](src/proxy.ts) negotiates `Accept-Language` and redirects `/` to the best locale.
- **All copy lives in** [`src/dictionaries/`](src/dictionaries/) — one typed file per language (`en.ts` is the source of truth for the shape; `sq.ts` / `de.ts` must match it). Edit text there, never in components.

## Where things live

```
src/app/[locale]/      layout (fonts, metadata, JSON-LD) + page assembly
src/components/        SiteNav, Reveal (scroll animation), Wordmark, icons
src/components/sections/  Hero · Welcome+News · Foundation · Ensemble · Repertoire · Events · Footer
src/dictionaries/      en.ts · sq.ts · de.ts  ← all content
src/app/globals.css    design tokens (OKLCH), reveal/hero animations
public/images/         generated photography (webp)
scripts/optimize-images.mjs  resize/compress source images + og.jpg + icons
```

Design rationale: see [PRODUCT.md](PRODUCT.md) and [DESIGN.md](DESIGN.md). House rule: the site is **strictly secular** in look — no candles, parchment, darkness-as-mood or liturgical styling.

## Common edits

- **News item**: edit `welcome.news` in each dictionary.
- **Announce a concert**: replace the `events.upcoming` empty state with real entries (add a list to the dictionaries and render rows in `src/components/sections/Events.tsx`).
- **Member bios**: `ensemble.membership` note explains bios will be published — add a `members` array when ready.
- **New images**: drop originals in `public/images/`, adjust `scripts/optimize-images.mjs`, run `node scripts/optimize-images.mjs`.

## ⚠ Placeholder people and portraits

Two blocks of the page are scaffolding, not real data. **Both must be replaced before launch.**

**Portraits** — every file in `public/images/team/` is an AI-generated face. None of them is a photograph of the person named beside it. Publishing them as-is would misrepresent real people. Replace each with a real headshot (3:4 crop, ≥720×960), keeping the filenames, then run `node scripts/optimize-images.mjs`.

**The singer roster** — `ensemble.membership.voices` in each dictionary contains eight invented names and bios (Arta Krasniqi, Elira Berisha, …) so the section could be designed. Replace with the real roster as members join; delete a voice group entirely if it has no singers yet.

**The past concerts** — `events.past.concerts` lists three invented performances (Opening Night, Six Centuries, Summer Residency) with invented venues and dates. The Foundation has no concert history yet, so **this is a claim about work that has not happened** and must be replaced or removed before launch. Deleting the array empties the grid; the surrounding section still reads correctly.

The mapping from a person to their portrait lives in [`src/lib/portraits.ts`](src/lib/portraits.ts) and is **positional** — the Nth entry there matches the Nth person in the dictionary arrays. Add or remove people in both places together.

## Photography

Every image on the page is an **AI-generated placeholder**. They are stylistically consistent — bright daylight, modern secular concert halls, airy and pale — but none of them shows the real ensemble. Swap them for real photographs before launch.

| File | Ratio | Where |
|---|---|---|
| `hero.webp` | 16:9 | Hero (full-bleed) |
| `welcome.webp` | 16:9 | Welcome |
| `rehearsal.webp` | 3:2 | Ensemble band (full-bleed) |
| `conductor.webp` | 3:4 | Artistic Direction |
| `score.webp` | 1:1 | Repertoire, Sacred & Secular |
| `upcoming.webp` | 3:4 | Events → Upcoming |
| `past-1/2/3.webp` | 4:3 | Events → Past |
| `team/management-1…4.webp` | 3:4 | Foundation → Management |
| `team/member-1…8.webp` | 3:4 | The Singers |

To replace one: drop the new source into `public/images/src/`, register it in [`scripts/optimize-images.mjs`](scripts/optimize-images.mjs), run `node scripts/optimize-images.mjs`, and update the alt text in all three dictionaries. The script is re-runnable and skips any step whose source is missing, so removing bulky originals afterwards is safe.

**Alt text lives in the dictionaries** (`a11y.*ImageAlt`), never inline — it is content and must be translated.

House style, if you commission or shoot replacements: daylight, pale minimal architecture, generous negative space, dark concert attire, nothing liturgical. Contained images carry `rounded-2xl`; the two full-bleed ones (hero, ensemble band) stay square because they meet the viewport edges.

## Before going live (placeholders to replace)

- [ ] Replace every photograph with real imagery (see Photography above)

- [ ] Real headshots for management + singers, and the real roster (see above)
- [ ] `info@vocisxultra.org` — email in all three dictionaries
- [ ] `instagram.com/vocisxultra` / `facebook.com/vocisxultra` — `src/components/sections/SiteFooter.tsx` and JSON-LD in `src/app/[locale]/layout.tsx`
- [ ] Domain `vocisxultra.org` — `metadataBase` + JSON-LD in `layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`
- [ ] Have a native speaker review the Albanian and German copy
