/** Contratos HTTP futuros — hoje o service usa mocks. */
export const eventsApi = {
  list: "/api/events",
  detail: (id: string) => `/api/events/${id}`,
  filters: "/api/events/filters",
  rsvp: (id: string) => `/api/events/${id}/rsvp`,
} as const;
