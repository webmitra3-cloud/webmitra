import { PublicRouteShell } from "@/components/layout/route-shells";
import { AboutPage } from "@/pages/public/about-page";

export default function AboutRoute() {
  return (
    <PublicRouteShell>
      <AboutPage />
    </PublicRouteShell>
  );
}
