import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

const variantStyles = {
  active: "text-brand-blue bg-brand-tint",
  inactive: "text-text-tertiary bg-avatar-bg",
} as const;

const sizeStyles = {
  sm: "text-[9px] px-1.5 py-0.5",
  md: "text-[10px] px-2 py-0.5",
} as const;

export function StatusChip({
  children,
  variant = "active",
  size = "md",
  className,
}: {
  children: ReactNode;
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  className?: string;
}) {
  return (
    <span className={cn(
      "font-medium shrink-0 rounded",
      variantStyles[variant],
      sizeStyles[size],
      className,
    )}>
      {children}
    </span>
  );
}
