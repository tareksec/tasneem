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
    <div className="h-full border border-[#E5E7EB] rounded-xl p-5 bg-white flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-lg hover:border-[#C0C0C0] transition-all duration-200 group">
      <div>
        {/* Product Photo Preview */}
        <div className="relative w-full aspect-[4/3] rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] overflow-hidden mb-4 flex items-center justify-center">
          <Image
            src={machine.images?.[0] || `/images/machines/cat-${machine.category}.webp`}
            alt={machine.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute top-2 left-2 bg-white/95 border border-[#E5E7EB] px-2 py-0.5 rounded text-[10px] font-bold text-[#0A0A0A] shadow-xs">
            {machine.brand}
          </div>
          <div className="absolute bottom-2 right-2 bg-[#FF0000] text-white px-2 py-0.5 rounded text-[9px] font-bold tracking-wide uppercase shadow-xs">
            {machine.category.replace("-", " ")}
          </div>
        </div>

        {/* Title */}
        <span className="text-[11px] uppercase tracking-wider text-[#6B7280] font-semibold block mb-1">
          {machine.origin ? `Origin: ${machine.origin}` : "Imported Machinery"}
        </span>
        <h3 className="font-bold text-base text-[#0A0A0A] line-clamp-2 leading-snug">
          {machine.name}
        </h3>

        {/* Specifications summary table with mandatory 'Contact for details' fallback */}
        <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex flex-col gap-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[#6B7280] flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-[#4B5563]" />
              {dict.specLabels.gauge}:
            </span>
            <span className="font-medium text-[#0A0A0A]">
              {machine.gauge ?? dict.specLabels.contactForDetails}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#6B7280] flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#4B5563]" />
              {dict.specLabels.cylinderDiameter}:
            </span>
            <span className="font-medium text-[#0A0A0A]">
              {machine.cylinderDiameter ?? dict.specLabels.contactForDetails}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#6B7280] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#4B5563]" />
              {dict.specLabels.feeders}:
            </span>
            <span className="font-medium text-[#0A0A0A]">
              {machine.feeders ? `${machine.feeders} Feeders` : dict.specLabels.contactForDetails}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#6B7280] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {dict.specLabels.availability}:
            </span>
            <span className="font-medium text-[#0A0A0A] capitalize">
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
      <div className="mt-6 pt-4 border-t border-[#E5E7EB] flex items-center gap-2">
        <Link
          href={`/quote?machine=${encodeURIComponent(machine.name)}&id=${machine.id}`}
          className="flex-1 bg-[#FF0000] text-white text-center py-2 px-3 rounded-lg text-xs font-semibold hover:bg-[#E00000] transition-colors duration-200 shadow-xs"
        >
          {dict.featured.quoteBtn}
        </Link>
        <Link
          href={`/machines/${machine.category}/${machine.id}`}
          className="w-8 h-8 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] flex items-center justify-center text-[#4B5563] hover:border-[#C0C0C0] hover:text-[#0A0A0A] transition-colors duration-200 shrink-0 group/arrow shadow-xs"
          aria-label={`View full specifications of ${machine.name}`}
        >
          <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}
