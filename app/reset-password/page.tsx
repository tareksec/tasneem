"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Lock,
  ArrowRight,
  Building2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  KeyRound,
  Eye,
  EyeOff,
} from "lucide-react";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.trim() || "";

  const [isValidating, setIsValidating] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [validationError, setValidationError] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setIsValidating(false);
      setTokenValid(false);
      setValidationError("No password reset token was provided.");
      return;
    }

    const checkToken = async () => {
      try {
        const res = await fetch(`/api/auth/reset-password?token=${encodeURIComponent(token)}`);
        const data = await res.json();
        if (res.ok && data.success) {
          setTokenValid(true);
        } else {
          setTokenValid(false);
          setValidationError(data.error || "This reset link is invalid or has expired.");
        }
      } catch {
        setTokenValid(false);
        setValidationError("Could not verify your reset token. Please check your connection.");
      } finally {
        setIsValidating(false);
      }
    };

    checkToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!password || password.length < 6) {
      setFormError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match. Please ensure both fields are identical.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setFormError(data.error || "Failed to reset password. Please try again.");
      } else {
        setResetSuccess(true);
      }
    } catch {
      setFormError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#FDF2F4] border border-[#D8A4AF] text-[#800020] flex items-center justify-center mx-auto mb-3">
            <KeyRound className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#800020] bg-[#FDF2F4] border border-[#F9E6EA] px-2.5 py-0.5 rounded-md inline-block mb-1">
            Buyer Account Security
          </span>
          <h1 className="text-2xl font-bold text-[#2D2D2D] tracking-tight">
            Create New Password
          </h1>
          <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed">
            Please choose a secure password for your buyer portal account.
          </p>
        </div>

        {/* Loading Token Check */}
        {isValidating && (
          <div className="py-12 text-center space-y-3">
            <Loader2 className="w-8 h-8 text-[#800020] animate-spin mx-auto" />
            <p className="text-xs text-slate-500">Validating password reset link...</p>
          </div>
        )}

        {/* Invalid or Expired Token */}
        {!isValidating && !tokenValid && (
          <div className="space-y-5 text-center">
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-left space-y-2">
              <div className="flex items-center gap-2 text-red-800 font-bold text-xs">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>Reset Link Invalid or Expired</span>
              </div>
              <p className="text-xs text-red-700/90 leading-relaxed">
                {validationError || "This password reset token has expired or has already been used."}
              </p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Password reset links expire after 1 hour for your security. You can easily request a new one below:
            </p>

            <div className="space-y-2 pt-2">
              <Link
                href="/forgot-password"
                className="w-full py-2.5 px-4 rounded-xl bg-[#800020] hover:bg-[#5A0017] text-white text-xs font-bold transition-colors inline-flex items-center justify-center gap-2"
              >
                <span>Request New Reset Link</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div>
                <Link
                  href="/account/login"
                  className="text-xs text-slate-500 hover:text-[#800020] hover:underline"
                >
                  Return to Sign In
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Reset Success State */}
        {!isValidating && tokenValid && resetSuccess && (
          <div className="space-y-5 text-center">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-left space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Password Successfully Updated!</span>
              </div>
              <p className="text-xs text-emerald-700/90 leading-relaxed">
                Your buyer account password has been reset. You can now sign in using your new password.
              </p>
            </div>

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

        {/* Reset Form */}
        {!isValidating && tokenValid && !resetSuccess && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {formError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                {formError}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  disabled={isSubmitting}
                  className="w-full pl-9 pr-10 py-2.5 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#2D2D2D] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  disabled={isSubmitting}
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#D1D5DB] rounded-xl text-xs text-[#2D2D2D] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020]"
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
                  <span>Updating Password...</span>
                </>
              ) : (
                <>
                  <span>Save New Password</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#ECE9E4] flex items-center justify-center p-4 sm:p-6 font-sans">
      <Suspense
        fallback={
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 shadow-sm text-center">
            <Loader2 className="w-8 h-8 text-[#800020] animate-spin mx-auto mb-2" />
            <p className="text-xs text-slate-500">Loading reset session...</p>
          </div>
        }
      >
        <ResetPasswordContent />
      </Suspense>
    </div>
  );
}
