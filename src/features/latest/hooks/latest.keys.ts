export const latestKeys = {
  all: ["latest"] as const,
  feed: () => [...latestKeys.all, "feed"] as const,
};
