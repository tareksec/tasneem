# Design Specification Document
**Project:** Tasneem Knit Industry — Website Rebuild
**Source:** Adapted from Gemini video-analysis spec ("Logist" logistics UI demo)
**Target Stack:** Next.js (App Router), Tailwind CSS, Lucide React, Framer Motion
**Version:** 1.0

> This is the *visual system* from the reference video, remapped to Tasneem's
> content. Colors, type, components, spacing, and animation timing are carried
> over as-is (they fit an industrial/B2B mood). Section content is replaced —
> see the mapping table in Section 0.

---

## 0. Content Mapping (reference demo → Tasneem)

| Reference section | Tasneem equivalent |
|---|---|
| Hero: cargo warehouse isometric | Hero: knitting machine factory floor (real photo once received) or isometric machine illustration |
| Services: Road/Ocean/Air/Drone (4-col) | Machine Categories: Double Jersey / Single Jersey / Interlock / Jacquard / Terry / Finishing |
| Spotlight 1 (Road Freight) | Spotlight: Machine Sourcing (direct import, no middleman) |
| Testimonial (Disney quote) | Real client testimonial if available — **omit this section entirely** until a real quote/photo exists; do not fabricate |
| Why Choose Us (2x2 staggered grid) | Why Tasneem: Direct Importer / 3rd-Party Inspection / CFR Chattogram / Install & After-Sales |
| Spotlight 2 (Drone Delivery) | Installation + Commissioning + Training |
| Newsletter "Let's Connect" banner | Quote CTA: "Need a specific machine spec?" |
| Footer | Company info, machine category links, BIN/IRC (once confirmed), social links |

---

## 1. Layout Structure

### A. Header / Navigation
- `sticky top-0 z-50`, `backdrop-blur-md bg-[#F4F7FB]/90`
- Container: `max-w-7xl mx-auto px-6 py-4 flex items-center justify-between`
- Logo: left-aligned, typographic — `"Tasneem Knit Industry"` (`text-2xl font-bold tracking-tight text-[#111827]`), consider a shorter lockup for mobile (`"Tasneem"` + small mark)
- Nav items (center): `Machines`, `Services`, `About`, `How It Works`, `Projects`, `Contact`
  - `hidden md:flex items-center gap-8 text-sm font-medium text-gray-700`
- Right actions:
  - Primary: `"Request a Quote"` — `bg-[#111827] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-black transition-colors`
  - Secondary: WhatsApp icon link

### B. Homepage Section Order
1. Hero — headline, supporting copy, dual CTA (`Request a Quote` + `WhatsApp`), machine/factory artwork
2. Trust strip — BIN/IRC/registration (once confirmed), SGS/ITS/BV inspection badges
3. Machine Categories — 4–6 col grid (Double Jersey, Single Jersey, Interlock, Jacquard, Terry, Finishing)
4. Featured Machines — card grid, spec summary + "Request Quote"
5. Spotlight: Machine Sourcing — split view, illustration + copy + "Learn More"
6. Why Tasneem — left heading/description, right 2x2 staggered feature grid
7. Spotlight: Installation & After-Sales — central illustration flanked by checklist
8. Industries/Applications served
9. Projects/Installations gallery (real photos only)
10. FAQ accordion
11. Quote CTA banner ("Need a specific machine spec?")
12. Footer

### C. Grid & Flexbox
- Global wrapper: `min-h-screen bg-[#F4F7FB] text-[#111827] antialiased`
- Global container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Hero: `flex flex-col items-center text-center` → full-width illustration wrapper below
- Machine Categories grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6` (or `lg:grid-cols-6` if 6 categories fit)
- Why Tasneem grid: `grid grid-cols-1 lg:grid-cols-12 gap-12 items-center`
  - Left: `lg:col-span-4 flex flex-col gap-6`
  - Right: `lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8`, cards use `translate-y-6` stagger
- FAQ container: `max-w-3xl mx-auto flex flex-col gap-3.5`

---

## 2. Color Palette (Updated Logo-Based Dark Theme — Brand Color Addendum)

*Supersedes previous light palette. All layout, typography, component shapes, spacing, and animations remain as specified.*

| Token | Hex | Tailwind | Use |
|---|---|---|---|
| Primary Base | `#0A0A0A` | `bg-[#0A0A0A]` | Main page background site-wide |
| Surface (Cards/Panels) | `#161616` | `bg-[#161616]` | Cards, nav bar, form inputs, spec tables |
| Surface Lifted | `#1A1A1A` | `bg-[#1A1A1A]` | Inner inputs, table headers, elevated hover states |
| Border Structural | `#2A2A2A` | `border-[#2A2A2A]` | Subtle hairline borders on cards, table rows, dividers |
| Border Chrome | `#C0C0C0` | `border-[#C0C0C0]` | Chrome/silver emphasis borders, hover states |
| Primary Text | `#FFFFFF` / `#F5F5F5` | `text-white` / `text-[#F5F5F5]` | Headings, primary body text, table values |
| Secondary Text | `#A0A0A0`–`#9CA3AF` | `text-[#A0A0A0]` | Subtitles, secondary copy, spec labels, metadata |
| Brand Red (Primary Accent) | `#FF0000` | `bg-[#FF0000]` / `text-[#FF0000]` | Extracted directly from client logo. Primary CTAs, active states, price highlights |
| Chrome / Silver (Secondary Accent) | `#C0C0C0`–`#D4D4D4` | `text-[#C0C0C0]` / `border-[#C0C0C0]` | Secondary accent mirroring logo chrome ring (dividers, icon strokes, badge outlines) |
| ~~Accent Sky~~ | `#85B0F7` | **REMOVED** | Replaced by Brand Red |
| ~~Accent Gold~~ | `#F6C343` | **REMOVED** | Removed entirely |

