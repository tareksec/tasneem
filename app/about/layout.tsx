import type { Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us | Industrial Knitting, Dyeing & Finishing Machinery Importer",
  description:
    "Learn about Tasneem Knitting Industry, based in Narayanganj, Bangladesh. Direct factory importer of high-efficiency circular knitting, dyeing, shearing, and finishing machinery with turnkey CFR Chattogram delivery.",
  alternates: {
    canonical: `${COMPANY_INFO.domain}/about`,
    languages: {
      en: `${COMPANY_INFO.domain}/en/about`,
      bn: `${COMPANY_INFO.domain}/bn/about`,
      "x-default": `${COMPANY_INFO.domain}/about`,
    },
  },
  openGraph: {
    title: "About Tasneem Knitting Industry | Direct Machinery Importer",
    description: "Corporate profile, Narayanganj operations hub, China sourcing office, and operational guarantees.",
    url: `${COMPANY_INFO.domain}/about`,
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
