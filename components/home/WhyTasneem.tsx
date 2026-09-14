"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ShieldCheck, Ship, Wrench, HandCoins, Factory, Sparkles, ChevronRight } from "lucide-react";
import { MotionSection } from "@/components/ui/MotionWrapper";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { COMPANY_INFO } from "@/lib/constants";

export function WhyTasneem() {
  const { dict, locale } = useTranslation();

  const pillars = [
    {
      title: dict.whyTasneem.pillar1Title,
      badge: "Pillar 01",
      icon: HandCoins,
      description: dict.whyTasneem.pillar1Desc,
      iconColor: "text-[#800020] bg-[#FDF2F4] group-hover:bg-[#800020] group-hover:text-white",
      borderColor: "hover:border-[#800020]/40",
    },
    {
      title: dict.whyTasneem.pillar2Title,
      badge: "Pillar 02",
      icon: ShieldCheck,
      description: dict.whyTasneem.pillar2Desc,
      iconColor: "text-emerald-600 bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white",
      borderColor: "hover:border-emerald-400/80",
    },
    {
      title: dict.whyTasneem.pillar3Title,
      badge: "Pillar 03",
      icon: Ship,
      description: dict.whyTasneem.pillar3Desc,
      iconColor: "text-blue-600 bg-blue-50 group-hover:bg-blue-600 group-hover:text-white",
      borderColor: "hover:border-blue-400/80",
    },
    {
      title: dict.whyTasneem.pillar4Title,
      badge: "Pillar 04",
      icon: Wrench,
      description: dict.whyTasneem.pillar4Desc,
      iconColor: "text-amber-600 bg-amber-50 group-hover:bg-amber-600 group-hover:text-white",
      borderColor: "hover:border-amber-400/80",
    },
  ];

  return (
    <section id="why-tasneem" className="relative w-full min-h-0 sm:min-h-[760px] lg:min-h-[820px] flex flex-col justify-between pt-4 sm:pt-6 pb-12 sm:pb-20 px-4 sm:px-8 lg:px-12 overflow-hidden border-b border-[#E5E5E5] bg-white text-[#2D2D2D]">
      {/* 1. Full-Bleed Background Photo — 100% Native Color & Brightness */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/images/home/why-tasneem-bg.jpg"
          alt="Modern industrial circular knitting factory floor with active machines, yarn creels, and technicians"
          fill
          priority
          quality={100}
          className="object-cover object-center"
        />

        {/* Localized Frosted Scrim Strictly Behind Top Header Text */}
        <div className="absolute inset-x-0 top-0 h-64 sm:h-72 bg-gradient-to-b from-white/95 via-white/60 to-transparent pointer-events-none" />

        {/* Localized Frosted Scrim Strictly Behind Bottom Cards Dock */}
        <div className="absolute inset-x-0 bottom-0 h-80 sm:h-96 bg-gradient-to-t from-white/95 via-white/70 to-transparent pointer-events-none" />
      </div>

      {/* Tactile Sheet Handle (Visual indicator of the overlapping card) */}
      <div className="relative z-10 w-full pt-1 pb-3 flex justify-center select-none pointer-events-none">
        <div className="w-12 sm:w-16 h-1 rounded-full bg-neutral-400/60 backdrop-blur-md shadow-xs" />
      </div>

      {/* 2. Top Header Zone */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <MotionSection delay={0.05} className="flex flex-col items-center">
          {/* Section kicker keyword context preserved in DOM for SEO/GEO */}
          <span className="sr-only">
            {dict.whyTasneem.badge} • {locale === "bn" ? "কেন শীর্ষ টেক্সটাইল মিলগুলো তাসনীমকে বেছে নেয়" : "Why Leading Mills Choose Tasneem"}
          </span>

          {/* Section Heading */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#2D2D2D] leading-tight">
            {dict.whyTasneem.title}
          </h2>

          {/* Subtitle */}
          <p className="mt-3 text-xs sm:text-sm lg:text-base text-neutral-700 font-normal max-w-2xl mx-auto leading-relaxed">
            {dict.whyTasneem.subtitle}
          </p>
        </MotionSection>
      </div>

      {/* 3. Middle Area: Open View of the Factory Floor & Knitting Machines */}
      <div className="my-auto py-8 pointer-events-none" />

      {/* 4. Bottom Zone: 4 Glassmorphic Pillar Cards & Action Link */}
      <div className="relative z-10 w-full max-w-7xl mx-auto space-y-6">
        {/* 4 Pillar Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {pillars.map((pillar) => (
            <div
              key={pillar.badge}
              className={`p-5 rounded-2xl bg-white/90 hover:bg-white border border-neutral-200/90 ${pillar.borderColor} backdrop-blur-xl transition-all duration-300 shadow-xl shadow-neutral-900/5 flex flex-col justify-between group hover:-translate-y-1`}
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className={`w-10 h-10 rounded-xl ${pillar.iconColor} flex items-center justify-center transition-colors duration-300 shadow-xs border border-neutral-200/60`}>
                    <pillar.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-neutral-700 uppercase tracking-wider bg-neutral-100 px-2.5 py-1 rounded-lg border border-neutral-200">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-[#2D2D2D] mb-1.5 leading-snug group-hover:text-[#800020] transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-xs text-neutral-600 font-normal leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            <Link
              href="/about"
              className="bg-[#800020] hover:bg-[#5A0017] active:scale-[0.98] text-white px-5 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-md shadow-rose-950/25 hover:scale-[1.03] min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-2"
            >
              <span>{dict.common.readMore}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/machines"
              className="bg-white/90 hover:bg-white active:scale-[0.98] border border-neutral-300/90 text-neutral-800 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 backdrop-blur-md inline-flex items-center justify-center gap-1.5 shadow-xs hover:border-neutral-400 min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-2"
            >
              <span>{dict.common.viewAllMachines}</span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
            </Link>
          </div>

          <div className="text-center sm:text-right text-xs text-neutral-600">
            <span className="block text-neutral-900 font-bold">
              {locale === "bn" ? "ফ্যাক্টরি শোরুম:" : "Factory Showroom:"} <span className="text-[#800020]">{locale === "bn" ? "প্লট-৫৯৪, বিসিক শিল্পনগরী, নারায়ণগঞ্জ" : "Plot-594, BSCIC Industrial Park, Narayanganj"}</span>
            </span>
            <span className="text-[11px] text-neutral-500 break-all sm:break-normal">
              {locale === "bn" ? "হটলাইন:" : "Hotline:"} {COMPANY_INFO.phone} • {locale === "bn" ? "সরাসরি সেলস:" : "Direct Sales:"} {COMPANY_INFO.phoneAlt}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
