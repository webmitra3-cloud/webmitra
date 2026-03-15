import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { PublicRouteShell } from "@/components/layout/route-shells";
import { ProjectDetailPage } from "@/pages/public/project-detail-page";
import type { Project, SiteSettings } from "@/types";

type ProjectDetailRouteProps = {
  initialSettings: SiteSettings | null;
  initialProject: Project;
  initialSlug: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { getProjectSlugs } = await import("@/server/services/public-page-data.service");
  const slugs = await getProjectSlugs();

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<ProjectDetailRouteProps> = async ({ params }) => {
  const slug = typeof params?.slug === "string" ? params.slug : "";
  if (!slug) {
    return { notFound: true };
  }

  const { getProjectDetailPageData } = await import("@/server/services/public-page-data.service");
  const { settings, project } = await getProjectDetailPageData(slug);
  if (!project) {
    return { notFound: true };
  }

  return {
    props: {
      initialSettings: settings,
      initialProject: project,
      initialSlug: slug,
    },
    revalidate: 60,
  };
};

export default function ProjectDetailRoute({
  initialSettings,
  initialProject,
  initialSlug,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PublicRouteShell initialSettings={initialSettings}>
      <ProjectDetailPage initialSettings={initialSettings} initialProject={initialProject} initialSlug={initialSlug} />
    </PublicRouteShell>
  );
}
