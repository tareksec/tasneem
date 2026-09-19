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

  const [rememberMe, setRememberMe] = useState(true);

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

        {/* Center/Right Login Card Placement */}
        <div className="w-full flex items-center justify-center lg:justify-end lg:pr-16 xl:pr-32 my-8 lg:my-0">
          <div className="w-full max-w-[420px] bg-[#0E1626]/85 backdrop-blur-2xl border border-slate-700/60 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-6 sm:p-9 text-left">
            
            {/* Header */}
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 mb-6">
              Sign in to access your account
            </p>

            {/* Error & Notice States */}
            {error && (
              <div className="mb-4 space-y-2">
                {error.includes("EMAIL_NOT_VERIFIED") ? (
                  <div className="p-3.5 rounded-xl bg-blue-950/70 border border-blue-800 text-xs text-blue-200 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-blue-100">
                      <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>ইমেইল ভেরিফিকেশন সম্পন্ন হয়নি</span>
                    </div>
                    <p className="text-[11px] text-blue-200/90 leading-relaxed">
                      {error.replace("EMAIL_NOT_VERIFIED: ", "")}
                    </p>

                    {resendNotice && (
                      <div className="p-2 rounded-lg bg-blue-900/60 border border-blue-700 text-[11px] font-semibold text-white">
                        {resendNotice}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleResendFromLogin}
                      disabled={isResending}
                      className="w-full py-2 px-3 rounded-lg bg-[#E11D48] hover:bg-red-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{isResending ? "Sending New Link..." : "Resend Verification Email"}</span>
                    </button>
                  </div>
                ) : error.includes("PENDING_APPROVAL") ? (
                  <div className="p-3.5 rounded-xl bg-amber-950/70 border border-amber-800 text-xs text-amber-200 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-amber-100">
                      <Clock className="w-4 h-4 shrink-0 text-amber-400 animate-pulse" />
                      <span>অ্যাকাউন্টটি অনুমোদনের অপেক্ষায় (Pending Approval)</span>
                    </div>
                    <p className="text-[11px] text-amber-200/90 leading-relaxed">
                      আপনার ইমেইলটি সফলভাবে ভেরিফাই হয়েছে। অ্যাডমিন টিম আপনার কোম্পানি তথ্য যাচাই করে অনুমোদন দেওয়ার পর লগইন করতে পারবেন।
                    </p>
                    <a
                      href={`https://wa.me/8801715024479?text=${encodeURIComponent(
                        `Hello Tasneem Knit Industry, I have registered and verified my email (${email}). Please approve my buyer account.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 underline mt-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>দ্রুত অনুমোদনের জন্য অ্যাডমিনকে হোয়াটসঅ্যাপে জানান ↗</span>
                    </a>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-red-950/70 border border-red-800 text-xs text-red-200 flex items-start gap-2">
                    <span className="shrink-0 font-bold">•</span>
                    <span>{error}</span>
                  </div>
                )}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email / Username field with Mail icon */}
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email or Username"
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-4 py-3 bg-[#111A2E]/90 border border-slate-700/70 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] transition-all"
                />
              </div>

              {/* Password field with Lock and Eye icon */}
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-10 py-3 bg-[#111A2E]/90 border border-slate-700/70 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Remember me & Forgot password row */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-300 hover:text-white">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-[#E11D48] accent-[#E11D48] focus:ring-[#E11D48]"
                  />
                  <span>Remember me</span>
                </label>

                <Link
                  href="/forgot-password"
                  className="text-[#E11D48] hover:text-red-400 font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Red Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-[#DF1E38] hover:bg-[#C2162E] active:scale-[0.99] text-white text-sm font-semibold transition-all shadow-lg shadow-red-950/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 mt-2"
              >
                <span>{isSubmitting ? "Signing in..." : "Login"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Demo Quick Access */}
              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={isSubmitting}
                className="w-full py-2 px-3 rounded-lg border border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 text-slate-400 hover:text-slate-200 text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-3"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E11D48]" />
                <span>Quick Demo Access (Square Fashion Fabrics)</span>
              </button>

              {/* Create Account Link */}
              <div className="text-center pt-2 text-xs text-slate-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/account/register"
                  className="text-[#E11D48] hover:underline font-semibold ml-1"
                >
                  Create Account
                </Link>
              </div>
            </form>
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
