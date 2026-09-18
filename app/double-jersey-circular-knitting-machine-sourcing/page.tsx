"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  Layers,
  CheckCircle2,
  Phone,
  Cpu,
  Settings,
  Flame,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { COMPANY_INFO } from "@/lib/constants";
import { FaqAccordionItem } from "@/components/ui/FaqAccordionItem";

export default function DoubleJerseyMachineSourcingPage() {
  const { locale } = useTranslation();
  const isBn = locale === "bn";

  const techSpecs = [
    {
      feature: isBn ? "সিলিন্ডার ও ডায়াল ডায়ামিটার" : "Cylinder & Dial Diameter",
      spec: "30\", 34\", 36\", 38\" (Customizable up to 40\")",
      desc: isBn ? "স্ট্যান্ডার্ড এবং অতিরিক্ত চওড়া এক্সপোর্ট ওভেন/নিট ফ্যাব্রিকের জন্য।" : "Standard and extra-wide tubular or open roll fabric specifications.",
    },
    {
      feature: isBn ? "মেশিন গেজ (Gauge / Fineness)" : "Machine Gauge Range",
      spec: "18G, 24G, 28G, 32G, 36G",
      desc: isBn ? "২৮G ও ২৪G বাংলাদেশের নিট এক্সপোর্টে সর্বাধিক ব্যবহৃত।" : "24G and 28G are the primary industry standards for export-grade interlock.",
    },
    {
      feature: isBn ? "ফিডার সংখ্যা ও রেশিও" : "Feeder Density & Count",
      spec: "72F – 108F (2.0 – 2.8 Feeders / Inch)",
      desc: isBn ? "সর্বোচ্চ আরপিএম (RPM) এবং সুষম টেনশনে উচ্চ উৎপাদনশীলতা।" : "High-speed continuous revolution with uniform loop formation.",
    },
    {
      feature: isBn ? "নিডল ও ক্যাম সিস্টেম" : "Needles & Cam System",
      spec: "Groz-Beckert Germany / 2x4 Cam Tracks",
      desc: isBn ? "হাই-অ্যালয় সিএনসি মিল্ড ক্যাম ব্লক যা অতিরিক্ত তাপ ও ক্ষয় প্রতিরোধী।" : "Heat-treated Japanese alloy steel cams with multi-track versatility.",
    },
    {
      feature: isBn ? "অটোমেটিক লুব্রিকেশন" : "Electronic Lubricator",
      spec: "Uniwave / Pulsar Oil Mister",
      desc: isBn ? "সিলিন্ডার ও ডায়ালের নিডল-বেডের প্রতিটি পয়েন্টে সুনির্দিষ্ট অয়েল স্প্রে।" : "Micro-mist pressurized lubrication ensuring needle life and zero oil stain.",
    },
    {
      feature: isBn ? "ড্রাইভ মোটর ও ইনভার্টার" : "Main Drive & Inverter",
      spec: "5.5kW – 7.5kW Siemens / Delta / Inovance",
      desc: isBn ? "মসৃণ গতি নিয়ন্ত্রণ ও বিদ্যুৎ সাশ্রয়ী সফট-স্টার্ট ইনভার্টার ড্রাইভ।" : "Energy-efficient soft-start inverter with digital RPM control.",
    },
  ];

  const fabricTypes = [
    {
      title: isBn ? "এক্সপোর্ট ইন্টারলক ফ্যাব্রিক (Interlock)" : "Export Interlock Fabric",
      desc: isBn
        ? "উভয় পিঠে সমান মসৃণ গঠন, উচ্চ স্থিতিস্থাপকতা ও প্রিমিয়াম ব্র্যান্ডের টি-শার্ট ও বেবিওয়্যারের জন্য আদর্শ।"
        : "Reversible smooth fabric with identical face and back, optimal for luxury tees, loungewear, and infant apparel.",
    },
    {
      title: isBn ? "রিব নিট (1x1 & 2x2 Rib)" : "1x1 and 2x2 Rib Knit",
      desc: isBn
        ? "উচ্চ স্ট্রেচ ক্ষমতা সম্পন্ন কলার, কাফ ও ফিটেড গার্মেন্টস তৈরিতে ব্যবহৃত হয়।"
        : "Exceptional crosswise elasticity, heavily demanded for collar trims, cuffs, and form-fitting winter apparel.",
    },
    {
      title: isBn ? "৮-লক ও রোমান ফ্যাব্রিক (8-Lock / Ponte Roma)" : "8-Lock, Scuba & Ponte Roma",
      desc: isBn
        ? "ভারী ওভেন-সাদৃশ্য কাঠামো, ব্লেজার, ট্র্যাকস্যুট ও লেগিংস তৈরিতে ব্যাপকভাবে ব্যবহৃত।"
        : "Heavy double knit with woven-like stability, favored for activewear jackets, leggings, and blazers.",
    },
    {
      title: isBn ? "ড্রপ-নিডল ও ম্যাথু স্ট্রাকচার" : "Drop-Needle & Waffle Knit",
      desc: isBn
        ? "টেক্সচারযুক্ত আধুনিক ফ্যাব্রিক যা থার্মাল আন্ডারওয়্যার ও ক্যাজুয়াল পোলোতে জনপ্রিয়।"
        : "Textured honeycomb and thermal structures engineered for winter layering and casual export collections.",
    },
  ];

  const faqs = [
    {
      q: isBn
        ? "ডাবল জার্সি সার্কুলার নিটিং মেশিনে কী কী ধরনের ফ্যাব্রিক তৈরি করা যায়?"
        : "What types of knit fabrics can be produced on double jersey circular machines?",
      a: isBn
        ? "ডাবল জার্সি মেশিনে ইন্টারলক (Interlock), ১x১ ও ২x২ রিব (Rib), রোমা নিট (Ponte di Roma), স্কুবা (Scuba), অটোমান (Ottoman), ওয়াফল (Waffle) এবং লাইক্রা ডাবল জার্সি ফ্যাব্রিক তৈরি করা যায়।"
        : "Double jersey machines produce interlock, 1x1 and 2x2 rib, Ponte di Roma, scuba, ottoman, waffle thermal fabrics, and lycra-elastic double knits.",
    },
    {
      q: isBn
        ? "বাংলাদেশে ডাবল জার্সি মেশিনের জন্য কোন গেজ (Gauge) সবচেয়ে বেশি জনপ্রিয়?"
        : "Which cylinder gauge is most widely utilized in Bangladesh knitwear exports?",
      a: isBn
        ? "বাংলাদেশের এক্সপোর্ট কম্পোজিট ও নিটিং কারখানায় ২৮G (28 Gauge) এবং ২৪G (24 Gauge) সবচেয়ে বেশি ব্যবহৃত হয়। তবে ফাইন লেডিসওয়্যার ও থিন ইন্টারলকের জন্য ৩২G এবং ৩৬G গেজও আমদানি করা হচ্ছে।"
        : "28G and 24G are the most versatile gauges across Narayanganj and Gazipur knitting factories for international knitwear brands.",
    },
    {
      q: isBn
        ? "তাসনীম লিমিটেডের মাধ্যমে ডাবল জার্সি মেশিন আমদানির প্রক্রিয়া কী?"
        : "What is the complete sourcing and import protocol with Tasneem Limited?",
      a: isBn
        ? "আমরা ফ্যাক্টরির চাহিদা অনুযায়ী স্পেসিফিকেশন ফাইনাল করি, সরাসরি প্রস্তুতকারক থেকে প্রোফরমা ইনভয়েস (PI) ইস্যু করি, ব্যাংক-টু-ব্যাংক L/C ওপেনিং সাপোর্ট দিই, বিদেশে প্রি-শিপমেন্ট ইন্সপেকশন (PSI) নিশ্চিত করি এবং CFR চট্টগ্রাম পোর্টে জাহাজীকরণ করি।"
        : "We finalize machine specs, issue manufacturer Proforma Invoices (PI), facilitate irrevocable bank L/C, arrange 10-point Pre-Shipment Inspection (PSI), and handle CFR Chattogram freight.",
    },
    {
      q: isBn
        ? "মেশিন ডেলিভারির পর কি ইনস্টলেশন ও খুচরা যন্ত্রাংশের নিশ্চয়তা পাওয়া যায়?"
        : "Does Tasneem provide machine installation, training, and spare parts in Bangladesh?",
      a: isBn
        ? "হ্যাঁ। আমাদের অভিজ্ঞ টেকনিশিয়ান দল কারখানায় মেশিন আনলোডিং, প্রিসিশন লেভেলিং ও ট্রায়াল রান পরিচালনা করে। এছাড়া নারায়ণগঞ্জে আমাদের নিডল, সিঙ্কার ও ইনভার্টার স্পেয়ার্স স্টক রয়েছে।"
        : "Yes, our technical team supervises factory floor positioning, precision leveling, trial yarn knitting, and maintains local spare parts in Narayanganj.",
    },
  ];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Industrial Double Jersey Circular Knitting Machine",
    image: `${COMPANY_INFO.domain}/tasneem-logo.png`,
    description:
      "Precision industrial double jersey circular knitting machine for export interlock, rib, 8-lock fabrics. 30 to 38 inch diameter, 18G to 36G gauges with Groz-Beckert needles.",
    brand: {
      "@type": "Brand",
      name: "Tasneem Knit Machinery",
    },
    category: "Textile Machinery > Circular Knitting Machines",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "22000",
      highPrice: "36000",
      offerCount: "12",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: COMPANY_INFO.name,
      },
    },
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
        name: isBn ? "মেশিনারি" : "Machinery",
        item: `${COMPANY_INFO.domain}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: isBn ? "ডাবল জার্সি সার্কুলার মেশিন" : "Double Jersey Knitting Machines",
        item: `${COMPANY_INFO.domain}/double-jersey-circular-knitting-machine-sourcing`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1c1917] via-[#2A1F1D] to-[#1c1917] text-white pt-28 pb-20 px-4 md:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-widest text-[#E8DCC4] mb-4 flex items-center gap-2">
            <Link href="/" className="hover:underline opacity-80">
              {isBn ? "হোম" : "Home"}
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:underline opacity-80">
              {isBn ? "মেশিনারি" : "Machinery"}
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">
              {isBn ? "ডাবল জার্সি সোর্সিং" : "Double Jersey Sourcing"}
            </span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#800020]/30 border border-[#800020]/50 text-[#F5B5C2] text-xs font-semibold uppercase tracking-wider mb-6">
            <Cpu className="w-3.5 h-3.5" />
            {isBn ? "প্রিসিশন ডায়াল ও সিলিন্ডার টেকনোলজি" : "Precision Dial & Cylinder Technology"}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            {isBn
              ? "ডাবল জার্সি সার্কুলার নিটিং মেশিন সোর্সিং ও আমদানি বাংলাদেশ"
              : "Double Jersey Circular Knitting Machine Sourcing Bangladesh"}
          </h1>

          <p className="text-base md:text-xl text-neutral-300 max-w-3xl leading-relaxed mb-8">
            {isBn
              ? "এক্সপোর্ট কোয়ালিটি ইন্টারলক, ১x১ ও ২x২ রিব, এবং ৮-লক রোমান ফ্যাব্রিকের জন্য উচ্চ গতির ডাবল জার্সি সার্কুলার নিটিং মেশিন। সরাসরি প্রস্তুতকারক ফ্যাক্টরি থেকে CFR চট্টগ্রাম এল/সি টার্মসে নিরাপদ সোর্সিং ও নারায়ণগঞ্জে স্থানীয় টেকনিক্যাল সহায়তা।"
              : "Direct factory sourcing of industrial double jersey circular knitting machines for interlock, rib, and 8-lock ponte fabrics. Full CFR Chattogram L/C handling, pre-shipment quality verification, and factory commissioning in Narayanganj & Gazipur."}
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#800020] hover:bg-[#990026] text-white font-medium rounded-xl shadow-lg transition-all"
            >
              {isBn ? "স্পেসিফিকেশন ও কোটেশন চান" : "Request Technical Quotation"}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${COMPANY_INFO.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Hello Tasneem, I need details on Double Jersey Circular Knitting Machines.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-white border border-[#25D366]/40 rounded-xl font-medium transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              {isBn ? "হোয়াটসঅ্যাপে টেকনিক্যাল টিম" : "WhatsApp Technical Desk"}
            </a>
          </div>
        </div>
      </section>

      {/* Technical Specifications Matrix */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D2D2D] mb-3">
            {isBn ? "ডাবল জার্সি মেশিনের কারিগরি স্পেসিফিকেশন" : "Double Jersey Engineering Specifications"}
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-sm md:text-base">
            {isBn
              ? "প্রতিটি মেশিন সর্বোচ্চ গতি, সুষম লুপ ফরমেশন ও টানা ২৪ ঘণ্টা নিরবচ্ছিন্ন উৎপাদনের জন্য ডিজাইন করা।"
              : "Built with heavy-duty cast iron frames and precision-ground needle channels for continuous 24/7 industrial runs."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techSpecs.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#E5E0D8] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-lg bg-[#800020]/10 flex items-center justify-center text-[#800020] mb-4 font-bold text-sm">
                0{idx + 1}
              </div>
              <h3 className="font-semibold text-lg text-[#2D2D2D] mb-1">{item.feature}</h3>
              <p className="text-sm font-mono text-[#800020] font-semibold mb-2">{item.spec}</p>
              <p className="text-xs text-neutral-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fabric Applications Matrix */}
      <section className="py-16 px-4 md:px-8 bg-[#F3EFEA] border-y border-[#E5E0D8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D2D2D] mb-3">
              {isBn ? "ডাবল জার্সি মেশিনের ফ্যাব্রিক অ্যাপ্লিকেশন" : "Engineered Fabric Applications"}
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto text-sm md:text-base">
              {isBn
                ? "ইউরোপ ও মার্কিন বাজারের শীর্ষ ব্র্যান্ডের জন্য প্রিমিয়াম ডাবল নিট ফ্যাব্রিক উৎপাদনে সক্ষম।"
                : "Versatile knitting setups tailored for world-class apparel retailers and composite export knitters."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fabricTypes.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-[#E5E0D8] flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#800020] shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-[#2D2D2D] mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sourcing & Commissioning Workflow */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-[#2D2D2D] to-[#1c1917] text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-4">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {isBn ? "১০০% নিরাপদ আমদানি সমাধান" : "End-to-End Turnkey Import Support"}
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              {isBn
                ? "এল/সি ওপেনিং থেকে ফ্যাক্টরি ট্রায়াল রান — সম্পূর্ণ দায়িত্বে তাসনীম"
                : "From Bank L/C to Factory Floor Trial — Full Sourcing Partnership"}
            </h2>
            <p className="text-neutral-300 text-sm md:text-base leading-relaxed mb-8">
              {isBn
                ? "আমরা শুধু মেশিন সরবরাহ করি না; ফ্যাক্টরি লেআউট ডিজাইন, বিদ্যুৎ ও কম্প্রেসার লোড ক্যালকুলেশন, কাস্টমস ক্লিয়ারেন্স গাইডলাইন এবং দক্ষ মেকানিক দিয়ে ইনস্টলেশন নিশ্চিত করি।"
                : "We eliminate technical risks through overseas pre-shipment inspections, HS code 8447 documentation compliance, and local technician commissioning in your factory."}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                <p className="text-xl font-bold text-emerald-400">CFR Chattogram</p>
                <p className="text-xs text-neutral-400 mt-1">{isBn ? "সিঙ্গেল উইন্ডো শিপিং" : "Sea Freight & Port Handling"}</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                <p className="text-xl font-bold text-amber-400">10-Point PSI</p>
                <p className="text-xs text-neutral-400 mt-1">{isBn ? "শিপমেন্ট পূর্ব পূর্ণ নিরীক্ষা" : "Pre-Shipment Quality Audit"}</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                <p className="text-xl font-bold text-sky-400">Local Spare Stock</p>
                <p className="text-xs text-neutral-400 mt-1">{isBn ? "নারায়ণগঞ্জে প্রস্তুত পার্টস" : "Narayanganj Hub Warehouse"}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-6 py-3 bg-[#800020] hover:bg-[#990026] text-white font-medium rounded-xl text-sm transition-all"
              >
                {isBn ? "ফ্যাক্টরি ভিজিট ও কনসাল্টেশন বুক করুন" : "Schedule Factory Consultation"}
              </Link>
              <Link
                href="/circular-knitting-machine-price-in-bangladesh"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl text-sm transition-all"
              >
                {isBn ? "মেশিনের দামের তালিকা দেখুন" : "View Knitting Machine Prices"}
              </Link>
            </div>
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
            {isBn ? "ডাবল জার্সি মেশিন সোর্সিং নিয়ে প্রশ্ন" : "Double Jersey Sourcing FAQs"}
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
