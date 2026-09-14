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
  ArrowLeft,
  AlertCircle,
  Loader2,
  FileText,
  Check,
  Sparkles,
  Cpu,
  Factory,
  Layers,
  Plus,
  Minus,
  Sliders,
  HelpCircle,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { COMPANY_INFO } from "@/lib/constants";
import { QuoteRequestData } from "@/lib/types";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { useCustomerAuth } from "@/lib/customer/customer-context";
import { AdminStore } from "@/lib/admin/admin-store";
import { trackQuoteSubmission } from "@/components/analytics/GoogleAnalytics";
import { OfficeMap } from "@/components/ui/OfficeMap";

// Quick Preset Options for Fast 1-Click Selection
const MACHINE_CATEGORIES = [
  { id: "double-jersey", name: "Double Jersey", name_bn: "ডাবল জার্সি", icon: Layers, defaultDesc: "Double Jersey Circular Knitting Machine" },
  { id: "single-jersey", name: "Single Jersey", name_bn: "সিঙ্গেল জার্সি", icon: Cpu, defaultDesc: "Single Jersey Circular Knitting Machine" },
  { id: "interlock", name: "Interlock", name_bn: "ইন্টারলক", icon: Layers, defaultDesc: "Interlock Circular Knitting Machine" },
  { id: "jacquard", name: "Jacquard", name_bn: "জ্যাকার্ড", icon: Sparkles, defaultDesc: "Electronic Jacquard Circular Knitting Machine" },
  { id: "terry", name: "Terry / Fleece", name_bn: "টেরি / ফ্লিস", icon: Factory, defaultDesc: "Terry & Fleece Circular Knitting Machine" },
  { id: "dyeing", name: "Dyeing", name_bn: "ডাইং মেশিন", icon: Ship, defaultDesc: "High Temperature Fabric Dyeing Machine" },
  { id: "shearing", name: "Shearing", name_bn: "শিয়ারিং মেশিন", icon: Sliders, defaultDesc: "Precision Fabric Surface Shearing Machine" },
  { id: "finishing", name: "Finishing", name_bn: "ফিনিশিং", icon: Factory, defaultDesc: "Tensionless Fabric Inspection & Finishing Machine" },
];

const POPULAR_MODELS = [
  "Jiunn Long High-Speed Double Jersey (Taiwan)",
  "Longjun Precision Double Jersey (China)",
  "Rongxiang High-Productivity Single Jersey",
  "Wellknit Electronic Jacquard Circular",
  "Ecoflow Low Liquor Ratio Dyeing Machine",
  "High-RPM Interlock 8-Lock Machine",
  "Custom Specification Circular Machine",
];

const PRESET_DIAMETERS = ["30\"", "32\"", "34\"", "36\"", "38\""];
const PRESET_GAUGES = ["20G", "24G", "28G", "32G", "36G"];
const PRESET_FEEDERS = ["72F", "84F", "90F", "96F", "102F", "108F"];
const PRESET_BRANDS = ["Jiunn Long", "Rongxiang", "Longjun", "Wellknit", "Any Recommended Builder"];

const PRESET_FABRICS = [
  "100% Cotton Rib",
  "Cotton + Spandex (Lycra)",
  "Single Jersey 160-180 GSM",
  "French Terry / Fleece",
  "Interlock 40s Cotton",
  "Polyester Sportswear",
];

const PRESET_ATTACHMENTS = [
  "Groz-Beckert Needles (Germany)",
  "Lycra / Spandex Attachment",
  "Japanese Inverter Motor Drive",
  "Memminger-IRO Positive Feeders",
  "Dual Cylinder Conversion Kit",
];

// Bangladeshi Mobile Number Validator
// Accepts 013, 014, 015, 016, 017, 018, 019 followed by 8 digits (total 11 digits), or with +880 / 880 prefix
function isValidBangladeshiPhone(phone: string): boolean {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, "");
  return /^(?:\+?880|880|0)?1[3-9]\d{8}$/.test(cleaned);
}

