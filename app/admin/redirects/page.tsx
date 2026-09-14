"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Plus,
  Trash2,
  ExternalLink,
  Search,
  ShieldCheck,
  Globe,
  AlertTriangle,
  CheckCircle2,
  Info,
  Sparkles,
  Link2,
} from "lucide-react";
import { AdminStore } from "@/lib/admin/admin-store";
import { RedirectRule } from "@/lib/types";
import { useToast } from "@/components/admin/ui/toast";
import { Button } from "@/components/admin/ui/button";
import { Badge } from "@/components/admin/ui/badge";

export default function AdminRedirectsPage() {
  const { showToast } = useToast();
  const [redirects, setRedirects] = useState<RedirectRule[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // New Redirect Form
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [reason, setReason] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const loadData = () => {
    setRedirects(AdminStore.getRedirects());
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener("tasneem-store-updated", handleUpdate);
    return () => window.removeEventListener("tasneem-store-updated", handleUpdate);
  }, []);

  const handleAddRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!source.trim() || !destination.trim()) {
      showToast("Source and destination paths are required", "error");
      return;
    }

    let normSource = source.trim();
    if (!normSource.startsWith("/")) {
      normSource = "/" + normSource;
    }

    let normDest = destination.trim();
    if (!normDest.startsWith("/") && !normDest.startsWith("http")) {
      normDest = "/" + normDest;
    }

    AdminStore.addRedirect(normSource, normDest, reason.trim() || "Manual 301 rule");
    showToast(`Redirect added: ${normSource} → ${normDest}`, "success");
    setSource("");
    setDestination("");
    setReason("");
    setIsAdding(false);
    loadData();
  };

  const handleDelete = (rule: RedirectRule) => {
    if (confirm(`Are you sure you want to delete redirect: ${rule.source} → ${rule.destination}?`)) {
      AdminStore.deleteRedirect(rule.id);
      showToast("Redirect rule deleted", "success");
      loadData();
    }
  };

  const filteredRedirects = redirects.filter((r) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      !q ||
      r.source.toLowerCase().includes(q) ||
      r.destination.toLowerCase().includes(q) ||
      (r.reason && r.reason.toLowerCase().includes(q))
    );
  });

  const totalRules = redirects.length;
  const autoRules = redirects.filter((r) => r.reason?.toLowerCase().includes("automatic")).length;
  const legacyRules = redirects.filter((r) => r.reason?.toLowerCase().includes("legacy") || r.reason?.toLowerCase().includes("wordpress")).length;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Banner / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#800020] bg-[#FDF2F4] border border-[#F9E6EA] px-2.5 py-1 rounded-md inline-block">
              SEO & URL Routing
            </span>
            <span className="text-xs text-slate-400 font-medium">HTTP 301 Registry</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            301 Permanent Redirects Manager
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Preserve Google search rankings, prevent 404 broken links, and protect external backlinks.
            When any machine slug is renamed, a 301 redirect is automatically created here.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            onClick={() => setIsAdding(!isAdding)}
            className="gap-2 font-semibold shadow-xs"
          >
            <Plus className="h-4 w-4" />
            <span>{isAdding ? "Cancel" : "Add Custom 301 Rule"}</span>
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">Active 301 Rules</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{totalRules}</p>
            <span className="text-[10px] text-slate-400">Total permanent redirects</span>
          </div>
          <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
            <Link2 className="h-5 w-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">Auto Slug Changes</span>
            <p className="text-2xl font-black text-[#800020] mt-1">{autoRules}</p>
            <span className="text-[10px] text-slate-400">Created on machine rename</span>
          </div>
          <div className="h-10 w-10 rounded-xl bg-[#FDF2F4] border border-[#F9E6EA] flex items-center justify-center text-[#800020]">
            <Sparkles className="h-5 w-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500">Legacy WordPress</span>
            <p className="text-2xl font-black text-blue-600 mt-1">{legacyRules}</p>
            <span className="text-[10px] text-slate-400">Preserved from old domain</span>
          </div>
          <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Globe className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Add Custom Redirect Form Accordion */}
      {isAdding && (
        <form
          onSubmit={handleAddRedirect}
          className="bg-white p-6 rounded-3xl border-2 border-red-100 shadow-md space-y-4 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4 text-[#800020]" />
              <h3 className="text-sm font-bold text-slate-900">Create New 301 Permanent Redirect</h3>
            </div>
            <span className="text-[11px] text-slate-400">HTTP 301 Moved Permanently</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Source URL Path <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="/product/old-machine-name or /old-page"
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#800020]"
                required
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                The original or outdated URL that visitors/bots might request.
              </span>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Destination URL Path <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="/machines/double-jersey/new-slug or /about"
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#800020]"
                required
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                The current active target URL where visitors should land.
              </span>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1 text-xs">
              Reason / Reference Note (Optional)
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g., Marketing campaign shortlink or rebranded product model"
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#800020]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" className="gap-1.5 font-semibold">
              <CheckCircle2 className="h-4 w-4" />
              <span>Save 301 Redirect</span>
            </Button>
          </div>
        </form>
      )}

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search source, destination, or reason..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#800020] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              Clear
            </button>
          )}
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Showing {filteredRedirects.length} of {totalRules} rules
        </div>
      </div>

      {/* Redirects Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        {/* Mobile Swipe Hint */}
        <div className="md:hidden px-3.5 py-1.5 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between border-b border-slate-100">
          <span>← Swipe horizontally to view redirects & actions →</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[680px]">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Source URL</th>
                <th className="p-4 w-8 text-center"></th>
                <th className="p-4">Destination URL</th>
                <th className="p-4">Type & Reason</th>
                <th className="p-4">Date Created</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRedirects.length > 0 ? (
                filteredRedirects.map((r) => {
                  const isAuto = r.reason?.toLowerCase().includes("automatic");
                  const isLegacy = r.reason?.toLowerCase().includes("legacy") || r.reason?.toLowerCase().includes("wordpress");

                  return (
                    <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Source */}
                      <td className="p-4">
                        <span className="font-mono text-xs text-slate-700 bg-slate-50 px-2 py-1 rounded border border-slate-200 block truncate max-w-xs sm:max-w-sm">
                          {r.source}
                        </span>
                      </td>

                      {/* Arrow */}
                      <td className="p-4 text-center">
                        <ArrowRight className="h-4 w-4 text-slate-400 mx-auto" />
                      </td>

                      {/* Destination */}
                      <td className="p-4">
                        <span className="font-mono text-xs text-slate-900 font-semibold bg-emerald-50 text-emerald-800 px-2 py-1 rounded border border-emerald-200 block truncate max-w-xs sm:max-w-sm">
                          {r.destination}
                        </span>
                      </td>

                      {/* Type & Reason */}
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5">
                            <Badge variant={r.permanent ? "secondary" : "warning"} size="sm">
                              {r.permanent ? "301 Permanent" : "302 Temporary"}
                            </Badge>
                            {isAuto && (
                              <Badge variant="brand" size="sm">
                                Auto-Created
                              </Badge>
                            )}
                            {isLegacy && (
                              <Badge variant="outline" size="sm">
                                WordPress SEO
                              </Badge>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-500 line-clamp-1">
                            {r.reason || "Manual rule"}
                          </span>
                        </div>
                      </td>

                      {/* Date Created */}
                      <td className="p-4 whitespace-nowrap text-slate-400 text-[11px]">
                        {r.createdAt || "Pre-seeded"}
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Test Link */}
                          <Link
                            href={r.destination}
                            target="_blank"
                            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
                            title="Open Destination URL in New Tab"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(r)}
                            className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                            title="Delete Redirect Rule"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-slate-400">
                    <Link2 className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-700">No redirect rules found</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {searchQuery
                        ? "Try clearing your search query."
                        : "Redirect rules will appear here as machines are updated or added."}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Technical Guidance Callout */}
      <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-900">
          <Info className="h-4 w-4 text-amber-700" />
          <span>Automatic 301 Redirect Protection — How It Works</span>
        </div>
        <p className="text-amber-800 leading-relaxed">
          Whenever an administrator modifies a machine name or category in the Admin Product Editor,
          a 301 redirect rule is automatically logged from the previous URL path (e.g.{" "}
          <code className="bg-amber-100/80 px-1 py-0.5 rounded font-mono">/machines/double-jersey/old-slug</code>)
          to the new URL path (e.g.{" "}
          <code className="bg-amber-100/80 px-1 py-0.5 rounded font-mono">/machines/double-jersey/new-slug</code>).
          This ensures Google search crawler rankings and customer bookmarked URLs are never broken.
        </p>
      </div>
    </div>
  );
}
