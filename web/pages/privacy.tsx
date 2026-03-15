import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { PublicRouteShell } from "@/components/layout/route-shells";
import { PrivacyPage } from "@/pages/public/privacy-page";
import type { SiteSettings } from "@/types";

type PrivacyRouteProps = {
  initialSettings: SiteSettings | null;
};

export const getStaticProps: GetStaticProps<PrivacyRouteProps> = async () => {
  const { getPublicSettingsData } = await import("@/server/services/public-page-data.service");
  const initialSettings = await getPublicSettingsData();

  return {
    props: { initialSettings },
    revalidate: 60,
  };
};

export default function PrivacyRoute({ initialSettings }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PublicRouteShell initialSettings={initialSettings}>
      <PrivacyPage initialSettings={initialSettings} />
    </PublicRouteShell>
  );
}
