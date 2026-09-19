"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  Clock,
  MessageCircle,
  Eye,
  EyeOff,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { useCustomerAuth } from "@/lib/customer/customer-context";
import { AuthSunsetBackdrop } from "@/components/auth/AuthSunsetBackdrop";

export default function CustomerLoginPage() {
  const router = useRouter();
  const { login } = useCustomerAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendNotice, setResendNotice] = useState<string | null>(null);

  const handleResendFromLogin = async () => {
    if (!email || !email.includes("@")) {
      setResendNotice("Please enter your business email first.");
      return;
    }
    setIsResending(true);
    setResendNotice(null);
    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setResendNotice("Verification link sent! Check your inbox and spam folder.");
      } else {
        setResendNotice(data.error || "Could not send verification email.");
      }
    } catch {
      setResendNotice("Network error. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResendNotice(null);

    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !trimmed.includes("@")) {
      setError("Please enter a valid business email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await login(trimmed, password);
      if (!res.success) {
        setError(res.error || "Login failed. Please check your credentials.");
        return;
      }
      router.push("/account/quotes");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail("buyer@demo.com");
    setPassword("password123");
    setIsSubmitting(true);
    try {
      const res = await login("buyer@demo.com", "password123");
      if (res.success) {
        router.push("/account/quotes");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthSunsetBackdrop>
      <div className="relative w-full max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0 py-6">
        
        {/* Main Floating White Card with Top Tab */}
        <div className="relative z-20 w-full max-w-md bg-white rounded-[32px] sm:rounded-[36px] shadow-[0_25px_70px_rgba(0,0,0,0.3)] p-6 sm:p-10 border border-white/60">
          
          {/* Decorative Notch / Tab on Top Right */}
          <div className="absolute -top-3.5 sm:-top-4 right-8 bg-white px-5 py-1.5 rounded-full shadow-md border border-slate-100 flex items-center gap-1.5 text-xs font-bold text-slate-800 tracking-wide select-none">
            <span className="w-2 h-2 rounded-full bg-[#E24E2B] animate-pulse" />
            <span>Buyer Portal</span>
          </div>

          {/* Header */}
          <div className="text-center mb-6 pt-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1C1E] tracking-tight">
              Sign In
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Industrial Machinery & Proforma Invoice Center
            </p>
          </div>

          {/* Fast Access / Demo Sign-In Pill */}
          <div className="mb-5">
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/80 hover:bg-slate-100/80 text-slate-700 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs group"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E24E2B] transition-transform group-hover:rotate-12" />
              <span>Demo Quick Access (Square Fashion Fabrics)</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-5">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              or
            </span>
            <div className="border-t border-slate-200 w-full" />
          </div>

          {/* Error & Notice States */}
          {error && (
            <div className="mb-4 space-y-2">
              {error.includes("EMAIL_NOT_VERIFIED") ? (
                <div className="p-3.5 rounded-2xl bg-blue-50/90 border border-blue-200 text-xs text-blue-900 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-blue-950">
                    <Mail className="w-4 h-4 text-blue-700 shrink-0" />
                    <span>ইমেইল ভেরিফিকেশন সম্পন্ন হয়নি</span>
                  </div>
                  <p className="text-[11px] text-blue-800/90 leading-relaxed">
                    {error.replace("EMAIL_NOT_VERIFIED: ", "")}
                  </p>

                  {resendNotice && (
                    <div className="p-2 rounded-xl bg-white border border-blue-200 text-[11px] font-semibold text-blue-900">
                      {resendNotice}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleResendFromLogin}
                    disabled={isResending}
                    className="w-full py-2 px-3 rounded-xl bg-[#800020] hover:bg-[#5A0017] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{isResending ? "Sending New Link..." : "Resend Verification Email"}</span>
                  </button>
                </div>
              ) : error.includes("PENDING_APPROVAL") ? (
                <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-300 text-xs text-amber-900 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-amber-800">
                    <Clock className="w-4 h-4 shrink-0 text-amber-600 animate-pulse" />
                    <span>অ্যাকাউন্টটি অনুমোদনের অপেক্ষায় (Pending Approval)</span>
                  </div>
                  <p className="text-[11px] text-amber-800/90 leading-relaxed">
                    আপনার ইমেইলটি সফলভাবে ভেরিফাই হয়েছে। অ্যাডমিন টিম আপনার কোম্পানি তথ্য যাচাই করে অনুমোদন দেওয়ার পর লগইন করতে পারবেন।
                  </p>
                  <a
                    href={`https://wa.me/8801715024479?text=${encodeURIComponent(
                      `Hello Tasneem Knit Industry, I have registered and verified my email (${email}). Please approve my buyer account.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 underline mt-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>দ্রুত অনুমোদনের জন্য অ্যাডমিনকে হোয়াটসঅ্যাপে জানান ↗</span>
                  </a>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                  <span className="shrink-0 font-bold">•</span>
                  <span>{error}</span>
                </div>
              )}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Business Email Input */}
            <div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Business Email (e.g. buyer@mill.com)"
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-[#F1F2F5] hover:bg-[#EAEBED] focus:bg-white border border-transparent focus:border-[#E8592E]/60 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-3 focus:ring-[#E8592E]/15 transition-all"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                disabled={isSubmitting}
                className="w-full pl-4 pr-10 py-3 bg-[#F1F2F5] hover:bg-[#EAEBED] focus:bg-white border border-transparent focus:border-[#E8592E]/60 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-3 focus:ring-[#E8592E]/15 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Gradient Primary CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#DF3826] via-[#E8592E] to-[#F1732B] hover:brightness-105 active:scale-[0.99] text-white text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#E8592E]/25 cursor-pointer disabled:opacity-70 mt-2"
            >
              <span>{isSubmitting ? "Signing In..." : "Sign In"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Forgot Password Link */}
            <div className="text-center pt-2">
              <Link
                href="/forgot-password"
                className="text-xs text-slate-500 hover:text-[#E8592E] hover:underline transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </form>
        </div>

        {/* Secondary Frosted Glass Card (Right overlap side) */}
        <div className="relative z-10 w-full max-w-sm lg:-ml-6 backdrop-blur-2xl bg-white/15 border border-white/25 rounded-[32px] sm:rounded-[36px] p-8 sm:p-10 shadow-2xl text-white flex flex-col justify-center items-center text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFE8D6] bg-white/10 px-3 py-1 rounded-full mb-3 border border-white/20">
            Tasneem Knit Industry
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            New buyer?
          </h2>
          <p className="text-xs text-white/85 leading-relaxed mt-2.5 max-w-xs">
            Once registered, review industrial circular knitting machine catalogs, track CFR quotation status, and receive formal Proforma Invoices (PI).
          </p>

          <Link
            href="/account/register"
            className="mt-6 w-full max-w-[200px] py-2.5 px-6 rounded-xl border border-white/80 hover:bg-white hover:text-slate-900 text-white font-bold text-xs sm:text-sm text-center transition-all duration-200 cursor-pointer shadow-sm"
          >
            Create Account
          </Link>
        </div>

      </div>
    </AuthSunsetBackdrop>
  );
}
