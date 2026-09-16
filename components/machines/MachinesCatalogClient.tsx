"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Sparkles,
  Building2,
  RotateCcw,
  LayoutGrid,
  Check,
  ArrowRight,
  Filter,
} from "lucide-react";
import { CATEGORIES, MAIN_CATEGORIES, CIRCULAR_SUB_CATEGORIES } from "@/lib/machines-data";
import { MachineCard } from "@/components/machines/MachineCard";
import { MotionSection, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Machine, CategoryInfo } from "@/lib/types";

interface MachinesCatalogClientProps {
  initialMachines: Machine[];
  initialCategories?: CategoryInfo[];
}

export function MachinesCatalogClient({
  initialMachines,
  initialCategories,
}: MachinesCatalogClientProps) {
  const { t, locale } = useTranslation();
  const [machines, setMachines] = useState<Machine[]>(initialMachines);
  const [allCategories, setAllCategories] = useState<CategoryInfo[]>(
    initialCategories || CATEGORIES
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGauge, setSelectedGauge] = useState<string>("all");
  const [selectedDiameter, setSelectedDiameter] = useState<string>("all");
  const [selectedAvailability, setSelectedAvailability] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const mainCategoriesList = useMemo(() => {
    return allCategories.filter((c) => c.isTopLevel !== false);
  }, [allCategories]);

  // Background refresh to reflect admin changes if any, without blocking initial SSR render
  useEffect(() => {
    fetch("/api/machines")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.machines) && data.machines.length > 0) {
          setMachines(data.machines);
        }
      })
      .catch(() => {});

    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.categories) && data.categories.length > 0) {
          setAllCategories(data.categories);
        }
      })
      .catch(() => {});
  }, []);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedSubCategory("all");
  };

  // Extract unique brands for brand filter
  const availableBrands = useMemo(() => {
    const set = new Set<string>();
    machines.forEach((m) => {
      if (m.brand && m.brand.trim()) {
        const primary = m.brand.split("/")[0].trim();
        set.add(primary);
      }
    });
    return Array.from(set).sort();
  }, [machines]);

  // Extract unique real specs across the catalog
  const availableGauges = useMemo(() => {
    const set = new Set<string>();
    machines.forEach((m) => {
      if (m.gauge && m.gauge.trim()) set.add(m.gauge.trim());
    });
    return Array.from(set).sort();
  }, [machines]);

  const availableDiameters = useMemo(() => {
    const set = new Set<string>();
    machines.forEach((m) => {
      if (m.cylinderDiameter && m.cylinderDiameter.trim()) set.add(m.cylinderDiameter.trim());
    });
    return Array.from(set).sort();
  }, [machines]);

  // Filter & Sort Logic
  const filteredMachines = useMemo(() => {
    return machines.filter((machine) => {
      const isCircular =
        machine.mainCategory === "circular-knitting" ||
        ["double-jersey", "single-jersey", "interlock", "jacquard", "terry"].includes(
          machine.category
        );

      const matchesCategory =
        selectedCategory === "all" ||
        machine.category === selectedCategory ||
        machine.mainCategory === selectedCategory ||
        machine.subCategory === selectedCategory ||
        (selectedCategory === "circular-knitting" && isCircular);

      const matchesSubCategory =
        selectedSubCategory === "all" ||
        machine.subCategory === selectedSubCategory ||
        machine.category === selectedSubCategory;

      if (!matchesCategory || !matchesSubCategory) return false;

      // Brand match
      const machineBrandPrimary = machine.brand
        ? machine.brand.split("/")[0].trim().toLowerCase()
        : "";
      const matchesBrand =
        selectedBrand === "all" ||
        machineBrandPrimary.includes(selectedBrand.toLowerCase()) ||
        (machine.brand && machine.brand.toLowerCase().includes(selectedBrand.toLowerCase()));

      if (!matchesBrand) return false;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        machine.name.toLowerCase().includes(q) ||
        (machine.name_bn && machine.name_bn.toLowerCase().includes(q)) ||
        machine.brand.toLowerCase().includes(q) ||
        machine.machineType.toLowerCase().includes(q) ||
        (machine.fabricType && machine.fabricType.toLowerCase().includes(q)) ||
        (machine.fabricType_bn && machine.fabricType_bn.toLowerCase().includes(q)) ||
        (machine.gauge && machine.gauge.toLowerCase().includes(q)) ||
        (machine.cylinderDiameter && machine.cylinderDiameter.toLowerCase().includes(q)) ||
        (machine.application && machine.application.some((app) => app.toLowerCase().includes(q)));

      const matchesGauge =
        selectedGauge === "all" || machine.gauge === selectedGauge;

      const matchesDiameter =
        selectedDiameter === "all" || machine.cylinderDiameter === selectedDiameter;

      const matchesAvailability =
        selectedAvailability === "all" || machine.availability === selectedAvailability;

      return (
        matchesSearch &&
        matchesGauge &&
        matchesDiameter &&
        matchesAvailability
      );
    });
  }, [
    machines,
    selectedCategory,
    selectedSubCategory,
    selectedBrand,
    searchQuery,
    selectedGauge,
    selectedDiameter,
    selectedAvailability,
  ]);

  const sortedMachines = useMemo(() => {
    const copy = [...filteredMachines];
    if (sortBy === "name-asc") {
      copy.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      copy.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "brand-asc") {
      copy.sort((a, b) => a.brand.localeCompare(b.brand));
    } else if (sortBy === "price-asc") {
      copy.sort((a, b) => (a.price || 999999) - (b.price || 999999));
    } else if (sortBy === "price-desc") {
      copy.sort((a, b) => (b.price || 0) - (a.price || 0));
    }
    return copy;
  }, [filteredMachines, sortBy]);

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedSubCategory !== "all" ||
    selectedBrand !== "all" ||
    searchQuery !== "" ||
    selectedGauge !== "all" ||
    selectedDiameter !== "all" ||
    selectedAvailability !== "all" ||
    sortBy !== "newest";

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedSubCategory("all");
    setSelectedBrand("all");
    setSearchQuery("");
    setSelectedGauge("all");
    setSelectedDiameter("all");
    setSelectedAvailability("all");
    setSortBy("newest");
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen text-slate-800">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#F1F3F5] via-[#F8F9FA] to-[#FFFFFF] border-b border-[#E2E8F0]">
        <div className="absolute -top-1 -left-1 pointer-events-none z-0">
          <svg width="180" height="130" viewBox="0 0 180 130" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="0,0 140,0 0,95" fill="#94A3B8" opacity="0.35" />
            <polygon points="0,0 90,0 0,60" fill="#64748B" opacity="0.25" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center">
            <div className="lg:col-span-8 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs w-fit mb-3">
                <span>CFR Chattogram Sea Shipment</span>
                <span className="text-slate-400 font-bold">&gt;</span>
                <span className="font-bold text-[#800020]">Direct OEM Import</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#1E293B] leading-tight">
                Industrial Circular Knitting, <br className="hidden sm:inline" />
                <span className="text-[#800020]">Dyeing &amp; Finishing</span> Machinery
              </h1>

              <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-2xl">
                {locale === "bn"
                  ? "সকল প্রিমিয়াম টেক্সটাইল মেশিন এক পেজে সরাসরি এক্সপ্লোর করুন। সাইডবারের ফিল্টার ব্যবহার করে আপনার পছন্দসই মডেল নির্বাচন করুন।"
                  : "Explore our complete catalog on a single seamless page. Use the sidebar filters to refine by technology, gauge, cylinder diameter, and OEM brand."}
              </p>
            </div>

            <div className="lg:col-span-4 hidden lg:flex items-center justify-end">
              <div className="relative w-full max-w-[340px] h-[200px]">
                <Image
                  src="/images/machines/hero-banner-machine-clean.png"
                  alt="Industrial Machinery"
                  fill
                  priority
                  sizes="340px"
                  className="object-contain object-right"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog Area with Side Filter & Machinery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= DESKTOP SIDEBAR FILTER ================= */}
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-3 sticky top-24 space-y-6">
            <div className="bg-white rounded-[24px] p-5 border border-slate-200/90 shadow-sm space-y-5">
              {/* Filter Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <SlidersHorizontal className="w-4 h-4 text-[#800020]" />
                  <span>{locale === "bn" ? "ফিল্টার সমূহ" : "Filters"}</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-semibold text-[#800020] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{locale === "bn" ? "রিসেট" : "Reset"}</span>
                  </button>
                )}
              </div>

              {/* Search Bar */}
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  {locale === "bn" ? "অনুসন্ধান" : "Search Machinery"}
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder={
                      locale === "bn" ? "মডেল, ব্র্যান্ড, গেজ..." : "Model, brand, gauge..."
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#800020] transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Categories Filter */}
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2.5">
                  {locale === "bn" ? "ক্যাটাগরি" : "Categories"}
                </label>
                <div className="space-y-1">
                  <button
                    onClick={() => handleCategoryChange("all")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      selectedCategory === "all"
                        ? "bg-[#800020] text-white font-bold shadow-xs"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span>{locale === "bn" ? "সব ক্যাটাগরি" : "All Categories"}</span>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                        selectedCategory === "all"
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {machines.length}
                    </span>
                  </button>

                  {mainCategoriesList.map((cat) => {
                    const isSelected = selectedCategory === cat.slug;
                    const count = machines.filter((m) => {
                      const isCirc =
                        m.mainCategory === "circular-knitting" ||
                        ["double-jersey", "single-jersey", "interlock", "jacquard", "terry"].includes(
                          m.category
                        );
                      if (cat.slug === "circular-knitting") return isCirc;
                      return m.category === cat.slug || m.mainCategory === cat.slug;
                    }).length;

                    return (
                      <button
                        key={cat.slug}
                        onClick={() => handleCategoryChange(cat.slug)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#800020] text-white font-bold shadow-xs"
                            : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <span className="truncate text-left mr-2">{cat.name}</span>
                        <span
                          className={`text-[11px] px-2 py-0.5 rounded-full font-semibold shrink-0 ${
                            isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Circular Sub-types (when circular knitting or all is active) */}
              {(selectedCategory === "circular-knitting" || selectedCategory === "all") && (
                <div className="pt-3 border-t border-slate-100">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    {locale === "bn" ? "সার্কুলার সাব-টাইপ" : "Circular Types"}
                  </label>
                  <div className="space-y-1 pl-1">
                    <button
                      onClick={() => setSelectedSubCategory("all")}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                        selectedSubCategory === "all"
                          ? "bg-slate-900 text-white font-semibold"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <span>All Types</span>
                    </button>
                    {CIRCULAR_SUB_CATEGORIES.map((sub) => {
                      const isSub = selectedSubCategory === sub.slug;
                      const count = machines.filter(
                        (m) => m.subCategory === sub.slug || m.category === sub.slug
                      ).length;
                      return (
                        <button
                          key={sub.slug}
                          onClick={() => {
                            setSelectedCategory("circular-knitting");
                            setSelectedSubCategory(sub.slug);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                            isSub
                              ? "bg-slate-900 text-white font-semibold"
                              : "text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <span className="truncate text-left mr-2">{sub.name}</span>
                          <span className="text-[10px] text-slate-400">({count})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Brand Filter */}
              <div className="pt-3 border-t border-slate-100">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  {locale === "bn" ? "ব্র্যান্ড / ম্যানুফ্যাকচারার" : "OEM Brands"}
                </label>
                <div className="relative">
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full py-2 pl-3 pr-8 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 appearance-none focus:outline-none focus:border-[#800020] cursor-pointer"
                  >
                    <option value="all">All Brands ({availableBrands.length})</option>
                    {availableBrands.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Technical Specifications: Gauge, Diameter, Availability */}
              <div className="pt-3 border-t border-slate-100 space-y-2.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  {locale === "bn" ? "স্পেসিফিকেশন" : "Technical Specs"}
                </label>

                {/* Gauge */}
                <div className="relative">
                  <select
                    value={selectedGauge}
                    onChange={(e) => setSelectedGauge(e.target.value)}
                    className="w-full py-2 pl-3 pr-8 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 appearance-none focus:outline-none focus:border-[#800020] cursor-pointer"
                  >
                    <option value="all">All Gauges ({availableGauges.length})</option>
                    {availableGauges.map((g) => (
                      <option key={g} value={g}>
                        Gauge: {g}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Diameter */}
                <div className="relative">
                  <select
                    value={selectedDiameter}
                    onChange={(e) => setSelectedDiameter(e.target.value)}
                    className="w-full py-2 pl-3 pr-8 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 appearance-none focus:outline-none focus:border-[#800020] cursor-pointer"
                  >
                    <option value="all">All Diameters ({availableDiameters.length})</option>
                    {availableDiameters.map((d) => (
                      <option key={d} value={d}>
                        Dia: {d}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Availability */}
                <div className="relative">
                  <select
                    value={selectedAvailability}
                    onChange={(e) => setSelectedAvailability(e.target.value)}
                    className="w-full py-2 pl-3 pr-8 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 appearance-none focus:outline-none focus:border-[#800020] cursor-pointer"
                  >
                    <option value="all">All Availability</option>
                    <option value="in-stock">Ready Stock (রেডি স্টক)</option>
                    <option value="made-to-order">Made to Order (অর্ডার ভিত্তিক)</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </aside>

          {/* ================= RIGHT MAIN AREA: ALL PRODUCTS ON ONE PAGE ================= */}
          <main className="lg:col-span-9 xl:col-span-9 space-y-6">
            {/* Top Toolbar: Showing count, Mobile filter button & Sort selector */}
            <div className="bg-white rounded-2xl sm:rounded-[24px] p-4 sm:p-5 border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    {locale === "bn" ? "সকল যন্ত্রপাতি" : "Industrial Machinery Catalog"}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-[#800020] border border-rose-200 text-xs font-bold">
                    {sortedMachines.length} {locale === "bn" ? "টি মেশিন" : "Listed"}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {locale === "bn"
                    ? "সকল প্রোডাক্ট একই পেজে প্রদর্শিত হচ্ছে (পরবর্তী পেজে যাওয়ার প্রয়োজন নেই)"
                    : "All products displayed on one page — no pagination required"}
                </p>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
                {/* Mobile Filter Drawer Button */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#800020]" />
                  <span>{locale === "bn" ? "ফিল্টার" : "Filters"}</span>
                  {hasActiveFilters && (
                    <span className="w-2 h-2 rounded-full bg-[#800020]" />
                  )}
                </button>

                {/* Sort Dropdown */}
                <div className="relative shrink-0">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="py-2 pl-3 pr-8 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 appearance-none focus:outline-none focus:border-[#800020] cursor-pointer"
                  >
                    <option value="newest">Sort: Newest</option>
                    <option value="brand-asc">Sort: Brand (A–Z)</option>
                    <option value="name-asc">Sort: Name (A–Z)</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Active Filters Badges */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-white rounded-2xl border border-slate-200/80 text-xs shadow-2xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-slate-500 font-medium">
                    {locale === "bn" ? "সক্রিয় ফিল্টার:" : "Active filters:"}
                  </span>
                  {selectedCategory !== "all" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#FDF2F4] text-[#800020] border border-[#D8A4AF] font-semibold text-[11px]">
                      Category: {allCategories.find((c) => c.slug === selectedCategory)?.name}
                      <button onClick={() => setSelectedCategory("all")} className="cursor-pointer">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedSubCategory !== "all" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200 text-[11px]">
                      Type: {CIRCULAR_SUB_CATEGORIES.find((c) => c.slug === selectedSubCategory)?.name}
                      <button onClick={() => setSelectedSubCategory("all")} className="cursor-pointer">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedBrand !== "all" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#FDF2F4] text-[#800020] border border-[#D8A4AF] font-semibold text-[11px]">
                      Brand: {selectedBrand}
                      <button onClick={() => setSelectedBrand("all")} className="cursor-pointer">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200 text-[11px]">
                      &quot;{searchQuery}&quot;
                      <button onClick={() => setSearchQuery("")} className="cursor-pointer">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedGauge !== "all" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200 text-[11px]">
                      Gauge: {selectedGauge}
                      <button onClick={() => setSelectedGauge("all")} className="cursor-pointer">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedDiameter !== "all" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200 text-[11px]">
                      Dia: {selectedDiameter}
                      <button onClick={() => setSelectedDiameter("all")} className="cursor-pointer">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedAvailability !== "all" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200 text-[11px]">
                      Status: {selectedAvailability.replace(/-/g, " ")}
                      <button onClick={() => setSelectedAvailability("all")} className="cursor-pointer">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>

                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-1 text-[#800020] font-semibold hover:underline cursor-pointer text-xs"
                >
                  <RotateCcw className="w-3 h-3" />
                  {locale === "bn" ? "সব ফিল্টার মুছুন" : "Clear all"}
                </button>
              </div>
            )}

            {/* PRODUCT CARDS GRID: NO PAGINATION! ALL MATCHING PRODUCTS SHOWN! */}
            {sortedMachines.length > 0 ? (
              <StaggerContainer
                staggerDelay={0.03}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {sortedMachines.map((machine) => (
                  <StaggerItem key={machine.id}>
                    <MachineCard machine={machine} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <div className="border border-dashed border-slate-200 rounded-3xl p-12 text-center bg-white">
                <SlidersHorizontal className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h3 className="font-bold text-base text-slate-800">
                  {locale === "bn"
                    ? "আপনার ফিল্টারের সাথে মেলে এমন কোনো মেশিন পাওয়া যায়নি"
                    : "No machinery matches your filter criteria"}
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  {locale === "bn"
                    ? "ব্র্যান্ড বা ক্যাটাগরি ফিল্টার রিসেট করে দেখুন অথবা সরাসরি টেকনিক্যাল কোটেশন রিকোয়েস্ট পাঠান।"
                    : "Try adjusting your filters, or request custom OEM sourcing for your factory."}
                </p>
                <div className="flex items-center justify-center gap-3 mt-5">
                  <button
                    onClick={clearAllFilters}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#800020] text-white text-xs font-semibold hover:bg-[#600018] transition-colors cursor-pointer shadow-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    {locale === "bn" ? "সব ফিল্টার রিসেট করুন" : "Reset All Filters"}
                  </button>
                  <Link
                    href="/quote"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:border-[#800020] transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#800020]" />
                    {locale === "bn" ? "কাস্টম কোটেশন চান" : "Request Custom Quote"}
                  </Link>
                </div>
              </div>
            )}

            {/* Sourcing Consultation Footer Box */}
            <div className="mt-12 bg-white border border-[#D8A4AF]/60 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#800020] uppercase tracking-wider mb-2">
                  <Building2 className="w-3.5 h-3.5" />
                  {locale === "bn" ? "কারখানা সম্প্রসারণ ও পরামর্শ" : "Factory Expansion & Machine Sourcing"}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1E293B]">
                  {locale === "bn"
                    ? "আপনার নির্দিষ্ট ফ্যাব্রিক ও প্রোডাকশন টার্গেটের জন্য সঠিক মেশিন নির্বাচন করতে চান?"
                    : "Need guidance selecting the optimal cylinder, gauge, or finishing line for your mill?"}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {locale === "bn"
                    ? "তাসনীম নিট ইন্ডাস্ট্রির টেকনিক্যাল টিম আপনার কারখানার কাঙ্ক্ষিত ফ্যাব্রিক জিএসএম, সুতা কাউন্ট এবং দৈনিক টার্গেট অনুযায়ী প্রস্তুতকারকদের সাথে সমন্বয় করে সরাসরি সিএফআর চট্টগ্রাম কোটেশন ও এল/সি সহায়তা প্রদান করে।"
                    : "Our textile engineering team will review your target fabric GSM, yarn counts, and daily production quotas to structure complete CFR Chattogram proposals with genuine OEM parts and local training."}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-[#800020] text-white text-xs font-bold hover:bg-[#600018] transition-all shadow-sm"
                >
                  {locale === "bn" ? "প্রোডাকশন কোটেশন চান" : "Request Technical Quotation"}
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-slate-300 bg-white text-xs font-bold text-slate-800 hover:border-[#800020] transition-all"
                >
                  {locale === "bn" ? "ইঞ্জিনিয়ারের সাথে আলোচনা" : "Consult Textile Engineer"}
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* ================= MOBILE FILTER SLIDE-OUT DRAWER ================= */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto p-5">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <SlidersHorizontal className="w-4 h-4 text-[#800020]" />
                  <span>{locale === "bn" ? "ফিল্টার সমূহ" : "Filters"}</span>
                </div>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search */}
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  {locale === "bn" ? "অনুসন্ধান" : "Search"}
                </label>
                <input
                  type="text"
                  placeholder={locale === "bn" ? "মডেল, ব্র্যান্ড..." : "Model, brand..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                />
              </div>

              {/* Mobile Categories */}
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  {locale === "bn" ? "ক্যাটাগরি" : "Categories"}
                </label>
                <div className="space-y-1">
                  <button
                    onClick={() => handleCategoryChange("all")}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium cursor-pointer ${
                      selectedCategory === "all"
                        ? "bg-[#800020] text-white font-bold"
                        : "text-slate-700 bg-slate-50"
                    }`}
                  >
                    <span>All Categories</span>
                    <span>({machines.length})</span>
                  </button>
                  {mainCategoriesList.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => handleCategoryChange(cat.slug)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium cursor-pointer ${
                        selectedCategory === cat.slug
                          ? "bg-[#800020] text-white font-bold"
                          : "text-slate-700 bg-slate-50"
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Brand */}
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  {locale === "bn" ? "ব্র্যান্ড" : "Brands"}
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700"
                >
                  <option value="all">All Brands</option>
                  {availableBrands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Mobile Specs */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  {locale === "bn" ? "স্পেসিফিকেশন" : "Specs"}
                </label>
                <select
                  value={selectedGauge}
                  onChange={(e) => setSelectedGauge(e.target.value)}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700"
                >
                  <option value="all">All Gauges</option>
                  {availableGauges.map((g) => (
                    <option key={g} value={g}>Gauge: {g}</option>
                  ))}
                </select>
                <select
                  value={selectedDiameter}
                  onChange={(e) => setSelectedDiameter(e.target.value)}
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700"
                >
                  <option value="all">All Diameters</option>
                  {availableDiameters.map((d) => (
                    <option key={d} value={d}>Dia: {d}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Drawer Apply Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={clearAllFilters}
                className="w-1/2 py-2.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-1/2 py-2.5 rounded-full bg-[#800020] text-white text-xs font-bold shadow-sm"
              >
                Apply ({sortedMachines.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
