@AGENTS.md

# Project

A landing page for a **non-profit choir organization**. Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4.

The design bar is **elegant** — restrained, editorial, timeless. This is a choral arts non-profit, not a SaaS product. Favor generous whitespace, refined serif/sans pairings, subtle motion, and a quiet palette. Avoid startup-landing-page clichés: no gradient-blob heroes, no neon accents, no emoji bullets, no "🚀 Get Started" energy.

# Design workflow — apply on every prompt

**Before writing or changing any UI, invoke both design skills. This is not optional and does not need to be re-requested each time.**

1. **`ui-ux-pro-max`** — invoke via the Skill tool. Use its databases for style selection, color palettes, font pairings, motion, and UX guidelines. Query for the stack in use (Next.js / Tailwind). Installed at `.claude/skills/ui-ux-pro-max`.
2. **`impeccable`** — invoke via the Skill tool (`skill: impeccable`). Use it to set design direction and to catch AI-slop anti-patterns before they ship. Installed at `~/.claude/skills/impeccable`.

Order: pull direction and concrete tokens from `ui-ux-pro-max`, then run the result past `impeccable` for critique and slop-detection before finalizing.

**Python is not installed on this machine**, so the `scripts/*.py` helpers in `ui-ux-pro-max` cannot run. Read the CSVs in `.claude/skills/ui-ux-pro-max/data/` directly with Grep/Read instead — same data, no interpreter needed.

The installer also added sibling skills alongside it: `design`, `design-system`, `brand`, `ui-styling`, `banner-design`, `slides`. Reach for those when the task fits (e.g. `design-system` for token work), but `ui-ux-pro-max` + `impeccable` remain the default pair.

Apply this to **any** prompt that touches the interface — new sections, copy edits, spacing tweaks, color changes, animation, responsive fixes. If a prompt is purely backend, config, or tooling, skip the skills.

## Reference

- Impeccable — https://impeccable.style/
- UI UX Pro Max — https://ui-ux-pro-max-skill.nextlevelbuilder.io/

# Conventions

- App Router under `src/app/`, `@/*` import alias.
- Tailwind v4 — theme tokens go in `src/app/globals.css` via `@theme`, not a `tailwind.config.js`.
- Keep components server-side by default; add `"use client"` only where interactivity requires it.
- Run `npm run build` before declaring UI work done.
