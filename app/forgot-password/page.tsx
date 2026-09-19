"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, ArrowLeft, Building2, CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !trimmed.includes("@")) {
      setError("Please enter a valid business email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = await res.json();
      if (!res.ok && !data.success) {
        setError(data.error || "Unable to send reset email. Please try again.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Network error. Please check your internet connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ECE9E4] flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-sm">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#FDF2F4] border border-[#D8A4AF] text-[#800020] flex items-center justify-center mx-auto mb-3">
              <Building2 className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#800020] bg-[#FDF2F4] border border-[#F9E6EA] px-2.5 py-0.5 rounded-md inline-block mb-1">
              Buyer Security
            </span>
            <h1 className="text-2xl font-bold text-[#2D2D2D] tracking-tight">
              Reset Password
            </h1>
            <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed">
              Enter your registered business email and we will send you a secure password reset link.
            </p>
          </div>

          {submitted ? (
            <div className="space-y-5 text-center">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-left space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Password Reset Link Sent</span>
                </div>
                <p className="text-xs text-emerald-700/90 leading-relaxed">
                  If that email exists in our system, a password reset link has been sent to{" "}
                  <strong className="font-mono text-emerald-900">{email}</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-1.5 text-[11px] text-slate-600">
                <p className="font-semibold text-slate-800">What to do next:</p>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li>Check your inbox and spam/junk folder.</li>
                  <li>Click the reset link in the email (valid for 1 hour).</li>
                  <li>Set your new secure password.</li>
                </ul>
              </div>

              <div className="pt-2 space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setEmail("");
                  }}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Send another request
                </button>

                <Link
                  href="/account/login"
                  className="inline-flex items-center justify-center gap-1.5 text-xs text-[#800020] font-bold hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Sign In</span>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Business / Work Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="buyer@textilemill.com"
                    disabled={isSubmitting}
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#2D2D2D] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020] disabled:bg-slate-50"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-[#800020] hover:bg-[#5A0017] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-70 mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Reset Link...</span>
                  </>
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="mt-6 pt-4 border-t border-[#E5E7EB] text-center">
                <Link
                  href="/account/login"
                  className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-[#800020] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
