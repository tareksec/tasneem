"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Save,
  CheckCircle2,
  ExternalLink,
  ArrowLeft,
  Image as ImageIcon,
  Tag,
  Globe,
  Calendar,
  Sparkles,
  Upload,
  Trash2,
  RefreshCw,
  Eye,
  Check,
  AlertCircle,
  Plus,
  RotateCcw,
  Clock,
  FileText,
  Loader2,
} from "lucide-react";
import { AdminStore } from "@/lib/admin/admin-store";
import { BlogPost, ContentLocale } from "@/lib/admin/types";
import { MarkdownEditor } from "./MarkdownEditor";
import { useToast } from "@/components/admin/ui/toast";

interface BlogEditorFormProps {
  initialPost?: BlogPost;
  isNew?: boolean;
}

const PRESET_IMAGES = [
  { label: "Double Jersey Machine Floor", url: "/images/machines/cat-double-jersey.jpg" },
  { label: "Single Jersey Circular Unit", url: "/images/machines/cat-single-jersey.jpg" },
  { label: "Interlock Precision Knitting", url: "/images/machines/cat-interlock.jpg" },
  { label: "Factory Commissioning & Leveling", url: "/images/machines/spotlight-installation.jpg" },
  { label: "High-Temperature Eco-Dyeing Vessel", url: "/images/machines/cat-dyeing.jpg" },
  { label: "Fabric Shearing & Finishing Line", url: "/images/machines/cat-shearing.jpg" },
];

const CATEGORIES = [
  "Technical Sourcing",
  "Quality Assurance",
  "Maintenance & Spares",
  "Knitting Technology",
  "Industry News",
  "Commercial & Shipping",
];

