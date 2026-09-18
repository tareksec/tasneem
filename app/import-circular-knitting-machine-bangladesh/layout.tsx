import type { Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Import Circular Knitting Machines to Bangladesh | L/C & Customs Guide",
  description:
    "Complete procedural guide to importing circular knitting machines in Bangladesh: HS Code 8447, Bangladesh Bank L/C regulations, CFR Chattogram shipping, and 1% capital duty clearance.",
  alternates: {
    canonical: `${COMPANY_INFO.domain}/import-circular-knitting-machine-bangladesh`,
    languages: {
      en: `${COMPANY_INFO.domain}/en/import-circular-knitting-machine-bangladesh`,
      bn: `${COMPANY_INFO.domain}/bn/import-circular-knitting-machine-bangladesh`,
      "x-default": `${COMPANY_INFO.domain}/import-circular-knitting-machine-bangladesh`,
    },
  },
  openGraph: {
    title: "Import Circular Knitting Machine to Bangladesh — Complete Guide",
    description:
      "Step-by-step import compliance: Bangladesh Bank L/C terms, CFR Chattogram customs clearance, HS Code 8447 classification, and factory commissioning.",
    url: `${COMPANY_INFO.domain}/import-circular-knitting-machine-bangladesh`,
  },
};

export default function ImportGuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
