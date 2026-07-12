export type OrderStatus =
  | "pending"
  | "confirmed"
  | "in-progress"
  | "ready-for-pickup"
  | "completed"
  | "cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  placedAt: string;
  updatedAt: string;
  notes?: string;
}
