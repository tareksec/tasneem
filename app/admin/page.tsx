"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  FileCheck2,
  FileEdit,
  Store,
  ArrowUpRight,
  Plus,
  Layers,
  HelpCircle,
  Building2,
  Clock,
  ExternalLink,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Cpu,
  Inbox,
  Link2,
  MessageSquare,
} from "lucide-react";
import { AdminStore } from "@/lib/admin/admin-store";
import { BlogPost, ActivityLog } from "@/lib/admin/types";
import { Machine, QuoteRecord, RedirectRule } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/admin/ui/card";
import { Button } from "@/components/admin/ui/button";
import { Badge } from "@/components/admin/ui/badge";

export default function AdminDashboardPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [quotes, setQuotes] = useState<QuoteRecord[]>([]);
  const [redirects, setRedirects] = useState<RedirectRule[]>([]);
  const [activities, setActivities] = useState<ActivityLog[]>([]);

  const loadData = () => {
    setPosts(AdminStore.getBlogPosts());
    setMachines(AdminStore.getMachines(true));
    setQuotes(AdminStore.getQuotes());
    setRedirects(AdminStore.getRedirects());
    setActivities(AdminStore.getActivityLogs());
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener("tasneem-store-updated", handleUpdate);
    return () => window.removeEventListener("tasneem-store-updated", handleUpdate);
  }, []);

  // Post metrics
  const publishedPostCount = posts.filter((p) => p.status === "published").length;
  const draftPostCount = posts.filter((p) => p.status === "draft").length;

  // Machine metrics
  const publishedMachineCount = machines.filter((m) => (m.status || "published") === "published").length;
  const draftMachineCount = machines.filter((m) => m.status === "draft").length;

  // Quote metrics
  const newQuotesCount = quotes.filter((q) => q.status === "new").length;
  const inProgressQuotesCount = quotes.filter((q) => q.status === "contacted" || q.status === "quoted").length;

  const statCards = [
    {
      title: "Machine Catalog",
      value: machines.length.toString(),
      subtext: `${publishedMachineCount} live • ${draftMachineCount} drafts`,
      badge: "Catalog active",
      badgeVariant: "brand" as const,
      icon: Cpu,
      iconBg: "bg-red-50 text-[#FF0000] border border-red-100",
      link: "/admin/products",
    },
    {
      title: "Quote Requests",
      value: quotes.length.toString(),
      subtext: `${newQuotesCount} new unreviewed leads`,
      badge: newQuotesCount > 0 ? `${newQuotesCount} New` : "Up to date",
      badgeVariant: newQuotesCount > 0 ? ("warning" as const) : ("success" as const),
      icon: MessageSquare,
      iconBg: "bg-amber-50 text-amber-600 border border-amber-100",
      link: "/admin/quotes",
    },
    {
      title: "Technical Articles",
      value: publishedPostCount.toString(),
      subtext: `${draftPostCount} drafts awaiting review`,
      badge: "Bilingual",
      badgeVariant: "secondary" as const,
      icon: FileCheck2,
      iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
      link: "/admin/blog",
    },
    {
      title: "301 Redirect Rules",
      value: redirects.length.toString(),
      subtext: "Active SEO & legacy rankings",
      badge: "Protected",
      badgeVariant: "secondary" as const,
      icon: Link2,
      iconBg: "bg-blue-50 text-blue-600 border border-blue-100",
      link: "/admin/redirects",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Banner / Welcome Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF0000] bg-red-50 px-2.5 py-1 rounded-md inline-block mb-1.5">
            Operational Management Portal
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Welcome back, Admin Staff
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Control the circular knitting machinery catalog, review and update customer quote requests,
            publish bilingual technical articles, and manage automatic 301 URL redirects.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Link href="/admin/products/new">
            <Button size="md" className="gap-2 shadow-sm font-semibold">
              <Plus className="h-4 w-4" />
              <span>Add New Machine</span>
            </Button>
          </Link>
          <Link href="/admin/quotes">
            <Button variant="outline" size="md" className="gap-2">
              <Inbox className="h-4 w-4 text-slate-500" />
              <span>View Quotes ({newQuotesCount})</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} href={stat.link}>
              <Card className="hover:border-slate-300 hover:shadow-md transition-all duration-200 cursor-pointer h-full flex flex-col justify-between p-5 rounded-2xl">
                <div>
                  <div className="flex items-center justify-between">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${stat.iconBg}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant={stat.badgeVariant} size="sm">
                      {stat.badge}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-slate-500">{stat.title}</p>
                    <p className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                      {stat.value}
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{stat.subtext}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* 2-Column Section: Quick Actions & Recent Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left 2 Cols: Content Overview & Quick Navigation */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions Shortcuts */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base">Operational Quick Actions</CardTitle>
              <CardDescription>
                Direct access to core catalog maintenance, commercial responses, and editorial tools.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href="/admin/products/new"
                  className="flex flex-col p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-colors group"
                >
                  <div className="h-8 w-8 rounded-lg bg-red-50 text-[#FF0000] flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                    <Cpu className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-900">Add New Machine</span>
                  <span className="text-xs text-slate-500 mt-0.5">
                    Specs, bilingual EN/BN text, and image gallery
                  </span>
                </Link>

                <Link
                  href="/admin/quotes"
                  className="flex flex-col p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-colors group"
                >
                  <div className="h-8 w-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-900">Review Quotes Inbox</span>
                  <span className="text-xs text-slate-500 mt-0.5">
                    Manage buyer leads and WhatsApp follow-ups
                  </span>
                </Link>

                <Link
                  href="/admin/blog/new"
                  className="flex flex-col p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-colors group"
                >
                  <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                    <Plus className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-900">Publish Technical Post</span>
                  <span className="text-xs text-slate-500 mt-0.5">
                    Create new circular knitting technical guide
                  </span>
                </Link>

                <Link
                  href="/admin/redirects"
                  className="flex flex-col p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-colors group"
                >
                  <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                    <Link2 className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-900">301 Redirect Registry</span>
                  <span className="text-xs text-slate-500 mt-0.5">
                    Preserve SEO equity on renamed machine URLs
                  </span>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Architecture Callout */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Store className="h-4 w-4 text-slate-700" />
                <h4 className="text-sm font-bold text-slate-900">
                  Dual Operational Architecture (Next.js Native & Medusa)
                </h4>
              </div>
              <p className="text-xs text-slate-500 max-w-xl">
                The built-in Next.js portal provides immediate, ultra-responsive catalog management tailored to knitting machinery specs and Hostinger shared hosting limits. An external Medusa engine can also be connected if required.
              </p>
            </div>
            <a
              href="http://localhost:9000/app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shrink-0 shadow-xs"
            >
              <span>Launch Medusa</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Right 1 Col: Recent Operational Activity */}
        <div>
          <Card className="rounded-2xl h-full flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span>Recent Activity</span>
                </CardTitle>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                  Audit Log
                </span>
              </div>
              <CardDescription>Recent changes across catalog, quotes & content</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-3.5">
                {activities.slice(0, 6).map((act) => (
                  <div
                    key={act.id}
                    className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 text-xs flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-slate-800 truncate">{act.title}</span>
                      <Badge
                        variant={
                          act.action === "publish" || act.action === "create"
                            ? "success"
                            : act.action === "delete"
                            ? "destructive"
                            : "secondary"
                        }
                        size="sm"
                        className="text-[10px] uppercase"
                      >
                        {act.action}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                      <span className="capitalize">{act.entity} • {act.author}</span>
                      <span>
                        {new Date(act.timestamp).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
