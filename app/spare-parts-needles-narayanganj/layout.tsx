import type { Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Circular Knitting Spare Parts & Groz-Beckert Needles Narayanganj",
  description:
    "Original circular knitting machine spare parts in Narayanganj: Groz-Beckert needles, sinkers, yarn storage feeders, ceramic guides, and electronic inverters. Same-day dispatch.",
  alternates: {
    canonical: `${COMPANY_INFO.domain}/spare-parts-needles-narayanganj`,
    languages: {
      en: `${COMPANY_INFO.domain}/en/spare-parts-needles-narayanganj`,
      bn: `${COMPANY_INFO.domain}/bn/spare-parts-needles-narayanganj`,
      "x-default": `${COMPANY_INFO.domain}/spare-parts-needles-narayanganj`,
    },
  },
  openGraph: {
    title: "Circular Knitting Machine Spare Parts & Needles Hub Narayanganj",
    description:
      "Ready inventory of Groz-Beckert needles, precision sinkers, positive yarn feeders, and oil mist lubricators serving Narayanganj & Gazipur knit factories.",
    url: `${COMPANY_INFO.domain}/spare-parts-needles-narayanganj`,
  },
};

export default function SparePartsPageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
