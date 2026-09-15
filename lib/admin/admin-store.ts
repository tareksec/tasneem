import {
  BlogPost,
  WhyTasneemPillar,
  AdminFaqItem,
  AdminCompanyInfo,
  AdminIndustryItem,
  ActivityLog,
} from "./types";
import {
  Machine,
  MachineCategory,
  QuoteRecord,
  CustomerUser,
  RedirectRule,
  QuoteStatus,
  GalleryItem,
  Review,
  ReviewStatus,
} from "@/lib/types";
import { COMPANY_INFO } from "@/lib/constants";
import { FAQ_ITEMS } from "@/lib/faq-data";
import { MACHINES } from "@/lib/machines-data";

const STORAGE_KEY_BLOG = "tasneem_admin_blog_posts";
const STORAGE_KEY_WHY_TASNEEM = "tasneem_admin_why_tasneem";
const STORAGE_KEY_FAQ = "tasneem_admin_faq";
const STORAGE_KEY_COMPANY = "tasneem_admin_company_info";
const STORAGE_KEY_INDUSTRIES = "tasneem_admin_industries";
const STORAGE_KEY_ACTIVITY = "tasneem_admin_activity_log";
const STORAGE_KEY_MACHINES = "tasneem_admin_machines";
const STORAGE_KEY_QUOTES = "tasneem_admin_quotes";
const STORAGE_KEY_CUSTOMERS = "tasneem_admin_customers";
const STORAGE_KEY_REDIRECTS = "tasneem_admin_redirects";
const STORAGE_KEY_GALLERY = "tasneem_admin_gallery_items";
const STORAGE_KEY_REVIEWS = "tasneem_admin_reviews";


// Initial Seed Data for Blog Posts
const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: "post-1",
    title_en: "Circular Knitting Machine Gauge (G) & Cylinder Selection Guide for Bangladesh Mills",
    title_bn: "নিটিং মিলের জন্য সার্কুলার নিটিং Gauge (G) ও Cylinder সিলেকশন গাইড",
    slug_en: "circular-knitting-gauge-cylinder-selection-guide",
    slug_bn: "circular-knitting-gauge-cylinder-selection-guide-bn",
    cover_image: "/images/machines/cat-double-jersey.jpg",
    excerpt_en:
      "A practical engineering guide for factory managers determining optimal gauge (18G to 36G) and cylinder diameter based on yarn count and finished fabric open width.",
    excerpt_bn:
      "সুতার কাউন্ট আর কাঙ্ক্ষিত কাপড়ের বহর অনুযায়ী ১৮G থেকে ৩৬G Gauge এবং Cylinder সাইজ বেছে নেওয়ার প্র্যাকটিক্যাল গাইড।",
    body_en: `## Technical Considerations for Gauge Selection

Selecting the correct gauge ($G$) is the most critical decision when configuring a new circular knitting machine for export knitwear production. In Bangladesh's composite mills, standard single jersey and interlock lines typically run between 24G and 28G for standard 160–200 GSM cotton fabric.

### Key Parameter Matching Table
- **20G – 24G**: Heavy single jersey, fleece foundation, Ne 20s – 26s carded/combed yarn.
- **28G**: Export-standard T-shirts, polo pique, Ne 28s – 34s combed cotton.
- **32G – 36G**: Ultra-fine synthetic blends, high-density modal, and Lycra sportswear.

### Calculating Finished Fabric Open Width
Theoretical tube width is determined by:
\`\`\`
Total Needles = π × Cylinder Diameter (inches) × Gauge
Tube Circumference = Total Needles / Wales per Inch (WPI)
\`\`\`
Always account for 25% to 35% gray fabric relaxation shrinkage prior to stenter heat-setting.

### Sourcing Checklist
1. Verify cam box metallurgy (minimum HRC 58-62 hardness).
2. Inspect positive yarn feeder timing gears.
3. Require 3rd-party pre-shipment inspection before CFR Chattogram container stuffing.`,
    body_bn: `## Gauge (G) নির্বাচনের জরুরি দিকসমূহ

রপ্তানিমুখী নিট কারখানার জন্য নতুন সার্কুলার নিটিং মেশিন নেওয়ার ক্ষেত্রে সবচেয়ে গুরুত্বপূর্ণ সিদ্ধান্ত হলো সঠিক Gauge বেছে নেওয়া। বাংলাদেশের কম্পোজিট মিলগুলোতে ১৬০-২০০ GSM-এর Single Jersey এবং Interlock তৈরির জন্য সাধারণত ২৪G ও ২৮G মেশিনই সবচেয়ে বেশি চলে।

### সুতার কাউন্ট ও Gauge ম্যাচিং
- **২০G – ২৪G**: ভারী Single Jersey ও Fleece কাপড় (Ne 20s – 26s সুতা)।
- **২৮G**: স্ট্যান্ডার্ড এক্সপোর্ট কোয়ালিটির টি-শার্ট ও পোলো পিক (Ne 28s – 34s Combed কটন)।
- **৩২G – ৩৬G**: অত্যন্ত মিহি সিন্থেটিক ও Lycra স্পোর্টসওয়্যার ফ্যাব্রিক।

### মেশিন আমদানির সময় জরুরি চেকলিস্ট
১. Cam box-এর মেটাল হার্ডনেস নিশ্চিত করুন (কমপক্ষে HRC 58-62)।
২. Positive Feeder টাইমিং গিয়ার পরীক্ষা করে নিন।
৩. চট্টগ্রাম বন্দরে কনটেইনার লোড হওয়ার আগে থার্ড-পার্টি প্রি-শিপমেন্ট ইন্সপেকশন রিপোর্ট যাচাই করুন।`,
    category: "Technical Sourcing",
    tags: ["Machinery Sourcing", "Gauge Calculation", "Export Knitwear"],
    seo_title_en: "Circular Knitting Machine Gauge Guide | Tasneem Knit Industry",
    seo_title_bn: "সার্কুলার নিটিং Gauge নির্বাচন গাইড | তাসনীম নিট ইন্ডাস্ট্রি",
    seo_desc_en:
      "Learn how to select cylinder diameter and gauge for Bangladesh circular knitting mills. Expert advice on yarn count matching and CFR procurement.",
    seo_desc_bn:
      "নিটিং মিলের জন্য সার্কুলার নিটিং Cylinder ও Gauge নির্বাচনের প্র্যাকটিক্যাল পরামর্শ।",
    status: "published",
    published_at: "2026-03-01",
    updated_at: "2026-03-10",
    author: "Engr. M. Rahman",
  },
  {
    id: "post-2",
    title_en: "Pre-Shipment Inspection (SGS / ITS / BV) for Overseas Machinery Imports",
    title_bn: "মেশিন আমদানিতে থার্ড-পার্টি প্রি-শিপমেন্ট ইন্সপেকশন (SGS / Intertek / BV) গাইড",
    slug_en: "pre-shipment-inspection-protocol-overseas-machinery",
    slug_bn: "pre-shipment-inspection-protocol-overseas-machinery-bn",
    cover_image: "/images/machines/cat-single-jersey.jpg",
    excerpt_en:
      "Why independent 3rd-party inspection before ocean stuffing protects Bangladeshi buyers from defective cylinder concentricity and sub-par cam metallurgy.",
    excerpt_bn:
      "কনটেইনারে তোলার আগে আন্তর্জাতিক ইন্সপেকশন এজেন্সির মাধ্যমে মেশিনের মেকানিক্যাল পার্টস যাচাই কেন মিল মালিকদের শতভাগ নিরাপদ রাখে।",
    body_en: `## Eliminating Procurement Risk in Overseas Machinery

When importing high-value circular knitting machinery on CFR Chattogram terms, opening an irrevocable Letter of Credit (L/C) without independent inspection leaves local mills vulnerable to mechanical discrepancies.

### Mandatory Pre-Shipment Audit Steps:
1. **Dial and Cylinder Concentricity**: Maximum allowable runout must not exceed 0.02 mm under dial gauge verification.
2. **Cam Box Heat Treatment**: Ultrasonic micro-hardness testing to guarantee longevity against abrasive polyester yarns.
3. **Continuous 4-Hour Trial Knitting**: Real-time inspection of sinker action, zero drop stitches, and uniform fabric tension under target operating RPM.
4. **Export Sea-Worthy Packaging**: Anti-corrosion vacuum foil sealing with desiccants to withstand high sea-humidity routes through Singapore and Chattogram outer anchorage.`,
    body_bn: `## মেশিনারি আমদানিতে ঝুঁকি এড়ানোর উপায়

বিদেশ থেকে CFR Chattogram ভিত্তিতে মেশিন আমদানির ক্ষেত্রে বিশ্বমানের ইন্সপেকশন এজেন্সির মাধ্যমে প্রি-শিপমেন্ট চেকিং সম্পন্ন করা বুদ্ধিমানের কাজ।

### প্রধান ইন্সপেকশন ধাপসমূহ:
১. **Cylinder ও Dial রানআউট পরীক্ষা**: রানআউট সীমা অবশ্যই ০.০২ মিলিমিটারের নিচে থাকতে হবে।
২. **Cam Box হার্ডনেস টেস্ট**: দীর্ঘস্থায়ী উৎপাদনের জন্য মেটাল টেস্ট নিশ্চিত করা।
৩. **৪ ঘণ্টার রানিং টেস্ট নিটিং**: কোনো ড্রপ স্টিচ ছাড়া নির্ধারিত RPM-এ কাপড় বোনার পরীক্ষা।
৪. **সমুদ্র উপযোগী প্যাকিং**: ভ্যাকুয়াম ফয়েল ও অ্যান্টি-রাস্ট সুরক্ষাসহ মজবুত প্যাকেজিং।`,
    category: "Quality Assurance",
    tags: ["Inspection", "PSI", "CFR Chattogram"],
    seo_title_en: "Pre-Shipment Inspection Protocol for Textile Machinery | Tasneem",
    seo_title_bn: "প্রি-শিপমেন্ট ইন্সপেকশন প্রটোকল | তাসনীম নিট ইন্ডাস্ট্রি",
    seo_desc_en:
      "How third-party pre-shipment inspections by SGS, Intertek, or BV safeguard Bangladesh textile machinery imports.",
    seo_desc_bn:
      "আমদানিকৃত মেশিনারির নিখুঁত মান যাচাইয়ে প্রি-শিপমেন্ট ইন্সপেকশনের গুরুত্ব।",
    status: "published",
    published_at: "2026-02-18",
    updated_at: "2026-02-25",
    author: "Quality Team",
  },
  {
    id: "post-3",
    title_en: "Preventive Maintenance Schedule for 24/7 Circular Knitting Floor Efficiency",
    title_bn: "২৪/৭ নিটিং মিল চালানোর জন্য প্রিভেন্টিভ মেইনটেন্যান্স রুটিন",
    slug_en: "preventive-maintenance-schedule-circular-knitting",
    slug_bn: "preventive-maintenance-schedule-circular-knitting-bn",
    cover_image: "/images/machines/cat-interlock.jpg",
    excerpt_en:
      "Standard operating procedures for shift-by-shift lint purging, positive feeder lubrication, and needle-breakage root cause tracking.",
    excerpt_bn:
      "প্রতি শিফটে লিন্ট পরিষ্কার, Positive Feeder-এ তেল দেওয়া এবং সুঁই ভাঙা রোধ করার সহজ ও কার্যকরী পদ্ধতি।",
    body_en: `## Minimizing Costly Downtime on Knitting Floors

Circular knitting machines running 24/7 in Narayanganj and Gazipur require strict preventive maintenance to maintain stitch uniformity and prevent oil staining on white raw fabric.

### Shift-by-Shift Checklist (Every 8 Hours):
- High-pressure compressed air blowing around needle tracks and yarn creel ceramic eyelets.
- Visual inspection of oil mist lubricator reservoir (ISO VG 22 or 32 specialized knitting oil).
- Verify yarn tensioner disk clearance to eliminate variable loop length.

### Weekly Maintenance (Every 168 Running Hours):
- Full cylinder groove flushing with specialized cleaning solvent.
- Sinker ring alignment check.
- Inverter fan filter cleaning to avoid electronic overheating in high ambient summer temperatures.`,
    body_bn: `## উৎপাদন সচল রাখা ও মেশিনের ডাউনটাইম কমানো

২৪ ঘণ্টা অবিরাম চলা নিটিং মেশিনে কাপড়ের মান একরকম রাখতে এবং তেলের দাগ প্রতিরোধে নিয়মিত মেইনটেন্যান্স খুবই দরকারি।

### প্রতি শিফটের চেকলিস্ট:
- Needle track ও সিরামিক আইলেট এয়ার দিয়ে পরিষ্কার করা।
- অটোমেটিক অয়েল প্রেশার ও তেলের মাত্রা চেক করা।
- সুতার টেনশন ডিস্ক নিয়মিত পরীক্ষা করা।`,
    category: "Maintenance",
    tags: ["Factory Operations", "Lubrication", "Needles"],
    seo_title_en: "Circular Knitting Maintenance Guide | Tasneem Knit Industry",
    seo_title_bn: "নিটিং মেশিন মেইনটেন্যান্স গাইডলাইন | তাসনীম নিট ইন্ডাস্ট্রি",
    seo_desc_en:
      "A complete guide to shift and weekly maintenance routines for circular knitting machines in Bangladesh.",
    seo_desc_bn:
      "সার্কুলার নিটিং মেশিনের দীর্ঘস্থায়ী কার্যক্ষমতা ধরে রাখতে নিয়মিত মেইনটেন্যান্সের নিয়মাবলী।",
    status: "draft",
    published_at: "2026-03-12",
    updated_at: "2026-03-12",
    author: "Maintenance Division",
  },
];

