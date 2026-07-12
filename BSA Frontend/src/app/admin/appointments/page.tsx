import type { Metadata } from "next";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { appointments } from "@/data/customers";
import { formatDate } from "@/lib/utils";
import type { AppointmentStatus } from "@/types/customer";

export const metadata: Metadata = { title: "Appointments" };

const toneByStatus: Record<AppointmentStatus, "neutral" | "gold" | "emerald" | "danger"> = {
  requested: "neutral",
  confirmed: "gold",
  completed: "emerald",
  "no-show": "danger",
  cancelled: "danger",
};

export default function AppointmentsPage() {
  return (
    <>
      <AdminTopbar title="Appointments" />
      <Container className="max-w-none flex-1 py-8">
        <div className="grid gap-4">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="flex items-center justify-between">
              <div>
                <p className="font-display text-lg text-ivory">
                  {appointment.customerName}
                </p>
                <p className="text-sm text-ivory-muted capitalize">
                  {appointment.type.replace("-", " ")} &middot;{" "}
                  {formatDate(appointment.scheduledAt)} &middot;{" "}
                  {appointment.durationMinutes} min
                </p>
                {appointment.notes && (
                  <p className="mt-1 text-sm text-ivory-muted italic">
                    &ldquo;{appointment.notes}&rdquo;
                  </p>
                )}
              </div>
              <Badge tone={toneByStatus[appointment.status]}>
                {appointment.status.replace("-", " ")}
              </Badge>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}
