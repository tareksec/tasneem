import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "accent";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#800020]/25 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer";

    const variants = {
      default: "bg-[#800020] text-white hover:bg-[#5A0017] shadow-xs active:scale-[0.99]",
      accent: "bg-[#2D2D2D] text-white hover:bg-[#1F1F1F] shadow-xs active:scale-[0.99]",
      secondary: "bg-[#F9F9F9] text-[#2D2D2D] border border-[#E5E5E5] hover:bg-slate-100 active:bg-slate-200",
      outline:
        "border border-[#E5E5E5] bg-white text-[#2D2D2D] hover:bg-[#FDF2F4]/50 hover:text-[#800020] hover:border-[#D8A4AF] shadow-2xs",
      ghost: "text-[#4A4A4A] hover:text-[#2D2D2D] hover:bg-slate-100/80",
      destructive: "bg-red-600 text-white hover:bg-red-700 shadow-xs active:scale-[0.99]",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-9 px-4 text-sm gap-2",
      lg: "h-11 px-5 text-sm gap-2.5",
      icon: "h-9 w-9 p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
