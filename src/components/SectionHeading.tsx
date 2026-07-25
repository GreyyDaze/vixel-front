import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <h2 className={cn(
      "text-[26px] sm:text-[32px] lg:text-[44px] leading-[1.1] tracking-[-0.02em] font-medium text-text-primary",
      className
    )}>
      {children}
    </h2>
  );
}
