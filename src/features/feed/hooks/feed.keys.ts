import type { FeedTabId } from "../types/feed.types.ts";

export const feedKeys = {
  all: ["feed"] as const,
  tabs: () => [...feedKeys.all, "tabs"] as const,
  posts: (tab: FeedTabId) => [...feedKeys.all, "posts", tab] as const,
  survey: () => [...feedKeys.all, "survey"] as const,
};
