"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MoreHorizontal,
  ExternalLink,
  MessageSquare,
  ThumbsUp,
  FileText,
  Eye,
  TrendingDown,
  TrendingUp,
  Cpu,
  Inbox,
  Sparkles,
  Share2,
} from "lucide-react";
import { AdminStore } from "@/lib/admin/admin-store";
import { BlogPost } from "@/lib/admin/types";
import { Machine, QuoteRecord, CustomerUser } from "@/lib/types";
import { cn } from "@/lib/utils";

// 3D Clay-style Plus/Cross SVG badge in center of Donut Ring
function Clay3DCross() {
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#800020] to-[#9B1138] flex items-center justify-center shadow-[0_4px_12px_rgba(128,0,32,0.45)] ring-2 ring-white select-none">
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-white drop-shadow-xs" fill="currentColor">
        <path
          d="M12 4C12.8284 4 13.5 4.67157 13.5 5.5V10.5H18.5C19.3284 10.5 20 11.1716 20 12C20 12.8284 19.3284 13.5 18.5 13.5H13.5V18.5C13.5 19.3284 12.8284 20 12 20C11.1716 20 10.5 19.3284 10.5 18.5V13.5H5.5C4.67157 13.5 4 12.8284 4 12C4 11.1716 4.67157 10.5 5.5 10.5H10.5V5.5C10.5 4.67157 11.1716 4 12 4Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"post" | "user">("post");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [quotes, setQuotes] = useState<QuoteRecord[]>([]);
  const [customers, setCustomers] = useState<CustomerUser[]>([]);
  const [pendingCustomers, setPendingCustomers] = useState<CustomerUser[]>([]);

  useEffect(() => {
    const load = () => {
      setPosts(AdminStore.getBlogPosts());
      setMachines(AdminStore.getMachines(true));
      setQuotes(AdminStore.getQuotes());
      setCustomers(AdminStore.getCustomers());
      setPendingCustomers(AdminStore.getPendingCustomers());
    };
    load();
    window.addEventListener("tasneem-store-updated", load);
    return () => window.removeEventListener("tasneem-store-updated", load);
  }, []);

  // Post activity items matching reference image
  const postActivityItems = [
    {
      id: "1",
      title: "What is the value for your company",
      subtitle: "Post number 2",
      category: "Company",
      views: "7.k",
      change: "-4%",
      isPositive: false,
      thumbBg: "bg-amber-100 text-amber-800",
      avatarLetter: "🏢",
      link: "/admin/blog",
    },
    {
      id: "2",
      title: "How to sell stuff?",
      subtitle: "Post Number 1",
      category: "Blog",
      views: "3.k",
      change: "+5%",
      isPositive: true,
      thumbBg: "bg-rose-100 text-rose-800",
      avatarLetter: "📈",
      link: "/admin/blog",
    },
    {
      id: "3",
      title: "New Product Circular Knit DX-30",
      subtitle: "Post Number 3",
      category: "Product",
      views: "2.k",
      change: "+6%",
      isPositive: true,
      thumbBg: "bg-emerald-100 text-emerald-800",
      avatarLetter: "⚙️",
      link: "/admin/products",
    },
    {
      id: "4",
      title: "What do you do today?",
      subtitle: "Post Number 4",
      category: "Persona",
      views: "1.k",
      change: "+8%",
      isPositive: true,
      thumbBg: "bg-orange-100 text-orange-800",
      avatarLetter: "🧵",
      link: "/admin/blog",
    },
  ];

  // Real Customer / Buyer registration items
  const userActivityItems = customers.slice(0, 6).map((c) => ({
    id: c.id,
    title: c.company || c.companyName || c.name,
    subtitle: `${c.name} • ${c.email}`,
    category: c.status === "pending" ? "Pending Approval" : "Verified Buyer",
    views: c.status === "pending" ? "NEW" : "VERIFIED",
    change: c.status === "pending" ? "Review" : "Active",
    isPositive: c.status === "approved",
    thumbBg:
      c.status === "pending"
        ? "bg-amber-100 text-amber-800"
        : "bg-emerald-100 text-emerald-800",
    avatarLetter: (c.company || c.name || "B").charAt(0).toUpperCase(),
    link: "/admin/users",
  }));

  // Fallback quote inquiries matching user tab
  const quoteActivityItems = [
    {
      id: "q1",
      title: "Rahim Textile Ltd - Double Jersey 34\"",
      subtitle: "Quote #1042 • Dhaka",
      category: "Lead",
      views: "5.k",
      change: "+12%",
      isPositive: true,
      thumbBg: "bg-blue-100 text-blue-800",
      avatarLetter: "🏭",
      link: "/admin/quotes",
    },
    {
      id: "q2",
      title: "Ha-Meem Group - Single Jersey 30\"",
      subtitle: "Quote #1041 • Gazipur",
      category: "Verified",
      views: "8.k",
      change: "+18%",
      isPositive: true,
      thumbBg: "bg-purple-100 text-purple-800",
      avatarLetter: "📦",
      link: "/admin/quotes",
    },
  ];

  const currentActivityList =
    activeTab === "post"
      ? postActivityItems
      : userActivityItems.length > 0
      ? userActivityItems
      : quoteActivityItems;

  const pendingCount = pendingCustomers.length;
  const totalUsers = customers.length || 1;
  const approvedCount = customers.filter((c) => c.status === "approved").length;
  const pendingPct = Math.round((pendingCount / totalUsers) * 100);
  const approvedPct = 100 - pendingPct;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 select-none">
      {/* ========================================================================= */}
      {/* LEFT COLUMN: Hero Cards (Gradient & Donut) + Tabbed Activity Table (7-8 cols) */}
      {/* ========================================================================= */}
      <div className="lg:col-span-7 xl:col-span-8 space-y-6 sm:space-y-7">
        {/* Row 1: Two Hero Stat Cards Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Card 1: Coral-to-Pink Hero Card ("Total Likes" / "23.0000K") */}
          <div className="relative rounded-[30px] bg-gradient-to-br from-[#800020] via-[#6B001B] to-[#5A0017] p-6 sm:p-7 text-white shadow-xl shadow-[#800020]/20 overflow-hidden flex flex-col justify-between min-h-[260px]">
            {/* Top Header */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white/85 tracking-wide">
                  Total Likes
                </span>
                <button
                  type="button"
                  className="text-white/80 hover:text-white transition-colors cursor-pointer"
                  aria-label="Options"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Big Metric */}
              <div className="mt-2.5">
                <h3 className="text-3xl sm:text-[38px] font-black tracking-tight leading-none">
                  23.0000K
                </h3>
              </div>
            </div>

            {/* Graphic: 3 Multi-Color Translucent Wavy Curves (Pixel-perfect match with reference) */}
            <div className="relative w-full h-14 my-2 overflow-hidden pointer-events-none">
              <svg
                viewBox="0 0 320 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full preserve-3d"
              >
                {/* Yellow / Golden Wave Curve */}
                <path
                  d="M0 38 C 50 18, 100 52, 160 32 C 220 12, 270 42, 320 22"
                  stroke="#D8A4AF"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeOpacity="0.85"
                />
                {/* Magenta / Pink Wave Curve */}
                <path
                  d="M0 24 C 60 48, 120 14, 180 40 C 240 55, 280 20, 320 36"
                  stroke="#FDF2F4"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeOpacity="0.9"
                />
                {/* Cyan / Ice Wave Curve */}
                <path
                  d="M0 32 C 45 42, 90 20, 150 28 C 210 38, 260 16, 320 30"
                  stroke="#79ECFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeOpacity="0.8"
                />
              </svg>
            </div>

            {/* Bottom Breakdown Row: Female, Male, Other (Separated by subtle vertical dividers) */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/20 text-left">
              <div>
                <span className="text-[11px] font-medium text-white/75 block">Female</span>
                <span className="text-lg font-black tracking-tight text-white mt-0.5 block">
                  %20
                </span>
              </div>
              <div className="border-l border-white/20 pl-3">
                <span className="text-[11px] font-medium text-white/75 block">Male</span>
                <span className="text-lg font-black tracking-tight text-white mt-0.5 block">
                  %50
                </span>
              </div>
              <div className="border-l border-white/20 pl-3">
                <span className="text-[11px] font-medium text-white/75 block">Other</span>
                <span className="text-lg font-black tracking-tight text-white mt-0.5 block">
                  %30
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Buyer Registrations & Pending Approvals Donut Card */}
          <div className="rounded-[30px] bg-white p-6 sm:p-7 shadow-xs border border-slate-200/60 flex flex-col justify-between min-h-[260px] relative">
            {/* Top Header */}
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800 tracking-wide">
                    Buyer Approvals
                  </span>
                  {pendingCount > 0 && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 border border-amber-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      {pendingCount} Pending
                    </span>
                  )}
                </div>
                <Link
                  href="/admin/users"
                  className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  aria-label="Manage Users"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>

              {/* Big Metric */}
              <div className="mt-2.5 flex items-baseline gap-2">
                <h3 className="text-3xl sm:text-[38px] font-black text-slate-900 tracking-tight leading-none">
                  {pendingCount > 0 ? `${pendingCount}` : `${totalUsers}`}
                </h3>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {pendingCount > 0 ? "Requests Waiting" : "Total Buyers"}
                </span>
              </div>
            </div>

            {/* Donut Chart & Legend Composition */}
            <div className="flex items-center justify-between pt-2">
              {/* Left Legend Indicators */}
              <div className="space-y-3 text-left">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#800020]" />
                    <span className="text-xs font-medium text-slate-400">Pending</span>
                  </div>
                  <span className="text-base font-black text-slate-900 pl-4 block mt-0.5">
                    %{pendingPct}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                    <span className="text-xs font-medium text-slate-400">Approved</span>
                  </div>
                  <span className="text-base font-black text-slate-900 pl-4 block mt-0.5">
                    %{approvedPct}
                  </span>
                </div>
              </div>

              {/* Right Donut Segment Ring with Center 3D Clay Cross Badge */}
              <Link
                href="/admin/users"
                className="relative w-28 h-28 flex items-center justify-center select-none cursor-pointer group"
                title="Open Buyer Accounts & Approval Requests"
              >
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  {/* Background Track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#F1F5F9"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  {/* Approved Segment (Emerald) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#10B981"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray="238.7"
                    strokeDashoffset={238.7 * (1 - approvedPct / 100)}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                  {/* Pending Segment (Coral/Amber) */}
                  {pendingPct > 0 && (
                    <circle
                      cx="50"
                      cy="50"
                      r="38"
                      stroke="#800020"
                      strokeWidth="10"
                      fill="transparent"
                      strokeDasharray={238.7}
                      strokeDashoffset={238.7 * (1 - pendingPct / 100)}
                      strokeLinecap="round"
                      className="transition-all duration-500"
                    />
                  )}
                </svg>

                {/* Center 3D Clay Plus Badge (Signature element in reference) */}
                <div className="absolute inset-0 flex items-center justify-center transition-transform group-hover:scale-110">
                  <Clay3DCross />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Row 2: Tabbed Table / Activity Feed ("Post Activity" vs "User") */}
        <div className="rounded-[30px] bg-transparent pt-2">
          {/* Tabs Navigation Header */}
          <div className="flex items-center gap-8 border-b border-slate-200/60 pb-3">
            <button
              type="button"
              onClick={() => setActiveTab("post")}
              className={cn(
                "text-sm font-bold pb-2 relative transition-colors cursor-pointer",
                activeTab === "post" ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
              )}
            >
              Post Activity
              {/* Active Thick Black Indicator Pill (Pixel-perfect match) */}
              {activeTab === "post" && (
                <span className="absolute bottom-[-13px] left-0 right-0 h-[3px] bg-slate-900 rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("user")}
              className={cn(
                "text-sm font-bold pb-2 relative transition-colors cursor-pointer",
                activeTab === "user" ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
              )}
            >
              User
              {activeTab === "user" && (
                <span className="absolute bottom-[-13px] left-0 right-0 h-[3px] bg-slate-900 rounded-full" />
              )}
            </button>
          </div>

          {/* Activity Table Rows */}
          <div className="mt-4 space-y-3">
            {currentActivityList.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-white/70 hover:bg-white border border-slate-200/40 hover:border-slate-300/80 transition-all duration-150 shadow-2xs group"
              >
                {/* Left: Thumbnail & Titles */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={cn(
                      "w-11 h-11 rounded-2xl flex items-center justify-center text-lg font-bold shrink-0 shadow-2xs",
                      item.thumbBg
                    )}
                  >
                    {item.avatarLetter}
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={item.link}
                      className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#800020] transition-colors truncate"
                    >
                      <span className="truncate">{item.title}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#800020] shrink-0" />
                    </Link>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5 truncate">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                {/* Middle & Right: Category, Counter, Growth Badge & Action */}
                <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                  {/* Category */}
                  <span className="text-xs font-semibold text-slate-600 hidden sm:inline-block">
                    {item.category}
                  </span>

                  {/* View Metric with circular icon */}
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">
                      @
                    </div>
                    <span>{item.views}</span>
                  </div>

                  {/* Growth Pill Badge */}
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1",
                      item.isPositive
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-200/60"
                        : "bg-rose-50 text-rose-600 border border-rose-200/60"
                    )}
                  >
                    {item.change}
                  </span>

                  {/* Actions ... */}
                  <button
                    type="button"
                    className="p-1 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                    aria-label="More"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT COLUMN: 3.k Comments Pill + Weekly Post Stats + 10.k Blush Card (4-5 cols) */}
      {/* ========================================================================= */}
      <div className="lg:col-span-5 xl:col-span-4 space-y-5 sm:space-y-6">
        {/* Card 1: 3.k Comments Pill Card */}
        <div className="rounded-[28px] bg-white p-5 sm:p-6 shadow-xs border border-slate-200/60 flex items-center justify-between">
          {/* Left: 3.k and Chat Icon */}
          <div className="space-y-1">
            <h4 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
              3.k
            </h4>
            <div className="flex items-center gap-1 text-slate-700 pt-1">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>

          {/* Right: Label & Coral Rounded Progress Bar */}
          <div className="space-y-2 text-right">
            <span className="text-xs font-bold text-slate-900 block">Comments</span>
            <div className="w-28 sm:w-36 h-3 rounded-full bg-slate-100 overflow-hidden p-0.5">
              <div className="h-full rounded-full bg-gradient-to-r from-[#800020] to-[#5A0017] w-2/5" />
            </div>
          </div>
        </div>

        {/* Card 2: Post Stats Bar Chart Card (With Friday Highlight & Glowing Star) */}
        <div className="rounded-[30px] bg-white p-6 shadow-xs border border-slate-200/60 flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-900 tracking-tight">
              Post Stats
            </span>
            <button
              type="button"
              className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              aria-label="Options"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Weekly Bar Chart with Overlaid Wavy Spline Curves */}
          <div className="relative my-6 px-1">
            {/* Chart SVG Wave Curves Overlaid (Pixel-perfect recreation) */}
            <svg
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-24 pointer-events-none z-10"
              viewBox="0 0 280 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Charcoal Smooth Line */}
              <path
                d="M 10 50 C 40 45, 80 55, 120 45 C 160 38, 200 60, 270 48"
                stroke="#474A54"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Magenta Smooth Line */}
              <path
                d="M 10 60 C 50 62, 90 40, 140 50 C 180 58, 220 35, 270 55"
                stroke="#800020"
                strokeWidth="2"
                strokeLinecap="round"
                strokeOpacity="0.85"
              />
            </svg>

            {/* Days Bar Columns: M T W T F S S */}
            <div className="flex items-end justify-between h-40 pt-4 pb-6 px-2">
              {/* Monday */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-3 bg-slate-200 rounded-full h-16" />
                <span className="text-[11px] font-bold text-slate-400">M</span>
              </div>

              {/* Tuesday */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-3 bg-slate-200 rounded-full h-24" />
                <span className="text-[11px] font-bold text-slate-400">T</span>
              </div>

              {/* Wednesday */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-3 bg-slate-200 rounded-full h-20" />
                <span className="text-[11px] font-bold text-slate-400">W</span>
              </div>

              {/* Thursday */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-3 bg-slate-200 rounded-full h-28" />
                <span className="text-[11px] font-bold text-slate-400">T</span>
              </div>

              {/* Friday (Special Highlighted Bar with Star on top) */}
              <div className="flex flex-col items-center gap-2 relative">
                {/* Glowing Star on Top of Friday */}
                <div className="w-4 h-4 rounded-full bg-[#800020] text-white flex items-center justify-center text-[9px] shadow-sm mb-0.5">
                  ★
                </div>
                <div className="w-3.5 bg-[#800020] rounded-full h-32 shadow-sm" />
                <span className="text-[11px] font-black text-[#800020]">F</span>
              </div>

              {/* Saturday */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-3 bg-slate-200 rounded-full h-22" />
                <span className="text-[11px] font-bold text-slate-400">S</span>
              </div>

              {/* Sunday */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-3 bg-slate-200 rounded-full h-26" />
                <span className="text-[11px] font-bold text-slate-400">S</span>
              </div>
            </div>
          </div>

          {/* Bottom Sub-card: "Completed Posts / 874" */}
          <div className="p-3.5 rounded-2xl bg-[#FBF9F6] border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FDF2F4] text-[#800020] flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Completed Posts</p>
                <p className="text-[10px] text-slate-400 font-medium">Current Week</p>
              </div>
            </div>
            <span className="text-lg font-black text-slate-900">874</span>
          </div>
        </div>

        {/* Card 3: Blush Pink "10.k Links Shared" Card */}
        <div className="rounded-[28px] bg-[#F9E6EA] p-5 sm:p-6 shadow-xs border border-[#D8A4AF]/60 flex items-center justify-between">
          {/* Left: 10.k and Thumbs Up Icon */}
          <div className="space-y-1">
            <h4 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
              10.k
            </h4>
            <div className="flex items-center gap-1 text-slate-800 pt-1">
              <ThumbsUp className="w-4 h-4" />
            </div>
          </div>

          {/* Right: Label & Dark Progress Bar */}
          <div className="space-y-2 text-right">
            <span className="text-xs font-bold text-slate-900 block">Links Shared</span>
            <div className="w-28 sm:w-36 h-3 rounded-full bg-white/70 overflow-hidden p-0.5">
              <div className="h-full rounded-full bg-[#111217] w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
