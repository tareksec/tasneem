"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

interface PartnerBrand {
  id: string;
  name: string;
  nameBn: string;
  src: string;
  alt: string;
  origin: string;
  originBn: string;
  specialty: string;
  specialtyBn: string;
  width: number;
  height: number;
  link?: string;
}

const PARTNER_BRANDS: PartnerBrand[] = [
  {
    id: "jiunn-long",
    name: "Jiunn Long Precision Machinery",
    nameBn: "জিউন লং প্রিসিশন মেশিনারি",
    src: "/images/patner/3015-202205271804480009.webp",
    alt: "Jiunn Long Circular Knitting Machinery Taiwan",
    origin: "Taiwan • Direct OEM",
    originBn: "তাইওয়ান • সরাসরি OEM পার্টনার",
    specialty: "High-Speed Double Jersey & Interlock",
    specialtyBn: "হাই-স্পিড ডাবল জার্সি ও ইন্টারলক",
    width: 240,
    height: 60,
    link: "/machines/double-jersey/jiunn-long-double-jersey",
  },
  {
    id: "rongxiang",
    name: "Rongxiang Textile Machinery",
    nameBn: "রংঝিয়াং টেক্সটাইল মেশিনারি",
    src: "/images/patner/1723468796100495.png",
    alt: "Rongxiang High Speed Circular Knitting Machinery",
    origin: "Quanzhou • Certified OEM",
    originBn: "কুয়ানঝৌ • অনুমোদিত প্রস্তুতকারক",
    specialty: "Single Jersey High Production Feeder",
    specialtyBn: "সিঙ্গেল জার্সি হাই-প্রোডাকশন ফিডার",
    width: 200,
    height: 60,
    link: "/machines/single-jersey/rongxiang-single-jersey",
  },
  {
    id: "longjun",
    name: "Longjun Intelligent Machinery",
    nameBn: "লংজুন ইন্টেলিজেন্ট মেশিনারি",
    src: "/images/patner/3915-202402291740094810.webp",
    alt: "Longjun Circular Knitting Machine Builder",
    origin: "Fujian • Heavy Duty",
    originBn: "ফুজিয়ান • হেভি-ডিউটি ফ্রেম",
    specialty: "Heavy Duty Tubular & Open Width",
    specialtyBn: "হেভি-ডিউটি টিউবুলার ও ওপেন উইডথ",
    width: 180,
    height: 60,
    link: "/machines/double-jersey/longjun-double-jersey",
  },
  {
    id: "shanli",
    name: "Shanli Intelligent Equipment",
    nameBn: "শানলি ইন্টেলিজেন্ট ইকুইপমেন্ট",
    src: "/images/patner/cropped-cropped-微信图片_20210330175428.png",
    alt: "Shanli Knitting Machine Factory",
    origin: "Jiangsu • Precision Cam Track",
    originBn: "জিয়াংসু • নিখুঁত ক্যাম ট্র্যাক",
    specialty: "Interlock, Rib & Jacquard Systems",
    specialtyBn: "ইন্টারলক, রিব ও জ্যাকার্ড সিস্টেম",
    width: 170,
    height: 60,
    link: "/machines/double-jersey/shanli-double-jersey",
  },
];

export function InfinityBandScroll() {
  const { locale } = useTranslation();

  // Create duplicate arrays for continuous gap-free scrolling
  const marqueeItems = [...PARTNER_BRANDS, ...PARTNER_BRANDS, ...PARTNER_BRANDS];

  return (
    <section className="w-full bg-[#FAFBFD] py-8 sm:py-10 border-b border-[#E5E7EB] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#800020] animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wide text-[#800020]">
              {locale === "bn"
                ? "আন্তর্জাতিক শীর্ষ প্রস্তুতকারক ও OEM পার্টনার্স"
                : "Verified Overseas Machinery Builders & OEM Partners"}
            </span>
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-2 text-xs text-neutral-500 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {locale === "bn"
                ? "১০০% সরাসরি ফ্যাক্টরি চুক্তি • কোনো মধ্যস্বত্বভোগী নেই"
                : "100% Direct Factory Contracts • Zero Broker Markup"}
            </span>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Scrolling Track with Soft Fade Edges */}
      <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_64px,_black_calc(100%-64px),transparent_100%)] mask-[linear-gradient(to_right,transparent_0,black_64px,black_calc(100%-64px),transparent_100%)] group/track">
        {/* Track 1 */}
        <ul className="flex items-center justify-center md:justify-start gap-4 sm:gap-6 shrink-0 animate-infinite-scroll group-hover/track:[animation-play-state:paused] pr-4 sm:pr-6">
          {marqueeItems.map((brand, index) => (
            <li key={`track1-${brand.id}-${index}`} className="shrink-0">
              <Link
                href={brand.link || "/machines"}
                className="relative flex flex-col items-center justify-center h-24 sm:h-28 px-7 sm:px-9 pb-5 pt-3 bg-white hover:bg-neutral-50 border border-neutral-200/90 hover:border-red-300 rounded-2xl shadow-2xs hover:shadow-md transition-all duration-300 group/card cursor-pointer min-w-[220px] sm:min-w-[260px]"
              >
                <div className="h-12 w-full flex items-center justify-center">
                  <Image
                    src={brand.src}
                    alt={brand.alt}
                    width={brand.width}
                    height={brand.height}
                    className="max-h-10 sm:max-h-11 w-auto max-w-[160px] object-contain transition-transform duration-300 group-hover/card:scale-105"
                  />
                </div>

                {/* Subtle Hover Origin Tag */}
                <span className="absolute bottom-1.5 right-3 text-xs font-mono text-neutral-600 group-hover/card:text-[#800020] font-medium transition-colors">
                  {locale === "bn" ? brand.originBn : brand.origin}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Track 2 (Accessible Duplicate for Continuous Seamless Motion) */}
        <ul
          aria-hidden="true"
          className="flex items-center justify-center md:justify-start gap-4 sm:gap-6 shrink-0 animate-infinite-scroll group-hover/track:[animation-play-state:paused] pr-4 sm:pr-6"
        >
          {marqueeItems.map((brand, index) => (
            <li key={`track2-${brand.id}-${index}`} className="shrink-0">
              <Link
                href={brand.link || "/machines"}
                tabIndex={-1}
                className="relative flex flex-col items-center justify-center h-24 sm:h-28 px-7 sm:px-9 pb-5 pt-3 bg-white hover:bg-neutral-50 border border-neutral-200/90 hover:border-red-300 rounded-2xl shadow-2xs hover:shadow-md transition-all duration-300 group/card cursor-pointer min-w-[220px] sm:min-w-[260px]"
              >
                <div className="h-12 w-full flex items-center justify-center">
                  <Image
                    src={brand.src}
                    alt={brand.alt}
                    width={brand.width}
                    height={brand.height}
                    className="max-h-10 sm:max-h-11 w-auto max-w-[160px] object-contain transition-transform duration-300 group-hover/card:scale-105"
                  />
                </div>

                {/* Subtle Hover Origin Tag */}
                <span className="absolute bottom-1.5 right-3 text-xs font-mono text-neutral-600 group-hover/card:text-[#800020] font-medium transition-colors">
                  {locale === "bn" ? brand.originBn : brand.origin}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default InfinityBandScroll;
