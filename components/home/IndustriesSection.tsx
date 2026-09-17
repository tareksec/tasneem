"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shirt,
  Building2,
  Waves,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Factory,
  Layers,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

interface IndustrySector {
  num: string;
  tagEn: string;
  tagBn: string;
  titleEn: string;
  titleBn: string;
  headlineEn: string;
  headlineBn: string;
  descriptionEn: string;
  descriptionBn: string;
  image: string;
  badgeEn: string;
  badgeBn: string;
  recommendedMachines: string[];
  targetFabricsEn: string;
  targetFabricsBn: string;
  advantageEn: string;
  advantageBn: string;
  bgClass: string;
  gridClass: string;
  icon: React.ElementType;
}

const SECTORS_DATA: IndustrySector[] = [
  {
    num: "01",
    tagEn: "Apparel & Knitwear Export",
    tagBn: "গার্মেন্টস ও নিটওয়্যার রপ্তানি",
    titleEn: "Export-Oriented Garment & Knitwear Mills",
    titleBn: "টি-শার্ট, পোলো শার্ট ও স্পোর্টসওয়্যার কারখানা",
    headlineEn: "High-productivity circular machines for global apparel export programs",
    headlineBn: "বিশ্বমানের এক্সপোর্ট অর্ডারের জন্য হাই-স্পিড ও নিখুঁত সার্কুলার নিটিং মেশিন",
    descriptionEn:
      "Bangladeshi knitwear exporters rely on continuous 24-hour manufacturing with tight fabric weight consistency. Our single and double jersey machines are tuned for high-volume basic tees, polo pique, interlock thermal tops, and rib trims.",
    descriptionBn:
      "দেশের নিটওয়্যার রপ্তানিকারক মিলগুলোতে প্রয়োজন ২৪ ঘণ্টা বিরতিহীন প্রোডাকশন আর নিখুঁত ফ্যাব্রিক GSM। আমাদের Single Jersey ও Double Jersey মেশিনগুলো বেসিক টি-শার্ট, Polo Pique, Interlock ও Rib কাপড়ের সেরা আউটপুট দেয়।",
    image: "/images/industries/garment-knitwear.jpg",
    badgeEn: "100% Export Ready",
    badgeBn: "১০০% এক্সপোর্ট কোয়ালিটি",
    recommendedMachines: ["Single Jersey Circular", "Double Jersey Circular", "High-Speed Interlock"],
    targetFabricsEn: "100% Cotton Jersey, CVC & TC Pique, Spandex Single Jersey, 1x1 & 2x2 Ribs",
    targetFabricsBn: "১০০% কটন জার্সি, CVC ও TC পিক, স্প্যানডেক্স জার্সি, ১x১ ও ২x২ রিব",
    advantageEn: "24/7 continuous operation with tight GSM tolerance & high output",
    advantageBn: "২৪/৭ বিরতিহীন অপারেশন ও নিখুঁত GSM নিয়ন্ত্রণ",
    bgClass: "bg-[#F9F8F6] text-[#2D2D2D]",
    gridClass: "bg-[linear-gradient(to_right,#0000000d_1px,transparent_1px),linear-gradient(to_bottom,#0000000d_1px,transparent_1px)]",
    icon: Shirt,
  },
  {
    num: "02",
    tagEn: "Vertical Composite Facility",
    tagBn: "ভার্টিক্যাল কম্পোজিট কারখানা",
    titleEn: "Composite Knitting & High-Output Vertical Mills",
    titleBn: "স্পিনিং থেকে নিটিং—পূর্ণাঙ্গ কম্পোজিট টেক্সটাইল কারখানা",
    headlineEn: "Heavy-duty machinery for large-scale vertical manufacturing operations",
    headlineBn: "বিশাল পরিসরে ভার্টিক্যাল উৎপাদনের জন্য হেভি-ডিউটি টেক্সটাইল মেশিনারি",
    descriptionEn:
      "Vertical composite facilities in Narayanganj, Gazipur, and Savar require robust machinery with low maintenance downtime. We supply machines equipped with central oil lubrication, synchronized dust extraction, and precision positive yarn storage feeders.",
    descriptionBn:
      "নারায়ণগঞ্জ, গাজীপুর ও সাভারের বড় কম্পোজিট মিলগুলোতে দরকার কম ডাউনটাইম আর দীর্ঘস্থায়ী পারফরম্যান্স। সেন্ট্রাল অয়েল লুব্রিকেশন, ডাস্ট একজস্ট ও পজিটিভ ইয়ার্ন Feeder সমৃদ্ধ মেশিন আমরা সরাসরি কারখানা থেকে সরবরাহ করি।",
    image: "/images/industries/composite-textile.jpg",
    badgeEn: "Heavy-Duty 24/7",
    badgeBn: "২৪/৭ হেভি-ডিউটি",
    recommendedMachines: ["Multi-Feeder Double Jersey", "High-RPM Single Jersey", "Universal Finishing Lines"],
    targetFabricsEn: "Drop-Needle Jersey, Heavy Rib Knits, Structured Thermal Knitwear, Collar Trims",
    targetFabricsBn: "ড্রপ-নিডল জার্সি, হেভি রিব, স্ট্রাকচার্ড থার্মাল নিটওয়্যার ও কলার ট্রিম",
    advantageEn: "Zero vibration, high RPM consistency & minimum downtime",
    advantageBn: "কম্পনহীন হাই-আরপিএম রানিং ও সর্বনিম্ন ডাউনটাইম",
    bgClass: "bg-[#F9F8F6] text-[#2D2D2D]",
    gridClass: "bg-[linear-gradient(to_right,#0000000d_1px,transparent_1px),linear-gradient(to_bottom,#0000000d_1px,transparent_1px)]",
    icon: Building2,
  },
  {
    num: "03",
    tagEn: "Terry Towel & Fleece Mills",
    tagBn: "টেরি তোয়ালে ও উইন্টার ফ্লিস",
    titleEn: "Terry Towel, Bathrobe & Winter Fleece Mills",
    titleBn: "তোয়ালে, বাথরোব ও প্রিমিয়াম উইন্টার ফ্লিস প্রোডাকশন",
    headlineEn: "Engineered circular machinery for uniform loop pile and polar fleece fabrics",
    headlineBn: "নিখুঁত লুপ ফরমেশন ও হাই-পাইল ফেব্রিকের জন্য বিশেষায়িত সার্কুলার মেশিনারি",
    descriptionEn:
      "Export-grade plush terry towels, velour bathrobes, and brushed winter fleece demand precise sinker cam timing. Our specialized terry and shearing-compatible machines deliver uniform loop height and dense, pill-free surfaces.",
    descriptionBn:
      "ইউরোপ-আমেরিকায় রপ্তানিযোগ্য সফট টেরি তোয়ালে ও শীতের উইন্টার ফ্লিসের জন্য দরকার ইউনিফর্ম লুপ পাইল। আমাদের স্পেশালাইজড Terry ও Polar Fleece সার্কুলার মেশিনগুলো সুনির্দিষ্ট সিঙ্কার ট্র্যাকিং নিশ্চিত করে।",
    image: "/images/industries/terry-towel.jpg",
    badgeEn: "Precision Loop Pile",
    badgeBn: "নিখুঁত লুপ পাইল",
    recommendedMachines: ["Single Loop Terry Machine", "Double-Sided Polar Fleece Circular", "Precision Shearing Unit"],
    targetFabricsEn: "Soft Terry Towels, Bathrobe Velour, Polar Fleece, French Terry",
    targetFabricsBn: "সফট টেরি তোয়ালে, বাথরোব ফ্যাব্রিক, পোলার ফ্লিস, ফ্রেঞ্চ টেরি",
    advantageEn: "Precision sinker cam timing & pill-free surface formation",
    advantageBn: "সুনির্দিষ্ট সিঙ্কার ট্র্যাকিং ও পিলিং-মুক্ত ফ্যাব্রিক সারফেস",
    bgClass: "bg-[#F9F8F6] text-[#2D2D2D]",
    gridClass: "bg-[linear-gradient(to_right,#0000000d_1px,transparent_1px),linear-gradient(to_bottom,#0000000d_1px,transparent_1px)]",
    icon: Waves,
  },
  {
    num: "04",
    tagEn: "Fashion & Technical Knits",
    tagBn: "ফ্যাশন ও টেকনিক্যাল টেক্সটাইল",
    titleEn: "Engineered Jacquard, Mattress Fabric & Fashion Knits",
    titleBn: "জ্যাকার্ড, ম্যাট্রেস কভার ও হাই-এন্ড স্ট্রাকচার্ড নিটওয়্যার",
    headlineEn: "Computerized electronic jacquard machinery for rapid pattern changes",
    headlineBn: "কম্পিউটারাইজড ইলেকট্রনিক জ্যাকার্ড ও দ্রুত প্যাটার্ন পরিবর্তনের স্বয়ংক্রিয় সুবিধা",
    descriptionEn:
      "For fashion mills producing intricate multi-color patterns, athletic mesh panels, and mattress ticking, we supply computerized electronic jacquard circular machines with rapid digital pattern change capabilities.",
    descriptionBn:
      "জটিল মাল্টি-কালার ডিজাইন, ম্যাট্রেস টিকিং ও স্পোর্টস মেশ ফ্যাব্রিকের জন্য ইলেকট্রনিক জ্যাকার্ড মেশিন অপরিহার্য। ইউএসবি ও সফটওয়্যার নিয়ন্ত্রিত নিডল সিলেকশনের মাধ্যমে যেকোনো নতুন ডিজাইন মুহূর্তে উৎপাদন লাইনে নেওয়া যায়।",
    image: "/images/industries/fashion-jacquard.jpg",
    badgeEn: "Digital Patterning",
    badgeBn: "ডিজিটাল প্যাটার্নিং",
    recommendedMachines: ["Electronic Jacquard Circular", "Transfer Jacquard Machine", "Computerized Flat Knit"],
    targetFabricsEn: "Fashion Jacquard Knitwear, Mattress Ticking Fabric, Athletic Jacquard Mesh",
    targetFabricsBn: "ফ্যাশন জ্যাকার্ড নিটওয়্যার, ম্যাট্রেস টিকিং, অ্যাথলেটিক জ্যাকার্ড মেশ",
    advantageEn: "Microsecond actuator needle selection & digital pattern memory",
    advantageBn: "ইউএসবি ও সফটওয়্যার নিয়ন্ত্রিত তাৎক্ষণিক ডিজাইন চেঞ্জ",
    bgClass: "bg-[#F9F8F6] text-[#2D2D2D]",
    gridClass: "bg-[linear-gradient(to_right,#0000000d_1px,transparent_1px),linear-gradient(to_bottom,#0000000d_1px,transparent_1px)]",
    icon: Sparkles,
  },
];

