"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, Building2 } from "lucide-react";
import { useCustomerAuth } from "@/lib/customer/customer-context";

export default function CustomerLoginPage() {
  const router = useRouter();
  const { login } = useCustomerAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid business email address.");
      return;
    }

    login(email, password);
    router.push("/account/quotes");
  };

  const handleDemoLogin = () => {
    setEmail("buyer@demo.com");
    setPassword("password123");
    login("buyer@demo.com", "password123");
    router.push("/account/quotes");
  };

  return (
    <div className="max-w-md mx-auto px-4">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 text-[#FF0000] flex items-center justify-center mx-auto mb-3">
            <Building2 className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF0000] bg-red-50 px-2 py-0.5 rounded-md inline-block mb-1">
            Buyer Account Portal
          </span>
          <h1 className="text-2xl font-bold text-[#0A0A0A] tracking-tight">
            Sign In to My Quotes
          </h1>
          <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed">
            Review submitted quotation requests, CFR status updates, and formal Proforma Invoices (PI).
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600">
            {error}
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
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#0A0A0A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
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
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#0A0A0A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#FF0000] hover:bg-[#E00000] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer mt-2"
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
          <Link href="/account/register" className="text-[#FF0000] font-bold hover:underline">
            Create an Account →
          </Link>
        </div>
      </div>
    </div>
  );
}
