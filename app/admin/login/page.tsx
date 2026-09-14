"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, ShieldAlert, ArrowRight, CheckCircle2, KeyRound } from "lucide-react";
import { useAdminAuth } from "@/lib/admin/auth-context";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/admin/ui/card";
import { Modal } from "@/components/admin/ui/modal";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const { user, login } = useAdminAuth();

  const [email, setEmail] = useState("admin@tasneem.com");
  const [password, setPassword] = useState("TasneemAdmin2026!Secure");
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
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-[#F4F5F9]">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex h-12 w-12 rounded-2xl bg-slate-900 text-white items-center justify-center font-extrabold text-xl shadow-md mb-3">
            T
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Tasneem Admin Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Sign in to manage machinery catalog, quotes, and blog publications
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-slate-200/90 shadow-xl bg-white rounded-3xl p-2 sm:p-4">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Staff Authentication</CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Secured with NextAuth.js JWT. Internal staff access only.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {errorMessage && (
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                  <ShieldAlert className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Staff Email Address
                </label>
                <div className="relative">
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@tasneemknitindustry.com"
                    className="pl-9"
                  />
                  <Mail className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotPasswordOpen(true)}
                    className="text-xs font-medium text-[#800020] hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-9"
                  />
                  <Lock className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-[#800020] focus:ring-[#800020]"
                  />
                  <span>Stay signed in</span>
                </label>

                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="text-slate-500 hover:text-slate-900 font-medium underline text-[11px] cursor-pointer"
                >
                  Quick Fill Demo
                </button>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 pt-3 border-t border-slate-100">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-10 text-sm font-semibold gap-2 shadow-sm"
              >
                {loading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>

              <p className="text-[11px] text-center text-slate-400">
                Authorized staff portal. Protected by server-side JWT session.
              </p>
            </CardFooter>
          </form>
        </Card>

        {/* Forgot Password Modal */}
        <Modal
          isOpen={forgotPasswordOpen}
          onClose={() => setForgotPasswordOpen(false)}
          title="Staff Password Assistance"
          description="Internal credentials policy"
        >
          <div className="space-y-4 text-xs text-slate-600">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-amber-800">
              <KeyRound className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Administrative Password Reset</p>
                <p>
                  To reset staff passwords, run the Prisma seed or update the Admin table in Hostinger phpMyAdmin directly.
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button size="sm" onClick={() => setForgotPasswordOpen(false)}>
                Got it
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F4F5F9] flex items-center justify-center text-xs text-slate-500">Loading auth portal...</div>}>
      <LoginForm />
    </Suspense>
  );
}
