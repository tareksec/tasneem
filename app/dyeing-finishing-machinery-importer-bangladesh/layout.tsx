import type { Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Dyeing & Finishing Machinery Importer Bangladesh | Tasneem",
  description:
    "Importer and supplier of industrial textile dyeing & finishing machinery in Bangladesh: Low-liquor ratio soft-flow dyeing, stenters, tubular compactors, CFR Chattogram.",
  alternates: {
    canonical: `${COMPANY_INFO.domain}/dyeing-finishing-machinery-importer-bangladesh`,
    languages: {
      en: `${COMPANY_INFO.domain}/en/dyeing-finishing-machinery-importer-bangladesh`,
      bn: `${COMPANY_INFO.domain}/bn/dyeing-finishing-machinery-importer-bangladesh`,
      "x-default": `${COMPANY_INFO.domain}/dyeing-finishing-machinery-importer-bangladesh`,
    },
  },
  openGraph: {
    title: "Dyeing & Finishing Machinery Importer Bangladesh",
    description:
      "Eco-efficient soft-flow dyeing machines, multi-chamber stenters, and precision fabric compactors imported with full bank L/C compliance.",
    url: `${COMPANY_INFO.domain}/dyeing-finishing-machinery-importer-bangladesh`,
  },
};

export default function DyeingMachineryPageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