// Initial Seed Data for Why Tasneem
const INITIAL_WHY_TASNEEM: WhyTasneemPillar[] = [
  {
    id: "pillar-1",
    number: "01",
    title_en: "Direct Overseas Importer",
    title_bn: "সরাসরি বিদেশি মিল থেকে আমদানি",
    desc_en:
      "Sourced straight from specialized Asian machinery manufacturers with no intermediaries, offering transparent factory pricing.",
    desc_bn:
      "মাঝখানে কোনো দালাল বা মধ্যস্বত্বভোগী নেই, তাই সরাসরি কারখানা মূল্যে CFR Chattogram রেট পাবেন।",
  },
  {
    id: "pillar-2",
    number: "02",
    title_en: "3rd-Party Pre-Shipment Inspection",
    title_bn: "থার্ড-পার্টি প্রি-শিপমেন্ট ইন্সপেকশন",
    desc_en:
      "Every machine is inspected for cylinder alignment, feeder accuracy, and mechanical tolerances by recognized international agencies (SGS, Intertek, BV).",
    desc_bn:
      "কনটেইনারে তোলার আগে SGS, Intertek বা BV দিয়ে Cylinder ব্যালেন্স ও মেকানিক্যাল টলারেন্স শতভাগ পরীক্ষা করা হয়।",
  },
  {
    id: "pillar-3",
    number: "03",
    title_en: "CFR Chattogram Sea Delivery",
    title_bn: "CFR Chattogram নিরাপদ সমুদ্র ডেলিভারি",
    desc_en:
      "Turnkey sea logistics directly to Chattogram port with full L/C coordination, bill of lading documentation, and customs clearance advice.",
    desc_bn:
      "সরাসরি চট্টগ্রাম বন্দরে কনটেইনার ডেলিভারি, ব্যাংক L/C গাইডলাইন ও কাস্টমস ক্লিয়ারেন্সের পূর্ণ সহায়তা।",
  },
  {
    id: "pillar-4",
    number: "04",
    title_en: "Local Installation & After-Sales",
    title_bn: "আপনার মিলে ইনস্টলেশন ও আফটার-সেলস সেবা",
    desc_en:
      "Experienced local technicians handle mechanical assembly, electrical setup, test knitting, operator training, and spare parts supply.",
    desc_bn:
      "আমাদের অভিজ্ঞ টেকনিশিয়ানরা আপনার ফ্যাক্টরি ফ্লোরে এসে মেশিন অ্যাসেম্বলি, ট্রায়াল নিটিং ও অপারেটরদের ট্রেনিং বুঝিয়ে দেন।",
  },
];

