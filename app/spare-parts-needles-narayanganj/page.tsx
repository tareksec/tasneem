"use client";

import React from "react";
import Link from "next/link";
import {
  Wrench,
  ShieldCheck,
  Truck,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  Layers,
  CheckCircle2,
  Phone,
  MapPin,
  Clock,
  Package,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { COMPANY_INFO } from "@/lib/constants";
import { FaqAccordionItem } from "@/components/ui/FaqAccordionItem";

export default function SparePartsNarayanganjPage() {
  const { locale } = useTranslation();
  const isBn = locale === "bn";

  const partsCategories = [
    {
      title: isBn ? "জার্মান গ্রোজ-বেকার্ট নিডল (Groz-Beckert Needles)" : "Genuine Groz-Beckert Needles",
      desc: isBn
        ? "ভো নিডল (Vota needles), ল্যাচ নিডল এবং হাই-স্পিড সার্কুলার মেশিনের জন্য দীর্ঘস্থায়ী জার্মান টেকনোলজি।"
        : "Precision latch and high-speed needles ensuring reduced hook breakage, zero loop distortions, and extended lifespan.",
      spec: "Single / Double Jersey 20G–36G",
    },
    {
      title: isBn ? "প্রিসিশন সিঙ্কার ও ট্রিক ওয়ালস (Sinkers)" : "Precision Sinkers & Trick Walls",
      desc: isBn
        ? "কার্বন সারফেস কোটিং সিঙ্কার যা মসৃণ লুপ ক্লিয়ারিং ও সুষম ফ্যাব্রিক স্ট্রাকচার বজায় রাখে।"
        : "Hardened carbon surface coated sinkers preventing yarn cut marks and maintaining uniform knit density.",
      spec: "Kernen / Exact German Profile",
    },
    {
      title: isBn ? "পজিটিভ ইয়ার্ন ফিডার ও বেল্ট (Yarn Feeders)" : "Positive Storage Feeders & Belts",
      desc: isBn
        ? "মেমিঙ্গার (Memminger) স্টাইল ইয়ার্ন স্টোরেজ ফিডার, সিরামিক আইলেট এবং টাইমিং ড্রাইভ বেল্ট।"
        : "Electronic storage yarn feeders and timing belts providing vibration-free, constant-tension thread flow.",
      spec: "Standard MPF / Electronic Stop Motion",
    },
    {
      title: isBn ? "সিএনসি অ্যালয় সিলিন্ডার ও ক্যাম (Cams & Cylinders)" : "CNC Alloy Cams & Spare Cylinders",
      desc: isBn
        ? "জাপানি অ্যালয় স্টিলের নিটিং ক্যাম, টাক ক্যাম ও মিস ক্যাম ব্লক যা উচ্চ তাপে আকৃতি হারায় না।"
        : "Heat-treated Japanese alloy steel knit, tuck, and miss cam blocks with replacement cylinder segments.",
      spec: "24G, 28G, 32G Interchangeable",
    },
    {
      title: isBn ? "অটোমেটিক লুব্রিকেটর ও নজেল (Lubrication)" : "Auto Lubricators & Mist Nozzles",
      desc: isBn
        ? "ইউনিওয়েভ (Uniwave) স্টাইল ইলেকট্রনিক অয়েল মিস্টার, প্রেসার গেজ, পাইপ এবং ড্রপলেস নজেল।"
        : "Electronic pulsed micro-mist oilers, pressure control valves, and non-drip needle lubrication spray nozzles.",
      spec: "Uniwave / Pulsar Compatible",
    },
    {
      title: isBn ? "ইনভার্টার, মোটর ও কন্ট্রোল প্যানেল" : "Inverter Drives & Digital Panels",
      desc: isBn
        ? "ডেল্টা / ইনোভ্যান্স ইনভার্টার ড্রাইভ, ৩-ফেজ ড্রাইভ মোটর এবং ডিজিটাল টাচস্ক্রিন ডিসপ্লে।"
        : "Delta & Inovance vector AC inverter drives, 3-phase induction motors, and digital touch HMI controllers.",
      spec: "5.5kW / 7.5kW Heavy-Duty",
    },
  ];

  const deliveryZones = [
    {
      zone: isBn ? "বিসিক শিল্পনগরী ও শাসনগাঁও" : "BSCIC Industrial Estate & Sasongaon",
      time: isBn ? "২ ঘণ্টার মধ্যে সরাসরি ফ্যাক্টরি ডেলিভারি" : "Within 2 Hours Factory Delivery",
    },
    {
      zone: isBn ? "ফতুল্লা, এনায়েতনগর ও শিবু মার্কেট" : "Fatullah, Enayetnagar & Shibu Market",
      time: isBn ? "সেম-ডে এক্সপ্রেস মোটরবাইক সার্ভিস" : "Same-Day Dispatch & Delivery",
    },
    {
      zone: isBn ? "সিদ্ধিরগঞ্জ, কাঁচপুর ও আদমজী ইপিজেড" : "Siddhirganj, Kanchpur & Adamjee EPZ",
      time: isBn ? "দৈনিক শিডিউল ডেলিভারি" : "Daily Scheduled Logistics",
    },
    {
      zone: isBn ? "গাজীপুর, টঙ্গী, কোনাবাড়ী ও ভালুকা" : "Gazipur, Tongi, Konabari & Bhaluka",
      time: isBn ? "২৪ ঘণ্টার মধ্যে কুরিয়ার ও পরিবহন নিশ্চিত" : "Next-Day Delivery via Factory Transport",
    },
  ];

  const faqs = [
    {
      q: isBn
        ? "নারায়ণগঞ্জে আপনাদের কাছে কি আসল গ্রোজ-বেকার্ট (Groz-Beckert) নিডল পাওয়া যায়?"
        : "Do you supply 100% genuine German Groz-Beckert needles in Narayanganj?",
      a: isBn
        ? "হ্যাঁ। আমরা সরাসরি আসল Groz-Beckert জার্মানির অথেনটিক নিডল সরবরাহ করি। প্রতিটি প্যাকেটে অরিজিনাল সিকিউরিটি হলোগ্রাম ও বারকোড যাচাইযোগ্য।"
        : "Yes. We stock authentic German Groz-Beckert needles with verifiable security seals and factory batch codes for 24G, 28G, and 32G circular cylinders.",
    },
    {
      q: isBn
        ? "ফ্যাক্টরিতে ইমার্জেন্সি ব্রেকডাউনের ক্ষেত্রে কতটা দ্রুত পার্টস পাওয়া যায়?"
        : "How fast can you deliver spare parts during an emergency factory breakdown?",
      a: isBn
        ? "নারায়ণগঞ্জ বিসিক, ফতুল্লা ও পঞ্চবটী বেল্টের কারখানাগুলোর জন্য আমরা একই দিনে ২ থেকে ৪ ঘণ্টার মধ্যে জরুরি স্পেয়ার্স সরাসরি ফ্যাক্টরিতে পৌঁছে দিই।"
        : "For knitting mills in Narayanganj BSCIC, Fatullah, and Panchabati, our local dispatch riders deliver critical needles, sinkers, and sensors within 2 to 4 hours.",
    },
    {
      q: isBn
        ? "মেশিনের সিলিন্ডার পরিবর্তনের জন্য কি টেকনিশিয়ান সহায়তা পাওয়া যায়?"
        : "Do you provide technical services for circular machine cylinder gauge changes?",
      a: isBn
        ? "হ্যাঁ। গেজ কনভার্সন (যেমন ২৪G থেকে ২৮G), ডায়াল-সিলিন্ডার অ্যালাইনমেন্ট এবং নতুন ক্যাম বক্স ইন্সটলেশনে আমাদের দক্ষ টেকনিশিয়ান টিম রয়েছে।"
        : "Yes, our experienced knitting mechanics assist with gauge conversions, dial-cylinder center alignments, and cam box overhauls right on your factory floor.",
    },
  ];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Tasneem Circular Knitting Spare Parts Hub",
    image: `${COMPANY_INFO.domain}/tasneem-logo.png`,
    telephone: COMPANY_INFO.phone,
    email: COMPANY_INFO.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_INFO.address,
      addressLocality: "Narayanganj",
      addressRegion: "Dhaka Division",
      postalCode: "1400",
      addressCountry: "BD",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "23.6238",
      longitude: "90.5000",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:30",
        closes: "19:00",
      },
    ],
    priceRange: "$$",
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
        name: isBn ? "স্পেয়ার পার্টস ও নিডল" : "Spare Parts & Needles Hub",
        item: `${COMPANY_INFO.domain}/spare-parts-needles-narayanganj`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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
              {isBn ? "স্পেয়ার পার্টস ও নিডল হাব" : "Spare Parts Hub Narayanganj"}
            </span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#800020]/30 border border-[#800020]/50 text-[#F5B5C2] text-xs font-semibold uppercase tracking-wider mb-6">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            {isBn ? "নারায়ণগঞ্জ বিসিক ও হোসিয়ারি বেল্ট সার্ভিস" : "Narayanganj BSCIC & Knitwear Hub Ready Stock"}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            {isBn
              ? "সার্কুলার নিটিং মেশিন স্পেয়ার পার্টস ও গ্রোজ-বেকার্ট নিডল নারায়ণগঞ্জ"
              : "Circular Knitting Spare Parts & Groz-Beckert Needles Narayanganj"}
          </h1>

          <p className="text-base md:text-xl text-neutral-300 max-w-3xl leading-relaxed mb-8">
            {isBn
              ? "নারায়ণগঞ্জ এবং গাজীপুরের নিটিং কারখানার জন্য অরিজিনাল গ্রোজ-বেকার্ট নিডল, প্রিসিশন সিঙ্কার, মেমিঙ্গার ইয়ার্ন ফিডার, সিরামিক আইলেট ও ইনভার্টার ড্রাইভের সার্বক্ষণিক রেডি স্টক।"
              : "Genuine German Groz-Beckert needles, high-alloy sinkers, yarn storage positive feeders, and replacement inverter drives with same-day emergency dispatch across Narayanganj & Gazipur industrial zones."}
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#800020] hover:bg-[#990026] text-white font-medium rounded-xl shadow-lg transition-all"
            >
              <Phone className="w-4 h-4" />
              {isBn ? "জরুরি পার্টসের জন্য কল দিন" : "Call Emergency Parts Desk"}
            </a>
            <a
              href={`https://wa.me/${COMPANY_INFO.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hello Tasneem, I need urgent circular knitting spare parts/needles in Narayanganj.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-white border border-[#25D366]/40 rounded-xl font-medium transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              {isBn ? "পার্টসের তালিকা পাঠান" : "Send Parts List on WhatsApp"}
            </a>
          </div>
        </div>
      </section>

      {/* Parts Categories Grid */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D2D2D] mb-3">
            {isBn ? "সার্কুলার মেশিনের প্রিমিয়াম পার্টস ক্যাটালগ" : "Industrial Spare Parts Catalogue"}
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-sm md:text-base">
            {isBn
              ? "উৎপাদনে কোনো বিরতি না দিয়ে নিরবচ্ছিন্ন নিটিং বজায় রাখতে সঠিক স্পেয়ার পার্টস নির্বাচন করুন।"
              : "Minimize factory downtime with factory-tested, OEM-certified mechanical and electronic components."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partsCategories.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#E5E0D8] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-lg bg-[#800020]/10 flex items-center justify-center text-[#800020] mb-4">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg text-[#2D2D2D] mb-1">{item.title}</h3>
              <p className="text-xs font-mono text-[#800020] font-semibold mb-2">{item.spec}</p>
              <p className="text-xs text-neutral-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fast Delivery Hub Banner */}
      <section className="py-16 px-4 md:px-8 bg-[#F3EFEA] border-y border-[#E5E0D8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D2D2D] mb-3">
              {isBn ? "নারায়ণগঞ্জ ও সংলগ্ন অঞ্চলের দ্রুত ডেলিভারি জোন" : "Fast Dispatch Zones in Narayanganj & Industrial Hubs"}
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto text-sm md:text-base">
              {isBn
                ? "আমাদের লোকাল ওয়্যারহাউস থেকে সরাসরি আপনার ফ্যাক্টরি গেটে পৌঁছে দেয়া হয়।"
                : "Strategically located inventory dispatching orders directly to factory floors."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliveryZones.map((z, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-[#E5E0D8] text-center">
                <Clock className="w-8 h-8 text-[#800020] mx-auto mb-3" />
                <h3 className="font-semibold text-base text-[#2D2D2D] mb-2">{z.zone}</h3>
                <p className="text-xs text-emerald-600 font-medium">{z.time}</p>
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
            {isBn ? "স্পেয়ার পার্টস ও নিডল সম্পর্কিত সাধারণ জিজ্ঞাসা" : "Spare Parts & Needles FAQs"}
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
