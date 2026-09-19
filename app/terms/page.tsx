import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  FileText,
  Building2,
  DollarSign,
  Ship,
  Wrench,
  Lock,
  Scale,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service & Commercial Conditions | Tasneem Knitting Industry",
  description:
    "Review formal terms of service, CFR Chattogram import conditions, Letter of Credit (LC) guidelines, and machinery warranty terms for Tasneem Knitting Industry.",
  openGraph: {
    title: "Terms of Service & Commercial Conditions | Tasneem Knitting Industry",
    description:
      "Commercial terms, CFR delivery protocols, PSI certification, and 1-year machinery warranty policy.",
    url: `${COMPANY_INFO.domain}/terms`,
    siteName: COMPANY_INFO.name,
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-[#FAF9F5] min-h-screen text-[#1E293B] py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#800020] text-xs font-semibold uppercase tracking-wider mb-4">
            <FileText className="w-3.5 h-3.5" />
            <span>Commercial Policy & Legal Framework • শর্তাবলী</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Terms of Service & Commercial Sourcing Terms
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Last Updated: January 2026 • Effective for all machinery quotations, Proforma Invoices (PI), and sales contracts.
          </p>
        </div>

        {/* Quick Highlights Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
            <Ship className="w-8 h-8 text-[#800020] shrink-0" />
            <div>
              <h3 className="text-xs font-bold text-slate-900">Incoterms 2020</h3>
              <p className="text-[11px] text-slate-500">CFR Chattogram Sea Port Delivery</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-emerald-600 shrink-0" />
            <div>
              <h3 className="text-xs font-bold text-slate-900">Payment Modalities</h3>
              <p className="text-[11px] text-slate-500">100% Irrevocable At-Sight LC</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
            <Wrench className="w-8 h-8 text-blue-600 shrink-0" />
            <div>
              <h3 className="text-xs font-bold text-slate-900">Manufacturer Warranty</h3>
              <p className="text-[11px] text-slate-500">12 Months on Core Mechanicals</p>
            </div>
          </div>
        </div>

        {/* Detailed Terms Document */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-10 space-y-8 text-xs sm:text-sm leading-relaxed text-slate-700">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="w-6 h-6 rounded-lg bg-rose-50 text-[#800020] text-xs font-bold flex items-center justify-center">
                1
              </span>
              <span>Scope of Agreement & Business Identity (চুক্তির পরিধি)</span>
            </h2>
            <p>
              These Terms of Service govern all machinery inquiries, formal price estimations, Proforma Invoices (PI), and commercial contracts entered into with <strong>Tasneem Knitting Industry</strong> (Trade License: {COMPANY_INFO.registration.tradeLicense}, BIN: {COMPANY_INFO.registration.bin}).
            </p>
            <p>
              Tasneem Knitting Industry operates as a direct overseas sourcing liaison, machinery importer, and technical commissioning partner in Bangladesh, collaborating closely with its registered overseas sourcing liaison office, <strong>{COMPANY_INFO.chinaOffice.company}</strong> (Shaoxing, Zhejiang, China).
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="w-6 h-6 rounded-lg bg-rose-50 text-[#800020] text-xs font-bold flex items-center justify-center">
                2
              </span>
              <span>Proforma Invoice (PI) & Quotation Validity</span>
            </h2>
            <p>
              Any formal machinery quotation or online inquiry estimate generated via our buyer portal remains valid for <strong>14 calendar days</strong> from the date of issue, unless otherwise noted in writing. Machinery pricing is subject to fluctuations in international raw steel prices, exchange rates (USD/BDT), and ocean freight surcharges.
            </p>
            <p>
              A contract is considered binding only upon formal issuance and counter-signing of the overseas Proforma Invoice (PI) and successful acceptance of the buyer’s Letter of Credit (LC) by our nominated commercial bank in China.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="w-6 h-6 rounded-lg bg-rose-50 text-[#800020] text-xs font-bold flex items-center justify-center">
                3
              </span>
              <span>Payment Terms & Letter of Credit (LC) Regulations</span>
            </h2>
            <p>
              In full compliance with Bangladesh Bank Foreign Exchange Regulations and Import Policy Orders:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                <strong>Letter of Credit (LC):</strong> All capital machinery shipments are executed against 100% Irrevocable At-Sight Letter of Credit (or agreed UPAS / Deferred terms) issued by a scheduled commercial bank in Bangladesh.
              </li>
              <li>
                <strong>Spare Parts & Consumables:</strong> For urgent spare shipments (needles, sinkers, yarn storage feeders, ceramic guides), payments may be executed via Advance Telegraphic Transfer (TT) or authorized import bank permits.
              </li>
              <li>
                <strong>Customs Tariff & Taxes:</strong> Unless explicitly agreed otherwise in a local turnkey contract, all Bangladesh customs duties, advance income tax (AIT), VAT, and port demurrage charges remain the responsibility of the importing buyer mill.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="w-6 h-6 rounded-lg bg-rose-50 text-[#800020] text-xs font-bold flex items-center justify-center">
                4
              </span>
              <span>Pre-Shipment Inspection (PSI) & Quality Verification</span>
            </h2>
            <p>
              Every circular knitting machine and textile unit sourced through Tasneem Knitting Industry undergoes mandatory <strong>factory running trials</strong> at the manufacturing plant before container crating:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                A comprehensive 30–60 minute continuous dry run and fabric knitting test is conducted to inspect cam timing, needle alignment, inverter balance, and vibration harmonics.
              </li>
              <li>
                High-resolution photos, 4K trial videos, and detailed inspection check-sheets are recorded and shared with the buyer for remote sign-off before dispatch to Ningbo / Shanghai port.
              </li>
              <li>
                Third-party PSI inspections (e.g., SGS, Bureau Veritas, CCIC) can be arranged upon buyer request and LC specification.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="w-6 h-6 rounded-lg bg-rose-50 text-[#800020] text-xs font-bold flex items-center justify-center">
                5
              </span>
              <span>Delivery Timeline & Sea Shipment (CFR Chattogram)</span>
            </h2>
            <p>
              Standard machinery production lead time is typically <strong>25 to 45 business days</strong> following confirmed LC receipt, depending on machine cylinder diameter, feeder count, and custom gauge requirements. Ocean transit from China ports to Chattogram sea terminal generally requires <strong>14 to 21 days</strong>.
            </p>
            <p>
              Tasneem Knitting Industry is not liable for shipment delays resulting from force majeure, international maritime congestion, extreme weather, or customs clearance delays at Chattogram Port.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="w-6 h-6 rounded-lg bg-rose-50 text-[#800020] text-xs font-bold flex items-center justify-center">
                6
              </span>
              <span>Warranty & Technical Commissioning Support (ওয়ারেন্টি ও সার্ভিস)</span>
            </h2>
            <p>
              Tasneem Knitting Industry provides industry-leading after-sales commitment:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>
                <strong>12-Month Core Warranty:</strong> Comprehensive 1-year manufacturer warranty covering main mechanical cast iron beds, gear rings, driveshafts, and factory inverter controllers against manufacturing defects.
              </li>
              <li>
                <strong>Wearable Items Exclusion:</strong> Consumables subject to regular textile wear and tear (needles, sinkers, timing belts, cutter blades, and yarn guides) are excluded from the warranty once the machine has completed initial installation trials.
              </li>
              <li>
                <strong>On-Site Commissioning:</strong> Our Narayanganj technical engineering team provides on-site machine leveling, oil reservoir setup, inverter calibration, and test knitting at the buyer’s mill.
              </li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="w-6 h-6 rounded-lg bg-rose-50 text-[#800020] text-xs font-bold flex items-center justify-center">
                7
              </span>
              <span>Client Data Privacy & Buyer Confidentiality</span>
            </h2>
            <p>
              Buyer mill identities, machine gauge configurations, fabric production capacities, and commercial price concessions shared with Tasneem Knitting Industry are strictly confidential. We never disclose proprietary fabric specifications or commercial contract amounts to third parties.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <span className="w-6 h-6 rounded-lg bg-rose-50 text-[#800020] text-xs font-bold flex items-center justify-center">
                8
              </span>
              <span>Governing Law & Dispute Resolution (আইনি এখতিয়ার)</span>
            </h2>
            <p>
              These Terms shall be interpreted and governed in accordance with the laws of the People&apos;s Republic of Bangladesh. Any dispute arising out of or in connection with a machinery sourcing contract that cannot be settled amicably shall be submitted to the exclusive jurisdiction of the competent commercial courts in Dhaka, Bangladesh.
            </p>
          </section>
        </div>

        {/* Contact Assistance Footer */}
        <div className="mt-8 p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-2">
          <p className="text-xs text-slate-600">
            Have questions regarding LC opening, Proforma Invoices, or machinery warranty terms?
          </p>
          <div className="flex items-center justify-center gap-4 text-xs font-bold">
            <a href={`tel:${COMPANY_INFO.phoneIntl}`} className="text-[#800020] hover:underline">
              Hotline: {COMPANY_INFO.hotline}
            </a>
            <span className="text-slate-300">•</span>
            <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#800020] hover:underline">
              {COMPANY_INFO.email}
            </a>
            <span className="text-slate-300">•</span>
            <Link href="/account/quotes" className="text-slate-700 hover:underline">
              Buyer Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
