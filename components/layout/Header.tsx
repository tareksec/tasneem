"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Menu, X, ChevronDown, ArrowUpRight, Cpu, Layers, Sparkles, Sliders, Box, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { COMPANY_INFO } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useCustomerAuth } from "@/lib/customer/customer-context";

export function Header() {
  const { customer } = useCustomerAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [machinesDropdownOpen, setMachinesDropdownOpen] = useState(false);
  const [mobileMachinesOpen, setMobileMachinesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { dict, locale } = useTranslation();

    // Handle scroll state for adaptive glass transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open to prevent background scrolling
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
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

  return (
    <motion.header
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="sticky top-3 sm:top-4 z-50 mx-auto w-[calc(100%-1.25rem)] sm:w-[calc(100%-2.5rem)] max-w-6xl"
    >
      {/* Floating Capsule Bar */}
      <div
        className={`rounded-full backdrop-blur-xl sm:backdrop-blur-2xl transition-all duration-300 px-2.5 sm:px-6 py-1.5 sm:py-2.5 flex items-center justify-between ${
          scrolled
            ? "bg-white/65 border border-white/80 shadow-[0_12px_40px_rgba(0,0,0,0.09)]"
            : "bg-white/40 border border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
        }`}
      >
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-1.5 sm:gap-3 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-lg" aria-label="Tasneem Knit Industry Home">
          <div className="relative h-7 sm:h-9 w-28 sm:w-40 flex items-center">
            <Image
              src="/logo/nave-var.png"
              alt="Tasneem Knitting Industry Logo"
              fill
              className="object-contain object-left group-hover:opacity-90 transition-opacity"
              priority
            />
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-semibold text-neutral-800">
          {/* Machines Dropdown (Features ∨ style) */}
          <div
            ref={dropdownRef}
            className="relative shrink-0"
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
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 rounded-2xl bg-white/85 backdrop-blur-2xl border border-white/80 shadow-2xl p-3 z-50 text-xs"
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-3 py-1 mb-1">
                    {locale === "bn" ? "মেশিন ক্যাটাগরি" : "Machine Categories"}
                  </div>

                  <div className="grid grid-cols-1 gap-1">
                    {machineCategories.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <Link
                          key={cat.slug}
                          href={`/machines/${cat.slug}`}
                          onClick={() => setMachinesDropdownOpen(false)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-neutral-100 group-hover:bg-[#800020] group-hover:text-white text-neutral-700 flex items-center justify-center shrink-0 transition-colors mt-0.5">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-neutral-900 group-hover:text-black">
                              {cat.name}
                            </div>
                            <div className="text-[11px] text-neutral-500 line-clamp-1">
                              {cat.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-neutral-200/80 px-1">
                    <Link
                      href="/machines"
                      onClick={() => setMachinesDropdownOpen(false)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-[#800020] to-[#5A0017] text-white font-bold hover:shadow-md hover:brightness-110 active:scale-[0.99] transition-all text-xs group/btn shadow-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                        <span className="font-bold">{locale === "bn" ? "সব মেশিন মডেল দেখুন" : "View All Machine Models"}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded-full text-white group-hover/btn:translate-x-0.5 transition-transform shrink-0">
                        <span>{locale === "bn" ? "সকল ক্যাটালগ" : "All Models"}</span>
                        <ArrowRight className="w-3 h-3 text-white" />
                      </span>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/projects" className="whitespace-nowrap shrink-0 hover:text-black transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-md px-1">
            {dict.nav.projects}
          </Link>
          <Link href="/services" className="whitespace-nowrap shrink-0 hover:text-black transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-md px-1">
            {dict.nav.services}
          </Link>
          <Link href="/how-it-works" className="whitespace-nowrap shrink-0 hover:text-black transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-md px-1">
            {dict.nav.howItWorks}
          </Link>
          <Link href="/about" className="whitespace-nowrap shrink-0 hover:text-black transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-md px-1">
            {dict.nav.about}
          </Link>
          <Link href="/blog" className="whitespace-nowrap shrink-0 hover:text-black transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-md px-1">
            {locale === "bn" ? "ব্লগ" : "Blog"}
          </Link>
          <Link href="/contact" className="whitespace-nowrap shrink-0 hover:text-black transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-md px-1">
            {dict.nav.contact}
          </Link>
        </nav>

        {/* Right: Actions (Language, Log In, Primary CTA) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Subtle Language Pill */}
          <LanguageSwitcher variant="capsule" />

          {/* Vertical Divider separating language toggle from user actions (Issue 25) */}
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

          {/* Mobile Hamburger Button with comfortable min 44x44px touch target */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden min-w-[44px] min-h-[44px] rounded-full bg-neutral-100 text-neutral-800 hover:bg-neutral-200 active:scale-[0.96] transition-all flex items-center justify-center shrink-0 ml-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Off-Canvas Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Dimmed Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden"
              aria-hidden="true"
            />

            {/* Slide-in Drawer */}
            <motion.div
              key="mobile-drawer"
              initial={{ x: shouldReduceMotion ? 0 : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: shouldReduceMotion ? 0 : "100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-xs bg-white/95 backdrop-blur-2xl shadow-2xl flex flex-col justify-between p-4 sm:p-6 lg:hidden border-l border-white/60"
            >
              <div className="overflow-y-auto flex-1 min-h-0 pr-1">
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <div className="relative h-6 sm:h-7 w-28 sm:w-32 flex items-center">
                    <Image
                      src="/logo/nave-var.png"
                      alt="Tasneem Logo"
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-w-[44px] min-h-[44px] rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors flex items-center justify-center cursor-pointer"
                    aria-label="Close navigation menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="flex flex-col gap-1 pt-3 text-sm font-medium text-neutral-800">
                  {/* Machines Accordion in Mobile */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setMobileMachinesOpen(!mobileMachinesOpen)}
                      className="w-full min-h-[44px] py-2.5 px-3 rounded-xl hover:bg-neutral-50 flex items-center justify-between text-left font-semibold cursor-pointer"
                    >
                      <span>{dict.nav.machines}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-neutral-400 transition-transform ${
                          mobileMachinesOpen ? "rotate-180 text-black" : ""
                        }`}
                      />
                    </button>

                    {mobileMachinesOpen && (
                      <div className="pl-4 pr-2 py-1 flex flex-col gap-1 bg-neutral-50 rounded-xl my-1">
                        {machineCategories.map((cat) => (
                          <Link
                            key={cat.slug}
                            href={`/machines/${cat.slug}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="min-h-[38px] flex items-center py-1.5 px-2 text-xs text-neutral-600 hover:text-black rounded-lg"
                          >
                            {cat.name}
                          </Link>
                        ))}
                        <Link
                          href="/machines"
                          onClick={() => setMobileMenuOpen(false)}
                          className="min-h-[42px] flex items-center justify-between py-2 px-3 text-xs font-bold bg-gradient-to-r from-[#800020] to-[#5A0017] text-white rounded-xl shadow-xs mt-2 transition-all hover:brightness-110 active:scale-[0.99]"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>{locale === "bn" ? "সব মেশিন মডেল দেখুন" : "View All Machine Models"}</span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-white" />
                        </Link>
                      </div>
                    )}
                  </div>

                  <Link
                    href="/projects"
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-h-[44px] flex items-center py-2.5 px-3 rounded-xl hover:bg-neutral-50"
                  >
                    {dict.nav.projects}
                  </Link>
                  <Link
                    href="/services"
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-h-[44px] flex items-center py-2.5 px-3 rounded-xl hover:bg-neutral-50"
                  >
                    {dict.nav.services}
                  </Link>
                  <Link
                    href="/how-it-works"
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-h-[44px] flex items-center py-2.5 px-3 rounded-xl hover:bg-neutral-50"
                  >
                    {dict.nav.howItWorks}
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-h-[44px] flex items-center py-2.5 px-3 rounded-xl hover:bg-neutral-50"
                  >
                    {dict.nav.about}
                  </Link>
                  <Link
                    href="/blog"
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-h-[44px] flex items-center py-2.5 px-3 rounded-xl hover:bg-neutral-50"
                  >
                    {locale === "bn" ? "ব্লগ ও গাইড" : "Blog & Guides"}
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-h-[44px] flex items-center py-2.5 px-3 rounded-xl hover:bg-neutral-50"
                  >
                    {dict.nav.contact}
                  </Link>
                  <Link
                    href={customer ? "/account/quotes" : "/account/login"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-h-[44px] py-2.5 px-3 rounded-xl font-bold text-[#800020] hover:bg-[#FDF2F4] flex items-center justify-between"
                  >
                    <span>{customer ? (locale === "bn" ? "আমার কোটেশন (My Quotes)" : "My Quotes & Inquiries") : (locale === "bn" ? "ক্রেতা পোর্টাল" : "Buyer Account Portal")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/admin/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-h-[40px] flex items-center py-2 px-3 rounded-xl text-neutral-400 hover:text-neutral-700 text-xs"
                  >
                    {locale === "bn" ? "স্টাফ পোর্টাল লগইন" : "Staff Administration"}
                  </Link>
                </nav>
              </div>

              {/* Drawer Bottom Actions */}
              <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2 shrink-0">
                <Link
                  href="/quote"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full min-h-[44px] bg-[#800020] hover:bg-[#5A0017] text-white text-center py-2.5 rounded-full font-semibold text-sm transition-colors shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span>{dict.nav.requestQuote}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] border border-neutral-200 bg-white text-neutral-800 text-center py-2 rounded-full font-medium text-xs flex items-center justify-center gap-2 hover:bg-neutral-50 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{dict.common.chatWhatsApp}: <strong className="font-mono font-bold text-emerald-700">{COMPANY_INFO.whatsappFormatted}</strong></span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
