import type { ReactNode } from "react";
import { PublicLayout } from "./public-layout";
import { AdminLayout } from "./admin-layout";
import { ProtectedRoute } from "@/components/shared/protected-route";
import type { Role } from "@/types";

export function PublicRouteShell({ children }: { children: ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>;
}

export function AdminRouteShell({ children, roles }: { children: ReactNode; roles?: Role[] }) {
  return (
    <ProtectedRoute roles={roles}>
      <AdminLayout>{children}</AdminLayout>
    </ProtectedRoute>
  );
}
