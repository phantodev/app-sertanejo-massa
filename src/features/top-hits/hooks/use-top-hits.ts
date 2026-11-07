import { useQuery } from "@tanstack/react-query";
import { getTopHitsCharts } from "../services/top-hits.service.ts";
import type { TopHitsScopeId } from "../types/top-hits.types.ts";
import { topHitsKeys } from "./top-hits.keys.ts";

export function useTopHitsCharts(scope: TopHitsScopeId = "brasil") {
  return useQuery({
    queryKey: topHitsKeys.charts(scope),
    queryFn: () => getTopHitsCharts(scope),
  });
}
