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
} from "lucide-react";
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    company: string;
    email: string;
    phone: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !company.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      setError("Please fill in all required company, contact, and password fields.");
      return;
    }

    const res = register(name, company, email, phone, password);
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
  };

  if (isSubmitted && submittedData) {
    const waText = encodeURIComponent(
      `Hello Tasneem Knit Industry, I have registered a buyer account for ${submittedData.company}. Contact: ${submittedData.name} (${submittedData.email}, ${submittedData.phone}). Please review and approve my account.`
    );

    return (
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-sm text-center">
          {/* Status Badge & Icon */}
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border-2 border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-4 relative shadow-sm">
            <Clock className="w-8 h-8 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#800020] text-white flex items-center justify-center text-[10px] font-bold">
              ✓
            </div>
          </div>

          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-full inline-block mb-2">
            Pending Admin Approval • অনুমোদনের অপেক্ষায়
          </span>

          <h1 className="text-xl sm:text-2xl font-bold text-[#2D2D2D] tracking-tight">
            রেজিস্ট্রেশন সফলভাবে জমা হয়েছে!
          </h1>
          <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">
            আপনার ফ্যাক্টরি অ্যাকাউন্ট রিকোয়েস্টটি তাসনীম নিট ইন্ডাস্ট্রির অ্যাডমিন প্যানেলে পাঠানো হয়েছে। আমাদের টিম তথ্য যাচাই করে দ্রুত অ্যাকাউন্ট অনুমোদন করবে।
          </p>

          {/* Submitted Buyer Details Card */}
          <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-left space-y-2 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-slate-500">স্ট্যাটাস:</span>
              <span className="font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Pending Review</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">ফ্যাক্টরি / প্রতিষ্ঠান:</span>
              <span className="font-semibold text-slate-900 truncate max-w-[200px]">{submittedData.company}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">যোগাযোগকারী:</span>
              <span className="font-semibold text-slate-900">{submittedData.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">বিজনেস ইমেইল:</span>
              <span className="font-mono text-slate-800 truncate max-w-[200px]">{submittedData.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">ফোন / হোয়াটসঅ্যাপ:</span>
              <span className="font-mono text-slate-800">{submittedData.phone}</span>
            </div>
          </div>

          {/* WhatsApp Fast Approval Button */}
          <div className="mt-5 space-y-2.5">
            <a
              href={`https://wa.me/8801715024479?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>দ্রুত অনুমোদনের জন্য হোয়াটসঅ্যাপে জানান</span>
            </a>

            <Link href="/account/login" className="block w-full">
              <button
                type="button"
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                লগইন পেজে যান (Go to Sign In)
              </button>
            </Link>
          </div>

          <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
            অ্যাডমিন অনুমোদন সম্পন্ন হলে এই ইমেইল ও পাসওয়ার্ড ব্যবহার করে আপনি আপনার সমস্ত কোটেশন ও পিআই ট্র্যাক করতে পারবেন।
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#FDF2F4] border border-[#D8A4AF] text-[#800020] flex items-center justify-center mx-auto mb-3">
            <Building2 className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#800020] bg-[#FDF2F4] border border-[#F9E6EA] px-2.5 py-0.5 rounded-md inline-block mb-1">
            Mill Registration
          </span>
          <h1 className="text-2xl font-bold text-[#2D2D2D] tracking-tight">
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
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#2D2D2D] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#800020]"
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
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#2D2D2D] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#800020]"
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
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#2D2D2D] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#800020]"
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
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#2D2D2D] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#800020]"
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
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#2D2D2D] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#800020]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#800020] hover:bg-[#5A0017] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer mt-4"
          >
            <span>Complete Registration</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          Already registered?{" "}
          <Link href="/account/login" className="text-[#800020] font-bold hover:underline">
            Sign In →
          </Link>
        </div>
      </div>
    </div>
  );
}
