"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Building2,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  Eye,
  EyeOff,
  ChevronDown,
} from "lucide-react";
import { useCustomerAuth } from "@/lib/customer/customer-context";
import { AuthSunsetBackdrop } from "@/components/auth/AuthSunsetBackdrop";

export default function CustomerRegisterPage() {
  const router = useRouter();
  const { register } = useCustomerAuth();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [interest, setInterest] = useState("double-jersey");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    company: string;
    email: string;
    phone: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !company.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      setError("Please fill in all required company, contact, and password fields.");
      return;
    }

    if (!agreeTerms) {
      setError("Please agree to the Terms of Service to proceed.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await register(name, company, email, phone, password);
      if (!res.success) {
        setError(res.error || "Registration failed. Please try again.");
        return;
      }

      setSubmittedData({
        name: name.trim(),
        company: company.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthSunsetBackdrop>
      <div className="relative w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0 py-6">
        
        {/* Main Floating White Card */}
        <div className="relative z-20 w-full max-w-lg bg-white rounded-[32px] sm:rounded-[36px] shadow-[0_25px_70px_rgba(0,0,0,0.3)] p-6 sm:p-10 border border-white/60">
          
          {/* Protruding Notch / Tab on Top Right (like reference image) */}
          <div className="absolute -top-3.5 sm:-top-4 right-8 bg-white px-5 py-1.5 rounded-full shadow-md border border-slate-100 flex items-center gap-1.5 text-xs font-bold text-slate-800 tracking-wide select-none">
            <span className="w-2 h-2 rounded-full bg-[#E24E2B] animate-pulse" />
            <span>Sign up</span>
          </div>

          {/* Submission Success View */}
          {isSubmitted && submittedData ? (
            <div className="text-center py-2 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 border-2 border-amber-200 text-amber-600 flex items-center justify-center mx-auto relative shadow-sm">
                <Clock className="w-8 h-8 animate-pulse" />
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#800020] text-white flex items-center justify-center text-[10px] font-bold">
                  ✓
                </div>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 border border-amber-200 px-3 py-1 rounded-full inline-block">
                Pending Admin Approval • অনুমোদনের অপেক্ষায়
              </span>

              <h1 className="text-xl sm:text-2xl font-bold text-[#1C1C1E] tracking-tight">
                রেজিস্ট্রেশন সফলভাবে জমা হয়েছে!
              </h1>
              <p className="text-xs text-slate-500 leading-relaxed">
                আপনার ফ্যাক্টরি অ্যাকাউন্ট রিকোয়েস্টটি তাসনীম নিট ইন্ডাস্ট্রির অ্যাডমিন প্যানেলে পর্যালোচনায় রয়েছে।
              </p>

              {/* Email Verification Alert */}
              <div className="p-4 rounded-2xl bg-blue-50/90 border border-blue-200 text-left space-y-1.5 text-xs text-blue-900 shadow-2xs">
                <div className="flex items-center gap-2 font-bold text-blue-950">
                  <Mail className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>ইমেইল ভেরিফিকেশন লিংক পাঠানো হয়েছে</span>
                </div>
                <p className="text-[11px] text-blue-800/90 leading-relaxed">
                  We have sent a verification email to <strong>{submittedData.email}</strong>. Please click the link inside to verify your address.
                </p>
              </div>

              {/* Submitted Details */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left space-y-2 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-slate-600">
                  <span>প্রতিষ্ঠান / Mill:</span>
                  <span className="font-bold text-slate-900">{submittedData.company}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-slate-600">
                  <span>যোগাযোগকারী:</span>
                  <span className="font-semibold text-slate-900">{submittedData.name}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>হোয়াটসঅ্যাপ:</span>
                  <span className="font-mono text-slate-900">{submittedData.phone}</span>
                </div>
              </div>

              {/* Fast Track WhatsApp Button */}
              <div className="space-y-2 pt-2">
                <a
                  href={`https://wa.me/8801715024479?text=${encodeURIComponent(
                    `Hello Tasneem Knit Industry, I have registered a buyer account for ${submittedData.company}. Contact: ${submittedData.name} (${submittedData.email}, ${submittedData.phone}). Please review and approve my account.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>দ্রুত অনুমোদনের জন্য হোয়াটসঅ্যাপে জানান</span>
                </a>

                <Link
                  href="/account/login"
                  className="block w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                >
                  লগইন পেজে যান (Go to Sign In)
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Card Title */}
              <div className="text-center mb-6 pt-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] tracking-tight">
                  Create account
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Textile Mill Machinery Sourcing & Quotation Portal
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="mb-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700">
                  {error}
                </div>
              )}

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Two Column Name & Company (like John | Williams in reference) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contact Name"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-[#F1F2F5] hover:bg-[#EAEBED] focus:bg-white border border-transparent focus:border-[#E8592E]/60 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-3 focus:ring-[#E8592E]/15 transition-all"
                  />
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Factory / Mill Name"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-[#F1F2F5] hover:bg-[#EAEBED] focus:bg-white border border-transparent focus:border-[#E8592E]/60 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-3 focus:ring-[#E8592E]/15 transition-all"
                  />
                </div>

                {/* Business Email */}
                <div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Business Email (e.g. buyer@textilemill.com)"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-[#F1F2F5] hover:bg-[#EAEBED] focus:bg-white border border-transparent focus:border-[#E8592E]/60 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-3 focus:ring-[#E8592E]/15 transition-all"
                  />
                </div>

                {/* Password with Eye Toggle */}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••••••"
                    disabled={isSubmitting}
                    className="w-full pl-4 pr-10 py-3 bg-[#F1F2F5] hover:bg-[#EAEBED] focus:bg-white border border-transparent focus:border-[#E8592E]/60 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-3 focus:ring-[#E8592E]/15 transition-all tracking-wider"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone / WhatsApp (+880 1XXX-XXXXXX)"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-[#F1F2F5] hover:bg-[#EAEBED] focus:bg-white border border-transparent focus:border-[#E8592E]/60 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-3 focus:ring-[#E8592E]/15 transition-all"
                  />
                </div>

                {/* Machinery Interest Dropdown (as seen in reference design) */}
                <div className="relative">
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F1F2F5] hover:bg-[#EAEBED] focus:bg-white border border-transparent focus:border-[#E8592E]/60 rounded-xl text-xs sm:text-sm text-slate-700 focus:outline-none focus:ring-3 focus:ring-[#E8592E]/15 transition-all appearance-none cursor-pointer"
                  >
                    <option value="double-jersey">Double Jersey Circular Machines (Rib / Interlock)</option>
                    <option value="single-jersey">Single Jersey High-Speed Knitting Machines</option>
                    <option value="jacquard">Electronic Jacquard Knitting Systems</option>
                    <option value="dyeing-finishing">Dyeing & Finishing Machinery Lines</option>
                    <option value="spare-parts">Needles, Sinkers & Sourcing Spare Parts</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Checkbox Agreement (red/orange check styling from reference) */}
                <label className="flex items-start gap-2.5 pt-1 cursor-pointer select-none text-[11px] sm:text-xs text-slate-600">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-[#E24E2B] focus:ring-[#E24E2B] accent-[#E24E2B] cursor-pointer"
                  />
                  <span>
                    Yes, I understand and agree to the{" "}
                    <span className="text-[#E24E2B] font-semibold underline underline-offset-2">
                      Terms of Service
                    </span>{" "}
                    & Buyer Confidentiality.
                  </span>
                </label>

                {/* Gradient Primary CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#DF3826] via-[#E8592E] to-[#F1732B] hover:brightness-105 active:scale-[0.99] text-white text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#E8592E]/25 cursor-pointer disabled:opacity-70 mt-3"
                >
                  <span>{isSubmitting ? "Creating Account..." : "Create Account"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Bottom link on mobile */}
                <div className="text-center pt-1 lg:hidden">
                  <Link
                    href="/account/login"
                    className="text-xs text-slate-500 hover:text-[#E8592E] font-medium"
                  >
                    Already have an account? <strong className="text-[#E8592E]">Sign in</strong>
                  </Link>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Secondary Frosted Glass Card (Right overlap side) */}
        <div className="relative z-10 w-full max-w-sm lg:-ml-6 backdrop-blur-2xl bg-white/15 border border-white/25 rounded-[32px] sm:rounded-[36px] p-8 sm:p-10 shadow-2xl text-white flex flex-col justify-center items-center text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFE8D6] bg-white/10 px-3 py-1 rounded-full mb-3 border border-white/20">
            Tasneem Knit Industry
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Have an account?
          </h2>
          <p className="text-xs text-white/85 leading-relaxed mt-2.5 max-w-xs">
            Once you&apos;re logged in, you&apos;ll be able to track quotation requests, review CFR machinery pricing, and access formal Proforma Invoices (PI).
          </p>

          <Link
            href="/account/login"
            className="mt-6 w-full max-w-[200px] py-2.5 px-6 rounded-xl border border-white/80 hover:bg-white hover:text-slate-900 text-white font-bold text-xs sm:text-sm text-center transition-all duration-200 cursor-pointer shadow-sm"
          >
            Sign in
          </Link>
        </div>

      </div>
    </AuthSunsetBackdrop>
  );
}
