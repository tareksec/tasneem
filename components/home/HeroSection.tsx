"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ShieldCheck, Ship, Wrench } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const { dict, locale } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  // Network connection-aware check (fallback to poster on 2G or data-saver)
  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } })?.connection;
      if (conn?.saveData || conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g") {
        setIsSlowConnection(true);
      }
    }
  }, []);

  // Safe autoplay trigger
  useEffect(() => {
    if (videoRef.current && !shouldReduceMotion && !isSlowConnection) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted by strict browser settings; poster frame is visible
      });
    }
  }, [shouldReduceMotion, isSlowConnection]);

  return (
    <section className="relative -mt-[68px] sm:-mt-[74px] pt-28 sm:pt-36 pb-20 sm:pb-28 lg:pb-32 min-h-[90vh] lg:min-h-[94vh] flex items-center overflow-hidden bg-neutral-950">
      {/* 1. Full-Bleed Video Background (Edge-to-Edge) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {shouldReduceMotion || isSlowConnection ? (
          /* Reduced-motion / Slow connection: Static high-res poster frame */
          <Image
            src="/video/hero-video-poster.png"
            alt="Industrial circular knitting machines operating in factory"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        ) : (
          /* HTML5 Video: Autoplay, Muted, Loop, Playsinline, Poster Fallback */
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/video/hero-video-poster.png"
            aria-hidden="true"
            className="w-full h-full object-cover"
          >
            <source src="/video/hero-knitting-machines.webm" type="video/webm" />
            <source src="/video/hero-knitting-machines.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      {/* 2. Localized Gradient Behind Text Region (NOT a full-frame overlay) */}
      {/* Confined to the left 60-65% on desktop; widened on mobile for stacked readability */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/35 max-md:bg-none lg:bg-gradient-to-r lg:from-black/90 lg:via-black/65 lg:to-transparent lg:w-[68%] xl:w-[60%] pointer-events-none"
      />

      {/* Subtle top & bottom vignette to blend seamlessly with navbar and following section */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent max-md:hidden pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent max-md:hidden pointer-events-none"
      />

      {/* 3. Hero Text Content (Positioned Upper-Left / Left-Aligned on Top of Video) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl lg:max-w-3xl flex flex-col text-left max-md:min-h-[calc(100svh-12rem)]">
          
          {/* Top Status Pill (Visually hidden for clean UI, preserved in DOM for SEO/GEO) */}
          <span className="sr-only">{dict.hero.badge}</span>

          {/* H1 Heading */}
          <motion.h1
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut", delay: 0.08 }}
            className="max-md:order-1 text-2xl min-[360px]:text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.14] drop-shadow-sm break-words"
          >
            {dict.hero.title}
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut", delay: 0.16 }}
            className="max-md:hidden mt-3.5 sm:mt-5 text-sm min-[360px]:text-base sm:text-lg text-neutral-200 leading-relaxed max-w-xl sm:max-w-2xl drop-shadow-xs"
          >
            {dict.hero.subtitle}
          </motion.p>

          {/* Dual CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut", delay: 0.24 }}
            className="max-md:order-3 max-md:mt-auto mt-7 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto"
          >
            {/* Primary CTA */}
            <Link
              href="/quote"
              className="bg-[#800020] text-white px-6 sm:px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-[#5A0017] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-black/40 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <span>{dict.hero.primaryCta}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            {/* Secondary CTA: Services */}
            <Link
              href="/services"
              className="bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white px-5 sm:px-7 py-3.5 rounded-full font-semibold text-xs sm:text-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <span>Visit Our Services</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Value Micro-Badges (Trust Badges inside the text area) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.3 }}
            className="max-md:hidden max-md:order-2 mt-7 sm:mt-10 pt-5 sm:pt-7 border-t border-white/15 flex flex-nowrap items-center justify-between gap-2 sm:gap-7 text-xs text-neutral-200 font-medium"
          >
            <div aria-label={dict.hero.cfrBadge} className="flex items-center gap-2 max-md:flex-1 max-md:flex-col max-md:gap-1 max-md:text-center">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Ship className="w-3.5 h-3.5 text-rose-200" />
              </div>
              <span className="max-md:sr-only">{dict.hero.cfrBadge}</span>
            </div>
            <div aria-label={dict.hero.inspectionBadge} className="flex items-center gap-2 max-md:flex-1 max-md:flex-col max-md:gap-1 max-md:text-center">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <span className="max-md:sr-only">{dict.hero.inspectionBadge}</span>
            </div>
            <div aria-label={dict.hero.installBadge} className="flex items-center gap-2 max-md:flex-1 max-md:flex-col max-md:gap-1 max-md:text-center">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Wrench className="w-3.5 h-3.5 text-rose-200" />
              </div>
              <span className="max-md:sr-only">{dict.hero.installBadge}</span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* 4. Natural Video Visibility Indicator (SEO keyword context preserved in DOM) */}
      <span className="sr-only">
        {locale === "bn"
          ? "কারখানা ফ্লোর • টেক্সটাইল নিটিং মেশিনারি"
          : "Factory Floor • Circular Knitting Machinery"}
      </span>
    </section>
  );
}
