import { useQuery } from "@tanstack/react-query";
import { getStories } from "../services/stories.service.ts";
import { storiesKeys } from "./stories.keys.ts";

export function useStories() {
  return useQuery({
    queryKey: storiesKeys.list(),
    queryFn: getStories,
  });
}
