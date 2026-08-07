# Design

Visual system for the vocisXultra landing page. Mood: *morning rehearsal light — a bright modern hall, white air, harbor-blue accents.* Strictly secular and contemporary: no candles, parchment, darkness-as-atmosphere, engraved/liturgical styling, or church iconography — in copy, CSS, **and imagery**.

## Color

Strategy: **Restrained light** — pure white canvas, one deep harbor-blue accent. OKLCH throughout, defined in `src/app/globals.css`.

| Token        | Value                     | Role |
|--------------|---------------------------|------|
| `--canvas`   | `oklch(1 0 0)`            | Page surface — pure white, no hidden tint |
| `--panel`    | `oklch(0.972 0.005 240)`  | Raised panels when earned |
| `--panel-2`  | `oklch(0.945 0.008 240)`  | Hover states, deeper layering |
| `--ink`      | `oklch(0.21 0.02 250)`    | Body text — deep blue-black (≈14:1 on canvas) |
| `--faint`    | `oklch(0.47 0.02 250)`    | Secondary text (≈7:1 on canvas) |
| `--accent`   | `oklch(0.45 0.11 240)`    | Harbor blue — links, labels, the ✕, era markers (≈7:1, safe at small sizes). White text on accent fills |
| `--accent-deep` | `oklch(0.66 0.09 232)` | Lighter blue for borders, underlines, decorative marks |
| `--hairline` | `oklch(0.885 0.012 245)`  | Hairlines, rules, staff lines |
| `--harbor`   | `oklch(0.35 0.078 240)`   | Brand seed — reserved for deep fills |

Rules: the white is literal `#fff` — warmth/coolness lives in type color and photography, never the surface. No gradients on text. Focus ring: 2px `--accent`.

## Typography

**Inter only** (user decision) — variable, normal + italic, `latin` + `latin-ext`. One family, contrast through weight and size:

| Role | Treatment |
|------|-----------|
| Display (`--font-display`) | Inter ~650, letter-spacing −0.022em — headings, wordmark, nav |
| Prose (`--font-serif` alias + `.prose-voice`) | Inter 400, 1.7 line-height, ≤64ch; italics for ledes, quotes, the *beyond* gestures |
| UI (`--font-sans`) | Inter 400–600 — labels, buttons, captions |

All three font aliases intentionally resolve to Inter so components stay theme-agnostic. Fluid `clamp()` scale; display ceiling 6rem; `text-wrap: balance` on headings, `pretty` on prose.

## Signature gestures

1. **The ✕** — vocis✕ultra wordmark sets the X in accent-blue Inter italic. Also the ornament above the philosophy quote.
2. **Staff lines** — thin triple hairlines echo an empty stave; max three uses per page.
3. **Six-century line** — the repertoire timeline is the only numbered/dated structure.
4. **Imagery dissolves into white** — photos feather into the canvas via white gradient overlays and inset white vignettes; no hard photo rectangles.

## Imagery

Bright, airy, architectural, secular: daylight halls, casual rehearsal scenes from behind, crisp scores on white tables, hands + baton. Never: candles, robes, dark silhouette formations, sacred spaces.

**Portraits** are the one place faces appear. House style: plain white or pale-grey backdrop, soft window light from the side, 3:4 crop from the top, smart-casual clothing in the site palette (white, grey, navy, pale blue), calm composed expression. Shot consistently enough that twelve portraits read as one commission. Current files are AI placeholders — see README.

## People sections

Two different structures, deliberately — a uniform card grid across both would be the template tell.

- **Management** — editorial list rows: portrait and identity stacked in the left column, biography set across the right. Hairline separators, no cards.
- **Singers** — grouped by the choir's own taxonomy (Soprano / Alto / Tenor / Bass). The voice part anchors the left column in accent blue; singers flow two-up to the right with larger portraits. The grouping, not decoration, carries the structure.

## Layout — shared voice, composed sections

Two failure modes were tried and rejected here, and both matter:

1. **Every section inventing its own grid** (six different content start columns, centred blocks interleaved with left-aligned ones). Restless and incoherent.
2. **One label-left / content-right grid repeated fifteen times.** Coherent and completely lifeless — mechanical uniformity reads as machine output just as loudly as randomness does.

What holds the page together is **consistency of voice, not consistency of treatment**: one type scale, one spacing rhythm, one wide canvas. Composition then varies per section, on purpose.

**Canvas:** `max-w-[84rem]`, `px-6 sm:px-10 lg:px-16` — deliberately wider than a reading column. Space is the material; don't shrink back to a narrow shell. Nav, hero and every section share these exact values so vertical edges line up.

**Vocabulary** — [`src/components/Layout.tsx`](src/components/Layout.tsx) provides `Shell`, `Section`, `SectionTitle`, `Statement`, `Measure`, `Marker`, `Rule`. These are *ingredients, not a template*. Combine them differently each time.

**Type scale is the main instrument.** It runs 12px → 72px on desktop. Key statements are set large (`Statement`, ~2.15rem max) and section titles very large (~4.5rem); body copy stays ~1.05rem. Reaching for scale contrast is what makes a section feel composed rather than filled.

**Compositions in use** (keep them distinct as the page grows):
- *Welcome* — oversized opening statement, then two-column magazine text indented ~28%.
- *Foundation* — mission left, vision answering **right-aligned**; values three-up; management as a staggered five-portrait strip.
- *Ensemble* — full-bleed band; three wide principles; **the page's one centred moment** (philosophy quote); tall portrait against open space; roster four-up.
- *Repertoire* — era name huge with the period baseline-aligned opposite it, then a two-column split.
- *Events* — the empty season set at display scale; bookings as an asymmetric 5/6 split.
- *Contact* — the email address is the loudest element on the page.

Roughly 20 distinct left edges at desktop, with a dominant spine (~74 elements) and intentional departures — a spine with variations, not a rigid rail and not chaos.

## Motion

Sparse, varied reveals (`Reveal` component), one hero entrance, 300–700ms ease-out-quart/expo, full `prefers-reduced-motion` support; content visible without JS.

## Components

- **Nav**: fixed; transparent over hero → `--canvas`/90 + blur + hairline after scroll. Mobile: full-screen white overlay, locale switcher EN · SQ · DE.
- **Buttons**: ghost with accent-deep hairline border, text ink; hover → accent. 44px min height.
- **News/Events**: list rows with hairlines, never cards.
- **Empty states**: staff-rule + one italic sentence + follow CTA.
- **Footer/Impressum**: smallest type, `--faint`, generous top padding.
