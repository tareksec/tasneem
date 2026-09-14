"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Play,
  ArrowUp,
  ArrowDown,
  Upload,
  Video,
  ImageIcon,
  CheckCircle2,
  XCircle,
  Eye,
  AlertTriangle,
  ExternalLink,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  Link as LinkIcon,
  HelpCircle,
} from "lucide-react";
import { AdminStore } from "@/lib/admin/admin-store";
import { GalleryItem } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/admin/ui/card";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Textarea } from "@/components/admin/ui/textarea";
import { Badge } from "@/components/admin/ui/badge";
import { Switch } from "@/components/admin/ui/switch";
import { Modal } from "@/components/admin/ui/modal";
import { useToast } from "@/components/admin/ui/toast";
import { optimizeImageToWebP, generateVideoThumbnail, parseYouTubeVideo } from "@/lib/admin/media-upload";

const CATEGORY_OPTIONS = [
  { value: "", label: "General / Uncategorized" },
  { value: "circular-knitting", label: "Circular Knitting (All Types)" },
  { value: "double-jersey", label: "Double Jersey Knitting" },
  { value: "single-jersey", label: "Single Jersey Knitting" },
  { value: "interlock", label: "Interlock Knitting" },
  { value: "jacquard", label: "Jacquard Knitting" },
  { value: "terry", label: "Terry & Fleece Knitting" },
  { value: "dyeing", label: "Dyeing Machinery" },
  { value: "shearing", label: "Shearing Machinery" },
  { value: "finishing", label: "Finishing & Stenter" },
  { value: "other", label: "Other Textile Machinery" },
];

