"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  SlidersHorizontal,
  Store,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  ShieldCheck,
  Sparkles,
  Cpu,
  Inbox,
  Link2,
  Images,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
  isExternal?: boolean;
  badge?: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

interface AdminSidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export function AdminSidebar({ mobileOpen, setMobileOpen }: AdminSidebarProps) {
  const pathname = usePathname();

  const navGroups: NavGroup[] = [
    {
      label: "MAIN MENU",
      items: [
        {
          name: "Dashboard",
          href: "/admin",
          icon: LayoutDashboard,
          exact: true,
        },
        {
          name: "Blog Posts",
          href: "/admin/blog",
          icon: FileText,
          badge: "3",
        },
        {
          name: "Projects Gallery",
          href: "/admin/gallery",
          icon: Images,
          badge: "Upload",
        },
        {
          name: "Site Content",
          href: "/admin/site-content",
          icon: SlidersHorizontal,
          badge: "4 Sections",
        },
      ],
    },
    {
      label: "COMMERCE & CATALOG",
      items: [
        {
          name: "Machine Catalog",
          href: "/admin/products",
          icon: Cpu,
          badge: "Catalog",
        },
        {
          name: "Quotes Inbox",
          href: "/admin/quotes",
          icon: Inbox,
          badge: "Leads",
        },
        {
          name: "301 Redirects",
          href: "/admin/redirects",
          icon: Link2,
          badge: "SEO",
        },
        {
          name: "Medusa Engine",
          href: "http://localhost:9000/app",
          icon: Store,
          isExternal: true,
          badge: "Backend",
        },
      ],
    },
    {
      label: "PREVIEW & SYSTEM",
      items: [
        {
          name: "View Live Site",
          href: "/",
          icon: ExternalLink,
          isExternal: true,
        },
      ],
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between p-4 sm:p-5">
      {/* Brand Header */}
      <div>
        <div className="flex items-center justify-between pb-6 pt-1 px-2 border-b border-slate-100">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-[#FF0000] transition-colors duration-200">
              T
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-900 text-base tracking-tight leading-none">
                Tasneem
              </span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mt-1">
                Admin Portal
              </span>
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            aria-label="Close sidebar menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav Sections */}
        <nav className="mt-6 space-y-6">
          {navGroups.map((group) => (
            <div key={group.label} className="space-y-1.5">
              <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.exact
                    ? pathname === item.href
                    : item.isExternal
                    ? false
                    : pathname.startsWith(item.href);

                  if (item.isExternal) {
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 group cursor-pointer",
                          "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                        )}
                        title="Opens Medusa Admin catalog, quotes, and customer accounts in a new window"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4 text-slate-400 group-hover:text-slate-700 transition-colors" />
                          <span>{item.name}</span>
                        </div>
                        {item.badge ? (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60 group-hover:border-slate-300">
                            {item.badge} ↗
                          </span>
                        ) : (
                          <ChevronRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-500" />
                        )}
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer",
                        isActive
                          ? "bg-[#FF0000] text-white shadow-xs font-semibold"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={cn(
                            "h-4 w-4 transition-colors",
                            isActive ? "text-white" : "text-slate-400 group-hover:text-slate-700"
                          )}
                        />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={cn(
                            "text-[10px] font-semibold px-2 py-0.5 rounded-md",
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-slate-100 text-slate-600 border border-slate-200/60"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Card - DealDeck Style Medusa Engine status */}
      <div className="mt-8 pt-4 border-t border-slate-100">
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-4 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-white/10 flex items-center justify-center text-amber-400">
                <Store className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold text-white">Medusa Admin</span>
            </div>
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" title="Connected" />
          </div>
          <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
            Machine catalog, quote inbox, and orders are managed directly in Medusa.
          </p>
          <a
            href="http://localhost:9000/app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block w-full text-center py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors duration-150"
          >
            Launch Medusa ↗
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Left Sidebar */}
      <aside className="hidden lg:flex w-64 xl:w-72 flex-col fixed inset-y-0 left-0 bg-white border-r border-slate-200/80 z-30 shadow-[2px_0_12px_rgba(0,0,0,0.02)]">
        {sidebarContent}
      </aside>

      {/* Mobile / Tablet Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-white shadow-2xl z-50 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
