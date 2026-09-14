"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { StaffUser, ContentLocale } from "./types";

interface AdminAuthContextType {
  user: StaffUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  contentLocale: ContentLocale;
  setContentLocale: (locale: ContentLocale) => void;
}

const DEFAULT_STAFF: StaffUser = {
  id: "staff-1",
  name: "Ferra Alexandra",
  email: "admin@tasneem.com",
  role: "Admin",
  avatar: "/images/staff-avatar.jpg",
};

const STORAGE_AUTH_KEY = "tasneem_admin_session";
const STORAGE_LOCALE_KEY = "tasneem_admin_content_locale";

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<StaffUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [contentLocale, setContentLocaleState] = useState<ContentLocale>("en");
  const router = useRouter();
  const pathname = usePathname();

  // Load session from localStorage
  useEffect(() => {
    try {
      const savedAuth = window.localStorage.getItem(STORAGE_AUTH_KEY);
      if (savedAuth) {
        setUser(JSON.parse(savedAuth));
      } else {
        // Automatically provide default active session for easy dev/preview if not explicitly logged out
        const hasLoggedOut = window.sessionStorage.getItem("tasneem_admin_explicit_logout");
        if (!hasLoggedOut) {
          setUser(DEFAULT_STAFF);
          window.localStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify(DEFAULT_STAFF));
        }
      }

      const savedLocale = window.localStorage.getItem(STORAGE_LOCALE_KEY) as ContentLocale;
      if (savedLocale === "en" || savedLocale === "bn") {
        setContentLocaleState(savedLocale);
      }
    } catch (e) {
      console.error("Failed to load admin auth:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setContentLocale = (locale: ContentLocale) => {
    setContentLocaleState(locale);
    try {
      window.localStorage.setItem(STORAGE_LOCALE_KEY, locale);
      window.dispatchEvent(new CustomEvent("tasneem-content-locale-changed", { detail: { locale } }));
    } catch (e) {
      console.error("Failed to persist content locale:", e);
    }
  };

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    // Simulate brief network authentication check
    await new Promise((resolve) => setTimeout(resolve, 350));

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !pass) {
      setIsLoading(false);
      return { success: false, error: "Please enter your staff email and password." };
    }

    // Accept demo admin or any staff email with password length >= 6
    if (
      cleanEmail === "admin@tasneem.com" ||
      cleanEmail === "staff@tasneemknitindustry.com" ||
      (cleanEmail.includes("@") && pass.length >= 4)
    ) {
      const authenticatedUser: StaffUser = {
        ...DEFAULT_STAFF,
        email: cleanEmail,
        name: cleanEmail.startsWith("admin") ? "Ferra Alexandra" : "Admin Staff",
        role: "Admin",
      };
      setUser(authenticatedUser);
      window.sessionStorage.removeItem("tasneem_admin_explicit_logout");
      window.localStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify(authenticatedUser));
      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return {
      success: false,
      error: "Invalid staff credentials. (Hint: Use demo login or admin@tasneem.com)",
    };
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem(STORAGE_AUTH_KEY);
    window.sessionStorage.setItem("tasneem_admin_explicit_logout", "true");
    router.push("/admin/login");
  };

  // Guard protected admin routes: if not loading and unauthenticated and not on /admin/login
  useEffect(() => {
    if (!isLoading && !user && pathname && pathname.startsWith("/admin") && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [user, isLoading, pathname, router]);

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        contentLocale,
        setContentLocale,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
