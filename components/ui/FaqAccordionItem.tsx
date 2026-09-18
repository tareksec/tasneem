"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface FaqItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export function FaqAccordionItem({ question, answer, defaultOpen = false }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      onClick={() => setIsOpen(!isOpen)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsOpen(!isOpen);
        }
      }}
      className={`rounded-xl p-4 sm:p-5 cursor-pointer transition-all duration-200 select-none min-h-[44px] ${
        isOpen
          ? "bg-[#F9F9F9] text-[#2D2D2D] border-l-4 border-l-[#800020] border-t border-r border-b border-[#E5E5E5] shadow-sm"
          : "bg-white text-[#2D2D2D] border border-[#E5E5E5] hover:border-[#800020]/40 shadow-xs"
      }`}
    >
      <div className="flex justify-between items-center gap-4">
        <h3 className="font-semibold text-base sm:text-lg text-[#2D2D2D]">{question}</h3>
        <ArrowUpRight
          className={`w-5 h-5 shrink-0 transition-transform duration-250 ${
            isOpen ? "rotate-90 text-[#800020]" : "text-[#717171]"
          }`}
        />
      </div>

      {/* Answer text is ALWAYS present in the DOM for SEO & AI crawlers, collapsed visually with CSS */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm text-[#4A4A4A] leading-relaxed pt-1">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default FaqAccordionItem;
