"use client";

import React from "react";
import Link from "next/link";
import {
  Waves,
  ShieldCheck,
  Truck,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  Layers,
  CheckCircle2,
  Phone,
  Droplets,
  Thermometer,
  Cpu,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { COMPANY_INFO } from "@/lib/constants";
import { FaqAccordionItem } from "@/components/ui/FaqAccordionItem";

export default function DyeingFinishingMachineryPage() {
  const { locale } = useTranslation();
  const isBn = locale === "bn";

  const machines = [
    {
      title: isBn ? "লো-লিকুয়ার রেশিও সফট-ফ্লো ডাইং মেশিন" : "Low-Liquor Ratio Soft-Flow Dyeing Machine",
      spec: "1:4.5 – 1:6 Liquor Ratio | 250kg – 2000kg Capacity",
      desc: isBn
        ? "পানি ও বাষ্প সাশ্রয়ী আধুনিক সফট-ফ্লো প্রযুক্তি। কটন, পলিয়েস্টার ও ব্লেন্ডেড নিট ফ্যাব্রিকে নিখুঁত ও সমরূপ শেড নিশ্চিত করে।"
        : "Advanced hydrodynamic nozzle reducing water, steam, and chemical consumption while guaranteeing uniform dye leveling.",
    },
    {
      title: isBn ? "মাল্টি-চেম্বার স্টেনটার ফিনিশিং মেশিন (Stenter)" : "Multi-Chamber Pin-Clip Stenter Machine",
      spec: "6 – 10 Chambers | Width 1800mm – 3200mm",
      desc: isBn
        ? "গ্যাস বা থার্মাল অয়েল হিটেড অটোমেটিক টেম্পারেচার জোন, প্যাডার ও হিট রিকভারি সিস্টেম সম্বলিত ফিনিশিং লাইন।"
        : "High-efficiency thermal oil or gas-fired stenter with integrated padder, Mahlo weft straightener, and heat recovery unit.",
    },
    {
      title: isBn ? "টিউবুলার ও ওপেন-উইডথ কম্প্যাক্টর (Compactor)" : "Tubular & Open-Width Felt Compactor",
      spec: "Residual Shrinkage < 3% | Speed up to 40m/min",
      desc: isBn
        ? "এক্সপোর্ট নিটওয়্যারের সংকোচন (Shrinkage) নিয়ন্ত্রণ এবং চমৎকার কাপড়ের হাত-ছোঁয়া (Hand-feel) তৈরির জন্য নির্ভরযোগ্য নমেক্স বেল্ট কম্প্যাক্টর।"
        : "Heavy-duty Nomex felt blanket compactor delivering exact dimensional stability and plush touch for European export brands.",
    },
    {
      title: isBn ? "কন্টিনিউয়াস স্লিটিং ও স্কুইজিং লাইন" : "Continuous Slitting & De-twisting Line",
      spec: "Photoelectric Sensor | 0–100 m/min Processing",
      desc: isBn
        ? "ডাইং পরবর্তী ভেজা ফ্যাব্রিকের স্বয়ংক্রিয় ডি-টুইস্টিং, সেন্টারিং এবং সুষম পানি নিষ্কাশনের আধুনিক ইকুইপমেন্ট।"
        : "Automatic rope de-twisting with motorized turntable, optical edge sensing, and continuous hydraulic squeezing.",
    },
  ];

  const ecoMetrics = [
    {
      value: "40%",
      label: isBn ? "পানি ব্যবহার হ্রাস" : "Water Consumption Savings",
    },
    {
      value: "30%",
      label: isBn ? "বাষ্প ও গ্যাস সাশ্রয়" : "Steam & Gas Energy Efficiency",
    },
    {
      value: "<3%",
      label: isBn ? "নিখুঁত ফ্যাব্রিক শ্রিঙ্কেজ" : "Standard Residual Shrinkage",
    },
    {
      value: "100%",
      label: isBn ? "ব্যাংক এল/সি কমপ্লায়েন্স" : "Transparent L/C Import Support",
    },
  ];

  const faqs = [
    {
      q: isBn
        ? "সফট-ফ্লো ডাইং মেশিনে পানি ও বাষ্প সাশ্রয়ের সুবিধা কেমন?"
        : "How does low-liquor ratio soft-flow dyeing reduce factory operational costs?",
      a: isBn
        ? "আমাদের আধুনিক ১:৪.৫ লিকুয়ার রেশিও মেশিনে প্রচলিত ১:৮ বা ১:১০ মেশিনের তুলনায় প্রতি কেজি ফ্যাব্রিকে প্রায় ৪০% পানি এবং ৩০% বাষ্প সাশ্রয় হয়, যা কারখানার ইটিপি (ETP) লোড এবং জ্বালানি খরচ উল্লেখযোগ্যভাবে কমিয়ে দেয়।"
        : "A 1:4.5 liquor ratio requires 40% less process water and 30% less steam per kg of fabric compared to conventional machines, slashing boiler gas bills and effluent treatment (ETP) capacity requirements.",
    },
    {
      q: isBn
        ? "ডাইং ফিনিশিং মেশিনের জন্য তাসনীম লিমিটেড কী ধরনের ওয়্যারেন্টি ও সার্ভিস প্রদান করে?"
        : "What after-sales service and warranty terms does Tasneem provide for finishing lines?",
      a: isBn
        ? "আমরা ফ্যাক্টরি মেকানিকাল ও ইলেকট্রিক্যাল কমিশনিং, স্থানীয় ইঞ্জিনিয়ারদের মাধ্যমে ট্রাবলশুটিং এবং ১ বছরের প্রস্তুতকারক স্ট্যান্ডার্ড ওয়্যারেন্টি ও স্পেয়ার্স ব্যাকআপ নিশ্চিত করি।"
        : "We provide comprehensive turnkey commissioning, operator parameter training, 1-year manufacturer component warranty, and rapid emergency spare parts support.",
    },
    {
      q: isBn
        ? "মেশিন আমদানির ক্ষেত্রে ব্যাংক এল/সি নিয়মাবলি কী?"
        : "What are the banking and shipping terms for importing dyeing lines to Chattogram?",
      a: isBn
        ? "ক্যাপিটাল মেশিনারিজ ক্যাটাগরিতে শতভাগ অপরিবর্তনীয় সাইট এল/সি (100% Irrevocable L/C at Sight) এর মাধ্যমে সরাসরি প্রস্তুতকারকের নামে CFR চট্টগ্রাম টার্মসে আমদানি করা হয়।"
        : "Shipments are handled under CFR Chattogram terms with 100% irrevocable bank letters of credit at sight, facilitating full NBR capital machinery customs duty incentives.",
    },
  ];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Textile Dyeing and Finishing Machinery",
    image: `${COMPANY_INFO.domain}/tasneem-logo.png`,
    description:
      "Industrial textile dyeing & finishing machinery importer in Bangladesh: Eco soft-flow dyeing machines, multi-chamber stenters, and knit compactors.",
    brand: {
      "@type": "Brand",
      name: "Tasneem Machinery Sourcing",
    },
    category: "Textile Machinery > Dyeing & Finishing",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "45000",
      highPrice: "180000",
      offerCount: "8",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: COMPANY_INFO.name,
      },
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
        name: isBn ? "ডাইং ও ফিনিশিং মেশিন" : "Dyeing & Finishing Machinery",
        item: `${COMPANY_INFO.domain}/dyeing-finishing-machinery-importer-bangladesh`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
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
              {isBn ? "ডাইং ও ফিনিশিং মেশিনারি" : "Dyeing & Finishing Machinery"}
            </span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#800020]/30 border border-[#800020]/50 text-[#F5B5C2] text-xs font-semibold uppercase tracking-wider mb-6">
            <Waves className="w-3.5 h-3.5" />
            {isBn ? "ইকো-ফ্রেন্ডলি টেক্সটাইল ওয়েট প্রসেসিং" : "Eco-Friendly Wet Processing Technology"}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            {isBn
              ? "ডাইং ও ফিনিশিং মেশিনারি আমদানিকারক বাংলাদেশ"
              : "Dyeing & Finishing Machinery Importer Bangladesh"}
          </h1>

          <p className="text-base md:text-xl text-neutral-300 max-w-3xl leading-relaxed mb-8">
            {isBn
              ? "কম পানি ও বাষ্প খরচের আধুনিক সফট-ফ্লো ডাইং মেশিন, মাল্টি-চেম্বার স্টেনটার এবং নিট কম্প্যাক্টর সরাসরি প্রস্তুতকারক ফ্যাক্টরি থেকে সাশ্রয়ী মূল্যে CFR চট্টগ্রাম আমদানির সম্পূর্ণ সমাধান।"
              : "Direct overseas sourcing of industrial fabric wet-processing machinery: Low-liquor ratio soft-flow dyeing vessels, multi-chamber pin-clip stenters, and felt compactors with complete technical commissioning."}
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#800020] hover:bg-[#990026] text-white font-medium rounded-xl shadow-lg transition-all"
            >
              {isBn ? "প্রজেক্ট কনসাল্টেশন ও কোটেশন চান" : "Request Machinery Proposal"}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${COMPANY_INFO.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hello Tasneem, I want to discuss Dyeing and Finishing Machinery sourcing.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-white border border-[#25D366]/40 rounded-xl font-medium transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              {isBn ? "হোয়াটসঅ্যাপে যোগাযোগ" : "WhatsApp Project Desk"}
            </a>
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="py-12 bg-white border-b border-[#E5E0D8] px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {ecoMetrics.map((m, idx) => (
            <div key={idx} className="text-center p-4">
              <p className="text-3xl md:text-4xl font-extrabold text-[#800020] mb-1">{m.value}</p>
              <p className="text-xs md:text-sm text-neutral-600 font-medium">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Machinery Line Grid */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D2D2D] mb-3">
            {isBn ? "শিল্পোন্নত ডাইং ও ফিনিশিং ইকুইপমেন্ট" : "Industrial Dyeing & Finishing Equipment"}
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-sm md:text-base">
            {isBn
              ? "আন্তর্জাতিক এক্সপোর্ট বায়ারদের কঠোর রঙ স্থায়িত্ব ও সংকোচন মান পূরণের জন্য প্রস্তুত।"
              : "Engineered to satisfy global export buyer standards for shade uniformity, tensile strength, and shrinkage."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {machines.map((item, idx) => (
            <div
              key={idx}
              className="p-6 md:p-8 rounded-2xl bg-white border border-[#E5E0D8] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-lg bg-[#800020]/10 flex items-center justify-center text-[#800020] mb-4 font-bold text-sm">
                0{idx + 1}
              </div>
              <h3 className="font-semibold text-lg md:text-xl text-[#2D2D2D] mb-2">{item.title}</h3>
              <p className="text-xs font-mono text-[#800020] font-semibold mb-3">{item.spec}</p>
              <p className="text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
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
            {isBn ? "ডাইং ও ফিনিশিং মেশিন সম্পর্কিত প্রশ্ন" : "Dyeing & Finishing FAQs"}
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
