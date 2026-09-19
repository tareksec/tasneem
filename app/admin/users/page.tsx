"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Building2,
  Mail,
  Phone,
  MessageCircle,
  Trash2,
  ShieldCheck,
  Filter,
  Check,
  X,
  ExternalLink,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { AdminStore } from "@/lib/admin/admin-store";
import { CustomerUser, CustomerApprovalStatus } from "@/lib/types";
import { Card } from "@/components/admin/ui/card";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Badge } from "@/components/admin/ui/badge";
import { Modal } from "@/components/admin/ui/modal";
import { useToast } from "@/components/admin/ui/toast";

export default function AdminUsersPage() {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<CustomerUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | CustomerApprovalStatus>("pending");
  const [customerToDelete, setCustomerToDelete] = useState<CustomerUser | null>(null);

  // Load and sync customers from AdminStore
  const loadCustomers = async () => {
    try {
      const response = await fetch("/api/admin/customers", { cache: "no-store" });
      const result = await response.json();
      if (response.ok && result.success) {
        setCustomers(result.customers);
        return;
      }
    } catch {
      // Use the local store when the database is unavailable.
    }
    setCustomers(AdminStore.getCustomers());
  };

  useEffect(() => {
    void loadCustomers();
    const handleUpdate = () => loadCustomers();
    window.addEventListener("tasneem-store-updated", handleUpdate);
    return () => window.removeEventListener("tasneem-store-updated", handleUpdate);
  }, []);

  // Filtered customers
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phoneOrWhatsApp.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "all" ? true : c.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [customers, searchQuery, statusFilter]);

  // Counts
  const pendingCount = useMemo(
    () => customers.filter((c) => c.status === "pending").length,
    [customers]
  );
  const approvedCount = useMemo(
    () => customers.filter((c) => c.status === "approved").length,
    [customers]
  );
  const totalCount = customers.length;

  const handleApprove = async (c: CustomerUser) => {
    const response = await fetch("/api/admin/customers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: c.id, status: "approved" }),
    });
    if (response.ok) {
      AdminStore.approveCustomer(c.id);
      void loadCustomers();
      toast({ type: "success", message: "Buyer Account Approved!", description: `"${c.company}" (${c.email}) can now sign in to the portal.` });
    }
  };

  const handleReject = async (c: CustomerUser) => {
    const response = await fetch("/api/admin/customers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: c.id, status: "rejected" }),
    });
    if (response.ok) {
      AdminStore.rejectCustomer(c.id);
      void loadCustomers();
      toast({ type: "info", message: "Registration Declined", description: `"${c.company}" has been marked as rejected.` });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!customerToDelete) return;
    await fetch("/api/admin/customers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: customerToDelete.id }),
    });
    AdminStore.deleteCustomer(customerToDelete.id);
    void loadCustomers();
    toast({
      type: "success",
      message: "Buyer Record Removed",
      description: `"${customerToDelete.company}" has been deleted.`,
    });
    setCustomerToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Buyer Accounts & Approval Requests
            </h2>
            {pendingCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-white animate-pulse">
                {pendingCount} Pending
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review buyer registrations, approve authentic textile mill accounts, and manage portal access.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/quotes">
            <Button variant="outline" size="sm" className="gap-2 text-xs">
              <FileText className="h-3.5 w-3.5" />
              <span>View Submitted Quotes</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Pending Approvals */}
        <div
          onClick={() => setStatusFilter("pending")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "pending"
              ? "bg-amber-50/80 border-amber-300 ring-2 ring-amber-400/20 shadow-xs"
              : "bg-white border-slate-200/80 hover:border-amber-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Pending Approvals
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-amber-950">
              {pendingCount}
            </span>
            <span className="text-xs text-amber-700 font-medium">
              {pendingCount === 1 ? "request waiting" : "requests waiting"}
            </span>
          </div>
        </div>

        {/* Approved Buyers */}
        <div
          onClick={() => setStatusFilter("approved")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "approved"
              ? "bg-emerald-50/80 border-emerald-300 ring-2 ring-emerald-400/20 shadow-xs"
              : "bg-white border-slate-200/80 hover:border-emerald-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Active / Approved Buyers
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-950">
              {approvedCount}
            </span>
            <span className="text-xs text-emerald-700 font-medium">verified accounts</span>
          </div>
        </div>

        {/* Total Accounts */}
        <div
          onClick={() => setStatusFilter("all")}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === "all"
              ? "bg-slate-100 border-slate-400 ring-2 ring-slate-400/20 shadow-xs"
              : "bg-white border-slate-200/80 hover:border-slate-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Total Registrations
            </span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              {totalCount}
            </span>
            <span className="text-xs text-slate-500 font-medium">registered buyers</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <Card className="p-4 rounded-2xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setStatusFilter("pending")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                statusFilter === "pending"
                  ? "bg-amber-500 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Pending Requests</span>
              {pendingCount > 0 && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    statusFilter === "pending"
                      ? "bg-white text-amber-600"
                      : "bg-amber-500 text-white"
                  }`}
                >
                  {pendingCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setStatusFilter("approved")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                statusFilter === "approved"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Approved Buyers</span>
            </button>

            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === "all"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
              }`}
            >
              All Records
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Input
              type="text"
              placeholder="Search by buyer, factory, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-xs"
            />
            <Search className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </Card>

      {/* Customers Table */}
      <Card className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[760px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4 sm:px-6">Buyer & Mill Details</th>
                <th className="py-3 px-4">Contact & WhatsApp</th>
                <th className="py-3 px-4">Submitted At</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 sm:px-6 text-right">Approval Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-14 text-center text-slate-400">
                    <Users className="h-9 w-9 mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold text-slate-600">
                      {statusFilter === "pending"
                        ? "No pending registration requests waiting for approval."
                        : "No buyer records match your criteria."}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {statusFilter === "pending"
                        ? "All new buyer registrations have been processed."
                        : "Try adjusting your search query or reset filters."}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => {
                  const isPending = c.status === "pending";
                  const isApproved = c.status === "approved";
                  const isRejected = c.status === "rejected";

                  const waText = encodeURIComponent(
                    `Hello ${c.name}, regarding your buyer account registration for ${c.company} on Tasneem Knit Industry...`
                  );
                  const cleanPhone = c.phoneOrWhatsApp?.replace(/[^0-9]/g, "");

                  return (
                    <tr
                      key={c.id}
                      className={`hover:bg-slate-50/70 transition-colors group ${
                        isPending ? "bg-amber-50/20" : ""
                      }`}
                    >
                      {/* Buyer & Factory Name */}
                      <td className="py-3.5 px-4 sm:px-6 max-w-sm">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                            {c.name ? c.name.charAt(0).toUpperCase() : "B"}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-bold text-slate-900 leading-snug">
                              {c.name}
                            </span>
                            <span className="text-xs font-medium text-slate-600 truncate flex items-center gap-1.5 mt-0.5">
                              <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="truncate">{c.company}</span>
                            </span>
                            {c.deliveryAddress && (
                              <span className="text-[11px] text-slate-400 truncate mt-0.5">
                                {c.deliveryAddress}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Contact & WhatsApp */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col space-y-1">
                          <span className="font-mono text-xs text-slate-800 flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{c.email}</span>
                          </span>
                          {c.phoneOrWhatsApp && (
                            <span className="font-mono text-xs text-slate-600 flex items-center gap-1.5">
                              <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{c.phoneOrWhatsApp}</span>
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Submitted At */}
                      <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                        {c.createdAt ? new Date(c.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }) : "Recent"}
                      </td>

                      {/* Status & Verification Badges */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex flex-col items-start gap-1">
                          {isPending && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                              <Clock className="w-3 h-3 text-amber-600 animate-pulse" />
                              <span>Pending Review</span>
                            </span>
                          )}
                          {isApproved && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span>Approved</span>
                            </span>
                          )}
                          {isRejected && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
                              <X className="w-3 h-3 text-rose-600" />
                              <span>Rejected</span>
                            </span>
                          )}

                          {c.email_verified ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                              <CheckCircle className="w-2.5 h-2.5 text-blue-600" />
                              <span>Email Verified</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-500 border border-slate-200">
                              <span>Email Unverified</span>
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Approval Actions */}
                      <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* WhatsApp Chat Button */}
                          {cleanPhone && (
                            <a
                              href={`https://wa.me/${cleanPhone}?text=${waText}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition-colors"
                              title="Chat with Buyer on WhatsApp"
                            >
                              <MessageCircle className="h-4 w-4" />
                            </a>
                          )}

                          {isPending && (
                            <>
                              {/* Approve Button */}
                              <button
                                type="button"
                                onClick={() => handleApprove(c)}
                                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                                title="Approve this buyer account"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Approve</span>
                              </button>

                              {/* Reject Button */}
                              <button
                                type="button"
                                onClick={() => handleReject(c)}
                                className="px-2.5 py-1.5 rounded-lg border border-rose-300 hover:bg-rose-50 text-rose-700 text-xs font-semibold transition-colors cursor-pointer"
                                title="Decline this registration"
                              >
                                <span>Decline</span>
                              </button>
                            </>
                          )}

                          {isApproved && (
                            <button
                              type="button"
                              onClick={() => handleReject(c)}
                              className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs transition-colors"
                              title="Suspend / Revoke access"
                            >
                              Suspend
                            </button>
                          )}

                          {isRejected && (
                            <button
                              type="button"
                              onClick={() => handleApprove(c)}
                              className="px-2.5 py-1 rounded-lg border border-emerald-300 hover:bg-emerald-50 text-emerald-700 text-xs font-bold transition-colors"
                              title="Re-approve access"
                            >
                              Re-Approve
                            </button>
                          )}

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => setCustomerToDelete(c)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Delete buyer record"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(customerToDelete)}
        onClose={() => setCustomerToDelete(null)}
        title="Remove Buyer Record"
      >
        <div className="space-y-4">
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            <div className="text-xs text-red-800">
              <p className="font-bold">Are you sure you want to delete this buyer account?</p>
              <p className="mt-1">
                {customerToDelete?.company} ({customerToDelete?.email}) will be permanently removed.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCustomerToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteConfirm}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
