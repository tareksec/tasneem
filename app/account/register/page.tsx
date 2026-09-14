"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Building2, Mail, Phone, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { useCustomerAuth } from "@/lib/customer/customer-context";

export default function CustomerRegisterPage() {
  const router = useRouter();
  const { register } = useCustomerAuth();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !company.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill in all required company and contact fields.");
      return;
    }

    register(name, company, email, phone);
    router.push("/account/quotes");
  };

  return (
    <div className="max-w-md mx-auto px-4">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 text-[#FF0000] flex items-center justify-center mx-auto mb-3">
            <Building2 className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF0000] bg-red-50 px-2 py-0.5 rounded-md inline-block mb-1">
            Mill Registration
          </span>
          <h1 className="text-2xl font-bold text-[#0A0A0A] tracking-tight">
            Create Buyer Account
          </h1>
          <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed">
            Register your textile or garment factory to track technical quotes, pricing, and shipping schedules.
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Contact Person Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Md. Tariqul Islam"
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#0A0A0A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#FF0000]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Company / Factory Name *
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Apex Textile Composite Ltd."
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#0A0A0A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#FF0000]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Business Email *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="buyer@textilemill.com"
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#0A0A0A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#FF0000]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Phone / WhatsApp Number *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+880 1711-XXXXXX"
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#0A0A0A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#FF0000]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Create Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#0A0A0A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#FF0000]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#FF0000] hover:bg-[#E00000] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer mt-4"
          >
            <span>Complete Registration</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          Already registered?{" "}
          <Link href="/account/login" className="text-[#FF0000] font-bold hover:underline">
            Sign In →
          </Link>
        </div>
      </div>
    </div>
  );
}
