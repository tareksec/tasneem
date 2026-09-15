"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Gauge,
  SlidersHorizontal,
  Layers,
  CheckCircle2,
  Activity,
  Droplets,
  Scissors,
  Eye,
  ShieldCheck,
  Anchor,
} from "lucide-react";
import { Machine } from "@/lib/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";

interface MachineCardProps {
  machine: Machine;
}

export function MachineCard({ machine }: MachineCardProps) {
  const { dict, locale } = useTranslation();

  const isCircular =
    machine.mainCategory === "circular-knitting" ||
    ["double-jersey", "single-jersey", "interlock", "jacquard", "terry"].includes(
      machine.category
    );
  const isDyeing = machine.mainCategory === "dyeing" || machine.category === "dyeing";
  const isShearing = machine.mainCategory === "shearing" || machine.category === "shearing";
  const isFinishing = machine.mainCategory === "finishing" || machine.category === "finishing";

  return (
    <div className="h-full border border-[#E5E7EB] rounded-2xl p-4 sm:p-5 bg-white flex flex-col justify-between hover:-translate-y-1 hover:shadow-xl hover:border-[#800020]/40 transition-all duration-200 group">
      <div>
        {/* Product Photo Preview */}
        <Link
          href={`/machines/${machine.category}/${machine.id}`}
          className="relative w-full aspect-[4/3] rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] overflow-hidden mb-4 flex items-center justify-center cursor-pointer block"
        >
          <Image
            src={machine.images?.[0] || `/images/machines/cat-${machine.category}.webp`}
            alt={locale === "bn" && machine.name_bn ? machine.name_bn : machine.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-xs border border-[#E5E7EB] px-2.5 py-0.5 rounded-md text-[11px] font-bold text-[#2D2D2D] shadow-xs">
            {machine.brand}
          </div>
          <div className="absolute bottom-2 right-2 bg-[#800020] text-white px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase shadow-xs">
            {machine.category.replace(/-/g, " ")}
          </div>
        </Link>

        {/* Origin & Availability */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[11px] uppercase tracking-wider text-[#6B7280] font-semibold truncate">
            {machine.origin ? `Origin: ${machine.origin}` : "Imported Machinery"}
          </span>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1 ${
              machine.availability === "in-stock"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-amber-50 text-amber-700 border border-amber-200"
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

        {/* Title */}
        <Link href={`/machines/${machine.category}/${machine.id}`}>
          <h3 className="font-bold text-base text-[#2D2D2D] line-clamp-2 leading-snug group-hover:text-[#800020] transition-colors cursor-pointer">
            {locale === "bn" && machine.name_bn ? machine.name_bn : machine.name}
          </h3>
        </Link>

        {/* Dynamic Context-Aware Specifications Table */}
        <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex flex-col gap-2 text-xs">
          {isCircular ? (
            <>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280] flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-[#800020]" />
                  {dict.specLabels.gauge}:
                </span>
                <span className="font-medium text-[#2D2D2D]">{machine.gauge || "18G – 36G"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280] flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#800020]" />
                  {dict.specLabels.cylinderDiameter}:
                </span>
                <span className="font-medium text-[#2D2D2D]">{machine.cylinderDiameter || "30\" – 38\""}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#800020]" />
                  {dict.specLabels.feeders}:
                </span>
                <span className="font-medium text-[#2D2D2D]">
                  {machine.feeders ? `${machine.feeders} Feeders` : "High-Density Feeders"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280] flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#800020]" />
                  {locale === "bn" ? "উৎপাদন গতি:" : "Speed & Yield:"}
                </span>
                <span className="font-medium text-[#2D2D2D] truncate max-w-[130px]" title={machine.machineSpeed || machine.productionCapacity}>
                  {machine.machineSpeed || (machine.productionCapacity ? machine.productionCapacity.split("(")[0] : "22 – 34 RPM")}
                </span>
              </div>
            </>
          ) : isDyeing ? (
            <>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280] flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-[#800020]" />
                  {dict.specLabels.productionCapacity}:
                </span>
                <span className="font-medium text-[#2D2D2D]">
                  {machine.productionCapacity || "350 – 500 kg/batch"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280] flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#800020]" />
                  {locale === "bn" ? "লিকার রেশিও:" : "Liquor Ratio:"}
                </span>
                <span className="font-medium text-[#2D2D2D]">1:4.5 Low-Liquor Eco</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#800020]" />
                  {dict.specLabels.fabricType}:
                </span>
                <span className="font-medium text-[#2D2D2D] truncate max-w-[130px]">
                  {locale === "bn" && machine.fabricType_bn ? machine.fabricType_bn : machine.fabricType || "Cotton & Blends"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#800020]" />
                  {locale === "bn" ? "কন্ট্রোলার:" : "Controller:"}
                </span>
                <span className="font-medium text-[#2D2D2D]">Multi-Stage Curve</span>
              </div>
            </>
          ) : isShearing ? (
            <>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280] flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#800020]" />
                  {locale === "bn" ? "শিয়ারিং গতি:" : "Working Speed:"}
                </span>
                <span className="font-medium text-[#2D2D2D]">
                  {machine.productionCapacity || "15 – 35 m/min"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280] flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-[#800020]" />
                  {locale === "bn" ? "কাটিং সিলিন্ডার:" : "Cutting System:"}
                </span>
                <span className="font-medium text-[#2D2D2D]">24-Spiral Alloy Blades</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#800020]" />
                  {dict.specLabels.fabricType}:
                </span>
                <span className="font-medium text-[#2D2D2D] truncate max-w-[130px]">
                  {locale === "bn" && machine.fabricType_bn ? machine.fabricType_bn : machine.fabricType || "Polar Fleece & Terry"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#800020]" />
                  {locale === "bn" ? "বর্জ্য নিষ্কাশন:" : "Waste Exhaust:"}
                </span>
                <span className="font-medium text-[#2D2D2D]">Integrated Vacuum</span>
              </div>
            </>
          ) : isFinishing ? (
            <>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280] flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#800020]" />
                  {locale === "bn" ? "অপারেশন স্পিড:" : "Line Speed:"}
                </span>
                <span className="font-medium text-[#2D2D2D]">
                  {machine.productionCapacity || "10 – 30 m/min"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280] flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-[#800020]" />
                  {locale === "bn" ? "ইন্সপেকশন প্যানেল:" : "Inspection Screen:"}
                </span>
                <span className="font-medium text-[#2D2D2D]">High-Lumen Dual LED</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280] flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#800020]" />
                  {locale === "bn" ? "উইন্ডিং সিস্টেম:" : "Winding System:"}
                </span>
                <span className="font-medium text-[#2D2D2D]">Tensionless Auto-Roll</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#800020]" />
                  {dict.specLabels.fabricType}:
                </span>
                <span className="font-medium text-[#2D2D2D] truncate max-w-[130px]">
                  {locale === "bn" && machine.fabricType_bn ? machine.fabricType_bn : machine.fabricType || "All Circular Tubular"}
                </span>
              </div>
            </>
          ) : (
            <>
              {/* Other: Stenters / Compactors */}
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280] flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#800020]" />
                  {locale === "bn" ? "কন্টিনিউয়াস স্পিড:" : "Process Speed:"}
                </span>
                <span className="font-medium text-[#2D2D2D]">
                  {machine.productionCapacity || "20 – 45 m/min"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280] flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#800020]" />
                  {locale === "bn" ? "শ্রিংকেজ নিয়ন্ত্রণ:" : "Shrinkage Rate:"}
                </span>
                <span className="font-medium text-[#2D2D2D]">Residual &lt; 3%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#800020]" />
                  {dict.specLabels.fabricType}:
                </span>
                <span className="font-medium text-[#2D2D2D] truncate max-w-[130px]">
                  {locale === "bn" && machine.fabricType_bn ? machine.fabricType_bn : machine.fabricType || "Knit Open-Width"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6B7280] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#800020]" />
                  {locale === "bn" ? "কমপ্যাক্টিং বেল্ট:" : "Compacting Belt:"}
                </span>
                <span className="font-medium text-[#2D2D2D]">Nomex Seamless Felt</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Industrial Card Footer */}
      <div className="mt-5 pt-3.5 border-t border-[#E5E7EB] flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">
            <Anchor className="w-3 h-3 text-[#800020]" />
            CFR Chattogram
          </span>
          <span className="text-[11px] font-medium text-neutral-500">
            {locale === "bn" ? "১ বছর ওয়ারেন্টি + টেক সাপোর্ট" : "1 Yr Warranty + Support"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/machines/${machine.category}/${machine.id}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#800020] bg-[#FDF2F4] hover:bg-[#FBE4E8] py-2 px-3 rounded-xl transition-colors border border-[#D8A4AF]"
          >
            <span>{dict.featured.specsBtn}</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href={`/quote?machine=${machine.id}`}
            className="inline-flex items-center justify-center text-xs font-bold text-white bg-[#800020] hover:bg-[#5A0017] py-2 px-3.5 rounded-xl transition-colors shadow-xs"
          >
            {locale === "bn" ? "কোটেশন" : "Quote"}
          </Link>
        </div>
      </div>
    </div>
  );
}
