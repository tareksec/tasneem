# Technical Requirements Document (TRD)
**Project:** Tasneem Knit Industry — Website Rebuild
**Version:** 1.0

---

## 1. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Frontend framework | **Next.js (App Router)** | SSR/ISR for fast, SEO-friendly product pages |
| Styling | **Tailwind CSS** | utility-first, matches design.md tokens |
| UI components | **shadcn/ui** | accessible primitives, customized per design.md |
| Icons | **Lucide React** | matches design spec |
| Animation | **Framer Motion** | scroll reveal, hover/interaction states |
| E-commerce backend | **Medusa.js** (self-hosted) | catalog, quote/order objects — not full consumer checkout |
| Database | **PostgreSQL** (via Medusa) | |
| Package manager | **pnpm** | faster installs, lower inode usage — relevant given host's 600,000 inode cap |
| Hosting | **Hostinger** (existing plan) | Node.js 18–24 supported; see Section 2 |
| Forms | Server-side validation (Next.js API routes / server actions) | |
| Email | Transactional email provider (e.g. Resend/SMTP) for quote-request notifications | to be selected |
| Analytics | Google Analytics | |
| Search visibility | Google Search Console | |
| Images | Next.js `<Image>` + WebP/AVIF, CDN if available | |

## 2. Hosting Environment (current plan)

```
Disk Space: 200 GB
RAM: 3072 MB
CPU Cores: 2
Inodes: 600,000
Addons/Websites: 100
Max Processes: 120
PHP Workers: 60
Bandwidth: Unlimited
Server location: Asia (India)
Backup location: Singapore
Supported Node.js versions: 24.x, 22.x, 20.x, 18.x
Supported package managers: npm (default), yarn, pnpm
FTP upload path: public_html
Nameservers (current): Cloudflare (logan.ns.cloudflare.com, veronica.ns.cloudflare.com)
```

**Notes:**
- 3GB RAM + 2 CPU cores is enough for a Next.js app + Medusa if Medusa runs lean;
  monitor memory under load, consider a managed Postgres/Medusa Cloud if the VPS
  becomes a bottleneck.
- PHP Workers (60) are irrelevant to this stack — confirm with Hostinger that the
  Node.js app runner doesn't share/compete with the PHP worker pool.
- DNS is currently on Cloudflare, not Hostinger's default nameservers — deployment
  plan must account for this (Cloudflare proxy on/off, SSL mode, caching rules).

## 3. Architecture

```
Next.js App (frontend + API routes)
   │
   ├── Static/ISR pages: Home, About, Services, How It Works, Industries, FAQ
   ├── Dynamic pages: Machine category, Machine detail (from Medusa catalog)
   ├── Quote form → API route → stores in DB + sends notification email/WhatsApp link
   │
Medusa.js (backend)
   ├── Product catalog (machines as products, custom fields for specs)
   ├── Categories (Double Jersey, Single Jersey, Interlock, Jacquard, Terry, Finishing)
   └── Admin panel for the client's team to manage machines/prices
   │
PostgreSQL (Medusa data)
```

## 4. Data Model — Machine (Product)

```ts
Machine {
  id: string
  name: string
  brand: string
  manufacturer: string
  machineType: string
  category: "double-jersey" | "single-jersey" | "interlock" | "jacquard" | "terry" | "finishing"
  cylinderDiameter: string   // e.g. 34"
  gauge: string              // e.g. 24G / 28G
  feeders: number
  numberOfSystems?: number
  machineSpeed?: string
  fabricType?: string
  productionCapacity?: string
  application: string[]
  powerRequirement?: string
  dimensions?: string
  weight?: string
  origin: string
  warranty?: string
  availability: "in-stock" | "made-to-order" | "contact-for-availability"
  price?: number             // omit/hide if not confirmed by owner
  description: string
  features: string[]
  images: string[]
}
```

Only populate fields with owner-confirmed data. Unconfirmed fields render
"Contact for details" rather than being guessed or left blank/fake.

## 5. Quote Request Flow

```
1. Buyer submits Request-a-Quote form (machine pre-filled if coming from detail page)
2. API route validates + stores request
3. Notification sent to Tasneem sales (email + optional WhatsApp deep link)
4. Buyer sees confirmation with expected response time
```

## 6. Deployment

1. Build Next.js app (`pnpm build`)
2. Deploy Node.js app via Hostinger's Node.js app hosting (Web App section of the plan)
3. Deploy Medusa backend as a separate Node.js process/app on the same or a dedicated
   instance — confirm whether Hostinger plan supports running two Node processes
   concurrently under the 120 max-process / 60 PHP-worker limits, or whether Medusa
   should be hosted separately (e.g. small VPS/managed service) with the frontend
   pointing to it via API
4. Point DNS (currently Cloudflare) to the new app; keep Cloudflare proxy for
   CDN/SSL if desired
5. Set up 301 redirects for all known old URLs (see PRD Section 5 / old URL list)
6. Submit sitemap to Google Search Console post-launch

## 7. Old URLs to Redirect

```
/product/jiunn-long-double-jersey/   → new machine detail URL
/product/longjun/                    → new machine detail URL
/product/rongxiang-single-jersey/    → new machine detail URL
/product/shanli-double-jersey/       → new machine detail URL
/product/wjm-double-jersey/          → new machine detail URL
/product/xiangying-double-jersey/    → new machine detail URL
/about-us-3/                         → /about
/contact-us/                         → /contact
```

## 8. Performance & SEO Technical Checklist

```
[ ] Core Web Vitals pass (LCP, CLS, INP)
[ ] Image optimization (WebP/AVIF, responsive sizes, lazy loading)
[ ] Structured data: Organization, LocalBusiness, Product, Breadcrumb, FAQ schema
[ ] robots.txt + XML sitemap
[ ] Canonical URLs on all pages
[ ] Unique title + meta description per page
[ ] Mobile responsiveness tested (this market is mobile/WhatsApp-first)
[ ] Form validation tested (client + server side)
[ ] WhatsApp deep links tested on mobile
```

## 9. Open Technical Questions

- Where will Medusa + Postgres actually run given the shared-hosting resource caps?
- Is a CMS needed for non-technical staff to edit machine listings (Medusa admin may
  be sufficient) or does the client want something simpler?
- Payment gateway needed at all in v1, or is quote-only sufficient for launch?
