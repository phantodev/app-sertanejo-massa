export const profileApi = {
  byHandle: (handle: string) => `/api/profiles/${handle}`,
} as const;
