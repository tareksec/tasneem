"use client";

import Link from "next/link";
import Image from "next/image";
import { Check, ArrowUpRight, Wrench, GraduationCap, PackageCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { MotionSection, SlideIn, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export function SpotlightInstallation() {
  const shouldReduceMotion = useReducedMotion();
  const { dict } = useTranslation();

  const leftChecklist = [
    {
      title: dict.installation.point1Title,
      description: dict.installation.point1Desc,
    },
    {
      title: dict.installation.point2Title,
      description: dict.installation.point2Desc,
    },
    {
      title: "Precision Leveling & Calibration",
      description: "Dial-cylinder runout calibration below 0.02mm for vibration-free high-RPM operation.",
    },
  ];

  const rightChecklist = [
    {
      title: dict.installation.point3Title,
      description: dict.installation.point3Desc,
    },
    {
      title: dict.installation.point4Title,
      description: dict.installation.point4Desc,
    },
    {
      title: "Local Fast-Response Support",
      description: "Dedicated maintenance technicians available across Narayanganj, Gazipur, and Chattogram.",
    },
  ];

  return (
    <section className="py-12 sm:py-20 lg:py-28 bg-white border-b border-[#E5E5E5] overflow-hidden text-[#2D2D2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <MotionSection className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="text-xs uppercase tracking-wider text-[#4A4A4A] font-bold mb-2 block">
            {dict.installation.badge}
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#2D2D2D]">
            {dict.installation.title}
          </h2>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-base text-[#4A4A4A] leading-relaxed">
            {dict.installation.subtitle}
          </p>
        </MotionSection>

        {/* Central Illustration Flanked by Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Checklist (3 cols) */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <SlideIn direction="left" distance={20} duration={0.45}>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#2D2D2D] font-bold pb-2 border-b border-[#E5E5E5] mb-6">
                <Wrench className="w-4 h-4 text-[#800020]" />
                <span>Assembly & Setup</span>
              </div>
              <StaggerContainer staggerDelay={0.08} className="flex flex-col gap-5">
                {leftChecklist.map((item) => (
                  <StaggerItem key={item.title}>
                    <div className="border border-[#E5E5E5] rounded-xl p-4 bg-[#F9F9F9] shadow-xs hover:border-[#800020]/40 transition-colors duration-200">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-5 h-5 rounded-full bg-white border border-[#E5E5E5] text-emerald-600 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-emerald-600" />
                        </div>
                        <h3 className="text-xs sm:text-sm font-bold text-[#2D2D2D]">{item.title}</h3>
                      </div>
                      <p className="text-xs text-[#4A4A4A] leading-relaxed pl-7">{item.description}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </SlideIn>
          </div>

          {/* Central Illustration (6 cols) */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="border border-[#E5E5E5] rounded-2xl p-4 sm:p-6 bg-white shadow-xl text-center group"
            >
              <div className="relative w-full aspect-[4/3] rounded-xl bg-[#F9F9F9] border border-[#E5E5E5] overflow-hidden flex items-center justify-center">
                <Image
                  src="/images/machines/spotlight-installation.webp"
                  alt="Factory machinery commissioning technician inspecting and calibrating industrial equipment"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-4 flex flex-wrap sm:flex-nowrap items-center justify-around gap-2 text-xs font-semibold text-[#2D2D2D] pt-2">
                <span className="flex items-center gap-1">
                  <PackageCheck className="w-4 h-4 text-emerald-600" />
                  {dict.hero.cfrBadge}
                </span>
                <span className="text-neutral-300 hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <Wrench className="w-4 h-4 text-[#800020]" />
                  {dict.hero.installBadge}
                </span>
                <span className="text-neutral-300 hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-4 h-4 text-[#4A4A4A]" />
                  Staff Training
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Checklist (3 cols) */}
          <div className="lg:col-span-3 order-3">
            <SlideIn direction="right" distance={20} duration={0.45}>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#2D2D2D] font-bold pb-2 border-b border-[#E5E5E5] mb-6">
                <GraduationCap className="w-4 h-4 text-[#800020]" />
                <span>Training & Support</span>
              </div>
              <StaggerContainer staggerDelay={0.08} className="flex flex-col gap-5">
                {rightChecklist.map((item) => (
                  <StaggerItem key={item.title}>
                    <div className="border border-[#E5E5E5] rounded-xl p-4 bg-[#F9F9F9] shadow-xs hover:border-[#800020]/40 transition-colors duration-200">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-5 h-5 rounded-full bg-white border border-[#E5E5E5] text-[#800020] flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-[#800020]" />
                        </div>
                        <h3 className="text-xs sm:text-sm font-bold text-[#2D2D2D]">{item.title}</h3>
                      </div>
                      <p className="text-xs text-[#4A4A4A] leading-relaxed pl-7">{item.description}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </SlideIn>
          </div>
        </div>

        {/* Bottom CTA */}
        <MotionSection delay={0.1} className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-[#800020] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#5A0017] transition-colors duration-200 shadow-xs"
          >
            <span>{dict.common.readMore}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </MotionSection>
      </div>
    </section>
  );
}
