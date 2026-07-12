import type { Order } from "@/types/order";

export const orders: Order[] = [
  {
    id: "o1",
    orderNumber: "AAB-1042",
    customerId: "c1",
    customerName: "Priya Shah",
    items: [{ productId: "p1", name: "Kundan Choker Necklace", quantity: 1, price: 84500 }],
    status: "in-progress",
    total: 84500,
    placedAt: "2026-07-08T10:30:00+05:30",
    updatedAt: "2026-07-10T15:00:00+05:30",
    notes: "Resizing chain by 1 inch.",
  },
  {
    id: "o2",
    orderNumber: "AAB-1043",
    customerId: "c2",
    customerName: "Rohan Mehta",
    items: [{ productId: "p3", name: "Polki Solitaire Ring", quantity: 1, price: 112000 }],
    status: "ready-for-pickup",
    total: 112000,
    placedAt: "2026-07-05T12:00:00+05:30",
    updatedAt: "2026-07-11T09:15:00+05:30",
  },
  {
    id: "o3",
    orderNumber: "AAB-1044",
    customerId: "c3",
    customerName: "Ananya Desai",
    items: [
      { productId: "p2", name: "Antique Gold Jhumka", quantity: 1, price: 38900 },
      { productId: "p6", name: "Lotus Pendant", quantity: 2, price: 6400 },
    ],
    status: "pending",
    total: 51700,
    placedAt: "2026-07-11T18:20:00+05:30",
    updatedAt: "2026-07-11T18:20:00+05:30",
  },
  {
    id: "o4",
    orderNumber: "AAB-1041",
    customerId: "c1",
    customerName: "Priya Shah",
    items: [{ productId: "p5", name: "Diamond Tennis Bracelet", quantity: 1, price: 198000 }],
    status: "completed",
    total: 198000,
    placedAt: "2026-06-20T11:00:00+05:30",
    updatedAt: "2026-06-28T16:45:00+05:30",
  },
];

export const orderStatusLabels: Record<Order["status"], string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  "in-progress": "In progress",
  "ready-for-pickup": "Ready for pickup",
  completed: "Completed",
  cancelled: "Cancelled",
};
