# Client-Confirmed Facts & Final Decisions
**Project:** Tasneem Knit Industry — Website Rebuild
**Status:** Locks the open items from `PRD.md` Section 9 and the technical
decisions flagged across `admin-panel.md`, `TRD.md`, `theme-white-and-bangla-language.md`.
Everything below is confirmed by the client/developer and should be treated as
final unless explicitly changed later.

---

## 1. Business Identity — CONFIRMED (updated, broader scope)

**Tasneem Knitting Industry is an Industrial Machinery Importer & Supplier**,
specializing in **circular knitting machines, dyeing machines, shearing
machines, and other textile/garments machinery** (broader than circular
knitting alone — confirmed by the client via their Facebook page). This
resolves the earlier homepage-vs-About-page conflict noted in `PRD.md`
Section 2 — use this positioning consistently across the entire site, and
note the category structure needs to expand beyond just circular-knitting
sub-types (see `product-category-expansion.md` for the sitemap/catalog
update this requires). Remove/rewrite any remaining copy that frames the
business as a knitwear/garment manufacturer.

Source: client's Facebook page (facebook.com/tasneemknitind).

## 2. Contact Information — CONFIRMED (updated — three numbers reconciled)

```
Hotline:           01887683333   (general inquiries)
Direct/Contact:    +880 1884-611888   (Mr Hasan)
WhatsApp:          +880 1711-110516
Contact Person:    Mr Hasan
```
All three numbers are legitimate and serve different purposes — display
Hotline as the primary listed number, Mr Hasan's direct line for sales
contact, and WhatsApp for the WhatsApp button/deep links specifically. Don't
collapse these into one number.

## 3. Address — CONFIRMED (client's exact wording)

```
Tasneem Knitting Industry
Plot-594, Industrial Park, Chan Nagor,
নতুন রাস্তার পশ্চিম পার্শ্বে, BSCIC, 4No New Road,
Narayanganj-1421, Bangladesh
```
This matches the Google Business Profile location found earlier and is now
directly client-confirmed. Use this exact wording (including the Bangla
line "নতুন রাস্তার পশ্চিম পার্শ্বে") site-wide (footer, Contact page,
LocalBusiness schema — schema should use a clean English-transliterated
version alongside the Bangla display text).

## 4. Registration & Compliance — CONFIRMED

```
Business Name (legal):     TASNEEM KNITTING INDUSTRY
Owner:                      MD MAMUNUR RASHID
BIN (Business ID Number):   006673859-0403
e-TIN:                      626339507948
Trade License No (17-digit): 20252617218016419
Type of Ownership:          Proprietorship
Major Economic Activity:    Retail/Wholesale Trading, Imports
Trade License Validity:     Through 30.06.2026 (FY 2025-2026)
```

**⚠️ Flag for the client — do not silently resolve:** the trade license and
VAT registration are filed under a **Savar/Ashulia, Dhaka address**
(24/3, Aukpara, Ashulia, Savar, Dhaka), which is different from the
**Narayanganj operating address** in Section 3. This is common in Bangladesh
(registered address vs. operating address) and is not necessarily an error,
but confirm with the client whether:
- The website should show the Narayanganj address as the primary
  location/contact address (recommended — that's where buyers would visit
  or ship to), and
- The Savar/Ashulia address should appear only on a legal/compliance page
  (e.g. under company registration details), not as the main contact address

Do not merge these into one address — display each in its correct context.

**Also unconfirmed:** year the company was established. Leave as "Contact for
details" or omit from public copy until provided — do not guess a year.

## 5. Technical Decisions — LOCKED

| # | Decision | Value |
|---|---|---|
| 1 | Default site language at root URL | **Bangla** — confirmed. Bangla renders at the un-prefixed root (`/`, `/blog`, `/machines`, etc.), English lives under an `/en` prefix (`/en`, `/en/blog`, `/en/machines`). This also sets the SEO-primary/canonical locale to Bangla per `theme-white-and-bangla-language.md` Section 2.3. |
| 2 | Customer login method | Email + Password |
| 3 | Blog feature | **Required at launch**, not deferred to v1.1 |
| 4 | Payment gateway | **Skipped for v1** — quote-request only, no online payment |
| 5 | Staff roles | **Single Admin role only** — no multi-role system (Editor/Sales roles from `admin-panel.md` Section 2.1 are dropped for now) |
| 6 | Quote notification email | Company **domain email** (exact address TBD — e.g. `sales@tasneemknitindustry.com`; confirm exact inbox with client) |
| 7 | Hosting | **Existing Hostinger plan** — no VPS/separate hosting change; Medusa backend and Next.js frontend both run within the current plan's resources (per `TRD.md` Section 2, monitor RAM/CPU as noted there) |
| 8 | DNS | No change — stays on current Cloudflare nameservers |
| 9 | Privacy Policy / Terms content | No specific data-retention or third-party-sharing points provided — **start from a standard B2B template**, scoped to what this site actually collects (quote-request form data, customer account data) rather than generic boilerplate unrelated to the actual data flows |

## 6. Still Genuinely Open (not answered, not guessed)

- Exact quote-notification inbox address (domain confirmed, exact address not given)
- Year established
- Confirmation on the registered-address vs. operating-address display question (Section 4)

---

## 7. Instruction to the Agent

> Lock in the following as final, non-placeholder content: business identity
> (Industrial Machinery Importer & Supplier — rewrite any remaining
> manufacturer-framed copy), contact info and address from Sections 2–3,
> and the registration/compliance numbers in Section 4 (displayed on a
> legal/company-info section, with the Ashulia/Savar registered address kept
> separate from the Fatullah operating address per Section 4's flag — do not
> merge them). Apply the locked technical decisions in Section 5: single Admin
> role only (remove Editor/Sales role scaffolding), blog live at launch, no
> payment gateway, quote notifications routed to a domain email (use a
> placeholder like `sales@tasneemknitindustry.com` until the exact inbox is
> confirmed), same Hostinger plan and Cloudflare DNS as today, and **Bangla as
> the default/un-prefixed locale** with English under `/en`. Leave Section 6's
> open items as "Contact for details" / TODO rather than guessing.