function QuoteFormContent() {
  const { t, locale } = useTranslation();
  const { customer } = useCustomerAuth();
  const searchParams = useSearchParams();
  const prefilledMachine = searchParams.get("machine") || "";

  const isBn = locale === "bn";

  // Step Management: 1: Machine Selection, 2: Technical Specs, 3: Contact & Submit
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const [formData, setFormData] = useState<QuoteRequestData>({
    name: "",
    company: "",
    phoneOrWhatsApp: "",
    email: "",
    machineType: prefilledMachine || "Double Jersey Circular Knitting Machine",
    gauge: "28G",
    cylinderDiameter: "34\"",
    feederCount: "84F",
    productionTarget: "100% Cotton Rib",
    quantity: "1",
    preferredBrand: "Best Recommended Builder",
    deliveryRequirement: "CFR Chattogram (Standard)",
    message: "",
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("double-jersey");
  const [selectedAttachments, setSelectedAttachments] = useState<string[]>([]);

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
      // Auto advance to Step 2 if machine is already chosen from a product page
      setCurrentStep(2);
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

  const handleCategorySelect = (cat: typeof MACHINE_CATEGORIES[0]) => {
    setSelectedCategory(cat.id);
    setFormData((prev) => ({
      ...prev,
      machineType: cat.defaultDesc,
    }));
  };

  const handleQuantityChange = (delta: number) => {
    const current = parseInt(formData.quantity, 10) || 1;
    const next = Math.max(1, current + delta);
    setFormData((prev) => ({ ...prev, quantity: String(next) }));
  };

  const toggleAttachment = (tag: string) => {
    setSelectedAttachments((prev) => {
      const next = prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag];
      // Update message notes with chosen attachments
      const baseNote = (formData.message || "").replace(/Special Attachments:.*$/m, "").trim();
      const attachmentsNote = next.length > 0 ? `Special Attachments: ${next.join(", ")}` : "";
      setFormData((f) => ({
        ...f,
        message: baseNote ? `${baseNote}\n${attachmentsNote}` : attachmentsNote,
      }));
      return next;
    });
  };

  const validateStep = (step: 1 | 2): boolean => {
    setErrorMessage("");
    if (step === 1) {
      if (!formData.machineType.trim()) {
        setErrorMessage(isBn ? "অনুগ্রহ করে একটি মেশিন বা ক্যাটাগরি নির্বাচন করুন।" : "Please select or enter a machine model.");
        return false;
      }
      return true;
    }
    if (step === 2) {
      // Step 2 is flexible; specs are optional or preset
      return true;
    }
    return true;
  };

  const goToStep = (target: 1 | 2 | 3) => {
    if (target > currentStep) {
      if (currentStep === 1 && !validateStep(1)) return;
    }
    setErrorMessage("");
    setCurrentStep(target);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim() || !formData.company.trim() || !formData.phoneOrWhatsApp.trim()) {
      setErrorMessage(
        isBn
          ? "অনুগ্রহ করে আপনার নাম, মিলের নাম এবং মোবাইল বা হোয়াটসঅ্যাপ নম্বর প্রদান করুন।"
          : "Please provide your Name, Mill/Company, and Contact Number."
      );
      return;
    }

    // Bangladeshi phone number requirement
    if (!isValidBangladeshiPhone(formData.phoneOrWhatsApp)) {
      setErrorMessage(
        isBn
          ? "অনুগ্রহ করে একটি সঠিক ১১ ডিজিটের বাংলাদেশি মোবাইল নম্বর দিন (উদাঃ 017XXXXXXXX বা +88017XXXXXXXX)।"
          : "Please provide a valid 11-digit Bangladeshi mobile number (e.g., 017XXXXXXXX or +88017XXXXXXXX)."
      );
      return;
    }

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
        setErrorMessage(
          isBn
            ? "একটি অপ্রত্যাশিত সমস্যা হয়েছে। দয়া করে হোয়াটসঅ্যাপে সরাসরি যোগাযোগ করুন।"
            : "An unexpected error occurred. Please try again or contact via WhatsApp."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const shouldReduceMotion = useReducedMotion();

  // WhatsApp quick text for top banner
  const quickWhatsAppUrl = `https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    isBn
      ? "আসসালামু আলাইকুম, আমি তাসনীম নিট ইন্ডাস্ট্রি থেকে সার্কুলার নিটিং / ডাইং মেশিনের কোটেশন ও দাম জানতে চাচ্ছি।"
      : "Hello, I would like to inquire about industrial knitting machinery quotation and CFR Chattogram delivery terms."
  )}`;

  return (
    <div className="py-10 sm:py-16 bg-[#FAFAFB] text-[#2D2D2D] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Fast-Track WhatsApp Top Banner */}
        <div className="mb-8 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-extrabold tracking-tight leading-tight">
                {isBn ? "দ্রুত কোটেশন বা সরাসরি কথা বলতে চান?" : "Need an Instant Quote or Price Estimation?"}
              </p>
              <p className="text-[11px] sm:text-xs text-white/85 mt-0.5">
                {isBn
                  ? `ফর্ম পূরণ ছাড়াই সরাসরি আমাদের ইঞ্জিনিয়ারের সাথে WhatsApp-এ কথা বলুন (${COMPANY_INFO.whatsappFormatted})`
                  : `Skip the form and chat directly with our technical sourcing manager on WhatsApp (${COMPANY_INFO.whatsappFormatted})`}
              </p>
            </div>
          </div>
          <a
            href={quickWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 text-xs font-bold shrink-0 shadow-xs transition-transform active:scale-95"
          >
            <span>{isBn ? "সরাসরি WhatsApp চ্যাট" : "Instant WhatsApp Chat"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Page Header */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D8A4AF] bg-[#FDF2F4] text-xs font-bold text-[#800020] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#800020] animate-pulse" />
            <span>{isBn ? "বাণিজ্যিক আমদানি ও সিএফআর কোটেশন" : "B2B Commercial Procurement & Sourcing"}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#2D2D2D]">
            {isBn ? "শিল্পমানের মেশিনারি কোটেশন রিকোয়েস্ট" : "Request an Industrial Machinery Quotation"}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#4B5563] leading-relaxed">
            {isBn
              ? "চীন ও তাইওয়ানের শীর্ষ প্রস্তুতকারক থেকে সরাসরি ফ্যাক্টরি মূল্যে আমদানি। মাত্র ৩টি সহজ ধাপে আপনার মিলের চাহিদা অনুযায়ী অফিশিয়াল সিএফআর চট্টগ্রাম কোটেশন গ্রহণ করুন।"
              : "Direct import from primary manufacturers in China and Taiwan. Complete the 3 simple steps below to receive a formal CFR Chattogram commercial proposal within 24 hours."}
          </p>
        </div>

        {/* Interactive 3-Step Indicator Bar */}
        <div className="mb-8 p-3 sm:p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-2xs">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 relative">
            {/* Step 1 */}
            <button
              type="button"
              onClick={() => goToStep(1)}
              className={`flex items-center gap-2.5 sm:gap-3 p-2 rounded-xl text-left transition-colors cursor-pointer ${
                currentStep === 1
                  ? "bg-[#FDF2F4] border border-[#D8A4AF]"
                  : "hover:bg-slate-50 border border-transparent"
              }`}
            >
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                  currentStep === 1
                    ? "bg-[#800020] text-white shadow-xs"
                    : currentStep > 1
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {currentStep > 1 ? <Check className="w-4 h-4" /> : "1"}
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {isBn ? "ধাপ ১" : "Step 1"}
                </span>
                <span className={`text-xs sm:text-sm font-bold truncate block ${currentStep === 1 ? "text-[#800020]" : "text-slate-800"}`}>
                  {isBn ? "মেশিন নির্বাচন" : "Machine Model"}
                </span>
              </div>
            </button>

            {/* Step 2 */}
            <button
              type="button"
              onClick={() => goToStep(2)}
              className={`flex items-center gap-2.5 sm:gap-3 p-2 rounded-xl text-left transition-colors cursor-pointer ${
                currentStep === 2
                  ? "bg-[#FDF2F4] border border-[#D8A4AF]"
                  : "hover:bg-slate-50 border border-transparent"
              }`}
            >
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                  currentStep === 2
                    ? "bg-[#800020] text-white shadow-xs"
                    : currentStep > 2
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {currentStep > 2 ? <Check className="w-4 h-4" /> : "2"}
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {isBn ? "ধাপ ২" : "Step 2"}
                </span>
                <span className={`text-xs sm:text-sm font-bold truncate block ${currentStep === 2 ? "text-[#800020]" : "text-slate-800"}`}>
                  {isBn ? "স্পেসিফিকেশন" : "Technical Specs"}
                </span>
              </div>
            </button>

            {/* Step 3 */}
            <button
              type="button"
              onClick={() => goToStep(3)}
              className={`flex items-center gap-2.5 sm:gap-3 p-2 rounded-xl text-left transition-colors cursor-pointer ${
                currentStep === 3
                  ? "bg-[#FDF2F4] border border-[#D8A4AF]"
                  : "hover:bg-slate-50 border border-transparent"
              }`}
            >
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                  currentStep === 3
                    ? "bg-[#800020] text-white shadow-xs"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                3
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {isBn ? "ধাপ ৩" : "Step 3"}
                </span>
                <span className={`text-xs sm:text-sm font-bold truncate block ${currentStep === 3 ? "text-[#800020]" : "text-slate-800"}`}>
                  {isBn ? "মিলের তথ্য ও সাবমিট" : "Mill Contact & Submit"}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Form Body and Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Wizard Container (8 cols) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {successResult ? (
                /* Success Screen */
                <motion.div
                  key="success"
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="border border-[#E5E7EB] rounded-3xl bg-white p-6 sm:p-10 shadow-lg shadow-black/5"
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mb-5 shadow-xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#2D2D2D] tracking-tight">
                    {isBn ? "কোটেশন রিকোয়েস্ট সফলভাবে গৃহীত হয়েছে!" : "Quotation Request Received Successfully!"}
                  </h2>
                  
                  <div className="mt-4 p-4 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="text-[#6B7280] block font-medium">
                        {isBn ? "আপনার অফিসিয়াল রেফারেন্স আইডি:" : "Your Official Reference ID:"}
                      </span>
                      <span className="font-mono text-base font-extrabold text-[#800020]">
                        {successResult.quoteId}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 border border-emerald-200 px-3 py-1 rounded-full self-start sm:self-auto">
                      {isBn ? "✓ ২৪ ঘণ্টার মধ্যে প্রফরমা ইনভয়েস" : "✓ 24hr Commercial Turnaround"}
                    </span>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                    {isBn
                      ? "ধন্যবাদ! আমাদের টেক্সটাইল ইঞ্জিনিয়ারিং টিম আপনার কাঙ্ক্ষিত স্পেসিফিকেশন ও উৎপাদন লক্ষ্যমাত্রা যাচাই করছে। আন্তর্জাতিক প্রস্তুতকারক থেকে সরাসরি সিএফআর চট্টগ্রাম পোর্ট রেট তৈরি করে দ্রুত আপনার সাথে যোগাযোগ করা হবে।"
                      : "Thank you for submitting your specifications. Our machinery engineering desk is reviewing your requirements and preparing direct factory CFR Chattogram pricing."}
                  </p>

                  {/* Immediate WhatsApp Follow-up */}
                  <div className="mt-8 pt-6 border-t border-[#E5E7EB]">
                    <h3 className="text-sm font-bold text-[#2D2D2D] mb-1.5">
                      {isBn ? "তাৎক্ষণিক প্রতিক্রিয়া প্রয়োজন?" : "Need an Urgent Response?"}
                    </h3>
                    <p className="text-xs text-[#6B7280] mb-4">
                      {isBn
                        ? "নিচের বাটনে ক্লিক করে রেফারেন্স আইডি ও মেশিনের বিবরণসহ সরাসরি সেলস টিমের সাথে চ্যাট করুন।"
                        : "Click below to connect directly with our sales desk on WhatsApp with your quote reference pre-filled."}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={successResult.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-98"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{isBn ? "WhatsApp-এ সরাসরি কথা বলুন" : "Chat on WhatsApp"} ({COMPANY_INFO.whatsappFormatted})</span>
                      </a>
                      <Link
                        href="/account/quotes"
                        className="inline-flex items-center gap-2 bg-white border border-[#D1D5DB] hover:border-[#800020] text-[#2D2D2D] px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-2xs"
                      >
                        <FileText className="w-4 h-4 text-[#800020]" />
                        <span>{isBn ? "মাই কোটেশন তালিকায় দেখুন" : "View in My Quotes"}</span>
                      </Link>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        setSuccessResult(null);
                        setCurrentStep(1);
                      }}
                      className="text-xs font-semibold text-[#6B7280] hover:text-[#2D2D2D] underline cursor-pointer"
                    >
                      {isBn ? "নতুন আরেকটি মেশিনের জন্য কোটেশন চান?" : "Submit another machinery quote request"}
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* The Multi-Step Interactive Form */
                <motion.form
                  key={`step-${currentStep}`}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSubmit}
                  className="border border-[#E5E7EB] rounded-3xl bg-white p-5 sm:p-8 lg:p-10 shadow-sm flex flex-col gap-6"
                >
                  {errorMessage && (
                    <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      <span className="font-medium">{errorMessage}</span>
                    </div>
                  )}

                  {/* ========================================================================= */}
                  {/* STEP 1: Machine & Category Selection */}
                  {/* ========================================================================= */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#800020] block mb-1">
                          {isBn ? "ধাপ ১: মেশিন ক্যাটাগরি ও মডেল" : "Step 1: Machine Category & Selection"}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                          {isBn ? "কোন ধরণের মেশিনারি আপনার কারখানায় প্রয়োজন?" : "What machinery does your mill require?"}
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">
                          {isBn
                            ? "দ্রুত নির্বাচনের জন্য নিচের ক্যাটাগরি কার্ডে ক্লিক করুন অথবা পছন্দের মডেল নির্বাচন করুন।"
                            : "Click a category below to automatically set technical parameters, or type your desired model."}
                        </p>
                      </div>

                      {/* Visual Category Grid */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-2.5">
                          {isBn ? "জনপ্রিয় মেশিন ক্যাটাগরি (১-ক্লিকে নির্বাচন করুন):" : "Popular Machine Categories (1-Click Selection):"}
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                          {MACHINE_CATEGORIES.map((cat) => {
                            const Icon = cat.icon;
                            const isSelected = selectedCategory === cat.id;
                            return (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => handleCategorySelect(cat)}
                                className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                                  isSelected
                                    ? "bg-[#FDF2F4] border-[#800020] text-[#800020] shadow-xs ring-1 ring-[#800020]"
                                    : "bg-[#F9FAFB] border-[#E5E7EB] text-slate-700 hover:border-slate-300 hover:bg-white"
                                }`}
                              >
                                <Icon className={`w-5 h-5 mb-2 ${isSelected ? "text-[#800020]" : "text-slate-500"}`} />
                                <div>
                                  <span className="text-xs font-bold block leading-snug">
                                    {isBn ? cat.name_bn : cat.name}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Specific Model Selector or Custom Input */}
                      <div className="space-y-3 pt-2">
                        <label className="block text-xs font-bold text-slate-800">
                          {isBn ? "মেশিনের পূর্ণ নাম বা মডেল:" : "Machine Name or Requested Model:"} <span className="text-[#800020]">*</span>
                        </label>
                        
                        {/* Quick Model Suggestion Dropdown */}
                        <div className="relative">
                          <select
                            onChange={(e) => {
                              if (e.target.value) {
                                setFormData((prev) => ({ ...prev, machineType: e.target.value }));
                              }
                            }}
                            className="w-full bg-[#F9FAFB] border border-[#E5E7EB] text-slate-800 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:outline-none focus:border-[#800020] focus:bg-white transition-colors mb-2"
                          >
                            <option value="">{isBn ? "-- প্রস্তুতকারকের মডেল তালিকা থেকে বেছে নিন --" : "-- Or choose from verified manufacturer models --"}</option>
                            {POPULAR_MODELS.map((m, idx) => (
                              <option key={idx} value={m}>
                                {m}
                              </option>
                            ))}
                          </select>

                          <input
                            type="text"
                            name="machineType"
                            required
                            value={formData.machineType}
                            onChange={handleChange}
                            placeholder={isBn ? "উদাঃ Double Jersey Circular Knitting Machine 34\" 28G" : "e.g. Double Jersey Circular Knitting Machine 34\" 28G"}
                            className="w-full bg-white border border-[#D1D5DB] text-[#2D2D2D] rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020]"
                          />
                        </div>
                      </div>

                      {/* Quantity Selector with Quick Stepper */}
                      <div className="pt-2">
                        <label className="block text-xs font-bold text-slate-800 mb-2">
                          {isBn ? "প্রয়োজনীয় মেশিনের সংখ্যা (Units):" : "Number of Machines (Units):"} <span className="text-[#800020]">*</span>
                        </label>
                        <div className="flex flex-wrap items-center gap-3">
                          {/* Stepper */}
                          <div className="inline-flex items-center rounded-xl border border-[#D1D5DB] bg-white p-1 shadow-2xs">
                            <button
                              type="button"
                              onClick={() => handleQuantityChange(-1)}
                              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <input
                              type="number"
                              name="quantity"
                              min="1"
                              value={formData.quantity}
                              onChange={handleChange}
                              className="w-14 text-center font-extrabold text-sm text-slate-900 focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => handleQuantityChange(1)}
                              className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                              aria-label="Increase"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Quick Pills */}
                          <div className="flex items-center gap-1.5">
                            {["1", "2", "4", "6", "10+"].map((qty) => (
                              <button
                                key={qty}
                                type="button"
                                onClick={() => setFormData((prev) => ({ ...prev, quantity: qty.replace("+", "") }))}
                                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                                  formData.quantity === qty.replace("+", "")
                                    ? "bg-slate-900 text-white border-slate-900"
                                    : "bg-white text-slate-600 border-[#E5E7EB] hover:bg-slate-50"
                                }`}
                              >
                                {qty} {isBn ? "টি" : "Units"}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Nav Action */}
                      <div className="pt-6 border-t border-[#E5E7EB] flex items-center justify-end">
                        <button
                          type="button"
                          onClick={() => goToStep(2)}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#800020] hover:bg-[#5A0017] text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
                        >
                          <span>{isBn ? "পরবর্তী ধাপ: টেকনিক্যাল স্পেসিফিকেশন" : "Next: Technical Specs"}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ========================================================================= */}
                  {/* STEP 2: Technical Specifications & Incoterms */}
                  {/* ========================================================================= */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#800020] block mb-1">
                          {isBn ? "ধাপ ২: টেকনিক্যাল প্যারামিটার" : "Step 2: Technical Parameters"}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                          {isBn ? "মেশিনের সাইজ ও স্পেসিফিকেশন নির্বাচন করুন" : "Configure Cylinder, Gauge & Delivery Terms"}
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">
                          {isBn
                            ? "দ্রুত পূরণ করতে যেকোনো চিপে ক্লিক করুন। আপনার নির্দিষ্ট মাপ থাকলে সরাসরি টাইপ করতে পারেন।"
                            : "Click preset chips for instant setup, or customize directly in the fields below."}
                        </p>
                      </div>

                      {/* 1. Cylinder Diameter */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-bold text-slate-800">
                            {isBn ? "সিলিন্ডার ডায়ামিটার (Cylinder Diameter):" : "Cylinder Diameter:"}
                          </label>
                          <span className="text-[11px] text-slate-400 font-medium">Standard 30" – 38"</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {PRESET_DIAMETERS.map((dia) => (
                            <button
                              key={dia}
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, cylinderDiameter: dia }))}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                                formData.cylinderDiameter === dia
                                  ? "bg-[#FDF2F4] border-[#800020] text-[#800020] ring-1 ring-[#800020]"
                                  : "bg-[#F9FAFB] border-[#E5E7EB] text-slate-700 hover:bg-white"
                              }`}
                            >
                              {dia}
                            </button>
                          ))}
                        </div>
                        <input
                          type="text"
                          name="cylinderDiameter"
                          value={formData.cylinderDiameter}
                          onChange={handleChange}
                          placeholder={isBn ? "উদাঃ 34\" বা কাস্টম সাইজ" : "e.g. 34\" or custom diameter"}
                          className="w-full bg-white border border-[#D1D5DB] text-slate-900 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#800020]"
                        />
                      </div>

                      {/* 2. Gauge */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-bold text-slate-800">
                            {isBn ? "গেজ (Gauge):" : "Knitting Gauge:"}
                          </label>
                          <span className="text-[11px] text-slate-400 font-medium">Standard 20G – 36G</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {PRESET_GAUGES.map((g) => (
                            <button
                              key={g}
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, gauge: g }))}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                                formData.gauge === g
                                  ? "bg-[#FDF2F4] border-[#800020] text-[#800020] ring-1 ring-[#800020]"
                                  : "bg-[#F9FAFB] border-[#E5E7EB] text-slate-700 hover:bg-white"
                              }`}
                            >
                              {g}
                            </button>
                          ))}
                        </div>
                        <input
                          type="text"
                          name="gauge"
                          value={formData.gauge}
                          onChange={handleChange}
                          placeholder={isBn ? "উদাঃ 28G বা 24G" : "e.g. 28G, 32G"}
                          className="w-full bg-white border border-[#D1D5DB] text-slate-900 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#800020]"
                        />
                      </div>

                      {/* 3. Feeder Count */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-bold text-slate-800">
                            {isBn ? "ফিডার সংখ্যা (Feeder Count):" : "Feeder Count:"}
                          </label>
                          <span className="text-[11px] text-slate-400 font-medium">72F – 108F</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {PRESET_FEEDERS.map((f) => (
                            <button
                              key={f}
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, feederCount: f }))}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                                formData.feederCount === f
                                  ? "bg-[#FDF2F4] border-[#800020] text-[#800020] ring-1 ring-[#800020]"
                                  : "bg-[#F9FAFB] border-[#E5E7EB] text-slate-700 hover:bg-white"
                              }`}
                            >
                              {f}
                            </button>
                          ))}
                        </div>
                        <input
                          type="text"
                          name="feederCount"
                          value={formData.feederCount}
                          onChange={handleChange}
                          placeholder={isBn ? "উদাঃ 84F বা 96F" : "e.g. 84F, 96F"}
                          className="w-full bg-white border border-[#D1D5DB] text-slate-900 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#800020]"
                        />
                      </div>

                      {/* 4. Target Fabric Output */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5">
                          {isBn ? "টার্গেট ফ্যাব্রিক / কাপড়ের ধরন:" : "Target Fabric Output:"}
                        </label>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          {PRESET_FABRICS.map((fab) => (
                            <button
                              key={fab}
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, productionTarget: fab }))}
                              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                                formData.productionTarget === fab
                                  ? "bg-slate-900 text-white border-slate-900"
                                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-white"
                              }`}
                            >
                              {fab}
                            </button>
                          ))}
                        </div>
                        <input
                          type="text"
                          name="productionTarget"
                          value={formData.productionTarget}
                          onChange={handleChange}
                          placeholder={isBn ? "উদাঃ ৫০০ কেজি/দিন 100% Cotton Rib বা Lycra Single Jersey" : "e.g. 500 kg/day 100% Cotton Rib or Lycra Single Jersey"}
                          className="w-full bg-white border border-[#D1D5DB] text-slate-900 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#800020]"
                        />
                      </div>

                      {/* 5. Special Attachments & Needles */}
                      <div className="p-4 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB]">
                        <label className="block text-xs font-bold text-slate-800 mb-2">
                          {isBn ? "বিশেষ এক্সেসরিজ বা উপাদান (ঐচ্ছিক):" : "Special Components & Attachments (Optional):"}
                        </label>
                        <div className="flex flex-wrap items-center gap-2">
                          {PRESET_ATTACHMENTS.map((att) => {
                            const isChecked = selectedAttachments.includes(att);
                            return (
                              <button
                                key={att}
                                type="button"
                                onClick={() => toggleAttachment(att)}
                                className={`px-2.5 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-colors cursor-pointer ${
                                  isChecked
                                    ? "bg-emerald-50 text-emerald-800 border-emerald-300 font-bold"
                                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                                }`}
                              >
                                {isChecked && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                                <span>{att}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 6. Delivery Incoterms */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-2">
                          {isBn ? "ডেলিভারি ও শিপমেন্ট শর্ত (Incoterms):" : "Delivery Requirements & Incoterms:"}
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {[
                            {
                              val: "CFR Chattogram (Standard)",
                              title: "CFR Chattogram Port",
                              title_bn: "সিএফআর চট্টগ্রাম পোর্ট",
                              desc: isBn ? "সমুদ্রপথে কন্টেইনার শিপমেন্ট অন্তর্ভুক্ত" : "Full sea freight container logistics included",
                            },
                            {
                              val: "Turnkey Factory Door (Including Clearing & Transport)",
                              title: "Turnkey Factory Door",
                              title_bn: "টার্নকি ফ্যাক্টরি ডোর",
                              desc: isBn ? "ক্লিয়ারিং ও কারখানায় পরিবহনসহ সম্পূর্ণ সেবা" : "Includes customs handling & transit to your mill",
                            },
                            {
                              val: "FOB Port of Origin",
                              title: "FOB Port of Origin",
                              title_bn: "এফওবি মূল বন্দর",
                              desc: isBn ? "ক্লায়েন্ট নিজস্ব লজিস্টিকস ব্যবহার করবে" : "Client arranges ocean freight independently",
                            },
                          ].map((opt) => (
                            <button
                              key={opt.val}
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, deliveryRequirement: opt.val }))}
                              className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-colors cursor-pointer ${
                                formData.deliveryRequirement === opt.val
                                  ? "bg-[#FDF2F4] border-[#800020] text-[#800020] ring-1 ring-[#800020]"
                                  : "bg-[#F9FAFB] border-[#E5E7EB] text-slate-700 hover:bg-white"
                              }`}
                            >
                              <span className="text-xs font-bold block">{isBn ? opt.title_bn : opt.title}</span>
                              <span className="text-[11px] text-slate-500 mt-1 block">{opt.desc}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Nav Action */}
                      <div className="pt-6 border-t border-[#E5E7EB] flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => goToStep(1)}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>{isBn ? "পূর্ববর্তী ধাপ" : "Back"}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => goToStep(3)}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#800020] hover:bg-[#5A0017] text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer"
                        >
                          <span>{isBn ? "পরবর্তী ধাপ: যোগাযোগ ও মিলের তথ্য" : "Next: Buyer Contact Details"}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ========================================================================= */}
                  {/* STEP 3: Contact Details & Final Submission */}
                  {/* ========================================================================= */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#800020] block mb-1">
                          {isBn ? "ধাপ ৩: যোগাযোগ ও প্রফরমা ইনভয়েস" : "Step 3: Buyer & Factory Information"}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                          {isBn ? "আপনার মিল ও যোগাযোগের তথ্য দিন" : "Where should we send the quotation?"}
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">
                          {isBn
                            ? "অফিসিয়াল সিএফআর প্রফরমা ইনভয়েস ও স্পেসিফিকেশন শিট আপনার এই নম্বরে পাঠানো হবে।"
                            : "Your formal commercial proposal and CIF/CFR terms will be sent directly to your desk."}
                        </p>
                      </div>

                      {/* Buyer Name & Mill Name */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1">
                            {isBn ? "আপনার পূর্ণ নাম বা পদবী:" : "Contact Person / Designation:"} <span className="text-[#800020]">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={isBn ? "উদাঃ ইঞ্জিঃ রফিকুল ইসলাম" : "e.g. Engr. Rafiqul Islam"}
                            className="w-full bg-white border border-[#D1D5DB] text-slate-900 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1">
                            {isBn ? "কারখানা বা কোম্পানির নাম:" : "Mill / Factory / Company Name:"} <span className="text-[#800020]">*</span>
                          </label>
                          <input
                            type="text"
                            name="company"
                            required
                            value={formData.company}
                            onChange={handleChange}
                            placeholder={isBn ? "উদাঃ তাসনীম কম্পোজিট নিট মিলস লিঃ" : "e.g. Apex Knitwear Mills Ltd."}
                            className="w-full bg-white border border-[#D1D5DB] text-slate-900 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020]"
                          />
                        </div>
                      </div>

                      {/* Phone & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-bold text-slate-800">
                              {isBn ? "বাংলাদেশি মোবাইল বা WhatsApp নম্বর:" : "Bangladeshi Mobile / WhatsApp:"}{" "}
                              <span className="text-[#800020]">*</span>
                            </label>
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                              <span>🇧🇩</span>
                              <span>{isBn ? "বাংলাদেশি নম্বর আবশ্যক" : "+880 Required"}</span>
                            </span>
                          </div>

                          <div className="relative flex items-center">
                            <input
                              type="tel"
                              name="phoneOrWhatsApp"
                              required
                              value={formData.phoneOrWhatsApp}
                              onChange={handleChange}
                              placeholder="01711-XXXXXX or +880 17XX-XXXXXX"
                              className={`w-full bg-white border text-slate-900 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold focus:outline-none transition-all ${
                                formData.phoneOrWhatsApp.trim()
                                  ? isValidBangladeshiPhone(formData.phoneOrWhatsApp)
                                    ? "border-emerald-500 ring-1 ring-emerald-500/20"
                                    : "border-red-400 ring-1 ring-red-400/20"
                                  : "border-[#D1D5DB] focus:border-[#800020] focus:ring-1 focus:ring-[#800020]"
                              }`}
                            />
                          </div>

                          <div className="mt-1.5 flex items-center justify-between text-[11px]">
                            {formData.phoneOrWhatsApp.trim() ? (
                              isValidBangladeshiPhone(formData.phoneOrWhatsApp) ? (
                                <span className="text-emerald-600 font-bold flex items-center gap-1">
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>{isBn ? "সঠিক বাংলাদেশি মোবাইল নম্বর যাচাইকৃত" : "Valid Bangladeshi mobile number"}</span>
                                </span>
                              ) : (
                                <span className="text-red-600 font-semibold flex items-center gap-1">
                                  <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                                  <span>
                                    {isBn
                                      ? "সঠিক ১১ ডিজিটের নম্বর দিন (যেমনঃ 017XXXXXXXX বা 018XXXXXXXX)"
                                      : "Enter valid 11-digit BD number (e.g. 017XXXXXXXX)"}
                                  </span>
                                </span>
                              )
                            ) : (
                              <span className="text-slate-400">
                                {isBn
                                  ? "১১ ডিজিট (উদাঃ 017XXXXXXXX, 018XXXXXXXX, 019XXXXXXXX)"
                                  : "11 digits (e.g. 017XXXXXXXX, 018XXXXXXXX)"}
                              </span>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1">
                            {isBn ? "অফিসিয়াল ইমেইল ঠিকানা (ঐচ্ছিক):" : "Official Email Address (Optional):"}
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="procurement@yourmill.com"
                            className="w-full bg-white border border-[#D1D5DB] text-slate-900 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020]"
                          />
                          <span className="text-[11px] text-slate-400 mt-1 block">
                            {isBn ? "পিডিএফ প্রফরমা ইনভয়েস প্রাপ্তির জন্য।" : "For formal commercial PDF proforma invoice."}
                          </span>
                        </div>
                      </div>

                      {/* Additional Notes */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          {isBn ? "বিশেষ কোনো নির্দেশনা বা টাইমলাইন (ঐচ্ছিক):" : "Additional Specifications or Timeline Requirements:"}
                        </label>
                        <textarea
                          name="message"
                          rows={3}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder={isBn ? "নির্দিষ্ট কোনো ব্রান্ড বা ইনস্টলেশনের সম্ভাব্য তারিখ থাকলে এখানে উল্লেখ করতে পারেন..." : "Mention preferred delivery timeline, LC bank conditions, or specific motor drives..."}
                          className="w-full bg-white border border-[#D1D5DB] text-slate-900 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#800020]"
                        />
                      </div>

                      {/* Quick Summary Review Box */}
                      <div className="p-4 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">
                            {isBn ? "সারসংক্ষেপ যাচাই:" : "Quotation Summary Review:"}
                          </span>
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                            {formData.quantity} {isBn ? "মেশিন" : "Units"}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-600 pt-1">
                          <div>
                            <span className="text-slate-400 block text-[10px]">Model:</span>
                            <span className="font-semibold text-slate-900 line-clamp-1">{formData.machineType}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Parameters:</span>
                            <span className="font-semibold text-slate-900">{formData.cylinderDiameter} • {formData.gauge}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Incoterms:</span>
                            <span className="font-semibold text-slate-900 line-clamp-1">{formData.deliveryRequirement}</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Nav Action & Submit */}
                      <div className="pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4">
                        <button
                          type="button"
                          onClick={() => goToStep(2)}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>{isBn ? "স্পেসিফিকেশনে ফিরুন" : "Back to Specs"}</span>
                        </button>

                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full sm:w-auto bg-[#800020] hover:bg-[#5A0017] text-white px-8 py-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-white" />
                              <span>{isBn ? "কোটেশন তৈরি হচ্ছে..." : "Submitting Request..."}</span>
                            </>
                          ) : (
                            <>
                              <span>{isBn ? "অফিসিয়াল কোটেশন রিকোয়েস্ট পাঠান" : "Submit Formal Quote Request"}</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Sourcing Guarantee & Live Summary Sidebar (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Live Real-time Machinery Summary Card */}
            <div className="border border-[#E5E7EB] rounded-3xl bg-white p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                <h3 className="font-extrabold text-sm text-[#2D2D2D] flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#800020]" />
                  <span>{isBn ? "আপনার কাঙ্ক্ষিত মেশিন" : "Selected Equipment"}</span>
                </h3>
                <span className="text-[10px] font-bold text-[#800020] bg-[#FDF2F4] border border-[#F9E6EA] px-2.5 py-0.5 rounded-full">
                  {formData.quantity} {isBn ? "টি মেশিন" : "Units"}
                </span>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px] font-medium">
                    {isBn ? "মডেল / টাইপ:" : "Machine Model:"}
                  </span>
                  <span className="font-bold text-slate-900 block mt-0.5 line-clamp-2">
                    {formData.machineType}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Diameter:</span>
                    <span className="font-bold text-slate-900">{formData.cylinderDiameter || "Contact"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Gauge:</span>
                    <span className="font-bold text-slate-900">{formData.gauge || "Contact"}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Feeders:</span>
                    <span className="font-bold text-slate-900">{formData.feederCount || "Contact"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Incoterms:</span>
                    <span className="font-bold text-slate-900 line-clamp-1">{(formData.deliveryRequirement || "CFR").split(" ")[0]}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-emerald-700 font-semibold text-[11px]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{isBn ? "২৪ ঘণ্টার মধ্যে প্রফরমা রেসপন্স" : "24 Business Hours Response SLA"}</span>
                </div>
              </div>
            </div>

            {/* Quick Sourcing Assurance */}
            <div className="border border-[#E5E7EB] rounded-3xl bg-[#F9FAFB] p-6 shadow-xs">
              <h3 className="font-bold text-sm text-[#2D2D2D] mb-3.5 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{isBn ? "তাসনীম বাণিজ্যিক নিশ্চয়তা" : "Direct Commercial Guarantee"}</span>
              </h3>
              <ul className="flex flex-col gap-3 text-xs text-[#4B5563] leading-relaxed">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#800020] shrink-0 mt-0.5" />
                  <span><strong className="text-[#2D2D2D]">{isBn ? "সরাসরি ফ্যাক্টরি রেট:" : "Zero Intermediary Markup:"}</strong> {isBn ? "কোনো দালাল ছাড়াই বিদেশি কারখানা থেকে সরাসরি আমদানি।" : "Direct factory pricing with transparent import invoice."}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#800020] shrink-0 mt-0.5" />
                  <span><strong className="text-[#2D2D2D]">{isBn ? "প্রি-শিপমেন্ট ইন্সপেকশন:" : "Pre-Shipment Inspection:"}</strong> {isBn ? "SGS বা Intertek দিয়ে সম্পূর্ণ মান যাচাই।" : "SGS / BV verification arranged prior to container loading."}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#800020] shrink-0 mt-0.5" />
                  <span><strong className="text-[#2D2D2D]">{isBn ? "নিখুঁত L/C পেপারস:" : "Full L/C Compliance:"}</strong> {isBn ? "বাংলাদেশ ব্যাংকের গাইডলাইন মেনে নির্ভরযোগ্য PI।" : "Proforma Invoices compliant with Bangladesh Bank."}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#800020] shrink-0 mt-0.5" />
                  <span><strong className="text-[#2D2D2D]">{isBn ? "অন-সাইট ইনস্টলেশন:" : "Local Commissioning:"}</strong> {isBn ? "অভিজ্ঞ ইঞ্জিনিয়ার দিয়ে মিলে সরাসরি ট্রায়াল সম্পন্ন।" : "Factory-floor machine leveling, setup and test run."}</span>
                </li>
              </ul>
            </div>

            {/* Direct Channel Dark Card */}
            <div className="border border-[#111111] rounded-3xl bg-[#2D2D2D] text-white p-6 shadow-md">
              <h3 className="font-bold text-sm mb-1.5 text-white">{isBn ? "জরুরি প্রয়োজনে সরাসরি যোগাযোগ" : "Direct Helpline Desk"}</h3>
              <p className="text-xs text-[#A0A0A0] mb-4 leading-relaxed">
                {isBn
                  ? "জরুরি কোটেশন বা এল/সি সংক্রান্ত যেকোনো আলোচনার জন্য সরাসরি আমাদের সেলস ডেস্কে কথা বলুন।"
                  : "Speak directly with our technical import managers in Narayanganj for urgent tender requirements."}
              </p>

              <div className="flex flex-col gap-2.5 text-xs">
                <a
                  href={quickWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-xl font-bold flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp: {COMPANY_INFO.whatsappFormatted}
                  </span>
                  <span>→</span>
                </a>

                <a
                  href={`tel:${COMPANY_INFO.phone.replace(/[^0-9+]/g, "")}`}
                  className="bg-[#1A1A1A] hover:bg-[#222222] border border-[#2A2A2A] text-white p-3 rounded-xl font-bold flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#A0A0A0]" />
                    Hotline: {COMPANY_INFO.phone}
                  </span>
                  <span>→</span>
                </a>

                <div className="pt-2 text-[11px] text-[#A0A0A0]">
                  <p>📍 {isBn ? "বিসিক শিল্প এলাকা, নারায়ণগঞ্জ" : "BSCIC Industrial Park, Narayanganj"}</p>
                  <p className="mt-0.5">🕒 {COMPANY_INFO.businessHours}</p>
                  <div className="mt-3">
                    <OfficeMap variant="compact" showAddressCard={false} />
                  </div>
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