// Initial Seed Data for FAQs
const INITIAL_FAQS: AdminFaqItem[] = FAQ_ITEMS.map((item, index) => ({
  id: `faq-${index + 1}`,
  question_en: item.question,
  question_bn:
    index === 0
      ? "তাসনীম নিট ইন্ডাস্ট্রি কীভাবে বিদেশ থেকে মেশিন আমদানিতে সহায়তা করে?"
      : index === 1
      ? "মেশিন আমদানির ক্ষেত্রে শিপিং টার্মস বা শর্তাবলী কী?"
      : index === 2
      ? "আপনারা কি থার্ড-পার্টি প্রি-শিপমেন্ট ইন্সপেকশন (PSI) সুবিধা দেন?"
      : index === 3
      ? "বাংলাদেশে আমাদের ফ্যাক্টরিতে এসে টেকনিশিয়ান দ্বারা মেশিন ইনস্টল করে দেওয়া হয় কি?"
      : index === 4
      ? "ওয়েবসাইটে যেসব স্পেসিফিকেশন এখনো সরাসরি ফ্যাক্টরি থেকে আসেনি সেগুলো কীভাবে দেখানো হয়?"
      : index === 5
      ? "অফিশিয়াল কোটেশন বা দরপত্র কীভাবে পাওয়া যাবে?"
      : "জরুরি খুচরা যন্ত্রাংশ ও টেকনিক্যাল সাপোর্ট কীভাবে পাওয়া যায়?",
  answer_en: item.answer,
  answer_bn:
    index === 0
      ? "আমরা সরাসরি মিল মালিকদের সাথে মূল মেশিনারি প্রস্তুতকারকদের সংযোগ করে দিই। সঠিক স্পেসিফিকেশন নির্বাচন, ব্যাংক L/C খোলার জন্য CFR Chattogram প্রফরমা ইনভয়েস (PI), প্রি-শিপমেন্ট ইন্সপেকশন এবং আপনার ফ্যাক্টরিতে এনে মেশিন চালু করা—সবকিছুতেই পাশে থাকি আমরা।"
      : index === 1
      ? "আমাদের মূল অফার CFR Chattogram ভিত্তিতে নির্ধারিত। কনটেইনার জাহাজে করে চট্টগ্রাম বন্দরে মেশিন পৌঁছানো হয় এবং বন্দর ক্লিয়ারেন্সের জন্য প্রয়োজনীয় সকল অরিজিনাল ডকুমেন্ট হস্তান্তর করা হয়।"
      : index === 2
      ? "হ্যাঁ, অবশ্যই। জাহাজে কনটেইনার তোলার আগে আন্তর্জাতিক মান যাচাইকারী প্রতিষ্ঠান (যেমন SGS, Intertek বা Bureau Veritas) দিয়ে মেশিনের প্রতিটি যন্ত্রাংশ নিখুঁতভাবে পরীক্ষা করার ব্যবস্থা রয়েছে।"
      : index === 3
      ? "হ্যাঁ, আমাদের অভিজ্ঞ টেকনিক্যাল টিম সরাসরি আপনার মিলে উপস্থিত হয়ে ফাউন্ডেশন লেভেলিং, অ্যাসেম্বলি, ওয়্যারিং এবং ট্রায়াল নিটিং চালিয়ে কাপড় বানিয়ে বুঝিয়ে দেন।"
      : index === 4
      ? "আমাদের নীতি হলো শতভাগ সততা। যাচাই না হওয়া পর্যন্ত কোনো মনগড়া তথ্য না দিয়ে সেখানে স্পষ্ট লিখে দেওয়া থাকে 'বিস্তারিত জানতে আমাদের সাথে কথা বলুন'।"
      : index === 5
      ? "ওয়েবসাইটের 'কোটেশন রিকোয়েস্ট' ফর্মে প্রয়োজনীয় Gauge, Cylinder ও Feeder উল্লেখ করে পাঠাতে পারেন অথবা সরাসরি আমাদের হটলাইন কিংবা হোয়াটসঅ্যাপে মেসেজ দিতে পারেন।"
      : "আমাদের নিজস্ব স্টকে জেনুইন Needle, Sinker, Cam এবং Feeder পার্টস সবসময় মজুত থাকে, যা বাংলাদেশের যেকোনো মিলে দ্রুততম সময়ে পৌঁছে দেওয়া হয়।",
  category: item.category || "General",
}));

// Initial Seed Data for Company Info (Client-Confirmed Facts)
const INITIAL_COMPANY_INFO: AdminCompanyInfo = {
  name: COMPANY_INFO.name,
  legalName: COMPANY_INFO.legalName,
  owner: COMPANY_INFO.owner,
  contactPerson: COMPANY_INFO.contactPerson,
  tagline_en: COMPANY_INFO.tagline,
  tagline_bn: "শিল্প সার্কুলার নিটিং মেশিন সোর্সিং ও সরাসরি আমদানি বিশেষজ্ঞ",
  address_en: COMPANY_INFO.address,
  address_bn: "প্লট-৫৯৪, রোড নং ৪, বিসিক শিল্পনগরী, চান নগর, শ্মশানঘাট, এনায়েতনগর, ফতুল্লা, নারায়ণগঞ্জ, বাংলাদেশ",
  registeredAddress_en: COMPANY_INFO.registeredAddress,
  registeredAddress_bn: "২৪/৩, আউকপাড়া, আশুলিয়া, সাভার, ঢাকা, বাংলাদেশ",
  phone: COMPANY_INFO.phone,
  phoneAlt: COMPANY_INFO.phoneAlt,
  whatsapp: COMPANY_INFO.whatsapp,
  email: COMPANY_INFO.email,
  businessEmail: COMPANY_INFO.businessEmail,
  facebook: COMPANY_INFO.facebook,
  domain: COMPANY_INFO.domain,
  businessHours_en: COMPANY_INFO.businessHours,
  businessHours_bn: "শনিবার – বৃহস্পতিবার: সকাল ৯:০০ – সন্ধ্যা ৭:০০ (বাংলাদেশ সময়)",
  bin: COMPANY_INFO.registration.bin,
  etin: COMPANY_INFO.registration.etin,
  tradeLicense: COMPANY_INFO.registration.tradeLicense,
  ownershipType: COMPANY_INFO.registration.ownershipType,
  validity: COMPANY_INFO.registration.validity,
  yearEstablished: COMPANY_INFO.registration.yearEstablished,
  status_en: COMPANY_INFO.registration.status,
  status_bn: "অনুমোদিত বাণিজ্যিক আমদানিকারক ও পাইকারি/খুচরা ট্রেডিং প্রতিষ্ঠান",
};

