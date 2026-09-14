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

  // If on login page, render clean centered layout
  if (pathname === "/admin/login") {
    return (
      <div className="min-h-screen bg-[#ECE9E4] flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-[#F4F3EF] rounded-[36px] shadow-2xl overflow-hidden border border-black/5 p-6 sm:p-8">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECE9E4] text-slate-900 flex items-center justify-center p-2 sm:p-5 lg:p-7 xl:p-9 font-sans selection:bg-[#FF4186] selection:text-white">
      {/* Floating App Container (Pixel-perfect matching reference design image window) */}
      <div className="w-full max-w-[1440px] bg-[#111217] rounded-[32px] sm:rounded-[38px] shadow-[0_30px_90px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col lg:flex-row min-h-[860px] border border-black/5">
        {/* Sleek Dark Left Sidebar */}
        <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        {/* Main App Content Viewport (Warm Light Canvas #F4F3EF with deep rounded corners) */}
        <div className="flex-1 bg-[#F4F3EF] lg:rounded-[36px] flex flex-col min-w-0 overflow-y-auto transition-all">
          {/* Header Bar */}
          <AdminTopBar onToggleMobileSidebar={() => setMobileOpen(true)} />

          {/* Page Body Viewport */}
          <main className="flex-1 px-6 sm:px-8 lg:px-10 pb-8 sm:pb-10 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
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
