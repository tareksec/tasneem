"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Locale, Dictionary, dictionaries, getDictionary } from "./dictionaries";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  dict: Dictionary;
  t: Dictionary;
  isPending: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "bn"; // Default to Bangla per Bangladesh audience

  // 1. Check URL path
  const path = window.location.pathname;
  if (path.startsWith("/en/") || path === "/en") return "en";
  if (path.startsWith("/bn/") || path === "/bn") return "bn";

  // 2. Check cookie
  const match = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]+)/);
  if (match && (match[1] === "en" || match[1] === "bn")) {
    return match[1] as Locale;
  }

  // 3. Check localStorage
  try {
    const saved = localStorage.getItem("tasneem_locale");
    if (saved === "en" || saved === "bn") return saved as Locale;
  } catch {
    // ignore
  }

  return "bn"; // Default
}

export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale || "bn");
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  // Initialize on mount
  useEffect(() => {
    const detected = getInitialLocale();
    if (detected !== locale) {
      setLocaleState(detected);
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = detected;
    }
  }, []);

  // Sync with URL when pathname changes (e.g. back/forward navigation or link clicks)
  useEffect(() => {
    if (pathname) {
      if (pathname.startsWith("/en/") || pathname === "/en") {
        if (locale !== "en") {
          setLocaleState("en");
          if (typeof document !== "undefined") document.documentElement.lang = "en";
        }
      } else if (pathname.startsWith("/bn/") || pathname === "/bn") {
        if (locale !== "bn") {
          setLocaleState("bn");
          if (typeof document !== "undefined") document.documentElement.lang = "bn";
        }
      }
    }
  }, [pathname, locale]);

  const setLocale = useCallback(
    (newLocale: Locale) => {
      setLocaleState(newLocale);

      // Persist in cookie (1 year)
      if (typeof document !== "undefined") {
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
        document.documentElement.lang = newLocale;
      }

      // Persist in localStorage
      try {
        localStorage.setItem("tasneem_locale", newLocale);
      } catch {
        // ignore
      }

      // Update URL to /en/... or /bn/... unless on admin/api routes
      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        if (currentPath.startsWith("/admin") || currentPath.startsWith("/api")) {
          return;
        }

        let cleanPath = currentPath;
        if (cleanPath.startsWith("/en")) {
          cleanPath = cleanPath.slice(3);
        } else if (cleanPath.startsWith("/bn")) {
          cleanPath = cleanPath.slice(3);
        }
        if (!cleanPath.startsWith("/")) {
          cleanPath = "/" + cleanPath;
        }

        const targetPath = `/${newLocale}${cleanPath === "/" ? "" : cleanPath}${window.location.search}${window.location.hash}`;
        if (targetPath !== currentPath + window.location.search + window.location.hash) {
          startTransition(() => {
            router.push(targetPath);
          });
        }
      }
    },
    [router]
  );

  const toggleLocale = useCallback(() => {
    const target: Locale = locale === "en" ? "bn" : "en";
    setLocale(target);
  }, [locale, setLocale]);

  const dict = dictionaries[locale] || dictionaries.en;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale, dict, t: dict, isPending }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback if rendered outside provider
    const fallbackDict = getDictionary("bn");
    return {
      locale: "bn" as Locale,
      setLocale: () => {},
      toggleLocale: () => {},
      dict: fallbackDict,
      t: fallbackDict,
      isPending: false,
    };
  }
  return context;
}
