"use client";

import { ShieldCheck, CheckCircle2, FileCheck } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { COMPANY_INFO } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export function TrustStrip() {
  const shouldReduceMotion = useReducedMotion();
  const { dict } = useTranslation();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const badgeContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const badgeVariants: Variants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-white border-b border-[#E5E5E5] py-7 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
        >
          {/* Registration Status */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-3 border-b md:border-b-0 md:border-r border-[#E5E7EB] pb-5 md:pb-0 md:pr-6"
          >
            <span className="sr-only">{dict.common.complianceBadge}</span>
            <p className="text-sm font-semibold text-[#2D2D2D] flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-[#800020] shrink-0" />
              <span>Tasneem Knit Industry</span>
            </p>
            <p className="text-xs text-[#4B5563] mt-2 leading-relaxed">
              <span>{dict.footer.binLabel}: <span className="font-medium text-[#2D2D2D]">{COMPANY_INFO.registration.bin}</span></span>
            </p>
          </motion.div>

          {/* Third-Party Inspection Support */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-9 flex flex-col items-start gap-3.5"
          >
            <div>
              <span className="sr-only">{dict.trustStrip.inspectionTitle}</span>
              <p className="text-xs sm:text-sm text-[#4B5563] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{dict.trustStrip.complianceSub}</span>
              </p>
            </div>

            {/* Inspection Badges (SGS, Intertek, Bureau Veritas & Verified Trade License) */}
            <motion.div
              variants={badgeContainerVariants}
              className="flex items-center gap-2.5 sm:gap-3 flex-wrap"
            >
              <motion.a
                variants={badgeVariants}
                href={COMPANY_INFO.tradeLicenseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#800020]/25 bg-[#FDF2F4] text-xs font-semibold text-[#800020] shadow-xs hover:bg-[#800020] hover:text-white transition-all duration-200"
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>{dict.common.verifiedTradeLicense}</span>
              </motion.a>

              {[
                { name: "SGS Inspection" },
                { name: "Intertek (ITS)" },
                { name: "Bureau Veritas (BV)" },
              ].map((badge) => (
                <motion.span
                  key={badge.name}
                  variants={badgeVariants}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E7EB] bg-white text-xs font-semibold text-[#2D2D2D] shadow-xs hover:border-[#C0C0C0] transition-colors duration-200"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {badge.name}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
