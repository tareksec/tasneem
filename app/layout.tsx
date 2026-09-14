import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import { PublicLayoutWrapper } from "@/components/layout/PublicLayoutWrapper";
import { OrganizationSchema, LocalBusinessSchema } from "@/components/seo/SchemaOrg";
import { COMPANY_INFO } from "@/lib/constants";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-bengali",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY_INFO.domain),
  title: {
    default: "Tasneem Knitting Industry | Industrial Circular Knitting Machine Importer Bangladesh • সার্কুলার নিটিং মেশিন",
    template: "%s | Tasneem Knitting Industry",
  },
  description:
    "Direct overseas importer of industrial circular knitting machines in Bangladesh. Double Jersey, Single Jersey, Interlock, Jacquard & Terry machines with 3rd-party pre-shipment inspection, CFR Chattogram sea delivery, and factory installation. বাংলাদেশে উচ্চমানের সার্কুলার নিটিং মেশিন সরাসরি আমদানি।",
  keywords: [
    "knitting machine Bangladesh",
    "circular knitting machine Bangladesh",
    "industrial knitting machine Bangladesh",
    "double jersey knitting machine Bangladesh",
    "single jersey knitting machine Bangladesh",
    "interlock knitting machine Bangladesh",
    "jacquard knitting machine Bangladesh",
    "terry knitting machine Bangladesh",
    "textile machinery Bangladesh",
    "knitting machine price Bangladesh",
    "CFR Chattogram machinery import",
    "নিটিং মেশিন বাংলাদেশ",
    "সার্কুলার নিটিং মেশিন বাংলাদেশ",
    "শিল্প নিটিং মেশিন",
    "ডাবল জার্সি নিটিং মেশিন",
    "সিঙ্গেল জার্সি নিটিং মেশিন",
    "ইন্টারলক নিটিং মেশিন",
    "জ্যাকার্ড নিটিং মেশিন",
    "টেরি নিটিং মেশিন",
    "টেক্সটাইল মেশিনারি বাংলাদেশ",
    "নিটিং মেশিনের দাম বাংলাদেশ",
    "সিএফআর চট্টগ্রাম ডেলিভারি",
  ],
  authors: [
    { name: COMPANY_INFO.name, url: COMPANY_INFO.domain },
    { name: "Md Tarek", url: "https://www.linkedin.com/in/mdtarek404/" },
    { name: "artx.techvrs.com", url: "https://artx.techvrs.com" },
  ],
  creator: "Md Tarek (artx.techvrs.com)",
  publisher: COMPANY_INFO.name,
  alternates: {
    canonical: COMPANY_INFO.domain,
    languages: {
      "en": `${COMPANY_INFO.domain}/en`,
      "bn": `${COMPANY_INFO.domain}/bn`,
      "x-default": COMPANY_INFO.domain,
    },
  },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    alternateLocale: ["en_US"],
    url: COMPANY_INFO.domain,
    title: "Tasneem Knitting Industry | Industrial Circular Knitting Machine Sourcing Bangladesh",
    description:
      "Direct overseas importer of industrial circular knitting machines for Bangladesh textile mills. CFR Chattogram delivery, pre-shipment inspection, and on-site factory commissioning.",
    siteName: COMPANY_INFO.name,
    images: [
      {
        url: `${COMPANY_INFO.domain}/logo/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Tasneem Knitting Industry - Industrial Circular Knitting Machine Sourcing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tasneem Knitting Industry | Circular Knitting Machine Sourcing",
    description: "Industrial circular knitting machinery direct import & factory commissioning in Bangladesh.",
    images: [`${COMPANY_INFO.domain}/logo/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/logo/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || "google-site-verification-tasneem-pending",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className={`${notoSerifBengali.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="512x512" />
        <link rel="icon" href="/logo/icon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@100..900&family=Scoutie+Sans:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
        <OrganizationSchema />
        <LocalBusinessSchema />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#2D2D2D] font-sans antialiased selection:bg-[#800020] selection:text-white">
        <GoogleAnalytics />
        <LanguageProvider initialLocale="bn">
          <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}

