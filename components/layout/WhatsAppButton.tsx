"use client";

import { MessageCircle } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";
import { trackWhatsAppClick } from "@/components/analytics/GoogleAnalytics";

export function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    "Hello Tasneem Knit Industry, I would like to inquire about industrial circular knitting machinery specifications and quotation."
  )}`;

  return (
    <aside aria-label="WhatsApp Quick Contact">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick("floating_button")}
        aria-label={`Chat directly on WhatsApp at ${COMPANY_INFO.whatsappFormatted}`}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white pl-3.5 pr-4 py-2.5 sm:pl-4 sm:pr-5 sm:py-3 rounded-full shadow-2xl hidden md:flex items-center gap-2.5 transition-all duration-300 hover:scale-105 border-2 border-white/30 ring-2 ring-emerald-500/40 group shadow-emerald-950/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
      >
        <div className="relative flex items-center justify-center">
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full shadow-xs" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-100 leading-none">
            Chat on WhatsApp
          </span>
          <span className="text-xs sm:text-sm font-extrabold font-mono text-white tracking-wide leading-tight mt-0.5 group-hover:text-emerald-100 transition-colors">
            {COMPANY_INFO.whatsappFormatted}
          </span>
        </div>
      </a>
    </aside>
  );
}
