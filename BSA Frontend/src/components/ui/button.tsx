import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

const variantClasses = {
  primary:
    "bg-gold text-ground hover:bg-gold-soft focus-visible:outline-ivory",
  secondary:
    "border border-gold/40 text-ivory hover:border-gold hover:text-gold-soft",
  ghost: "text-ivory-muted hover:text-ivory",
} as const;

const sizeClasses = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
} as const;

type BaseProps = {
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
  className?: string;
};

type ButtonProps = BaseProps &
  ComponentPropsWithoutRef<"button"> & { href?: undefined };

type LinkProps = BaseProps &
  ComponentPropsWithoutRef<typeof Link> & { href: string };

/** Renders a <Link> when `href` is provided, otherwise a native <button>. */
export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps | LinkProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props as LinkProps;
    return <Link href={href} className={classes} {...rest} />;
  }

  return <button className={classes} {...(props as ButtonProps)} />;
}
