import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { PublicRouteShell } from "@/components/layout/route-shells";
import { PricingPage } from "@/pages/public/pricing-page";
import type { PricingPlan, SiteSettings } from "@/types";

type PricingRouteProps = {
  initialSettings: SiteSettings | null;
  initialPricing: PricingPlan[];
};

export const getStaticProps: GetStaticProps<PricingRouteProps> = async () => {
  const { getPricingPageData } = await import("@/server/services/public-page-data.service");
  const { settings, pricing } = await getPricingPageData();

  return {
    props: {
      initialSettings: settings,
      initialPricing: pricing,
    },
    revalidate: 60,
  };
};

export default function PricingRoute({ initialSettings, initialPricing }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PublicRouteShell initialSettings={initialSettings}>
      <PricingPage initialSettings={initialSettings} initialPricing={initialPricing} />
    </PublicRouteShell>
  );
}
