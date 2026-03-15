import { AdminRouteShell } from "@/components/layout/route-shells";
import { AdminPricingPage } from "@/pages/admin/admin-pricing-page";

export default function AdminPricingRoute() {
  return (
    <AdminRouteShell>
      <AdminPricingPage />
    </AdminRouteShell>
  );
}
