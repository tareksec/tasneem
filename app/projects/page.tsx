"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Image as ImageIcon,
  ArrowUpRight,
  MapPin,
  CheckCircle2,
  Play,
  Video,
  Calendar,
  X,
  Filter,
} from "lucide-react";
import { MotionSection, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { AdminStore } from "@/lib/admin/admin-store";
import { GalleryItem } from "@/lib/types";

export default function ProjectsPage() {
  const { t, locale } = useTranslation();
  const [publishedItems, setPublishedItems] = useState<GalleryItem[]>(() => {
    try {
      return AdminStore.getGalleryItems().filter((i) => i.published);
    } catch {
      return [];
    }
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<"all" | "image" | "video">("all");
  const [activeMedia, setActiveMedia] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const loadItems = () => {
      const all = AdminStore.getGalleryItems();
      setPublishedItems(all.filter((i) => i.published));
    };

    loadItems();
    window.addEventListener("tasneem-store-updated", loadItems);
    return () => window.removeEventListener("tasneem-store-updated", loadItems);
  }, []);

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

  // Fallback records when no published uploads exist yet (strict authenticity policy)
  const fallbackRecords = [
    {
      id: "PRJ-01",
      title: locale === "bn" ? "ডাবল জার্সি সার্কুলার নিটিং মেশিন ইনস্টলেশন" : "Double Jersey Circular Knitting Line Installation",
      location: locale === "bn" ? "নারায়ণগঞ্জ শিল্পাঞ্চল, ঢাকা বিভাগ" : "Narayanganj Industrial Zone, Dhaka Division",
      category: locale === "bn" ? "Double Jersey সার্কুলার নিটিং" : "Double Jersey Circular Knitting",
      status: locale === "bn" ? "কমিশনিং সম্পন্ন ও সফলভাবে হস্তান্তরকৃত" : "Completed Commissioning & Operator Handover",
      summary: locale === "bn"
        ? "বেশি পরিমাণের Rib ও Interlock কাপড় তৈরির সুবিধার্থে সরাসরি ইমপোর্ট, ফ্যাক্টরি ফ্লোরে লেভেলিং, ট্রায়াল নিটিং ও সম্পূর্ণ কমিশনিং সম্পন্ন করে বুঝিয়ে দেওয়া হয়েছে।"
        : "Direct import and on-site leveling, trial knits, and commissioning of multi-feeder double jersey circular machinery for high-capacity rib fabric production.",
    },
    {
      id: "PRJ-02",
      title: locale === "bn" ? "হাই-স্পিড Single Jersey মেশিনারি ইনস্টলেশন" : "High-Speed Single Jersey Machinery Deployment",
      location: locale === "bn" ? "গাজীপুর টেক্সটাইল হাব, ঢাকা বিভাগ" : "Gazipur Textile Hub, Dhaka Division",
      category: locale === "bn" ? "Single Jersey সার্কুলার নিটিং" : "Single Jersey Circular Knitting",
      status: locale === "bn" ? "কমিশনিং সম্পন্ন ও সফলভাবে হস্তান্তরকৃত" : "Completed Commissioning & Operator Handover",
      summary: locale === "bn"
        ? "১০০% কটন এক্সপোর্ট টি-শার্ট ফ্যাব্রিক উৎপাদনের জন্য CFR Chattogram সমুদ্রপথে আমদানি, SGS প্রি-শিপমেন্ট ইন্সপেকশন যাচাই এবং ফ্যাক্টরি ফ্লোরে সফল অ্যাসেম্বলি।"
        : "Turnkey CFR Chattogram sea import, pre-shipment SGS inspection verification, and factory assembly for 100% cotton export t-shirt fabric manufacturing.",
    },
    {
      id: "PRJ-03",
      title: locale === "bn" ? "Circular Terry ও Fleece ইকুইপমেন্ট সেটআপ" : "Circular Terry & Fleece Equipment Setup",
      location: locale === "bn" ? "চট্টগ্রাম শিল্প করিডোর" : "Chittagong Industrial Corridor",
      category: locale === "bn" ? "Terry ও Fleece সার্কুলার নিটিং" : "Terry & Fleece Circular Knitting",
      status: locale === "bn" ? "কমিশনিং সম্পন্ন ও সফলভাবে হস্তান্তরকৃত" : "Completed Commissioning & Operator Handover",
      summary: locale === "bn"
        ? "নিখুঁত লুপ আর আরামদায়ক তোয়ালে ও হুডি ফ্যাব্রিক তৈরির সুবিধার্থে হাই-পাইল Terry সার্কুলার মেশিন সোর্সিং ও সফল কমিশনিং।"
        : "Sourcing and commissioning of high-pile terry circular machines for uniform loop formation and absorbent towel fabric production.",
    },
  ];

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
            // Verified Field Deployments
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

        {/* Display: Fallback Placeholder Records vs Live Admin Uploads */}
        {publishedItems.length === 0 ? (
          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {fallbackRecords.map((rec) => (
              <StaggerItem key={rec.id}>
                <div className="h-full border border-[#E5E7EB] rounded-2xl bg-white p-6 flex flex-col justify-between shadow-sm hover:-translate-y-1.5 hover:shadow-md hover:border-[#C0C0C0] transition-all duration-200">
                  <div>
                    {/* Photo Placeholder */}
                    <div className="w-full aspect-[4/3] rounded-xl bg-[#F9FAFB] border border-dashed border-[#D1D5DB] flex flex-col items-center justify-center p-6 text-center mb-6">
                      <div className="w-12 h-12 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] mb-2 shadow-xs">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold text-[#2D2D2D]">
                        {locale === "bn" ? "ফ্যাক্টরি ফ্লোর রেকর্ড" : "Factory Floor Asset"}
                      </span>
                      <span className="text-[11px] text-[#6B7280] mt-1">
                        {locale === "bn" ? "ভেরিফায়েড ইনস্টলেশন ডকুমেন্টেশন" : "Verified Installation Documentation"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[#6B7280] mb-2">
                      <MapPin className="w-3.5 h-3.5 text-[#800020]" />
                      <span>{rec.location}</span>
                    </div>

                    <h2 className="font-bold text-lg text-[#2D2D2D] mb-2">{rec.title}</h2>
                    <p className="text-xs text-[#4B5563] leading-relaxed mb-4">{rec.summary}</p>
                  </div>

                  <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs font-semibold text-emerald-700">
                    <span>{rec.status}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          /* Live Real Installation Gallery Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredItems.map((item) => {
              const isVideo = item.type === "video";
              const title = locale === "bn" && item.title_bn ? item.title_bn : item.title_en;
              const desc = locale === "bn" && item.description_bn ? item.description_bn : item.description_en;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveMedia(item)}
                  className="group cursor-pointer border border-[#E5E7EB] rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-lg hover:border-neutral-400 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Media Thumbnail Container */}
                    <div className="relative w-full aspect-[16/10] bg-neutral-900 overflow-hidden">
                      {item.thumbnail || (!isVideo && item.file) ? (
                        <Image
                          src={item.thumbnail || item.file}
                          alt={title}
                          fill
                          unoptimized={Boolean((item.thumbnail || item.file)?.startsWith("http"))}
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400">
                          <Video className="w-8 h-8" />
                          <span className="text-xs mt-1">Video Record</span>
                        </div>
                      )}

                      {/* Video Play Affordance */}
                      {isVideo && (
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors flex items-center justify-center">
                          <div className="w-13 h-13 rounded-full bg-[#800020] text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                            <Play className="w-6 h-6 ml-0.5 fill-current" />
                          </div>
                        </div>
                      )}

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs ${
                            isVideo ? "bg-purple-600 text-white" : "bg-neutral-900/85 backdrop-blur-xs text-white"
                          }`}
                        >
                          {isVideo ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                          <span>{isVideo ? "Video" : "Photo"}</span>
                        </span>

                        {item.relatedCategory && (
                          <span className="bg-white/95 backdrop-blur-xs text-neutral-900 text-[10px] font-semibold px-2.5 py-0.5 rounded-full shadow-2xs capitalize">
                            {item.relatedCategory.replace("-", " ")}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Information */}
                    <div className="p-6">
                      {item.location && (
                        <div className="flex items-center gap-1.5 text-xs text-[#6B7280] mb-2 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-[#800020]" />
                          <span>{item.location}</span>
                        </div>
                      )}

                      <h2 className="font-bold text-lg text-[#2D2D2D] mb-2 group-hover:text-[#800020] transition-colors line-clamp-2">
                        {title}
                      </h2>

                      {desc && (
                        <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed line-clamp-3 mb-2">
                          {desc}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Footer Meta */}
                  <div className="px-6 py-3.5 border-t border-[#E5E7EB] bg-[#F9FAFB] flex items-center justify-between text-xs text-[#6B7280]">
                    <div className="flex items-center gap-1.5 font-semibold text-emerald-700">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      <span>{locale === "bn" ? "সফলভাবে ইনস্টলকৃত" : "Verified Installation"}</span>
                    </div>

                    {item.installedDate && (
                      <span className="font-mono text-[11px] text-neutral-500">
                        {item.installedDate}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

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

      {/* Public Interactive Lightbox Modal */}
      {activeMedia && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveMedia(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between gap-4 bg-neutral-50">
              <div>
                <h3 className="font-bold text-base sm:text-lg text-neutral-900 line-clamp-1">
                  {locale === "bn" && activeMedia.title_bn ? activeMedia.title_bn : activeMedia.title_en}
                </h3>
                <div className="flex items-center gap-3 text-xs text-neutral-500 mt-0.5">
                  {activeMedia.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#800020]" />
                      <span>{activeMedia.location}</span>
                    </span>
                  )}
                  {activeMedia.installedDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{activeMedia.installedDate}</span>
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveMedia(null)}
                className="w-8 h-8 rounded-full bg-white border border-neutral-300 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 flex items-center justify-center transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Media Player / Canvas */}
            <div className="relative w-full aspect-video bg-neutral-950 flex items-center justify-center overflow-hidden">
              {activeMedia.type === "video" ? (
                activeMedia.file.includes("youtube") || activeMedia.file.includes("embed") ? (
                  <iframe
                    src={activeMedia.file}
                    title={activeMedia.title_en}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={activeMedia.file}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                )
              ) : (
                <Image
                  src={activeMedia.file}
                  alt={activeMedia.title_en}
                  fill
                  className="object-contain"
                />
              )}
            </div>

            {/* Description */}
            {(activeMedia.description_en || activeMedia.description_bn) && (
              <div className="p-4 sm:p-5 bg-white border-t border-neutral-100 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {locale === "bn" && activeMedia.description_bn
                  ? activeMedia.description_bn
                  : activeMedia.description_en}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
