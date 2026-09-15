import type { Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Import, Inspection & Commissioning Services | Tasneem Knitting Industry",
  description:
    "Comprehensive machinery import services: OEM direct sourcing, accredited 3rd-party pre-shipment inspections (SGS/ITS/BV), CFR Chattogram container shipping, factory-floor leveling, and local technician support in Bangladesh.",
  alternates: {
    canonical: `${COMPANY_INFO.domain}/services`,
    languages: {
      en: `${COMPANY_INFO.domain}/en/services`,
      bn: `${COMPANY_INFO.domain}/bn/services`,
      "x-default": `${COMPANY_INFO.domain}/services`,
    },
  },
  openGraph: {
    title: "Machinery Import & Turnkey Engineering Services | Tasneem Knitting Industry",
    description: "Factory sourcing, container shipping, and factory-floor commissioning across Bangladesh.",
    url: `${COMPANY_INFO.domain}/services`,
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
