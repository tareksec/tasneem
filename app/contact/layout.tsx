import type { Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us & Narayanganj Hub Visit | Tasneem Knitting Industry",
  description:
    "Contact Tasneem Knitting Industry in BSCIC Narayanganj, Bangladesh. Direct machinery inquiries, CFR Chattogram quotes, showroom visits, and spare parts support.",
  alternates: {
    canonical: `${COMPANY_INFO.domain}/contact`,
    languages: {
      en: `${COMPANY_INFO.domain}/en/contact`,
      bn: `${COMPANY_INFO.domain}/bn/contact`,
      "x-default": `${COMPANY_INFO.domain}/contact`,
    },
  },
  openGraph: {
    title: "Contact Tasneem Knitting Industry | Narayanganj Machinery Hub",
    description: "Connect with our sales and technical engineering team for circular knitting machine sourcing.",
    url: `${COMPANY_INFO.domain}/contact`,
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
