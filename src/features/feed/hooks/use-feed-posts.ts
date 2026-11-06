import { useQuery } from "@tanstack/react-query";
import { getFeedPosts } from "../services/feed.service.ts";
import type { FeedTabId } from "../types/feed.types.ts";
import { feedKeys } from "./feed.keys.ts";

export function useFeedPosts(tab: FeedTabId = "for-you") {
  return useQuery({
    queryKey: feedKeys.posts(tab),
    queryFn: () => getFeedPosts(tab),
  });
}
