import { AdminRouteShell } from "@/components/layout/route-shells";
import { AdminSettingsPage } from "@/pages/admin/admin-settings-page";

export default function AdminSettingsRoute() {
  return (
    <AdminRouteShell>
      <AdminSettingsPage />
    </AdminRouteShell>
  );
}
