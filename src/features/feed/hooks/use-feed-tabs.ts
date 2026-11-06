import { useQuery } from "@tanstack/react-query";
import { getFeedTabs } from "../services/feed.service.ts";
import { feedKeys } from "./feed.keys.ts";

export function useFeedTabs() {
  return useQuery({
    queryKey: feedKeys.tabs(),
    queryFn: getFeedTabs,
  });
}
