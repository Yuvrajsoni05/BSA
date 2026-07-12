import type { Appointment, Customer } from "@/types/customer";

export const customers: Customer[] = [
  {
    id: "c1",
    name: "Priya Shah",
    email: "priya.shah@example.com",
    phone: "9825012345",
    totalOrders: 3,
    lifetimeValue: 312500,
    joinedAt: "2024-02-14",
  },
  {
    id: "c2",
    name: "Rohan Mehta",
    email: "rohan.mehta@example.com",
    phone: "9998812345",
    totalOrders: 1,
    lifetimeValue: 112000,
    joinedAt: "2026-07-05",
  },
  {
    id: "c3",
    name: "Ananya Desai",
    email: "ananya.desai@example.com",
    phone: "9723345612",
    totalOrders: 2,
    lifetimeValue: 71900,
    joinedAt: "2025-11-02",
  },
];

export const appointments: Appointment[] = [
  {
    id: "a1",
    customerId: "c2",
    customerName: "Rohan Mehta",
    type: "fitting",
    status: "confirmed",
    scheduledAt: "2026-07-13T11:00:00+05:30",
    durationMinutes: 30,
  },
  {
    id: "a2",
    customerId: "c3",
    customerName: "Ananya Desai",
    type: "custom-order",
    status: "requested",
    scheduledAt: "2026-07-15T15:30:00+05:30",
    durationMinutes: 45,
    notes: "Wants a custom bridal set, budget ~₹2L.",
  },
];
