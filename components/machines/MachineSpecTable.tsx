"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export interface SpecRow {
  label: string;
  value: React.ReactNode;
}

interface MachineSpecTableProps {
  specs: SpecRow[];
}

export function MachineSpecTable({ specs }: MachineSpecTableProps) {
  const shouldReduceMotion = useReducedMotion();
  const { dict } = useTranslation();

  return (
    <div className="border border-[#E5E5E5] rounded-2xl bg-white p-4 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-6 pb-3.5 sm:pb-4 border-b border-[#E5E5E5]">
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-[#2D2D2D]">
            {dict.specLabels.tableTitle}
          </h2>
          <p className="text-xs text-[#4A4A4A] mt-1">
            {dict.specLabels.tableComplianceNote}
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#4A4A4A]">
          <HelpCircle className="w-3.5 h-3.5 text-[#717171] shrink-0" />
          <span>{dict.specLabels.needCustomParams}</span>
        </div>
      </div>

      {/* MOBILE LAYOUT (< sm): Stacked Key-Value Cards for 100% legibility down to 320px */}
      <div className="sm:hidden flex flex-col divide-y divide-[#E5E5E5]">
        {specs.map((spec) => (
          <div key={spec.label} className="py-3 flex flex-col gap-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#717171]">
              {spec.label}
            </span>
            <div className="text-xs font-medium text-[#2D2D2D]">
              {spec.value}
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP LAYOUT (>= sm): Preserved 2-column tabular format */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <tbody>
            {specs.map((spec, idx) => (
              <motion.tr
                key={spec.label}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.2,
                        delay: Math.min(idx * 0.02, 0.35),
                        ease: "easeOut",
                      }
                }
                className="border-b border-[#E5E5E5] last:border-b-0 hover:bg-[#F9F9F9] transition-colors duration-150"
              >
                <td className="py-3.5 px-4 text-xs font-semibold text-[#4A4A4A] w-1/3 bg-[#F9F9F9] border-r border-[#E5E5E5]">
                  {spec.label}
                </td>
                <td className="py-3.5 px-4 text-xs font-medium text-[#2D2D2D]">
                  {spec.value}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
