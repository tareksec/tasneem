import type { Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Request Formal Machinery Quotation (CFR Chattogram) | Tasneem Knitting Industry",
  description:
    "Request formal commercial quotations for circular knitting machines, gauge selections, and factory commissioning under bank-to-bank L/C terms in Bangladesh.",
  alternates: {
    canonical: `${COMPANY_INFO.domain}/quote`,
    languages: {
      en: `${COMPANY_INFO.domain}/en/quote`,
      bn: `${COMPANY_INFO.domain}/bn/quote`,
      "x-default": `${COMPANY_INFO.domain}/quote`,
    },
  },
  openGraph: {
    title: "Request Quotation | Tasneem Knitting Industry",
    description: "Get customized CFR Chattogram machinery pricing and technical specifications.",
    url: `${COMPANY_INFO.domain}/quote`,
  },
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
