"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Bell,
  Search,
  LogOut,
  Menu,
  Languages,
  Check,
  Globe,
  User,
  ExternalLink,
} from "lucide-react";
import { useAdminAuth } from "@/lib/admin/auth-context";
import { ContentLocale } from "@/lib/admin/types";
import { cn } from "@/lib/utils";

interface AdminTopBarProps {
  onToggleMobileSidebar: () => void;
}

export function AdminTopBar({ onToggleMobileSidebar }: AdminTopBarProps) {
  const pathname = usePathname();
  const { user, logout, contentLocale, setContentLocale } = useAdminAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Dynamic Section Title & Subtitle based on route
  const getSectionMetadata = () => {
    if (pathname === "/admin") {
      return {
        title: "Overview Dashboard",
        subtitle: "Operations summary and content status",
      };
    }
    if (pathname.startsWith("/admin/blog/new")) {
      return {
        title: "Create Blog Post",
        subtitle: "Draft and publish new circular knitting technical guides",
      };
    }
    if (pathname.startsWith("/admin/blog/")) {
      return {
        title: "Edit Blog Post",
        subtitle: "Manage paired English and Bengali content",
      };
    }
    if (pathname.startsWith("/admin/blog")) {
      return {
        title: "Blog Management",
        subtitle: "Articles, technical guides, and SEO publication status",
      };
    }
    if (pathname.startsWith("/admin/site-content")) {
      return {
        title: "Site Content Editor",
        subtitle: "Sectioned configuration for Why Tasneem, FAQs, and Company info",
      };
    }
    return {
      title: "Admin Portal",
      subtitle: "Tasneem Knit Industry",
    };
  };

  const { title, subtitle } = getSectionMetadata();

  // Today's formatted date
  const todayFormatted = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <header className="sticky top-0 z-20 bg-[#F4F5F9]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 border-b border-slate-200/60 flex items-center justify-between transition-all">
      {/* Left Title & Mobile Hamburger */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50 shadow-2xs"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {title}
          </h1>
          <p className="text-xs text-slate-500 hidden sm:block">
            {todayFormatted} • <span className="text-slate-400">{subtitle}</span>
          </p>
        </div>
      </div>

      {/* Right Controls: Content Language Switcher, Notifications, Staff User */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Content Language Toggle [EN] / [BN] per Section 1 */}
        <div
          className="flex items-center bg-white border border-slate-200/80 rounded-xl p-0.5 shadow-2xs"
          title="Switches active content language editing fields"
        >
          <div className="px-2 py-1 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 border-r border-slate-100 hidden md:flex">
            <Languages className="h-3.5 w-3.5 text-slate-400" />
            <span>Content Mode:</span>
          </div>
          <button
            type="button"
            onClick={() => setContentLocale("en")}
            className={cn(
              "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer",
              contentLocale === "en"
                ? "bg-slate-900 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            )}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setContentLocale("bn")}
            className={cn(
              "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer",
              contentLocale === "bn"
                ? "bg-[#FF0000] text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            )}
          >
            বাংলা (BN)
          </button>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="h-9 w-9 rounded-xl bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center justify-center transition-colors relative shadow-2xs cursor-pointer"
            aria-label="Staff Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#FF0000] ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white p-4 shadow-xl border border-slate-200/80 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Notifications & Alerts
                </span>
                <span className="text-[10px] font-semibold text-[#FF0000] bg-red-50 px-2 py-0.5 rounded-full">
                  2 New
                </span>
              </div>
              <div className="mt-3 space-y-2.5 text-xs">
                <a
                  href="http://localhost:9000/app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100"
                >
                  <p className="font-semibold text-slate-900">
                    New Machine Quote Request
                  </p>
                  <p className="text-slate-500 mt-0.5">
                    Double Jersey 30" 28G request received in Medusa Inbox.
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    10 minutes ago • Click to open Medusa ↗
                  </span>
                </a>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="font-semibold text-slate-900">
                    Draft Post Pending Review
                  </p>
                  <p className="text-slate-500 mt-0.5">
                    "Preventive Maintenance Schedule" has pending Bengali translations.
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    1 hour ago
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Staff Profile / User Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 pl-1.5 pr-2.5 py-1 rounded-xl bg-white border border-slate-200/80 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-slate-900 to-slate-700 text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
              {user?.name ? user.name.charAt(0) : "A"}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-tight">
                {user?.name || "Admin Staff"}
              </span>
              <span className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">
                {user?.role || "Content Admin"}
              </span>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-2 shadow-xl border border-slate-200/80 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{user?.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                <span className="inline-block mt-1 text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                  Staff Role: {user?.role}
                </span>
              </div>
              <div className="mt-1">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                  <span>View Public Website</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