export function IndustriesSection() {
  const { locale, t } = useTranslation();

  return (
    <article className="relative w-full">
      {SECTORS_DATA.map((sector, index) => {
        const isFirst = index === 0;
        const isEven = index % 2 === 0;
        const IconComponent = sector.icon;

        return (
          <section
            key={sector.num}
            className={`sticky top-0 min-h-screen md:h-screen w-full flex flex-col justify-center items-center px-4 sm:px-8 lg:px-12 py-12 md:py-0 relative overflow-hidden ${
              sector.bgClass
            } ${
              !isFirst
                ? "rounded-t-[32px] sm:rounded-t-[48px] lg:rounded-t-[56px] shadow-[0_-25px_60px_rgba(0,0,0,0.09)] border-t border-[#E8E5DF]"
                : ""
            }`}
          >
            {/* Architectural Technical Grid with Radial Mask */}
            <div
              className={`absolute inset-0 ${sector.gridClass} bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none`}
            />

            {/* Huge Watermark Number in Background */}
            <div className="absolute right-4 sm:right-10 bottom-2 sm:bottom-6 text-[18vw] lg:text-[16vw] font-black font-mono leading-none select-none pointer-events-none text-neutral-900/[0.04]">
              {sector.num}
            </div>

            {/* Central Services-Style Asymmetric Chamfered Card */}
            <div className="relative z-10 w-full max-w-6xl mx-auto">
              <div className="bg-white text-[#2D2D2D] rounded-[28px] sm:rounded-[36px] shadow-2xl p-5 sm:p-7 lg:p-9 border border-[#E5E7EB] overflow-hidden">
                <div
                  className={`flex flex-col ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-6 sm:gap-8 lg:gap-10`}
                >
                  {/* ====================================================
                      IMAGE COLUMN WITH SIGNATURE CHAMFER / CUT CORNER
                      ==================================================== */}
                  <div className="w-full lg:w-[48%] shrink-0">
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] w-full overflow-hidden shadow-md">
                      {/* Geometric Cut Corner */}
                      <div
                        className="w-full h-full relative overflow-hidden transition-transform duration-700 ease-out group-hover:scale-102"
                        style={{
                          clipPath: isEven
                            ? "polygon(36px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 36px)"
                            : "polygon(0% 0%, calc(100% - 36px) 0%, 100% 36px, 100% 100%, 0% 100%)",
                        }}
                      >
                        <Image
                          src={sector.image}
                          alt={locale === "bn" ? sector.titleBn : sector.titleEn}
                          fill
                          priority={isFirst}
                          sizes="(max-width: 1024px) 100vw, 540px"
                          className="object-cover object-center hover:scale-106 transition-transform duration-700 ease-out"
                        />

                        {/* Soft Vignette Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                        {/* Floating Frosted Glass Pills */}
                        <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 flex flex-wrap items-center gap-2 z-10">
                          <span className="bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] sm:text-[11px] font-medium px-3 py-1 rounded-full shadow-xs">
                            {locale === "bn" ? sector.badgeBn : sector.badgeEn}
                          </span>

                          <span className="bg-white/90 backdrop-blur-md border border-neutral-200/90 text-neutral-900 font-bold text-[10px] sm:text-[11px] px-3 py-1 rounded-full shadow-xs">
                            {locale === "bn" ? sector.tagBn : sector.tagEn}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ====================================================
                      CONTENT COLUMN WITH CIRCULAR METRIC BULLETS
                      ==================================================== */}
                  <div className="w-full lg:w-[52%] flex flex-col justify-center">
                    {/* Top Meta Tag & Number */}
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <span className="text-xs font-mono font-bold text-[#800020] tracking-wider">
                        {sector.num} / 04
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                      <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                        {locale === "bn" ? sector.tagBn : sector.tagEn}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-neutral-900 tracking-tight leading-snug mb-1.5">
                      {locale === "bn" ? sector.titleBn : sector.titleEn}
                    </h2>

                    {/* Headline */}
                    <p className="text-xs sm:text-sm font-semibold text-[#800020] mb-2 leading-relaxed">
                      {locale === "bn" ? sector.headlineBn : sector.headlineEn}
                    </p>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4 font-normal line-clamp-3 sm:line-clamp-none">
                      {locale === "bn" ? sector.descriptionBn : sector.descriptionEn}
                    </p>

                    {/* ================================================
                        CIRCULAR METRIC BULLETS (Services Page Aesthetic)
                        ================================================ */}
                    <div className="space-y-2.5 mb-5">
                      {/* Metric 1: Recommended Machines */}
                      <div className="flex items-start gap-2.5 text-xs sm:text-[13px] text-neutral-700">
                        <div className="w-6 h-6 rounded-full bg-[#FDF2F4] border border-[#F9E6EA] text-[#800020] flex items-center justify-center shrink-0 mt-0.5">
                          <Factory className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="font-bold text-neutral-900">
                            {locale === "bn" ? "প্রস্তাবিত মেশিনারি : " : "Recommended Machines : "}
                          </span>
                          <span className="text-neutral-600">
                            {sector.recommendedMachines.join(", ")}
                          </span>
                        </div>
                      </div>

                      {/* Metric 2: Target Fabrics */}
                      <div className="flex items-start gap-2.5 text-xs sm:text-[13px] text-neutral-700">
                        <div className="w-6 h-6 rounded-full bg-[#FDF2F4] border border-[#F9E6EA] text-[#800020] flex items-center justify-center shrink-0 mt-0.5">
                          <Layers className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="font-bold text-neutral-900">
                            {locale === "bn" ? "টার্গেট ফ্যাব্রিক আউটপুট : " : "Target Fabric Output : "}
                          </span>
                          <span className="text-neutral-600">
                            {locale === "bn" ? sector.targetFabricsBn : sector.targetFabricsEn}
                          </span>
                        </div>
                      </div>

                      {/* Metric 3: Production Advantage */}
                      <div className="flex items-start gap-2.5 text-xs sm:text-[13px] text-neutral-700">
                        <div className="w-6 h-6 rounded-full bg-[#FDF2F4] border border-[#F9E6EA] text-[#800020] flex items-center justify-center shrink-0 mt-0.5">
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="font-bold text-neutral-900">
                            {locale === "bn" ? "ফ্যাক্টরি সুবিধা : " : "Key Advantage : "}
                          </span>
                          <span className="text-neutral-600">
                            {locale === "bn" ? sector.advantageBn : sector.advantageEn}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ================================================
                        ACTION ROW: "Explore Specs" + "Inquire"
                        ================================================ */}
                    <div className="pt-3.5 border-t border-neutral-100 flex items-center justify-between gap-3 flex-wrap">
                      <Link
                        href="/industries"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FDF2F4] hover:bg-[#800020] text-[#800020] hover:text-white border border-[#D8A4AF] text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shadow-2xs group/btn"
                      >
                        <span>
                          {locale === "bn" ? "এই খাতের বিস্তারিত ও ছবি দেখুন" : "Explore Industry Specs & Gallery"}
                        </span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                      </Link>

                      <Link
                        href="/quote"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-900 text-neutral-700 hover:text-white border border-neutral-200 text-xs font-mono font-bold transition-all duration-200 shadow-2xs group/inquire"
                      >
                        <span>{locale === "bn" ? "কোটেশন চান" : "Inquire"}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#800020] group-hover/inquire:text-white transition-colors" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Sector Hint (for sticky scroll affordance) */}
              {index < SECTORS_DATA.length - 1 && (
                <div className="mt-3 hidden sm:flex items-center justify-end gap-2 text-xs font-mono text-neutral-600 font-semibold">
                  <ChevronDown className="w-4 h-4 animate-bounce text-[#D8A4AF]" />
                  <span>
                    {locale === "bn"
                      ? `পরবর্তী: খাত ০${index + 2} • ${SECTORS_DATA[index + 1].titleBn}`
                      : `Next: Sector 0${index + 2} • ${SECTORS_DATA[index + 1].titleEn}`}
                  </span>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </article>
  );
}
