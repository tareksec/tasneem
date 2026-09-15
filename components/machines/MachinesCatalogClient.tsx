"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Building2,
  Anchor,
  ShieldCheck,
  PhoneCall,
  RotateCcw,
} from "lucide-react";
import { CATEGORIES, MAIN_CATEGORIES, CIRCULAR_SUB_CATEGORIES } from "@/lib/machines-data";
import { MachineCard } from "@/components/machines/MachineCard";
import { MotionSection, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Machine } from "@/lib/types";

interface MachinesCatalogClientProps {
  initialMachines: Machine[];
}

export function MachinesCatalogClient({ initialMachines }: MachinesCatalogClientProps) {
  const { t, locale } = useTranslation();
  const [machines, setMachines] = useState<Machine[]>(initialMachines);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGauge, setSelectedGauge] = useState<string>("all");
  const [selectedDiameter, setSelectedDiameter] = useState<string>("all");
  const [selectedAvailability, setSelectedAvailability] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Background refresh to reflect admin changes if any, without blocking initial SSR render
  useEffect(() => {
    fetch("/api/machines")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.machines) && data.machines.length > 0) {
          setMachines(data.machines);
        }
      })
      .catch(() => {
        // Fallback to initialMachines already hydrated
      });
  }, []);

  // Direct handler methods resetting pagination on user filter action
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedSubCategory("all");
    setCurrentPage(1);
  };

  const handleSubCategoryChange = (sub: string) => {
    setSelectedSubCategory(sub);
    setCurrentPage(1);
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    setCurrentPage(1);
  };

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  const handleGaugeChange = (g: string) => {
    setSelectedGauge(g);
    setCurrentPage(1);
  };

  const handleDiameterChange = (d: string) => {
    setSelectedDiameter(d);
    setCurrentPage(1);
  };

  const handleAvailabilityChange = (a: string) => {
    setSelectedAvailability(a);
    setCurrentPage(1);
  };

  const handleSortChange = (s: string) => {
    setSortBy(s);
    setCurrentPage(1);
  };

  // Extract unique brands for brand filter
  const availableBrands = useMemo(() => {
    const set = new Set<string>();
    machines.forEach((m) => {
      if (m.brand && m.brand.trim()) {
        // Normalize brands (e.g. "Thies / Industrial Partner" -> "Thies")
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
      const machineBrandPrimary = machine.brand ? machine.brand.split("/")[0].trim().toLowerCase() : "";
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
    // "newest" preserves addition order
    return copy;
  }, [filteredMachines, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(sortedMachines.length / itemsPerPage) || 1;
  const activePage = Math.min(currentPage, totalPages);
  const paginatedMachines = sortedMachines.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

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
    setCurrentPage(1);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner with Industrial Sourcing Positioning */}
      <div className="border-b border-[#E5E7EB] bg-[#FFFDFB] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionSection className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FDF2F4] text-[#800020] border border-[#D8A4AF]">
                <Anchor className="w-3.5 h-3.5" />
                CFR Chattogram Sea Shipment • Direct OEM Import
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#2D2D2D] leading-tight">
              {locale === "bn"
                ? "সার্কুলার নিটিং, ডাইং ও টেক্সটাইল ফিনিশিং মেশিনারি"
                : "Industrial Circular Knitting, Dyeing & Finishing Machinery"}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#4B5563] leading-relaxed">
              {locale === "bn"
                ? "বাংলাদেশের শীর্ষস্থানীয় কম্পোজিট টেক্সটাইল কারখানার জন্য জিউন লং, থিয়েস, ব্রুকনার, ক্রোস্টা ও অন্যান্য বিশ্বস্ত ব্র্যান্ডের শিল্প যন্ত্রপাতি। সরাসরি এলসি, আন্তর্জাতিক ওয়ারেন্টি ও অন-সাইট কারিগরি ইনস্টলেশন।"
                : "Imported industrial machinery catalog for Bangladesh textile mills: Jiunn Long, Rongxiang, Longjun, Thies, Crosta, Bruckner & Tasneem equipment. Full turnkey L/C support, pre-shipment inspection, and factory commissioning."}
            </p>
          </MotionSection>

          {/* Quick Trust Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-[#E5E7EB]">
            <div className="flex items-center gap-2 text-xs text-[#2D2D2D] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#800020] shrink-0" />
              <span>{locale === "bn" ? "১০০% অরিজিনাল OEM পার্টস" : "100% Genuine OEM"}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#2D2D2D] font-semibold">
              <Anchor className="w-4 h-4 text-[#800020] shrink-0" />
              <span>{locale === "bn" ? "চট্টগ্রাম বন্দর CFR ডেলিভারি" : "CFR Chattogram Delivery"}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#2D2D2D] font-semibold">
              <Building2 className="w-4 h-4 text-[#800020] shrink-0" />
              <span>{locale === "bn" ? "অন-সাইট টেস্ট নিটিং ও ট্রায়াল" : "Turnkey Commissioning"}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#2D2D2D] font-semibold">
              <PhoneCall className="w-4 h-4 text-[#800020] shrink-0" />
              <span>{locale === "bn" ? "২৪/৭ লোকাল ইঞ্জিনিয়ার সাপোর্ট" : "Local Engineer Support"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Primary Controls: Categories Bar + Search, Brand & Spec Filters */}
        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-4 sm:p-5 mb-6 shadow-xs flex flex-col gap-3.5">
          {/* Top Row: Top-Level Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] active:scale-95 ${
                selectedCategory === "all"
                  ? "bg-[#800020] text-white shadow-xs"
                  : "bg-white border border-[#E5E7EB] text-[#4B5563] hover:text-[#2D2D2D] hover:border-[#C0C0C0]"
              }`}
            >
              {t.common.allCategories} ({machines.length})
            </button>
            {MAIN_CATEGORIES.map((cat) => {
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
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] active:scale-95 ${
                    isSelected
                      ? "bg-[#800020] text-white shadow-xs font-bold"
                      : "bg-white border border-[#E5E7EB] text-[#4B5563] hover:text-[#2D2D2D] hover:border-[#C0C0C0]"
                  }`}
                >
                  <span>{locale === "bn" && cat.name_bn ? cat.name_bn : cat.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                      isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sub-Category Pills for Circular Knitting */}
          {(selectedCategory === "circular-knitting" || selectedCategory === "all") && (
            <div className="flex items-center gap-1.5 overflow-x-auto pt-2 pb-1 scrollbar-none border-t border-slate-200/60">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mr-1 shrink-0">
                {locale === "bn" ? "সার্কুলার টাইপ:" : "Sub-Types:"}
              </span>
              <button
                onClick={() => handleSubCategoryChange("all")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] ${
                  selectedSubCategory === "all"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {locale === "bn" ? "সব ধরনের নিটিং" : "All Circular Types"}
              </button>
              {CIRCULAR_SUB_CATEGORIES.map((sub) => {
                const subCount = machines.filter(
                  (m) => m.subCategory === sub.slug || m.category === sub.slug
                ).length;
                return (
                  <button
                    key={sub.slug}
                    onClick={() => {
                      setSelectedCategory("circular-knitting");
                      handleSubCategoryChange(sub.slug);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 cursor-pointer transition-colors flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] ${
                      selectedSubCategory === sub.slug
                        ? "bg-slate-900 text-white font-bold shadow-xs"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span>{locale === "bn" && sub.name_bn ? sub.name_bn : sub.name}</span>
                    <span className="text-[9px] opacity-70">({subCount})</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Bottom Filter Matrix: Search, Brand, Specs, Availability, Sort */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 pt-3 border-t border-[#E5E7EB]">
            {/* Search Input (4 cols) */}
            <div className="lg:col-span-4 relative">
              <Search className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={
                  locale === "bn"
                    ? "মডেল, ব্র্যান্ড, স্পেক্স বা অ্যাপ্লিকেশন দিয়ে খুঁজুন..."
                    : "Search model, brand, gauge, application..."
                }
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#2D2D2D] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020]"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Brand Filter (2 cols) */}
            <div className="lg:col-span-2">
              <select
                value={selectedBrand}
                onChange={(e) => handleBrandChange(e.target.value)}
                className="w-full py-2 px-3 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#2D2D2D] focus:outline-none focus:border-[#800020] cursor-pointer"
                aria-label="Filter by brand"
              >
                <option value="all">
                  {locale === "bn" ? "সকল ব্র্যান্ড" : "All Brands"} ({availableBrands.length})
                </option>
                {availableBrands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Context Spec 1: Gauge (if circular or all) (2 cols) */}
            {(selectedCategory === "all" || selectedCategory === "circular-knitting") &&
            availableGauges.length > 0 ? (
              <div className="lg:col-span-2">
                <select
                  value={selectedGauge}
                  onChange={(e) => handleGaugeChange(e.target.value)}
                  className="w-full py-2 px-3 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#2D2D2D] focus:outline-none focus:border-[#800020] cursor-pointer"
                  aria-label="Filter by gauge"
                >
                  <option value="all">
                    {locale === "bn" ? "সব গেজ (Gauge)" : "All Gauges"} ({availableGauges.length})
                  </option>
                  {availableGauges.map((g) => (
                    <option key={g} value={g}>
                      Gauge: {g}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="lg:col-span-2">
                <select
                  value={selectedAvailability}
                  onChange={(e) => handleAvailabilityChange(e.target.value)}
                  className="w-full py-2 px-3 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#2D2D2D] focus:outline-none focus:border-[#800020] cursor-pointer"
                  aria-label="Filter by availability"
                >
                  <option value="all">{locale === "bn" ? "সব প্রাপ্যতা" : "All Availability"}</option>
                  <option value="in-stock">{locale === "bn" ? "রেডি স্টক" : "Ready Stock"}</option>
                  <option value="made-to-order">{locale === "bn" ? "অর্ডার ভিত্তিক" : "Made to Order"}</option>
                  <option value="contact-for-availability">{locale === "bn" ? "সরাসরি যোগাযোগ" : "On Request"}</option>
                </select>
              </div>
            )}

            {/* Context Spec 2: Cylinder Diameter (if circular or all) (2 cols) */}
            {(selectedCategory === "all" || selectedCategory === "circular-knitting") &&
            availableDiameters.length > 0 ? (
              <div className="lg:col-span-2">
                <select
                  value={selectedDiameter}
                  onChange={(e) => handleDiameterChange(e.target.value)}
                  className="w-full py-2 px-3 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#2D2D2D] focus:outline-none focus:border-[#800020] cursor-pointer"
                  aria-label="Filter by cylinder diameter"
                >
                  <option value="all">
                    {locale === "bn" ? "সব ডায়ামিটার" : "All Diameters"} ({availableDiameters.length})
                  </option>
                  {availableDiameters.map((d) => (
                    <option key={d} value={d}>
                      Dia: {d}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="lg:col-span-2">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-full py-2 px-3 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#2D2D2D] focus:outline-none focus:border-[#800020] cursor-pointer"
                  aria-label="Sort machinery"
                >
                  <option value="newest">{locale === "bn" ? "নতুন সংযোজিত" : "Sort: Newest"}</option>
                  <option value="brand-asc">{locale === "bn" ? "ব্র্যান্ড (A – Z)" : "Sort: Brand"}</option>
                  <option value="name-asc">{locale === "bn" ? "মডেল নাম (A – Z)" : "Sort: Name (A – Z)"}</option>
                </select>
              </div>
            )}

            {/* Availability / Sort for 12-col grid completion */}
            {(selectedCategory === "all" || selectedCategory === "circular-knitting") && (
              <div className="lg:col-span-2">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-full py-2 px-3 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#2D2D2D] focus:outline-none focus:border-[#800020] cursor-pointer"
                  aria-label="Sort machinery"
                >
                  <option value="newest">{locale === "bn" ? "নতুন সংযোজিত" : "Sort: Newest"}</option>
                  <option value="brand-asc">{locale === "bn" ? "ব্র্যান্ড (A – Z)" : "Sort: Brand"}</option>
                  <option value="name-asc">{locale === "bn" ? "মডেল নাম (A – Z)" : "Sort: Name (A – Z)"}</option>
                </select>
              </div>
            )}
          </div>

          {/* Active Filter Badges & Clear Button */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-slate-200/60 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-slate-500 font-medium">
                  {locale === "bn" ? "সক্রিয় ফিল্টার:" : "Active filters:"}
                </span>
                {selectedCategory !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#FDF2F4] text-[#800020] border border-[#D8A4AF] font-semibold text-[11px]">
                    Category: {CATEGORIES.find((c) => c.slug === selectedCategory)?.name}
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
                {locale === "bn" ? "সব ফিল্টার মুছুন" : "Clear all filters"}
              </button>
            </div>
          )}
        </div>

        {/* Category Description Banner */}
        {selectedCategory !== "all" && (
          <div className="mb-8 p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#4B5563]">
            <div>
              <span className="font-bold text-[#2D2D2D]">
                {CATEGORIES.find((c) => c.slug === selectedCategory)?.name} {locale === "bn" ? "বিভাগ:" : "Category:"}
              </span>{" "}
              {CATEGORIES.find((c) => c.slug === selectedCategory)?.description}
            </div>
            <Link
              href={`/machines/${selectedCategory}`}
              className="text-[#800020] font-semibold underline shrink-0 hover:opacity-80"
            >
              {locale === "bn" ? "এই ক্যাটাগরির বিস্তারিত পেজ →" : "View Dedicated Category Page →"}
            </Link>
          </div>
        )}

        {/* Results Count Header */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-600 font-medium">
          <p>
            {locale === "bn" ? "প্রদর্শন:" : "Showing"}{" "}
            <span className="font-bold text-slate-900">
              {paginatedMachines.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}
            </span>{" "}
            {locale === "bn" ? "থেকে" : "to"}{" "}
            <span className="font-bold text-slate-900">
              {Math.min(currentPage * itemsPerPage, sortedMachines.length)}
            </span>{" "}
            {locale === "bn" ? "মোট" : "of"}{" "}
            <span className="font-bold text-slate-900">{sortedMachines.length}</span>{" "}
            {locale === "bn" ? "টি যন্ত্রপাতি" : "machinery listings"}
          </p>
          {totalPages > 1 && (
            <p>
              {locale === "bn" ? `পৃষ্ঠা ${currentPage} / ${totalPages}` : `Page ${currentPage} of ${totalPages}`}
            </p>
          )}
        </div>

        {/* Grid Results */}
        {paginatedMachines.length > 0 ? (
          <StaggerContainer
            staggerDelay={0.05}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {paginatedMachines.map((machine) => (
              <StaggerItem key={machine.id}>
                <MachineCard machine={machine} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="border border-dashed border-[#E5E7EB] rounded-2xl p-12 text-center bg-[#F9FAFB]">
            <SlidersHorizontal className="w-10 h-10 text-[#6B7280] mx-auto mb-3" />
            <h3 className="font-bold text-base text-[#2D2D2D]">
              {locale === "bn"
                ? "আপনার খোঁজার সাথে মেলে এমন কোনো মেশিন পাওয়া যায়নি"
                : "No machinery matches your filter criteria"}
            </h3>
            <p className="text-xs text-[#4B5563] mt-1 max-w-md mx-auto">
              {locale === "bn"
                ? "ব্র্যান্ড, ক্যাটাগরি বা সার্চ কিওয়ার্ড পরিবর্তন করে দেখুন অথবা আপনার কারখানার স্পেসিফিকেশন জানিয়ে সরাসরি কোটেশন চান।"
                : "Try adjusting your brand, category, or search keywords, or request a custom quotation tailored to your factory."}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#800020] text-white text-xs font-semibold hover:bg-[#5A0017] transition-colors cursor-pointer shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {locale === "bn" ? "সব ফিল্টার রিসেট করুন" : "Reset All Filters"}
              </button>
              <Link
                href="/quote"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#D1D5DB] bg-white text-xs font-semibold text-[#2D2D2D] hover:border-[#800020] transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#800020]" />
                {locale === "bn" ? "কাস্টম কনফিগারেশন কোটেশন" : "Custom Spec Inquiry"}
              </Link>
            </div>
          </div>
        )}

        {/* Pagination Navigation */}
        {totalPages > 1 && (
          <div className="mt-12 pt-6 border-t border-[#E5E7EB] flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-[#E5E7EB] text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] ${
                  currentPage === page
                    ? "bg-[#800020] text-white shadow-xs"
                    : "border border-[#E5E7EB] text-slate-700 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-[#E5E7EB] text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* B2B Sourcing Consultation Callout */}
        <div className="mt-16 bg-[#FFFDFB] border border-[#D8A4AF]/60 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#800020] uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5" />
              {locale === "bn" ? "কারখানা সম্প্রসারণ ও পরামর্শ" : "Factory Expansion & Machine Sourcing"}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#2D2D2D]">
              {locale === "bn"
                ? "আপনার নির্দিষ্ট ফ্যাব্রিক ও প্রোডাকশন টার্গেটের জন্য সঠিক মেশিন নির্বাচন করতে চান?"
                : "Need guidance selecting the optimal cylinder, gauge, or finishing line for your mill?"}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#4B5563] leading-relaxed">
              {locale === "bn"
                ? "তাসনীম নিট ইন্ডাস্ট্রির টেকনিক্যাল টিম আপনার কারখানার কাঙ্ক্ষিত ফ্যাব্রিক জিএসএম, সুতা কাউন্ট এবং দৈনিক টার্গেট অনুযায়ী প্রস্তুতকারকদের সাথে সমন্বয় করে সরাসরি সিএফআর চট্টগ্রাম কোটেশন ও এল/সি সহায়তা প্রদান করে।"
                : "Our textile engineering team will review your target fabric GSM, yarn counts, and daily production quotas to structure complete CFR Chattogram proposals with genuine OEM parts and local training."}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-[#800020] text-white text-xs font-bold hover:bg-[#5A0017] transition-all shadow-sm"
            >
              {locale === "bn" ? "প্রোডাকশন কোটেশন চান" : "Request Technical Quotation"}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-[#D1D5DB] bg-white text-xs font-bold text-[#2D2D2D] hover:border-[#800020] transition-all"
            >
              {locale === "bn" ? "ইঞ্জিনিয়ারের সাথে আলোচনা" : "Consult Textile Engineer"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
