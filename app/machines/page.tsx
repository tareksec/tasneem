import { Metadata } from "next";
import { getDbMachines } from "@/lib/db/machines";
import { MachinesCatalogClient } from "@/components/machines/MachinesCatalogClient";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Industrial Machinery Catalog | Circular Knitting, Dyeing & Finishing Equipment",
  description:
    "Explore industrial circular knitting machines (single & double jersey, interlock, jacquard, terry), high-temp eco-dyeing vessels, rotary shearing, and stenter compactors. Direct OEM imports with CFR Chattogram delivery and Bangladesh factory commissioning.",
  alternates: {
    canonical: `${COMPANY_INFO.domain}/machines`,
    languages: {
      en: `${COMPANY_INFO.domain}/en/machines`,
      bn: `${COMPANY_INFO.domain}/bn/machines`,
      "x-default": `${COMPANY_INFO.domain}/machines`,
    },
  },
  openGraph: {
    title: "Industrial Textile Machinery Catalog | Tasneem Knitting Industry",
    description:
      "Direct OEM import of circular knitting, dyeing, shearing, and finishing equipment for Bangladesh export composite textile mills.",
    type: "website",
    url: `${COMPANY_INFO.domain}/machines`,
  },
};

export default async function MachinesIndexPage() {
  const initialMachines = await getDbMachines({ includeDrafts: false });

  return <MachinesCatalogClient initialMachines={initialMachines} />;
}
