export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  lifetimeValue: number;
  joinedAt: string;
  notes?: string;
}

export type AppointmentType = "fitting" | "consultation" | "repair" | "custom-order";
export type AppointmentStatus = "requested" | "confirmed" | "completed" | "no-show" | "cancelled";

export interface Appointment {
  id: string;
  customerId: string;
  customerName: string;
  type: AppointmentType;
  status: AppointmentStatus;
  scheduledAt: string;
  durationMinutes: number;
  notes?: string;
}
