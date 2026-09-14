"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  ExternalLink,
  Eye,
  Check,
  X,
  FileText,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { AdminStore } from "@/lib/admin/admin-store";
import { BlogPost } from "@/lib/admin/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/admin/ui/card";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Badge } from "@/components/admin/ui/badge";
import { Modal } from "@/components/admin/ui/modal";
import { useToast } from "@/components/admin/ui/toast";

export default function BlogListPage() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Delete modal state
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);

  const loadPosts = () => {
    setPosts(AdminStore.getBlogPosts());
  };

  useEffect(() => {
    loadPosts();

    const handleUpdate = () => loadPosts();
    window.addEventListener("tasneem-store-updated", handleUpdate);
    return () => window.removeEventListener("tasneem-store-updated", handleUpdate);
  }, []);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [posts]);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.title_bn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.slug_en.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || post.status === statusFilter;

      const matchesCategory =
        categoryFilter === "all" || post.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [posts, searchQuery, statusFilter, categoryFilter]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage) || 1;
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPosts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPosts, currentPage]);

  const handleDeleteConfirm = () => {
    if (!postToDelete) return;
    AdminStore.deleteBlogPost(postToDelete.id);
    toast({
      type: "success",
      message: "Post deleted",
      description: `"${postToDelete.title_en}" has been removed.`,
    });
    setPostToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Blog & Technical Articles
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Standard admin table managing paired English & Bengali technical guides.
          </p>
        </div>

        <Link href="/admin/blog/new">
          <Button size="md" className="gap-2 shadow-sm font-semibold">
            <Plus className="h-4 w-4" />
            <span>New Post</span>
          </Button>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <Card className="p-4 rounded-2xl">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Input
              type="text"
              placeholder="Search by article title or slug..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9"
            />
            <Search className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 w-full md:w-auto">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap hidden sm:inline">
              Status:
            </span>
            <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200/80 w-full sm:w-auto">
              {(["all", "published", "draft"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setStatusFilter(status);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer flex-1 sm:flex-initial ${
                    statusFilter === status
                      ? "bg-white text-slate-900 shadow-2xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="w-full md:w-48">
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </Card>

      {/* Standard Admin Table */}
      <Card className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs">
        {/* Mobile Swipe Hint */}
        <div className="md:hidden px-3.5 py-1.5 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between border-b border-slate-100">
          <span>← Swipe horizontally to view article statuses & actions →</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-3 px-4 sm:px-6">Title & Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Language Completeness</th>
                <th className="py-3 px-4">Published Date</th>
                <th className="py-3 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedPosts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <FileText className="h-8 w-8 mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold">No articles match your search or filter criteria.</p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setStatusFilter("all");
                        setCategoryFilter("all");
                      }}
                      className="mt-2 text-xs font-semibold text-[#800020] hover:underline cursor-pointer"
                    >
                      Clear all filters
                    </button>
                  </td>
                </tr>
              ) : (
                paginatedPosts.map((post) => {
                  const hasEn = Boolean(post.title_en?.trim() && post.body_en?.trim());
                  const hasBn = Boolean(post.title_bn?.trim() && post.body_bn?.trim());

                  return (
                    <tr
                      key={post.id}
                      className="hover:bg-slate-50/70 transition-colors group"
                    >
                      {/* Title & Category with Thumbnail Preview */}
                      <td className="py-3.5 px-4 sm:px-6 max-w-md">
                        <div className="flex items-start gap-3">
                          <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200 bg-slate-100 hidden sm:block">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={post.cover_image || "/images/machines/cat-double-jersey.jpg"}
                              alt=""
                              onError={(e) => {
                                e.currentTarget.src = "/images/machines/cat-double-jersey.jpg";
                              }}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <Link
                              href={`/admin/blog/${post.id}`}
                              className="font-bold text-slate-900 group-hover:text-[#800020] transition-colors leading-snug line-clamp-2"
                            >
                              {post.title_en || "Untitled English Post"}
                            </Link>
                            {post.title_bn && (
                              <span className="text-xs text-slate-400 truncate mt-0.5">
                                বাংলা: {post.title_bn}
                              </span>
                            )}
                            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                              <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                                {post.category || "General"}
                              </span>
                              <span className="text-[11px] text-slate-400 font-mono">
                                /{post.slug_en}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <Badge
                          variant={post.status === "published" ? "success" : "warning"}
                          size="sm"
                          className="capitalize"
                        >
                          {post.status}
                        </Badge>
                      </td>

                      {/* Language Completeness per Section 3: (EN ✓ / BN ✓ or ✗) */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Badge
                            variant={hasEn ? "success" : "warning"}
                            size="sm"
                            className="text-[11px]"
                          >
                            {hasEn ? "EN ✓" : "EN ✗"}
                          </Badge>
                          <Badge
                            variant={hasBn ? "success" : "warning"}
                            size="sm"
                            className="text-[11px]"
                          >
                            {hasBn ? "BN ✓" : "BN ✗"}
                          </Badge>
                        </div>
                      </td>

                      {/* Published Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 text-xs">
                        {post.published_at ? (
                          <span>{post.published_at}</span>
                        ) : (
                          <span className="text-slate-400 italic">Unpublished Draft</span>
                        )}
                      </td>

                      {/* Actions: Edit, Delete, Preview */}
                      <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/admin/blog/${post.id}`}>
                            <button
                              type="button"
                              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                              title="Edit post"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                          </Link>

                          {/* Preview in Public Route */}
                          <Link
                            href={`/blog/${post.slug_en || post.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <button
                              type="button"
                              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                              title="Preview on live public page ↗"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </button>
                          </Link>

                          <button
                            type="button"
                            onClick={() => setPostToDelete(post)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete post"
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

        {/* Pagination Footer */}
        {filteredPosts.length > itemsPerPage && (
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-t border-slate-100 bg-slate-50/50 text-xs text-slate-500">
            <span>
              Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredPosts.length)} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredPosts.length)} of {filteredPosts.length} posts
            </span>

            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Prev</span>
              </Button>

              <span className="px-2 font-bold text-slate-800">
                Page {currentPage} of {totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                <span>Next</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(postToDelete)}
        onClose={() => setPostToDelete(null)}
        title="Delete Blog Post"
        description="Are you sure you want to remove this article?"
        footer={
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setPostToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteConfirm}
            >
              Confirm Delete
            </Button>
          </>
        }
      >
        <div className="space-y-2 text-xs text-slate-600">
          <p>
            You are deleting:{" "}
            <span className="font-bold text-slate-900">
              "{postToDelete?.title_en}"
            </span>
          </p>
          <p className="text-red-600">
            This action removes both English and Bengali content. This operation cannot be undone.
          </p>
        </div>
      </Modal>
    </div>
  );
}
