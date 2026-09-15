import type { Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Factory Installations & Project Records | Tasneem Knitting Industry",
  description:
    "Verified photographic and operational records of circular knitting, dyeing, and finishing machinery deployments in textile mills across Narayanganj, Gazipur, Savar, and Chittagong.",
  alternates: {
    canonical: `${COMPANY_INFO.domain}/projects`,
    languages: {
      en: `${COMPANY_INFO.domain}/en/projects`,
      bn: `${COMPANY_INFO.domain}/bn/projects`,
      "x-default": `${COMPANY_INFO.domain}/projects`,
    },
  },
  openGraph: {
    title: "Factory Installations & Field Projects | Tasneem Knitting Industry",
    description: "Real mill deployments and factory commissioning records in Bangladesh.",
    url: `${COMPANY_INFO.domain}/projects`,
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
