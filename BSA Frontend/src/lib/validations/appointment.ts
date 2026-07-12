import { z } from "zod";

export const appointmentRequestSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.email("Enter a valid email address").optional().or(z.literal("")),
  type: z.enum(["fitting", "consultation", "repair", "custom-order"]),
  preferredDate: z.string().min(1, "Choose a preferred date"),
  notes: z.string().max(500, "Keep notes under 500 characters").optional(),
});

export type AppointmentRequestInput = z.infer<typeof appointmentRequestSchema>;
