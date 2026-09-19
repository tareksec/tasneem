"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  FileText,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { OfficeMap } from "@/components/ui/OfficeMap";
import { COMPANY_INFO } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export function AboutCompanyDetails() {
  const { locale } = useTranslation();
  const isBn = locale === "bn";
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp.replace(/\D/g, "")}`;
  const offices = [
    {
      icon: MapPin,
      location: isBn ? "নারায়ণগঞ্জ, বাংলাদেশ" : "Narayanganj, Bangladesh",
      title: isBn ? COMPANY_INFO.showroomOffice.nameBn : COMPANY_INFO.showroomOffice.name,
      address: isBn ? COMPANY_INFO.showroomOffice.addressBn : COMPANY_INFO.showroomOffice.address,
    },
    {
      icon: Building2,
      location: isBn ? "ঢাকা, বাংলাদেশ" : "Dhaka, Bangladesh",
      title: isBn ? COMPANY_INFO.headOffice.nameBn : COMPANY_INFO.headOffice.name,
      address: isBn ? COMPANY_INFO.headOffice.addressBn : COMPANY_INFO.headOffice.address,
    },
    {
      icon: Globe2,
      location: isBn ? "শাওক্সিং, চীন" : "Shaoxing, China",
      title: isBn ? COMPANY_INFO.chinaOffice.nameBn : COMPANY_INFO.chinaOffice.name,
      company: isBn ? COMPANY_INFO.chinaOffice.companyBn : COMPANY_INFO.chinaOffice.company,
      address: isBn ? COMPANY_INFO.chinaOffice.addressBn : COMPANY_INFO.chinaOffice.address,
    },
  ];

  return (
    <>
      <section
        id="company-details"
        aria-labelledby="company-details-title"
        className="scroll-mt-28 border-y border-gray-border bg-surface-offwhite py-16 sm:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16 lg:px-8">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-burgundy">
              {isBn ? "কোম্পানি পরিচিতি" : "Company at a glance"}
            </p>
            <h2 id="company-details-title" className="text-3xl font-bold leading-tight tracking-tight text-gray-dark sm:text-4xl">
              {isBn ? "পরিচয় স্পষ্ট। যোগাযোগ সরাসরি।" : "Clear credentials. Direct connections."}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray-secondary">
              {isBn
                ? "তাসনীম নিট ইন্ডাস্ট্রি বাংলাদেশের শিল্পকারখানার জন্য টেক্সটাইল মেশিনারি আমদানি ও সরবরাহ করে। আমাদের ব্যবসায়িক তথ্য ও যোগাযোগের ঠিকানা এখানে একসাথে পাবেন।"
                : "Tasneem Knitting Industry imports and supplies textile machinery for factories across Bangladesh. Find our business details and the people to connect with, all in one place."}
            </p>
          </div>

          <div className="min-w-0 rounded-3xl border border-gray-border bg-white p-6 sm:p-8">
            <div className="flex items-start gap-4 border-b border-gray-border pb-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-burgundy-light text-burgundy">
                <FileText className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-gray-dark">{COMPANY_INFO.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-secondary">
                  {isBn ? "টেক্সটাইল মেশিনারি আমদানিকারক ও সরবরাহকারী" : "Textile machinery importer & supplier"}
                </p>
              </div>
            </div>
            <dl className="grid gap-6 py-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-gray-secondary">{isBn ? "বিআইএন (ভ্যাট আইডি)" : "BIN (VAT ID)"}</dt>
                <dd className="mt-2 font-mono text-base font-semibold text-gray-dark" dir="ltr">{COMPANY_INFO.bin}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-secondary">{isBn ? "ই-টিআইএন" : "e-TIN"}</dt>
                <dd className="mt-2 font-mono text-base font-semibold text-gray-dark" dir="ltr">{COMPANY_INFO.etin}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm text-gray-secondary">{isBn ? "ট্রেড লাইসেন্স" : "Trade license"}</dt>
                <dd className="mt-2 break-all font-mono text-base font-semibold text-gray-dark" dir="ltr">{COMPANY_INFO.tradeLicense}</dd>
              </div>
            </dl>
            <a
              href={COMPANY_INFO.tradeLicenseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-gray-border px-5 py-2.5 text-sm font-semibold text-burgundy transition-colors hover:border-burgundy hover:bg-burgundy-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burgundy"
            >
              {isBn ? "ট্রেড লাইসেন্স দেখুন" : "View trade license"}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">{isBn ? "(নতুন ট্যাবে খুলবে)" : "(opens in a new tab)"}</span>
            </a>
          </div>
        </div>
      </section>

      <section id="visit" aria-labelledby="visit-title" className="scroll-mt-28 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-burgundy">
              {isBn ? "আমাদের সাথে দেখা করুন" : "Come meet us"}
            </p>
            <h2 id="visit-title" className="text-3xl font-bold leading-tight tracking-tight text-gray-dark sm:text-4xl">
              {isBn ? "কাছেই আছি। শুরু হোক কথা।" : "Global connections. Local support."}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray-secondary">
              {isBn
                ? "আপনার মেশিনের চাহিদা নিয়ে কথা বলতে নারায়ণগঞ্জ শোরুমে আসুন, অথবা সরাসরি আমাদের টিমের সাথে যোগাযোগ করুন।"
                : "Visit our Narayanganj showroom to discuss your machinery needs, or get in touch with our team before you stop by."}
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {offices.map((office) => {
              const Icon = office.icon;
              return (
                <article key={office.location} className="min-w-0 rounded-3xl border border-gray-border p-6 sm:p-7">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-burgundy-light text-burgundy">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <p className="text-sm font-medium text-gray-secondary">{office.location}</p>
                  </div>
                  <h3 className="text-lg font-bold text-gray-dark">{office.title}</h3>
                  {office.company && <p className="mt-3 text-sm font-semibold leading-relaxed text-gray-dark">{office.company}</p>}
                  <address className="mt-3 text-sm leading-7 text-gray-secondary not-italic">{office.address}</address>
                </article>
              );
            })}
          </div>

          <div className="mt-8">
            <OfficeMap variant="standard" />
          </div>

          <div className="mt-6 flex flex-col gap-4 rounded-3xl border border-gray-border bg-surface-offwhite p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-base font-semibold text-gray-dark">
              {isBn ? "সরাসরি কথা বলুন আমাদের সাথে" : "A conversation is a good place to start."}
            </p>
            <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6">
              <a
                href={`tel:${COMPANY_INFO.phoneIntl}`}
                className="inline-flex min-h-11 items-center gap-2.5 rounded-lg text-sm font-semibold text-gray-dark transition-colors hover:text-burgundy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burgundy"
              >
                <Phone className="h-4 w-4 shrink-0 text-burgundy" aria-hidden="true" />
                <span dir="ltr">{COMPANY_INFO.hotline}</span>
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="inline-flex min-h-11 items-center gap-2.5 rounded-lg text-sm font-semibold text-gray-dark transition-colors hover:text-burgundy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burgundy"
              >
                <Mail className="h-4 w-4 shrink-0 text-burgundy" aria-hidden="true" />
                <span className="break-all">{COMPANY_INFO.email}</span>
              </a>
            </div>
          </div>

          <div className="relative mt-16 overflow-hidden rounded-3xl bg-burgundy px-6 py-10 text-white sm:mt-24 sm:px-10 sm:py-12 lg:px-12">
            <div className="pointer-events-none absolute -right-24 -top-40 h-96 w-96 rounded-full border border-white/10" aria-hidden="true" />
            <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-12">
              <div>
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-white/75">
                  {isBn ? "আপনার পরবর্তী পদক্ষেপ" : "Your next step"}
                </p>
                <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                  {isBn ? "আপনার কারখানার জন্য সঠিক মেশিন খুঁজছেন?" : "Let’s find the right machine for your mill."}
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85">
                  {isBn
                    ? "আপনার কাঙ্ক্ষিত স্পেসিফিকেশন জানান। সোর্সিং, শিপিং ও ইনস্টলেশন নিয়ে আমাদের টিমের সাথে আলোচনা করুন।"
                    : "Share your specifications. Talk sourcing, shipping, and installation with a team that understands your production needs."}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link
                  href={`/${locale}/quote`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-burgundy transition-colors hover:bg-burgundy-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  {isBn ? "কোটেশন নিন" : "Request a quote"}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/35 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {isBn ? "হোয়াটসঅ্যাপে কথা বলুন" : "Chat on WhatsApp"}
                  <span className="sr-only">{isBn ? "(নতুন ট্যাবে খুলবে)" : "(opens in a new tab)"}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
