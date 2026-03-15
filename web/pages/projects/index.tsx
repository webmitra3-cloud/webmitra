import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { PublicRouteShell } from "@/components/layout/route-shells";
import { ProjectsPage } from "@/pages/public/projects-page";
import type { PaginatedResponse, Project, SiteSettings } from "@/types";

type ProjectsRouteProps = {
  initialSettings: SiteSettings | null;
  initialProjects: PaginatedResponse<Project>;
};

export const getStaticProps: GetStaticProps<ProjectsRouteProps> = async () => {
  const { getProjectsPageData } = await import("@/server/services/public-page-data.service");
  const { settings, projects } = await getProjectsPageData({ page: 1, limit: 9 });

  return {
    props: {
      initialSettings: settings,
      initialProjects: projects,
    },
    revalidate: 60,
  };
};

export default function ProjectsRoute({ initialSettings, initialProjects }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PublicRouteShell initialSettings={initialSettings}>
      <ProjectsPage initialSettings={initialSettings} initialProjects={initialProjects} />
    </PublicRouteShell>
  );
}