// Initial Seed Data for Industries Served
const INITIAL_INDUSTRIES: AdminIndustryItem[] = [
  {
    id: "ind-1",
    name_en: "Export Knitwear & Ready-Made Garments (RMG)",
    name_bn: "রপ্তানিমুখী তৈরি পোশাক ও নিটওয়্যার শিল্প",
    desc_en:
      "Configured for high-speed continuous production of premium cotton jersey, single jersey, and elastane pique for international buyers.",
    desc_bn:
      "আন্তর্জাতিক ক্রেতাদের জন্য প্রিমিয়াম কটন জার্সি, সিঙ্গেল জার্সি এবং ইলাস্টেন কাপড়ের নিরবচ্ছিন্ন ও দ্রুত উৎপাদনের উপযোগী।",
    targetGsm: "140 - 220 GSM",
    slug: "export-knitwear-rmg",
  },
  {
    id: "ind-2",
    name_en: "Fleece & Winter Heavyweight Knits",
    name_bn: "ফ্লিস ও শীতকালীন ভারী নিট পোশাক",
    desc_en:
      "Precision 3-thread fleece circular knitting machinery with specialized loop sinking cams for brushed hoodie and sweatshirt fabrics.",
    desc_bn:
      "হুডি ও সোয়েটশার্টের জন্য বিশেষায়িত থ্রি-থ্রেড ফ্লিস মেশিনারি।",
    targetGsm: "260 - 400 GSM",
    slug: "fleece-heavyweight-knits",
  },
  {
    id: "ind-3",
    name_en: "High-Stretch Rib & Collar Trims",
    name_bn: "হাই-স্ট্রেচ রিব ও কলার ফেব্রিক",
    desc_en:
      "Dial-and-cylinder interlock setups producing dimensional 1x1 and 2x2 rib collars, cuffs, and seamless waistbands.",
    desc_bn:
      "১x১ ও ২x২ রিব কলার, কাফ এবং ওয়েস্টব্যান্ড তৈরির নির্ভরযোগ্য সলিউশন।",
    targetGsm: "180 - 300 GSM",
    slug: "rib-collar-trims",
  },
  {
    id: "ind-4",
    name_en: "High-Gauge Technical & Sportswear",
    name_bn: "হাই-গেজ টেকনিক্যাল ও স্পোর্টসওয়্যার",
    desc_en:
      "Ultra-fine gauge (up to 36G) double jersey circular knitting engineered for synthetic microfiber, moisture-wicking activewear.",
    desc_bn:
      "সিন্থেটিক মাইক্রোফাইবার এবং স্পোর্টসওয়্যারের জন্য ৩৬জি পর্যন্ত হাই-গেজ মেশিনারি।",
    targetGsm: "110 - 180 GSM",
    slug: "technical-sportswear",
  },
];

// Initial Activity Log
const INITIAL_ACTIVITIES: ActivityLog[] = [
  {
    id: "act-1",
    action: "publish",
    entity: "blog",
    title: "Circular Knitting Machine Gauge (G) & Cylinder Selection Guide",
    timestamp: "2026-03-10T14:30:00Z",
    author: "Engr. M. Rahman",
  },
  {
    id: "act-2",
    action: "update",
    entity: "faq",
    title: "Updated CFR Chattogram Delivery FAQ answering L/C opening steps",
    timestamp: "2026-03-09T11:15:00Z",
    author: "Admin Staff",
  },
  {
    id: "act-3",
    action: "update",
    entity: "company_info",
    title: "Added secondary Narayanganj telephone contact and verified BIN note",
    timestamp: "2026-03-08T09:40:00Z",
    author: "Super Admin",
  },
  {
    id: "act-4",
    action: "publish",
    entity: "blog",
    title: "Pre-Shipment Inspection (SGS / ITS / BV) for Overseas Machinery Imports",
    timestamp: "2026-02-25T16:00:00Z",
    author: "Quality Team",
  },
  {
    id: "act-5",
    action: "create",
    entity: "industries",
    title: "Configured High-Gauge Technical & Sportswear application segment",
    timestamp: "2026-02-20T10:00:00Z",
    author: "Admin Staff",
  },
];

// Initial Seed Data for 301 Redirects (Legacy WordPress URLs per TRD Section 7 + dynamic rules)
const INITIAL_REDIRECTS: RedirectRule[] = [
  { id: "red-1", source: "/product/jiunn-long-double-jersey", destination: "/machines/double-jersey/jiunn-long-double-jersey", permanent: true, createdAt: "2026-03-01", reason: "Legacy WordPress URL" },
  { id: "red-2", source: "/product/longjun", destination: "/machines/double-jersey/longjun-double-jersey", permanent: true, createdAt: "2026-03-01", reason: "Legacy WordPress URL" },
  { id: "red-3", source: "/product/rongxiang-single-jersey", destination: "/machines/single-jersey/rongxiang-single-jersey", permanent: true, createdAt: "2026-03-01", reason: "Legacy WordPress URL" },
  { id: "red-4", source: "/product/shanli-double-jersey", destination: "/machines/double-jersey/shanli-double-jersey", permanent: true, createdAt: "2026-03-01", reason: "Legacy WordPress URL" },
  { id: "red-5", source: "/product/wjm-double-jersey", destination: "/machines/double-jersey/wjm-double-jersey", permanent: true, createdAt: "2026-03-01", reason: "Legacy WordPress URL" },
  { id: "red-6", source: "/product/xiangying-double-jersey", destination: "/machines/double-jersey/xiangying-double-jersey", permanent: true, createdAt: "2026-03-01", reason: "Legacy WordPress URL" },
  { id: "red-7", source: "/about-us-3", destination: "/about", permanent: true, createdAt: "2026-03-01", reason: "Legacy WordPress URL" },
  { id: "red-8", source: "/contact-us", destination: "/contact", permanent: true, createdAt: "2026-03-01", reason: "Legacy WordPress URL" },
];

// Initial Seed Data for Quotes Inbox
const INITIAL_QUOTES: QuoteRecord[] = [
  {
    id: "TK-QUOTE-910245",
    name: "Tariqul Islam",
    company: "Apex Textile Mills Ltd.",
    phoneOrWhatsApp: "+8801712345678",
    email: "tariqul@apextextile.com",
    machineType: "Jiunn Long Double Jersey High-Speed Circular Knitting Machine",
    machineId: "jiunn-long-double-jersey",
    gauge: "28G",
    cylinderDiameter: "34\"",
    feederCount: "102",
    productionTarget: "400 kg/day 24/7 export line",
    quantity: "2",
    preferredBrand: "Jiunn Long",
    deliveryRequirement: "CFR Chattogram (Standard)",
    message: "Need formal Proforma Invoice (PI) for Bangladesh Bank L/C opening within next 3 days.",
    status: "quoted",
    submittedAt: "2026-03-10T11:20:00Z",
    adminNotes: "PI #PI-2026-042 sent via email. Followed up on WhatsApp.",
  },
  {
    id: "TK-QUOTE-910288",
    name: "Kamrul Hasan",
    company: "Robin Knitwear Composite",
    phoneOrWhatsApp: "+8801819876543",
    email: "procurement@robinknit.com",
    machineType: "Rongxiang High-Speed 4-Track Single Jersey Machine",
    machineId: "rongxiang-single-jersey",
    gauge: "24G",
    cylinderDiameter: "30\"",
    feederCount: "90",
    productionTarget: "Pique polo fabric 220 GSM",
    quantity: "4",
    preferredBrand: "Rongxiang",
    deliveryRequirement: "CFR Chattogram (Standard)",
    message: "Please share technician commissioning timeline for Gazipur factory.",
    status: "contacted",
    submittedAt: "2026-03-12T09:45:00Z",
    adminNotes: "Called Mr. Kamrul. Commissioning terms explained.",
  },
  {
    id: "TK-QUOTE-910312",
    name: "Sazzad Hossain",
    company: "Square Fashion Fabrics",
    phoneOrWhatsApp: "+8801911223344",
    email: "buyer@demo.com",
    machineType: "Tasneem Precision Interlock Series Circular Machine",
    machineId: "precision-interlock-series",
    gauge: "28G",
    cylinderDiameter: "34\"",
    feederCount: "96",
    quantity: "1",
    deliveryRequirement: "CFR Chattogram (Standard)",
    message: "Urgent quote required for upcoming factory expansion.",
    status: "new",
    submittedAt: "2026-03-13T14:15:00Z",
  },
];

// Initial Seed Data for Demo Customer Portal User
const INITIAL_CUSTOMERS: CustomerUser[] = [
  {
    id: "cust-demo-1",
    name: "Sazzad Hossain",
    company: "Square Fashion Fabrics",
    email: "buyer@demo.com",
    phoneOrWhatsApp: "+880 1911-223344",
    deliveryAddress: "Kashimpur, Gazipur, Bangladesh",
    notes: "Verified Garments Mill Buyer",
    status: "approved",
    isApproved: true,
    createdAt: "2026-03-01T00:00:00Z",
  },
  {
    id: "cust-pending-1",
    name: "Engr. Kamal Uddin",
    company: "Robin Knitwear Ltd.",
    email: "procurement@robinknit.com",
    phoneOrWhatsApp: "+880 1819-334455",
    deliveryAddress: "Fatullah, Narayanganj, Bangladesh",
    notes: "New buyer requesting quote access for 28G Circular line.",
    status: "pending",
    isApproved: false,
    createdAt: "2026-03-14T09:30:00Z",
  },
  {
    id: "cust-pending-2",
    name: "Md. Jahangir Alam",
    company: "Epyllion Composite Mills",
    email: "jahangir@epyllion.com",
    phoneOrWhatsApp: "+880 1712-889900",
    deliveryAddress: "Mirzapur, Gazipur, Bangladesh",
    notes: "Factory DGM requesting CFR pricing verification.",
    status: "pending",
    isApproved: false,
    createdAt: "2026-03-14T11:45:00Z",
  },
];

