"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Check,
  ArrowUpRight,
  Wrench,
  GraduationCap,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Gauge,
  Ship,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { MotionSection, SlideIn } from "@/components/ui/MotionWrapper";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export function SpotlightInstallation() {
  const shouldReduceMotion = useReducedMotion();
  const { dict, locale } = useTranslation();
  const isBn = locale === "bn";

  const topPillars = [
    {
      icon: PackageCheck,
      color: "bg-rose-50 border-rose-100 text-[#800020]",
      title: isBn ? "টার্নকি ডেলিভারি ও প্লেসমেন্ট" : "Turnkey Delivery & Rigging",
      desc: isBn
        ? "চট্টগ্রাম বন্দর থেকে কারখানা পর্যন্ত সুরক্ষিত কন্টেইনার পরিবহন ও ফ্লোরে নিখুঁত পজিশনিং।"
        : "Port-to-mill container sea transit, customs clearance, and heavy-rigging directly onto your factory floor.",
    },
    {
      icon: Gauge,
      color: "bg-amber-50 border-amber-100 text-amber-700",
      title: isBn ? "মাইক্রন লেভেলিং ও ক্যালিব্রেশন" : "Precision Leveling & Calibration",
      desc: isBn
        ? "০.০২ মিমি-এর নিচে ডায়াল-সিলিন্ডার রানআউট ক্যালিব্রেশন ও কম্পনমুক্ত হাই-আরপিএম অপারেশন।"
        : "Dial-cylinder runout calibrated below 0.02mm for vibration-free, high-RPM continuous knit production.",
    },
    {
      icon: GraduationCap,
      color: "bg-emerald-50 border-emerald-100 text-emerald-700",
      title: isBn ? "স্টাফ ট্রেনিং ও সার্বক্ষণিক পার্টস" : "Staff Training & 24/7 Support",
      desc: isBn
        ? "ফ্যাক্টরি অপারেটরদের হ্যান্ডস-অন এসওপি প্রশিক্ষণ ও নারায়ণগঞ্জ থেকে দ্রুত জেনুইন স্পেয়ার পার্টস।"
        : "Operator SOP certification, hands-on mechanical training, and emergency parts from Narayanganj.",
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 bg-[#FAF8F5] border-b border-stone-200/80 overflow-hidden text-slate-800">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header & 3-Column Value Strip (Inspired by Screenshot 1 Top) */}
        <MotionSection className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#800020]/10 border border-[#800020]/20 text-xs font-bold text-[#800020] mb-4 shadow-2xs">
            <Wrench className="w-3.5 h-3.5 text-[#800020]" />
            <span>{dict.installation.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-slate-900 leading-[1.15] max-w-3xl mb-10">
            {isBn ? (
              <>
                লোকাল ফ্যাক্টরি ইনস্টলেশন,{" "}
                <span className="bg-gradient-to-r from-[#800020] via-[#A31D38] to-[#800020] bg-clip-text text-transparent">
                  কমিশনিং ও বিক্রয়োত্তর সেবা
                </span>
              </>
            ) : (
              <>
                Local Factory Installation,{" "}
                <span className="bg-gradient-to-r from-[#800020] via-[#A31D38] to-[#800020] bg-clip-text text-transparent">
                  Commissioning
                </span>{" "}
                & After-Sales
              </>
            )}
          </h2>

          {/* 3-Column Feature Cards (Like Screenshot 1) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-4 border-t border-stone-200">
            {topPillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="space-y-2.5">
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center shadow-2xs ${item.color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </MotionSection>

        {/* Bottom Bento Split: Photo with Floating Dark Pills (Left) + Readiness Meter (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Card: Asymmetric Photo with Floating Dark Status Pills (Inspired by Screenshot 1 Left) */}
          <div className="lg:col-span-7">
            <SlideIn direction="left" distance={20} duration={0.45}>
              <div className="relative rounded-[32px] overflow-hidden min-h-[420px] sm:min-h-[480px] h-full shadow-xl border border-stone-200/80 group">
                {/* Background Image */}
                <Image
                  src="/images/machines/spotlight-installation.webp"
                  alt="Tasneem factory technician commissioning circular knitting machine"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle Image Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

                {/* Floating Dark Status Pills Stack (Directly inspired by Screenshot 1's Starbucks, Lyft, Reddit pills) */}
                <div className="absolute right-4 sm:right-6 bottom-6 left-4 sm:left-auto sm:w-[320px] space-y-3 z-10">
                  {/* Pill 1 */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="p-3.5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/15 text-white shadow-2xl flex items-center gap-3 hover:bg-black/75 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <Gauge className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white truncate">
                        {isBn ? "ডায়াল রানআউট ক্যালিব্রেশন" : "Dial Runout Calibration"}
                      </div>
                      <div className="text-[11px] text-emerald-300 font-mono truncate">
                        0.018mm • Passed & Certified
                      </div>
                    </div>
                  </motion.div>

                  {/* Pill 2 */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="p-3.5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/15 text-white shadow-2xl flex items-center gap-3 hover:bg-black/75 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center shrink-0">
                      <Ship className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white truncate">
                        {isBn ? "সিএফআর চট্টগ্রাম পোর্ট শিপিং" : "CFR Chattogram Sea Shipping"}
                      </div>
                      <div className="text-[11px] text-sky-200 font-mono truncate">
                        Customs Cleared & Sea-Sealed
                      </div>
                    </div>
                  </motion.div>

                  {/* Pill 3 */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="p-3.5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/15 text-white shadow-2xl flex items-center gap-3 hover:bg-black/75 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white truncate">
                        {isBn ? "১ বছরের ওয়ারেন্টি ও পার্টস" : "1-Year OEM Warranty"}
                      </div>
                      <div className="text-[11px] text-rose-200 font-mono truncate">
                        BSCIC Narayanganj Spares Stock
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </SlideIn>
          </div>

          {/* Right Card: Readiness Gauge & Interactive Verification Pills (Inspired by Screenshot 1 Right & Screenshot 3) */}
          <div className="lg:col-span-5">
            <SlideIn direction="right" distance={20} duration={0.45}>
              <div className="rounded-[32px] bg-white border border-stone-200/90 p-6 sm:p-8 shadow-lg shadow-slate-900/5 h-full flex flex-col justify-between space-y-6">
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-500">
                      MILL COMMISSIONING
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      100% Ready
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {isBn ? "কারখানা ইনস্টলেশন স্ট্যান্ডার্ড" : "Factory Handover Standards"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {isBn
                      ? "প্রতিটি মেশিনের হ্যান্ডওভারের পূর্বে ৭২ ঘণ্টার টেস্ট নিটিং সম্পন্ন করা হয়।"
                      : "Zero vibration, exact GSM verification, and technician SOP sign-off before handover."}
                  </p>
                </div>

                {/* Semicircular Radial Gauge (Directly inspired by Screenshot 1 right side "Safe" meter) */}
                <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/70 text-center relative overflow-hidden">
                  <div className="relative w-44 h-24 mx-auto mb-2">
                    <svg className="w-44 h-44 -rotate-90" viewBox="0 0 100 100">
                      {/* Background Track */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#E2E8F0"
                        strokeWidth="10"
                        strokeDasharray="251.2"
                        strokeDashoffset="125.6"
                      />
                      {/* Colored Meter Value (Emerald/Teal) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#0D9488"
                        strokeWidth="10"
                        strokeDasharray="251.2"
                        strokeDashoffset="125.6"
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                        style={{ strokeDashoffset: "125.6" }}
                      />
                      {/* Gradient Arc */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="url(#meterGradient)"
                        strokeWidth="10"
                        strokeDasharray="251.2"
                        strokeDashoffset="125.6"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="meterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#800020" />
                          <stop offset="50%" stopColor="#EAB308" />
                          <stop offset="100%" stopColor="#10B981" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Gauge Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
                      <span className="text-2xl font-black text-slate-900 leading-none">
                        100%
                      </span>
                      <span className="text-[11px] font-bold text-emerald-600 mt-0.5">
                        Factory Ready
                      </span>
                    </div>
                  </div>

                  <div className="text-xs font-semibold text-slate-600">
                    {isBn ? "প্রোডাকশন ট্রায়াল ও কোয়ালিটি সার্টিফাইড" : "Production Trial & Quality Certified"}
                  </div>
                </div>

                {/* Checklist Pill Items (Inspired by Screenshot 3 left pill accordion items) */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold text-slate-800">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="truncate">
                      {isBn ? "ডায়াল-সিলিন্ডার অপটিক্যাল লেভেলিং" : "Optical Leveling & Runout Check"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold text-slate-800">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="truncate">
                      {isBn ? "ফুল-স্পিড টেস্ট নিটিং ও জিএসএম ভেরিফিকেশন" : "Full-Speed Knitting at Target GSM"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold text-slate-800">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="truncate">
                      {isBn ? "কারখানা মেকানিক ও টেকনিশিয়ান সার্টিফাইড" : "Mill Operator & Mechanic Certified"}
                    </span>
                  </div>
                </div>

                {/* Action Buttons (Inspired by Screenshot 1 & 2 Solid Button) */}
                <div className="space-y-2 pt-2">
                  <Link
                    href="/quote"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#800020] hover:bg-[#600018] active:scale-[0.98] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#800020]/20 transition-all cursor-pointer"
                  >
                    <span>{isBn ? "ইঞ্জিনিয়ার কনসাল্টেশন বুক করুন" : "Book Commissioning Engineer"}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/services"
                    className="w-full inline-flex items-center justify-center py-2 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    {isBn ? "সকল ইঞ্জিনিয়ারিং সার্ভিস দেখুন →" : "View All Technical Services →"}
                  </Link>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </div>
    </section>
  );
}
