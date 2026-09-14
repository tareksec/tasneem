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
  Building,
  User,
  HelpCircle,
  Check,
  ArrowRight,
  Sparkles,
  Layers,
  Wrench,
  FileText,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MotionSection, SlideIn } from "@/components/ui/MotionWrapper";
import { COMPANY_INFO } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { AdminStore } from "@/lib/admin/admin-store";
import { OfficeMap } from "@/components/ui/OfficeMap";

// Quick Subject Options with Visual Icons
const SUBJECT_OPTIONS = [
  { id: "sourcing", title: "Machinery Sourcing", title_bn: "মেশিনারি আমদানি ও কোটেশন", icon: Layers },
  { id: "parts", title: "Spare Parts & Needles", title_bn: "স্পেয়ার পার্টস ও নিডল", icon: Wrench },
  { id: "visit", title: "Showroom & Factory Visit", title_bn: "ওয়্যারহাউস বা শো-রুম পরিদর্শন", icon: MapPin },
  { id: "pi_lc", title: "Proforma Invoice & L/C", title_bn: "প্রফরমা ইনভয়েস ও এল/সি তথ্য", icon: FileText },
  { id: "service", title: "Installation & Service", title_bn: "ইনস্টলেশন ও সার্ভিসিং", icon: Sparkles },
];

const QUICK_PROMPTS = [
  { text: "I need CFR Chattogram price for a Double Jersey 34\" 28G machine.", text_bn: "আমি ডাবল জার্সি ৩৪\" ২৮জি মেশিনের সিএফআর রেট ও কোটেশন জানতে চাই।" },
  { text: "I want to schedule a visit to your BSCIC Narayanganj showroom.", text_bn: "আমি বিসিক নারায়ণগঞ্জ শো-রুমে মেশিন সামনাসামনি দেখতে আসতে চাই।" },
  { text: "Looking for Groz-Beckert needles and cylinder parts availability.", text_bn: "গ্রোজ-বেকার্ট নিডল ও সিলিন্ডার পার্টসের স্টক এবং রেট জানতে চাই।" },
];

// Bangladeshi Mobile Number Validator
function isValidBangladeshiPhone(phone: string): boolean {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, "");
  return /^(?:\+?880|880|0)?1[3-9]\d{8}$/.test(cleaned);
}

