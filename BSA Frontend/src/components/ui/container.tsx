import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

export function Container({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-6 lg:px-8", className)}
      {...props}
    />
  );
}
