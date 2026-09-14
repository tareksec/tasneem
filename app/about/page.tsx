"use client";

import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Ship, Wrench, ArrowUpRight, Factory, ExternalLink } from "lucide-react";
import { MotionSection } from "@/components/ui/MotionWrapper";
import { COMPANY_INFO } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { OfficeMap } from "@/components/ui/OfficeMap";

export default function AboutPage() {
  const { t, locale } = useTranslation();

  return (
    <div className="py-12 sm:py-20 bg-white text-[#2D2D2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <MotionSection className="max-w-3xl mb-16">
          <span className="sr-only">{locale === "bn" ? "আমাদের পরিচিতি" : "Corporate Profile & Positioning"}</span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#2D2D2D]">
            {locale === "bn"
              ? "শিল্পমানের Circular Knitting, Dyeing, Shearing ও Finishing মেশিন আমদানিকারক"
              : "Industrial Knitting, Dyeing, Shearing & Finishing Machinery Importer"}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#4B5563] leading-relaxed">
            {locale === "bn"
              ? "নারায়ণগঞ্জের তাসনীম নিট ইন্ডাস্ট্রি দেশের টেক্সটাইল ও রপ্তানিমুখী নিটওয়্যার মিলগুলোর জন্য সেরা মানের Circular Knitting, Dyeing, Shearing ও Finishing মেশিন সরাসরি প্রস্তুতকারক ফ্যাক্টরি থেকে আমদানি, ইনস্টলেশন ও সার্বক্ষণিক টেকনিক্যাল সাপোর্ট দিয়ে থাকে।"
              : "Based in Narayanganj, Bangladesh, Tasneem Knit Industry is dedicated to sourcing, importing, and commissioning high-efficiency circular knitting, dyeing, shearing, finishing, and garments machinery directly from verified overseas manufacturers for the country's textile and apparel export sector."}
          </p>
        </MotionSection>

        {/* Full-Width Operational Pipeline Background Banner */}
        <MotionSection delay={0.08} className="relative w-full rounded-3xl overflow-hidden border border-[#E5E7EB] bg-white shadow-xl mb-16 group">
          {/* Header Bar Overlay with clean frosted backdrop */}
          <div className="relative z-10 px-6 sm:px-10 pt-6 sm:pt-8 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-b from-white via-white/80 to-transparent">
            <div>
              <span className="sr-only">{locale === "bn" ? "আমদানি থেকে ইনস্টলেশন পাইপলাইন" : "End-to-End Operational Pipeline"}</span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#2D2D2D] tracking-tight">
                {locale === "bn"
                  ? "কীভাবে তাসনীম সরাসরি বিদেশি ফ্যাক্টরি থেকে আপনার মিলে মেশিন পৌঁছে দেয়"
                  : "How Tasneem Delivers Factory Machinery Across Bangladesh"}
              </h2>
            </div>
            <span className="text-xs font-mono font-semibold text-neutral-600 bg-neutral-100/90 border border-neutral-200 px-3.5 py-1.5 rounded-full shadow-xs self-start sm:self-auto">
              4-Stage Sourcing & Commissioning
            </span>
          </div>

          {/* Full-Width High-Resolution Graphic Stage */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[16/8] lg:aspect-[16/7] min-h-[360px] sm:min-h-[480px] lg:min-h-[540px] bg-white">
            <Image
              src="/illustrations/process-strip.jpg"
              alt="4-step process visual: Direct Factory Sourcing, Pre-Shipment Inspection, CFR Ocean Shipping, On-Site Installation"
              fill
              priority
              className="object-contain object-bottom sm:object-center px-2 sm:px-6 pb-4 sm:pb-6"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 95vw, 1200px"
            />
          </div>
        </MotionSection>

        {/* 2.1 Founder & Owner Introduction Video Section */}
        <MotionSection delay={0.1} className="mb-20">
          <div className="border border-[#E5E7EB] rounded-3xl bg-gradient-to-b from-[#F9FAFB] to-white p-6 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Video Player Column (7 cols) */}
              <div className="lg:col-span-7">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl border border-[#E5E7EB] bg-neutral-900 group">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/ONTd4X4M-Vo?autoplay=1&mute=1&playsinline=1&rel=0"
                    title="Md Mamunur Rashid - Owner Introduction | Tasneem Knit Industry"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Owner Info & Leadership Statement Column (5 cols) */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF2F4] border border-[#F9E6EA] text-xs font-bold text-[#800020] mb-3 w-fit shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#800020]"></span>
                  <span>{locale === "bn" ? "প্রতিষ্ঠাতার কথা" : "Founder & Owner Introduction"}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D2D2D] leading-tight mb-1.5">
                  {locale === "bn" ? "মোঃ মামুনুর রশীদ" : COMPANY_INFO.owner}
                </h2>
                <p className="text-xs font-bold text-[#800020] uppercase tracking-wider mb-4">
                  {locale === "bn" ? "স্বত্বাধিকারী, তাসনীম নিট ইন্ডাস্ট্রি" : "Proprietor & Managing Director, Tasneem Knit Industry"}
                </p>

                <blockquote className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-6 italic border-l-2 border-[#800020] pl-3.5 bg-neutral-50/60 py-2 rounded-r-lg">
                  {locale === "bn"
                    ? "“আমাদের একটাই লক্ষ্য — দেশের নিট ও টেক্সটাইল মিলগুলোতে কোনো দালাল বা বাড়তি খরচ ছাড়া সরাসরি আন্তর্জাতিক মানের Circular Knitting, Dyeing ও Finishing মেশিন পৌঁছে দেওয়া এবং সার্বক্ষণিক পার্টস ও টেকনিক্যাল সাপোর্ট নিশ্চিত করা।”"
                    : '"Our vision is direct and focused: empower Bangladesh\'s composite knit and apparel mills with verified circular knitting, dyeing, and finishing machinery delivered straight to your factory floor with zero intermediary markups and full technical support."'}
                </blockquote>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#E5E7EB] text-xs">
                  <div>
                    <span className="text-neutral-500 block font-medium">{locale === "bn" ? "প্রধান হাব" : "Operational Hub"}</span>
                    <span className="font-bold text-[#2D2D2D]">{locale === "bn" ? "বিসিক, নারায়ণগঞ্জ" : "BSCIC, Narayanganj"}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block font-medium">{locale === "bn" ? "সরাসরি হটলাইন" : "Direct Helpline"}</span>
                    <a href={`tel:${COMPANY_INFO.phone}`} className="font-bold text-[#800020] hover:underline">
                      {COMPANY_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionSection>

        {/* Business Identity & Focus */}
        <MotionSection delay={0.12} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="border border-[#E5E7EB] rounded-2xl bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4">
                {locale === "bn"
                  ? "আমাদের লক্ষ্য: বিদেশি মেশিন প্রস্তুতকারকদের সাথে দেশি মিলগুলোর সরাসরি সংযোগ"
                  : "Our Mission: Bridging Bangladesh Mills With Overseas Machine Builders"}
              </h2>
              <p className="text-sm text-[#4B5563] leading-relaxed mb-4">
                {locale === "bn"
                  ? "বাংলাদেশের নিটওয়্যার খাত আজ বিশ্ববাজারে শীর্ষে। আন্তর্জাতিক বায়ারদের মান বজায় রাখতে প্রতিটি মিলের প্রয়োজন আধুনিক প্রযুক্তি, নিখুঁত Gauge টলারেন্স আর নিরবচ্ছিন্ন ফ্যাব্রিক আউটপুট। তাসনীম নিট ইন্ডাস্ট্রি কোনো মধ্যস্বত্বভোগী ছাড়াই সরাসরি কারখানা থেকে মেশিন আমদানির সহজ ও নির্ভরযোগ্য পথ তৈরি করেছে।"
                  : "Bangladesh's knitwear export industry is among the largest in the world, requiring continuous technological modernization, tighter gauge tolerance, and higher fabric yield. Tasneem Knit Industry resolves the friction in machinery acquisition by eliminating third-party intermediaries and providing an end-to-end commercial conduit."}
              </p>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                {locale === "bn"
                  ? "Cylinder ডায়ামিটার, Gauge আর Feeder রেশিও নির্ধারণ থেকে শুরু করে SGS/Intertek দিয়ে শিপমেন্ট-পূর্ব কোয়ালিটি চেক, চট্টগ্রাম বন্দরে কনটেইনার পৌঁছানো এবং আপনার মিলে মেশিন চালু করে দেওয়া—পুরো দায়িত্ব আমরা নিষ্ঠার সাথে পালন করি।"
                  : "From initial technical specification matching (cylinder diameter, gauge, and system counts) to third-party pre-shipment quality verification, ocean container transit to Chattogram Port, and factory-floor commissioning, we ensure our clients receive machinery configured precisely for export quality standards."}
              </p>

              {/* Notice */}
              <div className="mt-6 p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-[#4B5563]">
                <span className="font-bold text-[#2D2D2D] block mb-1">
                  {locale === "bn" ? "আইনি ও ব্যবসায়িক নিবন্ধন:" : "Corporate Registration Status:"}
                </span>
                {locale === "bn"
                  ? "নারায়ণগঞ্জ বিসিক ভিত্তিক নিবন্ধিত আমদানিকারক। অফিসিয়াল Proforma Invoice (PI)-তে আমাদের সম্পূর্ণ সরকারি ট্রেড লাইসেন্স, BIN ও IRC নম্বর উল্লেখ থাকে।"
                  : "Direct commercial importer operating in Narayanganj-1421. Full legal registration documents, BIN, and IRC numbers are provided on formal commercial proforma invoices."}
              </div>
            </div>

            {/* Core Values / Operational Standards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-[#E5E7EB] rounded-xl p-5 bg-[#F9FAFB] shadow-sm hover:border-[#C0C0C0] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center mb-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="font-bold text-sm text-[#2D2D2D]">{locale === "bn" ? "নিখুঁত স্পেসিফিকেশন চেক" : "Spec Verification"}</h3>
                <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">
                  {locale === "bn"
                    ? "শিপমেন্টের আগে Cam ট্র্যাকের নিখুঁত ফিনিশিং, Cylinder কনসেন্ট্রিসিটি এবং পজিটিভ ফিডার সিনক্রোনাইজেশন যাচাই করা হয়।"
                    : "Rigorous checking of cam angles, cylinder concentricity, and positive feeder synchronization before dispatch."}
                </p>
              </div>

              <div className="border border-[#E5E7EB] rounded-xl p-5 bg-[#F9FAFB] shadow-sm hover:border-[#C0C0C0] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center mb-3">
                  <Ship className="w-4 h-4 text-[#4B5563]" />
                </div>
                <h3 className="font-bold text-sm text-[#2D2D2D]">{locale === "bn" ? "CFR Chattogram সমুদ্র লজিস্টিকস" : "CFR Chattogram Sea Logistics"}</h3>
                <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">
                  {locale === "bn"
                    ? "স্বচ্ছ CFR রেট এবং কাস্টমস ও ব্যাংকের প্রয়োজনীয় শতভাগ নিখুঁত বাণিজ্যিক কাগজপত্র সরবরাহ করা হয়।"
                    : "Transparent ocean freight terms with complete documentation for commercial customs clearance."}
                </p>
              </div>

              <div className="border border-[#E5E7EB] rounded-xl p-5 bg-[#F9FAFB] shadow-sm hover:border-[#C0C0C0] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center mb-3">
                  <Wrench className="w-4 h-4 text-[#800020]" />
                </div>
                <h3 className="font-bold text-sm text-[#2D2D2D]">{locale === "bn" ? "আপনার মিলে ইনস্টলেশন ও কমিশনিং" : "On-Site Commissioning"}</h3>
                <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">
                  {locale === "bn"
                    ? "নারায়ণগঞ্জ, গাজীপুরসহ সারা দেশের যেকোনো মিলে আমাদের অভিজ্ঞ টেক্সটাইল ইঞ্জিনিয়াররা সরাসরি গিয়ে মেশিন চালু করে দেন।"
                    : "Experienced mechanical and electrical technicians on factory floors in Narayanganj and Gazipur."}
                </p>
              </div>

              <div className="border border-[#E5E7EB] rounded-xl p-5 bg-[#F9FAFB] shadow-sm hover:border-[#C0C0C0] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center mb-3">
                  <Factory className="w-4 h-4 text-[#800020]" />
                </div>
                <h3 className="font-bold text-sm text-[#2D2D2D]">{locale === "bn" ? "আসল স্পেয়ার পার্টস ব্যাকআপ" : "Genuine Spare Parts"}</h3>
                <p className="text-xs text-[#4B5563] mt-1 leading-relaxed">
                  {locale === "bn"
                    ? "প্রয়োজনীয় অরিজিনাল Needle, Sinker, টাইমিং বেল্ট এবং Inverter সার্কিট কার্ড সবসময় আমাদের স্টকে থাকে।"
                    : "Direct replacement needles, sinkers, yarn feeding belts, and inverter circuit boards."}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Key Facts & Contact Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="border border-[#111111] rounded-2xl bg-[#2D2D2D] text-white p-6 sm:p-8 shadow-md">
              <span className="text-xs uppercase tracking-wider text-[#A0A0A0] font-bold block mb-2">
                {locale === "bn" ? "এক নজরে তথ্য" : "Fast Facts"}
              </span>
              <h3 className="text-xl font-bold mb-4 text-white">
                {COMPANY_INFO.name}
              </h3>

              <div className="flex flex-col gap-4 text-xs text-[#A0A0A0]">
                <div className="pb-3 border-b border-[#2A2A2A]">
                  <span className="text-[#A0A0A0] block">{locale === "bn" ? "প্রধান ব্যবসা" : "Primary Sector"}</span>
                  <span className="font-semibold text-white text-sm">
                    {locale === "bn" ? "শিল্পমানের টেক্সটাইল মেশিনারি আমদানিকারক" : "Industrial Circular Knitting Machinery Importer"}
                  </span>
                </div>

                <div className="pb-3 border-b border-[#2A2A2A]">
                  <span className="text-[#A0A0A0] block">{locale === "bn" ? "ঢাকা হেড অফিস" : "Corporate Head Office (Dhaka)"}</span>
                  <span className="font-semibold text-white text-sm block">{locale === "bn" ? COMPANY_INFO.headOffice.addressBn : COMPANY_INFO.headOffice.address}</span>
                  <span className="text-[11px] text-[#A0A0A0] block mt-0.5">{COMPANY_INFO.headOffice.title}</span>
                </div>

                <div className="pb-3 border-b border-[#2A2A2A]">
                  <span className="text-[#A0A0A0] block">{locale === "bn" ? "মেশিনারি শো-রুম ও হাব (নারায়ণগঞ্জ)" : "Machinery Showroom & Operating Hub"}</span>
                  <span className="font-semibold text-white text-sm block">{locale === "bn" ? COMPANY_INFO.showroomOffice.addressBn : COMPANY_INFO.showroomOffice.address}</span>
                </div>

                <div className="pb-3 border-b border-[#2A2A2A]">
                  <span className="text-[#A0A0A0] block">{locale === "bn" ? "চীন অফিস (সোর্সিং ও পার্টনার)" : "China Sourcing & Procurement Office"}</span>
                  <span className="font-semibold text-white text-xs block">{COMPANY_INFO.chinaOffice.company}</span>
                  <span className="text-[11px] text-[#D1D5DB] block mt-0.5">{locale === "bn" ? COMPANY_INFO.chinaOffice.addressBn : COMPANY_INFO.chinaOffice.address}</span>
                </div>

                <div className="pb-3 border-b border-[#2A2A2A]">
                  <span className="text-[#A0A0A0] block">{locale === "bn" ? "নিবন্ধিত বাণিজ্যিক ঠিকানা (ট্রেড লাইসেন্স)" : "Registered Legal Address (Trade License)"}</span>
                  <span className="font-semibold text-white text-xs text-[#D1D5DB]">{COMPANY_INFO.registeredAddress}</span>
                </div>

                <div className="pb-3 border-b border-[#2A2A2A] grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[#A0A0A0] block">{locale === "bn" ? "মালিক / স্বত্বাধিকারী" : "Owner / Proprietor"}</span>
                    <span className="font-semibold text-white text-xs">{COMPANY_INFO.owner}</span>
                  </div>
                  <div>
                    <span className="text-[#A0A0A0] block">{locale === "bn" ? "যোগাযোগ (সেলস)" : "Contact Person"}</span>
                    <span className="font-semibold text-white text-xs">{COMPANY_INFO.contactPerson}</span>
                  </div>
                </div>

                <div className="pb-3 border-b border-[#2A2A2A] grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[#A0A0A0] block">BIN (VAT ID)</span>
                    <span className="font-mono font-semibold text-white text-xs">{COMPANY_INFO.bin}</span>
                  </div>
                  <div>
                    <span className="text-[#A0A0A0] block">e-TIN</span>
                    <span className="font-mono font-semibold text-white text-xs">{COMPANY_INFO.etin}</span>
                  </div>
                </div>

                <div className="pb-3 border-b border-[#2A2A2A] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[#A0A0A0] block">{locale === "bn" ? "ট্রেড লাইসেন্স নং" : "Trade License No"}</span>
                    <span className="font-mono font-semibold text-white text-xs">{COMPANY_INFO.tradeLicense} (Valid: {COMPANY_INFO.tradeLicenseValidity})</span>
                  </div>
                  <a
                    href={COMPANY_INFO.tradeLicenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#800020] hover:bg-[#5A0017] text-white text-xs font-semibold transition-colors shrink-0 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <span>{t.common.viewTradeLicense}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="pb-3 border-b border-[#2A2A2A]">
                  <span className="text-[#A0A0A0] block">{locale === "bn" ? "আমদানিকৃত মেশিনের ধরন" : "Machinery Categories Imported"}</span>
                  <span className="font-semibold text-white text-sm">
                    Circular Knitting, Dyeing, Shearing, Finishing, Other Textile Machinery
                  </span>
                </div>

                <div className="pb-3 border-b border-[#2A2A2A]">
                  <span className="text-[#A0A0A0] block">{locale === "bn" ? "শিপিং ও পেমেন্ট শর্ত" : "Shipping & Delivery Terms"}</span>
                  <span className="font-semibold text-white text-sm">CFR Chattogram Port (Standard), L/C at Sight</span>
                </div>

                <div>
                  <span className="text-[#A0A0A0] block">{locale === "bn" ? "আন্তর্জাতিক পরিদর্শন সংস্থা" : "Inspection Compliance"}</span>
                  <span className="font-semibold text-white text-sm">SGS / Intertek (ITS) / Bureau Veritas (BV)</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2A2A2A]">
                <Link
                  href="/quote"
                  className="w-full bg-[#800020] hover:bg-[#5A0017] active:scale-[0.98] text-white py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#161616]"
                >
                  <span>{t.common.requestQuote}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </MotionSection>

        {/* Office & Showroom Interactive Location Map */}
        <MotionSection delay={0.16} className="mt-16 sm:mt-20">
          <OfficeMap variant="standard" />
        </MotionSection>
      </div>
    </div>
  );
}
