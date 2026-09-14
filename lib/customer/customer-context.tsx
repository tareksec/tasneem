"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CustomerUser, QuoteRecord } from "@/lib/types";
import { AdminStore } from "@/lib/admin/admin-store";

interface CustomerAuthContextType {
  customer: CustomerUser | null;
  quotes: QuoteRecord[];
  isLoading: boolean;
  login: (email: string, password?: string) => boolean;
  register: (name: string, company: string, email: string, phoneOrWhatsApp: string) => boolean;
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
        if (found) {
          setCustomer(found);
          syncQuotes(found.email);
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
        if (found) {
          setCustomer(found);
          syncQuotes(found.email);
        }
      }
    };

    window.addEventListener("tasneem-store-updated", handleUpdate);
    return () => window.removeEventListener("tasneem-store-updated", handleUpdate);
  }, []);

  const login = (email: string): boolean => {
    const trimmed = email.trim();
    let found = AdminStore.getCustomerByEmail(trimmed);
    const user: CustomerUser = found || {
      id: `cust-${Date.now()}`,
      name: "Mill Procurement Officer",
      company: "Industrial Garments Mill Ltd.",
      email: trimmed,
      phoneOrWhatsApp: "+880 1711-000000",
      deliveryAddress: "BSCIC Industrial Area, Narayanganj",
      createdAt: new Date().toISOString(),
    };
    if (!found) {
      AdminStore.saveCustomer(user);
    }
    setCustomer(user);
    window.localStorage.setItem(STORAGE_KEY_AUTH_EMAIL, user.email);
    syncQuotes(user.email);
    return true;
  };

  const register = (
    name: string,
    company: string,
    email: string,
    phoneOrWhatsApp: string
  ): boolean => {
    const newCustomer: CustomerUser = {
      id: `cust-${Date.now()}`,
      name: name.trim(),
      company: company.trim(),
      email: email.trim(),
      phoneOrWhatsApp: phoneOrWhatsApp.trim(),
      createdAt: new Date().toISOString(),
    };
    AdminStore.saveCustomer(newCustomer);
    setCustomer(newCustomer);
    window.localStorage.setItem(STORAGE_KEY_AUTH_EMAIL, newCustomer.email);
    syncQuotes(newCustomer.email);
    return true;
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
