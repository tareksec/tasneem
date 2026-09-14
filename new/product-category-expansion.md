# Product Category Expansion — Addendum
**For:** Gemini 3.8 (Antigravity IDE)
**Supersedes:** `PRD.md` Section 5 (Sitemap), `TRD.md` Section 4 (category
enum), `image-assets-instruction.md` Section 2 (category icon list) — the
machine category structure needs to expand.

---

## 1. Why

Client confirmed via their Facebook page that the business scope is broader
than circular knitting machines alone: **circular knitting machines, dyeing
machines, shearing machines, and other textile/garments machinery**
(per `client-confirmed-facts.md` Section 1). The catalog structure built so
far only had circular-knitting sub-types as top-level categories — that
needs to become a two-level structure.

## 2. New Category Structure

```
Machines (top level)
├── Circular Knitting Machines
│   ├── Double Jersey
│   ├── Single Jersey
│   ├── Interlock
│   ├── Jacquard
│   └── Terry
├── Dyeing Machines
├── Shearing Machines
├── Finishing Machines
└── Other Textile & Garments Machinery
```

- The original 6 "categories" (Double Jersey, Single Jersey, Interlock,
  Jacquard, Terry, Finishing) become **sub-categories under "Circular Knitting
  Machines"**, except Finishing — keep Finishing as its own top-level category
  since finishing machines aren't exclusively a circular-knitting sub-type.
- "Other Textile & Garments Machinery" is a catch-all top-level category for
  anything that doesn't fit the named ones — don't force every machine into
  an ill-fitting specific category.

## 3. What This Changes

### Sitemap (`PRD.md` Section 5)
```
/machines
├── Circular Knitting Machines
│   ├── Double Jersey
│   ├── Single Jersey
│   ├── Interlock
│   ├── Jacquard
│   └── Terry
├── Dyeing Machines
├── Shearing Machines
├── Finishing Machines
└── Other Machinery
```

### Homepage Machine Categories Grid (`design.md` Section 1B item 3)
- Was a flat 6-item grid — now show the **top-level categories** on the
  homepage (Circular Knitting Machines, Dyeing Machines, Shearing Machines,
  Finishing Machines, Other Machinery — 5 cards instead of 6), with Circular
  Knitting's sub-types shown on its own category landing page, not cluttering
  the homepage grid.

### Data Model (`TRD.md` Section 4)
- `category` field becomes two fields: `mainCategory` and `subCategory`
  (subCategory only applies within Circular Knitting Machines, optional/null
  for the others):
```ts
mainCategory: "circular-knitting" | "dyeing" | "shearing" | "finishing" | "other"
subCategory?: "double-jersey" | "single-jersey" | "interlock" | "jacquard" | "terry"
```

### Category Icons (`image-assets-instruction.md` Section 2 /
`replace-illustrations-with-real-images.md` Section 2)
- Need new icons/photos for: **Dyeing Machines**, **Shearing Machines**,
  **Other Machinery** (Finishing already covered) — same sourcing rules apply
  (real licensed photos per `replace-illustrations-with-real-images.md`
  Section 1, search terms: "industrial dyeing machine textile", "fabric
  shearing machine industrial")

### Admin Panel (`admin-panel.md` Section 2.2, `ecommerce-and-admin-product-control.md` Section 3.1)
- Product upload/edit form's category field becomes a two-step selector
  (main category, then sub-category if Circular Knitting is chosen) instead
  of a flat single dropdown.

### URL Structure (`ecommerce-and-admin-product-control.md` Section 3.4)
- Machine detail URLs now nest under the main category:
  `/machines/circular-knitting/double-jersey/[slug]`,
  `/machines/dyeing/[slug]`, `/machines/shearing/[slug]`, etc.
- If any machines were already entered under the old flat structure, their
  URLs need to move — apply the same automatic-redirect rule already
  specified (old URL → new URL, 301) rather than breaking existing links.

### 301 Redirect Map (`TRD.md` Section 7)
- Add redirects from the old 6-flat-category URLs (if any were live) to their
  new nested paths.

## 4. What Does NOT Change

- Individual machine spec fields (`TRD.md` Section 4's other fields) — only
  the category field structure changes
- The quote request flow, admin bilingual fields, image management, animation,
  and color theme — all unaffected by this category restructure

## 5. Summary Instruction to Give the Agent

> Restructure the machine catalog from a flat 6-category list into a two-level
> structure: top-level categories are Circular Knitting Machines, Dyeing
> Machines, Shearing Machines, Finishing Machines, and Other Textile &
> Garments Machinery; the original Double Jersey/Single Jersey/Interlock/
> Jacquard/Terry become sub-categories under Circular Knitting Machines only.
> Update the sitemap, the homepage category grid (now 5 top-level cards), the
> data model (`mainCategory`/`subCategory` fields), the admin category
> selector (two-step), and the URL structure to nest under the main category
> — apply automatic 301 redirects for any machine URLs that move as a result.
> Source new category icons/photos for Dyeing and Shearing per the existing
> licensing rules in `replace-illustrations-with-real-images.md`.
