"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  User,
  Tag,
  Share2,
  BookOpen,
  CheckCircle2,
  FileQuestion,
  Languages,
} from "lucide-react";
import { AdminStore } from "@/lib/admin/admin-store";
import { BlogPost, ContentLocale } from "@/lib/admin/types";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function PublicBlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { locale: publicLocale } = useTranslation();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [readingLocale, setReadingLocale] = useState<ContentLocale>(
    publicLocale === "en" ? "en" : "bn"
  );

  useEffect(() => {
    if (slug) {
      fetch(`/api/blog?slug=${encodeURIComponent(slug)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.post) {
            setPost(data.post);
          } else {
            const fallback = AdminStore.getBlogPostBySlug(slug) || AdminStore.getBlogPostById(slug);
            setPost(fallback || null);
          }
        })
        .catch(() => {
          const fallback = AdminStore.getBlogPostBySlug(slug) || AdminStore.getBlogPostById(slug);
          setPost(fallback || null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <p className="text-slate-500">Loading article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <FileQuestion className="h-14 w-14 text-slate-300 mx-auto" />
        <h1 className="text-2xl font-bold text-slate-900">Article Not Found</h1>
        <p className="text-sm text-slate-500">
          The requested technical publication was not found or is currently in draft.
        </p>
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#800020] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Resources</span>
        </Link>
      </div>
    );
  }

  const title = readingLocale === "en" ? post.title_en || post.title_bn : post.title_bn || post.title_en;
  const excerpt = readingLocale === "en" ? post.excerpt_en || post.excerpt_bn : post.excerpt_bn || post.excerpt_en;
  const body = readingLocale === "en" ? post.body_en || post.body_bn : post.body_bn || post.body_en;

  // Simple Markdown-to-HTML parser for public reading
  const renderContent = (content: string) => {
    return content
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-slate-900 mt-6 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-extrabold text-slate-900 mt-8 mb-4">$1</h1>')
      .replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-[#800020] pl-4 italic text-slate-700 my-4 bg-slate-50 py-2 rounded-r-lg">$1</blockquote>')
      .replace(/```([\s\S]*?)```/gim, '<pre class="bg-[#2D2D2D] text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto my-4">$1</pre>')
      .replace(/`([^`]+)`/gim, '<code class="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-slate-900">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#800020] underline hover:text-[#5A0017] font-medium">$1</a>')
      .replace(/^\- (.*$)/gim, '<li class="ml-5 list-disc text-slate-700 my-1 leading-relaxed">$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-5 list-decimal text-slate-700 my-1 leading-relaxed">$1</li>')
      .replace(/\n\n/gim, '<p class="my-4 text-slate-700 leading-relaxed"></p>');
  };

  return (
    <article className="min-h-screen bg-white py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation and Language Switcher */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-200">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#800020] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{readingLocale === "bn" ? "সব আর্টিকেলে ফিরুন" : "All Articles"}</span>
          </Link>

          {/* Bilingual Reading Mode Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <Languages className="h-3.5 w-3.5 text-slate-500 ml-1.5 hidden sm:inline" />
            <button
              onClick={() => setReadingLocale("en")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                readingLocale === "en"
                  ? "bg-white text-slate-900 shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setReadingLocale("bn")}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                readingLocale === "bn"
                  ? "bg-[#800020] text-white shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              বাংলা (BN)
            </button>
          </div>
        </div>

        {/* Article Header */}
        <header className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-[#800020] bg-[#FDF2F4] border border-[#D8A4AF] px-2.5 py-1 rounded-md">
              {post.category}
            </span>
            <span className="text-slate-400">•</span>
            <span className="flex items-center gap-1 text-slate-500">
              <Calendar className="h-3.5 w-3.5" />
              {post.published_at || "Recent"}
            </span>
            <span className="text-slate-400">•</span>
            <span className="flex items-center gap-1 text-slate-500">
              <User className="h-3.5 w-3.5" />
              {post.author}
            </span>
            {post.status === "draft" && (
              <span className="bg-amber-100 text-amber-800 border border-amber-300 font-bold px-2 py-0.5 rounded text-[11px]">
                PREVIEW ONLY (DRAFT)
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {title}
          </h1>

          {excerpt && (
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
              {excerpt}
            </p>
          )}
        </header>

        {/* Cover Image */}
        {post.cover_image && (
          <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden mb-10 border border-slate-200 bg-slate-100 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover_image}
              alt={title}
              onError={(e) => {
                e.currentTarget.src = "/images/machines/cat-double-jersey.jpg";
              }}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Body */}
        <div
          className="prose prose-slate max-w-none text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: renderContent(body) }}
        />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-slate-200">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Related Topics
            </span>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-lg border border-slate-200"
                >
                  <Tag className="h-3 w-3 text-slate-400" />
                  <span>{tag}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Commercial CTA */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-xs font-bold text-[#800020] uppercase tracking-wider">
              {readingLocale === "bn" ? "টেকনিক্যাল সোর্সিং সহায়তা প্রয়োজন?" : "Need Technical Sourcing Assistance?"}
            </span>
            <h3 className="text-xl font-bold text-white mt-1">
              {readingLocale === "bn" ? "আপনার মিলের জন্য সঠিক মেশিন নির্বাচন করুন" : "Configure Your Mill's Circular Knitting Line"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              {readingLocale === "bn"
                ? "সরাসরি ফ্যাক্টরি CFR Chattogram রেট, প্রি-শিপমেন্ট কোয়ালিটি অডিট এবং বাংলাদেশে ফ্যাক্টরি ফ্লোরে এসে কমিশনিং সহায়তা।"
                : "Factory-direct pricing, CFR Chattogram delivery, pre-shipment quality audit, and local commissioning in Bangladesh."}
            </p>
          </div>
          <Link
            href="/quote"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-[#800020] text-white font-semibold text-sm hover:bg-[#5A0017] transition-colors shadow-sm"
          >
            {readingLocale === "bn" ? "মেশিনের কোটেশন নিন" : "Request Machine Quote"}
          </Link>
        </div>
      </div>
    </article>
  );
}
