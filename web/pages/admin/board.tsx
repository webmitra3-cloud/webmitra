import { AdminRouteShell } from "@/components/layout/route-shells";
import { AdminBoardPage } from "@/pages/admin/admin-board-page";

export default function AdminBoardRoute() {
  return (
    <AdminRouteShell>
      <AdminBoardPage />
    </AdminRouteShell>
  );
}
