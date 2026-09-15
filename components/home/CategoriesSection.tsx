"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Layers } from "lucide-react";
import { MAIN_CATEGORIES } from "@/lib/machines-data";
import { CategoryInfo } from "@/lib/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";

const getCategoryImageUrl = (slug: string) => {
  if (slug === "circular-knitting") return "/images/machines/cat-circular-knitting.webp";
  if (["dyeing", "shearing", "finishing", "other"].includes(slug)) {
    return `/images/machines/cat-${slug}.webp`;
  }
  return "/images/machines/cat-circular-knitting.webp";
};

interface CategoriesSectionProps {
  initialCategories?: CategoryInfo[];
}

export function CategoriesSection({ initialCategories }: CategoriesSectionProps = {}) {
  const { dict, locale } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [categories, setCategories] = useState<CategoryInfo[]>(initialCategories || MAIN_CATEGORIES);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  useEffect(() => {
    if (initialCategories && initialCategories.length > 0) {
      setCategories(initialCategories);
      return;
    }
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data?.mainCategories && Array.isArray(data.mainCategories)) {
          setCategories(data.mainCategories);
        }
      })
      .catch(() => { });
  }, [initialCategories]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate dynamic shift percentage based on category count
  const shiftPercentage = categories.length <= 1
    ? 0
    : Math.max(0, Math.min(85, Math.round(((categories.length - 1.5) / categories.length) * 100)));

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", shouldReduceMotion ? "0%" : `-${shiftPercentage}%`]
  );

  // Listen to scroll progress to update active category tab
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const index = Math.min(
        categories.length - 1,
        Math.max(0, Math.floor(latest * categories.length))
      );
      setActiveCategoryIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress, categories.length]);

  // Click tab to scroll to that category segment
  const scrollToCategory = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + (index / Math.max(1, categories.length - 1)) * containerHeight;
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* MOBILE LAYOUT (< md): Compact catalog grid inspired by the product reference */}
      <section className="block md:hidden py-12 px-4 sm:px-6 bg-[#F9F9F9] text-[#2D2D2D] border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col items-start gap-2">
            <div className="min-w-0">
              <div className="sr-only">
                <span>{locale === "bn" ? "মেশিনারি ক্যাটালগ" : dict.categories.badge}</span>
                <span> • </span>
                <span>
                  {locale === "bn" ? `${categories.length}টি মূল ক্যাটাগরি` : `${categories.length} Primary Categories`}
                </span>
              </div>
              <h2 className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-base sm:text-3xl font-extrabold tracking-tight text-[#2D2D2D] leading-tight">
                Industrial Machinery Catalog
              </h2>
            </div>
            <Link href="/machines" className="inline-flex items-center gap-1 text-xs font-bold text-[#800020] whitespace-nowrap">
              <span>{dict.categories.viewAllBtn}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#800020]" />
            </Link>
          </div>

          {/* Category shortcuts */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none -mx-1 px-1 pb-1">
            {categories.map((category) => {
              const categoryName = locale === "bn" && category.name_bn ? category.name_bn : category.name;
              return (
                <Link
                  key={category.slug}
                  href={`/machines/${category.slug}`}
                  className="flex min-w-[82px] shrink-0 flex-col items-center gap-1.5 text-center"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-[#800020] shadow-2xs">
                    <Layers className="h-4 w-4" />
                  </span>
                  <span className="line-clamp-1 text-[10px] font-semibold text-neutral-600">{categoryName}</span>
                </Link>
              );
            })}
          </div>

          {/* Cards Grid: compact two-column product-style cards */}
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category, index) => {
              const isCircular = category.slug === "circular-knitting";
              const catName = locale === "bn" && category.name_bn ? category.name_bn : category.name;
              const catTagline = locale === "bn" && category.tagline_bn ? category.tagline_bn : category.tagline;

              return (
                <Link
                  key={category.slug}
                  href={`/machines/${category.slug}`}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-2.5 shadow-[0_4px_14px_rgba(0,0,0,0.05)] transition-all hover:border-[#800020]/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]"
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-[#F8F9FA]">
                    <Image
                      src={getCategoryImageUrl(category.slug)}
                      alt={catName}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      priority={index === 0}
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-2 top-2 rounded-md bg-neutral-900 px-1.5 py-0.5 text-[9px] font-bold text-white">
                      {isCircular ? (locale === "bn" ? "জনপ্রিয়" : "Popular") : (locale === "bn" ? "সরাসরি আমদানি" : "Direct Import")}
                    </span>
                  </div>

                  <div className="flex min-w-0 flex-col pt-2">
                    <div className="flex items-start justify-between gap-1">
                      <h3 className="line-clamp-2 min-w-0 text-sm font-bold leading-tight text-neutral-900 group-hover:text-[#800020]">
                        {catName}
                      </h3>
                      <span className="shrink-0 text-[9px] font-bold text-neutral-500">
                        {category.typicalGauge !== "Universal" ? category.typicalGauge : "CFR"}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-[10px] leading-snug text-neutral-500">{catTagline}</p>
                    <div className="mt-2 flex items-center justify-between border-t border-neutral-100 pt-2">
                      <span className="text-[10px] font-bold text-[#800020]">{locale === "bn" ? "মেশিন দেখুন" : "View machines"}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#800020]" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* DESKTOP LAYOUT (>= md): Original Sticky 350vh Horizontal Translating Carousel */}
      <section
        ref={containerRef}
        className="hidden md:block relative h-[300vh] sm:h-[350vh] bg-[#F9F9F9] text-[#2D2D2D] border-b border-[#E5E5E5]"
      >
        {/* Sticky Viewport Stage */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-16 sm:pt-20 pb-8 sm:pb-10 px-4 sm:px-8 lg:px-12 overflow-hidden bg-[#F9F9F9]">
          {/* Architectural Grid Accent */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          {/* 1. Header Zone: Title & Horizontal Tab Navigation */}
          <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <div className="sr-only">
                  <span>{locale === "bn" ? "মেশিনারি ক্যাটালগ" : dict.categories.badge}</span>
                  <span> • </span>
                  <span>
                    {locale === "bn" ? `${categories.length}টি মূল ক্যাটাগরি` : `${categories.length} Primary Categories`}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#2D2D2D] leading-tight">
                  {locale === "bn"
                    ? "আমদানিকৃত টেক্সটাইল ও গার্মেন্টস মেশিনারি"
                    : "Industrial Machinery Catalog"}
                </h2>
              </div>

              <Link
                href="/machines"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2D2D2D] hover:text-[#800020] bg-white hover:bg-[#FDF2F4]/30 border border-neutral-300/80 px-4 py-2 rounded-xl transition-all self-start sm:self-auto cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]"
              >
                <span>{dict.categories.viewAllBtn}</span>
                <ArrowUpRight className="w-4 h-4 text-[#800020]" />
              </Link>
            </div>

            {/* Interactive Category Tab Navigation Bar */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
              {categories.map((category, idx) => {
                const isActive = activeCategoryIndex === idx;
                const catName = locale === "bn" && category.name_bn ? category.name_bn : category.name;

                return (
                  <button
                    key={category.slug}
                    onClick={() => scrollToCategory(idx)}
                    className={`relative isolate px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] ${isActive
                        ? "text-white shadow-md shadow-rose-950/25"
                        : "text-neutral-600 hover:text-[#2D2D2D] bg-white hover:bg-neutral-100 border border-neutral-200/90 shadow-xs"
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryPill"
                        className="absolute inset-0 rounded-full bg-[#800020] -z-10 shadow-sm"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className={`relative z-10 text-[10px] font-mono ${isActive ? "text-rose-100 font-bold" : "text-neutral-400"}`}>
                      {String(idx + 1).padStart(2, "0")}
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
              {categories.map((category, index) => {
              const isCircular = category.slug === "circular-knitting";
              const catName = locale === "bn" && category.name_bn ? category.name_bn : category.name;
              const catTagline = locale === "bn" && category.tagline_bn ? category.tagline_bn : category.tagline;

              return (
                <Link
                  key={category.slug}
                  href={`/machines/${category.slug}`}
                  className="relative w-[85vw] sm:w-[370px] lg:w-[410px] h-[530px] sm:h-[570px] shrink-0 rounded-3xl overflow-hidden bg-neutral-900 border border-[#E5E5E5] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.12)] hover:shadow-[0_25px_50px_-12px_rgba(128,0,32,0.22)] hover:border-[#800020]/50 transition-all duration-500 flex flex-col justify-between p-4 sm:p-5 group select-none block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]"
                >
                  {/* 1. Full-bleed background image */}
                  <Image
                    src={getCategoryImageUrl(category.slug)}
                    alt={catName}
                    fill
                    sizes="(max-width: 640px) 85vw, 420px"
                    priority={index <= 1}
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                  />

                  {/* Top Gradient for badge readability */}
                  <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 to-transparent z-[1] pointer-events-none" />

                  {/* 2. Top Row Header: Badges */}
                  <div className="relative z-10 flex items-center justify-between gap-3 p-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-white/90 backdrop-blur-md border border-white/40 text-neutral-900 text-xs font-mono font-bold px-3 py-1 rounded-full shadow-sm">
                        {String(index + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
                      </span>
                      {isCircular && (
                        <span className="inline-flex items-center gap-1.5 bg-[#800020] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                          <Layers className="w-3 h-3 text-white" />
                          <span>{locale === "bn" ? "৫টি সাব-টাইপ" : "5 Sub-Types"}</span>
                        </span>
                      )}
                    </div>

                    <span className="bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-full">
                      {category.slug}
                    </span>
                  </div>

                  {/* 3. Bottom Frosted Card: হাইলাইট করা শিরোনাম ও ১০০% ক্লিয়ার ভিজিবিলিটি */}
                  <div className="relative z-10 mt-auto flex flex-col bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-transform duration-300 group-hover:-translate-y-1">
                    {/* Carousel Dash/Dot Indicators */}
                    <div className="flex items-center gap-1.5 mb-2.5">
                      {categories.map((_, i) => (
                        <span
                          key={i}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            i === index ? "w-6 bg-[#800020] shadow-xs" : "w-1.5 bg-neutral-300"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Title + Spec Badge */}
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h3 className="text-xl sm:text-[22px] font-black text-neutral-900 tracking-tight leading-snug group-hover:text-[#800020] transition-colors">
                        {catName}
                      </h3>
                      <span className="shrink-0 bg-neutral-100 border border-neutral-200 text-neutral-800 font-mono font-bold text-xs px-2.5 py-1 rounded-full">
                        {category.typicalGauge !== "Universal" ? category.typicalGauge : "CFR / CIF"}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-neutral-600 font-medium leading-relaxed line-clamp-2 mb-3">
                      {catTagline}
                    </p>

                    {/* Pill Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
                      <span className="bg-[#FDF2F4] border border-[#F9E6EA] text-[#800020] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                        {index === 0
                          ? (locale === "bn" ? "★ টপ চয়েস" : "★ Top Pick")
                          : (locale === "bn" ? "সরাসরি আমদানি" : "Direct Import")}
                      </span>
                      {(category.commonApplications || []).slice(0, 2).map((app) => (
                        <span
                          key={app}
                          className="bg-neutral-100 border border-neutral-200/80 text-neutral-700 text-[11px] font-medium px-2.5 py-0.5 rounded-full"
                        >
                          {app}
                        </span>
                      ))}
                    </div>

                    {/* Capsule Action Button */}
                    <div className="w-full bg-[#800020] group-hover:bg-[#5A0017] active:scale-[0.99] text-white font-bold text-sm py-2.5 px-4 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                      <span>{locale === "bn" ? "মেশিন মডেল দেখুন" : "Explore Machinery"}</span>
                      <ArrowUpRight className="w-4 h-4 text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              );
            })}
            </motion.div>
          </div>

          {/* 3. Bottom Progress Bar & Horizontal Hint */}
          <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs text-neutral-500 pt-2 border-t border-[#E5E5E5]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#800020] animate-ping" />
              <span className="text-[11px] font-mono font-medium text-neutral-600">
                {locale === "bn" ? "স্ক্রোল করে ক্যাটাগরিগুলো এক্সপ্লোর করুন" : "Scroll vertically to navigate horizontally"}
              </span>
            </div>

            {/* Progress Indicator Bar */}
            <div className="w-32 sm:w-48 h-1.5 rounded-full bg-neutral-200 overflow-hidden relative">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className="absolute inset-0 bg-gradient-to-r from-[#800020] to-[#5A0017] origin-left"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

