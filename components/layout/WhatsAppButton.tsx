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
        aria-label="Chat directly on WhatsApp"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 sm:p-4 rounded-full shadow-2xl flex items-center gap-2.5 transition-all duration-300 hover:scale-105 border-2 border-[#161616] ring-1 ring-[#2A2A2A] group"
      >
        <MessageCircle className="w-6 h-6 animate-pulse" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-sm font-semibold pr-1">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
}
