"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  CheckCircle2,
  Factory,
  Ship,
  ShieldCheck,
  ChevronRight,
  Phone,
} from "lucide-react";
import { MotionSection } from "@/components/ui/MotionWrapper";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { COMPANY_INFO } from "@/lib/constants";

export function SpotlightSourcing() {
  const { dict, locale } = useTranslation();

  return (
    <section className="relative w-full h-full min-h-[640px] flex flex-col justify-between pt-16 sm:pt-20 pb-6 sm:pb-8 px-4 sm:px-8 lg:px-12 overflow-hidden border-t border-[#E5E7EB] bg-[#F8F9FA] text-neutral-900">
      {/* 1. Full-Bleed Background Photo — 100% Native Color & Brightness */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/images/home/transparent-sourcing-bg.jpg"
          alt="Transparent Sourcing: China to Bangladesh direct maritime machinery corridor"
          fill
          priority
          quality={100}
          className="object-cover object-center"
        />

        {/* Localized Frosted Scrim Strictly Behind Top Header & Action Controls */}
        <div className="absolute inset-x-0 top-0 h-64 sm:h-72 bg-gradient-to-b from-white/95 via-white/60 to-transparent pointer-events-none" />

        {/* Localized Frosted Scrim Strictly Behind Bottom Slim Dock */}
        <div className="absolute inset-x-0 bottom-0 h-32 sm:h-36 bg-gradient-to-t from-white/95 via-white/60 to-transparent pointer-events-none" />
      </div>

      {/* 2. Top Header Zone (Title, Badge, Narrative & Primary Actions) */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <MotionSection delay={0.05} className="flex flex-col items-center">
          {/* Glowing Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-red-200 backdrop-blur-md text-xs font-bold text-red-600 shadow-md shadow-neutral-200/50 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF0000] animate-ping" />
            <span className="text-[#FF0000] font-extrabold tracking-wider uppercase">
              {dict.sourcing.badge}
            </span>
            <span className="text-neutral-400 font-normal">•</span>
            <span className="text-neutral-700 font-medium">
              {locale === "bn"
                ? "চীন ➔ বাংলাদেশ সরাসরি নিরাপদ শিপমেন্ট করিডোর"
                : "China ➔ Bangladesh Direct Maritime Corridor"}
            </span>
          </div>

          {/* Section Heading */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 leading-tight">
            {dict.sourcing.title}
          </h2>

          {/* Subtitle */}
          <p className="mt-2.5 text-xs sm:text-sm lg:text-base text-neutral-700 font-normal max-w-2xl mx-auto leading-relaxed">
            {dict.sourcing.subtitle}
          </p>

          {/* Top Quick Action Buttons — Placed in the upper sky area to keep the bottom map open */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/quote"
              className="bg-[#FF0000] hover:bg-[#E00000] text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 inline-flex items-center gap-2 shadow-lg shadow-red-500/25 hover:scale-[1.03] cursor-pointer"
            >
              <span>{dict.common.requestQuote}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/how-it-works"
              className="bg-white/90 hover:bg-white border border-neutral-300/90 text-neutral-800 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 backdrop-blur-md inline-flex items-center gap-1.5 cursor-pointer shadow-xs hover:border-neutral-400"
            >
              <span>{dict.nav.howItWorks}</span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
            </Link>
          </div>
        </MotionSection>
      </div>

      {/* 3. Middle Area: 100% Clean & Open! No objects blocking the cargo ship, China container, Bangladesh container, or glowing trade route */}
      <div className="my-auto py-12 pointer-events-none" />

      {/* 4. Bottom Dock: Ultra-Sleek Glassmorphic Ribbon (Minimal height, highly informative) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="backdrop-blur-xl bg-white/90 border border-white/90 rounded-2xl p-3.5 sm:p-4 shadow-xl shadow-neutral-900/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          {/* 4 Compact Verified Badges */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 w-full md:w-auto flex-1">
            <div className="flex items-center gap-2 text-left">
              <div className="w-6 h-6 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-200/80">
                <Factory className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-bold text-neutral-800 leading-tight">
                {locale === "bn" ? "যাচাইকৃত ফ্যাক্টরি সোর্সিং" : "Audited ISO Plants"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-left">
              <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/80">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-bold text-neutral-800 leading-tight">
                {locale === "bn" ? "আন্তর্জাতিক Pre-shipment Inspection (PSI)" : "PSI Inspection (SGS/ITS)"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-left">
              <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/80">
                <Ship className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-bold text-neutral-800 leading-tight">
                {locale === "bn" ? "CFR চট্টগ্রাম নিরাপদ সমুদ্র শিপমেন্ট" : "CFR Chattogram Sea Delivery"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-left">
              <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200/80">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-bold text-neutral-800 leading-tight">
                {locale === "bn" ? "বাংলাদেশ ব্যাংক ও L/C কমপ্লায়েন্ট" : "Bangladesh Bank L/C Compliant"}
              </span>
            </div>
          </div>

          {/* Hotline Contact Note */}
          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-neutral-300/80 text-[11px] text-neutral-600 shrink-0">
            <Phone className="w-3.5 h-3.5 text-[#FF0000]" />
            <span>
              Hotline: <a href={`tel:${COMPANY_INFO.phone}`} className="text-neutral-900 font-bold hover:text-[#FF0000] hover:underline">{COMPANY_INFO.phone}</a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
