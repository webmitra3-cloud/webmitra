import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { PublicRouteShell } from "@/components/layout/route-shells";
import { ServicesPage } from "@/pages/public/services-page";
import type { Service, SiteSettings } from "@/types";

type ServicesRouteProps = {
  initialSettings: SiteSettings | null;
  initialServices: Service[];
};

export const getStaticProps: GetStaticProps<ServicesRouteProps> = async () => {
  const { getServicesPageData } = await import("@/server/services/public-page-data.service");
  const { settings, services } = await getServicesPageData();

  return {
    props: {
      initialSettings: settings,
      initialServices: services,
    },
    revalidate: 60,
  };
};

export default function ServicesRoute({ initialSettings, initialServices }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PublicRouteShell initialSettings={initialSettings}>
      <ServicesPage initialSettings={initialSettings} initialServices={initialServices} />
    </PublicRouteShell>
  );
}
