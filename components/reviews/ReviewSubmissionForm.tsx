"use client";

import React, { useState, useEffect } from "react";
import { Star, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { adminStore } from "@/lib/admin/admin-store";
import { Review } from "@/lib/types";

interface ReviewSubmissionFormProps {
  onSuccess?: (review?: Review) => void;
  onCancel?: () => void;
  isModal?: boolean;
}

export function ReviewSubmissionForm({
  onSuccess,
  onCancel,
  isModal = false,
}: ReviewSubmissionFormProps) {
  const { locale } = useTranslation();

  // Form State
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // UI State
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    // Clear any previous legacy 24-hour lock from client storage
    try {
      localStorage.removeItem("tasneem_last_review_submitted");
    } catch {
      // Storage unavailable or disabled
    }
  }, []);

  const getRatingLabel = (stars: number) => {
    switch (stars) {
      case 5:
        return locale === "bn" ? "৫ স্টার — অসাধারণ" : "5 Stars — Excellent";
      case 4:
        return locale === "bn" ? "৪ স্টার — খুব ভালো" : "4 Stars — Very Good";
      case 3:
        return locale === "bn" ? "৩ স্টার — সন্তোষজনক" : "3 Stars — Satisfactory";
      case 2:
        return locale === "bn" ? "২ স্টার — সাধারণ" : "2 Stars — Fair";
      case 1:
        return locale === "bn" ? "১ স্টার — উন্নতি প্রয়োজন" : "1 Star — Needs Improvement";
      default:
        return "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!name.trim()) {
      setErrorMessage(
        locale === "bn"
          ? "অনুগ্রহ করে আপনার নাম প্রদান করুন।"
          : "Please enter your name."
      );
      return;
    }

    if (!message.trim() || message.trim().length < 10) {
      setErrorMessage(
        locale === "bn"
          ? "রিভিউ বার্তাটিতে কমপক্ষে ১০টি অক্ষর লিখুন।"
          : "Please write at least 10 characters for your review message."
      );
      return;
    }

    const combined = `${name} ${message}`.toLowerCase();
    const garbagePatterns = [
      "pendingdiffsession",
      "floatingwidget",
      "dsfbhsdbdb",
      "console.",
      "typeerror",
      "400 (bad request)",
      "net::err",
      "net::",
      "[object object]",
      "webpack",
      "evalmachine",
      "stack trace",
    ];
    if (garbagePatterns.some((p) => combined.includes(p)) || /^[bcdfghjklmnpqrstvwxyz]{8,}$/i.test(message.trim())) {
      setErrorMessage(
        locale === "bn"
          ? "সঠিক টেক্সট লিখুন। কোনো কনসোল লগ বা এরর কোড গ্রহণযোগ্য নয়।"
          : "Please enter valid review feedback. Debug/console text is not permitted."
      );
      return;
    }

    setLoading(true);

    try {
      // 1. Submit to public API
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          company: company.trim() || null,
          rating,
          message: message.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to submit review.");
      }

      // 2. Also save to adminStore on client for immediate offline/local admin preview
      const createdReview = adminStore.addReview({
        name: name.trim(),
        company: company.trim() || null,
        rating,
        message: message.trim(),
        status: "pending",
        id: result.review?.id,
      });

      setSuccess(true);

      if (onSuccess) {
        onSuccess(createdReview);
      }
    } catch (err: any) {
      console.error("Review submission error:", err);
      setErrorMessage(
        err.message ||
          (locale === "bn"
            ? "রিভিউ পাঠাতে ত্রুটি হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।"
            : "Failed to submit review. Please try again.")
      );
    } finally {
      setLoading(false);
    }
  };

  // Success Feedback
  if (success) {
    return (
      <div className="bg-[#FAFBFD] border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center animate-in fade-in">
        <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-[#2D2D2D] mb-2">
          {locale === "bn" ? "রিভিউ সফলভাবে জমা হয়েছে!" : "Review Submitted!"}
        </h3>
        <p className="text-sm text-[#4A4A4A] max-w-md mb-6 leading-relaxed">
          {locale === "bn"
            ? "ধন্যবাদ! আপনার রিভিউটি আমাদের অ্যাডমিন প্যানেলে যাচাইয়ের জন্য পাঠানো হয়েছে। অনুমোদনের পর এটি ওয়েবসাইটে দৃশ্যমান হবে।"
            : "Thank you! Your feedback has been sent to our moderation queue and will appear publicly once verified by our team."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setSuccess(false);
              setName("");
              setCompany("");
              setMessage("");
              setRating(5);
            }}
            className="px-4 py-2 border border-neutral-300 hover:border-[#800020] text-[#2D2D2D] hover:text-[#800020] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            {locale === "bn" ? "আরেকটি রিভিউ দিন" : "Submit Another Review"}
          </button>
          {onCancel && isModal && (
            <button
              type="button"
              onClick={onCancel}
              className="btn-primary"
            >
              {locale === "bn" ? "সম্পন্ন" : "Done"}
            </button>
          )}
        </div>
      </div>
    );
  }

  const activeStar = hoverRating || rating;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#2D2D2D]">
          {locale === "bn" ? "আপনার অভিজ্ঞতা শেয়ার করুন" : "Share Your Experience"}
        </h3>
        <p className="text-xs sm:text-sm text-[#717171] mt-1">
          {locale === "bn"
            ? "মেশিনের পারফরম্যান্স, আমদানি লজিস্টিকস কিংবা টেকনিক্যাল সার্ভিস নিয়ে আপনার বাস্তব রিভিউ লিখুন।"
            : "Tell us about machine performance, CFR Chattogram import support, or technical commissioning."}
        </p>
      </div>

      {errorMessage && (
        <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Interactive Star Rating */}
      <div className="mb-5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#2D2D2D] mb-2">
          {locale === "bn" ? "রেটিং নির্বাচন করুন *" : "Overall Rating *"}
        </label>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 rounded-md hover:bg-neutral-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]"
              aria-label={`${star} star rating`}
            >
              <Star
                className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                  star <= activeStar
                    ? "text-amber-400 fill-amber-400 scale-105"
                    : "text-neutral-300"
                }`}
              />
            </button>
          ))}
          <span className="ml-3 text-xs font-medium text-[#4A4A4A]">
            {getRatingLabel(activeStar)}
          </span>
        </div>
      </div>

      {/* Grid: Name & Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="review-name"
            className="block text-xs font-semibold text-[#2D2D2D] mb-1.5"
          >
            {locale === "bn" ? "আপনার নাম *" : "Your Name *"}
          </label>
          <input
            id="review-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={
              locale === "bn"
                ? "যেমন: ইঞ্জিনিয়ার তরিকুল ইসলাম"
                : "e.g. Engr. Tariqul Islam"
            }
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] bg-[#FAFBFD] focus:bg-white focus:border-[#800020] focus:ring-1 focus:ring-[#800020] text-sm text-[#2D2D2D] outline-none transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="review-company"
            className="block text-xs font-semibold text-[#2D2D2D] mb-1.5"
          >
            {locale === "bn" ? "কারখানা / পদবী (ঐচ্ছিক)" : "Company / Designation (Optional)"}
          </label>
          <input
            id="review-company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder={
              locale === "bn"
                ? "যেমন: অ্যাপেক্স টেক্সটাইল মিলস লি."
                : "e.g. Apex Textile Mills Ltd."
            }
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] bg-[#FAFBFD] focus:bg-white focus:border-[#800020] focus:ring-1 focus:ring-[#800020] text-sm text-[#2D2D2D] outline-none transition-all"
          />
        </div>
      </div>

      {/* Message Textarea */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor="review-message"
            className="block text-xs font-semibold text-[#2D2D2D]"
          >
            {locale === "bn" ? "আপনার রিভিউ বার্তা *" : "Your Review Message *"}
          </label>
          <span className="text-[11px] text-neutral-400 font-mono">
            {message.length} / 1000
          </span>
        </div>
        <textarea
          id="review-message"
          rows={4}
          maxLength={1000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            locale === "bn"
              ? "মেশিনারি সার্ভিস, টেকনিক্যাল সাপোর্ট ও ডেলিভারি নিয়ে আপনার সুস্পষ্ট মতামত লিখুন..."
              : "Share your experience regarding machine delivery, inspection, factory installation, or production performance..."
          }
          required
          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] bg-[#FAFBFD] focus:bg-white focus:border-[#800020] focus:ring-1 focus:ring-[#800020] text-sm text-[#2D2D2D] outline-none transition-all resize-none"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-2">
        {onCancel && isModal && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2.5 rounded-full border border-neutral-200 text-neutral-600 hover:bg-neutral-50 text-sm font-medium transition-colors"
          >
            {locale === "bn" ? "বাতিল" : "Cancel"}
          </button>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary inline-flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{locale === "bn" ? "জমা হচ্ছে..." : "Submitting..."}</span>
            </>
          ) : (
            <span>{locale === "bn" ? "রিভিউ জমা দিন" : "Submit Review"}</span>
          )}
        </button>
      </div>
    </form>
  );
}

export default ReviewSubmissionForm;
