"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Image as ImageIcon,
  ArrowUpRight,
  CheckCircle2,
  Video,
} from "lucide-react";
import { MotionSection } from "@/components/ui/MotionWrapper";
import { useTranslation } from "@/lib/i18n/LanguageContext";

import { usePublishedProjects } from "@/components/projects/usePublishedProjects";
import { ProjectGalleryGrid } from "@/components/projects/ProjectGalleryGrid";

export default function ProjectsPage() {
  const { t, locale } = useTranslation();
  const { items: publishedItems, loaded } = usePublishedProjects();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<"all" | "image" | "video">("all");

  // Filter items
  const filteredItems = useMemo(() => {
    return publishedItems.filter((item) => {
      const matchesType = selectedType === "all" || item.type === selectedType;
      const matchesCat =
        selectedCategory === "all" ||
        item.relatedCategory === selectedCategory ||
        (selectedCategory === "circular-knitting" &&
          ["double-jersey", "single-jersey", "interlock", "jacquard", "terry"].includes(
            item.relatedCategory || ""
          ));
      return matchesType && matchesCat;
    });
  }, [publishedItems, selectedType, selectedCategory]);


  return (
    <div className="py-12 sm:py-20 bg-white text-[#2D2D2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <MotionSection className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E5E7EB] bg-[#F9FAFB] text-xs font-semibold text-[#4B5563] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#800020]"></span>
            <span>{locale === "bn" ? "ফ্যাক্টরি ইনস্টলেশন ও প্রজেক্ট রেকর্ড" : "Field Installations"}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#2D2D2D]">
            {locale === "bn" ? "আমাদের ফিল্ড ইনস্টলেশন ও রিয়েল প্রজেক্ট রেকর্ড" : "Factory Installations & Project Records"}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#4B5563] leading-relaxed">
            {locale === "bn"
              ? "দেশের শীর্ষস্থানীয় টেক্সটাইল হাবগুলোতে নিখুঁত অ্যাসেম্বলি, লেভেলিং ও ট্রায়াল নিটিং শেষ করে তবেই মিল কর্তৃপক্ষের কাছে মেশিন হস্তান্তর করে তাসনীম নিট ইন্ডাস্ট্রি।"
              : "Tasneem Knit Industry oversees the physical assembly, calibration, and operational handover of machinery across major industrial textile zones in Bangladesh."}
          </p>
        </MotionSection>

        {/* Authenticity Guarantee Banner */}
        <MotionSection delay={0.06} className="mb-10 p-4 sm:p-5 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#4B5563] shadow-xs">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              <strong className="text-[#2D2D2D]">
                {locale === "bn" ? "১০০% স্বচ্ছতার নিশ্চয়তা:" : "Authenticity Guarantee:"}
              </strong>{" "}
              {locale === "bn"
                ? "আমাদের নীতি অনুযায়ী, আমরা মিল মালিকদের অনুমতিসাপেক্ষে কেবল সরাসরি ফ্যাক্টরির বাস্তব ছবি ও যাচাইকৃত ইনস্টলেশন তথ্যই এখানে তুলে ধরি।"
                : "Per company transparency policy, we publish only client-authorized photographic assets and verified installation data."}
            </span>
          </div>
          <span className="text-[11px] text-[#6B7280] font-mono shrink-0 bg-white border border-[#E5E7EB] px-2.5 py-1 rounded">
            Verified Field Deployments
          </span>
        </MotionSection>

        {/* Filter Toolbar (Rendered if published items exist) */}
        {publishedItems.length > 0 && (
          <div className="mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
            {/* Category Chips */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "all", label: locale === "bn" ? "সব মেশিনারি" : "All Machinery" },
                { id: "circular-knitting", label: locale === "bn" ? "Circular নিটিং" : "Circular Knitting" },
                { id: "dyeing", label: locale === "bn" ? "Dyeing মেশিন" : "Dyeing" },
                { id: "shearing", label: locale === "bn" ? "Shearing মেশিন" : "Shearing" },
                { id: "finishing", label: locale === "bn" ? "Finishing ও Stenter" : "Finishing" },
                { id: "other", label: locale === "bn" ? "অন্যান্য অ্যাক্সেসরিজ" : "Other Machinery" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? "bg-[#2D2D2D] text-white shadow-xs"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Media Type Filter */}
            <div className="flex items-center gap-1.5 bg-neutral-100 p-1 rounded-xl text-xs font-semibold shrink-0">
              <button
                onClick={() => setSelectedType("all")}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  selectedType === "all" ? "bg-white text-neutral-900 shadow-2xs" : "text-neutral-500"
                }`}
              >
                {locale === "bn" ? "সব মিডিয়া" : "All Media"}
              </button>
              <button
                onClick={() => setSelectedType("image")}
                className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
                  selectedType === "image" ? "bg-white text-neutral-900 shadow-2xs" : "text-neutral-500"
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>{locale === "bn" ? "ছবি" : "Photos"}</span>
              </button>
              <button
                onClick={() => setSelectedType("video")}
                className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
                  selectedType === "video" ? "bg-white text-neutral-900 shadow-2xs" : "text-neutral-500"
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>{locale === "bn" ? "ভিডিও" : "Videos"}</span>
              </button>
            </div>
          </div>
        )}

        <div className="mb-20">
          {!loaded ? (
            <p role="status" className="py-16 text-center text-neutral-500">
              {locale === "bn" ? "প্রজেক্ট লোড হচ্ছে…" : "Loading projects…"}
            </p>
          ) : filteredItems.length > 0 ? (
            <ProjectGalleryGrid items={filteredItems} />
          ) : (
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-6 py-16 text-center">
              <p className="text-sm text-neutral-600">
                {publishedItems.length === 0
                  ? locale === "bn" ? "এখনো কোনো প্রজেক্ট প্রকাশিত হয়নি।" : "No projects have been published yet."
                  : locale === "bn" ? "এই ফিল্টারে কোনো প্রজেক্ট পাওয়া যায়নি।" : "No projects match these filters."}
              </p>
              {publishedItems.length > 0 && (
                <button type="button"
                  onClick={() => { setSelectedCategory("all"); setSelectedType("all"); }}
                  className="mt-4 rounded-md px-4 py-2 text-sm font-semibold text-[#800020] hover:bg-white focus-visible:outline-2 focus-visible:outline-[#800020]">
                  {locale === "bn" ? "সব প্রজেক্ট দেখুন" : "Show all projects"}
                </button>
              )}
            </div>
          )}
        </div>

        {/* CTA Banner */}
        <MotionSection
          delay={0.1}
          className="border border-[#E5E7EB] rounded-2xl bg-[#F9FAFB] p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm"
        >
          <div>
            <h2 className="text-2xl font-bold text-[#2D2D2D]">
              {locale === "bn" ? "নতুন মেশিন বসানোর কথা ভাবছেন?" : "Plan Your Next Machinery Installation"}
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5563] mt-1 max-w-xl">
              {locale === "bn"
                ? "ফ্যাক্টরি ফ্লোর সাইজ, বিদ্যুৎ সংযোগ, কিংবা ফাউন্ডেশন ও লেভেলিং সংক্রান্ত যেকোনো টেকনিক্যাল পরামর্শের জন্য আমাদের অভিজ্ঞ টিমের সাথে আজই যোগাযোগ করুন।"
                : "Discuss factory floor space, electric power loads, and foundation leveling requirements with our technical team."}
            </p>
          </div>
          <Link
            href="/quote"
            className="bg-[#800020] hover:bg-[#5A0017] text-white px-8 py-3 rounded-lg text-sm font-bold transition-colors shrink-0 flex items-center gap-2"
          >
            <span>{t.common.requestQuote}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </MotionSection>
      </div>

    </div>
  );
}
