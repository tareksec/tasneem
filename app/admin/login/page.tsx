"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldAlert, ArrowRight, CheckCircle2, KeyRound } from "lucide-react";
import { useAdminAuth } from "@/lib/admin/auth-context";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/admin/ui/card";
import { Modal } from "@/components/admin/ui/modal";

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, login } = useAdminAuth();
  const [email, setEmail] = useState("admin@tasneem.com");
  const [password, setPassword] = useState("admin123");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  // If already authenticated, redirect to /admin
  useEffect(() => {
    if (user) {
      router.push("/admin");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      router.push("/admin");
    } else {
      setErrorMessage(result.error || "Authentication failed. Please check your credentials.");
    }
  };

  const fillDemoCredentials = () => {
    setEmail("admin@tasneem.com");
    setPassword("admin123");
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
            Sign in to manage blog publications and site content
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-slate-200/90 shadow-xl bg-white rounded-3xl p-2 sm:p-4">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Staff Authentication</CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Internal access only. Admin accounts are provisioned by the Super Admin.
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
                    className="text-xs font-medium text-[#FF0000] hover:underline cursor-pointer"
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
                    className="rounded border-slate-300 text-[#FF0000] focus:ring-[#FF0000]"
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
                Staff portal. No public registration permitted.
              </p>
            </CardFooter>
          </form>
        </Card>

        {/* Medusa Note Footer */}
        <div className="text-center mt-6 text-xs text-slate-400">
          Looking for machinery catalog or quotes?{" "}
          <a
            href="http://localhost:9000/app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-700 hover:text-slate-900 font-semibold underline"
          >
            Access Medusa Admin ↗
          </a>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
        title="Staff Password Reset"
        description="Admin credentials policy"
        footer={
          <Button variant="secondary" size="sm" onClick={() => setForgotPasswordOpen(false)}>
            Close
          </Button>
        }
      >
        <div className="space-y-3 text-xs text-slate-600">
          <p>
            For compliance and security reasons, self-service password reset is disabled for staff accounts.
          </p>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <p className="font-semibold text-slate-900">How to reset your credentials:</p>
            <ol className="list-decimal pl-4 mt-1.5 space-y-1 text-slate-600">
              <li>Contact your Super Administrator or IT Operations lead.</li>
              <li>Provide your registered staff email and employee verification code.</li>
              <li>A temporary password will be provisioned directly via internal email.</li>
            </ol>
          </div>
          <p className="text-slate-400 italic">
            For local testing, you can use the pre-filled credentials:{" "}
            <span className="font-mono font-bold text-slate-700">admin@tasneem.com / admin123</span>.
          </p>
        </div>
      </Modal>
    </div>
  );
}
