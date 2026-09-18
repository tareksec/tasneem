import type { Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Knitwear Factory Setup & Machinery Consultancy Bangladesh | Tasneem",
  description:
    "Turnkey knitwear factory setup consultancy in Bangladesh: Circular knitting floor layouts, electrical load planning, compressed air CFM calculations, and machine commissioning.",
  alternates: {
    canonical: `${COMPANY_INFO.domain}/knitwear-factory-setup-consultancy-bangladesh`,
    languages: {
      en: `${COMPANY_INFO.domain}/en/knitwear-factory-setup-consultancy-bangladesh`,
      bn: `${COMPANY_INFO.domain}/bn/knitwear-factory-setup-consultancy-bangladesh`,
      "x-default": `${COMPANY_INFO.domain}/knitwear-factory-setup-consultancy-bangladesh`,
    },
  },
  openGraph: {
    title: "Turnkey Knitwear Factory Setup & Technical Consultancy Bangladesh",
    description:
      "Expert engineering consultancy for setting up modern composite knitwear and circular knitting mills in Narayanganj, Gazipur, and Chattogram.",
    url: `${COMPANY_INFO.domain}/knitwear-factory-setup-consultancy-bangladesh`,
  },
};

export default function FactoryConsultancyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
