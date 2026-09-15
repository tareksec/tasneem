"use client";

import Link from "next/link";
import { ArrowUpRight, Shirt, Building2, Sparkles, Waves, CheckCircle2, ChevronDown } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export function IndustriesSection() {
  const { locale, dict } = useTranslation();

  const industries = [
    {
      num: "01",
      tag: locale === "bn" ? "গার্মেন্টস ও নিটওয়্যার রপ্তানি" : "Apparel & Knitwear Export",
      title: locale === "bn" ? "গার্মেন্টস ও নিটওয়্যার রপ্তানিকারক" : "Garment & Knitwear Exporters",
      headline: locale === "bn"
        ? "আন্তর্জাতিক ব্র্যান্ডের বাল্ক অর্ডারের জন্য হাই-স্পিড সার্কুলার মেশিনারি"
        : "High-productivity circular machines for global export apparel programs",
      description: locale === "bn"
        ? "টি-শার্ট, পোলো শার্ট ও অ্যাক্টিভওয়্যারের আন্তর্জাতিক মান নিশ্চিতে উচ্চ-উৎপাদনশীল সার্কুলার মেশিনারি।"
        : "High-gauge circular machinery engineered for high-volume export t-shirts, polo shirts, and activewear.",
      recommendedMachines: ["Single Jersey Circular", "Double Jersey Circular", "High-Speed Interlock"],
      targetFabrics: ["100% Cotton Jersey", "CVC / TC Pique", "Spandex Single Jersey", "1x1 & 2x2 Ribs"],
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
      tag: locale === "bn" ? "ভার্টিক্যাল কম্পোজিট অপারেশন" : "Vertical Composite Operation",
      title: locale === "bn" ? "কম্পোজিট টেক্সটাইল মিল" : "Composite Textile Mills",
      headline: locale === "bn"
        ? "বৃহৎ আকারের ভার্টিক্যাল নিটিং কারখানার জন্য হেভি-ডিউটি মেশিনারি"
        : "Heavy-duty machinery for large-scale vertical manufacturing operations",
      description: locale === "bn"
        ? "কম্পোজিট কারখানার জন্য সেন্ট্রাল লুব্রিকেশন ও নির্ভুল ফিডারযুক্ত পূর্ণাঙ্গ নিটিং লাইন।"
        : "Heavy-duty 24/7 knitting lines engineered for vertical composite mills running yarn-to-garment operations.",
      recommendedMachines: ["Multi-Feeder Double Jersey", "High-RPM Single Jersey", "Universal Finishing Lines"],
      targetFabrics: ["Heavy Rib Knits", "Drop-Needle Jersey", "Structured Thermal Knitwear", "Collar Trims"],
      bgClass: "bg-[#F7F7F8] text-neutral-900 border-t border-neutral-300 shadow-[0_-30px_70px_rgba(0,0,0,0.14)]",
      gridClass: "bg-[linear-gradient(to_right,#0000000d_1px,transparent_1px),linear-gradient(to_bottom,#0000000d_1px,transparent_1px)]",
      badgeBorder: "border-[#F9E6EA] bg-[#FDF2F4] text-[#800020]",
      pillClass: "bg-white border-neutral-200 text-neutral-700 shadow-2xs",
      btnClass: "bg-[#800020] hover:bg-[#5A0017] text-white",
      watermarkColor: "text-neutral-900/[0.04]",
      icon: Building2,
    },
    {
      num: "03",
      tag: locale === "bn" ? "হাই-পাইল লুপ ও শোষণক্ষমতা" : "High-Pile Loop & Absorbency",
      title: locale === "bn" ? "টেরি তোয়ালে ও ফ্লিস প্রস্তুতকারক" : "Terry Towel & Fleece Mills",
      headline: locale === "bn"
        ? "তোয়ালে ও শীতের ফ্লিসের জন্য নিখুঁত লুপ পাইল সার্কুলার মেশিনারি"
        : "Precision loop pile circular equipment for bath, towel, and winter fleece",
      description: locale === "bn"
        ? "তোয়ালে, বাথরোব ও উইন্টার ফ্লিসের সুষম লুপ গঠনে বিশেষায়িত সার্কুলার মেশিনারি।"
        : "Specialized loop-pile circular machinery delivering uniform pile heights for towels, fleece, and bathrobes.",
      recommendedMachines: ["Single Terry Circular", "Double Terry Fleece Machine", "Rotary Shearing Lines"],
      targetFabrics: ["French Terry Fleece", "Loop Pile Toweling", "Polar Fleece Substrates", "Velour Fabrics"],
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
      tag: locale === "bn" ? "কম্পিউটারাইজড ইলেকট্রনিক ডিজাইন" : "Electronic Pattern Selection",
      title: locale === "bn" ? "ফ্যাশন জ্যাকার্ড ও টেকনিক্যাল নিট" : "Fashion Jacquard & Structural Knits",
      headline: locale === "bn"
        ? "ফ্যাশন ও টেকনিক্যাল টেক্সটাইলের জন্য কম্পিউটারাইজড ইলেকট্রনিক জ্যাকার্ড"
        : "Computerized electronic pattern selection for fashion and athletic textiles",
      description: locale === "bn"
        ? "জটিল মাল্টি-কালার ডিজাইন ও টেকনিক্যাল টেক্সটাইলের জন্য ইলেকট্রনিক জ্যাকার্ড মেশিন।"
        : "Computerized electronic jacquard machinery for rapid pattern changes and complex fashion knitwear.",
      recommendedMachines: ["Electronic Jacquard Circular", "Transfer Jacquard Machine", "Computerized Flat Knit"],
      targetFabrics: ["Fashion Jacquard Knitwear", "Mattress Ticking Fabric", "Athletic Jacquard Mesh", "Textured Ribs"],
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
    <article className="relative w-full">
      {industries.map((ind, idx) => {
        const IconComponent = ind.icon;
        const isFirst = idx === 0;

        return (
          <section
            key={ind.num}
            className={`relative md:sticky md:top-0 min-h-screen md:h-screen w-full flex flex-col justify-center items-center py-14 sm:py-20 md:py-0 px-4 sm:px-8 lg:px-12 relative overflow-visible md:overflow-hidden ${
              ind.bgClass
            } ${!isFirst ? "rounded-t-[28px] sm:rounded-t-[48px] lg:rounded-t-[56px]" : ""}`}
          >
            {/* Architectural Technical Grid with Radial Mask Accent */}
            <div
              className={`absolute inset-0 ${ind.gridClass} bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none`}
            />

            {/* Huge Watermark Number in Background */}
            <div
              className={`absolute right-4 sm:right-12 bottom-4 sm:bottom-8 text-[20vw] lg:text-[18vw] font-black font-mono leading-none select-none pointer-events-none ${ind.watermarkColor}`}
            >
              {ind.num}
            </div>

            {/* Central Content Box */}
            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col justify-center">
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div
                    className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-mono font-bold shadow-xs ${ind.badgeBorder}`}
                  >
                    <IconComponent className="w-3.5 h-3.5 text-[#800020]" />
                    <span>{ind.num} / 04</span>
                    <span>•</span>
                    <span className="font-sans font-medium">{ind.tag}</span>
                  </div>
                </div>

                <span className="sr-only">
                  {locale === "bn" ? "শিল্প অ্যাপ্লিকেশন" : "Industrial Application"}
                </span>
              </div>

              {/* Title & Headline */}
              <h2 className="text-2xl min-[360px]:text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-2.5 sm:mb-4">
                {ind.title}
              </h2>
              <p className="text-xs sm:text-lg font-medium opacity-80 max-w-3xl mb-3 sm:mb-6 leading-relaxed">
                {ind.headline}
              </p>

              {/* Description Paragraph */}
              <p className="text-xs sm:text-base opacity-70 max-w-2xl leading-relaxed mb-5 sm:mb-8 line-clamp-3 sm:line-clamp-none">
                {ind.description}
              </p>

              {/* Recommended Machinery & Target Fabrics Chips */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-6 mb-6 sm:mb-10 pt-4 border-t border-current/10">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider opacity-60 block mb-2 font-mono">
                    {locale === "bn" ? "প্রস্তাবিত মেশিনারি:" : "Recommended Machinery:"}
                  </span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {ind.recommendedMachines.map((m) => (
                      <span
                        key={m}
                        className={`text-xs sm:text-sm font-medium px-2.5 sm:px-3 py-1 rounded-lg border flex items-center gap-1.5 ${ind.pillClass}`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#800020] shrink-0" />
                        <span>{m}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider opacity-60 block mb-2 font-mono">
                    {locale === "bn" ? "টার্গেট ফ্যাব্রিক আউটপুট:" : "Target Fabric Output:"}
                  </span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {ind.targetFabrics.map((f) => (
                      <span
                        key={f}
                        className={`text-xs sm:text-sm font-medium px-2.5 sm:px-3 py-1 rounded-lg border ${ind.pillClass}`}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons & Scroll Indicator Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 w-full">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
                  <Link
                    href="/industries"
                    className={`inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer min-h-[44px] text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-2 ${ind.btnClass}`}
                  >
                    <span>
                      {locale === "bn" ? "এই খাতের বিস্তারিত ও ছবি দেখুন" : "Explore Industry Specs & Gallery"}
                    </span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </Link>

                  <Link
                    href="/quote"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm bg-[#800020] hover:bg-[#5A0017] text-white shadow-md hover:shadow-lg active:scale-[0.98] transition-all min-h-[44px] text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-2"
                  >
                    <span>{dict.common.requestQuote}</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </Link>
                </div>

                {/* Subtle Scroll Hint */}
                {idx < industries.length - 1 && (
                  <div className="hidden sm:flex items-center gap-2 text-xs font-mono opacity-50">
                    <ChevronDown className="w-4 h-4 animate-bounce" />
                    <span>
                      {locale === "bn"
                        ? `পরবর্তী খাত স্ক্রোল করুন (০${idx + 2})`
                        : `Scroll for Sector 0${idx + 2}`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}
    </article>
  );
}
