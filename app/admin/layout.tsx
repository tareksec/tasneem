"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { AdminAuthProvider } from "@/lib/admin/auth-context";
import { ToastProvider } from "@/components/admin/ui/toast";
import { AdminSidebar } from "@/components/admin/layout/AdminSidebar";
import { AdminTopBar } from "@/components/admin/layout/AdminTopBar";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // If on login page, render clean centered layout without sidebar or top bar
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-[#F4F5F9] text-slate-900">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#F4F5F9] text-slate-900 flex">
      {/* DealDeck-style Left Fixed Sidebar */}
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Admin Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 xl:pl-72 transition-all">
        {/* DealDeck-style Top Bar */}
        <AdminTopBar onToggleMobileSidebar={() => setMobileOpen(true)} />

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <ToastProvider>
        <AdminLayoutInner>{children}</AdminLayoutInner>
      </ToastProvider>
    </AdminAuthProvider>
  );
}
