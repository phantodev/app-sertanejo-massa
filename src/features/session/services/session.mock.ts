import { unsplash } from "../../../shared/lib/unsplash.ts";
import type { CurrentUser, User } from "../types/session.types.ts";

export const mockUsers: User[] = [
  {
    id: "u-gold",
    handle: "gold",
    displayName: "GOLD",
    avatarUrl: unsplash.avatar("1494790108377-be9c29b29330"),
    verified: true,
    city: "Curitiba",
    state: "PR",
  },
  {
    id: "u-alagoanos",
    handle: "alagoanos",
    displayName: "Alagoanos",
    avatarUrl: unsplash.avatar("1529626455594-4ff0802cfb7e"),
    verified: false,
    city: "Maceió",
    state: "AL",
  },
  {
    id: "u-andre",
    handle: "andre-daniel",
    displayName: "Andre Daniel",
    avatarUrl: unsplash.avatar("1507003211169-0a1dd7228f2d"),
    verified: true,
    city: "Campinas",
    state: "SP",
  },
  {
    id: "u-carlos",
    handle: "carlos-aline",
    displayName: "Carlos_Aline",
    avatarUrl: unsplash.avatar("1524504388940-b1c1722653e1"),
    verified: false,
    city: "São Paulo",
    state: "SP",
  },
  {
    id: "u-namu",
    handle: "namu",
    displayName: "Namu",
    avatarUrl: unsplash.avatar("1534528741775-53994a69daeb"),
    verified: true,
    city: "Ponta Grossa",
    state: "PR",
  },
  {
    id: "u-ljsecret",
    handle: "ljsecret",
    displayName: "LJsecret",
    avatarUrl: unsplash.avatar("1517841905240-472988babdf9"),
    verified: true,
    city: "São Paulo",
    state: "SP",
  },
  {
    id: "u-safada10",
    handle: "safada10",
    displayName: "Safada10",
    avatarUrl: unsplash.avatar("1529626455594-4ff0802cfb7e"),
    verified: true,
    city: "São Paulo",
    state: "SP",
  },
  {
    id: "u-sulsp",
    handle: "sulsp",
    displayName: "SulSP",
    avatarUrl: unsplash.avatar("1516589178581-6cd7833ae3b2"),
    verified: true,
    city: "São Paulo",
    state: "SP",
  },
  {
    id: "u-jagff",
    handle: "jagff",
    displayName: "jagff",
    avatarUrl: unsplash.avatar("1539571696357-5a69c17a67c6"),
    verified: false,
    city: "São Paulo",
    state: "SP",
  },
  {
    id: "u-jemhot",
    handle: "jemhot",
    displayName: "jemhot",
    avatarUrl: unsplash.avatar("1500648767791-00dcc994a43e"),
    verified: false,
    city: "Curitiba",
    state: "PR",
  },
  {
    id: "u-hotbar",
    handle: "hotbar",
    displayName: "hotbar",
    avatarUrl: unsplash.avatar("1544005313-94ddf0286df2"),
    verified: true,
    city: "São Paulo",
    state: "SP",
  },
  {
    id: "u-admin",
    handle: "admin",
    displayName: "admin",
    avatarUrl: unsplash.avatar("1472099645785-5658abf4ff4e"),
    verified: true,
    city: "Curitiba",
    state: "PR",
  },
];

export const mockCurrentUser: CurrentUser = {
  ...mockUsers[0]!,
  accountLabel: "Minha conta",
};

export function findMockUser(id: string): User | undefined {
  return mockUsers.find((user) => user.id === id);
}

export function findMockUserByHandle(handle: string): User | undefined {
  const normalized = handle.toLowerCase();
  return mockUsers.find((user) => user.handle.toLowerCase() === normalized);
}
