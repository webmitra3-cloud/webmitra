import { useEffect } from "react";
import { useLocation, useNavigate } from "@/lib/router";
import { useAuth } from "@/context/auth-context";
import { LoadingState } from "./loading";

type ProtectedRouteProps = {
  roles?: Array<"ADMIN" | "EDITOR">;
  children: React.ReactNode;
};

export function ProtectedRoute({ roles, children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      const redirectTarget = `${location.pathname}${location.search}`;
      void navigate(`/admin/login?redirect=${encodeURIComponent(redirectTarget)}`, { replace: true });
      return;
    }

    if (roles && !roles.includes(user.role)) {
      void navigate("/admin", { replace: true });
    }
  }, [loading, user, roles, location.pathname, location.search, navigate]);

  if (loading) {
    return <LoadingState label="Checking session..." />;
  }

  if (!user) {
    return <LoadingState label="Redirecting to login..." />;
  }

  if (roles && !roles.includes(user.role)) {
    return <LoadingState label="Redirecting..." />;
  }

  return <>{children}</>;
}
