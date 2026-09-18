"use client";

import React from "react";
import Link from "next/link";
import {
  DollarSign,
  ShieldCheck,
  Truck,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  Layers,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { COMPANY_INFO } from "@/lib/constants";
import { FaqAccordionItem } from "@/components/ui/FaqAccordionItem";

export default function CircularKnittingMachinePricePage() {
  const { locale } = useTranslation();

  const isBn = locale === "bn";

  const priceFactors = [
    {
      title: isBn ? "মেশিনের ধরন ও ক্যাম সিস্টেম" : "Machine Type & Cam Tracks",
      desc: isBn
        ? "সিঙ্গেল জার্সি (৩ বা ৪ ট্র্যাক), ডাবল জার্সি ইন্টারলক/রিব এবং ইলেকট্রনিক জ্যাকার্ডের প্রযুক্তির ওপর দাম নির্ভর করে।"
        : "Single Jersey (3/4-track), Double Jersey (interlock/rib), and Electronic Jacquard differ in cam engineering and feeder density.",
    },
    {
      title: isBn ? "সিলিন্ডার ব্যাস ও গেজ (G)" : "Cylinder Diameter & Gauge",
      desc: isBn
        ? "৩০\" থেকে ৪৪\" ডায়ামিটার এবং ১৮G থেকে ৪৪G আল্ট্রা-ফাইন গেজের মেশিনে প্রিসিশন নিডল ও কাস্ট আয়রন ফ্রেমের মান দাম নির্ধারণ করে।"
        : "Diameters from 30\" to 44\" and ultra-fine gauges (28G–44G) require higher precision CNC milling, directly impacting cost.",
    },
    {
      title: isBn ? "ব্র্যান্ড ও যন্ত্রাংশের উৎস" : "Component Brands & Origin",
      desc: isBn
        ? "জার্মানির Groz-Beckert নিডল, জাপানি সিঙ্কার, এবং তাইওয়ানিজ বা চাইনিজ ইনভার্টার ড্রাইভের কনফিগারেশন দীর্ঘস্থায়ী আউটপুট নিশ্চিত করে।"
        : "Groz-Beckert needles, high-hardness alloy cams, and top-tier inverter drives ensure 24/7 reliability without breakdown.",
    },
    {
      title: isBn ? "CFR চট্টগ্রাম শিপিং ও L/C" : "CFR Chattogram Terms & 100% L/C",
      desc: isBn
        ? "সরাসরি প্রস্তুতকারক থেকে ব্যাংক-টু-ব্যাংক L/C-তে আমদানির ফলে কোনো লোকাল মধ্যস্বত্বভোগীর বাড়তি কমিশন বা অতিরিক্ত খরচ থাকে না।"
        : "Direct manufacturer sourcing under CFR Chattogram terms with bank L/C eliminates multiple layers of local broker margins.",
    },
  ];

  const priceMatrix = [
    {
      type: isBn ? "হাই-স্পিড সিঙ্গেল জার্সি (Single Jersey 4-Track)" : "High-Speed Single Jersey (4-Track)",
      specs: "30\"–34\", 20G–32G, 90–108 Feeders",
      fabric: isBn ? "টি-শার্ট, পোলো পিক, সিঙ্গেল জার্সি, লাইক্রা" : "Plain Jersey, Pique, Lycra Cotton",
      rangeUsd: "$18,000 – $26,000 CFR",
    },
    {
      type: isBn ? "ডাবল জার্সি ইন্টারলক ও রিব (Double Jersey Interlock)" : "Double Jersey Interlock & Rib",
      specs: "30\"–36\", 24G–36G, 72–108 Feeders",
      fabric: isBn ? "হেভি ইন্টারলক, ৮-লক, রোমান ফ্যাব্রিক" : "Export Interlock, Rib, 8-Lock",
      rangeUsd: "$22,000 – $34,000 CFR",
    },
    {
      type: isBn ? "ওপেন-উইডথ সার্কুলার মেশিন (Open Width Line)" : "Open-Width Slitting Circular Machine",
      specs: "30\"–34\", 24G–28G, Fabric Slitter Motor",
      fabric: isBn ? "রিংকেল-মুক্ত ওপেন উইডথ নিট ফ্যাব্রিক" : "Crease-Free Open Width Fabric",
      rangeUsd: "$24,000 – $36,000 CFR",
    },
    {
      type: isBn ? "ইলেকট্রনিক জ্যাকার্ড মেশিন (Computerized Jacquard)" : "Computerized Electronic Jacquard",
      specs: "30\"–34\", 18G–28G, Electronic Actuators",
      fabric: isBn ? "প্যাটার্নযুক্ত এক্সপোর্ট ডিজাইন ফ্যাব্রিক" : "Intricate Jacquard Knitwear Patterns",
      rangeUsd: "$32,000 – $48,000 CFR",
    },
  ];

  const faqs = [
    {
      q: isBn
        ? "বাংলাদেশে সার্কুলার নিটিং মেশিনের দাম গড়ে কত হয়ে থাকে?"
        : "What is the average price of a circular knitting machine in Bangladesh?",
      a: isBn
        ? "কনফিগারেশন, গেজ ও ডায়ামিটারের ওপর ভিত্তি করে স্ট্যান্ডার্ড হাই-স্পিড সিঙ্গেল জার্সি মেশিনের দাম ১৮,০০০ থেকে ২৬,০০০ ডলার এবং ডাবল জার্সি ইন্টারলক মেশিনের দাম ২২,০০০ থেকে ৩৪,০০০ ডলার (CFR চট্টগ্রাম) হয়ে থাকে।"
        : "Standard industrial circular knitting machines typically range from $18,000 to $26,000 for high-speed single jersey, and $22,000 to $34,000 for double jersey interlock under CFR Chattogram terms, depending on diameter and gauge.",
    },
    {
      q: isBn
        ? "CFR চট্টগ্রাম মূল্যের মধ্যে কি কাস্টমস ডিউটি ও ট্যাক্স অন্তর্ভুক্ত থাকে?"
        : "Does the CFR Chattogram quotation include Bangladesh customs duty and port clearance?",
      a: isBn
        ? "না, আন্তর্জাতিক বাণিজ্য নীতি অনুযায়ী CFR (Cost and Freight) মূল্যের মধ্যে বিদেশি ফ্যাক্টরি প্রাইস ও সমুদ্রপথে চট্টগ্রাম বন্দর পর্যন্ত পৌঁছানোর খরচ অন্তর্ভুক্ত থাকে। চট্টগ্রাম বন্দরে কাস্টমস শুল্ক ও লোকাল ট্রান্সপোর্ট ক্রেতার L/C ও ক্লিয়ারিং এজেন্টের মাধ্যমে সম্পন্ন হয়।"
        : "No. Per international Incoterms, CFR includes factory manufacturing and sea freight to Chattogram Sea Port. Port clearance, customs tariff (HS 8447.11/12), and inland trucking are handled via the buyer's clearing agent and bank.",
    },
    {
      q: isBn
        ? "আমদানির আগে কি মেশিনের গুণগত মান ও টেস্ট-রান যাচাই করা সম্ভব?"
        : "Is third-party pre-shipment inspection conducted prior to ocean container loading?",
      a: isBn
        ? "হ্যাঁ, তাসনীম নিট ইন্ডাস্ট্রির মাধ্যমে আমদানিকৃত প্রতিটি মেশিনে SGS, Intertek বা Bureau Veritas দিয়ে প্রি-শিপমেন্ট ইন্সপেকশন (PSI), ড্রাই-রান টেস্ট এবং ভ্যাকুয়াম কাঠের বাক্সে প্যাকিং নিশ্চিত করা হয়।"
        : "Yes. Tasneem mandates 100% independent pre-shipment inspection (SGS, Intertek, or BV) verifying cylinder concentricity, cam tolerance, and continuous trial running before container stuffing.",
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: COMPANY_INFO.domain },
      {
        "@type": "ListItem",
        position: 2,
        name: isBn ? "সার্কুলার নিটিং মেশিনের দাম" : "Circular Knitting Machine Price in Bangladesh",
        item: `${COMPANY_INFO.domain}/circular-knitting-machine-price-in-bangladesh`,
      },
    ],
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: isBn ? "সার্কুলার নিটিং মেশিন বাংলাদেশ" : "Industrial Circular Knitting Machine Bangladesh",
    image: `${COMPANY_INFO.domain}/logo/og-image.png`,
    description: isBn
      ? "বাংলাদেশে ইন্ডাস্ট্রিয়াল সার্কুলার নিটিং মেশিন সরাসরি ফ্যাক্টরি থেকে আমদানি ও অন-সাইট কমিশনিং। সিঙ্গেল জার্সি ও ডাবল জার্সি মডেল।"
      : "Direct overseas sourcing of industrial circular knitting machines in Bangladesh under CFR Chattogram terms with bank L/C and turnkey installation.",
    brand: { "@type": "Brand", name: "Tasneem Knitting Industry" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "18000",
      highPrice: "48000",
      offerCount: "12",
      priceStatus: "CFR Chattogram Sea Port",
      seller: { "@type": "Organization", name: COMPANY_INFO.name },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="py-12 sm:py-20 bg-white text-[#2D2D2D]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-neutral-500 font-medium">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-[#800020] transition-colors">{isBn ? "হোম" : "Home"}</Link></li>
            <li>/</li>
            <li className="text-neutral-900 font-semibold">{isBn ? "নিটিং মেশিনের দাম" : "Machine Price Guide"}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FDF2F4] text-[#800020] border border-[#D8A4AF]/60 mb-3">
            <DollarSign className="w-3.5 h-3.5" />
            <span>{isBn ? "সরাসরি ফ্যাক্টরি কোটেশন • ২০২৬ আপডেট" : "2026 Factory Sourcing & Pricing Index"}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#2D2D2D] leading-[1.25]">
            {isBn
              ? "বাংলাদেশে সার্কুলার নিটিং মেশিনের দাম ও আমদানি গাইড"
              : "Circular Knitting Machine Price in Bangladesh & Sourcing Guide"}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            {isBn
              ? "চীন ও তাইওয়ানের শীর্ষ প্রস্তুতকারক থেকে সরাসরি ফ্যাক্টরি CFR রেটে সিঙ্গেল জার্সি, ডাবল জার্সি, ইন্টারলক ও জ্যাকার্ড মেশিন আমদানির পূর্ণাঙ্গ খরচ কাঠামো ও টেকনিক্যাল তথ্য।"
              : "Comprehensive overview of industrial circular knitting machine investment in Bangladesh: factory-direct CFR Chattogram rates, technical gauge cost factors, and bank L/C terms."}
          </p>
        </div>

        {/* 4 Cost Drivers Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {priceFactors.map((factor, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-[#F9FAFB] border border-neutral-200/80 hover:border-[#800020]/40 transition-colors">
              <span className="text-xs font-mono font-bold text-[#800020] mb-2 block">0{idx + 1}</span>
              <h3 className="text-base font-bold text-neutral-900 mb-2">{factor.title}</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">{factor.desc}</p>
            </div>
          ))}
        </div>

        {/* Price Matrix Table */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
              {isBn ? "সার্কুলার নিটিং মেশিনের আনুমানিক CFR রেট তালিকা" : "Indicative CFR Chattogram Machinery Cost Matrix"}
            </h2>
            <span className="text-xs font-mono text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-md">USD CFR</span>
          </div>

          <div className="overflow-x-auto border border-neutral-200 rounded-2xl shadow-2xs">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#2D2D2D] text-white text-xs font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-4">{isBn ? "মেশিনের মডেল / ধরন" : "Machine Model & Type"}</th>
                  <th className="px-5 py-4">{isBn ? "গেজ ও সিলিন্ডার ডায়ামিটার" : "Gauge & Cylinder Diameter"}</th>
                  <th className="px-5 py-4">{isBn ? "উপযুক্ত ফ্যাব্রিক আউটপুট" : "Fabric Application"}</th>
                  <th className="px-5 py-4">{isBn ? "আনুমানিক CFR রেট" : "Indicative CFR Chattogram"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 bg-white">
                {priceMatrix.map((item, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="px-5 py-4 font-semibold text-neutral-900">{item.type}</td>
                    <td className="px-5 py-4 text-neutral-600 font-mono text-xs">{item.specs}</td>
                    <td className="px-5 py-4 text-neutral-600 text-xs">{item.fabric}</td>
                    <td className="px-5 py-4 font-bold text-[#800020] font-mono text-sm">{item.rangeUsd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-neutral-500 mt-2 italic">
            {isBn
              ? "* উল্লিখিত রেট আন্তর্জাতিক স্টিল মূল্য ও শিপিং ফ্রেইট অনুযায়ী পরিবর্তনশীল। নিখুঁত প্রফরমা ইনভয়েসের জন্য সরাসরি কোটেশন অনুরোধ করুন।"
              : "* Price ranges vary with custom feeder density, inverter brand, and international freight. Contact us for an exact Proforma Invoice (PI)."}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-neutral-900">
              {isBn ? "মেশিনারি মূল্য ও আমদানি সংক্রান্ত প্রশ্নোত্তর" : "Frequently Asked Pricing Questions"}
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, idx) => (
              <FaqAccordionItem key={idx} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>

        {/* Sourcing Callout Banner */}
        <div className="rounded-3xl bg-[#FDF2F4] border border-[#D8A4AF]/60 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-[#2D2D2D]">
              {isBn ? "আপনার মিলের জন্য নিখুঁত স্পেক্স ও অফিসিয়াল PI প্রয়োজন?" : "Need an Official Proforma Invoice for Your Mill?"}
            </h3>
            <p className="text-sm text-neutral-600 mt-2">
              {isBn
                ? "আমাদের ইঞ্জিনিয়ারদের সাথে কথা বলে কাঙ্ক্ষিত GSM ও সুতার কাউন্টের জন্য সঠিক গেজ ও ডায়ামিটার বেছে নিন।"
                : "Consult with our textile machinery engineers to determine optimal gauge and cylinder specs under bank L/C terms."}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/quote"
              className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold shadow-xs"
            >
              <span>{isBn ? "কোটেশন অনুরোধ করুন" : "Request Machine Quote"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
