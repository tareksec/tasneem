import type { Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | Tasneem Knitting Industry",
  description:
    "Find answers to common questions regarding circular knitting machine imports, CFR Chattogram shipping terms, bank L/C issuance, pre-shipment inspections, and local spare parts support in Bangladesh.",
  alternates: {
    canonical: `${COMPANY_INFO.domain}/faq`,
    languages: {
      en: `${COMPANY_INFO.domain}/en/faq`,
      bn: `${COMPANY_INFO.domain}/bn/faq`,
      "x-default": `${COMPANY_INFO.domain}/faq`,
    },
  },
  openGraph: {
    title: "Machinery Import FAQs | Tasneem Knitting Industry",
    description: "Clear answers on circular knitting machinery, shipping logistics, customs documents, and after-sales support.",
    url: `${COMPANY_INFO.domain}/faq`,
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
