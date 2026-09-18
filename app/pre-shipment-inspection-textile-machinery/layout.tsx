import type { Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pre-Shipment Inspection (PSI) for Textile Machinery | Tasneem",
  description:
    "10-point Pre-Shipment Inspection (PSI) protocol for circular knitting & textile machinery. Verified trial runs, electronic checks, and fumigated packaging before L/C settlement.",
  alternates: {
    canonical: `${COMPANY_INFO.domain}/pre-shipment-inspection-textile-machinery`,
    languages: {
      en: `${COMPANY_INFO.domain}/en/pre-shipment-inspection-textile-machinery`,
      bn: `${COMPANY_INFO.domain}/bn/pre-shipment-inspection-textile-machinery`,
      "x-default": `${COMPANY_INFO.domain}/pre-shipment-inspection-textile-machinery`,
    },
  },
  openGraph: {
    title: "Pre-Shipment Inspection (PSI) for Imported Textile Machinery",
    description:
      "Comprehensive 10-point factory acceptance test (FAT) and PSI audit protocol ensuring zero defect machinery delivery to Bangladesh ports.",
    url: `${COMPANY_INFO.domain}/pre-shipment-inspection-textile-machinery`,
  },
};

export default function PsiPageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
