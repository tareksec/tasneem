"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Building2,
  Anchor,
  ShieldCheck,
  PhoneCall,
  RotateCcw,
  LayoutGrid,
  ArrowRight,
} from "lucide-react";
import { CATEGORIES, MAIN_CATEGORIES, CIRCULAR_SUB_CATEGORIES } from "@/lib/machines-data";
import { MachineCard } from "@/components/machines/MachineCard";
import { MotionSection, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Machine } from "@/lib/types";
import { MobileShopView } from "@/components/machines/MobileShopView";

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
  const machinesGridRef = useRef<HTMLDivElement>(null);

  const scrollToResults = () => {
    if (machinesGridRef.current) {
      machinesGridRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
    <>
      {/* Mobile-Only Explore / Shop View (Exact Design from Reference Mockup) */}
      <MobileShopView
        machines={filteredMachines}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        locale={locale}
      />

      {/* Desktop / Tablet Catalog View (Preserved for Larger Screens) */}
      <div className="hidden md:block bg-white min-h-screen">
      {/* Hero Banner with Geometric Modern Industrial Sourcing Design */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#F8F9FA] via-[#F4F5F7] to-[#FFFFFF] border-b border-[#E2E8F0]">
        {/* Decorative Top-Left Angled Polygon Accent */}
        <div className="absolute -top-1 -left-1 pointer-events-none z-0">
          <svg width="180" height="130" viewBox="0 0 180 130" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="0,0 140,0 0,95" fill="#94A3B8" opacity="0.45" />
            <polygon points="0,0 90,0 0,60" fill="#64748B" opacity="0.35" />
          </svg>
        </div>

        {/* Decorative Bottom-Right Angled Polygon Accent */}
        <div className="absolute bottom-0 right-0 pointer-events-none z-0">
          <svg width="240" height="150" viewBox="0 0 240 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="240,150 240,40 110,150" fill="#E2E8F0" opacity="0.9" />
            <polygon points="240,150 240,85 155,150" fill="#CBD5E1" opacity="0.6" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
            {/* Left Column: Headings, Badges, Trust Highlights */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Top Breadcrumb / Tag Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-100/90 border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs w-fit mb-4 sm:mb-5">
                <span>CFR Chattogram Sea Shipment</span>
                <span className="text-slate-400 font-bold">&gt;</span>
                <span className="font-bold text-[#800020]">Direct OEM Import</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-[45px] xl:text-[48px] font-extrabold tracking-tight text-[#1E293B] leading-[1.14]">
                Industrial Circular Knitting, <br className="hidden sm:inline" />
                <span className="text-[#800020]">Dyeing &amp; Finishing</span> Machinery
              </h1>

              {/* Sub-tagline */}
              <div className="mt-3.5 sm:mt-4 flex items-center gap-2 text-xs sm:text-[13px] font-semibold text-slate-500 uppercase tracking-[0.24em] flex-wrap">
                <span>QUALITY MACHINERY</span>
                <span className="text-[#800020]/70 font-bold mx-1">/</span>
                <span>RELIABLE SUPPLY</span>
                <span className="text-[#800020]/70 font-bold mx-1">/</span>
                <span>GLOBAL STANDARDS</span>
              </div>

              {/* 4 Trust Highlights with Red Vertical Bars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-8 pt-6 border-t border-slate-200/80">
                <div className="border-l-2 border-[#800020] pl-3 py-0.5">
                  <div className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                    100% Genuine
                  </div>
                  <div className="text-xs text-slate-500 font-medium leading-tight mt-0.5">
                    OEM
                  </div>
                </div>
                <div className="border-l-2 border-[#800020] pl-3 py-0.5">
                  <div className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                    CFR Chattogram
                  </div>
                  <div className="text-xs text-slate-500 font-medium leading-tight mt-0.5">
                    Delivery
                  </div>
                </div>
                <div className="border-l-2 border-[#800020] pl-3 py-0.5">
                  <div className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                    Turnkey
                  </div>
                  <div className="text-xs text-slate-500 font-medium leading-tight mt-0.5">
                    Commissioning
                  </div>
                </div>
                <div className="border-l-2 border-[#800020] pl-3 py-0.5">
                  <div className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                    Local Engineer
                  </div>
                  <div className="text-xs text-slate-500 font-medium leading-tight mt-0.5">
                    Support
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Industrial Machine in Maroon Curved Contour */}
            <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px] h-[280px] sm:h-[320px] lg:h-[350px]">
                <Image
                  src="/images/machines/hero-banner-machine-clean.png"
                  alt="Industrial Circular Knitting, Dyeing & Finishing Machinery"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-contain object-right"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Primary Controls: Floating Card with Category Tabs, Subtypes, Search & Filter Bar */}
        <div className="bg-white border border-slate-200/90 rounded-2xl lg:rounded-3xl p-4 sm:p-6 mb-8 shadow-md shadow-slate-200/40 flex flex-col gap-4">
          {/* Row 1: Top-Level Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {/* All Categories Button */}
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] active:scale-95 ${
                selectedCategory === "all"
                  ? "bg-[#800020] text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>All Categories</span>
              <span className={selectedCategory === "all" ? "text-white/90 font-normal" : "text-slate-500"}>
                ({machines.length})
              </span>
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
                  className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all shrink-0 cursor-pointer flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] active:scale-95 ${
                    isSelected
                      ? "bg-[#800020] text-white shadow-xs font-bold"
                      : "bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                      isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Row 2: Sub-types Pills for Circular Knitting */}
          {(selectedCategory === "circular-knitting" || selectedCategory === "all") && (
            <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider mr-1 shrink-0">
                SUB-TYPES:
              </span>
              <button
                onClick={() => handleSubCategoryChange("all")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] active:scale-95 ${
                  selectedSubCategory === "all"
                    ? "bg-[#800020] text-white shadow-xs font-bold"
                    : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
              >
                All Circular Types
              </button>
              {CIRCULAR_SUB_CATEGORIES.map((sub) => {
                const subCount = machines.filter(
                  (m) => m.subCategory === sub.slug || m.category === sub.slug
                ).length;
                const isSubSelected = selectedSubCategory === sub.slug;
                return (
                  <button
                    key={sub.slug}
                    onClick={() => {
                      setSelectedCategory("circular-knitting");
                      handleSubCategoryChange(sub.slug);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 cursor-pointer transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] active:scale-95 ${
                      isSubSelected
                        ? "bg-[#800020] text-white font-bold shadow-xs"
                        : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <span>{sub.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                        isSubSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {subCount}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Row 3: Search, Brand, Gauges, Diameters, Sort & Apply Filters Button */}
          <div className="flex flex-wrap lg:flex-nowrap items-center gap-2.5 pt-2 border-t border-slate-100">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-[#800020] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search model, brand, gauge, application..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 bg-white border border-slate-200 rounded-full text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Brand Dropdown */}
            <div className="relative shrink-0 min-w-[135px]">
              <select
                value={selectedBrand}
                onChange={(e) => handleBrandChange(e.target.value)}
                className="w-full py-2.5 pl-3.5 pr-8 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 appearance-none focus:outline-none focus:border-[#800020] cursor-pointer"
                aria-label="Filter by brand"
              >
                <option value="all">
                  All Brands ({availableBrands.length})
                </option>
                {availableBrands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Gauge Dropdown */}
            <div className="relative shrink-0 min-w-[130px]">
              <select
                value={selectedGauge}
                onChange={(e) => handleGaugeChange(e.target.value)}
                className="w-full py-2.5 pl-3.5 pr-8 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 appearance-none focus:outline-none focus:border-[#800020] cursor-pointer"
                aria-label="Filter by gauge"
              >
                <option value="all">
                  All Gauges ({availableGauges.length})
                </option>
                {availableGauges.map((g) => (
                  <option key={g} value={g}>
                    Gauge: {g}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Diameter Dropdown */}
            <div className="relative shrink-0 min-w-[135px]">
              <select
                value={selectedDiameter}
                onChange={(e) => handleDiameterChange(e.target.value)}
                className="w-full py-2.5 pl-3.5 pr-8 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 appearance-none focus:outline-none focus:border-[#800020] cursor-pointer"
                aria-label="Filter by cylinder diameter"
              >
                <option value="all">
                  All Diameters ({availableDiameters.length})
                </option>
                {availableDiameters.map((d) => (
                  <option key={d} value={d}>
                    Dia: {d}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Sort Dropdown */}
            <div className="relative shrink-0 min-w-[125px]">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full py-2.5 pl-3.5 pr-8 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 appearance-none focus:outline-none focus:border-[#800020] cursor-pointer"
                aria-label="Sort machinery"
              >
                <option value="newest">Sort: Newest</option>
                <option value="brand-asc">Sort: Brand</option>
                <option value="name-asc">Sort: Name (A – Z)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Apply Filters Button */}
            <button
              onClick={scrollToResults}
              className="bg-[#800020] hover:bg-[#68001a] text-white text-xs font-bold px-6 py-2.5 rounded-full flex items-center justify-center gap-2 shrink-0 shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <span>Apply Filters</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
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
        <div
          ref={machinesGridRef}
          id="machines-grid"
          className="scroll-mt-8 flex items-center justify-between mb-6 text-xs text-slate-600 font-medium"
        >
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
    </>
  );
}
