import { useQuery } from "@tanstack/react-query";
import { getLatestFeed } from "../services/latest.service.ts";
import { latestKeys } from "./latest.keys.ts";

export function useLatestFeed() {
  return useQuery({
    queryKey: latestKeys.feed(),
    queryFn: getLatestFeed,
    staleTime: 60_000,
  });
}
