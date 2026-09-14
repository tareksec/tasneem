"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Cpu,
  Inbox,
  FileText,
  Images,
  SlidersHorizontal,
  Link2,
  ExternalLink,
  LogOut,
  X,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdminAuth } from "@/lib/admin/auth-context";
import { AdminStore } from "@/lib/admin/admin-store";

interface AdminSidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export function Knot3DAccent({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-14 h-14 select-none drop-shadow-[0_8px_16px_rgba(128,0,32,0.35)]", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="knotGrad1" x1="15" y1="20" x2="85" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D8A4AF" />
          <stop offset="35%" stopColor="#A64D65" />
          <stop offset="70%" stopColor="#800020" />
          <stop offset="100%" stopColor="#5A0017" />
        </linearGradient>

        <linearGradient id="knotGrad2" x1="80" y1="30" x2="30" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A64D65" />
          <stop offset="50%" stopColor="#800020" />
          <stop offset="100%" stopColor="#5A0017" />
        </linearGradient>

        <linearGradient id="knotHighlight" x1="30" y1="20" x2="70" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Back Loop Shadow / Body */}
      <path
        d="M32 68 C20 54 22 34 38 24 C52 14 72 20 78 36 C84 52 74 72 58 80 C44 87 28 80 22 66"
        stroke="url(#knotGrad2)"
        strokeWidth="16"
        strokeLinecap="round"
      />

      {/* Front Intertwined Loop */}
      <path
        d="M24 46 C20 32 30 18 46 20 C62 22 74 38 68 54 C62 70 42 78 28 72 C18 67 16 52 28 42 C40 32 64 36 74 48 C82 58 78 74 64 80"
        stroke="url(#knotGrad1)"
        strokeWidth="15"
        strokeLinecap="round"
      />

      {/* Specular 3D Highlight Reflection */}
      <path
        d="M36 24 C46 19 60 23 68 34"
        stroke="url(#knotHighlight)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M26 68 C22 58 26 48 34 44"
        stroke="url(#knotHighlight)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AdminSidebar({ mobileOpen, setMobileOpen }: AdminSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAdminAuth();
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [pendingUsersCount, setPendingUsersCount] = useState(0);

  // Sync pending approval requests count for live badge
  useEffect(() => {
    const updateCount = () => {
      try {
        const pending = AdminStore.getPendingCustomers();
        setPendingUsersCount(pending.length);
      } catch {
        // ignore
      }
    };
    updateCount();
    window.addEventListener("tasneem-store-updated", updateCount);
    return () => window.removeEventListener("tasneem-store-updated", updateCount);
  }, []);

  const navItems = [
    {
      name: "Analytics",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      name: "Catalog",
      href: "/admin/products",
      icon: Cpu,
    },
    {
      name: "Quotes",
      href: "/admin/quotes",
      icon: Inbox,
      badge: "New",
    },
    {
      name: "Buyer Accounts",
      href: "/admin/users",
      icon: Users,
      badge: pendingUsersCount > 0 ? `${pendingUsersCount}` : undefined,
    },
    {
      name: "Blog",
      href: "/admin/blog",
      icon: FileText,
    },
    {
      name: "Gallery",
      href: "/admin/gallery",
      icon: Images,
    },
    {
      name: "Content",
      href: "/admin/site-content",
      icon: SlidersHorizontal,
    },
    {
      name: "Redirects",
      href: "/admin/redirects",
      icon: Link2,
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full items-center justify-between py-6 px-2.5 select-none">
      {/* Top Section: Brand Squircle & Navigation */}
      <div className="flex flex-col items-center w-full space-y-6">
        {/* Brand Logo Squircle */}
        <Link
          href="/admin"
          className="group relative flex items-center justify-center"
          title="Tasneem Admin Portal"
        >
          <div className="w-11 h-11 rounded-[16px] bg-gradient-to-tr from-[#800020] via-[#6B001B] to-[#5A0017] p-0.5 flex items-center justify-center shadow-lg shadow-[#800020]/20 transition-transform duration-200 group-hover:scale-105 active:scale-95">
            {/* White Ribbon / T monogram */}
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
              <path
                d="M5 6C5 4.89543 5.89543 4 7 4H17C18.1046 4 19 4.89543 19 6C19 7.10457 18.1046 8 17 8H13.5V18C13.5 19.1046 12.6046 20 11.5 20C10.3954 20 9.5 19.1046 9.5 18V8H7C5.89543 8 5 7.10457 5 6Z"
                fill="white"
              />
            </svg>
          </div>
        </Link>

        {/* Vertical Icon Navigation */}
        <nav className="flex flex-col items-center space-y-2.5 w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);

            return (
              <div key={item.name} className="relative w-full flex justify-center">
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  onMouseEnter={() => setShowTooltip(item.name)}
                  onMouseLeave={() => setShowTooltip(null)}
                  className={cn(
                    "relative w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-[#800020] text-white shadow-inner"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                  aria-label={item.name}
                >
                  <Icon className={cn("w-5 h-5 transition-transform", isActive ? "scale-105" : "")} />

                  {/* Active Capsule Indicator Tab on Right Edge */}
                  {isActive && (
                    <span
                      className="absolute -right-2.5 w-1.5 h-3.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                      aria-hidden="true"
                    />
                  )}

                  {/* Burgundy dot badge if item has badge */}
                  {item.badge && !isActive && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#800020]" />
                  )}
                </Link>

                {/* Floating Tooltip */}
                {showTooltip === item.name && (
                  <div className="absolute left-14 top-1/2 -translate-y-1/2 z-50 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-semibold whitespace-nowrap shadow-xl border border-white/10 animate-in fade-in zoom-in-95 pointer-events-none">
                    {item.name}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: 3D Fluid Knot, User Avatar & Controls */}
      <div className="flex flex-col items-center w-full space-y-4 pt-4">
        {/* Signature brand accent */}
        <div className="relative cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95" title="Tasneem Knitting Technology">
          <Knot3DAccent />
        </div>

        {/* User avatar with notification badge */}
        <div className="relative mt-1">
          <div
            className="w-10 h-10 rounded-[14px] bg-gradient-to-tr from-slate-700 to-slate-500 overflow-hidden ring-2 ring-white/15 p-0.5 flex items-center justify-center cursor-pointer shadow-md"
            title={`${user?.name || "Admin Staff"} (${user?.role || "Administrator"})`}
          >
            {/* Stylized portrait avatar */}
            <div className="w-full h-full rounded-[12px] bg-slate-800 flex items-center justify-center text-xs font-bold text-white uppercase">
              {user?.name ? user.name.slice(0, 2) : "TS"}
            </div>
          </div>

          {/* Notification pill */}
          <span
            className="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-1 rounded-full bg-[#800020] text-white text-[9px] font-extrabold flex items-center justify-center ring-2 ring-[#111217]"
            title="6 unread notifications"
          >
            6
          </span>
        </div>

        {/* Bottom Actions: Logout & Menu */}
        <div className="flex items-center gap-1.5 text-slate-400">
          <button
            type="button"
            onClick={() => logout()}
            className="p-1.5 rounded-xl hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Sign Out"
            aria-label="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-xl hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="View Live Site"
            aria-label="View Live Site"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Compact Dark Sidebar */}
      <aside className="hidden lg:flex w-20 xl:w-[84px] flex-col shrink-0 bg-[#2D2D2D] z-30 select-none">
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
          <div className="fixed inset-y-0 left-0 w-24 bg-[#2D2D2D] shadow-2xl z-50 animate-in slide-in-from-left duration-200 overflow-y-auto">
            <div className="absolute top-2 right-2">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center text-slate-400 hover:text-white rounded-lg cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
