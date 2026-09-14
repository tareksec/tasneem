"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Camera,
  Image as ImageIcon,
  ArrowUpRight,
  Play,
  Video,
  MapPin,
  Calendar,
  X,
} from "lucide-react";
import { MotionSection } from "@/components/ui/MotionWrapper";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { AdminStore } from "@/lib/admin/admin-store";
import { GalleryItem } from "@/lib/types";

export function ProjectsGalleryPlaceholder() {
  const { dict, locale } = useTranslation();
  const [publishedItems, setPublishedItems] = useState<GalleryItem[]>([]);
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

  const placeholders = [
    {
      region: locale === "bn" ? "নারায়ণগঞ্জ টেক্সটাইল জোন" : "Narayanganj Industrial Zone",
      type: locale === "bn" ? "Double Jersey সার্কুলার নিটিং লাইন সেটআপ" : "Double Jersey Circular Knitting Line Installation",
      status: locale === "bn" ? "সরাসরি ফ্যাক্টরি ইনস্টলেশন সম্পন্ন" : "Verified Installation Record",
    },
    {
      region: locale === "bn" ? "গাজীপুর টেক্সটাইল জোন" : "Gazipur Textile Corridor",
      type: locale === "bn" ? "হাই-স্পিড Single Jersey মেশিন সেটআপ" : "High-Speed Single Jersey Machinery Deployment",
      status: locale === "bn" ? "সরাসরি ফ্যাক্টরি ইনস্টলেশন সম্পন্ন" : "Verified Installation Record",
    },
    {
      region: locale === "bn" ? "চট্টগ্রাম রপ্তানি অঞ্চল" : "Chattogram Export Zone",
      type: locale === "bn" ? "Terry ও Interlock মেশিন কমিশনিং" : "Terry & Interlock Machine Commissioning",
      status: locale === "bn" ? "সরাসরি ফ্যাক্টরি ইনস্টলেশন সম্পন্ন" : "Verified Installation Record",
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-white border-b border-[#E5E5E5] text-[#2D2D2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <MotionSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="sr-only">
              {locale === "bn" ? "বাস্তব কাজের প্রমাণ" : "Field Verification"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2D2D2D]">
              {locale === "bn" ? "সরাসরি ফ্যাক্টরি ইনস্টলেশন ও প্রজেক্ট গ্যালারি" : "Projects & Installation Gallery"}
            </h2>
            <p className="mt-2 text-sm text-[#4A4A4A] max-w-xl">
              {locale === "bn"
                ? "দেশের বিভিন্ন টেক্সটাইল ও গার্মেন্টস কারখানায় আমাদের সরবরাহ করা মেশিনের বাস্তব চিত্র। (ক্লায়েন্টের অনুমতি নিয়েই আমরা ছবি বা ভিডিও শেয়ার করি)।"
                : "Real factory installations across Bangladesh textile hubs. (Strict policy: only verified photographs and client-authorized data are published)."}
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2D2D2D] hover:text-[#800020] transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-md px-1"
          >
            <span>{locale === "bn" ? "সকল প্রজেক্ট দেখুন" : "View All Projects"}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </MotionSection>

        {/* Dynamic Display: If no published items, show strict authentic placeholders */}
        {publishedItems.length === 0 ? (
          <MotionSection delay={0.1} duration={0.4} yOffset={15} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {placeholders.map((item, index) => (
              <div
                key={index}
                className="border border-[#E5E7EB] rounded-xl bg-white p-5 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="w-full aspect-[4/3] rounded-lg bg-[#F9FAFB] border border-dashed border-[#E5E7EB] flex flex-col items-center justify-center p-6 text-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#4B5563] mb-2 shadow-xs">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-[#2D2D2D]">
                      {locale === "bn" ? "ফ্যাক্টরি ইনস্টলেশন রেকর্ড" : "Client Installation Photo"}
                    </span>
                    <span className="text-[11px] text-[#6B7280] mt-1">
                      {locale === "bn" ? "[ক্লায়েন্ট অনুমোদনের অপেক্ষায়]" : "[Awaiting Owner Photographic Assets]"}
                    </span>
                  </div>

                  <span className="text-[11px] uppercase tracking-wider text-[#6B7280] font-semibold block mb-1">
                    {item.region}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-[#2D2D2D]">
                    {item.type}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#6B7280]">
                  <span>{item.status}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
              </div>
            ))}
          </MotionSection>
        ) : (
          /* Real Admin-Managed Installations Grid */
          <MotionSection delay={0.1} duration={0.4} yOffset={15} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {publishedItems.slice(0, 6).map((item) => {
              const isVideo = item.type === "video";
              const title = locale === "bn" && item.title_bn ? item.title_bn : item.title_en;
              const desc = locale === "bn" && item.description_bn ? item.description_bn : item.description_en;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveMedia(item)}
                  className="group cursor-pointer border border-[#E5E7EB] rounded-2xl bg-white overflow-hidden shadow-xs hover:shadow-md hover:border-neutral-400 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    {/* Media Thumbnail Container */}
                    <div className="relative w-full aspect-[4/3] bg-neutral-900 overflow-hidden">
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
                          <span className="text-xs mt-1">Video Stream</span>
                        </div>
                      )}

                      {/* Video Play Affordance */}
                      {isVideo && (
                        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-[#800020] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 ml-0.5 fill-current" />
                          </div>
                        </div>
                      )}

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs ${
                            isVideo ? "bg-purple-600 text-white" : "bg-neutral-900/80 backdrop-blur-xs text-white"
                          }`}
                        >
                          {isVideo ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                          <span>{isVideo ? "Video" : "Photo"}</span>
                        </span>

                        {item.relatedCategory && (
                          <span className="bg-white/95 backdrop-blur-xs text-neutral-900 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-2xs capitalize">
                            {item.relatedCategory.replace("-", " ")}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Information */}
                    <div className="p-5">
                      {item.location && (
                        <div className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#800020]" />
                          <span>{item.location}</span>
                        </div>
                      )}

                      <h3 className="font-bold text-base text-[#2D2D2D] line-clamp-1 group-hover:text-[#800020] transition-colors">
                        {title}
                      </h3>

                      {desc && (
                        <p className="text-xs text-[#4B5563] mt-2 line-clamp-2 leading-relaxed">
                          {desc}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="px-5 py-3 border-t border-[#E5E7EB] bg-[#F9FAFB] flex items-center justify-between text-xs text-[#6B7280]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="font-medium text-neutral-700">
                        {locale === "bn" ? "যাচাইকৃত ফ্যাক্টরি ইনস্টলেশন" : "Verified Field Deployment"}
                      </span>
                    </div>

                    {item.installedDate && (
                      <span className="text-[11px] text-neutral-400 font-mono">
                        {item.installedDate}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </MotionSection>
        )}
      </div>

      {/* Public Interactive Lightbox Modal */}
      {activeMedia && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveMedia(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
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
                aria-label="Close modal"
                className="w-8 h-8 rounded-full bg-white border border-neutral-300 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 flex items-center justify-center transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Media Stage */}
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

            {/* Modal Description Footer */}
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
    </section>
  );
}
