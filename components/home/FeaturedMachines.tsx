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
        .catch((err) => console.error("Failed to load featured machines:", err));
    }
  }, [initialMachines]);

  const featured = machines.slice(0, 4);

  return (
    <section className="py-20 lg:py-24 bg-[#F9FAFB] border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <MotionSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#4B5563] font-bold mb-2 block">
              {dict.featured.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0A0A0A]">
              {dict.featured.title}
            </h2>
            <p className="mt-2 text-sm text-[#4B5563] max-w-xl">
              {dict.featured.subtitle}
            </p>
          </div>
          <Link
            href="/machines"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A0A0A] hover:text-[#FF0000] transition-colors shrink-0"
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
              <div className="h-full border border-[#E5E7EB] rounded-xl p-5 bg-white flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-lg hover:border-[#C0C0C0] transition-all duration-200 group">
                <div>
                  {/* Image / Blueprint Graphic */}
                  <div className="relative w-full aspect-[4/3] rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] overflow-hidden mb-4 p-2 flex items-center justify-center">
                    <Image
                      src={machine.images[0] || "/images/machines/machine-placeholder.svg"}
                      alt={machine.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute top-2 left-2 bg-white/95 border border-[#E5E7EB] px-2 py-0.5 rounded text-[10px] font-bold text-[#0A0A0A] shadow-xs">
                      {machine.brand}
                    </div>
                  </div>

                  {/* Machine Name & Category */}
                  <span className="text-[11px] uppercase tracking-wider text-[#6B7280] font-semibold block mb-1">
                    {machine.category.replace("-", " ")}
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-[#0A0A0A] line-clamp-2 leading-snug">
                    {machine.name}
                  </h3>

                  {/* Structured Key Specs Table */}
                  <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex flex-col gap-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#6B7280] flex items-center gap-1">
                        <Gauge className="w-3.5 h-3.5 text-[#4B5563]" />
                        {dict.specLabels.gauge}:
                      </span>
                      <span className="font-medium text-[#0A0A0A]">
                        {machine.gauge ?? dict.specLabels.contactForDetails}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#6B7280] flex items-center gap-1">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-[#4B5563]" />
                        {dict.specLabels.cylinderDiameter}:
                      </span>
                      <span className="font-medium text-[#0A0A0A]">
                        {machine.cylinderDiameter ?? dict.specLabels.contactForDetails}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#6B7280] flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-[#4B5563]" />
                        {dict.specLabels.feeders}:
                      </span>
                      <span className="font-medium text-[#0A0A0A]">
                        {machine.feeders ? `${machine.feeders}F` : dict.specLabels.contactForDetails}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="mt-6 pt-4 border-t border-[#E5E7EB] flex items-center gap-2">
                  <Link
                    href={`/quote?machine=${encodeURIComponent(machine.name)}&id=${machine.id}`}
                    className="flex-1 bg-[#FF0000] text-white text-center py-2 px-3 rounded-lg text-xs font-semibold hover:bg-[#E00000] transition-colors duration-200 shadow-xs"
                  >
                    {dict.featured.quoteBtn}
                  </Link>
                  <Link
                    href={`/machines/${machine.category}/${machine.id}`}
                    className="w-8 h-8 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] flex items-center justify-center text-[#4B5563] hover:border-[#C0C0C0] hover:text-[#0A0A0A] transition-colors duration-200 shrink-0 group/arrow shadow-xs"
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
