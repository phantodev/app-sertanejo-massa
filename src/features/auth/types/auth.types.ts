import type { CurrentUser } from "../../session/types/session.types.ts";

export type AuthCredentials = {
  email: string;
  password: string;
};

export type AuthSession = {
  userId: string;
  email: string;
  signedInAt: string;
};

export type AuthStatus = "booting" | "authenticated" | "anonymous";

export type AuthState = {
  status: AuthStatus;
  session: AuthSession | null;
  user: CurrentUser | null;
};

export type LoginResult =
  | { ok: true; session: AuthSession; user: CurrentUser }
  | { ok: false; message: string };
