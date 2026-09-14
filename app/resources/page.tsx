"use client";

import Link from "next/link";
import { CheckCircle2, ArrowUpRight, Gauge, Wrench, ShieldCheck, Ship } from "lucide-react";
import { MotionSection, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function ResourcesPage() {
  const { t, locale } = useTranslation();

  const guides = [
    {
      title: locale === "bn"
        ? "Circular নিটিংয়ের Gauge (G) ও Cylinder সাইজ নির্বাচন গাইড"
        : "Circular Knitting Gauge (G) & Cylinder Diameter Selection Guide",
      icon: Gauge,
      category: locale === "bn" ? "টেকনিক্যাল সিলেকশন" : "Technical Sourcing",
      readTime: locale === "bn" ? "৫ মিনিট পড়ুন" : "5 min read",
      summary: locale === "bn"
        ? "কাঙ্ক্ষিত ফ্যাব্রিক GSM, সুতার কাউন্ট (Ne 20s থেকে 40s) আর ফিনিশড ডায়ামিটার অনুযায়ী কীভাবে সঠিক Gauge (18G–36G) ও Cylinder সাইজ (30\"–36\") বেছে নেবেন তার সহজ গাইড।"
        : "How to determine the ideal gauge (18G–36G) and cylinder diameter (30\"–36\") based on your target fabric GSM, yarn counts (Ne 20s to 40s), and desired finished open width.",
      points: locale === "bn"
        ? [
            "Cylinder ডায়ামিটার থেকে ফ্যাব্রিক উইডথ হিসাব করার সহজ নিয়ম",
            "ড্রপ স্টিচ এড়াতে সুতার কাউন্টের সাথে Needle Gauge মেলানোর উপায়",
            "Single Jersey ও Double Jersey কাপড়ে ডায়ামিটার এবং Shrinkage ক্যালকুলেশন",
          ]
        : [
            "Formula for calculating theoretical fabric width from cylinder diameter",
            "Matching yarn count to needle gauge to avoid drop stitches",
            "Single jersey vs double jersey shrinkage considerations",
          ],
    },
    {
      title: locale === "bn"
        ? "প্রি-শিপমেন্ট ইন্সপেকশন গাইড (SGS / Intertek / BV)"
        : "Pre-Shipment Inspection Protocol (SGS / ITS / BV)",
      icon: ShieldCheck,
      category: locale === "bn" ? "মান যাচাই" : "Quality Assurance",
      readTime: locale === "bn" ? "৪ মিনিট পড়ুন" : "4 min read",
      summary: locale === "bn"
        ? "বিদেশি ফ্যাক্টরি থেকে কনটেইনারে মেশিন তোলার আগে মেকানিক্যাল ও ইলেকট্রিক্যাল নিখুঁত চেকলিস্ট কীভাবে যাচাই করতে হয়, তার বিস্তারিত বিবরণ।"
        : "Comprehensive breakdown of the mechanical and electrical inspection checklist conducted at overseas factories prior to export container loading.",
      points: locale === "bn"
        ? [
            "Cylinder ও Dial runout লিমিট (<০.০২ মিমি) কীভাবে নিখুঁত রাখবেন",
            "Cam box হার্ডনেস ও Needle track-এর মসৃণতা যাচাই",
            "লোড পরিবর্তনের সময় মেইন মোটরের Inverter স্ট্যাবিলিটি টেস্ট",
          ]
        : [
            "Cylinder and dial concentricity runout limits (<0.02 mm)",
            "Cam box hardness testing and needle track smoothness",
            "Motor inverter stability under variable voltage simulation",
          ],
    },
    {
      title: locale === "bn"
        ? "২৪/৭ ফ্যাক্টরি চালানোর জন্য প্রিভেন্টিভ মেইনটেন্যান্স রুটিন"
        : "Preventive Maintenance Schedule for 24/7 Mill Operations",
      icon: Wrench,
      category: locale === "bn" ? "ফ্যাক্টরি মেইনটেন্যান্স" : "Factory Maintenance",
      readTime: locale === "bn" ? "৬ মিনিট পড়ুন" : "6 min read",
      summary: locale === "bn"
        ? "নিটিং ফ্লোরে সুঁই ভাঙা, সিঙ্কারের ক্ষয় এবং তেলের দাগজনিত ত্রুটি কমিয়ে উৎপাদন সচল রাখতে দৈনিক, সাপ্তাহিক ও মাসিক রক্ষণাবেক্ষণ পদ্ধতি।"
        : "Daily, weekly, and monthly maintenance regimens to minimize needle breakage, sinker wear, and oil stain defects in high-volume export factories.",
      points: locale === "bn"
        ? [
            "Needle Cylinder-এর লিন্ট ও ধুলা পরিষ্কারে নিয়মিত Air Blowout শিডিউল",
            "Water-washable নিটিং Needle Oil ব্যবহারের সঠিক নিয়ম",
            "Positive Feeder ও বেল্ট টেনশন নিয়মিত পরীক্ষা করার উপায়",
          ]
        : [
            "Air blowout and lint removal frequencies around the needle cylinder",
            "Selecting appropriate water-washable knitting needle oil",
            "Positive storage feeder belt tension inspection",
          ],
    },
    {
      title: locale === "bn"
        ? "CFR Chattogram ও বাংলাদেশ ব্যাংকের L/C প্রসিডিউর গাইড"
        : "CFR Chattogram & Bangladesh Bank L/C Procurement Guide",
      icon: Ship,
      category: locale === "bn" ? "কমার্শিয়াল ও L/C" : "Commercial & Logistics",
      readTime: locale === "bn" ? "৫ মিনিট পড়ুন" : "5 min read",
      summary: locale === "bn"
        ? "মেশিন আমদানিতে বাংলাদেশ ব্যাংকের নিয়ম মেনে সঠিক ব্যাংক L/C খোলা, পেমেন্ট টার্মস এবং কাস্টমস ক্লিয়ারেন্সের সহজ গাইডলাইন।"
        : "Step-by-step guidance for procurement officers on opening documentary commercial Letters of Credit (L/C) for textile machinery imports.",
      points: locale === "bn"
        ? [
            "সঠিক Proforma Invoice (PI) ক্লজ ও HS Code নিশ্চিত করার নিয়ম",
            "Bill of Lading ও স্পষ্ট Shipping Marks যাচাই",
            "চট্টগ্রাম বন্দরের কাস্টমস ক্লিয়ারেন্সের জন্য প্রয়োজনীয় কাগজপত্র",
          ]
        : [
            "Essential Proforma Invoice (PI) clauses and HS Code specifications",
            "Bill of lading requirements and clean shipping marks",
            "Customs clearance documentation checklist for Chattogram Port",
          ],
    },
  ];

  return (
    <div className="py-12 sm:py-20 bg-white text-[#2D2D2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <MotionSection className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E5E7EB] bg-[#F9FAFB] text-xs font-semibold text-[#4B5563] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#800020]"></span>
            <span>{locale === "bn" ? "টেকনিক্যাল রিসোর্স ও গাইড" : "Technical Resources & Knowledge"}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#2D2D2D]">
            {locale === "bn"
              ? "মিল মালিক ও প্রোডাকশন টিমের জন্য প্র্যাকটিক্যাল গাইড"
              : "Technical Guides for Mill Owners & Sourcing Teams"}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#4B5563] leading-relaxed">
            {locale === "bn"
              ? "সঠিক মেশিন বাছাই, প্রি-শিপমেন্ট চেকিং আর ফ্যাক্টরি মেইনটেন্যান্স নিয়ে আমাদের তৈরি কার্যকরী গাইডলাইন—যাতে আপনার মিলের প্রোডাকশন থাকে সবসময় নিরবচ্ছিন্ন।"
              : "Engineered insights, machinery selection formulas, pre-shipment inspection protocols, and maintenance best practices for Bangladesh's circular knitting industry."}
          </p>
        </MotionSection>

        {/* Guides Grid */}
        <StaggerContainer
          staggerDelay={0.08}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
        >
          {guides.map((guide) => (
            <StaggerItem key={guide.title}>
              <div className="h-full border border-[#E5E7EB] rounded-2xl bg-white p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:-translate-y-1.5 hover:shadow-md hover:border-[#C0C0C0] transition-all duration-200">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-center text-[#800020]">
                      <guide.icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2.5 py-0.5 rounded bg-[#F9FAFB] border border-[#E5E7EB] font-semibold text-[#2D2D2D]">
                        {guide.category}
                      </span>
                      <span className="text-[#6B7280]">{guide.readTime}</span>
                    </div>
                  </div>

                  <h2 className="font-bold text-xl text-[#2D2D2D] mb-3 leading-snug">
                    {guide.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed mb-6">
                    {guide.summary}
                  </p>

                  <div className="pt-4 border-t border-[#E5E7EB] flex flex-col gap-2">
                    <span className="text-[11px] uppercase tracking-wider text-[#6B7280] font-bold">
                      {locale === "bn" ? "এই গাইডে যা পাবেন:" : "Key Topics Covered:"}
                    </span>
                    {guide.points.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#4B5563]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#800020] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#E5E7EB]">
                  <Link
                    href="/quote"
                    className="text-xs font-bold text-[#800020] hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>{locale === "bn" ? "মেশিন স্পেসিফিকেশন নিয়ে কথা বলুন" : "Request Technical Specification Support"}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
