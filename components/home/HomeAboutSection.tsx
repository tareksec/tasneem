"use client";

import Link from "next/link";
import {
  ShieldCheck,
  Factory,
  Ship,
  Wrench,
  ArrowUpRight,
  Phone,
  CheckCircle2,
  Sparkles,
  Award,
} from "lucide-react";
import { MotionSection, SlideIn } from "@/components/ui/MotionWrapper";
import { LiteYouTubeEmbed } from "@/components/ui/LiteYouTubeEmbed";
import { COMPANY_INFO } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export function HomeAboutSection() {
  const { locale } = useTranslation();
  const isBn = locale === "bn";

  const pillars = [
    {
      icon: Factory,
      title: isBn ? "সরাসরি প্রস্তুতকারক কারখানা" : "Direct Factory Sourcing",
      desc: isBn
        ? "কোনো মধ্যস্বত্বভোগী ছাড়া সরাসরি আন্তর্জাতিক প্রস্তুতকারক থেকে আমদানি ও এল/সি সহায়তা।"
        : "Direct import from verified builders with zero intermediary markups and transparent L/C terms.",
    },
    {
      icon: Ship,
      title: isBn ? "সিএফআর চট্টগ্রাম পোর্ট" : "Turnkey CFR Sea Shipping",
      desc: isBn
        ? "চট্টগ্রাম বন্দর পর্যন্ত কন্টেইনার সমুদ্র পরিবহন, বি/এল ট্র্যাকিং ও কাস্টমস ডকুমেন্টেশন।"
        : "End-to-end containerized sea shipping, bill of lading tracking, and customs documentation.",
    },
    {
      icon: ShieldCheck,
      title: isBn ? "১ বছরের ওয়ারেন্টি ও পার্টস" : "1-Year Warranty & Spares",
      desc: isBn
        ? "আন্তর্জাতিক প্রস্তুতকারক ওয়ারেন্টি ও বিসিক নারায়ণগঞ্জ ওয়্যারহাউস থেকে দ্রুত স্পেয়ার পার্টস।"
        : "International OEM warranty backed by local warehouse spare parts in BSCIC, Narayanganj.",
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 bg-[#F8F9FA] border-b border-slate-200/80 overflow-hidden text-slate-800">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 3-Pillar Value Grid (Inspired by Reference UI Top Row) */}
        <MotionSection className="mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#800020]/10 border border-[#800020]/20 text-xs font-bold text-[#800020] mb-5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#800020]" />
            <span>
              {isBn ? "প্রস্তুতকারক ও প্রযুক্তিগত নেতৃত্ব" : "Leadership & Direct Import"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 pt-2 border-t border-slate-200/80">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="space-y-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#FDF2F4] border border-[#D8A4AF]/40 text-[#800020] flex items-center justify-center shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </MotionSection>

        {/* Main Editorial Hero Section (Inspired by Reference UI Screenshot 2 & 3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Asymmetric Curved Video/Photo Frame with Circular Rotating Stamp */}
          <div className="lg:col-span-6 relative">
            <SlideIn direction="left" distance={24} duration={0.45}>
              {/* Asymmetric Curved Container (rounded-3xl with large custom curve) */}
              <div className="relative rounded-[32px] rounded-br-[90px] sm:rounded-br-[120px] overflow-hidden border border-slate-200/90 bg-white p-3 sm:p-4 shadow-2xl shadow-slate-900/6">
                {/* Top Video Stream Bar */}
                <div className="flex items-center justify-between px-3 py-2 mb-2 border-b border-slate-100 text-xs font-semibold text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#800020]" />
                    </span>
                    <span className="text-slate-900 font-bold">
                      {isBn ? "ভিডিও পরিদর্শন ও বক্তব্য" : "Factory Stream & Owner Inspection"}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    1080p HD
                  </span>
                </div>

                {/* 16:9 Video Container with Curved Inner Clip */}
                <div className="overflow-hidden rounded-2xl rounded-br-[70px] sm:rounded-br-[95px] border border-slate-200/80 shadow-inner">
                  <LiteYouTubeEmbed
                    videoId="ONTd4X4M-Vo"
                    title="Md Mamunur Rashid - Owner Introduction & Factory Operations | Tasneem Knit Industry"
                  />
                </div>

                {/* Bottom Verification Seal Strip */}
                <div className="mt-3 px-3 py-1 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-slate-700">
                      {isBn
                        ? "মোঃ মামুনুর রশীদ — স্বত্বাধিকারী"
                        : "Md. Mamunur Rashid — Proprietor"}
                    </span>
                  </div>
                  <a
                    href="https://www.youtube.com/watch?v=ONTd4X4M-Vo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-[#800020] hover:underline"
                  >
                    <span>YouTube</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Circular Spinning Stamp Badge (Inspired directly by Screenshot 3 Stamp) */}
                <div className="absolute -top-3 -right-3 hidden sm:flex items-center justify-center w-24 h-24 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl pointer-events-none z-20">
                  <svg
                    className="w-20 h-20 animate-[spin_12s_linear_infinite]"
                    viewBox="0 0 100 100"
                  >
                    <defs>
                      <path
                        id="circlePath"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      />
                    </defs>
                    <text fontSize="8.5" fontWeight="700" letterSpacing="2.2" fill="#800020">
                      <textPath href="#circlePath" startOffset="0%">
                        DIRECT IMPORTER • TASNEEM •
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute w-9 h-9 rounded-full bg-[#800020] text-white flex items-center justify-center shadow-xs">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>

          {/* Right Column: Editorial Quote, Stat Card & Clean Narrative (Inspired by Screenshot 2) */}
          <div className="lg:col-span-6 space-y-6">
            <SlideIn direction="right" distance={24} duration={0.45}>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-2">
                {/* Editorial Headline */}
                <div className="max-w-md">
                  <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                    {isBn ? (
                      <>
                        “সরাসরি কারখানা থেকে আমদানি ও বিশ্বস্ত টেকনিক্যাল সাপোর্ট”
                      </>
                    ) : (
                      <>
                        “Direct Factory Sourcing & Proven Technical Leadership”
                      </>
                    )}
                  </h2>
                </div>

                {/* Modern Floating Stat Card (Inspired by Screenshot 2: "30+ Years Experience") */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-lg shadow-slate-900/5 sm:w-56 shrink-0 space-y-3">
                  <div>
                    <div className="text-4xl font-extrabold text-slate-900 tracking-tight flex items-baseline gap-1">
                      <span>25</span>
                      <span className="text-[#800020] text-2xl font-black">+</span>
                    </div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-0.5">
                      {isBn ? "বছরের অভিজ্ঞতা" : "Years Experience"}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {isBn
                      ? "বাংলাদেশের নিট টেক্সটাইল কারখানায় আন্তর্জাতিক সার্কুলার নিটিং মেশিন সরবরাহ।"
                      : "Delivering trusted industrial circular knitting equipment across Bangladesh mills."}
                  </p>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center w-full py-2 px-3.5 rounded-full bg-[#800020] hover:bg-[#600018] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                  >
                    <span>{isBn ? "প্রোফাইল দেখুন" : "About Founder"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Editorial Description Paragraph */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-2">
                {isBn
                  ? "তাসনীম নিট ইন্ডাস্ট্রি কোনো মধ্যস্বত্বভোগী বা ব্রোকার ছাড়াই চীন ও তাইওয়ানের শীর্ষস্থানীয় OEM প্রস্তুতকারকদের সাথে সরাসরি সমন্বয় করে আন্তর্জাতিক মানের সার্কুলার নিটিং মেশিন আমদানি করে। প্রতিটি মেশিনের শিপমেন্টের পূর্বে কোয়ালিটি ইন্সপেকশন, সিএফআর চট্টগ্রাম পোর্ট ক্লিয়ারেন্স ও কারখানা ফ্লোরে নিখুঁত অন-সাইট কমিশনিং নিশ্চিত করা হয়।"
                  : "With a client-focused approach, Tasneem Knit Industry connects composite knitwear mills directly with global machinery builders. We eliminate intermediate markups, ensuring authentic components, guaranteed CFR shipping terms, and factory-level after-sales maintenance."}
              </p>

              {/* Founder Contact & Consultation Row */}
              <div className="pt-4 border-t border-slate-200/90 flex flex-wrap items-center gap-4">
                <a
                  href={`tel:${COMPANY_INFO.phoneIntl}`}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white border border-slate-300 hover:border-[#800020] text-slate-800 text-xs sm:text-sm font-bold shadow-xs hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <Phone className="w-4 h-4 text-[#800020]" />
                  <span>{COMPANY_INFO.phone}</span>
                </a>

                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#800020] to-[#990026] hover:from-[#6B001B] hover:to-[#800020] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#800020]/20 transition-all cursor-pointer"
                >
                  <span>{isBn ? "কোটেশন রিকোয়েস্ট করুন" : "Request Sourcing Proposal"}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </SlideIn>
          </div>
        </div>
      </div>
    </section>
  );
}
