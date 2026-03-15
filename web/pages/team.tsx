import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { PublicRouteShell } from "@/components/layout/route-shells";
import { TeamPage } from "@/pages/public/team-page";
import type { SiteSettings, TeamMember } from "@/types";

type TeamRouteProps = {
  initialSettings: SiteSettings | null;
  initialTeam: TeamMember[];
  initialBoard: TeamMember[];
};

export const getStaticProps: GetStaticProps<TeamRouteProps> = async () => {
  const { getTeamPageData } = await import("@/server/services/public-page-data.service");
  const { settings, team, board } = await getTeamPageData();

  return {
    props: {
      initialSettings: settings,
      initialTeam: team,
      initialBoard: board,
    },
    revalidate: 60,
  };
};

export default function TeamRoute({ initialSettings, initialTeam, initialBoard }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PublicRouteShell initialSettings={initialSettings}>
      <TeamPage initialSettings={initialSettings} initialTeam={initialTeam} initialBoard={initialBoard} />
    </PublicRouteShell>
  );
}
