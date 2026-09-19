import React from "react";
import type { Metadata } from "next";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  Users,
  Award,
  Zap,
  ShieldCheck,
  Send,
  Building2,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Careers & Job Openings | Join Tasneem Knitting Industry",
  description:
    "Explore engineering, technical sales, and international sourcing career opportunities at Tasneem Knitting Industry. Work with state-of-the-art circular knitting and textile machinery across Bangladesh.",
  openGraph: {
    title: "Careers & Job Opportunities | Tasneem Knitting Industry",
    description:
      "Join the leading industrial textile machinery importer in Bangladesh. Positions open in Narayanganj showroom, Dhaka corporate office, and nationwide factory commissioning teams.",
    url: `${COMPANY_INFO.domain}/careers`,
    siteName: COMPANY_INFO.name,
  },
};

const OPEN_POSITIONS = [
  {
    id: "knitting-service-engineer",
    title: "Senior Circular Knitting Service Engineer",
    titleBn: "সিনিয়র সার্কুলার নিটিং সার্ভিস ইঞ্জিনিয়ার",
    department: "Technical Field Service",
    location: "Narayanganj & Nationwide Mill Commissioning",
    type: "Full-Time (পূর্ণকালীন)",
    experience: "4–7 Years in Textile Mills / Machinery Maintenance",
    summary:
      "Lead on-site machinery commissioning, cylinder gauge conversions, cam track alignments, and Lycra feeder calibrations for imported single and double jersey circular knitting machines across Bangladesh mills.",
    responsibilities: [
      "Conduct pre-commissioning checks, machine leveling, and trial fabric runs on newly imported circular knitting machines.",
      "Diagnose mechanical vibration, needle breakages, sinker timing errors, and fabric streak defects.",
      "Train mill technicians and machine masters on preventive maintenance schedules and lubrication protocols.",
      "Coordinate with China engineering teams for warranty parts dispatch and technical adjustments.",
    ],
    requirements: [
      "Diploma / B.Sc in Textile Engineering or Mechanical Engineering (practical mill experience prioritized).",
      "Demonstrated expertise with Single Jersey, Double Jersey/Interlock, and Jacquard knitting mechanics.",
      "Willingness to travel to factory clusters in Narayanganj, Gazipur, Savar, and Chattogram.",
    ],
  },
  {
    id: "technical-sales-executive",
    title: "Technical Sales & Mill Key Account Executive",
    titleBn: "টেকনিক্যাল সেলস অ্যান্ড কি অ্যাকাউন্ট এক্সিকিউটিভ",
    department: "Commercial & Business Development",
    location: "Dhaka Head Office / Narayanganj BSCIC Hub",
    type: "Full-Time (পূর্ণকালীন)",
    experience: "2–5 Years in Textile Machinery / Industrial Capital Goods",
    summary:
      "Drive direct CFR machinery sourcing agreements with leading knit composite mills and spinning conglomerates across Bangladesh.",
    responsibilities: [
      "Engage General Managers, Technical Directors, and Mill Owners to identify machine replacement and expansion requirements.",
      "Prepare formal Proforma Invoice (PI) requisitions, machine configuration specs, and commercial proposals.",
      "Liaise with banking teams on Letter of Credit (LC) opening terms and custom tariff requirements.",
      "Represent Tasneem Knitting Industry at DTG (Dhaka Int'l Textile & Garment Machinery Exhibition).",
    ],
    requirements: [
      "BBA / B.Sc in Textile Management, Marketing, or equivalent commercial experience.",
      "Proven track record of technical B2B sales in garments, textiles, or capital machinery sector.",
      "Strong negotiation and client relationship skills in Bengali and English.",
    ],
  },
  {
    id: "sourcing-lc-coordinator",
    title: "International Sourcing & LC Documentation Coordinator",
    titleBn: "আন্তর্জাতিক সোর্সিং ও এলসি ডকুমেন্টেশন কোঅর্ডিনেটর",
    department: "Supply Chain & Overseas Trade",
    location: "Uttara Corporate Office, Dhaka",
    type: "Full-Time (পূর্ণকালীন)",
    experience: "2–4 Years in Import/Export & Banking Documentation",
    summary:
      "Manage end-to-end communication between China manufacturing partners and Bangladesh commercial banks, ensuring zero-defect documentation for CFR shipments.",
    responsibilities: [
      "Review sales contracts, Proforma Invoices, Bill of Lading (B/L), and Packing Lists against Bangladesh Bank regulations.",
      "Coordinate shipping schedules from Ningbo and Shanghai ports to Chattogram sea terminal.",
      "Track third-party pre-shipment inspection (PSI) certificates and HS code classifications.",
      "Maintain active correspondence with Shaoxing Nawar sourcing liaison office in China.",
    ],
    requirements: [
      "Graduate in Commerce, Logistics, or Supply Chain Management.",
      "Hands-on experience with Bangladesh Bank import rules, HS Codes (8447 / 8448), and commercial banking.",
      "Proficient in English commercial correspondence; familiarity with China business culture is an advantage.",
    ],
  },
  {
    id: "electrical-automation-technician",
    title: "Industrial Automation & Inverter Specialist",
    titleBn: "ইন্ডাস্ট্রিয়াল অটোমেশন ও ইনভার্টার স্পেশালিস্ট",
    department: "Electrical & Control Systems",
    location: "BSCIC Industrial Park, Narayanganj",
    type: "Full-Time (পূর্ণকালীন)",
    experience: "3+ Years in Industrial Textile Electrics",
    summary:
      "Maintain and troubleshoot electrical panels, AC servo drives, frequency inverters, touch-screen controllers, and auto-stop sensors on modern circular knitting machines.",
    responsibilities: [
      "Install and parameterize Schneider / Delta / Inovance inverters and digital yarn storage feeding drives.",
      "Troubleshoot faulty relay boards, magnetic stop motions, and oil spray mist electronic timers.",
      "Assemble voltage stabilization checks before running factory load tests.",
      "Provide emergency breakdown support to client factories in Narayanganj and surrounding hubs.",
    ],
    requirements: [
      "Diploma in Electrical / Electronics Engineering or Trade Certificate.",
      "Direct experience with industrial circular knitting or weaving machinery control panels.",
      "Proficient in reading electrical schematics and panel wiring diagrams.",
    ],
  },
];

