"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Shirt,
  Building2,
  Waves,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Layers,
  Factory,
  Compass,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function IndustriesPage() {
  const { locale, t } = useTranslation();

  const sectors = [
    {
      num: "01",
      tag: locale === "bn" ? "পোশাক ও নিটওয়্যার রপ্তানি" : "Apparel & Knitwear Export",
      title: locale === "bn" ? "রপ্তানিমুখী নিটওয়্যার ও গার্মেন্টস মিল" : "Export-Oriented Garment & Knitwear Mills",
      headline: locale === "bn"
        ? "বিশ্বমানের এক্সপোর্ট অর্ডারের জন্য হাই-স্পিড ও নিখুঁত সার্কুলার নিটিং মেশিন"
        : "High-productivity circular machines for global apparel export programs",
      description: locale === "bn"
        ? "দেশের নিটওয়্যার রপ্তানিকারক মিলগুলোতে প্রয়োজন ২৪ ঘণ্টা বিরতিহীন প্রোডাকশন আর নিখুঁত ফ্যাব্রিক GSM। আমাদের Single Jersey ও Double Jersey মেশিনগুলো বেসিক টি-শার্ট, Polo Pique, Interlock ও Rib কাপড়ের সেরা আউটপুট দেয়।"
        : "Bangladeshi knitwear exporters rely on continuous 24-hour manufacturing with tight fabric weight consistency. Our single and double jersey machines are tuned for high-volume basic tees, polo pique, interlock thermal tops, and rib trims.",
      recommendedMachines: ["Single Jersey Circular", "Double Jersey Circular", "High-Speed Interlock"],
      targetFabrics: ["100% Cotton Jersey", "CVC & TC Pique", "Spandex Single Jersey", "1x1 & 2x2 Ribs"],
      image: "/images/industries/garment-knitwear.jpg",
      imageCaption: locale === "bn" ? "আন্তর্জাতিক গার্মেন্টস ও ফ্যাব্রিক উৎপাদন" : "Garment Export & Knitwear Manufacturing",
      imageSpecBadge: "100% Export Ready",
      bgClass: "bg-[#080D14] text-white",
      gridClass: "bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)]",
      badgeBorder: "border-white/15 bg-white/10 text-white/90",
      pillClass: "bg-white/10 border-white/15 text-white/90",
      btnClass: "bg-white hover:bg-neutral-100 text-[#080D14]",
      watermarkColor: "text-white/[0.03]",
      icon: Shirt,
    },
    {
      num: "02",
      tag: locale === "bn" ? "ভার্টিক্যাল কম্পোজিট কারখানা" : "Vertical Composite Facility",
      title: locale === "bn" ? "কম্পোজিট টেক্সটাইল মিল" : "Composite Textile Mills",
      headline: locale === "bn"
        ? "বিশাল পরিসরে ভার্টিক্যাল উৎপাদনের জন্য হেভি-ডিউটি টেক্সটাইল মেশিনারি"
        : "Heavy-duty machinery for large-scale vertical manufacturing operations",
      description: locale === "bn"
        ? "নারায়ণগঞ্জ, গাজীপুর ও সাভারের বড় কম্পোজিট মিলগুলোতে দরকার কম ডাউনটাইম আর দীর্ঘস্থায়ী পারফরম্যান্স। সেন্ট্রাল অয়েল লুব্রিকেশন, ডাস্ট একজস্ট ও পজিটিভ ইয়ার্ন Feeder সমৃদ্ধ মেশিন আমরা সরাসরি কারখানা থেকে সরবরাহ করি।"
        : "Vertical composite facilities in Narayanganj, Gazipur, and Savar require robust machinery with low maintenance downtime. We supply machines equipped with central oil lubrication, synchronized dust extraction, and precision positive yarn storage feeders.",
      recommendedMachines: ["Multi-Feeder Double Jersey", "High-RPM Single Jersey", "Universal Finishing Lines"],
      targetFabrics: ["Heavy Rib Knits", "Drop-Needle Jersey", "Structured Thermal Knitwear", "Collar Trims"],
      image: "/images/industries/composite-textile.jpg",
      imageCaption: locale === "bn" ? "বৃহৎ কম্পোজিট নিটিং কারখানা ফ্লোর" : "Continuous Industrial Composite Factory Floor",
      imageSpecBadge: "Heavy-Duty 24/7",
      bgClass: "bg-[#F7F7F8] text-neutral-900 border-t border-neutral-300 shadow-[0_-30px_70px_rgba(0,0,0,0.14)]",
      gridClass: "bg-[linear-gradient(to_right,#0000000d_1px,transparent_1px),linear-gradient(to_bottom,#0000000d_1px,transparent_1px)]",
      badgeBorder: "border-[#D8A4AF] bg-[#FDF2F4] text-[#800020]",
      pillClass: "bg-white border-neutral-200 text-neutral-700 shadow-2xs",
      btnClass: "bg-[#800020] hover:bg-[#5A0017] text-white",
      watermarkColor: "text-neutral-900/[0.04]",
      icon: Building2,
    },
    {
      num: "03",
      tag: locale === "bn" ? "হাই-পাইল লুপ ও শোষণক্ষমতা" : "High-Pile Loop & Absorbency",
      title: locale === "bn" ? "Terry তোয়ালে ও Fleece প্রস্তুতকারক" : "Terry Towel & Fleece Manufacturers",
      headline: locale === "bn"
        ? "উন্নত মানের টাওয়েল ও উইন্টার Fleece তৈরির জন্য নিখুঁত লুপ সার্কুলার মেশিন"
        : "Precision loop pile circular equipment for bath, towel, and winter fleece",
      description: locale === "bn"
        ? "স্পেশাল Sinker Cam প্রযুক্তির কারণে আমাদের Terry মেশিনগুলোতে নিখুঁত লুপ তৈরি হয়, পাইল হাইট সমান থাকে এবং আন্তর্জাতিক বায়ারদের চাহিদামতো সর্বোচ্চ পানি শোষণক্ষম কাপড় পাওয়া যায়।"
        : "Equipped with specialized sinker camming, our terry machines deliver consistent loop formation, even pile height, and high water absorbency fabrics for international retail brands.",
      recommendedMachines: ["Single Terry Circular", "Double Terry Fleece Machine", "Rotary Shearing Lines"],
      targetFabrics: ["French Terry Fleece", "Loop Pile Toweling", "Polar Fleece Substrates", "Velour Fabrics"],
      image: "/images/industries/terry-towel.jpg",
      imageCaption: locale === "bn" ? "প্রিমিয়াম তোয়ালে ও হাই-পাইল Fleece ফ্যাব্রিক" : "Terry Towel Loop Pile & Luxury Fleece Processing",
      imageSpecBadge: "Precision Camming",
      bgClass: "bg-[#0B131E] text-white border-t border-white/15 shadow-[0_-30px_70px_rgba(0,0,0,0.3)]",
      gridClass: "bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)]",
      badgeBorder: "border-cyan-400/30 bg-cyan-950/40 text-cyan-300",
      pillClass: "bg-white/10 border-white/15 text-white/90",
      btnClass: "bg-white hover:bg-neutral-100 text-[#0B131E]",
      watermarkColor: "text-white/[0.03]",
      icon: Waves,
    },
    {
      num: "04",
      tag: locale === "bn" ? "কম্পিউটারাইজড প্যাটার্ন সিলেকশন" : "Electronic Pattern Selection",
      title: locale === "bn" ? "Jacquard ফ্যাশন ও টেকনিক্যাল নিট প্রতিষ্ঠান" : "Fashion Jacquard & Technical Knit Facilities",
      headline: locale === "bn"
        ? "ডিজাইনার ফ্যাশন ও টেকনিক্যাল কাপড়ের জন্য ইলেকট্রনিক প্যাটার্ন সিলেকশন"
        : "Computerized electronic pattern selection for fashion and automotive textiles",
      description: locale === "bn"
        ? "কালারফুল মাল্টি-প্যাটার্ন, স্পোর্টসওয়্যার মেশ আর ম্যাট্রেস কাপড়ের জন্য আমরা এনে দিই আধুনিক Electronic Jacquard সার্কুলার মেশিন, যাতে মুহূর্তেই নতুন ডিজাইন ও প্যাটার্ন সেট করা যায়।"
        : "For fashion mills producing intricate multi-color patterns, mesh athletic panels, and mattress ticking, we supply computerized electronic jacquard circular machines with rapid digital pattern change capabilities.",
      recommendedMachines: ["Electronic Jacquard Circular", "Transfer Jacquard Machine", "Computerized Flat Knit"],
      targetFabrics: ["Fashion Knitwear", "Mattress Ticking Fabric", "Athletic Jacquard Mesh", "Textured Ribs"],
      image: "/images/industries/fashion-jacquard.jpg",
      imageCaption: locale === "bn" ? "ডিজিটাল Jacquard ও টেক্সচার্ড নিট ডিজাইন" : "Computerized Jacquard & Intricate Knit Structures",
      imageSpecBadge: "Digital Patterning",
      bgClass: "bg-white text-neutral-900 border-t border-neutral-300 shadow-[0_-35px_80px_rgba(0,0,0,0.18)]",
      gridClass: "bg-[linear-gradient(to_right,#0000000d_1px,transparent_1px),linear-gradient(to_bottom,#0000000d_1px,transparent_1px)]",
      badgeBorder: "border-purple-200 bg-purple-50 text-purple-700",
      pillClass: "bg-neutral-100 border-neutral-200 text-neutral-700 shadow-2xs",
      btnClass: "bg-[#800020] hover:bg-[#5A0017] text-white",
      watermarkColor: "text-neutral-900/[0.04]",
      icon: Sparkles,
    },
  ];

  return (
    <div className="bg-[#F8F9FA] text-[#2D2D2D]">
      {/* 1. Page Header Section */}
      <div className="pt-16 pb-12 sm:pt-20 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E5E7EB] bg-white text-xs font-semibold text-[#4B5563] mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#800020] animate-pulse" />
            <span>{locale === "bn" ? "কোন খাতে কোন মেশিন লাগবে" : "Sectors & Production Applications"}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#2D2D2D] leading-tight mb-4">
            {locale === "bn"
              ? "বাংলাদেশের নিটিং ও টেক্সটাইল খাতের উপযোগী আধুনিক মেশিনারি"
              : "Machinery Solutions Tailored to Bangladesh Textile Sectors"}
          </h1>
          <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-2xl">
            {locale === "bn"
              ? "কাপড়ের ধরন অনুযায়ী সিলিন্ডার সাইজ, Gauge আর Feeder সিলেকশনে যাতে কোনো ভুল না হয়—সেজন্যই আমাদের খাতভিত্তিক গাইড। নিচে স্ক্রোল করে আপনার মিলের প্রয়োজনীয় সেটআপ দেখে নিন।"
              : "Every fabric segment demands specific cylinder, gauge, and feeder configurations. Scroll down through the stacked sectors below to inspect factory photography and machinery specifications."}
          </p>
        </div>
      </div>

      {/* 2. Lenis Smooth Scroll Stacking Cards Container */}
      <article className="relative w-full">
        {sectors.map((sector, idx) => {
          const IconComponent = sector.icon;
          const isFirst = idx === 0;

          return (
            <section
              key={sector.num}
              className={`sticky top-0 h-screen w-full flex flex-col justify-center items-center px-4 sm:px-8 lg:px-12 relative overflow-hidden ${
                sector.bgClass
              } ${!isFirst ? "rounded-t-[36px] sm:rounded-t-[48px] lg:rounded-t-[56px]" : ""}`}
            >
              {/* Architectural Grid Background with Radial Mask */}
              <div
                className={`absolute inset-0 ${sector.gridClass} bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none`}
              />

              {/* Watermark Sector Number */}
              <div
                className={`absolute right-4 sm:right-10 bottom-2 sm:bottom-6 text-[18vw] lg:text-[16vw] font-black font-mono leading-none select-none pointer-events-none ${sector.watermarkColor}`}
              >
                {sector.num}
              </div>

              {/* 12-Column Responsive Card Body with Extra Web Images */}
              <div className="relative z-10 w-full max-w-6xl mx-auto py-4 sm:py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
                  {/* Left Column: Sector Specs & Details (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col justify-center">
                    {/* Top Meta Bar */}
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold shadow-xs ${sector.badgeBorder}`}
                      >
                        <IconComponent className="w-3.5 h-3.5 text-[#800020]" />
                        <span>{sector.num} / 04</span>
                        <span>•</span>
                        <span className="font-sans font-medium">{sector.tag}</span>
                      </div>
                    </div>

                    {/* Sector Title */}
                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] mb-2 sm:mb-3">
                      {sector.title}
                    </h2>
                    <p className="text-xs sm:text-sm lg:text-base font-semibold opacity-85 mb-3 leading-snug">
                      {sector.headline}
                    </p>

                    {/* Description */}
                    <p className="text-xs sm:text-sm opacity-70 leading-relaxed mb-5 sm:mb-6 line-clamp-3 sm:line-clamp-4">
                      {sector.description}
                    </p>

                    {/* Recommended Machinery & Target Fabrics Chips */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 pt-3 border-t border-current/10">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 block mb-1.5 font-mono">
                          {locale === "bn" ? "উপযুক্ত মেশিন মডেল:" : "Recommended Machines:"}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {sector.recommendedMachines.map((m) => (
                            <span
                              key={m}
                              className={`text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-md border flex items-center gap-1 ${sector.pillClass}`}
                            >
                              <CheckCircle2 className="w-3 h-3 text-[#800020] shrink-0" />
                              <span>{m}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 block mb-1.5 font-mono">
                          {locale === "bn" ? "যেসব কাপড় তৈরি করা যাবে:" : "Target Fabric Output:"}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {sector.targetFabrics.map((f) => (
                            <span
                              key={f}
                              className={`text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-md border ${sector.pillClass}`}
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-3">
                      <Link
                        href="/quote"
                        className={`inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full font-bold text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer ${sector.btnClass}`}
                      >
                        <span>{t.common.requestQuote}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href="/machines"
                        className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full text-xs sm:text-sm font-semibold border border-current/20 hover:border-current/40 opacity-80 hover:opacity-100 transition-colors"
                      >
                        <span>{locale === "bn" ? "মডেল ও স্পেসিফিকেশন দেখুন" : "View Machine Models"}</span>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: High-Resolution Industrial Web Photo (5 cols) */}
                  <div className="lg:col-span-5 relative">
                    <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden border border-current/15 shadow-2xl group/img">
                      <Image
                        src={sector.image}
                        alt={sector.imageCaption}
                        fill
                        priority={idx <= 1}
                        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 520px"
                        className="object-cover object-center group-hover/img:scale-105 transition-transform duration-700 ease-out"
                      />

                      {/* Scrim Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

                      {/* Top Spec Pill Badge */}
                      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                        {sector.imageSpecBadge}
                      </div>

                      {/* Bottom Caption Overlay */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                        <span className="font-semibold drop-shadow-sm truncate">
                          {sector.imageCaption}
                        </span>
                        <Factory className="w-4 h-4 shrink-0 opacity-80" />
                      </div>
                    </div>

                    {/* Next Sector Hint (Mobile & Desktop) */}
                    {idx < sectors.length - 1 && (
                      <div className="mt-3 flex items-center justify-end gap-1.5 text-[11px] font-mono opacity-50">
                        <span>{locale === "bn" ? `পরবর্তী খাত ০${idx + 2}` : `Scroll for Sector 0${idx + 2}`}</span>
                        <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </article>

      {/* 3. Bottom Consultation & Sourcing Callout */}
      <div className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E5E7EB] bg-white">
        <div className="rounded-3xl bg-gradient-to-br from-neutral-900 to-black text-white p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs uppercase tracking-wider text-[#D8A4AF] font-bold block mb-2 font-mono">
              {locale === "bn" ? "ফ্রি টেকনিক্যাল পরামর্শ" : "Technical Consultancy"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-3">
              {locale === "bn"
                ? "আপনার মিলের কাজের জন্য কোন মেশিনটি সবচেয়ে লাভজনক হবে?"
                : "Need Precision Machinery Sizing for Your Sector?"}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {locale === "bn"
                ? "সিলিন্ডার সাইজ, Gauge কিংবা Feeder কোনটা নিলে প্রোডাকশন সবচেয়ে ভালো পাবেন, তা নিয়ে সরাসরি কথা বলুন আমাদের অভিজ্ঞ টেকনিশিয়ানদের সাথে।"
                : "Discuss target fabric outputs, feeder counts, and cylinder diameters directly with our technical team in Narayanganj."}
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Link
              href="/quote"
              className="bg-[#800020] hover:bg-[#5A0017] text-white px-8 py-4 rounded-full font-bold text-sm text-center shadow-lg transition-all duration-200 hover:scale-[1.02]"
            >
              {t.common.requestQuote}
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-4 rounded-full font-bold text-sm text-center transition-colors"
            >
              {locale === "bn" ? "শো-রুমে এসে মেশিন দেখুন" : "Visit BSCIC Showroom"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
