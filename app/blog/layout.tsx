import type { Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Industrial Knitting & Textile Technology Blog",
  description:
    "Engineering insights, machinery gauge selection, CFR Chattogram import procedures, and maintenance guides for Bangladesh knitting mills and textile manufacturers.",
  alternates: {
    canonical: `${COMPANY_INFO.domain}/blog`,
    languages: {
      en: `${COMPANY_INFO.domain}/en/blog`,
      bn: `${COMPANY_INFO.domain}/bn/blog`,
      "x-default": `${COMPANY_INFO.domain}/blog`,
    },
  },
  openGraph: {
    title: "Industrial Knitting & Textile Technology Blog | Tasneem Knitting Industry",
    description:
      "Technical guides, gauge calculations, and factory operational insights for circular knitting machinery in Bangladesh.",
    url: `${COMPANY_INFO.domain}/blog`,
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
