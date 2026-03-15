import { AdminRouteShell } from "@/components/layout/route-shells";
import { AdminServicesPage } from "@/pages/admin/admin-services-page";

export default function AdminServicesRoute() {
  return (
    <AdminRouteShell>
      <AdminServicesPage />
    </AdminRouteShell>
  );
}
