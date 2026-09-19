"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Building2,
  Clock,
  MessageCircle,
} from "lucide-react";
import { useCustomerAuth } from "@/lib/customer/customer-context";

export default function CustomerLoginPage() {
  const router = useRouter();
  const { login } = useCustomerAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendNotice, setResendNotice] = useState<string | null>(null);

  const handleResendFromLogin = async () => {
    if (!email || !email.includes("@")) {
      setResendNotice("Please enter a valid email address first.");
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
        setResendNotice("Verification email sent! Please check your inbox & spam folder.");
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

    if (!email || !email.includes("@")) {
      setError("Please enter a valid business email address.");
      return;
    }

    const res = await login(email, password);
    if (!res.success) {
      setError(res.error || "Login failed. Please check credentials.");
      return;
    }

    router.push("/account/quotes");
  };

  const handleDemoLogin = async () => {
    setEmail("buyer@demo.com");
    setPassword("password123");
    const res = await login("buyer@demo.com", "password123");
    if (res.success) {
      router.push("/account/quotes");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#FDF2F4] border border-[#D8A4AF] text-[#800020] flex items-center justify-center mx-auto mb-3">
            <Building2 className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#800020] bg-[#FDF2F4] border border-[#F9E6EA] px-2.5 py-0.5 rounded-md inline-block mb-1">
            Buyer Account Portal
          </span>
          <h1 className="text-2xl font-bold text-[#2D2D2D] tracking-tight">
            Sign In to My Quotes
          </h1>
          <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed">
            Review submitted quotation requests, CFR status updates, and formal Proforma Invoices (PI).
          </p>
        </div>

        {error && (
          <div className="mb-5 space-y-2">
            {error.includes("EMAIL_NOT_VERIFIED") ? (
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-2.5">
                <div className="flex items-center gap-2 font-bold text-blue-950">
                  <Mail className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>ইমেইল ভেরিফিকেশন বাকি রয়েছে (Email Not Verified)</span>
                </div>
                <p className="text-[11px] text-blue-800/90 leading-relaxed">
                  {error.replace("EMAIL_NOT_VERIFIED: ", "")}
                </p>

                {resendNotice && (
                  <div className="p-2 rounded-lg bg-white/90 border border-blue-200 text-[11px] font-semibold text-blue-950">
                    {resendNotice}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleResendFromLogin}
                  disabled={isResending}
                  className="w-full py-2 px-3 rounded-lg bg-[#800020] hover:bg-[#5A0017] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{isResending ? "Sending New Link..." : "Resend Verification Email"}</span>
                </button>
              </div>
            ) : error.includes("PENDING_APPROVAL") ? (
              <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-300 text-xs text-amber-900 space-y-2">
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
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                <span className="shrink-0 font-bold">•</span>
                <span>{error}</span>
              </div>
            )}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Work / Business Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="buyer@textilemill.com"
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#2D2D2D] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-semibold text-[#800020] hover:text-[#5A0017] hover:underline transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#2D2D2D] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#800020] hover:bg-[#5A0017] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer mt-2"
          >
            <span>Sign In to Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fast Access Button */}
        <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2.5 px-3 rounded-xl border border-dashed border-amber-300 bg-amber-50/60 hover:bg-amber-100/60 text-amber-900 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Quick Demo Sign In (Square Fashion Fabrics)</span>
          </button>
        </div>

        {/* Bottom Switcher */}
        <div className="mt-6 text-center text-xs text-slate-500">
          New buyer?{" "}
          <Link href="/account/register" className="text-[#800020] font-bold hover:underline">
            Create an Account →
          </Link>
        </div>
      </div>
    </div>
  );
}
