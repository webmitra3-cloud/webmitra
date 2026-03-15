import { PublicRouteShell } from "@/components/layout/route-shells";
import { ProjectsPage } from "@/pages/public/projects-page";

export default function ProjectsRoute() {
  return (
    <PublicRouteShell>
      <ProjectsPage />
    </PublicRouteShell>
  );
}
