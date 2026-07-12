import type { Metadata } from "next";
import { IndianRupee, Package, Users, CalendarClock } from "lucide-react";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/admin/stat-card";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";
import { orders } from "@/data/orders";
import { customers, appointments } from "@/data/customers";
import { formatCurrency, formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };

export default function AdminDashboardPage() {
  const revenue = orders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + o.total, 0);
  const openOrders = orders.filter(
    (o) => o.status !== "completed" && o.status !== "cancelled",
  );

  return (
    <>
      <AdminTopbar title="Dashboard" />
      <Container className="max-w-none flex-1 py-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Revenue (completed)"
            value={formatCurrency(revenue)}
            icon={IndianRupee}
            hint="This month"
          />
          <StatCard
            label="Open orders"
            value={String(openOrders.length)}
            icon={Package}
            hint={`${orders.length} total`}
          />
          <StatCard
            label="Customers"
            value={String(customers.length)}
            icon={Users}
          />
          <StatCard
            label="Upcoming appointments"
            value={String(appointments.length)}
            icon={CalendarClock}
          />
        </div>

        <Card className="mt-8 p-0">
          <div className="border-b border-ivory/10 px-6 py-4">
            <h2 className="font-display text-lg text-ivory">Recent orders</h2>
          </div>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-ivory-muted">
                <th className="px-6 py-3 font-normal">Order</th>
                <th className="px-6 py-3 font-normal">Customer</th>
                <th className="px-6 py-3 font-normal">Status</th>
                <th className="px-6 py-3 font-normal">Placed</th>
                <th className="px-6 py-3 text-right font-normal">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-ivory/5">
                  <td className="px-6 py-3 text-ivory">{order.orderNumber}</td>
                  <td className="px-6 py-3 text-ivory-muted">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-3">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-3 text-ivory-muted">
                    {formatDate(order.placedAt)}
                  </td>
                  <td className="px-6 py-3 text-right text-ivory">
                    {formatCurrency(order.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Container>
    </>
  );
}
