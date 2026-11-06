export const composerKeys = {
  all: ["composer"] as const,
  actions: () => [...composerKeys.all, "actions"] as const,
};
