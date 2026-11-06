import { createContext } from "react";
import type { AuthCredentials, AuthState, LoginResult } from "../types/auth.types.ts";

export type AuthContextValue = AuthState & {
  login: (credentials: AuthCredentials) => Promise<LoginResult>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
