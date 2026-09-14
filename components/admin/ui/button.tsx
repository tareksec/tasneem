import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "accent";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer";

    const variants = {
      default: "bg-[#FF0000] text-white hover:bg-[#E00000] shadow-xs active:scale-[0.99]",
      accent: "bg-slate-900 text-white hover:bg-slate-800 shadow-xs active:scale-[0.99]",
      secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200/80 active:bg-slate-200",
      outline:
        "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 shadow-2xs",
      ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80",
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
