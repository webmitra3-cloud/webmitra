import { AdminRouteShell } from "@/components/layout/route-shells";
import { AdminInquiriesPage } from "@/pages/admin/admin-inquiries-page";

export default function AdminInquiriesRoute() {
  return (
    <AdminRouteShell>
      <AdminInquiriesPage />
    </AdminRouteShell>
  );
}
