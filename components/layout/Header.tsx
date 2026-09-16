"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  Cpu,
  Layers,
  Sparkles,
  Sliders,
  Box,
  ArrowRight,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { COMPANY_INFO } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useCustomerAuth } from "@/lib/customer/customer-context";
import { useLenis } from "lenis/react";

export function Header() {
  const { customer } = useCustomerAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [machinesDropdownOpen, setMachinesDropdownOpen] = useState(false);
  const [mobileMachinesOpen, setMobileMachinesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { dict, locale } = useTranslation();

  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const scrollPositionOnCollapse = useRef(0);

  // Scroll detection to smoothly shrink / expand the navbar
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;

    // Scrolling down past 120px -> shrink into compact pill
    if (isExpanded && latest > previous && latest > 120) {
      setIsExpanded(false);
      scrollPositionOnCollapse.current = latest;
    }
    // Scrolling up by >60px or reaching near top (<50px) -> expand back
    else if (
      !isExpanded &&
      (latest < 50 || (latest < previous && scrollPositionOnCollapse.current - latest > 60))
    ) {
      setIsExpanded(true);
    }

    lastScrollY.current = latest;
    setScrolled(latest > 20);
  });

  // Close machines dropdown when navbar collapses
  useEffect(() => {
    if (!isExpanded) {
      setMachinesDropdownOpen(false);
    }
  }, [isExpanded]);

  const lenis = useLenis();

  // Lock body scroll and pause Lenis virtual scrolling when menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
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
  }, [mobileMenuOpen, lenis]);

  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMachinesDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const defaultMachineCategories = [
    {
      slug: "circular-knitting",
      name: locale === "bn" ? "সার্কুলার নিটিং মেশিন" : "Circular Knitting Machines",
      desc: locale === "bn" ? "ডাবল জার্সি, সিঙ্গেল জার্সি, ইন্টারলক ও জ্যাকার্ড" : "Single/Double jersey, interlock & terry",
      icon: Cpu,
    },
    {
      slug: "dyeing",
      name: locale === "bn" ? "ডাইং মেশিন" : "Dyeing Machines",
      desc: locale === "bn" ? "হাই-টেম্পারেচার ও সাশ্রয়ী ফ্যাব্রিক ডাইং" : "High-temperature eco-dyeing vessels",
      icon: Layers,
    },
    {
      slug: "shearing",
      name: locale === "bn" ? "শিয়ারিং মেশিন" : "Shearing Machines",
      desc: locale === "bn" ? "নিখুঁত সারফেস পাইল লেভেলিং ও কাটিং" : "Precision rotary pile shearing equipment",
      icon: Sliders,
    },
    {
      slug: "finishing",
      name: locale === "bn" ? "ফিনিশিং মেশিন" : "Finishing Machines",
      desc: locale === "bn" ? "কোয়ালিটি ইন্সপেকশন ও রোল উইন্ডিং" : "Fabric inspection, rolling & packaging",
      icon: Box,
    },
    {
      slug: "other",
      name: locale === "bn" ? "অন্যান্য যন্ত্রপাতি" : "Other Garments Machinery",
      desc: locale === "bn" ? "কমপ্যাক্টর, কলার মেশিন ও আসল স্পেয়ার্স" : "Stenters, compactors & spare accessories",
      icon: Sparkles,
    },
  ];

  const [machineCategories, setMachineCategories] = useState(defaultMachineCategories);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data?.mainCategories && Array.isArray(data.mainCategories)) {
          const iconMap: Record<string, any> = {
            "circular-knitting": Cpu,
            dyeing: Layers,
            shearing: Sliders,
            finishing: Box,
            other: Sparkles,
          };
          const mapped = data.mainCategories.map((c: any) => ({
            slug: c.slug,
            name: locale === "bn" && c.name_bn ? c.name_bn : c.name,
            desc: locale === "bn" && c.tagline_bn ? c.tagline_bn : (c.tagline || c.description || "Machinery for textile production"),
            icon: iconMap[c.slug] || Cpu,
          }));
          setMachineCategories(mapped);
        }
      })
      .catch(() => {});
  }, [locale]);

  const handleNavClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  return (
    <>
      <motion.header
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
      animate={{
        opacity: 1,
        y: 0,
        maxWidth: isExpanded ? "1152px" : "280px",
      }}
      transition={{
        type: "spring",
        damping: 24,
        stiffness: 280,
      }}
      onClick={handleNavClick}
      className={`sticky top-3 sm:top-4 z-50 mx-auto w-[calc(100%-1.25rem)] sm:w-[calc(100%-2.5rem)] ${
        !isExpanded ? "cursor-pointer" : ""
      }`}
    >
      {/* Floating Capsule Bar */}
      <div
        className={`rounded-full backdrop-blur-xl sm:backdrop-blur-2xl transition-all duration-300 px-3 sm:px-6 py-1.5 sm:py-2.5 flex items-center justify-between relative ${
          scrolled
            ? "bg-white/85 border border-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.1)]"
            : "bg-white/60 border border-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
        }`}
      >
        {/* Left: Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-1.5 sm:gap-3 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-lg"
          aria-label="Tasneem Knit Industry Home"
        >
          <div
            className={`relative transition-all duration-300 flex items-center ${
              isExpanded ? "h-7 sm:h-9 w-28 sm:w-40" : "h-7 sm:h-8 w-24 sm:w-28"
            }`}
          >
            <Image
              src="/logo/nave-var.png"
              alt="Tasneem Knitting Industry Logo"
              fill
              className="object-contain object-left group-hover:opacity-90 transition-opacity"
              priority
            />
          </div>
        </Link>

        {/* Center: Desktop Navigation Links (Visible when expanded) */}
        {isExpanded && (
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-semibold text-neutral-800 animate-in fade-in duration-200">
            {/* Machines Dropdown (Features ∨ style) */}
            <div
              ref={dropdownRef}
              className="relative shrink-0 py-1"
              onMouseEnter={() => setMachinesDropdownOpen(true)}
              onMouseLeave={() => setMachinesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setMachinesDropdownOpen(!machinesDropdownOpen)}
                className="flex items-center gap-1 whitespace-nowrap hover:text-black transition-colors py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-md px-1"
                aria-expanded={machinesDropdownOpen}
                aria-haspopup="true"
              >
                <span>{dict.nav.machines}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-neutral-500 transition-transform duration-200 ${
                    machinesDropdownOpen ? "rotate-180 text-black" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {machinesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[350px] max-w-[90vw] z-[100] text-xs pointer-events-auto"
                  >
                    <div className="rounded-2xl bg-white/95 backdrop-blur-2xl border border-neutral-200/90 shadow-2xl p-3 space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-3 py-1 mb-1">
                        {locale === "bn" ? "মেশিন ক্যাটাগরি" : "Machine Categories"}
                      </div>

                      <div className="flex flex-col gap-1">
                        {machineCategories.map((cat) => {
                          const Icon = cat.icon;
                          return (
                            <Link
                              key={cat.slug}
                              href={`/machines/${cat.slug}`}
                              onClick={() => setMachinesDropdownOpen(false)}
                              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-neutral-100 group-hover:bg-[#800020] group-hover:text-white text-neutral-700 flex items-center justify-center shrink-0 transition-colors">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-neutral-900 group-hover:text-[#800020] transition-colors leading-tight">
                                  {cat.name}
                                </div>
                                <div className="text-[11px] text-neutral-500 truncate mt-0.5">
                                  {cat.desc}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      <div className="pt-2 border-t border-neutral-200/80 px-1">
                        <Link
                          href="/machines"
                          onClick={() => setMachinesDropdownOpen(false)}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-[#800020] to-[#5A0017] text-white font-bold hover:shadow-md hover:brightness-110 active:scale-[0.99] transition-all text-xs group/btn shadow-xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                            <span className="font-bold">
                              {locale === "bn" ? "সব মেশিন মডেল দেখুন" : "View All Machine Models"}
                            </span>
                          </div>
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded-full text-white group-hover/btn:translate-x-0.5 transition-transform shrink-0">
                            <span>{locale === "bn" ? "সকল ক্যাটালগ" : "All Models"}</span>
                            <ArrowRight className="w-3 h-3 text-white" />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/projects"
              className="whitespace-nowrap shrink-0 hover:text-black transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-md px-1"
            >
              {dict.nav.projects}
            </Link>
            <Link
              href="/services"
              className="whitespace-nowrap shrink-0 hover:text-black transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-md px-1"
            >
              {dict.nav.services}
            </Link>
            <Link
              href="/how-it-works"
              className="whitespace-nowrap shrink-0 hover:text-black transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-md px-1"
            >
              {dict.nav.howItWorks}
            </Link>
            <Link
              href="/about"
              className="whitespace-nowrap shrink-0 hover:text-black transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-md px-1"
            >
              {dict.nav.about}
            </Link>
            <Link
              href="/blog"
              className="whitespace-nowrap shrink-0 hover:text-black transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-md px-1"
            >
              {locale === "bn" ? "ব্লগ" : "Blog"}
            </Link>
            <Link
              href="/contact"
              className="whitespace-nowrap shrink-0 hover:text-black transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-md px-1"
            >
              {dict.nav.contact}
            </Link>
          </nav>
        )}

        {/* Right: Actions (Language, Log In, Primary CTA, or Compact Trigger) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {isExpanded ? (
            <div className="flex items-center gap-2 sm:gap-3 animate-in fade-in duration-200">
              {/* Subtle Language Pill */}
              <LanguageSwitcher variant="capsule" />

              {/* Vertical Divider separating language toggle from user actions */}
              <span className="hidden md:block h-4 w-px bg-neutral-200 shrink-0" aria-hidden="true" />

              {/* Grouped User & Conversion CTAs */}
              <div className="flex items-center gap-2">
                {customer ? (
                  <Link
                    href="/account/quotes"
                    className="hidden md:inline-flex whitespace-nowrap shrink-0 text-xs font-bold text-[#800020] hover:text-[#5A0017] transition-colors px-3 py-1.5 rounded-lg bg-[#FDF2F4] border border-[#D8A4AF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]"
                  >
                    <span>{locale === "bn" ? "আমার কোটেশন" : "My Quotes"}</span>
                  </Link>
                ) : (
                  <Link
                    href="/account/login"
                    className="hidden md:inline-flex whitespace-nowrap shrink-0 text-xs font-semibold text-[#2D2D2D] hover:text-black transition-colors px-2.5 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-md"
                  >
                    {locale === "bn" ? "ক্রেতা পোর্টাল" : "Buyer Portal"}
                  </Link>
                )}

                {/* Primary CTA: Solid Burgundy Capsule Button */}
                <Link
                  href="/quote"
                  className="hidden min-[420px]:inline-flex whitespace-nowrap shrink-0 bg-[#800020] hover:bg-[#5A0017] active:scale-[0.98] text-white px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 shadow-xs items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-2"
                >
                  <span>{dict.nav.requestQuote}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 hidden sm:inline" />
                </Link>
              </div>

              {/* Mobile Hamburger Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="lg:hidden min-w-[44px] min-h-[44px] rounded-full bg-neutral-100 text-neutral-800 hover:bg-neutral-200 active:scale-[0.96] transition-all flex items-center justify-center shrink-0 ml-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          ) : (
            /* Collapsed Compact State: Pill with Menu Trigger */
            <div className="flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-200">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileMenuOpen(true);
                }}
                className="px-3 py-1.5 rounded-full bg-[#800020] hover:bg-[#600018] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95"
                title={locale === "bn" ? "মেনু খুলুন" : "Open menu"}
                aria-label={locale === "bn" ? "মেনু খুলুন" : "Open menu"}
              >
                <Menu className="w-3.5 h-3.5" />
                <span className="text-[11px] font-semibold">{locale === "bn" ? "মেনু" : "Menu"}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.header>

    {/* Off-Canvas Navigation Drawer */}
    <AnimatePresence>
      {mobileMenuOpen && (
        <>
          {/* Dimmed Backdrop */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Slide-in Drawer */}
          <motion.div
            key="nav-drawer"
            initial={{ x: shouldReduceMotion ? 0 : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: shouldReduceMotion ? 0 : "100%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-[85vw] max-w-xs sm:max-w-sm bg-white/95 backdrop-blur-2xl shadow-2xl flex flex-col justify-between p-4 sm:p-6 border-l border-white/60"
          >
            <div
              className="flex flex-col gap-6 overflow-y-auto flex-1 min-h-0 pr-1"
              data-lenis-prevent
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                  <div className="relative h-7 w-28 flex items-center">
                    <Image
                      src="/logo/nave-var.png"
                      alt="Tasneem Knitting Industry Logo"
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-neutral-100 transition-colors text-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]"
                    aria-label="Close Navigation Menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <div className="flex flex-col gap-2 font-semibold text-neutral-800 text-sm">
                  <div>
                    <button
                      onClick={() => setMobileMachinesOpen(!mobileMachinesOpen)}
                      className="flex items-center justify-between w-full py-2.5 px-3 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]"
                    >
                      <span>{dict.nav.machines}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${
                          mobileMachinesOpen ? "rotate-180 text-black" : ""
                        }`}
                      />
                    </button>
                    {mobileMachinesOpen && (
                      <div className="pl-4 pr-1 py-1 flex flex-col gap-1 border-l-2 border-[#800020]/20 ml-3 mt-1">
                        {machineCategories.map((cat) => (
                          <Link
                            key={cat.slug}
                            href={`/machines/${cat.slug}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="py-2 px-3 text-xs font-medium text-neutral-600 hover:text-black rounded-lg hover:bg-neutral-50 flex items-center justify-between"
                          >
                            <span>{cat.name}</span>
                            <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                          </Link>
                        ))}
                        <Link
                          href="/machines"
                          onClick={() => setMobileMenuOpen(false)}
                          className="mt-1 py-2 px-3 text-xs font-bold text-[#800020] bg-rose-50/50 rounded-lg flex items-center justify-between"
                        >
                          <span>{locale === "bn" ? "সব মেশিন দেখুন" : "View All Machines"}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#800020]" />
                        </Link>
                      </div>
                    )}
                  </div>

                  <Link
                    href="/projects"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 px-3 rounded-xl hover:bg-neutral-50 transition-colors"
                  >
                    {dict.nav.projects}
                  </Link>
                  <Link
                    href="/services"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 px-3 rounded-xl hover:bg-neutral-50 transition-colors"
                  >
                    {dict.nav.services}
                  </Link>
                  <Link
                    href="/how-it-works"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 px-3 rounded-xl hover:bg-neutral-50 transition-colors"
                  >
                    {dict.nav.howItWorks}
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 px-3 rounded-xl hover:bg-neutral-50 transition-colors"
                  >
                    {dict.nav.about}
                  </Link>
                  <Link
                    href="/blog"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 px-3 rounded-xl hover:bg-neutral-50 transition-colors"
                  >
                    {locale === "bn" ? "ব্লগ" : "Blog"}
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 px-3 rounded-xl hover:bg-neutral-50 transition-colors"
                  >
                    {dict.nav.contact}
                  </Link>
                </div>
              </div>

              {/* Drawer Bottom Actions */}
              <div className="pt-4 border-t border-neutral-100 flex flex-col gap-3 shrink-0">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-medium text-neutral-500">
                    {locale === "bn" ? "ভাষা নির্বাচন:" : "Language:"}
                  </span>
                  <LanguageSwitcher variant="capsule" />
                </div>

                <Link
                  href="/quote"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-full bg-[#800020] text-white text-center font-bold text-sm shadow-md hover:bg-[#5A0017] transition-all flex items-center justify-center gap-2"
                >
                  <span>{dict.nav.requestQuote}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                {customer ? (
                  <Link
                    href="/account/quotes"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 rounded-full border border-[#D8A4AF] text-[#800020] bg-rose-50/50 text-center font-bold text-xs hover:bg-rose-50 transition-all"
                  >
                    {locale === "bn" ? "আমার কোটেশন সমূহ" : "My Quotes"}
                  </Link>
                ) : (
                  <Link
                    href="/account/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2.5 rounded-full border border-neutral-200 text-neutral-700 text-center font-semibold text-xs hover:bg-neutral-50 transition-all"
                  >
                    {locale === "bn" ? "ক্রেতা পোর্টাল লগইন" : "Buyer Portal Login"}
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
