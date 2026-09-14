"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  Gauge,
  CircleDot,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { CATEGORIES, MAIN_CATEGORIES, CIRCULAR_SUB_CATEGORIES } from "@/lib/machines-data";
import { MachineCard } from "@/components/machines/MachineCard";
import { MotionSection, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Machine } from "@/lib/types";

export default function MachinesIndexPage() {
  const { t, locale } = useTranslation();
  const [machines, setMachines] = useState<Machine[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGauge, setSelectedGauge] = useState<string>("all");
  const [selectedDiameter, setSelectedDiameter] = useState<string>("all");
  const [selectedAvailability, setSelectedAvailability] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetch("/api/machines")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.machines)) {
          setMachines(data.machines);
        }
      })
      .catch((err) => console.error("Failed to load machines:", err));
  }, []);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedSubCategory, searchQuery, selectedGauge, selectedDiameter, selectedAvailability, sortBy]);

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
      const isCircularMatch =
        (selectedCategory === "circular-knitting" || selectedCategory === "all") &&
        (!machine.mainCategory || machine.mainCategory === "circular-knitting");

      const matchesCategory =
        selectedCategory === "all" ||
        machine.category === selectedCategory ||
        machine.mainCategory === selectedCategory ||
        machine.subCategory === selectedCategory ||
        (selectedCategory === "circular-knitting" && isCircularMatch);

      const matchesSubCategory =
        selectedSubCategory === "all" ||
        machine.subCategory === selectedSubCategory ||
        machine.category === selectedSubCategory;

      if (!matchesCategory || !matchesSubCategory) return false;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        machine.name.toLowerCase().includes(q) ||
        (machine.name_bn && machine.name_bn.toLowerCase().includes(q)) ||
        machine.brand.toLowerCase().includes(q) ||
        machine.machineType.toLowerCase().includes(q) ||
        (machine.fabricType && machine.fabricType.toLowerCase().includes(q)) ||
        (machine.gauge && machine.gauge.toLowerCase().includes(q)) ||
        (machine.cylinderDiameter && machine.cylinderDiameter.toLowerCase().includes(q));

      const matchesGauge =
        selectedGauge === "all" || machine.gauge === selectedGauge;

      const matchesDiameter =
        selectedDiameter === "all" || machine.cylinderDiameter === selectedDiameter;

      const matchesAvailability =
        selectedAvailability === "all" || machine.availability === selectedAvailability;

      return (
        matchesCategory &&
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
    } else if (sortBy === "price-asc") {
      copy.sort((a, b) => (a.price || 999999) - (b.price || 999999));
    } else if (sortBy === "price-desc") {
      copy.sort((a, b) => (b.price || 0) - (a.price || 0));
    }
    // "newest" preserves original/latest addition order
    return copy;
  }, [filteredMachines, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(sortedMachines.length / itemsPerPage) || 1;
  const paginatedMachines = sortedMachines.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedSubCategory !== "all" ||
    searchQuery !== "" ||
    selectedGauge !== "all" ||
    selectedDiameter !== "all" ||
    selectedAvailability !== "all" ||
    sortBy !== "newest";

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedSubCategory("all");
    setSearchQuery("");
    setSelectedGauge("all");
    setSelectedDiameter("all");
    setSelectedAvailability("all");
    setSortBy("newest");
    setCurrentPage(1);
  };
  const handleResetFilters = clearAllFilters;

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <div className="border-b border-[#E5E7EB] bg-[#FFFDFB] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionSection className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#800020] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{locale === "bn" ? "শিল্প যন্ত্রপাতি ক্যাটালগ" : "Industrial Machinery Catalog"}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#2D2D2D] leading-tight">
              {locale === "bn"
                ? "সার্কুলার নিটিং, ডাইং ও টেক্সটাইল যন্ত্রপাতি"
                : "Circular Knitting, Dyeing & Textile Machinery"}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#4B5563] leading-relaxed">
              {locale === "bn"
                ? "বাংলাদেশের টেক্সটাইল ও গার্মেন্টস কারখানার জন্য আন্তর্জাতিক মানের সার্কুলার নিটিং, ডাইং, শিয়ারিং ও ফিনিশিং যন্ত্রপাতি।"
                : "Engineered circular knitting machinery, dyeing vessels, rotary shearing, and finishing equipment for Bangladesh composite knitwear mills."}
            </p>
          </MotionSection>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Primary Controls: Categories Bar + Search & Sort */}
        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-4 sm:p-5 mb-6 shadow-xs flex flex-col gap-3">
          {/* Top Row: Top-Level Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedSubCategory("all");
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-[#800020] text-white shadow-xs"
                  : "bg-white border border-[#E5E7EB] text-[#4B5563] hover:text-[#2D2D2D] hover:border-[#C0C0C0]"
              }`}
            >
              {t.common.allCategories} ({machines.length})
            </button>
            {MAIN_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              const count = machines.filter(
                (m) =>
                  m.category === cat.slug ||
                  m.mainCategory === cat.slug ||
                  (cat.slug === "circular-knitting" &&
                    (!m.mainCategory || m.mainCategory === "circular-knitting"))
              ).length;

              return (
                <button
                  key={cat.slug}
                  onClick={() => {
                    setSelectedCategory(cat.slug);
                    setSelectedSubCategory("all");
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#800020] text-white shadow-xs font-bold"
                      : "bg-white border border-[#E5E7EB] text-[#4B5563] hover:text-[#2D2D2D] hover:border-[#C0C0C0]"
                  }`}
                >
                  <span>{locale === "bn" && cat.name_bn ? cat.name_bn : cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sub-Category Pills for Circular Knitting */}
          {(selectedCategory === "circular-knitting" || selectedCategory === "all") && (
            <div className="flex items-center gap-1.5 overflow-x-auto pt-2 pb-1 scrollbar-none border-t border-slate-200/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
                {locale === "bn" ? "সার্কুলার টাইপ:" : "Sub-Types:"}
              </span>
              <button
                onClick={() => setSelectedSubCategory("all")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 cursor-pointer transition-colors ${
                  selectedSubCategory === "all"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {locale === "bn" ? "সব ধরনের নিটিং" : "All Circular Types"}
              </button>
              {CIRCULAR_SUB_CATEGORIES.map((sub) => (
                <button
                  key={sub.slug}
                  onClick={() => {
                    setSelectedCategory("circular-knitting");
                    setSelectedSubCategory(sub.slug);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 cursor-pointer transition-colors ${
                    selectedSubCategory === sub.slug
                      ? "bg-slate-900 text-white font-bold shadow-xs"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {locale === "bn" && sub.name_bn ? sub.name_bn : sub.name}
                </button>
              ))}
            </div>
          )}

          {/* Bottom Row: Search, Spec Filters, and Sort */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 pt-3 border-t border-[#E5E7EB]">
            {/* Search Input (4 cols) */}
            <div className="lg:col-span-4 relative">
              <Search className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={
                  locale === "bn"
                    ? "মডেল, ব্র্যান্ড বা স্পেসিফিকেশন দিয়ে খুঁজুন..."
                    : "Search model, brand, gauge, cylinder..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#2D2D2D] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Gauge Filter (2 cols) */}
            {availableGauges.length > 0 && (
              <div className="lg:col-span-2">
                <select
                  value={selectedGauge}
                  onChange={(e) => setSelectedGauge(e.target.value)}
                  className="w-full py-2 px-3 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#2D2D2D] focus:outline-none focus:border-[#800020]"
                  aria-label="Filter by gauge"
                >
                  <option value="all">All Gauges ({availableGauges.length})</option>
                  {availableGauges.map((g) => (
                    <option key={g} value={g}>
                      Gauge: {g}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Cylinder Diameter Filter (2 cols) */}
            {availableDiameters.length > 0 && (
              <div className="lg:col-span-2">
                <select
                  value={selectedDiameter}
                  onChange={(e) => setSelectedDiameter(e.target.value)}
                  className="w-full py-2 px-3 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#2D2D2D] focus:outline-none focus:border-[#800020]"
                  aria-label="Filter by cylinder diameter"
                >
                  <option value="all">All Diameters ({availableDiameters.length})</option>
                  {availableDiameters.map((d) => (
                    <option key={d} value={d}>
                      Dia: {d}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Availability Filter (2 cols) */}
            <div className="lg:col-span-2">
              <select
                value={selectedAvailability}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="w-full py-2 px-3 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#2D2D2D] focus:outline-none focus:border-[#800020]"
                aria-label="Filter by availability"
              >
                <option value="all">All Availability</option>
                <option value="in-stock">In Stock</option>
                <option value="made-to-order">Made to Order</option>
                <option value="contact-for-availability">Contact for details</option>
              </select>
            </div>

            {/* Sort Options (2 cols) */}
            <div className="lg:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-2 px-3 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#2D2D2D] focus:outline-none focus:border-[#800020]"
                aria-label="Sort machinery"
              >
                <option value="newest">Sort: Newest Added</option>
                <option value="name-asc">Sort: Name (A – Z)</option>
                <option value="name-desc">Sort: Name (Z – A)</option>
                <option value="price-asc">Sort: Price (Low → High)</option>
                <option value="price-desc">Sort: Price (High → Low)</option>
              </select>
            </div>
          </div>

          {/* Active Filter Badges & Clear Button */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-slate-500 font-medium">Active filters:</span>
                {selectedCategory !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#FDF2F4] text-[#800020] border border-[#D8A4AF] font-semibold text-[11px]">
                    Category: {CATEGORIES.find((c) => c.slug === selectedCategory)?.name}
                    <button onClick={() => setSelectedCategory("all")}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200 text-[11px]">
                    &quot;{searchQuery}&quot;
                    <button onClick={() => setSearchQuery("")}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedGauge !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200 text-[11px]">
                    Gauge: {selectedGauge}
                    <button onClick={() => setSelectedGauge("all")}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedDiameter !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200 text-[11px]">
                    Dia: {selectedDiameter}
                    <button onClick={() => setSelectedDiameter("all")}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedAvailability !== "all" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200 text-[11px]">
                    Status: {selectedAvailability.replace(/-/g, " ")}
                    <button onClick={() => setSelectedAvailability("all")}><X className="w-3 h-3" /></button>
                  </span>
                )}
              </div>

              <button
                onClick={clearAllFilters}
                className="text-[#800020] font-semibold hover:underline cursor-pointer text-xs"
              >
                Clear all filters
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
        <div className="flex items-center justify-between mb-6 text-xs text-slate-500 font-medium">
          <p>
            Showing <span className="font-bold text-slate-900">{paginatedMachines.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to{" "}
            <span className="font-bold text-slate-900">
              {Math.min(currentPage * itemsPerPage, sortedMachines.length)}
            </span>{" "}
            of <span className="font-bold text-slate-900">{sortedMachines.length}</span> machinery listings
          </p>
          {totalPages > 1 && (
            <p>
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>

        {/* Grid Results */}
        {paginatedMachines.length > 0 ? (
          <StaggerContainer
            staggerDelay={0.06}
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
              {locale === "bn" ? "আপনার খোঁজার সাথে মেলে এমন কোনো মেশিন পাওয়া যায়নি" : "No machinery matches your filter criteria"}
            </h3>
            <p className="text-xs text-[#4B5563] mt-1 max-w-md mx-auto">
              {locale === "bn"
                ? "ফিল্টারের Gauge বা Cylinder সাইজ পরিবর্তন করে দেখুন অথবা আমাদের সাথে সরাসরি যোগাযোগ করুন।"
                : "Try adjusting your gauge, cylinder diameter, or search keywords, or submit a custom inquiry."}
            </p>
            <button
              onClick={clearAllFilters}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#800020] text-white text-xs font-semibold hover:bg-[#5A0017] transition-colors"
            >
              {locale === "bn" ? "সব ফিল্টার রিসেট করুন" : "Reset All Filters"}
            </button>
          </div>
        )}

        {/* Pagination Navigation */}
        {totalPages > 1 && (
          <div className="mt-12 pt-6 border-t border-[#E5E7EB] flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-[#E5E7EB] text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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
              className="p-2 rounded-lg border border-[#E5E7EB] text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
