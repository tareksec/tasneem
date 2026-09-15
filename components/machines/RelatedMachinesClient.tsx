"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { MachineCard } from "@/components/machines/MachineCard";
import { Machine } from "@/lib/types";

interface RelatedMachinesClientProps {
  related: Machine[];
  category: string;
  categoryName: string;
  categoryNameBn?: string;
  totalCategoryCount: number;
}

export function RelatedMachinesClient({
  related,
  category,
  categoryName,
  categoryNameBn,
  totalCategoryCount,
}: RelatedMachinesClientProps) {
  const { locale } = useTranslation();

  const title =
    locale === "bn"
      ? `${categoryNameBn || categoryName} সম্পর্কিত অন্যান্য মডেল`
      : `Related ${categoryName} Models`;

  const subtitle =
    locale === "bn"
      ? "আপনার কারখানার লক্ষ্য অনুযায়ী সমজাতীয় সিলিন্ডার সাইজ, গেজ ও ফিডার কনফিগারেশন মিলিয়ে দেখুন।"
      : "Compare alternative cylinder diameters, gauges, and feeder configurations in this range.";

  const viewAllText =
    locale === "bn"
      ? `সব ${categoryNameBn || categoryName} মডেল দেখুন (${totalCategoryCount})`
      : `View all ${categoryName} models (${totalCategoryCount})`;

  return (
    <section className="mt-16 pt-12 border-t border-[#E5E5E5]" aria-labelledby="related-machines-heading">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 id="related-machines-heading" className="text-xl sm:text-2xl font-bold tracking-tight text-[#2D2D2D]">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-[#4A4A4A] mt-1">
            {subtitle}
          </p>
        </div>

        {totalCategoryCount > 1 && (
          <Link
            href={`/machines/${category}`}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#800020] hover:underline shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-sm transition-colors"
          >
            <span>{viewAllText}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Responsive Grid matching catalog pattern */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((machine) => (
          <MachineCard key={machine.id} machine={machine} />
        ))}
      </div>
    </section>
  );
}
