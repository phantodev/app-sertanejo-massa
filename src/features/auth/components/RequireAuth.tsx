import { Spinner } from "@heroui/react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.ts";

export function RequireAuth() {
  const auth = useAuth();
  const location = useLocation();

  if (auth.status === "booting") {
    return (
      <div className="grid min-h-dvh place-items-center bg-massa-bg text-massa-muted">
        <div className="flex items-center gap-3 text-sm">
          <Spinner color="current" size="sm" />
          Abrindo a Massa…
        </div>
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
