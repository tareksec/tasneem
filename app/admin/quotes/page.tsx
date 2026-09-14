"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  MessageSquare,
  Building2,
  User,
  Mail,
  Phone,
  Calendar,
  Layers,
  ArrowUpRight,
  Send,
  Trash2,
  Eye,
  ExternalLink,
  ChevronDown,
  AlertCircle,
  Save,
  X,
  Sparkles,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";
import { AdminStore } from "@/lib/admin/admin-store";
import { QuoteRecord, QuoteStatus } from "@/lib/types";
import { COMPANY_INFO } from "@/lib/constants";
import { useToast } from "@/components/admin/ui/toast";
import { Button } from "@/components/admin/ui/button";
import { Badge } from "@/components/admin/ui/badge";

const STATUS_CONFIG: Record<
  QuoteStatus,
  { label: string; bg: string; text: string; border: string; desc: string; badgeVariant: "destructive" | "warning" | "secondary" | "success" }
> = {
  new: {
    label: "New Inquiry",
    bg: "bg-[#FDF2F4]",
    text: "text-[#800020]",
    border: "border-[#D8A4AF]",
    desc: "Unreviewed quote submission",
    badgeVariant: "destructive",
  },
  contacted: {
    label: "Contacted",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    desc: "Initial outreach or specs clarification in progress",
    badgeVariant: "warning",
  },
  quoted: {
    label: "Quoted",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    desc: "Formal commercial proforma / CFR quote sent",
    badgeVariant: "secondary",
  },
  closed: {
    label: "Closed",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    desc: "Deal finalized, LC issued, or inquiry resolved",
    badgeVariant: "success",
  },
};

// Safe accessors for QuoteRecord
const getQuotePhone = (q: QuoteRecord) => q.phoneOrWhatsApp || q.phone || "";
const getQuoteContact = (q: QuoteRecord) => q.name || q.contactName || "";
const getQuoteMachine = (q: QuoteRecord) => q.machineType || q.machineName || "";
const getQuoteDate = (q: QuoteRecord) => q.submittedAt || q.createdAt || new Date().toISOString();
const getQuoteTimeline = (q: QuoteRecord) => q.deliveryRequirement || q.timeline || "Standard CFR";

