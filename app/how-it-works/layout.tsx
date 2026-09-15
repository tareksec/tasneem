import type { Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Import & Commissioning Process (How It Works) | Tasneem Knitting Industry",
  description:
    "Step-by-step process of importing industrial circular knitting machinery in Bangladesh: specs matching, bank-to-bank L/C opening, overseas factory build, pre-shipment inspection, port clearance, and on-site factory trial knitting.",
  alternates: {
    canonical: `${COMPANY_INFO.domain}/how-it-works`,
    languages: {
      en: `${COMPANY_INFO.domain}/en/how-it-works`,
      bn: `${COMPANY_INFO.domain}/bn/how-it-works`,
      "x-default": `${COMPANY_INFO.domain}/how-it-works`,
    },
  },
  openGraph: {
    title: "How It Works: Machinery Import Process | Tasneem Knitting Industry",
    description: "End-to-end procedural workflow for importing circular knitting machines from China and Taiwan to Bangladesh.",
    url: `${COMPANY_INFO.domain}/how-it-works`,
  },
};

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
