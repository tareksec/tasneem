import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { MACHINES } from "@/lib/machines-data";

export const dynamic = "force-dynamic";

async function handleSetup(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secretParam = searchParams.get("secret");

    const validSecret = process.env.SETUP_SECRET || process.env.NEXTAUTH_SECRET;

    if (!validSecret) {
      return NextResponse.json(
        {
          success: false,
          error: "SETUP_SECRET (or NEXTAUTH_SECRET) is not configured in environment variables.",
        },
        { status: 500 }
      );
    }

    if (!secretParam || secretParam !== validSecret) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized: Invalid or missing 'secret' query parameter. (e.g. /api/setup-db?secret=YOUR_SECRET)",
        },
        { status: 401 }
      );
    }

    // 1. Idempotency Check: check if admin and machines already exist
    const adminCount = await prisma.admin.count();
    const machineCount = await prisma.machine.count();
    const blogCount = await prisma.blogPost.count();

    if (adminCount > 0 && machineCount > 0) {
      return NextResponse.json({
        success: true,
        message: "Database already initialized and seeded. No actions were performed.",
        alreadySeeded: true,
        stats: {
          admins: adminCount,
          machines: machineCount,
          blogPosts: blogCount,
        },
      });
    }

    const seededStats = {
      adminCreated: false,
      adminEmail: "",
      machinesSeeded: 0,
      blogPostsSeeded: 0,
    };

    // 2. Seed Admin if none exists
    const primaryAdminEmail = (process.env.ADMIN_EMAIL || "admin@admin.com").trim().toLowerCase();
    const rawPassword = process.env.ADMIN_PASSWORD || "TasneemAdmin2026!Secure";
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    const adminName = process.env.ADMIN_NAME || "Tasneem Admin Staff";

    const emailsToSeed = Array.from(new Set([primaryAdminEmail, "admin@admin.com", "admin@tasneem.com"]));
    for (const email of emailsToSeed) {
      await prisma.admin.upsert({
        where: { email },
        update: { password: hashedPassword },
        create: {
          email,
          password: hashedPassword,
          name: adminName,
          role: "Super Admin",
        },
      });
    }
    seededStats.adminCreated = true;
    seededStats.adminEmail = primaryAdminEmail;

    // 3. Seed Machines from lib/machines-data.ts
    for (const m of MACHINES) {
      await prisma.machine.upsert({
        where: { id: m.id },
        update: {},
        create: {
          id: m.id,
          name: m.name,
          name_bn: m.name_bn || null,
          brand: m.brand,
          manufacturer: m.manufacturer,
          machineType: m.machineType,
          category: m.category,
          mainCategory: m.mainCategory || null,
          subCategory: m.subCategory || null,
          cylinderDiameter: m.cylinderDiameter || null,
          gauge: m.gauge || null,
          feeders: m.feeders || null,
          numberOfSystems: m.numberOfSystems || null,
          machineSpeed: m.machineSpeed || null,
          fabricType: m.fabricType || null,
          fabricType_bn: m.fabricType_bn || null,
          productionCapacity: m.productionCapacity || null,
          application: m.application || [],
          application_bn: m.application_bn || [],
          powerRequirement: m.powerRequirement || null,
          dimensions: m.dimensions || null,
          weight: m.weight || null,
          origin: m.origin,
          warranty: m.warranty || null,
          availability: m.availability || "contact-for-availability",
          price: m.price || null,
          description: m.description,
          description_bn: m.description_bn || null,
          features: m.features || [],
          features_bn: m.features_bn || [],
          images: m.images || [],
          galleryImages: (m.galleryImages as any) || [],
          status: m.status || "published",
          seoTitle_en: m.seoTitle_en || null,
          seoTitle_bn: m.seoTitle_bn || null,
          seoDesc_en: m.seoDesc_en || null,
          seoDesc_bn: m.seoDesc_bn || null,
          ogImage: m.ogImage || null,
        },
      });
      seededStats.machinesSeeded++;
    }

    // 4. Seed Initial Blog Posts
    const initialPosts = [
      {
        title_en: "Circular Knitting Machine Gauge (G) & Cylinder Selection Guide for Bangladesh Mills",
        title_bn: "নিটিং মিলের জন্য সার্কুলার নিটিং Gauge (G) ও Cylinder সিলেকশন গাইড",
        slug_en: "circular-knitting-gauge-cylinder-selection-guide",
        slug_bn: "circular-knitting-gauge-cylinder-selection-guide-bn",
        cover_image: "/product-image/product-1.jpg",
        excerpt_en:
          "A practical engineering guide for factory managers determining optimal gauge (18G to 36G) and cylinder diameter based on yarn count and finished fabric open width.",
        excerpt_bn:
          "সুতার কাউন্ট আর কাঙ্ক্ষিত কাপড়ের বহর অনুযায়ী ১৮G থেকে ৩৬G Gauge এবং Cylinder সাইজ বেছে নেওয়ার প্র্যাকটিক্যাল গাইড।",
        body_en: `## Technical Considerations for Gauge Selection\n\nSelecting the correct gauge ($G$) is the most critical decision when configuring a new circular knitting machine for export knitwear production. In Bangladesh's composite mills, standard single jersey and interlock lines typically run between 24G and 28G for standard 160–200 GSM cotton fabric.\n\n### Key Parameter Matching Table\n- **20G – 24G**: Heavy single jersey, fleece foundation, Ne 20s – 26s carded/combed yarn.\n- **28G**: Export-standard T-shirts, polo pique, Ne 28s – 34s combed cotton.\n- **32G – 36G**: Ultra-fine synthetic blends, high-density modal, and Lycra sportswear.\n\n### Sourcing Checklist\n1. Verify cam box metallurgy (minimum HRC 58-62 hardness).\n2. Inspect positive yarn feeder timing gears.\n3. Require 3rd-party pre-shipment inspection before CFR Chattogram container stuffing.`,
        body_bn: `## Gauge (G) নির্বাচনের জরুরি দিকসমূহ\n\nরপ্তানিমুখী নিট কারখানার জন্য নতুন সার্কুলার নিটিং মেশিন নেওয়ার ক্ষেত্রে সবচেয়ে গুরুত্বপূর্ণ সিদ্ধান্ত হলো সঠিক Gauge বেছে নেওয়া। বাংলাদেশের কম্পোজিট মিলগুলোতে ১৬০-২০০ GSM-এর Single Jersey এবং Interlock তৈরির জন্য সাধারণত ২৪G ও ২৮G মেশিনই সবচেয়ে বেশি চলে।\n\n### সুতার কাউন্ট ও Gauge ম্যাচিং\n- **২০G – ২৪G**: ভারী Single Jersey ও Fleece কাপড় (Ne 20s – 26s সুতা)।\n- **২৮G**: স্ট্যান্ডার্ড এক্সপোর্ট কোয়ালিটির টি-শার্ট ও পোলো পিক (Ne 28s – 34s Combed কটন)।\n- **৩২G – ৩৬G**: অত্যন্ত মিহি সিন্থেটিক ও Lycra স্পোর্টসওয়্যার ফ্যাব্রিক।`,
        category: "Technical Sourcing",
        tags: ["Machinery Sourcing", "Gauge Calculation", "Export Knitwear"],
        seo_title_en: "Circular Knitting Machine Gauge Guide | Tasneem Knit Industry",
        seo_title_bn: "সার্কুলার নিটিং Gauge নির্বাচন গাইড | তাসনীম নিট ইন্ডাস্ট্রি",
        seo_desc_en: "Learn how to select cylinder diameter and gauge for Bangladesh circular knitting mills.",
        seo_desc_bn: "নিটিং মিলের জন্য সার্কুলার নিটিং Cylinder ও Gauge নির্বাচনের প্র্যাকটিক্যাল পরামর্শ।",
        status: "published",
        published_at: "2026-03-01",
        author: "Engr. M. Rahman",
      },
      {
        title_en: "Pre-Shipment Inspection (SGS / ITS / BV) Protocol for Overseas Machinery Imports",
        title_bn: "মেশিন আমদানিতে থার্ড-পার্টি প্রি-শিপমেন্ট ইন্সপেকশন (SGS / Intertek / BV) গাইড",
        slug_en: "pre-shipment-inspection-protocol-overseas-machinery",
        slug_bn: "pre-shipment-inspection-protocol-overseas-machinery-bn",
        cover_image: "/product-image/product-2.jpg",
        excerpt_en:
          "Standard operating procedure for factory managers to mandate pre-shipment verification before CFR Chattogram container stuffing.",
        excerpt_bn:
          "জাহাজে কনটেইনার তোলার আগে মেশিন ঠিকঠাক আছে কিনা তা আন্তর্জাতিক ইন্সপেকশন এজেন্সি দিয়ে যাচাই করার নিয়মাবলী।",
        body_en: `## Why Pre-Shipment Inspection Matters\n\nImporting circular knitting and dyeing equipment involves capital investment. Pre-shipment inspection (PSI) by third-party agencies guarantees that machinery matches contracted technical specifications.\n\n### Crucial Inspection Points:\n- Dial and cylinder concentricity and runout tolerance.\n- Inverter drives, servomotors, and circuit boards.\n- Anti-corrosion seaworthy grease coating before vacuum shrink-wrapping.`,
        body_bn: `## প্রি-শিপমেন্ট ইন্সপেকশনের প্রয়োজনীয়তা\n\nনতুন মেশিন আমদানিতে কোটি টাকার বিনিয়োগ থাকে। কনটেইনারে তোলার আগে থার্ড-পার্টি আন্তর্জাতিক ইন্সপেকশন এজেন্সি দিয়ে স্পেসিফিকেশন ও মেকানিক্যাল অংশ পরীক্ষা করে নিলে ঝুঁকিমুক্ত থাকা যায়।`,
        category: "Quality Assurance",
        tags: ["Import Compliance", "Pre-Shipment Inspection", "PSI"],
        seo_title_en: "Pre-Shipment Inspection Protocol | Tasneem Knit Industry",
        seo_title_bn: "প্রি-শিপমেন্ট ইন্সপেকশন গাইড | তাসনীম নিট ইন্ডাস্ট্রি",
        seo_desc_en: "Step-by-step guide on third-party machinery inspection prior to ocean freight to Bangladesh.",
        seo_desc_bn: "মেশিন আমদানির পূর্বে থার্ড-পার্টি ইন্সপেকশন কেন জরুরি।",
        status: "published",
        published_at: "2026-03-05",
        author: "Tasneem Sourcing Team",
      },
    ];

    for (const post of initialPosts) {
      await prisma.blogPost.upsert({
        where: { slug_en: post.slug_en },
        update: {},
        create: {
          title_en: post.title_en,
          title_bn: post.title_bn,
          slug_en: post.slug_en,
          slug_bn: post.slug_bn,
          cover_image: post.cover_image,
          excerpt_en: post.excerpt_en,
          excerpt_bn: post.excerpt_bn,
          body_en: post.body_en,
          body_bn: post.body_bn,
          category: post.category,
          tags: post.tags,
          seo_title_en: post.seo_title_en,
          seo_title_bn: post.seo_title_bn,
          seo_desc_en: post.seo_desc_en,
          seo_desc_bn: post.seo_desc_bn,
          status: post.status,
          published_at: post.published_at,
          author: post.author,
        },
      });
      seededStats.blogPostsSeeded++;
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      alreadySeeded: false,
      seeded: seededStats,
    });
  } catch (error: any) {
    console.error("Database setup endpoint error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "An unexpected error occurred during database setup.",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  return handleSetup(request);
}

export async function POST(request: Request) {
  return handleSetup(request);
}