export default function ContactPage() {
  const { t, locale } = useTranslation();
  const isBn = locale === "bn";

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    subject: "Machinery Sourcing",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [quoteId, setQuoteId] = useState("");

  const handlePromptClick = (text: string) => {
    setFormData((prev) => ({
      ...prev,
      message: prev.message ? `${prev.message}\n${text}` : text,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim() || !formData.company.trim() || !formData.phone.trim()) {
      setError(
        isBn
          ? "অনুগ্রহ করে আপনার নাম, মিলের নাম এবং মোবাইল নম্বর প্রদান করুন।"
          : "Please provide your Name, Mill/Company, and Contact Number."
      );
      return;
    }

    if (!isValidBangladeshiPhone(formData.phone)) {
      setError(
        isBn
          ? "অনুগ্রহ করে একটি সঠিক ১১ ডিজিটের বাংলাদেশি মোবাইল নম্বর দিন (উদাঃ 017XXXXXXXX বা +88017XXXXXXXX)।"
          : "Please enter a valid 11-digit Bangladeshi mobile number (e.g. 017XXXXXXXX or +88017XXXXXXXX)."
      );
      return;
    }

    setLoading(true);

    try {
      // Connect to quote/contact backend pipeline
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          company: formData.company.trim(),
          phoneOrWhatsApp: formData.phone.trim(),
          email: formData.email.trim() || undefined,
          machineType: `Contact: ${formData.subject}`,
          message: formData.message.trim() || "General contact inquiry.",
          quantity: "1",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit message.");
      }

      const generatedId = data.quoteId || `TK-MSG-${Date.now().toString().slice(-6)}`;
      setQuoteId(generatedId);

      // Persist in AdminStore for immediate visibility in Admin Inquiries
      AdminStore.saveQuote({
        id: generatedId,
        name: formData.name.trim(),
        company: formData.company.trim(),
        phoneOrWhatsApp: formData.phone.trim(),
        email: formData.email.trim() || "",
        machineType: `Contact: ${formData.subject}`,
        message: formData.message.trim(),
        quantity: "1",
        status: "new",
        submittedAt: new Date().toISOString(),
        whatsappUrl: data.whatsappUrl,
      });

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || (isBn ? "বার্তা পাঠাতে সমস্যা হয়েছে। দয়া করে হোয়াটসঅ্যাপে যোগাযোগ করুন।" : "Failed to send message. Please contact via WhatsApp."));
    } finally {
      setLoading(false);
    }
  };

  // Direct WhatsApp URL
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    isBn
      ? `আসসালামু আলাইকুম, আমি ${formData.company || "আমার মিল"} থেকে ${formData.subject || "মেশিনারি"} বিষয়ে জানতে যোগাযোগ করছি। নাম: ${formData.name || "N/A"}`
      : `Hello Tasneem Knit Industry, I am reaching out from ${formData.company || "my mill"} regarding ${formData.subject || "machinery"}. Contact: ${formData.name || "N/A"}`
  )}`;

  return (
    <div className="py-12 sm:py-20 bg-[#FAFAFB] text-[#2D2D2D] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <MotionSection className="max-w-3xl mb-12 sm:mb-16">
          <span className="sr-only">{isBn ? "সরাসরি যোগাযোগ ও সেলস ডেস্ক" : "Commercial Inquiries & Helpdesk"}</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#2D2D2D]">
            {isBn ? "আমাদের সাথে সরাসরি যোগাযোগ করুন" : "Contact Tasneem Knit Industry"}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#4B5563] leading-relaxed">
            {isBn
              ? "মেশিনের স্পেসিফিকেশন, সরাসরি ফ্যাক্টরি CFR কোটেশন, শো-রুম পরিদর্শন কিংবা স্পেয়ার পার্টসের তথ্যের জন্য নিচের ফর্মটি পূরণ করুন অথবা সরাসরি ফোন বা WhatsApp করুন।"
              : "Connect with our machinery import specialists for technical consultations, CFR Chattogram quotes, factory visit arrangements, or spare parts procurement."}
          </p>
        </MotionSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Channels & Operational Info (5 cols) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <SlideIn direction="left" distance={20} duration={0.45} className="flex flex-col gap-6">
              
              {/* Primary Instant WhatsApp Card */}
              <div className="border border-emerald-500/30 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white p-6 sm:p-7 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100/70 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{isBn ? "তাৎক্ষণিক চ্যাট" : "Instant Response"}</span>
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700">Online • 9AM - 7PM</span>
                </div>

                <h2 className="text-xl font-extrabold text-[#2D2D2D]">
                  {isBn ? "সরাসরি WhatsApp-এ কথা বলুন" : "Chat Directly on WhatsApp"}
                </h2>
                <p className="text-xs text-[#4B5563] mt-1.5 mb-5 leading-relaxed">
                  {isBn
                    ? "মেশিন মডেল, সিলিন্ডার ডায়ামিটার কিংবা জরুরি এল/সি তথ্যের জন্য সরাসরি আমাদের টেকনিক্যাল ম্যানেজারের সাথে চ্যাট করুন।"
                    : "For rapid machinery specification checks, gauge availability, and immediate quote turnaround."}
                </p>

                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-transform active:scale-98 shadow-sm cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isBn ? "WhatsApp চ্যাট শুরু করুন" : "Start WhatsApp Chat"} ({COMPANY_INFO.whatsappFormatted})</span>
                </a>
              </div>

              {/* Direct Official Contacts Card */}
              <div className="border border-[#E5E7EB] rounded-3xl bg-white p-6 sm:p-7 shadow-xs flex flex-col gap-4 text-xs sm:text-sm">
                <h3 className="font-extrabold text-sm text-[#2D2D2D] pb-2 border-b border-slate-100">
                  {isBn ? "অফিসিয়াল যোগাযোগ চ্যানেল" : "Direct Commercial Contacts"}
                </h3>

                {/* Hotline */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FDF2F4] text-[#800020] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 block">
                      {isBn ? "সরাসরি হটলাইন" : "Primary Hotline"}
                    </span>
                    <a
                      href={`tel:${COMPANY_INFO.phone.replace(/[^0-9+]/g, "")}`}
                      className="text-base font-extrabold text-[#2D2D2D] hover:text-[#800020] transition-colors"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {isBn ? "মেশিনারি ও ক্যাটালগ সংক্রান্ত অনুসন্ধান" : "General machinery & catalog inquiries"}
                    </span>
                  </div>
                </div>

                {/* Direct Sales Desk - Mr Hasan */}
                <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-500 block">
                      {isBn ? "সেলস ও এল/সি ডেস্ক (মিঃ হাসান)" : "Sales & Commercial Desk (Mr. Hasan)"}
                    </span>
                    <a
                      href={`tel:${COMPANY_INFO.phoneAlt.replace(/[^0-9+]/g, "")}`}
                      className="text-sm font-bold text-[#2D2D2D] hover:text-[#800020] transition-colors"
                    >
                      {COMPANY_INFO.phoneAlt}
                    </a>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {isBn ? "CFR রেট ও Proforma Invoice (PI) সংক্রান্ত সরাসরি যোগাযোগ" : "Direct PI quotation & import consultation"}
                    </span>
                  </div>
                </div>

                {/* Email Support */}
                <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-500 block">
                      {isBn ? "মূল ও বিজনেস ইমেইল" : "Official Emails"}
                    </span>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-sm font-bold text-[#2D2D2D] hover:text-[#800020] transition-colors block break-all"
                    >
                      {COMPANY_INFO.email}
                    </a>
                    {COMPANY_INFO.businessEmail && (
                      <a
                        href={`mailto:${COMPANY_INFO.businessEmail}`}
                        className="text-xs font-semibold text-slate-600 hover:text-[#800020] transition-colors block break-all mt-0.5"
                      >
                        Business: {COMPANY_INFO.businessEmail}
                      </a>
                    )}
                  </div>
                </div>

                {/* Official Facebook Page */}
                <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-500 block">
                      {isBn ? "অফিসিয়াল ফেসবুক পেজ" : "Official Facebook"}
                    </span>
                    <a
                      href={COMPANY_INFO.facebook || "https://www.facebook.com/tasneemknitind"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-bold text-[#1877F2] hover:underline transition-colors block break-all mt-0.5"
                    >
                      facebook.com/tasneemknitind
                    </a>
                  </div>
                </div>

                {/* 1. Dhaka Head Office */}
                <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-[#800020]/10 text-[#800020] flex items-center justify-center shrink-0 mt-0.5">
                    <Building className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block">
                      {isBn ? "ঢাকা হেড অফিস" : "Dhaka Head Office"}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                      {isBn ? COMPANY_INFO.headOffice.titleBn : COMPANY_INFO.headOffice.title}
                    </span>
                    <span className="text-slate-800 leading-snug block mt-0.5">
                      {isBn ? COMPANY_INFO.headOffice.addressBn : COMPANY_INFO.headOffice.address}
                    </span>
                  </div>
                </div>

                {/* 2. Showroom & Machinery Hub */}
                <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block">
                      {isBn ? "মেশিনারি শো-রুম ও ওয়্যারহাউস" : "Showroom & Machinery Hub"}
                    </span>
                    <span className="text-slate-800 leading-snug block mt-0.5">
                      {isBn ? COMPANY_INFO.addressBn : COMPANY_INFO.address}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-1">
                      🕒 {COMPANY_INFO.businessHours}
                    </span>
                  </div>
                </div>

                {/* 3. China Sourcing & Logistics Office */}
                <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-[#800020]" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900 block">
                      {isBn ? "চীন অফিস (সোর্সিং ও লজিস্টিকস)" : "China Sourcing & Logistics Office"}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                      {COMPANY_INFO.chinaOffice.company}
                    </span>
                    <span className="text-slate-800 leading-snug block mt-0.5">
                      {isBn ? COMPANY_INFO.chinaOffice.addressBn : COMPANY_INFO.chinaOffice.address}
                    </span>
                  </div>
                </div>
              </div>

              {/* Corporate Registration Strip */}
              <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] text-xs text-slate-600 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-slate-800">BIN: {COMPANY_INFO.registration.bin}</span>
                </div>
                <a
                  href={COMPANY_INFO.tradeLicenseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold text-slate-500 hover:text-[#800020] transition-colors inline-flex items-center gap-1"
                >
                  <span>Trade License: {COMPANY_INFO.registration.tradeLicense}</span>
                  <ExternalLink className="w-3 h-3 text-[#800020]" />
                </a>
              </div>
            </SlideIn>
          </div>

          {/* Right Column: User-Friendly Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <SlideIn direction="right" distance={20} duration={0.45}>
              <div className="border border-[#E5E7EB] rounded-3xl bg-white p-6 sm:p-9 shadow-sm">
                
                <div className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-black text-[#2D2D2D] tracking-tight">
                    {isBn ? "বার্তা বা কোটেশন রিকোয়েস্ট পাঠান" : "Send a Commercial Inquiry"}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    {isBn
                      ? "নিচের ফর্মটি পূরণ করুন, আমাদের টেক্সটাইল ইঞ্জিনিয়ারিং টিম দ্রুত আপনার সাথে যোগাযোগ করবে।"
                      : "Fill out the fields below and our sourcing coordinator will review your request promptly."}
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="submitted"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="p-8 rounded-3xl bg-gradient-to-b from-emerald-50 to-white border border-emerald-200 text-center"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      
                      <h3 className="font-extrabold text-xl text-slate-900 mb-1">
                        {isBn ? "আপনার বার্তা সফলভাবে গৃহীত হয়েছে!" : "Inquiry Received Successfully!"}
                      </h3>

                      {quoteId && (
                        <div className="my-3 inline-block px-3 py-1 rounded-full bg-white border border-emerald-200 text-xs font-mono font-bold text-[#800020]">
                          Reference ID: {quoteId}
                        </div>
                      )}

                      <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
                        {isBn
                          ? "ধন্যবাদ! আমাদের সেলস টিম আপনার বার্তা পর্যালোচনা করছে এবং খুব দ্রুত আপনার সাথে যোগাযোগ করবে।"
                          : "Thank you. Our technical desk has recorded your inquiry and will follow up with you within business hours."}
                      </p>

                      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-transform active:scale-98 shadow-sm"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>{isBn ? "WhatsApp-এ সরাসরি ফলো-আপ" : "Follow Up on WhatsApp"}</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => {
                            setSubmitted(false);
                            setFormData({
                              name: "",
                              company: "",
                              phone: "",
                              email: "",
                              subject: "Machinery Sourcing",
                              message: "",
                            });
                          }}
                          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer"
                        >
                          {isBn ? "আরেকটি বার্তা পাঠান" : "Send Another Message"}
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-5"
                    >
                      {error && (
                        <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
                          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                          <span className="font-semibold">{error}</span>
                        </div>
                      )}

                      {/* 1. Interactive Subject Selector Chips */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-2">
                          {isBn ? "অনুসন্ধানের বিষয় নির্বাচন করুন:" : "Select Inquiry Topic:"}
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {SUBJECT_OPTIONS.map((sub) => {
                            const Icon = sub.icon;
                            const isSelected = formData.subject === sub.title;
                            return (
                              <button
                                key={sub.id}
                                type="button"
                                onClick={() => setFormData({ ...formData, subject: sub.title })}
                                className={`p-2.5 rounded-2xl border text-left flex items-center gap-2 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] ${
                                  isSelected
                                    ? "bg-[#FDF2F4] border-[#800020] text-[#800020] font-bold shadow-xs ring-1 ring-[#800020]"
                                    : "bg-[#F9FAFB] border-[#E5E7EB] text-slate-700 hover:border-slate-300 hover:bg-white"
                                }`}
                              >
                                <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-[#800020]" : "text-slate-400"}`} />
                                <span className="text-xs truncate">{isBn ? sub.title_bn : sub.title}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 2. Name & Mill Name */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1.5">
                            {isBn ? "আপনার পূর্ণ নাম:" : "Your Full Name:"} <span className="text-[#800020]">*</span>
                          </label>
                          <div className="relative flex items-center">
                            <User className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder={isBn ? "উদাঃ তানভীর আহমেদ" : "e.g. Tanvir Ahmed"}
                              className="w-full bg-white border border-[#D1D5DB] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1.5">
                            {isBn ? "কারখানা বা কোম্পানির নাম:" : "Mill / Factory Name:"} <span className="text-[#800020]">*</span>
                          </label>
                          <div className="relative flex items-center">
                            <Building className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                            <input
                              type="text"
                              required
                              value={formData.company}
                              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                              placeholder={isBn ? "উদাঃ ক্লাসিক নিটওয়্যার লিঃ" : "e.g. Classic Knitwear Ltd."}
                              className="w-full bg-white border border-[#D1D5DB] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* 3. Phone (Bangladeshi Required) & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-bold text-slate-800">
                              {isBn ? "বাংলাদেশি মোবাইল নম্বর:" : "Bangladeshi Mobile:"} <span className="text-[#800020]">*</span>
                            </label>
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80">
                              🇧🇩 +880
                            </span>
                          </div>

                          <div className="relative flex items-center">
                            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                            <input
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              placeholder="01711-XXXXXX or +880 17XX-XXXXXX"
                              className={`w-full bg-white border rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none transition-all ${
                                formData.phone.trim()
                                  ? isValidBangladeshiPhone(formData.phone)
                                    ? "border-emerald-500 ring-1 ring-emerald-500/20"
                                    : "border-red-400 ring-1 ring-red-400/20"
                                  : "border-[#D1D5DB] focus:border-[#800020] focus:ring-1 focus:ring-[#800020]"
                              }`}
                            />
                          </div>

                          <div className="mt-1 flex items-center justify-between text-[11px]">
                            {formData.phone.trim() ? (
                              isValidBangladeshiPhone(formData.phone) ? (
                                <span className="text-emerald-600 font-bold flex items-center gap-1">
                                  <Check className="w-3 h-3 text-emerald-600" />
                                  <span>{isBn ? "সঠিক বাংলাদেশি নম্বর" : "Valid BD Mobile Number"}</span>
                                </span>
                              ) : (
                                <span className="text-red-600 font-semibold flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3 text-red-600" />
                                  <span>{isBn ? "১১ ডিজিটের নম্বর দিন (017XXXXXXXX)" : "Enter 11-digit BD number"}</span>
                                </span>
                              )
                            ) : (
                              <span className="text-slate-400">
                                {isBn ? "উদাঃ 017XXXXXXXX বা 018XXXXXXXX" : "e.g. 017XXXXXXXX or 018XXXXXXXX"}
                              </span>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1.5">
                            {isBn ? "অফিসিয়াল ইমেইল (ঐচ্ছিক):" : "Official Email (Optional):"}
                          </label>
                          <div className="relative flex items-center">
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="procurement@mill.com"
                              className="w-full bg-white border border-[#D1D5DB] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020]"
                            />
                          </div>
                        </div>
                      </div>

                      {/* 4. Message Details with 1-Click Quick Prompts */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-bold text-slate-800">
                            {isBn ? "আপনার বার্তা বা চাহিদামতো বিবরণ:" : "Message & Requirements:"} <span className="text-[#800020]">*</span>
                          </label>
                          <span className="text-[11px] text-slate-400">{isBn ? "১-ক্লিক পরামর্শ:" : "Quick Suggestions:"}</span>
                        </div>

                        {/* Quick Prompts Chips */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                          {QUICK_PROMPTS.map((p, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handlePromptClick(isBn ? p.text_bn : p.text)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium transition-colors cursor-pointer"
                            >
                              + {isBn ? p.text_bn : p.text}
                            </button>
                          ))}
                        </div>

                        <textarea
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder={isBn ? "মেশিনের মডেল, সিলিন্ডার সাইজ, গেজ বা আপনার মিলের চাহিদামতো বিস্তারিত লিখুন..." : "Describe your machinery inquiry, gauge specifications, or request for showroom visit..."}
                          className="w-full bg-white border border-[#D1D5DB] rounded-2xl p-3.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020] placeholder:text-slate-400"
                        />
                      </div>

                      {/* Submit Action */}
                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Clock className="w-4 h-4 text-emerald-600" />
                          <span>{isBn ? "সাধারণত ১-২ ঘণ্টার মধ্যে রেসপন্স" : "Typical response: 1-2 hours"}</span>
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full sm:w-auto bg-[#800020] hover:bg-[#5A0017] text-white px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-2"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-white" />
                              <span>{isBn ? "পাঠানো হচ্ছে..." : "Transmitting..."}</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              <span>{isBn ? "বার্তা পাঠিয়ে দিন" : "Send Commercial Inquiry"}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </SlideIn>
          </div>
        </div>

        {/* Full-Width Interactive Office & Showroom Location Map */}
        <SlideIn direction="up" distance={20} duration={0.45}>
          <div className="mt-12 sm:mt-16">
            <OfficeMap variant="full" />
          </div>
        </SlideIn>
      </div>
    </div>
  );
}
