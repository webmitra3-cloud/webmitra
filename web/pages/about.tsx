import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { PublicRouteShell } from "@/components/layout/route-shells";
import { AboutPage } from "@/pages/public/about-page";
import type { SiteSettings, TeamMember } from "@/types";

type AboutRouteProps = {
  initialSettings: SiteSettings | null;
  initialTeam: TeamMember[];
};

export const getStaticProps: GetStaticProps<AboutRouteProps> = async () => {
  const { getAboutPageData } = await import("@/server/services/public-page-data.service");
  const { settings, team } = await getAboutPageData();

  return {
    props: {
      initialSettings: settings,
      initialTeam: team,
    },
    revalidate: 60,
  };
};

export default function AboutRoute({ initialSettings, initialTeam }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PublicRouteShell initialSettings={initialSettings}>
      <AboutPage initialSettings={initialSettings} initialTeam={initialTeam} />
    </PublicRouteShell>
  );
}
