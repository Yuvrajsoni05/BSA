import type { Metadata } from "next";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Inventory" };

export default function InventoryPage() {
  return (
    <>
      <AdminTopbar title="Inventory" />
      <Container className="max-w-none flex-1 py-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-ivory-muted">
            {products.length} products &middot;{" "}
            {products.filter((p) => !p.inStock).length} out of stock
          </p>
          <Button size="sm">Add product</Button>
        </div>

        <Card className="p-0">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-ivory-muted">
                <th className="px-6 py-3 font-normal">SKU</th>
                <th className="px-6 py-3 font-normal">Product</th>
                <th className="px-6 py-3 font-normal">Category</th>
                <th className="px-6 py-3 font-normal">Weight</th>
                <th className="px-6 py-3 font-normal">Stock</th>
                <th className="px-6 py-3 text-right font-normal">Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-ivory/5">
                  <td className="px-6 py-3 text-ivory-muted">{product.sku}</td>
                  <td className="px-6 py-3 text-ivory">{product.name}</td>
                  <td className="px-6 py-3 text-ivory-muted capitalize">
                    {product.category}
                  </td>
                  <td className="px-6 py-3 text-ivory-muted">
                    {product.weightGrams}g
                  </td>
                  <td className="px-6 py-3">
                    {product.inStock ? (
                      <Badge tone="emerald">{product.stockCount} in stock</Badge>
                    ) : (
                      <Badge tone="danger">Out of stock</Badge>
                    )}
                  </td>
                  <td className="px-6 py-3 text-right text-ivory">
                    {formatCurrency(product.price)}
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
