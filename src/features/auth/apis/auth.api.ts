/** Contratos HTTP futuros — hoje o service usa mocks + localStorage. */
export const authApi = {
  login: "/api/auth/login",
  logout: "/api/auth/logout",
  me: "/api/auth/me",
} as const;
