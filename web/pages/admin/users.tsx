import { AdminRouteShell } from "@/components/layout/route-shells";
import { AdminUsersPage } from "@/pages/admin/admin-users-page";

export default function AdminUsersRoute() {
  return (
    <AdminRouteShell roles={["ADMIN"]}>
      <AdminUsersPage />
    </AdminRouteShell>
  );
}
