import { AdminRouteShell } from "@/components/layout/route-shells";
import { AdminDashboardPage } from "@/pages/admin/admin-dashboard-page";

export default function AdminDashboardRoute() {
  return (
    <AdminRouteShell>
      <AdminDashboardPage />
    </AdminRouteShell>
  );
}
