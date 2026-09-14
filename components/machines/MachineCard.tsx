"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Gauge, SlidersHorizontal, Layers, CheckCircle2 } from "lucide-react";
import { Machine } from "@/lib/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";

interface MachineCardProps {
  machine: Machine;
}

export function MachineCard({ machine }: MachineCardProps) {
  const { dict } = useTranslation();

  return (
    <div className="h-full border border-[#E5E5E5] rounded-xl p-4 sm:p-5 bg-white flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-lg hover:border-[#800020]/40 transition-all duration-200 group">
      <div>
        {/* Product Photo Preview */}
        <div className="relative w-full aspect-[4/3] rounded-lg bg-[#F9F9F9] border border-[#E5E5E5] overflow-hidden mb-4 flex items-center justify-center">
          <Image
            src={machine.images?.[0] || `/images/machines/cat-${machine.category}.webp`}
            alt={machine.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute top-2 left-2 bg-white/95 border border-[#E5E5E5] px-2 py-0.5 rounded text-[10px] font-bold text-[#2D2D2D] shadow-xs">
            {machine.brand}
          </div>
          <div className="absolute bottom-2 right-2 bg-[#800020] text-white px-2 py-0.5 rounded text-[9px] font-bold tracking-wide uppercase shadow-xs">
            {machine.category.replace("-", " ")}
          </div>
        </div>

        {/* Title */}
        <span className="text-[11px] uppercase tracking-wider text-[#717171] font-semibold block mb-1">
          {machine.origin ? `Origin: ${machine.origin}` : "Imported Machinery"}
        </span>
        <h3 className="font-bold text-base text-[#2D2D2D] line-clamp-2 leading-snug group-hover:text-[#800020] transition-colors">
          {machine.name}
        </h3>

        {/* Specifications summary table with mandatory 'Contact for details' fallback */}
        <div className="mt-4 pt-3 border-t border-[#E5E5E5] flex flex-col gap-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[#717171] flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-[#4A4A4A]" />
              {dict.specLabels.gauge}:
            </span>
            <span className="font-medium text-[#2D2D2D]">
              {machine.gauge ?? dict.specLabels.contactForDetails}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#717171] flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#4A4A4A]" />
              {dict.specLabels.cylinderDiameter}:
            </span>
            <span className="font-medium text-[#2D2D2D]">
              {machine.cylinderDiameter ?? dict.specLabels.contactForDetails}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#717171] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#4A4A4A]" />
              {dict.specLabels.feeders}:
            </span>
            <span className="font-medium text-[#2D2D2D]">
              {machine.feeders ? `${machine.feeders} Feeders` : dict.specLabels.contactForDetails}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#717171] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {dict.specLabels.availability}:
            </span>
            <span className="font-medium text-[#2D2D2D] capitalize">
              {machine.availability === "in-stock"
                ? "In Stock"
                : machine.availability === "made-to-order"
                ? "Made to Order"
                : dict.specLabels.contactForDetails}
            </span>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-[#E5E5E5] flex items-center gap-2">
        <Link
          href={`/quote?machine=${encodeURIComponent(machine.name)}&id=${machine.id}`}
          className="flex-1 bg-[#800020] text-white text-center py-2.5 px-3 rounded-lg text-xs font-semibold hover:bg-[#5A0017] active:scale-[0.98] transition-all duration-200 shadow-xs min-h-[40px] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-1"
        >
          {dict.featured.quoteBtn}
        </Link>
        <Link
          href={`/machines/${machine.category}/${machine.id}`}
          className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg border border-[#E5E5E5] bg-[#F9F9F9] flex items-center justify-center text-[#4A4A4A] hover:border-[#800020] hover:text-[#800020] active:scale-[0.98] transition-all duration-200 shrink-0 group/arrow shadow-xs min-w-[40px] min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-1"
          aria-label={`View full specifications of ${machine.name}`}
        >
          <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}
