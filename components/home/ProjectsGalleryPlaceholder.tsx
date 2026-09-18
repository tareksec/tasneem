"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MotionSection } from "@/components/ui/MotionWrapper";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { usePublishedProjects } from "@/components/projects/usePublishedProjects";
import { ProjectGalleryGrid } from "@/components/projects/ProjectGalleryGrid";

export function ProjectsGalleryPlaceholder() {
  const { locale } = useTranslation();
  const { items: publishedItems } = usePublishedProjects();

  if (publishedItems.length === 0) return null;

  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-white border-b border-[#E5E5E5] text-[#2D2D2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MotionSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="max-w-3xl">
            <span className="sr-only">
              {locale === "bn" ? "বাস্তব কাজের প্রমাণ" : "Field Verification"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight leading-[1.35] text-balance text-[#2D2D2D]">
              {locale === "bn" ? "সরাসরি ফ্যাক্টরি ইনস্টলেশন ও প্রজেক্ট গ্যালারি" : "Projects & Installation Gallery"}
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#4A4A4A] max-w-xl">
              {locale === "bn"
                ? "দেশের শীর্ষ টেক্সটাইল মিলগুলোতে আমাদের সরবরাহকৃত মেশিনের বাস্তব চিত্র।"
                : "Verified industrial machinery installations operating in textile mills across Bangladesh."}
            </p>
          </div>
          <Link href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2D2D2D] hover:text-[#800020] transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-md px-1">
            <span>{locale === "bn" ? "সকল প্রজেক্ট দেখুন" : "View All Projects"}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </MotionSection>
        <ProjectGalleryGrid items={publishedItems.slice(0, 6)} />
      </div>
    </section>
  );
}
