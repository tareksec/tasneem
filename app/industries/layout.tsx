import type { Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Industries & Applications Served | Tasneem Knitting Industry",
  description:
    "Textile applications engineered for Bangladesh mills: Export Ready-Made Garments (RMG), heavyweight fleece, high-stretch rib collars, and high-gauge sportswear activewear.",
  alternates: {
    canonical: `${COMPANY_INFO.domain}/industries`,
    languages: {
      en: `${COMPANY_INFO.domain}/en/industries`,
      bn: `${COMPANY_INFO.domain}/bn/industries`,
      "x-default": `${COMPANY_INFO.domain}/industries`,
    },
  },
  openGraph: {
    title: "Industries Served | Tasneem Knitting Industry",
    description: "Machinery configurations for export knitwear, single jersey, interlock, and technical textiles.",
    url: `${COMPANY_INFO.domain}/industries`,
  },
};

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