// Initial Seed Data for Projects & Installations Gallery
const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gallery-1",
    type: "image",
    file: "/images/gallery/installation-circular-knitting.jpg",
    thumbnail: "/images/gallery/installation-circular-knitting.jpg",
    title_en: "Double Jersey Circular Knitting Line Deployment",
    title_bn: "Double Jersey সার্কুলার নিটিং মেশিন ইনস্টলেশন ও কমিশনিং",
    description_en:
      "Turnkey overseas import, floor leveling, positive feeder synchronization, and trial knitting for multi-feeder export interlock fabric.",
    description_bn:
      "সরাসরি আমদানি, ফ্লোর লেভেলিং, Positive Feeder সিনক্রোনাইজেশন এবং রপ্তানিমুখী Interlock কাপড়ের সফল ট্রায়াল নিটিং সম্পন্ন।",
    location: "BSCIC Industrial Estate, Narayanganj",
    installedDate: "February 2026",
    relatedCategory: "double-jersey",
    published: true,
    sortOrder: 1,
    createdAt: "2026-02-15T10:00:00.000Z",
    updatedAt: "2026-02-15T10:00:00.000Z",
  },
  {
    id: "gallery-2",
    type: "video",
    file: "https://www.youtube-nocookie.com/embed/ONTd4X4M-Vo?autoplay=1&rel=0",
    thumbnail: "https://img.youtube.com/vi/ONTd4X4M-Vo/hqdefault.jpg",
    title_en: "Executive Introduction & Narayanganj Operational Hub Tour",
    title_bn: "প্রতিষ্ঠাতা পরিচিতি ও নারায়ণগঞ্জ হাব পরিদর্শন",
    description_en:
      "Video walkthrough by Proprietor Md Mamunur Rashid detailing direct machinery import, CFR Chattogram logistics, and factory engineering support.",
    description_bn:
      "স্বত্বাধিকারী জনাব মোঃ মামুনুর রশীদ কর্তৃক সরাসরি মেশিন আমদানি, চট্টগ্রাম বন্দর লজিস্টিকস এবং ফ্যাক্টরি সাপোর্ট নিয়ে বিশেষ বার্তা।",
    location: "BSCIC Hub, Narayanganj",
    installedDate: "March 2026",
    relatedCategory: "circular-knitting",
    published: true,
    sortOrder: 2,
    createdAt: "2026-03-01T10:00:00.000Z",
    updatedAt: "2026-03-01T10:00:00.000Z",
  },
  {
    id: "gallery-3",
    type: "image",
    file: "/images/gallery/installation-01.jpg",
    thumbnail: "/images/gallery/installation-01.jpg",
    title_en: "High-Speed Single Jersey Electronic Calibration",
    title_bn: "হাই-স্পিড Single Jersey মেশিনের ইলেকট্রনিক ক্যালিব্রেশন",
    description_en:
      "Fine-tuning cylinder concentricity and central cam adjustment for export-standard 100% cotton combed yarn t-shirt jersey production.",
    description_bn:
      "এক্সপোর্ট কোয়ালিটির ১০০% কটন টি-শার্টের জন্য Cylinder concentricity ও সেন্ট্রাল Cam অ্যাডজাস্টমেন্ট সম্পন্ন।",
    location: "Gazipur Textile Hub",
    installedDate: "January 2026",
    relatedCategory: "single-jersey",
    published: true,
    sortOrder: 3,
    createdAt: "2026-01-20T10:00:00.000Z",
    updatedAt: "2026-01-20T10:00:00.000Z",
  },
  {
    id: "gallery-4",
    type: "image",
    file: "/images/gallery/installation-dyeing-finishing.jpg",
    thumbnail: "/images/gallery/installation-dyeing-finishing.jpg",
    title_en: "Eco Dyeing Machinery & Low-Liquor Pressure Vessel Installation",
    title_bn: "ইকো Dyeing মেশিনারি ও সফট-ফ্লো প্রেসার ভেসেল ইনস্টলেশন",
    description_en:
      "Installation of energy-efficient soft-flow dyeing vessel with automated chemical dosing and heating cycle controls.",
    description_bn:
      "স্বয়ংক্রিয় কেমিক্যাল ডোজিং ও বিদ্যুৎ সাশ্রয়ী সফট-ফ্লো Dyeing ভেসেল সফলভাবে স্থাপন।",
    location: "Fatullah Industrial Corridor, Narayanganj",
    installedDate: "December 2025",
    relatedCategory: "dyeing",
    published: true,
    sortOrder: 4,
    createdAt: "2025-12-10T10:00:00.000Z",
    updatedAt: "2025-12-10T10:00:00.000Z",
  },
  {
    id: "gallery-5",
    type: "image",
    file: "/images/gallery/installation-04.jpg",
    thumbnail: "/images/gallery/installation-04.jpg",
    title_en: "Stenter Drying & Finishing Chamber Setup",
    title_bn: "Stenter ড্রাইং ও ফিনিশিং চেম্বার সেটআপ",
    description_en:
      "Multi-chamber fabric heat-setting and width leveling installation for synthetic and cotton blend knitwear.",
    description_bn:
      "সিন্থেটিক ও কটন ব্লেন্ড কাপড়ের হিট-সেটিং ও সঠিক উইডথ ধরে রাখার জন্য মাল্টি-চেম্বার Stenter মেশিনারি স্থাপন।",
    location: "Savar Apparel Export Zone",
    installedDate: "November 2025",
    relatedCategory: "finishing",
    published: true,
    sortOrder: 5,
    createdAt: "2025-11-28T10:00:00.000Z",
    updatedAt: "2025-11-28T10:00:00.000Z",
  },
  {
    id: "gallery-6",
    type: "image",
    file: "/images/gallery/installation-02.jpg",
    thumbnail: "/images/gallery/installation-02.jpg",
    title_en: "Multi-Yarn Creel & Feeder System Commissioning",
    title_bn: "মাল্টি-ইয়ার্ন Creel ও Feeder সিস্টেম কমিশনিং",
    description_en:
      "Overhead aluminum creel assembly with infrared yarn-break stop motions and lint blowers on a 34-inch circular setup.",
    description_bn:
      "ইনফ্রারেড সুতা কাটার সেন্সর এবং লিন্ট ব্লোয়ারসহ ওভারহেড অ্যালুমিনিয়াম Creel অ্যাসেম্বলি সফলভাবে সম্পন্ন।",
    location: "Chattogram Export Processing Zone",
    installedDate: "October 2025",
    relatedCategory: "other",
    published: true,
    sortOrder: 6,
    createdAt: "2025-10-15T10:00:00.000Z",
    updatedAt: "2025-10-15T10:00:00.000Z",
  },
];

