import { PublicRouteShell } from "@/components/layout/route-shells";
import { TeamPage } from "@/pages/public/team-page";

export default function TeamRoute() {
  return (
    <PublicRouteShell>
      <TeamPage />
    </PublicRouteShell>
  );
}
