import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          {
            "bg-orange-600 text-white shadow-sm hover:bg-orange-500 focus:ring-orange-500 ":
              variant === "primary",
            "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 ":
              variant === "secondary",
            "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500 ":
              variant === "outline",
          },
          {
            "px-3 py-1.5 text-sm": size === "sm",
            "px-4 py-2.5 text-sm": size === "md",
            "px-6 py-3 text-base": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
