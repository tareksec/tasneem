"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Search,
  FileCheck,
  ShieldCheck,
  Ship,
  Wrench,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Info,
  Sparkles,
  Layers,
  X,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export interface ProcessStep {
  id: string;
  step: string;
  watermark: string;
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  durationEn: string;
  durationBn: string;
  icon: React.ElementType;
  phase: 1 | 2;
  deliverablesEn: string[];
  deliverablesBn: string[];
  docsEn: string[];
  docsBn: string[];
  keyDetailEn: string;
  keyDetailBn: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "step-1",
    step: "01",
    watermark: "1",
    titleEn: "Technical Enquiry & Parameter Definition",
    titleBn: "আপনার চাহিদা ও মেশিনের স্পেসিফিকেশন নির্ধারণ",
    descEn:
      "Submit your mill's fabric requirements, target GSM, gauge (14G–44G), cylinder diameter (30\"–44\"), feeder count, and production capacity goals.",
    descBn:
      "আপনার কারখানায় কী ধরনের কাপড় তৈরি করতে চান—টার্গেট GSM, Gauge (14G–44G), Cylinder ব্যাস (30\"–44\"), Feeder সংখ্যা ও দৈনিক উৎপাদনের লক্ষ্য আমাদের জানান।",
    durationEn: "Day 1 – 2",
    durationBn: "১ – ২ দিন",
    icon: FileText,
    phase: 1,
    deliverablesEn: [
      "Fabric construction analysis & yarn count mapping",
      "Gauge & diameter recommendation (e.g. 28G / 34\")",
      "Feeder speed & daily output forecast",
    ],
    deliverablesBn: [
      "ফ্যাব্রিক স্ট্রাকচার বিশ্লেষণ ও সুতার কাউন্ট নির্ধারণ",
      "উপযুক্ত Gauge ও Cylinder ব্যাস নির্বাচন (যেমন 28G / 34\")",
      "Feeder স্পিড ও সম্ভাব্য দৈনিক উৎপাদনের হিসাব",
    ],
    docsEn: ["Fabric sample specification sheet", "Mill production layout requirements"],
    docsBn: ["ফ্যাব্রিক স্যাম্পল স্পেসিফিকেশন শিট", "ফ্যাক্টরি ফ্লোর ও লেআউট প্ল্যান"],
    keyDetailEn: "Direct consultation with Tasneem textile machinery engineers to finalize exact mechanical parameters before manufacturer matching.",
    keyDetailBn: "মেশিন চূড়ান্ত করার আগে আমাদের টেক্সটাইল ইঞ্জিনিয়ারদের সাথে সরাসরি আলোচনা করে নিখুঁত কনফিগারেশন ঠিক করা হয়।",
  },
  {
    id: "step-2",
    step: "02",
    watermark: "2",
    titleEn: "Manufacturer Matching & Factory Quotation",
    titleBn: "সঠিক প্রস্তুতকারক নির্বাচন ও সরাসরি ফ্যাক্টরি কোটেশন",
    descEn:
      "Our engineering sourcing team evaluates verified overseas manufacturers in China and Taiwan to match your configuration and secure direct factory CFR pricing.",
    descBn:
      "চীন ও তাইওয়ানের সেরা মেশিন প্রস্তুতকারকদের মধ্য থেকে আপনার চাহিদামতো মডেল বাছাই করে সরাসরি ফ্যাক্টরি CFR মূল্য এনে দিই।",
    durationEn: "Day 2 – 4",
    durationBn: "২ – ৪ দিন",
    icon: Search,
    phase: 1,
    deliverablesEn: [
      "OEM manufacturer audit & brand verification",
      "Comparative component breakdown (cam track, cylinder, invertor)",
      "Direct factory CFR Chattogram cost sheet",
    ],
    deliverablesBn: [
      "OEM ম্যানুফ্যাকচারার অডিট ও ব্র্যান্ড যাচাই",
      "যন্ত্রাংশের তুলনামূলক মান যাচাই (Cam Track, Cylinder, Inverter)",
      "সরাসরি ফ্যাক্টরি CFR Chattogram কোটেশন শিট",
    ],
    docsEn: ["Manufacturer catalog & technical schematics", "Factory warranty documentation"],
    docsBn: ["ম্যানুফ্যাকচারার ক্যাটালগ ও টেকনিক্যাল ড্রয়িং", "ফ্যাক্টরি ওয়ারেন্টি পেপার্স"],
    keyDetailEn: "Eliminates multi-tiered brokerage margins by negotiating directly with primary machinery builders in Taiwan and mainland China.",
    keyDetailBn: "মূল প্রস্তুতকারকদের সাথে সরাসরি কথা বলে দরদাম করায় মাঝে কোনো দালালি কমিশন বা বাড়তি খরচের ঝামেলা থাকে না।",
  },
  {
    id: "step-3",
    step: "03",
    watermark: "3",
    titleEn: "Proforma Invoice & L/C Opening",
    titleBn: "Proforma Invoice (PI) প্রদান ও L/C খোলা",
    descEn:
      "Tasneem issues a formal Proforma Invoice (PI) under CFR Chattogram terms. You open a commercial Letter of Credit (L/C) through your commercial bank in Bangladesh.",
    descBn:
      "আমরা CFR Chattogram শর্তে অফিসিয়াল Proforma Invoice (PI) দিই, যার ভিত্তিতে আপনি আপনার ব্যাংকের মাধ্যমে নিশ্চিন্তে L/C খুলতে পারেন।",
    durationEn: "Commercial Phase",
    durationBn: "বাণিজ্যিক পর্ব",
    icon: FileCheck,
    phase: 1,
    deliverablesEn: [
      "Formal Proforma Invoice under CFR Chattogram Incoterms",
      "Bangladesh Bank compliant HS Code 8447.11/12 categorization",
      "Bank-to-bank irrevocable documentary credit execution",
    ],
    deliverablesBn: [
      "CFR Chattogram শর্তে পূর্ণাঙ্গ Proforma Invoice",
      "বাংলাদেশ ব্যাংক ও কাস্টমস অনুমোদিত সঠিক HS Code (8447.11/12)",
      "ব্যাংক-টু-ব্যাংক নিরাপদ ও নিয়মমাফিক L/C প্রসেসিং",
    ],
    docsEn: ["Official Proforma Invoice (PI)", "Commercial Bank L/C Application & Draft Copy"],
    docsBn: ["অফিসিয়াল Proforma Invoice (PI)", "ব্যাংক L/C অ্যাপ্লিকেশন ও ড্রাফট কপি"],
    keyDetailEn: "Fully transparent commercial documentation allowing mill owners to leverage standard industrial machinery import credit lines in Bangladesh.",
    keyDetailBn: "বাংলাদেশ ব্যাংকের আমদানি নীতি পুরোপুরি মেনে স্বচ্ছ নথিপত্র দেওয়া হয়, যাতে ব্যাংকিং বা কাস্টমসে কোনো ঝামেলা না হয়।",
  },
  {
    id: "step-4",
    step: "04",
    watermark: "4",
    titleEn: "Pre-Shipment Quality Inspection",
    titleBn: "শিপমেন্টের আগে কোয়ালিটি ইন্সপেকশন (SGS / Intertek / BV)",
    descEn:
      "Independent inspection teams verify machine components, motor running, cam track finish, cylinder micro-tolerance, and export crating at the overseas factory.",
    descBn:
      "জাহাজে তোলার আগে আন্তর্জাতিক স্বাধীন পরিদর্শক দল (SGS/Intertek/BV) দিয়ে মেশিনের মোটর, Cam Track, Cylinder টলারেন্স এবং ভ্যাকুয়াম প্যাকেজিং পুঙ্খানুপুঙ্খ পরীক্ষা করা হয়।",
    durationEn: "Pre-Loading Phase",
    durationBn: "শিপমেন্ট-পূর্ব পরীক্ষা",
    icon: ShieldCheck,
    phase: 2,
    deliverablesEn: [
      "Third-party inspection report (SGS, Intertek, or Bureau Veritas)",
      "Operational dry-run video & cylinder tolerance test certificate",
      "Anti-corrosion vacuum wooden crate seal verification",
    ],
    deliverablesBn: [
      "থার্ড-পার্টি ইন্সপেকশন রিপোর্ট (SGS, Intertek বা Bureau Veritas)",
      "মেশিন ড্রাই-রান টেস্টের ভিডিও ও Cylinder টলারেন্স সার্টিফিকেট",
      "মরিচারোধী ভ্যাকুয়াম সিলিং ও কাঠের ক্র্যাট প্যাকিংয়ের সত্যতা",
    ],
    docsEn: ["Clean Inspection Certificate (CIC)", "Export packaging & serial number registry"],
    docsBn: ["Clean Inspection Certificate (CIC)", "প্যাকিং লিস্ট ও মেশিন সিরিয়াল নম্বর রেজিস্ট্রি"],
    keyDetailEn: "Zero-defect guarantee: no machinery is loaded onto container vessels without verified clearance from accredited inspectors.",
    keyDetailBn: "১০০% ত্রুটিমুক্ত নিশ্চয়তা: অনুমোদিত পরিদর্শকদের ছাড়পত্র ছাড়া কোনো অবস্থাতেই মেশিন জাহাজে তোলা হয় না।",
  },
  {
    id: "step-5",
    step: "05",
    watermark: "5",
    titleEn: "CFR Ocean Freight to Chattogram Port",
    titleBn: "CFR Chattogram সমুদ্রপথে নিরাপদ শিপমেন্ট",
    descEn:
      "The machine is sealed in moisture-protected vacuum crates and transported via container vessel to Chattogram Port with complete original shipping documents.",
    descBn:
      "মেশিনটি আর্দ্রতারোধক ভ্যাকুয়াম ক্র্যাটে সিল করে বিশ্বস্ত কনটেইনার জাহাজে চট্টগ্রাম বন্দরে পৌঁছানো হয় এবং আপনার ব্যাংকে মূল শিপিং পেপার্স পাঠিয়ে দেওয়া হয়।",
    durationEn: "Transit Phase (14–21 Days)",
    durationBn: "জাহাজে ট্রানজিট (১৪–২১ দিন)",
    icon: Ship,
    phase: 2,
    deliverablesEn: [
      "Direct container vessel booking with major shipping lines",
      "Real-time container GPS voyage tracking",
      "Expedited shipping document courier via DHL to client bank",
    ],
    deliverablesBn: [
      "শীর্ষস্থানীয় শিপিং লাইনে কনটেইনার বুকিং",
      "লাইভ কনটেইনার ট্র্যাকিং ও নিয়মিত শিপমেন্ট আপডেট",
      "DHL এক্সপ্রেস কুরিয়ারে ব্যাংকে মূল শিপিং ডকুমেন্ট পাঠানো",
    ],
    docsEn: ["Original Bill of Lading (B/L)", "Certificate of Origin (Form E)", "Packing List & Commercial Invoice"],
    docsBn: ["মূল Bill of Lading (B/L)", "Certificate of Origin (Form E)", "Packing List ও Commercial Invoice"],
    keyDetailEn: "Comprehensive logistics management covering port handling, container stuffing, and customs-ready clearance documentation.",
    keyDetailBn: "পোর্ট হ্যান্ডলিং থেকে শুরু করে কাস্টমস ক্লিয়ারেন্স সংক্রান্ত সব নথিপত্রে আমরা সার্বক্ষণিক গাইড করি।",
  },
  {
    id: "step-6",
    step: "06",
    watermark: "6",
    titleEn: "Factory Installation & Commissioning",
    titleBn: "ফ্যাক্টরিতে মেশিন ইনস্টলেশন, কমিশনিং ও টেকনিক্যাল সাপোর্ট",
    descEn:
      "Upon delivery to your mill, our local technical team completes precision leveling, creel setup, oil mist tuning, trial knit verification, and operator training.",
    descBn:
      "মেশিন আপনার মিলে পৌঁছামাত্র আমাদের অভিজ্ঞ টেকনিশিয়ানরা গিয়ে লেভেলিং, Creel সেটআপ, Oil Mist টিউনিং ও ট্রায়াল নিটিং করে কাপড় তৈরি করে বুঝিয়ে দেন।",
    durationEn: "On-Site Setup",
    durationBn: "অন-সাইট সেটআপ",
    icon: Wrench,
    phase: 2,
    deliverablesEn: [
      "Precision foundation leveling & vibration dampening calibration",
      "Positive feeder & yarn creel alignment with auto-stop sensors",
      "Trial knit verification for GSM consistency & fabric handfeel",
      "Comprehensive machine maintenance & operator safety training",
    ],
    deliverablesBn: [
      "নিখুঁত লেভেলিং ও ভাইব্রেশন ক্যালিব্রেশন",
      "Positive Feeder ও Creel অ্যালাইনমেন্ট এবং অটো-স্টপ সেন্সর টিউনিং",
      "কাপড়ের সঠিক GSM ও হ্যান্ডফিল নিশ্চিত করতে ট্রায়াল নিটিং",
      "অপারেটরদের কাজ শেখানো ও নিয়মিত মেইনটেন্যান্স গাইড",
    ],
    docsEn: ["Commissioning Sign-Off Protocol", "Warranty Card & Genuine Spares Schedule"],
    docsBn: ["কমিশনিং সাইন-অফ শিট", "ওয়ারেন্টি কার্ড ও জেনুইন পার্টস শিডিউল"],
    keyDetailEn: "Dedicated Narayanganj-based technical response team providing lifetime mechanical support and immediate genuine spares availability.",
    keyDetailBn: "নারায়ণগঞ্জের বিসিক থেকে আমাদের নিজস্ব টেকনিক্যাল টিম যেকোনো সময় সহায়তা এবং জেনুইন পার্টস সরবরাহ করে।",
  },
];

