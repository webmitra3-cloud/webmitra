import type { ReactNode } from "react";
import { PublicLayout } from "./public-layout";
import { AdminLayout } from "./admin-layout";
import { ProtectedRoute } from "@/components/shared/protected-route";
import { SiteSettingsProvider } from "@/context/site-settings-context";
import type { Role, SiteSettings } from "@/types";

export function PublicRouteShell({
  children,
  initialSettings,
}: {
  children: ReactNode;
  initialSettings?: SiteSettings | null;
}) {
  return (
    <SiteSettingsProvider initialSettings={initialSettings}>
      <PublicLayout>{children}</PublicLayout>
    </SiteSettingsProvider>
  );
}

export function AdminRouteShell({ children, roles }: { children: ReactNode; roles?: Role[] }) {
  return (
    <ProtectedRoute roles={roles}>
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  );
}
