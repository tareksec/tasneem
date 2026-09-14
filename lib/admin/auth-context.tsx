"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signIn, signOut, SessionProvider } from "next-auth/react";
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

const STORAGE_LOCALE_KEY = "tasneem_admin_content_locale";

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

function AdminAuthProviderInner({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [contentLocale, setContentLocaleState] = useState<ContentLocale>("en");
  const router = useRouter();
  const pathname = usePathname();

  // Load content locale from localStorage
  useEffect(() => {
    try {
      const savedLocale = window.localStorage.getItem(STORAGE_LOCALE_KEY) as ContentLocale;
      if (savedLocale === "en" || savedLocale === "bn") {
        setContentLocaleState(savedLocale);
      }
    } catch (e) {
      console.error("Failed to load content locale:", e);
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

  const user: StaffUser | null = session?.user
    ? {
        id: (session.user as any).id || "admin",
        name: session.user.name || "Staff Admin",
        email: session.user.email || "",
        role: (session.user as any).role || "Admin",
        avatar: session.user.image || "/images/staff-avatar.jpg",
      }
    : null;

  const isLoading = status === "loading";

  const login = async (email: string, pass: string) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: email.trim().toLowerCase(),
        password: pass,
      });

      if (result?.error) {
        return {
          success: false,
          error: result.error.includes("CredentialsSignin")
            ? "Invalid staff email or password."
            : result.error,
        };
      }

      if (result?.ok) {
        return { success: true };
      }

      return { success: false, error: "Authentication failed. Please try again." };
    } catch (err: any) {
      return { success: false, error: err.message || "An unexpected error occurred." };
    }
  };

  const logout = async () => {
    await signOut({ callbackUrl: "/admin/login" });
  };

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

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminAuthProviderInner>{children}</AdminAuthProviderInner>
    </SessionProvider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
