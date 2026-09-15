"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Star,
  CheckCircle2,
  ArrowLeft,
  PenLine,
  MessageSquareQuote,
  ShieldCheck,
  Building2,
  Calendar,
  X,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Review } from "@/lib/types";
import { adminStore } from "@/lib/admin/admin-store";
import { ReviewSubmissionForm } from "./ReviewSubmissionForm";

interface ReviewsViewProps {
  initialReviews?: Review[];
}

export function ReviewsView({ initialReviews = [] }: ReviewsViewProps) {
  const { locale } = useTranslation();
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "5" | "4">("all");

  useEffect(() => {
    // If no initial reviews from SSR, fetch from API / adminStore
    if (initialReviews.length === 0) {
      const stored = adminStore.getApprovedReviews();
      if (stored && stored.length > 0) {
        setReviews(stored);
      } else {
        fetch("/api/reviews")
          .then((res) => res.json())
          .then((data) => {
            if (data.success && Array.isArray(data.reviews) && data.reviews.length > 0) {
              setReviews(data.reviews);
            }
          })
          .catch((err) => console.error("Error fetching reviews:", err));
      }
    }

    const handleStoreUpdate = () => {
      const stored = adminStore.getApprovedReviews();
      if (stored && stored.length > 0) {
        setReviews(stored);
      }
    };

    window.addEventListener("tasneem-store-updated", handleStoreUpdate);
    return () => window.removeEventListener("tasneem-store-updated", handleStoreUpdate);
  }, [initialReviews]);

  const approvedReviews = reviews.filter((r) => r.status === "approved");

  // Filtering
  const filteredReviews = approvedReviews.filter((r) => {
    if (activeFilter === "5") return r.rating === 5;
    if (activeFilter === "4") return r.rating === 4;
    return true;
  });

  // Calculate Average Rating & Counts
  const totalReviews = approvedReviews.length;
  const averageRating =
    totalReviews > 0
      ? (
          approvedReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        ).toFixed(1)
      : "5.0";

  const fiveStarCount = approvedReviews.filter((r) => r.rating === 5).length;
  const fourStarCount = approvedReviews.filter((r) => r.rating === 4).length;

  return (
    <div className="py-12 sm:py-20 bg-white text-[#2D2D2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4B5563] hover:text-[#800020] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{locale === "bn" ? "হোম পেজে ফিরে যান" : "Back to Home"}</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="border-b border-[#E5E7EB] pb-10 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FDF2F4] text-[#800020] border border-[#D8A4AF] mb-4">
                <MessageSquareQuote className="w-3.5 h-3.5" />
                <span>
                  {locale === "bn"
                    ? "যাচাইকৃত গ্রাহক অভিজ্ঞতা"
                    : "Verified Client Feedback"}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#2D2D2D] leading-tight">
                {locale === "bn"
                  ? "গ্রাহকদের রিভিউ ও প্রতিক্রিয়া"
                  : "Client Reviews & Testimonials"}
              </h1>
              <p className="mt-4 text-sm sm:text-base text-[#4B5563] leading-relaxed">
                {locale === "bn"
                  ? "সরাসরি আমদানি করা সার্কুলার নিটিং মেশিনারি, চট্টগ্রাম বন্দর ক্লিয়ারেন্স এবং কারখানায় টেকনিক্যাল কমিশনিং নিয়ে বাংলাদেশের বিভিন্ন মিলের বাস্তব অভিজ্ঞতা।"
                  : "Authentic field reviews from knitting factories and textile mill owners across Bangladesh regarding imported machinery performance and engineering support."}
              </p>
            </div>

            {/* Write a Review CTA Button */}
            <div className="shrink-0">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="btn-primary inline-flex items-center gap-2 text-sm font-semibold shadow-md hover:shadow-lg"
              >
                <PenLine className="w-4 h-4" />
                <span>{locale === "bn" ? "রিভিউ লিখুন" : "Write a Review"}</span>
              </button>
            </div>
          </div>

          {/* Rating Summary Bar */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-neutral-100">
            <div className="flex items-center gap-3 p-4 bg-[#FAFBFD] border border-[#E5E7EB] rounded-2xl">
              <div className="text-3xl font-extrabold text-[#2D2D2D]">{averageRating}</div>
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-[#717171] mt-0.5">
                  {locale === "bn"
                    ? `মোট ${totalReviews}টি যাচাইকৃত রিভিউ`
                    : `Based on ${totalReviews} verified reviews`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-[#FAFBFD] border border-[#E5E7EB] rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#2D2D2D]">
                  {locale === "bn" ? "১০০% ভেরিফায়েড বায়ার" : "100% Verified Buyers"}
                </p>
                <p className="text-xs text-[#717171]">
                  {locale === "bn"
                    ? "সরাসরি ফ্যাক্টরি অর্ডার ও বন্দর ডেলিভারি"
                    : "Factory mill owners & plant engineers"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-[#FAFBFD] border border-[#E5E7EB] rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-[#FDF2F4] text-[#800020] flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#2D2D2D]">
                  {locale === "bn" ? "সারাদেশে ডেলিভারি" : "Nationwide Coverage"}
                </p>
                <p className="text-xs text-[#717171]">
                  {locale === "bn"
                    ? "নারায়ণগঞ্জ, গাজীপুর, সাভার ও চট্টগ্রাম"
                    : "Narayanganj, Gazipur, Savar & CTG"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeFilter === "all"
                  ? "bg-[#800020] text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {locale === "bn" ? "সকল রিভিউ" : "All Reviews"} ({totalReviews})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("5")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1 ${
                activeFilter === "5"
                  ? "bg-[#800020] text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              <span>5</span>
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>({fiveStarCount})</span>
            </button>
            {fourStarCount > 0 && (
              <button
                type="button"
                onClick={() => setActiveFilter("4")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1 ${
                  activeFilter === "4"
                    ? "bg-[#800020] text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                <span>4</span>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>({fourStarCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* Reviews Grid */}
        {filteredReviews.length === 0 ? (
          <div className="border border-dashed border-[#E5E7EB] rounded-2xl p-12 text-center">
            <p className="text-[#717171] text-sm">
              {locale === "bn"
                ? "এই ক্যাটাগরিতে কোনো রিভিউ পাওয়া যায়নি।"
                : "No reviews found matching the selected filter."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review) => {
              const isPlaceholder =
                review.name.includes("PLACEHOLDER") ||
                (review.company && review.company.includes("PLACEHOLDER")) ||
                review.message.includes("PLACEHOLDER");

              const cleanMessage = review.message.replace(
                /\[SAMPLE \/ FACTORY PARTNER PLACEHOLDER\]\s*/g,
                ""
              );
              const cleanCompany = review.company
                ? review.company.replace(/\[SAMPLE \/ FACTORY PARTNER PLACEHOLDER\]\s*/g, "")
                : null;

              const formattedDate = new Date(review.createdAt).toLocaleDateString(
                locale === "bn" ? "bn-BD" : "en-US",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }
              );

              return (
                <article
                  key={review.id}
                  className="bg-white border border-[#E5E7EB] hover:border-[#D8A4AF] rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Stars & Date */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? "text-amber-400 fill-amber-400"
                                : "text-neutral-200"
                            }`}
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                        <Calendar className="w-3 h-3" />
                        <span>{formattedDate}</span>
                      </div>
                    </div>

                    {/* Review Body */}
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-6">
                      &ldquo;{cleanMessage}&rdquo;
                    </p>
                  </div>

                  {/* Footer: Reviewer Info */}
                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                    <div className="min-w-0 pr-2">
                      <p className="text-sm font-bold text-[#2D2D2D] truncate">
                        {review.name}
                      </p>
                      {cleanCompany && (
                        <p className="text-xs text-[#717171] truncate">
                          {cleanCompany}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {isPlaceholder && (
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-100 text-neutral-500 border border-neutral-200">
                          Sample
                        </span>
                      )}
                      <div
                        className="text-emerald-600"
                        title={
                          locale === "bn"
                            ? "যাচাইকৃত ক্লায়েন্ট"
                            : "Verified Client"
                        }
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Submission Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-neutral-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsModalOpen(false)}
            aria-hidden="true"
          />

          {/* Dialog Container */}
          <div className="relative w-full max-w-xl z-10 my-8">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>

              <ReviewSubmissionForm
                isModal
                onCancel={() => setIsModalOpen(false)}
                onSuccess={() => {
                  // Keep modal open to show success state, auto-refresh store
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewsView;
