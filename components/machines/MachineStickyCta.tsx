"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { COMPANY_INFO } from "@/lib/constants";

interface MachineStickyCtaProps {
  machineName: string;
  machineId: string;
  category: string;
  brand: string;
  price?: number;
  whatsappUrl: string;
}

export function MachineStickyCta({
  machineName,
  machineId,
  category,
  brand,
  price,
  whatsappUrl,
}: MachineStickyCtaProps) {
  const { dict } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 500px (hero image and main specs seen)
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: shouldReduceMotion ? 0 : 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: shouldReduceMotion ? 0 : 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed bottom-[5.5rem] md:bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5E5E5] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] py-3 px-4 sm:px-6"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="min-w-0">
              <span className="text-[11px] uppercase tracking-wider text-[#717171] font-semibold block truncate">
                {brand}
              </span>
              <h3 className="font-bold text-sm sm:text-base text-[#2D2D2D] truncate">
                {machineName}
              </h3>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right hidden md:block">
                <span className="text-xs font-bold text-[#800020] block">
                  {price ? `$${price.toLocaleString()} CFR` : dict.common.contactForPrice}
                </span>
                <span className="text-[10px] text-[#717171] block">
                  {dict.footer.cfrTag}
                </span>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 border border-[#E5E5E5] bg-[#F9F9F9] text-[#2D2D2D] hover:border-[#800020]/40 active:scale-[0.98] px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]"
                aria-label={`WhatsApp Inquiry at ${COMPANY_INFO.whatsappFormatted}`}
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp: <strong className="font-mono text-emerald-700 font-bold">{COMPANY_INFO.whatsappFormatted}</strong></span>
              </a>

              <Link
                href={`/quote?machine=${encodeURIComponent(machineName)}&id=${machineId}&category=${category}`}
                className="bg-[#800020] hover:bg-[#5A0017] active:scale-[0.98] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-1.5 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-1"
              >
                <span>{dict.featured.quoteBtn}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
