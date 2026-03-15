import { PublicRouteShell } from "@/components/layout/route-shells";
import { ProjectDetailPage } from "@/pages/public/project-detail-page";

export default function ProjectDetailRoute() {
  return (
    <PublicRouteShell>
      <ProjectDetailPage />
    </PublicRouteShell>
  );
}
