import type { Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Double Jersey Circular Knitting Machine Sourcing | Tasneem",
  description:
    "Direct overseas sourcing of industrial double jersey circular knitting machines in Bangladesh. Interlock, rib, 8-lock machines with 28G/24G precision cylinders, CFR Chattogram shipping.",
  alternates: {
    canonical: `${COMPANY_INFO.domain}/double-jersey-circular-knitting-machine-sourcing`,
    languages: {
      en: `${COMPANY_INFO.domain}/en/double-jersey-circular-knitting-machine-sourcing`,
      bn: `${COMPANY_INFO.domain}/bn/double-jersey-circular-knitting-machine-sourcing`,
      "x-default": `${COMPANY_INFO.domain}/double-jersey-circular-knitting-machine-sourcing`,
    },
  },
  openGraph: {
    title: "Double Jersey Circular Knitting Machine Sourcing Bangladesh",
    description:
      "High-speed industrial double jersey circular knitting machines for export interlock & rib fabrics. CFR Chattogram shipping, pre-shipment inspection, and factory commissioning.",
    url: `${COMPANY_INFO.domain}/double-jersey-circular-knitting-machine-sourcing`,
  },
};

export default function DoubleJerseyPageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
