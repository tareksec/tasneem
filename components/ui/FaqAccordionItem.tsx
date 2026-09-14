"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItemProps {
  question: string;
  answer: string;
}

export function FaqAccordionItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

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
      className={`rounded-xl p-5 cursor-pointer transition-all duration-200 select-none ${
        isOpen
          ? "bg-[#F9FAFB] text-[#0A0A0A] border-l-4 border-l-[#FF0000] border-t border-r border-b border-[#E5E7EB] shadow-sm"
          : "bg-white text-[#0A0A0A] border border-[#E5E7EB] hover:border-[#C0C0C0] shadow-xs"
      }`}
    >
      <div className="flex justify-between items-center gap-4">
        <h3 className="font-semibold text-base sm:text-lg text-[#0A0A0A]">{question}</h3>
        <ArrowUpRight
          className={`w-5 h-5 shrink-0 transition-transform duration-250 ${
            isOpen ? "rotate-90 text-[#FF0000]" : "text-[#6B7280]"
          }`}
        />
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="faq-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="mt-3 text-sm text-[#4B5563] leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
