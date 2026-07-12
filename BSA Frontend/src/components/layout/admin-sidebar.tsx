"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Gem,
  Package,
  Users,
  CalendarClock,
  type LucideIcon,
} from "lucide-react";
import { adminNav, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  LayoutDashboard,
  Gem,
  Package,
  Users,
  CalendarClock,
};

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-ivory/10 bg-surface md:flex md:flex-col">
      <div className="flex h-20 items-center gap-2 px-6 font-display text-lg text-ivory">
        <Gem className="h-5 w-5 text-gold" strokeWidth={1.5} />
        {siteConfig.name}
        <span className="ml-1 rounded-full bg-emerald px-2 py-0.5 text-[10px] font-sans font-medium tracking-wide text-emerald-soft">
          ADMIN
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {adminNav.map((item) => {
          const Icon = icons[item.icon];
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                isActive
                  ? "bg-gold/15 text-gold-soft"
                  : "text-ivory-muted hover:bg-ivory/5 hover:text-ivory",
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={1.75} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
