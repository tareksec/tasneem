"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
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
  Wrench,
  HelpCircle,
  Building2,
  User,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useCustomerAuth } from "@/lib/customer/customer-context";

export function Header() {
  const { customer } = useCustomerAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [machinesDropdownOpen, setMachinesDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileMachinesOpen, setMobileMachinesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const machinesDropdownRef = useRef<HTMLDivElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { dict, locale } = useTranslation();

  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const scrollPositionOnCollapse = useRef(0);
  const manualExpandScrollY = useRef<number | null>(null);
  const manualExpandScrollReadyAt = useRef<number>(0);

  // Scroll detection to smoothly shrink / expand the navbar
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;

    // A manually opened navbar returns to its compact state on the next scroll.
    if (manualExpandScrollY.current !== null) {
      // Ignore the tail of the smooth-scroll gesture that was already running
      // when the user clicked Menu. Without this grace period the navbar opens
      // and immediately collapses again, which looks like a crash.
      if (performance.now() < manualExpandScrollReadyAt.current) {
        manualExpandScrollY.current = latest;
        lastScrollY.current = latest;
        setScrolled(latest > 20);
        return;
      }

      if (Math.abs(latest - manualExpandScrollY.current) > 12 && latest > 50) {
        manualExpandScrollY.current = null;
        setIsExpanded(false);
        setMobileMenuOpen(false);
        setMobileMachinesOpen(false);
        setMobileServicesOpen(false);
        setMobileAboutOpen(false);
        setMachinesDropdownOpen(false);
        setServicesDropdownOpen(false);
        setAboutDropdownOpen(false);
        scrollPositionOnCollapse.current = latest;
      }

      lastScrollY.current = latest;
      setScrolled(latest > 20);
      return;
    }

    // Scrolling down past 120px -> shrink into compact pill
    if (isExpanded && latest > previous && latest > 120) {
      setIsExpanded(false);
      setMachinesDropdownOpen(false);
      setServicesDropdownOpen(false);
      setAboutDropdownOpen(false);
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

  // Close the expanded mobile navigation on Escape key press
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
      if (
        machinesDropdownRef.current &&
        !machinesDropdownRef.current.contains(event.target as Node)
      ) {
        setMachinesDropdownOpen(false);
      }
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target as Node)
      ) {
        setServicesDropdownOpen(false);
      }
      if (
        aboutDropdownRef.current &&
        !aboutDropdownRef.current.contains(event.target as Node)
      ) {
        setAboutDropdownOpen(false);
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
          const iconMap: Record<string, LucideIcon> = {
            "circular-knitting": Cpu,
            dyeing: Layers,
            shearing: Sliders,
            finishing: Box,
            other: Sparkles,
          };
          const mapped = data.mainCategories.map((c: {
            slug: string;
            name: string;
            name_bn?: string;
            tagline?: string;
            tagline_bn?: string;
            description?: string;
          }) => ({
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

  const handleCompactMenuClick = () => {
    manualExpandScrollY.current = scrollY.get();
    manualExpandScrollReadyAt.current = performance.now() + 700;
    setIsExpanded(true);
    setMobileMenuOpen(window.matchMedia("(max-width: 1023px)").matches);
  };

  return (
    <>
      <motion.header
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
      animate={{
        opacity: 1,
        y: 0,
        maxWidth: isExpanded ? "1080px" : "480px",
      }}
      transition={{
        type: "spring",
        damping: 24,
        stiffness: 280,
      }}
      className="sticky top-3 sm:top-4 z-50 mx-auto w-[calc(100%-1.25rem)] sm:w-[calc(100%-2.5rem)]"
    >
      {/* Floating Capsule Bar */}
      <div
        className={`rounded-full backdrop-blur-xl sm:backdrop-blur-2xl transition-all duration-300 px-3.5 sm:px-4.5 py-1 sm:py-1.5 flex items-center justify-between relative ${
          scrolled
            ? "bg-white/85 border border-white/90 shadow-[0_12px_40px_rgba(0,0,0,0.1)]"
            : "bg-white/60 border border-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
        }`}
      >
        {/* Left: Brand Logo */}
        <Link
          href="/"
          className={`${isExpanded ? "flex" : "hidden sm:flex"} items-center gap-1.5 sm:gap-2 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-lg`}
          aria-label="Tasneem Knit Industry Home"
        >
          <div
            className={`relative transition-all duration-300 flex items-center ${
              isExpanded ? "h-6.5 sm:h-7.5 w-24 sm:w-28" : "h-6 sm:h-7 w-20 sm:w-24"
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

        {/* Center: Streamlined Desktop Navigation Links (5 Clean Tabs) */}
        {isExpanded && (
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 text-xs xl:text-[13px] font-semibold text-neutral-800 animate-in fade-in duration-200">
            {/* 1. Machines Dropdown */}
            <div
              ref={machinesDropdownRef}
              className="relative shrink-0 py-1"
              onMouseEnter={() => {
                setMachinesDropdownOpen(true);
                setServicesDropdownOpen(false);
                setAboutDropdownOpen(false);
              }}
              onMouseLeave={() => setMachinesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setMachinesDropdownOpen(!machinesDropdownOpen)}
                className="flex items-center gap-1 whitespace-nowrap hover:text-[#800020] transition-colors py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-md px-2"
                aria-expanded={machinesDropdownOpen}
                aria-haspopup="true"
              >
                <span>{dict.nav.machines}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${
                    machinesDropdownOpen ? "rotate-180 text-[#800020]" : ""
                  }`}
                />
              </button>

              {/* Machines Dropdown Menu */}
              <AnimatePresence>
                {machinesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.98 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[340px] max-w-[90vw] z-[100] text-xs pointer-events-auto"
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

            {/* 2. Projects Link */}
            <Link
              href="/projects"
              className="whitespace-nowrap shrink-0 hover:text-[#800020] transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-md px-2"
            >
              {dict.nav.projects}
            </Link>

            {/* 3. Services Dropdown (Services + How It Works) */}
            <div
              ref={servicesDropdownRef}
              className="relative shrink-0 py-1"
              onMouseEnter={() => {
                setServicesDropdownOpen(true);
                setMachinesDropdownOpen(false);
                setAboutDropdownOpen(false);
              }}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className="flex items-center gap-1 whitespace-nowrap hover:text-[#800020] transition-colors py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-md px-2"
                aria-expanded={servicesDropdownOpen}
                aria-haspopup="true"
              >
                <span>{dict.nav.services}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${
                    servicesDropdownOpen ? "rotate-180 text-[#800020]" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.98 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[290px] z-[100] text-xs pointer-events-auto"
                  >
                    <div className="rounded-2xl bg-white/95 backdrop-blur-2xl border border-neutral-200/90 shadow-2xl p-2 space-y-1">
                      <Link
                        href="/services"
                        onClick={() => setServicesDropdownOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#FDF2F4] text-[#800020] group-hover:bg-[#800020] group-hover:text-white flex items-center justify-center shrink-0 transition-colors mt-0.5">
                          <Wrench className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-neutral-900 group-hover:text-[#800020] transition-colors">
                            {dict.nav.services}
                          </div>
                          <div className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                            {locale === "bn" ? "ইনস্টলেশন ও টেকনিক্যাল সার্ভিস" : "Technical service & maintenance"}
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="/how-it-works"
                        onClick={() => setServicesDropdownOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-700 group-hover:bg-[#800020] group-hover:text-white flex items-center justify-center shrink-0 transition-colors mt-0.5">
                          <HelpCircle className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-neutral-900 group-hover:text-[#800020] transition-colors">
                            {dict.nav.howItWorks}
                          </div>
                          <div className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                            {locale === "bn" ? "আমদানি ও ডেলিভারি প্রক্রিয়া" : "Import, LC & commissioning steps"}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 4. About Dropdown (About Tasneem + Founder + Blog) */}
            <div
              ref={aboutDropdownRef}
              className="relative shrink-0 py-1"
              onMouseEnter={() => {
                setAboutDropdownOpen(true);
                setMachinesDropdownOpen(false);
                setServicesDropdownOpen(false);
              }}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                className="flex items-center gap-1 whitespace-nowrap hover:text-[#800020] transition-colors py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-md px-2"
                aria-expanded={aboutDropdownOpen}
                aria-haspopup="true"
              >
                <span>{dict.nav.about}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${
                    aboutDropdownOpen ? "rotate-180 text-[#800020]" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {aboutDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.98 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[295px] z-[100] text-xs pointer-events-auto"
                  >
                    <div className="rounded-2xl bg-white/95 backdrop-blur-2xl border border-neutral-200/90 shadow-2xl p-2 space-y-1">
                      <Link
                        href="/about"
                        onClick={() => setAboutDropdownOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-700 group-hover:bg-[#800020] group-hover:text-white flex items-center justify-center shrink-0 transition-colors mt-0.5">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-neutral-900 group-hover:text-[#800020] transition-colors">
                            {locale === "bn" ? "কোম্পানি পরিচিতি" : "About Tasneem"}
                          </div>
                          <div className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                            {locale === "bn" ? "২৫+ বছরের অভিজ্ঞতা ও ঐতিহ্য" : "25+ years textile machinery legacy"}
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="/founder"
                        onClick={() => setAboutDropdownOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#FDF2F4] text-[#800020] group-hover:bg-[#800020] group-hover:text-white flex items-center justify-center shrink-0 transition-colors mt-0.5">
                          <User className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-neutral-900 group-hover:text-[#800020] transition-colors">
                            {dict.nav.founder}
                          </div>
                          <div className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                            {locale === "bn" ? "মোঃ মামুনুর রশীদ - দর্শন ও বক্তব্য" : "Md. Mamunur Rashid - Leadership"}
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="/blog"
                        onClick={() => setAboutDropdownOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-700 group-hover:bg-[#800020] group-hover:text-white flex items-center justify-center shrink-0 transition-colors mt-0.5">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-neutral-900 group-hover:text-[#800020] transition-colors">
                            {locale === "bn" ? "ব্লগ ও ইন্ডাস্ট্রি নিউজ" : "Blog & Insights"}
                          </div>
                          <div className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                            {locale === "bn" ? "নিটিং প্রযুক্তি ও টেক্সটাইল আপডেট" : "Textile machinery news & trends"}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 5. Contact Link */}
            <Link
              href="/contact"
              className="whitespace-nowrap shrink-0 hover:text-[#800020] transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-md px-2"
            >
              {dict.nav.contact}
            </Link>
          </nav>
        )}

        {/* Right: Actions (Language, Log In, Primary CTA, or Compact Trigger) */}
        <div className={`${isExpanded ? "flex gap-1.5 sm:gap-2 xl:gap-2.5 shrink-0" : "flex w-full sm:w-auto justify-center gap-1.5"} items-center`}>
          {isExpanded ? (
            <div className="flex items-center gap-1.5 sm:gap-2 xl:gap-2.5 animate-in fade-in duration-200">
              {/* Subtle Language Pill */}
              <LanguageSwitcher variant="capsule" />

              {/* Vertical Divider separating language toggle from user actions */}
              <span className="hidden md:block h-3.5 w-px bg-neutral-200/90 shrink-0" aria-hidden="true" />

              {/* Grouped User & Conversion CTAs */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {customer ? (
                  <Link
                    href="/account/quotes"
                    className="hidden md:inline-flex whitespace-nowrap shrink-0 text-xs font-bold text-[#800020] hover:text-[#5A0017] transition-colors px-2.5 xl:px-3 py-1.5 rounded-lg bg-[#FDF2F4] border border-[#D8A4AF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]"
                  >
                    <span>{locale === "bn" ? "আমার কোটেশন" : "My Quotes"}</span>
                  </Link>
                ) : (
                  <Link
                    href="/account/login"
                    className="hidden md:inline-flex whitespace-nowrap shrink-0 text-xs font-semibold text-[#2D2D2D] hover:text-[#800020] transition-colors px-2 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-md"
                  >
                    {locale === "bn" ? "ক্রেতা পোর্টাল" : "Buyer Portal"}
                  </Link>
                )}

                {/* Primary CTA: Solid Burgundy Capsule Button */}
                <Link
                  href="/quote"
                  className="hidden min-[420px]:inline-flex whitespace-nowrap shrink-0 bg-[#800020] hover:bg-[#5A0017] active:scale-[0.98] text-white px-3 xl:px-4 py-1.5 sm:py-2 rounded-full text-xs xl:text-sm font-semibold transition-all duration-200 shadow-xs items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-2"
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
                  handleCompactMenuClick();
                }}
                className="min-h-9 px-2.5 sm:px-3 py-1.5 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]"
                title={locale === "bn" ? "মেনু খুলুন" : "Open menu"}
                aria-label={locale === "bn" ? "মেনু খুলুন" : "Open menu"}
              >
                <Menu className="w-3.5 h-3.5" />
                <span className="hidden min-[380px]:inline text-[11px] font-semibold">{locale === "bn" ? "মেনু" : "Menu"}</span>
              </button>

              <LanguageSwitcher variant="capsule" />

              <Link
                href="/machines"
                onClick={(e) => e.stopPropagation()}
                className="min-h-9 px-3 sm:px-4 py-1.5 rounded-full bg-[#800020] hover:bg-[#600018] text-white text-[11px] sm:text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-2"
              >
                <span>{locale === "bn" ? "পণ্যসমূহ" : "Products"}</span>
                <ArrowRight className="hidden sm:block w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.header>

    {/* Small-screen navigation expands below the navbar instead of using a side drawer. */}
    <AnimatePresence>
      {mobileMenuOpen && (
          <motion.div
            key="expanded-mobile-nav"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-1.25rem)] sm:w-[calc(100%-2.5rem)] max-w-2xl max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-3xl bg-white/95 backdrop-blur-2xl shadow-2xl p-4 sm:p-6 border border-white/80 lg:hidden"
            data-lenis-prevent
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
                  {/* Services Accordion */}
                  <div>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="flex items-center justify-between w-full py-2.5 px-3 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]"
                    >
                      <span>{dict.nav.services}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${
                          mobileServicesOpen ? "rotate-180 text-black" : ""
                        }`}
                      />
                    </button>
                    {mobileServicesOpen && (
                      <div className="pl-4 pr-1 py-1 flex flex-col gap-1 border-l-2 border-[#800020]/20 ml-3 mt-1">
                        <Link
                          href="/services"
                          onClick={() => setMobileMenuOpen(false)}
                          className="py-2 px-3 text-xs font-medium text-neutral-700 hover:text-black rounded-lg hover:bg-neutral-50 flex items-center justify-between"
                        >
                          <span>{dict.nav.services}</span>
                          <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                        </Link>
                        <Link
                          href="/how-it-works"
                          onClick={() => setMobileMenuOpen(false)}
                          className="py-2 px-3 text-xs font-medium text-neutral-700 hover:text-black rounded-lg hover:bg-neutral-50 flex items-center justify-between"
                        >
                          <span>{dict.nav.howItWorks}</span>
                          <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* About Accordion */}
                  <div>
                    <button
                      onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                      className="flex items-center justify-between w-full py-2.5 px-3 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]"
                    >
                      <span>{dict.nav.about}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${
                          mobileAboutOpen ? "rotate-180 text-black" : ""
                        }`}
                      />
                    </button>
                    {mobileAboutOpen && (
                      <div className="pl-4 pr-1 py-1 flex flex-col gap-1 border-l-2 border-[#800020]/20 ml-3 mt-1">
                        <Link
                          href="/about"
                          onClick={() => setMobileMenuOpen(false)}
                          className="py-2 px-3 text-xs font-medium text-neutral-700 hover:text-black rounded-lg hover:bg-neutral-50 flex items-center justify-between"
                        >
                          <span>{locale === "bn" ? "কোম্পানি পরিচিতি" : "About Tasneem"}</span>
                          <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                        </Link>
                        <Link
                          href="/founder"
                          onClick={() => setMobileMenuOpen(false)}
                          className="py-2 px-3 text-xs font-medium text-neutral-700 hover:text-black rounded-lg hover:bg-neutral-50 flex items-center justify-between"
                        >
                          <span>{dict.nav.founder}</span>
                          <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                        </Link>
                        <Link
                          href="/blog"
                          onClick={() => setMobileMenuOpen(false)}
                          className="py-2 px-3 text-xs font-medium text-neutral-700 hover:text-black rounded-lg hover:bg-neutral-50 flex items-center justify-between"
                        >
                          <span>{locale === "bn" ? "ব্লগ ও নিউজ" : "Blog & Insights"}</span>
                          <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                        </Link>
                      </div>
                    )}
                  </div>

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
        )}
      </AnimatePresence>
    </>
  );
}
