import { PublicRouteShell } from "@/components/layout/route-shells";
import { PrivacyPage } from "@/pages/public/privacy-page";

export default function PrivacyRoute() {
  return (
    <PublicRouteShell>
      <PrivacyPage />
    </PublicRouteShell>
  );
}
