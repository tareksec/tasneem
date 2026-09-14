"use client";

import React from "react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  variant?: "header" | "footer" | "mobile" | "capsule";
  className?: string;
}

export function LanguageSwitcher({ variant = "header", className = "" }: LanguageSwitcherProps) {
  const { locale, setLocale, toggleLocale } = useTranslation();

  if (variant === "footer") {
    return (
      <div className={`inline-flex items-center gap-2 p-1 rounded-lg bg-[#161616] border border-[#2A2A2A] text-xs ${className}`}>
        <Globe className="w-3.5 h-3.5 text-[#A0A0A0] ml-1.5" />
        <button
          type="button"
          onClick={() => setLocale("en")}
          className={`px-2.5 py-1 rounded font-medium transition-all ${
            locale === "en"
              ? "bg-[#FF0000] text-white shadow-sm font-semibold"
              : "text-[#A0A0A0] hover:text-white"
          }`}
          aria-label="Switch to English"
        >
          EN
        </button>
        <span className="text-[#4B5563]">/</span>
        <button
          type="button"
          onClick={() => setLocale("bn")}
          className={`px-2.5 py-1 rounded font-medium transition-all ${
            locale === "bn"
              ? "bg-[#FF0000] text-white shadow-sm font-semibold"
              : "text-[#A0A0A0] hover:text-white"
          }`}
          aria-label="বাংলা ভাষায় পরিবর্তন করুন"
        >
          বাংলা
        </button>
      </div>
    );
  }

  if (variant === "capsule") {
    return (
      <div
        className={`inline-flex items-center rounded-full bg-neutral-100/90 border border-neutral-200/80 p-0.5 text-xs font-medium ${className}`}
        role="group"
        aria-label="Language selector"
      >
        <button
          type="button"
          onClick={() => setLocale("en")}
          className={`px-2.5 py-1 rounded-full transition-all duration-150 text-[11px] font-semibold ${
            locale === "en"
              ? "bg-[#0A0A0A] text-white shadow-xs"
              : "text-neutral-600 hover:text-neutral-950"
          }`}
          aria-label="English"
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => setLocale("bn")}
          className={`px-2.5 py-1 rounded-full transition-all duration-150 text-[11px] font-semibold ${
            locale === "bn"
              ? "bg-[#0A0A0A] text-white shadow-xs"
              : "text-neutral-600 hover:text-neutral-950"
          }`}
          aria-label="বাংলা"
        >
          বাং
        </button>
      </div>
    );
  }

  // Header / desktop & mobile variant
  return (
    <div
      className={`inline-flex items-center rounded-lg bg-[#161616] border border-[#2A2A2A] p-0.5 text-xs font-medium shadow-sm ${className}`}
      role="group"
      aria-label="Language selector"
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md transition-all duration-150 flex items-center gap-1 ${
          locale === "en"
            ? "bg-[#FF0000] text-white font-semibold shadow-xs"
            : "text-[#A0A0A0] hover:text-white"
        }`}
        aria-label="English"
      >
        <span>EN</span>
      </button>

      <button
        type="button"
        onClick={() => setLocale("bn")}
        className={`px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md transition-all duration-150 flex items-center gap-1 ${
          locale === "bn"
            ? "bg-[#FF0000] text-white font-semibold shadow-xs"
            : "text-[#A0A0A0] hover:text-white"
        }`}
        aria-label="বাংলা"
      >
        <span>বাংলা</span>
      </button>
    </div>
  );
}
