"use client";

import Script from "next/script";
import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslation } from "@/lib/i18n/LanguageContext";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-TASNEEMKNIT";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}

function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { locale } = useTranslation();

  useEffect(() => {
    if (typeof window.gtag === "function") {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
        page_location: window.location.href,
        content_language: locale,
        user_locale: locale,
      });
      window.gtag("event", "page_view_bilingual", {
        locale,
        page_path: url,
      });
    }
  }, [pathname, searchParams, locale]);

  return null;
}

export function GoogleAnalytics() {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              send_page_view: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
    </>
  );
}

// ==============================================================
// B2B Conversion Event Emitters
// ==============================================================

/**
 * Track formal B2B Quote Submission (Primary Conversion Event)
 */
export function trackQuoteSubmission(quoteId: string, machineName: string, locale: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", {
      event_category: "B2B Quote Request",
      event_label: machineName,
      value: 1.0,
      currency: "USD",
      quote_id: quoteId,
      machine_type: machineName,
      locale,
    });
  }
}

/**
 * Track WhatsApp Direct Inquiry Click (Key Mobile Lead Event)
 */
export function trackWhatsAppClick(source: string, machineName?: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "contact_whatsapp", {
      event_category: "Communication",
      event_label: source,
      machine_context: machineName || "general",
    });
  }
}

/**
 * Track Direct Telephone / Cellular Click
 */
export function trackPhoneClick(source: string, phoneNumber?: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "contact_phone", {
      event_category: "Communication",
      event_label: source,
      phone_number: phoneNumber || "+8801711110516",
    });
  }
}
