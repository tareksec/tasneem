"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Star, CheckCircle2, ArrowRight, MessageSquareQuote } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Review } from "@/lib/types";
import { adminStore } from "@/lib/admin/admin-store";

interface ReviewsMarqueeSectionProps {
  initialReviews?: Review[];
}

export function ReviewsMarqueeSection({
  initialReviews = [],
}: ReviewsMarqueeSectionProps) {
  const { locale } = useTranslation();
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  useEffect(() => {
    // If no initial reviews were provided from server, load from adminStore or fetch
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
          .catch((err) => console.error("Failed to load reviews:", err));
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

  // Only display approved reviews
  const approvedList = reviews.filter((r) => r.status === "approved");

  if (approvedList.length === 0) {
    return null;
  }

  // Multiply items for continuous marquee loop
  const marqueeItems = [
    ...approvedList,
    ...approvedList,
    ...approvedList,
    ...approvedList,
  ];

  return (
    <section className="w-full bg-[#FAFBFD] py-20 sm:py-24 border-t border-b border-[#E5E7EB] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF2F4] border border-[#D8A4AF]/40 text-[#800020] text-xs font-semibold mb-3">
              <MessageSquareQuote className="w-3.5 h-3.5" />
              <span>
                {locale === "bn"
                  ? "গ্রাহক সন্তুষ্টি ও কারখানা পর্যবেক্ষণ"
                  : "Client Feedback & Field Reports"}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2D2D2D] tracking-tight">
              {locale === "bn"
                ? "বাংলাদেশের টেক্সটাইল ও নিটিং মিলের আস্থা"
                : "Trusted by Textile & Knitting Leaders"}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#4A4A4A] leading-relaxed">
              {locale === "bn"
                ? "আমদানি লজিস্টিকস ও কারখানায় অন-সাইট কমিশনিং নিয়ে গ্রাহকদের বাস্তব অভিজ্ঞতা।"
                : "Verified factory testimonials on CFR Chattogram imports and turnkey mill commissioning."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#800020] text-[#800020] hover:bg-[#800020] hover:text-white font-medium text-sm transition-all duration-200 shadow-2xs group"
            >
              <span>{locale === "bn" ? "সকল রিভিউ দেখুন" : "View All Reviews"}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Marquee Container with Soft Fade Left and Right */}
      <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_48px,_black_calc(100%-48px),transparent_100%)] mask-[linear-gradient(to_right,transparent_0,black_48px,black_calc(100%-48px),transparent_100%)] group/track">
        {/* Track 1 */}
        <ul className="flex items-center justify-center md:justify-start gap-5 sm:gap-6 shrink-0 animate-infinite-scroll group-hover/track:[animation-play-state:paused] pr-5 sm:pr-6">
          {marqueeItems.map((review, idx) => {
            const isClone = idx >= approvedList.length;
            return (
              <li
                key={`track1-rev-${review.id}-${idx}`}
                className="shrink-0"
                aria-hidden={isClone ? "true" : undefined}
              >
                <ReviewCard review={review} />
              </li>
            );
          })}
        </ul>

        {/* Track 2 (Duplicate for Seamless Loop) */}
        <ul
          aria-hidden="true"
          className="flex items-center justify-center md:justify-start gap-5 sm:gap-6 shrink-0 animate-infinite-scroll group-hover/track:[animation-play-state:paused] pr-5 sm:pr-6"
        >
          {marqueeItems.map((review, idx) => (
            <li key={`track2-rev-${review.id}-${idx}`} className="shrink-0">
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const isPlaceholder =
    review.name.includes("PLACEHOLDER") ||
    (review.company && review.company.includes("PLACEHOLDER")) ||
    review.message.includes("PLACEHOLDER");

  // Clean placeholder tag for clean presentation if desired, or retain transparent indicator
  const cleanMessage = review.message.replace(/\[SAMPLE \/ FACTORY PARTNER PLACEHOLDER\]\s*/g, "");
  const cleanCompany = review.company ? review.company.replace(/\[SAMPLE \/ FACTORY PARTNER PLACEHOLDER\]\s*/g, "") : null;

  return (
    <div className="w-[300px] sm:w-[350px] p-5 sm:p-6 bg-white border border-[#E5E7EB] hover:border-[#D8A4AF] rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[210px] text-left relative">
      <div>
        {/* Star Rating Header */}
        <div className="flex items-center justify-between mb-3">
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
          {isPlaceholder && (
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-100 text-neutral-500 border border-neutral-200">
              Sample
            </span>
          )}
        </div>

        {/* Review Text */}
        <p className="text-sm text-[#4A4A4A] line-clamp-3 leading-relaxed">
          &ldquo;{cleanMessage}&rdquo;
        </p>
      </div>

      {/* Reviewer Details */}
      <div className="pt-3 border-t border-[#F3F4F6] flex items-center justify-between">
        <div className="min-w-0 pr-2">
          <p className="text-sm font-semibold text-[#2D2D2D] truncate">
            {review.name}
          </p>
          {cleanCompany && (
            <p className="text-xs text-[#717171] truncate">
              {cleanCompany}
            </p>
          )}
        </div>
        <div className="shrink-0 text-emerald-600" title="Verified Customer">
          <CheckCircle2 className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

export default ReviewsMarqueeSection;
