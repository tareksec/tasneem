# Agent Instructions — Tasneem Knit Industry Website Build
**For:** Gemini 3.8 (High) running inside Antigravity IDE
**Role:** Senior Frontend Developer implementing this project end-to-end from the
attached spec files.

---

## Context Files (read all three before writing any code)

1. `PRD.md` — what the site must contain and do (pages, content, business rules)
2. `TRD.md` — tech stack, hosting environment, data model, deployment plan
3. `design.md` — visual system (colors, typography, components, layout, animation)
   and the content-mapping table that tells you what replaces the original
   "Logist" logistics demo content

Treat these three files as the source of truth. Do not invent business facts,
prices, certifications, or client claims that are not in `PRD.md`.

---

## Task

Build the Next.js (App Router) + Tailwind CSS frontend for Tasneem Knit Industry
following `design.md` for all visual decisions and `PRD.md` for all content/page
requirements. Use the tech stack exactly as specified in `TRD.md`.

## Build Order

1. **Project scaffold** — Next.js (App Router) + TypeScript + Tailwind CSS +
   shadcn/ui + Lucide React + Framer Motion, per `TRD.md` Section 1.
2. **Design tokens** — implement the color palette, typography scale, spacing
   scale from `design.md` Sections 2, 3, 6 as Tailwind theme config / CSS
   variables, not one-off hardcoded classes scattered everywhere.
3. **Shared layout** — header/nav and footer per `design.md` Section 1A and PRD
   Section 6.1 step 1/16.
4. **Homepage** — build sections in the exact order given in `design.md` Section
   1B, using the content mapping table in `design.md` Section 0. Where real
   content (photos, testimonials, certifications, counts) is not yet available,
   render a clearly marked placeholder or omit the section — never fabricate
   numbers, client names, or claims.
5. **Machine catalog** — category pages and machine detail pages using the data
   model in `TRD.md` Section 4. Unconfirmed spec fields must render
   "Contact for details", not blank or guessed values.
6. **Request a Quote form** — fields exactly as listed in `PRD.md` Section 6.4;
   wire to the API route described in `TRD.md` Section 5.
7. **Remaining pages** — About, Services, How It Works, Industries, Projects,
   Resources, FAQ, Contact — per `PRD.md` Section 6.5.
8. **FAQ accordion** — use the corrected component in `design.md` Section 9
   as-is (the original Gemini output had broken JSX — already fixed there).
9. **SEO scaffolding** — metadata, sitemap.xml, robots.txt, schema markup per
   `TRD.md` Section 8 and `PRD.md` Section 10.
10. **301 redirects** — implement the old→new URL map in `TRD.md` Section 7.

## Hard Rules

- Do not build a consumer cart/checkout flow. This is a B2B quote-request site —
  see `PRD.md` Section 8 for what "e-commerce facility" means here.
- Do not remove the "Contact for details" fallback for unconfirmed machine specs
  or pricing.
- Do not add fake testimonials, client logos, certifications, or stats. If
  `design.md`/`PRD.md` mark something as "omit until confirmed," omit it.
- Do not silently change the color palette, type scale, or component styles in
  `design.md` — if something in the spec seems wrong or impractical, flag it
  instead of quietly deviating.
- Keep the site mobile-first and WhatsApp-accessible throughout — this is the
  primary contact channel for this market.
- Package manager is `pnpm` — do not generate `package-lock.json`/`yarn.lock`.

## Output Expectations

- Production-ready TypeScript, not pseudocode.
- Componentized (no 1000-line page files) — split by section per `design.md`.
- Every place where data is unconfirmed or an asset is missing, leave a clear
  `// TODO(owner-confirm): ...` comment referencing the relevant PRD checklist
  item, so it's easy to grep before launch.
- After scaffolding, produce a short summary of what was built, what still needs
  real client data/assets (cross-reference `PRD.md` Section 9), and any
  deviations from the spec with reasoning.
