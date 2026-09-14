import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "destructive" | "outline" | "brand";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-[#2D2D2D] text-white",
    secondary: "bg-[#F9F9F9] text-[#4A4A4A] border border-[#E5E5E5]",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-semibold",
    warning: "bg-amber-50 text-amber-700 border border-amber-200/80 font-semibold",
    destructive: "bg-rose-50 text-rose-700 border border-rose-200/80 font-semibold",
    outline: "border border-[#E5E5E5] text-[#2D2D2D] bg-white",
    brand: "bg-[#FDF2F4] text-[#800020] border border-[#D8A4AF] font-semibold",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[11px] rounded-md",
    md: "px-2.5 py-1 text-xs rounded-lg",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-medium select-none transition-colors",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
