"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  SlidersHorizontal,
  Edit,
  Trash2,
  ExternalLink,
  Eye,
  EyeOff,
  CheckSquare,
  Square,
  Layers,
  ArrowUpDown,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { AdminStore } from "@/lib/admin/admin-store";
import { Machine, MachineCategory } from "@/lib/types";
import { CATEGORIES } from "@/lib/machines-data";
import { useToast } from "@/components/admin/ui/toast";

export default function AdminProductsListPage() {
  const { showToast } = useToast();
  const [machines, setMachines] = useState<Machine[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkCategory, setBulkCategory] = useState<MachineCategory | "">("");

  const loadData = () => {
    setMachines(AdminStore.getMachines(true)); // Include drafts for admin
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener("tasneem-store-updated", handleUpdate);
    return () => window.removeEventListener("tasneem-store-updated", handleUpdate);
  }, []);

  const filteredMachines = machines.filter((m) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      m.name.toLowerCase().includes(q) ||
      (m.name_bn && m.name_bn.toLowerCase().includes(q)) ||
      m.brand.toLowerCase().includes(q) ||
      m.machineType.toLowerCase().includes(q);

    const matchesCategory =
      categoryFilter === "all" ||
      m.category === categoryFilter ||
      m.mainCategory === categoryFilter ||
      m.subCategory === categoryFilter;
    const matchesStatus = statusFilter === "all" || (m.status || "published") === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSelectAll = () => {
    if (selectedIds.length === filteredMachines.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredMachines.map((m) => m.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDelete = (machine: Machine) => {
    if (confirm(`Are you sure you want to delete "${machine.name}"? This cannot be undone.`)) {
      AdminStore.deleteMachine(machine.id);
      showToast(`Machine "${machine.name}" deleted`, "success");
      loadData();
    }
  };

  const handleToggleStatus = (machine: Machine) => {
    const nextStatus = machine.status === "draft" ? "published" : "draft";
    AdminStore.saveMachine({ ...machine, status: nextStatus });
    showToast(`Machine status set to ${nextStatus}`, "success");
    loadData();
  };

  // Bulk Actions
  const handleBulkStatus = (status: "published" | "draft") => {
    if (selectedIds.length === 0) return;
    AdminStore.bulkUpdateStatus(selectedIds, status);
    showToast(`Updated ${selectedIds.length} machines to ${status}`, "success");
    setSelectedIds([]);
    loadData();
  };

  const handleBulkCategoryChange = (cat: MachineCategory) => {
    if (selectedIds.length === 0 || !cat) return;
    AdminStore.bulkUpdateCategory(selectedIds, cat);
    showToast(`Reassigned ${selectedIds.length} machines to ${cat}`, "success");
    setSelectedIds([]);
    setBulkCategory("");
    loadData();
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    if (confirm(`Delete ${selectedIds.length} selected machines?`)) {
      selectedIds.forEach((id) => AdminStore.deleteMachine(id));
      showToast(`Deleted ${selectedIds.length} machines`, "success");
      setSelectedIds([]);
      loadData();
    }
  };

  const publishedCount = machines.filter((m) => (m.status || "published") === "published").length;
  const draftCount = machines.filter((m) => m.status === "draft").length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF0000] bg-red-50 px-2.5 py-1 rounded-md inline-block mb-1.5">
            Machine Catalog CRUD
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Knitting Machinery Control
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage circular knitting machines, technical specifications, multi-image galleries, and bilingual fields.
          </p>
        </div>

        <Link href="/admin/products/new">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF0000] hover:bg-[#E00000] text-white text-xs font-bold transition-all shadow-sm cursor-pointer shrink-0">
            <Plus className="w-4 h-4" />
            <span>Add New Machine</span>
          </button>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between shadow-2xs">
          <div>
            <p className="text-xs font-semibold text-slate-500">Total Machinery</p>
            <p className="text-xl font-bold text-slate-900 mt-0.5">{machines.length}</p>
          </div>
          <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
            Catalog Size
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between shadow-2xs">
          <div>
            <p className="text-xs font-semibold text-slate-500">Published (Live)</p>
            <p className="text-xl font-bold text-emerald-600 mt-0.5">{publishedCount}</p>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Active</span>
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between shadow-2xs">
          <div>
            <p className="text-xs font-semibold text-slate-500">Draft / Pending</p>
            <p className="text-xl font-bold text-amber-600 mt-0.5">{draftCount}</p>
          </div>
          <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Hidden</span>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by model, brand, spec..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#FF0000] focus:bg-white"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#FF0000]"
          >
            <option value="all">All Categories ({CATEGORIES.length})</option>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#FF0000]"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published Only</option>
            <option value="draft">Drafts Only</option>
          </select>
        </div>
      </div>

      {/* Bulk Action Strip */}
      {selectedIds.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-200 shadow-md">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-lg">
              {selectedIds.length} Selected
            </span>
            <span className="text-xs text-slate-300">Choose batch operation:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleBulkStatus("published")}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer"
            >
              Publish Selected
            </button>
            <button
              onClick={() => handleBulkStatus("draft")}
              className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold cursor-pointer"
            >
              Draft Selected
            </button>

            <select
              value={bulkCategory}
              onChange={(e) => {
                if (e.target.value) {
                  handleBulkCategoryChange(e.target.value as MachineCategory);
                }
              }}
              className="py-1.5 px-2.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value="">Reassign Category...</option>
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleBulkDelete}
              className="px-3 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Machinery Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4 w-10">
                  <button
                    onClick={handleSelectAll}
                    className="p-1 rounded text-slate-400 hover:text-slate-700"
                    aria-label="Select all"
                  >
                    {selectedIds.length > 0 && selectedIds.length === filteredMachines.length ? (
                      <CheckSquare className="w-4 h-4 text-[#FF0000]" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="p-4">Machine & Brand</th>
                <th className="p-4">Category</th>
                <th className="p-4">Technical Specs</th>
                <th className="p-4">Status</th>
                <th className="p-4">Last Updated</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMachines.length > 0 ? (
                filteredMachines.map((m) => {
                  const isSelected = selectedIds.includes(m.id);
                  const isPublished = (m.status || "published") === "published";
                  const primaryImage =
                    m.galleryImages?.find((g) => g.isPrimary)?.url ||
                    m.images?.[0] ||
                    `/images/machines/cat-${m.category}.webp`;

                  return (
                    <tr
                      key={m.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isSelected ? "bg-red-50/30" : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleSelect(m.id)}
                          className="p-1 rounded text-slate-400 hover:text-slate-700"
                          aria-label={`Select ${m.name}`}
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-[#FF0000]" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      {/* Machine Name & Thumbnail */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                            <Image
                              src={primaryImage}
                              alt={m.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <Link
                              href={`/admin/products/${m.id}/edit`}
                              className="font-bold text-slate-900 hover:text-[#FF0000] line-clamp-1"
                            >
                              {m.name}
                            </Link>
                            <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                              <span>Brand: <strong className="text-slate-600">{m.brand}</strong></span>
                              {m.name_bn && (
                                <span className="text-[10px] bg-red-50 text-[#FF0000] px-1.5 py-0.2 rounded">
                                  BN
                                </span>
                              )}
                              {m.galleryImages && m.galleryImages.length > 1 && (
                                <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded">
                                  {m.galleryImages.length} photos
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-4">
                        <span className="capitalize font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md text-[11px]">
                          {m.category.replace("-", " ")}
                        </span>
                      </td>

                      {/* Specs */}
                      <td className="p-4 text-slate-600 text-[11px]">
                        <div>Gauge: <strong>{m.gauge || "Contact for details"}</strong></div>
                        <div>Dia: <strong>{m.cylinderDiameter || "Contact for details"}</strong></div>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleStatus(m)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all ${
                            isPublished
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                              : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                          }`}
                          title="Click to toggle publish/draft"
                        >
                          {isPublished ? (
                            <>
                              <Eye className="w-3 h-3 text-emerald-600" />
                              <span>Published</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3 text-amber-600" />
                              <span>Draft</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Last Updated */}
                      <td className="p-4 text-slate-400 text-[11px]">
                        {m.updatedAt ? new Date(m.updatedAt).toLocaleDateString() : "Baseline"}
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <Link
                            href={`/machines/${m.category}/${m.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                            title="View on Live Public Catalog"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>

                          <Link
                            href={`/admin/products/${m.id}/edit`}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:text-[#FF0000] hover:bg-red-50 hover:border-red-200"
                            title="Edit Technical Specifications"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>

                          <button
                            onClick={() => handleDelete(m)}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 cursor-pointer"
                            title="Delete Machine"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-slate-400">
                    No machinery matches current search or filter query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
