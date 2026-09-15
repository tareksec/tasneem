"use client";

import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, Mail, Phone, MapPin, ArrowLeft } from "lucide-react";
import { MotionSection } from "@/components/ui/MotionWrapper";
import { COMPANY_INFO } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export default function PrivacyPolicyPage() {
  const { locale } = useTranslation();

  return (
    <div className="py-12 sm:py-20 bg-white text-[#2D2D2D]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4B5563] hover:text-[#800020] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020] rounded-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{locale === "bn" ? "হোম পেজে ফিরে যান" : "Back to Home"}</span>
          </Link>
        </div>

        {/* Header */}
        <MotionSection className="mb-12 border-b border-[#E5E7EB] pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FDF2F4] text-[#800020] border border-[#D8A4AF] mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>
              {locale === "bn"
                ? "গোপনীয়তা ও তথ্য সুরক্ষা নীতিমালা"
                : "Privacy & Data Protection Policy"}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#2D2D2D] leading-tight">
            {locale === "bn" ? "গোপনীয়তা নীতি (Privacy Policy)" : "Privacy Policy"}
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#4B5563] leading-relaxed">
            {locale === "bn"
              ? "তাসনীম নিট ইন্ডাস্ট্রি (Tasneem Knit Industry) বাংলাদেশের টেক্সটাইল ও গার্মেন্টস খাতের গ্রাহক, মিল মালিক এবং ওয়েবসাইট পরিদর্শকদের তথ্যের সর্বোচ্চ নিরাপত্তা বজায় রাখতে প্রতিশ্রুতিবদ্ধ। এই নীতিমালায় ব্যাখ্যা করা হয়েছে কীভাবে আপনার তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষিত রাখা হয়।"
              : "Tasneem Knit Industry is dedicated to upholding the highest standards of data security, confidentiality, and transparency for our client textile mills, buyers, and website visitors across Bangladesh and abroad. This policy explains our data collection, usage, and protection practices."}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-[#6B7280]">
            <span>{locale === "bn" ? "সর্বশেষ হালনাগাদ: মার্চ ২০২৬" : "Last Updated: March 2026"}</span>
            <span>•</span>
            <span>{locale === "bn" ? "রেজিস্ট্রেশন বিআইএন: " + COMPANY_INFO.registration.bin : `BIN: ${COMPANY_INFO.registration.bin}`}</span>
          </div>
        </MotionSection>

        {/* Content Sections */}
        <div className="flex flex-col gap-10 text-sm leading-relaxed text-[#4B5563]">
          {/* Section 1: Information Collection */}
          <section className="border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 bg-[#F9FAFB]">
            <div className="flex items-center gap-2.5 mb-3 text-[#2D2D2D]">
              <FileText className="w-5 h-5 text-[#800020]" />
              <h2 className="text-lg sm:text-xl font-bold">
                {locale === "bn" ? "১. যেসকল তথ্য আমরা সংগ্রহ করি" : "1. Information We Collect"}
              </h2>
            </div>
            <p className="mb-4">
              {locale === "bn"
                ? "আমাদের ওয়েবসাইটে বিভিন্ন সেবা (কোটেশন রিকোয়েস্ট, রিভিউ সাবমিশন বা যোগাযোগ) গ্রহণের সময় আমরা নিম্নোক্ত তথ্যসমূহ সংগ্রহ করতে পারি:"
                : "When you interact with our website, request industrial machinery quotations, submit customer reviews, or contact our engineering team, we collect the following categories of information:"}
            </p>
            <ul className="flex flex-col gap-2.5 pl-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#2D2D2D]">{locale === "bn" ? "কোটেশন ও যোগাযোগ তথ্য: " : "Quotation & Contact Inquiries: "}</strong>
                  {locale === "bn"
                    ? "নাম, ফ্যাক্টরি বা মিলের নাম, মোবাইল নম্বর/হোয়াটসঅ্যাপ, ইমেইল ঠিকানা, কাঙ্ক্ষিত মেশিনের মডেল ও স্পেসিফিকেশন (যেমন: Gauge, Cylinder Diameter, Feeder Count, ডেলিভারি শিডিউল)।"
                    : "Buyer name, mill/factory name, mobile/WhatsApp number, email address, targeted machinery model, and technical specifications (gauge, cylinder size, feeder count, CFR delivery timeline)."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#2D2D2D]">{locale === "bn" ? "গ্রাহক রিভিউ ও টেস্টিমোনিয়াল: " : "Customer Reviews & Testimonials: "}</strong>
                  {locale === "bn"
                    ? "আপনার নাম, ফ্যাক্টরি/প্রতিষ্ঠানের নাম, স্টার রেটিং (১-৫) এবং অভিজ্ঞতার বিবরণ। অনুমোদনের পর এটি ওয়েবসাইটে জনসমক্ষে প্রদর্শিত হয়।"
                    : "Name, company/designation, star rating (1–5), and feedback comments submitted through our buyer review form."}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#2D2D2D]">{locale === "bn" ? "অ্যানালিটিক্স ও ব্রাউজিং ডেটা: " : "Analytics & Technical Data: "}</strong>
                  {locale === "bn"
                    ? "ব্রাউজারের ধরন, ডিভাইসের ধরন, পেজ ভিজিট এবং ব্যবহারিক সময় সম্পর্কিত অ্যানোনিমাস ডেটা যা Google Analytics-এর মাধ্যমে সংগৃহীত হয়।"
                    : "Anonymized IP telemetry, browser type, device information, operating system, and pages visited collected via Google Analytics."}
                </span>
              </li>
            </ul>
          </section>

          {/* Section 2: How We Use Information */}
          <section className="border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 bg-white">
            <div className="flex items-center gap-2.5 mb-3 text-[#2D2D2D]">
              <Eye className="w-5 h-5 text-[#800020]" />
              <h2 className="text-lg sm:text-xl font-bold">
                {locale === "bn" ? "২. তথ্যের ব্যবহার" : "2. How We Use Your Information"}
              </h2>
            </div>
            <p className="mb-4">
              {locale === "bn"
                ? "সংগৃহীত তথ্য কেবলমাত্র নিম্নলিখিত বাণিজ্যিক ও সেবা সংক্রান্ত উদ্দেশ্যে ব্যবহৃত হয়:"
                : "The data we collect is utilized strictly for professional machinery sourcing, logistics, and customer support purposes:"}
            </p>
            <ul className="flex flex-col gap-2 pl-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#800020] mt-2 shrink-0" />
                <span>{locale === "bn" ? "আপনার টেক্সটাইল কারখানার চাহিদা অনুযায়ী উপযুক্ত মেশিন নির্বাচন ও প্রফর্মা ইনভয়েস (CFR Chattogram) প্রস্তুত করা।" : "Evaluating your mill's fabric requirements and issuing customized commercial CFR Chattogram quotations."}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#800020] mt-2 shrink-0" />
                <span>{locale === "bn" ? "সরাসরি ফোন, ইমেইল বা হোয়াটসঅ্যাপের মাধ্যমে দ্রুত কারিগরি পরামর্শ প্রদান ও এল/সি সহায়তা।" : "Direct WhatsApp, phone, or email technical consultation regarding machine commissioning and L/C structuring."}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#800020] mt-2 shrink-0" />
                <span>{locale === "bn" ? "মেশিন ইনস্টলেশন, টেস্ট নিটিং এবং ১ বছরের ওয়ারেন্টি মেয়াদে আসল খুচরা যন্ত্রাংশ সরবরাহ নিশ্চিতকরণ।" : "Coordinating factory delivery, machine leveling, commissioning, and scheduled warranty calibration."}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#800020] mt-2 shrink-0" />
                <span>{locale === "bn" ? "ওয়েবসাইটের গতি, ইউজেবিলিটি ও টেক্সটাইল ক্যাটালগের কার্যকারিতা উন্নয়ন।" : "Optimizing catalog navigation, server response times, and content accessibility based on aggregated telemetry."}</span>
              </li>
            </ul>
          </section>

          {/* Section 3: Cookies and Google Analytics */}
          <section className="border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 bg-[#F9FAFB]">
            <div className="flex items-center gap-2.5 mb-3 text-[#2D2D2D]">
              <Lock className="w-5 h-5 text-[#800020]" />
              <h2 className="text-lg sm:text-xl font-bold">
                {locale === "bn" ? "৩. কুকিজ ও গুগল অ্যানালিটিক্স ডিসক্লোজার" : "3. Cookies & Google Analytics Disclosure"}
              </h2>
            </div>
            <p className="leading-relaxed">
              {locale === "bn"
                ? "আমাদের ওয়েবসাইট ব্রাউজিং অভিজ্ঞতা উন্নত করতে এবং ভাষা নির্বাচন (বাংলা/ইংরেজি) মনে রাখতে স্ট্যান্ডার্ড ব্রাউজার কুকিজ ব্যবহার করে। এছাড়াও ভিজিটরদের প্রয়োজনীয় তথ্য সঠিকভাবে উপস্থাপনের লক্ষ্যে আমরা Google Analytics ব্যবহার করি, যা কোনো ব্যক্তিগত বা গোপনীয় তথ্য সংগ্রহ করে না। আপনি চাইলে আপনার ব্রাউজার সেটিংস থেকে যেকোনো সময় কুকিজ নিষ্ক্রিয় করতে পারেন।"
                : "We employ standard functional browser cookies to remember your language preference (Bangla/English) and interface states. Furthermore, our website utilizes Google Analytics (as implemented in our analytics integration) to inspect aggregate visitor patterns without capturing personally identifiable financial or private credentials. You can disable cookies at any time through your browser preferences without affecting core catalog browsing."}
            </p>
          </section>

          {/* Section 4: Third-Party Sharing & Strict Zero-Sale Policy */}
          <section className="border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 bg-white">
            <div className="flex items-center gap-2.5 mb-3 text-[#2D2D2D]">
              <ShieldCheck className="w-5 h-5 text-[#800020]" />
              <h2 className="text-lg sm:text-xl font-bold">
                {locale === "bn" ? "৪. কোনো বাণিজ্যিক বিক্রি বা অননুমোদিত শেয়ারিং নেই" : "4. Zero Third-Party Sale & Data Confidentiality"}
              </h2>
            </div>
            <p className="leading-relaxed">
              {locale === "bn"
                ? "তাসনীম নিট ইন্ডাস্ট্রি কোনো অবস্থাতেই আপনার বা আপনার কারখানার তথ্য কোনো বিজ্ঞাপনদাতা বা তৃতীয় পক্ষের কাছে বিক্রি, লিজ বা ভাড়া দেয় না। শুধুমাত্র এলসি ওপেনিং, শিপিং লাইন ও শুল্ক খালাস সংক্রান্ত আইনি প্রক্রিয়া এবং ফ্যাক্টরি পর্যায়ে টেকনিশিয়ান প্রেরণের প্রয়োজনে অনুমোদিত লজিস্টিক পার্টনার ছাড়া অন্য কারো সাথে তথ্য শেয়ার করা হয় না।"
                : "Tasneem Knit Industry maintains a strict, unconditional zero-sale policy: we never sell, monetize, rent, or trade your corporate or personal data to marketing brokers or third-party advertisers. Information is disclosed solely to authorized shipping carriers, customs clearance agents, or overseas machinery builders strictly as required to fulfill commercial sales contracts, sea bill of lading processing, and on-site factory installation."}
            </p>
          </section>

          {/* Section 5: Data Security & Retention */}
          <section className="border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 bg-[#F9FAFB]">
            <h2 className="text-lg sm:text-xl font-bold text-[#2D2D2D] mb-3">
              {locale === "bn" ? "৫. ডেটা সুরক্ষা ও সংরক্ষণের মেয়াদ" : "5. Data Security & Retention"}
            </h2>
            <p className="leading-relaxed">
              {locale === "bn"
                ? "আমরা আধুনিক এনক্রিপশন (HTTPS/TLS) ও নিরাপদ সার্ভার ব্যবহার করে আপনার তথ্য সংরক্ষণ করি। কোটেশন ও রিভিউ সংক্রান্ত তথ্যসমূহ আমাদের ব্যবসায়িক ও সেবা প্রদান চুক্তির মেয়াদে সংরক্ষিত থাকে। আপনি চাইলে যেকোনো সময় আপনার সাবমিট করা তথ্য পরিবর্তন বা ডিলিট করার আবেদন করতে পারেন।"
                : "All web traffic is transmitted via high-grade 256-bit TLS encryption. Customer quotations and approved reviews are retained in our secure database for the duration necessary to deliver after-sales machinery support and maintain audited commercial transaction records under Bangladesh corporate laws."}
            </p>
          </section>

          {/* Section 6: Contact for Privacy Inquiries */}
          <section className="border border-[#D8A4AF] rounded-2xl p-6 sm:p-8 bg-[#FFFDFB]">
            <h2 className="text-lg sm:text-xl font-bold text-[#800020] mb-2">
              {locale === "bn" ? "৬. যোগাযোগ ও প্রাইভেসি অফিসার" : "6. Privacy Officer & Contact Details"}
            </h2>
            <p className="mb-4">
              {locale === "bn"
                ? "এই নীতিমালা সম্পর্কে কোনো প্রশ্ন, তথ্যের সংশোধন বা পর্যালোচনার প্রয়োজন হলে নির্দ্বিধায় আমাদের সাথে সরাসরি যোগাযোগ করুন:"
                : "If you have questions regarding this Privacy Policy, wish to update your contact preferences, or request review deletion, please reach out directly to our compliance officer:"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-[#2D2D2D]">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#800020]" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:underline">{COMPANY_INFO.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#800020]" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:underline">{COMPANY_INFO.phone}</a>
              </div>
              <div className="flex items-center gap-2 sm:col-span-2">
                <MapPin className="w-4 h-4 text-[#800020] shrink-0" />
                <span>{COMPANY_INFO.address}, Narayanganj, Bangladesh</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
