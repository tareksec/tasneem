"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Star,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  Search,
  Filter,
  Eye,
  RefreshCw,
  AlertCircle,
  MessageSquareQuote,
  Building2,
  User,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { AdminStore } from "@/lib/admin/admin-store";
import { Review, ReviewStatus } from "@/lib/types";
import { useToast } from "@/components/admin/ui/toast";
import { Badge } from "@/components/admin/ui/badge";
import { Button } from "@/components/admin/ui/button";
import { Modal } from "@/components/admin/ui/modal";

const STATUS_CONFIG: Record<
  ReviewStatus,
  { label: string; bg: string; text: string; border: string; badgeVariant: "warning" | "success" | "destructive" }
> = {
  pending: {
    label: "Pending Moderation",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    badgeVariant: "warning",
  },
  approved: {
    label: "Approved & Live",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    badgeVariant: "success",
  },
  rejected: {
    label: "Rejected",
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    badgeVariant: "destructive",
  },
};

export default function AdminReviewsPage() {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ReviewStatus>("all");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/reviews");
      const data = await res.json();
      if (data && data.success && Array.isArray(data.reviews) && data.reviews.length > 0) {
        setReviews(data.reviews);
      } else {
        setReviews(AdminStore.getReviews());
      }
    } catch {
      setReviews(AdminStore.getReviews());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();

    const handleStoreUpdate = () => {
      setReviews(AdminStore.getReviews());
    };

    window.addEventListener("tasneem-store-updated", handleStoreUpdate);
    return () => window.removeEventListener("tasneem-store-updated", handleStoreUpdate);
  }, []);

  // Update Review Status
  const handleUpdateStatus = async (id: string, newStatus: ReviewStatus) => {
    setActionLoadingId(id);
    try {
      // 1. Send API update
      const res = await fetch("/api/admin/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      // 2. Also update local store
      AdminStore.updateReviewStatus(id, newStatus);

      // 3. Update local state
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus, updatedAt: new Date().toISOString() } : r))
      );

      if (selectedReview && selectedReview.id === id) {
        setSelectedReview((prev) => (prev ? { ...prev, status: newStatus } : null));
      }

      showToast(
        `Review by ${selectedReview?.name || "buyer"} has been set to ${newStatus}.`,
        newStatus === "approved" ? "success" : "info"
      );
    } catch (err: any) {
      showToast(err.message || "Could not update review status.", "error");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Delete Review
  const handleDeleteReview = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this review?")) return;

    setActionLoadingId(id);
    try {
      await fetch(`/api/admin/reviews?id=${id}`, { method: "DELETE" });
      AdminStore.deleteReview(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
      if (selectedReview?.id === id) setSelectedReview(null);

      showToast("The review record was permanently removed.", "info");
    } catch (err: any) {
      showToast(err.message || "Failed to delete review.", "error");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Filtered & Searched Reviews
  const filteredReviews = reviews.filter((r) => {
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      r.name.toLowerCase().includes(query) ||
      (r.company && r.company.toLowerCase().includes(query)) ||
      r.message.toLowerCase().includes(query);
    return matchesStatus && matchesQuery;
  });

  const counts = {
    all: reviews.length,
    pending: reviews.filter((r) => r.status === "pending").length,
    approved: reviews.filter((r) => r.status === "approved").length,
    rejected: reviews.filter((r) => r.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Customer Reviews & Testimonials
            </h1>
            {counts.pending > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
                {counts.pending} Pending
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Moderate, approve, or reject customer feedback for the homepage marquee slider and dedicated reviews page.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={loadReviews}
            disabled={loading}
            className="flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </Button>

          <Link
            href="/reviews"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <span>Live Reviews Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          onClick={() => setStatusFilter("all")}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            statusFilter === "all"
              ? "bg-slate-900 text-white border-slate-900 shadow-sm"
              : "bg-white text-slate-900 border-slate-200 hover:border-slate-300"
          }`}
        >
          <p className={`text-xs font-medium ${statusFilter === "all" ? "text-slate-300" : "text-slate-500"}`}>
            All Submissions
          </p>
          <p className="text-2xl font-bold mt-1">{counts.all}</p>
        </div>

        <div
          onClick={() => setStatusFilter("pending")}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            statusFilter === "pending"
              ? "bg-amber-600 text-white border-amber-600 shadow-sm"
              : "bg-white text-slate-900 border-slate-200 hover:border-amber-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <p className={`text-xs font-medium ${statusFilter === "pending" ? "text-amber-100" : "text-amber-700"}`}>
              Pending Review
            </p>
            <Clock className="w-4 h-4 opacity-75" />
          </div>
          <p className="text-2xl font-bold mt-1">{counts.pending}</p>
        </div>

        <div
          onClick={() => setStatusFilter("approved")}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            statusFilter === "approved"
              ? "bg-emerald-700 text-white border-emerald-700 shadow-sm"
              : "bg-white text-slate-900 border-slate-200 hover:border-emerald-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <p className={`text-xs font-medium ${statusFilter === "approved" ? "text-emerald-100" : "text-emerald-700"}`}>
              Approved & Public
            </p>
            <CheckCircle2 className="w-4 h-4 opacity-75" />
          </div>
          <p className="text-2xl font-bold mt-1">{counts.approved}</p>
        </div>

        <div
          onClick={() => setStatusFilter("rejected")}
          className={`p-4 rounded-xl border transition-all cursor-pointer ${
            statusFilter === "rejected"
              ? "bg-rose-700 text-white border-rose-700 shadow-sm"
              : "bg-white text-slate-900 border-slate-200 hover:border-rose-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <p className={`text-xs font-medium ${statusFilter === "rejected" ? "text-rose-100" : "text-rose-700"}`}>
              Rejected
            </p>
            <XCircle className="w-4 h-4 opacity-75" />
          </div>
          <p className="text-2xl font-bold mt-1">{counts.rejected}</p>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by buyer, company, message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {(["all", "pending", "approved", "rejected"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors shrink-0 ${
                statusFilter === status
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Table / List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        {loading ? (
          <div className="p-12 text-center text-slate-500">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-slate-400" />
            <p className="text-sm">Loading reviews queue...</p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquareQuote className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-800">No reviews found</p>
            <p className="text-xs text-slate-500 mt-1">
              {searchQuery || statusFilter !== "all"
                ? "Try clearing your search or status filters."
                : "No customer submissions have been recorded yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Reviewer & Company</th>
                  <th className="px-6 py-3.5">Rating</th>
                  <th className="px-6 py-3.5">Message Excerpt</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredReviews.map((review) => {
                  const cfg = STATUS_CONFIG[review.status] || STATUS_CONFIG.pending;
                  const isPending = review.status === "pending";
                  const isApproved = review.status === "approved";
                  const isPlaceholder =
                    review.name.includes("PLACEHOLDER") ||
                    (review.company && review.company.includes("PLACEHOLDER")) ||
                    review.message.includes("PLACEHOLDER");

                  return (
                    <tr
                      key={review.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900 flex items-center gap-2">
                          <span>{review.name}</span>
                          {isPlaceholder && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
                              Placeholder
                            </span>
                          )}
                        </div>
                        {review.company && (
                          <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <Building2 className="w-3 h-3 text-slate-400" />
                            <span className="truncate max-w-[200px]">{review.company}</span>
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3.5 h-3.5 ${
                                star <= review.rating
                                  ? "text-amber-400 fill-amber-400"
                                  : "text-slate-200"
                              }`}
                            />
                          ))}
                          <span className="text-xs font-mono font-medium text-slate-600 ml-1">
                            ({review.rating})
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 max-w-xs">
                        <p className="line-clamp-2 text-xs text-slate-600 leading-relaxed">
                          {review.message}
                        </p>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500 font-mono">
                        {new Date(review.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={cfg.badgeVariant}>
                          {cfg.label}
                        </Badge>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedReview(review)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                            title="View Full Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Quick Moderation Buttons */}
                          {review.status !== "approved" && (
                            <button
                              type="button"
                              disabled={actionLoadingId === review.id}
                              onClick={() => handleUpdateStatus(review.id, "approved")}
                              className="px-2.5 py-1 text-xs font-semibold rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                              title="Approve Review"
                            >
                              Approve
                            </button>
                          )}

                          {review.status !== "rejected" && (
                            <button
                              type="button"
                              disabled={actionLoadingId === review.id}
                              onClick={() => handleUpdateStatus(review.id, "rejected")}
                              className="px-2.5 py-1 text-xs font-semibold rounded-md bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition-colors"
                              title="Reject Review"
                            >
                              Reject
                            </button>
                          )}

                          {review.status !== "pending" && (
                            <button
                              type="button"
                              disabled={actionLoadingId === review.id}
                              onClick={() => handleUpdateStatus(review.id, "pending")}
                              className="px-2 py-1 text-xs font-medium rounded-md text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors"
                              title="Reset to Pending"
                            >
                              Pending
                            </button>
                          )}

                          <button
                            type="button"
                            disabled={actionLoadingId === review.id}
                            onClick={() => handleDeleteReview(review.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete Permanently"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Review Details Modal */}
      {selectedReview && (
        <Modal
          isOpen={!!selectedReview}
          onClose={() => setSelectedReview(null)}
          title="Review Submission Details"
          description={`ID: ${selectedReview.id}`}
          size="md"
          footer={
            <div className="flex items-center justify-between w-full">
              <button
                type="button"
                onClick={() => handleDeleteReview(selectedReview.id)}
                className="text-xs font-medium text-rose-600 hover:text-rose-800 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>

              <div className="flex items-center gap-2">
                {selectedReview.status !== "approved" && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedReview.id, "approved")}
                  >
                    Approve Review
                  </Button>
                )}
                {selectedReview.status !== "rejected" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateStatus(selectedReview.id, "rejected")}
                  >
                    Reject Review
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedReview(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          }
        >
          <div className="space-y-4 pt-2">
            {/* Status & Rating */}
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <span className="text-xs text-slate-500 block mb-1">Rating</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= selectedReview.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-slate-200"
                      }`}
                    />
                  ))}
                  <span className="text-sm font-bold text-slate-800 ml-1">
                    {selectedReview.rating} / 5
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-500 block mb-1">Current Status</span>
                <Badge variant={STATUS_CONFIG[selectedReview.status]?.badgeVariant || "warning"}>
                  {STATUS_CONFIG[selectedReview.status]?.label || selectedReview.status}
                </Badge>
              </div>
            </div>

            {/* Buyer Info */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-slate-400 block mb-1">Reviewer Name</span>
                <span className="font-bold text-slate-900">{selectedReview.name}</span>
              </div>
              <div className="p-3 bg-white border border-slate-200 rounded-xl">
                <span className="text-slate-400 block mb-1">Company / Designation</span>
                <span className="font-semibold text-slate-800">
                  {selectedReview.company || "Not provided"}
                </span>
              </div>
            </div>

            {/* Full Message */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-xs text-slate-400 block mb-1.5 font-semibold uppercase tracking-wider">
                Full Review Message
              </span>
              <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                {selectedReview.message}
              </p>
            </div>

            {/* Metadata */}
            <div className="text-[11px] text-slate-400 flex items-center justify-between font-mono pt-2 border-t border-slate-100">
              <span>Submitted: {new Date(selectedReview.createdAt).toLocaleString()}</span>
              <span>
                Updated:{" "}
                {selectedReview.updatedAt
                  ? new Date(selectedReview.updatedAt).toLocaleString()
                  : new Date(selectedReview.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
