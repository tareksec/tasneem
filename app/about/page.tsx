"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Ship,
  Wrench,
  ArrowUpRight,
  Factory,
  ExternalLink,
  Award,
  Globe2,
  Building2,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Cpu,
  Clock,
  FileText,
} from "lucide-react";
import { MotionSection } from "@/components/ui/MotionWrapper";
import { LiteYouTubeEmbed } from "@/components/ui/LiteYouTubeEmbed";
import { COMPANY_INFO } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { OfficeMap } from "@/components/ui/OfficeMap";

export default function AboutPage() {
  const { t, locale } = useTranslation();
  const isBn = locale === "bn";

  return (
    <div className="bg-[#FAF9F6] text-slate-800 font-sans selection:bg-[#E11D48] selection:text-white">
      
      {/* 1. Cinematic Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#090D1A] via-[#0E1629] to-[#0A0F1E] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider mb-5">
              <ShieldCheck className="w-4 h-4 text-rose-400" />
              <span>
                {isBn
                  ? "নিবন্ধিত টেক্সটাইল মেশিনারি আমদানিকারক • বিসিক, নারায়ণগঞ্জ"
                  : "Verified Industrial Machinery Importer • BSCIC Narayanganj"}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
              {isBn ? (
                <>
                  বাংলাদেশের নিট খাতের জন্য{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-500 to-amber-400">
                    চীন থেকে সরাসরি
                  </span>{" "}
                  মেশিনারি সোর্সিং পার্টনার
                </>
              ) : (
                <>
                  Direct China Machinery Sourcing for{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-500 to-amber-400">
                    Bangladesh Knit Mills
                  </span>
                </>
              )}
            </h1>

            {/* Description */}
            <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {isBn
                ? "কোনো মধ্যস্বত্বভোগী ছাড়াই চীন থেকে সরাসরি আধুনিক Circular Knitting, Dyeing, Shearing ও Finishing মেশিন আমদানি, বন্দর ছাড়করণ, ফ্যাক্টরিতে ইনস্টলেশন এবং সার্বক্ষণিক জেনুইন স্পেয়ার পার্টস সরবরাহ করে তাসনীম নিট ইন্ডাস্ট্রি।"
                : "Tasneem Knitting Industry bridges Bangladesh composite mills directly with premier overseas manufacturing plants in China. We manage technical specification matching, 100% factory trial runs, CFR ocean transit, and nationwide mill commissioning."}
            </p>

            {/* Quick Action Pills */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                href="/machines"
                className="px-6 py-3.5 rounded-xl bg-[#DF1E38] hover:bg-[#C2162E] active:scale-[0.98] text-white text-xs sm:text-sm font-bold shadow-lg shadow-red-950/50 transition-all flex items-center gap-2"
              >
                <span>{isBn ? "মেশিনারি ক্যাটালগ দেখুন" : "Explore Machinery Catalog"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/quote"
                className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2"
              >
                <span>{isBn ? "সরাসরি কোটেশন নিন" : "Request Commercial PI Quote"}</span>
                <ArrowUpRight className="w-4 h-4 text-rose-400" />
              </Link>
            </div>
          </div>

          {/* 4 Stat Highlights */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 pt-10 border-t border-slate-800/80">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-rose-400 mb-1">
                <Factory className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Direct Sourcing</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">100% Direct</div>
              <p className="text-[11px] text-slate-400 mt-1">Direct from China manufacturing plants without broker markups.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-rose-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Quality Inspection</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">30–60 Min</div>
              <p className="text-[11px] text-slate-400 mt-1">Mandatory dry running trial & fabric test before container crating.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-rose-400 mb-1">
                <Ship className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Port Delivery</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">CFR Sea Freight</div>
              <p className="text-[11px] text-slate-400 mt-1">Transparent CFR Chattogram delivery with full banking LC documentation.</p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-rose-400 mb-1">
                <Wrench className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">After-Sales</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">12 Months</div>
              <p className="text-[11px] text-slate-400 mt-1">Comprehensive manufacturer warranty & on-site mill commissioning.</p>
            </div>
          </div>
        </div>

        {/* Ambient Radial Gradient */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-16 sm:space-y-24">

        {/* 2. Operational Pipeline Visual Strip */}
        <MotionSection className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl group">
          <div className="px-6 sm:px-10 pt-6 sm:pt-8 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#800020] block mb-1">
                {isBn ? "প্রক্রিয়া ও স্বচ্ছতা" : "Operational Transparency"}
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
                {isBn
                  ? "চীন ফ্যাক্টরি থেকে আপনার টেক্সটাইল মিলে পৌঁছানোর ৪ ধাপ"
                  : "End-to-End Operational Pipeline from Factory to Your Mill"}
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 border border-slate-300 px-3.5 py-1.5 rounded-full self-start sm:self-auto shadow-2xs">
              4-Stage Sourcing Pipeline
            </span>
          </div>

          <div className="relative w-full aspect-[16/9] sm:aspect-[16/8] lg:aspect-[16/7] min-h-[340px] sm:min-h-[460px] lg:min-h-[520px] bg-white">
            <Image
              src="/illustrations/process-strip.jpg"
              alt="4-step process visual: Direct Factory Sourcing, Pre-Shipment Inspection, CFR Ocean Shipping, On-Site Installation"
              fill
              priority
              className="object-contain object-bottom sm:object-center px-3 sm:px-8 pb-4 sm:pb-6"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 95vw, 1200px"
            />
          </div>
        </MotionSection>

        {/* 3. Founder Video & Leadership Vision */}
        <MotionSection className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-10 lg:p-12 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Video Column (7 Cols) */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <LiteYouTubeEmbed
                videoId="ONTd4X4M-Vo"
                title="Md Mamunur Rashid - Owner Introduction | Tasneem Knit Industry"
              />
            </div>

            {/* Founder Info Column (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-center text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold text-[#800020] mb-3 w-fit shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#DF1E38] animate-pulse" />
                <span>{isBn ? "প্রতিষ্ঠাতা ও ব্যবস্থাপনা দর্শন" : "Founder & Managing Director"}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                {isBn ? "মোঃ মামুনুর রশীদ" : COMPANY_INFO.owner}
              </h2>
              <p className="text-xs sm:text-sm font-bold text-[#DF1E38] uppercase tracking-wider mt-1 mb-4">
                {isBn ? "স্বত্বাধিকারী, তাসনীম নিট ইন্ডাস্ট্রি" : "Proprietor, Tasneem Knitting Industry"}
              </p>

              <blockquote className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 italic border-l-4 border-[#DF1E38] pl-4 py-2 bg-slate-50/80 rounded-r-xl">
                {isBn
                  ? "“আমাদের একটাই লক্ষ্য — দেশের নিট ও টেক্সটাইল মিলগুলোতে কোনো দালাল বা বাড়তি খরচ ছাড়া সরাসরি আন্তর্জাতিক মানের Circular Knitting, Dyeing ও Finishing মেশিন পৌঁছে দেওয়া এবং সার্বক্ষণিক পার্টস ও টেকনিক্যাল সাপোর্ট নিশ্চিত করা।”"
                  : '"Our commitment is clear: eliminate speculative middlemen and deliver top-tier circular knitting and dyeing machinery directly from proven overseas manufacturing lines with full technical assurance and zero friction."'}
              </blockquote>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium uppercase tracking-wider text-[10px]">
                    {isBn ? "প্রধান হাব" : "Operational Hub"}
                  </span>
                  <span className="font-bold text-slate-900 text-sm">
                    {isBn ? "বিসিক, নারায়ণগঞ্জ" : "BSCIC, Narayanganj"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium uppercase tracking-wider text-[10px]">
                    {isBn ? "সরাসরি হটলাইন" : "Direct Helpline"}
                  </span>
                  <a href={`tel:${COMPANY_INFO.phoneIntl}`} className="font-bold text-[#DF1E38] text-sm hover:underline">
                    {COMPANY_INFO.hotline}
                  </a>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <Link
                  href="/founder"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DF1E38] hover:text-red-700 transition-colors group"
                >
                  <span>{isBn ? "প্রতিষ্ঠাতার বিস্তারিত প্রোফাইল ও দর্শন দেখুন" : "Read Founder's Full Story & Mill Journey"}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </MotionSection>

        {/* 4. Strategic Mission & Operational Excellence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Mission & Core Value Cards (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-9 shadow-xs text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#800020] bg-rose-50 px-3 py-1 rounded-full border border-rose-200 inline-block mb-3">
                {isBn ? "আমাদের লক্ষ্য ও প্রতিশ্রুতি" : "Our Mission & Commercial Focus"}
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
                {isBn
                  ? "বিশ্বমানের মেশিনারি ও দেশীয় নিট খাতের মধ্যে সরাসরি সেতু"
                  : "Bridging Bangladesh Textile Mills With World-Class Machine Builders"}
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                {isBn
                  ? "বাংলাদেশের নিটওয়্যার খাত আজ বিশ্ববাজারে দ্বিতীয় বৃহত্তম। আন্তর্জাতিক ফ্যাশন ব্র্যান্ডগুলোর চাহিদা অনুযায়ী রপ্তানি বজায় রাখতে দেশীয় মিলগুলোর জন্য প্রয়োজন উচ্চগতির ও নিখুঁত Gauge সম্পন্ন মেশিন। তাসনীম নিট ইন্ডাস্ট্রি কোনো মধ্যস্বত্বভোগী ছাড়া সরাসরি প্রস্তুতকারক ফ্যাক্টরি থেকে আমদানির স্বচ্ছ প্ল্যাটফর্ম তৈরি করেছে।"
                  : "Bangladesh's knit composite industry produces billions in global export apparel each year. Meeting strict buyer tolerances requires constant machinery upgrades, precision cylinder engineering, and minimal mechanical downtime. Tasneem Knitting Industry provides direct factory procurement with complete institutional accountability."}
              </p>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {isBn
                  ? "Cylinder ব্যাস, Gauge এবং Feeder রেশিও নির্ধারণ থেকে শুরু করে প্রাক-জাহাজিকরণ (PSI) কোয়ালিটি ট্রায়াল, চট্টগ্রাম সি-পোর্ট সমুদ্র লজিস্টিকস এবং আপনার মিলে মেশিন ইনস্টলেশন ও ট্রায়াল রান—প্রতিটি ধাপ আমরা দায়িত্বের সাথে সম্পন্ন করি।"
                  : "From matching technical specifications (single jersey 4-track, double jersey interlock, open-width slitters, high-efficiency dyeing vessels) to remote video trial runs, customs documentation, and on-site factory commissioning, we stand behind every single machine."}
              </p>
            </div>

            {/* 4 Pillars of Excellence */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-rose-300 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">
                  {isBn ? "নিখুঁত স্পেসিফিকেশন চেক" : "Rigorous Pre-Shipment Inspection"}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {isBn
                    ? "শিপমেন্টের আগে ক্যাম ট্র্যাক, সিলিন্ডার কনসেন্ট্রিসিটি ও পজিটিভ ফিডার নির্ভুলতা ৩০-৬০ মিনিট রানিং টেস্টে যাচাই করা হয়।"
                    : "Continuous running trial tests in China inspect cam tracks, cylinder concentricity, and feeder timing before crating."}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-rose-300 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mb-3">
                  <Ship className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">
                  {isBn ? "CFR Chattogram সমুদ্র লজিস্টিকস" : "CFR Chattogram Sea Delivery"}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {isBn
                    ? "স্বচ্ছ আন্তর্জাতিক সমুদ্র ফ্রেইট ও বাংলাদেশ ব্যাংকের নিয়মানুযায়ী শতভাগ নির্ভুল কমার্শিয়াল এলসি ডকুমেন্টেশন।"
                    : "Transparent CFR freight terms and zero-defect import documentation complying with Bangladesh Bank rules."}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-rose-300 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-[#800020] flex items-center justify-center mb-3">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">
                  {isBn ? "আপনার মিলে ইনস্টলেশন ও কমিশনিং" : "On-Site Mill Commissioning"}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {isBn
                    ? "নারায়ণগঞ্জ, গাজীপুরসহ সারা দেশে আমাদের অভিজ্ঞ টেক্সটাইল ইঞ্জিনিয়াররা সরাসরি মিলে গিয়ে মেশিন চালু করে দেন।"
                    : "Experienced field service engineers handle machine leveling, lubrication, and trial fabric runs at your factory."}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-rose-300 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mb-3">
                  <Factory className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-slate-900">
                  {isBn ? "আসল স্পেয়ার পার্টস ব্যাকআপ" : "Genuine Spare Parts Inventory"}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {isBn
                    ? "প্রয়োজনীয় Groz-Beckert নিডল, সিঙ্কার, টাইমিং বেল্ট এবং ইনভার্টার কার্ড সবসময় আমাদের নারায়ণগঞ্জ স্টকে থাকে।"
                    : "Instant local stock of genuine needles, sinkers, yarn storage belts, and inverter electronics in Narayanganj."}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Institutional Fast Facts Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#0B1220] border border-slate-800 rounded-3xl text-white p-6 sm:p-8 shadow-2xl text-left relative overflow-hidden">
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400 bg-rose-950/80 border border-rose-800 px-2.5 py-0.5 rounded-full">
                    Official Entity
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-1.5">
                    {COMPANY_INFO.name}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>

              {/* Data Rows */}
              <div className="divide-y divide-slate-800/80 text-xs">
                <div className="py-3">
                  <span className="text-slate-400 block text-[11px]">{isBn ? "প্রধান ব্যবসা" : "Core Business"}</span>
                  <span className="font-semibold text-slate-200 text-xs sm:text-sm mt-0.5 block">
                    {isBn ? "শিল্পমানের টেক্সটাইল মেশিনারি আমদানিকারক ও সরবরাহকারী" : "Industrial Textile Machinery Direct Importer & Supplier"}
                  </span>
                </div>

                <div className="py-3">
                  <span className="text-slate-400 block text-[11px]">{isBn ? "শোরুম ও মেশিনারি হাব (নারায়ণগঞ্জ)" : "Showroom & Hub (Narayanganj)"}</span>
                  <span className="font-semibold text-slate-200 text-xs sm:text-sm mt-0.5 block">
                    {isBn ? COMPANY_INFO.showroomOffice.addressBn : COMPANY_INFO.showroomOffice.address}
                  </span>
                </div>

                <div className="py-3">
                  <span className="text-slate-400 block text-[11px]">{isBn ? "ঢাকা হেড অফিস" : "Dhaka Corporate Office"}</span>
                  <span className="font-semibold text-slate-200 text-xs sm:text-sm mt-0.5 block">
                    {isBn ? COMPANY_INFO.headOffice.addressBn : COMPANY_INFO.headOffice.address}
                  </span>
                </div>

                <div className="py-3">
                  <span className="text-slate-400 block text-[11px]">{isBn ? "চীন সোর্সিং পার্টনার অফিস" : "China Sourcing Office"}</span>
                  <span className="font-semibold text-rose-300 text-xs block">{COMPANY_INFO.chinaOffice.company}</span>
                  <span className="text-slate-400 text-[11px] mt-0.5 block leading-normal">
                    {isBn ? COMPANY_INFO.chinaOffice.addressBn : COMPANY_INFO.chinaOffice.address}
                  </span>
                </div>

                <div className="py-3 grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 block text-[11px]">BIN (VAT ID)</span>
                    <span className="font-mono font-bold text-white text-xs">{COMPANY_INFO.bin}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">e-TIN</span>
                    <span className="font-mono font-bold text-white text-xs">{COMPANY_INFO.etin}</span>
                  </div>
                </div>

                <div className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-slate-400 block text-[11px]">{isBn ? "ট্রেড লাইসেন্স" : "Trade License"}</span>
                    <span className="font-mono font-bold text-white text-xs">{COMPANY_INFO.tradeLicense}</span>
                  </div>
                  <a
                    href={COMPANY_INFO.tradeLicenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#DF1E38] hover:bg-[#C2162E] text-white text-xs font-bold transition-all inline-flex items-center gap-1 shadow-sm"
                  >
                    <span>{isBn ? "লাইসেন্স দেখুন" : "View License"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="py-3">
                  <span className="text-slate-400 block text-[11px]">{isBn ? "অফিসিয়াল যোগাযোগ" : "Official Inquiries"}</span>
                  <div className="mt-1 space-y-1">
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-rose-400 hover:underline block font-semibold">
                      {COMPANY_INFO.email}
                    </a>
                    <a href={`tel:${COMPANY_INFO.phoneIntl}`} className="text-slate-300 hover:underline block font-mono">
                      Hotline: {COMPANY_INFO.hotline}
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct Quote CTA */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                <Link
                  href="/quote"
                  className="w-full py-3 px-4 rounded-xl bg-[#DF1E38] hover:bg-[#C2162E] active:scale-[0.98] text-white text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-950/60 cursor-pointer"
                >
                  <span>{isBn ? "মেশিনের কোটেশন ও এলসি তথ্য নিন" : "Request Commercial PI Quote"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* 5. Showroom & Office Location Map */}
        <MotionSection className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#800020] bg-rose-50 px-3 py-1 rounded-full border border-rose-200 inline-block mb-2">
              {isBn ? "সরাসরি ভিজিট করুন" : "Visit Our Hub"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {isBn ? "আমাদের শোরুম ও হেড অফিসের অবস্থান" : "Showroom & Corporate Locations"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {isBn
                ? "নারায়ণগঞ্জ বিসিক ইন্ডাস্ট্রিয়াল পার্ক শোরুমে সরাসরি মেশিনারি দেখতে ও স্পেসিফিকেশন পর্যালোচনা করতে আপনাকে আমন্ত্রণ।"
                : "Schedule a visit to our Narayanganj BSCIC showroom to inspect live circular knitting machinery and discuss custom configurations."}
            </p>
          </div>

          <OfficeMap variant="standard" />
        </MotionSection>

      </div>
    </div>
  );
}
