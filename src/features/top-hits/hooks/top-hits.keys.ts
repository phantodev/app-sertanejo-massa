import type { TopHitsScopeId } from "../types/top-hits.types.ts";

export const topHitsKeys = {
  all: ["top-hits"] as const,
  charts: (scope: TopHitsScopeId) => [...topHitsKeys.all, "charts", scope] as const,
};
