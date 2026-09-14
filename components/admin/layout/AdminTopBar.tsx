"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Search,
  Maximize2,
  Menu,
  ChevronDown,
  Globe,
  Plus,
  Languages,
  Check,
  LogOut,
  ExternalLink,
  Store,
  Home,
} from "lucide-react";
import { useAdminAuth } from "@/lib/admin/auth-context";
import { cn } from "@/lib/utils";

interface AdminTopBarProps {
  onToggleMobileSidebar: () => void;
}

export function AdminTopBar({ onToggleMobileSidebar }: AdminTopBarProps) {
  const pathname = usePathname();
  const { user, logout, contentLocale, setContentLocale } = useAdminAuth();
  const [showDomainMenu, setShowDomainMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Determine active view title based on current path
  const getPageTitle = () => {
    if (pathname === "/admin") return "Analytics";
    if (pathname.startsWith("/admin/products")) return "Machinery Catalog";
    if (pathname.startsWith("/admin/quotes")) return "Quotes Inbox";
    if (pathname.startsWith("/admin/blog")) return "Editorial & Blog";
    if (pathname.startsWith("/admin/gallery")) return "Projects Gallery";
    if (pathname.startsWith("/admin/site-content")) return "Site Content";
    if (pathname.startsWith("/admin/redirects")) return "301 Redirects";
    return "Dashboard";
  };

  const pageTitle = getPageTitle();

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  return (
    <header className="px-3.5 sm:px-8 lg:px-10 pt-4 sm:pt-8 pb-3 sm:pb-4 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 select-none">
      {/* Left: Mobile Hamburger & Page Title */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-2xl bg-white border border-slate-200/80 text-slate-800 shadow-xs cursor-pointer hover:bg-slate-50"
          aria-label="Open Navigation Drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111217] tracking-tight leading-none">
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* Center & Right Controls: Search, Domain Dropdown, Actions */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {/* Visit Public Website Home Button */}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/90 hover:bg-white border border-slate-200/80 text-xs font-bold text-slate-800 hover:text-[#800020] shadow-2xs hover:border-[#800020]/30 transition-all group cursor-pointer"
          title="Open Public Website Home"
        >
          <Home className="w-3.5 h-3.5 text-[#800020] group-hover:scale-110 transition-transform" />
          <span>Home</span>
          <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-[#800020] transition-colors" />
        </Link>

        {/* Domain Selector Pill (Pixel-perfect matching reference image dropdown) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDomainMenu(!showDomainMenu)}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/90 hover:bg-white border border-slate-200/80 text-xs font-semibold text-slate-800 shadow-2xs transition-colors cursor-pointer"
          >
            {/* Facebook/Globe icon */}
            <div className="w-4 h-4 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-[10px] font-bold">
              f
            </div>
            <span className="max-w-[120px] min-[380px]:max-w-[160px] sm:max-w-[190px] truncate">facebook.com/tasneemknitind</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showDomainMenu && (
            <div className="absolute left-0 mt-2 w-64 max-w-[calc(100vw-2rem)] rounded-2xl bg-white p-2 shadow-xl border border-slate-200/80 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Connected Properties
              </div>
              <a
                href="https://www.facebook.com/tasneemknitind"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-[9px] font-bold">
                    f
                  </div>
                  <span>facebook.com/tasneemknitind</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
              <a
                href="https://tasneemknitindustry.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-600" />
                  <span>tasneemknitindustry.com</span>
                </div>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          )}
        </div>

        {/* Search Pill Input */}
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-32 min-[400px]:w-44 sm:w-48 md:w-56 pl-9 pr-4 py-2 text-xs rounded-full bg-white/90 hover:bg-white focus:bg-white border border-slate-200/80 text-slate-800 placeholder-slate-400 shadow-2xs focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all"
          />
        </div>

        {/* Content Language Toggle [EN] / [BN] */}
        <div className="hidden sm:flex items-center bg-white/90 border border-slate-200/80 rounded-full p-0.5 shadow-2xs">
          <button
            type="button"
            onClick={() => setContentLocale("en")}
            className={cn(
              "px-2.5 py-1 rounded-full text-[11px] font-bold transition-all duration-150 cursor-pointer",
              contentLocale === "en"
                ? "bg-[#2D2D2D] text-white shadow-2xs"
                : "text-slate-500 hover:text-slate-900"
            )}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setContentLocale("bn")}
            className={cn(
              "px-2.5 py-1 rounded-full text-[11px] font-bold transition-all duration-150 cursor-pointer",
              contentLocale === "bn"
                ? "bg-[#800020] text-white shadow-2xs"
                : "text-slate-500 hover:text-slate-900"
            )}
          >
            বাংলা
          </button>
        </div>

        {/* Black Pill Action Button ("New Company" / "+ Add Item" matching reference) */}
        <Link
          href={pathname.startsWith("/admin/products") ? "/admin/products/new" : "/admin/products/new"}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#800020] hover:bg-[#5A0017] text-white text-xs font-bold shadow-sm transition-all duration-200 active:scale-[0.98] cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Machine</span>
        </Link>

        {/* Fullscreen Expand Icon Button (Matching [ ] in reference) */}
        <button
          type="button"
          onClick={toggleFullScreen}
          className="w-9 h-9 rounded-full bg-white/90 hover:bg-white border border-slate-200/80 text-slate-600 hover:text-slate-900 shadow-2xs flex items-center justify-center transition-colors cursor-pointer"
          title="Toggle Fullscreen"
          aria-label="Toggle Fullscreen"
        >
          {/* Custom scan / four corners icon matching reference image ⛶ */}
          <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 8V5a1 1 0 0 1 1-1h3" />
            <path d="M16 4h3a1 1 0 0 1 1 1v3" />
            <path d="M20 16v3a1 1 0 0 1-1 1h-3" />
            <path d="M8 20H5a1 1 0 0 1-1-1v-3" />
          </svg>
        </button>

        {/* Notification Bell with Red Badge "6" (Matching bell in reference) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-9 h-9 rounded-full bg-white/90 hover:bg-white border border-slate-200/80 text-slate-600 hover:text-slate-900 shadow-2xs flex items-center justify-center transition-colors cursor-pointer relative"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#800020] text-white text-[9px] font-extrabold flex items-center justify-center ring-2 ring-white">
              6
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-xs sm:w-80 rounded-3xl bg-white p-4 shadow-2xl border border-slate-200/80 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Live Notifications
                </span>
                <span className="text-[10px] font-bold text-[#800020] bg-[#FDF2F4] px-2.5 py-0.5 rounded-full">
                  6 New
                </span>
              </div>
              <div className="mt-3 space-y-2 text-xs">
                <Link
                  href="/admin/quotes"
                  onClick={() => setShowNotifications(false)}
                  className="block p-2.5 rounded-2xl bg-[#F8F7F4] hover:bg-[#F0EFEB] transition-colors"
                >
                  <p className="font-bold text-slate-900">New Quote Request</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Double Jersey 30" 28G request received from Rahim Textile.
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">5 minutes ago</span>
                </Link>
                <Link
                  href="/admin/blog"
                  onClick={() => setShowNotifications(false)}
                  className="block p-2.5 rounded-2xl bg-[#F8F7F4] hover:bg-[#F0EFEB] transition-colors"
                >
                  <p className="font-bold text-slate-900">Draft Post Pending Review</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    "Preventive Maintenance Schedule" has pending Bengali translations.
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">1 hour ago</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
