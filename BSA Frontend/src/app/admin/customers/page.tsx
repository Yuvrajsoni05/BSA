import type { Metadata } from "next";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { customers } from "@/data/customers";
import { formatCurrency, formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Customers" };

export default function CustomersPage() {
  return (
    <>
      <AdminTopbar title="Customers" />
      <Container className="max-w-none flex-1 py-8">
        <Card className="p-0">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-ivory-muted">
                <th className="px-6 py-3 font-normal">Name</th>
                <th className="px-6 py-3 font-normal">Contact</th>
                <th className="px-6 py-3 font-normal">Orders</th>
                <th className="px-6 py-3 font-normal">Customer since</th>
                <th className="px-6 py-3 text-right font-normal">
                  Lifetime value
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-t border-ivory/5">
                  <td className="px-6 py-3 text-ivory">{customer.name}</td>
                  <td className="px-6 py-3 text-ivory-muted">
                    <div>{customer.phone}</div>
                    <div>{customer.email}</div>
                  </td>
                  <td className="px-6 py-3 text-ivory-muted">
                    {customer.totalOrders}
                  </td>
                  <td className="px-6 py-3 text-ivory-muted">
                    {formatDate(customer.joinedAt)}
                  </td>
                  <td className="px-6 py-3 text-right text-ivory">
                    {formatCurrency(customer.lifetimeValue)}
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
