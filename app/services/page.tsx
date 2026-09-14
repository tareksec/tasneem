"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Factory,
  ShieldCheck,
  Ship,
  Wrench,
  GraduationCap,
  Package,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Clock,
  CheckCircle2,
  Phone,
  MessageSquare,
  HelpCircle,
  Sparkles,
  ChevronRight,
  FileText,
  X,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

interface ServiceItem {
  id: string;
  category: "sourcing" | "logistics" | "support";
  titleEn: string;
  titleBn: string;
  tagEn: string;
  tagBn: string;
  timelineBadgeEn: string;
  timelineBadgeBn: string;
  image: string;
  descriptionEn: string;
  descriptionBn: string;
  locationEn: string;
  locationBn: string;
  timelineEn: string;
  timelineBn: string;
  standardEn: string;
  standardBn: string;
  deliverablesEn: string[];
  deliverablesBn: string[];
  icon: React.ElementType;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "direct-sourcing",
    category: "sourcing",
    titleEn: "Direct Machine Sourcing",
    titleBn: "সরাসরি ফ্যাক্টরি সোর্সিং ও মেশিন আমদানি",
    tagEn: "Factory Direct",
    tagBn: "সরাসরি ফ্যাক্টরি",
    timelineBadgeEn: "2024–2026 Procurement",
    timelineBadgeBn: "লেটেস্ট প্রকিউরমেন্ট",
    image: "/images/services/service-sourcing.jpg",
    descriptionEn:
      "Direct connection to verified circular knitting machinery builders in China and Taiwan. We source customized cylinder diameters, gauge configurations (14G to 44G), and feeder ratios tailored to your mill's fabric GSM targets without domestic broker markups.",
    descriptionBn:
      "চীন ও তাইওয়ানের সেরা সার্কুলার নিটিং মেশিন কারখানাগুলোর সাথে আমাদের সরাসরি যোগাযোগ। কোনো লোকাল দালালের কমিশন ছাড়াই আপনার মিলের টার্গেট GSM অনুযায়ী কাস্টমাইজড Cylinder ও Gauge (14G–44G) দিয়ে সবচেয়ে সাশ্রয়ী ফ্যাক্টরি রেটে মেশিন এনে দিই।",
    locationEn: "Sourcing Hubs: Taiwan, Ningbo, Jiangsu & Quanzhou",
    locationBn: "সোর্সিং হাব: তাইওয়ান, নিংবো, জিয়াংসু ও কুয়ানঝু",
    timelineEn: "Turnaround: Day 1 – 4 Parameter Matching & Pricing",
    timelineBn: "সময়: ১–৪ দিনের মধ্যে টেকনিক্যাল স্পেসিফিকেশন ও কোটেশন",
    standardEn: "Compliance: Verified OEM Builders & ISO Standards",
    standardBn: "মানদণ্ড: ভেরিফায়েড OEM ম্যানুফ্যাকচারার ও ISO স্ট্যান্ডার্ড",
    deliverablesEn: [
      "Verified manufacturer credentials & factory audit credentials",
      "Direct factory CFR Chattogram pricing without broker commissions",
      "Custom feeder, camming, and inverter drive setup to order",
    ],
    deliverablesBn: [
      "যাচাইকৃত ফ্যাক্টরি অডিট ও কমপ্লায়েন্স নিশ্চিতকরণ",
      "কোনো দালালের বাড়তি খরচ ছাড়া সরাসরি ফ্যাক্টরি CFR রেট",
      "আপনার চাহিদামতো কাস্টম Feeder, Camming ও Inverter ড্রাইভ সেটআপ",
    ],
    icon: Factory,
  },
  {
    id: "pre-shipment-inspection",
    category: "sourcing",
    titleEn: "Pre-Shipment Quality Inspection",
    titleBn: "শিপমেন্টের আগে নিরপেক্ষ কোয়ালিটি ইন্সপেকশন (SGS / Intertek / BV)",
    tagEn: "Quality Control",
    tagBn: "কোয়ালিটি কন্ট্রোল",
    timelineBadgeEn: "Zero-Defect Protocol",
    timelineBadgeBn: "জিরো-ডিফেক্ট নিশ্চয়তা",
    image: "/images/services/service-inspection.jpg",
    descriptionEn:
      "Independent third-party pre-shipment inspections conducted by accredited global testing agencies (SGS, Intertek / ITS, Bureau Veritas). Inspections verify dial concentricity, motor RPM stability, cam track finish, and vacuum crating before ocean loading.",
    descriptionBn:
      "বিশ্বখ্যাত SGS, Intertek কিংবা Bureau Veritas দিয়ে জাহাজে তোলার আগেই নিরপেক্ষভাবে সবকিছু চেক করানো হয়। Dial কনসেন্ট্রিসিটি (<0.02mm), মোটর RPM স্ট্যাবিলিটি আর Cam ট্র্যাকের ফিনিশিং নিখুঁত পেলেই কেবল শিপমেন্ট ছাড়পত্র দেওয়া হয়।",
    locationEn: "Inspection Scope: Overseas Factory Floor & Packing Yard",
    locationBn: "ইন্সপেকশন লোকেশন: প্রস্তুতকারক ফ্যাক্টরি ও প্যাকিং ইয়ার্ড",
    timelineEn: "Turnaround: Pre-Loading Stage (Comprehensive Report)",
    timelineBn: "সময়: কনটেইনার লোড করার আগেই বিস্তারিত টেস্ট রিপোর্ট",
    standardEn: "Standard: SGS / Intertek Clean Inspection Certificate (CIC)",
    standardBn: "মানদণ্ড: SGS / Intertek Clean Inspection Certificate (CIC)",
    deliverablesEn: [
      "Comprehensive pre-loading testing certificate & runout data",
      "Verification of needle latch and sinker cam smooth movement",
      "Container anti-corrosion vacuum sealing verification report",
    ],
    deliverablesBn: [
      "জাহাজে লোড করার আগের সম্পূর্ণ টেস্ট রিপোর্ট ও ডেটা শিট",
      "Needle ল্যাচ এবং Sinker Cam-এর স্মুথ মুভমেন্ট ভেরিফিকেশন",
      "সমুদ্রের লবণাক্ত বাতাস থেকে বাঁচাতে মরিচারোধী ভ্যাকুয়াম ক্র্যাটিং",
    ],
    icon: ShieldCheck,
  },
  {
    id: "ocean-shipping",
    category: "logistics",
    titleEn: "CFR Chattogram Ocean Logistics",
    titleBn: "CFR Chattogram সমুদ্র লজিস্টিকস ও শিপিং",
    tagEn: "Ocean Logistics",
    tagBn: "ওশান লজিস্টিকস",
    timelineBadgeEn: "Port-to-Port Freight",
    timelineBadgeBn: "পোর্ট-টু-পোর্ট ফ্রেইট",
    image: "/images/services/service-shipping.jpg",
    descriptionEn:
      "Turnkey ocean transport coordination from overseas factory port directly to Chattogram Port, Bangladesh. We handle export packing, moisture-proof vacuum wrapping, container vessel bookings, and complete commercial invoice and bill of lading documentation.",
    descriptionBn:
      "চীনের কারখানা বন্দর থেকে সরাসরি চট্টগ্রাম বন্দর পর্যন্ত নির্বিঘ্ন সমুদ্র পরিবহন। আর্দ্রতারোধী ভ্যাকুয়াম সিলিং, ভেসেল বুকিং এবং বাংলাদেশ ব্যাংকের নিয়ম মেনে নির্ভুল কমার্শিয়াল ইনভয়েস ও Bill of Lading (B/L) আমরাই তদারকি করি।",
    locationEn: "Routing: China / Taiwan Ports to Chattogram Port, BD",
    locationBn: "রুট: চীন / তাইওয়ান বন্দর থেকে সরাসরি চট্টগ্রাম বন্দর",
    timelineEn: "Transit Time: 14 – 21 Days Ocean Voyage Tracked",
    timelineBn: "ট্রানজিট: ১৪–২১ দিনের সমুদ্রযাত্রা (রিয়েল-টাইম ট্র্যাকিং)",
    standardEn: "Incoterms: CFR Chattogram with Original Bank B/L",
    standardBn: "Incoterms: CFR Chattogram ও অরিজিনাল ব্যাংক B/L",
    deliverablesEn: [
      "Moisture-proof vacuum crating preventing maritime rust",
      "Complete documentary support for Bangladesh Bank compliant L/C",
      "Coordinated port arrival schedules and direct shipping line dispatch",
    ],
    deliverablesBn: [
      "মরিচারোধী ভ্যাকুয়াম ক্র্যাটিং, যা সমুদ্রের নোনা বাতাস থেকে মেশিনকে বাঁচায়",
      "বাংলাদেশ ব্যাংকের গাইডলাইন অনুযায়ী নিখুঁত L/C ডকুমেন্টস",
      "সঠিক সময়ে জাহাজ পৌঁছানো ও ব্যাংক মারফত দ্রুত মূল শিপিং পেপারস হস্তান্তর",
    ],
    icon: Ship,
  },
  {
    id: "installation-commissioning",
    category: "support",
    titleEn: "Installation & Factory Commissioning",
    titleBn: "আপনার মিলে ইনস্টলেশন ও অন-সাইট কমিশনিং",
    tagEn: "Technical Setup",
    tagBn: "অন-সাইট সেটআপ",
    timelineBadgeEn: "Turnkey Commissioning",
    timelineBadgeBn: "টার্নকি কমিশনিং",
    image: "/images/services/service-installation.jpg",
    descriptionEn:
      "On-site mechanical installation by experienced industrial knitting engineers. Our team handles foundation leveling, anchor bolt securing, creel and positive feeder alignment, oil mist lubrication synchronization, and trial fabric knitting runs.",
    descriptionBn:
      "আমাদের অভিজ্ঞ টেক্সটাইল ইঞ্জিনিয়াররা সরাসরি আপনার ফ্যাক্টরি ফ্লোরে এসে মেশিন বসিয়ে দেন। ফাউন্ডেশন লেভেলিং, Creel ও পজিটিভ ফিডার অ্যালাইনমেন্ট, লুব্রিকেশন টিউনিং এবং মিলের নিজস্ব সুতায় কাপড় তৈরি করে বুঝিয়ে দেওয়া হয়।",
    locationEn: "Coverage: Narayanganj, Gazipur, Savar, Chattogram & Nationwide",
    locationBn: "কভারেজ: নারায়ণগঞ্জ, গাজীপুর, সাভার, চট্টগ্রামসহ সারা দেশ",
    timelineEn: "Duration: 2 – 4 Days On-Site Completion & Sign-off",
    timelineBn: "সময়: ২–৪ দিনে সম্পূর্ণ সেটআপ ও ট্রায়াল রান সাইন-অফ",
    standardEn: "Tolerance: Dial & Cylinder Concentricity <0.02mm",
    standardBn: "টলারেন্স: Dial ও Cylinder কনসেন্ট্রিসিটি <0.02mm",
    deliverablesEn: [
      "Dial and cylinder concentricity calibration (<0.02mm tolerance)",
      "Electrical inverter drive, auto-stop sensors, and tension synchronization",
      "Sample fabric test knit on mill yarn cones for GSM & handfeel",
    ],
    deliverablesBn: [
      "Dial ও Cylinder কনসেন্ট্রিসিটির নিখুঁত ক্যালিব্রেশন (<0.02mm)",
      "Inverter ড্রাইভ, অটো-স্টপ সেন্সর এবং সুতার টেনশন নিখুঁত সিঙ্ক",
      "মিলের নিজস্ব সুতায় স্যাম্পল ফেব্রিক টেস্ট নিটিং ও GSM যাচাই",
    ],
    icon: Wrench,
  },
  {
    id: "training-mentorship",
    category: "support",
    titleEn: "Operator & Technician Training",
    titleBn: "অপারেটর ও টেকনিশিয়ানদের হাতে-কলমে প্রশিক্ষণ",
    tagEn: "Skills Development",
    tagBn: "ব্যবহারিক প্রশিক্ষণ",
    timelineBadgeEn: "Workforce Upskilling",
    timelineBadgeBn: "দক্ষতা বৃদ্ধি",
    image: "/images/services/service-training.jpg",
    descriptionEn:
      "Practical training for your mill's floor operators and maintenance engineers. Topics cover daily preventive maintenance, needle and sinker replacement procedures, positive feeder tension adjustments, and inverter fault diagnostic troubleshooting.",
    descriptionBn:
      "আপনার মিলের ফ্লোর অপারেটর আর মেইনটেন্যান্স দলের জন্য পুরোপুরি ব্যবহারিক ট্রেনিং। নিয়মিত পরিচর্যা, Needle ও Sinker বদলানোর সঠিক নিয়ম, টেনশন অ্যাডজাস্টমেন্ট এবং Inverter ফল্ট কীভাবে সমাধান করতে হয় তা হাতে-কলমে শেখানো হয়।",
    locationEn: "Location: Client Mill Floor / Narayanganj Training Hub",
    locationBn: "লোকেশন: সরাসরি আপনার মিলের ফ্লোরে অথবা আমাদের নারায়ণগঞ্জ সেন্টারে",
    timelineEn: "Curriculum: Hands-on Shift Workshops & SOP Manuals",
    timelineBn: "সিলেবাস: শিফট ভিত্তিক প্র্যাকটিক্যাল সেশন ও সহজ SOP গাইড",
    standardEn: "Outcome: Minimized Machine Downtime & Needle Breakage",
    standardBn: "ফলাফল: মেশিনের ডাউনটাইম কমে এবং Needle ভাঙার ঝামেলা দূর হয়",
    deliverablesEn: [
      "Hands-on cam changeover and gauge conversion guidance",
      "Oil lubrication schedule and lint blowout best practices",
      "Reduced machine downtime, fabric defects, and needle breakages",
    ],
    deliverablesBn: [
      "Cam চেঞ্জওভার ও Gauge রূপান্তরের সরাসরি ব্যবহারিক গাইডলাইন",
      "নিয়মিত অয়েল লুব্রিকেশন শিডিউল ও লিন্ট পরিষ্কারের সঠিক নিয়ম",
      "কাপড়ে ডিফেক্ট কমানো ও অতিরিক্ত পার্টস ক্ষয় ঠেকানোর কৌশল",
    ],
    icon: GraduationCap,
  },
  {
    id: "spares-support",
    category: "support",
    titleEn: "Spare Parts & After-Sales Backup",
    titleBn: "আসল স্পেয়ার পার্টস ও আফটার-সেলস ব্যাকআপ",
    tagEn: "Ongoing Backup",
    tagBn: "সার্বক্ষণিক সাপোর্ট",
    timelineBadgeEn: "24/7 Parts Support",
    timelineBadgeBn: "রেডি স্টক পার্টস",
    image: "/images/services/service-spares.jpg",
    descriptionEn:
      "Long-term support for your factory's production continuity. We maintain a reliable supply chain for original knitting needles, sinkers, positive storage feeders, yarn feeding timing belts, ceramic eyelets, and electrical inverter control cards.",
    descriptionBn:
      "মিলের উৎপাদন যাতে এক ঘণ্টার জন্যও ব্যাহত না হয়, সেজন্য সবসময় আমাদের ব্যাকআপ পাবেন। আসল নিটিং Needle, Sinker, পজিটিভ ফিডার, টাইমিং বেল্ট, সিরামিক আইলেট এবং Inverter কন্ট্রোল কার্ড সবসময় আমাদের নারায়ণগঞ্জে রেডি স্টক থাকে।",
    locationEn: "Inventory Hub: Plot-594, Industrial Park, BSCIC Narayanganj",
    locationBn: "ওয়্যারহাউস: প্লট-৫৯৪, বিসিক শিল্পনগরী, নারায়ণগঞ্জ",
    timelineEn: "Dispatch: Same-Day Delivery in Dhaka / Narayanganj Zones",
    timelineBn: "ডেলিভারি: ঢাকা ও নারায়ণগঞ্জ অঞ্চলে সেম-ডে ডেলিভারি",
    standardEn: "Authenticity: 100% Genuine Factory-Compatible Spares",
    standardBn: "নিশ্চয়তা: ১০০% অরিজিনাল ফ্যাক্টরি-কম্প্যাটিবল পার্টস",
    deliverablesEn: [
      "Genuine factory-compatible replacement needles, sinkers & cams",
      "Fast dispatch within Narayanganj, Gazipur, and Dhaka industrial clusters",
      "Emergency on-call technical diagnostic and troubleshooting desk",
    ],
    deliverablesBn: [
      "১০০% জেনুইন ফ্যাক্টরি-কম্প্যাটিবল Needle, Sinker ও Cam পার্টস",
      "নারায়ণগঞ্জ, গাজীপুর ও ঢাকার যেকোনো শিল্পাঞ্চলে দ্রুত পৌঁছে দেওয়া",
      "জরুরি প্রয়োজনে অন-কল টেকনিক্যাল সাপোর্ট ও সমাধান",
    ],
    icon: Package,
  },
];

