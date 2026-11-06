export const profileKeys = {
  all: ["profile"] as const,
  byHandle: (handle: string) => [...profileKeys.all, handle.toLowerCase()] as const,
};
