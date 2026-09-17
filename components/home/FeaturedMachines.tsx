"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MotionSection, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";
import { MachineCard } from "@/components/machines/MachineCard";
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
    <section className="py-16 sm:py-24 lg:py-28 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <MotionSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="max-w-3xl">
            <span className="sr-only">
              {dict.featured.badge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight leading-[1.35] text-balance text-[#2D2D2D]">
              {dict.featured.title}
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#4A4A4A] max-w-xl">
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
            <StaggerItem key={machine.id} className="h-full min-w-0">
              <MachineCard machine={machine} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
