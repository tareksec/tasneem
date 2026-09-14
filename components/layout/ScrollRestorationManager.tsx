"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

export function ScrollRestorationManager() {
  const pathname = usePathname();
  const lenis = useLenis();
  const isPopStateRef = useRef(false);

  useEffect(() => {
    // Ensure browser's native scroll restoration behavior is active
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "auto";
    }

    const handlePopState = () => {
      isPopStateRef.current = true;
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    if (!lenis) return;

    if (isPopStateRef.current) {
      // Back/Forward browser navigation:
      // Allow the browser and Next.js router to restore native scroll offset,
      // then synchronize Lenis's internal virtual scroll tracker without resetting to top.
      isPopStateRef.current = false;
      
      const frameId = requestAnimationFrame(() => {
        lenis.resize();
        lenis.scrollTo(window.scrollY, { immediate: true });
      });

      return () => cancelAnimationFrame(frameId);
    } else {
      // Forward navigation / fresh page visit:
      // Per spec: fresh visits must start at the top of the page.
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return null;
}
