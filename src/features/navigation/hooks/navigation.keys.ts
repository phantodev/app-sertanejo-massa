export const navigationKeys = {
  all: ["navigation"] as const,
  side: () => [...navigationKeys.all, "side"] as const,
  mobile: () => [...navigationKeys.all, "mobile"] as const,
};
