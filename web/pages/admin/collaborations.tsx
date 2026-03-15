import { AdminRouteShell } from "@/components/layout/route-shells";
import { AdminCollaborationsPage } from "@/pages/admin/admin-collaborations-page";

export default function AdminCollaborationsRoute() {
  return (
    <AdminRouteShell>
      <AdminCollaborationsPage />
    </AdminRouteShell>
  );
}
