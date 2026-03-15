import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { PublicRouteShell } from "@/components/layout/route-shells";
import { HomePage } from "@/pages/public/home-page";
import type { HomepageData } from "@/types";

type HomeRouteProps = {
  initialData: HomepageData;
};

export const getStaticProps: GetStaticProps<HomeRouteProps> = async () => {
  const { getHomepagePageData } = await import("@/server/services/public-page-data.service");
  const initialData = await getHomepagePageData();

  return {
    props: { initialData },
    revalidate: 60,
  };
};

export default function HomeRoute({ initialData }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PublicRouteShell initialSettings={initialData.settings}>
      <HomePage initialData={initialData} />
    </PublicRouteShell>
  );
}
