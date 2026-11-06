import type { EventFilters } from "../types/events.types.ts";

export const eventsKeys = {
  all: ["events"] as const,
  filters: () => [...eventsKeys.all, "filter-options"] as const,
  lists: () => [...eventsKeys.all, "list"] as const,
  list: (filters: EventFilters) =>
    [...eventsKeys.lists(), filters.period, filters.state, filters.city] as const,
  details: () => [...eventsKeys.all, "detail"] as const,
  detail: (id: string) => [...eventsKeys.details(), id] as const,
};
