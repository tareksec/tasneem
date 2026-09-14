"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { FaqAccordionItem } from "@/components/ui/FaqAccordionItem";
import { MotionSection, StaggerContainer, StaggerItem } from "@/components/ui/MotionWrapper";
import { COMPANY_INFO } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function FaqPage() {
  const { t, locale } = useTranslation();

  const faqItems = [
    {
      question: t.faq.q1,
      answer: t.faq.a1,
    },
    {
      question: t.faq.q2,
      answer: t.faq.a2,
    },
    {
      question: t.faq.q3,
      answer: t.faq.a3,
    },
    {
      question: t.faq.q4,
      answer: t.faq.a4,
    },
    {
      question: t.faq.q5,
      answer: t.faq.a5,
    },
    {
      question: t.faq.q6,
      answer: t.faq.a6,
    },
    {
      question: locale === "bn" ? "মেশিন ইনস্টল করার পর স্পেয়ার পার্টস ও টেকনিক্যাল সাপোর্ট কীভাবে পাওয়া যাবে?" : "Are spare parts and maintenance available after commissioning?",
      answer: locale === "bn"
        ? "হ্যাঁ, অবশ্যই। আমাদের ক্লায়েন্ট মিলগুলোর জন্য আসল Groz-Beckert বা কম্প্যাটিবল নিটিং Needle, Sinker, পজিটিভ ইয়ার্ন Feeder, সেন্ট্রাল লুব্রিকেশন ইউনিট ও Inverter ড্রাইভ সবসময় নারায়ণগঞ্জে রেডি থাকে। পাশাপাশি অভিজ্ঞ টেকনিশিয়ান দিয়ে সার্বক্ষণিক মেইনটেন্যান্স সহায়তা দেওয়া হয়।"
        : "Yes. We support our client mills with essential spare parts including Groz-Beckert/compatible knitting needles, sinkers, positive yarn feeders, central lubrication units, and electronic inverter drives, along with scheduled technician maintenance support.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="py-12 sm:py-20 bg-white text-[#2D2D2D]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <MotionSection className="max-w-3xl mb-16">
          <span className="sr-only">{t.faq.badge}</span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#2D2D2D]">
            {t.faq.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#4B5563] leading-relaxed">
            {t.faq.subtitle}
          </p>
        </MotionSection>

        {/* FAQ List Container */}
        <StaggerContainer
          staggerDelay={0.06}
          className="max-w-3xl flex flex-col gap-3.5 mb-16"
        >
          {faqItems.map((faq, idx) => (
            <StaggerItem key={idx}>
              <FaqAccordionItem
                question={faq.question}
                answer={faq.answer}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Support Callout Box */}
        <MotionSection
          delay={0.1}
          className="max-w-3xl border border-[#E5E7EB] rounded-2xl bg-[#F9FAFB] text-[#2D2D2D] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm"
        >
          <div>
            <h2 className="text-xl font-bold text-[#2D2D2D]">
              {locale === "bn" ? "আপনার পছন্দের মেশিন নিয়ে কোনো প্রশ্ন আছে?" : "Have a Specific Machinery Sourcing Question?"}
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5563] mt-1">
              {locale === "bn"
                ? "আমাদের টেক্সটাইল ইঞ্জিনিয়ারদের সাথে সরাসরি ফোন, WhatsApp বা কোটেশন ফর্মের মাধ্যমে যে কোনো সময় কথা বলতে পারেন।"
                : "Our engineering team is directly reachable via phone, WhatsApp, or through our custom quote form."}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/quote"
              className="w-full sm:w-auto bg-[#800020] hover:bg-[#5A0017] active:scale-[0.98] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] focus-visible:ring-offset-2"
            >
              {t.common.requestQuote}
            </Link>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-emerald-700 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </MotionSection>
      </div>
    </div>
  );
}
