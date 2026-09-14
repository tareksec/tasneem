# Tasneem Knitting Industry

Marketing + Admin Portal for **Tasneem Knitting Industry** (Industrial Circular Knitting, Dyeing, Shearing & Textile Machinery Importer in Bangladesh).

Built with **Next.js 16 (App Router, React 19, TypeScript)** and designed to run with **zero extra cost** on **Hostinger Node.js Web/Cloud Hosting** using built-in MySQL, Prisma ORM, NextAuth JWT authentication, and local filesystem media uploads.

---

## 🛠️ Tech Stack Decisions

- **Framework:** Next.js 16 (App Router, Server Components & Route Handlers)
- **Database:** Hostinger Built-in MySQL (`provider = "mysql"`)
- **ORM:** Prisma v6
- **Auth:** NextAuth.js (Auth.js) with Credentials provider & JWT session strategy
- **Password Hashing:** `bcryptjs`
- **File & Media Storage:** Filesystem storage (`/public/uploads`), served directly as static assets
- **Styling:** Tailwind CSS v4 + Vanilla CSS Design System

---

## 🚀 Quick Local Development

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

4. Push schema to your local or staging MySQL database:
   ```bash
   npx prisma db push
   ```

5. Seed existing machine catalog and default admin user:
   ```bash
   npm run db:seed
   ```

6. Run the local dev server:
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) for the public site, and [http://localhost:3000/admin/login](http://localhost:3000/admin/login) for the admin portal.

---

## 🌐 Hostinger Production Deployment Guide

For full instructions on setting up MySQL, configuring Environment Variables in hPanel, running migrations, and seeding data on Hostinger shared/cloud hosting, read:

👉 **[HOSTINGER_SETUP.md](./HOSTINGER_SETUP.md)**

### Default Admin Credentials (Post-Seed)
- **Email:** `admin@tasneem.com`
- **Password:** `TasneemAdmin2026!Secure` (configured in `.env`)
