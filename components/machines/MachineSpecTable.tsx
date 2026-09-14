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
    <div className="border border-[#E5E7EB] rounded-2xl bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-[#E5E7EB]">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0A0A0A]">
            {dict.specLabels.tableTitle}
          </h2>
          <p className="text-xs text-[#4B5563] mt-1">
            {dict.specLabels.tableComplianceNote}
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#4B5563]">
          <HelpCircle className="w-3.5 h-3.5 text-[#6B7280]" />
          <span>{dict.specLabels.needCustomParams}</span>
        </div>
      </div>

      <div className="overflow-x-auto">
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
                className="border-b border-[#E5E7EB] last:border-b-0 hover:bg-[#F9FAFB] transition-colors duration-150"
              >
                <td className="py-3.5 px-4 text-xs font-semibold text-[#4B5563] w-1/3 bg-[#F9FAFB] border-r border-[#E5E7EB]">
                  {spec.label}
                </td>
                <td className="py-3.5 px-4 text-xs font-medium text-[#0A0A0A]">
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
