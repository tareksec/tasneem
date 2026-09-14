"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Save,
  CheckCircle,
  ExternalLink,
  ArrowLeft,
  Image as ImageIcon,
  Tag,
  Globe,
  Calendar,
  Sparkles,
  Layers,
} from "lucide-react";
import { AdminStore } from "@/lib/admin/admin-store";
import { BlogPost, ContentLocale } from "@/lib/admin/types";
import { useAdminAuth } from "@/lib/admin/auth-context";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/admin/ui/card";
import { Button } from "@/components/admin/ui/button";
import { Input } from "@/components/admin/ui/input";
import { Textarea } from "@/components/admin/ui/textarea";
import { Tabs } from "@/components/admin/ui/tabs";
import { Switch } from "@/components/admin/ui/switch";
import { Badge } from "@/components/admin/ui/badge";
import { MarkdownEditor } from "./MarkdownEditor";
import { useToast } from "@/components/admin/ui/toast";

interface BlogEditorFormProps {
  initialPost?: BlogPost;
  isNew?: boolean;
}

const PRESET_IMAGES = [
  { label: "Double Jersey Machine", url: "/images/machines/double-jersey-01.png" },
  { label: "Single Jersey Machine", url: "/images/machines/single-jersey-01.png" },
  { label: "Interlock Machine", url: "/images/machines/interlock-01.png" },
  { label: "Jacquard Circular", url: "/images/machines/jacquard-01.png" },
  { label: "Factory Commissioning", url: "/images/machines/installation-01.png" },
];

const CATEGORIES = [
  "Technical Sourcing",
  "Quality Assurance",
  "Maintenance",
  "Knitting Technology",
  "Industry News",
  "Commercial & Shipping",
];

