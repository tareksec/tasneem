"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";
import { Machine } from "@/lib/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";

interface MachineCardProps {
  machine: Machine;
}

export function MachineCard({ machine }: MachineCardProps) {
  const { locale } = useTranslation();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images =
    machine.images && machine.images.length > 0
      ? machine.images
      : [`/images/machines/cat-${machine.category || "circular-knitting"}.webp`];

  const currentImage = images[activeImageIndex % images.length];

  // Derive localized title
  const title = locale === "bn" && machine.name_bn ? machine.name_bn : machine.name;

  // Derive price or primary badge text
  const badgeText =
    machine.price && machine.price > 0
      ? `$${machine.price.toLocaleString()}`
      : machine.availability === "in-stock"
      ? locale === "bn"
        ? "রেডি স্টক"
        : "Ready Stock"
      : "CFR Port";

  // Derive description text
  const descriptionText =
    (locale === "bn" && machine.description_bn ? machine.description_bn : machine.description) ||
    `${machine.brand} ${machine.machineType || "Textile Machinery"} engineered for high-efficiency knit composite manufacturing with CFR Chattogram delivery.`;

  // Dynamic tags (up to 2-3 tags for the card)
  const tag1 = machine.category
    ? machine.category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Textile Equipment";

  const tag2 = machine.gauge
    ? `Gauge: ${machine.gauge}`
    : machine.cylinderDiameter
    ? `Dia: ${machine.cylinderDiameter}`
    : machine.machineSpeed
    ? `Speed: ${machine.machineSpeed}`
    : machine.origin
    ? `Origin: ${machine.origin}`
    : "Export Quality";

  const tag3 = machine.feeders
    ? `${machine.feeders} Feeders`
    : machine.productionCapacity
    ? machine.productionCapacity.split("(")[0].trim()
    : machine.origin
    ? `${machine.origin} OEM`
    : null;

  return (
    <div className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-[#0D1117] text-white flex flex-col justify-end min-h-[480px] sm:min-h-[520px] border border-white/10 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1.5 transition-all duration-300 group select-none">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src={currentImage}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Ambient multi-stop dark gradient overlay - replicates the luxury aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/40 via-35% to-[#0A0D12]/95 to-80%" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D12] via-[#0A0D12]/80 via-40% to-transparent pointer-events-none" />
      </div>

      {/* Top Floating Badges */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between gap-2 pointer-events-none">
        {machine.brand && (
          <span className="px-3 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-[11px] font-bold text-white/95 tracking-wide shadow-sm">
            {machine.brand}
          </span>
        )}
        <span
          className={`px-2.5 py-1 rounded-full backdrop-blur-md border text-[10px] font-semibold tracking-wide flex items-center gap-1 shadow-sm ${
            machine.availability === "in-stock"
              ? "bg-emerald-950/60 border-emerald-500/30 text-emerald-300"
              : "bg-black/45 border-white/15 text-white/85"
          }`}
        >
          <CheckCircle2 className="w-2.5 h-2.5" />
          {machine.availability === "in-stock"
            ? locale === "bn"
              ? "রেডি স্টক"
              : "Ready Stock"
            : locale === "bn"
            ? "অর্ডার ভিত্তিক"
            : "Made to Order"}
        </span>
      </div>

      {/* Bottom Content Area */}
      <div className="relative z-10 px-5 sm:px-6 pb-5 sm:pb-6 pt-2 flex flex-col">
        {/* Pagination Dots (3 Dots Indicator) */}
        <div className="flex items-center justify-center gap-1.5 mb-3.5">
          {[0, 1, 2].map((idx) => {
            const isActive = activeImageIndex % 3 === idx;
            return (
              <button
                key={idx}
                type="button"
                aria-label={`View photo ${idx + 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (images.length > 1) {
                    setActiveImageIndex(idx % images.length);
                  }
                }}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? "w-2 h-2 bg-white shadow-xs"
                    : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            );
          })}
        </div>

        {/* Title & Price/Badge Row */}
        <div className="flex items-center justify-between gap-3">
          <Link
            href={`/machines/${machine.category}/${machine.id}`}
            className="flex-1 min-w-0"
          >
            <h3 className="font-bold text-lg sm:text-xl text-white tracking-tight leading-snug line-clamp-1 hover:text-white/90 transition-colors">
              {title}
            </h3>
          </Link>
          <span className="px-3 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-xs shrink-0 tracking-wide">
            {badgeText}
          </span>
        </div>

        {/* Short Description */}
        <p className="text-xs sm:text-[13px] text-white/75 line-clamp-2 leading-relaxed mt-2.5 mb-4">
          {descriptionText}
        </p>

        {/* Feature Tags (Pills) */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/90 text-xs font-medium tracking-wide">
            {tag1}
          </span>
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/90 text-xs font-medium tracking-wide">
            {tag2}
          </span>
          {tag3 && (
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/90 text-xs font-medium tracking-wide hidden sm:inline-block">
              {tag3}
            </span>
          )}
        </div>

        {/* Full-width White Action Button */}
        <Link
          href={`/machines/${machine.category}/${machine.id}`}
          className="w-full py-3 sm:py-3.5 px-4 rounded-full bg-white text-slate-950 font-bold text-xs sm:text-sm text-center shadow-lg shadow-black/30 hover:bg-slate-100 hover:shadow-xl active:scale-[0.98] transition-all duration-200 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {locale === "bn" ? "বিস্তারিত দেখুন" : "View Details"}
        </Link>
      </div>
    </div>
  );
}