---

## 3. Typography

- Family: **Plus Jakarta Sans** or **Inter** (clean geometric sans)
- Scale:
  - H1: `text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.15]`
  - H2: `text-3xl sm:text-4xl font-bold tracking-tight`
  - H3 (card title): `text-lg sm:text-xl font-semibold`
  - Body: `text-sm sm:text-base text-gray-600 leading-relaxed`
  - Caption/metadata (spec labels): `text-xs uppercase tracking-wider text-gray-400 font-medium`

---

## 4. UI Components

### Buttons
- Primary outline: `bg-white border-1.5 border-[#111827] text-[#111827] px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-[#111827] hover:text-white transition-all duration-200 shadow-sm`
- Secondary link (WhatsApp/Call): `inline-flex items-center gap-2 text-sm font-medium hover:opacity-75 transition-opacity`
- Card arrow button: `w-8 h-8 rounded-full border border-[#111827] flex items-center justify-center text-xs group-hover:bg-[#111827] group-hover:text-white transition-colors duration-200`

### Cards
- Machine/Service card: `border border-[#111827] rounded-xl p-5 bg-white flex flex-col justify-between hover:-translate-y-1 transition-transform duration-200 cursor-pointer`
- Spec table row (machine detail page): plain table/definition-list styling, `text-sm`, label in `text-gray-500`, value in `text-[#111827] font-medium`

### Forms (Request a Quote)
- Wrapper: `border border-[#111827] rounded-xl bg-white p-6 sm:p-8`
- Inputs: `bg-transparent border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#111827]`
- Submit: `bg-[#111827] text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-black transition-colors`

### FAQ Accordion
- Default: `bg-white text-[#111827] border-[#111827]`
- Open: inverts to `bg-[#111827] text-white`, arrow rotates 90°, answer reveals below

### Icons/Illustration
- Style: 2.5D isometric vector with black stroke outlines, soft blue fills, gold accents — **only if real machine/factory photography isn't available yet**; prefer real photos once client assets arrive (per PRD Section 9 — do not use generic stock imagery for machinery)
- UI icons: Lucide (`ArrowUpRight`, `Check`, `Star`, `Menu`, `X`, `Phone`, `MessageCircle` for WhatsApp)

---

## 5. Animations & Interactions

- Scroll reveal: fade-in + slide-up (`opacity 0→1`, `y: 20→0`), `duration-500 ease-out`
- FAQ accordion: instant color invert on open, 90° arrow rotation, smooth answer reveal
- Card hover: `hover:-translate-y-1.5`, snappy `duration-200–300`
- Overall timing feel: snappy, crisp, predictable — avoid slow/heavy motion (industrial trust, not flashy)

---

## 6. Spacing & Whitespace

- Section spacing: `py-20 lg:py-28`
- Hero header → CTA: `mt-8`
- Headline → sub-headline: `mt-4`
- Section header → grid: `mt-12` to `mt-16`
- Card padding: `p-5` to `p-6`
- Hero/CTA banner padding: `p-8` to `p-14`

---

## 7. Responsive Behavior

- **Mobile (< 640px):** nav collapses to hamburger; hero title → `text-3xl sm:text-4xl`; category/machine grids → 1 column; staggered `translate-y-6` resets to 0; WhatsApp button stays visible/fixed given this market is mobile-first
- **Tablet (640–1024px):** grids → 2 columns; hero illustration scales responsively

---

## 8. Overall Design Mood

- Philosophy: **Clean Neo-Minimalism, Industrial B2B Trust** — a restrained version of
  the reference's "Soft Neo-Brutalism" (hard black strokes, flat panels, high
  contrast, sans-serif) with less playfulness (drop the gold accent's prominence,
  keep the isometric/illustration style only as a placeholder until real
  photography is available)
- Vibe: reliable, structured, technical, trustworthy — matches PRD's "avoid generic
  WooCommerce / cheap e-commerce look" requirement

---

## 9. Reference Component (fixed)

FAQ accordion — corrected from the Gemini output (original had broken JSX on the
`ArrowUpRight` line):

```tsx
"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface FaqItemProps {
  question: string;
  answer: string;
}

export function FaqAccordionItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`border border-[#111827] rounded-xl p-5 cursor-pointer transition-all duration-300 ${
        isOpen ? "bg-[#111827] text-white" : "bg-white text-[#111827] hover:bg-gray-50"
      }`}
    >
      <div className="flex justify-between items-center select-none">
        <h3 className="font-semibold text-base sm:text-lg">{question}</h3>
        <ArrowUpRight
          className={`w-5 h-5 transition-transform duration-300 ${
            isOpen ? "rotate-90 text-white" : "text-[#111827]"
          }`}
        />
      </div>
      {isOpen && (
        <p className="mt-3 text-sm text-gray-300 leading-relaxed">{answer}</p>
      )}
    </div>
  );
}
```
