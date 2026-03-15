import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { PublicRouteShell } from "@/components/layout/route-shells";
import { ContactPage } from "@/pages/public/contact-page";
import type { SiteSettings } from "@/types";

type ContactRouteProps = {
  initialSettings: SiteSettings | null;
};

export const getStaticProps: GetStaticProps<ContactRouteProps> = async () => {
  const { getPublicSettingsData } = await import("@/server/services/public-page-data.service");
  const initialSettings = await getPublicSettingsData();

  return {
    props: { initialSettings },
    revalidate: 60,
  };
};

export default function ContactRoute({ initialSettings }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PublicRouteShell initialSettings={initialSettings}>
      <ContactPage initialSettings={initialSettings} />
    </PublicRouteShell>
  );
}
