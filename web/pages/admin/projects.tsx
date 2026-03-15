import { AdminRouteShell } from "@/components/layout/route-shells";
import { AdminProjectsPage } from "@/pages/admin/admin-projects-page";

export default function AdminProjectsRoute() {
  return (
    <AdminRouteShell>
      <AdminProjectsPage />
    </AdminRouteShell>
  );
}
