"use client";

import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageSquare,
  ArrowUpRight,
  Truck,
  Award,
  Settings,
  HelpCircle,
} from "lucide-react";
import { ProcessWaveSection, PROCESS_STEPS } from "@/components/how-it-works/ProcessWaveSection";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { COMPANY_INFO } from "@/lib/constants";

export default function HowItWorksPage() {
  const { locale } = useTranslation();

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name:
      locale === "bn"
        ? "বাংলাদেশে সার্কুলার নিটিং মেশিন আমদানির নিয়ম ও ধাপসমূহ"
        : "How to Import Industrial Circular Knitting Machinery in Bangladesh",
    description:
      locale === "bn"
        ? "চীন ও তাইওয়ান থেকে সরাসরি সার্কুলার নিটিং মেশিন আমদানি, L/C খোলা, প্রি-শিপমেন্ট ইন্সপেকশন এবং ফ্যাক্টরি কমিশনিংয়ের পূর্ণাঙ্গ ধাপসমূহ।"
        : "End-to-end guide on importing industrial circular knitting machines to Bangladesh under CFR Chattogram terms with bank L/C and turnkey commissioning.",
    image: `${COMPANY_INFO.domain}/logo/og-image.png`,
    totalTime: "P45D",
    step: PROCESS_STEPS.map((step, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: locale === "bn" ? step.titleBn : step.titleEn,
      text: locale === "bn" ? step.descBn : step.descEn,
      url: `${COMPANY_INFO.domain}/how-it-works#${step.id}`,
    })),
  };

  const guarantees = [
    {
      icon: ShieldCheck,
      titleEn: "100% Pre-Shipment Inspection",
      titleBn: "শিপমেন্টের আগে ১০০% কোয়ালিটি চেক",
      descEn: "Third-party accredited engineers (SGS, Intertek, or BV) inspect every machine component, cam tolerance, and test-run before container packing.",
      descBn: "কন্টেইনারে লোড করার আগেই SGS, Intertek বা Bureau Veritas দিয়ে প্রতিটি পার্টস, Cam টলারেন্স ও টেস্ট-রান নিখুঁতভাবে যাচাই করে নেওয়া হয়।",
    },
    {
      icon: Truck,
      titleEn: "Direct CFR Chattogram Pricing",
      titleBn: "সরাসরি ফ্যাক্টরি CFR রেট, কোনো লুকানো খরচ নেই",
      descEn: "Zero local intermediary margins. We procure directly from primary machinery manufacturers in Taiwan and mainland China under bank-to-bank L/C.",
      descBn: "মাঝখানে কোনো দালাল বা বাড়তি কমিশন নেই। চীন ও তাইওয়ানের মূল কারখানা থেকে সরাসরি ব্যাংক-টু-ব্যাংক L/C-তে স্বচ্ছ CFR Chattogram রেট নিশ্চিত করি।",
    },
    {
      icon: Settings,
      titleEn: "Factory-Floor Installation & Commissioning",
      titleBn: "আপনার মিলে ইনস্টলেশন ও অন-সাইট কমিশনিং",
      descEn: "Our local Narayanganj engineering team handles precision leveling, creel & oil mist setup, trial knit fabric testing, and operator training.",
      descBn: "নারায়ণগঞ্জের অভিজ্ঞ ইঞ্জিনিয়াররা সরাসরি আপনার মিলে গিয়ে মেশিন লেভেলিং, Creel ও Oil Mist সেটআপ করে কাপড় নিটিং করে বুঝিয়ে দেবেন।",
    },
    {
      icon: Award,
      titleEn: "Genuine Spares & Lifetime Support",
      titleBn: "আসল স্পেয়ার্স ও সার্বক্ষণিক টেকনিক্যাল সাপোর্ট",
      descEn: "Immediate local availability of critical needles, sinkers, cam sections, and electronic inverters from our Narayanganj BSCIC hub.",
      descBn: "প্রয়োজনীয় Needle, Sinker, Cam এবং Inverter সবসময় আমাদের নারায়ণগঞ্জ বিসিক ওয়্যারহাউসে স্টক থাকে, যাতে মিলের প্রোডাকশন এক মুহূর্তও না থামে।",
    },
  ];

  return (
    <div className="min-h-screen bg-engineering-grid text-[#2D2D2D] selection:bg-[#800020] selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      {/* 1. Main Process Section with User Reference Wave Design & Animations */}
      <ProcessWaveSection />

      {/* 2. Core Sourcing Guarantees Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="sr-only">{locale === "bn" ? "আমাদের কাজের অঙ্গীকার" : "Our Institutional Commitments"}</span>
          <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight">
            {locale === "bn" ? "কেন তাসনীমের সাথে নিশ্চিন্তে মেশিনারি আমদানি করবেন?" : "Risk-Free Procurement Standards"}
            <span className="text-[#800020]">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((g, i) => (
            <div
              key={i}
              className="bg-white border border-[#E2E4E9] rounded-3xl p-6 sm:p-7 shadow-[0_12px_35px_-10px_rgba(0,0,0,0.06)] hover:shadow-xl hover:border-[#D8A4AF] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-center text-[#800020] mb-5 group-hover:scale-110 group-hover:border-[#D8A4AF] group-hover:bg-[#FDF2F4] transition-all">
                  <g.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-neutral-900 mb-2 group-hover:text-[#800020] transition-colors leading-snug">
                  {locale === "bn" ? g.titleBn : g.titleEn}
                </h3>
                <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed">
                  {locale === "bn" ? g.descBn : g.descEn}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>0{i + 1} / 04</span>
                <span className="text-[#800020] font-bold">VERIFIED</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Ready to Begin Step 01? — Direct Action Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="relative border border-[#E2E4E9] bg-gradient-to-br from-white via-[#FCFCFD] to-[#FDF2F4]/40 rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 lg:p-14 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Subtle Ambient Background Watermark */}
          <div className="absolute right-0 bottom-0 text-[180px] font-mono font-black text-neutral-900/[0.02] select-none pointer-events-none leading-none -mr-8 -mb-10">
            CFR
          </div>

          <div className="relative z-10 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100/80 text-red-700 text-xs font-mono font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-[#800020] animate-ping" />
              <span>{locale === "bn" ? "শুরু হোক আপনার প্রথম ধাপ" : "START WITH STEP 01"}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-snug mb-3">
              {locale === "bn"
                ? "আপনার মিলের জন্য সেরা মেশিনের কোটেশন নিন"
                : "Ready to Configure Your Next Machine?"}
            </h2>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {locale === "bn"
                ? "মডেল, Cylinder সাইজ (30\"–44\"), Gauge (14G–44G) আর আপনার প্রোডাকশন প্ল্যান জানালেই আমরা সরাসরি ফ্যাক্টরি CFR Proforma তৈরি করে দেব। আমাদের টিম সব সময় আপনার পাশে আছে।"
                : "Submit your fabric specifications, cylinder diameter, and target gauge to receive an official CFR Chattogram proforma breakdown and delivery schedule."}
            </p>

            {/* Quick Contact Badges */}
            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-neutral-700">
              <a
                href="tel:+8801887683333"
                className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-neutral-200 hover:border-red-300 transition-colors shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#800020]" />
                <span>Hotline: +880 1887-683333</span>
              </a>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-neutral-200 hover:border-emerald-300 transition-colors shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp: +880 1711-110516</span>
              </a>
            </div>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href="/quote"
              className="w-full sm:w-auto bg-[#800020] hover:bg-[#5A0017] active:scale-[0.98] text-white font-bold text-sm sm:base px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:shadow-[#800020]/25 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-2"
            >
              <span>{locale === "bn" ? "ফ্রি কোটেশন চেয়ে পাঠান" : "Request Technical Quotation"}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto bg-white hover:bg-neutral-50 active:scale-[0.98] text-neutral-900 font-bold text-sm sm:text-base px-7 py-4 rounded-full border border-neutral-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:border-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-2"
            >
              <HelpCircle className="w-4 h-4 text-neutral-500" />
              <span>{locale === "bn" ? "পরামর্শের জন্য কথা বলুন" : "Consult Specialist"}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
