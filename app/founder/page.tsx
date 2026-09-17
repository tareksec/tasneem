"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Factory,
  Phone,
  MessageCircle,
  ArrowUpRight,
  MapPin,
  Building2,
  Clock,
  Globe,
  Award,
  CheckCircle2,
  FileText,
  ExternalLink,
} from "lucide-react";
import { MotionSection } from "@/components/ui/MotionWrapper";
import { LiteYouTubeEmbed } from "@/components/ui/LiteYouTubeEmbed";
import { COMPANY_INFO } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function FounderPage() {
  const { locale } = useTranslation();
  const isBn = locale === "bn";

  return (
    <div className="min-h-screen bg-white text-[#2D2D2D] selection:bg-[#800020] selection:text-white">
      {/* 1. HERO SECTION: Recreating the Exact Testimonial / Founder Reference Card */}
      <section className="pt-10 pb-16 sm:pt-14 sm:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Subtle Eyebrow */}
          <div className="mb-6 flex items-center gap-2 text-xs font-medium text-neutral-500">
            <Link href="/" className="hover:text-neutral-900 transition-colors">
              {isBn ? "হোম" : "Home"}
            </Link>
            <span>/</span>
            <Link href="/about" className="hover:text-neutral-900 transition-colors">
              {isBn ? "আমাদের পরিচিতি" : "About"}
            </Link>
            <span>/</span>
            <span className="text-[#800020] font-semibold">
              {isBn ? "প্রতিষ্ঠাতা পরিচিতি" : "Founder Profile"}
            </span>
          </div>

          {/* Hero Grid Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Stylized Portrait Card with Star Notch and Badge */}
            <MotionSection
              delay={0.05}
              className="lg:col-span-5 relative w-full flex justify-center"
            >
              <div className="relative w-full max-w-[460px] aspect-[4/5] sm:aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-neutral-100 shadow-2xl border border-neutral-200/80 group">
                {/* Top-Left Notched Badge with 5 Stars */}
                <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-md border border-neutral-100 flex items-center gap-1.5">
                  <div className="flex text-neutral-900 text-xs tracking-tighter">
                    {"★★★★★"}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 pl-1 border-l border-neutral-200">
                    Leader
                  </span>
                </div>

                {/* Subtle Accent Indicator Dot */}
                <div className="absolute top-16 left-6 z-20 w-3 h-3 rounded-full bg-neutral-900/60 ring-4 ring-white/50 backdrop-blur-sm" />

                {/* High-Resolution Founder Portrait */}
                <Image
                  src="/images/founder/founder.jfif"
                  alt="Md. Mamunur Rashid - Founder & Managing Director, Tasneem Knitting Industry"
                  fill
                  priority
                  className="object-cover object-top sm:object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 480px"
                />

                {/* Subtle Gradient Vignette at Bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating Bottom Badge */}
                <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 z-20 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-neutral-200/90 text-left">
                  <p className="text-xs font-extrabold text-neutral-900 leading-tight">
                    {isBn ? "মোঃ মামুনুর রশীদ" : COMPANY_INFO.owner}
                  </p>
                  <p className="text-[11px] font-semibold text-[#800020]">
                    {isBn
                      ? "প্রতিষ্ঠাতা ও স্বত্বাধিকারী"
                      : "Founder & Proprietor"}
                  </p>
                </div>
              </div>
            </MotionSection>

            {/* Right Column: Editorial Typographic Quotation & Statement */}
            <MotionSection
              delay={0.12}
              className="lg:col-span-7 flex flex-col justify-center relative"
            >
              {/* Giant Serif Quotation Mark */}
              <div className="text-6xl sm:text-7xl lg:text-8xl font-serif text-neutral-900 leading-none select-none mb-1 opacity-90">
                “
              </div>

              {/* Bold Editorial Headline with Italic Serif Accent */}
              <h1 className="text-2xl sm:text-3xl lg:text-4.5xl font-extrabold text-neutral-900 tracking-tight leading-[1.25] mb-6">
                {isBn ? (
                  <>
                    সরাসরি কারখানা থেকে মিলের সফল উৎপাদন —{" "}
                    <span className="font-serif italic font-normal text-neutral-800">
                      তাসনীম নিট ইন্ডাস্ট্রি
                    </span>{" "}
                    দেশের টেক্সটাইল খাতকে দিচ্ছে{" "}
                    <span className="font-serif italic font-normal text-neutral-800">
                      নির্ভরযোগ্য মেশিনারি, সততা ও নিরবচ্ছিন্ন সাপোর্ট!
                    </span>
                  </>
                ) : (
                  <>
                    From direct factory sourcing to seamless mill execution,{" "}
                    <span className="font-serif italic font-normal text-neutral-800">
                      Tasneem Knit Industry
                    </span>{" "}
                    empowers textile mills with{" "}
                    <span className="font-serif italic font-normal text-neutral-800">
                      precision machinery, integrity, and uncompromised support!
                    </span>
                  </>
                )}
              </h1>

              {/* Founder's Direct Statement */}
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mb-6">
                {isBn
                  ? "“আমাদের লক্ষ্য খুব স্পষ্ট ও অবিচল — কোনো অনাবশ্যক দালাল বা অতিরিক্ত খরচ ছাড়াই বাংলাদেশের প্রতিটি নিটওয়্যার ও টেক্সটাইল মিলের কাছে সরাসরি প্রস্তুতকারক ফ্যাক্টরি থেকে শীর্ষমানের Circular Knitting, Dyeing, Shearing ও Finishing মেশিন পৌঁছে দেওয়া এবং ২৪/৭ নিখুঁত টেকনিক্যাল ও স্পেয়ার পার্টস সাপোর্ট নিশ্চিত করা।”"
                  : "“Our vision is resolute and uncompromised: empower Bangladesh’s circular knitting, dyeing, and apparel factories with verified industrial machinery sourced directly from overseas manufacturing floors with zero intermediary commissions, complete import transparency, and lifelong technical reliability.”"}
              </p>

              {/* Founder Profile Details & Operational Identity */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-5 border-t border-neutral-200 mb-8 text-xs sm:text-sm">
                <div>
                  <span className="text-neutral-500 block text-[11px] font-medium uppercase tracking-wider">
                    {isBn ? "প্রতিষ্ঠাতা ও পরিচালক" : "Leadership"}
                  </span>
                  <span className="font-bold text-neutral-900">
                    {isBn ? "মোঃ মামুনুর রশীদ" : COMPANY_INFO.owner}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[11px] font-medium uppercase tracking-wider">
                    {isBn ? "প্রধান অপারেশন হাব" : "Operational Hub"}
                  </span>
                  <span className="font-bold text-neutral-900">
                    {isBn ? "বিসিক, নারায়ণগঞ্জ" : "BSCIC, Narayanganj"}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-neutral-500 block text-[11px] font-medium uppercase tracking-wider">
                    {isBn ? "চীন সোর্সিং অফিস" : "China Office"}
                  </span>
                  <span className="font-bold text-neutral-900">
                    Shaoxing, Zhejiang
                  </span>
                </div>
              </div>

              {/* CTAs & Floating Preview Card Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`https://wa.me/8801884611888?text=${encodeURIComponent(
                      isBn
                        ? "আসসালামু আলাইকুম। আমি তাসনীম নিট ইন্ডাস্ট্রির প্রতিষ্ঠাতা মোঃ মামুনুর রশীদ সাহেবের সাথে মেশিনারি বিষয়ে পরামর্শ করতে চাই।"
                        : "Hello, I would like to consult with Founder Md. Mamunur Rashid regarding industrial machinery."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#800020] hover:bg-[#600018] text-white text-xs sm:text-sm font-semibold shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{isBn ? "প্রতিষ্ঠাতার সাথে হোয়াটসঅ্যাপ" : "WhatsApp with Founder"}</span>
                  </a>

                  <a
                    href={`tel:${COMPANY_INFO.phoneIntl}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs sm:text-sm font-semibold transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#800020]" />
                    <span>{COMPANY_INFO.phone}</span>
                  </a>
                </div>

                {/* Corner Showcase Preview Card (Mirrors the reference image bottom right thumbnail) */}
                <Link
                  href="/projects"
                  className="group relative flex items-center gap-3 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/90 rounded-2xl p-2.5 pr-4 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-neutral-200 shrink-0">
                    <Image
                      src="/illustrations/process-strip.jpg"
                      alt="Machinery showcase preview"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#800020] block">
                      {isBn ? "প্রজেক্ট গ্যালারি" : "Showcase"}
                    </span>
                    <span className="text-xs font-bold text-neutral-800 flex items-center gap-1 group-hover:text-neutral-950">
                      {isBn ? "মেশিন ইনস্টলেশন দেখুন" : "View Installations"}
                      <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </div>
            </MotionSection>
          </div>
        </div>
      </section>

      {/* 2. THE FOUNDER'S JOURNEY & LEADERSHIP PHILOSOPHY */}
      <section className="py-16 sm:py-20 bg-neutral-50/70 border-y border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionSection className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF2F4] border border-[#F9E6EA] text-xs font-bold text-[#800020] mb-3">
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>{isBn ? "প্রতিষ্ঠাতার দর্শন ও পথচলা" : "Vision & Heritage"}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              {isBn
                ? "টেক্সটাইল খাতে ১৫+ বছরের বিশ্বাস ও নেতৃত্বের গল্প"
                : "A Decade of Relentless Technical Leadership & Trust"}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
              {isBn
                ? "মোঃ মামুনুর রশীদ দীর্ঘ দেড় দশক ধরে বাংলাদেশের টেক্সটাইল, নিটওয়্যার ও গার্মেন্টস উদ্যোক্তাদের আধুনিক প্রযুক্তির আন্তর্জাতিক মানের মেশিন পৌঁছে দিতে নিরলস কাজ করে যাচ্ছেন।"
                : "Md. Mamunur Rashid has spent over fifteen years working hands-on with knitwear entrepreneurs across Bangladesh, spearheading direct factory procurement pipelines and eliminating exploitative machinery commissions."}
            </p>
          </MotionSection>

          {/* 4 Pillars of Leadership Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MotionSection
              delay={0.05}
              className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FDF2F4] border border-[#F9E6EA] flex items-center justify-center text-[#800020] mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 mb-2">
                {isBn ? "শতভাগ সরাসরি সোর্সিং" : "100% Direct Sourcing"}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {isBn
                  ? "চীন ও আন্তর্জাতিক প্রস্তুতকারক কারখানার সাথে সরাসরি যোগাযোগ। কোনো মধ্যস্বত্বভোগী বা তৃতীয় পক্ষের বাড়তি কমিশন নেই।"
                  : "Direct manufacturer relationships in China and overseas. Transparent commercial invoices with zero third-party markups."}
              </p>
            </MotionSection>

            <MotionSection
              delay={0.1}
              className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FDF2F4] border border-[#F9E6EA] flex items-center justify-center text-[#800020] mb-4">
                <Factory className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 mb-2">
                {isBn ? "টার্নকি কমিশনিং ও ট্রায়াল" : "Turnkey Commissioning"}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {isBn
                  ? "মেশিন কেবল ডেলিভারি নয়, দক্ষ ইঞ্জিনিয়ার দিয়ে ফ্যাক্টরি ফ্লোরে মেকানিক্যাল ও ইলেকট্রিক্যাল ইনস্টলেশন ও ট্রায়াল রান সম্পন্ন।"
                  : "End-to-end mechanical leveling, electrical integration, and test-knit validation by dedicated technical technicians."}
              </p>
            </MotionSection>

            <MotionSection
              delay={0.15}
              className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FDF2F4] border border-[#F9E6EA] flex items-center justify-center text-[#800020] mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 mb-2">
                {isBn ? "আসল স্পেয়ার পার্টস মজুদ" : "Genuine Spares Ready"}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {isBn
                  ? "নারায়ণগঞ্জ বিসিক হাব-এ সার্কুলার নিটিং ও ফিনিশিং মেশিনের আসল পার্টস, সিলিন্ডার, ক্যাম ও নিডেল সর্বদা প্রস্তুত থাকে।"
                  : "BSCIC Narayanganj hub stocks original cylinders, cams, needles, sinkers, and electrical inverter components for immediate dispatch."}
              </p>
            </MotionSection>

            <MotionSection
              delay={0.2}
              className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FDF2F4] border border-[#F9E6EA] flex items-center justify-center text-[#800020] mb-4">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 mb-2">
                {isBn ? "চীন অফিস প্রি-শিপমেন্ট চেক" : "China Pre-Shipment Inspection"}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {isBn
                  ? "শাওক্সিং (Zhejiang) নিজস্ব অফিস দ্বারা শিপমেন্টের পূর্বে প্রতিটি মেশিনের পুঙ্খানুপুঙ্খ মান যাচাই ও ভিডিও অনুমোদন নিশ্চিত করা হয়।"
                  : "Our Shaoxing sourcing team conducts multi-point physical checks, spindle runs, and video approvals before container sealing."}
              </p>
            </MotionSection>
          </div>
        </div>
      </section>

      {/* 3. FOUNDER VIDEO INTRODUCTION & CORPORATE FOOTPRINT */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-neutral-200 rounded-3xl bg-gradient-to-b from-neutral-50/70 to-white p-6 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Video Player Column */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl overflow-hidden shadow-md border border-neutral-200">
                  <LiteYouTubeEmbed
                    videoId="ONTd4X4M-Vo"
                    title="Md Mamunur Rashid - Owner Introduction | Tasneem Knit Industry"
                  />
                </div>
              </div>

              {/* Founder Context & Entities */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF2F4] border border-[#F9E6EA] text-xs font-bold text-[#800020] mb-3 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#800020]"></span>
                  <span>{isBn ? "ভিডিও বার্তা" : "Personal Address"}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 leading-tight mb-2">
                  {isBn ? "প্রতিষ্ঠাতার সরাসরি বক্তব্য" : "A Direct Word From The Founder"}
                </h2>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                  {isBn
                    ? "“টেক্সটাইল মেশিনারির ব্যবসা কেবল পণ্য বিক্রি নয় — এটি একটি বিশ্বাস ও পার্টনারশিপের দায়িত্ব। একটি মেশিনের ত্রুটি বা একদিনের বন্ধ মানে মিল মালিকের লাখ টাকার ক্ষতি। তাই আমরা কেবল মেশিন সরবরাহ করি না, নিশ্চিত করি সর্বোচ্চ কার্যক্ষমতা ও দায়িত্বশীল সার্ভিসিং।”"
                    : "“Industrial textile machinery is not merely a trading commodity; it is a stewardship of client productivity. A single machine breakdown halts entire production lines. We do not just deliver machinery — we guarantee operational continuity and engineering accountability.”"}
                </p>

                {/* Leadership Entities Under Md. Mamunur Rashid */}
                <div className="space-y-2.5 pt-4 border-t border-neutral-200 text-xs">
                  <p className="font-bold text-neutral-800 uppercase tracking-wider text-[11px]">
                    {isBn ? "প্রতিষ্ঠাতার অধীনস্থ প্রতিষ্ঠানসমূহ:" : "Affiliated Enterprises:"}
                  </p>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0" />
                    <span className="font-semibold">Tasneem Knitting Industry</span>
                    <span className="text-neutral-400">|</span>
                    <span className="text-neutral-500">{isBn ? "মেশিনারি আমদানি ও সরবরাহ" : "Machinery Imports"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0" />
                    <span className="font-semibold">Tasneem Knit Composite</span>
                    <span className="text-neutral-400">|</span>
                    <span className="text-neutral-500">{isBn ? "কম্পোজিট ফেব্রিক ম্যানুফ্যাকচারিং" : "Composite Knitting"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0" />
                    <span className="font-semibold">Zamzam International</span>
                    <span className="text-neutral-400">|</span>
                    <span className="text-neutral-500">{isBn ? "আন্তর্জাতিক বাণিজ্য ও আমদানি" : "Global Trading"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0" />
                    <span className="font-semibold">Shaoxing Nawar Int’l Co., Ltd.</span>
                    <span className="text-neutral-400">|</span>
                    <span className="text-neutral-500">{isBn ? "চীন সোর্সিং হাব" : "China Sourcing"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VERIFIED CREDENTIALS & COMPLIANCE */}
      <section className="py-14 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white p-5 rounded-2xl border border-neutral-200 text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#800020] block mb-1">
                100+
              </span>
              <span className="text-xs sm:text-sm font-semibold text-neutral-800 block">
                {isBn ? "সফল ফ্যাক্টরি ইনস্টলেশন" : "Factory Installations"}
              </span>
              <span className="text-[11px] text-neutral-500 block mt-0.5">
                {isBn ? "সারা বাংলাদেশে" : "Across Bangladesh"}
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-neutral-200 text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#800020] block mb-1">
                15+
              </span>
              <span className="text-xs sm:text-sm font-semibold text-neutral-800 block">
                {isBn ? "বছরের অভিজ্ঞতা" : "Years Experience"}
              </span>
              <span className="text-[11px] text-neutral-500 block mt-0.5">
                {isBn ? "টেক্সটাইল ও নিটওয়্যার খাত" : "Textile & Garments"}
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-neutral-200 text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#800020] block mb-1">
                100%
              </span>
              <span className="text-xs sm:text-sm font-semibold text-neutral-800 block">
                {isBn ? "সরাসরি ফ্যাক্টরি আমদানি" : "Direct Sourcing"}
              </span>
              <span className="text-[11px] text-neutral-500 block mt-0.5">
                {isBn ? "জিরো ব্রোকার কমিশন" : "Zero Middlemen Margin"}
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-neutral-200 text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#800020] block mb-1">
                24/7
              </span>
              <span className="text-xs sm:text-sm font-semibold text-neutral-800 block">
                {isBn ? "সার্বক্ষণিক সাপোর্ট" : "Technical Support"}
              </span>
              <span className="text-[11px] text-neutral-500 block mt-0.5">
                {isBn ? "বিসিক নারায়ণগঞ্জ হাব" : "BSCIC Hub Ready"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DIRECT FOUNDER CONSULTATION CTA */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#2D2D2D] via-[#1F1F1F] to-[#2D2D2D] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-neutral-800 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#800020]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-white/90 mb-4">
                <Building2 className="w-3.5 h-3.5 text-[#D8A4AF]" />
                <span>{isBn ? "সরাসরি আলোচনা ও ফ্যাক্টরি ভিজিট" : "Direct Factory Consultation"}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                {isBn
                  ? "আপনার মিলের জন্য সেরা মেশিনারি নির্বাচন করতে চান?"
                  : "Plan Your Textile Machinery Expansion Directly with Us"}
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-8">
                {isBn
                  ? "সার্কুলার নিটিং, ডাইং কিংবা ফিনিশিং মেশিনারি আমদানি সংক্রান্ত যে কোনো প্রশ্ন বা টেকনিক্যাল পরামর্শের জন্য সরাসরি মোঃ মামুনুর রশীদ বা আমাদের সেলস টিমের সাথে যোগাযোগ করুন।"
                  : "Connect directly with Md. Mamunur Rashid or our engineering team to discuss machine gauge selection, factory floor layout, CFR Chittagong LC processing, or on-site inspections."}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`https://wa.me/8801884611888?text=${encodeURIComponent(
                    isBn
                      ? "আসসালামু আলাইকুম। আমি সরাসরি মোঃ মামুনুর রশীদ সাহেবের সাথে মেশিনারি ক্রয়ের বিষয়ে কথা বলতে চাই।"
                      : "Hello, I would like to schedule a machinery discussion with Founder Md. Mamunur Rashid."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#800020] hover:bg-[#600018] text-white text-sm font-bold shadow-lg transition-all hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isBn ? "হোয়াটসঅ্যাপে সরাসরি যোগাযোগ" : "WhatsApp Direct"}</span>
                </a>

                <a
                  href={`tel:${COMPANY_INFO.phoneIntl}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-neutral-900 hover:bg-neutral-100 text-sm font-bold shadow-lg transition-all hover:scale-105"
                >
                  <Phone className="w-4 h-4 text-[#800020]" />
                  <span>{COMPANY_INFO.phone}</span>
                </a>

                <a
                  href={COMPANY_INFO.tradeLicenseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 transition-colors"
                >
                  <FileText className="w-4 h-4 text-[#D8A4AF]" />
                  <span>{isBn ? "ট্রেড লাইসেন্স দেখুন" : "View Trade License"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Showroom Hub Note */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-300">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D8A4AF]" />
                  <span>{isBn ? COMPANY_INFO.showroomOffice.addressShortBn : COMPANY_INFO.showroomOffice.addressShort}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D8A4AF]" />
                  <span>{COMPANY_INFO.businessHours}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. JSON-LD Person Schema for Founder */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: COMPANY_INFO.owner,
            jobTitle: "Founder & Proprietor",
            worksFor: {
              "@type": "Organization",
              name: COMPANY_INFO.name,
              url: COMPANY_INFO.domain,
            },
            address: {
              "@type": "PostalAddress",
              streetAddress: COMPANY_INFO.showroomOffice.address,
              addressLocality: "Narayanganj",
              addressRegion: "Dhaka Division",
              postalCode: "1421",
              addressCountry: "BD",
            },
            telephone: COMPANY_INFO.phoneIntl,
            image: `${COMPANY_INFO.domain}/images/founder/founder.jfif`,
            sameAs: [
              COMPANY_INFO.facebook,
              "https://youtu.be/ONTd4X4M-Vo",
            ],
          }),
        }}
      />
    </div>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}
