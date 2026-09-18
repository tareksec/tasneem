"use client";

import React from "react";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  Truck,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  Layers,
  CheckCircle2,
  Phone,
  Compass,
  Zap,
  Wind,
  Gauge,
  ThermometerSnowflake,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { COMPANY_INFO } from "@/lib/constants";
import { FaqAccordionItem } from "@/components/ui/FaqAccordionItem";

export default function KnitwearFactorySetupPage() {
  const { locale } = useTranslation();
  const isBn = locale === "bn";

  const engineeringParams = [
    {
      title: isBn ? "ফ্লোর স্পেস ও মেশিন লেআউট" : "Floor Space & Clearance Layout",
      spec: "3.8m x 3.8m Per Machine Bay",
      desc: isBn
        ? "প্রতিটি সার্কুলার নিটিং মেশিন ও সাইড ইয়ার্ন ক্রিলের অবাধ সুতা লোডিং ও ফ্যাব্রিক রোল সরানোর জন্য পর্যাপ্ত করিডোর।"
        : "Standard footprint accommodating 34\" machine body, circular side-creel framework, and fabric roll transport aisles.",
      icon: Compass,
    },
    {
      title: isBn ? "কমপ্রেসড এয়ার ও লিন্ট ক্লিনিং (CFM)" : "Compressed Air & Dust Blowers (CFM)",
      spec: "0.4 – 0.6 m³/min @ 0.6–0.8 MPa Per Machine",
      desc: isBn
        ? "সিলিন্ডার ও নিডল বেডে ডাস্ট জমা প্রতিরোধে স্ক্রু এয়ার কম্প্রেসার ও এয়ার ড্রায়ার সম্বলিত পাইপলাইন সিস্টেম।"
        : "Pneumatic lint blowing fans and oil mist injectors requiring stable screw compressor air with integrated refrigeration dryer.",
      icon: Wind,
    },
    {
      title: isBn ? "বৈদ্যুতিক লোড ও পাওয়ার ডিস্ট্রিবিউশন" : "Electrical Load & Power Sizing",
      spec: "7.5kW – 11kW Connected Load Per Machine",
      desc: isBn
        ? "মেইন মোটর, ইনভার্টার ড্রাইভ, ক্রিল ফ্যান ও টেক-আপ মেকানিজমের সমন্বিত লোড এবং নিরবচ্ছিন্ন ব্যাকআপ জেনারেটর।"
        : "Main drive inverter motor (5.5kW–7.5kW), creel oscillating fans, and take-up servos with AVR voltage stabilization.",
      icon: Zap,
    },
    {
      title: isBn ? "আর্দ্রতা ও তাপমাত্রা নিয়ন্ত্রণ (HVAC)" : "Humidity & Temperature Standards",
      spec: "RH 65% – 70% | Temp 24°C – 28°C",
      desc: isBn
        ? "সুতার আর্দ্রতা বজায় রাখা, স্ট্যাটিক বিদ্যুৎ দূর করা এবং সুতা ছিঁড়ে যাওয়া প্রতিরোধে প্রিসিশন হিউমিডিফিকেশন।"
        : "Constant relative humidity prevents cotton yarn brittleness, fly lint, static friction, and uneven fabric grams.",
      icon: ThermometerSnowflake,
    },
  ];

  const turnkeyServices = [
    {
      title: isBn ? "ফ্যাক্টরি সাইট প্ল্যান ও সিভিল ডিজাইন" : "Factory Architectural & Civil Planning",
      desc: isBn
        ? "মেশিনের ভারবহন ক্ষমতা, আইসোলেটেড ভাইব্রেশন প্যাড এবং সুষম লোডিংয়ের জন্য কংক্রিট ফ্লোর স্পেসিফিকেশন।"
        : "Structural floor load engineering (minimum 1500 kg/m²), anti-vibration neoprene pads, and machine positioning layouts.",
    },
    {
      title: isBn ? "মেশিনারিজ সিলেকশন ও প্রকিউরমেন্ট" : "Machinery Selection & Sourcing Strategy",
      desc: isBn
        ? "সিঙ্গেল জার্সি, ডাবল জার্সি ইন্টারলক ও রিব মেশিনের সঠিক অনুপাত নির্ধারণ ও ব্যাংক এল/সি সহযোগিতা।"
        : "Balancing production ratios between single jersey and double knit units based on target export buyer profiles.",
    },
    {
      title: isBn ? "ইউটিলিটি পাইপিং ও ডাক্টিং" : "Utility Piping, Electrical & Ducting",
      desc: isBn
        ? "কমপ্রেসড এয়ার রিং মেইন, কেবল ট্রে, আর্দিং গ্রাউন্ড এবং সেন্ট্রাল লিন্ট সাকশন ডাক্টিং ইনস্টলেশন।"
        : "Loop piping for uniform air pressure distribution, dedicated equipment grounding, and negative pressure lint extraction.",
    },
    {
      title: isBn ? "টেস্ট রান, ট্রায়াল নিটিং ও ট্রেনিং" : "Trial Runs, Knitting Audits & Training",
      desc: isBn
        ? "গেজ সিলেকশন, ইয়ার্ন টেনশন সেটআপ এবং স্থানীয় অপারেটরদের মেশিন পরিচালনা ও রক্ষণাবেক্ষণের প্রশিক্ষণ।"
        : "Fine-tuning loop tension, digital RPM programming, and training master knitters for zero-defect fabric rolls.",
    },
  ];

  const faqs = [
    {
      q: isBn
        ? "১০টি সার্কুলার নিটিং মেশিনের একটি নতুন কারখানা স্থাপনে কতটুকু ফ্লোর স্পেস দরকার?"
        : "What is the recommended floor area for setting up a 10-machine circular knitting mill?",
      a: isBn
        ? "১০টি সার্কুলার মেশিন, ইয়ার্ন ক্রিল, সুতা ও ফ্যাব্রিক রোল স্টোরেজ এবং ইন্সপেকশন টেবিলের জন্য প্রায় ৩,০০০ থেকে ৪,০০০ স্কয়ার ফিট (sq ft) কলাম-মুক্ত ফ্লোর স্পেস প্রয়োজন হয়।"
        : "A 10-machine knitting unit requires approximately 3,000 to 4,000 sq. ft. of column-free space to accommodate machines, side creels, yarn storage, finished roll aisles, and grey inspection tables.",
    },
    {
      q: isBn
        ? "সার্কুলার নিটিং ফ্লোরে আর্দ্রতা নিয়ন্ত্রণ (Humidification) কেন বাধ্যতামূলক?"
        : "Why is relative humidity (RH) control essential on a circular knitting shop floor?",
      a: isBn
        ? "কটন সুতার আর্দ্রতা সঠিক না থাকলে (৬৫%-৭০% RH না হলে) সুতা ভঙ্গুর হয়ে যায় এবং প্রচুর পরিমাণে সুতা ছিঁড়ে মেশিন বন্ধ হয়ে উৎপাদন মারাত্মকভাবে ব্যাহত হয়।"
        : "Maintaining 65%–70% relative humidity preserves yarn elasticity and moisture regain, drastically cutting yarn breaks, fly waste, and static cling during high-speed knitting.",
    },
    {
      q: isBn
        ? "তাসনীম লিমিটেড কি সম্পূর্ণ প্রজেক্টের টার্নকি কনসালটেন্সি সেবা দেয়?"
        : "Does Tasneem provide turnkey project consultancy from factory design to commissioning?",
      a: isBn
        ? "হ্যাঁ। আমরা ফ্যাক্টরির ফ্লোর ড্রয়িং, মেশিনারিজ সিলেকশন, এল/সি ওপেনিং, চট্টগ্রাম পোর্টে খালাস এবং কারখানায় সফলভাবে ফেব্রিক উৎপাদন শুরু হওয়া পর্যন্ত পূর্ণাঙ্গ সহায়তা দিই।"
        : "Yes, our engineers provide complete end-to-end support: architectural layout drafting, machine procurement via bank L/C, ocean logistics, installation, and operator parameter setup.",
    },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Turnkey Knitwear Factory Setup & Engineering Consultancy",
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
      "Turnkey industrial consultancy for establishing circular knitting and composite knitwear mills in Bangladesh: Floor layout design, electrical calculations, and commissioning.",
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
        name: isBn ? "ফ্যাক্টরি সেটআপ কনসালটেন্সি" : "Factory Setup Consultancy",
        item: `${COMPANY_INFO.domain}/knitwear-factory-setup-consultancy-bangladesh`,
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
              {isBn ? "ফ্যাক্টরি সেটআপ কনসালটেন্সি" : "Factory Setup Consultancy"}
            </span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#800020]/30 border border-[#800020]/50 text-[#F5B5C2] text-xs font-semibold uppercase tracking-wider mb-6">
            <Building2 className="w-3.5 h-3.5" />
            {isBn ? "টার্নকি ইন্ডাস্ট্রিয়াল প্ল্যানিং ও ইঞ্জিনিয়ারিং" : "Turnkey Industrial Planning & Engineering"}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            {isBn
              ? "নিটওয়্যার কারখানা স্থাপন ও মেশিনারিজ কনসালটেন্সি বাংলাদেশ"
              : "Knitwear Factory Setup & Machinery Consultancy Bangladesh"}
          </h1>

          <p className="text-base md:text-xl text-neutral-300 max-w-3xl leading-relaxed mb-8">
            {isBn
              ? "সার্কুলার নিটিং ফ্লোর লেআউট ডিজাইন, বৈদ্যুতিক লোড ক্যালকুলেশন, কমপ্রেসার সিএফএম সিলেকশন, আর্দ্রতা নিয়ন্ত্রণ এবং ট্রায়াল প্রোডাকশন পর্যন্ত পূর্ণাঙ্গ টার্নকি প্রকৌশল পরামর্শ।"
              : "End-to-end engineering consultancy for launching circular knitting and composite textile mills in Bangladesh: Civil layout design, electrical distribution, pneumatic piping, and factory trial audits."}
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#800020] hover:bg-[#990026] text-white font-medium rounded-xl shadow-lg transition-all"
            >
              {isBn ? "প্রজেক্ট কনসালটেশন বুক করুন" : "Book Turnkey Consultation"}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${COMPANY_INFO.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hello Tasneem, I am planning to set up a circular knitting factory in Bangladesh.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-white border border-[#25D366]/40 rounded-xl font-medium transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              {isBn ? "হোয়াটসঅ্যাপ কনসালটেন্ট" : "Chat on WhatsApp"}
            </a>
          </div>
        </div>
      </section>

      {/* Technical Engineering Parameters */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D2D2D] mb-3">
            {isBn ? "নিটিং কারখানা স্থাপনের অপরিহার্য কারিগরি প্যারামিটার" : "Key Engineering Parameters for Circular Knitting Mills"}
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-sm md:text-base">
            {isBn
              ? "সঠিক ফ্লোর প্ল্যানিং ও ইউটিলিটি ডিজাইন উৎপাদন ত্রুটি ও মেশিনের ক্ষয় বহুগুণ কমিয়ে দেয়।"
              : "Meticulous utility planning prevents costly machine breakdowns and ensures maximum machine efficiency."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {engineeringParams.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 md:p-8 rounded-2xl bg-white border border-[#E5E0D8] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-[#800020]/10 flex items-center justify-center text-[#800020] mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-lg md:text-xl text-[#2D2D2D] mb-1">{item.title}</h3>
                <p className="text-xs font-mono text-[#800020] font-semibold mb-3">{item.spec}</p>
                <p className="text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Turnkey Services Breakdown */}
      <section className="py-16 px-4 md:px-8 bg-[#F3EFEA] border-y border-[#E5E0D8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D2D2D] mb-3">
              {isBn ? "আমাদের টার্নকি কনসালটেন্সি সেবা" : "Comprehensive Turnkey Project Support"}
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto text-sm md:text-base">
              {isBn
                ? "শুরু থেকে শেষ পর্যন্ত প্রতিটি ধাপে টেকনিক্যাল এক্সপার্টিজ নিশ্চিত করা।"
                : "Guiding factory owners through layout planning, utility integration, and commercial startup."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {turnkeyServices.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-[#E5E0D8] flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#800020] shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-[#2D2D2D] mb-1">{item.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
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
            {isBn ? "কারখানা স্থাপন নিয়ে সাধারণ জিজ্ঞাসা" : "Factory Setup FAQs"}
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
