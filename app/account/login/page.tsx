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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

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
          <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 space-y-2">
            {error.includes("PENDING_APPROVAL") ? (
              <div className="space-y-2 text-amber-900 bg-amber-50/80 -m-1.5 p-3.5 rounded-lg border border-amber-300">
                <div className="flex items-center gap-2 font-bold text-amber-800 text-xs">
                  <Clock className="w-4 h-4 shrink-0 text-amber-600 animate-pulse" />
                  <span>অ্যাকাউন্টটি অনুমোদনের অপেক্ষায় (Pending Approval)</span>
                </div>
                <p className="text-[11px] text-amber-800/90 leading-relaxed">
                  আপনার রেজিস্ট্রেশনটি অ্যাডমিন পর্যালোচনায় রয়েছে। অ্যাডমিন অনুমোদন সম্পন্ন করলে এই অ্যাকাউন্ট দিয়ে সমস্ত তথ্য দেখা যাবে।
                </p>
                <a
                  href={`https://wa.me/8801715024479?text=${encodeURIComponent(
                    `Hello Tasneem Knit Industry, I have registered a buyer account with email: ${email}. Please approve my account.`
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
              <div className="flex items-start gap-2">
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
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
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
