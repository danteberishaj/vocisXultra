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

The mapping from a person to their portrait lives in [`src/lib/portraits.ts`](src/lib/portraits.ts) and is **positional** — the Nth entry there matches the Nth person in the dictionary arrays. Add or remove people in both places together.

## Image slots (reserved space for future photography)

Five spots on the page reserve space for photographs that don't exist yet. Each states the aspect ratio and the pixel size to supply, so filling one is a drop-in.

| Where | Ratio | Supply | For |
|---|---|---|---|
| Welcome | 16:9 | 2560 × 1440 | Establishing shot of the ensemble in performance |
| Events → Upcoming | 3:4 | 1200 × 1600 | Poster or photo for the first announced concert |
| Events → Past | 4:3 | 1600 × 1200 | Concert photograph (×3, the performance archive) |

List every remaining slot with:

```bash
grep -rn "data-image-slot" src
```

To fill one, replace the whole `<ImageSlot … />` with a real image and **write descriptive alt text** (an empty slot is `aria-hidden`; a real photograph must not be):

```tsx
<div className="relative aspect-video w-full overflow-hidden bg-panel">
  <Image src="/images/concert.webp" alt="…" fill sizes="100vw" className="object-cover" />
</div>
```

Add new source images to `public/images/`, register them in `scripts/optimize-images.mjs`, then run `node scripts/optimize-images.mjs`. Slot labels are English-only — they address whoever supplies the photo, not visitors, and disappear as slots get filled.

## Before going live (placeholders to replace)

- [ ] Fill or delete all five image slots (`grep -rn "data-image-slot" src`)

- [ ] Real headshots for management + singers, and the real roster (see above)
- [ ] `info@vocisxultra.org` — email in all three dictionaries
- [ ] `instagram.com/vocisxultra` / `facebook.com/vocisxultra` — `src/components/sections/SiteFooter.tsx` and JSON-LD in `src/app/[locale]/layout.tsx`
- [ ] Domain `vocisxultra.org` — `metadataBase` + JSON-LD in `layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`
- [ ] Have a native speaker review the Albanian and German copy
