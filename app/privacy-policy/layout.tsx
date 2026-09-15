import type { Metadata } from "next";
import { COMPANY_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy & Data Protection Policy | Tasneem Knitting Industry",
  description:
    "Privacy and data protection policy of Tasneem Knitting Industry. Details on quotation request processing, Google Analytics cookies, customer records, and confidentiality guarantees.",
  alternates: {
    canonical: `${COMPANY_INFO.domain}/privacy-policy`,
    languages: {
      en: `${COMPANY_INFO.domain}/en/privacy-policy`,
      bn: `${COMPANY_INFO.domain}/bn/privacy-policy`,
      "x-default": `${COMPANY_INFO.domain}/privacy-policy`,
    },
  },
  openGraph: {
    title: "Privacy Policy | Tasneem Knitting Industry",
    description: "Transparency and confidentiality commitments for Bangladesh textile mills and buyers.",
    url: `${COMPANY_INFO.domain}/privacy-policy`,
  },
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
