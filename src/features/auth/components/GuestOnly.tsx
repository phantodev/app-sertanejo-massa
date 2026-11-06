import { Spinner } from "@heroui/react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.ts";

export function GuestOnly() {
  const auth = useAuth();

  if (auth.status === "booting") {
    return (
      <div className="grid min-h-dvh place-items-center bg-massa-bg text-massa-muted">
        <div className="flex items-center gap-3 text-sm">
          <Spinner color="current" size="sm" />
          Carregando…
        </div>
      </div>
    );
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/feed" replace />;
  }

  return <Outlet />;
}
