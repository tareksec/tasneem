"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/LanguageContext";

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
  const [visible, setVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { dict } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 480px (past the hero machine overview card)
      if (window.scrollY > 480) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { y: "100%", opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5E7EB] shadow-[0_-4px_25px_rgba(0,0,0,0.08)] py-3 px-4 sm:px-8"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FF0000] text-white px-2 py-0.5 rounded shadow-xs">
                  {brand}
                </span>
                <span className="text-xs text-[#6B7280] truncate hidden sm:inline">
                  {category.replace("-", " ")}
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#0A0A0A] truncate mt-0.5">
                {machineName}
              </h3>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right hidden md:block">
                <span className="text-xs font-bold text-[#FF0000] block">
                  {price ? `$${price.toLocaleString()} CFR` : dict.common.contactForPrice}
                </span>
                <span className="text-[10px] text-[#6B7280] block">
                  {dict.footer.cfrTag}
                </span>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 border border-[#E5E7EB] bg-[#F9FAFB] text-[#0A0A0A] hover:border-[#C0C0C0] px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors duration-200 shadow-xs"
                aria-label="WhatsApp Inquiry"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>

              <Link
                href={`/quote?machine=${encodeURIComponent(machineName)}&id=${machineId}&category=${category}`}
                className="bg-[#FF0000] hover:bg-[#E00000] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-1.5 shadow-sm"
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
