import type { Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Founder & Leadership | Md. Mamunur Rashid | Tasneem Knitting Industry",
  description:
    "Meet Md. Mamunur Rashid, Founder & Proprietor of Tasneem Knitting Industry. Discover his commitment to empowering Bangladesh's textile and knitwear industry with factory-direct circular knitting, dyeing, and finishing machinery.",
  alternates: {
    canonical: `${COMPANY_INFO.domain}/founder`,
    languages: {
      en: `${COMPANY_INFO.domain}/en/founder`,
      bn: `${COMPANY_INFO.domain}/bn/founder`,
      "x-default": `${COMPANY_INFO.domain}/founder`,
    },
  },
  openGraph: {
    title: "Founder & Leadership | Md. Mamunur Rashid | Tasneem Knitting Industry",
    description:
      "Meet Md. Mamunur Rashid, Founder & Proprietor of Tasneem Knitting Industry. Delivering verified industrial circular knitting, dyeing, and finishing machinery across Bangladesh.",
    url: `${COMPANY_INFO.domain}/founder`,
    images: [
      {
        url: `${COMPANY_INFO.domain}/images/founder/founder.jfif`,
        width: 1200,
        height: 900,
        alt: "Md. Mamunur Rashid - Founder & Proprietor, Tasneem Knitting Industry",
      },
    ],
  },
};

export default function FounderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
