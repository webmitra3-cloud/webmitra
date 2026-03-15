import { AdminRouteShell } from "@/components/layout/route-shells";
import { AdminTeamPage } from "@/pages/admin/admin-team-page";

export default function AdminTeamRoute() {
  return (
    <AdminRouteShell>
      <AdminTeamPage />
    </AdminRouteShell>
  );
}
