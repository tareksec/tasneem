"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { COMPANY_INFO } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export function QuoteCtaBanner() {
  const shouldReduceMotion = useReducedMotion();
  const { dict, locale } = useTranslation();

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-[#E5E5E5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="border border-[#E5E5E5] rounded-2xl sm:rounded-3xl bg-white shadow-[0_16px_48px_-24px_rgba(45,45,45,0.18)] text-[#2D2D2D] relative overflow-hidden min-h-0 sm:min-h-[420px] flex items-center"
        >
          {/* 1. Full-Bleed Custom Machinery Sourcing Artwork Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/home/custom-sourcing-bg.png"
              alt="Custom Machinery Sourcing - Tasneem Knit Industry"
              fill
              className="object-cover object-right sm:object-right select-none pointer-events-none"
              sizes="(max-width: 768px) 100vw, 1280px"
            />
          </div>

          {/* 2. Frosted / Pure White Gradient Scrim for 100% Typography Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 via-45% to-white/15 sm:to-transparent z-1 pointer-events-none" />
          <div className="sm:hidden absolute inset-0 bg-gradient-to-b from-white via-white/90 via-60% to-transparent z-1 pointer-events-none" />

          {/* 3. Text & Call-to-Action Content */}
          <div className="relative z-10 w-full max-w-xl lg:max-w-3xl py-10 sm:py-14 lg:py-16 px-6 sm:px-10 lg:px-14">
            <span className="sr-only">
              {locale === "bn" ? "কাস্টম মেশিনারি সোর্সিং" : "Custom Machinery Sourcing"}
            </span>

            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#2D2D2D] leading-[1.35] text-balance mb-4 sm:mb-5">
              {dict.quoteBanner.title}
            </h2>

            <p className="text-sm sm:text-base text-neutral-600 leading-[1.8] font-normal max-w-lg mb-6 sm:mb-8">
              {dict.quoteBanner.subtitle}
            </p>

            <div className="flex flex-col xl:flex-row items-stretch xl:items-center gap-3 sm:gap-3.5">
              <Link
                href="/quote"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm bg-[#800020] text-white hover:bg-[#600018] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-rose-950/20 cursor-pointer min-h-[44px] shrink-0 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-2"
              >
                <span>{dict.quoteBanner.ctaBtn}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  "Hello Tasneem Knit Industry, I have a specific knitting machine specification requirement and would like a quote."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-white/95 backdrop-blur-md border border-neutral-300/90 text-[#2D2D2D] px-5 sm:px-6 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm hover:bg-neutral-50 hover:border-neutral-400 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 shadow-xs cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="truncate">
                  {dict.quoteBanner.whatsappBtn}: <strong className="font-mono text-emerald-700 font-bold">{COMPANY_INFO.whatsappFormatted}</strong>
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