// Initial Seed Data for Customer Reviews & Testimonials
// Note: All initial entries are explicitly marked as placeholders per project requirements
const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-1",
    name: "Engr. Tariqul Islam",
    company: "Apex Textile Mills Ltd. [SAMPLE / FACTORY PARTNER PLACEHOLDER]",
    rating: 5,
    message: "[SAMPLE / FACTORY PARTNER PLACEHOLDER] We imported two Jiunn Long 34-inch double jersey circular knitting machines via Tasneem Knitting Industry under CFR Chattogram terms. Pre-shipment inspection and direct port clearance guidance were flawless.",
    status: "approved",
    createdAt: "2026-03-01T10:00:00.000Z",
    updatedAt: "2026-03-01T10:00:00.000Z",
  },
  {
    id: "rev-2",
    name: "Mustafizur Rahman",
    company: "Robin Knitwear Ltd., Fatullah [SAMPLE / FACTORY PARTNER PLACEHOLDER]",
    rating: 5,
    message: "[SAMPLE / FACTORY PARTNER PLACEHOLDER] Sourcing precision single jersey circular knitting machinery from Tasneem was straightforward. Their technician handled foundation leveling, cam adjustment, and test knitting at our factory.",
    status: "approved",
    createdAt: "2026-03-05T14:30:00.000Z",
    updatedAt: "2026-03-05T14:30:00.000Z",
  },
  {
    id: "rev-3",
    name: "Md. Jahangir Alam",
    company: "Epyllion Composite Mills, Gazipur [SAMPLE / FACTORY PARTNER PLACEHOLDER]",
    rating: 5,
    message: "[SAMPLE / FACTORY PARTNER PLACEHOLDER] Excellent communication regarding L/C terms and genuine spare parts availability (needles, sinkers, yarn feeders). Highly recommended industrial machinery partner in Bangladesh.",
    status: "approved",
    createdAt: "2026-03-10T09:15:00.000Z",
    updatedAt: "2026-03-10T09:15:00.000Z",
  },
  {
    id: "rev-4",
    name: "Engr. M. A. Hasan",
    company: "Standard Knitting Ltd. [SAMPLE / FACTORY PARTNER PLACEHOLDER]",
    rating: 5,
    message: "[SAMPLE / FACTORY PARTNER PLACEHOLDER] Requesting CFR Chattogram quote verification for 28G open-width circular knitting machines. Fast customer service and technical support.",
    status: "pending",
    createdAt: "2026-03-14T11:00:00.000Z",
    updatedAt: "2026-03-14T11:00:00.000Z",
  },
];

// Helper to safely access browser localStorage
function isClient(): boolean {
  return typeof window !== "undefined";
}

