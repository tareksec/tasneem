"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Cpu, Layers } from "lucide-react";
import { MAIN_CATEGORIES } from "@/lib/machines-data";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export function CategoriesSection() {
  const { dict, locale } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth horizontal translation across the 5 categories
  // 5 cards: 0% to -66% moves all cards into view
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", shouldReduceMotion ? "0%" : "-66%"]
  );

  // Listen to scroll progress to update active category tab
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const index = Math.min(
        MAIN_CATEGORIES.length - 1,
        Math.max(0, Math.floor(latest * MAIN_CATEGORIES.length))
      );
      setActiveCategoryIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Click tab to scroll to that category segment
  const scrollToCategory = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + (index / (MAIN_CATEGORIES.length - 1)) * containerHeight;
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] sm:h-[350vh] bg-[#F8F9FA] text-neutral-900 border-b border-[#E5E7EB]"
    >
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-16 sm:pt-20 pb-8 sm:pb-10 px-4 sm:px-8 lg:px-12 overflow-hidden bg-[#F8F9FA]">
        {/* Architectural Grid Accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* 1. Header Zone: Title & Horizontal Tab Navigation */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-red-600 mb-2 shadow-xs">
                <Cpu className="w-3.5 h-3.5 text-[#FF0000] animate-pulse" />
                <span>{locale === "bn" ? "মেশিনারি ক্যাটালগ" : dict.categories.badge}</span>
                <span className="text-neutral-400">•</span>
                <span className="text-neutral-600 font-normal">
                  {locale === "bn" ? "৫টি মূল ক্যাটাগরি" : "5 Primary Categories"}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900 leading-tight">
                {locale === "bn"
                  ? "আমদানিকৃত টেক্সটাইল ও গার্মেন্টস মেশিনারি"
                  : "Industrial Machinery Catalog"}
              </h2>
            </div>

            <Link
              href="/machines"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-neutral-700 hover:text-black bg-white hover:bg-neutral-50 border border-neutral-300/80 px-4 py-2 rounded-xl transition-all self-start sm:self-auto cursor-pointer shadow-xs"
            >
              <span>{dict.categories.viewAllBtn}</span>
              <ArrowUpRight className="w-4 h-4 text-[#FF0000]" />
            </Link>
          </div>

          {/* Interactive Category Tab Navigation Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
            {MAIN_CATEGORIES.map((category, idx) => {
              const isActive = activeCategoryIndex === idx;
              const catName = locale === "bn" && category.name_bn ? category.name_bn : category.name;

              return (
                <button
                  key={category.slug}
                  onClick={() => scrollToCategory(idx)}
                  className={`relative isolate px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? "text-white shadow-md shadow-red-500/25"
                      : "text-neutral-600 hover:text-neutral-900 bg-white hover:bg-neutral-100 border border-neutral-200/90 shadow-xs"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 rounded-full bg-[#FF0000] -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 text-[10px] font-mono ${isActive ? "text-red-100 font-bold" : "text-neutral-400"}`}>
                    0{idx + 1}
                  </span>
                  <span className="relative z-10">{catName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Main Horizontal Scrolling Carousel Track */}
        <div className="relative z-10 w-full my-auto py-4 overflow-visible">
          <motion.div
            style={{ x }}
            className="flex gap-6 sm:gap-8 items-center pl-4 sm:pl-8 lg:pl-16 pr-12 sm:pr-20 will-change-transform"
          >
            {MAIN_CATEGORIES.map((category, index) => {
              const isCircular = category.slug === "circular-knitting";
              const catName = locale === "bn" && category.name_bn ? category.name_bn : category.name;
              const catTagline = locale === "bn" && category.tagline_bn ? category.tagline_bn : category.tagline;

              return (
                <div
                  key={category.slug}
                  className="relative w-[85vw] sm:w-[370px] lg:w-[410px] h-[530px] sm:h-[570px] shrink-0 rounded-[32px] overflow-hidden bg-white border border-[#E5E7EB] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_50px_-12px_rgba(255,0,0,0.12)] hover:border-red-200 transition-all duration-500 flex flex-col justify-between p-6 sm:p-7 group select-none"
                >
                  {/* 1. Full-bleed background image */}
                  <Image
                    src={
                      category.slug === "circular-knitting"
                        ? "/images/machines/cat-circular-knitting.webp"
                        : `/images/machines/cat-${category.slug}.webp`
                    }
                    alt={catName}
                    fill
                    sizes="(max-width: 640px) 85vw, 420px"
                    priority={index <= 1}
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                  />

                  {/* 2. Light Theme Gradient Scrim (Crisp white bottom fade + soft top vignette) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 via-50% to-transparent z-1 pointer-events-none" />
                  <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/70 via-white/30 to-transparent z-1 pointer-events-none" />

                  {/* 3. Top Row Header: Frosted Light Badges */}
                  <div className="relative z-10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-white/85 backdrop-blur-md border border-neutral-200/90 text-neutral-900 text-[11px] font-mono font-bold px-3 py-1 rounded-full shadow-2xs">
                        0{index + 1} / 05
                      </span>
                      {isCircular && (
                        <span className="inline-flex items-center gap-1.5 bg-amber-50/90 backdrop-blur-md border border-amber-200/90 text-amber-900 text-[11px] font-bold px-3 py-1 rounded-full shadow-2xs">
                          <Layers className="w-3 h-3 text-amber-600" />
                          <span>{locale === "bn" ? "৫টি সাব-টাইপ" : "5 Sub-Types"}</span>
                        </span>
                      )}
                    </div>

                    <span className="bg-white/80 backdrop-blur-md border border-neutral-200/80 text-neutral-600 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full">
                      {category.slug}
                    </span>
                  </div>

                  {/* 4. Bottom Content Area */}
                  <div className="relative z-10 mt-auto flex flex-col">
                    {/* Carousel Dash/Dot Indicators (Matches reference photo above title) */}
                    <div className="flex items-center gap-1.5 mb-3.5">
                      {MAIN_CATEGORIES.map((_, i) => (
                        <span
                          key={i}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            i === index ? "w-6 bg-[#FF0000] shadow-xs" : "w-1.5 bg-neutral-300"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Title + Price/Spec Pill Badge */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-2xl sm:text-[26px] font-black text-neutral-900 tracking-tight leading-snug group-hover:text-[#FF0000] transition-colors">
                        {catName}
                      </h3>
                      <span className="shrink-0 bg-neutral-100/90 border border-neutral-200 text-neutral-800 font-mono font-bold text-xs sm:text-sm px-3.5 py-1.5 rounded-full shadow-2xs">
                        {category.typicalGauge !== "Universal" ? category.typicalGauge : "CFR / CIF"}
                      </span>
                    </div>

                    {/* Description Tagline */}
                    <p className="text-xs sm:text-[13px] text-neutral-600 font-normal leading-relaxed line-clamp-2 sm:line-clamp-3 mb-4">
                      {catTagline}
                    </p>

                    {/* Pill Chips (Matches reference photo: "Top Pick", "Only 9 vibes left", etc.) */}
                    <div className="flex flex-wrap items-center gap-2 mb-5">
                      <span className="bg-red-50 border border-red-200 text-red-600 text-[11px] font-bold px-3 py-1 rounded-full shadow-2xs">
                        {index === 0
                          ? (locale === "bn" ? "টপ চয়েস" : "Top Pick")
                          : (locale === "bn" ? "সরাসরি আমদানি" : "Direct Import")}
                      </span>
                      {category.commonApplications.slice(0, 2).map((app) => (
                        <span
                          key={app}
                          className="bg-neutral-100 hover:bg-neutral-200/70 border border-neutral-200/90 text-neutral-700 text-[11px] font-medium px-3 py-1 rounded-full transition-colors"
                        >
                          {app}
                        </span>
                      ))}
                    </div>

                    {/* Full-width Capsule Action Button (High contrast dark pill button turning red on hover) */}
                    <Link
                      href={`/machines/${category.slug}`}
                      className="w-full bg-[#0A0A0A] hover:bg-[#FF0000] text-white font-bold text-sm sm:text-base py-3.5 px-6 rounded-full shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer"
                    >
                      <span>{locale === "bn" ? "মেশিন মডেল দেখুন" : "Explore Machinery"}</span>
                      <ArrowUpRight className="w-4 h-4 text-white transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* 3. Bottom Progress Bar & Horizontal Hint */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs text-neutral-500 pt-2 border-t border-[#E5E7EB]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF0000] animate-ping" />
            <span className="text-[11px] font-mono font-medium text-neutral-600">
              {locale === "bn" ? "স্ক্রোল করে ক্যাটাগরিগুলো এক্সপ্লোর করুন" : "Scroll vertically to navigate horizontally"}
            </span>
          </div>

          {/* Progress Indicator Bar */}
          <div className="w-32 sm:w-48 h-1.5 rounded-full bg-neutral-200 overflow-hidden relative">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-400 origin-left"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

