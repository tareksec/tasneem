"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Calendar, Clock, BookOpen, Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { adminStore } from "@/lib/admin/admin-store";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { BlogPost } from "@/lib/admin/types";

export default function PublicBlogPage() {
  const { locale } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [allPosts, setAllPosts] = useState<BlogPost[]>(() => {
    try {
      return adminStore.getBlogPosts().filter((p) => p.status === "published");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.posts) && data.posts.length > 0) {
          setAllPosts(data.posts);
        }
      })
      .catch((err) => console.error("Failed to load blog posts:", err));
  }, []);

  const categories = [
    { key: "All", name: locale === "bn" ? "সব আর্টিকেল" : "All Articles" },
    { key: "Technical Guide", name: locale === "bn" ? "টেকনিক্যাল গাইড" : "Technical Guides" },
    { key: "Import & Compliance", name: locale === "bn" ? "আমদানি ও L/C নিয়ম" : "Import & Compliance" },
    { key: "Maintenance & Parts", name: locale === "bn" ? "মেইনটেন্যান্স ও স্পেয়ার পার্টস" : "Maintenance & Parts" },
  ];

  const filteredPosts = allPosts.filter((post) => {
    const matchesCat = selectedCategory === "All" || post.category === selectedCategory;
    const title = locale === "bn" ? post.title_bn || post.title_en : post.title_en;
    const excerpt = locale === "bn" ? post.excerpt_bn || post.excerpt_en : post.excerpt_en;
    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-12 sm:py-20 bg-white text-neutral-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200 bg-neutral-50 text-xs font-semibold text-neutral-800 mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FF0000]" />
            <span>{locale === "bn" ? "টেকনিক্যাল তথ্য ও মার্কেট গাইড" : "Technical Knowledge & Sourcing Insights"}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950">
            {locale === "bn"
              ? "সার্কুলার নিটিং মেশিনারি ও টেক্সটাইল ব্লগ"
              : "Circular Knitting Machinery & Textile Blog"}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            {locale === "bn"
              ? "দেশের নিটওয়্যার ও কম্পোজিট মিলগুলোর জন্য সার্কুলার নিটিং মেশিনের কনফিগারেশন, সঠিক Gauge নির্বাচন, CFR Chattogram আমদানি এবং ফ্যাক্টরি মেইনটেন্যান্সের সহজ ও ব্যবহারিক টিপস।"
              : "Practical engineering guides, cylinder gauge selection, pre-shipment inspection standards, and import logistics for Bangladesh knitting and composite mills."}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-neutral-200 mb-10">
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.key
                    ? "bg-[#0A0A0A] text-white shadow-xs"
                    : "bg-neutral-100 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={locale === "bn" ? "আর্টিকেল বা বিষয় লিখে খুঁজুন..." : "Search articles..."}
              className="w-full pl-9 pr-4 py-2 rounded-full border border-neutral-200 bg-neutral-50 text-xs focus:bg-white focus:outline-none focus:border-neutral-950 transition-colors"
            />
          </div>
        </div>

        {/* Post Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-neutral-300 rounded-3xl bg-neutral-50">
            <BookOpen className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
            <p className="text-sm font-semibold text-neutral-700">
              {locale === "bn" ? "কোনো আর্টিকেল খুঁজে পাওয়া যায়নি" : "No articles found."}
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              {locale === "bn" ? "অন্য কোনো কি-ওয়ার্ড লিখে খুঁজুন অথবা সব আর্টিকেল ফিল্টারটি বেছে নিন।" : "Try another search term or reset your category filter."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => {
              const title = locale === "bn" ? post.title_bn || post.title_en : post.title_en;
              const excerpt = locale === "bn" ? post.excerpt_bn || post.excerpt_en : post.excerpt_en;
              const slug = locale === "bn" && post.slug_bn ? post.slug_bn : post.slug_en;

              return (
                <article
                  key={post.id}
                  className="group rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:border-neutral-300 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Cover Image */}
                    <div className="relative w-full h-48 bg-neutral-100 overflow-hidden">
                      <Image
                        src={post.cover_image}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-[#0A0A0A]/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                        {post.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-neutral-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{post.published_at}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-neutral-400" />
                          <span>5 min read</span>
                        </div>
                      </div>

                      <h2 className="text-lg font-bold text-neutral-950 group-hover:text-[#FF0000] transition-colors line-clamp-2 leading-snug">
                        <Link href={`/blog/${slug}`}>{title}</Link>
                      </h2>

                      <p className="mt-3 text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                        {excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-6 pt-2 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-400">
                      By Tasneem Engineering
                    </span>
                    <Link
                      href={`/blog/${slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-neutral-950 group-hover:text-[#FF0000] transition-colors"
                    >
                      <span>{locale === "bn" ? "পুরো আর্টিকেল পড়ুন" : "Read Article"}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