export default function AdminGalleryPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "image" | "video">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<GalleryItem | null>(null);
  const [previewMedia, setPreviewMedia] = useState<GalleryItem | null>(null);

  // Form states
  const [formData, setFormData] = useState<{
    type: "image" | "video";
    file: string;
    thumbnail: string;
    videoUrlInput: string;
    videoInputMode: "file" | "url";
    title_en: string;
    title_bn: string;
    description_en: string;
    description_bn: string;
    location: string;
    installedDate: string;
    relatedCategory: string;
    published: boolean;
    sortOrder: number;
  }>({
    type: "image",
    file: "",
    thumbnail: "",
    videoUrlInput: "",
    videoInputMode: "file",
    title_en: "",
    title_bn: "",
    description_en: "",
    description_bn: "",
    location: "",
    installedDate: "",
    relatedCategory: "",
    published: true,
    sortOrder: 1,
  });

  const [activeLangTab, setActiveLangTab] = useState<"en" | "bn">("en");
  const [isProcessingMedia, setIsProcessingMedia] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const loadItems = () => {
    setItems(AdminStore.getGalleryItems());
  };

  useEffect(() => {
    loadItems();
    const handleUpdate = () => loadItems();
    window.addEventListener("tasneem-store-updated", handleUpdate);
    return () => window.removeEventListener("tasneem-store-updated", handleUpdate);
  }, []);

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title_en?.toLowerCase().includes(q) ||
        item.title_bn?.toLowerCase().includes(q) ||
        item.location?.toLowerCase().includes(q) ||
        item.relatedCategory?.toLowerCase().includes(q);

      const matchesType = typeFilter === "all" || item.type === typeFilter;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "published" && item.published) ||
        (statusFilter === "draft" && !item.published);
      const matchesCategory =
        categoryFilter === "all" || item.relatedCategory === categoryFilter;

      return matchesSearch && matchesType && matchesStatus && matchesCategory;
    });
  }, [items, searchQuery, typeFilter, statusFilter, categoryFilter]);

  // Open modal for Create
  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      type: "image",
      file: "",
      thumbnail: "",
      videoUrlInput: "",
      videoInputMode: "file",
      title_en: "",
      title_bn: "",
      description_en: "",
      description_bn: "",
      location: "",
      installedDate: "",
      relatedCategory: "",
      published: true,
      sortOrder: items.length + 1,
    });
    setActiveLangTab("en");
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEdit = (item: GalleryItem) => {
    setEditingItem(item);
    const isYt = item.file?.includes("youtube") || item.file?.includes("youtu.be");
    setFormData({
      type: item.type,
      file: item.file,
      thumbnail: item.thumbnail || "",
      videoUrlInput: isYt ? item.file : "",
      videoInputMode: isYt ? "url" : "file",
      title_en: item.title_en || "",
      title_bn: item.title_bn || "",
      description_en: item.description_en || "",
      description_bn: item.description_bn || "",
      location: item.location || "",
      installedDate: item.installedDate || "",
      relatedCategory: item.relatedCategory || "",
      published: item.published,
      sortOrder: item.sortOrder || 1,
    });
    setActiveLangTab("en");
    setIsModalOpen(true);
  };

  // Handle file uploads (Images & Videos)
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingMedia(true);
    try {
      if (formData.type === "image" || file.type.startsWith("image/")) {
        // Auto-optimize to WebP
        const webpData = await optimizeImageToWebP(file);
        setFormData((prev) => ({
          ...prev,
          type: "image",
          file: webpData,
          thumbnail: webpData,
        }));
        toast({
          message: "Image Optimized",
          description: "Image converted to high-efficiency WebP format successfully.",
          type: "success",
        });
      } else if (file.type.startsWith("video/")) {
        // Generate poster thumbnail from video file
        const posterThumb = await generateVideoThumbnail(file);
        const reader = new FileReader();
        reader.onload = (event) => {
          const videoData = event.target?.result as string;
          setFormData((prev) => ({
            ...prev,
            type: "video",
            file: videoData,
            thumbnail: posterThumb || prev.thumbnail,
          }));
          toast({
            message: "Video Loaded",
            description: "Video loaded and poster frame extracted successfully.",
            type: "success",
          });
        };
        reader.readAsDataURL(file);
      }
    } catch (err: any) {
      toast({
        message: "Upload Failed",
        description: err.message || "Failed to process media file.",
        type: "error",
      });
    } finally {
      setIsProcessingMedia(false);
    }
  };

  // Handle Video URL change
  const handleVideoUrlChange = (url: string) => {
    setFormData((prev) => {
      const parsed = parseYouTubeVideo(url);
      return {
        ...prev,
        videoUrlInput: url,
        file: parsed.embedUrl || url,
        thumbnail: parsed.thumbnailUrl || prev.thumbnail,
        type: "video",
      };
    });
  };

  // Custom thumbnail change
  const handleCustomThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const webpData = await optimizeImageToWebP(file, 960, 0.85);
      setFormData((prev) => ({ ...prev, thumbnail: webpData }));
      toast({
        message: "Poster Updated",
        description: "Custom video thumbnail applied.",
        type: "success",
      });
    } catch (err: any) {
      toast({
        message: "Thumbnail Failed",
        description: "Could not optimize custom thumbnail.",
        type: "error",
      });
    }
  };

  // Save gallery item
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title_en && !formData.title_bn) {
      toast({
        message: "Validation Error",
        description: "Please provide a title in either English or Bengali.",
        type: "error",
      });
      return;
    }

    if (!formData.file) {
      toast({
        message: "Media Required",
        description: "Please upload an image/video file or enter a valid video URL.",
        type: "error",
      });
      return;
    }

    const itemToSave: Omit<GalleryItem, "id"> & { id?: string } = {
      ...(editingItem?.id ? { id: editingItem.id } : {}),
      type: formData.type,
      file: formData.file,
      thumbnail: formData.thumbnail || (formData.type === "image" ? formData.file : ""),
      title_en: formData.title_en || formData.title_bn,
      title_bn: formData.title_bn || formData.title_en,
      description_en: formData.description_en,
      description_bn: formData.description_bn,
      location: formData.location,
      installedDate: formData.installedDate,
      relatedCategory: formData.relatedCategory,
      published: formData.published,
      sortOrder: Number(formData.sortOrder) || items.length + 1,
    };

    AdminStore.saveGalleryItem(itemToSave);
    setIsModalOpen(false);
    toast({
      message: editingItem ? "Gallery Item Updated" : "Gallery Item Created",
      description: `"${itemToSave.title_en}" has been saved successfully.`,
      type: "success",
    });
  };

  // Toggle publish status
  const handleTogglePublish = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    AdminStore.toggleGalleryItemPublish(id);
    toast({
      message: "Status Updated",
      description: "Item publication status has been changed.",
      type: "info",
    });
  };

  // Delete item
  const handleDeleteConfirm = () => {
    if (!itemToDelete) return;
    AdminStore.deleteGalleryItem(itemToDelete.id);
    setItemToDelete(null);
    toast({
      message: "Item Deleted",
      description: "The gallery installation has been removed.",
      type: "success",
    });
  };

  // Move item up / down (reorder)
  const handleMove = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= items.length) return;

    const reordered = [...items];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(newIndex, 0, moved);

    AdminStore.reorderGalleryItems(reordered.map((i) => i.id));
    toast({
      message: "Gallery Reordered",
      description: "Display priority updated.",
      type: "info",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header & Stats Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Strict Authenticity Policy — Real Factory Installations Only</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
            Projects & Installation Gallery
          </h1>
          <p className="text-sm text-neutral-500 mt-1 max-w-2xl">
            Manage genuine client machine installations across Bangladesh mills. Supports high-resolution images, WebP optimization, video clips, and YouTube embeds.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/projects"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-neutral-300 bg-white text-xs font-semibold text-neutral-700 hover:bg-neutral-50 shadow-2xs transition-colors"
          >
            <span>View Public Page</span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
          </Link>

          <Button onClick={handleOpenCreate} className="gap-2 shadow-sm bg-[#800020] hover:bg-[#5A0017] text-white">
            <Plus className="w-4 h-4" />
            <span>Add Gallery Item</span>
          </Button>
        </div>
      </div>

      {/* Metrics Summary Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 bg-white border-neutral-200 shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">Total Deployments</div>
          <div className="text-2xl font-black text-neutral-900 mt-1">{items.length}</div>
        </Card>
        <Card className="p-4 bg-white border-neutral-200 shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">Published Live</div>
          <div className="text-2xl font-black text-emerald-700 mt-1">
            {items.filter((i) => i.published).length}
          </div>
        </Card>
        <Card className="p-4 bg-white border-neutral-200 shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">Photos</div>
          <div className="text-2xl font-black text-neutral-800 mt-1">
            {items.filter((i) => i.type === "image").length}
          </div>
        </Card>
        <Card className="p-4 bg-white border-neutral-200 shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-purple-600">Video Records</div>
          <div className="text-2xl font-black text-purple-700 mt-1">
            {items.filter((i) => i.type === "video").length}
          </div>
        </Card>
      </div>

      {/* Search & Filter Toolbar */}
      <Card className="p-4 bg-white border-neutral-200 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          <div className="lg:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <Input
              placeholder="Search installations by title, location or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs"
            />
          </div>

          <div className="lg:col-span-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="w-full h-9 rounded-md border border-neutral-300 bg-white px-3 text-xs text-neutral-700 font-medium focus:outline-none focus:ring-2 focus:ring-neutral-900"
            >
              <option value="all">All Media Types</option>
              <option value="image">Images Only</option>
              <option value="video">Videos Only</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full h-9 rounded-md border border-neutral-300 bg-white px-3 text-xs text-neutral-700 font-medium focus:outline-none focus:ring-2 focus:ring-neutral-900"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
          </div>

          <div className="lg:col-span-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full h-9 rounded-md border border-neutral-300 bg-white px-3 text-xs text-neutral-700 font-medium focus:outline-none focus:ring-2 focus:ring-neutral-900"
            >
              <option value="all">All Categories</option>
              {CATEGORY_OPTIONS.filter((c) => c.value).map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Main Gallery List / Grid */}
      {filteredItems.length === 0 ? (
        <Card className="p-12 text-center border-dashed border-2 border-neutral-300 bg-neutral-50/60 rounded-2xl">
          <div className="w-14 h-14 rounded-full bg-white border border-neutral-200 flex items-center justify-center mx-auto text-neutral-400 mb-4 shadow-xs">
            <ImageIcon className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-neutral-900">
            {items.length === 0 ? "No Factory Installations Uploaded Yet" : "No Matching Installations Found"}
          </h3>
          <p className="text-xs text-neutral-500 max-w-md mx-auto mt-1 mb-6">
            {items.length === 0
              ? "The public site is currently rendering the authentic placeholder state. Upload genuine factory floor installation photos or video clips here to publish live."
              : "Try adjusting your search query or clear your active filters."}
          </p>
          {items.length === 0 ? (
            <Button onClick={handleOpenCreate} className="bg-[#800020] hover:bg-[#5A0017] text-white gap-2">
              <Plus className="w-4 h-4" />
              <span>Upload First Installation</span>
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setTypeFilter("all");
                setStatusFilter("all");
                setCategoryFilter("all");
              }}
            >
              Reset Filters
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => {
            const isVideo = item.type === "video";
            return (
              <Card
                key={item.id}
                className="overflow-hidden border-neutral-200 bg-white hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Visual Preview Container */}
                  <div
                    className="relative w-full aspect-[16/10] bg-neutral-900 overflow-hidden cursor-pointer"
                    onClick={() => setPreviewMedia(item)}
                  >
                    {item.thumbnail || (!isVideo && item.file) ? (
                      <Image
                        src={item.thumbnail || item.file}
                        alt={item.title_en || "Factory Installation"}
                        fill
                        unoptimized={Boolean((item.thumbnail || item.file)?.startsWith("http"))}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-neutral-500">
                        <Video className="w-8 h-8" />
                        <span className="text-[11px] mt-1">Video Stream</span>
                      </div>
                    )}

                    {/* Type Badge */}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-xs ${
                          isVideo
                            ? "bg-purple-600 text-white"
                            : "bg-neutral-900/80 backdrop-blur-xs text-white"
                        }`}
                      >
                        {isVideo ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                        <span>{item.type}</span>
                      </span>

                      {item.relatedCategory && (
                        <span className="bg-white/90 backdrop-blur-xs text-neutral-800 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-2xs capitalize">
                          {item.relatedCategory.replace("-", " ")}
                        </span>
                      )}
                    </div>

                    {/* Play Affordance for Video */}
                    {isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/40 transition-colors">
                        <div className="w-11 h-11 rounded-full bg-[#800020] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 ml-0.5 fill-current" />
                        </div>
                      </div>
                    )}

                    {/* Quick Preview Hover Action */}
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 backdrop-blur-xs text-white text-[11px] px-2 py-1 rounded flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>Preview</span>
                    </div>
                  </div>

                  {/* Card Content Details */}
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-mono font-bold text-neutral-400">
                        #{item.sortOrder || index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleTogglePublish(item.id, e)}
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full transition-colors ${
                          item.published
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.published ? "bg-emerald-600" : "bg-amber-500"
                          }`}
                        />
                        <span>{item.published ? "Published Live" : "Draft Only"}</span>
                      </button>
                    </div>

                    <h3 className="font-bold text-sm sm:text-base text-neutral-900 line-clamp-1">
                      {item.title_en}
                    </h3>
                    {item.title_bn && item.title_bn !== item.title_en && (
                      <h4 className="text-xs text-neutral-500 line-clamp-1 mt-0.5 font-medium">
                        {item.title_bn}
                      </h4>
                    )}

                    {item.description_en && (
                      <p className="text-xs text-neutral-600 line-clamp-2 mt-2 leading-relaxed">
                        {item.description_en}
                      </p>
                    )}

                    {/* Location & Installed Date Metadata */}
                    <div className="mt-3.5 pt-3 border-t border-neutral-100 flex flex-wrap items-center gap-3 text-[11px] text-neutral-500">
                      {item.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#800020]" />
                          <span>{item.location}</span>
                        </div>
                      )}
                      {item.installedDate && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-neutral-400" />
                          <span>{item.installedDate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Controls: Move Up/Down, Edit, Delete */}
                <div className="p-3.5 px-5 bg-neutral-50/80 border-t border-neutral-100 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMove(index, -1)}
                      title="Move higher in priority"
                      className="p-1.5 rounded text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={index === items.length - 1}
                      onClick={() => handleMove(index, 1)}
                      title="Move lower in priority"
                      className="p-1.5 rounded text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenEdit(item)}
                      className="h-7 px-2.5 text-xs gap-1 text-neutral-700"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setItemToDelete(item)}
                      className="h-7 px-2 text-xs text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add / Edit Gallery Item Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => !isProcessingMedia && setIsModalOpen(false)}
        title={editingItem ? "Edit Gallery Installation" : "Add Factory Installation Record"}
        description="Provide verified photography or video documentation of real machinery deployments."
        size="lg"
      >
        <form onSubmit={handleSave} className="space-y-6">
          {/* Media Type Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2">
              Media Asset Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, type: "image" }))}
                className={`p-3 rounded-xl border flex items-center justify-center gap-2.5 text-xs font-bold transition-all ${
                  formData.type === "image"
                    ? "border-neutral-900 bg-neutral-900 text-white shadow-xs"
                    : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Installation Photo (WebP)</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, type: "video" }))}
                className={`p-3 rounded-xl border flex items-center justify-center gap-2.5 text-xs font-bold transition-all ${
                  formData.type === "video"
                    ? "border-purple-600 bg-purple-600 text-white shadow-xs"
                    : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Video Clip / Stream</span>
              </button>
            </div>
          </div>

          {/* Media Upload Area */}
          <div className="border border-neutral-200 rounded-2xl p-4 bg-neutral-50/50 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-900">
                {formData.type === "image" ? "Photo Upload & Optimization" : "Video Media Source"}
              </span>

              {formData.type === "video" && (
                <div className="flex items-center gap-1 text-xs bg-white border border-neutral-200 rounded-lg p-0.5">
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, videoInputMode: "file" }))}
                    className={`px-2.5 py-1 rounded font-medium text-[11px] ${
                      formData.videoInputMode === "file" ? "bg-neutral-900 text-white" : "text-neutral-600"
                    }`}
                  >
                    MP4 / WebM File
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, videoInputMode: "url" }))}
                    className={`px-2.5 py-1 rounded font-medium text-[11px] ${
                      formData.videoInputMode === "url" ? "bg-neutral-900 text-white" : "text-neutral-600"
                    }`}
                  >
                    YouTube / Video URL
                  </button>
                </div>
              )}
            </div>

            {/* If Type is Image OR Video with File upload */}
            {(formData.type === "image" || formData.videoInputMode === "file") && (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={formData.type === "image" ? "image/*" : "video/mp4,video/webm,video/quicktime"}
                  onChange={handleFileChange}
                  className="hidden"
                />

                {formData.file ? (
                  <div className="relative rounded-xl overflow-hidden border border-neutral-200 bg-neutral-900 aspect-video flex items-center justify-center group">
                    {formData.type === "image" ? (
                      <Image
                        src={formData.file}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <video
                        src={formData.file}
                        controls
                        className="w-full h-full object-contain"
                      />
                    )}

                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Change File</span>
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={() => setFormData((prev) => ({ ...prev, file: "", thumbnail: "" }))}
                        className="text-xs"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer border-2 border-dashed border-neutral-300 hover:border-neutral-400 bg-white rounded-xl p-6 text-center transition-colors"
                  >
                    <Upload className="w-7 h-7 mx-auto text-neutral-400 mb-2" />
                    <div className="text-xs font-semibold text-neutral-900">
                      {formData.type === "image" ? "Click to upload installation photo" : "Click to upload video file (MP4/WebM)"}
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-1">
                      {formData.type === "image"
                        ? "Images will be automatically resized and converted to optimized WebP format."
                        : "A poster frame thumbnail will be auto-generated at the 1.0 second mark."}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Video URL Input */}
            {formData.type === "video" && formData.videoInputMode === "url" && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="https://youtu.be/... or https://www.youtube.com/watch?v=..."
                    value={formData.videoUrlInput}
                    onChange={(e) => handleVideoUrlChange(e.target.value)}
                    className="text-xs"
                  />
                </div>
                <p className="text-[11px] text-neutral-500">
                  Enter YouTube URL (e.g. your owner introduction or factory walkthrough) — video embed and poster thumbnail are extracted automatically.
                </p>

                {formData.file && (
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-neutral-200 mt-2 bg-neutral-900">
                    <iframe
                      src={formData.file}
                      title="Video Preview"
                      className="w-full h-full object-cover"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            )}

            {/* Video Poster Thumbnail Option */}
            {formData.type === "video" && (
              <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  {formData.thumbnail ? (
                    <div className="relative w-12 h-8 rounded border border-neutral-200 overflow-hidden shrink-0">
                      <Image src={formData.thumbnail} alt="Poster" fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-8 rounded bg-neutral-200 flex items-center justify-center text-[10px] text-neutral-500">
                      Poster
                    </div>
                  )}
                  <div>
                    <span className="font-semibold text-neutral-800 block">Poster Thumbnail</span>
                    <span className="text-[10px] text-neutral-500">Displayed in grid before playing</span>
                  </div>
                </div>

                <input
                  ref={thumbnailInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCustomThumbnailChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => thumbnailInputRef.current?.click()}
                  className="text-xs h-7"
                >
                  Custom Poster
                </Button>
              </div>
            )}
          </div>

          {/* Bilingual Content (EN / BN tabs) */}
          <div className="border border-neutral-200 rounded-2xl p-4 bg-white space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                Installation Title & Description
              </span>

              <div className="flex items-center gap-1 bg-neutral-100 p-0.5 rounded-lg text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveLangTab("en")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeLangTab === "en" ? "bg-white text-neutral-900 shadow-2xs" : "text-neutral-500"
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLangTab("bn")}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeLangTab === "bn" ? "bg-white text-neutral-900 shadow-2xs" : "text-neutral-500"
                  }`}
                >
                  বাংলা
                </button>
              </div>
            </div>

            {activeLangTab === "en" ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Installation Title (English) <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="e.g. Double Jersey Circular Knitting Line Installation"
                    value={formData.title_en}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title_en: e.target.value }))}
                    className="text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Description / Scope of Commissioning (English)
                  </label>
                  <Textarea
                    placeholder="e.g. Sourcing, CFR Chattogram transit, SGS inspection, and on-site factory floor assembly for 100% cotton export fabric."
                    value={formData.description_en}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description_en: e.target.value }))}
                    className="text-xs"
                    rows={3}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    ইনস্টলেশন শিরোনাম (বাংলা) <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="যেমন: ডাবল জার্সি সার্কুলার নিটিং লাইন স্থাপন"
                    value={formData.title_bn}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title_bn: e.target.value }))}
                    className="text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    কমিশনিং বিবরণ (বাংলা)
                  </label>
                  <Textarea
                    placeholder="যেমন: সরাসরি আমদানি, প্রি-শিপমেন্ট চেকিং, CFR Chattogram সমুদ্রপথে পরিবহন এবং ফ্যাক্টরি ফ্লোরে সফল ইনস্টলেশন।"
                    value={formData.description_bn}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description_bn: e.target.value }))}
                    className="text-xs"
                    rows={3}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Installation Details: Location, Date & Machinery Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Factory Location (Optional)
              </label>
              <Input
                placeholder="e.g. BSCIC, Narayanganj"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                className="text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Installation Date (Optional)
              </label>
              <Input
                placeholder="e.g. February 2026"
                value={formData.installedDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, installedDate: e.target.value }))}
                className="text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Machine Category Link
              </label>
              <select
                value={formData.relatedCategory}
                onChange={(e) => setFormData((prev) => ({ ...prev, relatedCategory: e.target.value }))}
                className="w-full h-9 rounded-md border border-neutral-300 bg-white px-3 text-xs text-neutral-700 font-medium focus:outline-none focus:ring-2 focus:ring-neutral-900"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Publish Toggle & Sort Order */}
          <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Switch
                checked={formData.published}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, published: checked }))}
                id="gallery-publish-toggle"
              />
              <label htmlFor="gallery-publish-toggle" className="text-xs font-semibold text-neutral-800 cursor-pointer">
                {formData.published ? "Published Immediately" : "Save as Draft"}
              </label>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-neutral-500 font-medium">Sort Order:</span>
              <Input
                type="number"
                value={formData.sortOrder}
                onChange={(e) => setFormData((prev) => ({ ...prev, sortOrder: parseInt(e.target.value) || 1 }))}
                className="w-16 h-8 text-xs text-center"
                min={1}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              disabled={isProcessingMedia}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isProcessingMedia}
              className="bg-[#800020] hover:bg-[#5A0017] text-white"
            >
              {isProcessingMedia ? "Processing..." : editingItem ? "Update Installation" : "Save Installation"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        title="Delete Installation Record"
        description="Are you sure you want to delete this installation? This will remove the photo/video from the public gallery."
      >
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Permanent Deletion</span>
              Deleting this record will reorder remaining items seamlessly without leaving holes in the gallery sequence.
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setItemToDelete(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete Record
            </Button>
          </div>
        </div>
      </Modal>

      {/* Lightbox / Media Preview Modal */}
      <Modal
        isOpen={!!previewMedia}
        onClose={() => setPreviewMedia(null)}
        title={previewMedia?.title_en || "Media Preview"}
        description={`${previewMedia?.location || "Bangladesh"} • ${previewMedia?.installedDate || "Verified Deployment"}`}
        size="lg"
      >
        <div className="space-y-4">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-neutral-900 flex items-center justify-center">
            {previewMedia?.type === "video" ? (
              previewMedia.file.includes("youtube") || previewMedia.file.includes("embed") ? (
                <iframe
                  src={previewMedia.file}
                  title={previewMedia.title_en}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video src={previewMedia.file} controls autoPlay className="w-full h-full object-contain" />
              )
            ) : previewMedia?.file ? (
              <Image
                src={previewMedia.file}
                alt={previewMedia.title_en}
                fill
                className="object-contain"
              />
            ) : null}
          </div>

          {previewMedia?.description_en && (
            <p className="text-xs text-neutral-600 leading-relaxed bg-neutral-50 p-3 rounded-lg border border-neutral-200">
              {previewMedia.description_en}
            </p>
          )}

          <div className="flex justify-end pt-2">
            <Button variant="outline" onClick={() => setPreviewMedia(null)}>
              Close Preview
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
