"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Toast {
  id: string;
  type: "success" | "error" | "info";
  message: string;
  description?: string;
}

interface ToastContextType {
  toast: (options: { type?: "success" | "error" | "info"; message: string; description?: string }) => void;
  showToast: (message: string, type?: "success" | "error" | "info", description?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ type = "success", message, description }: { type?: "success" | "error" | "info"; message: string; description?: string }) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      const newToast: Toast = { id, type, message, description };
      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  const showToast = useCallback(
    (message: string, type: "success" | "error" | "info" = "success", description?: string) => {
      toast({ type, message, description });
    },
    [toast]
  );

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl bg-white border shadow-lg transition-all animate-in slide-in-from-bottom-3 duration-200",
              t.type === "success" && "border-emerald-200/80 text-slate-900",
              t.type === "error" && "border-rose-200/80 text-slate-900",
              t.type === "info" && "border-slate-200 text-slate-900"
            )}
          >
            {t.type === "success" && <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />}
            {t.type === "error" && <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />}
            {t.type === "info" && <Info className="h-5 w-5 text-slate-600 shrink-0 mt-0.5" />}

            <div className="flex-1 text-xs">
              <p className="font-semibold text-slate-900">{t.message}</p>
              {t.description && <p className="text-slate-500 mt-0.5">{t.description}</p>}
            </div>

            <button
              onClick={() => removeToast(t.id)}
              className="text-slate-400 hover:text-slate-700 p-0.5 rounded transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
