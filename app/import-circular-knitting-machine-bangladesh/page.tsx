"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  Truck,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  CheckCircle2,
  Building2,
  Anchor,
  Layers,
  Scale,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { COMPANY_INFO } from "@/lib/constants";
import { FaqAccordionItem } from "@/components/ui/FaqAccordionItem";

export default function ImportCircularKnittingMachinePage() {
  const { locale } = useTranslation();
  const isBn = locale === "bn";

  const steps = [
    {
      step: "01",
      title: isBn ? "মেশিন স্পেসিফিকেশন ও প্রোফরমা ইনভয়েস (PI)" : "Machine Specification & Proforma Invoice (PI)",
      desc: isBn
        ? "সিলিন্ডার সাইজ, গেজ (Gauge), ফিডার সংখ্যা এবং মোটর ওয়াটেজ নির্ধারণ করে প্রস্তুতকারকের কাছ থেকে ব্যাংক কমপ্লায়েন্ট PI সংগ্রহ করা।"
        : "Finalize cylinder diameter, gauge, cam tracks, and brand components to issue a formal banking-compliant Proforma Invoice.",
    },
    {
      step: "02",
      title: isBn ? "আইআরসি (IRC) ও এইচএস কোড নির্ধারণ" : "IRC Validation & HS Code Classification",
      desc: isBn
        ? "ক্যাপিটাল মেশিনারির আওতায় এইচএস কোড ৮৪৪৭.১১ (সার্কুলার নিটিং মেশিন) নির্ধারণ এবং প্রস্তুতকারকের নামসহ বৈধ IRC যাচাই।"
        : "Classify under HS Code 8447.11 (circular knitting machines under 165mm) or 8447.12 (over 165mm diameter) under capital machinery duty concessions.",
    },
    {
      step: "03",
      title: isBn ? "বাংলাদেশ ব্যাংক অনুমোদিত L/C ওপেনিং" : "Letter of Credit (L/C) Issuance",
      desc: isBn
        ? "অথোরাইজড ডিলার (AD) ব্যাংকের মাধ্যমে শতভাগ অপরিবর্তনীয় (100% Irrevocable L/C at Sight) এল/সি ইস্যু করা।"
        : "Open an irrevocable Letter of Credit at sight with full documentation instructions covering Bill of Lading, Packing List, and Certificate of Origin.",
    },
    {
      step: "04",
      title: isBn ? "প্রাক-জাহাজীকরণ পরিদর্শন (Pre-Shipment Inspection)" : "Pre-Shipment Inspection (PSI)",
      desc: isBn
        ? "বিদেশি কারখানায় রানিং টেস্ট, পার্টসের সঠিকতা ও প্যাকিং নিশ্চিত করতে আন্তর্জাতিক পরিদর্শন সংস্থা বা প্রতিনিধির অডিট।"
        : "Comprehensive 10-point technical audit of machine running speed, oil mist lubricators, frame balance, and wooden crating prior to container sealing.",
    },
    {
      step: "05",
      title: isBn ? "CFR চট্টগ্রাম সমুদ্রপথে শিপমেন্ট" : "CFR Chattogram Ocean Transit",
      desc: isBn
        ? "চট্টগ্রাম বন্দরে কনটেইনার পৌঁছানো এবং বিল অব লেডিং (B/L) সহ মূল ব্যাংকিং ডকুমেন্ট ডেলিভারি।"
        : "Direct ocean transit from Shanghai / Ningbo / Kaohsiung to Chattogram Seaport with Bill of Lading endorsed through negotiating bank.",
    },
    {
      step: "06",
      title: isBn ? "কাস্টমস ক্লিয়ারেন্স ও ফ্যাক্টরি ইনস্টলেশন" : "Customs Clearance & Factory Commissioning",
      desc: isBn
        ? "এনবিআর (NBR) নির্ধারিত ক্যাপিটাল মেশিনারির শুল্ক ছাড় সুবিধা নিয়ে খালাস এবং নারায়ণগঞ্জে দক্ষ টেকনিশিয়ান দ্বারা স্থাপন।"
        : "C&F agent clearance benefiting from concessional 1% capital duty for export knitwear industries, followed by factory precision leveling.",
    },
  ];

  const complianceDocs = [
    {
      name: isBn ? "প্রোফরমা ইনভয়েস (PI) ও এল/সি কপি" : "Proforma Invoice & Irrevocable L/C",
      detail: isBn ? "সঠিক মডেল ও কারিগরি বিবরণসহ স্বাক্ষরিত কপি" : "Detailed breakdown of cylinder, feeder count, and brand specs",
    },
    {
      name: isBn ? "বিল অব লেডিং (Clean On Board B/L)" : "Bill of Lading (Clean On Board)",
      detail: isBn ? "চট্টগ্রাম বন্দর কনসাইনি সম্বলিত ৩টি অরিজিনাল কপি" : "Negotiated through bank with port of discharge Chattogram",
    },
    {
      name: isBn ? "সার্টিফিকেট অব অরিজিন (Country of Origin - COO)" : "Certificate of Origin (COO)",
      detail: isBn ? "প্রস্তুতকারক দেশের চেম্বার অব কমার্স দ্বারা প্রত্যয়িত" : "Issued by Chamber of Commerce of exporting jurisdiction",
    },
    {
      name: isBn ? "প্যাকিং লিস্ট ও পিএসআই রিপোর্ট" : "Packing List & PSI Quality Report",
      detail: isBn ? "প্রতিটি কাঠের ক্রেইটের গ্রস ও নেট ওজনসহ নিরীক্ষা সনদ" : "Gross/Net weights, crate dimensions, and inspection test report",
    },
  ];

  const faqs = [
    {
      q: isBn
        ? "বাংলাদেশে সার্কুলার নিটিং মেশিন আমদানিতে শুল্ক (Customs Duty) কেমন?"
        : "What is the customs duty rate for importing circular knitting machines in Bangladesh?",
      a: isBn
        ? "রপ্তানিমুখী তৈরি পোশাক ও টেক্সটাইল শিল্পের জন্য ক্যাপিটাল মেশিনারিজ (HS Code 8447) আমদানিতে জাতীয় রাজস্ব বোর্ড (NBR) সাধারণত ১% কাস্টমস ডিউটি (CD) এবং ভ্যাট ছাড়ের বিশেষ সুবিধা প্রদান করে থাকে।"
        : "Under Bangladesh NBR capital machinery statutory orders, export-oriented textile manufacturers importing circular knitting machinery under HS code 8447 typically qualify for concessional 1% customs duty (CD) with statutory VAT exemptions.",
    },
    {
      q: isBn
        ? "চীন বা তাইওয়ান থেকে চট্টগ্রাম বন্দরে পৌঁছাতে কত সময় লাগে?"
        : "What is the sea transit lead time from China or Taiwan to Chattogram Port?",
      a: isBn
        ? "জাহাজে কনটেইনার লোড হওয়ার পর সাংহাই বা নিংবো পোর্ট থেকে চট্টগ্রাম সমুদ্রবন্দরে পৌঁছাতে সাধারণত ১৪ থেকে ২০ দিন সময় লাগে।"
        : "Direct ocean feeder transit from major export ports like Shanghai, Ningbo, or Kaohsiung to Chattogram Seaport typically takes 14 to 20 days post-vessel sailing.",
    },
    {
      q: isBn
        ? "তাসনীম লিমিটেড কি সম্পূর্ণ এল/সি ও কাস্টমস প্রক্রিয়ায় সহায়তা করে?"
        : "Does Tasneem Limited assist with Letter of Credit terms and customs clearing documentation?",
      a: isBn
        ? "হ্যাঁ। আমরা সঠিক এইচএস কোড সমন্বিত পিআই সরবরাহ করি, যাতে ব্যাংকে এল/সি খুলতে কোনো জটিলতা না হয় এবং আমাদের সহযোগী অভিজ্ঞ সিঅ্যান্ডএফ এজেন্টের মাধ্যমে দ্রুত বন্দর খালাসে দিকনির্দেশনা দিই।"
        : "Yes. We verify HS codes, format compliant Proforma Invoices for bank approval, coordinate with shipping lines for smooth B/L release, and provide technical guidance for port clearance.",
    },
  ];

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Import Industrial Circular Knitting Machines to Bangladesh",
    description:
      "A complete procedural guide for RMG and textile factory owners in Bangladesh on importing circular knitting machines under HS Code 8447 through CFR Chattogram and bank L/C.",
    totalTime: "P45D",
    step: steps.map((s, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: s.title,
      text: s.desc,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isBn ? "হোম" : "Home",
        item: COMPANY_INFO.domain,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isBn ? "আমদানি গাইড" : "Import Guide",
        item: `${COMPANY_INFO.domain}/import-circular-knitting-machine-bangladesh`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <div className="bg-[#FAF8F5] text-[#2D2D2D] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1c1917] via-[#2A1F1D] to-[#1c1917] text-white pt-28 pb-20 px-4 md:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-widest text-[#E8DCC4] mb-4 flex items-center gap-2">
            <Link href="/" className="hover:underline opacity-80">
              {isBn ? "হোম" : "Home"}
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">
              {isBn ? "আমদানি ও কাস্টমস গাইড" : "Import & Customs Guide"}
            </span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#800020]/30 border border-[#800020]/50 text-[#F5B5C2] text-xs font-semibold uppercase tracking-wider mb-6">
            <FileText className="w-3.5 h-3.5" />
            {isBn ? "বাংলাদেশ ব্যাংক ও এনবিআর কমপ্লায়েন্স" : "Bangladesh Bank & NBR Regulatory Protocol"}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            {isBn
              ? "বাংলাদেশে সার্কুলার নিটিং মেশিন আমদানি ও এল/সি প্রসেসিং গাইড"
              : "Import Circular Knitting Machine to Bangladesh — Complete L/C & Customs Guide"}
          </h1>

          <p className="text-base md:text-xl text-neutral-300 max-w-3xl leading-relaxed mb-8">
            {isBn
              ? "এইচএস কোড ৮৪৪৭ ক্লাসিফিকেশন, শতভাগ অপরিবর্তনীয় ব্যাংক এল/সি ওপেনিং, প্রি-শিপমেন্ট ইন্সপেকশন (PSI) এবং ১% ক্যাপিটাল মেশিনারি শুল্কে চট্টগ্রাম বন্দর খালাসের বিস্তারিত গাইডলাইন।"
              : "End-to-end regulatory blueprint for Bangladeshi textile entrepreneurs: HS Code 8447 verification, irrevocable bank L/C guidelines, PSI inspection, and concessional 1% capital duty customs clearance at Chattogram Port."}
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#800020] hover:bg-[#990026] text-white font-medium rounded-xl shadow-lg transition-all"
            >
              {isBn ? "আমদানি সহায়তা ও পিআই সংগ্রহ করুন" : "Get Import Consultation & PI"}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${COMPANY_INFO.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hello Tasneem, I want to consult on importing circular knitting machines via Bank L/C.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-white border border-[#25D366]/40 rounded-xl font-medium transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              {isBn ? "হোয়াটসঅ্যাপ কনসালটেন্ট" : "Chat on WhatsApp"}
            </a>
          </div>
        </div>
      </section>

      {/* 6-Step Procedural Roadmap */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D2D2D] mb-3">
            {isBn ? "মেশিন আমদানির ৬টি ধারাবাহিক ধাপ" : "6-Stage Industrial Import Protocol"}
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-sm md:text-base">
            {isBn
              ? "পিআই রিলিজ থেকে শুরু করে ফ্যাক্টরি ফ্লোরে ইনস্টলেশন পর্যন্ত প্রতিটি ধাপ নিয়মমাফিক সম্পন্ন হয়।"
              : "A transparent and systematic progression guaranteeing compliance with Bangladesh foreign exchange guidelines."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#E5E0D8] shadow-sm relative overflow-hidden"
            >
              <span className="text-3xl font-extrabold text-[#800020]/20 absolute top-4 right-4">
                {s.step}
              </span>
              <h3 className="font-semibold text-lg text-[#2D2D2D] mb-2 pr-8">{s.title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Required Documentation Checklist */}
      <section className="py-16 px-4 md:px-8 bg-[#F3EFEA] border-y border-[#E5E0D8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D2D2D] mb-3">
              {isBn ? "কাস্টমস খালাসের জন্য প্রয়োজনীয় ডকুমেন্টস" : "Mandatory Customs Clearance Documents"}
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto text-sm md:text-base">
              {isBn
                ? "চট্টগ্রাম বন্দরে দ্রুত খালাসের জন্য এনবিআর কমপ্লায়েন্ট শিপিং পেপারস যাচাই করে নিন।"
                : "Clean, consistent documentation that avoids demurrage penalties and ensures fast port release."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {complianceDocs.map((doc, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-[#E5E0D8] flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#800020] shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-[#2D2D2D] mb-1">{doc.name}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{doc.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#800020]/10 text-[#800020] text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            {isBn ? "সাধারণ প্রশ্নোত্তর" : "Frequently Asked Questions"}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D2D2D]">
            {isBn ? "সার্কুলার মেশিন আমদানি নিয়ে সাধারণ জিজ্ঞাসা" : "Import & Customs Questions"}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <FaqAccordionItem key={idx} question={faq.q} answer={faq.a} defaultOpen={idx === 0} />
          ))}
        </div>
      </section>
    </div>
  );
}
