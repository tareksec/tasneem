"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { GlassDock, DockItem } from "@/components/ui/glass-dock";
import { Cpu, FileText, MessageCircle, Home, BookOpen } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants";
import { trackWhatsAppClick } from "@/components/analytics/GoogleAnalytics";

export function MobileGlassDock() {
  const pathname = usePathname();

    // Keep the specialized catalog docks on listing pages, but show the public dock on machine details.
    const pathSegments = pathname?.split("/").filter(Boolean) ?? [];
    const isMachineCatalogRoute = pathname === "/machines" || (pathname?.startsWith("/machines/") && pathSegments.length === 2);
    if (!pathname || pathname.startsWith("/admin") || isMachineCatalogRoute || pathname.startsWith("/shop")) {
    return null;
  }

  const cleanPhone = COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    "Hello Tasneem Knit Industry, I would like to inquire about industrial circular knitting machinery specifications and quotation."
  )}`;

  const items: DockItem[] = [
    {
      title: "Home",
      // Lucide fallback icon; built-in morphing icon triggers for "Home"
      icon: Home,
      href: "/",
      isActive: pathname === "/",
    },
    {
      title: "Machines",
      icon: Cpu,
      href: "/machines",
      isActive: pathname.startsWith("/machines"),
    },
    {
      title: "Quote",
      icon: FileText,
      href: "/quote",
      isActive: pathname.startsWith("/quote"),
    },
    {
      title: "Blog",
      // Lucide fallback icon; built-in morphing icon triggers for "Blog"
      icon: BookOpen,
      href: "/blog",
      isActive: pathname.startsWith("/blog"),
    },
    {
      title: "WhatsApp",
      icon: MessageCircle,
      href: whatsappUrl,
      onClick: () => {
        trackWhatsAppClick("mobile_glass_dock");
      },
      isActive: false,
    },
  ];

  return (
    <aside
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 px-3 pointer-events-none md:hidden"
    >
      <div className="pointer-events-auto">
        <GlassDock items={items} />
      </div>
    </aside>
  );
}
