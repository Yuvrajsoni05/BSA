import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  hint?: string;
}

export function StatCard({ label, value, icon: Icon, hint }: StatCardProps) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-ivory-muted">{label}</span>
        <Icon className="h-4 w-4 text-gold" strokeWidth={1.75} />
      </div>
      <span className="font-display text-3xl text-ivory">{value}</span>
      {hint && <span className="text-xs text-ivory-muted">{hint}</span>}
    </Card>
  );
}
