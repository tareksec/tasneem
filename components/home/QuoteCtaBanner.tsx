"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MessageCircle, Sliders } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { COMPANY_INFO } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export function QuoteCtaBanner() {
  const shouldReduceMotion = useReducedMotion();
  const { dict, locale } = useTranslation();

  return (
    <section className="py-16 lg:py-24 bg-white border-t border-[#E5E7EB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="border border-[#E5E7EB] rounded-3xl bg-white shadow-2xl text-[#0A0A0A] relative overflow-hidden min-h-[380px] sm:min-h-[420px] flex items-center"
        >
          {/* 1. Full-Bleed Custom Machinery Sourcing Artwork Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/home/custom-sourcing-bg.png"
              alt="Custom Machinery Sourcing - Tasneem Knit Industry"
              fill
              priority
              className="object-cover object-right sm:object-right select-none pointer-events-none"
              sizes="(max-width: 768px) 100vw, 1280px"
            />
          </div>

          {/* 2. Frosted / Pure White Gradient Scrim for 100% Typography Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 via-45% to-white/15 sm:to-transparent z-1 pointer-events-none" />
          <div className="sm:hidden absolute inset-0 bg-gradient-to-b from-white via-white/90 via-60% to-transparent z-1 pointer-events-none" />

          {/* 3. Text & Call-to-Action Content */}
          <div className="relative z-10 w-full max-w-xl lg:max-w-2xl py-10 sm:py-14 lg:py-16 px-6 sm:px-10 lg:px-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-red-200 text-xs font-bold text-red-600 mb-4 shadow-xs">
              <Sliders className="w-3.5 h-3.5 text-[#FF0000]" />
              <span>{locale === "bn" ? "কাস্টম মেশিনারি সোর্সিং" : "Custom Machinery Sourcing"}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-[#0A0A0A] leading-[1.18] mb-4">
              {dict.quoteBanner.title}
            </h2>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal max-w-lg mb-8">
              {dict.quoteBanner.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3.5">
              <Link
                href="/quote"
                className="w-full sm:w-auto bg-[#FF0000] text-white px-7 py-3.5 rounded-full font-bold text-sm hover:bg-[#E00000] hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 cursor-pointer"
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
                className="w-full sm:w-auto bg-white/95 backdrop-blur-md border border-neutral-300/90 text-[#0A0A0A] px-6 py-3.5 rounded-full font-bold text-sm hover:bg-neutral-50 hover:border-neutral-400 transition-all duration-200 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>{dict.quoteBanner.whatsappBtn}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
