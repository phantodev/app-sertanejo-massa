import { delay } from "../../../shared/lib/delay.ts";
import { authApi } from "../apis/auth.api.ts";
import type { AuthCredentials, AuthSession, LoginResult } from "../types/auth.types.ts";
import { mockAuthAccounts, resolveMockUser } from "./auth.mock.ts";
import { clearAuthSession, readAuthSession, writeAuthSession } from "./auth.storage.ts";

void authApi;

export async function restoreAuthSession(): Promise<{
  session: AuthSession;
  user: NonNullable<ReturnType<typeof resolveMockUser>>;
} | null> {
  await delay(120);
  const session = readAuthSession();
  if (!session) return null;
  const user = resolveMockUser(session.userId);
  if (!user) {
    clearAuthSession();
    return null;
  }
  return { session, user };
}

export async function loginWithCredentials(credentials: AuthCredentials): Promise<LoginResult> {
  await delay(420);

  const email = credentials.email.trim().toLowerCase();
  const password = credentials.password;

  if (!email) {
    return { ok: false, message: "Informe seu e-mail ou usuário." };
  }
  if (!password) {
    return { ok: false, message: "Digite sua senha para continuar." };
  }

  const account = mockAuthAccounts.find(
    (item) => item.login.toLowerCase() === email && item.password === password,
  );

  if (!account) {
    return { ok: false, message: "E-mail/usuário ou senha inválidos." };
  }

  const user = resolveMockUser(account.userId);
  if (!user) {
    return { ok: false, message: "Conta indisponível no momento." };
  }

  const session: AuthSession = {
    userId: user.id,
    email: account.login.includes("@") ? account.login : `${account.login}@massa.app`,
    signedInAt: new Date().toISOString(),
  };

  writeAuthSession(session);
  return { ok: true, session, user };
}

export async function logoutSession(): Promise<void> {
  await delay(80);
  clearAuthSession();
}
