"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Gauge, Layers, SlidersHorizontal } from "lucide-react";
import { MotionSection, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Machine } from "@/lib/types";

export function FeaturedMachines({ initialMachines }: { initialMachines?: Machine[] }) {
  const { dict } = useTranslation();
  const [machines, setMachines] = useState<Machine[]>(initialMachines || []);

  useEffect(() => {
    if (!initialMachines || initialMachines.length === 0) {
      fetch("/api/machines")
        .then((res) => res.json())
        .then((data) => {
          if (data && Array.isArray(data.machines)) {
            setMachines(data.machines.slice(0, 4));
          }
        })
        .catch(() => {
          // Graceful fallback without noisy console logs in production
        });
    }
  }, [initialMachines]);

  const featured = machines.slice(0, 4);

  return (
    <section className="py-20 lg:py-24 bg-[#F9F9F9] border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <MotionSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="sr-only">
              {dict.featured.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2D2D2D]">
              {dict.featured.title}
            </h2>
            <p className="mt-2 text-sm text-[#4A4A4A] max-w-xl">
              {dict.featured.subtitle}
            </p>
          </div>
          <Link
            href="/machines"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2D2D2D] hover:text-[#800020] transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-md px-1"
          >
            <span>{dict.common.viewAllMachines}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </MotionSection>

        {/* Machine Cards Grid */}
        <StaggerContainer
          staggerDelay={0.09}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featured.map((machine) => (
            <StaggerItem key={machine.id}>
              <div className="h-full border border-[#E5E5E5] rounded-xl p-5 bg-white flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-lg hover:border-[#800020]/40 transition-all duration-200 group">
                <div>
                  {/* Image / Blueprint Graphic */}
                  <div className="relative w-full aspect-[4/3] rounded-lg bg-[#F9F9F9] border border-[#E5E5E5] overflow-hidden mb-4 p-2 flex items-center justify-center">
                    <Image
                      src={machine.images[0] || "/images/machines/machine-placeholder.svg"}
                      alt={machine.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute top-2 left-2 bg-white/95 border border-[#E5E5E5] px-2 py-0.5 rounded text-[10px] font-bold text-[#2D2D2D] shadow-xs">
                      {machine.brand}
                    </div>
                  </div>

                  {/* Machine Name & Category */}
                  <span className="text-[11px] uppercase tracking-wider text-[#717171] font-semibold block mb-1">
                    {machine.category.replace("-", " ")}
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-[#2D2D2D] line-clamp-2 leading-snug">
                    {machine.name}
                  </h3>

                  {/* Structured Key Specs Table */}
                  <div className="mt-4 pt-3 border-t border-[#E5E5E5] flex flex-col gap-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#717171] flex items-center gap-1">
                        <Gauge className="w-3.5 h-3.5 text-[#4A4A4A]" />
                        {dict.specLabels.gauge}:
                      </span>
                      <span className="font-medium text-[#2D2D2D]">
                        {machine.gauge ?? dict.specLabels.contactForDetails}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#717171] flex items-center gap-1">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-[#4A4A4A]" />
                        {dict.specLabels.cylinderDiameter}:
                      </span>
                      <span className="font-medium text-[#2D2D2D]">
                        {machine.cylinderDiameter ?? dict.specLabels.contactForDetails}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#717171] flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-[#4A4A4A]" />
                        {dict.specLabels.feeders}:
                      </span>
                      <span className="font-medium text-[#2D2D2D]">
                        {machine.feeders ? `${machine.feeders}F` : dict.specLabels.contactForDetails}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="mt-6 pt-4 border-t border-[#E5E5E5] flex items-center gap-2">
                  <Link
                    href={`/quote?machine=${encodeURIComponent(machine.name)}&id=${machine.id}`}
                    className="flex-1 bg-[#800020] text-white text-center py-2 px-3 rounded-lg text-xs font-semibold hover:bg-[#5A0017] active:scale-[0.98] transition-all duration-200 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-1"
                  >
                    {dict.featured.quoteBtn}
                  </Link>
                  <Link
                    href={`/machines/${machine.category}/${machine.id}`}
                    className="w-8 h-8 rounded-lg border border-[#E5E5E5] bg-[#F9F9F9] flex items-center justify-center text-[#4A4A4A] hover:border-[#800020] hover:text-[#800020] transition-colors duration-200 shrink-0 group/arrow shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-1"
                    aria-label={`View details of ${machine.name}`}
                  >
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
