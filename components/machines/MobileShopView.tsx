"use client";

import { useState, useMemo, useEffect } from "react";
import { useLenis } from "lenis/react";
import Image from "next/image";
import Link from "next/link";
import {
  Grid2X2,
  Search,
  Heart,
  ChevronLeft,
  X,
  Star,
  ShoppingBag,
  Home,
  FileText,
  Phone,
  RotateCcw,
  Copy,
  Activity,
  Droplets,
  Scissors,
  Sparkles,
  Layers,
  ArrowRight,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";
import { Machine } from "@/lib/types";

interface MobileShopViewProps {
  machines: Machine[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  locale: string;
}

interface CategoryPill {
  slug: string;
  name: string;
  name_bn: string;
  icon: LucideIcon;
}

const CATEGORY_PILLS: CategoryPill[] = [
  { slug: "all", name: "All", name_bn: "সব", icon: Layers },
  { slug: "circular-knitting", name: "Circular", name_bn: "সার্কুলার", icon: RotateCcw },
  { slug: "double-jersey", name: "Double Jersey", name_bn: "ডাবল জার্সি", icon: Copy },
  { slug: "single-jersey", name: "Single Jersey", name_bn: "সিঙ্গেল জার্সি", icon: Activity },
  { slug: "interlock", name: "Interlock", name_bn: "ইন্টারলক", icon: Grid2X2 },
  { slug: "dyeing", name: "Dyeing", name_bn: "ডাইং", icon: Droplets },
  { slug: "shearing", name: "Shearing", name_bn: "শিয়ারিং", icon: Scissors },
  { slug: "finishing", name: "Finishing", name_bn: "ফিনিশিং", icon: Sparkles },
];

export function MobileShopView({
  machines,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  locale,
}: MobileShopViewProps) {
  // UI states
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [detailsMachine, setDetailsMachine] = useState<Machine | null>(null);

  // Details modal states
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [selectedGauge, setSelectedGauge] = useState<string>("24G");
  const [activeDetailsTab, setActiveDetailsTab] = useState<"description" | "specifications">("description");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const lenis = useLenis();

  // Prevent background scroll and pause Lenis virtual scroll while modal or drawer is open
  useEffect(() => {
    if (detailsMachine || isCategoryDrawerOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [detailsMachine, isCategoryDrawerOpen, lenis]);

  // Hero carousel banners
  const HERO_SLIDES = [
    {
      badge: "Direct Factory OEM Import",
      title: "Genuine Circular Knitting Machinery",
      subtitle: "Turnkey Bangladesh Factory Commissioning • CFR Chattogram",
      buttonText: "Request Quote",
      image: "/images/machines/cat-circular-knitting.webp",
      href: "/quote",
    },
    {
      badge: "Eco-Dyeing Technology",
      title: "High-Temperature Dyeing Vessels",
      subtitle: "Low Liquor Ratio • Stainless Steel Metallurgy",
      buttonText: "Explore Dyeing",
      image: "/images/machines/cat-dyeing.webp",
      href: "/machines/dyeing",
    },
    {
      badge: "Surface Finishing",
      title: "Rotary Pile Shearing Machines",
      subtitle: "Uniform Pile Finishing for Fleece & French Terry",
      buttonText: "View Shearing",
      image: "/images/machines/cat-shearing.webp",
      href: "/machines/shearing",
    },
  ];

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openDetails = (machine: Machine) => {
    setDetailsMachine(machine);
    setSelectedPhotoIndex(0);
    setSelectedGauge(machine.gauge ? machine.gauge.split("–")[0].trim() : "24G");
    setActiveDetailsTab("description");
    setIsDescriptionExpanded(false);
  };

  const closeDetails = () => {
    setDetailsMachine(null);
  };

  // Standard gauge choices for circular knitting
  const availableGauges = useMemo(() => {
    if (!detailsMachine) return ["20G", "24G", "28G", "30G", "32G"];
    if (detailsMachine.gauge && detailsMachine.gauge.includes("–")) {
      const parts = detailsMachine.gauge.split("–").map((p) => p.trim());
      return [parts[0], "24G", "28G", "30G", parts[1] || "34G"];
    }
    return ["18G", "24G", "28G", "30G", "32G"];
  }, [detailsMachine]);

  return (
    <div className="md:hidden bg-[#FAFAFA] min-h-screen pb-28 text-neutral-900 font-sans">
      {/* 1. Search and filter bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsCategoryDrawerOpen(true)}
            aria-label="Open categories menu"
            className="w-10 h-10 rounded-xl border border-neutral-200 bg-white flex items-center justify-center text-neutral-800 shadow-2xs active:scale-95 transition-transform shrink-0"
          >
            <Grid2X2 className="w-5 h-5 text-neutral-800" />
          </button>

          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={
                locale === "bn"
                  ? "মেশিন, ব্র্যান্ড, বা গেজ অনুসন্ধান করুন..."
                  : "Search machines, brands, gauge..."
              }
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020]"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsCategoryDrawerOpen(true)}
            aria-label="Filter machinery"
            className="w-10 h-10 rounded-xl border border-[#D8A4AF] bg-white text-[#800020] flex items-center justify-center shadow-2xs active:scale-95 transition-transform shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. Hero Promotional Banner Carousel */}
      <section className="hidden px-4 pt-4">
        <div className="relative rounded-3xl bg-[#18181b] text-white p-5 overflow-hidden shadow-lg border border-neutral-800">
          {/* Subtle background glow */}
          <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#800020]/30 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between gap-4">
            <div className="flex-1 space-y-1.5">
              <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-[#D8A4AF]">
                {HERO_SLIDES[activeHeroSlide].badge}
              </span>
              <h2 className="text-sm font-extrabold leading-tight line-clamp-2 text-white">
                {HERO_SLIDES[activeHeroSlide].title}
              </h2>
              <p className="text-[11px] text-neutral-400 line-clamp-1">
                {HERO_SLIDES[activeHeroSlide].subtitle}
              </p>
              <div className="pt-2">
                <Link
                  href={HERO_SLIDES[activeHeroSlide].href}
                  className="inline-flex items-center gap-1 bg-[#800020] hover:bg-[#5A0017] text-white text-[11px] font-bold px-3.5 py-1.5 rounded-full shadow-xs active:scale-95 transition-all"
                >
                  <span>{HERO_SLIDES[activeHeroSlide].buttonText}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Cutout machine image */}
            <div className="relative w-28 h-24 shrink-0">
              <Image
                src={HERO_SLIDES[activeHeroSlide].image}
                alt="Featured Machinery"
                fill
                className="object-contain drop-shadow-xl"
              />
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 mt-4 pt-1">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveHeroSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  activeHeroSlide === idx
                    ? "w-5 bg-[#800020]"
                    : "w-1.5 bg-neutral-600 hover:bg-neutral-500"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Categories Section */}
      <section className="pt-6">
        <div className="px-4 flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-neutral-900">
            {locale === "bn" ? "ক্যাটাগরি" : "Categories"}
          </h2>
          <button
            type="button"
            onClick={() => setIsCategoryDrawerOpen(true)}
            className="text-xs font-semibold text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            {locale === "bn" ? "সব দেখুন" : "View all"}
          </button>
        </div>

        {/* Horizontal Scrolling Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto px-4 pb-2 scrollbar-none">
          {CATEGORY_PILLS.map((pill) => {
            const isSelected = selectedCategory === pill.slug;
            const IconComponent = pill.icon;

            return (
              <button
                key={pill.slug}
                type="button"
                onClick={() => onSelectCategory(pill.slug)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 active:scale-95 ${
                  isSelected
                    ? "bg-[#800020] text-white shadow-sm font-extrabold"
                    : "bg-white text-neutral-700 border border-neutral-200/80 hover:border-neutral-300 shadow-2xs"
                }`}
              >
                <IconComponent className={`w-4 h-4 ${isSelected ? "text-white" : "text-neutral-500"}`} />
                <span>{locale === "bn" ? pill.name_bn : pill.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Two-Column Product Grid */}
      <section className="px-4 pt-4">
        <div className="flex items-center justify-between mb-3 text-xs text-neutral-500 font-medium">
          <span>
            {locale === "bn" ? "পণ্য সংখ্যা:" : "Machinery:"}{" "}
            <strong className="text-neutral-900">{machines.length}</strong>
          </span>
          {selectedCategory !== "all" && (
            <button
              type="button"
              onClick={() => onSelectCategory("all")}
              className="text-[#800020] font-semibold hover:underline flex items-center gap-1"
            >
              <span>{locale === "bn" ? "রিসেট করুন" : "Clear filter"}</span>
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {machines.length > 0 ? (
          <div className="grid grid-cols-2 gap-3.5">
            {machines.map((machine) => {
              const isFav = !!favorites[machine.id];
              const photo = machine.images?.[0] || `/images/machines/cat-${machine.category}.webp`;

              return (
                <div
                  key={machine.id}
                  onClick={() => openDetails(machine)}
                  className="bg-white rounded-3xl p-3 border border-neutral-100 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer relative group active:scale-[0.98]"
                >
                  {/* Floating Heart / Wishlist Button */}
                  <button
                    type="button"
                    onClick={(e) => toggleFavorite(machine.id, e)}
                    aria-label="Add to shortlist"
                    className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs border border-neutral-200/60 shadow-2xs flex items-center justify-center active:scale-90 transition-transform"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-colors ${
                        isFav ? "fill-rose-500 text-rose-500" : "text-neutral-400"
                      }`}
                    />
                  </button>

                  {/* Centered Floating Product Image */}
                  <div className="relative w-full aspect-square bg-[#F8F9FA] rounded-2xl overflow-hidden flex items-center justify-center p-2 mb-2">
                    <Image
                      src={photo}
                      alt={locale === "bn" && machine.name_bn ? machine.name_bn : machine.name}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Title & Brand */}
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider truncate">
                      {machine.brand || "Industrial Partner"}
                    </p>
                    <h3 className="text-xs font-bold text-neutral-900 line-clamp-1 leading-snug">
                      {locale === "bn" && machine.name_bn ? machine.name_bn : machine.name}
                    </h3>
                  </div>

                  {/* Bottom Row: Price / CFR Quote & Rating */}
                  <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-[#800020] text-[11px] tracking-tight">
                      {machine.price ? `$${machine.price.toLocaleString()}` : "CFR Quote"}
                    </span>

                    <div className="flex items-center gap-1 text-[11px] font-bold text-neutral-700">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>4.9</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center border-2 border-dashed border-neutral-200 rounded-3xl bg-white p-6">
            <SlidersHorizontal className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-neutral-700">
              {locale === "bn" ? "কোন যন্ত্রপাতি পাওয়া যায়নি" : "No machinery found matching your filter."}
            </p>
            <button
              type="button"
              onClick={() => {
                onSelectCategory("all");
                onSearchChange("");
              }}
              className="mt-3 text-xs text-[#800020] font-bold underline"
            >
              {locale === "bn" ? "সব ফিল্টার মুছুন" : "Reset all filters"}
            </button>
          </div>
        )}
      </section>

      {/* 5. Mobile Product Details View (Full View as seen in reference design top-right) */}
      {detailsMachine && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-50 bg-white flex flex-col overflow-hidden"
        >
          {/* Top Bar: Back Button, "Details", Heart Icon */}
          <header className="shrink-0 z-20 bg-white/95 backdrop-blur-md border-b border-neutral-100 px-4 py-3 flex items-center justify-between">
            <button
              type="button"
              onClick={closeDetails}
              aria-label="Back to catalog"
              className="w-10 h-10 rounded-2xl border border-neutral-200 bg-white flex items-center justify-center text-neutral-800 shadow-2xs active:scale-95 transition-transform"
            >
              <ChevronLeft className="w-5 h-5 text-neutral-800" />
            </button>

            <h2 className="text-base font-bold text-neutral-900">
              {locale === "bn" ? "বিবরণ" : "Details"}
            </h2>

            <button
              type="button"
              onClick={(e) => toggleFavorite(detailsMachine.id, e)}
              aria-label="Toggle favorite"
              className="w-10 h-10 rounded-2xl border border-neutral-200 bg-white flex items-center justify-center shadow-2xs active:scale-95 transition-transform"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  favorites[detailsMachine.id] ? "fill-rose-500 text-rose-500" : "text-neutral-400"
                }`}
              />
            </button>
          </header>

          {/* Scrollable Content Container */}
          <div
            data-lenis-prevent
            className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-5 pb-8"
            style={{
              WebkitOverflowScrolling: "touch",
              touchAction: "pan-y",
            }}
          >
            {/* Hero Product Photo with Subtle Float Effect */}
            <div className="relative w-full aspect-[4/3] bg-[#F8F9FA] rounded-3xl overflow-hidden flex items-center justify-center p-4 border border-neutral-100">
              <Image
                src={
                  detailsMachine.images?.[selectedPhotoIndex] ||
                  `/images/machines/cat-${detailsMachine.category}.webp`
                }
                alt={detailsMachine.name}
                fill
                className="object-contain p-4"
              />
            </div>

            {/* Photo Pagination Dots */}
            {detailsMachine.images && detailsMachine.images.length > 1 && (
              <div className="flex items-center justify-center gap-1.5 pt-1">
                {detailsMachine.images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      selectedPhotoIndex === idx ? "w-5 bg-[#800020]" : "w-1.5 bg-neutral-300"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Small Thumbnails Row */}
            {detailsMachine.images && detailsMachine.images.length > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none touch-pan-x" data-lenis-prevent>
                {detailsMachine.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className={`relative w-14 h-14 rounded-2xl border-2 overflow-hidden bg-[#F8F9FA] shrink-0 transition-all ${
                      selectedPhotoIndex === idx
                        ? "border-[#800020] scale-105 shadow-xs"
                        : "border-neutral-200 opacity-70"
                    }`}
                  >
                    <Image src={img} alt="Thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Gauge / Size Selector */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                  {locale === "bn" ? "গেজ / সাইজ নির্বাচন" : "Gauge / Size"}
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-neutral-800">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.9</span>
                </div>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none touch-pan-x" data-lenis-prevent>
                {availableGauges.map((gauge) => {
                  const isSelected = selectedGauge === gauge;
                  return (
                    <button
                      key={gauge}
                      type="button"
                      onClick={() => setSelectedGauge(gauge)}
                      className={`w-12 h-11 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center justify-center active:scale-95 ${
                        isSelected
                          ? "bg-[#800020] text-white shadow-xs font-extrabold"
                          : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                      }`}
                    >
                      {gauge}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Title & Sourcing Info */}
            <div className="space-y-1 pt-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base sm:text-lg font-extrabold text-neutral-900 leading-snug">
                  {locale === "bn" && detailsMachine.name_bn
                    ? detailsMachine.name_bn
                    : detailsMachine.name}
                </h3>
                <span className="text-sm font-black text-[#800020] shrink-0">
                  {detailsMachine.price
                    ? `$${detailsMachine.price.toLocaleString()}`
                    : "CFR Quote"}
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                {detailsMachine.brand} • {detailsMachine.origin || "OEM Imported"} •{" "}
                {detailsMachine.availability === "in-stock" ? "Ready Stock" : "L/C Made to Order"}
              </p>
            </div>

            {/* Segmented Control Tabs: Description vs Specifications */}
            <div className="pt-2">
              <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-100 rounded-2xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveDetailsTab("description")}
                  className={`py-2 rounded-xl transition-all ${
                    activeDetailsTab === "description"
                      ? "bg-[#800020] text-white shadow-2xs font-extrabold"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {locale === "bn" ? "বিবরণ" : "Description"}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDetailsTab("specifications")}
                  className={`py-2 rounded-xl transition-all ${
                    activeDetailsTab === "specifications"
                      ? "bg-[#800020] text-white shadow-2xs font-extrabold"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {locale === "bn" ? "টেকনিক্যাল স্পেক্স" : "Specifications"}
                </button>
              </div>

              {/* Tab Content */}
              <div className="mt-3 text-xs text-neutral-600 leading-relaxed">
                {activeDetailsTab === "description" ? (
                  <div className="space-y-2">
                    <p className={isDescriptionExpanded ? "" : "line-clamp-3"}>
                      {detailsMachine.description ||
                        "Engineered for high-volume export knitwear production across Bangladesh mills. Features precision cam tracks, dual-inverter speed control, and CFR Chattogram sea shipment with factory installation."}
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsDescriptionExpanded((prev) => !prev)}
                      className="text-[#800020] font-bold hover:underline inline-block"
                    >
                      {isDescriptionExpanded
                        ? locale === "bn"
                          ? "সংক্ষিপ্ত করুন"
                          : "Show Less"
                        : locale === "bn"
                        ? "আরও পড়ুন..."
                        : "Read More..."}
                    </button>
                  </div>
                ) : (
                  <div className="bg-neutral-50 rounded-2xl p-3.5 space-y-2 border border-neutral-200">
                    <div className="flex justify-between py-1 border-b border-neutral-200/60">
                      <span className="text-neutral-500">Selected Gauge:</span>
                      <span className="font-bold text-neutral-900">{selectedGauge}</span>
                    </div>
                    {detailsMachine.cylinderDiameter && (
                      <div className="flex justify-between py-1 border-b border-neutral-200/60">
                        <span className="text-neutral-500">Cylinder Diameter:</span>
                        <span className="font-bold text-neutral-900">{detailsMachine.cylinderDiameter}</span>
                      </div>
                    )}
                    {detailsMachine.feeders && (
                      <div className="flex justify-between py-1 border-b border-neutral-200/60">
                        <span className="text-neutral-500">Feeders:</span>
                        <span className="font-bold text-neutral-900">{detailsMachine.feeders}</span>
                      </div>
                    )}
                    {detailsMachine.machineSpeed && (
                      <div className="flex justify-between py-1 border-b border-neutral-200/60">
                        <span className="text-neutral-500">Speed (RPM):</span>
                        <span className="font-bold text-neutral-900">{detailsMachine.machineSpeed}</span>
                      </div>
                    )}
                    {detailsMachine.powerRequirement && (
                      <div className="flex justify-between py-1">
                        <span className="text-neutral-500">Motor Power:</span>
                        <span className="font-bold text-neutral-900">{detailsMachine.powerRequirement}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Direct Link to Dedicated Full Machine Page */}
            <div className="pt-2">
              <Link
                href={`/machines/${detailsMachine.category}/${detailsMachine.id}`}
                className="w-full py-3 px-4 rounded-2xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 text-xs font-semibold flex items-center justify-between transition-colors shadow-2xs active:scale-[0.99]"
              >
                <span>{locale === "bn" ? "সম্পূর্ণ টেকনিক্যাল স্পেসিফিকেশন ও শিপিং তথ্য দেখুন" : "View Complete Technical Specs & Shipping Info"}</span>
                <ArrowRight className="w-4 h-4 text-[#800020] shrink-0" />
              </Link>
            </div>
          </div>

          {/* Pinned Bottom Action Bar: Always sits at bottom of modal without overlapping content */}
          <footer className="shrink-0 z-20 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-4 py-3 flex items-center gap-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <Link
              href={`/quote?machine=${detailsMachine.id}&gauge=${selectedGauge}`}
              className="w-12 h-12 rounded-2xl border border-neutral-200 bg-neutral-100 flex items-center justify-center text-neutral-800 shrink-0 shadow-2xs active:scale-95 transition-transform"
              title="Add to Quote List"
            >
              <FileText className="w-5 h-5 text-neutral-800" />
            </Link>

            <Link
              href={`/quote?machine=${detailsMachine.id}&gauge=${selectedGauge}`}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-[#800020] hover:bg-[#5A0017] text-white text-xs font-bold text-center shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <span>{locale === "bn" ? "অফিসিয়াল কোটেশন চান" : "Request Official Quote"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </footer>
        </div>
      )}

      {/* 6. Category Selection Drawer Modal */}
      {isCategoryDrawerOpen && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end animate-in fade-in duration-200"
          onClick={() => setIsCategoryDrawerOpen(false)}
        >
          <div
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto overscroll-contain p-5 space-y-4 animate-in slide-in-from-bottom-8 duration-300"
            style={{
              WebkitOverflowScrolling: "touch",
              touchAction: "pan-y",
            }}
          >
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="text-base font-bold text-neutral-900">
                {locale === "bn" ? "মেশিনারি ক্যাটাগরি" : "All Machinery Categories"}
              </h3>
              <button
                type="button"
                onClick={() => setIsCategoryDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              {CATEGORY_PILLS.map((pill) => {
                const isSelected = selectedCategory === pill.slug;
                const IconComponent = pill.icon;
                return (
                  <button
                    key={pill.slug}
                    type="button"
                    onClick={() => {
                      onSelectCategory(pill.slug);
                      setIsCategoryDrawerOpen(false);
                    }}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                      isSelected
                        ? "bg-[#800020] text-white border-[#800020] font-bold shadow-xs"
                        : "bg-neutral-50 hover:bg-neutral-100 text-neutral-800 border-neutral-200"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? "bg-white/20 text-white" : "bg-white text-[#800020]"
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold leading-tight">
                      {locale === "bn" ? pill.name_bn : pill.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 7. Floating Mobile Bottom Navigation Bar (as in reference screenshot) */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-3 left-4 right-4 z-40 max-w-sm mx-auto bg-white/95 text-neutral-500 rounded-2xl py-2.5 px-5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-between border border-neutral-200/90 backdrop-blur-md"
      >
        <Link
          href="/"
          className="flex flex-col items-center gap-0.5 text-neutral-500 hover:text-[#800020] transition-colors"
          title="Home"
        >
          <Home className="w-4 h-4" />
          <span className="text-[9px] font-semibold">Home</span>
        </Link>

        <Link
          href="/machines"
          className="flex flex-col items-center gap-0.5 text-[#800020] font-bold relative transition-colors"
          title="Explore"
        >
          <ShoppingBag className="w-4 h-4 text-[#800020]" />
          <span className="text-[9px] font-bold text-[#800020]">Explore</span>
          <span className="w-1 h-1 rounded-full bg-[#800020] absolute -bottom-1" />
        </Link>

        <Link
          href="/quote"
          className="flex flex-col items-center gap-0.5 text-neutral-500 hover:text-[#800020] transition-colors relative"
          title="Quote"
        >
          <FileText className="w-4 h-4" />
          <span className="text-[9px] font-semibold">Quote</span>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 absolute top-0 right-1" />
        </Link>

        <Link
          href="/contact"
          className="flex flex-col items-center gap-0.5 text-neutral-500 hover:text-[#800020] transition-colors"
          title="Contact"
        >
          <Phone className="w-4 h-4" />
          <span className="text-[9px] font-semibold">Contact</span>
        </Link>
      </nav>
    </div>
  );
}
