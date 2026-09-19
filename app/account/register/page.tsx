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
      <div className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col justify-between py-4 sm:py-6">
        
        {/* Top-Left Brand Header */}
        <div className="w-full flex items-start justify-between">
          <div className="flex items-center gap-3 sm:gap-3.5">
            {/* Red Stylized Wing/Bird Logo Mark */}
            <div className="w-11 h-9 sm:w-13 sm:h-11 shrink-0">
              <svg viewBox="0 0 100 65" fill="none" className="w-full h-full drop-shadow-md">
                <path d="M50 42 L8 10 L18 28 L2 36 L32 50 L50 44 Z" fill="#E11D48" />
                <path d="M50 42 L92 10 L82 28 L98 36 L68 50 L50 44 Z" fill="#E11D48" />
                <polygon points="44,43 56,43 53,62 47,62" fill="#E11D48" />
              </svg>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-widest text-white leading-none">
                TASNEEM
              </h2>
              <span className="text-[11px] sm:text-xs font-bold tracking-widest text-[#E11D48] block mt-1">
                KNITTING INDUSTRY
              </span>
              <div className="text-[10px] sm:text-[11px] text-slate-300/90 tracking-normal mt-1 flex items-center gap-2">
                <span>Quality Knitwear</span>
                <span className="text-slate-500">|</span>
                <span>Better Tomorrow</span>
              </div>
              <div className="w-10 h-[2px] bg-[#E11D48] mt-1.5" />
            </div>
          </div>
        </div>

        {/* Center/Right Registration Card Placement */}
        <div className="w-full flex items-center justify-center lg:justify-end lg:pr-16 xl:pr-32 my-6 lg:my-0">
          <div className="w-full max-w-[460px] bg-[#0E1626]/85 backdrop-blur-2xl border border-slate-700/60 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-6 sm:p-8 text-left">
            
            {/* Submission Success View */}
            {isSubmitted && submittedData ? (
              <div className="text-center py-2 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-950/80 border-2 border-amber-600/70 text-amber-400 flex items-center justify-center mx-auto relative shadow-lg">
                  <Clock className="w-8 h-8 animate-pulse" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#DF1E38] text-white flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </div>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/90 border border-amber-700/80 px-3 py-1 rounded-full inline-block">
                  Pending Admin Approval • অনুমোদনের অপেক্ষায়
                </span>

                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  রেজিস্ট্রেশন সফলভাবে জমা হয়েছে!
                </h1>
                <p className="text-xs text-slate-400 leading-relaxed">
                  আপনার ফ্যাক্টরি অ্যাকাউন্ট রিকোয়েস্টটি তাসনীম নিট ইন্ডাস্ট্রির অ্যাডমিন প্যানেলে পর্যালোচনায় রয়েছে।
                </p>

                {/* Email Verification Alert */}
                <div className="p-3.5 rounded-xl bg-blue-950/70 border border-blue-800 text-left space-y-1.5 text-xs text-blue-200">
                  <div className="flex items-center gap-2 font-bold text-blue-100">
                    <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>ইমেইল ভেরিফিকেশন লিংক পাঠানো হয়েছে</span>
                  </div>
                  <p className="text-[11px] text-blue-200/90 leading-relaxed">
                    We have sent a verification email to <strong className="text-white">{submittedData.email}</strong>. Please click the link inside to verify your address.
                  </p>
                </div>

                {/* Submitted Details */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-left space-y-2 text-xs">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-slate-400">
                    <span>প্রতিষ্ঠান / Mill:</span>
                    <span className="font-bold text-white">{submittedData.company}</span>
                  </div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-slate-400">
                    <span>যোগাযোগকারী:</span>
                    <span className="font-semibold text-white">{submittedData.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>হোয়াটসঅ্যাপ:</span>
                    <span className="font-mono text-white">{submittedData.phone}</span>
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
                    className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>দ্রুত অনুমোদনের জন্য হোয়াটসঅ্যাপে জানান</span>
                  </a>

                  <Link
                    href="/account/login"
                    className="block w-full py-2.5 px-4 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition-colors"
                  >
                    লগইন পেজে যান (Go to Sign In)
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {/* Header */}
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Create Account
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 mb-5">
                  Register your buyer account for PI & quotes
                </p>

                {/* Error Alert */}
                {error && (
                  <div className="mb-4 p-3.5 rounded-xl bg-red-950/70 border border-red-800 text-xs text-red-200">
                    {error}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Two Column Name & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Contact Name"
                        disabled={isSubmitting}
                        className="w-full pl-10 pr-3 py-2.5 bg-[#111A2E]/90 border border-slate-700/70 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Mill Name"
                        disabled={isSubmitting}
                        className="w-full pl-10 pr-3 py-2.5 bg-[#111A2E]/90 border border-slate-700/70 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] transition-all"
                      />
                    </div>
                  </div>

                  {/* Business Email */}
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Business Email (buyer@mill.com)"
                      disabled={isSubmitting}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#111A2E]/90 border border-slate-700/70 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] transition-all"
                    />
                  </div>

                  {/* Password with Eye Toggle */}
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      disabled={isSubmitting}
                      className="w-full pl-10 pr-10 py-2.5 bg-[#111A2E]/90 border border-slate-700/70 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Phone / WhatsApp */}
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone / WhatsApp (+880 1XXX-XXXXXX)"
                      disabled={isSubmitting}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#111A2E]/90 border border-slate-700/70 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] transition-all"
                    />
                  </div>

                  {/* Machinery Interest Dropdown */}
                  <div className="relative">
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full pl-4 pr-10 py-2.5 bg-[#111A2E]/90 border border-slate-700/70 rounded-xl text-xs sm:text-sm text-slate-300 focus:outline-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] transition-all appearance-none cursor-pointer"
                    >
                      <option value="double-jersey">Double Jersey Machines (Rib / Interlock)</option>
                      <option value="single-jersey">Single Jersey High-Speed Knitting Machines</option>
                      <option value="jacquard">Electronic Jacquard Circular Systems</option>
                      <option value="dyeing-finishing">Dyeing & Finishing Machinery Lines</option>
                      <option value="spare-parts">Needles, Sinkers & Spare Parts Sourcing</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Checkbox Agreement */}
                  <label className="flex items-start gap-2.5 pt-1 cursor-pointer select-none text-[11px] sm:text-xs text-slate-400">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-900 text-[#E11D48] accent-[#E11D48] focus:ring-[#E11D48] cursor-pointer"
                    />
                    <span>
                      Yes, I agree to the{" "}
                      <span className="text-[#E11D48] font-medium underline">
                        Terms of Service
                      </span>{" "}
                      & Buyer Confidentiality.
                    </span>
                  </label>

                  {/* Red Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#DF1E38] hover:bg-[#C2162E] active:scale-[0.99] text-white text-sm font-semibold transition-all shadow-lg shadow-red-950/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 mt-3"
                  >
                    <span>{isSubmitting ? "Creating Account..." : "Create Account"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Sign In Link */}
                  <div className="text-center pt-2 text-xs text-slate-400">
                    Already have an account?{" "}
                    <Link
                      href="/account/login"
                      className="text-[#E11D48] hover:underline font-semibold ml-1"
                    >
                      Sign in
                    </Link>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Bottom-Left Slogan */}
        <div className="hidden sm:block">
          <p className="text-xs sm:text-sm text-slate-400 font-normal tracking-wide">
            Crafting Comfort
          </p>
          <p className="text-xs sm:text-sm text-slate-200 font-semibold tracking-wide">
            Through Innovation
          </p>
          <div className="w-6 h-[2px] bg-[#E11D48] mt-1.5" />
        </div>

      </div>
    </AuthSunsetBackdrop>
  );
}
