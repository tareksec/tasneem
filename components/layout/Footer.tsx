"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Mail, ShieldCheck, ArrowUpRight, MessageCircle } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { OfficeMap } from "@/components/ui/OfficeMap";

export function Footer() {
  const { dict, locale } = useTranslation();

  return (
    <footer className="bg-[#2D2D2D] text-neutral-900 px-2.5 sm:px-6 lg:px-10 pt-8 sm:pt-14 pb-6 sm:pb-8 mt-auto">
      {/* Elevated Signature Rounded Card */}
      <div className="max-w-7xl mx-auto rounded-[24px] sm:rounded-[44px] lg:rounded-[48px] bg-[#F9F9F9] border border-neutral-200/80 shadow-[0_25px_60px_rgba(0,0,0,0.25)] relative overflow-hidden flex flex-col justify-between min-h-0 sm:min-h-[720px] lg:min-h-[800px]">
        {/* Giant Watermark behind top/middle section */}
        <div className="absolute top-[38%] sm:top-[36%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[17vw] lg:text-[15vw] font-black uppercase tracking-tighter text-neutral-900/[0.04] select-none pointer-events-none whitespace-nowrap z-0">
          TASNEEM
        </div>

        {/* Top Header & Structured Navigation */}
        <div className="relative z-10 px-4 sm:px-10 lg:px-14 pt-8 sm:pt-14 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Col 1: Brand Info & Identity (LG: 4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link href="/" className="flex items-center gap-2 w-fit group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-lg" aria-label="Tasneem Knit Industry Home">
                <div className="relative h-8 sm:h-10 w-36 sm:w-48 flex items-center">
                  <Image
                    src="/logo/nave-var.png"
                    alt="Tasneem Knitting Industry Logo"
                    fill
                    className="object-contain object-left group-hover:opacity-90 transition-opacity"
                  />
                </div>
              </Link>
              <p className="text-xs sm:text-sm font-semibold text-[#2D2D2D] flex items-center gap-1.5 mt-0.5">
                {locale === "bn"
                  ? "টেক্সটাইল ও নিট মিলের বিশ্বস্ত মেশিনারি পার্টনার ⚙️"
                  : "Engineered for Bangladesh Mills ⚙️"}
              </p>
              <p className="text-xs text-neutral-500 leading-relaxed max-w-sm mt-1">
                {dict.footer.description}
              </p>

              {/* Compliance Info Card */}
              <div className="flex flex-col gap-1.5 text-xs text-neutral-600 bg-white/80 backdrop-blur-xs p-3 sm:p-3.5 rounded-2xl border border-neutral-200/90 shadow-2xs mt-2 max-w-sm w-full">
                <div className="flex items-center gap-1.5 text-[#2D2D2D] font-bold text-[11px] uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#800020]" />
                  <span>{dict.footer.complianceTitle}</span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-neutral-100">
                  <span className="text-neutral-500">{dict.footer.binLabel}:</span>
                  <span className="font-semibold text-neutral-800">{COMPANY_INFO.registration.bin}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-500">Trade License:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-neutral-800">{COMPANY_INFO.registration.tradeLicense}</span>
                    <a
                      href={COMPANY_INFO.tradeLicenseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#800020] hover:underline font-semibold inline-flex items-center gap-0.5"
                    >
                      <span>({dict.common.viewTradeLicense})</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <p className="text-xs text-neutral-600 mt-1 border-t border-neutral-200/60 pt-1.5 leading-normal">
                  {dict.footer.complianceNote}
                </p>
              </div>
            </div>

            {/* Col 2: Company Navigation (LG: 2 cols) */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                {dict.footer.companyNavTitle}
              </h3>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-neutral-600 font-medium">
                <li>
                  <Link href="/" className="hover:text-neutral-950 transition-colors inline-block hover:translate-x-0.5">
                    {locale === "bn" ? "হোম পেজ" : "Home"}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-neutral-950 transition-colors inline-block hover:translate-x-0.5">
                    {dict.nav.about}
                  </Link>
                </li>
                <li>
                  <a
                    href={COMPANY_INFO.tradeLicenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#800020] transition-colors inline-flex items-center gap-1 hover:translate-x-0.5 text-xs sm:text-sm"
                  >
                    <span>{dict.common.viewTradeLicense}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#800020]" />
                  </a>
                </li>
                <li>
                  <Link href="/how-it-works" className="hover:text-neutral-950 transition-colors inline-block hover:translate-x-0.5">
                    {dict.nav.howItWorks}
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-neutral-950 transition-colors inline-block hover:translate-x-0.5">
                    {dict.nav.services}
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-neutral-950 transition-colors inline-block hover:translate-x-0.5">
                    {dict.nav.projects}
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-neutral-950 transition-colors inline-block hover:translate-x-0.5">
                    {locale === "bn" ? "ব্লগ ও প্রযুক্তি নিবন্ধ" : "Blog & Articles"}
                  </Link>
                </li>
                <li>
                  <Link href="/reviews" className="hover:text-neutral-950 transition-colors inline-block hover:translate-x-0.5">
                    {locale === "bn" ? "ক্রেতাদের মতামত ও রিভিউ" : "Buyer Reviews"}
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-neutral-950 transition-colors inline-block hover:translate-x-0.5 text-[#800020] font-semibold">
                    {locale === "bn" ? "গোপনীয়তা নীতি" : "Privacy Policy"}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Machine Categories (LG: 3 cols) */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                {dict.footer.machineCategoriesTitle}
              </h3>
              <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-neutral-600 font-medium">
                <li>
                  <Link
                    href="/machines/circular-knitting"
                    className="hover:text-neutral-950 transition-colors inline-block hover:translate-x-0.5 text-neutral-900 font-semibold"
                  >
                    {locale === "bn" ? "সার্কুলার নিটিং মেশিন" : "Circular Knitting Machines"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/machines/dyeing"
                    className="hover:text-neutral-950 transition-colors inline-block hover:translate-x-0.5"
                  >
                    {locale === "bn" ? "ডাইং মেশিনারি" : "Eco Dyeing Machines"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/machines/shearing"
                    className="hover:text-neutral-950 transition-colors inline-block hover:translate-x-0.5"
                  >
                    {locale === "bn" ? "শিয়ারিং মেশিনারি" : "Shearing Machines"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/machines/finishing"
                    className="hover:text-neutral-950 transition-colors inline-block hover:translate-x-0.5"
                  >
                    {locale === "bn" ? "ফিনিশিং মেশিনারি" : "Stenter & Finishing"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/machines/other"
                    className="hover:text-neutral-950 transition-colors inline-block hover:translate-x-0.5"
                  >
                    {locale === "bn" ? "অন্যান্য গার্মেন্টস ও টেক্সটাইল মেশিন" : "Fabric Slitting & Specialty"}
                  </Link>
                </li>
                <li className="pt-1">
                  <Link
                    href="/quote"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#800020] hover:underline"
                  >
                    <span>{dict.nav.requestQuote}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Connect & Direct Channels (LG: 3 cols) */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D2D2D]">
                {dict.footer.contactTitle}
              </h3>
              <div className="flex flex-col gap-2.5 text-xs text-neutral-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#800020] shrink-0 mt-0.5" />
                  <div className="flex flex-col leading-tight w-full space-y-2">
                    <div>
                      <span className="font-bold text-[#2D2D2D] block">
                        {locale === "bn" ? "ঢাকা হেড অফিস:" : "Dhaka Head Office:"}
                      </span>
                      <span className="text-xs text-neutral-600 mt-0.5 block">
                        {locale === "bn" ? COMPANY_INFO.headOffice.addressBn : COMPANY_INFO.headOffice.address}
                      </span>
                    </div>

                    <div className="pt-1.5 border-t border-neutral-200/60">
                      <span className="font-bold text-[#2D2D2D] block">
                        {locale === "bn" ? "শোরুম ও ওয়্যারহাউস:" : "Showroom & Hub:"}
                      </span>
                      <span className="text-xs text-neutral-600 mt-0.5 block">
                        {COMPANY_INFO.addressShort}
                      </span>
                      {/* Small embedded compact Google map */}
                      <div className="mt-2 w-full">
                        <OfficeMap variant="compact" showAddressCard={false} />
                      </div>
                    </div>

                    <div className="pt-1.5 border-t border-neutral-200/60">
                      <span className="font-bold text-[#2D2D2D] block">
                        {locale === "bn" ? "চীন অফিস (সোর্সিং ও পার্টনার):" : "China Sourcing Office:"}
                      </span>
                      <span className="text-xs text-neutral-700 font-semibold block">
                        {COMPANY_INFO.chinaOffice.company}
                      </span>
                      <span className="text-xs text-neutral-600 mt-0.5 block leading-normal">
                        {locale === "bn" ? COMPANY_INFO.chinaOffice.addressBn : COMPANY_INFO.chinaOffice.address}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Phone className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
                  <div className="flex flex-col leading-tight min-w-0">
                    <a href={`tel:${COMPANY_INFO.phoneIntl}`} className="font-bold text-[#2D2D2D] hover:text-[#800020] transition-colors break-all sm:break-normal">
                      Hotline: {COMPANY_INFO.hotline}
                    </a>
                    <a href={`tel:${COMPANY_INFO.directContact.replace(/[^0-9+]/g, "")}`} className="text-xs text-neutral-600 hover:text-[#800020] py-0.5 mt-0.5 break-all sm:break-normal inline-block transition-colors">
                      Direct Sales: {COMPANY_INFO.directContact} ({COMPANY_INFO.contactPerson})
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Mail className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
                  <div className="flex flex-col leading-tight min-w-0">
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-xs font-semibold text-[#2D2D2D] hover:text-black hover:underline break-all sm:break-normal">
                      {COMPANY_INFO.email}
                    </a>
                    {COMPANY_INFO.businessEmail && (
                      <a href={`mailto:${COMPANY_INFO.businessEmail}`} className="text-xs text-neutral-600 hover:text-[#800020] hover:underline py-0.5 mt-0.5 break-all sm:break-normal inline-block transition-colors">
                        Business: {COMPANY_INFO.businessEmail}
                      </a>
                    )}
                  </div>
                </div>

                {/* Direct WhatsApp Action */}
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    "Hello Tasneem Knit Industry, I am contacting you for machine specifications and quotation."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2.5 rounded-xl flex items-center justify-between text-xs font-semibold transition-colors shadow-2xs w-full min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">
                      {dict.footer.whatsappText}: <strong className="font-mono font-bold text-white tracking-wide">{COMPANY_INFO.whatsappFormatted}</strong>
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Banner Section with Requested Graphic & Panoramic Machinery */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[24/9] min-h-[220px] sm:min-h-[380px] lg:min-h-[460px] overflow-hidden mt-auto z-10 flex flex-col justify-end">
          <Image
            src="/images/footer/textile-solutions-banner.jpg"
            alt="Global Integrated Textile Processing Solutions - Circular Knitting, Dyeing, Stenter Finishing, Fabric Slitting"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-contain sm:object-cover object-bottom"
          />

          {/* Top subtle blend into the ivory card canvas */}
          <div className="absolute inset-x-0 top-0 h-20 sm:h-32 bg-gradient-to-b from-[#F9F9F9] via-[#F9F9F9]/70 to-transparent pointer-events-none" />

          {/* Bottom subtle ambient gradient for the floating capsule pill */}
          <div className="absolute inset-x-0 bottom-0 h-28 sm:h-40 bg-gradient-to-t from-white/80 via-white/40 to-transparent pointer-events-none" />

          {/* Floating White Pill Bar (Signature Design Element from Screenshot) */}
          <div className="relative z-20 pb-4 sm:pb-6 lg:pb-8 px-2.5 sm:px-8">
            <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full px-4 sm:px-8 py-3.5 shadow-[0_12px_36px_rgba(0,0,0,0.1)] border border-neutral-200/90 flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 text-xs sm:text-sm font-medium text-neutral-600 text-center sm:text-left">
                <p>
                  © {new Date().getFullYear()} {COMPANY_INFO.legalName}. {dict.footer.rightsReserved}
                </p>
                <span className="hidden sm:inline text-neutral-300">•</span>
                <Link href="/privacy-policy" className="hover:text-[#800020] transition-colors underline">
                  {locale === "bn" ? "গোপনীয়তা নীতি" : "Privacy Policy"}
                </Link>
                <span className="hidden sm:inline text-neutral-300">•</span>
                <p className="text-[11px] sm:text-xs text-neutral-500">
                  Developed by{" "}
                  <a
                    href={COMPANY_INFO.developer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#2D2D2D] hover:text-[#800020] transition-colors"
                    title="Md Tarek"
                  >
                    Md Tarek
                  </a>{" "}
                  •{" "}
                  <a
                    href={COMPANY_INFO.developer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#800020] hover:underline"
                    title="artx.techvrs.com"
                  >
                    artx.techvrs.com
                  </a>
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
                {/* Facebook */}
                <a
                  href={COMPANY_INFO.facebook || "https://www.facebook.com/tasneemknitind"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Tasneem Facebook"
                  className="w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors shadow-2xs shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtu.be/ONTd4X4M-Vo"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Tasneem YouTube - Owner Introduction"
                  className="w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors shadow-2xs shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    "Hello Tasneem Knit Industry, I am contacting you for machine specifications and quotation."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center transition-colors shadow-2xs shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>

                <div className="h-4 w-px bg-neutral-200 hidden sm:block" />

                {/* Capsule Language Switcher */}
                <LanguageSwitcher variant="capsule" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
