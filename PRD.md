# Product Requirements Document (PRD)
**Project:** Tasneem Knit Industry — Website Rebuild
**Domain:** tasneemknitindustry.com
**Version:** 1.0
**Status:** Draft — pending owner verification (see Section 9)

---

## 1. Overview

Tasneem Knit Industry needs a full rebuild of its existing WordPress/WooCommerce site.
The current site has content and business-identity inconsistencies (see Section 2) that
must not be carried over 1:1. This PRD defines what the new site must contain and do.

## 2. Business Positioning (working assumption)

Two conflicting identities exist on the current site:

- Homepage → Industrial knitting machinery importer/supplier
- About page → Knitwear manufacturer/exporter

**Working assumption for this build:** Tasneem Knit Industry is primarily an
**industrial knitting machinery supplier/importer**, based on:
- Homepage copy on the current site
- Google Business Profile self-description found via search: *"Circular Knitting
  Machine Supplier, China Import"*

This must still be confirmed by the owner before final copy is locked (Section 9).
Design and structure should not make this hard to correct later.

## 3. Goals

- Resolve the business-identity conflict with one consistent message across the site
- Present machines with accurate, structured specifications (not fabric-style copy)
- Give B2B buyers a clear path: browse machines → request a quote → get contacted
- Read as industrial / professional / trustworthy, not like a generic WooCommerce store
- Fix technical SEO and preserve existing search equity via 301 redirects

## 4. Target Users

- Bangladeshi textile/garment mill owners and procurement staff sourcing knitting machinery
- Repeat B2B buyers who already know Tasneem and want specs/pricing fast
- Mobile-first: WhatsApp and phone are primary contact channels in this market

## 5. Sitemap

```
/
├── About
├── Machines
│   ├── All Machines
│   ├── Double Jersey
│   ├── Single Jersey
│   ├── Interlock
│   ├── Jacquard
│   ├── Terry
│   └── Finishing
├── Services
│   ├── Machine Sourcing
│   ├── Pre-Shipment Inspection
│   ├── CFR Chattogram
│   ├── Installation
│   ├── Commissioning
│   ├── Training
│   └── Spare Parts / After-Sales
├── How It Works
├── Industries / Applications
├── Projects / Installations
├── Resources
├── FAQ
├── Request a Quote
└── Contact
```

## 6. Page Requirements

### 6.1 Homepage
1. Header (sticky)
2. Hero — headline, supporting copy, primary CTA ("Request a Quote"), secondary CTA (WhatsApp)
3. Trust/registration strip (BIN, IRC — pending verification)
4. Machine categories (grid, linking to category pages)
5. Featured machines (cards: name, brand, key specs, "Request Quote")
6. Why Tasneem (4-point: Direct Importer / 3rd-Party Inspection / CFR Chattogram / Install & After-Sales)
7. Industries/applications served
8. Sourcing process (Enquiry → Spec → Quote)
9. Inspection + shipping (SGS/ITS/BV, CFR Chattogram)
10. Installation + after-sales
11. Projects / installation gallery (real photos only — placeholder until assets received)
12. Brands/manufacturers represented (only if confirmed)
13. Quote CTA banner
14. FAQ (accordion)
15. Contact block
16. Footer

### 6.2 Machine Category Pages
List of machines in category, filterable by gauge/cylinder/feeders if data supports it.

### 6.3 Machine Detail Page
Structured fields only (no fabric-style marketing copy unless it is a fabric product):
```
Machine Name, Brand, Manufacturer, Machine Type, Category,
Cylinder Diameter, Gauge, Feeders, Number of Systems, Machine Speed,
Fabric Type, Production Capacity, Application, Power Requirement,
Dimensions, Weight, Origin, Warranty, Availability, Price,
Description, Features, Images
```
Every field renders "Contact for details" (not a blank/fake value) until confirmed.
CTA: **Request a Quote** (pre-fills machine name).

### 6.4 Request a Quote (form)
Fields:
```
Name, Company, Phone/WhatsApp, Email, Machine Type, Gauge,
Cylinder Diameter, Feeder Count, Production Target, Quantity,
Preferred Brand, Delivery Requirement, Message
```

### 6.5 About, Services, How It Works, Industries, Projects, Resources, FAQ, Contact
Standard content pages per sitemap; content sourced from confirmed facts only.

## 7. What to Remove from the Old Site

- Customer login / create account / lost password
- Wishlist, product reviews, compare (unless owner specifically wants B2B compare)
- Generic WooCommerce checkout flow (this is quote-based B2B, not cart checkout)
- All unrelated demo/blog content (furniture, coffee, interior design posts)
- Template/lorem placeholder text on product pages

## 8. E-commerce Model Clarification

This is **not** consumer checkout e-commerce. "E-commerce facility" here means:
- Structured product catalog with specs and pricing display
- Quote-request flow feeding into sales team (WhatsApp/phone/email)
- Optional: online payment for deposit/spare-parts orders — to be confirmed with owner
  before building a full cart+checkout flow

## 9. Owner Verification Checklist (must confirm before launch)

**Company:** legal name, business model (machinery/fabric/garments/multiple), year
established, founder/MD, team, office/factory locations, years of experience

**Machines:** exact brands, models, manufacturer, country of origin, specs, current
prices, stock/availability, lead time, warranty, installation terms

**Commercial:** L/C terms, payment terms, CFR terms, freight/insurance, partial
shipment, import process, quote turnaround

**Services:** installation, commissioning, training, spare parts, maintenance, repair,
technical support

**Compliance:** BIN, IRC, trade license, VAT, certifications, inspection partners,
manufacturer authorization

**Contact:** official email, phone, WhatsApp, address, Google Maps location, business
hours, social links — note: phone/address found via Google (01884-611888, Narayanganj-1421,
contact Mr Hasan) differ from the numbers on the current site (01887683333 /
WhatsApp 01711110516) and must be reconciled with the owner

## 10. SEO Requirements

Primary keyword themes: knitting machine Bangladesh, circular knitting machine
Bangladesh, industrial knitting machine Bangladesh, interlock/double jersey/jacquard/
terry knitting machine Bangladesh, textile machinery Bangladesh, knitting machine
price Bangladesh.

Technical: clean URLs, unique titles/meta descriptions, one H1/page, correct H2/H3
hierarchy, Product/Organization/LocalBusiness/Breadcrumb/FAQ schema, Open Graph,
canonical URLs, XML sitemap, robots.txt, image alt text, WebP/AVIF, lazy loading,
Core Web Vitals, internal linking, 301 redirects from all known old URLs.

## 11. Non-Goals (for this version)

- Multi-language site (Bangla/English toggle) — not requested yet, revisit later
- Customer accounts / order history
- Public pricing without quote-gate, unless owner explicitly wants list pricing shown
