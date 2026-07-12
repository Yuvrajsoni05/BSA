import { Badge } from "@/components/ui/badge";
import { orderStatusLabels } from "@/data/orders";
import type { OrderStatus } from "@/types/order";

const toneByStatus: Record<OrderStatus, "neutral" | "gold" | "emerald" | "danger"> = {
  pending: "neutral",
  confirmed: "gold",
  "in-progress": "gold",
  "ready-for-pickup": "emerald",
  completed: "emerald",
  cancelled: "danger",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return <Badge tone={toneByStatus[status]}>{orderStatusLabels[status]}</Badge>;
}