export default function ServicesPage() {
  const { t, locale } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<"all" | "sourcing" | "logistics" | "support">("all");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const filteredServices = SERVICES_DATA.filter((s) => {
    if (activeCategory === "all") return true;
    return s.category === activeCategory;
  });

  return (
    <div className="py-12 sm:py-20 bg-engineering-grid min-h-screen text-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================================================================
            1. PAGE HEADER (Styled with Accent Words matching reference image)
            ================================================================ */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-200 bg-red-50/90 text-xs font-mono font-bold text-red-600 mb-4 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#FF0000] animate-pulse" />
            <span>{locale === "bn" ? "মেশিনারি ও টেকনিক্যাল সলিউশন" : "END-TO-END INDUSTRIAL SOLUTIONS"}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 leading-tight mb-4">
            {locale === "bn" ? (
              <>
                আমাদের <span className="text-[#FF0000]">সকল সেবা</span>
              </>
            ) : (
              <>
                Our <span className="text-[#FF0000]">Comprehensive Services</span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            {locale === "bn"
              ? "মেশিন সিলেকশন আর ফ্যাক্টরি সোর্সিং থেকে শুরু করে কোয়ালিটি ইন্সপেকশন, চট্টগ্রাম বন্দর পর্যন্ত শিপিং, আপনার মিলে ইনস্টলেশন আর সার্বক্ষণিক পার্টস সাপোর্ট—সব দায়িত্ব আমাদের।"
              : "From technical requirement analysis and direct factory sourcing to pre-shipment quality verification, CFR ocean freight, precision on-site commissioning, and genuine spare parts backup."}
          </p>

          {/* Interactive Category Filter Pills (Apple/Tesla Segmented Control) */}
          <div className="flex items-center justify-center mt-8">
            <div className="inline-flex p-1.5 rounded-full bg-neutral-200/80 backdrop-blur-md border border-neutral-300/80 shadow-inner gap-1.5 flex-wrap justify-center">
              {[
                { key: "all", labelEn: "All Services (06)", labelBn: "সকল সেবা (০৬)" },
                { key: "sourcing", labelEn: "Direct Sourcing & Inspection", labelBn: "সোর্সিং ও ইন্সপেকশন" },
                { key: "logistics", labelEn: "CFR Ocean Shipping", labelBn: "সমুদ্র লজিস্টিকস ও শিপিং" },
                { key: "support", labelEn: "Installation & Maintenance", labelBn: "ইনস্টলেশন ও সার্ভিসিং" },
              ].map((tab) => {
                const isActive = activeCategory === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveCategory(tab.key as any)}
                    className={`relative isolate px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 select-none ${
                      isActive
                        ? "text-white shadow-md shadow-red-500/30"
                        : "text-neutral-700 hover:text-black bg-white/80 hover:bg-white border border-transparent shadow-xs"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeServiceCategoryPill"
                        className="absolute inset-0 rounded-full bg-[#FF0000] z-0 shadow-sm"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{locale === "bn" ? tab.labelBn : tab.labelEn}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ================================================================
            2. ALTERNATING ASYMMETRIC CHAMFERED CARDS LIST
            (Matches the exact visual hierarchy & geometry of the user image)
            ================================================================ */}
        <div className="space-y-8 sm:space-y-12 mb-20">
          {filteredServices.map((service, index) => {
            // Alternating orientation: Even indices (0, 2, 4) have image LEFT, odd indices (1, 3, 5) have image RIGHT
            const isEven = index % 2 === 0;

            return (
              <div
                key={service.id}
                className="group relative bg-white border border-[#E5E7EB] rounded-[28px] sm:rounded-[36px] shadow-[0_12px_40px_-15px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_-12px_rgba(255,0,0,0.1)] hover:border-red-200 transition-all duration-300 p-5 sm:p-7 lg:p-9 overflow-hidden"
              >
                <div
                  className={`flex flex-col ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-8 sm:gap-10 lg:gap-12`}
                >
                  {/* ========================================================
                      IMAGE COLUMN WITH SIGNATURE CHAMFER / CUT CORNER
                      ======================================================== */}
                  <div className="w-full lg:w-[48%] shrink-0">
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] w-full overflow-hidden shadow-md">
                      {/* Geometric Cut Corner (Top-Left for Left-aligned images, Top-Right for Right-aligned images) */}
                      <div
                        className="w-full h-full relative overflow-hidden transition-transform duration-700 ease-out group-hover:scale-102"
                        style={{
                          clipPath: isEven
                            ? "polygon(36px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 36px)"
                            : "polygon(0% 0%, calc(100% - 36px) 0%, 100% 36px, 100% 100%, 0% 100%)",
                        }}
                      >
                        <Image
                          src={service.image}
                          alt={locale === "bn" ? service.titleBn : service.titleEn}
                          fill
                          sizes="(max-width: 1024px) 100vw, 540px"
                          className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                        />

                        {/* Soft Vignette Overlay for Crisp Bottom Badges */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                        {/* Floating Frosted Glass Pills (Matches reference photo: "2020-2025" and "Commercial Construction") */}
                        <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 flex flex-wrap items-center gap-2 z-10">
                          <span className="bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] sm:text-[11px] font-medium px-3 py-1 rounded-full shadow-xs">
                            {locale === "bn" ? service.timelineBadgeBn : service.timelineBadgeEn}
                          </span>

                          <span className="bg-white/90 backdrop-blur-md border border-neutral-200/90 text-neutral-900 font-bold text-[10px] sm:text-[11px] px-3 py-1 rounded-full shadow-xs">
                            {locale === "bn" ? service.tagBn : service.tagEn}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ========================================================
                      CONTENT COLUMN WITH CIRCULAR METRIC ICONS
                      ======================================================== */}
                  <div className="w-full lg:w-[52%] flex flex-col justify-center">
                    {/* Top Service Number & Category Pill */}
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="text-xs font-mono font-bold text-[#FF0000] tracking-wider">
                        0{index + 1} / 06
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                      <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                        {locale === "bn" ? service.tagBn : service.tagEn}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight leading-snug group-hover:text-[#FF0000] transition-colors mb-3">
                      {locale === "bn" ? service.titleBn : service.titleEn}
                    </h2>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6 font-normal">
                      {locale === "bn" ? service.descriptionBn : service.descriptionEn}
                    </p>

                    {/* ====================================================
                        CIRCULAR METRIC BULLETS (Matches Orange Circles in Reference)
                        ==================================================== */}
                    <div className="space-y-3 mb-6">
                      {/* Metric 1: Location / Scope */}
                      <div className="flex items-center gap-3 text-xs sm:text-[13px] text-neutral-700">
                        <div className="w-6 h-6 rounded-full bg-red-50 border border-red-200 text-[#FF0000] flex items-center justify-center shrink-0">
                          <MapPin className="w-3.5 h-3.5" />
                        </div>
                        <div className="truncate">
                          <span className="font-bold text-neutral-900">
                            {locale === "bn" ? "লোকেশন ও পরিধি : " : "Coverage : "}
                          </span>
                          <span className="text-neutral-600">
                            {locale === "bn" ? service.locationBn : service.locationEn}
                          </span>
                        </div>
                      </div>

                      {/* Metric 2: Timeline / Turnaround */}
                      <div className="flex items-center gap-3 text-xs sm:text-[13px] text-neutral-700">
                        <div className="w-6 h-6 rounded-full bg-red-50 border border-red-200 text-[#FF0000] flex items-center justify-center shrink-0">
                          <Clock className="w-3.5 h-3.5" />
                        </div>
                        <div className="truncate">
                          <span className="font-bold text-neutral-900">
                            {locale === "bn" ? "প্রয়োজনীয় সময় : " : "Turnaround : "}
                          </span>
                          <span className="text-neutral-600">
                            {locale === "bn" ? service.timelineBn : service.timelineEn}
                          </span>
                        </div>
                      </div>

                      {/* Metric 3: Standard / Compliance */}
                      <div className="flex items-center gap-3 text-xs sm:text-[13px] text-neutral-700">
                        <div className="w-6 h-6 rounded-full bg-red-50 border border-red-200 text-[#FF0000] flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </div>
                        <div className="truncate">
                          <span className="font-bold text-neutral-900">
                            {locale === "bn" ? "কোয়ালিটি স্ট্যান্ডার্ড : " : "Standard : "}
                          </span>
                          <span className="text-neutral-600">
                            {locale === "bn" ? service.standardBn : service.standardEn}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ====================================================
                        ACTION ROW: "Learn more →" + Modal Trigger
                        ==================================================== */}
                    <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-4">
                      <button
                        onClick={() => setSelectedService(service)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 hover:bg-[#FF0000] text-[#FF0000] hover:text-white border border-red-200 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shadow-2xs group/btn"
                      >
                        <span>{locale === "bn" ? "বিস্তারিত দেখুন" : "Learn more"}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                      </button>

                      <Link
                        href="/quote"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-900 text-neutral-700 hover:text-white border border-neutral-200 text-xs font-mono font-bold transition-all duration-200 shadow-2xs group/inquire"
                      >
                        <span>{locale === "bn" ? "কোটেশন চান" : "Inquire"}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#FF0000] group-hover/inquire:text-white transition-colors" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================================================================
            3. INTERACTIVE SERVICE DETAIL MODAL (Opens on "Learn more →")
            ================================================================ */}
        <AnimatePresence>
          {selectedService && (
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
                  onClick={() => setSelectedService(null)}
                  className="absolute top-5 right-5 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-center text-[#FF0000] shrink-0">
                    <selectedService.icon className="w-7 h-7" />
                  </div>

                  <div className="pr-8">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-red-50 border border-red-200 text-red-600 font-mono text-xs font-bold px-2.5 py-0.5 rounded-full">
                        {locale === "bn" ? selectedService.tagBn : selectedService.tagEn}
                      </span>
                      <span className="bg-neutral-100 text-neutral-700 font-mono text-xs font-bold px-2.5 py-0.5 rounded-full">
                        {locale === "bn" ? selectedService.timelineBadgeBn : selectedService.timelineBadgeEn}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-neutral-900 leading-tight">
                      {locale === "bn" ? selectedService.titleBn : selectedService.titleEn}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6 bg-neutral-50 p-4 rounded-2xl border border-neutral-200/80">
                  {locale === "bn" ? selectedService.descriptionBn : selectedService.descriptionEn}
                </p>

                {/* Key Deliverables */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#FF0000]" />
                    <span>{locale === "bn" ? "যা যা পাচ্ছেন" : "Key Deliverables & Specifications"}</span>
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-700">
                    {(locale === "bn" ? selectedService.deliverablesBn : selectedService.deliverablesEn).map((d, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] mt-1.5 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Operational Details Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-xs bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200/80">
                  <div>
                    <span className="font-bold text-neutral-900 block mb-0.5">
                      {locale === "bn" ? "লোকেশন ও সোর্স" : "Coverage & Sourcing"}
                    </span>
                    <span className="text-neutral-600">
                      {locale === "bn" ? selectedService.locationBn : selectedService.locationEn}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900 block mb-0.5">
                      {locale === "bn" ? "কোয়ালিটি স্ট্যান্ডার্ড" : "Quality Standard"}
                    </span>
                    <span className="text-neutral-600">
                      {locale === "bn" ? selectedService.standardBn : selectedService.standardEn}
                    </span>
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="flex items-center justify-end gap-3 pt-2 border-t border-neutral-100">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="px-5 py-2.5 rounded-full text-xs font-bold text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    {locale === "bn" ? "বন্ধ করুন" : "Close"}
                  </button>
                  <Link
                    href="/quote"
                    className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#0A0A0A] hover:bg-[#FF0000] transition-colors flex items-center gap-1.5 shadow-md"
                  >
                    <span>{locale === "bn" ? "এই সেবার কোটেশন নিন" : "Request This Service"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ================================================================
            4. BOTTOM CALL-TO-ACTION BANNER WITH RECONCILED CONTACT FACTS
            ================================================================ */}
        <div className="relative border border-[#E5E7EB] bg-gradient-to-br from-white via-white to-red-50/40 rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 lg:p-14 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Faint Background Watermark */}
          <div className="absolute right-0 bottom-0 text-[180px] font-mono font-black text-neutral-900/[0.02] select-none pointer-events-none leading-none -mr-8 -mb-10">
            TASNEEM
          </div>

          <div className="relative z-10 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100/80 text-red-700 text-xs font-mono font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF0000] animate-ping" />
              <span>{locale === "bn" ? "আপনার বিশ্বস্ত পার্টনার" : "CONSULTATION & PROCUREMENT"}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-snug mb-3">
              {locale === "bn"
                ? "আপনার টেক্সটাইল মিলের জন্য নির্ভরযোগ্য মেশিনারি খুঁজছেন?"
                : "Looking for a Turnkey Machinery Solution?"}
            </h2>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {locale === "bn"
                ? "কোনো লুকানো খরচ বা ঝামেলা ছাড়াই সরাসরি ব্যাংক L/C-র মাধ্যমে আমরা মেশিন এনে দিই। আজই আমাদের সাথে পরামর্শ করে Proforma Invoice ও কোটেশন বুঝে নিন।"
                : "We handle the entire procurement journey under transparent commercial L/C terms. Request an initial consultation or technical specification review today."}
            </p>

            {/* Quick Contact Badges */}
            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-neutral-700">
              <a
                href="tel:01887683333"
                className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-neutral-200 hover:border-red-300 transition-colors shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#FF0000]" />
                <span>Hotline: 01887683333</span>
              </a>

              <a
                href="https://wa.me/8801711110516"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-neutral-200 hover:border-emerald-300 transition-colors shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp: +880 1711-110516</span>
              </a>
            </div>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href="/quote"
              className="w-full sm:w-auto bg-[#FF0000] hover:bg-[#E00000] text-white font-bold text-sm sm:text-base px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>{t.common.requestQuote}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto bg-white hover:bg-neutral-100 text-neutral-800 font-bold text-sm sm:text-base px-6 py-4 rounded-full border border-neutral-300/80 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <HelpCircle className="w-4 h-4 text-neutral-500" />
              <span>{locale === "bn" ? "বিশেষজ্ঞের সাথে কথা বলুন" : "Consult Specialist"}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
