"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  Layers,
  CheckCircle2,
  Phone,
  Cpu,
  Activity,
  Zap,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { COMPANY_INFO } from "@/lib/constants";
import { FaqAccordionItem } from "@/components/ui/FaqAccordionItem";

export default function SingleJerseyMachineSourcingPage() {
  const { locale } = useTranslation();
  const isBn = locale === "bn";

  const techSpecs = [
    {
      feature: isBn ? "সিলিন্ডার ব্যাস ও ডায়ামিটার" : "Cylinder Diameter Range",
      spec: "30\", 32\", 34\" (Optional 26\"–40\")",
      desc: isBn ? "স্ট্যান্ডার্ড এক্সপোর্ট টি-শার্ট ও টিউবুলার ফ্যাব্রিক কাটিংয়ের জন্য।" : "Engineered for optimal export body sizes and fabric widths.",
    },
    {
      feature: isBn ? "গেজ সক্ষমতা (Gauge Options)" : "Machine Gauge Capabilities",
      spec: "20G, 24G, 28G, 32G, 36G, 40G",
      desc: isBn ? "২৮G ও ২৪G বাংলাদেশের নিট এক্সপোর্ট গার্মেন্টস শিল্পে সবচেয়ে বহুল ব্যবহৃত।" : "28G is the benchmark for export single jersey, 24G for heavier weights.",
    },
    {
      feature: isBn ? "ফিডার সংখ্যা ও ঘনত্ব" : "Feeder System Density",
      spec: "90F – 108F (3.0 – 3.2 Feeders / Inch)",
      desc: isBn ? "উচ্চ ফিডার ডেনসিটি প্রতি মিনিটে সর্বোচ্চ আউটপুট ও ধারাবাহিক টেনশন দেয়।" : "Maximum throughput per minute with uniform stitch loop tension.",
    },
    {
      feature: isBn ? "ক্যাম ট্র্যাক ও কনভার্সন" : "Cam Track Architecture",
      spec: "4-Track Cam Box (Knit, Tuck, Miss)",
      desc: isBn ? "৪-ট্র্যাক কনভার্টেবিলিটি দিয়ে সাধারণ জার্সি থেকে পিক ও ফ্লিস সহজেই বোনা যায়।" : "Flexible 4-track layout allows fast changeovers between jersey, pique, and fleece.",
    },
    {
      feature: isBn ? "লাইক্রা / স্প্যানডেক্স এটাচমেন্ট" : "Lycra Spandex Feeders",
      spec: "Memminger MER or Ceramic Negative Units",
      desc: isBn ? "প্রিসিশন ইলাস্টেন ফিডিং যা ফ্যাব্রিকের সংকোচন ও টান প্রতিরোধ করে।" : "Zero-tension elastane feeding preventing fabric bowing and edge curling.",
    },
    {
      feature: isBn ? "টেক-আপ ও স্লিটার রোলার" : "Take-Down & Slitter System",
      spec: "Tubular Winder or Open-Width Slitter",
      desc: isBn ? "ইলেকট্রনিক সিঙ্ক ড্রাইভ সহ মসৃণ অটো-কাটিং রোলার যা ক্রিস প্রতিরোধ করে।" : "Motorized open-width slitter preventing center crease marks during batching.",
    },
  ];

  const fabricTypes = [
    {
      title: isBn ? "প্লেন সিঙ্গেল জার্সি (Plain Single Jersey)" : "Export Plain Single Jersey",
      desc: isBn
        ? "১০০% কটন বা পলিয়েস্টার মিশ্রিত লাইটওয়েট টি-শার্ট ও আন্ডারগার্মেন্টস ফেব্রিক।"
        : "Foundational fabric for international retail tees, lightweight polos, and underwear (120–180 GSM).",
    },
    {
      title: isBn ? "লাইক্রা কটন সিঙ্গেল জার্সি (Lycra Stretch Jersey)" : "Cotton-Lycra Stretch Single Jersey",
      desc: isBn
        ? "৪-ওয়ে ও ২-ওয়ে স্ট্রেচযুক্ত প্রিমিয়াম লেডিস টপস, অ্যাক্টিভওয়্যার ও স্পোর্টসওয়্যার।"
        : "95/5 or 90/10 cotton-spandex blends delivering elasticity and shape retention for athletic and casual wear.",
    },
    {
      title: isBn ? "সিঙ্গেল ও ডাবল পিক (Pique / Lacoste)" : "Single & Double Pique (Lacoste Knit)",
      desc: isBn
        ? "এক্সপোর্ট পোলো শার্টের টেক্সচারযুক্ত ক্লাসিক হানিকম্ব ও পিক ফেব্রিক।"
        : "Textured honeycomb and waffle weaves engineered specifically for corporate and luxury polo shirts.",
    },
    {
      title: isBn ? "২-থ্রেড ফ্লিস ও ফ্রেঞ্চ টেরি (French Terry)" : "2-Thread Inlay Fleece & French Terry",
      desc: isBn
        ? "হালকা উইন্টার হুডি, সোয়েটশার্ট ও ট্রাউজারের জন্য লুপ ব্যাক ফেব্রিক।"
        : "Unbrushed or brushed loop-back structures designed for summer hoodies, sweatpants, and kids garments.",
    },
  ];

  const faqs = [
    {
      q: isBn
        ? "সিঙ্গেল জার্সি সার্কুলার নিটিং মেশিনের গড় উৎপাদন ক্ষমতা কত?"
        : "What is the average 24-hour output of a high-speed single jersey machine?",
      a: isBn
        ? "একটি ৩৪\" ২৮G ১০২ ফিডারের সিঙ্গেল জার্সি মেশিনে কাউন্ট অনুযায়ী (যেমন ৩০s বা ৪০s কটন ইয়ার্ন) ২৪ ঘণ্টায় গড়ে ৪০০ থেকে ৫৫০ কেজি স্ট্যান্ডার্ড এক্সপোর্ট সিঙ্গেল জার্সি ফ্যাব্রিক উৎপাদন সম্ভব।"
        : "A 34-inch 28G 102-feeder machine running 30s combed cotton typically yields 400 to 550 kg of export-grade jersey fabric per 24 hours at standard factory RPM.",
    },
    {
      q: isBn
        ? "টিউবুলার বনাম ওপেন-উইডথ (Open-Width) সিঙ্গেল জার্সি মেশিনের পার্থক্য কী?"
        : "What is the difference between tubular take-down and open-width slitting circular machines?",
      a: isBn
        ? "টিউবুলার মেশিনে গোল পাইপের মতো রোল বের হয়, যাতে ফোল্ডিং লাইন থাকে। অন্যদিকে ওপেন-উইডথ মেশিনে স্বয়ংক্রিয়ভাবে ফ্যাব্রিক কেটে সমতল রোলে পেঁচানো হয়, ফলে ডাইং ও ফিনিশিংয়ে মাঝখানের ক্রিস দাগ (crease mark) পুরোপুরি দূর হয়।"
        : "Tubular winders produce continuous round rolls that form center fold creases. Open-width slitting systems automatically cut the cylinder fabric during rotation and roll it flat, eliminating crease marks for high-end dyeing.",
    },
    {
      q: isBn
        ? "তাসনীম লিমিটেড কি সিঙ্গেল জার্সি মেশিনের জন্য গ্রোজ-বেকার্ট নিডল ও সিঙ্কার সরবরাহ করে?"
        : "Does Tasneem supply Groz-Beckert needles, sinkers, and positive feeders in Bangladesh?",
      a: isBn
        ? "হ্যাঁ। আমাদের নারায়ণগঞ্জের সেন্ট্রাল স্টোরে জার্মানির Groz-Beckert নিডল, কার্বন কোটিং সিঙ্কার, সিরামিক সুতা গাইড এবং ড্রাইভ বেল্ট সবসময় রেডি স্টক থাকে।"
        : "Yes, our central warehouse in Narayanganj maintains inventory of genuine German Groz-Beckert needles, precision sinkers, ceramic guides, and inverter electronics.",
    },
    {
      q: isBn
        ? "আমদানির ক্ষেত্রে শিপিং টার্মস ও সময়সীমা কেমন থাকে?"
        : "What are the shipping lead times and port clearance terms under CFR Chattogram?",
      a: isBn
        ? "ব্যাংক L/C কনফার্মেশন ও ফ্যাক্টরি প্রোডাকশনের পর শিপমেন্ট সাধারণত ৩০ থেকে ৪৫ দিনের মধ্যে চট্টগ্রাম বন্দরে পৌঁছে যায়। এর আগে থার্ড পার্টি প্রি-শিপমেন্ট ইন্সপেকশন সম্পন্ন করা হয়।"
        : "Standard manufacturing and ocean transit to Chattogram Port takes approximately 30 to 45 days from confirmed irrevocable bank L/C, backed by pre-shipment quality audit.",
    },
  ];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "High-Speed 4-Track Single Jersey Circular Knitting Machine",
    image: `${COMPANY_INFO.domain}/tasneem-logo.png`,
    description:
      "High-speed 4-track industrial single jersey circular knitting machine for export plain jersey, lycra, pique, and fleece fabrics. 30 to 34 inch cylinder diameter, 20G to 36G gauges.",
    brand: {
      "@type": "Brand",
      name: "Tasneem Knit Machinery",
    },
    category: "Textile Machinery > Circular Knitting Machines",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "18000",
      highPrice: "28000",
      offerCount: "15",
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
        name: isBn ? "মেশিনারি" : "Machinery",
        item: `${COMPANY_INFO.domain}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: isBn ? "সিঙ্গেল জার্সি সার্কুলার মেশিন" : "Single Jersey Knitting Machines",
        item: `${COMPANY_INFO.domain}/single-jersey-circular-knitting-machine-sourcing`,
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
            <Link href="/products" className="hover:underline opacity-80">
              {isBn ? "মেশিনারি" : "Machinery"}
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">
              {isBn ? "সিঙ্গেল জার্সি সোর্সিং" : "Single Jersey Sourcing"}
            </span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#800020]/30 border border-[#800020]/50 text-[#F5B5C2] text-xs font-semibold uppercase tracking-wider mb-6">
            <Zap className="w-3.5 h-3.5" />
            {isBn ? "হাই-স্পিড ৪-ট্র্যাক এক্সপোর্ট টেকনোলজি" : "High-Speed 4-Track Export Engineering"}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            {isBn
              ? "সিঙ্গেল জার্সি সার্কুলার নিটিং মেশিন সোর্সিং ও আমদানি বাংলাদেশ"
              : "Single Jersey Circular Knitting Machine Sourcing Bangladesh"}
          </h1>

          <p className="text-base md:text-xl text-neutral-300 max-w-3xl leading-relaxed mb-8">
            {isBn
              ? "টি-শার্ট, পোলো পিক, লাইক্রা জার্সি এবং ২-থ্রেড ফ্লিস ফ্যাব্রিকের জন্য আধুনিক ৪-ট্র্যাক সিঙ্গেল জার্সি সার্কুলার নিটিং মেশিন। সরাসরি ম্যানুফ্যাকচারার থেকে CFR চট্টগ্রাম আমদানিতে সেরা মূল্য ও নারায়ণগঞ্জে টেকনিক্যাল সাপোর্ট।"
              : "Factory-direct sourcing of 4-track high-speed single jersey circular knitting machines. Equipped with lycra elastane attachments, open-width slitters, and genuine German needle beds under transparent bank L/C terms."}
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#800020] hover:bg-[#990026] text-white font-medium rounded-xl shadow-lg transition-all"
            >
              {isBn ? "মেশিনের স্পেসিফিকেশন চান" : "Request Machine Specifications"}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${COMPANY_INFO.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hello Tasneem, I need details on Single Jersey Circular Knitting Machines.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-white border border-[#25D366]/40 rounded-xl font-medium transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              {isBn ? "হোয়াটসঅ্যাপে টেকনিক্যাল টিম" : "WhatsApp Technical Desk"}
            </a>
          </div>
        </div>
      </section>

      {/* Technical Specifications Matrix */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D2D2D] mb-3">
            {isBn ? "সিঙ্গেল জার্সি মেশিনের কারিগরি বৈশিষ্ট্য" : "Single Jersey Technical Specifications"}
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-sm md:text-base">
            {isBn
              ? "সর্বোচ্চ আরপিএম, কম বিদ্যুৎ খরচ ও সুষম নিটিং টেনশন নিশ্চিত করতে সিএনসি প্রিসিশন কম্পোনেন্ট।"
              : "Precision CNC milled components engineered for continuous high-speed rotation and low energy consumption."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techSpecs.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#E5E0D8] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-lg bg-[#800020]/10 flex items-center justify-center text-[#800020] mb-4 font-bold text-sm">
                0{idx + 1}
              </div>
              <h3 className="font-semibold text-lg text-[#2D2D2D] mb-1">{item.feature}</h3>
              <p className="text-sm font-mono text-[#800020] font-semibold mb-2">{item.spec}</p>
              <p className="text-xs text-neutral-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fabric Types Grid */}
      <section className="py-16 px-4 md:px-8 bg-[#F3EFEA] border-y border-[#E5E0D8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D2D2D] mb-3">
              {isBn ? "তৈরিযোগ্য এক্সপোর্ট কোয়ালিটি ফ্যাব্রিক" : "Compatible Export Fabric Categories"}
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto text-sm md:text-base">
              {isBn
                ? "সহজেই ক্যাম সেটিং পরিবর্তন করে বিভিন্ন ধরনের নিট ফেব্রিক উৎপাদন করা সম্ভব।"
                : "Rapid cam transformation enabling single jersey, pique, and fleece production on a single machine body."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fabricTypes.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-[#E5E0D8] flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#800020] shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-[#2D2D2D] mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sourcing Advantages Card */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-[#2D2D2D] to-[#1c1917] text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-4">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {isBn ? "প্রস্তুতকারক থেকে সরাসরি আমদানি" : "Zero Middleman Factory Import"}
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              {isBn
                ? "উচ্চগতির সিঙ্গেল জার্সি মেশিনে সর্বোচ্চ উৎপাদনশীলতা"
                : "High Output Yield with Low Needle Wear and High Energy Efficiency"}
            </h2>
            <p className="text-neutral-300 text-sm md:text-base leading-relaxed mb-8">
              {isBn
                ? "আমাদের সরবরাহকৃত প্রতিটি সিঙ্গেল জার্সি মেশিন আন্তর্জাতিক রপ্তানি মান পূরণ করে। অটোমেটিক অয়েলিং ও ডাস্ট ক্লিনিং ফ্যান দীর্ঘ মেয়াদে নিডল ক্ষয় ও ফ্যাব্রিক হোল প্রতিরোধ করে।"
                : "Equipped with automated oil mist lubrication, dynamic top/bottom lint blowers, and precision Japanese alloy cam tracks to ensure minimum needle replacement and defect-free fabric."}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-6 py-3 bg-[#800020] hover:bg-[#990026] text-white font-medium rounded-xl text-sm transition-all"
              >
                {isBn ? "ইনস্টলেশন ও কোটেশনের জন্য যোগাযোগ" : "Request Installation Consultation"}
              </Link>
              <Link
                href="/double-jersey-circular-knitting-machine-sourcing"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl text-sm transition-all"
              >
                {isBn ? "ডাবল জার্সি মেশিন দেখুন" : "Explore Double Jersey Machines"}
              </Link>
            </div>
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
            {isBn ? "সিঙ্গেল জার্সি মেশিন সোর্সিং সংক্রান্ত সাধারণ প্রশ্ন" : "Single Jersey Sourcing FAQs"}
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
