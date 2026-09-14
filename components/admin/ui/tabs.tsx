import React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  key: string;
  label: string;
  badge?: React.ReactNode;
  icon?: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  className?: string;
  size?: "sm" | "md";
}

export function Tabs({
  items,
  activeKey,
  onChange,
  className,
  size = "md",
}: TabsProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 p-1 bg-slate-100/90 rounded-xl border border-slate-200/60 shadow-2xs select-none max-w-full overflow-x-auto scrollbar-none",
        className
      )}
      role="tablist"
    >
      {items.map((tab) => {
        const isActive = activeKey === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.key)}
            className={cn(
              "inline-flex items-center gap-2 font-medium rounded-lg transition-all duration-150 cursor-pointer shrink-0 whitespace-nowrap",
              size === "sm" ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-xs sm:text-sm",
              isActive
                ? "bg-white text-slate-900 shadow-xs font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            )}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge && <span className="shrink-0">{tab.badge}</span>}
          </button>
        );
      })}
    </div>
  );
}
