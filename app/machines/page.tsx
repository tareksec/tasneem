import { Metadata } from "next";
import { getDbMachines } from "@/lib/db/machines";
import { MachinesCatalogClient } from "@/components/machines/MachinesCatalogClient";

export const metadata: Metadata = {
  title: "Industrial Machinery Catalog | Circular Knitting, Dyeing & Finishing Equipment",
  description:
    "Explore industrial circular knitting machines (single & double jersey, interlock, jacquard, terry), high-temp eco-dyeing vessels, rotary shearing, and stenter compactors. Direct OEM imports with CFR Chattogram delivery and Bangladesh factory commissioning.",
  keywords: [
    "circular knitting machine bangladesh",
    "double jersey circular knitting machine",
    "single jersey circular knitting machine",
    "jiunn long circular knitting",
    "rongxiang knitting machine",
    "longjun interlock machine",
    "thies dyeing machine bangladesh",
    "crosta fabric shearing machine",
    "bruckner compactor stenter",
    "tasneem knit industry machinery",
  ],
  openGraph: {
    title: "Industrial Textile Machinery Catalog | Tasneem Knitting Industry",
    description:
      "Direct OEM import of circular knitting, dyeing, shearing, and finishing equipment for Bangladesh export composite textile mills.",
    type: "website",
    url: "https://tasneemknitindustry.com/machines",
  },
};

export default async function MachinesIndexPage() {
  const initialMachines = await getDbMachines({ includeDrafts: false });

  return <MachinesCatalogClient initialMachines={initialMachines} />;
}
