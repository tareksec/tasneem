"use client";

import React, { useState } from "react";
import { MapPin, Navigation, ExternalLink, Compass, ShieldCheck } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";

export interface OfficeMapProps {
  variant?: "compact" | "standard" | "full";
  className?: string;
  showDirectionsLink?: boolean;
  showAddressCard?: boolean;
  title?: string;
  subtitle?: string;
}

export function OfficeMap({
  variant = "standard",
  className,
  showDirectionsLink = true,
  showAddressCard = true,
  title,
  subtitle,
}: OfficeMapProps) {
  const { locale } = useTranslation();
  const isBn = locale === "bn";
  const [isLoaded, setIsLoaded] = useState(false);

  const mapsData = COMPANY_INFO.maps;
  const directionsUrl = mapsData.shortUrl || mapsData.placeUrl;

  // COMPACT VARIANT (Optimized for Footer & Small Sidebars)
  if (variant === "compact") {
    return (
      <div className={cn("group flex flex-col gap-1.5 w-full", className)}>
        <div className="relative w-full h-[155px] sm:h-[165px] rounded-2xl overflow-hidden border border-neutral-200/90 bg-neutral-100 shadow-2xs">
          {/* Skeleton / Loading state */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-neutral-200 animate-pulse flex items-center justify-center text-xs text-neutral-500 gap-1.5">
              <Compass className="w-4 h-4 animate-spin text-neutral-400" />
              <span>{isBn ? "ম্যাপ লোড হচ্ছে..." : "Loading Map..."}</span>
            </div>
          )}

          <iframe
            src={mapsData.embedUrl}
            title={isBn ? "তাসনীম নিট ইন্ডাস্ট্রি অফিস ম্যাপ" : "Tasneem Knitting Industry Office Map"}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setIsLoaded(true)}
            className="w-full h-full object-cover transition-opacity duration-300"
          />

          {/* Compact Overlay Pill for turn-by-turn directions */}
          {showDirectionsLink && (
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2 right-2 z-10 bg-white/95 hover:bg-white text-neutral-900 border border-neutral-200/80 hover:border-neutral-300 px-2.5 py-1 rounded-full text-[10px] font-bold shadow-xs flex items-center gap-1 transition-all backdrop-blur-xs hover:scale-102"
              title={isBn ? "গুগল ম্যাপে দেখুন" : "View on Google Maps"}
            >
              <Navigation className="w-3 h-3 text-[#800020]" />
              <span>{isBn ? "গুগল ম্যাপে দেখুন" : "View on Maps"}</span>
              <ExternalLink className="w-2.5 h-2.5 text-neutral-400" />
            </a>
          )}
        </div>

        {showAddressCard && (
          <div className="flex items-center justify-between text-[11px] text-neutral-500 px-1">
            <span className="truncate">{COMPANY_INFO.addressShort}</span>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#800020] hover:underline font-semibold shrink-0 ml-1 flex items-center gap-0.5"
            >
              <span>{isBn ? "দিকনির্দেশনা" : "Directions"}</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        )}
      </div>
    );
  }

  // STANDARD VARIANT (Optimized for About page and standard content cards)
  if (variant === "standard") {
    return (
      <div
        className={cn(
          "rounded-3xl border border-[#E5E5E5] bg-white overflow-hidden shadow-sm flex flex-col",
          className
        )}
      >
        {/* Top Header Card */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-b from-slate-50/60 to-white">
          <div>
            <span className="sr-only">{title || (isBn ? "আমাদের অফিস ও শোরুম অবস্থান" : "Office & Showroom Location")}</span>
            <h3 className="text-base sm:text-lg font-extrabold text-[#2D2D2D] tracking-tight">
              {COMPANY_INFO.name} — {isBn ? "নারায়ণগঞ্জ হাব" : "Narayanganj Hub"}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 max-w-xl">
              {subtitle || (isBn ? COMPANY_INFO.addressBn : COMPANY_INFO.address)}
            </p>
          </div>

          {showDirectionsLink && (
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#800020] hover:bg-[#5A0017] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-98 self-start sm:self-auto cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-2"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{isBn ? "গুগল ম্যাপে দিকনির্দেশনা পান" : "Get Directions"}</span>
              <ExternalLink className="w-3 h-3 text-white/80" />
            </a>
          )}
        </div>

        {/* Embedded Interactive Map */}
        <div className="relative w-full h-[280px] sm:h-[340px] bg-slate-100">
          {!isLoaded && (
            <div className="absolute inset-0 bg-slate-100 animate-pulse flex items-center justify-center text-xs text-slate-500 gap-2">
              <Compass className="w-4 h-4 animate-spin text-slate-400" />
              <span>{isBn ? "ইন্টারঅ্যাক্টিভ ম্যাপ লোড হচ্ছে..." : "Loading Interactive Map..."}</span>
            </div>
          )}

          <iframe
            src={mapsData.embedUrl}
            title={isBn ? "তাসনীম নিট ইন্ডাস্ট্রি শোরুম ম্যাপ" : "Tasneem Knit Industry Showroom Map"}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setIsLoaded(true)}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }

  // FULL VARIANT (Optimized for Contact page with floating info pill and directions action)
  return (
    <div
      className={cn(
        "rounded-3xl border border-[#E5E5E5] bg-white overflow-hidden shadow-sm relative flex flex-col",
        className
      )}
    >
      {/* Header bar */}
      <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-50 via-white to-[#FDF2F4]/40">
        <div>
          <span className="sr-only">{isBn ? "লাইভ লোকেশন ম্যাপ" : "Live Office & Showroom Map"}</span>
          <h2 className="text-xl sm:text-2xl font-black text-[#2D2D2D] tracking-tight">
            {title || (isBn ? "আমাদের শোরুম ও পরিদর্শন কেন্দ্র" : "Visit Our Narayanganj Showroom & Hub")}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            {subtitle ||
              (isBn
                ? "বিসিক শিল্পনগরী সংলগ্ন আমাদের প্রধান শোরুমে আধুনিক সার্কুলার নিটিং, ডাইং ও ফিনিশিং মেশিনের লাইভ অপারেশন দেখতে চলে আসুন।"
                : "Experience high-speed circular knitting, dyeing, and finishing machinery live at our BSCIC Industrial Park showroom hub in Narayanganj.")}
          </p>
        </div>

        {showDirectionsLink && (
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-start sm:self-auto">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#800020] hover:bg-[#5A0017] text-white px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md active:scale-98 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-2"
            >
              <Navigation className="w-4 h-4" />
              <span>{isBn ? "গুগল ম্যাপে দিকনির্দেশনা" : "Get Turn-by-Turn Directions"}</span>
              <ExternalLink className="w-3.5 h-3.5 text-white/80" />
            </a>
          </div>
        )}
      </div>

      {/* Interactive Map Iframe Canvas with Floating Quick-Info Card */}
      <div className="relative w-full h-[360px] sm:h-[440px] bg-slate-100">
        {!isLoaded && (
          <div className="absolute inset-0 bg-slate-100 animate-pulse flex items-center justify-center text-xs text-slate-500 gap-2">
            <Compass className="w-5 h-5 animate-spin text-slate-400" />
            <span>{isBn ? "গুগল ম্যাপ লোড হচ্ছে..." : "Loading Google Maps Embed..."}</span>
          </div>
        )}

        <iframe
          src={mapsData.embedUrl}
          title={isBn ? "তাসনীম নিট ইন্ডাস্ট্রি গুগল ম্যাপ" : "Tasneem Knit Industry Google Maps Location"}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setIsLoaded(true)}
          className="w-full h-full object-cover"
        />

        {/* Floating Quick Address Badge on Top-Left */}
        {showAddressCard && (
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 max-w-xs sm:max-w-sm bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-slate-200/80 shadow-lg pointer-events-auto hidden min-[400px]:block">
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#FDF2F4] text-[#800020] flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-[#2D2D2D] leading-tight truncate">
                  {COMPANY_INFO.name}
                </h4>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-snug line-clamp-2">
                  {isBn ? COMPANY_INFO.addressBn : COMPANY_INFO.address}
                </p>
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                  <span>🕒 {COMPANY_INFO.businessHours.split(":")[0]}</span>
                  <a
                    href={`tel:${COMPANY_INFO.phoneAlt.replace(/[^0-9+]/g, "")}`}
                    className="font-bold text-[#2D2D2D] hover:text-[#800020]"
                  >
                    {COMPANY_INFO.phoneAlt}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
