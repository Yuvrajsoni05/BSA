import type { Metadata } from "next";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";
import { orders } from "@/data/orders";
import { formatCurrency, formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Orders" };

export default function OrdersPage() {
  return (
    <>
      <AdminTopbar title="Orders" />
      <Container className="max-w-none flex-1 py-8">
        <Card className="p-0">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-ivory-muted">
                <th className="px-6 py-3 font-normal">Order</th>
                <th className="px-6 py-3 font-normal">Customer</th>
                <th className="px-6 py-3 font-normal">Items</th>
                <th className="px-6 py-3 font-normal">Status</th>
                <th className="px-6 py-3 font-normal">Placed</th>
                <th className="px-6 py-3 text-right font-normal">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-ivory/5 align-top">
                  <td className="px-6 py-3 text-ivory">{order.orderNumber}</td>
                  <td className="px-6 py-3 text-ivory-muted">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-3 text-ivory-muted">
                    {order.items.map((item) => (
                      <div key={item.productId}>
                        {item.quantity} &times; {item.name}
                      </div>
                    ))}
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
