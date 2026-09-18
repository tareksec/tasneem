import type { Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Single Jersey Circular Knitting Machine Sourcing | Tasneem",
  description:
    "Direct overseas sourcing of 4-track high-speed single jersey circular knitting machines in Bangladesh. Lycra feeder, open-width slitting, 28G/24G precision cylinders, CFR Chattogram.",
  alternates: {
    canonical: `${COMPANY_INFO.domain}/single-jersey-circular-knitting-machine-sourcing`,
    languages: {
      en: `${COMPANY_INFO.domain}/en/single-jersey-circular-knitting-machine-sourcing`,
      bn: `${COMPANY_INFO.domain}/bn/single-jersey-circular-knitting-machine-sourcing`,
      "x-default": `${COMPANY_INFO.domain}/single-jersey-circular-knitting-machine-sourcing`,
    },
  },
  openGraph: {
    title: "Single Jersey Circular Knitting Machine Sourcing Bangladesh",
    description:
      "High-speed 4-track single jersey circular knitting machines for export plain jersey, lycra, pique, and fleece fabrics. CFR Chattogram import & factory setup.",
    url: `${COMPANY_INFO.domain}/single-jersey-circular-knitting-machine-sourcing`,
  },
};

export default function SingleJerseyPageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
