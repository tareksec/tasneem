import type { Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Circular Knitting Machine Price in Bangladesh | Tasneem Knit",
  description:
    "Explore 2026 industrial circular knitting machine prices in Bangladesh. Factory-direct CFR Chattogram rates for Single Jersey, Double Jersey, Interlock & Jacquard machinery under bank L/C.",
  alternates: {
    canonical: `${COMPANY_INFO.domain}/circular-knitting-machine-price-in-bangladesh`,
    languages: {
      en: `${COMPANY_INFO.domain}/en/circular-knitting-machine-price-in-bangladesh`,
      bn: `${COMPANY_INFO.domain}/bn/circular-knitting-machine-price-in-bangladesh`,
      "x-default": `${COMPANY_INFO.domain}/circular-knitting-machine-price-in-bangladesh`,
    },
  },
  openGraph: {
    title: "Circular Knitting Machine Price in Bangladesh | CFR Sourcing Guide",
    description:
      "Comprehensive price guide and cost factors for circular knitting machines in Bangladesh: gauge, cylinder diameter, feeder counts, CFR Chattogram ocean freight, and pre-shipment inspection.",
    url: `${COMPANY_INFO.domain}/circular-knitting-machine-price-in-bangladesh`,
  },
};

export default function PricePageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
