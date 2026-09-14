"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  MessageCircle,
  Phone,
  Mail,
  ShieldCheck,
  Ship,
  CheckCircle2,
  Clock,
  ArrowRight,
  AlertCircle,
  Loader2,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { COMPANY_INFO } from "@/lib/constants";
import { QuoteRequestData } from "@/lib/types";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { useCustomerAuth } from "@/lib/customer/customer-context";
import { AdminStore } from "@/lib/admin/admin-store";
import { trackQuoteSubmission } from "@/components/analytics/GoogleAnalytics";

function QuoteFormContent() {
  const { t, locale } = useTranslation();
  const { customer } = useCustomerAuth();
  const searchParams = useSearchParams();
  const prefilledMachine = searchParams.get("machine") || "";

  const [formData, setFormData] = useState<QuoteRequestData>({
    name: "",
    company: "",
    phoneOrWhatsApp: "",
    email: "",
    machineType: prefilledMachine,
    gauge: "",
    cylinderDiameter: "",
    feederCount: "",
    productionTarget: "",
    quantity: "1",
    preferredBrand: "",
    deliveryRequirement: "CFR Chattogram (Standard)",
    message: "",
  });

  // Pre-fill from customer account if logged in
  useEffect(() => {
    if (customer) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || customer.name || "",
        company: prev.company || customer.company || "",
        email: prev.email || customer.email || "",
        phoneOrWhatsApp: prev.phoneOrWhatsApp || customer.phoneOrWhatsApp || "",
      }));
    }
  }, [customer]);

  useEffect(() => {
    if (prefilledMachine) {
      setFormData((prev) => ({
        ...prev,
        machineType: prefilledMachine,
      }));
    }
  }, [prefilledMachine]);

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successResult, setSuccessResult] = useState<{
    quoteId: string;
    whatsappUrl: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to submit quote request.");
      }

      // Persist quote in AdminStore so it appears immediately in My Quotes & Admin Inbox
      AdminStore.saveQuote({
        ...formData,
        id: result.quoteId,
        status: "new",
        submittedAt: new Date().toISOString(),
        customerId: customer?.id,
        whatsappUrl: result.whatsappUrl,
      });

      // Track B2B Lead Conversion in GA4
      trackQuoteSubmission(result.quoteId, formData.machineType, locale);

      setSuccessResult({
        quoteId: result.quoteId,
        whatsappUrl: result.whatsappUrl,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again or contact via WhatsApp.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="py-12 sm:py-16 bg-white text-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E5E7EB] bg-[#F9FAFB] text-xs font-semibold text-[#4B5563] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]"></span>
            <span>{locale === "bn" ? "বাণিজ্যিক আমদানি ও কোটেশন" : "B2B Commercial Procurement"}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0A0A0A]">
            {t.quoteForm.title}
          </h1>
          <p className="mt-4 text-base text-[#4B5563] leading-relaxed">
            {t.quoteForm.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Form (8 cols) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {successResult ? (
                <motion.div
                  key="success"
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="border border-[#E5E7EB] rounded-2xl bg-[#F9FAFB] p-8 sm:p-10 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0A0A0A]">
                    {t.quoteForm.successMessage}
                  </h2>
                  <div className="mt-3 p-4 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-between text-xs font-semibold text-[#0A0A0A]">
                    <span className="text-[#6B7280]">{locale === "bn" ? "কোটেশন আইডি:" : "Reference ID:"}</span>
                    <span className="font-mono text-sm text-[#FF0000]">{successResult.quoteId}</span>
                  </div>
                  <p className="mt-4 text-sm text-[#4B5563] leading-relaxed">
                    {locale === "bn"
                      ? "আপনার কোটেশন রিকোয়েস্টের জন্য ধন্যবাদ! আমাদের টেক্সটাইল ইঞ্জিনিয়ারিং টিম আপনার মেশিনের স্পেসিফিকেশনগুলো দেখছে এবং দ্রুত সরাসরি ফ্যাক্টরি CFR Chattogram কোটেশন তৈরি করে আপনাকে পাঠাবে।"
                      : "Thank you for your quotation enquiry. Our machinery sourcing specialist is reviewing your technical specifications and will prepare the CFR Chattogram quotation."}
                  </p>

                  {/* Direct WhatsApp Follow-up */}
                  <div className="mt-8 pt-6 border-t border-[#E5E7EB]">
                    <h3 className="text-sm font-bold text-[#0A0A0A] mb-2">
                      {locale === "bn" ? "জরুরি কোটেশন প্রয়োজন?" : "Need an Immediate Response?"}
                    </h3>
                    <p className="text-xs text-[#6B7280] mb-4">
                      {locale === "bn"
                        ? "দেরি না করে সরাসরি WhatsApp-এ আমাদের সেলস টিমের সাথে কথা বলুন।"
                        : "Click below to open WhatsApp with your pre-filled technical quotation details for direct communication with our sales desk."}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={successResult.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors shadow-sm duration-200"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{t.common.chatWhatsApp} ({COMPANY_INFO.whatsappFormatted})</span>
                      </a>
                      <Link
                        href="/account/quotes"
                        className="inline-flex items-center gap-2 bg-white border border-[#D1D5DB] hover:border-[#FF0000] text-[#0A0A0A] px-5 py-3 rounded-lg text-sm font-semibold transition-colors shadow-xs"
                      >
                        <FileText className="w-4 h-4 text-[#FF0000]" />
                        <span>{locale === "bn" ? "মাই কোটেশন-এ দেখুন →" : "View in My Quotes →"}</span>
                      </Link>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={() => {
                        setSuccessResult(null);
                        setFormData({
                          name: "",
                          company: "",
                          phoneOrWhatsApp: "",
                          email: "",
                          machineType: "",
                          gauge: "",
                          cylinderDiameter: "",
                          feederCount: "",
                          productionTarget: "",
                          quantity: "1",
                          preferredBrand: "",
                          deliveryRequirement: "CFR Chattogram (Standard)",
                          message: "",
                        });
                      }}
                      className="text-xs text-[#6B7280] hover:text-[#0A0A0A] underline transition-colors duration-150"
                    >
                      {locale === "bn" ? "নতুন আরেকটি কোটেশন পাঠান" : "Submit another quote request"}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  onSubmit={handleSubmit}
                  className="border border-[#E5E7EB] rounded-2xl bg-white p-6 sm:p-10 shadow-sm flex flex-col gap-6"
                >
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Section 1: Contact Information */}
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-4 pb-2 border-b border-[#E5E7EB]">
                    {locale === "bn" ? "১. আপনার ও মিলের তথ্য" : "1. Buyer / Mill Information"}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#111111] mb-1">
                        {t.quoteForm.nameLabel} <span className="text-[#FF0000]">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={locale === "bn" ? "উদাঃ ইঞ্জিঃ রফিকুল ইসলাম" : "e.g. Engr. Rafiqul Islam"}
                        className="w-full bg-white border border-[#D1D5DB] text-[#0A0A0A] rounded-lg px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] placeholder:text-[#9CA3AF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#111111] mb-1">
                        {t.quoteForm.companyLabel} <span className="text-[#FF0000]">*</span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        placeholder={locale === "bn" ? "উদাঃ অ্যাপেক্স নিটওয়্যার মিলস লিঃ" : "e.g. Apex Knitwear Mills Ltd."}
                        className="w-full bg-white border border-[#D1D5DB] text-[#0A0A0A] rounded-lg px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] placeholder:text-[#9CA3AF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#111111] mb-1">
                        {t.quoteForm.phoneLabel} <span className="text-[#FF0000]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phoneOrWhatsApp"
                        required
                        value={formData.phoneOrWhatsApp}
                        onChange={handleChange}
                        placeholder={locale === "bn" ? "উদাঃ +৮৮০ ১৭XX-XXXXXX" : "e.g. +880 17XX-XXXXXX"}
                        className="w-full bg-white border border-[#D1D5DB] text-[#0A0A0A] rounded-lg px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] placeholder:text-[#9CA3AF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#111111] mb-1">
                        {t.quoteForm.emailLabel}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={locale === "bn" ? "উদাঃ procurement@mill.com" : "e.g. procurement@mill.com"}
                        className="w-full bg-white border border-[#D1D5DB] text-[#0A0A0A] rounded-lg px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] placeholder:text-[#9CA3AF]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Machine Specifications */}
                <div className="pt-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-4 pb-2 border-b border-[#E5E7EB]">
                    {locale === "bn" ? "২. মেশিনের টেকনিক্যাল স্পেসিফিকেশন" : "2. Technical Machinery Parameters"}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#111111] mb-1">
                        {t.quoteForm.categoryLabel} <span className="text-[#FF0000]">*</span>
                      </label>
                      <input
                        type="text"
                        name="machineType"
                        required
                        value={formData.machineType}
                        onChange={handleChange}
                        placeholder={locale === "bn" ? "উদাঃ Double Jersey Circular Knitting Machine" : "e.g. Double Jersey Circular Knitting Machine"}
                        className="w-full bg-white border border-[#D1D5DB] text-[#0A0A0A] rounded-lg px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] placeholder:text-[#9CA3AF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#111111] mb-1">
                        {t.quoteForm.gaugeLabel}
                      </label>
                      <input
                        type="text"
                        name="gauge"
                        value={formData.gauge}
                        onChange={handleChange}
                        placeholder="e.g. 24G, 28G, 32G"
                        className="w-full bg-white border border-[#D1D5DB] text-[#0A0A0A] rounded-lg px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] placeholder:text-[#9CA3AF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#111111] mb-1">
                        {t.quoteForm.cylinderLabel}
                      </label>
                      <input
                        type="text"
                        name="cylinderDiameter"
                        value={formData.cylinderDiameter}
                        onChange={handleChange}
                        placeholder="e.g. 30&quot;, 34&quot;, 36&quot;"
                        className="w-full bg-white border border-[#D1D5DB] text-[#0A0A0A] rounded-lg px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] placeholder:text-[#9CA3AF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#111111] mb-1">
                        {t.quoteForm.feederLabel}
                      </label>
                      <input
                        type="text"
                        name="feederCount"
                        value={formData.feederCount}
                        onChange={handleChange}
                        placeholder="e.g. 72F, 84F, 96F, 108F"
                        className="w-full bg-white border border-[#D1D5DB] text-[#0A0A0A] rounded-lg px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] placeholder:text-[#9CA3AF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#111111] mb-1">
                        {t.quoteForm.quantityLabel} <span className="text-[#FF0000]">*</span>
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        min="1"
                        required
                        value={formData.quantity}
                        onChange={handleChange}
                        className="w-full bg-white border border-[#D1D5DB] text-[#0A0A0A] rounded-lg px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] placeholder:text-[#9CA3AF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#111111] mb-1">
                        {locale === "bn" ? "টার্গেট প্রোডাকশন / কাপড়ের ধরন" : "Target Production Output / Fabric"}
                      </label>
                      <input
                        type="text"
                        name="productionTarget"
                        value={formData.productionTarget}
                        onChange={handleChange}
                        placeholder={locale === "bn" ? "উদাঃ ৫০০ কেজি/দিন 100% Cotton Rib" : "e.g. 500 kg/day 100% Cotton Rib"}
                        className="w-full bg-white border border-[#D1D5DB] text-[#0A0A0A] rounded-lg px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] placeholder:text-[#9CA3AF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#111111] mb-1">
                        {locale === "bn" ? "পছন্দের ব্র্যান্ড বা দেশ (ঐচ্ছিক)" : "Preferred Brand / Origin"}
                      </label>
                      <input
                        type="text"
                        name="preferredBrand"
                        value={formData.preferredBrand}
                        onChange={handleChange}
                        placeholder="e.g. Jiunn Long, Rongxiang, or Best Available"
                        className="w-full bg-white border border-[#D1D5DB] text-[#0A0A0A] rounded-lg px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] placeholder:text-[#9CA3AF]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#111111] mb-1">
                        {locale === "bn" ? "ডেলিভারি শর্ত (Incoterms)" : "Delivery Requirement / Terms"}
                      </label>
                      <select
                        name="deliveryRequirement"
                        value={formData.deliveryRequirement}
                        onChange={handleChange}
                        className="w-full bg-white border border-[#D1D5DB] text-[#0A0A0A] rounded-lg px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#FF0000]"
                      >
                        <option value="CFR Chattogram (Standard)" className="bg-white text-[#0A0A0A]">
                          CFR Chattogram (Standard Sea Freight)
                        </option>
                        <option value="FOB Port of Origin" className="bg-white text-[#0A0A0A]">
                          FOB Port of Origin (Client Logistics)
                        </option>
                        <option value="Turnkey Factory Door (Including Clearing & Transport)" className="bg-white text-[#0A0A0A]">
                          Turnkey Factory Door (Including Custom Clearance & Transport)
                        </option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#111111] mb-1">
                        {t.quoteForm.notesLabel}
                      </label>
                      <textarea
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={locale === "bn" ? "নির্দিষ্ট কোনো ইনভার্টার, Needle ব্র্যান্ড (যেমন Groz-Beckert), Lycra অ্যাটাচমেন্ট বা বিশেষ চাহিদা থাকলে লিখুন..." : "Mention any specific inverter drives, needle brands (e.g. Groz-Beckert), lycra attachment requirements, or timeline..."}
                        className="w-full bg-white border border-[#D1D5DB] text-[#0A0A0A] rounded-lg px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] placeholder:text-[#9CA3AF]"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span>{locale === "bn" ? "কোটেশন রেসপন্স সময়: ২৪ ঘণ্টার মধ্যে" : "Average quote turnaround: 24 business hours"}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto bg-[#FF0000] hover:bg-[#E00000] text-white px-8 py-3 rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 shadow-sm"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>{t.quoteForm.submittingBtn}</span>
                      </>
                    ) : (
                      <>
                        <span>{t.quoteForm.submitBtn}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200" />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

          {/* Sourcing & Commercial Sidebar (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Quick Sourcing Assurance */}
            <div className="border border-[#E5E7EB] rounded-xl bg-[#F9FAFB] p-6 shadow-sm">
              <h3 className="font-bold text-base text-[#0A0A0A] mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>{locale === "bn" ? "আমাদের বাণিজ্যিক সুবিধা ও নিশ্চয়তা" : "Commercial Guarantee"}</span>
              </h3>
              <ul className="flex flex-col gap-3 text-xs text-[#4B5563] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#FF0000]">•</span>
                  <span><strong className="text-[#0A0A0A]">{locale === "bn" ? "সরাসরি ফ্যাক্টরি রেট:" : "Zero Intermediary Markup:"}</strong> {locale === "bn" ? "মাঝখানে কোনো দালাল ছাড়াই মূল কারখানা থেকে সরাসরি আমদানি।" : "Sourced direct from primary machinery builders overseas."}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#FF0000]">•</span>
                  <span><strong className="text-[#0A0A0A]">{locale === "bn" ? "শিপমেন্টের আগে কোয়ালিটি চেক:" : "Pre-Shipment Inspection:"}</strong> {locale === "bn" ? "SGS, Intertek বা Bureau Veritas দিয়ে সম্পূর্ণ মান যাচাই।" : "SGS, ITS, or BV verification arranged on request."}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#FF0000]">•</span>
                  <span><strong className="text-[#0A0A0A]">{locale === "bn" ? "১০০% নির্ভুল L/C পেপারস:" : "Full L/C Compliance:"}</strong> {locale === "bn" ? "বাংলাদেশ ব্যাংকের গাইডলাইন মেনে নির্ভরযোগ্য Proforma Invoice।" : "Proforma Invoices issued in adherence to Bangladesh Bank regulations."}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#FF0000]">•</span>
                  <span><strong className="text-[#0A0A0A]">{locale === "bn" ? "আপনার মিলে ইনস্টলেশন:" : "Local Installation:"}</strong> {locale === "bn" ? "অভিজ্ঞ টেক্সটাইল ইঞ্জিনিয়ার দিয়ে ফ্যাক্টরি সেটআপ ও ট্রায়াল নিটিং সম্পন্ন।" : "Technical engineer setup & trial run included."}</span>
                </li>
              </ul>
            </div>

            {/* Direct Channel Card */}
            <div className="border border-[#111111] rounded-xl bg-[#0A0A0A] text-white p-6 shadow-md">
              <h3 className="font-bold text-base mb-2 text-white">{locale === "bn" ? "সরাসরি সেলস ডেস্ক" : "Direct Contact Desk"}</h3>
              <p className="text-xs text-[#A0A0A0] mb-4 leading-relaxed">
                {locale === "bn"
                  ? "জরুরি কোটেশন বা L/C সংক্রান্ত যেকোনো আলোচনার জন্য সরাসরি আমাদের সেলস ম্যানেজারের সাথে কথা বলুন।"
                  : "Speak directly with our technical machinery import manager for urgent inquiries or tender documents."}
              </p>

              <div className="flex flex-col gap-3 text-xs">
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white p-2.5 rounded-lg font-semibold flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp: {COMPANY_INFO.whatsappFormatted}
                  </span>
                  <span>→</span>
                </a>

                <a
                  href={`tel:${COMPANY_INFO.phone.replace(/[^0-9+]/g, "")}`}
                  className="bg-[#1A1A1A] hover:bg-[#222222] border border-[#2A2A2A] text-white p-2.5 rounded-lg font-semibold flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#A0A0A0]" />
                    Phone: {COMPANY_INFO.phone}
                  </span>
                  <span>→</span>
                </a>

                <div className="pt-2 text-[11px] text-[#A0A0A0]">
                  <p>Location: {COMPANY_INFO.address}</p>
                  <p className="mt-1">Business Hours: {COMPANY_INFO.businessHours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuotePage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-sm text-[#A0A0A0]">
          Loading Quote Request Form...
        </div>
      }
    >
      <QuoteFormContent />
    </Suspense>
  );
}
