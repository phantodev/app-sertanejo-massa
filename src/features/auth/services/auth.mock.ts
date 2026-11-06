import { findMockUser, mockCurrentUser } from "../../session/services/session.mock.ts";
import type { CurrentUser } from "../../session/types/session.types.ts";

export type MockAuthAccount = {
  /** Aceita e-mail ou handle. */
  login: string;
  password: string;
  userId: string;
};

/** Contas mock para desenvolvimento — trocar por API real depois. */
export const mockAuthAccounts: MockAuthAccount[] = [
  {
    login: "gold@massa.app",
    password: "massa123",
    userId: mockCurrentUser.id,
  },
  {
    login: "gold",
    password: "massa123",
    userId: mockCurrentUser.id,
  },
];

export function resolveMockUser(userId: string): CurrentUser | null {
  const user = findMockUser(userId);
  if (!user) return null;
  if (user.id === mockCurrentUser.id) {
    return structuredClone(mockCurrentUser);
  }
  return {
    ...structuredClone(user),
    accountLabel: "Minha conta",
  };
}
