import { PublicRouteShell } from "@/components/layout/route-shells";
import { ContactPage } from "@/pages/public/contact-page";

export default function ContactRoute() {
  return (
    <PublicRouteShell>
      <ContactPage />
    </PublicRouteShell>
  );
}
