"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Lock,
  Mail,
  ShieldAlert,
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
  ShieldCheck,
  X,
} from "lucide-react";
import { useAdminAuth } from "@/lib/admin/auth-context";
import { AuthSunsetBackdrop } from "@/components/auth/AuthSunsetBackdrop";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const { user, login } = useAdminAuth();

  const [email, setEmail] = useState("admin@tasneem.com");
  const [password, setPassword] = useState("TasneemAdmin2026!Secure");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  // If already authenticated, redirect to callbackUrl or /admin
  useEffect(() => {
    if (user) {
      router.push(callbackUrl);
    }
  }, [user, router, callbackUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      router.push(callbackUrl);
      router.refresh();
    } else {
      setErrorMessage(result.error || "Authentication failed. Please check your staff credentials.");
    }
  };

  const fillDemoCredentials = () => {
    setEmail("admin@tasneem.com");
    setPassword("TasneemAdmin2026!Secure");
    setErrorMessage("");
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
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-widest text-white leading-none">
                  TASNEEM
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 bg-rose-950/80 border border-rose-700/80 px-2 py-0.5 rounded-md">
                  Admin
                </span>
              </div>
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

        {/* Center/Right Admin Login Card Placement */}
        <div className="w-full flex items-center justify-center lg:justify-end lg:pr-16 xl:pr-32 my-8 lg:my-0">
          <div className="w-full max-w-[430px] bg-[#0E1626]/85 backdrop-blur-2xl border border-slate-700/60 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-6 sm:p-9 text-left">
            
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-950/80 border border-rose-800/80 px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                Staff Authentication
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Admin Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 mb-6">
              Sign in to manage machinery, quotations, and blog
            </p>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 flex items-start gap-2.5 p-3 rounded-xl bg-red-950/80 border border-red-800 text-xs text-red-200">
                <ShieldAlert className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Staff Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Staff Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@tasneemknitindustry.com"
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#111A2E]/90 border border-slate-700/70 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] transition-all"
                  />
                </div>
              </div>

              {/* Password Input with Eye Toggle */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotPasswordOpen(true)}
                    className="text-[11px] font-medium text-slate-400 hover:text-white hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={loading}
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
              </div>

              {/* Remember Me & Quick Demo */}
              <div className="flex items-center justify-between pt-1 text-xs gap-2">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-400 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-[#E11D48] accent-[#E11D48] focus:ring-[#E11D48] cursor-pointer shrink-0"
                  />
                  <span>Stay signed in</span>
                </label>

                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="text-slate-400 hover:text-white font-medium underline text-[11px] cursor-pointer whitespace-nowrap"
                >
                  Quick Fill Demo
                </button>
              </div>

              {/* Red Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-[#DF1E38] hover:bg-[#C2162E] active:scale-[0.99] text-white text-sm font-semibold transition-all shadow-lg shadow-red-950/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 mt-3"
              >
                {loading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <p className="text-[11px] text-slate-500">
                  Authorized staff portal. Protected by server-side JWT session.
                </p>
                <div className="mt-2 text-xs text-slate-400">
                  Customer account?{" "}
                  <Link href="/account/login" className="text-[#E11D48] hover:underline font-semibold ml-1">
                    Buyer Login
                  </Link>
                </div>
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

      {/* Forgot Password Modal */}
      {forgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
            onClick={() => setForgotPasswordOpen(false)}
          />
          <div className="relative w-full max-w-md rounded-2xl bg-[#0E1626] p-6 shadow-2xl border border-slate-700 text-left space-y-4 z-10">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">Staff Password Assistance</h3>
                <p className="text-xs text-slate-400 mt-0.5">Internal credentials policy</p>
              </div>
              <button
                type="button"
                onClick={() => setForgotPasswordOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 bg-amber-950/70 border border-amber-800 rounded-xl flex items-start gap-2.5 text-amber-200 text-xs leading-relaxed">
              <KeyRound className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white mb-1">Administrative Password Reset</p>
                <p>
                  To reset staff passwords, run the Prisma seed or update the Admin table in Hostinger phpMyAdmin directly.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setForgotPasswordOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthSunsetBackdrop>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-xs text-slate-400">
          Loading auth portal...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
