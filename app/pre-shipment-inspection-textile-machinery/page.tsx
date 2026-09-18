"use client";

import React from "react";
import Link from "next/link";
import {
  ClipboardCheck,
  ShieldCheck,
  Truck,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  Layers,
  CheckCircle2,
  Phone,
  Search,
  CheckSquare2,
  FileCheck,
  BadgeAlert,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { COMPANY_INFO } from "@/lib/constants";
import { FaqAccordionItem } from "@/components/ui/FaqAccordionItem";

export default function PreShipmentInspectionPage() {
  const { locale } = useTranslation();
  const isBn = locale === "bn";

  const checklist = [
    {
      num: "01",
      title: isBn ? "মেকানিক্যাল ফ্রেম ও লেভেল ব্যালেন্স" : "Mechanical Frame & Level Balance",
      desc: isBn
        ? "হেভি-ডিউটি কাস্ট আয়রন বডির স্থিতিশীলতা, স্পিরিট লেভেল নিখুঁত সমতলকরণ এবং ভাইব্রেশন পরীক্ষা।"
        : "Cast iron structure rigidity, center gravity alignment, and harmonic vibration damping under load.",
    },
    {
      num: "02",
      title: isBn ? "সিলিন্ডার ও ডায়াল নিডল চ্যানেল যাচাই" : "Cylinder & Dial Needle Channel Audit",
      desc: isBn
        ? "গেজ অনুযায়ী নিডল স্লটের গভীরতা, মসৃণতা ও ট্রিক ওয়ালসের মাইক্রোমিটার পরিমাপ।"
        : "Micrometer gauge verification of needle channels, trick walls, and dial-cylinder concentricity.",
    },
    {
      num: "03",
      title: isBn ? "ক্যাম ট্র্যাক হার্ডনেস (HRC) ও সারফেস টেস্ট" : "Cam Track Hardness (HRC) Test",
      desc: isBn
        ? "জাপানি অ্যালয় স্টিলের ক্যাম ট্র্যাকসের রকওয়েল হার্ডনেস (HRC 58–62) নিশ্চিতকরণ।"
        : "Rockwell hardness test (HRC 58–62) ensuring zero wear under continuous yarn stitch friction.",
    },
    {
      num: "04",
      title: isBn ? "ড্রাইভ মোটর ও ইনভার্টার লোড ট্রায়াল" : "Motor & Inverter Electrical Load Run",
      desc: isBn
        ? "৩-ফেজ মোটর, সফট-স্টার্ট ইনভার্টার ও ডিজিটাল প্যানেলের ফুল স্পিড রানিং ভোল্টেজ যাচাই।"
        : "Full RPM operational test monitoring thermal elevation, phase current draw, and soft acceleration.",
    },
    {
      num: "05",
      title: isBn ? "ইয়ার্ন স্টপ-মোশন ও সেন্সর রেসপন্স" : "Yarn Feed & Stop-Motion Sensitivity",
      desc: isBn
        ? "সুতা ছিঁড়ে যাওয়া মাত্র মিলিসেকেন্ডের মধ্যে মেশিন স্বয়ংক্রিয়ভাবে বন্ধ হওয়ার নির্ভুল রেসপন্স।"
        : "Millisecond auto-stop response testing across all top, middle, and bottom optical yarn break sensors.",
    },
    {
      num: "06",
      title: isBn ? "প্রেসারাইজড অয়েল মিস্টার লুব্রিকেশন" : "Pulsed Oil Mist Lubricator Flow",
      desc: isBn
        ? "ইউনিওয়েভ স্টাইল স্প্রেয়ার দ্বারা প্রতিটি নিডল ও সিঙ্কারে সমান তৈলবিন্দু পৌঁছানো নিশ্চিত করা।"
        : "Verifying timed oil pulse delivery to needle hooks and sinker channels without fabric dripping.",
    },
    {
      num: "07",
      title: isBn ? "টেক-ডাউন রোলার ও স্লিটার অ্যালাইনমেন্ট" : "Take-Down & Slitter Geometry",
      desc: isBn
        ? "ফ্যাব্রিক উইন্ডিং রোলারের সুষম টেনশন ও ওপেন-উইডথ স্লিটার ব্লেডের মসৃণ কাটিং যাচাই।"
        : "Even roll winding tension measurement and high-precision rotary slitter blade clearance calibration.",
    },
    {
      num: "08",
      title: isBn ? "নিডল ও সিঙ্কার ব্র্যান্ড অথেন্টিসিটি" : "Needle & Sinker Brand Verification",
      desc: isBn
        ? "জার্মান Groz-Beckert নিডল ও কার্বন সিঙ্কারের অরিজিনাল সিকিউরিটি ব্যাচ কোড নিরীক্ষা।"
        : "Physical inspection of original security hologram seals and serial numbers for German needle packs.",
    },
    {
      num: "09",
      title: isBn ? "অ্যান্টি-রাস্ট কোটিং ও ভ্যাকুয়াম সিলিং" : "Anti-Rust Oil & Vacuum Barrier Film",
      desc: isBn
        ? "সমুদ্রের নোনা বাতাসে মরিচা পড়া রোধে সম্পূর্ণ মেশিনে বিশেষ অয়েল কোটিং ও অ্যালুমিনিয়াম ফয়েল র‍্যাপিং।"
        : "Application of marine-grade rust preventative oil and desiccant-infused multi-layer barrier foil.",
    },
    {
      num: "10",
      title: isBn ? "ফিউমিগেটেড উডেন ক্রেইট ও কনটেইনার ল্যাশিং" : "Fumigated Wooden Crates & Lashing",
      desc: isBn
        ? "আন্তর্জাতিক আইপিপিসি (IPPC) স্ট্যাম্পযুক্ত কাঠের বাক্সে প্যাকিং এবং কনটেইনারে স্টিল ওয়্যার ল্যাশিং।"
        : "ISPM-15 IPPC stamped fumigated plywood crating with heavy-duty steel turnbuckle container lashing.",
    },
  ];

  const faqs = [
    {
      q: isBn
        ? "টেক্সটাইল মেশিনারির ক্ষেত্রে প্রি-শিপমেন্ট ইন্সপেকশন (PSI) কেন অপরিহার্য?"
        : "Why is Pre-Shipment Inspection (PSI) critical when importing textile machinery to Bangladesh?",
      a: isBn
        ? "বিদেশে থাকা অবস্থায় মেশিনের কোনো ত্রুটি থাকলে তা সহজে সমাধান করা যায়। চট্টগ্রাম বন্দরে মেশিন খালাসের পর কোনো মেকানিক্যাল ডিফেক্ট ধরা পড়লে তা ফেরত পাঠানো বা স্থানীয়ভাবে সমাধান করা অত্যন্ত ব্যয়বহুল ও সময়সাপেক্ষ।"
        : "Addressing mechanical flaws at the overseas manufacturing facility costs near zero compared to discovering defects after customs clearance at Chattogram Port, preventing costly factory production delays.",
    },
    {
      q: isBn
        ? "তাসনীম কি আন্তর্জাতিক অডিট রিপোর্ট (যেমন SGS বা নিজস্ব টিম) প্রদান করে?"
        : "Does Tasneem provide documented inspection reports with video trials?",
      a: isBn
        ? "হ্যাঁ। আমরা প্রতি মেশিনের লাইভ ভিডিও ট্রায়াল রান, ১০-পয়েন্ট টিকমার্ক অডিট রিপোর্ট, সিলিন্ডারের ক্লোজ-আপ ছবি এবং প্যাকিং ও কনটেইনার সিলিংয়ের সম্পূর্ণ ডিজিটাল প্রুফ শিপমেন্টের পূর্বেই বায়ারের কাছে হস্তান্তর করি।"
        : "Yes, every imported unit is accompanied by continuous running test video records, photographic documentation of critical components, and a formal signed inspection sign-off before L/C bill clearance.",
    },
    {
      q: isBn
        ? "সমুদ্রযাত্রায় মেশিনে মরিচা বা ক্ষয় রোধে কী ব্যবস্থা নেওয়া হয়?"
        : "How does the packaging protocol protect machinery from ocean moisture and rust?",
      a: isBn
        ? "আমরা ইন্ডাস্ট্রিয়াল অ্যান্টি-রাস্ট ড্রাইডেন লুব্রিকেন্ট স্প্রে করি, সিলিকা জেল ডিহিউমিডিফায়ার প্যাক স্থাপন করি এবং তাপ-সিল করা ভ্যাকুয়াম অ্যালুমিনিয়াম ব্যারিয়ার ফয়েলে মেশিন সিল করি।"
        : "All exposed steel surfaces undergo anti-corrosion coating, sealed within vacuum-sealed foil with moisture-absorbing desiccants and crated inside ISPM-15 fumigated timber.",
    },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Pre-Shipment Inspection (PSI) for Textile Machinery",
    provider: {
      "@type": "Organization",
      name: COMPANY_INFO.name,
      url: COMPANY_INFO.domain,
    },
    areaServed: {
      "@type": "Country",
      name: "Bangladesh",
    },
    description:
      "Comprehensive 10-point Pre-Shipment Inspection (PSI) protocol for circular knitting and textile machinery imported from China and Taiwan to Bangladesh.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Textile Machinery Quality Assurance",
      itemListElement: checklist.map((c) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: c.title,
          description: c.desc,
        },
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isBn ? "হোম" : "Home",
        item: COMPANY_INFO.domain,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isBn ? "পিএসআই অডিট গাইড" : "PSI Inspection Guide",
        item: `${COMPANY_INFO.domain}/pre-shipment-inspection-textile-machinery`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <div className="bg-[#FAF8F5] text-[#2D2D2D] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1c1917] via-[#2A1F1D] to-[#1c1917] text-white pt-28 pb-20 px-4 md:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-widest text-[#E8DCC4] mb-4 flex items-center gap-2">
            <Link href="/" className="hover:underline opacity-80">
              {isBn ? "হোম" : "Home"}
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">
              {isBn ? "পিএসআই কোয়ালিটি অডিট" : "Pre-Shipment Inspection"}
            </span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#800020]/30 border border-[#800020]/50 text-[#F5B5C2] text-xs font-semibold uppercase tracking-wider mb-6">
            <FileCheck className="w-3.5 h-3.5" />
            {isBn ? "১০-পয়েন্ট আন্তর্জাতিক কোয়ালিটি নিশ্চয়তা" : "10-Point Technical Quality Protocol"}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            {isBn
              ? "টেক্সটাইল মেশিনারিজ প্রি-শিপমেন্ট ইন্সপেকশন (PSI) গাইড ও মাননিয়ন্ত্রণ"
              : "Pre-Shipment Inspection (PSI) for Textile Machinery Imports Bangladesh"}
          </h1>

          <p className="text-base md:text-xl text-neutral-300 max-w-3xl leading-relaxed mb-8">
            {isBn
              ? "এল/সি পেমেন্ট ছাড়ের পূর্বে বিদেশি কারখানায় লাইভ রানিং ট্রায়াল, সিলিন্ডার প্রিসিশন পরিমাপ, ভাইব্রেশন টেস্ট এবং কাঠের বাক্সে সমুদ্র পরিবহন উপযোগী ফিউমিগেশন নিশ্চিত করার পূর্ণাঙ্গ অডিট নির্দেশিকা।"
              : "Zero-defect quality assurance for circular knitting and dyeing machinery: 10-point mechanical and electrical factory acceptance testing (FAT) before container sealing and ocean transit to Chattogram."}
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#800020] hover:bg-[#990026] text-white font-medium rounded-xl shadow-lg transition-all"
            >
              {isBn ? "মেশিন অডিট সহায়তা চান" : "Request Machinery Quality Audit"}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${COMPANY_INFO.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hello Tasneem, I want to learn about your Pre-Shipment Inspection (PSI) service for textile machinery.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-white border border-[#25D366]/40 rounded-xl font-medium transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              {isBn ? "হোয়াটসঅ্যাপে অডিট টিম" : "Chat on WhatsApp"}
            </a>
          </div>
        </div>
      </section>

      {/* 10-Point Checklist Grid */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D2D2D] mb-3">
            {isBn ? "১০-পয়েন্ট প্রি-শিপমেন্ট ইন্সপেকশন চেকলিস্ট" : "10-Point Technical Inspection Protocol"}
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-sm md:text-base">
            {isBn
              ? "প্রতিটি মেশিন শিপমেন্টের ছাড়পত্র পাওয়ার আগে কঠোর কারিগরি মানদণ্ড দিয়ে যাচাই করা হয়।"
              : "Systematic auditing of mechanical, electrical, electronic, and maritime packing integrity."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {checklist.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#E5E0D8] shadow-sm flex gap-4"
            >
              <span className="text-2xl font-mono font-bold text-[#800020] shrink-0">
                {item.num}
              </span>
              <div>
                <h3 className="font-semibold text-lg text-[#2D2D2D] mb-1">{item.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#800020]/10 text-[#800020] text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            {isBn ? "সাধারণ প্রশ্নোত্তর" : "Frequently Asked Questions"}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D2D2D]">
            {isBn ? "পিএসআই অডিট সম্পর্কিত সাধারণ প্রশ্ন" : "Pre-Shipment Inspection FAQs"}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <FaqAccordionItem key={idx} question={faq.q} answer={faq.a} defaultOpen={idx === 0} />
          ))}
        </div>
      </section>
    </div>
  );
}
