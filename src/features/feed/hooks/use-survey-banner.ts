import { useQuery } from "@tanstack/react-query";
import { getSurveyBanner } from "../services/feed.service.ts";
import { feedKeys } from "./feed.keys.ts";

export function useSurveyBanner() {
  return useQuery({
    queryKey: feedKeys.survey(),
    queryFn: getSurveyBanner,
  });
}