const BENEFITS = [
  {
    icon: Award,
    title: "Market-Leading Compensation",
    desc: "Competitive fixed salary with performance incentives and festival bonuses twice a year.",
  },
  {
    icon: Zap,
    title: "Advanced Factory Training",
    desc: "Direct hands-on training with overseas engineers on the latest high-speed circular knitting & jacquard controllers.",
  },
  {
    icon: Building2,
    title: "Career Growth in Capital Goods",
    desc: "Work with the top tier of Bangladesh's $45B export RMG sector and build valuable industry-wide relationships.",
  },
  {
    icon: Users,
    title: "Supportive Engineering Culture",
    desc: "Collaborative environment guided directly by veteran textile mechanics and industry leadership.",
  },
];

export default function CareersPage() {
  return (
    <div className="bg-[#FAF9F5] min-h-screen text-[#1E293B]">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#111625] via-[#161F33] to-[#0E1424] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Join Our Engineering & Trade Team • ক্যারিয়ার সুযোগ</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none">
            Build the Future of <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-500 to-amber-400">
              Bangladesh Textile Industry
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Tasneem Knitting Industry is the premier overseas machinery importer supplying high-speed circular knitting systems to top garment composite mills. We are looking for passionate engineers, technical sales leaders, and international trade professionals.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#openings"
              className="px-6 py-3 rounded-xl bg-[#DF1E38] hover:bg-[#C2162E] active:scale-[0.98] text-white text-sm font-bold shadow-lg shadow-red-900/30 transition-all flex items-center gap-2"
            >
              <span>View Open Positions ({OPEN_POSITIONS.length})</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${COMPANY_INFO.email}?subject=Career%20Application%20-%20Tasneem%20Knitting%20Industry`}
              className="px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white text-sm font-semibold border border-slate-700 transition-all flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-slate-400" />
              <span>Direct CV Submission</span>
            </a>
          </div>
        </div>

        {/* Decorative Grid Light */}
        <div className="absolute inset-0 bg-[radial-gradient(#E11D48_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      </section>

      {/* Benefits Section */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#800020] bg-rose-50 px-3 py-1 rounded-full border border-rose-200 inline-block">
            Why Work With Us • সুযোগ ও সুবিধা
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
            Why Build Your Career at Tasneem
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mt-2">
            Work with cutting-edge textile machinery, global sourcing hubs in China, and leading knitwear manufacturers in Bangladesh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 text-[#800020] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mb-2">{b.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Open Positions List */}
      <section id="openings" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#800020]">
              Active Recruitment • চলমান নিয়োগ
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Current Job Openings
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Showing {OPEN_POSITIONS.length} verified technical & commercial roles
          </p>
        </div>

        <div className="space-y-6">
          {OPEN_POSITIONS.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-8 hover:border-rose-300 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700">
                      {job.department}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-rose-50 text-[#800020] border border-rose-200/60">
                      {job.type}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {job.title}
                  </h3>
                  <p className="text-xs text-[#800020] font-semibold mt-0.5">
                    {job.titleBn}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-3">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.experience}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 pt-2 lg:pt-0">
                  <a
                    href={`mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(
                      `Job Application: ${job.title} - [Your Name]`
                    )}&body=${encodeURIComponent(
                      `Dear Hiring Team,\n\nI am applying for the position of ${job.title} at Tasneem Knitting Industry.\n\nKey Details:\n- Name:\n- Contact Phone / WhatsApp:\n- Years of Experience:\n- Current / Last Organization:\n\nPlease find my CV attached.\n\nRegards,\n`
                    )}`}
                    className="px-5 py-2.5 rounded-xl bg-[#DF1E38] hover:bg-[#C2162E] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Apply via Email</span>
                  </a>

                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      `Hello Tasneem Knit Industry HR, I am interested in applying for the position: ${job.title}. Please let me know how to share my CV.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Apply via WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Description & Responsibilities */}
              <div className="mt-5 space-y-4">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {job.summary}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Key Responsibilities</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {job.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#800020] font-bold mt-0.5">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                      <span>Candidate Requirements</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold mt-0.5">✓</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* General / Open Application Card */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-r from-[#111625] to-[#1E293B] text-white p-8 sm:p-12 shadow-xl border border-slate-700 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 bg-rose-950/70 border border-rose-800/80 px-3 py-1 rounded-full inline-block">
              General Application • উন্মুক্ত আবেদন
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Don&apos;t See a Matching Role?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We are constantly seeking talented textile technicians, CNC lathe machinists, logistics managers, and Chinese-Bengali translators. Send us your resume and we will reach out when a suitable vacancy opens.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-rose-400" />
                <span>{COMPANY_INFO.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-rose-400" />
                <span>{COMPANY_INFO.hotline}</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <a
              href={`mailto:${COMPANY_INFO.email}?subject=General%20Application%20-%20Tasneem%20Knitting%20Industry`}
              className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-[#DF1E38] hover:bg-[#C2162E] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Open Resume / সিভি পাঠান</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
