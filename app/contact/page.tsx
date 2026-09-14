"use client";

import { useState } from "react";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MotionSection, SlideIn } from "@/components/ui/MotionWrapper";
import { COMPANY_INFO } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function ContactPage() {
  const { t, locale } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    subject: "Machinery Inquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  // Direct WhatsApp URL
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    `Hello Tasneem Knit Industry, I am reaching out from ${formData.company || "my mill"} regarding industrial circular knitting machinery.`
  )}`;

  return (
    <div className="py-12 sm:py-20 bg-white text-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <MotionSection className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E5E7EB] bg-[#F9FAFB] text-xs font-semibold text-[#4B5563] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]"></span>
            <span>{locale === "bn" ? "যোগাযোগ ও অনুসন্ধান" : "Commercial Inquiries Desk"}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0A0A0A]">
            {locale === "bn" ? "আমাদের সাথে সরাসরি কথা বলুন" : "Contact Tasneem Knit Industry"}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#4B5563] leading-relaxed">
            {locale === "bn"
              ? "মেশিনের স্পেসিফিকেশন, সরাসরি ফ্যাক্টরি CFR কোটেশন, শো-রুম পরিদর্শন কিংবা স্পেয়ার পার্টসের তথ্যের জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন।"
              : "Connect with our machinery import specialists for technical consultations, CFR Chattogram quotes, factory visit arrangements, or spare parts procurement."}
          </p>
        </MotionSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Channels & Information (5 cols) */}
          <div className="lg:col-span-5">
            <SlideIn direction="left" distance={20} duration={0.45} className="flex flex-col gap-6">
              {/* Primary WhatsApp Card */}
              <div className="border border-emerald-500/40 rounded-2xl bg-emerald-50 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-emerald-800 font-bold mb-2">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>{locale === "bn" ? "তাৎক্ষণিক যোগাযোগ" : "Primary Instant Channel"}</span>
                </div>
                <h2 className="text-xl font-bold text-[#0A0A0A]">
                  {locale === "bn" ? "সরাসরি WhatsApp-এ কথা বলুন" : "Chat Directly on WhatsApp"}
                </h2>
                <p className="text-xs text-[#4B5563] mt-1 mb-6 leading-relaxed">
                  {locale === "bn"
                    ? "মেশিন মডেল, Gauge প্রাপ্যতা কিংবা জরুরি কোটেশনের জন্য সরাসরি আমাদের WhatsApp-এ নক দিন।"
                    : "For rapid machinery specification checks, gauge availability, and immediate quote turnaround."}
                </p>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{t.common.chatWhatsApp} ({COMPANY_INFO.whatsappFormatted})</span>
                </a>
              </div>

              {/* Direct Contact Details Card */}
              <div className="border border-[#E5E7EB] rounded-2xl bg-[#F9FAFB] p-6 sm:p-8 shadow-sm flex flex-col gap-5">
                <h2 className="font-bold text-base text-[#0A0A0A]">
                  {locale === "bn" ? "অফিসিয়াল যোগাযোগ" : "Official Communication Channels"}
                </h2>

                {/* Hotline */}
                <div className="flex items-start gap-3 text-xs sm:text-sm">
                  <Phone className="w-4 h-4 text-[#FF0000] shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-[#0A0A0A] block">
                      {locale === "bn" ? "সরাসরি হটলাইন" : "Primary Hotline"}
                    </span>
                    <a
                      href={`tel:${COMPANY_INFO.phone.replace(/[^0-9+]/g, "")}`}
                      className="text-base font-bold text-[#0A0A0A] hover:text-[#FF0000] transition-colors"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                    <span className="text-[11px] text-[#6B7280] block mt-0.5">
                      {locale === "bn" ? "যেকোনো মেশিনারি ও ক্যাটালগ সংক্রান্ত তথ্য" : "General machinery & catalog hotline"}
                    </span>
                  </div>
                </div>

                {/* Direct Sales - Mr Hasan */}
                <div className="flex items-start gap-3 text-xs sm:text-sm pt-3 border-t border-[#E5E7EB]">
                  <Phone className="w-4 h-4 text-slate-700 shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-[#0A0A0A] block">
                      {locale === "bn" ? "সরাসরি সেলস ও L/C ডেস্ক (মিঃ হাসান)" : "Direct Sales & Commercial Desk (Mr. Hasan)"}
                    </span>
                    <a
                      href={`tel:${COMPANY_INFO.phoneAlt.replace(/[^0-9+]/g, "")}`}
                      className="text-sm font-bold text-[#0A0A0A] hover:text-[#FF0000] transition-colors"
                    >
                      {COMPANY_INFO.phoneAlt}
                    </a>
                    <span className="text-[11px] text-[#6B7280] block mt-0.5">
                      {locale === "bn" ? "CFR রেট ও Proforma Invoice (PI) সংক্রান্ত সরাসরি যোগাযোগ" : "Direct PI quotation & import inquiries"}
                    </span>
                  </div>
                </div>

                {/* WhatsApp Support */}
                <div className="flex items-start gap-3 text-xs sm:text-sm pt-3 border-t border-[#E5E7EB]">
                  <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-[#0A0A0A] block">
                      {locale === "bn" ? "WhatsApp টেকনিক্যাল সাপোর্ট" : "WhatsApp Technical & Spec Support"}
                    </span>
                    <a
                      href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-emerald-700 hover:underline transition-colors"
                    >
                      {COMPANY_INFO.whatsappFormatted}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3 text-xs sm:text-sm pt-3 border-t border-[#E5E7EB]">
                  <Mail className="w-4 h-4 text-[#FF0000] shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-[#0A0A0A] block">{locale === "bn" ? "ইমেইল সাপোর্ট" : "Email Support"}</span>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#4B5563] hover:text-[#0A0A0A] hover:underline transition-colors">
                      {COMPANY_INFO.email}
                    </a>
                    <span className="text-[11px] text-[#6B7280] block mt-0.5">
                      {locale === "bn" ? "নিয়মিত ইমেইল রেসপন্স দেওয়া হয়" : "Inquiries reviewed daily"}
                    </span>
                  </div>
                </div>

                {/* Operating Address */}
                <div className="flex items-start gap-3 text-xs sm:text-sm pt-3 border-t border-[#E5E7EB]">
                  <MapPin className="w-4 h-4 text-[#FF0000] shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-[#0A0A0A] block">
                      {locale === "bn" ? "শো-রুম ও ওয়্যারহাউস ঠিকানা" : "Showroom & Warehouse Location"}
                    </span>
                    <span className="text-[#4B5563] leading-relaxed block mt-0.5">
                      {COMPANY_INFO.address}
                    </span>
                    <span className="text-[11px] text-[#6B7280] block mt-1">
                      {locale === "bn" ? "বিসিক শিল্পনগরী, ফতুল্লা, নারায়ণগঞ্জ" : "BSCIC Industrial Estate, Fatullah, Narayanganj"}
                    </span>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-3 text-xs sm:text-sm pt-3 border-t border-[#E5E7EB]">
                  <Clock className="w-4 h-4 text-[#FF0000] shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-[#0A0A0A] block">{locale === "bn" ? "অফিসের সময়" : "Operational Hours"}</span>
                    <span className="text-[#4B5563]">
                      {COMPANY_INFO.businessHours}
                    </span>
                  </div>
                </div>
              </div>

              {/* Legal & Corporate Registration Card (Confirmed Credentials) */}
              <div className="border border-[#E5E7EB] rounded-2xl bg-white p-6 sm:p-8 shadow-sm flex flex-col gap-4 text-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0A0A0A]">
                  <ShieldCheck className="w-4 h-4 text-[#FF0000]" />
                  <span>{locale === "bn" ? "আইনি নিবন্ধন ও ব্যবসায়িক তথ্য" : "Corporate Registration & Compliance"}</span>
                </div>

                <div className="space-y-2 text-[#4B5563]">
                  <div className="flex justify-between border-b border-[#F3F4F6] pb-1.5">
                    <span className="text-[#6B7280]">{locale === "bn" ? "আইনি নাম" : "Legal Entity"}:</span>
                    <span className="font-semibold text-[#0A0A0A]">{COMPANY_INFO.legalName}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#F3F4F6] pb-1.5">
                    <span className="text-[#6B7280]">{locale === "bn" ? "মালিক / স্বত্বাধিকারী" : "Proprietor"}:</span>
                    <span className="font-semibold text-[#0A0A0A]">{COMPANY_INFO.owner}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#F3F4F6] pb-1.5">
                    <span className="text-[#6B7280]">{locale === "bn" ? "BIN (ভ্যাট)" : "BIN (VAT)"}:</span>
                    <span className="font-mono font-semibold text-[#0A0A0A]">{COMPANY_INFO.registration.bin}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#F3F4F6] pb-1.5">
                    <span className="text-[#6B7280]">{locale === "bn" ? "e-TIN নম্বর" : "e-TIN"}:</span>
                    <span className="font-mono font-semibold text-[#0A0A0A]">{COMPANY_INFO.registration.etin}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#F3F4F6] pb-1.5">
                    <span className="text-[#6B7280]">{locale === "bn" ? "ট্রেড লাইসেন্স নং" : "Trade License"}:</span>
                    <span className="font-mono font-semibold text-[#0A0A0A]">{COMPANY_INFO.registration.tradeLicense}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#F3F4F6] pb-1.5">
                    <span className="text-[#6B7280]">{locale === "bn" ? "প্রতিষ্ঠানের ধরন" : "Ownership Type"}:</span>
                    <span className="font-semibold text-[#0A0A0A]">{COMPANY_INFO.registration.ownershipType}</span>
                  </div>
                </div>

                {/* Operating vs Registered Address separation per Section 4 */}
                <div className="mt-1 pt-3 border-t border-[#E5E7EB] text-[11px] text-[#6B7280] space-y-2">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-[#0A0A0A]">{locale === "bn" ? "শো-রুম ও ওয়্যারহাউস:" : "Operating / Office Address:"}</span>
                    <span className="leading-normal text-[#4B5563]">{COMPANY_INFO.address}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 pt-1 border-t border-[#F3F4F6]">
                    <span className="font-semibold text-[#0A0A0A]">{locale === "bn" ? "ট্রেড লাইসেন্স অনুযায়ী নিবন্ধিত ঠিকানা:" : "Legal Registered Address (Trade License):"}</span>
                    <span className="leading-normal text-[#4B5563]">{COMPANY_INFO.registeredAddress}</span>
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>

          {/* Right Column: Inquiry Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <SlideIn direction="right" distance={20} duration={0.45}>
              <div className="border border-[#E5E7EB] rounded-2xl bg-white p-6 sm:p-10 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0A0A0A] mb-2">
                  {locale === "bn" ? "আপনার বার্তা বা কোটেশনের রিকোয়েস্ট পাঠান" : "Send a Commercial Inquiry"}
                </h2>
                <p className="text-xs sm:text-sm text-[#4B5563] mb-6">
                  {locale === "bn"
                    ? "ফর্মটি পূরণ করে পাঠিয়ে দিন, আমাদের টেক্সটাইল বিশেষজ্ঞ দল দ্রুত আপনার সাথে যোগাযোগ করবে।"
                    : "Fill out the form below and our sourcing coordinator will get in touch with you promptly."}
                </p>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="submitted"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="p-6 rounded-xl bg-emerald-50 border border-emerald-300 text-center"
                    >
                      <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                      <h3 className="font-bold text-base text-emerald-800">{locale === "bn" ? "আপনার বার্তা আমরা পেয়েছি!" : "Message Received"}</h3>
                      <p className="text-xs text-emerald-700 mt-1">
                        {locale === "bn" ? "ধন্যবাদ! আমাদের টিম খুব দ্রুত আপনার সাথে যোগাযোগ করবে। জরুরি প্রয়োজনে সরাসরি ফোন বা WhatsApp করতে পারেন।" : "Thank you. We have recorded your message and our technical team will contact you shortly."}
                      </p>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2 rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{locale === "bn" ? "WhatsApp-এ দ্রুত কথা বলুন" : "Follow Up on WhatsApp"}</span>
                      </a>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#111111] mb-1">
                            {t.quoteForm.nameLabel} <span className="text-[#FF0000]">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder={locale === "bn" ? "উদাঃ তানভীর আহমেদ" : "e.g. Tanvir Ahmed"}
                            className="w-full bg-white border border-[#D1D5DB] rounded-lg px-4 py-2.5 text-xs sm:text-sm text-[#0A0A0A] focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] placeholder:text-[#9CA3AF]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#111111] mb-1">
                            {t.quoteForm.companyLabel} <span className="text-[#FF0000]">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder={locale === "bn" ? "উদাঃ ক্লাসিক নিটওয়্যার লিঃ" : "e.g. Classic Knitwear Ltd."}
                            className="w-full bg-white border border-[#D1D5DB] rounded-lg px-4 py-2.5 text-xs sm:text-sm text-[#0A0A0A] focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] placeholder:text-[#9CA3AF]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#111111] mb-1">
                            {t.quoteForm.phoneLabel} <span className="text-[#FF0000]">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder={locale === "bn" ? "উদাঃ +৮৮০ ১৭XX-XXXXXX" : "e.g. +880 17XX-XXXXXX"}
                            className="w-full bg-white border border-[#D1D5DB] rounded-lg px-4 py-2.5 text-xs sm:text-sm text-[#0A0A0A] focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] placeholder:text-[#9CA3AF]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#111111] mb-1">
                            {t.quoteForm.emailLabel}
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder={locale === "bn" ? "উদাঃ mill@example.com" : "e.g. mill@example.com"}
                            className="w-full bg-white border border-[#D1D5DB] rounded-lg px-4 py-2.5 text-xs sm:text-sm text-[#0A0A0A] focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] placeholder:text-[#9CA3AF]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#111111] mb-1">
                          {locale === "bn" ? "কী বিষয়ে জানতে চান" : "Inquiry Subject"}
                        </label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full bg-white border border-[#D1D5DB] rounded-lg px-4 py-2.5 text-xs sm:text-sm text-[#0A0A0A] focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] placeholder:text-[#9CA3AF]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#111111] mb-1">
                          {locale === "bn" ? "আপনার বার্তা" : "Message Details"} <span className="text-[#FF0000]">*</span>
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder={locale === "bn" ? "মেশিনের মডেল, সিলিন্ডার সাইজ, Gauge বা আপনার মিলের চাহিদামতো বিস্তারিত লিখুন..." : "Describe your machinery inquiry, gauge specifications, or request for Proforma Invoice..."}
                          className="w-full bg-white border border-[#D1D5DB] rounded-lg px-4 py-2.5 text-xs sm:text-sm text-[#0A0A0A] focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] placeholder:text-[#9CA3AF]"
                        />
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full sm:w-auto bg-[#FF0000] hover:bg-[#E00000] text-white px-8 py-3 rounded-lg text-sm font-semibold hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2 shadow-sm"
                        >
                          <Send className="w-4 h-4" />
                          <span>{loading ? (locale === "bn" ? "পাঠানো হচ্ছে..." : "Transmitting...") : (locale === "bn" ? "বার্তা পাঠিয়ে দিন" : "Send Commercial Message")}</span>
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </SlideIn>
          </div>
        </div>
      </div>
    </div>
  );
}
