import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getEventById, setEventRsvp } from "../services/events.service.ts";
import type { EventRsvpStatus } from "../types/events.types.ts";
import { eventsKeys } from "./events.keys.ts";

export function useEvent(id: string | undefined) {
  return useQuery({
    queryKey: eventsKeys.detail(id ?? ""),
    queryFn: () => getEventById(id!),
    enabled: Boolean(id),
  });
}

export function useEventRsvp(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (status: EventRsvpStatus) => setEventRsvp(id, status),
    onSuccess: (event) => {
      queryClient.setQueryData(eventsKeys.detail(id), event);
      queryClient.invalidateQueries({ queryKey: eventsKeys.lists() });
    },
  });
}
