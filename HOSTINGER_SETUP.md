# Hostinger Managed Node.js Hosting Setup Guide (No SSH Required)

> **Project:** Tasneem Knitting Industry (`tareksec/tasneem`)  
> **Environment:** Hostinger Managed Node.js Web/Cloud Hosting (No SSH/Terminal access, automatic build script deployment)  
> **Cost:** ৳০ / $0 (১০০% Hostinger অন্তর্ভুক্ত MySQL ও Filesystem দিয়ে পরিচালিত)

---

## কিভাবে কাজ করবে (Automated Workflow):

1. **Database Schema Sync:** ডিপ্লয় করার সময় Hostinger স্বয়ংক্রিয়ভাবে আপনার `package.json`-এর build script রান করবে:
   ```bash
   prisma generate && prisma db push && next build
   ```
   এটি Hostinger MySQL-এ নিজে থেকেই সব টেবিল (`Admin`, `Machine`, `BlogPost`, `Quote`, ইত্যাদি) তৈরি ও আপডেট করে নেবে। কোনো SSH কমান্ড চালানোর প্রয়োজন নেই!

2. **One-time Seeding:** ডিপ্লয় শেষ হলে ব্রাউজারে শুধু একবার সিক্রেট লিঙ্কটি ভিজিট করলেই প্রাথমিক অ্যাডমিন অ্যাকাউন্ট ও বিদ্যমান সব মেশিনের ডেটা ডাটাবেজে সিড হয়ে যাবে:
   ```
   https://tasneemknitindustry.com/api/setup-db?secret=YOUR_SETUP_SECRET
   ```

---

## ধাপ ১: Hostinger hPanel-এ MySQL ডেটাবেজ তৈরি

1. Hostinger **hPanel**-এ লগইন করুন।
2. মেনু থেকে **Databases** -> **MySQL Databases**-এ যান।
3. **Create a New MySQL Database And Database User**:
   - **Database name:** যেমন `tasneem_db` (পুরো নাম হবে: `u123456789_tasneem_db`)
   - **Username:** যেমন `tasneem_admin` (পুরো নাম হবে: `u123456789_tasneem_admin`)
   - **Password:** একটি শক্তিশালী পাসওয়ার্ড দিন (যেমন: `TasneemSecure2026!#`)
4. **Create** বাটনে ক্লিক করুন।
5. ক্রেডেনশিয়ালগুলো নোট করুন (Host সাধারণত `localhost` বা `127.0.0.1`, Port `3306`)।

---

## ধাপ ২: Hostinger Node.js Dashboard-এ Environment Variables বসানো

1. hPanel-এ **Websites** -> আপনার ডোমেইনের পাশে **Manage**-এ যান।
2. **Node.js** ট্যাবে ক্লিক করুন।
3. নিচে স্ক্রল করে **Environment Variables** সেকশনে যান।
4. একে একে নিচের ভেরিয়েবলগুলো যুক্ত করুন:

| Variable Name | Value / Description |
|---|---|
| `DATABASE_URL` | `mysql://u123456789_tasneem_admin:আপনার_পাসওয়ার্ড@localhost:3306/u123456789_tasneem_db` |
| `NEXTAUTH_URL` | `https://tasneemknitindustry.com` (আপনার লাইভ ডোমেইন) |
| `NEXTAUTH_SECRET` | যেকোনো শক্তিশালী ৩২+ অক্ষরের সিক্রেট টেক্সট |
| `SETUP_SECRET` | ডেটাবেজ সিড করার সিক্রেট কি (যেমন: `TasneemSetup2026!Key`) |
| `ADMIN_EMAIL` | `admin@tasneem.com` |
| `ADMIN_PASSWORD` | `TasneemAdmin2026!Secure` |
| `NODE_ENV` | `production` |

5. **Save** বাটনে ক্লিক করুন।

---

## ধাপ ৩: Deploy / Build triggering

- Hostinger Git / Deployment ট্যাবে গিয়ে **Deploy** বাটনে ক্লিক করুন (অথবা গিট রিপোজিটরিতে কোড পুশ করলে যদি অটো-ডিপ্লয় চালু থাকে, তবে এটি নিজে থেকেই শুরু হবে)।
- Hostinger যখন `npm run build` চালাবে, তখন স্বয়ংক্রিয়ভাবে `prisma generate` এবং `prisma db push` সম্পন্ন হয়ে ডাটাবেজে টেবিলগুলো তৈরি হয়ে যাবে।

---

## ধাপ ৪: এক ক্লিকে ব্রাউজার থেকে সিডিং সম্পন্ন করা (One-Time Setup)

অ্যাপ্লিকেশন ডিপ্লয় সফল হলে ব্রাউজারে একটি নতুন ট্যাব খুলুন এবং এই URL-টি ভিজিট করুন:

```
https://tasneemknitindustry.com/api/setup-db?secret=আপনার_SETUP_SECRET
```
*(উদাহরণ: `https://tasneemknitindustry.com/api/setup-db?secret=TasneemSetup2026!Key`)*

### সফল হলে ব্রাউজারে নিচের মতো JSON দেখতে পাবেন:
```json
{
  "success": true,
  "message": "Database seeded successfully",
  "alreadySeeded": false,
  "seeded": {
    "adminCreated": true,
    "adminEmail": "admin@tasneem.com",
    "machinesSeeded": 13,
    "blogPostsSeeded": 2
  }
}
```

> [!NOTE]
> এটি **ইডেমপোটেন্ট (idempotent)** — অর্থাৎ একবার সিড হওয়ার পর ভুলবশত কেউ আবার এই লিঙ্কে ঢুকলেও কোনো ডেটা ডুপ্লিকেট হবে না, এটি নিরাপদে জানাবে `"alreadySeeded": true`।

---

## ধাপ ৫: অ্যাডমিন পোর্টালে লগইন

এখন ব্রাউজারে যান:
- **Login URL:** `https://tasneemknitindustry.com/admin/login`
- **Email:** `admin@tasneem.com` (বা `.env`-এ যা দিয়েছেন)
- **Password:** `TasneemAdmin2026!Secure` (বা `.env`-এ যা দিয়েছেন)

লগইন করার পর আপনি সরাসরি মেশিনের তালিকা, কোটেশন রিকোয়েস্ট এবং ব্লগ পোস্ট দেখতে ও ম্যানেজ করতে পারবেন।
