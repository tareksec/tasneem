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
} from "lucide-react";
import { MotionSection, SlideIn } from "@/components/ui/MotionWrapper";
import { COMPANY_INFO } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export function HomeAboutSection() {
  const { locale } = useTranslation();

  const isBn = locale === "bn";

  const strengths = [
    {
      icon: Factory,
      title: isBn ? "সরাসরি প্রস্তুতকারক কারখানা" : "Direct Factory Sourcing",
      desc: isBn
        ? "চীন ও তাইওয়ানের শীর্ষ কারখানা থেকে সরাসরি আমদানি, কোনো মধ্যস্বত্বভোগী ছাড়া।"
        : "Direct import from verified builders in China & Taiwan with zero third-party markups.",
    },
    {
      icon: Ship,
      title: isBn ? "সিএফআর চট্টগ্রাম পোর্ট" : "Turnkey CFR Sea Shipping",
      desc: isBn
        ? "কনটেইনার বুকিং ও সিএফআর চট্টগ্রাম পোর্ট শিপমেন্টের সম্পূর্ণ ব্যবস্থাপনা।"
        : "End-to-end ocean container freight logistics directly to Chattogram Port.",
    },
    {
      icon: Wrench,
      title: isBn ? "অন-সাইট ইনস্টলেশন সাপোর্ট" : "On-Site Mill Commissioning",
      desc: isBn
        ? "দক্ষ টেকনিশিয়ান দ্বারা আপনার ফ্যাক্টরিতে মেশিন সেটিং ও ফ্যাব্রিক ট্রায়াল।"
        : "Factory-floor machine leveling, feeder setup, and high-RPM fabric test run.",
    },
    {
      icon: ShieldCheck,
      title: isBn ? "১ বছরের ওয়ারেন্টি ও পার্টস" : "1-Year Warranty & Spare Parts",
      desc: isBn
        ? "আন্তর্জাতিক প্রস্তুতকারক ওয়ারেন্টি ও বিসিক নারায়ণগঞ্জ থেকে দ্রুত স্পেয়ার পার্টস।"
        : "International manufacturer warranty with local spares stock in Narayanganj.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E5E5E5] overflow-hidden text-[#2D2D2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <MotionSection className="max-w-3xl mb-12 sm:mb-16">
          <span className="sr-only">
            {isBn
              ? "আমাদের পরিচিতি ও কারখানা পরিদর্শন"
              : "Company Profile & Factory Video"}
          </span>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#2D2D2D] leading-tight">
            {isBn
              ? "সরাসরি কারখানা থেকে আমদানি, ইনস্টলেশন ও বিশ্বস্ত টেকনিক্যাল সাপোর্ট"
              : "Direct Factory Sourcing, Turnkey Commissioning & Proven Technical Leadership"}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#4A4A4A] leading-relaxed">
            {isBn
              ? "নারায়ণগঞ্জের তাসনীম নিট ইন্ডাস্ট্রি দেশের টেক্সটাইল ও রপ্তানিমুখী নিট মিলগুলোর জন্য কোনো মধ্যস্বত্বভোগী ছাড়াই সরাসরি প্রস্তুতকারক ফ্যাক্টরি থেকে বিশ্বমানের Circular Knitting, Dyeing, Shearing ও Finishing মেশিন সরবরাহ করে।"
              : "Headquartered in BSCIC Narayanganj, Tasneem Knit Industry bridges Bangladesh's leading composite knit mills directly with international machinery builders, providing seamless sea delivery, precision factory commissioning, and dedicated after-sales service."}
          </p>
        </MotionSection>

        {/* 2-Column Content: Autoplay Video on Left, Owner Statement & Strengths on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Autoplay YouTube Video (7 cols) */}
          <div className="lg:col-span-7 order-1">
            <SlideIn direction="left" distance={24} duration={0.45}>
              <div className="rounded-3xl border border-[#E5E5E5] bg-gradient-to-b from-[#F9F9F9] to-white p-3 sm:p-5 shadow-lg shadow-black/5">
                {/* Top Video Stream Bar */}
                <div className="flex items-center justify-between px-2 sm:px-3 pb-3 mb-2 border-b border-[#E5E5E5] text-xs font-semibold text-[#4A4A4A]">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#800020]" />
                    </span>
                    <span className="text-[#2D2D2D] font-bold">
                      {isBn ? "ভিডিও পরিদর্শন ও বক্তব্য" : "Factory Video & Inspection"}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-white border border-[#E5E5E5] text-neutral-600 hidden sm:inline-block">
                    Auto-playing • HD
                  </span>
                </div>

                {/* 16:9 Responsive Video Frame with Autoplay */}
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-neutral-900 shadow-inner border border-neutral-800">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/ONTd4X4M-Vo?autoplay=1&mute=1&playsinline=1&rel=0&loop=1&playlist=ONTd4X4M-Vo"
                    title="Md Mamunur Rashid - Owner Introduction & Factory Operations | Tasneem Knit Industry"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Bottom Caption */}
                <div className="mt-3 px-2 sm:px-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#717171]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>
                      {isBn
                        ? "স্বত্বাধিকারী মোঃ মামুনুর রশীদ — সরাসরি আমদানি কার্যক্রম"
                        : "Md. Mamunur Rashid (Proprietor) detailing direct import operations"}
                    </span>
                  </div>
                  <a
                    href="https://www.youtube.com/watch?v=ONTd4X4M-Vo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-[#800020] hover:underline"
                  >
                    <span>{isBn ? "ইউটিউবে ভিডিও দেখুন" : "Watch on YouTube"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </SlideIn>
          </div>

          {/* Right Column: Founder Info, Mission Quote & 4-Grid Highlights (5 cols) */}
          <div className="lg:col-span-5 order-2 flex flex-col justify-center">
            <SlideIn direction="right" distance={24} duration={0.45}>
              {/* Founder Header */}
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#800020] block mb-1">
                  {isBn ? "প্রতিষ্ঠাতা ও স্বত্বাধিকারী" : "Founder & Managing Director"}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#2D2D2D] leading-tight">
                  {isBn ? "মোঃ মামুনুর রশীদ" : COMPANY_INFO.owner}
                </h3>
                <p className="text-xs text-[#717171] font-medium mt-0.5">
                  {isBn
                    ? "স্বত্বাধিকারী, তাসনীম নিট ইন্ডাস্ট্রি • বিসিক, নারায়ণগঞ্জ"
                    : "Proprietor, Tasneem Knit Industry • BSCIC, Narayanganj"}
                </p>
              </div>

              {/* Founder Quote */}
              <blockquote className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed mb-6 italic border-l-2 border-[#800020] pl-3.5 bg-[#F9F9F9] py-3 rounded-r-xl">
                {isBn
                  ? "“আমাদের একটাই লক্ষ্য — দেশের নিট ও টেক্সটাইল মিলগুলোতে কোনো দালাল বা বাড়তি খরচ ছাড়া সরাসরি আন্তর্জাতিক মানের Circular Knitting, Dyeing ও Finishing মেশিন পৌঁছে দেওয়া এবং সার্বক্ষণিক পার্টস ও টেকনিক্যাল সাপোর্ট নিশ্চিত করা।”"
                  : '“Our commitment is direct: empower Bangladesh\'s composite knitwear and garment manufacturers with verified factory machinery, transparent CFR import terms, and guaranteed local engineering support.”'}
              </blockquote>

              {/* 4 Feature Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {strengths.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-[#E5E5E5] bg-[#F9F9F9]/80 hover:bg-white hover:border-[#800020]/40 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-6 h-6 rounded-lg bg-[#FDF2F4] text-[#800020] flex items-center justify-center shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <h4 className="text-xs font-bold text-[#2D2D2D] leading-tight line-clamp-1">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs text-[#4A4A4A] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#E5E5E5]">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#800020] hover:bg-[#5A0017] active:scale-[0.98] text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-2"
                >
                  <span>{isBn ? "প্রতিষ্ঠাতার সম্পূর্ণ প্রোফাইল" : "Full Founder Profile"}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white border border-[#E5E5E5] hover:border-neutral-300 active:scale-[0.98] text-[#2D2D2D] text-xs sm:text-sm font-bold shadow-2xs transition-all cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#800020]" />
                  <span>{COMPANY_INFO.phone}</span>
                </a>
              </div>
            </SlideIn>
          </div>
        </div>
      </div>
    </section>
  );
}
