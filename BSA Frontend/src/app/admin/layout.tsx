import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
    </ProtectedRoute>
  );
}
