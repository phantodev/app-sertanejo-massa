export const fanPageKeys = {
  all: ["fan-page"] as const,
  byHandle: (handle: string) => [...fanPageKeys.all, handle] as const,
};
