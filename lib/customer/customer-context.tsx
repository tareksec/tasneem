"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CustomerUser, QuoteRecord } from "@/lib/types";
import { AdminStore } from "@/lib/admin/admin-store";

interface CustomerAuthContextType {
  customer: CustomerUser | null;
  quotes: QuoteRecord[];
  isLoading: boolean;
  login: (email: string, password?: string) => { success: boolean; error?: string };
  register: (
    name: string,
    company: string,
    email: string,
    phoneOrWhatsApp: string,
    password?: string
  ) => { success: boolean; error?: string; customer?: CustomerUser };
  logout: () => void;
  updateProfile: (updates: Partial<CustomerUser>) => boolean;
  refreshQuotes: () => void;
}

const CustomerAuthContext = createContext<CustomerAuthContextType | undefined>(undefined);

const STORAGE_KEY_AUTH_EMAIL = "tasneem_customer_session_email";

export function CustomerAuthProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<CustomerUser | null>(null);
  const [quotes, setQuotes] = useState<QuoteRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const syncQuotes = (email: string) => {
    if (!email) {
      setQuotes([]);
      return;
    }
    const customerQuotes = AdminStore.getCustomerQuotes(email);
    setQuotes(customerQuotes);
  };

  useEffect(() => {
    try {
      const storedEmail = window.localStorage.getItem(STORAGE_KEY_AUTH_EMAIL);
      if (storedEmail) {
        const found = AdminStore.getCustomerByEmail(storedEmail);
        if (found && found.status === "approved") {
          setCustomer(found);
          syncQuotes(found.email);
        } else {
          window.localStorage.removeItem(STORAGE_KEY_AUTH_EMAIL);
          setCustomer(null);
        }
      }
    } catch {
      // Storage error fallback
    } finally {
      setIsLoading(false);
    }

    const handleUpdate = () => {
      const storedEmail = window.localStorage.getItem(STORAGE_KEY_AUTH_EMAIL);
      if (storedEmail) {
        const found = AdminStore.getCustomerByEmail(storedEmail);
        if (found && found.status === "approved") {
          setCustomer(found);
          syncQuotes(found.email);
        } else {
          window.localStorage.removeItem(STORAGE_KEY_AUTH_EMAIL);
          setCustomer(null);
        }
      }
    };

    window.addEventListener("tasneem-store-updated", handleUpdate);
    return () => window.removeEventListener("tasneem-store-updated", handleUpdate);
  }, []);

  const login = (email: string, password?: string): { success: boolean; error?: string } => {
    const trimmed = email.trim().toLowerCase();
    const found = AdminStore.getCustomerByEmail(trimmed);

    if (!found) {
      return {
        success: false,
        error: "এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট পাওয়া যায়নি। অনুগ্রহ করে সঠিক ইমেইল দিন বা নতুন অ্যাকাউন্ট তৈরি করুন। (No account found with this email.)",
      };
    }

    if (found.status === "pending") {
      return {
        success: false,
        error: "PENDING_APPROVAL: আপনার অ্যাকাউন্টটি এখনো অ্যাডমিন অনুমোদনের অপেক্ষায় রয়েছে (Pending Approval)। অ্যাডমিন টিম তথ্য যাচাই করে অনুমোদন দেওয়ার পর লগইন করতে পারবেন।",
      };
    }

    if (found.status === "rejected") {
      return {
        success: false,
        error: "ACCOUNT_REJECTED: আপনার অ্যাকাউন্ট রেজিস্ট্রেশন রিকোয়েস্টটি অনুমোদিত হয়নি। বিস্তারিত জানতে সাপোর্টে যোগাযোগ করুন।",
      };
    }

    setCustomer(found);
    window.localStorage.setItem(STORAGE_KEY_AUTH_EMAIL, found.email);
    syncQuotes(found.email);
    return { success: true };
  };

  const register = (
    name: string,
    company: string,
    email: string,
    phoneOrWhatsApp: string,
    password?: string
  ): { success: boolean; error?: string; customer?: CustomerUser } => {
    const trimmedEmail = email.trim().toLowerCase();
    const existing = AdminStore.getCustomerByEmail(trimmedEmail);

    if (existing) {
      if (existing.status === "pending") {
        return {
          success: false,
          error: "PENDING_APPROVAL: এই ইমেইল দিয়ে ইতোমধ্যে একটি রেজিস্ট্রেশন রিকোয়েস্ট জমা রয়েছে এবং তা অ্যাডমিন অনুমোদনের অপেক্ষায় রয়েছে।",
        };
      }
      return {
        success: false,
        error: "এই ইমেইল দিয়ে ইতোমধ্যে একটি সক্রিয় অ্যাকাউন্ট রয়েছে। অনুগ্রহ করে সাইন-ইন করুন।",
      };
    }

    const newCustomer: CustomerUser = {
      id: `cust-${Date.now()}`,
      name: name.trim(),
      company: company.trim(),
      email: trimmedEmail,
      phoneOrWhatsApp: phoneOrWhatsApp.trim(),
      password: password || "",
      status: "pending",
      isApproved: false,
      createdAt: new Date().toISOString(),
    };

    AdminStore.saveCustomer(newCustomer);
    return { success: true, customer: newCustomer };
  };

  const logout = () => {
    setCustomer(null);
    setQuotes([]);
    window.localStorage.removeItem(STORAGE_KEY_AUTH_EMAIL);
  };

  const updateProfile = (updates: Partial<CustomerUser>): boolean => {
    if (!customer) return false;
    const updated = AdminStore.updateCustomerProfile(customer.id, updates);
    if (updated) {
      setCustomer(updated);
      return true;
    }
    return false;
  };

  const refreshQuotes = () => {
    if (customer?.email) {
      syncQuotes(customer.email);
    }
  };

  return (
    <CustomerAuthContext.Provider
      value={{
        customer,
        quotes,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        refreshQuotes,
      }}
    >
      {children}
    </CustomerAuthContext.Provider>
  );
}

export function useCustomerAuth() {
  const context = useContext(CustomerAuthContext);
  if (!context) {
    throw new Error("useCustomerAuth must be used within a CustomerAuthProvider");
  }
  return context;
}
