"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  AlertCircle,
  Mail,
  ArrowRight,
  Building2,
  Loader2,
  RefreshCw,
} from "lucide-react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.trim() || "";

  const [isVerifying, setIsVerifying] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [verifiedEmail, setVerifiedEmail] = useState("");

  // Resend state
  const [resendEmail, setResendEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    if (!token) {
      setIsVerifying(false);
      setIsSuccess(false);
      setErrorMessage("No email verification token was provided.");
      return;
    }

    const performVerification = async () => {
      try {
        const res = await fetch(`/api/auth/verify-email?token=${encodeURIComponent(token)}`);
        const data = await res.json();
        if (res.ok && data.success) {
          setIsSuccess(true);
          setVerifiedEmail(data.email || "");
        } else {
          setIsSuccess(false);
          setErrorMessage(data.error || "This verification link is invalid or has expired.");
        }
      } catch {
        setIsSuccess(false);
        setErrorMessage("Network error while verifying email. Please check your connection.");
      } finally {
        setIsVerifying(false);
      }
    };

    performVerification();
  }, [token]);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    setResendStatus(null);

    const trimmed = resendEmail.trim().toLowerCase();
    if (!trimmed || !trimmed.includes("@")) {
      setResendStatus({ success: false, message: "Please enter a valid business email address." });
      return;
    }

    setIsResending(true);
    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setResendStatus({
          success: true,
          message: data.message || "A new verification email has been sent. Please check your inbox.",
        });
      } else {
        setResendStatus({
          success: false,
          message: data.error || "Failed to resend verification email. Please try again.",
        });
      }
    } catch {
      setResendStatus({
        success: false,
        message: "Network error. Please check your internet connection.",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#FDF2F4] border border-[#D8A4AF] text-[#800020] flex items-center justify-center mx-auto mb-3">
            <Building2 className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#800020] bg-[#FDF2F4] border border-[#F9E6EA] px-2.5 py-0.5 rounded-md inline-block mb-1">
            Account Activation
          </span>
          <h1 className="text-2xl font-bold text-[#2D2D2D] tracking-tight">
            Email Verification
          </h1>
        </div>

        {/* Loading Spinner */}
        {isVerifying && (
          <div className="py-12 text-center space-y-3">
            <Loader2 className="w-9 h-9 text-[#800020] animate-spin mx-auto" />
            <p className="text-xs text-slate-600 font-medium">
              Verifying your email address with Tasneem Knitting Industry...
            </p>
          </div>
        )}

        {/* Verification Success */}
        {!isVerifying && isSuccess && (
          <div className="space-y-5 text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-left space-y-1.5">
              <h2 className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                Email Successfully Verified!
              </h2>
              <p className="text-xs text-emerald-700/90 leading-relaxed">
                Thank you! Your email address{verifiedEmail ? ` (${verifiedEmail})` : ""} has been confirmed.
              </p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Your buyer account is now verified. You can sign in to view industrial machinery catalogs, track quote submissions, and access Proforma Invoices.
            </p>

            <div className="pt-2">
              <Link
                href="/account/login"
                className="w-full py-3 px-4 rounded-xl bg-[#800020] hover:bg-[#5A0017] text-white text-xs font-bold transition-colors inline-flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Sign In to Buyer Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Verification Failed or Expired */}
        {!isVerifying && !isSuccess && (
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 space-y-1.5">
              <div className="flex items-center gap-2 text-red-800 font-bold text-xs">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>Verification Link Invalid or Expired</span>
              </div>
              <p className="text-xs text-red-700/90 leading-relaxed">
                {errorMessage || "This email verification link is no longer valid. Tokens expire after 24 hours."}
              </p>
            </div>

            {/* Resend Verification Form */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  Resend Verification Email
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Enter your registered business email to receive a fresh verification link.
                </p>
              </div>

              {resendStatus && (
                <div
                  className={`p-2.5 rounded-lg text-xs ${
                    resendStatus.success
                      ? "bg-emerald-100/70 border border-emerald-200 text-emerald-800"
                      : "bg-red-100/70 border border-red-200 text-red-700"
                  }`}
                >
                  {resendStatus.message}
                </div>
              )}

              <form onSubmit={handleResend} className="space-y-2.5">
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={resendEmail}
                    onChange={(e) => setResendEmail(e.target.value)}
                    placeholder="buyer@textilemill.com"
                    disabled={isResending}
                    className="w-full pl-9 pr-4 py-2 bg-white border border-[#D1D5DB] rounded-lg text-xs text-[#2D2D2D] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isResending}
                  className="w-full py-2.5 px-3 rounded-lg bg-[#800020] hover:bg-[#5A0017] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isResending ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending New Link...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Resend Verification Link</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            <div className="text-center pt-2">
              <Link
                href="/account/login"
                className="text-xs text-slate-500 hover:text-[#800020] hover:underline"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-[#ECE9E4] flex items-center justify-center p-4 sm:p-6 font-sans">
      <Suspense
        fallback={
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm text-center">
            <Loader2 className="w-8 h-8 text-[#800020] animate-spin mx-auto mb-2" />
            <p className="text-xs text-slate-500">Checking email verification status...</p>
          </div>
        }
      >
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
