import { PublicRouteShell } from "@/components/layout/route-shells";
import { HomePage } from "@/pages/public/home-page";

export default function HomeRoute() {
  return (
    <PublicRouteShell>
      <HomePage />
    </PublicRouteShell>
  );
}
