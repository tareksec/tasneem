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
    <section className="py-20 lg:py-24 bg-white border-b border-[#E5E5E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <MotionSection className="text-center max-w-2xl mx-auto mb-12">
          <span className="sr-only">{dict.faq.badge}</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2D2D2D]">
            {dict.faq.title}
          </h2>
          <p className="mt-3 text-sm text-[#4A4A4A]">
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
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2D2D2D] hover:text-[#800020] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-md px-1"
          >
            <span>{dict.common.readMore} ({dict.nav.faq})</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </MotionSection>
      </div>
    </section>
  );
}