export function BlogEditorForm({ initialPost, isNew = false }: BlogEditorFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { contentLocale, setContentLocale } = useAdminAuth();

  // Active form tab: either "en" or "bn"
  const [activeTab, setActiveTab] = useState<ContentLocale>(contentLocale || "en");

  // Keep local active tab in sync if top bar content locale changes
  useEffect(() => {
    if (contentLocale) setActiveTab(contentLocale);
  }, [contentLocale]);

  // Form State
  const [post, setPost] = useState<Omit<BlogPost, "id"> & { id?: string }>(() => {
    if (initialPost) return { ...initialPost };
    const today = new Date().toISOString().split("T")[0];
    return {
      title_en: "",
      title_bn: "",
      slug_en: "",
      slug_bn: "",
      cover_image: "/images/machines/double-jersey-01.png",
      excerpt_en: "",
      excerpt_bn: "",
      body_en: "",
      body_bn: "",
      category: "Technical Sourcing",
      tags: ["Machinery Sourcing"],
      seo_title_en: "",
      seo_title_bn: "",
      seo_desc_en: "",
      seo_desc_bn: "",
      status: "draft",
      published_at: today,
      updated_at: today,
      author: "Admin Staff",
    };
  });

  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);

  // Auto-generate slug from title if slug has not been manually edited
  const handleTitleChange = (val: string, locale: ContentLocale) => {
    const slugKey = locale === "en" ? "slug_en" : "slug_bn";
    const titleKey = locale === "en" ? "title_en" : "title_bn";

    const autoSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setPost((prev) => ({
      ...prev,
      [titleKey]: val,
      // Auto-update slug if empty or previously generated
      [slugKey]: prev[slugKey] === "" || prev[slugKey] === autoSlug.slice(0, -1) ? autoSlug : prev[slugKey],
    }));
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    if (!post.tags.includes(tagInput.trim())) {
      setPost((prev) => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setPost((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }));
  };

  const handleSave = async (targetStatus?: "draft" | "published") => {
    // Validation
    if (!post.title_en.trim() && !post.title_bn.trim()) {
      toast({
        type: "error",
        message: "Title required",
        description: "Please enter a title in at least one language (EN or BN).",
      });
      return;
    }

    setSaving(true);
    const finalStatus = targetStatus || post.status;
    const now = new Date().toISOString().split("T")[0];

    const postToSave = {
      ...post,
      status: finalStatus,
      published_at: finalStatus === "published" && !post.published_at ? now : post.published_at,
    };

    const saved = AdminStore.saveBlogPost(postToSave);
    setSaving(false);

    toast({
      type: "success",
      message: finalStatus === "published" ? "Post published!" : "Draft saved successfully",
      description: `"${saved.title_en || saved.title_bn}" has been saved.`,
    });

    if (isNew) {
      router.push(`/admin/blog/${saved.id}`);
    } else {
      setPost(saved);
    }
  };

  // Language Completeness Badges
  const isEnComplete = Boolean(post.title_en.trim() && post.body_en.trim());
  const isBnComplete = Boolean(post.title_bn.trim() && post.body_bn.trim());

  const tabItems = [
    {
      key: "en",
      label: "English Content",
      badge: (
        <Badge variant={isEnComplete ? "success" : "warning"} size="sm">
          {isEnComplete ? "EN ✓" : "EN Incomplete"}
        </Badge>
      ),
    },
    {
      key: "bn",
      label: "Bengali Content (বাংলা)",
      badge: (
        <Badge variant={isBnComplete ? "success" : "warning"} size="sm">
          {isBnComplete ? "BN ✓" : "BN Incomplete"}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Back and Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/blog">
            <button
              type="button"
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          </Link>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {isNew ? "Create Technical Article" : `Edit: ${post.title_en || post.title_bn || "Article"}`}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Bilingual technical post editor with live markdown preview and SEO parameters.
            </p>
          </div>
        </div>

        {/* Action Buttons Top */}
        <div className="flex items-center gap-2">
          {/* Public Preview Button */}
          {post.slug_en && (
            <Link
              href={`/blog/${post.slug_en}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="gap-1.5 shadow-2xs">
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Preview</span>
              </Button>
            </Link>
          )}

          <Button
            variant="secondary"
            size="sm"
            disabled={saving}
            onClick={() => handleSave("draft")}
          >
            Save Draft
          </Button>

          <Button
            variant="default"
            size="sm"
            disabled={saving}
            onClick={() => handleSave("published")}
            className="gap-1.5 shadow-xs font-semibold"
          >
            <CheckCircle className="h-4 w-4" />
            <span>Publish</span>
          </Button>
        </div>
      </div>

      {/* Main Grid: Form Left (2 cols) & Publication Sidebar Right (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Language Tabs and Fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bilingual EN / BN Tab Switcher (Section 4 requirement) */}
          <div className="bg-white p-2 sm:p-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <Tabs
              items={tabItems}
              activeKey={activeTab}
              onChange={(k) => {
                const loc = k as ContentLocale;
                setActiveTab(loc);
                setContentLocale(loc);
              }}
            />
            <span className="text-xs text-slate-400 hidden sm:inline">
              Fills one language tab, then switches to the other.
            </span>
          </div>

          {/* Tab 1: English Content */}
          {activeTab === "en" && (
            <Card className="rounded-2xl p-5 sm:p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">
                  English Fields (EN)
                </h3>
                <Badge variant={isEnComplete ? "success" : "warning"} size="sm">
                  {isEnComplete ? "Ready for Publish" : "Missing Title or Body"}
                </Badge>
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Article Title (EN) *
                </label>
                <Input
                  value={post.title_en}
                  onChange={(e) => handleTitleChange(e.target.value, "en")}
                  placeholder="e.g. Circular Knitting Machine Gauge (G) Selection Guide..."
                />
              </div>

              {/* Slug */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700 block">
                    URL Slug (EN)
                  </label>
                  <span className="text-[11px] text-slate-400 font-mono">
                    /blog/{post.slug_en || "slug"}
                  </span>
                </div>
                <Input
                  value={post.slug_en}
                  onChange={(e) => setPost((prev) => ({ ...prev, slug_en: e.target.value }))}
                  placeholder="circular-knitting-gauge-selection"
                  className="font-mono text-xs"
                />
              </div>

              {/* Excerpt */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Short Excerpt / Lead Summary (EN)
                </label>
                <Textarea
                  value={post.excerpt_en}
                  onChange={(e) => setPost((prev) => ({ ...prev, excerpt_en: e.target.value }))}
                  placeholder="Brief 2-sentence overview displayed on card listings..."
                  className="min-h-[70px]"
                />
              </div>

              {/* Body (Markdown Editor) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Article Body in Markdown (EN) *
                  </label>
                  <span className="text-[11px] text-slate-400">
                    Supports formatting toolbar and live preview
                  </span>
                </div>
                <MarkdownEditor
                  value={post.body_en}
                  onChange={(val) => setPost((prev) => ({ ...prev, body_en: val }))}
                  placeholder="Write full article in Markdown format..."
                  minHeight="350px"
                />
              </div>

              {/* SEO Title & Description */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Search Engine Optimization (EN)
                </h4>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700 block">
                      SEO Meta Title
                    </label>
                    <span
                      className={`text-[11px] ${
                        post.seo_title_en.length > 60 ? "text-amber-600 font-semibold" : "text-slate-400"
                      }`}
                    >
                      {post.seo_title_en.length}/60 chars
                    </span>
                  </div>
                  <Input
                    value={post.seo_title_en}
                    onChange={(e) => setPost((prev) => ({ ...prev, seo_title_en: e.target.value }))}
                    placeholder="e.g. Circular Knitting Gauge Guide | Tasneem Knit Industry"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700 block">
                      SEO Meta Description
                    </label>
                    <span
                      className={`text-[11px] ${
                        post.seo_desc_en.length > 160 ? "text-amber-600 font-semibold" : "text-slate-400"
                      }`}
                    >
                      {post.seo_desc_en.length}/160 chars
                    </span>
                  </div>
                  <Textarea
                    value={post.seo_desc_en}
                    onChange={(e) => setPost((prev) => ({ ...prev, seo_desc_en: e.target.value }))}
                    placeholder="Search snippet summary (~150-160 characters)..."
                    className="min-h-[70px]"
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Tab 2: Bengali Content */}
          {activeTab === "bn" && (
            <Card className="rounded-2xl p-5 sm:p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">
                  বাংলা ফিল্ড সমূহ (Bengali - BN)
                </h3>
                <Badge variant={isBnComplete ? "success" : "warning"} size="sm">
                  {isBnComplete ? "বাংলা সম্পন্ন (BN ✓)" : "বাংলা অপূর্ণ (BN ✗)"}
                </Badge>
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  নিবন্ধের শিরোনাম (বাংলা) *
                </label>
                <Input
                  value={post.title_bn}
                  onChange={(e) => handleTitleChange(e.target.value, "bn")}
                  placeholder="যেমন: সার্কুলার নিটিং মেশিন গেজ ও সিলিন্ডার নির্বাচন নির্দেশিকা..."
                />
              </div>

              {/* Slug */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700 block">
                    ইউআরএল স্লাগ (বাংলা বিকল্প)
                  </label>
                  <span className="text-[11px] text-slate-400 font-mono">
                    /blog/{post.slug_bn || "slug-bn"}
                  </span>
                </div>
                <Input
                  value={post.slug_bn}
                  onChange={(e) => setPost((prev) => ({ ...prev, slug_bn: e.target.value }))}
                  placeholder="circular-knitting-gauge-guide-bn"
                  className="font-mono text-xs"
                />
              </div>

              {/* Excerpt */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  সংক্ষিপ্ত সারাংশ (বাংলা)
                </label>
                <Textarea
                  value={post.excerpt_bn}
                  onChange={(e) => setPost((prev) => ({ ...prev, excerpt_bn: e.target.value }))}
                  placeholder="কার্ড লিস্টে প্রদর্শনের জন্য ২ বাক্যের সংক্ষিপ্ত সারমর্ম..."
                  className="min-h-[70px]"
                />
              </div>

              {/* Body (Markdown Editor) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700 block">
                    নিবন্ধের মূল বডি (মার্কডাউন ফরম্যাট - বাংলা) *
                  </label>
                  <span className="text-[11px] text-slate-400">
                    টুলবার ও লাইভ প্রিভিউ সমর্থিত
                  </span>
                </div>
                <MarkdownEditor
                  value={post.body_bn}
                  onChange={(val) => setPost((prev) => ({ ...prev, body_bn: val }))}
                  placeholder="সম্পূর্ণ নিবন্ধটি বাংলায় মার্কডাউন ফরম্যাটে লিখুন..."
                  minHeight="350px"
                />
              </div>

              {/* SEO Title & Description */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  সার্চ ইঞ্জিন অপটিমাইজেশন (SEO - বাংলা)
                </h4>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700 block">
                      এসইও মেটা টাইটেল (বাংলা)
                    </label>
                    <span className="text-[11px] text-slate-400">
                      {post.seo_title_bn.length}/60 বর্ণ
                    </span>
                  </div>
                  <Input
                    value={post.seo_title_bn}
                    onChange={(e) => setPost((prev) => ({ ...prev, seo_title_bn: e.target.value }))}
                    placeholder="সার্কুলার নিটিং নির্দেশিকা | তাসনীম নিট ইন্ডাস্ট্রি"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700 block">
                      এসইও মেটা ডেসক্রিপশন (বাংলা)
                    </label>
                    <span className="text-[11px] text-slate-400">
                      {post.seo_desc_bn.length}/160 বর্ণ
                    </span>
                  </div>
                  <Textarea
                    value={post.seo_desc_bn}
                    onChange={(e) => setPost((prev) => ({ ...prev, seo_desc_bn: e.target.value }))}
                    placeholder="গুগল সার্চ ফলাফলের জন্য সংক্ষিপ্ত সারাংশ..."
                    className="min-h-[70px]"
                  />
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Right Column: Publication, Cover Image, Taxonomy Sidebar */}
        <div className="space-y-6">
          {/* Publication Status Card */}
          <Card className="rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2.5">
              Publication Settings
            </h3>

            {/* Status Toggle Switch */}
            <div className="pt-1">
              <Switch
                checked={post.status === "published"}
                onCheckedChange={(checked) =>
                  setPost((prev) => ({
                    ...prev,
                    status: checked ? "published" : "draft",
                  }))
                }
                label={`Status: ${post.status === "published" ? "Published" : "Draft"}`}
                description={
                  post.status === "published"
                    ? "Visible on public resources"
                    : "Hidden from public website"
                }
              />
            </div>

            {/* Publish Date */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>Publish Date</span>
              </label>
              <Input
                type="date"
                value={post.published_at || ""}
                onChange={(e) => setPost((prev) => ({ ...prev, published_at: e.target.value }))}
                className="text-xs"
              />
            </div>

            {/* Author */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">Author Credit</label>
              <Input
                value={post.author}
                onChange={(e) => setPost((prev) => ({ ...prev, author: e.target.value }))}
                placeholder="e.g. Technical Division"
                className="text-xs"
              />
            </div>

            {/* Actions Card Footer */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <Button
                type="button"
                onClick={() => handleSave("published")}
                disabled={saving}
                className="w-full font-semibold shadow-xs"
              >
                <CheckCircle className="h-4 w-4" />
                <span>{post.status === "published" ? "Update Published Post" : "Publish Post"}</span>
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={() => handleSave("draft")}
                disabled={saving}
                className="w-full text-xs"
              >
                Save as Draft
              </Button>

              {post.slug_en && (
                <Link
                  href={`/blog/${post.slug_en}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button variant="outline" size="sm" className="w-full text-xs gap-1.5">
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Preview in Live Site Layout ↗</span>
                  </Button>
                </Link>
              )}
            </div>
          </Card>

          {/* Cover Image Selector */}
          <Card className="rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2.5 flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-slate-400" />
              <span>Cover Image</span>
            </h3>

            {/* Preview Box */}
            <div className="relative h-36 w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
              {post.cover_image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.cover_image}
                  alt="Post cover preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-xs text-slate-400">No image chosen</span>
              )}
            </div>

            {/* Preset Image Picker */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                Quick Select Machinery Preset
              </label>
              <select
                value={post.cover_image}
                onChange={(e) => setPost((prev) => ({ ...prev, cover_image: e.target.value }))}
                className="w-full h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
              >
                {PRESET_IMAGES.map((img) => (
                  <option key={img.url} value={img.url}>
                    {img.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Image URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                Or Custom Image URL
              </label>
              <Input
                value={post.cover_image}
                onChange={(e) => setPost((prev) => ({ ...prev, cover_image: e.target.value }))}
                placeholder="/images/machines/custom.jpg"
                className="text-xs font-mono"
              />
            </div>
          </Card>

          {/* Category & Tags */}
          <Card className="rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2.5 flex items-center gap-2">
              <Tag className="h-4 w-4 text-slate-400" />
              <span>Taxonomy & Tags</span>
            </h3>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">Category</label>
              <select
                value={post.category}
                onChange={(e) => setPost((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">Article Tags</label>
              <div className="flex gap-1.5">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="Type tag & press Enter..."
                  className="text-xs"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleAddTag}
                >
                  Add
                </Button>
              </div>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-slate-400 hover:text-red-600 font-bold ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