export default function AdminQuotesPage() {
  const { showToast } = useToast();
  const [quotes, setQuotes] = useState<QuoteRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedQuote, setSelectedQuote] = useState<QuoteRecord | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  const loadQuotes = () => {
    fetch("/api/admin/quotes")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.quotes)) {
          setQuotes(data.quotes);
        } else {
          setQuotes(AdminStore.getQuotes());
        }
      })
      .catch(() => {
        setQuotes(AdminStore.getQuotes());
      });
  };

  useEffect(() => {
    loadQuotes();
    const handleUpdate = () => loadQuotes();
    window.addEventListener("tasneem-store-updated", handleUpdate);
    return () => window.removeEventListener("tasneem-store-updated", handleUpdate);
  }, []);

  const handleStatusChange = async (id: string, newStatus: QuoteStatus) => {
    try {
      await fetch("/api/admin/quotes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
    } catch (e) {
      console.warn("Could not patch quote:", e);
    }
    AdminStore.updateQuoteStatus(id, newStatus);
    showToast(`Inquiry [${id}] status changed to ${newStatus}`, "success");
    loadQuotes();
    if (selectedQuote && selectedQuote.id === id) {
      setSelectedQuote((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleDelete = async (quote: QuoteRecord) => {
    if (confirm(`Are you sure you want to delete inquiry "${quote.id}" from ${quote.company}?`)) {
      try {
        await fetch(`/api/admin/quotes?id=${encodeURIComponent(quote.id)}`, {
          method: "DELETE",
        });
      } catch (e) {
        console.warn("Could not delete quote:", e);
      }
      AdminStore.deleteQuote(quote.id);
      showToast(`Inquiry [${quote.id}] deleted`, "success");
      if (selectedQuote?.id === quote.id) {
        setSelectedQuote(null);
      }
      loadQuotes();
    }
  };

  const handleOpenDetail = (quote: QuoteRecord) => {
    setSelectedQuote(quote);
    setEditNotes(quote.adminNotes || "");
  };

  const handleSaveNotes = async () => {
    if (!selectedQuote) return;
    setIsSavingNotes(true);
    try {
      await fetch("/api/admin/quotes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedQuote.id, adminNotes: editNotes }),
      });
    } catch (e) {
      console.warn("Could not save notes to API:", e);
    }
    AdminStore.updateQuoteStatus(selectedQuote.id, selectedQuote.status, editNotes);
    setSelectedQuote((prev) => (prev ? { ...prev, adminNotes: editNotes } : null));
    setIsSavingNotes(false);
    showToast("Internal staff notes saved", "success");
    loadQuotes();
  };

  // WhatsApp Deep Link generator
  const getWhatsAppLink = (quote: QuoteRecord) => {
    const rawPhone = getQuotePhone(quote).replace(/[^0-9]/g, "");
    const targetPhone = rawPhone.startsWith("01") ? `88${rawPhone}` : rawPhone;
    const message = encodeURIComponent(
      `Hello ${getQuoteContact(quote)}, thank you for your machinery quote request [${quote.id}] for ${getQuoteMachine(quote)} from Tasneem Knit Industry. We are reviewing your technical specifications and ready to share commercial terms.`
    );
    return `https://wa.me/${targetPhone}?text=${message}`;
  };

  // Filtered list
  const filteredQuotes = quotes.filter((q) => {
    const query = searchQuery.toLowerCase().trim();
    const contact = getQuoteContact(q).toLowerCase();
    const machine = getQuoteMachine(q).toLowerCase();

    const matchesSearch =
      !query ||
      q.id.toLowerCase().includes(query) ||
      contact.includes(query) ||
      q.company.toLowerCase().includes(query) ||
      q.email.toLowerCase().includes(query) ||
      machine.includes(query) ||
      (q.cylinderDiameter && q.cylinderDiameter.toLowerCase().includes(query)) ||
      (q.gauge && q.gauge.toLowerCase().includes(query));

    const matchesStatus = statusFilter === "all" || q.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Metrics
  const totalCount = quotes.length;
  const newCount = quotes.filter((q) => q.status === "new").length;
  const contactedCount = quotes.filter((q) => q.status === "contacted").length;
  const quotedCount = quotes.filter((q) => q.status === "quoted").length;
  const closedCount = quotes.filter((q) => q.status === "closed").length;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Banner / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#800020] bg-[#FDF2F4] border border-[#F9E6EA] px-2.5 py-1 rounded-md inline-block">
              Lead Generation & Sales
            </span>
            <span className="text-xs text-slate-400 font-medium">B2B Quote Inbox</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Quote Inquiries Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Track, review, and follow up on circular knitting machine inquiries. Every submission
            auto-generates a reference ID (`TK-QUOTE-XXXXXX`) and notifies sales.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`https://wa.me/${COMPANY_INFO.phone.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Open Sales WhatsApp</span>
          </a>
        </div>
      </div>

      {/* 4 Pipeline Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div
          onClick={() => setStatusFilter("all")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "all"
              ? "bg-slate-900 text-white border-slate-900 shadow-md"
              : "bg-white text-slate-900 border-slate-200/80 hover:border-slate-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold ${statusFilter === "all" ? "text-slate-300" : "text-slate-500"}`}>
              Total Inquiries
            </span>
            <FileText className={`h-4 w-4 ${statusFilter === "all" ? "text-slate-300" : "text-slate-400"}`} />
          </div>
          <p className="text-2xl sm:text-3xl font-black mt-2">{totalCount}</p>
          <span className={`text-[11px] mt-1 block ${statusFilter === "all" ? "text-slate-400" : "text-slate-400"}`}>
            All received leads
          </span>
        </div>

        <div
          onClick={() => setStatusFilter("new")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "new"
              ? "bg-[#800020] text-white border-[#800020] shadow-md"
              : "bg-white text-slate-900 border-slate-200/80 hover:border-[#D8A4AF]"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold ${statusFilter === "new" ? "text-white/90" : "text-slate-500"}`}>
              New Unreviewed
            </span>
            <span className={`h-2.5 w-2.5 rounded-full ${statusFilter === "new" ? "bg-white" : "bg-[#800020] animate-pulse"}`} />
          </div>
          <p className="text-2xl sm:text-3xl font-black mt-2">{newCount}</p>
          <span className={`text-[11px] mt-1 block ${statusFilter === "new" ? "text-white/80" : "text-[#800020] font-medium"}`}>
            Requires attention
          </span>
        </div>

        <div
          onClick={() => setStatusFilter("contacted")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "contacted"
              ? "bg-amber-600 text-white border-amber-600 shadow-md"
              : "bg-white text-slate-900 border-slate-200/80 hover:border-amber-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold ${statusFilter === "contacted" ? "text-white/90" : "text-slate-500"}`}>
              Contacted
            </span>
            <Clock className={`h-4 w-4 ${statusFilter === "contacted" ? "text-white/80" : "text-amber-500"}`} />
          </div>
          <p className="text-2xl sm:text-3xl font-black mt-2">{contactedCount}</p>
          <span className={`text-[11px] mt-1 block ${statusFilter === "contacted" ? "text-white/80" : "text-slate-400"}`}>
            Specs in discussion
          </span>
        </div>

        <div
          onClick={() => setStatusFilter("quoted")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "quoted"
              ? "bg-blue-600 text-white border-blue-600 shadow-md"
              : "bg-white text-slate-900 border-slate-200/80 hover:border-blue-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold ${statusFilter === "quoted" ? "text-white/90" : "text-slate-500"}`}>
              Quoted / Proforma
            </span>
            <CheckCircle2 className={`h-4 w-4 ${statusFilter === "quoted" ? "text-white/80" : "text-blue-500"}`} />
          </div>
          <p className="text-2xl sm:text-3xl font-black mt-2">{quotedCount}</p>
          <span className={`text-[11px] mt-1 block ${statusFilter === "quoted" ? "text-white/80" : "text-slate-400"}`}>
            Proforma sent ({closedCount} closed)
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, mill name, person, email..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent transition-all"
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

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-slate-400 mr-1 hidden sm:inline">Status:</span>
          {(["all", "new", "contacted", "quoted", "closed"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap capitalize transition-all cursor-pointer ${
                statusFilter === status
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {status === "all" ? "All Statuses" : STATUS_CONFIG[status]?.label || status}
            </button>
          ))}
        </div>
      </div>

      {/* Quotes Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        {/* Mobile Swipe Hint */}
        <div className="md:hidden px-3.5 py-1.5 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between border-b border-slate-100">
          <span>← Swipe horizontally to view all inquiry fields →</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Reference ID</th>
                <th className="p-4">Buyer / Mill</th>
                <th className="p-4">Machine & Configuration</th>
                <th className="p-4">Date Received</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Quick Contact & Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredQuotes.length > 0 ? (
                filteredQuotes.map((q) => {
                  const statusCfg = STATUS_CONFIG[q.status] || STATUS_CONFIG.new;
                  const contactPerson = getQuoteContact(q);
                  const machineName = getQuoteMachine(q);
                  const phoneNum = getQuotePhone(q);
                  const dateStr = getQuoteDate(q);

                  return (
                    <tr key={q.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Ref ID */}
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="font-mono font-bold text-slate-900 text-xs">
                            {q.id}
                          </span>
                          {q.customerId && (
                            <span className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                              Registered Buyer
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Buyer / Mill */}
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900">{q.company}</span>
                          <span className="text-[11px] text-slate-600">{contactPerson}</span>
                          <span className="text-[10px] text-slate-400 mt-0.5">
                            {q.email} {phoneNum ? `• ${phoneNum}` : ""}
                          </span>
                        </div>
                      </td>

                      {/* Machine Requested */}
                      <td className="p-4">
                        <div className="flex flex-col max-w-xs">
                          <span className="font-bold text-slate-900 line-clamp-1">
                            {machineName}
                          </span>
                          <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[10px] text-slate-500">
                            {q.cylinderDiameter && (
                              <span className="px-1.5 py-0.5 bg-slate-100 rounded">
                                Dia: {q.cylinderDiameter}
                              </span>
                            )}
                            {q.gauge && (
                              <span className="px-1.5 py-0.5 bg-slate-100 rounded">
                                Gauge: {q.gauge}
                              </span>
                            )}
                            {q.quantity && (
                              <span className="px-1.5 py-0.5 bg-slate-100 rounded">
                                Qty: {q.quantity}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="p-4 whitespace-nowrap">
                        <span className="text-slate-600 text-xs block">
                          {new Date(dateStr).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(dateStr).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </td>

                      {/* Status Dropdown */}
                      <td className="p-4 whitespace-nowrap">
                        <div className="relative inline-block">
                          <select
                            value={q.status}
                            onChange={(e) => handleStatusChange(q.id, e.target.value as QuoteStatus)}
                            className={`text-[11px] font-bold py-1 px-2.5 rounded-lg border focus:outline-none cursor-pointer ${statusCfg.bg} ${statusCfg.text} ${statusCfg.border}`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="quoted">Quoted</option>
                            <option value="closed">Closed</option>
                          </select>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* WhatsApp CTA */}
                          <a
                            href={getWhatsAppLink(q)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                            title="Direct WhatsApp Message to Buyer"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </a>

                          {/* Email CTA */}
                          <a
                            href={`mailto:${q.email}?subject=Tasneem Knit Industry — Quotation ${q.id} for ${machineName}`}
                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                            title="Send Direct Email"
                          >
                            <Mail className="h-4 w-4" />
                          </a>

                          {/* Inspect Modal CTA */}
                          <button
                            onClick={() => handleOpenDetail(q)}
                            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                            title="View Full Specifications & Notes"
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(q)}
                            className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                            title="Delete Inquiry"
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
                    <FileText className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-700">No quote inquiries found</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {searchQuery
                        ? "Try clearing your search query or status filter."
                        : "New inquiries submitted through the website will appear here in real-time."}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between rounded-t-2xl sm:rounded-t-3xl z-10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-sm text-[#800020]">
                    {selectedQuote.id}
                  </span>
                  <Badge
                    variant={STATUS_CONFIG[selectedQuote.status]?.badgeVariant || "secondary"}
                    size="sm"
                  >
                    {STATUS_CONFIG[selectedQuote.status]?.label || selectedQuote.status}
                  </Badge>
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                  {selectedQuote.company}
                </h3>
              </div>
              <button
                onClick={() => setSelectedQuote(null)}
                className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-6 text-xs">
              {/* Buyer Contact Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                <p className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                  Buyer Contact Details
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-600">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Contact Person</span>
                    <span className="font-semibold text-slate-900 text-sm">
                      {getQuoteContact(selectedQuote)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Factory / Mill Name</span>
                    <span className="font-semibold text-slate-900 text-sm">
                      {selectedQuote.company}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Email Address</span>
                    <a
                      href={`mailto:${selectedQuote.email}`}
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      {selectedQuote.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Phone / WhatsApp</span>
                    <a
                      href={getWhatsAppLink(selectedQuote)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>{getQuotePhone(selectedQuote)}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  {selectedQuote.country && (
                    <div>
                      <span className="text-[10px] text-slate-400 block">Country / Region</span>
                      <span className="font-semibold text-slate-900">
                        {selectedQuote.country}
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] text-slate-400 block">Date Submitted</span>
                    <span className="font-semibold text-slate-900">
                      {new Date(getQuoteDate(selectedQuote)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Machinery Configuration */}
              <div className="p-4 rounded-2xl border border-slate-200 space-y-3">
                <p className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                  Machinery Configuration Requested
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="col-span-2 sm:col-span-3">
                    <span className="text-[10px] text-slate-400 block">Selected Machine</span>
                    <span className="font-black text-slate-900 text-sm">
                      {getQuoteMachine(selectedQuote)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Cylinder Diameter</span>
                    <span className="font-semibold text-slate-800">
                      {selectedQuote.cylinderDiameter || "Contact for details"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Gauge (G)</span>
                    <span className="font-semibold text-slate-800">
                      {selectedQuote.gauge || "Contact for details"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Required Units</span>
                    <span className="font-semibold text-slate-800">
                      {selectedQuote.quantity || "1 Set"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Delivery Timeline</span>
                    <span className="font-semibold text-slate-800">
                      {getQuoteTimeline(selectedQuote)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Buyer Inquired Requirements / Message */}
              {selectedQuote.message && (
                <div className="space-y-1.5">
                  <p className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                    Buyer Requirements & Notes
                  </p>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 leading-relaxed">
                    {selectedQuote.message}
                  </div>
                </div>
              )}

              {/* Internal Staff Notes (Editable) */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-[#800020]" />
                    <span>Internal Staff / Commercial Follow-up Notes</span>
                  </p>
                  <span className="text-[10px] text-slate-400">Visible only to sales team</span>
                </div>
                <textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="e.g. Quoted $44,500 CFR Chattogram port with 1-year warranty on cam box and inverter. Follow up on Tuesday."
                  rows={3}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#800020]"
                />
                <div className="flex items-center justify-end">
                  <Button
                    size="sm"
                    onClick={handleSaveNotes}
                    disabled={isSavingNotes}
                    className="gap-1.5"
                  >
                    <Save className="h-3.5 w-3.5" />
                    <span>Save Internal Notes</span>
                  </Button>
                </div>
              </div>

              {/* Status Change Buttons in Modal */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold text-slate-600">Update Pipeline Status:</span>
                <div className="flex items-center gap-1.5">
                  {(["new", "contacted", "quoted", "closed"] as QuoteStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedQuote.id, st)}
                      className={`px-3 py-1.5 rounded-lg font-bold text-xs capitalize transition-all cursor-pointer ${
                        selectedQuote.status === st
                          ? "bg-slate-900 text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between rounded-b-3xl">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedQuote(null)}
              >
                Close
              </Button>
              <div className="flex items-center gap-2">
                <a
                  href={getWhatsAppLink(selectedQuote)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>Reply via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