export function ProcessWaveSection() {
  const { locale } = useTranslation();
  const [activePhase, setActivePhase] = useState<"all" | 1 | 2>("all");
  const [selectedStep, setSelectedStep] = useState<ProcessStep | null>(null);

  const phase1Steps = PROCESS_STEPS.filter((s) => s.phase === 1);
  const phase2Steps = PROCESS_STEPS.filter((s) => s.phase === 2);

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 1. Header Frame Matching User Reference Image:
          "— e22entials. —" overline with dashes, bold sans-serif title with red period, and faint corner watermark */}
      <div className="relative border border-[#E2E4E9] bg-white rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 lg:p-14 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] overflow-hidden mb-12">
        {/* Faint Oversized Watermark in Top Right (Matches '362' in reference image) */}
        <div className="absolute top-3 right-6 sm:top-6 sm:right-10 text-8xl sm:text-[140px] font-mono font-black text-neutral-900/[0.03] select-none pointer-events-none leading-none">
          06
        </div>

        {/* Minimalist Top Overline with Flanking Red Dashes */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="w-6 sm:w-10 h-[2px] bg-[#800020] rounded-full" />
          <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-[#800020] uppercase">
            {locale === "bn" ? "মেশিন আমদানির সহজ ধাপসমূহ" : "TASNEEM SOURCING JOURNEY"}
          </span>
          <span className="w-6 sm:w-10 h-[2px] bg-[#800020] rounded-full" />
        </div>

        {/* Crisp Main Headline: "Process section." / "Machinery Sourcing." */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight text-center mb-4">
          {locale === "bn" ? "মেশিনারি আমদানি প্রক্রিয়া" : "Machinery Sourcing"}
          <span className="text-[#800020]">.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-center text-xs sm:text-base text-neutral-600 font-normal leading-relaxed mb-8">
          {locale === "bn"
            ? "কারিগরি স্পেসিফিকেশন নির্ধারণ থেকে শুরু করে ফ্যাক্টরি অডিট, সমুদ্রপথে নিরাপদ শিপমেন্ট এবং আপনার মিল ফ্লোরে সফলভাবে চালু করা পর্যন্ত—প্রতিটি ধাপেই আমরা সাথে আছি।"
            : "Our step-by-step procurement framework provides complete transparency from technical parameters through overseas factory inspection, CFR ocean freight, and on-site commissioning."}
        </p>

        {/* Phase View Switcher Tabs (Segmented Control Dock) */}
        <div className="flex items-center justify-center">
          <div className="inline-flex p-1.5 rounded-full bg-neutral-200/80 backdrop-blur-md border border-neutral-300/80 shadow-inner gap-1.5 flex-wrap justify-center">
            {[
              { key: "all", labelEn: "All 06 Stages (Continuous Flow)", labelBn: "সবগুলো ধাপ (১ থেকে ৬)" },
              { key: 1, labelEn: "Phase 1: Sourcing & Commercial (01–03)", labelBn: "১ম পর্ব: সোর্সিং ও L/C (০১–০৩)" },
              { key: 2, labelEn: "Phase 2: Logistics & Commissioning (04–06)", labelBn: "২য় পর্ব: শিপমেন্ট ও ইনস্টলেশন (০৪–০৬)" },
            ].map((tab) => {
              const isActive = activePhase === tab.key;
              return (
                <button
                  key={String(tab.key)}
                  onClick={() => setActivePhase(tab.key as any)}
                  className={`relative isolate px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 select-none ${
                    isActive
                      ? "text-white shadow-md shadow-red-500/30"
                      : "text-neutral-700 hover:text-black bg-white/80 hover:bg-white border border-transparent shadow-xs"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePhasePill"
                      className="absolute inset-0 rounded-full bg-[#800020] z-0 shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{locale === "bn" ? tab.labelBn : tab.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sub-hint: Click node to see deliverables */}
        <div className="flex items-center justify-center gap-2 mt-4 text-[11px] font-mono text-neutral-400">
          <Sparkles className="w-3.5 h-3.5 text-[#800020]" />
          <span>
            {locale === "bn"
              ? "প্রতিটি ধাপের বিস্তারিত কাজের বিবরণ ও প্রয়োজনীয় কাগজপত্র দেখতে ক্লিক করুন"
              : "Click any step node to inspect documentation and deliverables"}
          </span>
        </div>
      </div>

      {/* 2. Wave Canvas Section:
          Renders Desktop Sinusoidal Bezier Curve or Mobile Serpentine Flow */}
      <div className="space-y-12 sm:space-y-16">
        {(activePhase === "all" || activePhase === 1) && (
          <ThreeNodeWaveCard
            phaseNumber={1}
            phaseTitleEn="Phase 1: Procurement Origination & Commercial Validation"
            phaseTitleBn="১ম পর্ব: মেশিন নির্বাচন, কোটেশন ও L/C প্রসেসিং"
            steps={phase1Steps}
            locale={locale}
            onSelectStep={(step) => setSelectedStep(step)}
          />
        )}

        {/* Visual Continuity Ribbon between Phase 1 and Phase 2 when viewing 'All' */}
        {activePhase === "all" && (
          <div className="hidden lg:flex flex-col items-center justify-center my-[-20px] relative z-20">
            <div className="w-[2px] h-14 bg-gradient-to-b from-[#800020] to-[#800020]/30 relative">
              <span className="absolute -left-[3px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#800020] animate-ping" />
            </div>
            <div className="bg-white border border-[#E5E7EB] text-neutral-600 text-[10px] font-mono font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs flex items-center gap-1.5 mt-1">
              <ChevronRight className="w-3 h-3 text-[#800020] rotate-90" />
              <span>{locale === "bn" ? "পরবর্তী ধাপ: শিপমেন্ট ও ফ্যাক্টরি ইনস্টলেশন" : "Flow Transition to Ocean Freight"}</span>
            </div>
          </div>
        )}

        {(activePhase === "all" || activePhase === 2) && (
          <ThreeNodeWaveCard
            phaseNumber={2}
            phaseTitleEn="Phase 2: Pre-Shipment Inspection, Freight & Installation"
            phaseTitleBn="২য় পর্ব: কোয়ালিটি পরিদর্শন, সমুদ্র পরিবহন ও ফ্যাক্টরি কমিশনিং"
            steps={phase2Steps}
            locale={locale}
            onSelectStep={(step) => setSelectedStep(step)}
          />
        )}
      </div>

      {/* 3. Interactive Milestone Dossier Slide-Over / Modal */}
      <AnimatePresence>
        {selectedStep && (
          <StepDetailModal
            step={selectedStep}
            locale={locale}
            onClose={() => setSelectedStep(null)}
          />
        )}
      </AnimatePresence>

      {/* 4. Bottom Editorial Footer Row Matching Reference Image */}
      <div className="mt-12 pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#800020]" />
          <span>{locale === "bn" ? "২০২৬ তাসনীম নিটিং ইন্ডাস্ট্রি • বাংলাদেশ" : "2026 TASNEEM KNIT INDUSTRY • BANGLADESH"}</span>
        </div>
        <Link
          href="/quote"
          className="inline-flex items-center gap-1.5 text-neutral-800 hover:text-[#800020] font-bold transition-colors"
        >
          <span>{locale === "bn" ? "সরাসরি অফিসিয়াল কোটেশন চান" : "REQUEST TECHNICAL CFR QUOTATION"}</span>
          <ArrowUpRight className="w-4 h-4 text-[#800020]" />
        </Link>
      </div>
    </section>
  );
}

// =========================================================================
// 3-NODE WAVE CARD COMPONENT (Matches exact layout of the user reference)
// =========================================================================
interface ThreeNodeWaveCardProps {
  phaseNumber: number;
  phaseTitleEn: string;
  phaseTitleBn: string;
  steps: ProcessStep[];
  locale: string;
  onSelectStep: (step: ProcessStep) => void;
}

function ThreeNodeWaveCard({
  phaseNumber,
  phaseTitleEn,
  phaseTitleBn,
  steps,
  locale,
  onSelectStep,
}: ThreeNodeWaveCardProps) {
  const [step1, step2, step3] = steps;

  return (
    <div className="relative border border-[#E2E4E9] bg-white rounded-[32px] sm:rounded-[40px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-300">
      {/* Top Banner Tag */}
      <div className="px-6 sm:px-10 pt-6 sm:pt-8 flex items-center justify-between gap-4 border-b border-neutral-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#800020]" />
          <h2 className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight">
            {locale === "bn" ? phaseTitleBn : phaseTitleEn}
          </h2>
        </div>
        <span className="bg-neutral-100 text-neutral-700 font-mono text-[11px] font-bold px-3 py-1 rounded-full">
          {locale === "bn" ? `পর্যায় ০${phaseNumber}` : `PHASE 0${phaseNumber}`}
        </span>
      </div>

      {/* ==================================================================
          DESKTOP & TABLET VIEW: The Authentic Flowing Sinusoidal Wave Canvas
          ================================================================== */}
      <div className="hidden md:block relative w-full h-[500px] lg:h-[540px] px-8 sm:px-12 py-6 overflow-hidden select-none">
        {/* 1. SVG Continuous Sinusoidal Curve Passing Through All 3 Nodes */}
        <svg
          viewBox="0 0 1000 360"
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`waveGrad-${phaseNumber}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#800020" stopOpacity="0.4" />
              <stop offset="25%" stopColor="#800020" stopOpacity="0.9" />
              <stop offset="55%" stopColor="#800020" stopOpacity="1" />
              <stop offset="85%" stopColor="#E60000" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#800020" stopOpacity="0.3" />
            </linearGradient>

            <filter id={`auraGlow-${phaseNumber}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#800020" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Smooth Cubic Bezier Line:
              - Starts left at mid-height (y=240)
              - Node 1 trough at (180, 260)
              - Node 2 crest at (510, 90)
              - Node 3 trough/slope at (810, 200)
              - Exits right gracefully at (980, 140)
          */}
          <motion.path
            d="M 20 240 C 90 250, 130 260, 180 260 C 300 260, 410 90, 510 90 C 610 90, 710 220, 810 200 C 870 190, 930 150, 980 140"
            fill="none"
            stroke={`url(#waveGrad-${phaseNumber})`}
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            filter={`url(#auraGlow-${phaseNumber})`}
          />

          {/* Subtle Dash Echo Line for High-End Engineering Aesthetic */}
          <motion.path
            d="M 20 240 C 90 250, 130 260, 180 260 C 300 260, 410 90, 510 90 C 610 90, 710 220, 810 200 C 870 190, 930 150, 980 140"
            fill="none"
            stroke="#800020"
            strokeWidth="1"
            strokeDasharray="4 8"
            strokeOpacity="0.3"
            initial={{ strokeDashoffset: 100 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        {/* ================================================================
            NODE 1: Trough Node (Coordinates: x = 18%, y = 72%)
            Text: Placed ABOVE-LEFT of the node, with giant watermark numeral
            ================================================================ */}
        {step1 && (
          <>
            {/* Step 1 Content Block (Above/Left of Node 1) */}
            <div
              onClick={() => onSelectStep(step1)}
              className="absolute left-[4%] top-[12%] lg:top-[16%] w-[280px] lg:w-[310px] cursor-pointer group z-20"
            >
              <div className="relative">
                {/* Huge Watermark Numeral behind text (Matches '1' in reference) */}
                <span className="absolute -top-10 -right-2 text-8xl lg:text-9xl font-black font-mono text-neutral-900/[0.05] select-none pointer-events-none group-hover:text-red-500/10 transition-colors">
                  {step1.watermark}
                </span>

                <div className="relative z-10">
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-mono text-[10px] font-bold mb-2">
                    {locale === "bn" ? step1.durationBn : step1.durationEn}
                  </div>
                  <h3 className="text-lg lg:text-xl font-extrabold text-neutral-900 leading-snug group-hover:text-[#800020] transition-colors mb-2">
                    {locale === "bn" ? step1.titleBn : step1.titleEn}
                  </h3>
                  <p className="text-xs lg:text-[13px] text-neutral-500 font-normal leading-relaxed line-clamp-3">
                    {locale === "bn" ? step1.descBn : step1.descEn}
                  </p>
                </div>
              </div>
            </div>

            {/* Step 1 Floating Hexagonal Badge with Soft Red Aura */}
            <div
              onClick={() => onSelectStep(step1)}
              className="absolute left-[18%] top-[72%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
            >
              {/* Soft Red Glowing Radial Aura (Matches glowing shadow in user image) */}
              <div className="absolute -inset-3 bg-[#800020]/25 rounded-full blur-xl group-hover:bg-[#800020]/40 transition-all duration-300 pointer-events-none" />

              <motion.div
                whileHover={{ scale: 1.15, y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative w-14 h-14 bg-white rounded-2xl border border-neutral-200/90 shadow-[0_12px_30px_-6px_rgba(0,0,0,0.14)] flex items-center justify-center group-hover:border-[#800020] group-hover:shadow-[0_15px_35px_-8px_rgba(128,0,32,0.3)] transition-all"
              >
                <step1.icon className="w-6 h-6 text-[#800020] transition-transform duration-300 group-hover:scale-110" />
              </motion.div>
            </div>
          </>
        )}

        {/* ================================================================
            NODE 2: Crest Node (Coordinates: x = 51%, y = 25%)
            Text: Placed BELOW the crest, with giant watermark numeral
            ================================================================ */}
        {step2 && (
          <>
            {/* Step 2 Floating Hexagonal Badge at Crest with Soft Red Aura */}
            <div
              onClick={() => onSelectStep(step2)}
              className="absolute left-[51%] top-[25%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
            >
              {/* Soft Red Glowing Radial Aura (Matches glowing shadow in user image) */}
              <div className="absolute -inset-4 bg-[#800020]/30 rounded-full blur-xl group-hover:bg-[#800020]/50 transition-all duration-300 pointer-events-none" />

              <motion.div
                whileHover={{ scale: 1.15, y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative w-15 h-15 bg-white rounded-2xl border border-neutral-200/90 shadow-[0_14px_32px_-6px_rgba(0,0,0,0.16)] flex items-center justify-center group-hover:border-[#800020] group-hover:shadow-[0_15px_35px_-8px_rgba(128,0,32,0.35)] transition-all"
              >
                <step2.icon className="w-6 h-6 text-[#800020] transition-transform duration-300 group-hover:scale-110" />
              </motion.div>
            </div>

            {/* Step 2 Content Block (Below Crest) */}
            <div
              onClick={() => onSelectStep(step2)}
              className="absolute left-[48%] -translate-x-1/2 top-[50%] lg:top-[52%] w-[290px] lg:w-[320px] cursor-pointer group z-20 text-left"
            >
              <div className="relative">
                {/* Huge Watermark Numeral behind text (Matches '2' in reference) */}
                <span className="absolute -top-12 -right-4 text-8xl lg:text-9xl font-black font-mono text-neutral-900/[0.05] select-none pointer-events-none group-hover:text-red-500/10 transition-colors">
                  {step2.watermark}
                </span>

                <div className="relative z-10">
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-mono text-[10px] font-bold mb-2">
                    {locale === "bn" ? step2.durationBn : step2.durationEn}
                  </div>
                  <h3 className="text-lg lg:text-xl font-extrabold text-neutral-900 leading-snug group-hover:text-[#800020] transition-colors mb-2">
                    {locale === "bn" ? step2.titleBn : step2.titleEn}
                  </h3>
                  <p className="text-xs lg:text-[13px] text-neutral-500 font-normal leading-relaxed line-clamp-3">
                    {locale === "bn" ? step2.descBn : step2.descEn}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ================================================================
            NODE 3: Inflection/Trough Node (Coordinates: x = 81%, y = 56%)
            Text: Placed BELOW & to the RIGHT/LEFT with giant watermark numeral
            ================================================================ */}
        {step3 && (
          <>
            {/* Step 3 Floating Hexagonal Badge with Soft Red Aura */}
            <div
              onClick={() => onSelectStep(step3)}
              className="absolute left-[81%] top-[56%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
            >
              {/* Soft Red Glowing Radial Aura (Matches glowing shadow in user image) */}
              <div className="absolute -inset-3 bg-[#800020]/25 rounded-full blur-xl group-hover:bg-[#800020]/40 transition-all duration-300 pointer-events-none" />

              <motion.div
                whileHover={{ scale: 1.15, y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative w-14 h-14 bg-white rounded-2xl border border-neutral-200/90 shadow-[0_12px_30px_-6px_rgba(0,0,0,0.14)] flex items-center justify-center group-hover:border-[#800020] group-hover:shadow-[0_15px_35px_-8px_rgba(128,0,32,0.3)] transition-all"
              >
                <step3.icon className="w-6 h-6 text-[#800020] transition-transform duration-300 group-hover:scale-110" />
              </motion.div>
            </div>

            {/* Step 3 Content Block (Positioned below/right of curve) */}
            <div
              onClick={() => onSelectStep(step3)}
              className="absolute right-[3%] bottom-[6%] lg:bottom-[8%] w-[280px] lg:w-[310px] cursor-pointer group z-20 text-left"
            >
              <div className="relative">
                {/* Huge Watermark Numeral behind text (Matches '3' in reference) */}
                <span className="absolute -top-12 -right-2 text-8xl lg:text-9xl font-black font-mono text-neutral-900/[0.05] select-none pointer-events-none group-hover:text-red-500/10 transition-colors">
                  {step3.watermark}
                </span>

                <div className="relative z-10">
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-mono text-[10px] font-bold mb-2">
                    {locale === "bn" ? step3.durationBn : step3.durationEn}
                  </div>
                  <h3 className="text-lg lg:text-xl font-extrabold text-neutral-900 leading-snug group-hover:text-[#800020] transition-colors mb-2">
                    {locale === "bn" ? step3.titleBn : step3.titleEn}
                  </h3>
                  <p className="text-xs lg:text-[13px] text-neutral-500 font-normal leading-relaxed line-clamp-3">
                    {locale === "bn" ? step3.descBn : step3.descEn}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ==================================================================
          MOBILE & SMALL TABLET VIEW (< 768px): Vertical Flowing Serpentine Wave
          ================================================================== */}
      <div className="md:hidden px-5 py-8 space-y-8 relative">
        {/* Subtle Vertical Track Line */}
        <div className="absolute left-[39px] top-12 bottom-12 w-[2px] bg-gradient-to-b from-[#800020] via-[#800020]/60 to-[#800020]/20 z-0" />

        {steps.map((step) => (
          <div
            key={step.id}
            onClick={() => onSelectStep(step)}
            className="relative flex items-start gap-4 cursor-pointer group"
          >
            {/* Floating Node Badge with Red Glow */}
            <div className="relative shrink-0 z-10">
              <div className="absolute -inset-2 bg-[#800020]/25 rounded-full blur-md" />
              <div className="relative w-12 h-12 bg-white rounded-2xl border border-neutral-200/90 shadow-md flex items-center justify-center group-hover:border-[#800020] transition-all">
                <step.icon className="w-5 h-5 text-[#800020]" />
              </div>
            </div>

            {/* Step Card Content */}
            <div className="flex-1 bg-neutral-50/80 border border-neutral-200/80 rounded-2xl p-4 relative overflow-hidden group-hover:bg-white group-hover:border-red-200 transition-all shadow-2xs">
              <span className="absolute top-1 right-3 text-5xl font-black font-mono text-neutral-900/[0.04] pointer-events-none">
                {step.watermark}
              </span>

              <div className="inline-block px-2 py-0.5 rounded-full bg-white border border-neutral-200 text-[10px] font-mono font-bold text-neutral-600 mb-1.5">
                {locale === "bn" ? step.durationBn : step.durationEn}
              </div>

              <h3 className="text-base font-bold text-neutral-900 group-hover:text-[#800020] transition-colors leading-snug mb-1">
                {locale === "bn" ? step.titleBn : step.titleEn}
              </h3>

              <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
                {locale === "bn" ? step.descBn : step.descEn}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =========================================================================
// INTERACTIVE MILESTONE DOSSIER MODAL
// =========================================================================
interface StepDetailModalProps {
  step: ProcessStep;
  locale: string;
  onClose: () => void;
}

function StepDetailModal({ step, locale, onClose }: StepDetailModalProps) {
  const Icon = step.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#E5E7EB] shadow-2xl overflow-hidden p-6 sm:p-8 text-neutral-900"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="relative shrink-0">
            <div className="absolute -inset-2 bg-[#800020]/25 rounded-full blur-md" />
            <div className="relative w-14 h-14 bg-white rounded-2xl border border-neutral-200 shadow-sm flex items-center justify-center">
              <Icon className="w-7 h-7 text-[#800020]" />
            </div>
          </div>

          <div className="pr-8">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-red-50 border border-red-200 text-red-600 font-mono text-xs font-bold px-2.5 py-0.5 rounded-full">
                {locale === "bn" ? `ধাপ ${step.step}` : `Phase ${step.step}`}
              </span>
              <span className="bg-neutral-100 text-neutral-700 font-mono text-xs font-bold px-2.5 py-0.5 rounded-full">
                {locale === "bn" ? step.durationBn : step.durationEn}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-neutral-900 leading-tight">
              {locale === "bn" ? step.titleBn : step.titleEn}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-600 leading-relaxed mb-6 bg-neutral-50 p-4 rounded-2xl border border-neutral-200/80">
          {locale === "bn" ? step.descBn : step.descEn}
        </p>

        {/* Deliverables Checklist */}
        <div className="mb-6">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#800020]" />
            <span>{locale === "bn" ? "এই ধাপে আপনি যা যা পাচ্ছেন" : "Key Deliverables & Verification"}</span>
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-neutral-700">
            {(locale === "bn" ? step.deliverablesBn : step.deliverablesEn).map((d, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#800020] mt-1.5 shrink-0" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Official Documentation */}
        <div className="mb-6">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-[#800020]" />
            <span>{locale === "bn" ? "প্রয়োজনীয় কাগজপত্র ও ডকুমেন্টস" : "Required Commercial Documents"}</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {(locale === "bn" ? step.docsBn : step.docsEn).map((doc, i) => (
              <span
                key={i}
                className="bg-white border border-neutral-200 text-neutral-800 text-xs font-medium px-3 py-1.5 rounded-xl shadow-2xs"
              >
                {doc}
              </span>
            ))}
          </div>
        </div>

        {/* Key Detail Box */}
        <div className="bg-red-50/70 border border-red-200/80 rounded-2xl p-4 mb-6 text-xs text-neutral-800 flex items-start gap-3">
          <Info className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
          <span>{locale === "bn" ? step.keyDetailBn : step.keyDetailEn}</span>
        </div>

        {/* Modal Action CTA */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-xs font-bold text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            {locale === "bn" ? "বন্ধ করুন" : "Close"}
          </button>
          <Link
            href="/quote"
            className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#2D2D2D] hover:bg-[#800020] transition-colors flex items-center gap-1.5 shadow-md"
          >
            <span>{locale === "bn" ? "কোটেশনের জন্য কথা বলুন" : "Begin Sourcing"}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
