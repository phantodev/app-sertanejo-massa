import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { sessionKeys } from "../../session/hooks/session.keys.ts";
import {
  loginWithCredentials,
  logoutSession,
  restoreAuthSession,
} from "../services/auth.service.ts";
import type { AuthCredentials, AuthSession, AuthStatus } from "../types/auth.types.ts";
import type { CurrentUser } from "../../session/types/session.types.ts";
import { AuthContext, type AuthContextValue } from "./auth-context.ts";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<AuthStatus>("booting");
  const [session, setSession] = useState<AuthSession | null>(null);
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    let active = true;

    void restoreAuthSession().then((restored) => {
      if (!active) return;
      if (restored) {
        setSession(restored.session);
        setUser(restored.user);
        setStatus("authenticated");
        queryClient.setQueryData(sessionKeys.currentUser(), restored.user);
      } else {
        setSession(null);
        setUser(null);
        setStatus("anonymous");
      }
    });

    return () => {
      active = false;
    };
  }, [queryClient]);

  const login = useCallback(
    async (credentials: AuthCredentials) => {
      const result = await loginWithCredentials(credentials);
      if (result.ok) {
        setSession(result.session);
        setUser(result.user);
        setStatus("authenticated");
        queryClient.setQueryData(sessionKeys.currentUser(), result.user);
      }
      return result;
    },
    [queryClient],
  );

  const logout = useCallback(async () => {
    await logoutSession();
    setSession(null);
    setUser(null);
    setStatus("anonymous");
    queryClient.removeQueries({ queryKey: sessionKeys.all });
  }, [queryClient]);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      session,
      user,
      login,
      logout,
      isAuthenticated: status === "authenticated",
    }),
    [status, session, user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
