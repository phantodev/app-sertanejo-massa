import { useQuery } from "@tanstack/react-query";
import { getEventFilterOptions, getEventSections } from "../services/events.service.ts";
import type { EventFilters } from "../types/events.types.ts";
import { eventsKeys } from "./events.keys.ts";

export function useEventFilterOptions() {
  return useQuery({
    queryKey: eventsKeys.filters(),
    queryFn: getEventFilterOptions,
  });
}

export function useEventSections(filters: EventFilters) {
  return useQuery({
    queryKey: eventsKeys.list(filters),
    queryFn: () => getEventSections(filters),
  });
}
