import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

const toneClasses = {
  neutral: "bg-ivory/10 text-ivory-muted",
  gold: "bg-gold/15 text-gold-soft",
  emerald: "bg-emerald-soft/20 text-emerald-soft",
  danger: "bg-danger/15 text-danger",
} as const;

interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  tone?: keyof typeof toneClasses;
}

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