function getStoredItem<T>(key: string, fallback: T): T {
  if (!isClient()) return fallback;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return fallback;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  if (!isClient()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    // Dispatch custom storage event for in-tab reactive syncing
    window.dispatchEvent(new CustomEvent("tasneem-store-updated", { detail: { key } }));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
}

// Public API for Store
export const AdminStore = {
  // Blog Posts
  getBlogPosts(): BlogPost[] {
    const raw = getStoredItem<BlogPost[]>(STORAGE_KEY_BLOG, INITIAL_BLOG_POSTS);
    return raw.map((p) => {
      let img = p.cover_image;
      if (!img || img.includes("double-jersey-01.png")) {
        img = "/images/machines/cat-double-jersey.jpg";
      } else if (img.includes("single-jersey-01.png")) {
        img = "/images/machines/cat-single-jersey.jpg";
      } else if (img.includes("interlock-01.png")) {
        img = "/images/machines/cat-interlock.jpg";
      } else if (img.includes("jacquard-01.png")) {
        img = "/images/machines/cat-jacquard.jpg";
      } else if (img.includes("installation-01.png")) {
        img = "/images/machines/spotlight-installation.jpg";
      }
      return img !== p.cover_image ? { ...p, cover_image: img } : p;
    });
  },

  getBlogPostById(id: string): BlogPost | undefined {
    const posts = this.getBlogPosts();
    return posts.find((p) => p.id === id);
  },

  getBlogPostBySlug(slug: string): BlogPost | undefined {
    const posts = this.getBlogPosts();
    return posts.find((p) => p.slug_en === slug || p.slug_bn === slug);
  },

  saveBlogPost(post: Omit<BlogPost, "id"> & { id?: string }): BlogPost {
    const posts = this.getBlogPosts();
    const now = new Date().toISOString().split("T")[0];
    let savedPost: BlogPost;

    if (post.id) {
      // Update
      const index = posts.findIndex((p) => p.id === post.id);
      savedPost = {
        ...(post as BlogPost),
        updated_at: now,
      };
      if (index >= 0) {
        posts[index] = savedPost;
      } else {
        posts.unshift(savedPost);
      }
      this.logActivity("update", "blog", savedPost.title_en);
    } else {
      // Create
      savedPost = {
        ...(post as BlogPost),
        id: `post-${Date.now()}`,
        published_at: post.status === "published" ? now : "",
        updated_at: now,
      };
      posts.unshift(savedPost);
      this.logActivity("create", "blog", savedPost.title_en);
    }

    setStoredItem(STORAGE_KEY_BLOG, posts);
    return savedPost;
  },

  deleteBlogPost(id: string): boolean {
    const posts = this.getBlogPosts();
    const target = posts.find((p) => p.id === id);
    if (!target) return false;

    const filtered = posts.filter((p) => p.id !== id);
    setStoredItem(STORAGE_KEY_BLOG, filtered);
    this.logActivity("delete", "blog", target.title_en);
    return true;
  },

  // Why Tasneem
  getWhyTasneem(): WhyTasneemPillar[] {
    return getStoredItem<WhyTasneemPillar[]>(STORAGE_KEY_WHY_TASNEEM, INITIAL_WHY_TASNEEM);
  },

  saveWhyTasneem(pillars: WhyTasneemPillar[]): void {
    setStoredItem(STORAGE_KEY_WHY_TASNEEM, pillars);
    this.logActivity("update", "why_tasneem", "Updated Why Tasneem core pillars");
  },

  // FAQ
  getFaqs(): AdminFaqItem[] {
    return getStoredItem<AdminFaqItem[]>(STORAGE_KEY_FAQ, INITIAL_FAQS);
  },

  saveFaqs(faqs: AdminFaqItem[]): void {
    setStoredItem(STORAGE_KEY_FAQ, faqs);
    this.logActivity("update", "faq", `Updated ${faqs.length} FAQ questions`);
  },

  // Company Info
  getCompanyInfo(): AdminCompanyInfo {
    const raw = getStoredItem<AdminCompanyInfo>(STORAGE_KEY_COMPANY, INITIAL_COMPANY_INFO);
    return {
      ...INITIAL_COMPANY_INFO,
      ...raw,
      email:
        raw.email === "sales@tasneemknitindustry.com" || !raw.email
          ? COMPANY_INFO.email
          : raw.email,
      businessEmail: raw.businessEmail || COMPANY_INFO.businessEmail,
      facebook: raw.facebook || COMPANY_INFO.facebook,
    };
  },

  saveCompanyInfo(info: AdminCompanyInfo): void {
    setStoredItem(STORAGE_KEY_COMPANY, info);
    this.logActivity("update", "company_info", "Updated Company & Compliance parameters");
  },

  // Industries
  getIndustries(): AdminIndustryItem[] {
    return getStoredItem<AdminIndustryItem[]>(STORAGE_KEY_INDUSTRIES, INITIAL_INDUSTRIES);
  },

  saveIndustries(industries: AdminIndustryItem[]): void {
    setStoredItem(STORAGE_KEY_INDUSTRIES, industries);
    this.logActivity("update", "industries", `Updated ${industries.length} industry applications`);
  },

  // Activity Log
  getActivityLogs(): ActivityLog[] {
    return getStoredItem<ActivityLog[]>(STORAGE_KEY_ACTIVITY, INITIAL_ACTIVITIES);
  },

  logActivity(
    action: ActivityLog["action"],
    entity: ActivityLog["entity"],
    title: string,
    author = "Admin Staff"
  ): void {
    const logs = this.getActivityLogs();
    const newLog: ActivityLog = {
      id: `act-${Date.now()}`,
      action,
      entity,
      title,
      timestamp: new Date().toISOString(),
      author,
    };
    logs.unshift(newLog);
    // Keep max 20 entries
    if (logs.length > 20) logs.pop();
    setStoredItem(STORAGE_KEY_ACTIVITY, logs);
  },

  // ==========================================
  // Product & Machine Catalog Management
  // ==========================================
  getMachines(includeDrafts = true): Machine[] {
    const list = getStoredItem<Machine[]>(STORAGE_KEY_MACHINES, MACHINES);
    return includeDrafts ? list : list.filter((m) => m.status !== "draft");
  },

  getMachineById(id: string): Machine | undefined {
    const list = this.getMachines(true);
    return list.find((m) => m.id === id);
  },

  saveMachine(machine: Machine, previousId?: string, previousCategory?: string): Machine {
    const list = this.getMachines(true);
    const now = new Date().toISOString();
    const updatedMachine: Machine = {
      ...machine,
      updatedAt: now,
      createdAt: machine.createdAt || now,
      status: machine.status || "published",
    };

    // Check if slug or category changed on an existing published/saved machine
    const oldSlug = previousId || machine.id;
    const oldCat = previousCategory || machine.category;
    if (previousId && (previousId !== machine.id || previousCategory !== machine.category)) {
      const oldUrl = `/machines/${oldCat}/${oldSlug}`;
      const newUrl = `/machines/${machine.category}/${machine.id}`;
      this.addRedirect(
        oldUrl,
        newUrl,
        `Automatic 301 redirect: Slug changed from ${oldSlug} to ${machine.id}`
      );
    }

    const existingIndex = list.findIndex((m) => m.id === (previousId || machine.id));
    if (existingIndex >= 0) {
      list[existingIndex] = updatedMachine;
      this.logActivity("update", "machines", `Updated machine specs: ${machine.name}`);
    } else {
      list.unshift(updatedMachine);
      this.logActivity("create", "machines", `Added new machine: ${machine.name}`);
    }

    setStoredItem(STORAGE_KEY_MACHINES, list);
    return updatedMachine;
  },

  deleteMachine(id: string): boolean {
    const list = this.getMachines(true);
    const target = list.find((m) => m.id === id);
    const filtered = list.filter((m) => m.id !== id);
    setStoredItem(STORAGE_KEY_MACHINES, filtered);
    if (target) {
      this.logActivity("delete", "machines", `Deleted machine: ${target.name}`);
    }
    return true;
  },

  bulkUpdateStatus(ids: string[], status: "published" | "draft"): void {
    const list = this.getMachines(true);
    const updated = list.map((m) => (ids.includes(m.id) ? { ...m, status, updatedAt: new Date().toISOString() } : m));
    setStoredItem(STORAGE_KEY_MACHINES, updated);
    this.logActivity(status === "published" ? "publish" : "draft", "machines", `Bulk updated ${ids.length} machines to ${status}`);
  },

  bulkUpdateCategory(ids: string[], category: MachineCategory): void {
    const list = this.getMachines(true);
    const updated = list.map((m) => {
      if (ids.includes(m.id)) {
        // Create redirect for reassigned machine
        const oldUrl = `/machines/${m.category}/${m.id}`;
        const newUrl = `/machines/${category}/${m.id}`;
        this.addRedirect(oldUrl, newUrl, `Automatic 301: Category bulk-reassigned to ${category}`);
        return { ...m, category, updatedAt: new Date().toISOString() };
      }
      return m;
    });
    setStoredItem(STORAGE_KEY_MACHINES, updated);
    this.logActivity("update", "machines", `Reassigned ${ids.length} machines to category: ${category}`);
  },

  // ==========================================
  // Quotes Inbox Management
  // ==========================================
  getQuotes(): QuoteRecord[] {
    return getStoredItem<QuoteRecord[]>(STORAGE_KEY_QUOTES, INITIAL_QUOTES);
  },

  getQuoteById(id: string): QuoteRecord | undefined {
    return this.getQuotes().find((q) => q.id === id);
  },

  saveQuote(quote: QuoteRecord): QuoteRecord {
    const quotes = this.getQuotes();
    const existingIndex = quotes.findIndex((q) => q.id === quote.id);
    if (existingIndex >= 0) {
      quotes[existingIndex] = quote;
    } else {
      quotes.unshift(quote);
    }
    setStoredItem(STORAGE_KEY_QUOTES, quotes);
    this.logActivity("create", "quotes", `New quote received: [${quote.id}] from ${quote.company}`);
    return quote;
  },

  updateQuoteStatus(id: string, status: QuoteStatus, adminNotes?: string): QuoteRecord | undefined {
    const quotes = this.getQuotes();
    const target = quotes.find((q) => q.id === id);
    if (!target) return undefined;

    target.status = status;
    if (adminNotes !== undefined) {
      target.adminNotes = adminNotes;
    }
    setStoredItem(STORAGE_KEY_QUOTES, quotes);
    this.logActivity("update", "quotes", `Quote [${id}] status updated to: ${status}`);
    return target;
  },

  deleteQuote(id: string): boolean {
    const quotes = this.getQuotes();
    const filtered = quotes.filter((q) => q.id !== id);
    setStoredItem(STORAGE_KEY_QUOTES, filtered);
    this.logActivity("delete", "quotes", `Deleted quote record: ${id}`);
    return true;
  },

  getCustomerQuotes(emailOrId: string): QuoteRecord[] {
    const normalized = emailOrId.toLowerCase().trim();
    return this.getQuotes().filter(
      (q) =>
        (q.customerId && q.customerId.toLowerCase() === normalized) ||
        (q.email && q.email.toLowerCase().trim() === normalized)
    );
  },

  // ==========================================
  // 301 Redirects Registry
  // ==========================================
  getRedirects(): RedirectRule[] {
    return getStoredItem<RedirectRule[]>(STORAGE_KEY_REDIRECTS, INITIAL_REDIRECTS);
  },

  addRedirect(source: string, destination: string, reason?: string): RedirectRule {
    const redirects = this.getRedirects();
    const normSource = source.trim().toLowerCase();
    const normDest = destination.trim();

    // Prevent redirect loops or duplicates
    if (normSource === normDest) return redirects[0];

    const existingIndex = redirects.findIndex((r) => r.source.toLowerCase() === normSource);
    const newRule: RedirectRule = {
      id: `red-${Date.now()}`,
      source: normSource,
      destination: normDest,
      permanent: true,
      createdAt: new Date().toISOString().split("T")[0],
      reason: reason || "Admin-created 301 Redirect",
    };

    if (existingIndex >= 0) {
      redirects[existingIndex] = newRule;
    } else {
      redirects.unshift(newRule);
    }

    setStoredItem(STORAGE_KEY_REDIRECTS, redirects);
    this.logActivity("create", "redirects", `301 Redirect added: ${source} → ${destination}`);
    return newRule;
  },

  deleteRedirect(id: string): boolean {
    const redirects = this.getRedirects();
    const filtered = redirects.filter((r) => r.id !== id);
    setStoredItem(STORAGE_KEY_REDIRECTS, filtered);
    this.logActivity("delete", "redirects", `Removed redirect rule: ${id}`);
    return true;
  },

  // ==========================================
  // Customer Portal & Buyer Account Management
  // ==========================================
  getCustomers(): CustomerUser[] {
    const raw = getStoredItem<CustomerUser[]>(STORAGE_KEY_CUSTOMERS, INITIAL_CUSTOMERS);
    return raw.map((c) => ({
      ...c,
      status: c.status || (c.isApproved !== false ? "approved" : "pending"),
    }));
  },

  getPendingCustomers(): CustomerUser[] {
    return this.getCustomers().filter((c) => c.status === "pending");
  },

  getCustomerByEmail(email: string): CustomerUser | null {
    const normalized = email.toLowerCase().trim();
    return this.getCustomers().find((c) => c.email.toLowerCase().trim() === normalized) || null;
  },

  saveCustomer(customer: CustomerUser): CustomerUser {
    const customers = this.getCustomers();
    const index = customers.findIndex(
      (c) => c.id === customer.id || c.email.toLowerCase() === customer.email.toLowerCase()
    );
    const sanitizedCustomer: CustomerUser = {
      ...customer,
      status: customer.status || "pending",
      isApproved: customer.status === "approved",
    };
    if (index >= 0) {
      customers[index] = sanitizedCustomer;
    } else {
      customers.unshift(sanitizedCustomer);
    }
    setStoredItem(STORAGE_KEY_CUSTOMERS, customers);
    this.logActivity("create", "customers", `New registration request: ${customer.company} (${customer.email})`);
    return sanitizedCustomer;
  },

  approveCustomer(id: string): CustomerUser | null {
    const customers = this.getCustomers();
    const index = customers.findIndex((c) => c.id === id);
    if (index < 0) return null;
    const updated: CustomerUser = {
      ...customers[index],
      status: "approved",
      isApproved: true,
      updatedAt: new Date().toISOString(),
    };
    customers[index] = updated;
    setStoredItem(STORAGE_KEY_CUSTOMERS, customers);
    this.logActivity("update", "customers", `Approved buyer account: ${updated.company} (${updated.email})`);
    return updated;
  },

  rejectCustomer(id: string, reason?: string): CustomerUser | null {
    const customers = this.getCustomers();
    const index = customers.findIndex((c) => c.id === id);
    if (index < 0) return null;
    const updated: CustomerUser = {
      ...customers[index],
      status: "rejected",
      isApproved: false,
      notes: reason || customers[index].notes,
      updatedAt: new Date().toISOString(),
    };
    customers[index] = updated;
    setStoredItem(STORAGE_KEY_CUSTOMERS, customers);
    this.logActivity("update", "customers", `Rejected buyer account: ${updated.company} (${updated.email})`);
    return updated;
  },

  deleteCustomer(id: string): boolean {
    const customers = this.getCustomers();
    const filtered = customers.filter((c) => c.id !== id);
    setStoredItem(STORAGE_KEY_CUSTOMERS, filtered);
    this.logActivity("delete", "customers", `Removed buyer account record: ${id}`);
    return true;
  },

  updateCustomerProfile(id: string, updates: Partial<CustomerUser>): CustomerUser | null {
    const customers = this.getCustomers();
    const index = customers.findIndex((c) => c.id === id);
    if (index < 0) return null;
    const updated = { ...customers[index], ...updates };
    customers[index] = updated;
    setStoredItem(STORAGE_KEY_CUSTOMERS, customers);
    return updated;
  },

  // Projects / Installations Gallery
  getGalleryItems(): GalleryItem[] {
    const items = getStoredItem<GalleryItem[]>(STORAGE_KEY_GALLERY, INITIAL_GALLERY_ITEMS);
    return [...items].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  },

  getGalleryItemById(id: string): GalleryItem | undefined {
    const items = this.getGalleryItems();
    return items.find((item) => item.id === id);
  },

  saveGalleryItem(item: Omit<GalleryItem, "id"> & { id?: string }): GalleryItem {
    const items = this.getGalleryItems();
    const now = new Date().toISOString();
    let saved: GalleryItem;

    if (item.id) {
      const index = items.findIndex((i) => i.id === item.id);
      saved = {
        ...(item as GalleryItem),
        updatedAt: now,
      };
      if (index >= 0) {
        items[index] = saved;
      } else {
        items.push(saved);
      }
      this.logActivity("update", "gallery", saved.title_en || "Gallery item");
    } else {
      const maxSortOrder = items.reduce((max, i) => Math.max(max, i.sortOrder || 0), 0);
      saved = {
        ...(item as GalleryItem),
        id: `gallery-${Date.now()}`,
        sortOrder: item.sortOrder !== undefined ? item.sortOrder : maxSortOrder + 1,
        createdAt: now,
        updatedAt: now,
      };
      items.push(saved);
      this.logActivity("create", "gallery", saved.title_en || "Gallery item");
    }

    setStoredItem(STORAGE_KEY_GALLERY, items);
    return saved;
  },

  deleteGalleryItem(id: string): boolean {
    const items = this.getGalleryItems();
    const target = items.find((i) => i.id === id);
    if (!target) return false;
    const remaining = items.filter((i) => i.id !== id);
    setStoredItem(STORAGE_KEY_GALLERY, remaining);
    this.logActivity("delete", "gallery", target.title_en || "Gallery item");
    return true;
  },

  toggleGalleryItemPublish(id: string): boolean {
    const items = this.getGalleryItems();
    const target = items.find((i) => i.id === id);
    if (!target) return false;
    target.published = !target.published;
    target.updatedAt = new Date().toISOString();
    setStoredItem(STORAGE_KEY_GALLERY, items);
    this.logActivity(target.published ? "publish" : "draft", "gallery", target.title_en || "Gallery item");
    return true;
  },

  reorderGalleryItems(orderedIds: string[]): boolean {
    const items = this.getGalleryItems();
    const itemMap = new Map(items.map((i) => [i.id, i]));
    const updated: GalleryItem[] = [];

    orderedIds.forEach((id, index) => {
      const item = itemMap.get(id);
      if (item) {
        updated.push({ ...item, sortOrder: index + 1 });
        itemMap.delete(id);
      }
    });

    itemMap.forEach((item) => {
      updated.push({ ...item, sortOrder: updated.length + 1 });
    });

    setStoredItem(STORAGE_KEY_GALLERY, updated);
    this.logActivity("reorder", "gallery", "Gallery items reordered");
    return true;
  },

  // Customer Reviews / Testimonials
  getReviews(): Review[] {
    const reviews = getStoredItem<Review[]>(STORAGE_KEY_REVIEWS, INITIAL_REVIEWS);
    return [...reviews].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  getApprovedReviews(): Review[] {
    return this.getReviews().filter((r) => r.status === "approved");
  },

  getPendingReviews(): Review[] {
    return this.getReviews().filter((r) => r.status === "pending");
  },

  getReviewById(id: string): Review | undefined {
    return this.getReviews().find((r) => r.id === id);
  },

  addReview(review: {
    name: string;
    company?: string | null;
    rating: number;
    message: string;
    status?: ReviewStatus;
    id?: string;
  }): Review {
    const reviews = this.getReviews();
    const now = new Date().toISOString();
    const newReview: Review = {
      id: review.id || `rev-${Date.now()}`,
      name: review.name.trim(),
      company: review.company ? review.company.trim() : null,
      rating: Math.max(1, Math.min(5, Math.round(review.rating))),
      message: review.message.trim(),
      status: review.status || "pending",
      createdAt: now,
      updatedAt: now,
    };
    reviews.unshift(newReview);
    setStoredItem(STORAGE_KEY_REVIEWS, reviews);
    this.logActivity("create", "reviews", `New review submitted by ${newReview.name}`);
    return newReview;
  },

  updateReviewStatus(id: string, status: ReviewStatus): Review | null {
    const reviews = this.getReviews();
    const index = reviews.findIndex((r) => r.id === id);
    if (index < 0) return null;
    const target = reviews[index];
    target.status = status;
    target.updatedAt = new Date().toISOString();
    reviews[index] = target;
    setStoredItem(STORAGE_KEY_REVIEWS, reviews);
    this.logActivity(
      status === "approved" ? "publish" : "update",
      "reviews",
      `Review ${id} (${target.name}) marked as ${status}`
    );
    return target;
  },

  deleteReview(id: string): boolean {
    const reviews = this.getReviews();
    const target = reviews.find((r) => r.id === id);
    if (!target) return false;
    const remaining = reviews.filter((r) => r.id !== id);
    setStoredItem(STORAGE_KEY_REVIEWS, remaining);
    this.logActivity("delete", "reviews", `Deleted review ${id} by ${target.name}`);
    return true;
  },

  // Reset to factory defaults for testing
  resetAll(): void {
    if (!isClient()) return;
    window.localStorage.removeItem(STORAGE_KEY_BLOG);
    window.localStorage.removeItem(STORAGE_KEY_WHY_TASNEEM);
    window.localStorage.removeItem(STORAGE_KEY_FAQ);
    window.localStorage.removeItem(STORAGE_KEY_COMPANY);
    window.localStorage.removeItem(STORAGE_KEY_INDUSTRIES);
    window.localStorage.removeItem(STORAGE_KEY_ACTIVITY);
    window.localStorage.removeItem(STORAGE_KEY_MACHINES);
    window.localStorage.removeItem(STORAGE_KEY_QUOTES);
    window.localStorage.removeItem(STORAGE_KEY_CUSTOMERS);
    window.localStorage.removeItem(STORAGE_KEY_REDIRECTS);
    window.localStorage.removeItem(STORAGE_KEY_GALLERY);
    window.localStorage.removeItem(STORAGE_KEY_REVIEWS);
    window.dispatchEvent(new CustomEvent("tasneem-store-updated", { detail: { key: "all" } }));
  },
};

export const adminStore = AdminStore;

