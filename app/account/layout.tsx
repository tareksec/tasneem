"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FileText,
  User,
  LogOut,
  ArrowLeft,
  Cpu,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { useCustomerAuth } from "@/lib/customer/customer-context";
import { cn } from "@/lib/utils";
import { Knot3DAccent } from "@/components/admin/layout/AdminSidebar";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { customer, logout } = useCustomerAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  // If on login or register, render cleanly centered inside warm canvas
  const isAuthPage = pathname === "/account/login" || pathname === "/account/register";
  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-[#ECE9E4] flex items-center justify-center p-4 sm:p-6 font-sans">
        {children}
      </div>
    );
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
    {
      name: "Browse Catalog",
      href: "/machines",
      icon: Cpu,
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full items-center justify-between py-6 px-2.5 select-none">
      {/* Top Section */}
      <div className="flex flex-col items-center w-full space-y-6">
        {/* Brand Squircle */}
        <Link
          href="/account/quotes"
          className="group relative flex items-center justify-center"
          title="Customer Portal"
        >
          <div className="w-11 h-11 rounded-[16px] bg-gradient-to-tr from-[#D8A4AF] via-[#800020] to-[#5A0017] p-0.5 flex items-center justify-center shadow-lg shadow-[#800020]/25 transition-transform duration-200 group-hover:scale-105 active:scale-95">
            <span className="text-white font-black text-lg">T</span>
          </div>
        </Link>

        {/* Vertical Icon Navigation */}
        <nav className="flex flex-col items-center space-y-2.5 w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <div key={item.name} className="relative w-full flex justify-center">
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "relative w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-[#383A42] text-white shadow-inner"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                  title={item.name}
                  aria-label={item.name}
                >
                  <Icon className={cn("w-5 h-5 transition-transform", isActive ? "scale-105" : "")} />

                  {/* Active Capsule Tab on Right Edge */}
                  {isActive && (
                    <span
                      className="absolute -right-2.5 w-1.5 h-3.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col items-center w-full space-y-4 pt-4">
        {/* 3D Fluid Knot */}
        <div className="relative cursor-pointer hover:scale-105 transition-transform" title="Tasneem Knitting">
          <Knot3DAccent />
        </div>

        {/* User Avatar */}
        <div
          className="w-10 h-10 rounded-[14px] bg-gradient-to-tr from-slate-700 to-slate-500 overflow-hidden ring-2 ring-white/15 p-0.5 flex items-center justify-center shadow-md"
          title={customer?.company || customer?.name || "Customer Account"}
        >
          <div className="w-full h-full rounded-[12px] bg-slate-800 flex items-center justify-center text-xs font-bold text-white uppercase">
            {customer?.name ? customer.name.slice(0, 2) : "CU"}
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          type="button"
          onClick={handleLogout}
          className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Sign Out"
          aria-label="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-[#2D2D2D] flex items-center justify-center p-2 sm:p-5 lg:p-7 xl:p-9 font-sans selection:bg-[#800020] selection:text-white">
      {/* Floating App Container */}
      <div className="w-full max-w-[1440px] bg-[#111217] rounded-[32px] sm:rounded-[38px] shadow-[0_30px_90px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col lg:flex-row min-h-[860px] border border-black/5">
        {/* Sleek Dark Left Sidebar */}
        <aside className="hidden lg:flex w-20 xl:w-[84px] flex-col shrink-0 bg-[#111217] z-30 select-none">
          {sidebarContent}
        </aside>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <div className="fixed inset-y-0 left-0 w-24 bg-[#111217] shadow-2xl z-50 animate-in slide-in-from-left duration-200">
              <div className="absolute top-2 right-2">
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {sidebarContent}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 bg-[#F4F3EF] lg:rounded-[36px] flex flex-col min-w-0 overflow-y-auto transition-all">
          {/* Header Bar */}
          <header className="px-6 sm:px-8 lg:px-10 pt-6 sm:pt-8 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 rounded-2xl bg-white border border-slate-200/80 text-slate-800 shadow-xs cursor-pointer hover:bg-slate-50"
                aria-label="Open Navigation Drawer"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111217] tracking-tight leading-none">
                  {customer ? customer.company || customer.name : "Customer Portal"}
                </h1>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  {customer ? `Logged in as ${customer.email}` : "Commercial Inquiry & Quotation Center"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Back to Catalog Pill */}
              <Link
                href="/machines"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 hover:bg-white border border-slate-200/80 text-xs font-bold text-slate-800 shadow-2xs transition-colors"
              >
                <Cpu className="w-3.5 h-3.5 text-slate-600" />
                <span>Machinery Catalog</span>
              </Link>

              {/* Sign out pill */}
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111217] text-white hover:bg-slate-850 text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </header>

          {/* Page Body Viewport */}
          <main className="flex-1 px-6 sm:px-8 lg:px-10 pb-8 sm:pb-10 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
