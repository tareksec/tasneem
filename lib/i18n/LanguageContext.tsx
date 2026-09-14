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

      // If URL has locale prefix (/en/ or /bn/), switch path
      if (pathname) {
        let newPath = pathname;
        if (pathname.startsWith("/en")) {
          newPath = pathname.replace(/^\/en/, newLocale === "bn" ? "/bn" : "/en");
        } else if (pathname.startsWith("/bn")) {
          newPath = pathname.replace(/^\/bn/, newLocale === "en" ? "/en" : "/bn");
        }

        if (newPath !== pathname) {
          startTransition(() => {
            router.push(newPath);
          });
        }
      }
    },
    [pathname, router]
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
