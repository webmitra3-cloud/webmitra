import { PublicRouteShell } from "@/components/layout/route-shells";
import { ServicesPage } from "@/pages/public/services-page";

export default function ServicesRoute() {
  return (
    <PublicRouteShell>
      <ServicesPage />
    </PublicRouteShell>
  );
}
