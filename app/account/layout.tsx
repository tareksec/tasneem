"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FileText, User, LogOut, ArrowLeft, Building2 } from "lucide-react";
import { useCustomerAuth } from "@/lib/customer/customer-context";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { customer, logout, isLoading } = useCustomerAuth();

  // If on login or register, don't show the dashboard shell
  const isAuthPage = pathname === "/account/login" || pathname === "/account/register";
  if (isAuthPage) {
    return <div className="min-h-[80vh] bg-white py-12">{children}</div>;
  }

  const handleLogout = () => {
    logout();
    router.push("/account/login");
  };

  const navItems = [
    {
      name: "My Quotes",
      href: "/account/quotes",
      icon: FileText,
    },
    {
      name: "Company Profile",
      href: "/account/profile",
      icon: User,
    },
  ];

  return (
    <div className="py-10 sm:py-16 bg-[#F9FAFB] min-h-[85vh] text-[#0A0A0A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Catalog Link */}
        <div className="mb-6">
          <Link
            href="/machines"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4B5563] hover:text-[#0A0A0A]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Machinery Catalog</span>
          </Link>
        </div>

        {/* Account Header Banner */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[#FF0000] font-black text-xl">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF0000] bg-red-50 px-2 py-0.5 rounded-md inline-block mb-1">
                Buyer Customer Portal
              </span>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0A0A0A]">
                {customer ? customer.company || customer.name : "My Account"}
              </h1>
              <p className="text-xs text-[#6B7280]">
                {customer ? `Logged in as ${customer.email}` : "Manage your B2B machinery quote inquiries"}
              </p>
            </div>
          </div>

          {customer && (
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#E5E7EB] text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors shrink-0"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          )}
        </div>

        {/* Portal Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E5E7EB] mb-8 pb-px">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                  isActive
                    ? "border-[#FF0000] text-[#FF0000]"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Page Content */}
        {children}
      </div>
    </div>
  );
}
