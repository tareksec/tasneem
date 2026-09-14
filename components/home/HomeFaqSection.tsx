"use client";

import Link from "next/link";
import { ArrowUpRight, HelpCircle } from "lucide-react";
import { FaqAccordionItem } from "@/components/ui/FaqAccordionItem";
import { MotionSection, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export function HomeFaqSection() {
  const { dict } = useTranslation();

  const faqs = [
    { question: dict.faq.q1, answer: dict.faq.a1 },
    { question: dict.faq.q2, answer: dict.faq.a2 },
    { question: dict.faq.q3, answer: dict.faq.a3 },
    { question: dict.faq.q4, answer: dict.faq.a4 },
    { question: dict.faq.q5, answer: dict.faq.a5 },
    { question: dict.faq.q6, answer: dict.faq.a6 },
  ];

  return (
    <section className="py-20 lg:py-24 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <MotionSection className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#4B5563] font-bold mb-2">
            <HelpCircle className="w-4 h-4 text-[#FF0000]" />
            <span>{dict.faq.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0A0A0A]">
            {dict.faq.title}
          </h2>
          <p className="mt-3 text-sm text-[#4B5563]">
            {dict.faq.subtitle}
          </p>
        </MotionSection>

        {/* FAQ Container */}
        <StaggerContainer
          staggerDelay={0.07}
          className="max-w-3xl mx-auto flex flex-col gap-3.5"
        >
          {faqs.map((faq, index) => (
            <StaggerItem key={index}>
              <FaqAccordionItem
                question={faq.question}
                answer={faq.answer}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <MotionSection delay={0.1} className="mt-10 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A0A0A] hover:text-[#FF0000] transition-colors"
          >
            <span>{dict.common.readMore} ({dict.nav.faq})</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </MotionSection>
      </div>
    </section>
  );
}
