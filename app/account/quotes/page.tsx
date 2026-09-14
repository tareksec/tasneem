"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Clock,
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  ArrowUpRight,
  ChevronRight,
  Eye,
  Plus,
  ShieldCheck,
  Ship,
  X,
} from "lucide-react";
import { useCustomerAuth } from "@/lib/customer/customer-context";
import { QuoteRecord, QuoteStatus } from "@/lib/types";
import { COMPANY_INFO } from "@/lib/constants";
import { trackWhatsAppClick } from "@/components/analytics/GoogleAnalytics";

export default function CustomerQuotesPage() {
  const { customer, quotes, isLoading } = useCustomerAuth();
  const [selectedQuote, setSelectedQuote] = useState<QuoteRecord | null>(null);

  if (isLoading) {
    return (
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-12 text-center text-slate-500 text-xs">
        Loading quotation records...
      </div>
    );
  }

  const getStatusBadge = (status: QuoteStatus) => {
    switch (status) {
      case "new":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>New (Under Review)</span>
          </span>
        );
      case "contacted":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <PhoneCall className="w-3.5 h-3.5 text-blue-500" />
            <span>Contacted (Engaging)</span>
          </span>
        );
      case "quoted":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
            <span>Quoted (PI Dispatched)</span>
          </span>
        );
      case "closed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Completed / Closed</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#0A0A0A] tracking-tight">
            Quotation Requests ({quotes.length})
          </h2>
          <p className="text-xs text-[#4B5563] mt-0.5">
            Real-time status of commercial machinery inquiries, CFR Chattogram quotes, and Proforma Invoices.
          </p>
        </div>

        <Link
          href="/quote"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF0000] hover:bg-[#E00000] text-white text-xs font-bold transition-colors shadow-xs shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Request New Quote</span>
        </Link>
      </div>

      {/* Quotes Listing */}
      {quotes.length > 0 ? (
        <div className="space-y-4">
          {quotes.map((quote) => {
            const whatsappFollowupUrl = `https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
              `Hello Tasneem Knit Industry, I am following up on Quote Ref [${quote.id}] for: ${quote.machineType}.`
            )}`;

            return (
              <div
                key={quote.id}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sm:p-6 shadow-xs hover:border-slate-300 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                {/* Left info */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                      {quote.id}
                    </span>
                    {getStatusBadge(quote.status)}
                    <span className="text-[11px] text-slate-400">
                      Submitted: {quote.submittedAt ? new Date(quote.submittedAt).toLocaleDateString() : "Recent"}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {quote.machineType}
                  </h3>

                  {/* Summary Spec Badges */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 pt-1">
                    {quote.gauge && (
                      <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200">
                        Gauge: <strong className="text-slate-900">{quote.gauge}</strong>
                      </span>
                    )}
                    {quote.cylinderDiameter && (
                      <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200">
                        Dia: <strong className="text-slate-900">{quote.cylinderDiameter}</strong>
                      </span>
                    )}
                    {quote.feederCount && (
                      <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200">
                        Feeders: <strong className="text-slate-900">{quote.feederCount}</strong>
                      </span>
                    )}
                    {quote.quantity && (
                      <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200">
                        Qty: <strong className="text-slate-900">{quote.quantity}</strong>
                      </span>
                    )}
                  </div>

                  {/* Admin notes if present */}
                  {quote.adminNotes && (
                    <div className="mt-3 p-3 rounded-xl bg-purple-50/70 border border-purple-100 text-xs text-purple-900 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-semibold">Tasneem Commercial Desk Update:</strong>
                        <span>{quote.adminNotes}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Actions */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100">
                  <button
                    onClick={() => setSelectedQuote(quote)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>View Specs</span>
                  </button>

                  <a
                    href={whatsappFollowupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick("quote_followup", quote.id)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Desk</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-dashed border-[#E5E7EB] rounded-2xl p-12 text-center">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900">No quotes submitted yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
            Browse our circular knitting machine catalog and submit an inquiry to track technical pricing and CFR Chattogram delivery.
          </p>
          <Link
            href="/machines"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF0000] hover:bg-[#E00000] text-white text-xs font-bold shadow-xs transition-colors"
          >
            <span>Browse Machine Catalog</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Quote Details Modal */}
      {selectedQuote && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedQuote(null)}
        >
          <div
            className="bg-white rounded-2xl border border-slate-200 max-w-xl w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-[#FF0000]">
                  {selectedQuote.id}
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedQuote.machineType}
                </h3>
              </div>
              <button
                onClick={() => setSelectedQuote(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Company Name</span>
                <strong className="text-slate-800">{selectedQuote.company}</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Buyer Contact</span>
                <strong className="text-slate-800">{selectedQuote.name}</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Gauge & Cylinder</span>
                <strong className="text-slate-800">
                  {selectedQuote.gauge || "N/A"} / {selectedQuote.cylinderDiameter || "N/A"}
                </strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Feeders & Systems</span>
                <strong className="text-slate-800">{selectedQuote.feederCount || "Standard"}</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Quantity</span>
                <strong className="text-slate-800">{selectedQuote.quantity} Units</strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-0.5">Shipping Terms</span>
                <strong className="text-slate-800">{selectedQuote.deliveryRequirement || "CFR Chattogram"}</strong>
              </div>
            </div>

            {selectedQuote.message && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <span className="text-slate-400 block mb-0.5">Special Technical Notes</span>
                <p className="text-slate-700">{selectedQuote.message}</p>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedQuote(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
