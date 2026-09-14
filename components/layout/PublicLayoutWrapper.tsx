"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ReactLenis } from "lenis/react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { MobileGlassDock } from "@/components/layout/MobileGlassDock";
import { CustomerAuthProvider } from "@/lib/customer/customer-context";

import { ScrollRestorationManager } from "@/components/layout/ScrollRestorationManager";

export function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    // Render clean admin layout without public site header, footer, or floating WhatsApp CTA
    return <div className="min-h-screen bg-[#F4F5F9] text-slate-900 font-sans">{children}</div>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        stopInertiaOnNavigate: true,
      }}
    >
      <ScrollRestorationManager />
      <CustomerAuthProvider>
        <Header />
        <main className="flex-1 bg-white pb-20 md:pb-0">{children}</main>
        <Footer />
        <WhatsAppButton />
        <MobileGlassDock />
      </CustomerAuthProvider>
    </ReactLenis>
  );
}