export function BlogEditorForm({ initialPost, isNew = false }: BlogEditorFormProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active language tab: "en" | "bn"
  const [activeTab, setActiveTab] = useState<ContentLocale>("en");

  // Success Modal State
  const [successPost, setSuccessPost] = useState<{ id: string; slug: string; title: string } | null>(null);

  // Unsaved changes tracking
  const [isDirty, setIsDirty] = useState(false);
  const [hasRestorableDraft, setHasRestorableDraft] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Form State
  const [post, setPost] = useState<Omit<BlogPost, "id"> & { id?: string }>(() => {
    if (initialPost) return { ...initialPost };
    const today = new Date().toISOString().split("T")[0];
    return {
      title_en: "",
      title_bn: "",
      slug_en: "",
      slug_bn: "",
      cover_image: "/images/machines/cat-double-jersey.jpg",
      excerpt_en: "",
      excerpt_bn: "",
      body_en: "",
      body_bn: "",
      category: "Technical Sourcing",
      tags: ["Machinery Sourcing", "Circular Knitting"],
      seo_title_en: "",
      seo_title_bn: "",
      seo_desc_en: "",
      seo_desc_bn: "",
      status: "draft",
      published_at: today,
      updated_at: today,
      author: "Tasneem Technical Desk",
    };
  });

  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showPresetGallery, setShowPresetGallery] = useState(false);
  const [titleError, setTitleError] = useState("");

  const draftStorageKey = `tasneem_blog_draft_${initialPost?.id || "new"}`;

  // Check for autosaved local draft on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(draftStorageKey);
      if (saved && isNew) {
        const parsed = JSON.parse(saved);
        if (parsed && (parsed.title_en || parsed.title_bn || parsed.body_en || parsed.body_bn)) {
          setHasRestorableDraft(true);
        }
      }
    } catch {
      // Ignore
    }
  }, [draftStorageKey, isNew]);

  // Autosave to localStorage every 5 seconds if dirty
  useEffect(() => {
    if (!isDirty) return;
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(draftStorageKey, JSON.stringify(post));
      } catch {
        // Ignore
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [post, isDirty, draftStorageKey]);

  // Warn before closing browser tab if unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const handleRestoreDraft = () => {
    try {
      const saved = localStorage.getItem(draftStorageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setPost(parsed);
        setIsDirty(true);
        setHasRestorableDraft(false);
        showToast("Restored your previous unsaved draft!", "success");
      }
    } catch {
      showToast("Could not restore draft.", "error");
    }
  };

  // Image Upload with /api/upload server storage and Client-Side Canvas WebP Optimization fallback
  const processImageFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      showToast("Please upload a valid image file (JPG, PNG, WebP).", "error");
      return;
    }

    setUploadingImage(true);

    try {
      // 1. Try uploading to server filesystem via /api/upload
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.url) {
          setPost((prev) => ({ ...prev, cover_image: data.url }));
          setIsDirty(true);
          showToast(`Cover photo "${file.name}" uploaded successfully`, "success");
          setUploadingImage(false);
          return;
        }
      }
    } catch (uploadErr) {
      console.warn("Direct upload failed, falling back to client-side optimization:", uploadErr);
    }

    // 2. Fallback: Client-Side Canvas WebP Optimization
    try {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const img = document.createElement("img");
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1600;
          let w = img.width;
          let h = img.height;
          if (w > MAX_WIDTH) {
            h = Math.round((h * MAX_WIDTH) / w);
            w = MAX_WIDTH;
          }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, w, h);
          const optimizedWebp = canvas.toDataURL("image/webp", 0.85);

          setPost((prev) => ({ ...prev, cover_image: optimizedWebp }));
          setIsDirty(true);
          showToast(`Cover photo "${file.name}" optimized & set`, "success");
          setUploadingImage(false);
        };
        img.onerror = () => {
          showToast("Failed to process image file.", "error");
          setUploadingImage(false);
        };
        img.src = uploadEvent.target?.result as string;
      };
      reader.onerror = () => {
        showToast("Failed to read image file.", "error");
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch (e) {
      console.error(e);
      showToast("Could not process image.", "error");
      setUploadingImage(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processImageFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processImageFile(file);
  };

  // Auto-generate slug from title
  const handleTitleChange = (val: string, locale: ContentLocale) => {
    setIsDirty(true);
    setTitleError("");
    const titleKey = locale === "en" ? "title_en" : "title_bn";
    const slugKey = locale === "en" ? "slug_en" : "slug_bn";

    const autoSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setPost((prev) => ({
      ...prev,
      [titleKey]: val,
      [slugKey]: prev[slugKey] === "" || prev[slugKey] === autoSlug.slice(0, -1) ? autoSlug : prev[slugKey],
    }));
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    if (!post.tags.includes(tagInput.trim())) {
      setPost((prev) => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setIsDirty(true);
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setPost((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }));
    setIsDirty(true);
  };

  // Save handler
  const handleSave = async (targetStatus?: "draft" | "published") => {
    if (!post.title_en.trim() && !post.title_bn.trim()) {
      setTitleError("Please provide an article title (English or Bengali).");
      showToast("Article title is required.", "error");
      return;
    }

    setSaving(true);
    const finalStatus = targetStatus || post.status;
    const now = new Date().toISOString().split("T")[0];

    const postToSave = {
      ...post,
      status: finalStatus,
      published_at: finalStatus === "published" && !post.published_at ? now : post.published_at,
      updated_at: now,
    };

    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postToSave),
      });
      const data = await res.json();
      if (data.success && data.post) {
        postToSave.id = data.post.id;
      }
    } catch (e) {
      console.warn("API save warning:", e);
    }

    const saved = AdminStore.saveBlogPost(postToSave);
    setSaving(false);
    setIsDirty(false);

    // Remove local draft backup since it was saved
    try {
      localStorage.removeItem(draftStorageKey);
    } catch {
      // Ignore
    }

    showToast(
      finalStatus === "published" ? "Article is now live!" : "Draft saved successfully",
      "success"
    );

    setSuccessPost({
      id: saved.id,
      slug: saved.slug_en || saved.slug_bn || saved.id,
      title: saved.title_en || saved.title_bn || "Article",
    });
  };

  const isEnComplete = Boolean(post.title_en.trim() && post.body_en.trim());
  const isBnComplete = Boolean(post.title_bn.trim() && post.body_bn.trim());

  return (
    <div className="space-y-6 pb-20 select-none">
      {/* 1. Top Breadcrumb & Action Header Bar */}
      <div className="sticky top-0 z-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3.5 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/blog">
            <button
              type="button"
              className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 transition-colors cursor-pointer"
              title="Back to Blog Articles List"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </Link>
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Link href="/admin/blog" className="hover:text-[#800020] transition-colors">
                Blog Articles
              </Link>
              <span className="text-slate-400">/</span>
              <span className="text-slate-900 font-semibold">
                {isNew ? "Write New Article" : "Edit Article"}
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-black text-slate-900 leading-tight flex items-center gap-2">
              <span>{post.title_en || post.title_bn || "Untitled Article"}</span>
              {isDirty && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                  Unsaved changes
                </span>
              )}
            </h1>
          </div>
        </div>

        {/* Top Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-auto">
          {post.slug_en && (
            <a
              href={`/blog/${post.slug_en}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#800020]" />
              <span className="hidden sm:inline">Preview Live</span>
            </a>
          )}

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave("draft")}
            className="px-4 py-2 min-h-[40px] rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-bold transition-all shadow-2xs cursor-pointer"
          >
            Save Draft
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave("published")}
            className="inline-flex items-center gap-2 px-5 py-2 min-h-[40px] rounded-xl bg-[#800020] hover:bg-[#5A0017] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Publish Article</span>
          </button>
        </div>
      </div>

      {/* Draft Restore Alert if found */}
      {hasRestorableDraft && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-amber-800">
            <Clock className="w-4 h-4 shrink-0 text-amber-600" />
            <span>
              An unsaved draft was found from your previous session. Would you like to restore it?
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleRestoreDraft}
              className="px-3 py-1.5 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-bold transition-colors cursor-pointer"
            >
              Restore Draft
            </button>
            <button
              type="button"
              onClick={() => {
                setHasRestorableDraft(false);
                try {
                  localStorage.removeItem(draftStorageKey);
                } catch {}
              }}
              className="px-3 py-1.5 rounded-lg text-amber-700 hover:bg-amber-100 font-semibold transition-colors cursor-pointer"
            >
              Discard
            </button>
          </div>
        </div>
      )}

      {/* 2. Main 2-Column Grid: Editor Left (8 cols) & Publication Settings Right (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Bilingual Tabs, Title & WYSIWYG Markdown Editor (8 cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 space-y-6">
          {/* Friendly Bilingual Switcher Tabs */}
          <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#800020]" />
              <span className="text-xs font-bold text-slate-800">Article Language:</span>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab("en")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "en"
                    ? "bg-[#800020] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <span>🇬🇧 English Version</span>
                {isEnComplete && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400" title="English content complete" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("bn")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "bn"
                    ? "bg-[#800020] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <span>🇧🇩 বাংলা ভার্সন</span>
                {isBnComplete && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400" title="Bangla content complete" />
                )}
              </button>
            </div>
          </div>

          {/* Title & Excerpt Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-5">
            {activeTab === "en" ? (
              /* English Title & Excerpt */
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Article Title (English) <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={post.title_en}
                    onChange={(e) => handleTitleChange(e.target.value, "en")}
                    placeholder="e.g. How to Choose the Ideal Cylinder Diameter & Gauge for Circular Knitting"
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-semibold focus:outline-none transition-all ${
                      titleError
                        ? "border-rose-400 bg-rose-50/20"
                        : "border-slate-200 focus:border-[#800020] focus:ring-1 focus:ring-[#800020]"
                    }`}
                  />
                  {titleError && (
                    <p className="text-xs text-rose-600 font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{titleError}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    Brief Summary / Excerpt (English)
                  </label>
                  <textarea
                    rows={2}
                    value={post.excerpt_en}
                    onChange={(e) => {
                      setIsDirty(true);
                      setPost((prev) => ({ ...prev, excerpt_en: e.target.value }));
                    }}
                    placeholder="A 1-2 sentence preview that appears on the blog index cards..."
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#800020]"
                  />
                </div>
              </>
            ) : (
              /* Bengali Title & Excerpt */
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    আর্টিকেলের শিরোনাম (বাংলা)
                  </label>
                  <input
                    type="text"
                    value={post.title_bn}
                    onChange={(e) => handleTitleChange(e.target.value, "bn")}
                    placeholder="উদাঃ সার্কুলার নিটিং মেশিনের সঠিক সিলিন্ডার ডায়ামিটার ও গেজ নির্বাচন গাইড"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:border-[#800020]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    সংক্ষিপ্ত সারসংক্ষেপ (বাংলা)
                  </label>
                  <textarea
                    rows={2}
                    value={post.excerpt_bn}
                    onChange={(e) => {
                      setIsDirty(true);
                      setPost((prev) => ({ ...prev, excerpt_bn: e.target.value }));
                    }}
                    placeholder="ব্লগ কার্ডে প্রদর্শনের জন্য ১-২ লাইনের সংক্ষিপ্ত পরিচিতি..."
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#800020]"
                  />
                </div>
              </>
            )}
          </div>

          {/* Rich WYSIWYG & Markdown Body Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#800020]" />
                <span>
                  {activeTab === "en" ? "Article Body Content (English)" : "আর্টিকেলের মূল বক্তব্য (বাংলা)"}
                </span>
              </label>
              <span className="text-[11px] text-slate-400">
                Use the toolbar to format headers, bold, bullet points, and quotes.
              </span>
            </div>

            <MarkdownEditor
              value={activeTab === "en" ? post.body_en : post.body_bn}
              onChange={(val) => {
                setIsDirty(true);
                if (activeTab === "en") setPost((prev) => ({ ...prev, body_en: val }));
                else setPost((prev) => ({ ...prev, body_bn: val }));
              }}
              placeholder={
                activeTab === "en"
                  ? "Write or paste article text here. Use the toolbar buttons above for easy formatting..."
                  : "এখানে আপনার আর্টিকেলের বিষয়বস্তু লিখুন..."
              }
              minHeight="460px"
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Featured Cover Image, Category, Tags & Publishing (4 cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 space-y-6">
          {/* Featured Cover Image Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Featured Cover Photo
              </h3>
              <button
                type="button"
                onClick={() => setShowPresetGallery(!showPresetGallery)}
                className="text-[11px] text-[#800020] hover:underline font-semibold cursor-pointer"
              >
                {showPresetGallery ? "Close Presets" : "Choose Preset Photo"}
              </button>
            </div>

            {/* Hidden Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />

            {/* Current Cover Preview */}
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 group">
              <Image
                src={post.cover_image || "/images/machines/cat-double-jersey.jpg"}
                alt="Cover photo preview"
                fill
                unoptimized={Boolean(!post.cover_image || post.cover_image.startsWith("data:") || post.cover_image.startsWith("/uploads") || post.cover_image.startsWith("http"))}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target && target.src !== "/images/machines/cat-double-jersey.jpg") {
                    target.src = "/images/machines/cat-double-jersey.jpg";
                  }
                }}
                className="object-cover"
              />
              {uploadingImage && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-white text-xs font-semibold gap-2 z-10">
                  <Loader2 className="w-6 h-6 animate-spin text-white" />
                  <span>Uploading cover image...</span>
                </div>
              )}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white text-xs font-bold gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>Change Image</span>
              </div>
            </div>

            {/* Drag and Drop Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingOver(true);
              }}
              onDragLeave={() => setIsDraggingOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-3.5 rounded-xl border-2 border-dashed text-center transition-all cursor-pointer ${
                isDraggingOver
                  ? "border-[#800020] bg-[#FDF2F4]"
                  : "border-slate-200 hover:border-slate-300 bg-slate-50/50"
              }`}
            >
              <Upload className="w-5 h-5 text-[#800020] mx-auto mb-1" />
              <p className="text-xs font-bold text-slate-800">
                Drag & Drop new cover photo here
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                or click to browse from your computer (auto-saved to /uploads)
              </p>
            </div>

            {/* Direct Image URL input */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-600 block">
                Direct Image Path or URL:
              </label>
              <input
                type="text"
                value={post.cover_image}
                onChange={(e) => {
                  setPost((prev) => ({ ...prev, cover_image: e.target.value }));
                  setIsDirty(true);
                }}
                placeholder="/uploads/... or https://..."
                className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-hidden focus:border-[#800020] font-mono"
              />
            </div>

            {/* Preset Photo Library Picker */}
            {showPresetGallery && (
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <p className="text-[11px] font-bold text-slate-700">Quick Machine Photos:</p>
                <div className="grid grid-cols-2 gap-2">
                  {PRESET_IMAGES.map((p, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setPost((prev) => ({ ...prev, cover_image: p.url }));
                        setIsDirty(true);
                        setShowPresetGallery(false);
                      }}
                      className="cursor-pointer rounded-lg overflow-hidden border border-slate-200 hover:border-[#800020] relative aspect-[4/3] group"
                    >
                      <Image src={p.url} alt={p.label} fill className="object-cover" />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-1">
                        <span className="text-[9px] text-white font-medium block truncate">
                          {p.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Publishing Settings Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-2 border-b border-slate-100">
              Publishing Options
            </h3>

            {/* Category Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Category
              </label>
              <select
                value={post.category}
                onChange={(e) => {
                  setIsDirty(true);
                  setPost((prev) => ({ ...prev, category: e.target.value }));
                }}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none bg-white"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Author */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Author Byline
              </label>
              <input
                type="text"
                value={post.author}
                onChange={(e) => {
                  setIsDirty(true);
                  setPost((prev) => ({ ...prev, author: e.target.value }));
                }}
                placeholder="e.g. Md. Mamunur Rashid / Technical Desk"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Publication Date
              </label>
              <input
                type="date"
                value={post.published_at}
                onChange={(e) => {
                  setIsDirty(true);
                  setPost((prev) => ({ ...prev, published_at: e.target.value }));
                }}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Topic Tags
              </label>
              <div className="flex gap-1.5 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="e.g. Circular Knitting"
                  className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold cursor-pointer"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold"
                  >
                    <span>{t}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(t)}
                      className="hover:text-rose-600 cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Status & Big Save Actions */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5">
              <button
                type="button"
                disabled={saving}
                onClick={() => handleSave("published")}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#800020] hover:bg-[#5A0017] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Publish Article to Website</span>
              </button>

              <button
                type="button"
                disabled={saving}
                onClick={() => handleSave("draft")}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Save as Draft Only
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. POST-SAVE SUCCESS CONFIRMATION MODAL */}
      {/* ========================================================================= */}
      {successPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Article Successfully Saved!
              </h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                <strong>"{successPost.title}"</strong> has been recorded. What would you like to do next?
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <a
                href={`/blog/${successPost.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#800020] hover:bg-[#5A0017] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                <span>View Live Article on Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => {
                  setSuccessPost(null);
                  router.push("/admin/blog/new");
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Write Another Article</span>
              </button>

              <button
                type="button"
                onClick={() => router.push("/admin/blog")}
                className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-900 font-semibold transition-colors cursor-pointer"
              >
                Back to Blog Articles List
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
